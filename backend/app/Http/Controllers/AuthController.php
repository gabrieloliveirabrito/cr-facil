<?php

namespace App\Http\Controllers;

use App\Models\Provider;
use App\Models\User;
use Illuminate\Http\Request;
use Google\Client as GoogleClient;
use Google\Service\OAuth2;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    private GoogleClient $client;

    public function __construct(GoogleClient $client)
    {
        $this->client = $client;
    }

    function login(Request $request)
    {
        return response()->json(['a' => 'b']);
    }

    protected function validateProvider($provider)
    {
        if (!in_array($provider, ['google']))
            return response()->json(["error" => "Invalid provider detected!"]);
    }

    function validateToken(Request $request)
    {
        $token = PersonalAccessToken::findToken($request->bearerToken());
        return response()->json([
            "User" => $token->all(),
            "Token" => $request->bearerToken(),
        ]);
    }

    function redirectToProvider($provider)
    {
        $validated = $this->validateProvider($provider);
        if (!is_null($validated)) return $validated;

        $checkToken = Hash::make(Str::random(20));
        $this->client->setState($checkToken);

        $authUrl = $this->client->createAuthUrl();
        return response()->json([
            "authUrl" => $authUrl,
            "checkToken" => $checkToken
        ]);
    }

    function handleCallback(Request $request, $provider)
    {
        $validated = $this->validateProvider($provider);
        if (!is_null($validated)) return $validated;

        $code = $request->query("code");
        $checkToken = $request->query("state");

        $result = $this->client->fetchAccessTokenWithAuthCode($code);

        if (isset($result['error']))
            return response()->json($result);

        $oauth = new OAuth2($this->client);
        $profile = $oauth->userinfo->get();

        $user = User::firstOrCreate(
            [
                'email' => $profile->getEmail(),
            ],
            [
                'name' => $profile->getName(),
                'email' => $profile->getEmail(),
                'email_verified_at' => now(),
                'remember_token' => Str::random(10),
            ]
        );

        $provider = $user->providers()->updateOrCreate(
            [
                'provider' => $provider,
                'provider_id' => $user->id,
            ],
            [
                'avatar' => $profile->getPicture(),
                'access_token' => $result['access_token'],
                'refresh_token' => $result['refresh_token'],
                'check_token' => $checkToken,
            ]
        );

        return "Pode fechar esta janela!";
        //return "<script>window.close();</script>";
    }

    public function checkToken(Request $request, $provider)
    {
        $validated = $this->validateProvider($provider);
        if (!is_null($validated)) return $validated;

        $checkToken = $request->query("ct");

        if (!isset($checkToken)) return response('Invalid Token', 400);

        $providerData = Provider::whereProvider($provider)->whereCheckToken($checkToken)->first();
        if (is_null($providerData)) return response('Invalid or Expired token!', 400);

        $user = User::whereId($providerData->user_id)->first();
        $token = $user->createToken('User OAuth Token')->plainTextToken;

        return response()->json([
            'User' => $user,
            'Token' => $token,
        ]);
    }
}