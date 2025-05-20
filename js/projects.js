// Global Variables
let CONTAINER = document.getElementById('projectsContainer');
let POPUP = document.getElementById("popup");

class Project {
  constructor(pics) {
    this.images = pics;

    if (this.images.length != 0) {
        this.createCard();
        this.createSlides();
    }
  }

  createCard() {
    let pic = document.createElement('img');
    pic.src = "https://ik.imagekit.io/dimi/Extra_Miles/" + this.images[0];
    pic.className = 'projectsPic';

    CONTAINER.appendChild(pic);

    // Attach click event listener to the gallery container
    CONTAINER.addEventListener('click', function(event) {
        console.log('card clicked')
    });
  }

  createSlides() {
    let popup = document.createElement('div');
    let closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.onclick = this.closePopup();
    closeBtn.textContent = 'X';

    let content = document.createElement('div');
    content.className = 'popup-content';

    let pic = document.createElement('img');
    pic.className = 'slide';

    content.appendChild(pic);
    popup.appendChild(closeBtn);
  }

  openPopup() {
    POPUP.style.display = 'flex';
  }

  closePopup() {
    POPUP.style.display = 'none';
  }
}

/*<div id="popup" class="popup">
    <button class="close-btn" onclick="closePopup()">X</button>
    <div class="popup-content">
        <h2>What is NUFORC?</h2>
        <p>NUFORC (National UFO Reporting Center) has collected <strong>over 180,000 UFO reports</strong> since the 1970s.</p>
        <p>Before 1995, reports were taken via <strong>telephone hotline & mail</strong>. Since then, <strong>its website has been the primary way people report sightings.</strong></p>
        <p>This ensures the data analyzed in this project comes from <strong>public reports spanning decades.</strong></p>
    </div>
</div>*/

let imgBatch = [];
let batchTitle = '';

d3.csv("data/projects.csv", row => {
    if (row.title == '') {
        imgBatch.push(row.image);
    } else {
        new Project(imgBatch);
        
        batchTitle = row.title;
        imgBatch = [row.image];
    }
}).then( () => {
    new Project(imgBatch);
});