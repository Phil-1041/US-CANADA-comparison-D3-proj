$(document).ready( function() {

  const rawData = JSON.parse($('#my-data').html())
  const data = rawData.items

  var layers = ["viewCount", "likeCount"].map(function(stat){
    let statArray = []
    return rawData.items.map(function(vid){
      return { x: vid.snippet.title, y: vid.statistics.stat }
    })
  })
  rawData.items.map(function(d) {
    return { "name": "viewCount" }
  })

  const data = rawData.items

  // console.log(data)
  // Setup svg using Bostock's margin convention

  var margin = { top: 50, right: 20, bottom: 100, left: 60 };

  var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var svg = d3.select("#d3-graph-1")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  /* Data in strings like it would be if imported from a csv */

  // var data = [
  //   { year: "2006", redDelicious: "10", mcintosh: "15", oranges: "9", pears: "6" },
  //   { year: "2007", redDelicious: "12", mcintosh: "18", oranges: "9", pears: "4" },
  //   { year: "2008", redDelicious: "05", mcintosh: "20", oranges: "8", pears: "2" },
  //   { year: "2009", redDelicious: "01", mcintosh: "15", oranges: "5", pears: "4" },
  //   { year: "2010", redDelicious: "02", mcintosh: "10", oranges: "4", pears: "2" },
  //   { year: "2011", redDelicious: "03", mcintosh: "12", oranges: "6", pears: "3" },
  //   { year: "2012", redDelicious: "04", mcintosh: "15", oranges: "8", pears: "1" },
  //   { year: "2013", redDelicious: "06", mcintosh: "11", oranges: "9", pears: "4" },
  //   { year: "2014", redDelicious: "10", mcintosh: "13", oranges: "9", pears: "5" },
  //   { year: "2015", redDelicious: "16", mcintosh: "19", oranges: "6", pears: "9" },
  //   { year: "2016", redDelicious: "19", mcintosh: "17", oranges: "5", pears: "7" },
  // ];

  // var parse = d3.time.format("%Y").parse;


  var stack = d3.layout.stack()
  
  
  (data.map( function(d) {
    return data.map(function (d) {
      return { x: d.snippet.title, y: d.statistics[count], y0:}
    });
  }));
  "viewCount", "likeCount"]
  console.log(dataset)

  // Transpose the data into layers
  // var dataset = d3.layout.stack()(["redDelicious", "mcintosh", "oranges", "pears"].map(function (fruit) {
  //   return data.map(function (d) {
  //     return { x: parse(d.year), y: +d[fruit] };
  //   });
  // }));


  // Set x, y and colors
  var x = d3.scale.ordinal()
    .domain(dataset[0].map(function (d) { return d.x; }))
    .rangeRoundBands([10, width - 10], 0.02);

  var y = d3.scale.linear()
    .domain([0, d3.max(dataset, function (d) { return d3.max(d, function (d) { return d.y0 + d.y; }); })])
    .range([height, 0]);

  var colors = ["#64aeff", "#aed5ff"];


  // Define and draw axes
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(13)
    .tickSize(-width, 0, 0)
    .tickFormat(function (d) { return d });

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(function (d) { return d });

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis); 

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis); 

  // Create groups for each series, rects for each segment 
  var groups = svg.selectAll("g.stats")
    .data(dataset)
    .enter().append("g")
      .attr("class", "stats")
      .style("fill", function (d, i) { return colors[i]; })
    .on("mouseover", function (d) {
      console.log(d)
      // div.transition()
      //   .duration(200)
      //   .style("opacity", .9);
      // div.html('Views: ' + d.statistics.viewCount + '\n Likes: ' + d.statistics.likeCount)
      //   .style("left", (d3.event.pageX) + "px")
      //   .style("top", (d3.event.pageY - 28) + "px");
    })
    // .on("mouseout", function (d) {
    //   div.transition()
    //     .duration(500)
    //     .style("opacity", 0);
    // });


  var rect = groups.selectAll("rect")
    .data(function (d) { return d; })
    .enter().append("rect")
      .attr("x", function (d) { return x(d.x); })
      .attr("y", function (d) { return y(d.y0 + d.y); })
      .attr("height", function (d) { return y(d.y0) - y(d.y0 + d.y); })
      .attr("width", x.rangeBand());
      // .on("mouseover", function () { tooltip.style("display", null); })
      // .on("mouseout", function () { tooltip.style("display", "none"); })
      // .on("mousemove", function (d) {
      //   var xPosition = d3.mouse(this)[0] - 15;
      //   var yPosition = d3.mouse(this)[1] - 25;
      //   tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
      //   tooltip.select("text").text(d.y + '-' + d.y0);
      // });

  // Draw legend
  var legend = svg.selectAll(".legend")
    .data(colors)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function (d, i) { return "translate(" + (i * 100 - 200) + ",400)"; });

  legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function (d, i) { return colors.slice().reverse()[i]; });

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


  // Add a series to show breakdown of views and likes
  // var label = svg.selectAll('rect.breakdown')
  //   .data(data)
  //   .enter().append('rect')
  //   .attr("class", "breakdown")
  //   .attr("x", function (d) { return x(d.snippet.title); })
  //   .attr("y", function (d) { return y(d.statistics.viewCount + d.statistics.likeCount); })
  //   .attr("height", function (d) { return 300; })
  //   .attr("width", x.rangeBand())
  //   .style("opacity", 0)
  //   .on("mouseover", function (d) {
  //     console.log(d)
  //     div.transition()
  //       .duration(200)
  //       .style("opacity", .9);
  //     div.html('Views: ' + d.statistics.viewCount + '\n Likes: ' + d.statistics.likeCount)
  //       .style("left", (d3.event.pageX) + "px")
  //       .style("top", (d3.event.pageY - 28) + "px");
  //   })
  //   .on("mouseout", function (d) {
  //     div.transition()
  //       .duration(500)
  //       .style("opacity", 0);
  //   });

  // Prep the tooltip bits, initial display is hidden

  //Define the div for the tooltip
  var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

    
  // var tooltip = svg.append("g")
  //   .attr("class", "tooltip")
  //   .style("display", "none");

  // tooltip.append("rect")
  //   .attr("width", 100)
  //   .attr("height", 50)
  //   .attr("fill", "white")
  //   .style("opacity", 0.5);

  // tooltip.append("text")
  //   .attr("x", 15)
  //   .attr("dy", "1.2em")
  //   .style("text-anchor", "middle")
  //   .attr("font-size", "12px")
  //   .attr("font-weight", "bold");

  // console.log(data.items)
  // console.log(data.items[0].snippet.title)
  // console.log(data.items[0].statistics.viewCount)
  // console.log(data.items[0].statistics.likeCount)



  // //Adds svg canvas
  // const svg = d3.select('#d3-graph-1').append('svg')
  //   .attr('width', 1000)
  //   .attr('height', 500)
  //   .style('background-color', 'white')

  // //Define the div for the tooltip
  // var div = d3.select("body").append("div")
  //   .attr("class", "tooltip")
  //   .style("opacity", 0);

  // svg.selectAll('rect')
  //   .data(data.items)
  //   .enter()
  //   .append('rect')
  //     .attr('id', function (vid) { return vid.snippet.title })
  //     .attr('x', function (vid) { return vid.statistics.viewCount / 1200})
  //     .attr('y', function (vid) { return vid.statistics.likeCount / 10})
  //     .attr('height', function (vid) { return vid.statistics.viewCount / 1200})
  //     .attr('width', function (vid) { return vid.statistics.likeCount / 10})
  //     .attr('fill', function (vid) { return 'yellow' })
  //     .on("mouseover", function (vid) {
  //       div.transition()
  //         .duration(200)
  //         .style("opacity", .9);
  //       div.html('Views: ' + vid.statistics.viewCount + '\n Likes: ' + vid.statistics.likeCount)
  //         .style("left", (d3.event.pageX) + "px")
  //         .style("top", (d3.event.pageY - 28) + "px");
  //     })
  //     .on("mouseout", function (d) {
  //       div.transition()
  //         .duration(500)
  //         .style("opacity", 0);
  //     });
})

