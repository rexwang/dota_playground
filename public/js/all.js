'use strict';

var app = angular.module('DotaPlayground', []);

app.controller('myCtrl', function($scope, $http) {
  $http.get('/dota_playground/public/api/teams').then(function(response) {
    $scope.items = response.data;
  });
}); 

'use strict';

(function() {
  console.log('this is a module');
}());

//# sourceMappingURL=all.js.map
