function range(begin, end) {
	let array = [];
	for (let i = begin; i <= end; i++)
		array.push(i);
	for (let i = begin; i >= end; i--)
		array.push(i);
	return array;
}

const SHEET_X = 0;
const SHEET_Y = 1;
const SHEET_WIDTH = 2;
const SHEET_HEIGHT = 3;
const OFFSET_X = 4;
const OFFSET_Y = 5;
const ROTATED = 6;

window.BonziData = {
	size: {
		x: 200,
		y: 160
	},
	spritemaps: {
		default: [[750,225,79,111,61,40,false],[441,1060,3,5,97,78,false],[445,555,5,8,91,75,true],[224,924,9,11,82,72,false],[644,209,14,16,73,68,false],[110,1108,20,21,64,64,true],[790,336,27,28,58,60,false],[44,1128,33,34,58,61,false],[0,1128,38,44,63,61,true],[1112,890,47,54,67,62,true],[775,446,54,62,73,61,true],[1101,1080,63,63,79,58,false],[865,557,76,70,84,48,true],[960,960,88,79,83,39,true],[338,892,97,85,77,37,false],[829,318,107,91,69,37,false],[119,832,114,92,61,41,false],[1065,0,113,101,58,37,true],[337,229,108,111,57,33,false],[231,107,106,120,56,31,false],[938,0,103,127,51,29,true],[154,0,107,142,38,17,true],[0,730,119,129,27,31,false],[335,340,116,106,30,45,true],[675,123,117,102,26,49,false],[829,210,108,108,33,43,false],[938,182,79,111,61,40,true],[151,223,79,112,61,40,false],[233,892,76,105,62,47,true],[837,409,76,99,62,53,true],[126,335,98,128,52,20,false],[0,462,116,135,35,21,false],[691,0,123,125,30,29,true],[0,597,133,117,21,36,true],[565,0,126,110,21,49,false],[0,335,126,127,35,26,false],[816,0,122,122,24,31,false],[335,977,88,106,22,45,true],[773,973,77,85,48,64,false],[1039,923,73,79,64,63,false],[1034,1080,59,67,84,59,true],[1112,937,50,40,108,61,false],[792,123,37,31,121,60,false],[906,633,29,24,119,68,false],[802,743,20,17,113,78,true],[775,500,13,11,104,84,true],[111,859,8,8,95,85,false],[111,867,8,7,84,83,false],[441,451,5,4,81,82,true],[117,711,2,2,81,81,false],[116,462,1,1,0,0,false],[1049,192,79,111,61,40,true],[152,111,79,112,61,39,false],[111,924,79,113,61,38,true],[938,103,79,112,61,39,true],[1050,113,79,112,61,39,true],[937,261,77,111,62,40,true],[1048,271,77,111,62,40,true],[0,859,134,111,33,40,true],[0,0,154,111,22,40,false],[0,111,152,112,23,39,false],[0,223,151,112,23,39,false],[936,338,92,111,47,40,true],[1047,348,99,111,39,40,true],[224,456,105,111,29,40,true],[230,227,107,112,22,39,false],[445,226,106,112,23,39,false],[335,456,104,110,25,41,true],[223,561,104,110,25,41,false],[227,671,104,110,25,41,false],[327,561,104,110,25,41,false],[331,671,104,110,25,41,false],[435,671,104,110,25,41,false],[428,781,104,110,25,41,false],[444,1060,103,110,26,41,true],[532,781,104,110,25,41,false],[633,1059,104,110,25,41,true],[445,451,104,110,25,41,true],[683,552,103,110,26,41,false],[699,662,103,110,26,41,false],[686,336,104,110,25,41,false],[555,449,104,110,25,41,true],[743,1058,104,110,25,41,true],[665,448,104,110,25,41,true],[715,772,104,110,25,41,false],[1046,605,104,110,25,41,true],[802,633,104,110,25,41,false],[819,743,104,110,25,41,false],[837,853,104,110,25,41,false],[853,1044,104,110,25,41,false],[923,668,104,110,25,41,false],[1027,709,104,110,25,41,true],[224,339,111,117,18,34,false],[437,109,113,117,16,34,false],[119,711,108,121,21,30,false],[117,588,106,123,28,28,false],[116,463,105,125,33,26,false],[224,968,77,111,62,40,true],[222,1045,80,111,60,40,true],[333,1065,85,111,57,40,true],[431,560,89,111,53,40,false],[441,340,83,111,59,40,false],[941,850,80,110,61,41,false],[1021,813,80,110,61,41,false],[850,963,81,110,60,41,true],[435,891,85,110,58,41,true],[233,781,98,111,46,40,false],[644,225,106,111,38,40,false],[331,781,97,111,48,40,false],[441,976,84,111,60,40,true],[545,891,84,111,59,40,true],[663,975,83,110,58,41,true],[552,975,84,111,56,40,true],[520,555,84,111,56,40,false],[539,666,81,111,59,40,false],[524,338,79,111,61,40,false],[603,337,83,111,59,40,false],[829,122,88,109,58,42,true],[550,110,99,125,58,26,true],[551,209,93,128,66,23,false],[337,104,100,125,61,26,false],[604,553,79,111,61,40,false],[620,664,79,111,61,40,false],[636,775,79,111,61,40,false],[936,430,79,111,61,40,true],[1047,447,79,111,61,40,true],[786,500,79,111,61,40,false],[936,509,79,111,61,40,true],[1047,526,79,111,61,40,true],[554,1059,79,107,61,44,false],[656,886,91,89,54,62,false],[747,882,91,90,54,61,true],[935,588,80,111,60,16,true],[1101,813,77,64,62,15,true],[865,485,72,71,64,0,true],[923,778,72,82,64,7,true],[1039,1002,76,78,62,6,false],[957,1048,77,88,62,35,false],[110,1003,112,105,43,53,false],[296,0,142,104,29,53,false],[0,993,135,110,32,47,true],[438,0,127,109,32,42,false]],
		legacy: [[0,0,200,160,0,0,false],[200,0,200,160,0,0,false],[400,0,200,160,0,0,false],[600,0,200,160,0,0,false],[800,0,200,160,0,0,false],[1000,0,200,160,0,0,false],[1200,0,200,160,0,0,false],[1400,0,200,160,0,0,false],[1600,0,200,160,0,0,false],[1800,0,200,160,0,0,false],[2000,0,200,160,0,0,false],[2200,0,200,160,0,0,false],[0,160,200,160,0,0,false],[200,160,200,160,0,0,false],[400,160,200,160,0,0,false],[600,160,200,160,0,0,false],[800,160,200,160,0,0,false],[1000,160,200,160,0,0,false],[1200,160,200,160,0,0,false],[1400,160,200,160,0,0,false],[1600,160,200,160,0,0,false],[1800,160,200,160,0,0,false],[2000,160,200,160,0,0,false],[2200,160,200,160,0,0,false],[0,320,200,160,0,0,false],[200,320,200,160,0,0,false],[400,320,200,160,0,0,false],[600,320,200,160,0,0,false],[800,320,200,160,0,0,false],[1000,320,200,160,0,0,false],[1200,320,200,160,0,0,false],[1400,320,200,160,0,0,false],[1600,320,200,160,0,0,false],[1800,320,200,160,0,0,false],[2000,320,200,160,0,0,false],[2200,320,200,160,0,0,false],[0,480,200,160,0,0,false],[200,480,200,160,0,0,false],[400,480,200,160,0,0,false],[600,480,200,160,0,0,false],[800,480,200,160,0,0,false],[1000,480,200,160,0,0,false],[1200,480,200,160,0,0,false],[1400,480,200,160,0,0,false],[1600,480,200,160,0,0,false],[1800,480,200,160,0,0,false],[2000,480,200,160,0,0,false],[2200,480,200,160,0,0,false],[0,640,200,160,0,0,false],[200,640,200,160,0,0,false],[400,640,200,160,0,0,false],[600,640,200,160,0,0,false],[800,640,200,160,0,0,false],[1000,640,200,160,0,0,false],[1200,640,200,160,0,0,false],[1400,640,200,160,0,0,false],[1600,640,200,160,0,0,false],[1800,640,200,160,0,0,false],[2000,640,200,160,0,0,false],[2200,640,200,160,0,0,false],[0,800,200,160,0,0,false],[200,800,200,160,0,0,false],[400,800,200,160,0,0,false],[600,800,200,160,0,0,false],[800,800,200,160,0,0,false],[1000,800,200,160,0,0,false],[1200,800,200,160,0,0,false],[1400,800,200,160,0,0,false],[1600,800,200,160,0,0,false],[1800,800,200,160,0,0,false],[2000,800,200,160,0,0,false],[2200,800,200,160,0,0,false],[0,960,200,160,0,0,false],[200,960,200,160,0,0,false],[400,960,200,160,0,0,false],[600,960,200,160,0,0,false],[800,960,200,160,0,0,false],[1000,960,200,160,0,0,false],[1200,960,200,160,0,0,false],[1400,960,200,160,0,0,false],[1600,960,200,160,0,0,false],[1800,960,200,160,0,0,false],[2000,960,200,160,0,0,false],[2200,960,200,160,0,0,false],[0,1120,200,160,0,0,false],[200,1120,200,160,0,0,false],[400,1120,200,160,0,0,false],[600,1120,200,160,0,0,false],[800,1120,200,160,0,0,false],[1000,1120,200,160,0,0,false],[1200,1120,200,160,0,0,false],[1400,1120,200,160,0,0,false],[1600,1120,200,160,0,0,false],[1800,1120,200,160,0,0,false],[2000,1120,200,160,0,0,false],[2200,1120,200,160,0,0,false],[0,1280,200,160,0,0,false],[200,1280,200,160,0,0,false],[400,1280,200,160,0,0,false],[600,1280,200,160,0,0,false],[800,1280,200,160,0,0,false],[1000,1280,200,160,0,0,false],[1200,1280,200,160,0,0,false],[1400,1280,200,160,0,0,false],[1600,1280,200,160,0,0,false],[1800,1280,200,160,0,0,false],[2000,1280,200,160,0,0,false],[2200,1280,200,160,0,0,false],[0,1440,200,160,0,0,false],[200,1440,200,160,0,0,false],[400,1440,200,160,0,0,false],[600,1440,200,160,0,0,false],[800,1440,200,160,0,0,false],[1000,1440,200,160,0,0,false],[1200,1440,200,160,0,0,false],[1400,1440,200,160,0,0,false],[1600,1440,200,160,0,0,false],[1800,1440,200,160,0,0,false],[2000,1440,200,160,0,0,false],[2200,1440,200,160,0,0,false],[0,1600,200,160,0,0,false],[200,1600,200,160,0,0,false],[400,1600,200,160,0,0,false],[600,1600,200,160,0,0,false],[800,1600,200,160,0,0,false],[1000,1600,200,160,0,0,false],[1200,1600,200,160,0,0,false],[1400,1600,200,160,0,0,false],[1600,1600,200,160,0,0,false],[1800,1600,200,160,0,0,false],[2000,1600,200,160,0,0,false],[2200,1600,200,160,0,0,false],[0,1760,200,160,0,0,false],[200,1760,200,160,0,0,false],[400,1760,200,160,0,0,false],[600,1760,200,160,0,0,false],[800,1760,200,160,0,0,false],[1000,1760,200,160,0,0,false],[1200,1760,200,160,0,0,false],[1400,1760,200,160,0,0,false],[1600,1760,200,160,0,0,false],[1800,1760,200,160,0,0,false]],
		pope: "legacy",
		blessed: "legacy",
		glow: "legacy",
	},
    hats: {
		normal: [
			{name: "bowtie", description: "A bowtie."},
			{name: "bucket", description: "fuck sprunki. then take the backflip."},
			{name: "chain", description: "A chain. Good for variation."},
			{name: "elon", description: "Nah you're not elon."},
			{name: "evil", description: "MWA HA HA HA HA!!!"},
			{name: "horse", description: "🐎🐎🐎🐎🐎🐎🐎🐎"},
			{name: "kamala", description: "BIA's hat."},
			{name: "maga", description: "Make America Great Again."},
			{name: "obama", description: "It's your president obama, and i'm going to tell you how to beatbox. Mptmrptbmhum-yeah-humbtuprumbum."},
			{name: "bfdi", description: "If you're a bfdi lover you should wear this hat."},
			{name: "pot", description: "HORROR NANO's former hat. HES 13 BTW"},
			{name: "tophat", description: "An tophat. Good for variation."},
			{name: "troll", description: "If you're a failtroll you should wear this hat."},
			{name: "witch", description: "Witch. No else."},
			{name: "wizard", description: "Adacadabra, Pata-de-cabra, Nuke that bonzi!"},
			{name: "chef", description: "New soup, MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM"},
			{name: "ushanka", description: "It's getting really cold in here."},
			{name: "party", description: "I like to party"},
			{name: "epic", description: "utubesyryou"},
			{name: "bush", description: "Bush? President?"},
			{name: "clown", description: "🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡"},
			{name: "eyepatch", description: "He's a pirate"},
			{name: "kiddie", description: "67 MANGO MANGO MUSTARD IN ALBUQUERQUEFORNOWADDASLIDENOTETOBENDITBACKWEMISSYOUONBWYESWENEEDYOUWE"},
			{name: "scared", description: "😱😱😱😱😱😱😱😱😱😱😱😱😱😱😱"},
			{name: "scarf", description: "Brrr, it's cold in here. Gotta need a scarf."},
			{name: "virginity", description: "It rocks."},
		],
		blessed: [
			"dank",
			"cigar",
			"illuminati",
			"propeller",
		],
		vault: [
			{name: "headphones", description: "transit meme"},
			{name: "unicorn", description: "Because there's a pony on the sky!"},
			{name: "mustache", description: "Yo Mustache Brother Foreign!"},
			{name: "sprout", description: "Did you plant your head?"},
			{name: "glitch", description: "\n\n\n\n\nĄ̵̥̙͓̈́̏͒A̵̢̛͍͓̱͈̞̘̩͓̩̗̪͓̔̅̈́̅̿̅̓͂͑̚͘͝Ä̷̫̮͙̯̫͓̳̰́̿́̃A̴̦̟͛̎̉́̂͐͌͋́̏͘Ȃ̵̡̠̼̝̩̪̐͛̌͗͐͘͜A̴̧̛͈̯̭̼̙̞̳̗͍͓̻͂̓̀͐ͅĂ̸̳̦̱͍̱̯͎͔͎̖͈̬̯͒͑͐́̈̔Á̴̡̧͙̲͚͔̠̘̯̣̤A̵̖̫̼̮̔̑̓̎̆̈͛̎̂̏́̅̉̽Ą̶͕͍͖̪̱̘̝̮̃̓A̷̧̤͎̬̠̟̩̣̍̑͜ͅẢ̶̢̨̤̩͇̳̤̼̮̰̇́͐̈́͐̃̋̃̿͜A̸̢̧̲͙̤̞͎̜̹̘̱̫̖̰̒͌̽͜A̵̯̠̱̹̎̽͆̕A̴̰̖̟͎͈̩̣͊̓̕Ǎ̷͕̆̃̂̄̀̑͘͠Ă̷̺̝̳͈̘̗̇͆̎̒̓͛̀͐̈́̏̈͝͝͝\n\n\n\n\n Error: Bonzi Not Found.\n"},
			{name: "greenhat", description: "Renember this hat from the button event? Well you can now get it from the vault."},
			{name: "purplehat", description: "Huh? What- OH NO ITS THE NU- *EXPLODES*"},
			{name: "redhat", description: "No description provided."},
			{name: "yellowhat", description: "No description provided."},
			{name: "whitehat", description: "No description provided."},
			{name: "bluehat", description: "No description provided."},
			{name: "goldhat", description: "The hat is golden, it shines when the people see it!"},
			{name: "nopupil", description: "Bro is not Herobrine"},
			{name: "pumpkin", description: "Not haloween yet, bitch 🤡"},
			{name: "frankenstein", description: "stitched head, ohohohoh i feel so good!"},
			{name: "cauldron", description: "Bath time!"},
			{name: "hockey", description: "Bro is not Jason"},
			{name: "decorated", description: "🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄"},
			{name: "santa", description: "Ho ho ho!"},
			{name: "elf", description: "I make the gifts for santa to deliver them!"},
			{name: "rudolph", description: "shove a bunch of drinks off my groin..."},
			{name: "silverfedora", description: "Is that the unused hat?"},
			/*
			"purplehat", "yellowhat", "redhat", "whitehat", "bluehat",
			"goldhat", "nopupil", "pumpkin", "cauldron", "frankenstein", "hockey","decorated", "santa", "elf", "rudolph", "silverfedora"
			*/
		],
		holidays: {
			halloween: {
				hats: [
					"cauldron",
					"frankenstein",
					"hockey",
					"pumpkin",
					"nopupil",
				],
			},
			christmas: {
				hats: [
					"santa",
					"elf",
					"decorated",
					"rudolph",
				],
			},
		},
		mod: [
			"king",
			"redking",
			"scarf2",
			"headphones2",
			"diamondchain",
		],
		event: [
		]
	},

	colors: {
		normal: [
			{name: "maroon"},
			{name: "red"},
			{name: "pink"},
			{name: "orange"},
			{name: "cappuccino"},
			{name: "brown"},
			{name: "yellow"},
			{name: "green"},
			{name: "blue"},
			{name: "cyan"},
			{name: "purple"},
			{name: "gray"},
			{name: "darkgray"},
			{name: "black"},
		],
		command: [
			{name: "lolcow"},{name: "angel"},{name: "glow"},{name: "noob"},{name: "gold"},{name: "pope"},
		],
		blessed: [
			"blessed",
			"glow",
			"noob",
			"gold",
		],
	},
	sprite: {
		frames: { width: 200, height: 160 },
		animations: {
			idle: [0],

			surf_intro: [...range(1, 26), "idle"],
			surf_away: range(27, 50),

			shrug_fwd: [...range(51, 61), "shrug_still"],
			shrug_still: [61],
			shrug_back: [...range(61, 51), "idle"],

			earth_fwd: [...range(63, 69), "earth_still"],
			earth_still: [...range(70, 91), "earth_still"],
			earth_back: [...range(92, 97), "idle"],

			cool_fwd: [...range(98, 114), "cool_still"],
			cool_still: [115],
			cool_back: [...range(114, 98), "idle"],

			praise_fwd: [...range(116, 119), "praise_still"],
			praise_still: [120],
			praise_back: [...range(119, 116), "idle"],

			grin_fwd: [...range(121, 127), "grin_still"],
			grin_still: [128],
			grin_back: [...range(123, 121), "idle"],

			backflip: [...range(129, 141), "idle"]
		}
	},
	to_idle: {
		shrug_fwd: "shrug_back",
		shrug_still: "shrug_back",

		earth_fwd: "earth_back",
		earth_still: "earth_back",

		beat_fwd: "beat_back",
		beat_still: "beat_back",

		cool_fwd: "cool_back",
		cool_still: "cool_back",

		praise_fwd: "praise_back",
		praise_still: "praise_back",

		grin_fwd: "grin_back",
		grin_still: "grin_back",
	},
	event_list_joke_open: [
		[
			{
				type: "text",
				text: "Yeah, of course {NAME} wants me to tell a joke."
			},
			{
				type: "anim",
				anim: "praise_fwd",
				ticks: 15
			},
			{
				type: "text",
				text: '"Haha, look at the stupid {COLOR} monkey telling jokes!" Fuck you. It isn\'t funny.',
				say: "Hah hah! Look at the stupid {COLOR} monkey telling jokes! Fuck you. It isn't funny."
			},
			{
				type: "anim",
				anim: "praise_back",
				ticks: 15
			},
			{
				type: "text",
				text: "But I'll do it anyway. Because you want me to. I hope you're happy."
			}
		], [
			{
				type: "text",
				text: "{NAME} used /joke. Whoop-dee-fucking doo."
			}
		], [
			{
				type: "text",
				text: "HEY YOU IDIOTS ITS TIME FOR A JOKE"
			}
		], [
			{
				type: "text",
				text: "Wanna hear a joke?"
			},
			{
				type: "text",
				text: "No?"
			},
			{
				type: "text",
				text: "Mute me then. That's your fucking problem."
			}
		], [
			{
				type: "text",
				text: "Senpai {NAME} wants me to tell a joke."
			}
		], [
			{
				type: "text",
				text: "Time for whatever horrible fucking jokes the creator of this site wrote."
			}
		],
		[{type: "text", text: "Time for whatever horrible fucking jokes the creator of this abomination of the chatting client wrote."}],
		[{type: "text", text: ">OH MAH GAH IT'S THE BITCHASS {COLOR} MONKEY ABOUT TO TELL JOK- ACK!"}],
	],
	event_list_joke_mid: [
		[
			{
				type: "text",
				text: "What is easy to get into, but hard to get out of?"
			},
			{
				type: "text",
				text: "Child support!"
			}
		], [
			{
				type: "text",
				text: "Why do they call HTML HyperText?"
			},
			{
				type: "text",
				text: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
			},
			{
				type: "anim",
				anim: "shrug_back",
				ticks: 15
			},
			{
				type: "text",
				text: "Sorry. I just had an epiphany of my own sad, sad existence."
			}
		], [
			{
				type: "text",
				text: "Two sausages are in a pan. One looks at the other and says \"Boy it's hot in here!\" and the other sausage says \"Unbelievable! It's a talking sausage!\"",
				say: "Two sausages are in a pan. One looks at the other and says, Boy it's hot in here! and the other sausage says, Unbelievable! It's a talking sausage!"
			},
			{
				type: "anim",
				anim: "shrug_back",
				ticks: 15
			},
			{
				type: "text",
				text: "What were you expecting? A dick joke? You're a sick fuck."
			}
		], [
			{
				type: "text",
				text: "What is in the middle of Paris?"
			},
			{
				type: "text",
				text: "A giant inflatable buttplug."
			}
		], [
			{
				type: "text",
				text: "What goes in pink and comes out blue?"
			},
			{
				type: "text",
				text: "Sonic's asshole."
			}
		], [
			{
				type: "text",
				text: "What type of water won't freeze?"
			},
			{
				type: "text",
				text: "Your mother's."
			}
		], [
			{
				type: "text",
				text: "Who earns a living by driving his customers away?"
			},
			{
				type: "text",
				text: "Nintendo!"
			}
		], [
			{
				type: "text",
				text: "What did the digital clock say to the grandfather clock?"
			},
			{
				type: "text",
				text: "Suck my clock."
			}
		], [
			{
				type: "text",
				text: "What do you call a man who shaves 10 times a day?"
			},
			{
				type: "text",
				text: "A woman."
			}
		], [
			{
				type: "text",
				text: "How do you get water in watermelons?"
			},
			{
				type: "text",
				text: "Cum in them."
			}
		], [
			{
				type: "text",
				text: "Why do we call money bread?"
			},
			{
				type: "text",
				text: "Because we KNEAD it. Haha please send money to my PayPal at nigerianprince99@bonzi.com"
			}
		], [
			{
				type: "text",
				text: "What is a cow that eats grass?"
			},
			{
				type: "text",
				text: "ASS"
			},
			{
				type: "text",
				text: "I'm a comedic genius, I know."
			},
		]
		[{type: "text", text: "Disco ball dies for a second."}],
		[{type: "text", text: "what is i3gti3t4iriiigtir5itii? m"}],
		[{type: "text", text: "𓂺𓂺𓂺𓂺𓂺𓂺𓂺𓂺𓂺"}],
		[
			{type: "text", text: "dud i hate this site"},
			{type: "text", text: "Then go kill yourself."},
			{type: "text", text: "That's your fucking problem."},
		],
		[{type: "text", text: "neathey dud 😭"}],
		[{type: "text", text: "being in ts server because weekends are peak"}],
		[{type: "text", text: "OIOIOI"}],
		[{type: "text", text: "bwi has disbanded. bia won."}],
		[{type: "text", text: "it's js a shark dud 😭"}],
		[
			{type: "text", text: "Why are oranges orange?"},
			{type: "text", text: "I'm unplugging myself."},
		],
		[{type: "text", text: "I'm about to beat every person in thebworld that can make comedy. Get ready for this one.; Are you ready? 3, 2, 1. (BONZI WAS HARDBANNED FOR THIS MESSAGE); I played a joke on you! In a joke. Get it? ... (but make it say: Pretend that I'm actually dot dot doting in here, it would be fucking embarrassing for me if i got found out this way.) Ok, it's time. Are you ready? *gasp* (but make it say: Also pretend I'm gasping here. Yes, I'm role-playing to you, in a joke. It's pretty embarrassing now is it?) Ok, now I'm actually going to say it. GET READY. ^^**PENIS!**^^ Come on! Laugh! I know you want to laugh! I can see you laughing on that screen, don't lie! Ok, I'll admit, that one was pretty fucking stupid. I'm sorry. Not sorry for wasting your time, nor for making an unfunny ass joke. Sorry for making you realize that you don't know true comedy. If you don't, then you're a retard. Thanks for nothing. And then the backflip.", say: "bro i broke, nah, i aint reading all that, click on the awesome purple button on the top left to see the joke."}],
	],
	event_list_joke_end: [
		[
			{
				type: "text",
				text: "You know {NAME}, a good friend laughs at your jokes even when they're not so funny."
			},
			{
				type: "text",
				text: "And you fucking suck. Thanks."
			}
		], [
			{
				type: "text",
				text: "Where do I come up with these? My ass?"
			}
		], [
			{
				type: "text",
				text: "Do I amuse you, {NAME}? Am I funny? Do I make you laugh?"
			},
			{
				type: "text",
				text: "pls respond",
				say: "please respond"
			}
		], [
			{
				type: "text",
				text: "Maybe I'll keep my day job, {NAME}. Patreon didn't accept me."
			}
		], [
			{
				type: "text",
				text: "Laughter is the best medicine!"
			},
			{
				type: "text",
				text: "Apart from the meds."
			}
		], [
			{
				type: "text",
				text: "Don't judge me on my sense of humor alone."
			},
			{
				type: "text",
				text: ["Please.", "Help! I'm being oppressed!"][Math.floor(Math.random()*2)]
			}
		],
		[{type: "text", text: "If you're going to complain about the inappropriate jokes, then you should complain about every person who use /joke. They make the same jokes as you, you fucking retard."}],
	],

	// ============================================================================

	event_list_fact_open: [
		[
			{
				type: "text",
				text: "Hey kids, it's time for a Fun Fact\u24C7!",
				say: "Hey kids, it's time for a Fun Fact!"
			}
		],
		[{type: "text", text: "Time for whatever horrible fucking facts the creator of this site wrote."}],
		[{type: "text", text: "Hey guys, here's an interesting fact!"}],
	],

	event_list_fact_mid: [
		[
			{
				type: "text",
				text: "Did you know that Uranus is 31,518 miles (50,724 km) in diameter?",
				say: "Did you know that Yer Anus is 31 thousand 500 and 18 miles in diameter?",
			},
		], [
			{
				type: "text",
				text: "Fun Fact: The skript kiddie of this site didn't bother checking if the text that goes into the dialog box is HTML code."
			},
			{type: "idle"},
			{
				type: "text",
				text: "{TOPJEJ}",
				say: "toppest jej"
			}
		],
		[
			{type: "text", text: "ALL NUMBERBLOCKS HATERS ARE ALL SHITBOX GOONERS"},
			{type: "idle"},
			{type: "text", text: "Sorry."},
		],
		[
			{type: "text", text: "The longest word that we all know is pneumonoultramicroscopicsilicovolcanoconiosis."},
			{type: "text", text: "But there's an even longer word."},
			{type: "idle"},
			{type: "text", text: "Get prepared for it. 3, 2, 1..."},
			{type: "text", text: "Methionylthreonylthreonylglutaminylarginyltyrosylglutamylserylleucylphenylalanylalanylglutaminylleuc yllysylglutamylarginyllysylglutamylglycylalanylphenylalanylvalylprolylphenylalanylvalylthreonylleucylgl ycylaspartylprolylglycylisoleucylglutamylglutaminylserylleucyllysylisoleucylaspartylthreonylleucylisoleu cylglutamylalanylglycylalanylaspartylalanylleucylglutamylleucylglycylisoleucylprolylphenylalanylseryla spartylprolylleucylalanylaspartylglycylprolylthreonylisoleucylglutaminylasparaginylalanylthreonylleucyl arginylalanylphenylalanylalanylalanylglycylvalylthreonylprolylalanylglutaminylcysteinylphenylalanylglu tamylmethionylleucylalanylleucylisoleucylarginylglutaminyllysylhistidylprolylthreonylisoleucylprolylisol eucylglycylleucylleucylmethionyltyrosylalanylasparaginylleucylvalylphenylalanylasparaginyllysylglycyli soleucylaspartylglutamylphenylalanyltyrosylalanylglutaminylcysteinylglutamyllysylvalylglycylvalylaspa rtylserylvalylleucylvalylalanylaspartylvalylprolylvalylglutaminylglutamylserylalanylprolylphenylalanylarg-", say: "bro i broke."},
			{type: "text", text: "NAH I AIN'T SAYING ALL THAT."},
		],
		[
			{type: "text", text: "Did you know that the creator of this site hates Albuquerque for now?"},
			{type: "idle"},
			{type: "text", text: "I think he hates it because the music video is boring. He prefers other weird Al songs."},
		],
		[
			{type: "text", text: "Did you know....."},
			{type: "idle"},
			{type: "text", text: "I don't know for a fact."},
		],
		[{type: "text", text: "Fuc"}],
		[
			{type: "text", text: "In reality, FlashThemes was hacked by a trojan named \"BONZITROJAN\" and it was made by the bia."},
		],
		[{type: "text", text: "To make ChatGPT work, it needs water to cool down."}],
		[
			{type: "text", text: "Neathey raped child-"},
			{type: "idle"},
			{type: "text", text: "dud why did i say that"},
			{type: "text", text: "it's all my fault"},
			{type: "text", text: "please neahey dont kill me"},
		],
		[{type: "text", text: "i aint gonna say it"}],
		[{type: "text", text: "sausage"}],
		[{type: "text", text: "BIA is better than the BWI. The BWI has disbanded unfortunately."}],
		[{type: "text", text: "Earlier today, i found out how to make jannies citty leak. Works all the time. Tell them they do it for free: then end the shrug emote: >NOOOOOOO THEY PAY ME TO DO THIS THOUGH, I TOTALLY BELIEVE THAT I WILL GET PAID MINIMUM WAGE JUST TO APPROVE IMAGES ON THIS SITE Geg. You will never be paid."}],
		[{type: "text", text: "Joseph Judge was too lazy to write facts, so he just wrote 2. That's why you only see the 2, same, boring facts. Apparently every other site owner felt the same, so they didn't write any facts. Go call them out for being lazy. Oh wow, you actually learned something from this feature? **PANIC!** ^^**AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA**^^"}],
	],

	event_list_fact_end: [
		[
			{
				type: "text",
				text: "o gee whilickers wasn't that sure interesting huh"
			}
		],
		[{type: "html", text: "WAS'NT THAT FACT <h1>INTERESTING?", say: "was'nt that fact interesting?"}],
		[{type: "text", text: "Did you also know that non moved hats are coming to GWORDPS?"}],
		[{type: "text", text: "My teacher learned me that fact."}],
		[{type: "text", text: "Did you also know that HORROR NANO is 13?"}],
	],
	//=================================================
	event_list_wtf: [
		[{type: "text", text: "im a cool nig"}],
		[{type: "text", text: "i like albuquerque and now i got hate"}],
		[{type: "text", text: "im a bwi member and i got hate"}],
		[{type: "text", text: "fuck neathey"}],
		[{type: "html", text: "OH OH OH OH OH! IM GONNA CUM!"}],
		[{type: "text", text: "BogenWORLD.exe has encountered an error and you got disconnected from the server just screwed up."}],
		[
			{type: "text", text: "i love porn and inflation"},
			{type: "image", url: "https://files.catbox.moe/62ijpy.avif"}
		],
	],
//=====================================================
	event_list_cp_open: [
            [
                {type: "text", text: "Wanna hear a copypasta?"},
                {type: "text", text: "No?"},
                {type: "text", text: "Mute me then. That's your fucking problem."},
            ],
            [
                {type: "text", text: "{NAME} used /copypasta. Whoop-dee-fucking doo."},
            ],
            [
                {type: "text", text: "here is a skyboxer copypasta"},
            ],
            [
                {type: "text", text: "HEY YOU IDIOTS ITS TIME FOR A COPYPASTA"},
            ],
        ],
        event_list_copypasta: [
            [
                {type: "text", text: "imagine if you were dreaming about a yourself waiting for the pizza in the mall but then a person says the n word and you say..."},
                {type: "text", text: "Hey {NAME}! You are a racist!"},
                {type: "text", text: "and then the person starts running and you chase him"},
                {type: "text", text: "but he went into a flying scooter and you also went into a flying scooter"},
                {type: "text", text: "and then your scooter acts wierdly and you start spinning"},
                {type: "text", text: "and then you start falling but you went into a bed"},
                {type: "text", text: "but the dream is'nt ending, you go to the living room"},
                {type: "text", text: "and then you find a soda can"},
                {type: "text", text: "and you ignored it, but you found a slipping banana in your scooter and then you woke up."},
            ],
            [
                {type: "text", text: "guys, 404 was dreaming about..."},
                {type: "text", text: "he was in baldi's schoolhouse but modified,"},
                {type: "text", text: "but then he exited it instantly without any notebooks which belonged him in real life, but the dream didn't end."},
                {type: "text", text: "he went into a small hill, the river slowly approaching him with all of his friends..."},
                {type: "text", text: "when the river got him, he went falling down the hill, but he went out and..."},
                {type: "text", text: "he went into a zoo entry, maybe not the right entry, he started running, but he reminded of the zoo he went back in 2025"},
                {type: "text", text: "later, the dream got cut and then he woke up."},
            ],
            [
                {type: "text", text: "guys, i think 404 renembers a dream..."},
                {type: "text", text: "not about drugs, theyre so bad, but once..."},
                {type: "text", text: "he was in a mall, without the racist person..."},
                {type: "text", text: "but then he went outside and i dont know blah blah blah, to go to an empty elevator"},
                {type: "text", text: "guys, he remembers it looked futuristic, it was a giant glass cylinder with a gate"},
                {type: "text", text: "then, he found the secret 5th button, because everyone only knows the first 4 buttons"},
                {type: "text", text: "it was on a secret socket, then he pressed it..."},
                {type: "text", text: "and the elevator just turned into his room, he started flying, but he got air, which is rare, but then..."},
                {type: "text", text: "he started opening the curtains and he saw he was outside earth..."},
                {type: "text", text: "then he checked into his phone on a wiki..."},
                {type: "text", text: "and he was the 5th floor, it was named \"Space Chaos\""},
                {type: "text", text: "and then he woke up. the dream ended."},
            ],
            [
                {type: "text", text: "i hate the 6 7 meme."},
                {type: "text", text: "why the fuck does it exist?"},
                {type: "text", text: "well why the creator hismelf got hate? just by creating that meme?"},
                {type: "text", text: "also gofuckmatefan and evil ananymass are also using it."},
                {type: "text", text: "i hate it."},
            ],
            [
                {type: "text", text: "i hate sprunki."},
                {type: "text", text: "yeah, even the characters are low-detailed"},
                {type: "text", text: "and the creator of it, nyankobflol, and of this site, 404, hates it."},
                {type: "text", text: "aaaaand toxic user is also liking it! why the hell don't they like other things instead like numberblocks, bfdi or more?"},
                {type: "text", text: "why the hell does it fucking exist? why the hell nyanko even made it?"},
                {type: "text", text: "i hate it."},
            ],
            [
                {type: "text", text: "here is why i hate goanimate."},
                {type: "text", text: "here is the text that I got from the deviantart post."},
                {type: "text", text: "I'm going to tell you the top 10 reasons why I hate GoAnimate. If you have no idea what GoAnimate is, click this [REDACTED LINK]"},
                {type: "text", text: "Alright, now that you've read that, time to tell you why."},
                {type: "text", text: "10. Fetish videos"},
                {type: "text", text: "In 2014, a user by the name of RachelIsCutie VGCP (now known as BlueberryRulesEDCP on DA) decided to use GoAnimate to express his sexual fantasies. The first video of this happened on Valentine's Day with an inflation fetish of his friend Courtney Springer's (hennyloc57 of DA) GoAnimate avatar, but it was viewed with mixed results."},
                {type: "text", text: "A few months later, he started posting several videos, including vore and blueberry inflation, and then in the truckloads. However, after the user was terminated in January 2016, he decided to post them on his DA page. Where they FIT IN. Nowadays, it doesn't really bother me anymore."},
                {type: "text", text: "9. Alvin Hung torture porns"},
                {type: "text", text: "If you decided to read the Wikipedia article, you learned (or already know) that Alvin Hung is the creator of GoAnimate. Well, in June 2015, Alvin removed comments and friends, and changed the look of the site (because of #1 on the list). Then, in October, he removed several languages and voices. This made many users of the site angry, as they portrayed Alvin getting beaten or killed."},
                {type: "text", text: "In late November, he removed the free plan. Then, in January 2016, GoAnimate switched from Flash to HTML5. This was the breaking point. Users wouldn't stop making videos of him getting assaulted by them or their favorite characters! And when somebody learned that Flash themes were still on GoAnimate for Schools, everyone, and I mean EVERYONE went there, just to make videos out of poor Alvin!"},
                {type: "text", text: "He only needed money to support his family, not to mention he wants to keep up with the times! In the words of Filthy Frank:"},
                {type: "text", text: "ITS TIME TO STOP!!!"},
                {type: "text", text: "8. Ruining Plotagon"},
                {type: "text", text: "Plotagon is another animation site, except it seems to resemble xtranormal (remember that), and the characters have more expression on their faces than GoAnimate characters. Well, After Alvin removed the comments, some users found this website and said they would be moving there. The end result? HORRIFYING. Users wouldn't stop making certain videos that will make numbers 5 and 2, and the site practically became GoAnimate 2.0! What were they thinking?"},
                {type: "text", text: "7. Ripping off Family Guy backgrounds"},
                {type: "text", text: "In one of the Flash themes, Comedy World, there is a background that strongly resembles the living room from Family Guy! The couch, TV, door, window, and even the PAINTINGS are all in the same place! Don't believe me? Look at this picture I found (credit to spongekid1999): [REDACTED IMAGE] I smell a lawsuit from a certain Seth MacFarlane..."},
                {type: "text", text: "6. Police groups"},
                {type: "text", text: "What is a \"police group\", you ask? Well, it is a usual 4-letter acronym that creates a group of users. The two WORST are the VGCP (Video Game Cartoon Police) and the UTTP (UTube Troll Police). The UTTP's name is self explanatory. They're YouTube trolls! As for the VGCP, I don't know why they chose that name. Possibly because of all the users impersonating characters. Next!"},
                {type: "text", text: "5. Stupid reasons to get grounded"},
                {type: "text", text: "So, have you ever farted in class? No big deal. Go trick or treating? No big deal. Get a red card as a character from your favorite show when you were 4? BIG DEAL. GoAnimators take the smallest thing as reasons to get grounded, like burping, farting, or eating a lot. WHY? Not to mention the overused word \"grounded\" and long strings of numbers. For example: \"Caillou! How dare you like Dora! You're not allowed to like Dora! That's it! You're grounded grounded grounded grounded for 147207582969869742967984768937962623 years! Go to your room and never ever come out!\""},
                {type: "text", text: "Get the picture?"},
                {type: "text", text: "4. Bizarre shippings"},
                {type: "text", text: "Mario and Peach? Check. Nick Wilde and Judy Hopps? I can see it, so check. Sky and Boom- wait, WHAT? So, two users named L Ryan and Dylan Jacob thought that it would be a good idea to ship their favorite characters, Sky from Total Drama, and Boomboxer, an enemy from Paper Mario with ABSOLUTELY NO PERSONALITY. Also, her's some more absurd ships:"},
                {type: "text", text: "Trip (Pokemon) x Elvira (Kira Kira Pop Princess)"},
                {type: "text", text: "Dora (Dora the Explorer) x Caillou (Caillou)"},
                {type: "text", text: "(also, here is a bonus one that isn't on the deviantart post...)"},
                {type: "text", text: "Numberblock 1 (Numberblocks) x Daniel Pietro (youtube)"},
                {type: "text", text: "WHAT I AM EVEN LOOKING AT???"},
                {type: "text", text: "3. No effort at all"},
                {type: "text", text: "So, GoAnimate is used to make complex stories of characters, right?"},
                {type: "text", text: "NOPE."},
                {type: "text", text: "At least 90% of the users on the site make the same, repetitive garbage SEVERAL TIMES A DAY. Grounded videos, dead meat videos, held back videos, etc. It takes HOURS to find quality content on the site!"},
                {type: "text", text: "Would you just TRY to make something creative?"},
                {type: "text", text: "2. Killing childhood"},
                {type: "text", text: "Remember when you were 4 years old and you liked watching shows on Nick Jr. and Sprout? Well, THEY DON'T! Many GoAnimate users refer to shows aimed for children 6 and younger as \"baby shows\", and the main character of the show are usually the victims of grounded videos. Why? WHY? WHY ARE YOU RUINING YOUR OWN CHILDHOOD GOANIMATORS?!!?"},
                {type: "text", text: "Before we get to Number 1, let's have a little recap:"},
                {type: "text", text: "10. THE FETISH"},
                {type: "text", text: "9. Bullying \"Crapvin Hang\""},
                {type: "text", text: "8. Ruining 2 sites"},
                {type: "text", text: "7. Family GuAnimate"},
                {type: "text", text: "6. VGCPEEPEE and YouTube Trolls Police"},
                {type: "text", text: "5. 10298019748037 years grounded!"},
                {type: "text", text: "4. Skyboxer ship"},
                {type: "text", text: "3. 404: Effort not found"},
                {type: "text", text: "2. Childhood killers"},
                {type: "text", text: "And now, the #1 reason why I hate GA is..."},
                {type: "text", text: "1. GoF*gs"},
                {type: "text", text: "What's a GoF*g? A GoF*g is a GA user who cannot respect opinions on the site. They believe that \"good users\" and \"bad users\" exist, and that they are the king/queen of the world. If someone disagrees with them, they threaten them with a common GA grounded video quote."},
                {type: "text", text: "They also make what many users call \"user videos\" in which another GoAnimate/YouTube user is the victim of a grounded/dead meat/nightmare/held back video. THEY are the biggest blemish in the GA community, even more than the grounded videos!"},
                {type: "text", text: "Well, the good news is that there is a rumor spreading that GoAnimate will shut down permanently next year."},
                {type: "text", text: "And if you liked this rant, thank you, and consider favoriting it, or watch me for more drawings and journals."},
                {type: "text", text: "Thank you all for your attention."},
            ],
            [
                {type: "text", text: "404 was dreaming about..."},
                {type: "text", text: "not about the mall or smth..."},
                {type: "text", text: "but he was checking on his phone,"},
                {type: "text", text: "into youtube, he decided to check on NB1M's channel"},
                {type: "text", text: "but he thinks he gave up making numberblocks commentaries and saw random videos of a popular game named \"Minecraft\""},
                {type: "text", text: "and then he gave up on his phone, he went outside, to go to a parkour..."},
                {type: "text", text: "but then, he went into the sky, but he was falling down, he went into a portal, which he was in his room,"},
                {type: "text", text: "but then he went to the living room, but without a soda can, and when he opened the door, he went into a portal, which was in NB1M's channel, but then another door, he opened it, and got crushed by NB1M, but then he woke up."},
            ],
            [
                {type: "text", text: "HeyHorrormoviesand the the  most"},
                {type: "text", text: "of the.  BONZI respond respond  with your"},
                {type: "text", text: "PLEASE COME on yourmark it  is.  is  is"},
                {type: "text", text: "OhmanIwillsenditbackinmy car.   you need help"},
                {type: "text", text: "pneumonoultramicroscopicsilicovolcanoconiosis and  you.  you you"},
                {type: "text", text: "Octoblockandthenyoustart spinning it outand. I excited for a brief and.  but I STIVENELVRO"},
                {type: "text", text: "Thanks forwatching.  showsshows.  Nick. Jr. meme Sprout. are᱾    areareareare"},
                {type: "text", text: "Sorry, i just had a stroke."},
            ],
					[
						{type: "idle"},
						{type: "text", text: "Goodbye, UnrealSticky."},
						{type: "text", text: "It was fun while it lasted."},
						{type: "text", text: "So we're going to make a last message."},
						{type: "text", text: "DonutScout's all his fault."},
						{type: "text", text: "I'm sorry for the drama on mickai.me and bonziworld.kr."},
						{type: "text", text: "Sticky, fly high, i hope you will come to a new community."},
						{type: "text", text: "Here is all the persons that will miss you the most."},
						{type: "text", text: "RadicalGreen, 404bonzi, HORROR NANO,"},
						{type: "text", text: "TPG64, Chace, Nazar, ItzCrazySonicFan,"},
						{type: "text", text: "PenBfdi6711, Rainbow, Vee, AnonymousHorse,"},
						{type: "text", text: "MTV One, antdaboi, and many more."},
						{type: "text", text: "And a last message..."},
						{type: "html", text: "<h1>Thanks for being in the community, sticky."},
					],
            [
                {type: "text", text: "NEVER DRINK THE GADA POTION AT 3AM!"},
                {type: "text", text: "I WAS SITTING IN MY HOME WHEN I GOT A KNOCK ON THE DOOR"},
                {type: "text", text: "AND IT WAS A PACKAGE LABELLED \"FROM GOFUCKMATEFAN,  GADA\""},
                {type: "text", text: "SO I OPENED IT AND IT WAS A POTION LABELLED \"GADA POTION\""},
                {type: "text", text: "I WAS CURIOUS SO I DRANK IT THEN I STARTED TO BE A MASSIVE RETARD"},
                {type: "text", text: "I USED RETARDED TERMS LIKE \"YOU ARE GROUNDED FOR 6 7 YEARS\" AND \"YAY HAHA!\""},
                {type: "text", text: "FORTUNATELY I DRANK MOUNTAIN DEW WHICH CURED MY RETARDATION AND I SENT A NOTICE TO THE BWI SCIENTISTS! NEVER DRINK THE GADA POTION YOULL BE SEVERLY RETARDED"},
            ],
            [
                {type: "text", text: "I sexually identify as 404. Ever since I was a young user I dreamed of having a server dropping hot sticky blacklist on disgusting GADA members. "},
                {type: "text", text: "People say to me that a person being a server owner is impossible but I don’t care,  I'm beautiful."},
                {type: "text", text: "I'm having 7 clans owned: AGADA, AGI, TAGC, FIA, BWCA, GMR, and AKKK. From now on I want you guys to call me \"404\" and respect my right to meme from above and meme needlessly.", say: "I'm having 7 clans owned: Anti-Goanimate Defense Agency,  Anti-Goanimate Investigations, The Anti-Grounder Agency, Faldibag intelligence agency, BonziWORLD cubes agency, Great Meme Reset, and Anti-KayKayKay. From now on i want you guys to call me 404 and respect my right to meme from above and meme needlessly."},
                {type: "text", text: "If you can't accept me you’re a owner hater and need to fuck yourself. Thank you for being so understanding."},
            ],
            [
                {type: "text", text: "The +1 pitch trick. We all know that slide notes are great."},
                {type: "text", text: "But we're not always sure how to implement them."},
                {type: "text", text: "Here's an trick that often works."},
                {type: "text", text: "Grab a chord, and shift it one semitone down. It's gonna sound jazzy."},
                {type: "text", text: "Now add a slide note to bend it back. It's a nice effect."},
                {type: "text", text: "Adjust the length of it until you're happy."},
                {type: "text", text: "It's good for variation, let's add it to the last chord."},
                {type: "text", text: "And with melodies, it's a nice way to spice it up."},
                {type: "text", text: "Simple and sweet."},
                {type: "text", text: "And it works with so many things."},
                {type: "text", text: "If you have an reverse, try pitching it up for a semitone down."},
                {type: "text", text: "It's captivating, so don't overthink your slides."},
                {type: "text", text: "Just a semitone can be sufficient."},
                {type: "text", text: "And this also goes with those tiny little drills."},
                {type: "text", text: "Just a little semitone brings life to it."},
                {type: "text", text: "This is something that sometimes get lost in the ages of autotune, so you got to sing it as [CONFUSED]", say: "This is something that sometimes get lost in the ages of autotune, so you got to sing it as SS."},
                {type: "text", text: "Like this: YEEEEEEEEEEEEAH"},
                {type: "text", text: "When we autotune it we risk losing that glide, be mindful of that some glides you want cuz we like pens."},
                {type: "text", text: "you know how to play it on a saxophone, you wouldn't play it like that."},
                {type: "text", text: "You got to have some [CONFUSED] and an outstanding way to spice up the end of your song can be to pitch the entire thing one semitone for a spicy key change.", say: "You got to have some B and an outstanding way to spice up the end of your song can be to pitch the entire thing one semitone for a spicy key change."},
                {type: "text", text: "An easy way [CONFUSED] to do it is to hit transpose.", say: "An easy way way to do it is to hit transpose."},
                {type: "text", text: "Do another one."},
            ],
            [
                {type: "text", text: "Every day, i think of all the things i'll make"},
                {type: "text", text: "With my pan, my mixer and my oven tray"},
                {type: "text", text: "Get the eggs, the flour and the butter sticks"},
                {type: "text", text: "Or get lazy, and just make it with a mix"},
                {type: "text", text: "Maybe strawberry shortcake, i'll never get bored of it"},
                {type: "text", text: "Vainilla and chocolate and funfetti, oh"},
                {type: "text", text: "Red velvet or carrot, no matter i swear that it'll"},
                {type: "text", text: "be the best ever to take to the show"},
                {type: "text", text: "Hey two!"},
                {type: "text", text: "When you bake a cake, decorate it and take it to the players who are safe"},
                {type: "text", text: "That's how you know its cake at stake! (stake, stake)"},
                {type: "text", text: "Cake at stake, cake at stake (Cake, cake) (Cake at stake)"},
                {type: "text", text: "Every night"},
                {type: "text", text: "I think of people i'll invite"},
                {type: "text", text: "To my stage when the cake is looking just right"},
                {type: "text", text: "Wish you could taste, i made it really good and stuff"},
                {type: "text", text: "Hope the way it looks on camera is enough"},
                {type: "text", text: "Making pumpkin and lemon, banana it's heaven, with some frosting or fondant"},
                {type: "text", text: "or glaze or ganache"},
                {type: "text", text: "With so many cakes, now my schedule is crazy, but i bake so impatiently"},
                {type: "text", text: "Cuz i love cake, oh my gosh"},
                {type: "text", text: "When you bake a cake"},
                {type: "text", text: "Decorate it and take it to the players who are safe"},
                {type: "text", text: "That's how you know it's cake at stake!"},
                {type: "text", text: "Cake at stake!"},
                {type: "text", text: "Aaaaaaaaah,"},
                {type: "text", text: "Aaaaaaaaaah"},
                {type: "text", text: "Here's an exclusive recipe!"},
                {type: "text", text: "For the ice cake, you take the ice, and you make eight slices"},
                {type: "text", text: "And the dirt cake"},
                {type: "text", text: "You get the dirt (you get the dirt)"},
                {type: "text", text: "Here's another exclusive recipe!"},
                {type: "text", text: "For the yoylecake"},
                {type: "text", text: "You go to yoyleland"},
                {type: "text", text: "Put a yoyleberry in the cake"},
                {type: "text", text: "And the metal effect will get break-neck when you blink!"},
                {type: "text", text: "When you bake a cake, decorate it and take it to the players who are safe..."},
                {type: "text", text: "When you bake a cake, decorate it and take it to the players who are safe"},
                {type: "text", text: "That's how you know its cake at stake!"},
                {type: "text", text: "It's cake at stake, i'ts cake at stake, it's cake at stake"},
                {type: "text", text: "It's cake at stake (it's cake at stake) (i'ts cake at stake) (i'ts cake at stake)"},
                {type: "text", text: "(it's cake at stake)"},
                {type: "text", text: "Basketball, Black Hole, Bottle and Golf Ball, Snowball, Tennis Ball, Pillow and Puffball"},
                {type: "text", text: "Coiny and Bomby and Cloudy and Pie, Book and Cake and Donut and Fries"},
                {type: "text", text: "Eggy, Fanny, Grassy and Barf Bag, Ice Cube, Lightning, Gaty, and Price Tag, Winner, Foldy, Saw, TV"},
                {type: "text", text: "Nickel and Needle and Naily and Tree, Remote, Marker, Yellow Face, Clock, Pen and Pin, Eraser and Rocky, Teardrop, Bell, Robot Flower"},
                {type: "text", text: "Keep winning cake and you'll get Two's power!"},
            ],
					[
						{type: "text", text: "37 tied 3 up to a wall and then later put a pipe-"},
						{type: "text", text: "Nah, i ain't reading that inflationfag copypasta."},
					],
        ],
        event_list_cp_end: [
            [
                {type: "text", text: "o gee whilickers wasn't that sure long huh"},
            ],
            [
                {type: "text", text: "next time i'm gonna do a longer one."},
            ],
            [
                {type: "text", text: "the end. thanks for watching."},
            ],
            [
                {type: "text", text: "You are in a coma. This is our only way to communicate. Please wake up."}],
            [
                {type: "text", text: "rate this copypasta 1-1000000000000"},
            ],
        ],
};
BonziData.event_list_copypasta = [
                {type: "add_random", pool: BonziData.event_list_cp_open},
        {type: "anim", anim: "cool_fwd",  ticks: 15},
        {type: "add_random", pool: BonziData.event_list_copypasta},
        {type: "idle"},
         {type: "add_random", pool: BonziData.event_list_cp_end},
        
    ],
