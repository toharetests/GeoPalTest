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

            window.vue.hasUploadValidationErrors = false;
            window.vue.uploadValidationErrors = "";

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
                console.log(response, 'response');
                window.map.replaceMarkers(response.data);
                jQuery("#uploadModal").modal('toggle');
                window.vue.showButtons = true;

            }).catch(function(error){
                const data = error.response.data;
                let errorResponse = "<p><strong>" + data.message + "</strong></p><ul>";

                console.log(data.errors);

                for (let _key in data.errors) {
                    let errors = data.errors[_key];

                    console.log(errors, 'errors');

                    for (let error in errors) {
                        errorResponse += "<li>" + errors[error] + "</li>";
                    }
                }

                errorResponse += "<ul>";

                window.vue.hasUploadValidationErrors = true
                window.vue.uploadValidationErrors = errorResponse
                console.log(errorResponse);
                //jQuery("#uploadModal").modal('toggle');

            });
        });
    }
}


