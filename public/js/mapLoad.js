// Creates the mapLoad Module and Controller. Note that it depends on the 'geolocation' module and service.
var mapLoad = angular.module('mapLoad', ['gservice']);
mapLoad.controller('mapLoad', function ($scope, $http, gservice) {

    console.log('mapLoad');
    console.log(document.getElementById('map').valueOf());
    gservice.refresh();

    /**
     * Side navigation crime profiles are loaded in the following functions
     */
    $scope.publicProfile = function () {
        $scope.togglePublic = !$scope.togglePublic;
        if ($scope.togglePublic === true) {
            // Apply public profile
        }
    };

    $scope.propertyProfile = function () {
        $scope.toggleProperty = !$scope.toggleProperty;
        if ($scope.toggleProperty === true) {
            // Apply property profile
        }
    };

    $scope.personProfile = function () {
        $scope.togglePerson = !$scope.togglePerson;
        if ($scope.togglePerson === true) {
            // Apply person profile
        }
    };

    $scope.severeProfile = function () {
        $scope.toggleSevere = !$scope.toggleSevere;
        if ($scope.toggleSevere === true) {
            // Apply severe profile
        }
    };
});
