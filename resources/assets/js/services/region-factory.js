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
