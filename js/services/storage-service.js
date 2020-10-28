'use strict';

function saveToStorage(key, val) {
    var str = JSON.stringify(val);
    localStorage.setItem(key, str);
}

function loadFromStorage(key) {
    var str = localStorage.getItem(key);
    return JSON.parse(str);
}


//export the service
export const storageService = {
    justForTest,
    saveToStorage,
    loadFromStorage,
}

function justForTest() {
    console.log('hello!')
}