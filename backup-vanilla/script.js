// Trail data in both languages
const trailData = {
    en: [
        {
            no: "1",
            name: "Visitor Center – <strong>Kong Kaew Waterfall</strong> Trail",
            distance: "~1.2 km (loop), 45–60 minutes",
            selfGuided: '<span class="badge-easy">✅ No guide needed</span>',
            startEnd: "Start: Behind Visitor Center suspension bridge (ample parking)<br>End: Return to same Visitor Center location",
            highlights: "Close-up tropical rainforest + dry evergreen forest, agarwood trees, gibbon calls, birdwatching; endpoint small Kong Kaew waterfall + suspension bridge photo spot.",
            rating: '<div class="rating">★★★★★<br><small>Easiest parking + route</small></div>'
        },
        {
            no: "2",
            name: "<strong>Pha Kluai Mai Campground – Haew Suwat Waterfall</strong> Trail<br><small>160th Anniversary Thai‑German Friendship Trail</small>",
            distance: "~3 km one way, ~2 hours",
            selfGuided: '<span class="badge-easy">✅ Self-walkable</span>',
            startEnd: "Start: Pha Kluai Mai campground parking<br>End: Haew Suwat waterfall main parking (parking available at both ends)",
            highlights: "Along Lam Takhong stream, via Pha Kluai Mai small waterfall, bamboo forest + rainforest atmosphere; endpoint Haew Suwat waterfall from 'The Beach' movie.",
            rating: '<div class="rating">★★★★☆<br><small>Easy parking both ends, need shuttle planning</small></div>'
        },
        {
            no: "3",
            name: "<strong>Km 33 – Nong Pak Chi</strong> Trail<br><small>90th Anniversary Thai‑Switzerland Friendship Trail</small>",
            distance: "~3.3–4.2 km one way, 2.5–3 hours",
            selfGuided: '<span class="badge-guide">❌ Guide required</span>',
            startEnd: "Start: Road marker Km 33 entrance (roadside parking)<br>End: Km 35, near Nong Pak Chi Observation Tower (usually picked up by guide vehicle)",
            highlights: "Through mature dry forest, secondary forest and grasslands, popular wildlife viewing: elephants, gaur, gibbons, hornbills; final Nong Pak Chi observation tower overlooking grasslands + pond.",
            rating: '<div class="rating">★★★☆☆<br><small>Guide + shuttle required, but fun for drivers</small></div>'
        },
        {
            no: "4",
            name: "<strong>Dong Tiw – Sai Sorn Reservoir</strong> Trail",
            distance: "~2.7–2.8 km one way, 1.5–2 hours",
            selfGuided: '<span class="badge-guide">❌ Guide required</span>',
            startEnd: "Start: Thanarat Road roadside (~200m west of Visitor Center, near Sai Sorn)<br>End: Sai Sorn Reservoir viewpoint (parking available, famous sunrise/sunset spot)",
            highlights: "Through dry evergreen and secondary forests, deer, monkeys and birds along the way; endpoint Sai Sorn reservoir classic sunrise/sunset viewpoint.",
            rating: '<div class="rating">★★★★☆<br><small>One-end parking + guide shuttle to other start</small></div>'
        },
        {
            no: "5",
            name: "<strong>Dong Tiw – Nong Pak Chi</strong> Trail",
            distance: "~5.5 km one way, ~3 hours",
            selfGuided: '<span class="badge-guide">❌ Guide required</span>',
            startEnd: "Start: Same location as Trail 4 (Thanarat Road roadside, near Visitor Center)<br>End: Km 35, near Nong Pak Chi Observation Tower (usually picked up by guide vehicle)",
            highlights: "Alternating dry forest, secondary forest and grasslands, century-old banyan trees, rainy season mushrooms; elephant, black bear, hornbill, gibbon foraging area, final section connects to Nong Pak Chi observation tower.",
            rating: '<div class="rating">★★★☆☆<br><small>Longer distance, shuttle arrangement needed</small></div>'
        },
        {
            no: "6",
            name: "Visitor Center – <strong>Haew Suwat Waterfall</strong> Trail",
            distance: "~8 km one way, ~6 hours",
            selfGuided: '<span class="badge-guide">❌ Guide required (long trail)</span>',
            startEnd: "Start: Behind Visitor Center suspension bridge<br>End: Haew Suwat waterfall parking (parking at both ends, usually park at one end, guide shuttle to other start)",
            highlights: "Through rainforest, dry forest and bamboo forest, precious tree species and ferns along the way; frequent elephant, gibbon, black bear, hornbill activity, 'full-day jungle deep trail', ending at Haew Suwat waterfall.",
            rating: '<div class="rating">★★★☆☆<br><small>Longest trail, needs full day + shuttle</small></div>'
        },
        {
            no: "7",
            name: "<strong>Sai Sorn Reservoir Nature Trail</strong><br><small>Thai‑American Friendship Trail</small>",
            distance: "~1.9–2 km around lake, 45–90 minutes",
            selfGuided: '<span class="badge-easy">✅ Self-walkable</span>',
            startEnd: "Start: Sai Sorn Reservoir parking<br>End: Complete loop back to same parking",
            highlights: "Around Sai Sorn reservoir highlands, overlooking reservoir and mountain views, popular easy trail for sunrise/sunset viewing, reflections, and birdwatching.",
            rating: '<div class="rating">★★★★★<br><small>Most stress-free driving + beautiful scenery</small></div>'
        }
    ],
    zh: [
        {
            no: "1",
            name: "Visitor Center – <strong>Kong Kaew Waterfall</strong> Trail",
            distance: "約 1.2 km（環狀），45–60 分鐘",
            selfGuided: '<span class="badge-easy">✅ 無需嚮導</span>',
            startEnd: "起：Visitor Center 後方吊橋（大量車位）<br>終：回到 Visitor Center 同一位置",
            highlights: "近距離熱帶雨林＋乾性常綠林、沉香樹、長臂猿叫聲、觀鳥；終點小巧的 Kong Kaew 瀑布＋吊橋影相位。",
            rating: '<div class="rating">★★★★★<br><small>泊車＋路線最無腦</small></div>'
        },
        {
            no: "2",
            name: "<strong>Pha Kluai Mai Campground – Haew Suwat Waterfall</strong> Trail<br><small>160th Anniversary Thai‑German Friendship Trail</small>",
            distance: "約 3 km 單程，約 2 小時",
            selfGuided: '<span class="badge-easy">✅ 可自行走</span>',
            startEnd: "起：Pha Kluai Mai 露營地停車場<br>終：Haew Suwat 瀑布大停車場（兩端都有停車位）",
            highlights: "沿 Lam Takhong 溪流走，經 Pha Kluai Mai 小瀑布，竹林＋雨林氣氛；終點 Haew Suwat 瀑布係《The Beach》電影取景。",
            rating: '<div class="rating">★★★★☆<br><small>兩端易泊，單程要諗接駁</small></div>'
        },
        {
            no: "3",
            name: "<strong>Km 33 – Nong Pak Chi</strong> Trail<br><small>90th Anniversary Thai‑Switzerland Friendship Trail</small>",
            distance: "約 3.3–4.2 km 單程，2.5–3 小時",
            selfGuided: '<span class="badge-guide">❌ 必須嚮導</span>',
            startEnd: "起：公路公里牌 Km 33 旁入口（可路邊泊車）<br>終：Km 35，近 Nong Pak Chi Observation Tower（通常由嚮導車接走）",
            highlights: "穿成熟乾林、次生林及大草原，是看野生動物熱門線：大象、野牛、長臂猿、犀鳥等；最後上 Nong Pak Chi 觀景塔睇草原＋水塘。",
            rating: '<div class="rating">★★★☆☆<br><small>必須嚮導＋接送，但自駕好玩</small></div>'
        },
        {
            no: "4",
            name: "<strong>Dong Tiw – Sai Sorn Reservoir</strong> Trail",
            distance: "約 2.7–2.8 km 單程，1.5–2 小時",
            selfGuided: '<span class="badge-guide">❌ 必須嚮導</span>',
            startEnd: "起：Thanarat Road 路邊（Visitor Center 西面約 200 m，近 Sai Sorn）<br>終：Sai Sorn Reservoir 觀景點（有停車場，日出／日落名點）",
            highlights: "行經乾性常綠林與次生林，途中有鹿、猴子與鳥類；終點 Sai Sorn 水庫係日出／日落經典景點。",
            rating: '<div class="rating">★★★★☆<br><small>一端泊車＋嚮導車送另一端起步</small></div>'
        },
        {
            no: "5",
            name: "<strong>Dong Tiw – Nong Pak Chi</strong> Trail",
            distance: "約 5.5 km 單程，約 3 小時",
            selfGuided: '<span class="badge-guide">❌ 必須嚮導</span>',
            startEnd: "起：與 Trail 4 同一位置（Thanarat Road 路邊、近 Visitor Center）<br>終：Km 35，近 Nong Pak Chi Observation Tower（通常由嚮導車接走）",
            highlights: "經乾林、次生林與草原交替，有百年大榕樹、雨季野菇；是大象、黑熊、犀鳥、長臂猿等覓食區，尾段連接 Nong Pak Chi 觀景塔。",
            rating: '<div class="rating">★★★☆☆<br><small>距離較長，必需接駁安排</small></div>'
        },
        {
            no: "6",
            name: "Visitor Center – <strong>Haew Suwat Waterfall</strong> Trail",
            distance: "約 8 km 單程，約 6 小時",
            selfGuided: '<span class="badge-guide">❌ 必須嚮導（長線）</span>',
            startEnd: "起：Visitor Center 後吊橋<br>終：Haew Suwat 瀑布停車場（兩端都可泊車，通常泊一端，由嚮導車送往另一端起步）",
            highlights: "穿過雨林、乾林與竹林，沿途有珍貴樹種與蕨類；大象、長臂猿、黑熊、犀鳥等活動頻繁，是「一日叢林深度線」，終點 Haew Suwat 瀑布收尾。",
            rating: '<div class="rating">★★★☆☆<br><small>最長線，需要一整日＋接駁</small></div>'
        },
        {
            no: "7",
            name: "<strong>Sai Sorn Reservoir Nature Trail</strong><br><small>Thai‑American Friendship Trail</small>",
            distance: "約 1.9–2 km 環湖，45–90 分鐘",
            selfGuided: '<span class="badge-easy">✅ 可自行走</span>',
            startEnd: "起：Sai Sorn Reservoir 停車場<br>終：環湖一圈回到同一停車場",
            highlights: "圍繞 Sai Sorn 水庫高地，可俯瞰水庫與山景，是睇日出／日落、影倒影、觀鳥的熱門輕鬆步道。",
            rating: '<div class="rating">★★★★★<br><small>自駕最無壓力＋景靚</small></div>'
        }
    ]
};

