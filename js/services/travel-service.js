'use strict';

// import { storageService } from "./storage-service";



function setSearch(val) {
    console.log('Just for func', val);
}

function saveLocationsToStorage(currLocation) {
    var currStorage = loadFromStorage();
    currStorage.push(currLocation);
    saveToStorage();
}

export const travelService = {
    iAmAFunction,
    setSearch,
}

// test if export works: 
function iAmAFunction() {
    console.log(' FUNCTIONS!')
}

function saveToStorage(key, val) {
    var str = JSON.stringify(val);
    localStorage.setItem(key, str);
}

function loadFromStorage(key) {
    var str = localStorage.getItem(key);
    return JSON.parse(str);
}