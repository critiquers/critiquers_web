<?
session_start();
require("/var/www/html/include_connect.php");
require("/var/www/html/include_variables.php");
$periodno_value = 31;
$t=0;
?>
<div id="body1_m1">
<div style="width:100%;height:40px;margin-top:0px;padding-top:6px;background-color:#fcfcfc">
	<div style="height:31px;float:left">
		<div style="display:table-cell;height:20px;padding-top:4px;vertical-align:top">
			<div style="display:inline-block;background-color:#7da754;width:5px;height:9px;margin-left:8px;margin-top:6px"></div><div style="display:inline-block;background-color:#7da754;width:5px;height:14px;margin-left:1px;margin-top:6px"></div><div style="display:inline-block;background-color:#7da754;width:5px;height:6px;margin-left:1px;margin-right:3px;margin-top:6px"></div>
		</div>
		<div style="display:table-cell;height:20px;font-weight:bold;padding-top:9px;vertical-align:top">언론사 순위 (<?=$date_int;?> 이전 <?=$period_string_array[$periodno];?>)</div>
	</div>
</div>
<?
$count=1;
$i=0;
$minimum_count = 6;
$sql = "SELECT *, avg(rating), count(rating) from c_rating WHERE $period_array[$periodno] GROUP BY media_no having count(rating)>=$minimum_count ORDER BY avg(rating) desc, count(rating) desc";

