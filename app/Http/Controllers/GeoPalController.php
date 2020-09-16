<?php


namespace App\Http\Controllers;


class GeoPalController extends Controller
{
    function index() {
        return response() -> view('index');
    }

}
