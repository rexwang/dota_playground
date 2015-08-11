angular.module('DotaPlayground')

  .controller('ModalInstanceCtrl', [
    '$scope',
    '$modalInstance',
    'team',
    'teamFactory',
    function($scope, $modalInstance, team, teamFactory) {
      $scope.team = team;

      $scope.update = function() {
        $modalInstance.close($scope.team);
      };

      $scope.delete = function() {
        teamFactory.teamAPI().delete({id: team.id}).$promise
          .then(function(response) {
            if (response) {
              angular.forEach(teamFactory.teams, function(team, index) {
                if (team.id === response.id) {
                  teamFactory.teams.splice(index, 1);
                }
              });
            }
          });

        $modalInstance.dismiss('deleted');
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }
  ])

  .directive('teamInfo', [
    'teamFactory',
    'regionFactory',
    '$modal',
    '$log',
    function(teamFactory, regionFactory, $modal) {
      return {
        scope: {},
        templateUrl: 'templates/directives/team-info.tpl.html',
        controller: function($scope, $modal, $log) {
          $scope.regions = regionFactory.getRegions();

          if (teamFactory.initialLoad) {
            // If initial load, query teams from API, and
            // update the teams array in teamFactory.
            $scope.teams = teamFactory.teamAPI().query();
            teamFactory.teams = $scope.teams;
          } else {
            // If not initial load, simply read the array
            // in teamFactory.
            $scope.teams = teamFactory.teams;
          }

          $scope.open = function(size, selectedTeam) {
            var newTeamInfo = {};

            var modalInstance = $modal.open({
              animation: true,
              templateUrl: 'templates/partials/teams/team-modal.html',
              controller: 'ModalInstanceCtrl',
              size: size,
              scope: $scope,
              resolve: {
                team: function() {
                  return angular.copy(selectedTeam);
                }
              }
            });

            modalInstance.result.then(function(teamModified) {
              $log.info('teamModified = '+ teamModified.name + ' Finished at: ' + new Date());

              for (var prop in selectedTeam) {
                if (selectedTeam.hasOwnProperty(prop) && teamModified.hasOwnProperty(prop)) {
                  if (selectedTeam[prop] != teamModified[prop]) {
                    newTeamInfo[prop] = teamModified[prop];
                  }
                }
              }

              var teamUpdate = teamFactory.teamAPI().update({id: teamModified.id}, newTeamInfo);
              teamUpdate.$promise
                .catch(function(response) {
                  if (response.status == 422) {
                    $log.info('Update for ' + teamModified.name + ' failed');

                    // Todo: Show the error message to users.
                    // ------------
                  }
                })
                .then(function(response) {
                  if (response) {
                    // Update the team in teamFactory.
                    angular.forEach(teamFactory.teams, function(team, index) {
                      if (team.id === teamModified.id) {
                        teamFactory.teams[index] = teamModified;
                      }
                    });
                  }
                });
            }, function(msg) {
              if (msg === 'cancel') {
                $log.info('Modal dismissed at: ' + new Date());
              } else {
                $log.info(msg);
              }
            });
          };
        }
      };
    }
  ]);
