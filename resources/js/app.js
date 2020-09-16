require('./bootstrap');

import Vue from 'vue';
import HelloWorld from './components/HelloWorld';



const app = new Vue({
    el: '#app',
    components: {
        HelloWorld
    }
});

