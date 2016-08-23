var result_pois;
var colors = ['#00008B', '#666699', '#654321', '#88654E', '#5D3954', '#A40000', '#08457E', '#986960', '#CD5B45', '#008B8B', '#536878', '#B8860B', '#A9A9A9', '#013220', '#006400', '#1F262A', '#00416A', '#00147E', '#1A2421', '#BDB76B', '#483C32', '#734F96', '#534B4F', '#543D37', '#8B008B', '#A9A9A9', '#003366', '#4A5D23', '#556B2F', '#FF8C00', '#9932CC', '#779ECB', '#03C03C', '#966FD6', '#C23B22', '#E75480', '#003399', '#4F3A3C', '#301934', '#872657', '#8B0000', '#E9967A', '#560319', '#8FBC8F', '#3C1414', '#8CBED6', '#483D8B', '#2F4F4F', '#177245', '#918151', '#FFA812', '#483C32', '#CC4E5C', '#00CED1', '#D1BEA8', '#9400D3', '#9B870C', '#00703C', '#555555', '#D70A53', '#40826D', '#A9203E', '#EF3038', '#E9692C', '#DA3287', '#FAD6A5', '#B94E48', '#704241', '#C154C1', '#056608', '#0E7C61', '#004B49', '#333366', '#F5C71A', '#9955BB', '#CC00CC', '#820000', '#D473D4', '#355E3B', '#FFCBA4', '#FF1493', '#A95C68', '#850101', '#843F5B', '#FF9933', '#00BFFF', '#4A646C', '#556B2F', '#7E5E60', '#66424D', '#330066', '#BA8759', '#1560BD', '#2243B6', '#669999', '#ED9121', '#00563F', '#062A78', '#703642', '#C95A49', '#A67B5B', '#4B3621', '#1E4D2B', '#A3C1AD', '#C19A6B', '#480607', '#800020', '#DEB887', '#A17A74', '#CC5500', '#E97451', '#8A3324', '#BD33A4', '#702963', '#536872', '#5F9EA0', '#91A3B0', '#006B3C', '#ED872D', '#E30022', '#004225', '#CD7F32', '#737000', '#964B00', '#A52A2A', '#6B4423', '#AF6E4D', '#cc9966', '#1B4D3E', '#CC0000', '#006A4E', '#873260', '#0070FF', '#B5A642', '#CB4154', '#1DACD6', '#BF4F51', '#000000', '#3D0C02', '#54626F', '#253529', '#3B3C36', '#2E5894', '#9C2542', '#E88E5A', '#CD9575', '#665D1E', '#915C83', '#841B2D', '#50C878', '#6C3082', '#1B4D3E', '#B48395', '#AB4B52', '#CC474B', '#563C5C', '#96C8A2', '#44D7A8', '#C19A6B', '#801818', '#B53389', '#DE5285', '#F400A1', '#014421', '#228B22', '#A67B5B', '#856D4D', '#0072BB', '#FD3F92', '#86608E', '#FD6C9E', '#811453', '#4E1609', '#C72C48', '#F64A8A', '#CC397B', '#C74375', '#E48400', '#CC6666', '#2E2D88', '#F88379', '#002E63', '#8C92AC', '#B87333', '#0047AB', '#D2691E', '#965A3E', '#6F4E37', '#DE3163', '#EC3B83', '#007BA7', '#2A52BE', '#6D9BC3', '#007AA5', '#E03C31'];
var category_id = {};


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
    result_pois = data['pois'];

    if(!data['valid']){
        showPoiInside(result_pois);
    }
    else{
        var center = new google.maps.LatLng((data['bounds']['north']+data['bounds']['south'])/2, (data['bounds']['east']+data['bounds']['west'])/2);
        map.panTo(center);
        drawRectangular(data['bounds'], "search");
        showPoiInsideDefault(result_pois);
    }
}


function showPoiInsideDefault(pois) {
    var $result_list = $("#result_list");
    $result_list.empty();
    $("#result_list_by_category").empty();

    for (var i = 0; i < pois.length; i++) {
        var content = getPoiContent(pois[i]);
        $result_list.append(content);
    }
}

function showPoiInsideCategory(pois) {
    $("#result_list").empty();
    $("#result_list_by_category").empty();

    var category_pois = {};
    for (var i = 0; i < pois.length; i++) {
        var poi = pois[i];
        for (var j = 0; j < poi['categories'].length; j++) {
            var category = poi['categories'][j];
            if (category_id[category] == undefined) category_id[category] = Object.keys(category_id).length;
            if (category_pois[category] == undefined) category_pois[category] = [];
            category_pois[category].push(poi);
        }
    }

    var categorized_pois = [];
    for (category in category_pois) {
        categorized_pois.push([category, category_pois[category]]);
    }

    categorized_pois.sort(function(a, b) {
        return b[1].length - a[1].length;
    });

    for (var cid = 0; cid < categorized_pois.length; cid++) {
        addCategory(categorized_pois[cid]);
    }

    $('.my_accordion .acd_head').click(function() {
        $(this).next().toggle();
        return false;
    }).next().hide();
}


function addCategory(categorized_pois) {
    var category = categorized_pois[0];
    var pois = categorized_pois[1];
    console.log(pois.length);

    var accordion = "";
    accordion += "<li class='my_accordion'>";
    accordion += "<h3 class='acd_head' style='color: " + colors[category_id[category]] + "'>" + category + "</h3>";
    accordion += "<div>";
    accordion += "<ul class='media-list'>";

    for (var i = 0; i < pois.length; i++)
        accordion += getPoiContent(pois[i]);

    accordion += "</ul>";
    accordion += "</div></li>";

    $("#result_list_by_category").append(accordion);
}


function getPoiContent(poi) {
    var image_html = "<div class='media-left'> <a href='#'> <img class='media-object' src='" + poi['image_url'] + "' alt='...' style='width:50px;height:50px;'> </a> </div>";
    var head_html = "<h4 class='media-heading'>" + poi['poi_name'] + "</h4>";
    var categories_html = "<h4>";
    for (var i = 0; i < poi['categories'].length; i++) {
        var category = poi['categories'][i];
        if(category_id[category] == undefined) category_id[category] = Object.keys(category_id).length;
        categories_html += "<span class='label label-info' style='background-color: " + colors[category_id[category]] +"'>" + category + "</span> ";
    }
    categories_html += "</h4>";
    var description_html = poi['description'];
    var media_body_html = "<div class='media-body'>" + head_html + categories_html + description_html + "</div>";
    var content_html = "<li class='media'>" + image_html + media_body_html + "</li>";
    return content_html;
}


$("#default_rank").on('click', function() {
    showPoiInsideDefault(result_pois);
});

$("#category_rank").on('click', function() {
    showPoiInsideCategory(result_pois);
});