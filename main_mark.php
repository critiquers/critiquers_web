<?
session_start();
require("/var/www/html/include_connect.php");
$user_id = $_SESSION['user_id'];
$date_int = $_GET['dateint'];
$time = strtotime($date_int);
$period_array = array(
"date_int='".date("Y-m-d", $time)."'",
"date_int<='".date("Y-m-d", $time)."' AND date_int>='".date("Y-m-d", $time-3*24*60*60)."'",
"date_int<='".date("Y-m-d", $time)."' AND date_int>='".date("Y-m-d", $time-7*24*60*60)."'",
"date_int<='".date("Y-m-d", $time)."' AND date_int>='".date("Y-m-d", $time-31*24*60*60)."'",
"date_int<='".date("Y-m-d", $time)."' AND date_int>='".date("Y-m-d", $time-31*6*24*60*60)."'",
"date_int<='".date("Y-m-d", $time)."' AND date_int>='".date("Y-m-d", $time-365*24*60*60)."'"
);
$period_string_array = array('1일 간', '3일 간', '7일 간', '한 달 간', '반 년 간', '일 년 간');
$periodno = 3;
$date_timestamp = strtotime($date_int);
$date_to_show = date("n월 j일", $date_timestamp);
$yoil = array("일","월","화","수","목","금","토");
$period_name = array("실시간","1일간","3일간","7일간","한달간","반년간","일년간");
$yoil_to_show = $yoil[date('w',strtotime($date_int))];
?>
<div id="fb-root"></div>
<div id="body1_m1" style="height:auto;">

<?
//include("./include_main_news_list_cluster.php");
?>

<div style="width:100%;height:40px;margin-top:0px;padding-top:6px;background-color:#fcfcfc">
	<div style="height:31px;float:left">
		<div style="display:table-cell;height:20px;padding-top:4px;vertical-align:top">
			<div style="display:inline-block;background-color:#7da754;width:5px;height:9px;margin-left:8px;margin-top:6px"></div><div style="display:inline-block;background-color:#7da754;width:5px;height:14px;margin-left:1px;margin-top:6px"></div><div style="display:inline-block;background-color:#7da754;width:5px;height:6px;margin-left:1px;margin-right:3px;margin-top:6px"></div>
		</div>
		<div style="display:table-cell;height:20px;font-weight:bold;padding-top:9px;vertical-align:top">한 달 간 주요 미디어 평가</div>
	</div>
	<div style="height:31px;float:right">
		<div class="pagination_show_right" style="margin-right:4px;border:1px solid #eaeaea;border-radius:4px"><a href="media.php">전체보기</a></div>
	</div>
</div>
<?
$count=1;
$i=0;
$minimum_count = 6;

$sql = "SELECT *, avg_rating from (SELECT *, avg(rating) as avg_rating, count(rating) as count_rating from c_rating WHERE $period_array[$periodno] GROUP BY media_no having count(rating)>=$minimum_count ORDER BY count(rating) desc LIMIT 0, 10) AS original ORDER by avg_rating desc, count_rating desc";
$result = mysql_query($sql, $connect) or die(mysql_error());
while($print = mysql_fetch_array($result)){ //언론사 목록을 뿌려준다
if($count<11){
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
<!-- 기사 목록 -->
<a class="newslist_a" href='media.php?media=<?=urlencode($media_name);?>' id="newsitem<?=$count?>">
<? if($count < 4){ ?>
	<? if($count ==1){ ?>
		<div style="width:100%;background-color:#f3f3f3;border-top:1px solid #e2e2e2;height:1px"></div>
	<? }else{ ?>
		<div style="width:100%;background-color:#f3f3f3;border-top:1px solid #e2e2e2;height:12px"></div>
	<? } ?>
<div <? if($count ==1){ echo "id='article_top_1'";}?> class="article_list article_list_main_1" data-t="<?=$t;?>" data-articleno="<?=$articleno;?>" data-categoryno="<?=$category;?>" data-belong="<?=$media;?>" data-author="<?=$author;?>" data-mediano="<?=$media_no;?>" data-authorno="<?=$author_no;?>" data-chartid="<?=$articleno."_".$t;?>" data-dateint="<?=$article_date_int;?>" data-targettile="<?=$t;?>_<?=$articleno;?>">
<? }else{ ?>
<div class="article_list_main_1 article_list_hidden" style="display:none;width:100%;background-color:#f3f3f3;border-top:1px solid #e2e2e2;height:12px"></div>
<div class="article_list article_list_main_1 article_list_hidden" style="display:none" data-t="<?=$t;?>" data-articleno="<?=$articleno;?>" data-categoryno="<?=$category;?>" data-belong="<?=$media;?>" data-author="<?=$author;?>" data-mediano="<?=$media_no;?>" data-authorno="<?=$author_no;?>" data-chartid="<?=$articleno."_".$t;?>" data-dateint="<?=$article_date_int;?>" data-targettile="<?=$t;?>_<?=$articleno;?>">
<? } ?>
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
			<div style="border-top:1px solid #D4D4D4;margin:auto;width:100%;height:75%;text-align:center;overflow:hidden;padding-left:0px;">
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
		<div id="media_chart_<?=$i;?>" class="newslist_newsbox" style="width:100%;height:100%;float:left;margin-top:10px;margin-bottom:6px;text-align:center"></div>
	</div>
</div></a>


<script type="text/javascript">
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
var color = ["#9fc05a", "#ccdb38", "#eaff5b", "#ffd834", "#ffb05b", "#ff8b5a"];
$(document).ready(function(){ //탭 클릭할 떄 submit 하기
	$("#media_chart_<?=$i;?>").html('');
})
var outerwidth2 = $("#media_chart_1").width();
//var outerwidth2 = 90;
//var outerheight2 = $("div#media_chart_<?=$i;?>").height()-18;
var outerheight2 = 70;
var margin2 = {top: 0, right: 0, bottom: 2, left: 15}
	width2 = outerwidth2 - margin2.left - margin2.right,
	height2 = outerheight2 - margin2.top - margin2.bottom;

var svgcont<?=$i;?> = d3.select("#media_chart_<?=$i;?>").append("svg")
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
} // if($count<6){ 종료
} //언론사 목록을 뿌려준다 종료
?>
<div style="clear:both;"></div>
<div style="width:100%;border-top:1px solid #eaeaea;"></div>
<div style="width:100%;height:40px;text-align:right">
<div class="drawdown" data-drawnumber='1'><div style="padding-top:10px">펼쳐보기</div></div>
</div>
</div>




