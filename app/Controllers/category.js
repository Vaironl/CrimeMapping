//$(document).ready(function(){
	
	//Only Public-Crimes Related Crimes!!!
	//$(document).on('click','.Public-Crimes', function(e){ 
	
	angular.module('publicCrimes', [])
    .factory('publicCrimes', function($http){

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        var googleMapService = {};

        var crimes = [];


        // Functions
        // --------------------------------------------------------------
        // Refresh the Map with new data. Function will take new latitude and longitude coordinates.
        googleMapService.refresh = function () {
            console.log("Refreshing/Loading map");
            // Clears the holding array of locations
            crimes = [];

            // Perform an AJAX call to get all of the records in the db.
            $http.get('/crimes').then(function (response) {
                crimes = response.data;
                //console.log(crimes);

                map = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: 36.8853, lng: -76.3059},
                    zoom: 15,
                    minZoom:10,
                    maxZoom: 17,
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                    styles: [
                        //Hide distracting features
                        {
                            featureType: 'poi',
                            stylers: [{visibility: 'off'}]
                        },
                        {
                            featureType: 'transit',
                            stylers: [{visibility: 'off'}]
                        }
                    ]
                });
                heatmap = new google.maps.visualization.HeatmapLayer({
                    data: getPoints(crimes),
                    map: map,
                    radius: getNewRadius(map),
                    maxIntensity: 100, 
                    //opacity:0.6,
                    dissipating: true

                });
				
				// Test new layers.
				//heatmapLayer0 = new google.maps.visualization.HeatmapLayer0

                google.maps.event.addListener(map, 'zoom_changed', function () {
                    //console.log("Zoom is " + map.getZoom());
                    heatmap.setOptions({radius: getNewRadius(map)});
                });

            },function (error) {
                console.log("This is an error: ",error);
            });
        };

        // Private Inner Functions
        // --------------------------------------------------------------
        function getPoints(crimes) {
            // An array that will contain all the crimes lat and lng values
            //      as objects of type google.maps.LatLng
            var googlePoints = [];
            console.log(crimes);
            //console.log(crimes.length);
			crimes = crimes.filter(crime => crime.CrimeCat == 1)
            for (var i = 0; i < crimes.length; i++) {

				if (crimes[i].crimeCat == 1 ){
					
				
                var loc = new google.maps.LatLng(crimes[i].lat,crimes[i].lng);
                //googlePoints.push(loc);

                var weightedLoc = new google.maps.MVCObject;
                var weight = crimes[i].severity;                            // Change to calculated weight later
                weightedLoc.setValues({'location':loc, 'weight':weight});
                googlePoints.push(weightedLoc);
				}
			}
            //console.log(googlePoints);
            console.log(googlePoints.length);
            return googlePoints;
        }

        function getNewRadius(map){
            // Convert desired crime radius in meters into radius in pixels based on zoom level
            var newRadius;
            var crimeRadiusInMeters = 150;
            //var meters_per_pixel = 156543.03392 * Math.cos(map.getCenter().lat() * Math.PI / 180) / Math.pow(2, map.getZoom());       // Generic ratio calculation; accounts for different scaling at different latitiudes
            var meters_per_pixel = 125209.17/ Math.pow(2, map.getZoom());                                                               // Hardcoded and approximated for prototype map center

            newRadius = crimeRadiusInMeters/meters_per_pixel;
            //console.log("There are " + meters_per_pixel + " meters per pixel at this zoom");
            //console.log("New radius is " + newRadius);
            return newRadius;
        }

        // Refresh the page upon window load. Use the initial latitude and longitude
        google.maps.event.addDomListener(window, 'load',
            googleMapService.refresh());
			
			
	
    });
	
	
	//});




