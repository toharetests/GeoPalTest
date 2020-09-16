<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;

class UploadFileController extends Controller
{
    function index(Request $request) {
        $this->validate($request, [
            'json' => 'required|mimes:json',
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
