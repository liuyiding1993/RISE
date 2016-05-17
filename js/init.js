
$(document).ready(function(){
    var region_search_height = $("#region_search").height();
    var region_explore_height = $("#region_explore").height();
    var body_height = document.body.clientHeight;
    var results_height = body_height - region_explore_height - region_search_height - 100;
    $("#poi_inside").css("max-height", results_height);
});