const audio = document.getElementById("audio-player");
const main = document.getElementById("main");
const roll = document.querySelector(".roller");
const playButton = document.getElementById("play");
const plIcon = document.getElementById("pl_id");
const nextButton = document.getElementById("next");
const backButton = document.getElementById("back");
const progressBar = document.getElementById("pro");
const bar = document.getElementById("bar");
const songNameElement = document.querySelector(".song_name");
const artistElement = document.querySelector(".artist");
const popupContainer = document.querySelector(".popup-container");
const popupElement = document.getElementById("popup");

let isPlaying = false;
let currentSongIndex = 0;

const songs = [
    {
        name: "ILMU PADI",
        artist: "BAKU",
        image: "img/20230802_171343.jpg",
        src: "audio/tenang.wav",
        background: "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)"
    },
    {
        name: "instrumen",
        artist: "BAKU",
        image: "img/20230802_171343.jpg",
        src: "audio/You.mp3",
        background: "linear-gradient(45deg, #a1c4fd 0%, #c2e9fb 100%)"
    },
    {
        name: "EH KO BEGINI",
        artist: "BAKU",
        image: "img/20230802_171343.jpg",
        src: "audio/eh ko begini.mp3",
        background: "linear-gradient(45deg, #84fab0 0%, #8fd3f4 100%)"
    },
    {
        name: "KEMARIN KUCINTA",
        artist: "BAKU",
        image: "img/20230802_171343.jpg",
        src: "audio/DJ KEMARIN KUCINTA.mp3",
        background: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)"
    },
    {
        name: "ROR",
        artist: "BAKU",
        image: "img/20230802_171343.jpg",
        src: "audio/kece wak.mp3",
        background: "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)"
        
    }
];

// Tambahkan event listener untuk mendeteksi saat lagu selesai diputar
audio.addEventListener('ended', function() {
    nextSong();
});

function loadSong(index) {
    const song = songs[index];
    songNameElement.textContent = song.name;
    artistElement.textContent = song.artist;
    audio.src = song.src;
    main.style.background = song.background;
    // Update image if available
    const imgElement = document.querySelector(".circle img");
    if (song.image) {
        imgElement.src = song.image;
    }
}

function togglePlayPause() {
    if (isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
}

function playAudio() {
    isPlaying = true;
    audio.play();
    plIcon.classList.replace("fa-play", "fa-pause");
    roll.classList.add('anime');
    roll.style.animationPlayState = 'running';
}

function pauseAudio() {
    isPlaying = false;
    audio.pause();
    plIcon.classList.replace("fa-pause", "fa-play");
    roll.style.animationPlayState = 'paused';
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playAudio();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playAudio();
}

function togg() {
    document.body.classList.toggle("light-mode");
    document.querySelector(".main").classList.toggle("main-light");
    document.querySelectorAll("#shift button, #playlist button, .start_str, .end_str, .fas").forEach(el => {
        el.classList.toggle("txt-light");
    });
    document.querySelector(".roller").classList.toggle("roller-lt");
}

function pop() {
    popupElement.classList.toggle("popup-flex");
}

function close_popup() {
    popupElement.classList.remove("popup-flex");
}

audio.addEventListener('timeupdate', updateProgressBar);

function updateProgressBar() {
    const { currentTime, duration } = audio;
    const percent = (currentTime / duration) * 100;
    bar.style.width = `${percent}%`;

    const startMinutes = Math.floor(currentTime / 60);
    const startSeconds = Math.floor(currentTime % 60);
    const endMinutes = Math.floor(duration / 60);
    const endSeconds = Math.floor(duration % 60);

    document.getElementById("start").textContent = `${startMinutes}:${startSeconds < 10 ? '0' : ''}${startSeconds}`;
    document.getElementById("end").textContent = `${endMinutes}:${endSeconds < 10 ? '0' : ''}${endSeconds}`;
}

progressBar.addEventListener('click', (e) => {
    const { duration } = audio;
    const moreProgress = (e.offsetX / progressBar.offsetWidth) * duration;
    audio.currentTime = moreProgress;
});

playButton.addEventListener('click', togglePlayPause);
nextButton.addEventListener('click', nextSong);
backButton.addEventListener('click', prevSong);

document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSongIndex);
    let playlistHTML = '';
    songs.forEach((song, index) => {
        playlistHTML += `<p class='f${index}' onclick="playSpecificSong(${index})">${song.name}</p>`;
    });
    popupContainer.innerHTML = playlistHTML;
});

function playSpecificSong(index) {
    currentSongIndex = index;
    loadSong(index);
    playAudio();
}
