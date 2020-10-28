'use strict';

import { storageService } from './services/storage-service.js';
import { travelService } from './services/travel-service.js';
import { mapService } from './services/map-service.js';

window.addEventListener('load', onInit);

function onInit() {
    console.log('Hello Tips!');
    mapService.initMap();

}

function renderMyLocations() {
    console.log('this is going to be my locations')
}

function renderCurrLocation() {
    console.log('this is the curr  locations')

}

function renderWeatherBox() {
    console.log('this is where we render the weather')

}


// test if export works: 
// travelService.iAmAFunction()
// mapService.iAmAMap()
// storageService.justForTest()