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
        scope: {},
        templateUrl: 'templates/directives/add-a-team.tpl.html',
        link: function(scope) {
          scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
          };
          scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
          scope.format = scope.formats[0];
          scope.regions = regionFactory;

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

          scope.open = function($event) {
            scope.opened = true;
          };
        }
      };
  }
]);

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

angular.module('DotaPlayground')

  .factory('regionFactory', function() {
    return [
      'China',
      'South-East Asia & Australia',
      'Western Europe',
      'Eastern Europe',
      'North & South America'
    ];
  });

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

//# sourceMappingURL=app.js.map