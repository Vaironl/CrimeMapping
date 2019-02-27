
// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('gservice', [])
    .factory('gservice', function($http){

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return

        var googleMapService = {};

        var crimes = [];

        var  startDate = "01-01-2017";
        var endDate = "01-01-2018";


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
                    minZoom:14,
                    maxZoom: 16,
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
                var loc = {
                    location: new google.maps.LatLng(crimes[i].lat, crimes[i].lng),
                    weight: ageCrime(crimes[i].severity, crimes.date, startDate, endDate)
                };
                googlePoints.push(loc);
            }
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

        function getAgeMultiple(crimeDate, startDate, endDate){
            var d = new Date(crimeDate);
            var e = new Date(endDate);
            var s = new Date(startDate);

            if (d === e)
            {
                return 1;
            }
            else
            {
                if (((s - d) >= 0) || ((e-d)<=0))
                {
                    return 0;
                }
                else
                {
                    return (1 - Math.round((e-d)/(e-s)));
                }
            }
        }

        function ageCrime(score, crimeDate, startDate, endDate) {
            return score * getAgeMultiple(crimeDate, startDate, endDate);
        }

        function getSafetyScore(arrayOfCrimes, startDate, endDate)
        {
            var i;
            var SafetyScore = 0;
            for (i = 0 ; i < arrayOfCrimes.size(); i++){
                SafetyScore += ageCrime(arrayOfCrimes[i].severity, startDate, endDate);
            }
        }
    });
