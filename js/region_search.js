$("#search").on('click', function() {
    var height = $("#height").val();
    var width = $("#width").val();
    var keywords = $("#keywords").val();
    var reg = new RegExp("^[0-9]*$");
    var isHeightValid = reg.test(height) && height != '';
    var isWidthValid = reg.test(width) && width != '';
    if(!isHeightValid){
        $('#height_warning').popover('show');
        setTimeout(function () {
            $('#height_warning').popover('hide');
        }, 2000);
    }
    if(!isWidthValid){
        $('#width_warning').popover('show');
        setTimeout(function () {
            $('#width_warning').popover('hide');
        }, 2000);
    }
    if(isHeightValid && isWidthValid) {
        var query = {
            "height": height,
            "width": width,
            "keywords": keywords
        };
        // TODO: fill in the search url.
         jQuery.post("", query, showSearchResult);
    }
});


$(function () {
    $('[data-toggle="popover"]').popover()
});


// TODO: transform data into {'bounds': bounds, 'pois': []}
function showSearchResult(data) {
    $("#result_title").text("POI Inside");
    // test data
    data = {
       'bounds': {
           north: 1.3440514780783714,
           south: 1.3087743219216286,
           east: 103.82537567807832,
           west: 103.79009852192156},
       'pois': [
           {
               'image_url': './pics/1.png',
               'poi_name': 'Neverland',
               'lat': 1.3,
               'lng': 103,
               'categories': ['Dance Clubs', 'Music Venues'],
               'description': 'With the ambitious vision of delivering a clubbing experience unlike any other...'
           }
       ]
    };
    drawRectangular(data['bounds'], "search");
    showPoiInside(data['pois']);
}


function showPoiInside(pois) {
    // $("#result_list").empty();
    for (var i = 0; i < pois.length; i++) {
        addPoi(pois[i]);
    }
}

// TODO: 1. add event listener to support showing poi on the map by clicking the widget. 2. highlight keywords.
function addPoi(poi) {
    var image_html = "<div class='media-left'> <a href='#'> <img class='media-object' src='" + poi['image_url'] + "' alt='...' style='width:50px;height:50px;'> </a> </div>";
    var head_html = "<h4 class='media-heading'>" + poi['poi_name'] + "</h4>";
    var categories_html = "<h4>";
    for (var i = 0; i < poi['categories'].length; i++) {
        var category = poi['categories'][i];
        categories_html += "<span class='label label-info'>" + category + "</span> ";
    }
    categories_html += "</h4>";
    var description_html = poi['description'];
    var media_body_html = "<div class='media-body'>" + head_html + categories_html + description_html + "</div>";
    var content_html = "<li class='media'>" + image_html + media_body_html + "</li>";

    $("#result_list").append(content_html);
}