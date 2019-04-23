
var crimeChart = angular.module('crimeCharts', ['chart.js']);

crimeChart.factory('chartFactory', function($http){

	var factory = {};

	factory.getCrimeData = function() {
		return $http.get('/crimes');
	};

	return factory;
});	

crimeChart.controller('crimeChartController', function($scope, chartFactory, crimeFilters){

	console.log('Hello from crimeChartController!');

	setUpOG();

	$scope.setUp = function() {
		console.log('test from Within Setup!');

		chartFactory.getCrimeData().then(function(response) {
			allCrimes = response.data;
			sDate = $("#datetimepicker1").data("DateTimePicker").date().toDate();
			eDate = $("#datetimepicker2").data("DateTimePicker").date().toDate();
			console.log(sDate.toString());
			console.log(eDate.toString());
			filteredCrimes = crimeFilters.filterByDateRange(allCrimes, sDate, eDate);
			crimeDates = [];
			
			
			for (var i = allCrimes.length - 1; i >= 0; i--) {
				var k = new Date(allCrimes[i].date);
				crimeDates.push(k);
				console.log(allCrimes[i]);
			}
			

			pieCrimeCat(allCrimes);
			pieTimeOfDay(allCrimes);
			lineDayOfWeek(crimeDates);

			for (var i = allCrimes.length - 1; i >= 0; i--) {
					var end = allCrimes[i].desc.indexOf("at") + 3;
					var descSub = allCrimes[i].desc.substring(0, end);
					allCrimes[i].desc = descSub;
				}

			$scope.Crimes = allCrimes;
		});
	};

	function setUpOG(){
		chartFactory.getCrimeData().then(function(response) {
			allCrimes = response.data;
			crimeDates = [];
				
				for (var i = allCrimes.length - 1; i >= 0; i--) {
					var k = new Date(allCrimes[i].date);
					crimeDates.push(k);
					console.log(allCrimes[i]);
				}
				

				pieCrimeCat(allCrimes);
				pieTimeOfDay(allCrimes);
				lineDayOfWeek(crimeDates);

				for (var i = allCrimes.length - 1; i >= 0; i--) {
					var end = allCrimes[i].desc.indexOf("at") + 3;
					var descSub = allCrimes[i].desc.substring(0, end);
					allCrimes[i].desc = descSub;
				}

				$scope.Crimes = allCrimes;

		});
	}


	function pieCrimeCat(crimes){
		//console.log(crimes);

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
		//console.log(crimes);

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

	function lineDayOfWeek(crimes){
		//console.log(crimes);

		var lineData = [0, 0, 0, 0, 0, 0, 0];
		var lineLabels = ['Sunday', 'Monday', 'Tuesday' , 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		
		for (var i = 0; i < crimes.length; i++){
			//var date = new Date(crimes[i].date);
			var day = crimes[i].getDay();
			switch(true){
				case (day == 0):
					lineData[0]++;
					break;
				case (day == 1):
					lineData[1]++;
					break;
				case (day == 2):
					lineData[2]++;
					break;
				case (day == 3):
					lineData[3]++;
					break;
				case (day == 4):
					lineData[4]++;
					break;
				case (day == 5):
					lineData[5]++;
					break;
				case (day == 6):
					lineData[6]++;
					break;
			}
		}
		

		//console.log(pieData);
		$scope.dwData = lineData;
		$scope.dwLabels = lineLabels;
		$scope.dwSeries = ['Crime Incidents']
		
		$scope.dwOptions = {
			title: {
				display: true,
				text: 'Total Crime Occurrences Across the Days of the Week'
			},

			legend: {
				display: false,
				position: 'left'
			},

			scales: {
				yAxes: [{
					display: true
				}]
			}
		};
		
	}





});

