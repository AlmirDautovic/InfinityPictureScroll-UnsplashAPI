
const imgWrapper = document.getElementById('wrapper');
const loader = document.getElementById('loading-cube');

let photosArray = [];
let ready = false;
let totalImages = 0;
let imagesLoaded = 0;

let count = 5;
const accesKey = 'r7ENJFDxlBj7pkGMZSky40GH3nnuhBcPcWu6fWlQPYU';
let unsplashApiUrl = `https://api.unsplash.com/photos/random/?client_id=${accesKey}&count=${count}`;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
        unsplashApiUrl = `https://api.unsplash.com/photos/random/?client_id=${accesKey}&count=${count}`;
    }
}

setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

createElementsToDisplayPhotos = () => {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank"
        });
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imgWrapper.appendChild(item);
    });
}

getPhotos = async () => {
    try {
        const response = await fetch(unsplashApiUrl);
        photosArray = await response.json();
        createElementsToDisplayPhotos();
    }
    catch (err) {
        console.log(err);
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

getPhotos();