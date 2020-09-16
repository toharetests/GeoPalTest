<div class="modal fade widemodal" id="uploadModal" tabindex="-1" role="dialog" aria-labelledby="uploadGeoJsonModel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form id="upload-geojson-form">
                <div class="modal-header">
                    <h5 class="modal-title" id="uploadGeoJsonModel">Upload GeoJSON File</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text upload-prompt" id="upload-prompt">Upload</span>
                        </div>
                        <div class="custom-file">
                            <input name="new_geojson" type="file" class="custom-file-input" id="new_geojson"
                                   aria-describedby="File Input">
                            {{ csrf_field() }}
                            <label class="custom-file-label" for="file_input">Choose file</label>
                        </div>
                    </div>
                    <span style="padding: 0 5px" id="file_source"></span>
                    <div v-html="uploadValidationErrors" v-if="hasUploadValidationErrors" class="alert alert-danger">

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary" id="geojson-modal-submit">Submit</button>
                </div>
            </form>
        </div>
    </div>
</div>
