<?php

declare(strict_types=1);

namespace Modules\Auth\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

final class AuthController
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Auth/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(): void
    {
        //
    }

    /**
     * Show the specified resource.
     */
    public function show(): Response
    {
        return Inertia::render('Auth/Show', [
            //
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(): Response
    {
        return Inertia::render('Auth/Edit', [
            //
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(): void
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(): void
    {
        //
    }
}
