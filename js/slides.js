let slides = ["other/IMG_2445.png", "other/IMG_5558.png", "kitchens/IMG_5712.png", "kitchens/IMG_5610.png"];
let slideIndex = 0;
let strTop = '';
let strMid = '';
let strBottom = '';

function loadPic() {
    document.getElementById("slide").src = "https://ik.imagekit.io/dimi/Extra_Miles/" + slides[slideIndex];
    document.getElementById("slideTextTop").textContent = strTop;
    document.getElementById("slideTextMid").textContent = strMid;
    document.getElementById("slideTextBottom").textContent = strBottom;

    strTop = '';
    strMid = '';
    strBottom = '';
}

function updatePic(i) {
    slideIndex += i;

    // Slide index
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }

    // Text to display
    if (slideIndex == 0) {
        strTop = 'Extra Miles Tile & Stone Installations LTD';
        strMid = 'HOME - KITCHEN - BATHROOM RENOVATION';
        strBottom = 'Renovate your living spaces and design your home just the way you want with our home renovation service.';
    } else {
        strTop = `Slide ${slideIndex}`;
    }

    loadPic();
}

// Initialize slide
updatePic(0);
