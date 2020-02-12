import retrieveContent from './query.js';
import Station from './station.js';
import Reservation from './reservation.js';
export default class Map{
    constructor(){
		this.mymap = L.map('mapid').setView([43.604262, 1.443565], 13);
		this.reservation = new Reservation();
	}
	init(){
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
        }).addTo(this.mymap);
        
	}

	async  markerData() {
		var listStations = await retrieveContent()
		
		var markers = L.markerClusterGroup();

		listStations.forEach((reponseInfoStation) =>{
			var currentStation = new Station (reponseInfoStation);
			var marker =L.marker([reponseInfoStation.position.lat,reponseInfoStation.position.lng])
			.bindPopup(reponseInfoStation.name);
			
			marker.on('mouseover',function() {
				this.openPopup();
			});
			marker.on('mouseout', function() {
				this.closePopup();
			});
			marker.on('click', () =>{
				currentStation.allowReservation();
				currentStation.insertDataStation();
				if(currentStation.authorization) { 

					document.getElementById("infoStation").style.display = "block";
					document.getElementById("buttonReservation").style.display = "block";
					window.scrollTo(0,900);
					this.reservation.currentStation = currentStation
					if(sessionStorage.getItem("reservation")!== null){
						document.getElementById("buttonReservation").style.display = "none";
						document.getElementById("buttonCancel").style.display = "block";
					}

				}
				else {
					document.getElementById("messageError").style.display = "block";
					document.getElementById("buttonReservation").style.display = "none";
					setTimeout(()=>{
						document.getElementById("messageError").style.display = "none";
						},5000);
				}
			});
			markers.addLayer(marker);
		});
	this.mymap.addLayer(markers);
	}
}


