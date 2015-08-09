angular.module('DotaPlayground')

  .factory('teamFactory', ['$resource', function($resource) {
    // return $resource('api/teams');
    return {
      teamAPI: function() {
        return $resource('api/teams');
      },
      teams: [],
      initialLoad: true
    };
  }]);
