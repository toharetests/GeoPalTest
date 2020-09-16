<input data-toggle="modal" data-target="#uploadModal" type="button" id="upload" value="Upload" class="leaflet-control btn btn-primary btn-block" />
<input v-if="showButtons" v-on:click="lasso()" type="button" id="lasso" value="Lasso" class="leaflet-control btn btn-secondary btn-block" />
<input v-if="showButtons" data-toggle="modal" data-target="#colourPickerModal" type="button" id="colourpick" value="Colour Pick" class="leaflet-control btn btn-info  btn-block" />

