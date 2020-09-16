export default class Lasso {
    constructor() {
        this.hookLassoToDataTable();
        this.hookCloseModalToRemoveRectangle()
    }

    hookLassoToDataTable() {
        const ctx = this;
        window.map.map.on(L.Draw.Event.CREATED, function (e) {
            var layer = e.layer;

            window.map.editableLayers.addLayer(layer);

            ctx.markersInRectangle = "<table data-toggle=\"table\" id='locationsingrid' class='table'><thead><tr><td>Address</td><td>Latitude</td><td>Longitude</td></tr></thead><tbody>";

            if (window.map.markerLayer === null) {
                return;
            }
            window.map.markerLayer.eachLayer(function (marker) {
                if (layer.getBounds().contains(marker.getLatLng())) {
                    let latLng = marker.getLatLng();
                    let address = marker.feature.properties['address'] ?? "Unknown";

                    ctx.markersInRectangle += "<tr><td>" + address + "</td><td>" + latLng.lat + "</td>" +
                        "<td>" + latLng.lng + "</td></tr>";

                }
            });
            ctx.markersInRectangle += "</tbody></table>"
            ctx.updateTable(ctx.markersInRectangle);
        });
    }

    updateTable(html) {
        jQuery(".locations-container").html(html);
        jQuery("#locationsingrid").DataTable({
            //scrollY:400,
        });
        jQuery("#locationsModal").modal('toggle');

    }

    hookCloseModalToRemoveRectangle() {
        this.container = jQuery("#locationsModal");

        this.container.on('hidden.bs.modal', function(){
            window.map.deleteOldShapes();
        })
    }
}
