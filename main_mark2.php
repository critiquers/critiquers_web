<?
session_start();
$user_id = $_SESSION['user_id'];
?>
<div id="fb-root"></div>
<div id="body1_m1" style="height:auto;">
<br>

<h4 style="float:left"><strong><span class="glyphicon glyphicon-stats" style="margin-left:10px;margin-right:5px;margin-top:-3px;color:rgb(245, 199, 150);"></span><span style="cursor:pointer" onclick="javascript:articleview_close(<?=$t;?>)">보수성향매체 공유수 / 평점변동</strong></h4>
<div style="clear:both;"></div>
<div id="chart1" class="chart"></div>
<div style="clear:both;"></div>
<br>

<h4 style="float:left"><strong><span class="glyphicon glyphicon-stats" style="margin-left:10px;margin-right:5px;margin-top:-3px;color:rgb(245, 199, 150);"></span><span style="cursor:pointer" onclick="javascript:articleview_close(<?=$t;?>)">진보성향매체 공유수 / 평점변동</strong></h4>
<div style="clear:both;"></div>
<div id="chart2" class="chart"></div>
<div style="clear:both;"></div>
<br>


<h4 style="float:left"><strong><span class="glyphicon glyphicon-stats" style="margin-left:10px;margin-right:5px;margin-top:-3px;color:rgb(245, 199, 150);"></span><span style="cursor:pointer" onclick="javascript:articleview_close(<?=$t;?>)">중도성향매체 공유수 / 평점변동</strong></h4>
<div style="clear:both;"></div>
<div id="chart3" class="chart"></div>
<div style="clear:both;"></div>
<br>
<br>

<div style="font-size:16px;padding:25px;line-height:135%;color:#4C4C4C;text-shadow: 2px 2px 3px #D0D0D0;">
“지배적 미디어가 퍼뜨리는 거짓말이 중요한 문제가 아니다. 우리가 해야 할 일은, 어떻게 진실을 말하고 그 진실을 퍼뜨릴지에 대한 더 좋은 방법을 찾아내는 것이다.”
</div>
<br><br>

<div id="markscript">
<script type="text/javascript">
function parseDate(input) {
	var parts = input.split('-');
	// new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
	return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
}
// Your beautiful D3 code will go here
var outerwidth = $("div.chart").width();
var outerheight = 157;
var margin = {top: 20, right: 20, bottom: 20, left: 35},
	width = outerwidth - margin.left - margin.right,
	height = outerheight - margin.top - margin.bottom;
var barPadding = 1;


var svgcont = d3.select("#chart1").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("../rssdb/data.php?category=2", function(dataset){
	console.log(dataset);
	var max = d3.max(dataset, function(d) { return parseInt(d.howmany)/10000; })

	var xScale = d3.time.scale()
		.domain(d3.extent(dataset, function(d) { return parseDate(d.date_int); }))
		.range([0, width])

	var yScale = d3.scale.linear()
		.domain([0, max])
		.range([height, 0])

	var xAxis = d3.svg.axis()
		.scale(xScale)
		//.ticks(dataset.length)
		.ticks(5)
		//.tickFormat(d3.time.format('%m/%d-%a'))
		.tickFormat(d3.time.format('%m/%d'))
		.orient("bottom")

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left")
		.ticks(5)

	svgcont.selectAll(".bar")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", function(d, i){
			return i*(width / dataset.length)
		})
		.attr("y", function(d){
			return height-yScale(d.howmany/10000) + 'px';
		})
		.attr("width", width / dataset.length - barPadding)
		.attr("height", function(d){
			return yScale(d.howmany/10000) + 'px';
		})

		svgcont.append("g")
			.attr("class", "axis")
			.attr('fill', 'black')
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.selectAll("text")  
			.style("text-anchor", "end")
			.attr("dx", "1.3em")
			.attr("dy", "1em")
			.attr("transform", function(d) {
			//return "rotate(-90)" 
			});

    		svgcont.append("g")
			.attr("class", "axis")
			.call(yAxis)
			.append("text")
			//.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dx", "1.7em")
			.attr("dy", "-1.2em")
			.style("text-anchor", "end")
			.text("공유수(만)");
})
var svgcont2 = d3.select("#chart2").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("../rssdb/data.php?category=3", function(dataset){
	console.log(dataset);
	var max = d3.max(dataset, function(d) { return parseInt(d.howmany)/10000; })

	var xScale = d3.time.scale()
		.domain(d3.extent(dataset, function(d) { return parseDate(d.date_int); }))
		.range([0, width])

	var yScale = d3.scale.linear()
		.domain([0, max])
		.range([height, 0])

	var xAxis = d3.svg.axis()
		.scale(xScale)
		//.ticks(dataset.length)
		.ticks(5)
		//.tickFormat(d3.time.format('%m/%d-%a'))
		.tickFormat(d3.time.format('%m/%d'))
		.orient("bottom")

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left")
		.ticks(5)

	svgcont2.selectAll(".bar")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", function(d, i){
			return i*(width / dataset.length)
		})
		.attr("y", function(d){
			return height-yScale(d.howmany/10000) + 'px';
		})
		.attr("width", width / dataset.length - barPadding)
		.attr("height", function(d){
			return yScale(d.howmany/10000) + 'px';
		})

		svgcont2.append("g")
			.attr("class", "axis")
			.attr('fill', 'black')
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.selectAll("text")  
			.style("text-anchor", "end")
			.attr("dx", "1.3em")
			.attr("dy", "1em")
			.attr("transform", function(d) {
			//return "rotate(-90)" 
			});

    		svgcont2.append("g")
			.attr("class", "axis")
			.call(yAxis)
			.append("text")
			//.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dx", "1.7em")
			.attr("dy", "-1.2em")
			.style("text-anchor", "end")
			.text("공유수(만)");
})

