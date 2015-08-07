angular.module('DotaPlayground')

  .directive('addATeam', ['teamFactory', function(teamFactory) {
    return {
      templateUrl: 'templates/directives/add-a-team.tpl.html',
      link: function(scope) {
        scope.addATeam = function(team) {
          scope.teams = teamFactory.query();
        };
      }
    };
  }]);
