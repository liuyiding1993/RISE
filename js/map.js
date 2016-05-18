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
        editable: true
    });
    region.setMap(map);

    if (type == "search") {
        region.addListener('bounds_changed', function() {
            $("#result_title").text("Results");
            $("#poi_inside").empty();
        });
    }
}


function getRegionBounds() {
    var raw_bound = region.getBounds();
    return {
        north: raw_bound['H']['j'],
        south: raw_bound['H']['H'],
        east: raw_bound['j']['H'],
        west: raw_bound['j']['j']
    };
}