//Only Property-Crimes Related Crimes!!!

	//$(document).on('click','.Property-Crimes', function(e){ 
	
	angular.module('Property-Crimes', [])
    .factory('Property-Crimes', function($http){

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        var googleMapService = {};

        var crimes = [];


        // Functions
        // --------------------------------------------------------------
        // Refresh the Map with new data. Function will take new latitude and longitude coordinates.
        googleMapService.refresh = function () {
            console.log("Refreshing/Loading map");
            // Clears the holding array of locations
            crimes = [];

            // Perform an AJAX call to get all of the records in the db.
            $http.get('/crimes').then(function (response) {
                crimes = response.data;
                //console.log(crimes);

                map = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: 36.8853, lng: -76.3059},
                    zoom: 15,
                    minZoom:10,
                    maxZoom: 17,
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                    styles: [
                        //Hide distracting features
                        {
                            featureType: 'poi',
                            stylers: [{visibility: 'off'}]
                        },
                        {
                            featureType: 'transit',
                            stylers: [{visibility: 'off'}]
                        }
                    ]
                });

                heatmap = new google.maps.visualization.HeatmapLayer({
                    data: getPoints(crimes),
                    map: map,
                    radius: getNewRadius(map),
                    maxIntensity: 100,
                    //opacity:0.6,
                    dissipating: true

                });
				
				// Test new layers.
				//heatmapLayer0 = new google.maps.visualization.HeatmapLayer0

                google.maps.event.addListener(map, 'zoom_changed', function () {
                    //console.log("Zoom is " + map.getZoom());
                    heatmap.setOptions({radius: getNewRadius(map)});
                });

            },function (error) {
                console.log("This is an error: ",error);
            });
        };

        // Private Inner Functions
        // --------------------------------------------------------------
       function getPoints(crimes) {
            // An array that will contain all the crimes lat and lng values
            //      as objects of type google.maps.LatLng
            var googlePoints = [];
            console.log(crimes);
            //console.log(crimes.length);
            for (var i = 0; i < crimes.length; i++) {

				if (crimes[i].crimeCat == 2 ){
					
				
                var loc = new google.maps.LatLng(crimes[i].lat,crimes[i].lng);
                //googlePoints.push(loc);

                var weightedLoc = new google.maps.MVCObject;
                var weight = crimes[i].severity;                            // Change to calculated weight later
                weightedLoc.setValues({'location':loc, 'weight':weight});
                googlePoints.push(weightedLoc);
				}
			}
            //console.log(googlePoints);
            console.log(googlePoints.length);
            return googlePoints;
        }

        function getNewRadius(map){
            // Convert desired crime radius in meters into radius in pixels based on zoom level
            var newRadius;
            var crimeRadiusInMeters = 150;
            //var meters_per_pixel = 156543.03392 * Math.cos(map.getCenter().lat() * Math.PI / 180) / Math.pow(2, map.getZoom());       // Generic ratio calculation; accounts for different scaling at different latitiudes
            var meters_per_pixel = 125209.17/ Math.pow(2, map.getZoom());                                                               // Hardcoded and approximated for prototype map center

            newRadius = crimeRadiusInMeters/meters_per_pixel;
            //console.log("There are " + meters_per_pixel + " meters per pixel at this zoom");
            //console.log("New radius is " + newRadius);
            return newRadius;
        }

        // Refresh the page upon window load. Use the initial latitude and longitude
        google.maps.event.addDomListener(window, 'load',
            googleMapService.refresh());
			
			
	
    });
	
	
	//});



