'use strict';

angular.module(
  'DotaPlayground',
  [
    'ui.router',
    'ngResource',
    'ui.bootstrap'
  ],
  function($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
  }
)

.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /dashboard
  $urlRouterProvider.otherwise('/dashboard');

  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'templates/partials/dashboard.html'
    })
    .state('teams', {
      url: '/teams',
      templateUrl: 'templates/partials/teams/teams.html'
    });
});

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
                  teamFactory.teams.push(team);

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

angular.module('DotaPlayground')

  .factory('regionFactory', function() {
    return {
      getRegions: function() {
        return [
          'China',
          'South-East Asia & Australia',
          'Western Europe',
          'Eastern Europe',
          'North & South America'
        ];
      }
    };
  });

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

//# sourceMappingURL=app.js.map