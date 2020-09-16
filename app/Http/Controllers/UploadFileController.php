<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use YucaDoo\LaravelGeoJsonRule\GeoJsonRule;

class UploadFileController extends Controller
{
    function index(Request $request) {
        //region Custom Validation for GeoJSON
        Validator::extend('geojson', function($attribute, $value, $parameters){
            if ("undefined" == $value) {
                return false;
            }

            try {
                $src = $value->get();

                $validator = Validator::make(
                    ['geometry' => $src],
                    ['geometry' => new GeoJsonRule()] // Accept any geometry
                );
                return $validator->passes();

            } catch (\Exception $e) {
                return false;
            }
        });
        //endregion;

        $this->validate($request, [
            'json' => 'required|geojson',
        ]);

        try {
            $file_source = $request -> file('json') -> get();
            $json = json_decode($file_source);
            return response() -> json($json);
        } catch (\Exception $e) {
            return [];
        }
    }
}
