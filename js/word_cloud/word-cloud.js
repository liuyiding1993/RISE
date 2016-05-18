var layout;
var fill = d3.scale.category20b();
var leaderScale = d3.scale.linear().range([20, 40]);


function addWordCloud(word_freq, container) {
    var leaders = word_freq
        .sort(function(a, b) { return d3.descending(a.size, b.size); })
        .slice(0, 100);

    leaderScale.domain([
        d3.min(leaders, function(d) { return d.size; }),
        d3.max(leaders, function(d) { return d.size; })
    ]);

    layout = d3.layout.cloud()
        .size([300, 130])
        .words(leaders)
        .padding(2)
        .rotate(function() { return 0; })
        .font("Impact")
        .fontSize(function(d) { return leaderScale(d.size); })
        .on("end", function (words) {
            d3.select(container).append("svg")
                .attr("width", layout.size()[0])
                .attr("height", layout.size()[1])
                .append("g")
                .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size  + "px"; })
                .style("font-family", "Impact")
                .style("fill", function(d, i) { return fill(i); })
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
        });
    layout.start();
}