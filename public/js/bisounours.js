document.addEventListener('DOMContentLoaded', function() {
    const bisounours = document.querySelector('.gif_bisounours');
    const whiteScreen = document.querySelector('.white-screen');
    const switchCoeur = document.getElementById('switch');
    const body = document.getElementById('body');
    const bannerHome = document.getElementById('banner-home');
    const containerCardHome = document.querySelector('#container-card-home');
    const containerCardHomeClean = document.querySelector('#container-card-home-clean');
    const imgCard = document.querySelectorAll('#img-card');
    const imgCardClean = document.querySelectorAll('#img-card-clean');
    const switchContainer = document.getElementById('switch-container');
    const interditContainer = document.querySelector('.interdit');
    const attractionCard = document.querySelectorAll('.attractions-card');

    //Pour le h1

    const titleZombie = document.getElementById('title-zombie');
    const titleChoupi = document.getElementById('title-choupi');
    const exclamationTitle = document.getElementById('exclamation-title');
    const coeurTitle = document.getElementById('coeur-title');

    // récupération des sons

    const audioLaugh = document.getElementById('audioLaugh');
    const audioSparkling = document.getElementById('audioSparkling');
    const audioBisounours = document.getElementById('audioBisounours');
    const audioLeadUp = document.getElementById('audioLeadUp');

    switchCoeur.addEventListener('change', (event) => {
        if (switchCoeur.checked) {
            bisounours.classList.remove('is-visually-hidden');
            audioLeadUp.volume = 0.8;
            audioLeadUp.play();

            setTimeout(() => {
                whiteScreen.classList.remove('is-visually-hidden');
                audioSparkling.volume = 0.6;
                audioSparkling.play();
            }, 2000);

            setTimeout(() => {
                bisounours.classList.add('is-visually-hidden');
                whiteScreen.classList.add('is-visually-hidden');
                body.classList.add('body-bisounours');
                bannerHome.classList.remove('banner-home');
                bannerHome.classList.add('banner-home-bisounours');
                attractionCard.forEach(card => {
                    card.classList.add('card-bisounours');
                });
                imgCard.forEach(card => {
                    card.classList.add('is-visually-hidden');
                });
                imgCardClean.forEach(card => {
                    card.classList.remove('is-visually-hidden');
                });
                containerCardHome.classList.add('is-visually-hidden');
                containerCardHomeClean.classList.remove('is-visually-hidden');
                titleZombie.classList.remove('h1-homepage');
                titleZombie.classList.add('is-visually-hidden');
                titleChoupi.classList.add('h1-homepage');
                titleChoupi.classList.remove('is-visually-hidden');
                exclamationTitle.classList.add('is-visually-hidden');
                coeurTitle.classList.remove('is-visually-hidden');
                audioBisounours.volume = 0.3;
                audioBisounours.play();
            }, 2500);

            setTimeout(() => {
                body.classList.remove('body-bisounours');
                bannerHome.classList.remove('banner-home-bisounours');
                bannerHome.classList.add('banner-home');
                switchContainer.classList.add('is-visually-hidden')
                interditContainer.classList.remove('is-visually-hidden')
                attractionCard.forEach(card => {
                    card.classList.remove('card-bisounours');
                });
                containerCardHome.classList.remove('is-visually-hidden');
                containerCardHomeClean.classList.add('is-visually-hidden');
                imgCard.forEach(card => {
                    card.classList.remove('is-visually-hidden');
                });
                imgCardClean.forEach(card => {
                    card.classList.add('is-visually-hidden');
                });
                titleZombie.classList.add('h1-homepage');
                titleZombie.classList.remove('is-visually-hidden');
                titleChoupi.classList.remove('h1-homepage');
                titleChoupi.classList.add('is-visually-hidden');
                exclamationTitle.classList.remove('is-visually-hidden');
                coeurTitle.classList.add('is-visually-hidden');
                audioBisounours.pause();
                audioBisounours.currentTime = 0;
                audioLaugh.play();
            }, 12000);

            setTimeout(() => {
                interditContainer.classList.add('is-visually-hidden')
            }, 16000);
        }
    });
});