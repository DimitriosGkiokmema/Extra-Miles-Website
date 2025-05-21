// Creates a slideshow, given a list of images
// Needs four containers: slide, slideText[Top, Mid, Bottom]

class slideShow {
    constructor(pics, text) {
        this.slides = pics;
        this.slideIndex = 0;
        this.strTop = '';
        this.strMid = '';
        this.strBottom = '';
        this.txtData = [];

        // Load Text
        if (text != '') {
            this.loadText(text);
        }
    }

    setPics(pics) {
        this.slides = pics;
        this.updatePic(0);
    }

    loadText(text) {
        d3.csv(`data/${text}.csv`, row => {
            let data = [row.top, row.mid, row.bot];
            this.txtData.push(data);
        }).then( () => {
            // Initialize slide
            this.updatePic(0);
        });
    }
    
    loadPic() {
        document.getElementById("slide").src = "https://ik.imagekit.io/dimi/Extra_Miles/" + this.slides[this.slideIndex];
        document.getElementById("slideTextTop").textContent = this.strTop;
        document.getElementById("slideTextMid").textContent = this.strMid;
        document.getElementById("slideTextBottom").textContent = this.strBottom;

        this.strTop = '';
        this.strMid = '';
        this.strBottom = '';
    }

    updatePic(i) {
        this.slideIndex += i;

        // Ensures valid slide index
        if (this.slideIndex >= this.slides.length) {
            this.slideIndex = 0;
        } else if (this.slideIndex < 0) {
            this.slideIndex = this.slides.length - 1;
        }

        if (this.txtData.length != 0 && this.slideIndex < this.txtData.length) {
            this.updateText();
        }

        this.loadPic();
    }

    updateText() {
        this.strTop = this.txtData[this.slideIndex][0];
        this.strMid = this.txtData[this.slideIndex][1];
        this.strBottom = this.txtData[this.slideIndex][2];
    }
}