<? //전날의 랭킹뉴스 시작  ?>
<div style="width:100%;height:40px;margin-top:10px;padding-top:6px;background-color:#fcfcfc">
	<div style="height:31px;float:left">
		<div style="display:table-cell;height:20px;padding-top:4px;vertical-align:top">
			<div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:9px;margin-left:8px;margin-top:6px"></div><div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:14px;margin-left:1px;margin-top:6px"></div><div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:6px;margin-left:1px;margin-right:3px;margin-top:6px"></div>
		</div>
		<div style="display:table-cell;height:20px;font-weight:bold;padding-top:9px;vertical-align:top">전날의 랭킹뉴스</div>
	</div>
</div>

<?
// 목록출력부
$date_timestamp = strtotime($date_int);
$one_day_ago = date("Y-m-d", $date_timestamp-24*60*60);
$sql = "SELECT textified_list from b_article_textified_1 WHERE date_int='$one_day_ago' AND period_no='1'";
$query = mysql_query($sql);
$result = mysql_fetch_array($query);
$textified_list = $result[0];
$textified_list_array = array();
$textified_list_array = json_decode($textified_list, true);
?>
<div style="min-height:300px">
<?
//여기까지 sql을 하나로 다 모았다 그 sql에는 limit 구문이 없다
//이제 sql에 limit구문을 붙여서 한페이지 분량의 row를 가져온다
if($textified_list == '[]' || $textified_list == '' ){ // 아무것도 없을 경우
?>
<div style="clear:both"?>
<div style="width:100%;border-top:1px solid #eaeaea;"></div>
<table articleno="<?=$articleno;?>_mark" class="newslist_table">
<tr>
<td style="padding: 30px;">
선택하신 날짜, 기간, 카테고리에 해당하는<br>기사가 없습니다.
</td>
</tr>
</table>
<?
}
else{
$resultout = NULL;
$resultout = mysql_query($sql, $connect) or die(mysql_error());
}
$count=1;
foreach($textified_list_array as $print){
if($count<11){
$t=11;
$articleno = $print['no'];
$url = urldecode($print['url']);
$date_int = $print['date_int'];
$category = $print['category'];
$title = urldecode($print['title']);
$title = html_entity_decode($title);
$media = urldecode($print['media']);
$media_no = $print['media_no'];
$author = urldecode($print['author']);
$author_no = $print['author_no'];
//$comment_no = $print[6];
//$link_no = $print[7];
$rate_total = $print['rate_total'];
$rated_time = $print['rated_time'];
if($rated_time>0){
	$or = $rate_total/$rated_time;
}else{
	$or = 0;
}
$avg_rate = round($or*100,0)/100;
$rate = round($or*2,0)/2*10;

$facebook_no = $print['facebook_no'];
$twitter_no = $print['twitter_no'];
$repimage = urldecode($print['rep_image']);
if($repimage == 'cqrs_noimage'){
	$repimage = '';
}
?>

<!-- 기사 목록 -->
<a href='<?=$url;?>' class="newslist_a" href='javascript:void()' rel="external" target="_blank" id="newsitem<?=$count?>">
<? if($count < 4){ ?>
<? if($count>1){ ?><div style="width:100%;background-color:#f3f3f3;border-top:1px solid #e2e2e2;height:12px"></div> <? }else{ ?>
<div style="width:100%;background-color:#f3f3f3;border-top:1px solid #e2e2e2;height:1px"></div>
<? } ?>
<div <? if($count ==1){ echo "id='article_top_2'";}?> class="article_list article_list_main_2" data-t="<?=$t;?>" data-articleno="<?=$articleno;?>" data-categoryno="<?=$category;?>" data-belong="<?=$media;?>" author="<?=$author;?>" data-mediano="<?=$media_no;?>" data-authorno="<?=$author_no;?>" data-chartid="<?=$articleno."_".$t;?>" data-dateint="<?=$article_date_int;?>" data-targettile="<?=$t;?>_<?=$articleno;?>">
<? }else{ ?>
<div class="article_list_main_2 article_list_hidden" style="display:none;width:100%;background-color:#f3f3f3;border-top:1px solid #e2e2e2;height:12px"></div><div class="article_list article_list_main_2 article_list_hidden" style="display:none" data-t="<?=$t;?>" data-articleno="<?=$articleno;?>" data-categoryno="<?=$category;?>" data-belong="<?=$media;?>" data-author="<?=$author;?>" data-mediano="<?=$media_no;?>" data-authorno="<?=$author_no;?>" data-chartid="<?=$articleno."_".$t;?>" data-dateint="<?=$article_date_int;?>" data-targettile="<?=$t;?>_<?=$articleno;?>">
<? } ?>
<div style="display:inline-block;vertical-align:top;width:10%;color:#0a0a0a;padding-left:3px;text-align:center;margin:0px;font-size:15px;margin-top:3px;padding-top:23px;"><?=$count;?>.</div><div style="display:inline-block;vertical-align:top;width:61%;padding:14px;padding-left:0px;padding-top:23px;margin:0px;">
		<div class="author_div"><?=$media;?></div>
		<div class="title_div"><?=$title;?></div>
		<div style="font-size:11px;padding:7px;padding-left:0px;padding-bottom:3px;padding-top:10px;">
			<div class="newslist_badge" style="display:table-cell;vertical-align:top;height:14px;">
				<div style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left"><img src="img/ico_fb.png" style="width:9px;height:9px;margin: 0px 2px 0px 0px;"></div>
				<div style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left"><?=number_format($facebook_no);?></div>
				<div style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left;margin-left:4px"><img src="img/star_float_filled.png" style="width:9px;height:9px;margin: 0px 2px 0px 0px;"></div>
				<div class="rated_time rated_time_<?=$articleno;?>" style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left"><?=number_format($rated_time);?></div>
			</div>
		</div>
		
		<div class="ratingbadge_<?=$articleno;?>" style="<?
		if($rated_time<1){ 
			echo "display:none;";
			} ?>font-size:11px;padding:7px;padding-left:0px;padding-top:0px">
			<div class="newslist_badge" style="display:table-cell;vertical-align:top;height:14px;border:1px solid #dadada;">
				<div style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left">
					<img src = "img/new_rating_<?
					//dd
					$img_rate = round($rate*2,0)/2;
					if($rated_time==0){
						echo "none";
					}else{
						echo $img_rate;
					} 
					?>.png" class="ratingstar_to_show_<?=$articleno;?> newslist_stars_img ratingstar_to_show" style=";margin-top:-2px;float:none">
				</div>
				<div class="rating_to_show_<?=$articleno;?>" style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left">
						<?=sprintf("%.2f", $avg_rate); ?>
				 </div>
			</div>
		</div>
	</div><div style="position:absolute;right:0px;height:100%;display:inline-block;width:29%;padding:14px;padding-left:0px;margin:0px;border:0px solid pink;text-align:right;padding-top:23px;padding-right:8px;">
		<div style="display:inline-block;width:100%;border:0px solid gray;text-align:right;">
			<div style="display:inline-block;width:100%;max-width:180px;height:75px;background: url('<?=$repimage;?>') no-repeat center center;background-size:cover;">&nbsp;</div>
		</div><div style="position:absolute;bottom:0px;right:0px;width:100%;height:30px;border:0px solid gold;text-align:right;">
			<div style="height:40px;display:inline-block;"><img class="article_more" id="article_more_<?=$t;?>_<?=$articleno;?>" data-t="<?=$t;?>" data-articleno="<?=$articleno;?>" data-categoryno="<?=$category;?>" data-belong="<?=$media;?>" data-author="<?=$author;?>" data-mediano="<?=$media_no;?>" data-authorno="<?=$author_no;?>" data-chartid="<?=$articleno."_".$t;?>" src = "./img/date_down.png" style="width:16px;height:16px;padding:6px 24px 6px 24px;"></div>
		</div>
</div>
</div>
</a>

<!-- addon -->
<div id="article_addon_<?=$t;?>_<?=$articleno;?>" class="article_addon" style="display:none;width:100%;">
<!-- 통계, 저자 정보, 공유기능 -->
<div class="article_info">
<?
if($_SESSION['user_id'] == 10113){ ?>
	<div style="float:left;"><a onclick="delete_article(<?=$category;?>, <?=$articleno;?>, <?=$media_no;?>)"><img src = "img/delete.png" style="width:12px;height:12px;margin:5px;margin-top:15px"></a></div>

<? } ?>
	<!-- 가운데 -->
	<div class="article_info_1">
		<div class="article_info_3" style="height:94px">
			<div class="article_info_4" style="">
				<div class="article_info_5"><img src ="img/new_rating_none.png" id="ratingstar_to_show_media_<?=$t;?>_<?=$articleno;?>" class="newslist_stars_img"><em id="media_rate_<?=$t;?>_<?=$articleno;?>" class="media_rate">0.00</em></div>
				<div class="article_info_6"><a href="./media.php?media=<?=$media;?>" class="article_info_7" title="<?=$media;?>"><?=$media;?></a></div>
			</div>
			<div class="article_info_8">
				<? if($author){ ?>
						<div class="article_info_5"><img src = "img/new_rating_none.png" id="ratingstar_to_show_author_<?=$t;?>_<?=$articleno;?>" class="newslist_stars_img"><em id="author_rate_<?=$t;?>_<?=$articleno;?>" class="author_rate">0.00</em></div>
						<div class="article_info_6"><a href="./media.php?media=<?=$media;?>&author=<?=$author;?>" class="article_info_7" title="<?=$author;?>"><?=$author;?></a></div>
				<? } ?>
			</div>
		</div><div class="article_info_2">
			<div id="chart_<?=$articleno."_".$t;?>" class="ratingchart"></div>
		</div>
	</div>
	<!-- 가운데 종료 -->
<!-- 평점 별 -->
<div class="addon_function_div">
	<div id="article_rate_<?=$t;?>_<?=$articleno;?>" class="addon_function article_rate" data-targettile="<?=$t;?>_<?=$articleno;?>" data-t="<?=$t;?>" data-articleno="<?=$articleno;?>" data-categoryno="<?=$category;?>" data-belong="<?=$media;?>" data-author="<?=$author;?>" data-mediano="<?=$media_no;?>" data-authorno="<?=$author_no;?>" data-chartid="<?=$articleno."_".$t;?>" data-dateint="<?=$article_date_int;?>">
		<img src="./img/star_icon.png" style="padding-bottom:0px;width:12px;height:12px;margin-right:3px"><div style="cursor:pointer;display:inline-block;vertical-align:top">평가하기</div>
	</div>
	<div class="addon_function article_save" id="article_save_<?=$t;?>_<?=$articleno;?>" data-articleno="<?=$articleno;?>" data-targettile="<?=$t;?>_<?=$articleno;?>">
		<img src="./img/love_icon.png" style="padding-bottom:0px;width:12px;height:12px;margin-right:3px;"><div style="cursor:pointer;display:inline-block;vertical-align:top">담아두기</div>
	</div>
</div>
</div>
</div> <!-- addon 종료 -->

<?
}//if $count
$count++;
} // 기사 목록을 출력하는 부분 foreach
?>
<div style="width:100%;border-top:1px solid #eaeaea;"></div>
<div style="width:100%;height:40px;text-align:right">
<div class="drawdown" data-drawnumber='2'><div style="padding-top:10px">펼쳐보기</div></div>
</div>
</div>

