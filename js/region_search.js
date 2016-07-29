$("#search").on('click', function() {
	$("#result_stat").html("");
    var search_type = $("#search_type").val();
    var height = $("#height").val();
    var width = $("#width").val();
    var keywords = $("#keywords").val();
    var reg = new RegExp("^[0-9]+\.{0,1}[0-9]*$");
    var isHeightValid = reg.test(height) && height != '';
    var isWidthValid = reg.test(width) && width != '';
    if (search_type == "") {
        $('#search_type_warning').popover('show');
        setTimeout(function () {
            $('#search_type_warning').popover('hide');
        }, 2000);
    }

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
    if(isHeightValid && isWidthValid && search_type != "") {
        var query = {
            "height": height,
            "width": width,
            "search_type": search_type,
            "keywords": keywords
        };
        console.log(query);
        // TODO: fill in the search url.
         jQuery.post("mc", query, showSearchResult);
    }
});


$(function () {
    $('[data-toggle="popover"]').popover()
});


// TODO: transform data into {'bounds': bounds, 'pois': []}
function showSearchResult(data) {
    $("#result_title").text("POI Inside");
    // test data
  if(!data['valid']){
    showPoiInside(data['pois']);
  }
  else{
      var center = new google.maps.LatLng((data['bounds']['north']+data['bounds']['south'])/2, (data['bounds']['east']+data['bounds']['west'])/2);
      map.panTo(center);
      drawRectangular(data['bounds'], "search");
      showPoiInside(data['pois']);
    }
}


function showPoiInside(pois) {
    $("#result_list").empty();
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