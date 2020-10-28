'use strict';

var gLocations;

function getSearchRes(term) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${term}&key=AIzaSyAb-nOgpqD_gjhW9jUy6raZW06HfTaFhPI`)
        .then(res => res.data)
}

function getCurrWeather(term) {
    const apiKey = 'aa7ad6b6ace55f0743177e2396dbcc10'
    return axios.get(`api.openweathermap.org/data/2.5/weather?q=${term}&appid=${apiKey}`)
        .then(res => console.log(res.data))
}


function setSearch(val) {
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