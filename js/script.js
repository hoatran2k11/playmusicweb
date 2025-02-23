let songs = [];
let currentSongIndex = 0;
const audio = document.getElementById("audio");
const songTitle = document.getElementById("song-title");
const playlist = document.getElementById("playlist");

async function loadSongs() {
    try {
        const response = await fetch("get_songs.php");
        songs = await response.json();
        
        if (songs.length > 0) {
            loadSong(0);
            updatePlaylist();
        } else {
            songTitle.textContent = "Không có bài hát nào!";
        }
    } catch (error) {
        console.error("Lỗi tải danh sách bài hát:", error);
    }
}

function loadSong(index) {
    audio.src = songs[index].src;
    songTitle.textContent = "Bài hát: " + songs[index].title;
    updatePlaylist(index);
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
}

function updatePlaylist(activeIndex = 0) {
    playlist.innerHTML = "";
    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.textContent = song.title;
        if (index === activeIndex) li.classList.add("active");
        li.onclick = () => {
            currentSongIndex = index;
            loadSong(index);
            audio.play();
        };
        playlist.appendChild(li);
    });
}

// Tải danh sách bài hát khi trang load
loadSongs();