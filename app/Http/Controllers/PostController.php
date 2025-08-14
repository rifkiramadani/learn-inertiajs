<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('user')->latest()->get();
        $now = now();

        return Inertia::render('posts/index', [
            'posts' => PostResource::collection($posts),
            'now' => $now
        ]);
    }

    public function store(StorePostRequest $request)
    {
        // dd($request->all());
        // $request->validated();

        Auth::user()->posts()->create(
            $request->validated()
        );

        return redirect('/posts');
    }
}
