
$(document).ready(function(){
    var region_search_height = $("#region_search").height();
    var region_explore_height = $("#region_explore").height();
    var body_height = document.body.clientHeight;
    var results_height = body_height - region_explore_height - region_search_height - 100;
    $("#result_list").css("max-height", results_height);
});

$(window).resize(function(){
    var region_search_height = $("#region_search").height();
    var region_explore_height = $("#region_explore").height();
    var body_height = document.body.clientHeight;
    var results_height = body_height - region_explore_height - region_search_height - 100;
    $("#result_list").css("max-height", results_height);
});