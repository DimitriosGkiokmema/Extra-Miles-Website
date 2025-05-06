let kitchens = [];
let bathrooms = [];
let commercial = [];
let all = [];
const container = document.getElementById('gallery');
const color = '#3d8aef'

function switchTo(type) {
    container.innerHTML = "";
    clearButtons();

    if (type == 'all') {
        displayPics(kitchens);
        displayPics(bathrooms);
        displayPics(commercial);
        document.getElementById('allButton').style.backgroundColor = color;
    } else if (type == 'kit') {
        displayPics(kitchens);
        document.getElementById('kitButton').style.backgroundColor = color;
    } else if (type == 'bat') {
        displayPics(bathrooms);
        document.getElementById('batButton').style.backgroundColor = color;
    } else if (type == 'com') {
        displayPics(commercial);
        document.getElementById('comButton').style.backgroundColor = color;
    } else {
        console.log('Error: received invalid button type ' + type);
    }
}

function clearButtons() {
    document.getElementById('allButton').style.backgroundColor = 'rgb(244, 244, 244)';
    document.getElementById('kitButton').style.backgroundColor = 'rgb(244, 244, 244)';
    document.getElementById('batButton').style.backgroundColor = 'rgb(244, 244, 244)';
    document.getElementById('comButton').style.backgroundColor = 'rgb(244, 244, 244)';
}

async function getImageKitFiles(folderPath) {
    const response = await fetch('https://api.imagekit.io/v1/files?path=' + encodeURIComponent(folderPath), {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa('private_bEbXbqKR5ttkFaL2zzDCMuJXZaU=:'),
            'Content-Type': 'application/json'
        }
    });
    
    const data = await response.json();
    
    if (data && Array.isArray(data)) {
        return data.map(file => folderPath + '/' + (file.name));
    }

    return [];
}

async function fetchImages() {
    kitchens = await getImageKitFiles('Extra_Miles/kitchens');
    bathrooms = await getImageKitFiles('Extra_Miles/bathrooms');
    commercial = await getImageKitFiles('Extra_Miles/other');

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

    displayPics(all);
    document.getElementById('allButton').style.backgroundColor = color;
}

function displayPics(pics) {
    for (let i = 0; i < pics.length; i++) {
        createPic(pics[i]);
    }
}

function createPic(url) {
    let pic = document.createElement('img');
    pic.src = 'https://ik.imagekit.io/dimi/' + url;
    pic.className = 'galleryPic';

    container.appendChild(pic);

    // Attach click event listener to the gallery container
    document.getElementById('gallery').addEventListener('click', function(event) {
        createWindow(event);
    });
}

function createWindow(event) {
    var newWindow = window.open();
    newWindow.document.title = "Gallery Image";
    var img = newWindow.document.createElement("img");
    img.src = event.target.src;
    img.style.width = "100%";
    img.style.height = "auto";
    newWindow.document.body.appendChild(img);
}

fetchImages(); // loads all images stored in imageKit to variables
displayPics(kitchens);
