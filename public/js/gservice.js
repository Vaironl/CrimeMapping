
// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('gservice', ['SafetyScoreData'])
    .factory('gservice', function($http,SafetyScoreData){

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return

        var googleMapService = {};
        var crimes = [];
        // Functions
        // --------------------------------------------------------------
        // Refresh the Map with new data. Function will take new latitude and longitude coordinates.
        googleMapService.refresh = function ()
        {
            console.log("Refreshing/Loading map");
            crimes = [];

            $http.get('/crimes').then(function (response) {
                crimes = response.data;
                console.log('got crime data in SafetyScore initialize');
                SafetyScoreData.loadData(crimes);
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
                console.log(map);
            });

            heatmap = new google.maps.visualization.HeatmapLayer({
                data: SafetyScoreData.getCrimePoints(),
                map: map,
                radius: getNewRadius(map),
                maxIntensity: 100,
                //opacity:0.6,
                dissipating: true,
                gradient: getGradient()

            });

            //Add Event Listeners
            google.maps.event.addListener(map, 'zoom_changed', function () {
                //console.log("Zoom is " + map.getZoom());
                heatmap.setOptions({radius: getNewRadius(map)});
            });

            google.maps.event.addListener(map, 'click', function(event) {
                clickCrimePopUp(map, event);
            });

            // Refresh the page upon window load. Use the initial latitude and longitude
            google.maps.event.addDomListener(window, 'load',
                googleMapService.refresh());

        };

        // Private Inner Functions
        // --------------------------------------------------------------
       function getNewRadius(map)
        {
            // Convert desired crime radius in meters into radius in pixels based on zoom level
            var newRadius;
            var crimeRadiusInMeters = 150;
            //var meters_per_pixel = 156543.03392 * Math.cos(map.getCenter().lat() * Math.PI / 180) / Math.pow(2, map.getZoom());       // Generic ratio calculation; accounts for different scaling at different latitiudes
            console.log(map);
            var meters_per_pixel = 125209.17/ Math.pow(2, map.getZoom());                                                               // Hardcoded and approximated for prototype map center

            newRadius = crimeRadiusInMeters/meters_per_pixel;
            //console.log("There are " + meters_per_pixel + " meters per pixel at this zoom");
            //console.log("New radius is " + newRadius);
            return newRadius;
        }

        function clickCrimePopUp(map,loc) {
            var contentString;

            var infoWindow = new google.maps.InfoWindow({
              content: 'empty',
              position: map.getCenter()
            });
            infoWindow.close();

            contentString = '';
            var hoverInfo = SafetyScoreData.getLocSafetyScore(loc);
            contentString += contentString + '<h3>Localized Safety Score: ' + hoverInfo.SafetyScore + '</h3>';
            contentString += contentString + '<h4>Average Crime Rating: ' + hoverInfo.avgCrime + '</h4>';
            contentString += contentString + '<h4>Crimes Against the public: ' + hoverInfo.count1 + '</h4>';
            contentString += contentString + '<h4>Crimes Against Property: ' + hoverInfo.count2 + '</h4>';
            contentString += contentString + '<h4>Crimes Against the Person: ' + hoverInfo.count3 + '</h4>';
            contentString += contentString + '<h4>Severe Crimes Against the Person: ' + hoverInfo.count4 + '</h4>';

            infoWindow.setContent(contentString);
            infoWindow.setPosition(e.latLng);


            infoWindow.open(map);
        }

        function getGradient(){
            return [
                'rgba(0, 0, 0, 0)',
                'rgba(0, 255, 255, 1)',
                'rgba(100,149,237, 1)',
                'rgba(0, 0, 255, 1)',
                'rgba(0,139,139, 1)',
                'rgba(0, 255, 0, 1)',
                'rgba(173,255,47, 1)',
                'rgba(255,165,0, 1)',
                'rgba(255,69,0, 1)',
                'rgba(255, 0, 0, 1)'

            ]
        }

        console.log('Creating GoogleMapService Factory');
        return googleMapService;
    });