$result = mysql_query($sql, $connect) or die(mysql_error());
while($print = mysql_fetch_array($result)){ //언론사 목록을 뿌려준다
		$media_no = $print[7];
		$avg_rate = $print[12];
		$rate_howmany = $print[13];
		$sql2 = "SELECT media_name, url from e_medialist WHERE no='$media_no'";
		$result2 = mysql_query($sql2) or die(mysqli_error($this->db_link));
		$result_array2 = mysql_fetch_array($result2);
		$media_name = $result_array2[0];
		$media_url = $result_array2[1];

		$sql3 = "SELECT sum(facebook_no) AS facebook_sum, sum(twitter_no) as twitter_sum from h_snscount_media WHERE $period_array[$periodno] AND media_no='$media_no'";
		$result3 = mysql_query($sql3) or die(mysqli_error($this->db_link));
		$result_array3 = mysql_fetch_array($result3);
		$facebook_no = $result_array3[0];
		$twitter_no = $result_array3[1];
?>
<? if($count>1){ ?><div style="width:100%;background-color:#f3f3f3;border-top:1px solid #e2e2e2;height:12px"></div> <? }else{ ?>
<div style="width:100%;background-color:#f3f3f3;border-top:1px solid #e2e2e2;height:1px"></div>
<? } ?>
<a class="newslist_a" href='media.php?media=<?=urlencode($media_name);?>' id="newsitem<?=$count?>"><div class="article_list" t="<?=$t;?>" articleno="<?=$articleno;?>" categoryno="<?=$category;?>" belong="<?=$media;?>" author="<?=$author;?>" mediano="<?=$media_no;?>" authorno="<?=$author_no;?>" chartid="<?=$articleno."_1_".$t;?>" dateint="<?=$article_date_int;?>">
	<div class="article_info_10" style="background: none; width:24%;">
		<div class="newslist_article_no" style="float:left;margin-left:7px;">
		<span class="article_info_11" style="background-color:#C0C0C0"><?=$count;?></span>
		</div>
		<!-- 동그라미 시작 -->
		<div style="border-radius:70px 70px 0% 0%;border:1px solid #D4D4D4;border-bottom:0px;width:70px;height:35px;margin:3px 5px 0px 20px;text-align:center">
			<div style="width:100%;height:100%;text-align:center;"><div style="width:100%;margin-top:6px;font-style:italic;margin-left:-11px;font-size:14px"><?
						$ratetoshow = round($avg_rate,2);
						printf("%.2f", $ratetoshow);
						?></div><div><?
						$rate = 5*round($avg_rate*2,0)
						?><img src = "img/new_rating_<?
									if($avg_rate==NULL){
										echo "none";
									}else{
										echo $rate;
									} 
									?>.png" class="" style="width:60px;margin-top:0px">
					</div>
			</div>
		</div>
		<div style="border-radius:0% 0% 70px 70px;border:1px solid #D4D4D4;border-top:0px;width:70px;height:35px;margin:0px 5px 10px 20px;text-align:center;padding-top:0px;overflow:hidden">
			<div style="border-top:1px solid #D4D4D4;margin:auto;width:100%;height:75%;text-align:center;overflow:hidden;">
				<div style="margin:auto;margin-top:5px;width:60%;height:60%;background: url('img/media/<?=$media_name;?>.png') no-repeat center center;background-size:cover;background-size: contain;"></div>
			</div>
		</div>
		<!-- 동그라미 끝 -->
	</div>
	<div class="article_info_12" style="width:43%;margin:0px;border:0px solid pink;vertical-align:top;">
		<div class="newslist_newsbox_in" style="width:100%;float:left;white-space:nowrap;overflow: hidden;text-overflow:ellipsis;padding:0px;margin-left:10px;">
				<div class="newslist_newsbox_in_in" style="margin-top:4px;"> 
					<div style="margin-bottom:7px;width:100%;">
					<h4 class="newslist_title_h4" style="font-size:16px;line-height:1.32;margin-bottom:0px;"><?
							echo $media_name;
							?></h4><div style="width:100%;height:15px;font-size:11px;color:#C0C0C0;white-space:nowrap;overflow: hidden;text-overflow:ellipsis;"><?=$media_url;?></div>
					</div>
					<div class="newslist_badge" style="display:table-cell;vertical-align:top;height:14px;">
						<div style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left"><img src="img/ico_fb.png" style="width:9px;height:9px;margin: 0px 2px 0px 0px;"></div>
						<div style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left"><?=number_format($facebook_no);?></div>
						<div style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left;margin-left:4px"><img src="img/ico_str.png" style="width:9px;height:9px;margin: 0px 2px 0px 0px;"></div>
						<div id="rated_time_<?=$t;?>_<?=$articleno;?>" class="rated_time" style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left"><?=number_format($rate_howmany);?></div>
					</div>
				</div>
		</div>
	</div>
	<div class="article_info_13" style="width:27%;border:0px solid purple;padding:4px 10px 4px 0px;vertical-align:top">
		<div id="media_chart_1_<?=$i;?>" class="newslist_newsbox" style="width:100%;height:70px;float:left;margin-top:10px;margin-bottom:6px;text-align:center"></div>
	</div>
</div></a>
<script type="text/javascript">
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
var color = ["#9fc05a", "#ccdb38", "#eaff5b", "#ffd834", "#ffb05b", "#ff8b5a"];
$(document).ready(function(){ //탭 클릭할 떄 submit 하기
	$("#media_chart_1_<?=$i;?>").html('');
})
var outerwidth2 = $("#media_chart_1_<?=$i;?>").width();
//var outerheight2 = $("div#media_chart_<?=$i;?>").height()-18;
var outerheight2 = 70;
var margin2 = {top: 0, right: 0, bottom: 2, left: 15}
	width2 = outerwidth2 - margin2.left - margin2.right,
	height2 = outerheight2 - margin2.top - margin2.bottom;

var svgcont<?=$i;?> = d3.select("#media_chart_1_<?=$i;?>").append("svg")
	.attr("width", width2 + margin2.left + margin2.right)
	.attr("height", height2 + margin2.top + margin2.bottom)
	.append("g")
	.attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

d3.json("../rssdb/data_media_eval.php?media_no=<?=$media_no;?>&dateint=<?=$date_int;?>&periodno=<?=$periodno;?>", function(dataset){
	console.log(dataset);
	dataset.forEach(function(d) {
		d.count = +d.count;
	});
	var max = d3.max(dataset, function(d) { return parseInt(d.count); })
	var xScale = d3.scale.linear()
		.domain([0, max])
		.range([0, width2])

	svgcont<?=$i;?>.selectAll(".bar")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("fill", function(d, i){
    			return color[i];
		})
		.attr("x", 4)
		.attr("y", function(d, i){
    			return i * (height2 / dataset.length)+2;
		})
		.attr("height", height2 / dataset.length)
		.attr("width", function(d){
			return xScale(d.count) + 'px';
		})

	// add legend   
	var legend<?=$i;?> = svgcont<?=$i;?>.append("g")
	.attr("class", "legend")
	.attr("x", width2)
	.attr("y", 50)
	.attr("height", height2)
	.attr("width", 10)
	.attr('transform', 'translate(-12,9)')
	
	legend<?=$i;?>.selectAll('text')
	.data(dataset)
	.enter()
	.append("text")
	.attr("x", 0)
	.attr("y", function(d, i){
		return i * height2/dataset.length+1;
	})
	.text(function(d) {
		return "☆"+d.rate;
	})
	.style("fill", "#505050")
	.style("font-size", "8px")

	var value<?=$i;?> = svgcont<?=$i;?>.append("g")
	.attr("class", "legend")
	.attr("x", width2)
	.attr("y", 50)
	.attr("height", height2)
	.attr("width", 10)
	.attr('transform', 'translate(3,9)')
	
	value<?=$i;?>.selectAll('text')
	.data(dataset)
	.enter()
	.append("text")
	.attr("x", 4)
	.attr("y", function(d, i){
		return i * height2/dataset.length+1;
	})
	.text(function(d) {
		return numberWithCommas(d.count);
	})
	.style("fill", "#505050")
	.style("font-size", "8px")
})//dataset 종료
</script>
<?
$count++;
$i++;
} //언론사 목록을 뿌려준다 종료
?>
<div style="clear:both;"></div>
<div style="width:100%;border-top:1px solid #eaeaea;"></div>

<div style="margin:10px 20px 20px 20px;font-size:11px">※ 통계상의 유효성을 위해 <?=$minimum_count;?>회 이상 평가가 누적된 언론사만 포함되었습니다.</div>

</div>
<?
include("footer.php");
?>