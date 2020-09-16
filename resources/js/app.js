require('./bootstrap');
require('./uploadGeoJson');

// import Vue from 'vue';
import ColourPicker from "./colourPicker";
import LeafletMap from "./leafletMap";
import MarkerColours from "./markerColours";

jQuery(function() {
    window.markerColours = bootMarkerColours();
    // window.vue = bootVue();
    // window.colourPicker = bootColourPicker();
    window.map = bootMap();
});

function bootMarkerColours() {
    return new MarkerColours();
}

function bootVue() {
    return new Vue({
        el: '#app',
        components: {}
    })
}

function bootColourPicker() {
    return new ColourPicker();
}

function bootMap() {
    return new LeafletMap(39, -77, 12);
}


