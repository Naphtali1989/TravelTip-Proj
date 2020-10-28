'use strict';

import { travelService } from './services/travel-service.js';
import { mapService } from './services/map-service.js';

window.addEventListener('load', onInit);

function onInit() {
    console.log('Hello Tips!');
    mapService.initMap();
    document.querySelector('.search-form').addEventListener('submit', onSetSearch)
}

function renderMyLocations() {
    console.log('this is going to be my locations')
}

function renderCurrLocation() {
    console.log('this is the curr locations')

}

function renderWeatherBox() {
    console.log('this is where we render the weather')

}

function onSetSearch() {
    console.log('in the set search')
    var elInput = document.querySelector('input[name=search-bar]')
    console.log(elInput)
}

// test if export works: 
// travelService.iAmAFunction()
// mapService.iAmAMap()
// storageService.justForTest()