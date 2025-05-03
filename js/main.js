let pics = ["other/IMG_2445.png", "other/IMG_5558.png", "kitchens/IMG_5712.png", "kitchens/IMG_5610.png"];
let picIndex = 0;
loadPic();

function loadPic() {
    document.getElementById("slide").src = "https://ik.imagekit.io/dimi/Extra_Miles/" + pics[picIndex];
}

function updatePic(i) {
    picIndex += i;

    if (picIndex >= pics.length) {
        picIndex = 0;
    } else if (picIndex < 0) {
        picIndex = pics.length - 1;
    }

    loadPic();
}