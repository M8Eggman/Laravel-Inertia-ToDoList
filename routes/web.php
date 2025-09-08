<?php

use App\Http\Controllers\TodolistController;
use Illuminate\Support\Facades\Route;

Route::get('/', [TodolistController::class, 'index']);
