const songs = [
  { title: "Saharlar", artist: "Dilnoz", src: "song1.mp3", cover: "saharlar.jpg" },
  { title: "Inson qasidasi", artist: "Sherali Jo'rayev", src: "song2.m4a", cover: "sher.jpg" },
  { title: "Bandaman", artist: "Sherali Jo'rayev", src: "bandaman.mp3", cover: "sher.jpg" },
  { title: "Mockingbird", artist: "Eminem", src: "mockingbird.mp3", cover: "eminem.jpg" },
  { title: "Hala Madrid", artist: "🦁😎🙋‍♂️", src: "halamadrid.mp3", cover: "ronaldo.avif" }
];

let currentSongIndex = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const songSelect = document.getElementById("songSelect");

// Dropdownni to‘ldirish (value = index)
songs.forEach((s, index) => {
  songSelect.innerHTML += `<option value="${index}">${s.title} - ${s.artist}</option>`;
});

// Qo‘shiqni tanlash
function selectSong(index) {
  currentSongIndex = index;
  cover.src = songs[index].cover;
  title.innerText = songs[index].title;
  artist.innerText = songs[index].artist;
  audio.src = songs[index].src;
  songSelect.value = index;
}

// Play / Pause
function playSong() {
  audio.play().catch(err => console.log(err));
  playBtn.innerText = "⏸️";
}
function pauseSong() {
  audio.pause();
  playBtn.innerText = "▶️";
}

playBtn.addEventListener("click", () => {
  if (audio.paused) playSong();
  else pauseSong();
});

// Next / Prev
function nextSong() {
  currentSongIndex++;
  if (currentSongIndex >= songs.length) currentSongIndex = 0;
  selectSong(currentSongIndex);
  playSong();
}
function prevSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) currentSongIndex = songs.length - 1;
  selectSong(currentSongIndex);
  playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Qo‘shiq tugaganda keyingisini o‘ynash
audio.addEventListener("ended", nextSong);

// Dropdown orqali tanlash
songSelect.addEventListener("change", (e) => {
  const index = parseInt(e.target.value);
  if (!isNaN(index)) {
    selectSong(index);
    playSong();
  }
});

// Boshlanishida birinchi qo‘shiqni tanlash
selectSong(currentSongIndex);
