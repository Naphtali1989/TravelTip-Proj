'use strict';

const STORAGE_LOC_KEY = 'locationsDB';
var gLocations;

function getSearchRes(term) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${term}&key=AIzaSyAb-nOgpqD_gjhW9jUy6raZW06HfTaFhPI`)
        .then(res => res.data)
}

function setSearch(val) {
    var currLocation;
    getSearchRes(val)
        .then(ans => {
            currLocation = {
                searchTerm: val,
                results: ans.results,
            }
            return currLocation;
        })
        .then(saveLocationsToStorage);
    // 
}

function saveLocationsToStorage(currLocation) {
    gLocations = loadFromStorage(STORAGE_LOC_KEY);
    if (!gLocations) gLocations = [];
    gLocations.push(currLocation);
    saveToStorage(STORAGE_LOC_KEY, gLocations);
    console.log('gLocations is:', gLocations)
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