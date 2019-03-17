// Creates the mapLoad Module and Controller. Note that it depends on the 'geolocation' module and service.
var analytics = angular.module('analytics', []);

analytics.service('queryService', function($http) {
    this.queryTime = function() {
        crimes = [];

        // Perform an AJAX call to get all of the records in the db.
        $http.get('/crimes').then(function (response) {
            crimes = response.data;
            console.log(crimes);
        });
        console.log('query completed');
    }

});

analytics.controller('analyticsCtrl', function($http, queryService, $scope){
    console.log('running query');


    $scope.queryTime = function(){
        queryService.queryTime();
    };
});
