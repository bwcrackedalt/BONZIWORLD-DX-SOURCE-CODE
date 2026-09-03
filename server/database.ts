import pg from "pg";
import { sanitizeUnicode } from "./utils.ts";

try {
	process.loadEnvFile(".env");
} catch (error) {
	if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
		throw error;
	}
}

let clientPromise: Promise<pg.Client> | undefined;

async function getClient(): Promise<pg.Client> {
	if (!clientPromise) {
		const client = new pg.Client(
			process.env.DATABASE_URL
				? { connectionString: process.env.DATABASE_URL }
				: {
						host: process.env.PGHOST,
						port: Number(process.env.PGPORT ?? 5432),
						user: process.env.PGUSER,
						password: process.env.PGPASSWORD,
						database: process.env.PGDATABASE,
					},
		);

		clientPromise = client.connect()
			.then(() => client)
			.catch(error => {
				clientPromise = undefined;
				throw error;
			});
	}

	return clientPromise;
}

async function query<T extends pg.QueryResultRow>(
	text: string,
	values: unknown[] = [],
): Promise<pg.QueryResult<T>> {
	const client = await getClient();
	return client.query<T>(text, values);
}

// Needed as imgbb matches any subdirectory (for some reason)
function urlFilename(url: string): string {
	try {
		return decodeURIComponent(new URL(url).pathname).replace(/^.+\//, "/");
	} catch {
		return "-1";
	}
}

export async function getUnlockedHats(cookie: string): Promise<string[]> {
let result = await query<{ hat: string }>(`
		SELECT hat FROM unlocked_hats WHERE cookie = $1;
	`, [sanitizeUnicode(cookie)]);
	return result.rows.map(row => row.hat);
}

export async function hasHat(cookie: string, hat: string): Promise<boolean> {
let result = await query<{ "?column?": number }>(`
		SELECT 1 FROM unlocked_hats
		WHERE $1 = cookie
		AND hat = $2
	`, [sanitizeUnicode(cookie), hat]);
	return result.rowCount === 1;
}

export async function unlockHat(cookie: string, hat: string): Promise<void> {
await query(`
		INSERT INTO unlocked_hats (cookie, hat)
		VALUES ($1, $2)
		ON CONFLICT DO NOTHING
	`, [sanitizeUnicode(cookie), hat]);
}

export async function setGodword(cookie: string, godword: string): Promise<void> {
await query(`
		INSERT INTO admin_logins (cookie, godword)
		VALUES ($1, $2) ON CONFLICT (cookie) DO UPDATE
		SET godword = excluded.godword
	`, [sanitizeUnicode(cookie), godword]);
}

export async function deleteGodword(cookie: string): Promise<void> {
await query(`
		DELETE FROM admin_logins
		WHERE godword = $1    
	`, [sanitizeUnicode(cookie)]);
}

export async function getImageBlockReason(url: string): Promise<string | null> {
let res = await query<{ reason: string }>(`
		SELECT reason FROM blocked_images
		WHERE $1 = image
	`, [sanitizeUnicode(urlFilename(url))]);
	let row = res.rows[0];
	return row?.reason ?? null;
}

export async function blockImage(url: string, reason: string) {
await query(`
		INSERT INTO blocked_images (image, reason)
		VALUES ($1, $2)
		ON CONFLICT (image) DO UPDATE SET reason = EXCLUDED.reason
	`, [sanitizeUnicode(urlFilename(url)), sanitizeUnicode(reason)]);
}

export async function unblockImage(url: string): Promise<void> {
await query(`
		DELETE FROM blocked_images WHERE image = $1
	`, [sanitizeUnicode(urlFilename(url))]);
}

export async function getMessageIdsFromIp(ip: string): Promise<string[]> {
let result = await query<{ id: string }>(`
		SELECT id FROM logs
		WHERE ip = $1
		AND time >= NOW() - INTERVAL '5 minutes'
		LIMIT 50
	`, [ip]);
	return result.rows.map(row => row.id);
}

export type BlockInfo = {
	type: string;
	reason: string;
};

export async function blockInfo(ip: string): Promise<BlockInfo | null> {
let result = await query<BlockInfo>(`
		SELECT type, reason FROM ip_block_view
		WHERE $1::inet <<= ip_range
		ORDER BY type DESC
		LIMIT 1
	`, [ip]);
	let row = result.rows[0];

	if (row) {
		return {
			type: row.type,
			reason: row.reason,
		};
	}
	return null;
}

export async function logJoin(ip: string, name: string, guid: string, cookie: string, headers: string): Promise<string> {
let result = await query<{ id: string }>(`
		INSERT INTO user_joins (ip, name, guid, cookie, headers)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id;
	`, [ip, sanitizeUnicode(name), guid, sanitizeUnicode(cookie), sanitizeUnicode(headers)]);
	let row = result.rows[0];
	return row.id;
}

export async function logMessage(databaseId: string, name: string, type: string, data: string): Promise<string> {
let result = await query<{ id: string }>(`
		INSERT INTO message_logs (user_id, name, type, data)
		VALUES ($1, $2, $3::log_type, $4)
		RETURNING id;
	`, [databaseId, sanitizeUnicode(name), type, sanitizeUnicode(data)]);
	let messageId = result.rows[0].id;
	return messageId;
}

export async function getGodword(cookie: string): Promise<string | null> {
let result = await query<{ godword: string }>(`
		SELECT godword FROM admin_logins WHERE cookie = $1
	`, [cookie]);
	let row = result.rows[0];
	return row?.godword ?? null;
}

export async function setPromotion(cookie: string, level: number): Promise<void> {
await query(`
INSERT INTO promotions (cookie, level)
VALUES ($1, $2)
ON CONFLICT (cookie) DO UPDATE SET level = EXCLUDED.level
`, [sanitizeUnicode(cookie), level]);
}

export async function deletePromotion(cookie: string): Promise<void> {
await query(`
DELETE FROM promotions WHERE cookie = $1
`, [sanitizeUnicode(cookie)]);
}

export async function getPromotion(cookie: string): Promise<number | null> {
let result = await query<{ level: number }>(`
SELECT level FROM promotions WHERE cookie = $1
`, [sanitizeUnicode(cookie)]);
let row = result.rows[0];
return row?.level ?? null;
}
