mapboxgl.accessToken = 'pk.eyJ1IjoibmVwbGV4IiwiYSI6ImNsc3U2ODJnYTB1N3Myam11b2lzNzFqazQifQ.bDrQJ2G3TviLG4HnPFmpLA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [3.090199, 48.388463],
    zoom: 10
});

map.on('load', function() {
    // Utilisez fetch pour obtenir les directions ici
    // Exemple: fetch('https://api.mapbox.com/directions/v5/mapbox/driving/...').then(...)
});
