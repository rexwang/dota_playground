angular.module('DotaPlayground')

  .directive('teamInfo', [
    'teamFactory',
    'regionFactory',
    '$modal',
    function(teamFactory, regionFactory, $modal) {
      return {
        scope: {},
        templateUrl: 'templates/directives/team-info.tpl.html',
        link: function(scope) {
          var modalInstance;
          scope.regions = regionFactory;

          if (teamFactory.initialLoad) {
            // If initial load, query teams from API, and
            // update the teams array in teamFactory.
            scope.teams = teamFactory.teamAPI().query();
            teamFactory.teams = scope.teams;
          } else {
            // If not initial load, simply read the array
            // in teamFactory.
            scope.teams = teamFactory.teams;
          }

          scope.open = function(size) {
            modalInstance = $modal.open({
              animation: true,
              templateUrl: 'templates/partials/teams/team-modal.html',
              resolve: {
                items: function () {
                  return teamFactory.teams;
                }
              }
            });

            modalInstance.result.then(function (selectedItem) {
              scope.selected = selectedItem;
            }, function () {
              console.log('Canceled');
            });
          };
        }
      };
    }
  ]);
