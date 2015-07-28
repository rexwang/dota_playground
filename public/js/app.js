var app = angular.module('DotaPlayground', []);

app.directive('test', function($http) {
  return {
    template: '<h1>This is a {{ test }} file.',
    link: function(scope) {
      $http.get('/dota_playground/public/api/teams').then(function(response) {
        console.log(response);
      });
      scope.test = 'rex';
    }
  };
});
