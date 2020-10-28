'use strict';

import { travelService } from './services/travel-service.js';
import { mapService } from './services/map-service.js';

var gMap;




window.onload = () => {
    initMap()
        .then(() => {
            addMarker({ lat: 32.0749831, lng: 34.9120554 });
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
    var elInput = document.querySelector('input[name=search-bar]')
    travelService.setSearch(elInput.value)
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
























// function onInit() {
//     console.log('Hello Tips!');
//     // mapService.initMap()
//     document.querySelector('.search-form').addEventListener('submit', onSetSearch)
// }

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