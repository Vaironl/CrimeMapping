
var crimeChart = angular.module('crimeCharts', ['chart.js']);

crimeChart.factory('chartFactory', function($http){

	var factory = {};

	factory.getCrimeData = function() {
		return $http.get('/crimes');
	};

	return factory;
});	

crimeChart.controller('crimeChartController', function($scope, chartFactory){

	console.log('Hello from crimeChartController!');

	chartFactory.getCrimeData().then(function(response) {
		pieCrimeCat(response.data);
		pieTimeOfDay(response.data);
	});


	function pieCrimeCat(crimes){
		console.log(crimes);

		var pieData = [0, 0, 0, 0, 0];
		var pieLabels = ['Other', 'Crimes against the public', 'Crimes against property' , 'Crimes against the person', 'Severe crimes against the person'];
		
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
		$scope.ccData = pieData;
		$scope.ccLabels = pieLabels;
		$scope.ccOptions = {
			title: {
				display: true,
				text: 'Crime Category Breakdown'
			},

			legend: {
				display: true,
				position: 'left'
			}
		};
	}

	function pieTimeOfDay(crimes){
		console.log(crimes);

		var pieData = [0, 0, 0, 0];
		var pieLabels = ['Morning (5am-12pm)', 'Afternoon (12pm-5pm)', 'Evening (5pm-9pm)' , 'Night (9pm-5am)'];
		
		for (var i = 0; i < crimes.length; i++){
			var time = crimes[i].time;
			switch(true){
				case (parseInt(time, 10) >= 500 && parseInt(time, 10) < 1200):
					pieData[0]++;
					break;
				case (parseInt(time, 10) >= 1200 && parseInt(time, 10) < 1700):
					pieData[1]++;
					break;
				case (parseInt(time, 10) >= 1700 && parseInt(time, 10) < 2100):
					pieData[2]++;
					break;
				case ((parseInt(time, 10) >= 2100 && parseInt(time, 10) <= 2400) || (parseInt(time, 10) == 0) || (parseInt(time, 10) > 0 && parseInt(time, 10) < 500)):
					pieData[3]++;
					break;
			}
		}
		

		console.log(pieData);
		$scope.tdData = pieData;
		$scope.tdLabels = pieLabels;
		$scope.tdOptions = {
			title: {
				display: true,
				text: 'Time of Day Breakdown'
			},

			legend: {
				display: true,
				position: 'left'
			}
		};
	}





});
