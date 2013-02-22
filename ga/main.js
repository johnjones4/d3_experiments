var data = [
  [20130101,"1246","09:22:34",807],
  [20130102,"2765","32:24:52","1691"],
  [20130103,"2165","26:47:02","1316"],
  [20130104,"2148","29:11:38","1287"],
  [20130105,"1810","22:40:46","1247"],
  [20130106,"2145","33:23:15","1185"],
  [20130107,"1936","27:41:38","1018"],
  [20130108,"1559","18:42:15",945],
  [20130109,"1985","21:58:27","1383"],
  [20130110,"1754","19:13:55","1129"],
  [20130111,"1731","23:36:42","1046"],
  [20130112,"1276","08:28:57",918],
  [20130113,"1226","06:10:48","1026"],
  [20130114,"2420","22:55:37","1720"],
  [20130115,"1585","15:17:37","1078"],
  [20130116,"1386","16:53:37",945],
  [20130117,"1780","21:47:41","1133"],
  [20130118,"1998","20:53:03","1349"],
  [20130119,"1105","09:12:44",821],
  [20130120,"1624","07:29:24","1213"],
  [20130121,"2069","10:32:35","1436"],
  [20130122,"2047","20:25:42","1437"],
  [20130123,"1611","21:03:32","1037"],
  [20130124,951,"25:33:16",603],
  [20130125,"2658","28:58:33","2125"],
  [20130126,"2080","15:32:58","1598"],
  [20130127,"1585","11:15:39","1128"],
  [20130128,594,"11:09:17",295],
  [20130129,662,"09:23:25",378],
  [20130130,"1132","15:03:46",674],
  [20130131,"1290","11:44:57",795]
];

var height = 800;
var width = 1000;

var newData = [];

var parseTime = function(time) {
  var parts = time.split(':');
  var hours = parseInt(parts[0],10);
  var minutes = parseInt(parts[1],10);
  var seconds = parseInt(parts[2],10);

  return ((hours * 60) + minutes) * 60 + seconds;
}

data.forEach(function(row) {
  newData.push({
    date: row[0],
    pageviews: row[1],
    duration: parseTime(row[2]),
    visitors: row[3]
  });
});

var widthScale = d3.scale.linear()
  .domain([0,newData.length])
  .range([0,width]);

var pageviewScale = d3.scale.linear()
  .domain([0,d3.max(newData,function(o) {return o.pageviews})])
  .range([0,height]);

var visitorsScale = d3.scale.linear()
  .domain([0,d3.max(newData,function(o) {return o.visitors})])
  .range([0,height]);

var durationScale = d3.scale.linear()
  .domain([0,d3.max(newData,function(o) {return o.duration})])
  .range([0,height]);

var colorScale = d3.scale.linear()
  .domain([0,height/2,height])
  .range(['red','yellow','green']);

var selection = d3.select('svg')
  .selectAll('rect')
  .data(newData)
  .enter()
  .append('rect')
  .attr('x',function(d,i) { return widthScale(i) })
  .attr('y',height)
  .attr('width',function(d,i) {return width/newData.length-1})
  .style('fill','#fff');

var i = 0;
setInterval(function() {
  var trans = selection
    .transition()
    .duration(500)
    .delay(function(d, i) { return i * 20; });
  switch(i % 3) {
    case 0: 
      trans
        .style('fill',function(d,y) { return colorScale(pageviewScale(d.pageviews))})
        .attr('y',function(d,i) { return height-pageviewScale(d.pageviews); })
        .attr('height',function(d,i) { return pageviewScale(d.pageviews); });
      break;
    case 1:
      trans
        .style('fill',function(d,y) { return colorScale(visitorsScale(d.visitors))})
        .attr('y',function(d,i) { return height-visitorsScale(d.visitors); })
        .attr('height',function(d,i) { return visitorsScale(d.visitors); });
      break;
    case 2:
      trans
        .style('fill',function(d,y) { return colorScale(durationScale(d.duration))})
        .attr('y',function(d,i) { return height-durationScale(d.duration); })
        .attr('height',function(d,i) { return durationScale(d.duration); });
      break;
  }
  i++;
},1500);