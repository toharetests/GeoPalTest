<?php

use App\Http\Controllers\GeoPalController;
use Illuminate\Support\Facades\Route;

Route::get('/', [GeoPalController::class, 'index']);
