<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;

class UploadFileController
{
    function index() {
        try {
            $file_source = Request::file('json') -> get();
            $json = json_decode($file_source);
            return response() -> json($json);
        } catch (\Exception $e) {
            return [];
        }
    }
}
