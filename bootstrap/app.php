<?php

use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Foundation\Application;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use phpDocumentor\Reflection\Types\Boolean;


return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
    $exceptions->respond(function (Response $response) {
        if (shouldRenderCustomErrorPages() && in_array($response->getStatusCode(), [403, 404])) {
            return Inertia::render('error', [
                'status' => $response->getStatusCode(),
            ]);
        }

        return $response;
    });
    })->create();

function shouldRenderCustomErrorPages(): bool
{
    // if (app()->environment(['local', 'testing'])) {
    //     return false;
    // };

    return (config('app.custom_error_pages_enable'));

    return false;
}
