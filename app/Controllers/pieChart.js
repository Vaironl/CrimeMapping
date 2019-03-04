
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

		var pieData = [0, 0, 0, 0, 0];
		var pieLabels = ['Uncategorized', 'Crimes against the public', 'Crimes against property' , 'Crimes against the person', 'Severe crimes against the person'];
		
		for (var i = 0; i < crimes.length; i++){
			switch(crimes[i].crimeCat){
				case 0:
					pieData[0]++;
					break;
				case 1:
					pieData[1]++;
					break;
				case 2:
					pieData[2]++;
					break;
				case 3:
					pieData[3]++;
					break;
				case 4:
					pieData[4]++;
					break;
			}
		}
		

		console.log(pieData);
		$scope.data = pieData;
		$scope.labels = pieLabels;
	}





});