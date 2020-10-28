'use strict';

// import { storageService } from "./storage-service";

function getSearchRes(term) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${term}&key=AIzaSyCQigCXfm-p5j0gFc2LVoLLhd1EW1gXWTo`)
        .then(res => res.data)

}

function setSearch(val) {
    console.log('Just for func', val);
    const res = getSearchRes(val)
    console.log('After getting from axios:', res)
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