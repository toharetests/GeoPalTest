export default class UploadGeoJsonForm {
    constructor() {
        this.hookModalToBootstrapEvents()
        this.hookFileInputToFileNameLabel();
        this.handleFormSubmit();
    }

    // When a user adds a file show them the filename
    // Required because the bootstrappy input hides the file uploaded
    hookFileInputToFileNameLabel() {
        jQuery("#new_geojson").on('change', function(e){
            let filename = e.target.files[0].name ?? "";
            jQuery("#file_source").html(filename);
        });
    }

    //Axios call to server, checks for the valid GeoJSON and returns
    handleFormSubmit() {
        jQuery("#upload-geojson-form").on('submit', function(e){
            e.preventDefault();
            let ctx = this;
            window.vue.hasUploadValidationErrors = false;
            window.vue.uploadValidationErrors = "";

            //region Build POST data
            let formData = new FormData(),
                fields = jQuery("#upload-geojson-form").serializeArray(),
                jsonFile = document.querySelector('#new_geojson');

            $.each( fields, function( i, field ) {
                formData.append(field.name, field.value);
            });

            formData.append("json", jsonFile.files[0]);
            //endregion

            axios.post('api/upload_file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(function(response){
                window.map.replaceMarkers(response.data);
                jQuery("#uploadModal").modal('toggle');
                // When the user uploads a file they can then pick the rectangle and change the colour
                window.vue.showButtons = true;
            }).catch(function(error){
                const data = error.response.data;

                //region Build a string of validation errors
                let errorResponse = "<p><strong>" + data.message + "</strong></p><ul>";

                for (let _key in data.errors) {
                    let errors = data.errors[_key];

                    for (let error in errors) {
                        errorResponse += "<li>" + errors[error] + "</li>";
                    }
                }

                errorResponse += "<ul>";
                //endregion

                window.vue.hasUploadValidationErrors = true
                window.vue.uploadValidationErrors = errorResponse
            });
        });
    }

    hookModalToBootstrapEvents() {
        this.container = jQuery("#uploadModal");
        const ctx = this;
        this.container.on('hidden.bs.modal', function(){
            ctx.resetForm()
        })
    }

    resetForm() {
        jQuery("#upload-geojson-form").trigger("reset");
        window.vue.hasUploadValidationErrors = false;
        window.vue.uploadValidationErrors = "";
        jQuery("#file_source").html("");
    }
}