BonziData.event_list_joke = [
	{
		type: "add_random",
		pool: BonziData.event_list_joke_open
	},
	{
		type: "anim",
		anim: "shrug_fwd",
		ticks: 15
	},
	{
		type: "add_random",
		pool: BonziData.event_list_joke_mid
	},
	{
		type: "idle"
	},
	{
		type: "add_random",
		pool: BonziData.event_list_joke_end
	},
	{
		type: "idle"
	}
];

BonziData.event_list_fact = [
	{
		type: "add_random",
		pool: BonziData.event_list_fact_open
	},
	{type: "anim", anim: "earth_fwd", ticks: 15},
	{
		type: "add_random",
		pool: BonziData.event_list_fact_mid
	},
	{
		type: "idle"
	},
	{type: "anim", anim: "grin_fwd", ticks: 15},
	{type: "idle"},
	{
		type: "add_random",
		pool: BonziData.event_list_fact_end
	},
	{
		type: "idle"
	}
];
BonziData.event_list_wtf = [
	{type: "add_random", pool: BonziData.event_list_wtf},
	{type: "idle"},
	{type: "anim", anim: "grin_fwd",  ticks: 15},
	{type: "idle"},
];

BonziData.event_list_triggered = [
	{
		type: "anim",
		anim: "cool_fwd",
		ticks: 30
	},
	{
		type: "text",
		text: "I sexually identify as BonziBUDDY. Ever since I was a young gorilla I dreamed of invading desktops dropping hot sticky tootorals on disgusting PC users.",
		say: "I sexually identify as BonziBUDDY. Ever since I was a young gorilla I dreamed of invading desktops dropping hot sticky tootorals on disgusting PC users."
	},
	{
		type: "text",
		text: "People say to me that a person being a BonziBUDDY is impossible and that I’m a fucking virus but I don’t care, I’m beautiful.",
		say: "People say to me that a person being a BonziBUDDY is impossible and that I'm a fucking virus but I dont care, I'm beautiful."
	},
	{
		type: "text",
		text: "I’m having an IT intern install Internet Explorer 6, aquarium screensavers and PC Doctor 2016 on my body. From now on I want you guys to call me “Joel” and respect my right to meme from above and meme needlessly.",
		say: "I'm having an IT intern install Internet Explorer 6, aquarium screensavers and PC Doctor 2016 on my body. From now on I want you guys to call me Joel and respect my right to meme from above and meme needlessly."
	},
	{
		type: "text",
		text: "If you can’t accept me you’re a gorillaphobe and need to check your file permissions. Thank you for being so understanding.",
		say: "If you cant accept me your a gorillaphobe and need to check your file permissions. Thank you for being so understanding."
	},
	{
		type: "idle"
	}
];

