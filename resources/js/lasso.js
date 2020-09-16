export default class Lasso {
    constructor() {
        this.hookLassoToCreateDataTable();
        this.hookCloseModalToRemoveRectangle()
    }

    // Giant string
    hookLassoToCreateDataTable() {
        const ctx = this;
        window.map.map.on(L.Draw.Event.CREATED, function (e) {
            let layer = e.layer;
            ctx.markersInRectangle = "<table data-toggle=\"table\" id='locationsingrid' class='table'><thead><tr><td>Address</td><td>Latitude</td><td>Longitude</td></tr></thead><tbody>";

            window.map.markerLayer.eachLayer(function (marker) {
                if (layer.getBounds().contains(marker.getLatLng())) {
                    let latLng = marker.getLatLng();
                    let address = marker.feature.properties['address'] ?? "Unknown";

                    ctx.markersInRectangle += "<tr><td>" + address + "</td>" +
                        "<td>" + latLng.lat + "</td>" +
                        "<td>" + latLng.lng + "</td></tr>";

                }
            });
            ctx.markersInRectangle += "</tbody></table>"
            ctx.updateTable(ctx.markersInRectangle);
        });
    }

    updateTable(html) {
        jQuery(".locations-container").html(html);
        jQuery("#locationsingrid").DataTable({responsive: true });
        jQuery("#locationsModal").modal('toggle');
    }

    //Cleanup form when Modal closes
    hookCloseModalToRemoveRectangle() {
        this.container = jQuery("#locationsModal");

        this.container.on('hidden.bs.modal', function(){
            window.map.deleteOldShapes();
        })
    }
}
