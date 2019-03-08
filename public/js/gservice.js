
// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('gservice', [])
    .factory('gservice', function($http){

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
            zoom: 15
          });

          heatmap = new google.maps.visualization.HeatmapLayer({
            data: getPoints(crimes),
            map: map,
            //radius: 10,
            dissipating: false
          });
        }, function (error) {
          console.log("This is an error: ", error);
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
          var loc = new google.maps.LatLng(crimes[i].lat,crimes[i].lng);
          googlePoints.push(loc);
        }
        //console.log(googlePoints);
        console.log(googlePoints.length);
        return googlePoints;
      }

// Refresh the page upon window load. Use the initial latitude and longitude
      google.maps.event.addDomListener(window, 'load',
          googleMapService.refresh());


      return googleMapService;

    });
