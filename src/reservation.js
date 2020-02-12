import Station from './station.js';
import Signature from './canvas.js';
import Map from './map.js';
import Timer from './timer.js';
export default class Reservation{
  constructor(){
    window.addEventListener("canvasFull",()=>{
    document.getElementById("sig-submitBtn").style.display = "block";
    }) 
    this.addListener();
    this.sessionstorageReservation();
    this.saveTimer();
    this.useSaveTimer();
    this.canvas = document.getElementById("sig-canvas");
    this.currentStation = null
    this.signature = new Signature()
    this.forms = document.getElementById("requiredfield")
    this.firstname = this.forms.firstname;
    this.lastname = this.forms.lastname;
    this.firstnameLocalstorage = localStorage.getItem("firstname");
    this.lastnameLocalstorage = localStorage.getItem("lastname");
    window.onload = this.nameLocalstorage();
    document.getElementById("buttonReservation").addEventListener("click", this.requiredField.bind(this));
    document.getElementById("buttonCancel").addEventListener("click", ()=>{
      this.buttonCancel();
    })
    document.addEventListener("timerEnd",()=>{
      this.buttonCancel();
    })
    }
    
    nameLocalstorage (){//si un local storage est présent cela rentre les valeurs dans le champ firstname/lastname
      this.firstname = this.firstnameLocalstorage
      this.lastname  = this.lastnameLocalstorage
    if( this.firstnameLocalstorage !== null || this.lastnameLocalstorage !== null){
      document.getElementById("firstname").value = this.firstnameLocalstorage;
      document.getElementById("lastname").value = this.lastnameLocalstorage ;
    };
    }

    requiredField(){//si aucune valeur n'est rentré affiche un message sinon sauvegarde et fait apparaitre les éléments
    if (this.firstname.value =="" || this.lastname.value =="") {
      alert("veuillez remplir les champs requis");
      return false;
    }
    else
    {
      document.getElementById("containercanvas").style.display = "block";
      localStorage.setItem("firstname",this.forms.firstname.value);
      localStorage.setItem("lastname",this.forms.lastname.value);
      return true;
    }
    }

    addListener(){//sauvegarde de la réservation en session storage et affiche/cache les éléments de la réservation
      document.addEventListener("fired", ()=>{
        let reservation = {
          station : this.currentStation,
          signatureUrl :this.signature.dataUrl,
        }
        sessionStorage.setItem("reservation", JSON.stringify(reservation))
        document.getElementById("containercanvas").style.display = "none";
        document.getElementById("buttonReservation").style.display = "none";
        document.getElementById("buttonCancel").style.display = "block";
        let timer = new Timer (20, 'toggle', 'clockspan');
        timer.init();
        this.sessionstorageReservation();
      })
    }

    sessionstorageReservation(){//utilisation du session storage si il y en a un
      let reservation = JSON.parse(sessionStorage.getItem("reservation"));
      if(reservation !== null){
        document.getElementById("sectionLeasing").style.display = "block";
        document.getElementById("leasingStation").innerHTML = reservation.station.name;
        document.getElementById("sig-image-reservation").src = reservation.signatureUrl;
        document.getElementById("buttonCancel").style.display = "block";
      }
    }
    
    buttonCancel(){//fonction qui permet de suprimmer le session storage
        sessionStorage.removeItem("reservation");
        sessionStorage.removeItem("endTimer");
        document.getElementById("sectionLeasing").style.display = "none";
        document.getElementById("buttonCancel").style.display = "none";
        this.signature.clearCanvas();
        document.getElementById("sig-submitBtn").style.display = "none";
        this.signature.sigText.innerHTML = "Data URL for your signature will go here!"
        this.signature.sigImage.setAttribute("src","")
    }

    saveTimer(){//sauvagarde du timer avec un timestamp
      document.getElementById("sig-submitBtn").addEventListener("click", ()=>{
        let now = Date.now()/1000
        let end = now + 1200
        let duration = (end - now)/60
        sessionStorage.setItem("endTimer", end);
        let timersessionStorage = new Timer(duration, 'toggleSpan','clockspan')
        timersessionStorage.run_clock();
        })
      }

      useSaveTimer(){//utilisation du timer si le session storage est remplie/fin du session storage si le timer est fini
        let endTimer = sessionStorage.getItem("endTimer");
        if (endTimer !== null){
          let now = Date.now()/1000
          let duration = (endTimer - now)/60
          if (duration > 0){
            let timersessionStorage = new Timer(duration,'toggleSpan','clockspan')
            timersessionStorage.run_clock();
          }
        }
      }
};

