<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Provider
 *
 * @property int $id
 * @property string $provider
 * @property string $provider_id
 * @property int $user_id
 * @property string|null $avatar
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Provider newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Provider newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Provider query()
 * @method static \Illuminate\Database\Eloquent\Builder|Provider whereAvatar($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Provider whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Provider whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Provider whereProvider($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Provider whereProviderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Provider whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Provider whereUserId($value)
 * @mixin \Eloquent
 * @property string $access_token
 * @property string $refresh_token
 * @property string $check_token
 * @method static \Illuminate\Database\Eloquent\Builder|Provider whereAccessToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Provider whereCheckToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Provider whereRefreshToken($value)
 */
class Provider extends Model
{
    use HasFactory;

    protected $fillable = [
        'provider', 'provider_id', 'user_id',
        'avatar', 'access_token', 'refresh_token',
        'check_token'
    ];

    protected $hidden = ['created_at', 'updated_at'];
}