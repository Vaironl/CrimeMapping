
// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('gservice', [])
    .factory('gservice', function($http){

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return

        var googleMapService = {};

        // used to store the database response.
        var crimes = [];

        // start and end dates of the period of observation should include all crimes.
        var startDate = "01-01-2017";
        var endDate = "01-01-2018";

       // variables for user preference selections
        var cat1Factor = 1;
        var cat2Factor = 1;
        var cat3Factor = 1;
        var cat4Factor = 1;

        // Functions
        // --------------------------------------------------------------
        // Refresh the Map with new data. Function will take new latitude and longitude coordinates.
        googleMapService.refresh = function ()
        {
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

                hoverPopup(map);

            },function (error) {
                console.log("This is an error: ",error);
            });
        };

        // Private Inner Functions
        // --------------------------------------------------------------
        // Refresh the page upon window load. Use the initial latitude and longitude
        google.maps.event.addDomListener(window, 'load',
            googleMapService.refresh());

        function getPoints(crimes)
        {
            // An array that will contain all the crimes lat and lng values
            //      as objects of type google.maps.LatLng
            var googlePoints = [];
            console.log(crimes);
            //console.log(crimes.length);
            for (var i = 0; i < crimes.length; i++)
            {
                var loc = {
                    location: new google.maps.LatLng(crimes[i].lat, crimes[i].lng),
                    weight: scaleCrime(crimes[i])
                };
                if (loc.weight > 0.00);{
                    googlePoints.push(loc);
                }

            }
            console.log(googlePoints.length);
            return googlePoints;
        }

        function getNewRadius(map)
        {
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

        function scaleCrime(crime)
        {
            var scaledScore = crime.severity * getUserPreferenc(crime.crimeCat) * getAgeMultiple(crime.date);
            if (scaledScore <= 10.00){
                return scaledScore;
            }
            else {
                return 10.00;
            }
        }

        function hoverPopup(map) {
            var contentString;
            var infoWindow = new google.maps.InfoWindow({
              content: 'empty',
              position: map.getCenter()
            });
            var timeHandle;

            map.addListener('mousemove', function(e){
                infoWindow.close();
                clearTimeout(timeHandle);

                var hoverInfo = getPopUpInfo(e.latLng);
                contentString = '<p>' + '<------------Placeholder information------------>' + '</p>';
                contentString = contentString + '<h3>Localized Safety Score: ' + hoverInfo.popupScore.toString() + '</h3>';



                for (var i = 0; i <= hoverInfo.catInfo.length - 1; i++) {
                     contentString = contentString + '<p>' + hoverInfo.catInfo[i].catName + ': ' + hoverInfo.catInfo[i].numInCat.toString() + ' incidents' + '</p>';
                }

                contentString = contentString + '<p>' + '<------------Dynamic information------------>' + '</p>';
                contentString += e.latLng.toString();

                infoWindow.setContent(contentString);
                 infoWindow.setPosition(e.latLng);


                timeHandle = window.setTimeout(function() {infoWindow.open(map)}, 1500);

            });

        }


        function getPopUpInfo(mouseLatLng) {
            var info = {};

            /**
             * For use after we have successfuly tested querying data or when
             * other stub functions have been implemented:
             *
             * var criticalCrimes = getCriticalCrimes(mouseLatLng);
             * criticalCrimes.sortBySafetyScore();
             * var popupScore = calculateAggregateScore(criticalCrimes)
             */

            info.popupScore = 8
            info.catInfo = [{catName: 'Severe crimes against the person', numInCat: 3}, {catName: 'Crimes against the person', numInCat: 4}, {catName: 'Crimes against property', numInCat: 8}, {catName: 'Crimes against the public', numInCat: 8}];

            return info;
        }

        // Refresh the page upon window load. Use the initial latitude and longitude
        google.maps.event.addDomListener(window, 'load',
            googleMapService.refresh());

        function getAgeMultiple(crimeDate)
        {
            var dateOfCrime = new Date(crimeDate);
            var endDateOfIntrest = new Date(endDate);
            var startDateOfIntrest = new Date(startDate);

            if (dateOfCrime == endDateOfIntrest)
            {
                return 1;
            }
            else
            {
                if ((startDateOfIntrest > dateOfCrime)  || (endDateOfIntrest < dateOfCrime))
                {
                    return 0;
                }
                else
                {
                    var crimeDaysTillEndOfIntrest = endDateOfIntrest-dateOfCrime;
                    var spanOfIntrest = endDateOfIntrest-startDateOfIntrest;
                    return (1 - (crimeDaysTillEndOfIntrest / spanOfIntrest));
                }
            }
        }

        function getUserPreferenc(crimeCat)
        {
            var userMultiple = 1;
            switch(crimeCat)
            {
                case 1:
                {
                    userMultiple = cat1Factor;
                    break;
                }
                case 2:
                {
                    userMultiple = cat2Factor;
                    break;
                }
                case 3:
                {
                    userMultiple = cat3Factor;
                    break;
                }
                case 4:
                {
                    userMultiple = cat4Factor;
                    break;
                }
            }
            return userMultiple;
        }

        function getSafetyScore(arrayOfCrimes)
        {
            var cat1CrimeCount = 0;
            var cat2CrimeCount = 0;
            var cat3CrimeCount = 0;
            var cat4CrimeCount = 0;
            var SafetyScore = 0;
            for (var i = 0 ; i < arrayOfCrimes.length; i++){
                var scaledScore = scaleCrime(arrayOfCrimes[i]);
                SafetyScore += scaledScore;
                switch(arrayOfCrimes[i].crimeCat){
                    case 1:
                        if (scaledScore > 0.00)
                            {cat1CrimeCount++;}
                        break;

                    case 2:
                        if (scaledScore > 0.00)
                            {cat2CrimeCount++;}
                        break;

                    case 3:
                        if (scaledScore > 0.00)
                            {cat3CrimeCount++;}
                        break;

                    case 4:
                        if (scaledScore > 0.00)
                            {cat4CrimeCount++;}
                        break;
                }
            }
            return {SafetyScore: (SafetyScore / arrayOfCrimes.length), count1: cat1CrimeCount, count2: cat2CrimeCount, count3: cat3CrimeCount, count4: cat4CrimeCount};
        }
    });
