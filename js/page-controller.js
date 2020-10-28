'use strict';

import { travelService } from './services/travel-service.js';
import { mapService } from './services/map-service.js';

var gMap;




window.onload = () => {
    initMap()
        .then(() => {
            addMarker({ lat: 32.0749831, lng: 34.9120554 });
            const locations = travelService.getLocations();
            renderLocations(locations);
        })
        .catch(console.log);
}

document.querySelector('.search-form').addEventListener('submit', onSetSearch)
document.querySelector('.loc-btn').addEventListener('click', onFindUserLocation)


function initMap(lat = 32.0749831, lng = 34.9120554) {
    return _connectGoogleApi()
        .then(() => {
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                    center: { lat, lng },
                    zoom: 15
                })
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'This place sucks!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

function onSetSearch(ev) {
    ev.preventDefault()
    var elInput = document.querySelector('input[name=search-bar]');
    travelService.setSearch(elInput.value).then(location => {
        const locations = travelService.getLocations();
        renderLocations(locations)
        renderWeatherBox(location.id);
    })

}




function renderWeatherBox(locId) {
    const location = travelService.getLocById(locId)
    console.log();
    const { description, humidity, icon, speed, temp } = location.weather;
    const iconImg = `https://openweathermap.org/img/wn/${icon}@2x.png`
    const strHtml = `<div class="weather-card">
                   <h1>Weather At <span>${location.searchTerm}</span></h1>
                   <img src="${iconImg}" />
                   <div class="weather-info">
                        <span>${description}</span>
                        <span>Temp: ${temp}Celcious</span>
                        <span>humidity: ${humidity}</span>
                        <span>Wind speed: ${speed}</span>
                   </div>
                </div>
                `
    document.querySelector('.weather-container').innerHTML = strHtml;
}
// function renderWeatherBox(locId) {
//     console.log('Weather locations:', locations);
//     const location = travelService.getLocById(locId)
//     const strHtmls = locations.map(loc => {
//         const { description, humidity, icon, speed, temp } = loc.weather
//         return `<div class="weather-card">
//                    <h1>Weather At <span>${loc.searchTerm}</span></h1>
//                    <img src="${iconImg}" />
//                    <div class="weather-info">
//                         <span>${description}</span>
//                         <span>Temp: ${temp}Celcious</span>
//                         <span>humidity: ${humidity}Celcious</span>
//                         <span>Wind speed: ${speed}</span>
//                    </div>
//                 </div>
//                 `
//     }).join('');
//     document.querySelector('.weather-container').innerHTML = strHtmls;
// }




function renderLocations(locations) {
    const strHtmls = locations.map(loc => {
        const { lat, lng } = loc.results[0].geometry.location
        const formatTime = new Date(loc.createdAt).toLocaleString();
        return `<div class="loc-card" data-id="${loc.id}" data-loc="${lat}-${lng}">
                   <h1>Location Name:${loc.searchTerm}</h1>
                   <span>Created at: ${formatTime}</span>
                   <div class="loc-btns">
                        <button class="delete-btn">Delete</button>
                        <button class="show-loc-btn">Show</button>
                   </div>
                </div>
                `
    }).join('');
    document.querySelector('.locations').innerHTML = strHtmls;
}

function onFindUserLocation() {
    mapService.getPosition()
        .then(ans => {
            var location = { lat: ans.coords.latitude, lng: ans.coords.longitude };
            panTo(location.lat, location.lng);
            addMarker(location);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

mapService.getLocs()
    .then(locs => console.log('locs', locs))


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyAb-nOgpqD_gjhW9jUy6raZW06HfTaFhPI';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

























// function renderMyLocations() {
//     console.log('this is going to be my locations')
// }

// function renderCurrLocation() {
//     console.log('this is the curr locations')

// }

// function renderWeatherBox() {
//     console.log('this is where we render the weather')

// }


// test if export works: 
// travelService.iAmAFunction()
// mapService.iAmAMap()
// storageService.justForTest()