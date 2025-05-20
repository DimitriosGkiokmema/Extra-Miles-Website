let kitchens = [];
let bathrooms = [];
let commercial = [];
let all = [];
let limit = 15;
const container = document.getElementById('gallery');
const clickedColor = 'rgb(61, 138, 239)'
const baseColor = 'rgb(244, 244, 244)';
const API_BASE = 'https://extra-miles-backend.onrender.com/api/images';

function switchTo(type) {
    container.innerHTML = "";
    clearButtons();

    if (type == 'all') {
        displayPics(all);
        document.getElementById('allButton').style.backgroundColor = clickedColor;
    } else if (type == 'kit') {
        displayPics(kitchens);
        document.getElementById('kitButton').style.backgroundColor = clickedColor;
    } else if (type == 'bat') {
        displayPics(bathrooms);
        document.getElementById('batButton').style.backgroundColor = clickedColor;
    } else if (type == 'com') {
        displayPics(commercial);
        document.getElementById('comButton').style.backgroundColor = clickedColor;
    } else {
        console.log('Error: received invalid button type ' + type);
    }
}

function clearButtons() {
    document.getElementById('allButton').style.backgroundColor = baseColor;
    document.getElementById('kitButton').style.backgroundColor = baseColor;
    document.getElementById('batButton').style.backgroundColor = baseColor;
    document.getElementById('comButton').style.backgroundColor = baseColor;
}

// Gets images from backend
async function getImages(folderPath, skip) {
    try {    
        const response = await fetch(`${API_BASE}?folder=${encodeURIComponent(folderPath)}&limit=${limit}&skip=${skip}`);
        const images = await response.json();

        return images.map(img => img.url);
    } catch (err) {
      console.error('Error loading images:', err);
    }
}

async function fetchImages() {
    limit /= 3;
    kitchens =  await getImages('Extra_Miles/kitchens', kitchens.length);
    bathrooms = await getImages('Extra_Miles/bathrooms', bathrooms.length);
    commercial = await getImages('Extra_Miles/other', commercial.length);
    limit *= 3;

    updateAll();
    displayPics(all);
    document.getElementById('allButton').style.backgroundColor = clickedColor;
}

async function loadMore() {
    if (document.getElementById('allButton').style.backgroundColor == clickedColor) {
        limit /= 3;
        kitchens = kitchens.concat(await getImages('Extra_Miles/kitchens', kitchens.length));
        bathrooms = bathrooms.concat(await getImages('Extra_Miles/bathrooms', bathrooms.length));
        commercial = commercial.concat(await getImages('Extra_Miles/other', commercial.length));
        limit *= 3;

        updateAll();
        displayPics(all);
    } else if (document.getElementById('kitButton').style.backgroundColor == clickedColor) {
        kitchens = kitchens.concat(await getImages('Extra_Miles/kitchens', kitchens.length));
        displayPics(kitchens);
    } else if (document.getElementById('batButton').style.backgroundColor == clickedColor) {
        bathrooms = bathrooms.concat(await getImages('Extra_Miles/bathrooms', bathrooms.length));
        displayPics(bathrooms);
    }  else if (document.getElementById('comButton').style.backgroundColor == clickedColor) {
        commercial = commercial.concat(await getImages('Extra_Miles/other', commercial.length));
        displayPics(commercial);
    }

    document.getElementById("loadButton").style.backgroundColor = baseColor;
}

function updateAll() {
    all = [];

    for (let i = 0; i < kitchens.length || i < bathrooms.length || i < commercial.length; i++) {
        if (i < kitchens.length) {
            all[all.length] = kitchens[i];
        }
        if (i < bathrooms.length) {
            all[all.length] = bathrooms[i];
        }
        if (i < commercial.length) {
            all[all.length] = commercial[i];
        }
    }
}

function displayPics(pics) {
    let shift = limit;
    
    if (pics.length < limit) {
        shift = pics.length;
    }

    for (let i = pics.length - shift; i < pics.length; i++) {
        let pic = document.createElement('img');
        pic.src = pics[i];
        pic.className = 'galleryPic';

        container.appendChild(pic);

        // Attach click event listener to the gallery container
        container.addEventListener('click', function(event) {
            createWindow(event);
        });
    }
}

function createWindow(event) {
    var newWindow = window.open();
    var img = newWindow.document.createElement("img");

    img.src = event.target.src;
    img.style.width = "100%";
    img.style.height = "auto";

    newWindow.document.title = "Gallery Image";
    newWindow.document.body.appendChild(img);
}

fetchImages(); // loads all images stored in imageKit to variables
