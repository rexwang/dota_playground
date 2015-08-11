angular.module('DotaPlayground')

  .factory('teamFactory', ['$resource', function($resource) {
    // return $resource('api/teams');
    return {
      teamAPI: function() {
        var teams = $resource('api/teams/:id', {id: '@id'}, {
          'update': { method:'PUT' }
        });
        return teams;
      },
      teams: [],
      initialLoad: true
    };
  }]);
