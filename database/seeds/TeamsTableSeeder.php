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
          'name' => 'Team DK',
          'country' => 'China'
        ]);
        Team::create([
          'name' => 'New Bee',
          'country' => 'China'
        ]);
        Team::create([
          'name' => 'Navi',
          'country' => 'Ukrine'
        ]);
    }
}
