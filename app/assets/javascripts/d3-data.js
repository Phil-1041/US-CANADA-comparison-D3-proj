$(document).ready( function() {

  const data = JSON.parse($('#my-data').html())

  console.log(data.items)
  console.log(data.items[0].snippet.title)
  console.log(data.items[0].statistics.viewCount)
  console.log(data.items[0].statistics.likeCount)
  

  const myData = [
    { id: "first", statistics: { viewCount: 500, likeCount: 300 }, color: 'pink' },
    { id: "second", statistics: { viewCount: 400, likeCount: 200 }, color: 'yellow' },
    { id: "third", statistics: { viewCount: 300, likeCount: 100 }, color: 'blue' }
  ]

  // console.log('<%= @results.to_json%>')

  const svg = d3.select('#d3-graph-1').append('svg')
    .attr('width', 500)
    .attr('height', 500)
    .style('background-color', '#666666')

  svg.selectAll('circle')
    .data(data.items)
    .enter()
    .append('circle')
    .attr('id', function (vid) { return vid.snippet.title })
    .attr('cx', function (vid) { return vid.statistics.viewCount / 1200})
    .attr('cy', function (vid) { return vid.statistics.likeCount / 10})
    .attr('r', function (vid) { return 30})
    .attr('fill', function (vid) { return 'yellow' })

})