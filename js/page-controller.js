'use strict';

import { storageService } from './services/storage-service-service.js';
import { travelService } from './services/travel-service.js';
import { mapService } from './services/map-service.js';

window.addEventListener('load', onInit);

function onInit() {
    console.log('Hello Tips!');
}



// test if export works: 
// travelService.iAmAFunction()
// mapService.iAmAMap()