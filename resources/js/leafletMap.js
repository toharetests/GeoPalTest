require('leaflet');
require('leaflet-draw');

export default class LeafletMap {
    //region Setup
    constructor(startingLat, startingLng, startingZoom) {
        this.activeMarker = null; // Pointer to currently active marker so it can be disable later
        this.markerLayer = null; // Layer for drawing markers on

        const mapOptions = {drawControl: false}
        const startingCoords = [startingLat, startingLng];
        this.map =  L.map('leaflet-map', mapOptions)
            .fitWorld()
            .setView(startingCoords, startingZoom);
        this.addOSMLayer();
        this.addEditableLayer();
    }

    addOSMLayer() {
        // In a live environment there are copyright rules around using OSM tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map);
    }
    //endregion

    //region Markers
    replaceMarkers(markers) {
        const ctx = this;
        /**
         * Requirements:
         * 1) On click/tap show that items properties
         * 2) On click/tap change that items colour
         */
        const layer_settings = {
            name:'geoJSON',
            style: function() {
                return {color: window.markerColours.default};
            },
            pointToLayer: function(feature, latlng) {
                return new L.CircleMarker(latlng, {radius: 10, fillOpacity: 0.85});
            },
            onEachFeature: function(feature, layer) {
                layer.on({
                    click: function(marker) {
                        if (ctx.clickedMarker != null) {
                            ctx.setMarkerInactive(ctx.clickedMarker.target);
                        }
                        ctx.clickedMarker = marker;
                        ctx.setMarkerActive(marker.target);
                    }
                });

                // We can't guarantee what fields will be in the the GeoJSON file a user could upload
                // So I'm reformatting the JSON string and showing them.
                let html = "<strong>Location Data</strong><table>";

                for (let key in feature.properties) {
                    const value = feature.properties[key];
                    let uppercaseFirstLetterKey =  key.charAt(0).toUpperCase() + key.slice(1);
                    html += "<tr><td>" + uppercaseFirstLetterKey + "</td><td>" + value + "</td></tr>";
                }
                html += "</table>"

                let popupText = '<pre>' + html + '</pre>';

                // Binds a popup to each marker
                // Need to listen to popupclose in order to reset the active
                // marker
                const popup = layer.bindPopup(popupText, {
                    maxWidth:640
                });

                popup.on("popupclose", function(e) {
                    if (ctx.clickedMarker != null) {
                        ctx.setMarkerInactive(ctx.clickedMarker.target);
                    }
                });
            }
        }

        if (this.markerLayer != null) {
            this.map.removeLayer(this.markerLayer);
        }
        this.markerLayer = new L.GeoJSON(markers, layer_settings);
        this.markerLayer.addTo(this.map);
    }


    setMarkerActive(marker) {
        if (marker === null) {
            return;
        }

        marker.setStyle({
            color: window.markerColours.active
        })
    }

    setMarkerInactive(marker) {
        if (marker === null) {
            return;
        }

        marker.setStyle({
            color: window.markerColours.default
        })
    }

    updateMarkerColour(colour) {
        const ctx = this;
        window.markerColours.setDefault(colour);
        this.markerLayer.eachLayer(function(layer){
            ctx.setMarkerInactive(layer);
        });
    }
    //endregion

    //region User Interaction
    enableUserInteraction() {
        this.map.dragging.enable();
        this.map.doubleClickZoom.enable();
        this.map.scrollWheelZoom.enable();
    }

    disableUserInteraction() {
        this.map.dragging.disable();
        this.map.doubleClickZoom.disable();
        this.map.scrollWheelZoom.disable();
    }
    //endregion

    //region Drawing
    addEditableLayer() {
        this.editableLayers = new L.FeatureGroup(); // Layer for drawing rectangles on
        this.map.addLayer(this.editableLayers );
        let ctx = this; // Pointer to this so it can be accessed inside closure scopes
        let tableData = "";
    }

    drawNewRectangle() {
        this.deleteOldShapes();
        const rectangleDrawer = new L.Draw.Rectangle(this.map);
        rectangleDrawer.enable();
    }

    // Stop a messy sea of rectangles appearing
    deleteOldShapes() {
        const ctx = this;
        this.editableLayers.eachLayer(function(layer){
            ctx.map.removeLayer(layer);
        });
    }
    //endregion
}
