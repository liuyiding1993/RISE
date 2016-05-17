$(".dropdown-menu").on('click', 'li a', function(event) {
    $(".dropdown-toggle").text("Top-" + $(this).text());
    $(".dropdown-toggle").val($(this).text());
});


$("#slider").dateRangeSlider({
    // The month should be set as month - 1.
    "bounds": { min: new Date(2015, 0, 1), max: new Date(2015, 11, 31)}
});


$("#explore").on('click', function() {
    var top_k = $(".dropdown-toggle").val();
    var dateValues = $("#slider").dateRangeSlider("values");
    var minDate = dateValues.min.toString();
    var maxDate = dateValues.max.toString();
    if(top_k == "") {
        $('#topk_warning').popover('show');
        setTimeout(function () {
            $('#topk_warning').popover('hide');
        }, 2000);
    }
    if (region == null) {
        $('#region_warning').popover('show');
        setTimeout(function () {
            $('#region_warning').popover('hide');
        }, 2000);
    }
    if (top_k != "" && region != null) {
        var query = {
            'top_k': top_k,
            'minDate': minDate,
            'maxDate': maxDate,
            'bounds': getRegionBounds()
        };
        jQuery.post("", query, showExploreResult);
    }
});


$("#draw").on('click', function() {
    drawRectangular();
});


function showExploreResult(data) {

}