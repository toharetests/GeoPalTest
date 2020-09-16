export default class Lasso {
    constructor() {
        this.hookLassoToDataTable();
    }

    hookLassoToDataTable() {
        const ctx = this;
        window.map.map.on(L.Draw.Event.CREATED, function (e) {
            var layer = e.layer;

            window.map.editableLayers.addLayer(layer);

            ctx.markersInRectangle = "<table data-toggle=\"table\" id='locationsingrid' class='table'><thead><tr><td>Latitude</td><td>Longitude</td><td>Address</td></tr></thead><tbody>";

            if (window.map.markerLayer === null) {
                return;
            }
            window.map.markerLayer.eachLayer(function (marker) {
                if (layer.getBounds().contains(marker.getLatLng())) {
                    let latLng = marker.getLatLng();
                    let address = marker.feature.properties['address'] ?? "Unknown";

                    ctx.markersInRectangle += "<tr><td>" + latLng.lat + "</td>" +
                        "<td>" + latLng.lng + "</td>" + "<td>" + address + "</td></tr>";

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

}
