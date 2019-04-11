
// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('gservice', ['SafetyScoreData'])
    .factory('gservice'/**
*
*/
, function($http,SafetyScoreData){

        // Refresh the page upon window load. Use the initial latitude and longitude

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        let googleMapService = {};
        let crimes = [];
        let infoWindow;

        // Public Functions


        /**
         * Reload the map based on current location
         */
        googleMapService.refresh = function ()
        {
            console.log("Refreshing/Loading map");
            crimes = [];

            $http.get('/crimes').then(function (response) {
                crimes = response.data;
                console.log('got crime data in SafetyScore initialize');
                SafetyScoreData.loadData(crimes);

                //Create base map
                map = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: 36.8853, lng: -76.3059},
                    zoom: 15,
                    minZoom:14,
                    maxZoom: 16,
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,

                    styles: [
                        {
                            featureType: 'poi',
                            stylers: [{visibility: 'off'}]
                        },
                        {
                            featureType: 'transit',
                            stylers: [{visibility: 'off'}]
                        },
                        /*{
                            featureType: "water",
                            elementType: "geometry.fill",
                            stylers: [
                                {
                                    "color": "#bdc8ce"
                                }
                            ]
                        }*/
                    ]
                });

                //Create heat map
                heatmap = new google.maps.visualization.HeatmapLayer({
                    data: SafetyScoreData.getCrimePoints(),
                    map: map,
                    radius: getNewRadius(),
                    maxIntensity: 35,
                    dissipating: true,
                    gradient: getGradient()

                });

                //Create pop-up
                infoWindow = new google.maps.InfoWindow({
                    content: 'empty',
                    position: map.getCenter()
                });

                //Event Listeners
                google.maps.event.addListener(map, 'zoom_changed', function () {
                    heatmap.setOptions({radius: getNewRadius(map)});
                });

                map.addListener('click', function(event) {
                    clickCrimePopUp(event.latLng);
                });


            },function (error) {
                console.log("This is an error: ",error);
            });


        };

        googleMapService.refreshHeatmap = function(){
            heatmap.setOptions({data: SafetyScoreData.getCrimePoints()});
        };

        // Private Inner Functions
        // --------------------------------------------------------------

        /**
         * Calculate convert meters into pixels based on current zoom
         * @returns {number}
         */
       function getNewRadius()
        {

            let newRadius;
            const crimeRadiusInMeters = 150;
            let meters_per_pixel = 125209.17/ Math.pow(2, map.getZoom());

            newRadius = crimeRadiusInMeters/meters_per_pixel;
            return newRadius;
        }

            /**
             * Present an infobox with information about the local SafetyScore
             * @param loc - The location where the click occured
             */
        function clickCrimePopUp(loc) {
            let contentString = '';
            let hoverInfo = SafetyScoreData.getLocSafetyScore(loc);

            contentString += '<h3>Localized Safety Score: ' + hoverInfo.SafetyScore + '</h3>';
            contentString += '<h4>Average Crime Rating: ' + hoverInfo.avgCrime + '</h4>';
            contentString += '<h4>Crimes Against the public: ' + hoverInfo.count1 + '</h4>';
            contentString += '<h4>Crimes Against Property: ' + hoverInfo.count2 + '</h4>';
            contentString += '<h4>Crimes Against the Person: ' + hoverInfo.count3 + '</h4>';
            contentString += '<h4>Severe Crimes Against the Person: ' + hoverInfo.count4 + '</h4>';

            infoWindow.setContent(contentString);
            infoWindow.setPosition(loc);

            infoWindow.open(map);
        }

            /**
             * Set the gradient for the heat map
             * @returns {string[]} - An array of gradients
             */
        function getGradient(){
            return [
        /*        'rgba(0, 0, 0, 0)',
                'rgba(0, 255, 255, 1)',
                'rgba(100,149,237, 1)',
                'rgba(0, 0, 255, 1)',
                'rgba(0,139,139, 1)',
                'rgba(0, 255, 0, 1)',
                'rgba(173,255,47, 1)',
                'rgba(255,165,0, 1)',
                'rgba(255,69,0, 1)',
                'rgba(255, 0, 0, 1)'
*/
  //Lowest value
                'rgba(0,0,0,0)',
                //'rgba(0,6,166,0.6)',
                'rgba(0,115,255,1)',
                'rgba(0,251,255,1)',
                'rgba(17,255,0,1)',
                'rgba(238,255,0,1)',
                'rgba(255,181,0,1)',
                'rgba(255,0,0,1)'

  // Highest value
                //


            ]
        }

        return googleMapService;
    });