<? //전날의 랭킹뉴스 종료 ?>





<? //한달간의 랭킹뉴스 시작  ?>

<? //전날의 랭킹뉴스 시작  ?>
<div style="width:100%;height:40px;margin-top:10px;padding-top:6px;background-color:#fcfcfc">
	<div style="height:31px;float:left">
		<div style="display:table-cell;height:20px;padding-top:4px;vertical-align:top">
			<div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:9px;margin-left:8px;margin-top:6px"></div><div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:14px;margin-left:1px;margin-top:6px"></div><div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:6px;margin-left:1px;margin-right:3px;margin-top:6px"></div>
		</div>
		<div style="display:table-cell;height:20px;font-weight:bold;padding-top:9px;vertical-align:top">한 달간의 랭킹뉴스</div>
	</div>
</div>
<?
// 목록출력부
$date_int = $_GET['dateint'];
$date_timestamp = strtotime($date_int);
$one_day_ago = date("Y-m-d", $date_timestamp-24*60*60);
$sql = "SELECT textified_list from b_article_textified_1 WHERE date_int='$one_day_ago' AND period_no='4'";
$query = mysql_query($sql);
$result = mysql_fetch_array($query);
$textified_list = $result[0];
$textified_list_array = array();
$textified_list_array = json_decode($textified_list, true);
?>
<div style="min-height:300px">
<?
//여기까지 sql을 하나로 다 모았다 그 sql에는 limit 구문이 없다
//이제 sql에 limit구문을 붙여서 한페이지 분량의 row를 가져온다
if($textified_list == '[]' || $textified_list == '' ){ // 아무것도 없을 경우
?>
<div style="clear:both"?>
<div style="width:100%;border-top:1px solid #eaeaea;"></div>
<table articleno="<?=$articleno;?>_mark" class="newslist_table">
<tr>
<td style="padding: 30px;">
선택하신 날짜, 기간, 카테고리에 해당하는<br>기사가 없습니다.
</td>
</tr>
</table>
<?
}
else{
$resultout = NULL;
$resultout = mysql_query($sql, $connect) or die(mysql_error());
}
$count=1;
foreach($textified_list_array as $print){
if($count<11){
$t=12;
$articleno = $print['no'];
$url = urldecode($print['url']);
$date_int = $print['date_int'];
$category = $print['category'];
$title = urldecode($print['title']);
$title = html_entity_decode($title);
$media = urldecode($print['media']);
$media_no = $print['media_no'];
$author = urldecode($print['author']);
$author_no = $print['author_no'];
//$comment_no = $print[6];
//$link_no = $print[7];
$rate_total = $print['rate_total'];
$rated_time = $print['rated_time'];
if($rated_time>0){
	$or = $rate_total/$rated_time;
}else{
	$or = 0;
}
$avg_rate = round($or*100,0)/100;
$rate = round($or*2,0)/2*10;

$facebook_no = $print['facebook_no'];
$twitter_no = $print['twitter_no'];
$repimage = urldecode($print['rep_image']);
if($repimage == 'cqrs_noimage'){
	$repimage = '';
}

//기사 출력부분 호출
?>

<!-- 기사 목록 -->
<a href='<?=$url;?>' class="newslist_a" href='javascript:void()' rel="external" target="_blank" id="newsitem<?=$count?>">
<? if($count < 4){ ?>
<? if($count>1){ ?><div style="width:100%;background-color:#f3f3f3;border-top:1px solid #e2e2e2;height:12px"></div> <? }else{ ?>
<div style="width:100%;background-color:#f3f3f3;border-top:1px solid #e2e2e2;height:1px"></div>
<? } ?><div <? if($count ==1){ echo "id='article_top_3'";}?> class="article_list article_list_main_3" data-t="<?=$t;?>" data-articleno="<?=$articleno;?>" data-categoryno="<?=$category;?>" data-belong="<?=$media;?>" data-author="<?=$author;?>" data-mediano="<?=$media_no;?>" data-authorno="<?=$author_no;?>" data-chartid="<?=$articleno."_".$t;?>" data-dateint="<?=$article_date_int;?>" data-targettile="<?=$t;?>_<?=$articleno;?>">
<? }else{ ?>
<div class="article_list_main_3 article_list_hidden" style="display:none;width:100%;background-color:#f3f3f3;border-top:1px solid #e2e2e2;height:12px"></div><div class="article_list article_list_main_3 article_list_hidden" style="display:none" data-t="<?=$t;?>" data-articleno="<?=$articleno;?>" data-categoryno="<?=$category;?>" data-belong="<?=$media;?>" data-author="<?=$author;?>" data-mediano="<?=$media_no;?>" data-authorno="<?=$author_no;?>" data-chartid="<?=$articleno."_".$t;?>" data-dateint="<?=$article_date_int;?>" data-targettile="<?=$t;?>_<?=$articleno;?>">
<? } ?>
<div style="display:inline-block;vertical-align:top;width:10%;color:#0a0a0a;padding-left:3px;text-align:center;margin:0px;font-size:15px;margin-top:3px;padding-top:23px;"><?=$count;?>.</div><div style="display:inline-block;vertical-align:top;width:61%;padding:14px;padding-left:0px;padding-top:23px;margin:0px;">
		<div class="author_div"><?=$media;?></div>
		<div class="title_div"><?=$title;?></div>
		<div style="font-size:11px;padding:7px;padding-left:0px;padding-bottom:3px;padding-top:10px;">
			<div class="newslist_badge" style="display:table-cell;vertical-align:top;height:14px;">
				<div style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left"><img src="img/ico_fb.png" style="width:9px;height:9px;margin: 0px 2px 0px 0px;"></div>
				<div style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left"><?=number_format($facebook_no);?></div>
				<div style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left;margin-left:4px"><img src="img/star_float_filled.png" style="width:9px;height:9px;margin: 0px 2px 0px 0px;"></div>
				<div class="rated_time rated_time_<?=$articleno;?>" style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left"><?=number_format($rated_time);?></div>
			</div>
		</div>
		
		<div class="ratingbadge_<?=$articleno;?>" style="<?
		if($rated_time<1){ 
			echo "display:none;";
			} ?>font-size:11px;padding:7px;padding-left:0px;padding-top:0px">
			<div class="newslist_badge" style="display:table-cell;vertical-align:top;height:14px;border:1px solid #dadada;">
				<div style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left">
					<img src = "img/new_rating_<?
					//dd
					$img_rate = round($rate*2,0)/2;
					if($rated_time==0){
						echo "none";
					}else{
						echo $img_rate;
					} 
					?>.png" class="ratingstar_to_show_<?=$articleno;?> newslist_stars_img ratingstar_to_show" style=";margin-top:-2px;float:none">
				</div>
				<div class="rating_to_show_<?=$articleno;?>" style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left">
						<?=sprintf("%.2f", $avg_rate); ?>
				 </div>
			</div>
		</div>
	</div><div style="position:absolute;right:0px;height:100%;display:inline-block;width:29%;padding:14px;padding-left:0px;margin:0px;border:0px solid pink;text-align:right;padding-top:23px;padding-right:8px;">
		<div style="display:inline-block;width:100%;border:0px solid gray;text-align:right;">
			<div style="display:inline-block;width:100%;max-width:180px;height:75px;background: url('<?=$repimage;?>') no-repeat center center;background-size:cover;">&nbsp;</div>
		</div><div style="position:absolute;bottom:0px;right:0px;width:100%;height:30px;border:0px solid gold;text-align:right;">
			<div style="height:40px;display:inline-block;"><img class="article_more" id="article_more_<?=$t;?>_<?=$articleno;?>" data-t="<?=$t;?>" data-articleno="<?=$articleno;?>" data-categoryno="<?=$category;?>" data-belong="<?=$media;?>" data-author="<?=$author;?>" data-mediano="<?=$media_no;?>" data-authorno="<?=$author_no;?>" data-chartid="<?=$articleno."_".$t;?>" src = "./img/date_down.png" style="width:16px;height:16px;padding:6px 24px 6px 24px;"></div>
		</div>
</div>
</div>
</a>

<!-- addon -->
<div id="article_addon_<?=$t;?>_<?=$articleno;?>" class="article_addon" style="display:none;width:100%;">
<!-- 통계, 저자 정보, 공유기능 -->
<div class="article_info">
<?
if($_SESSION['user_id'] == 10113){ ?>
	<div style="float:left;"><a onclick="delete_article(<?=$category;?>, <?=$articleno;?>, <?=$media_no;?>)"><img src = "img/delete.png" style="width:12px;height:12px;margin:5px;margin-top:15px"></a></div>

<? } ?>
	<!-- 가운데 -->
	<div class="article_info_1">
		<div class="article_info_3" style="height:94px">
			<div class="article_info_4" style="">
				<div class="article_info_5"><img src ="img/new_rating_none.png" id="ratingstar_to_show_media_<?=$t;?>_<?=$articleno;?>" class="newslist_stars_img"><em id="media_rate_<?=$t;?>_<?=$articleno;?>" class="media_rate">0.00</em></div>
				<div class="article_info_6"><a href="./media.php?media=<?=$media;?>" class="article_info_7" title="<?=$media;?>"><?=$media;?></a></div>
			</div>
			<div class="article_info_8">
				<? if($author){ ?>
						<div class="article_info_5"><img src = "img/new_rating_none.png" id="ratingstar_to_show_author_<?=$t;?>_<?=$articleno;?>" class="newslist_stars_img"><em id="author_rate_<?=$t;?>_<?=$articleno;?>" class="author_rate">0.00</em></div>
						<div class="article_info_6"><a href="./media.php?media=<?=$media;?>&author=<?=$author;?>" class="article_info_7" title="<?=$author;?>"><?=$author;?></a></div>
				<? } ?>
			</div>
		</div><div class="article_info_2">
			<div id="chart_<?=$articleno."_".$t;?>" class="ratingchart"></div>
		</div>
	</div>
	<!-- 가운데 종료 -->
<!-- 평점 별 -->
<div class="addon_function_div">
	<div id="article_rate_<?=$t;?>_<?=$articleno;?>" class="addon_function article_rate" data-targettile="<?=$t;?>_<?=$articleno;?>" data-t="<?=$t;?>" data-articleno="<?=$articleno;?>" data-categoryno="<?=$category;?>" data-belong="<?=$media;?>" data-author="<?=$author;?>" data-mediano="<?=$media_no;?>" data-authorno="<?=$author_no;?>" data-chartid="<?=$articleno."_".$t;?>" data-dateint="<?=$article_date_int;?>">
		<img src="./img/star_icon.png" style="padding-bottom:0px;width:12px;height:12px;margin-right:3px"><div style="cursor:pointer;display:inline-block;vertical-align:top">평가하기</div>
	</div>
	<div class="addon_function article_save" id="article_save_<?=$t;?>_<?=$articleno;?>" data-articleno="<?=$articleno;?>" data-targettile="<?=$t;?>_<?=$articleno;?>">
		<img src="./img/love_icon.png" style="padding-bottom:0px;width:12px;height:12px;margin-right:3px;"><div style="cursor:pointer;display:inline-block;vertical-align:top">담아두기</div>
	</div>
</div>
</div>
</div> <!-- addon 종료 -->

<?//

}//if $count
$count++;
} // 기사 목록을 출력하는 부분 foreach
?>
<div style="width:100%;border-top:1px solid #eaeaea;"></div>
<div style="width:100%;height:40px;text-align:right">
<div class="drawdown" data-drawnumber='3'><div style="padding-top:10px">펼쳐보기</div></div>
</div>
</div>