//Only Personal Related Crimes!!!

	//$(document).on('click','.Personal', function(e){ 
	
	angular.module('Personal', [])
    .factory('Personal', function($http){

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        var googleMapService = {};

        var crimes = [];


        // Functions
        // --------------------------------------------------------------
        // Refresh the Map with new data. Function will take new latitude and longitude coordinates.
        googleMapService.refresh = function () {
            console.log("Refreshing/Loading map");
            // Clears the holding array of locations
            crimes = [];

            // Perform an AJAX call to get all of the records in the db.
            $http.get('/crimes').then(function (response) {
                crimes = response.data;
                //console.log(crimes);

                map = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: 36.8853, lng: -76.3059},
                    zoom: 15,
                    minZoom:10,
                    maxZoom: 17,
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                    styles: [
                        //Hide distracting features
                        {
                            featureType: 'poi',
                            stylers: [{visibility: 'off'}]
                        },
                        {
                            featureType: 'transit',
                            stylers: [{visibility: 'off'}]
                        }
                    ]
                });

                heatmap = new google.maps.visualization.HeatmapLayer({
                    data: getPoints(crimes),
                    map: map,
                    radius: getNewRadius(map),
                    maxIntensity: 100,
                    //opacity:0.6,
                    dissipating: true

                });
				
				// Test new layers.
				//heatmapLayer0 = new google.maps.visualization.HeatmapLayer0

                google.maps.event.addListener(map, 'zoom_changed', function () {
                    //console.log("Zoom is " + map.getZoom());
                    heatmap.setOptions({radius: getNewRadius(map)});
                });

            },function (error) {
                console.log("This is an error: ",error);
            });
        };

        // Private Inner Functions
        // --------------------------------------------------------------
       function getPoints(crimes) {
            // An array that will contain all the crimes lat and lng values
            //      as objects of type google.maps.LatLng
            var googlePoints = [];
            console.log(crimes);
            //console.log(crimes.length);
            for (var i = 0; i < crimes.length; i++) {

				if (crimes[i].crimeCat == 3 ){
					
				
                var loc = new google.maps.LatLng(crimes[i].lat,crimes[i].lng);
                //googlePoints.push(loc);

                var weightedLoc = new google.maps.MVCObject;
                var weight = crimes[i].severity;                            // Change to calculated weight later
                weightedLoc.setValues({'location':loc, 'weight':weight});
                googlePoints.push(weightedLoc);
				}
			}
            //console.log(googlePoints);
            console.log(googlePoints.length);
            return googlePoints;
        }

        function getNewRadius(map){
            // Convert desired crime radius in meters into radius in pixels based on zoom level
            var newRadius;
            var crimeRadiusInMeters = 150;
            //var meters_per_pixel = 156543.03392 * Math.cos(map.getCenter().lat() * Math.PI / 180) / Math.pow(2, map.getZoom());       // Generic ratio calculation; accounts for different scaling at different latitiudes
            var meters_per_pixel = 125209.17/ Math.pow(2, map.getZoom());                                                               // Hardcoded and approximated for prototype map center

            newRadius = crimeRadiusInMeters/meters_per_pixel;
            //console.log("There are " + meters_per_pixel + " meters per pixel at this zoom");
            //console.log("New radius is " + newRadius);
            return newRadius;
        }

        // Refresh the page upon window load. Use the initial latitude and longitude
        google.maps.event.addDomListener(window, 'load',
            googleMapService.refresh());
			
			
	
    //});
	
	
	});




