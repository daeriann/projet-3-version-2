//objet station
import Reservation from './reservation.js';
export default class Station {
    
    constructor(dataStation){
    
    this.name = null; 
    this.address = null; 
    this.state = null; 
    this.nbBike = null;
    this.nbStand = null; 
    // Nom
    this.name = dataStation.name;
    // Adresse
    this.address = dataStation.address;
    // Etat
    this.state = dataStation.status;
    // Nombre de velo
    this.nbBike = dataStation.available_bikes;
    // Nombre de stand
    this.nbStand = dataStation.available_bike_stands;
    this.authorization = false;
    this.placeData = document.getElementById("listInfo");
    }

    // ajouter dans la page
    insertDataStation(){

        document.getElementById("nameStation").innerHTML = this.name;
        document.getElementById("addressStation").innerHTML = this.address;
        document.getElementById("stateStation").innerHTML = this.state;
        document.getElementById("bikeAvai").innerHTML = this.nbBike;
        document.getElementById("standAvai").innerHTML = this.nbStand;
    }

    allowReservation(){
        if(this.state === "CLOSED") { 
            this.state = "FERMER";
            document.getElementById("stateStation").style.color = "red";
            document.getElementById("bikeAvai").style.color = "red";
            this.authorization = false;
    
        } else if(this.state === "OPEN") { 
            this.state = "OUVERT";
            document.getElementById("stateStation").style.color = "green";
            this.authorization = true;
    
        if(this.nbBike === 0) { 
            document.getElementById("bikeAvai").style.color = "red";
            this.authorization = false;
        } else if(this.nbBike > 0) {
            document.getElementById("bikeAvai").style.color = "green";
        }
        }
    }
}

