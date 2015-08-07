'use strict';

angular.module(
  'DotaPlayground',
  [
    'ui.router',
    'ngResource'
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
  })

  .directive('test', ['$http', function($http) {
    return {
      templateUrl: 'templates/directives/test.tpl.html',
      link: function(scope) {
        // $http.get('api/teams').then(function(response) {
        //   scope.items = response.data;
        // });
      }
    };
  }]);