//Only Assault Related Crimes!!!

	//$(document).on('click','.Assault', function(e){ 
	
	angular.module('Assault', [])
    .factory('Assault', function($http){

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        var googleMapService = {};

        var crimes = [];


        // Functions
        // --------------------------------------------------------------
        // Refresh the Map with new data. Function will take new latitude and longitude coordinates.
        googleMapService.refresh = function () {
            console.log("Refreshing/Loading map");
            // Clears the holding array of locations
            crimes = [];

            // Perform an AJAX call to get all of the records in the db.
            $http.get('/crimes').then(function (response) {
                crimes = response.data;
                //console.log(crimes);

                map = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: 36.8853, lng: -76.3059},
                    zoom: 15,
                    minZoom:10,
                    maxZoom: 17,
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                    styles: [
                        //Hide distracting features
                        {
                            featureType: 'poi',
                            stylers: [{visibility: 'off'}]
                        },
                        {
                            featureType: 'transit',
                            stylers: [{visibility: 'off'}]
                        }
                    ]
                });

                heatmap = new google.maps.visualization.HeatmapLayer({
                    data: getPoints(crimes),
                    map: map,
                    radius: getNewRadius(map),
                    maxIntensity: 100,
                    //opacity:0.6,
                    dissipating: true

                });
				
				// Test new layers.
				//heatmapLayer0 = new google.maps.visualization.HeatmapLayer0

                google.maps.event.addListener(map, 'zoom_changed', function () {
                    //console.log("Zoom is " + map.getZoom());
                    heatmap.setOptions({radius: getNewRadius(map)});
                });

            },function (error) {
                console.log("This is an error: ",error);
            });
        };

        // Private Inner Functions
        // --------------------------------------------------------------
       function getPoints(crimes) {
            // An array that will contain all the crimes lat and lng values
            //      as objects of type google.maps.LatLng
            var googlePoints = [];
            console.log(crimes);
            //console.log(crimes.length);
            for (var i = 0; i < crimes.length; i++) {

				if (crimes[i].crimeCat == 4 ){
					
				
                var loc = new google.maps.LatLng(crimes[i].lat,crimes[i].lng);
                //googlePoints.push(loc);

                var weightedLoc = new google.maps.MVCObject;
                var weight = crimes[i].severity;                            // Change to calculated weight later
                weightedLoc.setValues({'location':loc, 'weight':weight});
                googlePoints.push(weightedLoc);
				}
			}
            //console.log(googlePoints);
            console.log(googlePoints.length);
            return googlePoints;
        }

        function getNewRadius(map){
            // Convert desired crime radius in meters into radius in pixels based on zoom level
            var newRadius;
            var crimeRadiusInMeters = 150;
            //var meters_per_pixel = 156543.03392 * Math.cos(map.getCenter().lat() * Math.PI / 180) / Math.pow(2, map.getZoom());       // Generic ratio calculation; accounts for different scaling at different latitiudes
            var meters_per_pixel = 125209.17/ Math.pow(2, map.getZoom());                                                               // Hardcoded and approximated for prototype map center

            newRadius = crimeRadiusInMeters/meters_per_pixel;
            //console.log("There are " + meters_per_pixel + " meters per pixel at this zoom");
            //console.log("New radius is " + newRadius);
            return newRadius;
        }

        // Refresh the page upon window load. Use the initial latitude and longitude
        google.maps.event.addDomListener(window, 'load',
            googleMapService.refresh());
			
			
	
    });
	
	
	//});

//});
	







/*

Getpoint Function
Working functin part!!!!!!!!!!!!!!!


function getPoints(crimes) {
            // An array that will contain all the crimes lat and lng values
            //      as objects of type google.maps.LatLng
            var googlePoints = [];
            console.log(crimes);
            //console.log(crimes.length);
            for (var i = 0; i < crimes.length; i++) {
				
				//if (filter && crimes[i].crimeCat == filter ){
				if (crimes[i].crimeCat == 1 ){
					
				
                var loc = new google.maps.LatLng(crimes[i].lat,crimes[i].lng);
                //googlePoints.push(loc);

                var weightedLoc = new google.maps.MVCObject;
                var weight = crimes[i].severity;                            // Change to calculated weight later
                weightedLoc.setValues({'location':loc, 'weight':weight});
                googlePoints.push(weightedLoc);
				}
            }
            //console.log(googlePoints);
            console.log(googlePoints.length);
            return googlePoints;
        }
		
Getpoint Function
Tested - failed
function getPoints(crimes) {
            // An array that will contain all the crimes lat and lng values
            //      as objects of type google.maps.LatLng
            var googlePoints = [];
            console.log(crimes);
            //console.log(crimes.length);
			crimes = crimes.filter(crime => crime.CrimeCat == 1)
            for (var i = 0; i < crimes.length; i++) {
				//If statement.
                var loc = new google.maps.LatLng(crimes[i].lat,crimes[i].lng);
                //googlePoints.push(loc);

                var weightedLoc = new google.maps.MVCObject;
                var weight = crimes[i].severity;                            // Change to calculated weight later
                weightedLoc.setValues({'location':loc, 'weight':weight});
                googlePoints.push(weightedLoc);
            }
            //console.log(googlePoints);
            console.log(googlePoints.length);
            return googlePoints;
        }
		
*/