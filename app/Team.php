<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $table = 'teams';
    protected $fillable = array('name', 'country', 'region', 'active', 'created_on', 'overview');
}
