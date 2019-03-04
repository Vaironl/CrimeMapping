"use strict"; // Creates the mapLoad Module and Controller. Note that it depends on the 'geolocation' module and service.

var mapLoad = angular.module('mapLoad', ['gservice']);
mapLoad.controller('mapLoad', function ($scope, $window, $http, gservice) {
    google.maps.event.addDomListener(window, 'load', gservice.refresh());

    $scope.publicProfileToggle = function () {
        alert("public profile toggle");
    };

});
//# sourceMappingURL=mapLoad.js.map