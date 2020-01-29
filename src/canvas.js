export default class Signature {
    
    constructor(){
        this.canvas = document.getElementById("sig-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.strokeStyle = "#2222222";
        this.ctx.lineWith = 2;
        this.sigText = document.getElementById("sig-dataUrl")
        this.sigImage = document.getElementById("sig-image")
        this.clearBtn = document.getElementById("sig-clearBtn")
        this.submitBtn = document.getElementById("sig-submitBtn")
        this.drawing = false;
        this.mousePos = {x:0,y:0};
        this.lastPos = this.mousePos;
        this.pointDrawn =[];
        this.dataUrl = null
        

        this.addListeners();
        this.addAnimationFrame();
        this.drawLoop();
    }

    addListeners(){
        //Clear Button
        this.clearBtn.addEventListener("click",() =>{
            this.clearCanvas();
            document.getElementById("sig-submitBtn").style.display = "none";
            this.sigText.innerHTML = "Data URL for your signature will go here!"
            this.sigImage.setAttribute("src","")
        },false);
        //toDataUrl transforme un lien en image
        this.submitBtn.addEventListener("click",() =>{
            let dataUrl = this.canvas.toDataURL();
            this.dataUrl = dataUrl
            this.sigText.innerHTML = dataUrl
            this.sigImage.setAttribute("src", dataUrl)
            let event = new Event ("fired")
            document.dispatchEvent(event);
        },false);

        //Canvas Events
        // evenement qui permet de dessiner quand on clic sur le canvas
        this.canvas.addEventListener("mousedown",(e) =>{
            this.drawing = true;
            this.lastPos = this.getMousePos(this.canvas, e);
        },false);
        // evenement qui ce lance quand on relache le clic
        this.canvas.addEventListener("mouseup",() => {
            this.drawing = false;
            if(this.pointDrawn.length >5){
                this.displayButton();
            }
        },false);
        // evenement qui check le position de la souris quand on la bouge pour dessiner
        this.canvas.addEventListener("mousemove",(e) => {
            this.mousePos = this.getMousePos(this.canvas, e);
        },false);
        // Touch Start
        this.canvas.addEventListener("touchstart", (e)=> {
		this.mousePos = this.getTouchPos(this.canvas,e);
		this.touch = e.touches[0];
		this.mouseEvent = new MouseEvent("mousedown", {
		clientX: this.touch.clientX,
		clientY: this.touch.clientY
		});
		this.canvas.dispatchEvent(this.mouseEvent);
		}, false);
        //Touch End
		this.canvas.addEventListener("touchend", ()=>{
		this.mouseEvent = new MouseEvent("mouseup", {});
		this.canvas.dispatchEvent(this.mouseEvent);
		}, false);
        // Touch Move
		this.canvas.addEventListener("touchmove", (e)=>{
		this.touch = e.touches[0];
		this.mouseEvent = new MouseEvent("mousemove", {
		clientX: this.touch.clientX,
		clientY: this.touch.clientY
		});
		this.canvas.dispatchEvent(this.mouseEvent);
		}, false);

		//empeche le scrolling quand on dessine sur tablette
		document.body.addEventListener("touchstart", (e)=>{
			if (e.target == this.canvas) {
				e.preventDefault();
			}
			}, false);
			document.body.addEventListener("touchend",(e)=>{
			if (e.target == this.canvas) {
				e.preventDefault();
			}
			}, false);
			document.body.addEventListener("touchmove", (e)=>{
			if (e.target == this.canvas) {
				e.preventDefault();
			}
			}, false);
		

    };
    
    displayButton(){ // affiche le bouton si il y assez de pointDrawn
        let event = new Event("canvasFull",{bubbles:true});
        document.dispatchEvent(event);
        console.log("display")
    }

    renderCanvas(){ // permet de dessiner
    if (this.drawing) {
        this.ctx.moveTo(this.lastPos.x,this.lastPos.y);
        this.ctx.lineTo(this.mousePos.x,this.mousePos.y);
        this.ctx.stroke();
        this.lastPos = this.mousePos;
        this.pointDrawn.push(this.lastPos);
        }
    };
    
    clearCanvas(){ //reset le canvas
        this.canvas.width = this.canvas.width;
    };
    getMousePos(canvasDom, mouseEvent) {   //prend la position de la souris
        let rect = canvasDom.getBoundingClientRect();
        return {
            x: mouseEvent.clientX - rect.left,
            y: mouseEvent.clientY - rect.top
        };
    };
    getTouchPos(canvasDom,touchEvent){
        let rect = canvasDom.getBoundingClientRect();
        return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
        };
    };

    addAnimationFrame() { //permet d'avoir 60 fps
        window.requestAnimFrame = ( (callback) => {
            return window.requestAnimationFrame || 
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimaitonFrame ||
                function (callback) {
            window.setTimeout(callback, 1000/60);
                };
        })();
    };
    drawLoop() { //autorise l'animation
        requestAnimFrame(this.drawLoop.bind(this));
        this.renderCanvas();
    };
}


