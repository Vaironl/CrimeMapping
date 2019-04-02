// Creates the mapLoad Module and Controller. Note that it depends on the 'geolocation' module and service.
var mapLoad = angular.module('mapLoad', ['gservice']);
mapLoad.controller('mapLoad', function ($scope, $http, gservice) {

    console.log('mapLoad');
    console.log(document.getElementById('map').valueOf());
    gservice.refresh();

    $scope.publicProfile = function () {
        $scope.togglePublic = !$scope.togglePublic;
        if ($scope.togglePublic === true) {
            $scope.toggleProperty = false;
            $scope.togglePerson = false;
            $scope.toggleSevere = false;
        }
    };

    $scope.propertyProfile = function () {
        $scope.toggleProperty = !$scope.toggleProperty;
        if ($scope.toggleProperty === true) {
            $scope.togglePublic = false;
            $scope.togglePerson = false;
            $scope.toggleSevere = false;
        }
    };

    $scope.personProfile = function () {
        $scope.togglePerson = !$scope.togglePerson;
        if ($scope.togglePerson === true) {
            $scope.toggleProperty = false;
            $scope.togglePublic = false;
            $scope.toggleSevere = false;
        }
    };

    $scope.severeProfile = function () {
        $scope.toggleSevere = !$scope.toggleSevere;
        if ($scope.toggleSevere === true) {
            $scope.toggleProperty = false;
            $scope.togglePerson = false;
            $scope.togglePublic = false;
        }
    };
});
