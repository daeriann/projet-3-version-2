import fetchAsync from './query.js';
import Station from './station.js';
import Signature from './canvas.js';
import Map from './map.js';
import Diaporama from './diaporama.js';
import Reservation from './reservation.js';
import * as L from 'leaflet';
import Timer from './timer.js';
import 'leaflet.markercluster';

//map
let map = new Map ();
 
map.init();
map.markerData();

//diaporama

const slider = new Diaporama('item', true);