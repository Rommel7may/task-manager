<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Inertia\Inertia;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = [
            [
                'id' => 1,
                'subject' => 'Math',
                'title' => 'Math Homework 1',
                'description' => 'Algebra exercises',
                'class' => 'IT 1C',
                'uploader_id' => 1,
                'due_date' => '2025-12-05',
            ],
            [
                'id' => 2,
                'subject' => 'Science',
                'title' => 'Science Project',
                'description' => 'Build a volcano',
                'class' => 'IT 1C',
                'uploader_id' => 2,
                'due_date' => '2025-12-10',
            ]
        ];

        return Inertia::render('task', compact('tasks'));
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    // public function show(Task $task)
    public function show()
    {
        $tasks = [
            [
                'id' => 1,
                'subject' => 'Math',
                'title' => 'Math Homework 1',
                'description' => 'Algebra exercises',
                'class' => 'IT 1C',
                'uploader_id' => 1,
                'due_date' => '2025-12-05',
            ],
            [
                'id' => 2,
                'subject' => 'Science',
                'title' => 'Science Project',
                'description' => 'Build a volcano',
                'class' => 'IT 1C',
                'uploader_id' => 2,
                'due_date' => '2025-12-10',
            ]
        ];

        return Inertia::render('show-task', compact('tasks'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
