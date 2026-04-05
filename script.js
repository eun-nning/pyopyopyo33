// 상태
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let currentView = "all";
let currentTag = null;

// 초성
function getChosung(text) {
  const chosung = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  return text.split("").map(char => {
    const code = char.charCodeAt(0) - 44032;
    if (code >= 0 && code <= 11171) return chosung[Math.floor(code / 588)];
    return char;
  }).join("");
}

// 정규화
function normalize(text) {
  return text.toLowerCase().replace(/\s+/g,"").replace(/[^a-z0-9가-힣ㄱ-ㅎ]/g,"");
}

// 데이터 (🔥 id 추가 필수)
const songs = [
  {
    id: 1,

    title: "내일이 오면",
    titleAlt: [],

    mainArtist: ["릴보이"],
    mainArtistAlt: ["lIlBOI"],

    featArtist: ["기리보이","BIG Naughty"],
    featArtistAlt: ["서동현","빅나티"],

    date: "2025-12-21",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/181331643?change_second=4934"
  },
  {
    id: 2,

    title: "혼모노",
    titleAlt: ["Honmono"],

    mainArtist: ["키드밀리"],
    mainArtistAlt: ["Kid milli"],

    featArtist: ["블랙넛"],
    featArtistAlt: ["Black Nut"],

    date: "2025-12-21",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/181331643?change_second=5574"
  },
  {
    id: 3,

    title: "OHAYO MY NIGHT",
    titleAlt: ["오하요 마이 나이트","오하요 마이 나잇트"],

    mainArtist: ["디핵","PATEKO"],
    mainArtistAlt: ["D-Hack","파테코","파태코"],

    featArtist: [],
    featArtistAlt: [],

    date: "2025-12-21",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/181331643?change_second=9643"
  },
  {
    id: 4,

    title: "에피소드",
    titleAlt: ["episode"],

    mainArtist: ["이무진"],
    mainArtistAlt: [],

    featArtist: [],
    featArtistAlt: [],

    date: "2025-12-21",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/181331643?change_second=11013"
  },
  {
    id: 5,

    title: "나무",
    titleAlt: [],

    mainArtist: ["카더가든"],
    mainArtistAlt: ["car the garden","칼든강도"],

    featArtist: [],
    featArtistAlt: [],

    date: "2025-12-23",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/181565971?change_second=23002"
  },
  {
    id: 6,

    title: "내일이 오면",
    titleAlt: [],

    mainArtist: ["릴보이"],
    mainArtistAlt: ["lIlBOI"],

    featArtist: ["기리보이","BIG Naughty"],
    featArtistAlt: ["서동현","빅나티"],

    date: "2025-12-23",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/181565971?change_second=26867"
  },
  {
    id: 7,

    title: "쉬어",
    titleAlt: [],

    mainArtist: ["아넌딜라이트","unofficialboyy","BE'O","지구인","mudd the student"],
    mainArtistAlt: ["Anandekight","언오피셜보이","비오","geegooin","머드 더 스튜던트"],

    featArtist: ["MINO"],
    featArtistAlt: ["송민호","미노","송미노"],

    date: "2025-12-23",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/181565971?change_second=27312"
  },
  {
    id: 8,

    title: "존시나",
    titleAlt: [],

    mainArtist: ["염따"],
    mainArtistAlt: [],

    featArtist: ["Northfacegawd","저스디스","래원"],
    featArtistAlt: ["노스페이스갓","justhis","Layone"],

    date: "2025-12-23",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/181565971?change_second=27925"
  },
  {
    id: 9,

    title: "Supernova",
    titleAlt: ["슈퍼노바", "수퍼노바"],

    mainArtist: ["aespa"],
    mainArtistAlt: ["에스파"],

    featArtist: [],
    featArtistAlt: [],

    date: "2025-12-25",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/181785091?change_second=13688"
  },
  {
    id: 10,

    title: "서랍",
    titleAlt: ["Drawer"],

    mainArtist: ["10cm"],
    mainArtistAlt: ["십센치","10센치"],

    featArtist: [],
    featArtistAlt: [],

    date: "2025-12-25",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/181785091?change_second=14074"
  },
  {
    id: 11,

    title: "징글벨",
    titleAlt: ["캐롤","Jingle Bells"],

    mainArtist: ["james Pieront"],
    mainArtistAlt: ["제임스 피어폰트"],

    featArtist: [],
    featArtistAlt: [],

    date: "2025-12-25",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/181785091?change_second=14396"
  },
  {
    id: 12,
    
    title: "모찌송",
    titleAlt: [],

    mainArtist: ["모찌 멜로디"],
    mainArtistAlt: ["Mozzi Melody"],

    featArtist: [],
    featArtistAlt: [],

    date: "2025-12-25",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/181785091?change_second=14870"
  },
  {
    id: 13,

    title: "애상",
    titleAlt: [],

    mainArtist: ["쿨"],
    mainArtistAlt: ["COOL"],

    featArtist: [],
    featArtistAlt: [],

    date: "2025-12-25",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/181785091?change_second=15172"
  },
  {
    id: 14,
    
    title: "Ditto",
    titleAlt: ["디토"],

    mainArtist: ["뉴진스"],
    mainArtistAlt: ["newjeans"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-12",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/186705799?change_second=34435"
  },
  {
    id: 15,
    
    title: "Ditto",
    titleAlt: ["디토"],

    mainArtist: ["뉴진스"],
    mainArtistAlt: ["newjeans"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=4753"
  },
  {
    id: 16,
    
    title: "홍연",
    titleAlt: [],

    mainArtist: ["안예은"],
    mainArtistAlt: [],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=5053"
  },
  {
    id: 17,
    
    title: "곡예사",
    titleAlt: [],

    mainArtist: ["조광일"],
    mainArtistAlt: [],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.com/player/187023883?change_second=5463"
  },
  {
    id: 18,
    
    title: "one of them",
    titleAlt: ["원오브댐", "원오브뎀"],

    mainArtist: ["허클베리피"],
    mainArtistAlt: ["Huckleberry P"],

    featArtist: ["저스디스","EK"],
    featArtistAlt: ["justhis","이케이"],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=5702"
  },
  {
    id: 19,

    title: "selfmade orange",
    titleAlt: ["셀메이드 오렌지", "셀프메이드 오렌지"],

    mainArtist: ["창모"],
    mainArtistAlt: [],

    featArtist: ["SUPERBEE"],
    featArtistAlt: ["수퍼비","슈퍼비"],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=6102"
  },
  {
    id: 20,
    
    title: "수퍼비와",
    titleAlt: [],

    mainArtist: ["SUPERBEE"],
    mainArtistAlt: ["수퍼비","슈퍼비"],

    featArtist: ["비와이"],
    featArtistAlt: ["BewhY"],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=6593"
  },
  {
    id: 21,

    title: "UNFORGIVEN",
    titleAlt: ["언포기븐","언폴기븐"],

    mainArtist: ["LE SSERAFIM"],
    mainArtistAlt: ["르세라핌"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=6995"
  },
  {
    id: 22,
    
    title: "OHAYO MY NIGHT",
    titleAlt: ["오하요 마이 나이트","오하요 마이 나잇트"],

    mainArtist: ["디핵","PATEKO"],
    mainArtistAlt: ["D-Hack","파테코","파태코"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=7250"
  },
  {
    id: 23,
    
    title: "Oscar",
    titleAlt: ["오스카","오스칼"],

    mainArtist: ["pH-1", "Gsoul", "BIG Naughty", "JAY PARK"],
    mainArtistAlt: ["피에이치원","지소울","빅나티","서동현","제이팍","재이팍","박재범"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=7537"
  },
  {
    id: 24,
    
    title: "원효대사",
    titleAlt: [],

    mainArtist: ["래원"],
    mainArtistAlt: ["레원","Layone"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=8015"
  },
  {
    id: 25,
    
    title: "둥지",
    titleAlt: [],

    mainArtist: ["남진"],
    mainArtistAlt: [],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=8201"
  },
  {
    id: 26,
    
    title: "나무",
    titleAlt: [],

    mainArtist: ["카더가든"],
    mainArtistAlt: ["car the garden","칼든강도"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=8713"
  },
  {
    id: 27,
    
    title: "사랑하게 될 거야",
    titleAlt: [],

    mainArtist: ["한로로"],
    mainArtistAlt: ["HANRORO"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=8950"
  },
  {
    id: 28,
    
    title: "내일이 오면",
    titleAlt: [],

    mainArtist: ["릴보이"],
    mainArtistAlt: ["lIlBOI"],

    featArtist: ["기리보이","BIG Naughty"],
    featArtistAlt: ["서동현","빅나티"],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=9349"
  },
  {
    id: 29,
    
    title: "우주를 줄게",
    titleAlt: ["galaxy"],

    mainArtist: ["볼빨간사춘기"],
    mainArtistAlt: ["볼사","BOL4"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=9663"
  },
  {
    id: 30,
    
    title: "좋다고 말해",
    titleAlt: [],

    mainArtist: ["볼빨간사춘기"],
    mainArtistAlt: ["볼사","BOL4"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=9901"
  },
  {
    id: 31,
    
    title: "폰서트",
    titleAlt: ["Phonecert"],

    mainArtist: ["10cm"],
    mainArtistAlt: ["십센치","10센치"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=10106"
  },
  {
    id: 32,
    
    title: "눈,코,입",
    titleAlt: ["EYES,NOSE,LIPS"],

    mainArtist: ["태양"],
    mainArtistAlt: ["TAEYANG"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=10431"
  },
  {
    id: 33,
    
    title: "시차",
    titleAlt: ["We Are"],

    mainArtist: ["우원재"],
    mainArtistAlt: [],

    featArtist: ["로꼬","GRAY"],
    featArtistAlt: ["그레이","그래이"],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=10698"
  },
  {
    id: 34,

    title: "죽일 놈",
    titleAlt: ["Guilty"],

    mainArtist: ["다이나믹 듀오"],
    mainArtistAlt: ["다듀","Dynamicduo"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=10936"
  },
  {
    id: 35,
    
    title: "사건의 지평선",
    titleAlt: ["Event Horizon"],

    mainArtist: ["윤하"],
    mainArtistAlt: ["younha"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=11169"
  },
  {
    id: 36,
    
    title: "오르트구름",
    titleAlt: ["오트르구름","Oort Cloud"],

    mainArtist: ["윤하"],
    mainArtistAlt: ["younha"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=11478"
  },
  {
    id: 37,
    
    title: "거리에서",
    titleAlt: [],

    mainArtist: ["릴러말즈"],
    mainArtistAlt: ["Leellamarz"],

    featArtist: ["ASH ISLAND"],
    featArtistAlt: ["애쉬 아일랜드","에쉬 아일랜드"],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=11609"
  },
  {
    id: 38,

    title: "빡",
    titleAlt: [],

    mainArtist: ["던말릭"],
    mainArtistAlt: ["DON MALIK"],

    featArtist: ["팔로알토","저스디스"],
    featArtistAlt: ["Paloalto","justhis"],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=12000"
  },
  {
    id: 39,
    
    title: "My Way",
    titleAlt: ["마이웨이"],

    mainArtist: ["던말릭","허성현","KHAN","맥대디","Los"],
    mainArtistAlt: ["DON MALIK","Huh","Mckdaddy",'칸',"로스"],

    featArtist: ["저스디스"],
    featArtistAlt: ["justhis"],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=26845"
  },
  {
    id: 40,
    
    title: "Chosen 1",
    titleAlt: [],

    mainArtist: ["블라세"],
    mainArtistAlt: ["Blase"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-15",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187023883?change_second=27382"
  },
  {
    id: 41,
    
    title: "첫사랑",
    titleAlt: [],

    mainArtist: ["백아"],
    mainArtistAlt: [],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-23",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187796673?change_second=23357"
  },
  {
    id: 42,
    
    title: "밤하늘의 별을",
    titleAlt: ["밤하늘의 별을"],

    mainArtist: ["경서"],
    mainArtistAlt: [],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-23",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187796673?change_second=23926"
  },
  {
    id: 43,
    
    title: "0+0",
    titleAlt: ["00"],

    mainArtist: ["한로로"],
    mainArtistAlt: [],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-23",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187796673?change_second=24226"
  },
  {
    id: 44,
    
    title: "사건의 지평선",
    titleAlt: ["Event Horizon"],

    mainArtist: ["윤하"],
    mainArtistAlt: ["younha"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-23",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187796673?change_second=24572"
  },
  {
    id: 45,
    
    title: "Magnetic",
    titleAlt: ["마그네틱"],

    mainArtist: ["ILLIT"],
    mainArtistAlt: ["아일릿"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-23",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187796673?change_second=25453"
  },
  {
    id: 46,
    
    title: "Stay",
    titleAlt: ["스테이","스태이"],

    mainArtist: ["The Kid LAROI","Justin Bieber"],
    mainArtistAlt: ["더 키드 라로이","저스틴비버"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-23",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187796673?change_second=26338"
  },
  {
    id: 47,
    
    title: "밤편지",
    titleAlt: [],

    mainArtist: ["IU"],
    mainArtistAlt: ["아이유"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-23",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187796673?change_second=26540"
  },
  {
    id: 48,
    
    title: "일과이분의일",
    titleAlt: [],

    mainArtist: ["츄"],
    mainArtistAlt: ["CHUU"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-02-23",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187796673?change_second=27015"
  },
  {
    id: 49,
    
    title: "붕붕",
    titleAlt: [],

    mainArtist: ["김하온"],
    mainArtistAlt: [],

    featArtist: ["Sik-K"],
    featArtistAlt: ["식케이","식캐이"],

    date: "2026-02-23",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187796673?change_second=27978"
  },
  {
    id: 50,
    
    title: "뿌리",
    titleAlt: [],

    mainArtist: ["쿤디판다"],
    mainArtistAlt: ["Khundi panda"],

    featArtist: ["저스디스"],
    featArtistAlt: ["justhis"],

    date: "2026-02-23",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187796673?change_second=28295"
  },
  {
    id: 51,
    
    title: "IndiGO",
    titleAlt: ["인디고"],

    mainArtist: ["저스디스","키드밀리","양홍원","NO:EL"],
    mainArtistAlt: ["justhis","Kid Milli","장용준","Young B"],

    featArtist: ["저스디스"],
    featArtistAlt: ["justhis"],

    date: "2026-02-23",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/187796673?change_second=28700"
  },
  {
    id: 52,
    
    title: "첫사랑",
    titleAlt: [],

    mainArtist: ["백아"],
    mainArtistAlt: [],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-03-13",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/189611109?change_second=9832"
  },
  {
    id: 53,
    
    title: "너를 생각해",
    titleAlt: [],

    mainArtist: ["경서","주시크"],
    mainArtistAlt: ["Joosiq"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-03-13",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/189611109?change_second=10474"
  },
  {
    id: 54,
    
    title: "위하여",
    titleAlt: ["We higher"],

    mainArtist: ["블라세","노윤하","polodared","칠린호미","플리키뱅"],
    mainArtistAlt: ["폴로다레드","blase","chillin Homie","Fleeky Bang"],

    featArtist: ["릴보이"],
    featArtistAlt: ["lilboi"],

    date: "2026-03-13",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/189611109?change_second=11126"
  },
  {
    id: 55,

    title: "혼모노",
    titleAlt: ["Honmono"],

    mainArtist: ["키드밀리"],
    mainArtistAlt: ["Kid milli"],

    featArtist: ["블랙넛"],
    featArtistAlt: ["Black Nut"],

    date: "2026-03-13",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/189611109?change_second=11891"
  },
  {
    id: 56,
    
    title: "수퍼비와",
    titleAlt: [],

    mainArtist: ["SUPERBEE"],
    mainArtistAlt: ["수퍼비","슈퍼비"],

    featArtist: ["비와이"],
    featArtistAlt: ["BewhY"],

    date: "2026-03-13",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/189611109?change_second=12221"
  },
  {
    id: 57,

    title: "love wins all",
    titleAlt: ["러브 윈즈 올","러브윈즈올"],

    mainArtist: ["IU"],
    mainArtistAlt: ["아이유"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-03-13",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/189611109?change_second=13247"
  },
  {
    id: 58,

    title: "내 손을 잡아",
    titleAlt: [],

    mainArtist: ["IU"],
    mainArtistAlt: ["아이유"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-03-13",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/189611109?change_second=13795"
  },
  {
    id: 59,
    title: "180도",
    titleAlt: ["백팔십도"],

    mainArtist: ["벤"],
    mainArtistAlt: ["Ben"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-03-13",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/189611109?change_second=14184"
  },
  {
    id: 60,
    
    title: "빌런",
    titleAlt: ["Villain"],

    mainArtist: ["스텔라장"],
    mainArtistAlt: ["stella jang"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-03-13",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/189611109?change_second=14741"
  }, 
  {
    id: 61,
    
    title: "만찬가",
    titleAlt: [],

    mainArtist: ["츠키"],
    mainArtistAlt: ["tuki"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-03-13",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/189611109?change_second=15197"
  },
  {
    id: 62,
    
    title: "사건의 지평선",
    titleAlt: ["Event Horizon"],

    mainArtist: ["윤하"],
    mainArtistAlt: ["younha"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-03-13",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/189611109?change_second=15588"
  },
  {
    id: 63,
    
    title: "business boy",
    titleAlt: ["비즈니스 보이","비지니스 보이"],

    mainArtist: ["허성현"],
    mainArtistAlt: ["Huh!"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-03-13",
    tag: "노래뱅",
    link: "https://vod.sooplive.co.kr/player/189611109?change_second=16301"
  },
  {
    id: 64,
    
    title: "혼모노",
    titleAlt: ["Honmono"],

    mainArtist: ["키드밀리"],
    mainArtistAlt: ["Kid milli"],

    featArtist: ["블랙넛"],
    featArtistAlt: ["Black Nut"],

    date: "2026-03-29",
    tag: "노래조각",
    link: "https://vod.sooplive.com/player/191208411?change_second=16888"
  },
  {
    id: 65,
    
    title: "혼모노",
    titleAlt: ["Honmono"],

    mainArtist: ["키드밀리"],
    mainArtistAlt: ["Kid milli"],

    featArtist: ["블랙넛"],
    featArtistAlt: ["Black Nut"],

    date: "2026-03-29",
    tag: "노래조각",
    link: "https://vod.sooplive.com/player/191208411?change_second=38864"
  },
  {
    id: 66,
    
    title: "사랑하게 될 거야",
    titleAlt: [],

    mainArtist: ["한로로"],
    mainArtistAlt: ["HANRORO"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-04-05",
    tag: "노래뱅",
    link: "https://vod.sooplive.com/player/191860461?change_second=4283"
  },
  {
    id: 67,
    
    title: "0+0",
    titleAlt: ["00"],

    mainArtist: ["한로로"],
    mainArtistAlt: [],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-04-05",
    tag: "노래뱅",
    link: "https://vod.sooplive.com/player/191860461?change_second=4647"
  },
  {
    id: 68,
    
    title: "뿌리",
    titleAlt: [],

    mainArtist: ["쿤디판다"],
    mainArtistAlt: ["Khundi panda"],

    featArtist: ["저스디스"],
    featArtistAlt: ["justhis"],

    date: "2026-04-05",
    tag: "노래뱅",
    link: "https://vod.sooplive.com/player/191860461?change_second=4998"
  },
  {
    id: 69,
    
    title: "나만,봄",
    titleAlt: ["나만봄"],

    mainArtist: ["볼빨간사춘기"],
    mainArtistAlt: ["볼사","BOL4"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-04-05",
    tag: "노래뱅",
    link: "https://vod.sooplive.com/player/191860461?change_second=5959"
  },
  {
    id: 70,
    
    title: "첫사랑",
    titleAlt: [],

    mainArtist: ["백아"],
    mainArtistAlt: [],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-04-05",
    tag: "노래뱅",
    link: "https://vod.sooplive.com/player/191860461?change_second=6627"
  },
  {
    id: 71,

    title: "selfmade orange",
    titleAlt: ["셀메이드 오렌지","셀프메이드 오렌지"],

    mainArtist: ["창모"],
    mainArtistAlt: [],

    featArtist: ["SUPERBEE"],
    featArtistAlt: ["수퍼비","슈퍼비"],

    date: "2026-04-05",
    tag: "노래뱅",
    link: "https://vod.sooplive.com/player/191860461?change_second=6960"
  },
  {
    id: 72,

    title: "띵",
    titleAlt: [],

    mainArtist: ["재키와이","Young B","오션검","한요한"],
    mainArtistAlt: ["Jvcki Wai","영비","han yo han","Osshun Gum"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-04-05",
    tag: "노래뱅",
    link: "https://vod.sooplive.com/player/191860461?change_second=7504"
  },
  {
    id: 73,

    title: "Bunny Girl",
    titleAlt: ["바니걸"],

    mainArtist: ["AKASAKI"],
    mainArtistAlt: ["아카사키"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-04-05",
    tag: "노래뱅",
    link: "https://vod.sooplive.com/player/191860461?change_second=8201"
  },
   {
    id: 74,
    
    title: "입춘",
    titleAlt: [],

    mainArtist: ["한로로"],
    mainArtistAlt: ["HANRORO"],

    featArtist: [],
    featArtistAlt: [],

    date: "2026-04-05",
    tag: "노래뱅",
    link: "https://vod.sooplive.com/player/191860461?change_second=8950"
  },
  {
    id: 75,

    title: "쉬어",
    titleAlt: [],

    mainArtist: ["아넌딜라이트","unofficialboyy","BE'O","지구인","mudd the student"],
    mainArtistAlt: ["Anandekight","언오피셜보이","비오","geegooin","머드 더 스튜던트"],

    featArtist: ["MINO"],
    featArtistAlt: ["송민호","미노","송미노"],

    date: "2026-04-05",
    tag: "노래뱅",
    link: "https://vod.sooplive.com/player/191860461?change_second=9378"
  },
];

// 출력
function displaySongs(filter="") {
  const table = document.getElementById("songTable");
  table.innerHTML = "";

  let filtered = songs.filter(song => {
    const search = normalize(filter);

    return (
      normalize(song.title).includes(search) ||
      song.titleAlt?.some(t=>normalize(t).includes(search)) ||
      song.mainArtist.some(a=>normalize(a).includes(search)) ||
      song.featArtist?.some(a=>normalize(a).includes(search)) ||
      getChosung(song.title).includes(search)
    );
  });

  if(currentTag) {
    filtered = filtered.filter(s=>s.tag===currentTag);
  }

  if(currentView==="favorites") {
    filtered = filtered.filter(s => favorites.includes(s.id));
  }

  filtered.forEach(song=>{
    const isFav = favorites.includes(song.id);

    const row = `
      <tr>
        <td>${song.title}</td>

        <td>
          ${song.mainArtist.join(", ")}
          ${song.featArtist.length ? " feat. " + song.featArtist.join(", ") : ""}
        </td>

        <td>${song.date}</td>

        <td>${song.tag}</td>

        <td>
          <button onclick="toggleFavorite(${song.id})">
            <span class="fav ${isFav ? 'on' : ''}">
              ${isFav ? "★" : "☆"}
            </span>
          </button>
          <a href="${song.link}" target="_blank">보기</a>
        </td>
      </tr>
    `;

    table.innerHTML += row;
  });

  updateTitle();
}

// 검색
document.getElementById("searchInput").addEventListener("input", e=>{
  displaySongs(e.target.value);
});

// 정렬
function sortByNewest() {
  songs.sort((a,b)=> new Date(b.date) - new Date(a.date));
  displaySongs(searchInput.value);
}

function sortByNewest() {
  songs.sort((a,b)=>{
    const dateDiff = new Date(b.date) - new Date(a.date);
    if(dateDiff !== 0) return dateDiff;

    // 🔥 같은 날짜면 "뒤에 있는 게 먼저 나오게"
    return songs.indexOf(b) - songs.indexOf(a);
  });
  displaySongs(searchInput.value);
}

// 태그
function filterByTag(tag) {
  currentTag = currentTag === tag ? null : tag;
  displaySongs(searchInput.value);
}

// ⭐ 즐겨찾기 (🔥 id 기반으로 변경)
function toggleFavorite(id){
  if(favorites.includes(id)){
    favorites = favorites.filter(f=>f!==id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem("favorites",JSON.stringify(favorites));
  displaySongs(searchInput.value);
}

// 페이지
function showAll(){
  currentView="all";
  displaySongs(searchInput.value);
}

function showFavoritesPage(){
  currentView="favorites";
  displaySongs(searchInput.value);
}

// 제목
function updateTitle(){
  const el = document.getElementById("pageTitle");
  if(!el) return;
  el.textContent = currentView==="favorites" ? "★ 즐겨찾기" : "";
}

// 실행
displaySongs();