const audio = document.getElementById("audio-player");

const playBtn = document.getElementById("play-btn");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
// 


const progressBar = document.getElementById("progress-bar");

const currentTimeEl = document.getElementById("current-time");

const durationEl = document.getElementById("duration");

audio.addEventListener("timeupdate", function () {

    progressBar.max = audio.duration;

    progressBar.value = audio.currentTime;

    let currentMinutes = Math.floor(audio.currentTime / 60);

    let currentSeconds = Math.floor(audio.currentTime % 60);

    let durationMinutes = Math.floor(audio.duration / 60);

    let durationSeconds = Math.floor(audio.duration % 60);

    currentTimeEl.innerText =
        `${currentMinutes}:${currentSeconds.toString().padStart(2, "0")}`;

    durationEl.innerText =
        `${durationMinutes}:${durationSeconds.toString().padStart(2, "0")}`;
});


// audio.addEventListener("timeupdate", function () {

//     progressBar.max = audio.duration;

//     progressBar.value = audio.currentTime;

// });

progressBar.addEventListener("input", function () {

    audio.currentTime = progressBar.value;

});

const songTitle = document.getElementById("song-title")
const artistName = document.getElementById("artist-name");

let currentSongIndex = 0;

console.log("javaScript connected");


const songs = [
    {
        title: "Falak song1.mp3",
        artist: "Falak Baloch",
        file: "songs/Falak song1.mp3",
        // cover: "images/default.jpg"
    },

     {
        title: "Falak song2.mp3",
        artist: "Falak Baloch",
        file: "songs/Falak song2.mp3",
        // cover: "images/default.jpg"
    },

     {
        title: "Falak song3.mp3",
        artist: "Falak Baloch",
        file: "songs/Falak song3.mp3",
        // cover: "images/default.jpg" 
    }
]

// const cover = document.getElementById("cover");

function loadSong(){

    songTitle.innerText = songs[currentSongIndex].title;
    artistName.innerText = songs[currentSongIndex].artist;

    audio.src = songs[currentSongIndex].file;
    cover.style.display = "none";
    // cover.src = songs[currentSongIndex].cover
}
loadSong();
// console.log(songs[currentSongIndex].title);



let isPlaying = false;

playBtn.addEventListener("click", function(){
    if (isPlaying === false){
        audio.play();
        isPlaying = true;
        playBtn.innerText = "⏸";
    }
    else {
        audio.pause();
        isPlaying = false;
        playBtn.innerText = "▶";
    }
});

// next-btn
nextBtn.addEventListener("click", function () {

    currentSongIndex++;

    if (currentSongIndex >= songs.length) {

        currentSongIndex = 0;

        renderPlaylist();

    }

    loadSong();

    audio.play();

    isPlaying = true;

    playBtn.innerText = "⏸";

    renderPlaylist();

});

// prev-btn
prevBtn.addEventListener("click", function () {

    currentSongIndex--;

    if (currentSongIndex < 0) {

        currentSongIndex = songs.length - 1;

    }

    loadSong();

    audio.play();

    isPlaying = true;

    playBtn.innerText = "⏸";

});

const volumeSlider = document.getElementById("volume-slider");
    

volumeSlider.addEventListener("input", function () {

    console.log("Slider:", volumeSlider.value);

    console.log("Audio:", audio);

    audio.volume = parseFloat(volumeSlider.value);

});

// ============ PLAYLIST 

const playlistEl = document.getElementById("playlist");

function renderPlaylist(filter = "") {
    playlistEl.innerHTML = ""; // pehle clear karo

    songs.forEach(function(song, index) {

        // search filter check
        if (song.title.toLowerCase().includes(filter.toLowerCase())) {

            const li = document.createElement("li");
            li.innerText = song.title + " - " + song.artist;

            // active song highlight
            if (index === currentSongIndex) {
                li.classList.add("active");
            }

            // click karo to play that song
            li.addEventListener("click", function() {
                currentSongIndex = index;
                loadSong();
                audio.play();
                isPlaying = true;
                playBtn.innerText = "⏸";
                renderPlaylist(filter);
            });

            playlistEl.appendChild(li);
        }
    });
}

renderPlaylist(); 

// ============ SEARCH ============

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", function() {
    renderPlaylist(searchInput.value);
});