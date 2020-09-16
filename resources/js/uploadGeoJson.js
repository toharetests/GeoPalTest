export default class UploadGeoJsonForm {
    constructor() {
        this.hookFileInputToFileNameLabel();
        this.handleFormSubmit();
    }

    hookFileInputToFileNameLabel() {
        jQuery("#new_geojson").on('change', function(e){
            let filename = e.target.files[0].name ?? "";
            jQuery("#file_source").html(filename);
        });
    }

    handleFormSubmit() {
        jQuery("#upload-geojson-form").on('submit', function(e){
            e.preventDefault();

            let formData = new FormData(),
                fields = jQuery("#upload-geojson-form").serializeArray(),
                jsonFile = document.querySelector('#new_geojson');

            $.each( fields, function( i, field ) {
                formData.append(field.name, field.value);
            });

            formData.append("json", jsonFile.files[0]);
            axios.post('api/upload_file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(function(response){
                window.map.replaceMarkers(response.data);
                jQuery("#uploadModal").modal('toggle');
                window.vue.showButtons = true;

            }).catch(function(error){
                jQuery("#uploadModal").modal('toggle');

            });
        });
    }
}