<? //한달간의 랭킹뉴스 종료 ?>




<? //반년간의 랭킹뉴스 시작  ?>

<? //전날의 랭킹뉴스 시작  ?>
<div style="width:100%;height:40px;margin-top:10px;padding-top:6px;background-color:#fcfcfc">
	<div style="height:31px;float:left">
		<div style="display:table-cell;height:20px;padding-top:4px;vertical-align:top">
			<div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:9px;margin-left:8px;margin-top:6px"></div><div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:14px;margin-left:1px;margin-top:6px"></div><div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:6px;margin-left:1px;margin-right:3px;margin-top:6px"></div>
		</div>
		<div style="display:table-cell;height:20px;font-weight:bold;padding-top:9px;vertical-align:top">반 년간의 랭킹뉴스</div>
	</div>
</div>
<?
// 목록출력부
$date_int = $_GET['dateint'];
$date_timestamp = strtotime($date_int);
$one_day_ago = date("Y-m-d", $date_timestamp-24*60*60);
$sql = "SELECT textified_list from b_article_textified_1 WHERE date_int='$one_day_ago' AND period_no='5'";
$query = mysql_query($sql);
$result = mysql_fetch_array($query);
$textified_list = $result[0];
$textified_list_array = array();
$textified_list_array = json_decode($textified_list, true);
?>
<div style="min-height:300px">
<?
//여기까지 sql을 하나로 다 모았다 그 sql에는 limit 구문이 없다
//이제 sql에 limit구문을 붙여서 한페이지 분량의 row를 가져온다
if($textified_list == '[]' || $textified_list == '' ){ // 아무것도 없을 경우
?>
<div style="clear:both"?>
<div style="width:100%;border-top:1px solid #eaeaea;"></div>
<table articleno="<?=$articleno;?>_mark" class="newslist_table">
<tr>
<td style="padding: 30px;">
선택하신 날짜, 기간, 카테고리에 해당하는<br>기사가 없습니다.
</td>
</tr>
</table>
<?
}
else{
$resultout = NULL;
$resultout = mysql_query($sql, $connect) or die(mysql_error());
}
$count=1;
foreach($textified_list_array as $print){
if($count<11){
$t=13;
$articleno = $print['no'];
$url = urldecode($print['url']);
$date_int = $print['date_int'];
$category = $print['category'];
$title = urldecode($print['title']);
$title = html_entity_decode($title);
$media = urldecode($print['media']);
$media_no = $print['media_no'];
$author = urldecode($print['author']);
$author_no = $print['author_no'];
//$comment_no = $print[6];
//$link_no = $print[7];
$rate_total = $print['rate_total'];
$rated_time = $print['rated_time'];
if($rated_time>0){
	$or = $rate_total/$rated_time;
}else{
	$or = 0;
}
$avg_rate = round($or*100,0)/100;
$rate = round($or*2,0)/2*10;

$facebook_no = $print['facebook_no'];
$twitter_no = $print['twitter_no'];
$repimage = urldecode($print['rep_image']);
if($repimage == 'cqrs_noimage'){
	$repimage = '';
}

//기사 출력부분 호출
?>

<!-- 기사 목록 -->
<a href='<?=$url;?>' class="newslist_a" href='javascript:void()' rel="external" target="_blank" id="newsitem<?=$count?>">
<? if($count < 4){ ?>
<? if($count>1){ ?><div style="width:100%;background-color:#f3f3f3;border-top:1px solid #e2e2e2;height:12px"></div> <? }else{ ?>
<div style="width:100%;background-color:#f3f3f3;border-top:1px solid #e2e2e2;height:1px"></div>
<? } ?><div <? if($count ==1){ echo "id='article_top_4'";}?> class="article_list article_list_main_4" data-t="<?=$t;?>" data-articleno="<?=$articleno;?>" data-categoryno="<?=$category;?>" data-belong="<?=$media;?>" data-author="<?=$author;?>" data-mediano="<?=$media_no;?>" data-authorno="<?=$author_no;?>" data-chartid="<?=$articleno."_".$t;?>" data-dateint="<?=$article_date_int;?>" data-targettile="<?=$t;?>_<?=$articleno;?>">
<? }else{ ?>
<div class="article_list_main_4 article_list_hidden" style="display:none;width:100%;background-color:#f3f3f3;border-top:1px solid #e2e2e2;height:12px"></div><div class="article_list article_list_main_4 article_list_hidden" style="display:none" data-t="<?=$t;?>" data-articleno="<?=$articleno;?>" data-categoryno="<?=$category;?>" data-belong="<?=$media;?>" data-author="<?=$author;?>" data-mediano="<?=$media_no;?>" data-authorno="<?=$author_no;?>" data-chartid="<?=$articleno."_".$t;?>" data-dateint="<?=$article_date_int;?>" data-targettile="<?=$t;?>_<?=$articleno;?>">
<? } ?>
<div style="display:inline-block;vertical-align:top;width:10%;color:#0a0a0a;padding-left:3px;text-align:center;margin:0px;font-size:15px;margin-top:3px;padding-top:23px;"><?=$count;?>.</div><div style="display:inline-block;vertical-align:top;width:61%;padding:14px;padding-left:0px;padding-top:23px;margin:0px;">
		<div class="author_div"><?=$media;?></div>
		<div class="title_div"><?=$title;?></div>
		<div style="font-size:11px;padding:7px;padding-left:0px;padding-bottom:3px;padding-top:10px;">
			<div class="newslist_badge" style="display:table-cell;vertical-align:top;height:14px;">
				<div style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left"><img src="img/ico_fb.png" style="width:9px;height:9px;margin: 0px 2px 0px 0px;"></div>
				<div style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left"><?=number_format($facebook_no);?></div>
				<div style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left;margin-left:4px"><img src="img/star_float_filled.png" style="width:9px;height:9px;margin: 0px 2px 0px 0px;"></div>
				<div class="rated_time rated_time_<?=$articleno;?>" style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left"><?=number_format($rated_time);?></div>
			</div>
		</div>
		
		<div class="ratingbadge_<?=$articleno;?>" style="<?
		if($rated_time<1){ 
			echo "display:none;";
			} ?>font-size:11px;padding:7px;padding-left:0px;padding-top:0px">
			<div class="newslist_badge" style="display:table-cell;vertical-align:top;height:14px;border:1px solid #dadada;">
				<div style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left">
					<img src = "img/new_rating_<?
					//dd
					$img_rate = round($rate*2,0)/2;
					if($rated_time==0){
						echo "none";
					}else{
						echo $img_rate;
					} 
					?>.png" class="ratingstar_to_show_<?=$articleno;?> newslist_stars_img ratingstar_to_show" style=";margin-top:-2px;float:none">
				</div>
				<div class="rating_to_show_<?=$articleno;?>" style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left">
						<?=sprintf("%.2f", $avg_rate); ?>
				 </div>
			</div>
		</div>
	</div><div style="position:absolute;right:0px;height:100%;display:inline-block;width:29%;padding:14px;padding-left:0px;margin:0px;border:0px solid pink;text-align:right;padding-top:23px;padding-right:8px;">
		<div style="display:inline-block;width:100%;border:0px solid gray;text-align:right;">
			<div style="display:inline-block;width:100%;max-width:180px;height:75px;background: url('<?=$repimage;?>') no-repeat center center;background-size:cover;">&nbsp;</div>
		</div><div style="position:absolute;bottom:0px;right:0px;width:100%;height:30px;border:0px solid gold;text-align:right;">
			<div style="height:40px;display:inline-block;"><img class="article_more" id="article_more_<?=$t;?>_<?=$articleno;?>" data-t="<?=$t;?>" data-articleno="<?=$articleno;?>" data-categoryno="<?=$category;?>" data-belong="<?=$media;?>" data-author="<?=$author;?>" data-mediano="<?=$media_no;?>" data-authorno="<?=$author_no;?>" data-chartid="<?=$articleno."_".$t;?>" src = "./img/date_down.png" style="width:16px;height:16px;padding:6px 24px 6px 24px;"></div>
		</div>
</div>
</div>
</a>

<!-- addon -->
<div id="article_addon_<?=$t;?>_<?=$articleno;?>" class="article_addon" style="display:none;width:100%;">
<!-- 통계, 저자 정보, 공유기능 -->
<div class="article_info">
<?
if($_SESSION['user_id'] == 10113){ ?>
	<div style="float:left;"><a onclick="delete_article(<?=$category;?>, <?=$articleno;?>, <?=$media_no;?>)"><img src = "img/delete.png" style="width:12px;height:12px;margin:5px;margin-top:15px"></a></div>

<? } ?>
	<!-- 가운데 -->
	<div class="article_info_1">
		<div class="article_info_3" style="height:94px">
			<div class="article_info_4" style="">
				<div class="article_info_5"><img src ="img/new_rating_none.png" id="ratingstar_to_show_media_<?=$t;?>_<?=$articleno;?>" class="newslist_stars_img"><em id="media_rate_<?=$t;?>_<?=$articleno;?>" class="media_rate">0.00</em></div>
				<div class="article_info_6"><a href="./media.php?media=<?=$media;?>" class="article_info_7" title="<?=$media;?>"><?=$media;?></a></div>
			</div>
			<div class="article_info_8">
				<? if($author){ ?>
						<div class="article_info_5"><img src = "img/new_rating_none.png" id="ratingstar_to_show_author_<?=$t;?>_<?=$articleno;?>" class="newslist_stars_img"><em id="author_rate_<?=$t;?>_<?=$articleno;?>" class="author_rate">0.00</em></div>
						<div class="article_info_6"><a href="./media.php?media=<?=$media;?>&author=<?=$author;?>" class="article_info_7" title="<?=$author;?>"><?=$author;?></a></div>
				<? } ?>
			</div>
		</div><div class="article_info_2">
			<div id="chart_<?=$articleno."_".$t;?>" class="ratingchart"></div>
		</div>
	</div>
	<!-- 가운데 종료 -->
<!-- 평점 별 -->
<div class="addon_function_div">
	<div id="article_rate_<?=$t;?>_<?=$articleno;?>" class="addon_function article_rate" data-targettile="<?=$t;?>_<?=$articleno;?>" data-t="<?=$t;?>" data-articleno="<?=$articleno;?>" data-categoryno="<?=$category;?>" data-belong="<?=$media;?>" data-author="<?=$author;?>" data-mediano="<?=$media_no;?>" data-authorno="<?=$author_no;?>" data-chartid="<?=$articleno."_".$t;?>" data-dateint="<?=$article_date_int;?>">
		<img src="./img/star_icon.png" style="padding-bottom:0px;width:12px;height:12px;margin-right:3px"><div style="cursor:pointer;display:inline-block;vertical-align:top">평가하기</div>
	</div>
	<div class="addon_function article_save" id="article_save_<?=$t;?>_<?=$articleno;?>" data-articleno="<?=$articleno;?>" data-targettile="<?=$t;?>_<?=$articleno;?>">
		<img src="./img/love_icon.png" style="padding-bottom:0px;width:12px;height:12px;margin-right:3px;"><div style="cursor:pointer;display:inline-block;vertical-align:top">담아두기</div>
	</div>
</div>
</div>
</div> <!-- addon 종료 -->

<?//

}//if $count
$count++;
} // 기사 목록을 출력하는 부분 foreach
?>
<div style="width:100%;border-top:1px solid #eaeaea;"></div>
<div style="width:100%;height:40px;text-align:right">
<div class="drawdown" data-drawnumber='4'><div style="padding-top:10px">펼쳐보기</div></div>
</div>
</div>

