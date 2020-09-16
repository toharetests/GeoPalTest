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

    hookModalEventsToMap() {
        this.container.on('show.bs.modal', function(){
            window.map.disableUserInteraction();
        });

        this.container.on('hidden.bs.modal', function(){
            window.map.enableUserInteraction();
        })

    }

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
