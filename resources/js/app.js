require('./bootstrap');

import Lasso from "./lasso";
import UploadGeoJsonForm from "./uploadGeoJson";
import ColourPicker from "./colourPicker";
import LeafletMap from "./leafletMap";
import MarkerColours from "./markerColours";
import Vue from 'vue';

jQuery(function() {
    window.vue = bootVue();
    window.map = bootMap();
    window.lasso = bootLasso();
    window.geoJsonForm = bootGeoJsonForm();
    window.markerColours = bootMarkerColours();
    window.colourPicker = bootColourPicker();

});

function bootVue() {
    return new Vue({
        el: '#app',
        components: {},
        data() {
            return {
                showButtons:false,
                hasUploadValidationErrors:false,
                uploadValidationErrors:""
            }
        },
        methods: {
            lasso() {
                window.map.drawNewRectangle();
            }
        }
    })
}

function bootLasso() {
    return new Lasso();
}

function bootGeoJsonForm() {
    return new UploadGeoJsonForm();
}

function bootMarkerColours() {
    return new MarkerColours();
}

//https://iro.js.org/
function bootColourPicker() {
    return new ColourPicker();
}

//https://leafletjs.com/
function bootMap() {
    return new LeafletMap(39, -77, 12);
}
