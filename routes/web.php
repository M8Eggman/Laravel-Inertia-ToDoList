<?php

use App\Http\Controllers\TodolistController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('tasks.index');
});

Route::get('/tasks', [TodolistController::class, 'index'])->name('tasks.index');
Route::post('/tasks/store', [TodolistController::class, 'store'])->name('tasks.store');
Route::put('/tasks/{todolist}/update', [TodolistController::class, 'update'])->name('tasks.update');
Route::put('/tasks/{todolist}/update_checked', [TodolistController::class, 'update_checked'])->name('tasks.update.checked');
Route::delete('/tasks/{todolist}/delete', [TodolistController::class, 'destroy'])->name('tasks.destroy');
Route::delete('/tasks/delete_all', [TodolistController::class, 'destroy_completed'])->name('tasks.destroy.completed');

