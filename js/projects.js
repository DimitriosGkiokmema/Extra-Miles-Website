// Global Variables
let CONTAINER = document.getElementById('projectsContainer');

class Project {
  constructor(pics, title) {
    this.images = pics;
    this.title = title;

    if (this.images.length != 0) {
        this.createCard();
    }
  }

  createCard() {
    let picContainer = document.createElement('div');
    picContainer.className = 'projectsPic';
    let pic = document.createElement('img');
    pic.src = "https://ik.imagekit.io/dimi/Extra_Miles/" + this.images[0];
    let picTitle = document.createElement('h1');
    picTitle.textContent = this.title;

    picContainer.appendChild(pic);
    picContainer.appendChild(picTitle);
    CONTAINER.appendChild(picContainer);

    // Attach click event listener to the gallery container
    picContainer.addEventListener('click', () => {
      console.log('clicked')
      SLIDESHOW.setPics(this.images);
      openPopup();
    });
  }
}