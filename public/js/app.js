/**
 * http://usejsdoc.org/
 */

var app = angular.module('crimeHotSpot', ['ui.router', 'gservice','mapLoad']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,  $urlRouterProvider) {
    $urlRouterProvider.otherwise('/main');
    $urlRouterProvider.when('/analytics', '/analytics');
    var mainState = {
        name: 'main',
        url: '/main',
        templateUrl: '../../app/view/main.html'
    };

    var analyticState = {
        name: 'analytics',
        url: '/analytics',
        templateUrl: '../../app/view/analytics.html'
    };

    var venueState = {
        name: 'venue',
        url: '/venue',
        templateUrl: './view/venue.html'
    };

    $stateProvider.state(mainState);
    $stateProvider.state(analyticState);
    $stateProvider.state(venueState);

}]);



app.service('Map', function($q) {

    this.init = function() {
        var options = {
            center: new google.maps.LatLng(40.7127837, -74.00594130000002),
            zoom: 13,
            disableDefaultUI: true
        };
        this.map = new google.maps.Map(
            document.getElementById("map"), options
        );

    };

    this.search = function(str) {
        var d = $q.defer();
        this.places.textSearch({query: str}, function(results, status) {
            if (status === 'OK') {
                d.resolve(results[0]);
            }
            else d.reject(status);
        });
        return d.promise;
    };

    this.addMarker = function(res) {
        if(this.marker) this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            map: this.map,
            position: res.geometry.location,
            animation: google.maps.Animation.DROP
        });
        this.map.setCenter(res.geometry.location);
    }

});



//----------------------------------------------------------
// Here for example code
app.controller('newPlaceCtrl', function($scope, Map) {

    $scope.place = {};

    $scope.search = function() {
        $scope.apiError = false;
        Map.search($scope.searchPlace)
            .then(
                function(res) { // success
                    Map.addMarker(res);
                    $scope.place.name = res.name;
                    $scope.place.lat = res.geometry.location.lat();
                    $scope.place.lng = res.geometry.location.lng();
                },
                function(status) { // error
                    $scope.apiError = true;
                    $scope.apiStatus = status;
                }
            );
    };

    $scope.send = function() {
        alert($scope.place.name + ' : ' + $scope.place.lat + ', ' + $scope.place.lng);
    };

    Map.init();
});
