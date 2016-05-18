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
    drawRectangular(null, "explore");
});


function showExploreResult(data) {
    $("#result_title").text("Region Topics");
    // test data. See /js/word_cloud.js for tags format.
    //data = {
    //    "topics": [tags, tags, tags]
    //};
    showTopics(data["topics"]);
}



function showTopics(topics) {
    $("#result_list").empty();
    for (var i = 0; i < topics.length; i++) {
        addTopic(i, topics[i]);
    }
}


function addTopic(num, topic) {
    num = String(num);
    var content_html = '<li class="media"> <div class="media-body" style="padding-top: 50px"> <img src="./pics/topic_icon.png" style="width: 20px; margin-right: 5px" align="left"> <h4 class="media-heading">Topic #' + num + ':</h4> </div> <div id="word_cloud' + num + '" class="media-right"> </div> </li>';
    $("#result_list").append(content_html);
    addWordCloud(topic, "#word_cloud" + num);
}