<? //반년간의 랭킹뉴스 종료 ?>






<? //일년간의 랭킹뉴스 시작  ?>

<? //전날의 랭킹뉴스 시작  ?>
<div style="width:100%;height:40px;margin-top:10px;padding-top:6px;background-color:#fcfcfc">
	<div style="height:31px;float:left">
		<div style="display:table-cell;height:20px;padding-top:4px;vertical-align:top">
			<div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:9px;margin-left:8px;margin-top:6px"></div><div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:14px;margin-left:1px;margin-top:6px"></div><div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:6px;margin-left:1px;margin-right:3px;margin-top:6px"></div>
		</div>
		<div style="display:table-cell;height:20px;font-weight:bold;padding-top:9px;vertical-align:top">반 년간의 랭킹뉴스</div>
	</div>
</div>
<?
// 목록출력부
$date_int = $_GET['dateint'];
$date_timestamp = strtotime($date_int);
$one_day_ago = date("Y-m-d", $date_timestamp-24*60*60);
$sql = "SELECT textified_list from b_article_textified_1 WHERE date_int='$one_day_ago' AND period_no='5'";
$query = mysql_query($sql);
$result = mysql_fetch_array($query);
$textified_list = $result[0];
$textified_list_array = array();
$textified_list_array = json_decode($textified_list, true);
?>
<div style="min-height:300px">
<?
//여기까지 sql을 하나로 다 모았다 그 sql에는 limit 구문이 없다
//이제 sql에 limit구문을 붙여서 한페이지 분량의 row를 가져온다
if($textified_list == '[]' || $textified_list == '' ){ // 아무것도 없을 경우
?>
<div style="clear:both"?>
<div style="width:100%;border-top:1px solid #eaeaea;"></div>
<table articleno="<?=$articleno;?>_mark" class="newslist_table">
<tr>
<td style="padding: 30px;">
선택하신 날짜, 기간, 카테고리에 해당하는<br>기사가 없습니다.
</td>
</tr>
</table>
<?
}
else{
$resultout = NULL;
$resultout = mysql_query($sql, $connect) or die(mysql_error());
}
$count=1;
foreach($textified_list_array as $print){
if($count<11){
$t=14;
$articleno = $print['no'];
$url = urldecode($print['url']);
$date_int = $print['date_int'];
$category = $print['category'];
$title = urldecode($print['title']);
$title = html_entity_decode($title);
$media = urldecode($print['media']);
$media_no = $print['media_no'];
$author = urldecode($print['author']);
$author_no = $print['author_no'];
//$comment_no = $print[6];
//$link_no = $print[7];
$rate_total = $print['rate_total'];
$rated_time = $print['rated_time'];
if($rated_time>0){
	$or = $rate_total/$rated_time;
}else{
	$or = 0;
}
$avg_rate = round($or*100,0)/100;
$rate = round($or*2,0)/2*10;

$facebook_no = $print['facebook_no'];
$twitter_no = $print['twitter_no'];
$repimage = urldecode($print['rep_image']);
if($repimage == 'cqrs_noimage'){
	$repimage = '';
}

//기사 출력부분 호출
?>

<!-- 기사 목록 -->
<a href='<?=$url;?>' class="newslist_a" href='javascript:void()' rel="external" target="_blank" id="newsitem<?=$count?>">
<? if($count < 4){ ?>
<? if($count>1){ ?><div style="width:100%;background-color:#f3f3f3;border-top:1px solid #e2e2e2;height:12px"></div> <? }else{ ?>
<div style="width:100%;background-color:#f3f3f3;border-top:1px solid #e2e2e2;height:1px"></div>
<? } ?><div <? if($count ==1){ echo "id='article_top_5'";}?> class="article_list article_list_main_5" data-t="<?=$t;?>" data-articleno="<?=$articleno;?>" data-categoryno="<?=$category;?>" data-belong="<?=$media;?>" data-author="<?=$author;?>" data-mediano="<?=$media_no;?>" data-authorno="<?=$author_no;?>" data-chartid="<?=$articleno."_".$t;?>" data-dateint="<?=$article_date_int;?>" data-targettile="<?=$t;?>_<?=$articleno;?>">
<? }else{ ?>
<div class="article_list_main_5 article_list_hidden" style="display:none;width:100%;background-color:#f3f3f3;border-top:1px solid #e2e2e2;height:12px"></div><div class="article_list article_list_main_5 article_list_hidden" style="display:none" data-t="<?=$t;?>" data-articleno="<?=$articleno;?>" data-categoryno="<?=$category;?>" data-belong="<?=$media;?>" data-author="<?=$author;?>" data-mediano="<?=$media_no;?>" data-authorno="<?=$author_no;?>" data-chartid="<?=$articleno."_".$t;?>" data-dateint="<?=$article_date_int;?>" data-targettile="<?=$t;?>_<?=$articleno;?>">
<? } ?>
<div style="display:inline-block;vertical-align:top;width:10%;color:#0a0a0a;padding-left:3px;text-align:center;margin:0px;font-size:15px;margin-top:3px;padding-top:23px;"><?=$count;?>.</div><div style="display:inline-block;vertical-align:top;width:61%;padding:14px;padding-left:0px;padding-top:23px;margin:0px;">
		<div class="author_div"><?=$media;?></div>
		<div class="title_div"><?=$title;?></div>
		<div style="font-size:11px;padding:7px;padding-left:0px;padding-bottom:3px;padding-top:10px;">
			<div class="newslist_badge" style="display:table-cell;vertical-align:top;height:14px;">
				<div style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left"><img src="img/ico_fb.png" style="width:9px;height:9px;margin: 0px 2px 0px 0px;"></div>
				<div style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left"><?=number_format($facebook_no);?></div>
				<div style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left;margin-left:4px"><img src="img/star_float_filled.png" style="width:9px;height:9px;margin: 0px 2px 0px 0px;"></div>
				<div class="rated_time rated_time_<?=$articleno;?>" style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left"><?=number_format($rated_time);?></div>
			</div>
		</div>
		
		<div class="ratingbadge_<?=$articleno;?>" style="<?
		if($rated_time<1){ 
			echo "display:none;";
			} ?>font-size:11px;padding:7px;padding-left:0px;padding-top:0px">
			<div class="newslist_badge" style="display:table-cell;vertical-align:top;height:14px;border:1px solid #dadada;">
				<div style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left">
					<img src = "img/new_rating_<?
					//dd
					$img_rate = round($rate*2,0)/2;
					if($rated_time==0){
						echo "none";
					}else{
						echo $img_rate;
					} 
					?>.png" class="ratingstar_to_show_<?=$articleno;?> newslist_stars_img ratingstar_to_show" style=";margin-top:-2px;float:none">
				</div>
				<div class="rating_to_show_<?=$articleno;?>" style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left">
						<?=sprintf("%.2f", $avg_rate); ?>
				 </div>
			</div>
		</div>
	</div><div style="position:absolute;right:0px;height:100%;display:inline-block;width:29%;padding:14px;padding-left:0px;margin:0px;border:0px solid pink;text-align:right;padding-top:23px;padding-right:8px;">
		<div style="display:inline-block;width:100%;border:0px solid gray;text-align:right;">
			<div style="display:inline-block;width:100%;max-width:180px;height:75px;background: url('<?=$repimage;?>') no-repeat center center;background-size:cover;">&nbsp;</div>
		</div><div style="position:absolute;bottom:0px;right:0px;width:100%;height:30px;border:0px solid gold;text-align:right;">
			<div style="height:40px;display:inline-block;"><img class="article_more" id="article_more_<?=$t;?>_<?=$articleno;?>" data-t="<?=$t;?>" data-articleno="<?=$articleno;?>" data-categoryno="<?=$category;?>" data-belong="<?=$media;?>" data-author="<?=$author;?>" data-mediano="<?=$media_no;?>" data-authorno="<?=$author_no;?>" data-chartid="<?=$articleno."_".$t;?>" src = "./img/date_down.png" style="width:16px;height:16px;padding:6px 24px 6px 24px;"></div>
		</div>
</div>
</div>
</a>

<!-- addon -->
<div id="article_addon_<?=$t;?>_<?=$articleno;?>" class="article_addon" style="display:none;width:100%;">
<!-- 통계, 저자 정보, 공유기능 -->
<div class="article_info">
<?
if($_SESSION['user_id'] == 10113){ ?>
	<div style="float:left;"><a onclick="delete_article(<?=$category;?>, <?=$articleno;?>, <?=$media_no;?>)"><img src = "img/delete.png" style="width:12px;height:12px;margin:5px;margin-top:15px"></a></div>

<? } ?>
	<!-- 가운데 -->
	<div class="article_info_1">
		<div class="article_info_3" style="height:94px">
			<div class="article_info_4" style="">
				<div class="article_info_5"><img src ="img/new_rating_none.png" id="ratingstar_to_show_media_<?=$t;?>_<?=$articleno;?>" class="newslist_stars_img"><em id="media_rate_<?=$t;?>_<?=$articleno;?>" class="media_rate">0.00</em></div>
				<div class="article_info_6"><a href="./media.php?media=<?=$media;?>" class="article_info_7" title="<?=$media;?>"><?=$media;?></a></div>
			</div>
			<div class="article_info_8">
				<? if($author){ ?>
						<div class="article_info_5"><img src = "img/new_rating_none.png" id="ratingstar_to_show_author_<?=$t;?>_<?=$articleno;?>" class="newslist_stars_img"><em id="author_rate_<?=$t;?>_<?=$articleno;?>" class="author_rate">0.00</em></div>
						<div class="article_info_6"><a href="./media.php?media=<?=$media;?>&author=<?=$author;?>" class="article_info_7" title="<?=$author;?>"><?=$author;?></a></div>
				<? } ?>
			</div>
		</div><div class="article_info_2">
			<div id="chart_<?=$articleno."_".$t;?>" class="ratingchart"></div>
		</div>
	</div>
	<!-- 가운데 종료 -->
<!-- 평점 별 -->
<div class="addon_function_div">
	<div id="article_rate_<?=$t;?>_<?=$articleno;?>" class="addon_function article_rate" data-targettile="<?=$t;?>_<?=$articleno;?>" data-t="<?=$t;?>" data-articleno="<?=$articleno;?>" data-categoryno="<?=$category;?>" data-belong="<?=$media;?>" data-author="<?=$author;?>" data-mediano="<?=$media_no;?>" data-authorno="<?=$author_no;?>" data-chartid="<?=$articleno."_".$t;?>" data-dateint="<?=$article_date_int;?>">
		<img src="./img/star_icon.png" style="padding-bottom:0px;width:12px;height:12px;margin-right:3px"><div style="cursor:pointer;display:inline-block;vertical-align:top">평가하기</div>
	</div>
	<div class="addon_function article_save" id="article_save_<?=$t;?>_<?=$articleno;?>" data-articleno="<?=$articleno;?>" data-targettile="<?=$t;?>_<?=$articleno;?>">
		<img src="./img/love_icon.png" style="padding-bottom:0px;width:12px;height:12px;margin-right:3px;"><div style="cursor:pointer;display:inline-block;vertical-align:top">담아두기</div>
	</div>
</div>
</div>
</div> <!-- addon 종료 -->

<?//

}//if $count
$count++;
} // 기사 목록을 출력하는 부분 foreach
?>
<div style="width:100%;border-top:1px solid #eaeaea;"></div>
<div style="width:100%;height:40px;text-align:right">
<div class="drawdown" data-drawnumber='5'><div style="padding-top:10px">펼쳐보기</div></div>
</div>
</div>

<? //일년간의 랭킹뉴스 종료 ?>

</div>
<?
include("footer.php");
?>