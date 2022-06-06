<?php

namespace App\Http\Middleware;

use \Closure;
use \Google\Client as GoogleClient;
use \Illuminate\Http\Request;
use \Google\Service\OAuth2;

class GoogleClientMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        app()->singleton(GoogleClient::class, static function () use ($request) {
            $client = new GoogleClient();
            $client->setApplicationName("CF Fácil");
            $client->setClientId(config("services.google.client_id"));
            $client->setClientSecret(config("services.google.client_secret"));
            $client->setRedirectUri(config("services.google.redirect"));
            $client->setAccessType('offline');
            $client->setApprovalPrompt("force");
            $client->setScopes([OAuth2::USERINFO_EMAIL, OAuth2::USERINFO_PROFILE]);
            $client->setIncludeGrantedScopes(true);

            return $client;
        });

        return $next($request);
    }
}