<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Google\Client as GoogleClient;

class HomeController extends BaseController
{
    private GoogleClient $client;

    public function __construct(GoogleClient $client)
    {
        $this->client = $client;
    }

    public function index()
    {
        return print_r($this->client);
    }
}