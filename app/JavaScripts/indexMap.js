/**
 * http://usejsdoc.org/
*/


    var map, heatmap;

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 36.8853, lng: },
            zoom: 15
        });

        heatmap = new google.maps.visualization.HeatmapLayer({
            data: getPoints(crimes),
            map: map
        });
    }

    function getPoints(crimes) {
        // An array that will contain all the crimes lat and lng values
        //      as objects of type google.maps.LatLng
        var googlePoints = [];

        for (var i = 0; i < crimes.length; i++) {
            // 1.) Parse each string in crimesJSONArray
            //      into a JSON object called crime
            let crime = JSON.parse(crimes[i]);

            // 2.) Store the relevant properties
            var lats = crime.latitude;      // store the latitude coordinate
            var lngs = crime.longitude;     // store the longitude coordinate
            var weights = crime.severity;   // store the weight (will need more calculations in future)

            // 3.) Append to the array of google.maps.LatLng objects
            googlePoints[i] = new google.maps.LatLng(
                lats,
                lngs.longitude);

            // !!! Still need to do something with the weight property !!!
        }

        return googlePoints;
}
