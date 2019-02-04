/**
 * http://usejsdoc.org/
 */
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 36.8853, lng: -76.3059},
    zoom: 20
  });
}