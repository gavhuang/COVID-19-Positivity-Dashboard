// Initialize the map

function initMap() {
    let map = new google.maps.Map(document.getElementById('map'), {
        // Center of US
        center: {lat: 20, lng: -100},
        zoom: 4,
        styles: [
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                {
                    "visibility": "off"
                }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                {
                    "visibility": "off"
                }
                ]
            },
            {
                "featureType": "road",
                "stylers": [
                {
                    "visibility": "off"
                }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                {
                    "visibility": "off"
                }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                {
                    "visibility": "off"
                }
                ]
            }
        ]
    });
}

/* Loads the state boundary polygons from a GeoJSON source. */
function loadMapShapes() {
    map.data.loadGeoJson('https://storage.googleapis.com/mapsdevsite/json/states.js', { idPropertyName: 'STATE' });
}