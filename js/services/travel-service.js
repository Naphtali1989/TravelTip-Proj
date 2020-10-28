'use strict';

const STORAGE_LOC_KEY = 'locationsDB';
var gLocations;

function getSearchRes(term) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${term}&key=AIzaSyAb-nOgpqD_gjhW9jUy6raZW06HfTaFhPI`)
        .then(res => res.data)
}

function setSearch(val) {
    getSearchRes(val)
        .then(res => {
            var location =

                console.log('After getting from axios:', res)
        })
        // saveLocationsToStorage(currLocation)
}

function saveLocationsToStorage(currLocation) {
    gLocations = loadFromStorage();
    gLocations.push(currLocation);
    saveToStorage(STORAGE_LOC_KEY, gLocations);
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