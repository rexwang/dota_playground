angular.module('DotaPlayground')

  .factory('teamFactory', ['$resource', function($resource) {
    return $resource('api/teams');
  }]);
