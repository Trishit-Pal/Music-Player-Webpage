console.log("Welcome to Spotify");

// Initialize the variables
let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let masterSongtime = document.getElementById('masterSongtime');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Coldplay - Yellow", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", songTime: "04:32" },
    {songName: "Imagine Dragons -Believer", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" , songTime: "03:24"},
    {songName: "Imagine Dragons - Radioactive", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", songTime: "03:06"},
    {songName: "The Weeknd (Daft Punk) - Starboy", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", songTime: "03:50"},
    {songName: "Wavin Flag - K Naan (2010 World Cup Anthem)", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", songTime: "03:39"},
    {songName: "Coldplay - Fix You", filePath: "songs/6.mp3", coverPath: "covers/6.jpg", songTime: "05:05"},
    {songName: "Coldplay - Viva La Vida", filePath: "songs/7.mp3", coverPath: "covers/7.jpg", songTime: "04:02"},
    {songName: "Coldplay - Hymn For The Weekend ", filePath: "songs/8.mp3", coverPath: "covers/8.jpg", songTime: "04:20"},
    {songName: "We Are One (Ole Ola)", filePath: "songs/9.mp3", coverPath: "covers/9.jpg", songTime: "04:00"},
    {songName: "Linkin Park - In The End", filePath: "songs/10.mp3", coverPath: "covers/10.jpg", songTime: "03:38"},
];

songItems.forEach((element, i)=>{
    // console.log(element,i); 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText= songs[i].songName;
    // element.getElementsByClassName("songTime")[0].innerText= songs[i].songTime;
});

//Handle Play or Pause click
masterPlay.addEventListener('click', ()=>{
        if(audioElement.paused || audioElement.currentTime <=0)
        {
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity =1;
        }
        else{
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity=0;
        }
    });
//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value= progress;
    console.log('timeupdate');
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime= ( myProgressBar.value * audioElement.duration)/100;
})

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
        });

};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element,i)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src= `songs/${songIndex+1}.mp3`;
        masterSongName.innerText=songs[songIndex].songName;
        masterSongtime.innerText=songs[songIndex].songTime;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity =1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >=9){
        songIndex =0;
    }
    else
    {
        songIndex +=1;
    }
    audioElement.src= `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    masterSongtime.innerText= songs[songIndex].songTime;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity= 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    
});

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <=0){
        songIndex =0;
    }
    else
    {
        songIndex -=1;
    }

    audioElement.src= `songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    masterSongtime.innerText=songs[songIndex].songTime;
    audioElement.currentTime=0;
    audioElement.play();
   
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

});

function seekUpdate() {
    let seekPosition = 0;
   
    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      seek_slider.value = seekPosition;
   
      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
   
      // Add a zero to the single digit time values
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
   
      // Display the updated duration
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
};