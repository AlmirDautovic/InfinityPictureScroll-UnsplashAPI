const count = 30;
const accesKey = 'r7ENJFDxlBj7pkGMZSky40GH3nnuhBcPcWu6fWlQPYU';

const imgWrapper = document.getElementById('wrapper');
const loader = document.getElementById('loading-cube');

let photosArray = [];

const unsplashApiUrl = `https://api.unsplash.com/photos/random/?client_id=${accesKey}&count=${count}`;

imageLoaded = () => {
    console.log('image loaded');
}

setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

createElementsToDisplayPhotos = () => {
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
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        getPhotos();
    }
})

getPhotos();