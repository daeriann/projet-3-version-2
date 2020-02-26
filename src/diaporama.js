//diaporama
export  default class Diaporama {
    constructor(itemsClass, autoplay = true){
        this.items = document.getElementsByClassName(itemsClass);
        this.imageNum = 0;
        this.currentInterval = null;
        this.setListeners(autoplay);
    }

    infoKeyboard(e){
        if(e.keyCode === 39) {
            this.next();
            clearInterval(this.currentInterval);
            this.currentInterval = null;
        } else if(e.keyCode === 37) {
            this.previous();
            clearInterval(this.currentInterval);
            this.currentInterval = null;
        }
        else if(e.keyCode === 32){
            this.autoplay();
        }
    }

    next()  {
        this.items[this.imageNum].style.opacity = "0";
        if(this.imageNum === 3) {
            this.imageNum = 0;
        } else {
            this.imageNum++;
        }
        this.items[this.imageNum].style.opacity = "1";
    }

    previous (){
        this.items[this.imageNum].style.opacity = "0";
        if(this.imageNum === 0) {
            this.imageNum = 3;
        } else {
            this.imageNum--;
        }
        this.items[this.imageNum].style.opacity = "1";
    }

    autoplay() {
        if (this.currentInterval === null){
            document.getElementById('pause').textContent = 'pause';
            this.currentInterval = setInterval(this.next.bind(this),5000);
        }
        else{
            clearInterval(this.currentInterval);
            document.getElementById('pause').textContent = 'play';
            this.currentInterval = null;
        }
    }


    setListeners(autoplay){
        document.getElementById('pause').addEventListener('click',() => this.autoplay() );
        document.getElementById("buttonRight").addEventListener("click", () => this.next() );
        document.getElementById("buttonLeft").addEventListener("click", () => this.previous() );
        document.addEventListener("keydown", (e) => this.infoKeyboard(e));
        if(autoplay === true){
            this.autoplay();
        }
    }
}