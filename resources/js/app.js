require('./bootstrap');

import Vue from 'vue';
import ColourPicker from "./ColourPicker";

//Setup Colour Picker
window.colourPicker = new ColourPicker();

const app = new Vue({
    el: '#app',
    components: {
    }
});

