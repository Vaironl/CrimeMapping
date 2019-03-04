
var pieChart = angular.module('pieChart', ['chart.js']);

pieChart.factory('chartFactory', function($http){

	var factory = {};

	var crimes = [];

	factory.getCrimeData = function() {
		crimes = [];

		$http.get('/crimes').then(function (response){
			crimes = response.data;
		}, function (error) {
                console.log("This is an error: ",error);
            });

		return crimes;
	};

	return factory;
});	

pieChart.controller('pieChartController', function($scope, chartFactory){

	console.log('Hello from pieChartController!');

	/*
	$scope.first = 1;
	$scope.second = 1;

	$scope.updateValue = function() {
		$scope.calculation = $scope.first + ' + ' + $scope.second + ' = ' + (+$scope.first + +$scope.second);
	};
	*/
	allCrimes = chartFactory.getCrimeData();

	crimeData = [1,2,3];

	console.log(allCrimes);

	$scope.data = crimeData;





});