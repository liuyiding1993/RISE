var map;
function initMap() {
    var Singapore = {lat: 1.3264129, lng: 103.8077371};
    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: Singapore,
        zoom: 12
    });
}

var region;
function drawRectangular(bounds, type) {
    if (region != null) {
        region.setMap(null);
    }
    if (bounds == null) {
        var zoom = map.getZoom();
        var center = map.getCenter();
        var center_lat = center.lat();
        var center_lng = center.lng();
        var size_coefficient = 1.4;
        bounds = {
            north: center_lat + 1 / Math.pow(size_coefficient, zoom),
            south: center_lat - 1 / Math.pow(size_coefficient, zoom),
            east: center_lng + 1 / Math.pow(size_coefficient, zoom),
            west: center_lng - 1 / Math.pow(size_coefficient, zoom)
        };
    }

    region = new google.maps.Rectangle({
        bounds: bounds,
        draggable: true,
        editable: true,
        fillOpacity: 0.1
    });
    region.setMap(map);

    if (type == "search") {
        region.addListener('bounds_changed', function() {
            $("#result_title").text("Results");
            $("#poi_inside").empty();

            $("#default_rank").hide();
            $("#category_rank").hide();

            $("#result_list").empty();
            $('#result_list').show();
            $("#result_list_by_category").empty();
            $('#result_list_by_category').hide();

            category_pois = {};
            for (var category in category_markers) clearMarkers(category_markers[category]);
            category_markers = {};
        });
    }
}


function getRegionBounds() {
    var raw_bound = region.getBounds();
    return {
        north: raw_bound.getNorthEast().lat(),
        south: raw_bound.getSouthWest().lat(),
        east: raw_bound.getNorthEast().lng(),
        west: raw_bound.getSouthWest().lng()
    };
}


function clearMarkers(container) {
    for (var i = 0; i < container.length; i++) container[i].setMap(null);
}


function addMarker(name, lat, lng, color, container) {
    var icon = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + color.slice(1));
    var marker = new google.maps.Marker({
        map: map,
        title: name,
        position: {lat: lat, lng: lng},
        icon: icon,
        visible: true
    });
    container.push(marker);
}