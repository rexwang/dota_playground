<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tournament extends Model
{
    protected $table = 'tournaments';
    protected $fillable = array('name', 'organizer', 'start_date', 'end_date', 'location', 'format', 'prize_pool', 'status');
}
