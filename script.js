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
      song.mainArtistAlt?.some(a=>normalize(a).includes(search)) ||

      song.featArtist?.some(a=>normalize(a).includes(search)) ||
      song.featArtistAlt?.some(a=>normalize(a).includes(search)) ||

      getChosung(song.title).includes(search) ||

      song.mainArtist.some(a=>getChosung(a).includes(search)) ||
      song.featArtist?.some(a=>getChosung(a).includes(search))
    );
  });

   // 🔥 정렬 상태 (기본: 최신순)
  if(!window.currentSort) window.currentSort = "newest";

  if(window.currentSort === "newest"){
    filtered.sort((a,b)=>{
      const dateDiff = new Date(b.date) - new Date(a.date);
      if(dateDiff !== 0) return dateDiff;

      return songs.indexOf(b) - songs.indexOf(a); // 같은 날짜 뒤에서부터
    });
  } else {
    filtered.sort((a,b)=> new Date(a.date) - new Date(b.date));
  }

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
  window.currentSort = "newest";
  displaySongs(searchInput.value);
}

function sortByOldest() {
  window.currentSort = "oldest";
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
window.currentSort = "newest";
displaySongs();