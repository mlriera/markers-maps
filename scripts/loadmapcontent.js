var path = "all-content.json";
var output = "";

function initMap(centerlatitude, centerlongitude) {
    
}

$(document).ready(function() {
    
    $.getJSON(path, function(info) {
        
        console.log(info.items);
        for (let i = 0; i < info.items.length; i++) {
            output += '<div style="border:2px solid red;margin:10px;">';
            output += '<a href="https://findinglostangeles.com' + info.items[i].fullUrl + '">';
            if (!info.items[i].location.addressTitle) {
                output += '<h3>' + 'no title' + '</h3>';
            }
            else {
                output += '<h3>' + info.items[i].location.addressTitle + '</h3>';
            }
            output += '</a>';
            output += '<p>' + info.items[i].location.addressLine1 + '</p>';
            output += '<p>' + info.items[i].location.addressLine2 + '</p>';
            output += '<p> Latitude: ' + info.items[i].location.mapLat + '</p>';
            output += '<p> Longitude: ' + info.items[i].location.mapLng + '</p>';
            output += '</div>';
        } //for each item
        
        var container = document.getElementById('infocontainer');
        container.innerHTML = output;
        
        // Calculate center latitude and longitude
        let latitude = 0;
        let longitude = 0;
        for (let j = 0; j<info.items.length; j++) {
            latitude += info.items[j].location.mapLat;
            longitude += info.items[j].location.mapLng;
        }
        latitude = latitude/info.items.length;
        longitude = longitude/info.items.length;
        
        console.log(latitude);
        console.log(longitude);
        
        var map = new google.maps.Map(document.getElementById('mapcontainer'), {
            center: {lat: latitude, lng: longitude},
            zoom: 9,
            panControl: true,
            mapTypeControl: false,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE,
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            scaleControl: false,
            streetViewControl: false,
            styles: [
                {
                  elementType: 'geometry',
                  stylers: [{color: '#f5f5f5'}]
                },
                {
                  elementType: 'labels.icon',
                  stylers: [{visibility: 'on'}]
                },
                {
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#616161'}]
                },
                {
                  elementType: 'labels.text.stroke',
                  stylers: [{color: '#f5f5f5'}]
                },
                {
                  featureType: 'administrative.land_parcel',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#bdbdbd'}]
                },
                {
                  featureType: 'poi',
                  elementType: 'geometry',
                  stylers: [{color: '#eeeeee'}]
                },
                {
                  featureType: 'poi',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#757575'}]
                },
                {
                  featureType: 'poi.park',
                  elementType: 'geometry',
                  stylers: [{color: '#e5e5e5'}]
                },
                {
                  featureType: 'poi.park',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#9e9e9e'}]
                },
                {
                  featureType: 'road',
                  elementType: 'geometry',
                  stylers: [{color: '#ffffff'}]
                },
                {
                  featureType: 'road.arterial',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#757575'}]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'geometry',
                  stylers: [{color: '#dadada'}]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#616161'}]
                },
                {
                  featureType: 'road.local',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#9e9e9e'}]
                },
                {
                  featureType: 'transit.line',
                  elementType: 'geometry',
                  stylers: [{color: '#e5e5e5'}]
                },
                {
                  featureType: 'transit.station',
                  elementType: 'geometry',
                  stylers: [{color: '#eeeeee'}]
                },
                {
                  featureType: 'water',
                  elementType: 'geometry',
                  stylers: [{color: '#c9c9c9'}]
                },
                {
                  featureType: 'water',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#9e9e9e'}]
                }
            ]
        });
        
        // Add markers
        for (let k = 0; k<info.items.length; k++) {
            let string = "";
            if (!info.items[k].location.addressTitle) {
                string = '<a href="https://findinglostangeles.com' + info.items[k].fullUrl + '"><h4>'+ 'no title' +'</h4';
            }
            else {
                string = '<a href="https://findinglostangeles.com' + info.items[k].fullUrl + '"><h4>'+ info.items[k].location.addressTitle +'</h4';
            }
            let infowindow = new google.maps.InfoWindow({
                content: string
            });

            let location = {lat: info.items[k].location.mapLat, lng: info.items[k].location.mapLng};

            let marker = new google.maps.Marker({
                position: location,
                map: map
            });
            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
        }
        
        // Adjust boundaries
        let bounds = new google.maps.LatLngBounds();
        for (let l = 0; l<info.items.length; l++) {
            let position = new google.maps.LatLng(info.items[l].location.mapLat, info.items[l].location.mapLng);
            bounds.extend(position);
        }
        map.fitBounds(bounds, 50);
        
        
    }); // getJSON

}); // ready
