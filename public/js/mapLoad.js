// Creates the mapLoad Module and Controller. Note that it depends on the 'geolocation' module and service.
var mapLoad = angular.module('mapLoad', ['gservice']);
mapLoad.controller('mapLoad', function ($scope, $http, gservice) {

    console.log('mapLoad');
    console.log(document.getElementById('map').valueOf());
    gservice.refresh();

    $scope.togglePublic     = !$scope.togglePublic;
    $scope.toggleProperty   = !$scope.toggleProperty;
    $scope.togglePerson     = !$scope.togglePerson;
    $scope.toggleSevere     = !$scope.toggleSevere;
    $scope.toggleDemo;

    $scope.$on('FilterChange', function(event, arg){
        $scope.receiver = 'Received ' + arg;
        console.log('filter has changed');
        gservice.refreshHeatmap();
    })
});
