<?php

use Illuminate\Database\Seeder;
use App\Team;

class TeamsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('teams')->delete();

        Team::create([
          'name' => 'Brave Heart',
          'country' => 'China',
          'region' => 'Asia',
          'active' => true,
          'created_on' => '2014-12-15',
          'overview' => 'is a Chinese e-Sports organisation currently fielding teams in Starcraft 2, Heroes of the Storm, and Dota 2.'
        ]);
        Team::create([
          'name' => 'CDEC Gaming',
          'country' => 'China',
          'region' => 'Asia',
          'active' => true,
          'created_on' => '2014',
          'overview' => 'In October 2014, the former LGD Gaming "youth" squad LGD.CDEC left the LGD Gaming organization to establish an independent club called CDEC Gaming.'
        ]);
    }
}
