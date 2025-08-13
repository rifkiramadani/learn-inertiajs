<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Post::factory()->count(10)->for(User::create([
            'name' =>  "Admin",
            'email' => "admin@gmail.com",
            'password' => bcrypt('12345678')
        ]))->create();
    }
}
