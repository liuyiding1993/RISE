$("#topk_menu").on('click', 'li a', function (event) {
    var $topk = $("#topk");
    $topk.text("Top-" + $(this).text());
    $topk.val($(this).text());
});

$("#search_type_menu").on('click', 'li a', function (event) {
    var $search_type = $("#search_type");
    $search_type.text($(this).text());
    $search_type.val($(this).text());
});


$("#slider").dateRangeSlider({
    // The month should be set as month - 1.
    defaultValues:{
        min: new Date(2015, 0, 1),
        max: new Date(2015, 0, 31)
    },
    bounds: {min: new Date(2015, 0, 1), max: new Date(2015, 11, 31)}
});


$("#explore").on('click', function () {
	$("#result_stat").html("");
    var top_k = $("#topk").val();
    var dateValues = $("#slider").dateRangeSlider("values");
    var minDate = formatDate(dateValues.min);
    var maxDate = formatDate(dateValues.max);
    if (top_k == "") {
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
        $("#result_list").html("<img class=\"media-object\" src=\"./pics/loading.gif\" style=\"width:100px;height:100px;\">");
		var bound = getRegionBounds();
        var query = {
            'topk': top_k,
            'start': minDate,
            'end': maxDate,
            'sw': bound.south + ',' + bound.west,
            'ne': bound.north + ',' + bound.east
        };
        jQuery.get("./regionexplore/explore.aspx", query, showExploreResult);
    }
});


$("#draw").on('click', function () {
    drawRectangular(null, "explore");
});

function formatDate(date) {
    return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
}


function showExploreResult(data) {
    // test data. See /js/word_cloud.js for tags format.
	console.log(data);
    var jobj = JSON.parse(data);
    $("#result_title").text("Region Topics");
	$("#result_stat").html("Time cost: "+ jobj.paras.cost/1000 +" seconds.");
    var topic_list = [];
    for (var i = 0; i < jobj.topics.length; i++) {
        var t = jobj.topics[i];
        var tags = [];
        for (var j = 0; j < t.words.length; j++) {
            tags.push({"text": t.words[j].word, "size": t.words[j].count});
        }
        topic_list.push(tags);
    }
    data = {
        "topics": topic_list
    };
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