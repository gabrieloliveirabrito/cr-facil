<?php

namespace App\Http\Middleware;

use \Closure;
use \Google\Client as GoogleClient;
use \Illuminate\Http\Request;

class GoogleRefreshTokenMiddleware
{
    private GoogleClient $client;
    public function __construct(GoogleClient $client)
    {
        $this->client = $client;
    }

    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // $token = $request->bearerToken();
        // if ($token != null) {
        //     $this->client->setAccessToken($token);
        //     if ($this->client->isAccessTokenExpired()) {
        //         $this->client->fetchAccessTokenWithRefreshToken($refreshToken);
        //     }
        // }

        return $response;
    }
}