var svgcont3 = d3.select("#chart3").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("../rssdb/data.php?category=4", function(dataset){
	console.log(dataset);
	var max = d3.max(dataset, function(d) { return parseInt(d.howmany)/10000; })

	var xScale = d3.time.scale()
		.domain(d3.extent(dataset, function(d) { return parseDate(d.date_int); }))
		.range([0, width])

	var yScale = d3.scale.linear()
		.domain([0, max])
		.range([height, 0])

	var xAxis = d3.svg.axis()
		.scale(xScale)
		//.ticks(dataset.length)
		.ticks(5)
		//.tickFormat(d3.time.format('%m/%d-%a'))
		.tickFormat(d3.time.format('%m/%d'))
		.orient("bottom")

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left")
		.ticks(5)

	svgcont3.selectAll(".bar")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", function(d, i){
			return i*(width / dataset.length)
		})
		.attr("y", function(d){
			return height-yScale(d.howmany/10000) + 'px';
		})
		.attr("width", width / dataset.length - barPadding)
		.attr("height", function(d){
			return yScale(d.howmany/10000) + 'px';
		})

		svgcont3.append("g")
			.attr("class", "axis")
			.attr('fill', 'black')
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.selectAll("text")  
			.style("text-anchor", "end")
			.attr("dx", "1.3em")
			.attr("dy", "1em")
			.attr("transform", function(d) {
			//return "rotate(-90)" 
			});

    		svgcont3.append("g")
			.attr("class", "axis")
			.call(yAxis)
			.append("text")
			//.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dx", "1.7em")
			.attr("dy", "-1.2em")
			.style("text-anchor", "end")
			.text("공유수(만)");
})
</script>
</div>
<!--<div>
<div class="fb-comments" data-href="http://www.critiquers.org" data-numposts="10" data-colorscheme="light"></div>
</div>-->

</div>
<div class="footer">
      <div class="footer_in"> <!-- 중앙으로 모으기위해 감싸는 DIV -->
            <h4 class="footer_h4">크리티커스 - 언론 또한 언론의 대상이다</h4><br>
            <img src = '/img/app_googleplay.png' style="height:24px;margin-left:5px;">
            <!-- <img src = '/img/app_appstore.png' style="height:24px;margin-left:5px;"> -->
            <a href="http://www.critiquers.org/rss" target="_blank"><img src = '/img/rss.png' class="footer_rss"></a>
            <a href="http://www.facebook.com/critiquers" target="_blank"><img src = '/img/fb.png' class="footer_fb"></a>
      </div>
</div><!-- footer 종료 -->