// //'Views: ' + vid.statistics.viewCount + '\n Likes: ' + vid.statistics.likeCount
// $(document).on('change', '#my-data', function () {
//   const data = JSON.parse($('#my-data').html())

//   console.log(data.items)
//   console.log(data.items[0].snippet.title)
//   console.log(data.items[0].statistics.viewCount)
//   console.log(data.items[0].statistics.likeCount)


//   const myData = [
//     { id: "first", statistics: { viewCount: 500, likeCount: 300 }, color: 'pink' },
//     { id: "second", statistics: { viewCount: 400, likeCount: 200 }, color: 'yellow' },
//     { id: "third", statistics: { viewCount: 300, likeCount: 100 }, color: 'blue' }
//   ]

//   // console.log('<%= @results.to_json%>')

//   const svg = d3.select('#d3-graph-1').append('svg')
//     .attr('width', 500)
//     .attr('height', 500)
//     .style('background-color', '#666666')

//   svg.selectAll('circle')
//     .data(data.items)
//     .enter()
//     .append('circle')
//     .attr('id', function (vid) { return vid.snippet.title })
//     .attr('cx', function (vid) { return vid.statistics.viewCount / 1200 })
//     .attr('cy', function (vid) { return vid.statistics.likeCount / 10 })
//     .attr('r', function (vid) { return 30 })
//     .attr('fill', function (vid) { return 'yellow' })
// })