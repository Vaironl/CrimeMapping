
var pieChart = angular.module('pieChart', ['chart.js']);

pieChart.factory('chartFactory', function($http){

	var factory = {};

	factory.getCrimeData = function() {
		return $http.get('/crimes');
	};

	return factory;
});	

pieChart.controller('pieChartController', function($scope, chartFactory){

	console.log('Hello from pieChartController!');

	chartFactory.getCrimeData().then(function(response) {
		createPieChart('crimeCat', response.data);
	});


	function createPieChart(attribute, crimes){
		console.log(crimes);

		var pieData = [];

		for (var i = 0; i < crimes.length; i++){
			pieData.push(crimes[i].crimeCat);
		}

		console.log(pieData);
		$scope.data = pieData;
	}





});