// Current language state
let currentLang = 'en';

// DOM elements
const langEnBtn = document.getElementById('lang-en');
const langZhBtn = document.getElementById('lang-zh');
const trailTableBody = document.getElementById('trail-data');

// Language switching functionality
function switchLanguage(lang) {
    currentLang = lang;
    
    // Update HTML lang attribute
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-TW';
    
    // Update button states
    langEnBtn.classList.toggle('active', lang === 'en');
    langZhBtn.classList.toggle('active', lang === 'zh');
    
    // Update all text elements
    const elements = document.querySelectorAll('[data-en][data-zh]');
    elements.forEach(element => {
        const newText = element.getAttribute(`data-${lang}`);
        element.textContent = newText;
        element.lang = lang === 'en' ? 'en' : 'zh-TW';
    });
    
    // Update page title
    const title = lang === 'en' 
        ? 'Oh! A Non-Professional Traveller LOL - Khao Yai National Park Hiking Guide'
        : '非專業旅人冒險 - 考艾國家公園健行指南';
    document.title = title;
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        const description = lang === 'en'
            ? 'Complete hiking guide to Khao Yai National Park trails with detailed information on 7 major routes, difficulty levels, and wildlife viewing opportunities.'
            : '考艾國家公園完整健行指南，包含7條主要步道詳細資訊，難度等級及野生動物觀察機會。';
        metaDesc.content = description;
    }
    
    // Update trail table
    updateTrailTable();
}

// Update trail table with current language data
function updateTrailTable() {
    const data = trailData[currentLang];
    trailTableBody.innerHTML = '';
    
    data.forEach(trail => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${trail.no}</td>
            <td>${trail.name}</td>
            <td>${trail.distance}</td>
            <td>${trail.selfGuided}</td>
            <td>${trail.startEnd}</td>
            <td>${trail.highlights}</td>
            <td>${trail.rating}</td>
        `;
        trailTableBody.appendChild(row);
    });
}

// Event listeners
langEnBtn.addEventListener('click', () => switchLanguage('en'));
langZhBtn.addEventListener('click', () => switchLanguage('zh'));

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    updateTrailTable();
});

// Smooth scrolling for any future navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});