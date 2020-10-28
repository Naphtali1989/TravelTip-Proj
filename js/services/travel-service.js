'use strict';

const STORAGE_LOC_KEY = 'locationsDB';
var gLocations;
var gCurrLocation;

function getSearchRes(term) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${term}&key=AIzaSyAb-nOgpqD_gjhW9jUy6raZW06HfTaFhPI`)
        .then(res => res.data)
}

function getCurrWeather(term) {
    console.log('term is:', term);
    const apiKey = 'aa7ad6b6ace55f0743177e2396dbcc10';
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${term}&appid=aa7ad6b6ace55f0743177e2396dbcc10`)
        .then(res => res.data)
}


function setSearch(val) {
<<<<<<< HEAD
=======
    console.log('got val from:', val);
    getSearchRes(val)
        .then(res => {
            var location = console.log('After getting from axios:', res)
        })
    getCurrWeather(val)
        .then(res => {
            console.log('response from weather API:', res);
        })
    var currLocation;
>>>>>>> 8245dc59da0f8cdec5997b465bc5fff9bac96de9
    getSearchRes(val)
        .then(ans => {
            gCurrLocation = {
                searchTerm: val,
                results: ans.results,
            }
            return gCurrLocation;
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