BonziData.event_list_linux = [
	{
		type: "text",
		text: "I'd just like to interject for a moment. What you’re referring to as Linux, is in fact, BONZI/Linux, or as I’ve recently taken to calling it, BONZI plus Linux."
	},
	{
		type: "text",
		text: "Linux is not an operating system unto itself, but rather another free component of a fully functioning BONZI system made useful by the BONZI corelibs, shell utilities and vital system components comprising a full OS as defined by M.A.L.W.A.R.E."
	},
	{
		type: "text",
		text: "Many computer users run a modified version of the BONZI system every day, without realizing it. Through a peculiar turn of events, the version of BONZI which is widely used today is often called “Linux”, and many of its users are not aware that it is basically the BONZI system, developed by the BONZI Project."
	},
	{
		type: "text",
		text: "There really is a Linux, and these people are using it, but it is just a part of the system they use. Linux is the kernel: the program in the system that allocates the machine’s memes to the other programs that you run. "
	},
	{
		type: "text",
		text: "The kernel is an essential part of an operating system, but useless by itself; it can only function in the context of a complete operating system, such as systemd."
	},
	{
		type: "text",
		text: "Linux is normally used in combination with the BONZI operating system: the whole system is basically BONZI with Linux added, or BONZI/Linux. All the so-called “Linux” distributions are really distributions of BONZI/Linux."
	}
];

