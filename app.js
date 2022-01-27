const getSong = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySong(data.data))
        .catch(error => displayError(error));
}

const displayError = msg => {
    const error = document.getElementById('song-error');
    // error.innerText = msg;
    error.innerText = 'Something went wrong! Try again later.'
}

const displaySong = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        // const li = document.createElement('li');
        // li.innerText = song.title;
        // songContainer.appendChild(li);

        const div = document.createElement('div');
        div.className = 'single-result row align-items-center my-3 p-3';
        div.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
            <source src="${song.preview}" type="audio/ogg">
        </audio>
        </div>       
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `
        songContainer.appendChild(div);
    });
}

// const getLyrics = (artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     fetch(url)
//     .then( res => res.json())
//     .then( data => displayLyrics(data.lyrics));
// }

//Doing fetch operation using async await

// const getLyrics = async(artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     const res = await fetch(url);
//     const data = await res.json() ;
//     displayLyrics(data.lyrics);
// }

const getLyrics = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    catch (error) {
        displayError(error);
    }
}

const displayLyrics = lyrics => {
    const showLyrics = document.getElementById('song-lyrics');
    showLyrics.innerText = lyrics;

}