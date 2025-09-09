<?php

namespace App\Http\Controllers;

use App\Models\Theme;
use App\Models\Todolist;
use App\Http\Requests\StoreTodolistRequest;
use App\Http\Requests\UpdateTodolistRequest;
use Inertia\Inertia;
use Request;

class TodolistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $taches = Todolist::all();
        $themes = Theme::all();
        $activeTheme = Theme::where("active", true);

        $lastId = Todolist::max('id') ?? 0;

        return Inertia::render('ToDoList', compact('taches', 'themes', 'activeTheme', 'lastId'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTodolistRequest $request)
    {
        $tache = new Todolist();

        $request->validate([
            'title' => ['required', 'string', 'max:50'],
            'completed' => ['boolean']
        ]);

        $tache->title = $request->title;
        $tache->completed = $request->completed;

        $tache->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(Todolist $todolist)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todolist $todolist)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTodolistRequest $request, $id)
    {
        $request->validate([
            'title' => ['required', 'string', 'max:50'],
            'completed' => ['required', 'boolean']
        ]);

        $todolist = Todolist::findOrFail($id);

        $todolist->title = $request->title;
        $todolist->completed = $request->completed;

        $todolist->update();

        return;
    }
    public function update_checked(UpdateTodolistRequest $request, $id)
    {
        $request->validate([
            'completed' => ['required', 'boolean']
        ]);

        $todolist = Todolist::findOrFail($id);

        $todolist->completed = $request->completed;

        $todolist->update();

        return;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Todolist::findOrFail($id)->delete();
        return;
    }
    public function destroy_completed()
    {
        Todolist::where("completed", true)->delete();
        return;
    }
}
