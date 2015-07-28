var app = angular.module('DotaPlayground', []);

app.controller('myCtrl', function($scope, $http) {
  $http.get('/dota_playground/public/api/teams').then(function(response) {
    $scope.items = response.data;
  });
}); 
