'use strict';

const STORAGE_LOC_KEY = 'locationsDB';
var gLocations;
var gCurrLocation = {};

function getSearchRes(term) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${term}&key=AIzaSyAb-nOgpqD_gjhW9jUy6raZW06HfTaFhPI`)
        .then(res => res.data)
}

function getWeather(term) {
    console.log('term is:', term);
    const apiKey = 'aa7ad6b6ace55f0743177e2396dbcc10';
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${term}&appid=aa7ad6b6ace55f0743177e2396dbcc10`)
        .then(res => res.data)
}


function setSearch(val) {
    getCurrWeather(val)
        .then(res => {
            const { icon, description } = res.weather[0];
            const { speed } = res.wind;
            const { humidity, temp } = res.main;
            console.log(res);
            const currWeather = {
                icon,
                description,
                speed,
                humidity,
                temp: convertToCelius(temp)
            }
            console.log('response from weather API:', currWeather);
            return currWeather;
        })
    getSearchRes(val)
        .then(ans => {
            gCurrLocation.searchTerm = val;
            gCurrLocation.results = ans.results;
            gCurrLocation.createdAt = Date.now();
            gCurrLocation.updatedAt = Date.now();
            console.log(gCurrLocation)
            return gCurrLocation;
        })
        .then(saveLocationsToStorage)
}

function setCurrWeather(val) {
    getWeather(val)
        .then(res => {
            const { icon, description } = res.weather[0];
            const { speed } = res.wind;
            const { humidity, temp } = res.main;
            gCurrLocation.weather = {
                    icon,
                    description,
                    speed,
                    humidity,
                    temp: convertToCelius(temp)
                }
                // console.log('response from weather API:', currWeather);
        })
}

function getCurrLocation() {
    return gCurrLocation;
}


function getCurrWeather() {
    return gCurrLocation.weather;
}



function saveLocationsToStorage(currLocation) {
    gLocations = loadFromStorage(STORAGE_LOC_KEY);
    if (!gLocations) gLocations = [];
    gLocations.push(currLocation);
    saveToStorage(STORAGE_LOC_KEY, gLocations);
    console.log('gLocations is:', gLocations)
}

export const travelService = {
    setSearch,
    getCurrWeather,
    getCurrLocation,

}


function convertToCelius(temp) {
    return parseInt(temp - 273.15);
}

function saveToStorage(key, val) {
    var str = JSON.stringify(val);
    localStorage.setItem(key, str);
}

function loadFromStorage(key) {
    var str = localStorage.getItem(key);
    return JSON.parse(str);
}