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
