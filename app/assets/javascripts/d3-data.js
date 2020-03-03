$(document).ready( function() {

  // Setup svg with margins
  var margin = { left: 80, right: 50, top: 50, bottom: 100 };

  var width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var svg = d3.select("#d3-graph-1")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Transpose the data into layers
  var rawData = JSON.parse($('#my-data').html())
  var data = rawData.items

  var dataset = d3.layout.stack()(["viewCount", "likeCount"].map(function (stat) {
    return data.map(function (d) {
      return { x: d.snippet.title, y: +d.statistics[stat], 
        viewCount: d.statistics["viewCount"], likeCount: d.statistics["likeCount"] }
    });
  }));

  // Set x, y and colors
  var x = d3.scale.ordinal()
    .domain(dataset[0].map(function (d) { return d.x; }))
    .rangeRoundBands([0, width], 0.10);

  var y = d3.scale.linear()
    .domain([0, d3.max(dataset, function (d) { return d3.max(d, function (d) { return d.y0 + d.y; }); })])
    .range([height, 0]);

  var colors = ["#64aeff", "#aed5ff"];

  // Draw y-axis gridlines first so they appear below the y and x axis
  function make_y_axis() {
    return d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(13)
  }

  svg.append("g")
    .attr("class", "grid")
    .call(make_y_axis()
      .tickSize(-width, 0, 0)
      .tickFormat("")
    )

  // Define and draw axes
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(13)
    .tickSize(10, 0, 0)
    .tickFormat(function (d) { return d });
    
    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(0)
    .tickFormat(function (d) { return d });

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis); 

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
      .attr("transform", "rotate(90)")
      .style("text-anchor", "start");

  // Create groups for each series, rects for each segment 
  var groups = svg.selectAll("g.stats")
    .data(dataset)
    .enter().append("g")
      .attr("class", "stats")
      .style("fill", function (d, i) { return colors[i]; })
      // .attr("transform", "translate(0,-10)")

  var dataBlocks = groups.selectAll("rect")
    .data(function (d) { return d; })
    .enter().append("rect")
      .attr("x", function (d) { return x(d.x); })
      .attr("y", function (d) { return y(d.y0 + d.y); })
      .attr("height", function (d) { return y(d.y0) - y(d.y0 + d.y); })
      .attr("width", x.rangeBand())
      .on("mouseover", function () { tooltip.style("display", "block"); })
      .on("mouseout", function () { tooltip.style("display", "none"); })
      .on("mousemove", function (d) {
        tooltip.transition()
                .duration(100)
                .style("opacity", .9);
        tooltip.html("Views: " + d.viewCount + "<br/>" + "Likes: " + d.likeCount)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
      });

  // Draw legend
  var legend = svg.selectAll(".legend")
    .data(colors)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function (d, i) { return "translate(" + (i * 100 - 515) + ",400)"; });

  legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function (d, i) { return colors.slice()[i]; });

  legend.append("text")
    .attr("x", width + 5)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(function (d, i) {
      switch (i) {
        case 0: return "View Count";
        case 1: return "Like Count";
      }
    });

  // Define the div for the tooltip
  var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
})

//re-draw when search data is updated
$(document).on('change', '#my-data', function () {
  // Setup svg with margins
  var margin = { left: 80, right: 50, top: 50, bottom: 100 };

  var width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var svg = d3.select("#d3-graph-1")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Transpose the data into layers
  const rawData = JSON.parse($('#my-data').html())
  const data = rawData.items

  var dataset = d3.layout.stack()(["viewCount", "likeCount"].map(function (stat) {
    return data.map(function (d) {
      return {
        x: d.snippet.title, y: +d.statistics[stat],
        viewCount: d.statistics["viewCount"], likeCount: d.statistics["likeCount"]
      }
    });
  }));

  // Set x, y and colors
  var x = d3.scale.ordinal()
    .domain(dataset[0].map(function (d) { return d.x; }))
    .rangeRoundBands([0, width], 0.10);

  var y = d3.scale.linear()
    .domain([0, d3.max(dataset, function (d) { return d3.max(d, function (d) { return d.y0 + d.y; }); })])
    .range([height, 0]);

  var colors = ["#64aeff", "#aed5ff"];

  // Draw y-axis gridlines first so they appear below the y and x axis
  function make_y_axis() {
    return d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(13)
  }

  svg.append("g")
    .attr("class", "grid")
    .call(make_y_axis()
      .tickSize(-width, 0, 0)
      .tickFormat("")
    )

  // Define and draw axes
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(13)
    .tickSize(10, 0, 0)
    .tickFormat(function (d) { return d });

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(0)
    .tickFormat(function (d) { return d });

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");

  // Create groups for each series, rects for each segment 
  var groups = svg.selectAll("g.stats")
    .data(dataset)
    .enter().append("g")
    .attr("class", "stats")
    .style("fill", function (d, i) { return colors[i]; })
  // .attr("transform", "translate(0,-10)")

  var dataBlocks = groups.selectAll("rect")
    .data(function (d) { return d; })
    .enter().append("rect")
    .attr("x", function (d) { return x(d.x); })
    .attr("y", function (d) { return y(d.y0 + d.y); })
    .attr("height", function (d) { return y(d.y0) - y(d.y0 + d.y); })
    .attr("width", x.rangeBand())
    .on("mouseover", function () { tooltip.style("display", "block"); })
    .on("mouseout", function () { tooltip.style("display", "none"); })
    .on("mousemove", function (d) {
      tooltip.transition()
        .duration(100)
        .style("opacity", .9);
      tooltip.html("Views: " + d.viewCount + "<br/>" + "Likes: " + d.likeCount)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    });

  // Draw legend
  var legend = svg.selectAll(".legend")
    .data(colors)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function (d, i) { return "translate(" + (i * 100 - 515) + ",400)"; });

  legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function (d, i) { return colors.slice()[i]; });

  legend.append("text")
    .attr("x", width + 5)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(function (d, i) {
      switch (i) {
        case 0: return "View Count";
        case 1: return "Like Count";
      }
    });

  // Define the div for the tooltip
  var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
})