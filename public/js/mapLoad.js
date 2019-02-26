// Creates the mapLoad Module and Controller. Note that it depends on the 'geolocation' module and service.
var mapLoad = angular.module('mapLoad', [ 'gservice']);
mapLoad.controller('mapLoad', function($scope, $http, gservice){

    console.log('mapLoad');
    console.log(document.getElementById('map').valueOf());
    googleMapService.refresh;
});