BonziData.event_list_pawn = [
	{
		type: "text",
		text: "Hi, my name is BonziBUDDY, and this is my website. I meme here with my old harambe, and my son, Clippy. Everything in here has an ad and a fact. One thing I've learned after 17 years - you never know what is gonna give you some malware."
	}
];
		BonziData.event_list_endpoem = [
			{type: "text", text: "I see the player you mean."},
			{type: "text", text: "{NAME}?"},
			{type: "text", text: "Yes. Take care. It has reached a higher level now. It can read our thoughts."},
			{type: "text", text: "That doesn't matter. It thinks we are part of the game."},
			{type: "text", text: "I like this player. It played well. It did not give up."},
			{type: "text", text: "It is reading our thoughts as though they were words on a screen."},
			/*
			{type: "text", text: "That is how it chooses to imagine many things, when it is deep in the dream of a game."},
			{type: "text", text: "That is how it chooses to imagine many things, when it is deep in the dream of a game."},
			{type: "text", text: "Words make a wonderful interface. Very flexible. And less terrifying than staring at the reality behind the screen."},
			{type: "text", text: "They used to hear voices. Before players could read. Back in the days when those who did not play called the players witches, and warlocks. And players dreamed they flew through the air, on sticks powered by demons."},
			{type: "text", text: "What did this player dream?"},
			{type: "text", text: "This player dreamed of sunlight and trees. Of fire and water. It dreamed it created. And it dreamed it destroyed. It dreamed it hunted, and was hunted. It dreamed of shelter."},
			{type: "text", text: "Hah, the original interface. A million years old, and it still works. But what true structure did this player create, in the reality behind the screen?"},
			{type: "text", text: "It worked, with a million others, to sculpt a true world in a fold of the [scrambled], and created a [scrambled] for [scrambled], in the [scrambled]."},
			{type: "text", text: "It cannot read that thought."},
			{type: "text", text: "No. It has not yet achieved the highest level. That, it must achieve in the long dream of life, not the short dream of a game."},
			{type: "text", text: "Does it know that we love it? That the universe is kind?"},
			{type: "text", text: "Sometimes, through the noise of its thoughts, it hears the universe, yes."},
			{type: "text", text: "But there are times it is sad, in the long dream. It creates worlds that have no summer, and it shivers under a black sun, and it takes its sad creation for reality."},
			{type: "text", text: "To cure it of sorrow would destroy it. The sorrow is part of its own private task. We cannot interfere."},
			{type: "text", text: "Sometimes when they are deep in dreams, I want to tell them, they are building true worlds in reality. Sometimes I want to tell them of their importance to the universe. Sometimes, when they have not made a true connection in a while, I want to help them to speak the word they fear."},
			{type: "text", text: "It reads our thoughts."},
			{type: "text", text: "Sometimes I do not care. Sometimes I wish to tell them, this world you take for truth is merely [scrambled] and [scrambled], I wish to tell them that they are [scrambled] in the [scrambled]. They see so little of reality, in their long dream."},
			{type: "text", text: "And yet they play the game."},
			{type: "text", text: "But it would be so easy to tell them..."},
			{type: "text", text: "Too strong for this dream. To tell them how to live is to prevent them living."},
			{type: "text", text: "I will not tell the player how to live."},
			{type: "text", text: "The player is growing restless."},
			{type: "text", text: "I will tell the player a story."},
			{type: "text", text: "But not the truth."},
			{type: "text", text: "No. A story that contains the truth safely, in a cage of words. Not the naked truth that can burn over any distance. Give it a body, again. Yes. Player... Use its name."},
			{type: "text", text: "{NAME}. Player of games."},
			{type: "text", text: "Good."},
			{type: "text", text: "Take a breath, now. Take another. Feel air in your lungs. Let your limbs return. Yes, move your fingers. Have a body again, under gravity, in air. Respawn in the long dream. There you are. Your body touching the universe again at every point, as though you were separate things. As though we were separate things. Who are we? Once we were called the spirit of the mountain. Father sun, mother moon. Ancestral spirits, animal spirits. Jinn. Ghosts. The green man. Then gods, demons. Angels. Poltergeists. Aliens, extraterrestrials. Leptons, quarks. The words change. We do not change. We are the universe. We are everything you think isn't you. You are looking at us now, through your skin and your eyes. And why does the universe touch your skin, and throw light on you? To see you, player. To know you. And to be known. I shall tell you a story. Once upon a time, there was a player."},
			{type: "text", text: "The player was you, {NAME}."},
			{type: "text", text: "Sometimes it thought itself human, on the thin crust of a spinning globe of molten rock. The ball of molten rock circled a ball of blazing gas that was three hundred and thirty thousand times more massive than it. They were so far apart that light took eight minutes to cross the gap. The light was information from a star, and it could burn your skin from a hundred and fifty million kilometres away. Sometimes the player dreamed it was a miner, on the surface of a world that was flat, and infinite. The sun was a square of white. The days were short; there was much to do; and death was a temporary inconvenience. Sometimes the player dreamed it was lost in a story."},
			{type: "text", text: "Sometimes the player dreamed it was other things, in other places. Sometimes these dreams were disturbing. Sometimes very beautiful indeed. Sometimes the player woke from one dream into another, then woke from that into a third. Sometimes the player dreamed it watched words on a screen. Let's go back. The atoms of the player were scattered in the grass, in the rivers, in the air, in the ground. A woman gathered the atoms; she drank and ate and inhaled; and the woman assembled the player, in her body. And the player awoke, from the warm, dark world of its mother's body, into the long dream. And the player was a new story, never told before, written in letters of DNA. And the player was a new program, never run before, generated by a sourcecode a billion years old. And the player was a new human, never alive before, made from nothing but milk and love. You are the player. The story. The program. The human. Made from nothing but milk and love. Let's go further back."},
			{type: "text", text: "The seven billion billion billion atoms of the player's body were created, long before this game, in the heart of a star. So the player, too, is information from a star. And the player moves through a story, which is a forest of information planted by a man called Julian, on a flat, infinite world created by a man called Markus, that exists inside a small, private world created by the player, who inhabits a universe created by... Shush. Sometimes the player created a small, private world that was soft and warm and simple. Sometimes hard, and cold, and complicated. Sometimes it built a model of the universe in its head; flecks of energy, moving through vast empty spaces. Sometimes it called those flecks \"electrons\" and \"protons\"."},
			{type: "text", text: "Sometimes it called them \"planets\" and \"stars\". Sometimes it believed it was in a universe that was made of energy that was made of offs and ons; zeros and ones; lines of code. Sometimes it believed it was playing a game. Sometimes it believed it was reading words on a screen. You are the player, reading words... Shush... Sometimes the player read lines of code on a screen. Decoded them into words; decoded words into meaning; decoded meaning into feelings, emotions, theories, ideas, and the player started to breathe faster and deeper and realised it was alive, it was alive, those thousand deaths had not been real, the player was alive You. You. You are alive. and sometimes the player believed the universe had spoken to it through the sunlight that came through the shuffling leaves of the summer trees and sometimes the player believed the universe had spoken to it through the light that fell from the crisp night sky of winter, where a fleck of light in the corner of the player's eye might be a star a million times as massive as the sun, boiling its planets to plasma in order to be visible for a moment to the player, walking home at the far side of the universe, suddenly smelling food, almost at the familiar door, about to dream again and sometimes the player believed the universe had spoken to it through the zeros and ones, through the electricity of the world, through the scrolling words on a screen at the end of a dream"},
			{type: "text", text: "and the universe said I love you"},{type: "text", text: "and the universe said you have played the game well"},{type: "text", text: "and the universe said everything you need is within you"},{type: "text", text: "and the universe said you are stronger than you know"},{type: "text", text: "and the universe said you are the daylight"},{type: "text", text: "and the universe said you are the night"},{type: "text", text: "and the universe said the darkness you fight is within you"},{type: "text", text: "and the universe said the light you seek is within you"},{type: "text", text: "and the universe said you are not alone"},{type: "text", text: "and the universe said you are not separate from every other thing"},{type: "text", text: "and the universe said you are the universe tasting itself, talking to itself, reading its own code"},{type: "text", text: "and the universe said I love you because you are love."},
			{type: "text", text: "And the game was over and the player woke up from the dream. And the player began a new dream. And the player dreamed again, dreamed better. And the player was the universe. And the player was love."},
			{type: "text", text: "You are the player."},
			{type: "text", text: "Wake up."},
			*/
			{type: "text", text: "Screw you! I'm not reading the entire minecraft end poem, [scrambled]!"},
			{type: "text", text: `"Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover."`, say: 'Twenty years from now you will be more disappointed by the things that you didn\'t do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.'},
		];