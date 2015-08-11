<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateTeamRequest;
use App\Team;

class TeamsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $teams = Team::orderBy('name', 'ASC')->get();

        // To protect json vulnerability, prefix the response
        // with a special string, Angular will automatically
        // strip out it.
        return ")]}',\n" . json_encode($teams);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(CreateTeamRequest $request)
    {
        // The request params are already been validated
        // by CreateTeamRequest
        $team = Team::create($request->all());
        return $team;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $team = Team::find($id);
        return $team;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        // $affectedRows = Team::find($id)->update(['name' => $request->get('name')]);
        $affectedRows = Team::find($id)->update($request->all());

        if ($affectedRows) {
            return 'update success';
        } else {
            return 'update failed';
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        $deleteTeam = Team::find($id)->delete();
        if ($deleteTeam) {
            return ['id' => $id];
        } else {
            return 0;
        }
    }
}
