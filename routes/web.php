<?php

use App\Http\Controllers\TodolistController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('tasks.index');
});

Route::get('/tasks', [TodolistController::class, 'index'])->name('tasks.index');
Route::delete('/tasks/{todolist}/delete', [TodolistController::class, 'destroy'])->name('tasks.destroy');
Route::delete('/tasks/completed/delete', [TodolistController::class, 'destroy_completed'])->name('tasks.destroy.completed');

