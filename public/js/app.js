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
        templateUrl: '../app/view/main.html',
        controller: 'mapLoad'
    }

    var analyticState = {
        name: 'analytics',
        url: '/analytics',
        templateUrl: '../app/view/analytics.html'
    }

    $stateProvider.state(mainState);
    $stateProvider.state(analyticState);

    }]);

