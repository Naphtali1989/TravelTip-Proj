'use strict';

import { storageService } from './services/storage-service.js';
import { mapService } from './services/map-service.js';


function setSearch(val) {
    console.log('Just for func');
}

function saveLocationsToStorage(currLocation) {
    var currStorage = storageService.loadFromStorage();
    currStorage.push(currLocation);
    storageService.saveToStorage();
}

export const travelService = {
    iAmAFunction,
    setSearch,
}

// test if export works: 
function iAmAFunction() {
    console.log(' FUNCTIONS!')
}