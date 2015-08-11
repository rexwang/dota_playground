angular.module('DotaPlayground')

  .directive('addATeam', [
    'teamFactory',
    'regionFactory',
    '$timeout',
    function(teamFactory, regionFactory, $timeout) {
      return {
        scope: {
          team: '=',
          update: '='
        },
        templateUrl: 'templates/directives/add-a-team.tpl.html',
        link: function(scope) {
          // Datepicker setup
          scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
          };
          scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
          scope.format = scope.formats[0];

          scope.regions = regionFactory.getRegions();

          scope.addATeam = function(team) {
            teamFactory.teamAPI().save(team).$promise
              .catch(function(response) {
                if (response.status == 422) {
                  scope.errors = response.data;
                }
              })
              .then(function(response) {
                if (response) {
                  // Hide the notification after 3 secs.
                  $timeout(function() {
                    scope.showNotification = false;
                  }, 3000);

                  // Updates the ui to show newly added team.
                  teamFactory.teams.push(response);

                  // Clear the form.
                  scope.add_a_team_form.$setPristine();
                  scope.team = null;
                }
              })
              .finally(function() {
                scope.showNotification = true;
              });
          };

          scope.updateTeam = function(team) {
            console.log(team);
          };

          scope.open = function($event) {
            scope.opened = true;
          };
        }
      };
  }
]);
