function toggleMenu () {  
    const navbar = document.querySelector('.navbar');
    const burger = document.querySelector('.burger');
    const navbarUl = document.querySelector('.navbar__links');
    
    burger.addEventListener('click', (e) => {    
        navbar.classList.toggle('show-nav');

        if (!navbar.classList.contains('show-nav')) {
            navbarUl.style.display = 'none';
        } else {
            navbarUl.style.display = 'flex';
        }
    });
}
    
    // Bonus
    // const navbarLinks = document.querySelectorAll('.navbar a');
    // navbarLinks.forEach(link => {
    //     link.addEventListener('click', (e) => {    
    //         navbar.classList.remove('show-nav');
    //         document.body.style.overflow = '';
    //     }); 
    // });

    // window.addEventListener('resize', () => {
    //     if (window.innerWidth > 768) {
    //         navbar.classList.remove('show-nav');
    //         navbarUl.style.display = 'none';
    //         document.body.style.overflow = '';
    //     }
    // })


toggleMenu();

//-------------sound speaker-------------------------------

// document.addEventListener('DOMContentLoaded', function() {

//     const speakerIcon = document.getElementById('sound');
//     const audio = document.getElementById('audio');

    // const savedTime = localStorage.getItem('audioTime');
    // const isPlaying = localStorage.getItem('isPlaying') === 'true';

    // if (savedTime !== null) {
    //     audio.currentTime = parseFloat(savedTime);
    //     if (isPlaying) {
    //         audio.play();
    //     }
    // }

    // Gestion de la sauvegarde de l'état de l'audio avant de quitter ou de recharger la page
    // function saveAudioState() {
    //     localStorage.setItem('audioTime', audio.currentTime);
    //     localStorage.setItem('isPlaying', !audio.paused);
    // }

    // window.onbeforeunload = saveAudioState;
    // document.addEventListener("visibilitychange", function() {
    //     if (document.visibilityState === 'hidden') {
    //         saveAudioState();
    //     }
    // });
  
//     function toggleSound() {
//         if (audio.paused) {
//             audio.play();
//             speakerIcon.classList.remove('fa-volume-xmark');
//             speakerIcon.classList.add('fa-volume-high');
//         } else {
//             audio.pause();
//             audio.currentTime = 0;
//             speakerIcon.classList.remove('fa-volume-high');
//             speakerIcon.classList.add('fa-volume-xmark');
//         }
//     }
//     function audioEnded() {
//         speakerIcon.classList.remove('fa-volume-high');
//         speakerIcon.classList.add('fa-volume-xmark');
//     }
//     audio.addEventListener('ended', audioEnded);
//     speakerIcon.addEventListener('click', toggleSound);
// });
    
//-----------------------------------------------------



const speakerIcon = document.getElementById('sound');
const audio = document.getElementById('audio');

function toggleSound() {
    console.log(audio.currentTime);
    if (audio.paused) {
        audio.play();
        speakerIcon.classList.remove('fa-volume-xmark');
        speakerIcon.classList.add('fa-volume-high');
    } else {
        audio.pause();
        audio.currentTime = 0;
        speakerIcon.classList.remove('fa-volume-high');
        speakerIcon.classList.add('fa-volume-xmark');
    }
}

speakerIcon.addEventListener('click', toggleSound);

function audioEnded() {
    speakerIcon.classList.remove('fa-volume-high');
    speakerIcon.classList.add('fa-volume-xmark');
}

audio.addEventListener('ended', audioEnded);


// audio.addEventListener('timeupdate', () => {
//     if (audio.currentTime > 123) {
//         audio.pause();
//         audio.currentTime = 0;
//         speakerIcon.classList.remove('fa-volume-high');
//         speakerIcon.classList.add('fa-volume-xmark');
//     }
// });






// Fonction Nettoyage des chaînes de caracteres pour nom et prénom


