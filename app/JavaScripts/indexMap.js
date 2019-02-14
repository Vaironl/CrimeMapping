/**
 * http://usejsdoc.org/
 */
var map, heatmap;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 36.8853, lng: -76.3059},
        zoom: 15
    });

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map
    });

    /*
    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(36.8853, -76.3059));

    var locationSearchInput = document.getElementById('searchTextField');

    var searchBox = new google.maps.places.SearchBox(locationSearchInput, {
        bounds: defaultBounds
    });

    searchBox.addEventListener('places_changed', function() {
        alert("fired");
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
    */


}


function getPoints() {
    return [
        new google.maps.LatLng(36.782551, -76.445368),
        new google.maps.LatLng(36.782745, -76.444586),
        new google.maps.LatLng(36.782842, -76.443688),
        new google.maps.LatLng(36.782919, -76.442815),
        new google.maps.LatLng(36.782992, -76.442112),
        new google.maps.LatLng(36.783100, -76.441461),
        new google.maps.LatLng(36.783206, -76.440829),
        new google.maps.LatLng(36.783273, -76.440324),
        new google.maps.LatLng(36.783316, -76.440023),
        new google.maps.LatLng(36.783357, -76.439794),
        new google.maps.LatLng(36.783361, -76.439687),
        new google.maps.LatLng(36.783368, -76.439666),
        new google.maps.LatLng(36.783383, -76.439594),
        new google.maps.LatLng(36.783508, -76.439525),
        new google.maps.LatLng(36.783842, -76.439591),
        new google.maps.LatLng(36.784147, -76.439668),
        new google.maps.LatLng(36.784206, -76.439686),
        new google.maps.LatLng(36.784386, -76.439790),
        new google.maps.LatLng(36.784701, -76.439902),
        new google.maps.LatLng(36.784965, -76.439938),
        new google.maps.LatLng(36.785010, -76.439947),
        new google.maps.LatLng(36.785360, -76.439952),
        new google.maps.LatLng(36.785715, -76.440030),
        new google.maps.LatLng(36.786117, -76.440119),
        new google.maps.LatLng(36.786564, -76.440209),
        new google.maps.LatLng(36.786905, -76.440270),
        new google.maps.LatLng(36.786956, -76.440279),
        new google.maps.LatLng(36.800224, -76.433520),
        new google.maps.LatLng(36.800155, -76.434101),
        new google.maps.LatLng(36.800160, -76.434430),
        new google.maps.LatLng(36.800368, -76.434527),
        new google.maps.LatLng(36.800738, -76.434598),
        new google.maps.LatLng(36.800938, -76.434650),
        new google.maps.LatLng(36.801024, -76.434889),
        new google.maps.LatLng(36.800955, -76.435392),
        new google.maps.LatLng(36.800886, -76.435959),
        new google.maps.LatLng(36.800811, -76.436275),
        new google.maps.LatLng(36.800788, -76.436299),
        new google.maps.LatLng(36.800719, -76.436302),
        new google.maps.LatLng(36.800702, -76.436298),
        new google.maps.LatLng(36.800661, -76.436273),
        new google.maps.LatLng(36.800395, -76.436172),
        new google.maps.LatLng(36.800228, -76.436116),
        new google.maps.LatLng(36.800169, -76.436130),
        new google.maps.LatLng(36.800066, -76.436167),
        new google.maps.LatLng(36.784345, -76.422922),
        new google.maps.LatLng(36.784389, -76.422926),
        new google.maps.LatLng(36.784436, -76.422924),
        new google.maps.LatLng(36.784746, -76.422818),
        new google.maps.LatLng(36.785436, -76.422959),
        new google.maps.LatLng(36.786120, -76.423112),
        new google.maps.LatLng(36.786433, -76.423029),
        new google.maps.LatLng(36.786631, -76.421213),
        new google.maps.LatLng(36.786660, -76.421033),
        new google.maps.LatLng(36.786801, -76.420141),
        new google.maps.LatLng(36.786823, -76.420034),
        new google.maps.LatLng(36.786831, -76.419916),
        new google.maps.LatLng(36.787034, -76.418208),
        new google.maps.LatLng(36.787056, -76.418034),
        new google.maps.LatLng(36.787169, -76.417145),
        new google.maps.LatLng(36.787217, -76.416715),
        new google.maps.LatLng(36.786144, -76.416403),
        new google.maps.LatLng(36.785292, -76.416257),
        new google.maps.LatLng(36.780666, -76.390364),
        new google.maps.LatLng(36.780501, -76.391281),
        new google.maps.LatLng(36.780148, -76.392052),
        new google.maps.LatLng(36.780173, -76.391148),
        new google.maps.LatLng(36.780693, -76.390592),
        new google.maps.LatLng(36.781261, -76.391142),
        new google.maps.LatLng(36.781808, -76.391730),
        new google.maps.LatLng(36.782340, -76.392341),
        new google.maps.LatLng(36.782812, -76.393022),
        new google.maps.LatLng(36.783300, -76.393672),
        new google.maps.LatLng(36.783809, -76.394275),
        new google.maps.LatLng(36.784246, -76.394979),
        new google.maps.LatLng(36.784791, -76.395958),
        new google.maps.LatLng(36.785675, -76.396746),
        new google.maps.LatLng(36.786262, -76.395780),
        new google.maps.LatLng(36.786776, -76.395093),
        new google.maps.LatLng(36.787282, -76.394426),
        new google.maps.LatLng(36.787783, -76.393667),
        new google.maps.LatLng(36.788343, -76.393184),
        new google.maps.LatLng(36.788895, -76.392506),
        new google.maps.LatLng(36.789361, -76.391701),
        new google.maps.LatLng(36.789722, -76.390952),
        new google.maps.LatLng(36.790315, -76.390305),
        new google.maps.LatLng(36.790738, -76.389616),
        new google.maps.LatLng(36.779448, -76.438702),
        new google.maps.LatLng(36.779023, -76.438585),
        new google.maps.LatLng(36.778542, -76.438492),
        new google.maps.LatLng(36.778100, -76.438411),
        new google.maps.LatLng(36.777986, -76.438366),
        new google.maps.LatLng(36.777680, -76.438313),
        new google.maps.LatLng(36.777316, -76.438273),
        new google.maps.LatLng(36.777135, -76.438254),
        new google.maps.LatLng(36.776987, -76.438303),
        new google.maps.LatLng(36.776946, -76.438404),
        new google.maps.LatLng(36.776944, -76.438467),
        new google.maps.LatLng(36.776892, -76.438459),
        new google.maps.LatLng(36.776842, -76.438442),
        new google.maps.LatLng(36.776822, -76.438391),
        new google.maps.LatLng(36.776814, -76.438412),
        new google.maps.LatLng(36.776787, -76.438628),
        new google.maps.LatLng(36.776729, -76.438650),
        new google.maps.LatLng(36.776759, -76.438677),
        new google.maps.LatLng(36.776772, -76.438498),
        new google.maps.LatLng(36.776787, -76.438389),
        new google.maps.LatLng(36.776848, -76.438283),
        new google.maps.LatLng(36.776870, -76.438239),
        new google.maps.LatLng(36.777015, -76.438198),
        new google.maps.LatLng(36.777333, -76.438256),
        new google.maps.LatLng(36.777595, -76.438308),
        new google.maps.LatLng(36.777797, -76.438344),
        new google.maps.LatLng(36.778160, -76.438442),
        new google.maps.LatLng(36.778414, -76.438508),
        new google.maps.LatLng(36.778445, -76.438516),
        new google.maps.LatLng(36.778503, -76.438529),
        new google.maps.LatLng(36.778607, -76.438549),
        new google.maps.LatLng(36.778670, -76.438644),
        new google.maps.LatLng(36.778847, -76.438706),
        new google.maps.LatLng(36.779240, -76.438744),
        new google.maps.LatLng(36.779738, -76.438822),
        new google.maps.LatLng(36.780201, -76.438882),
        new google.maps.LatLng(36.780400, -76.438905),
        new google.maps.LatLng(36.780501, -76.438921),
        new google.maps.LatLng(36.780892, -76.438986),
        new google.maps.LatLng(36.781446, -76.439087),
        new google.maps.LatLng(36.781985, -76.439199),
        new google.maps.LatLng(36.782239, -76.439249),
        new google.maps.LatLng(36.782286, -76.439266),
        new google.maps.LatLng(36.797847, -76.429388),
        new google.maps.LatLng(36.797874, -76.429180),
        new google.maps.LatLng(36.797885, -76.429069),
        new google.maps.LatLng(36.797887, -76.429050),
        new google.maps.LatLng(36.797933, -76.428954),
        new google.maps.LatLng(36.798242, -76.428990),
        new google.maps.LatLng(36.798617, -76.429075),
        new google.maps.LatLng(36.798719, -76.429092),
        new google.maps.LatLng(36.798944, -76.429145),
        new google.maps.LatLng(36.799320, -76.429251),
        new google.maps.LatLng(36.799590, -76.429309),
        new google.maps.LatLng(36.799677, -76.429324),
        new google.maps.LatLng(36.799966, -76.429360),
        new google.maps.LatLng(36.800288, -76.429430),
        new google.maps.LatLng(36.800443, -76.429461),
        new google.maps.LatLng(36.800465, -76.429474),
        new google.maps.LatLng(36.800644, -76.429540),
        new google.maps.LatLng(36.800948, -76.429620),
        new google.maps.LatLng(36.801242, -76.429685),
        new google.maps.LatLng(36.801365, -76.429702),
        new google.maps.LatLng(36.801400, -76.429703),
        new google.maps.LatLng(36.801453, -76.429707),
        new google.maps.LatLng(36.801473, -76.429709),
        new google.maps.LatLng(36.801532, -76.429707),
        new google.maps.LatLng(36.801852, -76.429729),
        new google.maps.LatLng(36.802173, -76.429789),
        new google.maps.LatLng(36.802459, -76.429847),
        new google.maps.LatLng(36.802554, -76.429825),
        new google.maps.LatLng(36.802647, -76.429549),
        new google.maps.LatLng(36.802693, -76.429179),
        new google.maps.LatLng(36.802729, -76.428751),
        new google.maps.LatLng(36.766104, -76.409291),
        new google.maps.LatLng(36.766103, -76.409268),
        new google.maps.LatLng(36.766138, -76.409229),
        new google.maps.LatLng(36.766183, -76.409231),
        new google.maps.LatLng(36.766153, -76.409276),
        new google.maps.LatLng(36.766005, -76.409365),
        new google.maps.LatLng(36.765897, -76.409570),
        new google.maps.LatLng(36.765767, -76.409739),
        new google.maps.LatLng(36.765693, -76.410389),
        new google.maps.LatLng(36.765615, -76.411201),
        new google.maps.LatLng(36.765533, -76.412121),
        new google.maps.LatLng(36.765467, -76.412939),
        new google.maps.LatLng(36.765444, -76.414821),
        new google.maps.LatLng(36.765444, -76.414964),
        new google.maps.LatLng(36.765318, -76.415424),
        new google.maps.LatLng(36.763961, -76.415296),
        new google.maps.LatLng(36.763115, -76.415196),
        new google.maps.LatLng(36.762967, -76.415183),
        new google.maps.LatLng(36.762278, -76.415127),
        new google.maps.LatLng(36.761675, -76.415055),
        new google.maps.LatLng(36.760932, -76.414988),
        new google.maps.LatLng(36.759336, -76.414862),
        new google.maps.LatLng(36.773187, -76.421922),
        new google.maps.LatLng(36.773043, -76.422118),
        new google.maps.LatLng(36.773007, -76.422165),
        new google.maps.LatLng(36.772979, -76.422219),
        new google.maps.LatLng(36.772865, -76.422394),
        new google.maps.LatLng(36.772779, -76.422503),
        new google.maps.LatLng(36.772676, -76.422701),
        new google.maps.LatLng(36.772606, -76.422806),
        new google.maps.LatLng(36.772566, -76.422840),
        new google.maps.LatLng(36.772508, -76.422852),
        new google.maps.LatLng(36.772387, -76.423011),
        new google.maps.LatLng(36.772099, -76.423328),
        new google.maps.LatLng(36.771704, -76.423683),
        new google.maps.LatLng(36.771481, -76.424081),
        new google.maps.LatLng(36.771400, -76.424179),
        new google.maps.LatLng(36.771352, -76.424220),
        new google.maps.LatLng(36.771248, -76.424327),
        new google.maps.LatLng(36.770904, -76.424781),
        new google.maps.LatLng(36.770520, -76.425283),
        new google.maps.LatLng(36.770336, -76.425553),
        new google.maps.LatLng(36.770128, -76.425832),
        new google.maps.LatLng(36.769756, -76.426331),
        new google.maps.LatLng(36.769300, -76.426902),
        new google.maps.LatLng(36.769132, -76.427065),
        new google.maps.LatLng(36.769092, -76.427103),
        new google.maps.LatLng(36.768979, -76.427172),
        new google.maps.LatLng(36.768595, -76.427634),
        new google.maps.LatLng(36.768362, -76.427913),
        new google.maps.LatLng(36.768336, -76.427961),
        new google.maps.LatLng(36.768244, -76.428138),
        new google.maps.LatLng(36.767942, -76.428581),
        new google.maps.LatLng(36.767482, -76.429094),
        new google.maps.LatLng(36.767031, -76.429606),
        new google.maps.LatLng(36.766732, -76.429986),
        new google.maps.LatLng(36.766680, -76.430058),
        new google.maps.LatLng(36.766633, -76.430109),
        new google.maps.LatLng(36.766580, -76.430211),
        new google.maps.LatLng(36.766367, -76.430594),
        new google.maps.LatLng(36.765910, -76.431136),
        new google.maps.LatLng(36.765353, -76.431806),
        new google.maps.LatLng(36.764962, -76.432298),
        new google.maps.LatLng(36.764868, -76.432486),
        new google.maps.LatLng(36.764518, -76.432913),
        new google.maps.LatLng(36.763435, -76.434173),
        new google.maps.LatLng(36.762847, -76.434953),
        new google.maps.LatLng(36.762291, -76.435935),
        new google.maps.LatLng(36.762224, -76.436074),
        new google.maps.LatLng(36.761957, -76.436892),
        new google.maps.LatLng(36.761652, -76.438886),
        new google.maps.LatLng(36.761284, -76.439955),
        new google.maps.LatLng(36.761210, -76.440068),
        new google.maps.LatLng(36.761064, -76.440720),
        new google.maps.LatLng(36.761040, -76.441411),
        new google.maps.LatLng(36.761048, -76.442324),
        new google.maps.LatLng(36.760851, -76.443118),
        new google.maps.LatLng(36.759977, -76.444591),
        new google.maps.LatLng(36.759913, -76.444698),
        new google.maps.LatLng(36.759623, -76.445065),
        new google.maps.LatLng(36.758902, -76.445158),
        new google.maps.LatLng(36.758428, -76.444570),
        new google.maps.LatLng(36.757687, -76.443340),
        new google.maps.LatLng(36.757583, -76.443240),
        new google.maps.LatLng(36.757019, -76.442787),
        new google.maps.LatLng(36.756603, -76.442322),
        new google.maps.LatLng(36.756380, -76.441602),
        new google.maps.LatLng(36.755790, -76.441382),
        new google.maps.LatLng(36.754493, -76.442133),
        new google.maps.LatLng(36.754361, -76.442206),
        new google.maps.LatLng(36.753619, -76.442650),
        new google.maps.LatLng(36.753096, -76.442915),
        new google.maps.LatLng(36.751617, -76.443211),
        new google.maps.LatLng(36.751496, -76.443246),
        new google.maps.LatLng(36.750733, -76.443428),
        new google.maps.LatLng(36.750126, -76.443536),
        new google.maps.LatLng(36.750103, -76.443684),
        new google.maps.LatLng(36.750390, -76.444010),
        new google.maps.LatLng(36.750448, -76.444013),
        new google.maps.LatLng(36.750536, -76.444040),
        new google.maps.LatLng(36.750493, -76.444141),
        new google.maps.LatLng(36.790859, -76.402808),
        new google.maps.LatLng(36.790864, -76.402768),
        new google.maps.LatLng(36.790995, -76.402539),
        new google.maps.LatLng(36.791148, -76.402172),
        new google.maps.LatLng(36.791385, -76.401312),
        new google.maps.LatLng(36.791405, -76.400776),
        new google.maps.LatLng(36.791288, -76.400528),
        new google.maps.LatLng(36.791113, -76.400441),
        new google.maps.LatLng(36.791027, -76.400395),
        new google.maps.LatLng(36.791094, -76.400311),
        new google.maps.LatLng(36.791211, -76.400183),
        new google.maps.LatLng(36.791060, -76.399334),
        new google.maps.LatLng(36.790538, -76.398718),
        new google.maps.LatLng(36.790095, -76.398086),
        new google.maps.LatLng(36.789644, -76.397360),
        new google.maps.LatLng(36.789254, -76.396844),
        new google.maps.LatLng(36.788855, -76.396397),
        new google.maps.LatLng(36.788483, -76.395963),
        new google.maps.LatLng(36.788015, -76.395365),
        new google.maps.LatLng(36.787558, -76.394735),
        new google.maps.LatLng(36.787472, -76.394323),
        new google.maps.LatLng(36.787630, -76.394025),
        new google.maps.LatLng(36.787767, -76.393987),
        new google.maps.LatLng(36.787486, -76.394452),
        new google.maps.LatLng(36.786977, -76.395043),
        new google.maps.LatLng(36.786583, -76.395552),
        new google.maps.LatLng(36.786540, -76.395610),
        new google.maps.LatLng(36.786516, -76.395659),
        new google.maps.LatLng(36.786368, -76.395707),
        new google.maps.LatLng(36.786044, -76.395362),
        new google.maps.LatLng(36.785598, -76.394715),
        new google.maps.LatLng(36.785321, -76.394361),
        new google.maps.LatLng(36.785207, -76.394236),
        new google.maps.LatLng(36.785751, -76.394062),
        new google.maps.LatLng(36.785996, -76.393881),
        new google.maps.LatLng(36.786092, -76.393830),
        new google.maps.LatLng(36.785998, -76.393899),
        new google.maps.LatLng(36.785114, -76.394365),
        new google.maps.LatLng(36.785022, -76.394441),
        new google.maps.LatLng(36.784823, -76.394635),
        new google.maps.LatLng(36.784719, -76.394629),
        new google.maps.LatLng(36.785069, -76.394176),
        new google.maps.LatLng(36.785500, -76.393650),
        new google.maps.LatLng(36.785770, -76.393291),
        new google.maps.LatLng(36.785839, -76.393159),
        new google.maps.LatLng(36.782651, -76.400628),
        new google.maps.LatLng(36.782616, -76.400599),
        new google.maps.LatLng(36.782702, -76.400470),
        new google.maps.LatLng(36.782915, -76.400192),
        new google.maps.LatLng(36.783136, -76.399887),
        new google.maps.LatLng(36.783414, -76.399519),
        new google.maps.LatLng(36.783629, -76.399236),
        new google.maps.LatLng(36.783688, -76.399157),
        new google.maps.LatLng(36.783616, -76.399106),
        new google.maps.LatLng(36.783698, -76.399072),
        new google.maps.LatLng(36.783997, -76.399186),
        new google.maps.LatLng(36.784271, -76.399538),
        new google.maps.LatLng(36.784577, -76.399948),
        new google.maps.LatLng(36.784828, -76.400260),
        new google.maps.LatLng(36.784999, -76.400477),
        new google.maps.LatLng(36.785113, -76.400651),
        new google.maps.LatLng(36.785155, -76.400703),
        new google.maps.LatLng(36.785192, -76.400749),
        new google.maps.LatLng(36.785278, -76.400839),
        new google.maps.LatLng(36.785387, -76.400857),
        new google.maps.LatLng(36.785478, -76.400890),
        new google.maps.LatLng(36.785526, -76.401022),
        new google.maps.LatLng(36.785598, -76.401148),
        new google.maps.LatLng(36.785631, -76.401202),
        new google.maps.LatLng(36.785660, -76.401267),
        new google.maps.LatLng(36.803986, -76.426035),
        new google.maps.LatLng(36.804102, -76.425089),
        new google.maps.LatLng(36.804211, -76.424156),
        new google.maps.LatLng(36.803861, -76.423385),
        new google.maps.LatLng(36.803151, -76.423214),
        new google.maps.LatLng(36.802439, -76.423077),
        new google.maps.LatLng(36.801740, -76.422905),
        new google.maps.LatLng(36.801069, -76.422785),
        new google.maps.LatLng(36.800345, -76.422649),
        new google.maps.LatLng(36.799633, -76.422603),
        new google.maps.LatLng(36.799750, -76.421700),
        new google.maps.LatLng(36.799885, -76.420854),
        new google.maps.LatLng(36.799209, -76.420607),
        new google.maps.LatLng(36.795656, -76.400395),
        new google.maps.LatLng(36.795203, -76.400304),
        new google.maps.LatLng(36.778738, -76.415584),
        new google.maps.LatLng(36.778812, -76.415189),
        new google.maps.LatLng(36.778824, -76.415092),
        new google.maps.LatLng(36.778833, -76.414932),
        new google.maps.LatLng(36.778834, -76.414898),
        new google.maps.LatLng(36.778740, -76.414757),
        new google.maps.LatLng(36.778501, -76.414433),
        new google.maps.LatLng(36.778182, -76.414026),
        new google.maps.LatLng(36.777851, -76.413623),
        new google.maps.LatLng(36.777486, -76.413166),
        new google.maps.LatLng(36.777109, -76.412674),
        new google.maps.LatLng(36.776743, -76.412186),
        new google.maps.LatLng(36.776440, -76.411800),
        new google.maps.LatLng(36.776295, -76.411614),
        new google.maps.LatLng(36.776158, -76.411440),
        new google.maps.LatLng(36.775806, -76.410997),
        new google.maps.LatLng(36.775422, -76.410484),
        new google.maps.LatLng(36.775126, -76.410087),
        new google.maps.LatLng(36.775012, -76.409854),
        new google.maps.LatLng(36.775164, -76.409573),
        new google.maps.LatLng(36.775498, -76.409180),
        new google.maps.LatLng(36.775868, -76.408730),
        new google.maps.LatLng(36.776256, -76.408240),
        new google.maps.LatLng(36.776519, -76.407928),
        new google.maps.LatLng(36.776539, -76.407904),
        new google.maps.LatLng(36.776595, -76.407854),
        new google.maps.LatLng(36.776853, -76.407547),
        new google.maps.LatLng(36.777234, -76.407087),
        new google.maps.LatLng(36.777644, -76.406558),
        new google.maps.LatLng(36.778066, -76.406017),
        new google.maps.LatLng(36.778468, -76.405499),
        new google.maps.LatLng(36.778866, -76.404995),
        new google.maps.LatLng(36.779295, -76.404455),
        new google.maps.LatLng(36.779695, -76.403950),
        new google.maps.LatLng(36.779982, -76.403584),
        new google.maps.LatLng(36.780295, -76.403223),
        new google.maps.LatLng(36.780664, -76.402766),
        new google.maps.LatLng(36.781043, -76.402288),
        new google.maps.LatLng(36.781399, -76.401823),
        new google.maps.LatLng(36.781727, -76.401407),
        new google.maps.LatLng(36.781853, -76.401247),
        new google.maps.LatLng(36.781894, -76.401195),
        new google.maps.LatLng(36.782076, -76.400977),
        new google.maps.LatLng(36.782338, -76.400603),
        new google.maps.LatLng(36.782666, -76.400133),
        new google.maps.LatLng(36.783048, -76.399634),
        new google.maps.LatLng(36.783450, -76.399198),
        new google.maps.LatLng(36.783691, -76.398998),
        new google.maps.LatLng(36.784177, -76.398959),
        new google.maps.LatLng(36.784388, -76.398971),
        new google.maps.LatLng(36.784404, -76.399128),
        new google.maps.LatLng(36.784586, -76.399524),
        new google.maps.LatLng(36.784835, -76.399927),
        new google.maps.LatLng(36.785116, -76.400307),
        new google.maps.LatLng(36.785282, -76.400539),
        new google.maps.LatLng(36.785346, -76.400692),
        new google.maps.LatLng(36.765769, -76.407201),
        new google.maps.LatLng(36.765790, -76.407414),
        new google.maps.LatLng(36.765802, -76.407755),
        new google.maps.LatLng(36.765791, -76.408219),
        new google.maps.LatLng(36.765763, -76.408759),
        new google.maps.LatLng(36.765726, -76.409348),
        new google.maps.LatLng(36.765716, -76.409882),
        new google.maps.LatLng(36.765708, -76.410202),
        new google.maps.LatLng(36.765705, -76.410253),
        new google.maps.LatLng(36.765707, -76.410369),
        new google.maps.LatLng(36.765692, -76.410720),
        new google.maps.LatLng(36.765699, -76.411215),
        new google.maps.LatLng(36.765687, -76.411789),
        new google.maps.LatLng(36.765666, -76.412363),
        new google.maps.LatLng(36.765598, -76.412883),
        new google.maps.LatLng(36.765543, -76.413039),
        new google.maps.LatLng(36.765532, -76.413125),
        new google.maps.LatLng(36.765500, -76.413553),
        new google.maps.LatLng(36.765448, -76.414053),
        new google.maps.LatLng(36.765388, -76.414645),
        new google.maps.LatLng(36.765323, -76.415250),
        new google.maps.LatLng(36.765303, -76.415847),
        new google.maps.LatLng(36.765251, -76.416439),
        new google.maps.LatLng(36.765204, -76.417020),
        new google.maps.LatLng(36.765172, -76.417556),
        new google.maps.LatLng(36.765164, -76.418075),
        new google.maps.LatLng(36.765153, -76.418618),
        new google.maps.LatLng(36.765136, -76.419112),
        new google.maps.LatLng(36.765129, -76.419368),
        new google.maps.LatLng(36.765119, -76.419481),
        new google.maps.LatLng(36.765100, -76.419852),
        new google.maps.LatLng(36.765083, -76.420349),
        new google.maps.LatLng(36.765045, -76.420930),
        new google.maps.LatLng(36.764992, -76.421481),
        new google.maps.LatLng(36.764980, -76.421695),
        new google.maps.LatLng(36.764993, -76.421843),
        new google.maps.LatLng(36.764986, -76.422255),
        new google.maps.LatLng(36.764975, -76.422823),
        new google.maps.LatLng(36.764939, -76.423411),
        new google.maps.LatLng(36.764902, -76.424014),
        new google.maps.LatLng(36.764853, -76.424576),
        new google.maps.LatLng(36.764826, -76.424922),
        new google.maps.LatLng(36.764796, -76.425365),
        new google.maps.LatLng(36.764782, -76.425869),
        new google.maps.LatLng(36.764768, -76.426089),
        new google.maps.LatLng(36.764766, -76.426117),
        new google.maps.LatLng(36.764723, -76.426276),
        new google.maps.LatLng(36.764681, -76.426649),
        new google.maps.LatLng(36.782012, -76.404200),
        new google.maps.LatLng(36.781574, -76.404911),
        new google.maps.LatLng(36.781055, -76.405597),
        new google.maps.LatLng(36.780479, -76.406341),
        new google.maps.LatLng(36.779996, -76.406939),
        new google.maps.LatLng(36.779459, -76.407613),
        new google.maps.LatLng(36.778953, -76.408228),
        new google.maps.LatLng(36.778409, -76.408839),
        new google.maps.LatLng(36.777842, -76.409501),
        new google.maps.LatLng(36.777334, -76.410181),
        new google.maps.LatLng(36.776809, -76.410836),
        new google.maps.LatLng(36.776240, -76.411514),
        new google.maps.LatLng(36.775725, -76.412145),
        new google.maps.LatLng(36.775190, -76.412805),
        new google.maps.LatLng(36.774672, -76.413464),
        new google.maps.LatLng(36.774084, -76.414186),
        new google.maps.LatLng(36.773533, -76.413636),
        new google.maps.LatLng(36.773021, -76.413009),
        new google.maps.LatLng(36.772501, -76.412361),
        new google.maps.LatLng(36.771964, -76.411681),
        new google.maps.LatLng(36.771479, -76.411078),
        new google.maps.LatLng(36.770992, -76.410477),
        new google.maps.LatLng(36.770467, -76.409801),
        new google.maps.LatLng(36.770090, -76.408904),
        new google.maps.LatLng(36.769657, -76.408103),
        new google.maps.LatLng(36.769132, -76.407276),
        new google.maps.LatLng(36.768564, -76.406469),
        new google.maps.LatLng(36.767980, -76.405745),
        new google.maps.LatLng(36.767380, -76.405299),
        new google.maps.LatLng(36.766604, -76.405297),
        new google.maps.LatLng(36.765838, -76.405200),
        new google.maps.LatLng(36.765139, -76.405139),
        new google.maps.LatLng(36.764457, -76.405094),
        new google.maps.LatLng(36.763616, -76.405142),
        new google.maps.LatLng(36.762932, -76.405398),
        new google.maps.LatLng(36.762126, -76.405813),
        new google.maps.LatLng(36.761344, -76.406215),
        new google.maps.LatLng(36.760556, -76.406495),
        new google.maps.LatLng(36.759732, -76.406484),
        new google.maps.LatLng(36.758910, -76.406228),
        new google.maps.LatLng(36.758182, -76.405695),
        new google.maps.LatLng(36.757676, -76.405118),
        new google.maps.LatLng(36.757039, -76.404346),
        new google.maps.LatLng(36.756335, -76.403619),
        new google.maps.LatLng(36.755503, -76.403406),
        new google.maps.LatLng(36.754665, -76.403242),
        new google.maps.LatLng(36.753836, -76.403172),
        new google.maps.LatLng(36.752986, -76.403112),
        new google.maps.LatLng(36.751266, -76.403355)
    ]
};