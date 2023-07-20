const count = 10;
const accesKey = 'r7ENJFDxlBj7pkGMZSky40GH3nnuhBcPcWu6fWlQPYU';

const imgWrapper = document.getElementById('wrapper');
const loader = document.getElementById('loading-cube');

let photosArray = [];

const unsplashApiUrl = `https://api.unsplash.com/photos/random/?client_id=${accesKey}&count=${count}`;

getPhotos = async () => {
    try {
        const response = await fetch(unsplashApiUrl);
        photosArray = await response.json();
        console.log(photosArray);
    }
    catch (err) {
        console.log(err);
    }
}

getPhotos();