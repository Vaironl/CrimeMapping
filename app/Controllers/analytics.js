// Creates the mapLoad Module and Controller. Note that it depends on the 'geolocation' module and service.
var analytics = angular.module('analytics', []);

analytics.service('queryService', function($http) {
    this.queryTime = function() {
        console.log('query completed');
    };

});

analytics.controller('analyticsCtrl', function($http, queryService, $scope){
    console.log('test');


    $scope.queryTime = function(){
        queryService.queryTime();
    };
});
