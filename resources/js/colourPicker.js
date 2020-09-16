import iro from '@jaames/iro';

export default class ColourPicker {
    constructor() {
        this.colourPicker = new iro.ColorPicker('#picker', {
            color: window.markerColours.default,
            layoutDirection:'horizontal'
        });
        this.container = jQuery("#colourPickerModal");
        this.hookModalEventsToMap();
        this.hookColourPickerChangeToMarkers();
    }

    /**
     *     When a user moves the colour picker it causes the map to move.
     *     This looks awful
     *     So disable the map when the colour picker is visible and re-enable the map when the
     *     picker is closed
     */
    hookModalEventsToMap() {
        this.container.on('show.bs.modal', function(){
            window.map.disableUserInteraction();
        });

        this.container.on('hidden.bs.modal', function(){
            window.map.enableUserInteraction();
        })

    }

    /**
     * The Leaflet markers are actually polygon circles
     * Leaflet markers used images as of 16/09/2020
     * Circles can use CSS
     */
    hookColourPickerChangeToMarkers() {
        const ctx = this;
        const submitButton = jQuery("#updateIconColours");

        submitButton.on('click', function(){
            let colour = ctx.colourPicker.color.hexString;
            window.map.updateMarkerColour(colour);
            ctx.container.modal('toggle');
        })
    }
}
