<?php

use Illuminate\Database\Seeder;
use App\Tournament;

class TournamentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tournaments')->delete();

        Tournament::create([
          'name' => 'Dota Pit League Season 3',
          'organizer' => 'Dota Pit',
          'start_date' => '2015-01-21',
          'end_date' => '2015-07-12',
          'location' => 'online',
          'format' => 'Groups into Double-elimination Bracket',
          'prize_pool' => '$265,378+',
          'status' => 'concluded'
        ]);
    }
}
