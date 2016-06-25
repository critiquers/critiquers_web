<?
$sql = "SELECT category_names from f_category WHERE date_int <= '$date_int' ORDER BY date_int desc LIMIT 0, 3";
$result = mysql_query($sql) or die(mysqli_error($this->db_link));
$result_array = mysql_fetch_array($result);
$category_names = $result_array[0];
$category_names = explode(',',$category_names);
$category_howmany = count($category_names);
?>
<html xmlns="http://www.w3.org/1999/xhtml">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,height=device-height, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
<head>
<link rel="shortcut icon" href="img/favicon.ico" type='image/x-ico' />
<meta property="fb:app_id" content="493328504033025" /> 
<meta property="fb:admins" content="685403928"/>
<meta property="og:url" content="http://www.critiquers.org/private_comment.php" />
<meta property="og:title" content="크리티커스 - 언론평가 프로젝트" />
<meta property="og:type" content="article" />
<meta property="og:description"  content="현재까지 <?=number_format($rating_total_count);?>번의 언론평가가 누적되었습니다." />
<meta property="og:image"  content="http://www.critiquers.org/img/logo/logo_fb.png" /> 
<link type="text/css" rel="stylesheet" href="css/default.css" />
<style type="text/css">
.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}
.x.axis path {
  display: none;
}
.axis {
	font-size: 9px;
}
.line {
  fill: none;
  stroke-width: 1px;
}
.legend {
  font-size: 9px;
  border: 1px solid #c0c0c0;
}
rect {
  stroke-width: 2;
}

</style>
<!--// 기본 스크립트 끝 -->
<title>크리티커스</title>
<form name="locator" action="./" method="GET">
<input type="hidden" id="center_div_id" name="center_div_id" value="" /><!-- center_div_id 변수 -->
<input type="hidden" id="userid" name="userid" value="<?=$_SESSION['user_id']; ?>" style="margin-top:150px;"/><!-- userid 변수 -->
<input type="hidden" id="dateint" name="dateint" value="<?=$date_int;?>" /><!-- date 변수 -->
<input type="hidden" id="periodno" name="periodno" value="<?=$periodno;?>" /><!-- period 변수 -->
<input type="hidden" id="categoryno" name="categoryno" value="<?=$category;?>" /><!-- category 변수 -->
<input type="hidden" id="categoryno_prev" name="categoryno_prev" value="0" style="width:30px"/>
<input type="hidden" id="categoryno_cur" name="categoryno_cur" value="<?=$category;?>" style="width:30px"/>
<input type="hidden" id="categoryno_next" name="categoryno_next" value="0" style="width:30px"/>
<input type="hidden" id="targettile" name="targettile" value="0" style="width:30px;margin-top:150px"/>
<input type="hidden" id="targetarticleno" name="targetarticleno" value="0" style="width:30px;margin-top:150px"/>
<input type="hidden" id="targetrate" name="targetrate" value="0" style="width:30px;margin-top:150px"/>
<input type="hidden" id="targetauthor" name="targetauthor" value="" style="width:30px;margin-top:150px"/>
<input type="hidden" id="targetmediano" name="targetmediano" value="" style="width:30px;margin-top:150px"/>
<input type="hidden" id="targetauthorno" name="targetauthorno" value="" style="width:30px;margin-top:150px"/>
<input type="hidden" id="targetdateint" name="targetdateint" value="" style="width:30px;margin-top:150px"/>
<input type="hidden" id="targetchartid" name="targetchartid" value="" style="width:30px;margin-top:150px"/>
<input type="hidden" id="targett" name="targett" value="" style="width:30px;margin-top:150px"/>
<input type="hidden" id="targetcategoryno" name="targetcategoryno" value="" style="width:30px;margin-top:150px"/>
<input type="hidden" id="ip" name="ip" value="<?=$_SERVER['REMOTE_ADDR'];?>" /><!-- 접속자의 ip -->
</form>

<div id="panel_cover" style="display:none;position:fixed;top:0;left:0;width:100%;height:130%;background-color:rgba(0, 0, 0, 0.35);z-index:5000;cursor:pointer"></div>

<div id="left_panel" style="position:fixed;top:0px;left:-300px;height:150%;width:300px;max-width:60%;background-color:#fafafa;z-index:5000;font-size:12px;padding-bottom:60px;">
	<div style="width:100%;height:40px;padding:0;border-bottom:0px solid #dfdfdf;text-align:center"><div style=";padding:4px 0px 0px 0px;font-weight:bold;font-size:16px;cursor:default"></div><img class="left_panel_x" src="img/delete.png" style="position:absolute;right:0;top:1px;width:20px;height:20px;padding:10px;float:right;cursor:pointer"></div>

	<? include("media_bar_date.php"); ?>

	<? include("media_bar_period.php"); ?>
</div>

<div id="right_panel" style="position:fixed;top:0;right:-200px;height:150%;width:200px;max-width:30%;background-color:#fafafa;z-index:5000;font-size:12px">
	<div style="width:100%;padding:0;border-bottom:0px solid #f0f0f0;text-align:left"><img class="right_panel_x" src="img/delete.png" style="width:20px;height:20px;padding:10px;cursor:pointer"></div>
	<div style="width:100%;text-align:center;font-size:11px;">
			<a href="./" style="color:#0a0a0a"><div style="width:100%;display:block;padding:10px 6px;text-align:center;"><img src = "./img/top_menu_home.png" style="width:40px"><br>메인화면</div></a><a href="./media.php" style="color:#0a0a0a"><div style="width:100%;display:block;padding:10px 6px;text-align:center;"><img src = "./img/top_menu_ranking.png" style="width:40px"><br>언론 랭킹</div></a>
			<a href="./about.php" style="color:#0a0a0a"><div style="width:100%;display:block;padding:10px 6px;text-align:center;"><img src = "./img/top_menu_guide.png" style="width:40px"><br>서비스 소개</div></a>
			<a onclick="mypage()" style="color:#0a0a0a" style="width:24px;height:24px"><div style="width:100%;display:block;padding:10px 6px;text-align:center;"><img src = "./img/top_menu_sign.png" style="width:40px"><br><span id="top_menu_login">가입/로그인</span></div></a>
	</div>
	<div style="width:100%;text-align:center;margin-top:40px;">
		<div style="display:inline-block;vertical-align:middle;margin-top:15px" class="fb-like" data-href="http://www.facebook.com/critiquers" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>
		<a href="http://www.facebook.com/critiquers" target="_blank" style="display:inline-block;    vertical-align:middle;margin-top:15px"><img src = '/img/fb.png' class="footer_fb" style="width:20px;height:20px;margin-left:10px;margin-top:5px;"></a>
	</div>
</div>

<div id="ratingstars_float" style="display:none;position:fixed;top:70%;bottom:30%;width:290px;height:94px;margin-top:-100px;font-size:42px;text-align:center;left:50%;margin-left:-145px;z-index:10000;font-size:10px;border:1px solid #eaeaea;background-color:#fafafa;border-radius:20px;box-shadow: 0 10px 12px -4px rgba(0, 0, 0, 0.35);padding:0px">
	<div class="ratingstars_img" data-rate="0" style="width:16%;height:55px;display:inline-block;margin:0px;"><img class="ratingstars_0" src="img/star_float_bad.png" style="width:30px;height:30px;margin-bottom:4px;"><br>최악예요</div><div class="ratingstars_img" data-rate="1" style="width:16%;height:55px;display:inline-block;margin:0px;"><img class="ratingstars_img_in ratingstars_1" src="img/star_float_empty.png" style="width:30px;height:30px;margin-bottom:6px;"><br>안좋아요</div><div class="ratingstars_img" data-rate="2" style="width:16%;height:55px;display:inline-block;margin:0px;"><img class="ratingstars_img_in ratingstars_2" src="img/star_float_empty.png" style="width:30px;height:30px;margin-bottom:6px;"><br>별로에요</div><div class="ratingstars_img" data-rate="3" style="width:16%;height:55px;display:inline-block;margin:0px;"><img class="ratingstars_img_in ratingstars_3" src="img/star_float_empty.png" style="width:30px;height:30px;margin-bottom:6px;"><br>괜찮아요</div><div class="ratingstars_img" data-rate="4" style="width:16%;height:55px;display:inline-block;margin:0px;"><img class="ratingstars_img_in ratingstars_4" src="img/star_float_empty.png" style="width:30px;height:30px;margin-bottom:6px;"><br>좋아요</div><div class="ratingstars_img" data-rate="5" style="width:16%;height:55px;display:inline-block;margin:0px;"><img class="ratingstars_img_in ratingstars_5" src="img/star_float_empty.png" style="width:30px;height:30px;margin-bottom:6px;"><br>최고예요</div>
	<div class="ratingstars_submit" style="width:100%;height:39px;background-color:#eaeaea;padding:10px;margin-top:5px;font-size:12px;color:grey;font-weight:bold;cursor:pointer">평가 제출하기</div>
</div>


<div id="left_arrow" class="arrow" title="키보드의 ← 버튼으로도 작동합니다"><</div>
<div id="right_arrow" class="arrow" title="키보드의 → 버튼으로도 작동합니다">></div>

<div id="total_container" style="margin:auto">

<!-- header -->
<div id="header_container">
	<div style="width:14%;border:0px solid red;display:inline-block;text-align:center">
		<img id="sand" src="img/sand.png" style="width:30px;height:30px;padding:6px 6px 3px 6px;cursor:pointer;">
	</div><div style="width:72%;display:inline-block;text-align:center">
		<a href="./" style=";"><img class="title_logo" src="img/logo/logo_new.png"></a>
	</div><div style="width:14%;border:0px solid red;display:inline-block;text-align:center">
		<img id="person" src="img/personal.png" style="width:30px;height:30px;padding:6px 6px 3px 6px;cursor:pointer;">
	</div>
	<!--로고-->
</div><!-- headercontainer 종료 -->

<div id="upperbar" style="width:100%;padding:0;border-bottom:0px #F0F0F0 solid;z-index:100">
<!-- 상단카테고리 바 -->
<? include("./media_bar_category.php"); ?>
</div><!-- div upperbar 종료 -->


<div id="mflick" data-role="page" style="height:auto;overflow:visible;width:100%;">
	<div id="flick-container" class="flick-container" data-role="content" style="height:auto;overflow:visible;">
		<div id="layer1" class="flick-ct" style="height:auto;overflow:visible;width:100%;padding-top:0px;">
			<div style='margin-top:50%;margin-left:-50px;margin-left:50%;width:100px;'><img src = 'http://critiquers.org/img/ajax_load.gif'></div>
		</div>
		<div id="layer2" class="flick-ct" style="height:auto;overflow:visible;width:100%;padding-top:0px;">
			<div style='margin-top:50%;margin-left:-50px;margin-left:50%;width:100px;'><img src = 'http://critiquers.org/img/ajax_load.gif'></div>
		</div>
		<div id="layer3" class="flick-ct" style="height:auto;overflow:visible;width:100%;padding-top:0px;">
			<div style='margin-top:50%;margin-left:-50px;margin-left:50%;width:100px;'><img src = 'http://critiquers.org/img/ajax_load.gif'></div>
		</div>
	</div>
</div> <!--mflick 종료 -->
</div> <!--total_container 종료 -->
</body>
<!-- 기본 스크립트 -->
<script type="text/javascript" src="jindo/jindo.all.ns.js" charset="utf-8"></script>
<script type="text/javascript" src="jindo/jindo_mobile_component.js"></script>
<script type="text/javascript" src="jindo/jquery-1.9.1.min.js" charset="utf-8"></script>
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/d3.js"></script>
<script type="text/javascript" src="js/d3.min.js"></script>
<script type="text/javascript" src="facebook_login.js"></script>
<!--GoogleAnalytics-->
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-48747835-1', 'critiquers.org');
ga('send', 'pageview');
</script>
<script>

var nDelay = jindo.m.getDeviceInfo().android? 1000: 0;

function categoryno(o){
	document.getElementById('categoryno_cur').value=o;
}

function periodno(o){
	document.getElementById('periodno').value=o;
}
function dateint(o){
	document.getElementById('dateint').value=o;
}
function mypage(){
	userid = document.getElementById('userid').value
	if(userid>1){ //로그인 되었을 경우
		window.location.replace('./private.php');
	}else{
		fblogin();
	}
}
$(document).ready(function(){
	//var ip = $("#ip").value();


var category = document.getElementById('categoryno_cur').value;
$("#li"+category).children("div").css("font-weight", "bold");
$("#li"+category).children("div").css("border-bottom", "2px solid #b94a48");

$("#login_bottom_next").live("click", function(){
	$("div.login_bottom").animate({
	bottom: "-=100",
	}, "slow");
});

$("#a_menu").live("click", function(e){
	if ($('#top_menu').css('display') == 'none') {
		$('#top_menu').show();
	}else{
		$('#top_menu').hide();
	}
})

var color = ["#9fc05a", "#ccdb38", "#eaff5b", "#ffd834", "#ffb05b", "#ff8b5a"];
$(".article_more").live("click", function(e){
	e.preventDefault();
})
$(".article_list").live("click", function(){
	var articleno = $(this).data("articleno");
	var t = $(this).data("t");
	$('#article_addon_'+t+'_'+articleno).show();
	var this_now = $(this)
	var mediano = $(this).data("mediano");
	var authorno = $(this).data("authorno");
	var chartid = $(this).data("chartid");
	var center_div_id = document.getElementById('center_div_id').value;
	var center = $("#"+center_div_id);
	center.css('height', 'auto');
	var height = center.height();
	$("#mflick").css('height', height);
	drawgraph(chartid, articleno);
	$.post("./function_rating.php",
	{ mediano : mediano, authorno : authorno, articleno : articleno},
	function(data) {
		var data = data.split(";");
		var media_rate_original = data[0];
		var author_rate_original = data[1];
		var love = data[2];
		var myrate = data[3];
		if(myrate != ''){
			$("#article_rate_"+t+"_"+articleno).html("<img src='./img/star_icon_filled.png' style='padding-bottom:0px;width:12px;height:12px;margin-right:3px;'><div style='cursor:pointer;display:inline-block;vertical-align:top'>"+myrate+".00점</div>")
		}
		var media_rate = parseFloat(data[0]);
		var author_rate = parseFloat(data[1]);
		var media_rate_rounded = Math.round(media_rate*2)/2*10;
		var author_rate_rounded = Math.round(author_rate*2)/2*10;
		if(isNaN(author_rate)){
			author_rate_rounded = 'none';
			author_rate_original = '0.00';
		}
		var media_rating_star = $("#ratingstar_to_show_media_"+t+"_"+articleno);
		if(media_rate_original=='none'){
			media_rating_star.attr("src", "img/new_rating_none.png");
		}else{
			media_rating_star.attr("src", "img/new_rating_"+media_rate_rounded+".png");
			var media_rate_text = $("#media_rate_"+t+"_"+articleno);
			var media_rate = Math.round(media_rate*100)/100;
			media_rate_text.html(media_rate_original)
		}
		var author_rating_star = $("#ratingstar_to_show_author_"+t+"_"+articleno)
		if(author_rate_original=='none'){
			author_rating_star.attr("src", "img/new_rating_none.png");
		}else{
			author_rating_star.attr("src", "img/new_rating_"+author_rate_rounded+".png");
			var author_rate_text = $("#author_rate_"+t+"_"+articleno)
			author_rate_text.html(author_rate_original)
		}
		if(love=='yes'){
			$('#article_save_'+t+'_'+articleno).html("<img src='./img/love_icon_filled.png' style='padding-bottom:0px;width:12px;height:12px;margin-right:3px;'><div style='cursor:pointer;display:inline-block;vertical-align:top''>담아두기</div>")

		}
	});
})

$(".ratingstars_img").live("click", function(){
	$(".ratingstars_img").css('font-weight', '500');
	$(this).css('font-weight', 'bold');
	var rate = $(this).data("rate");
	document.getElementById('targetrate').value=rate;
	for (i = 1; i < 6; i++) { 
		if(i>rate){		
			$(".ratingstars_"+i).attr("src", "img/star_float_dark.png");
		}else{
			$(".ratingstars_"+i).attr("src", "img/star_float_filled.png");
		}
	}
})

$(".ratingstars_submit").live("click", function(){
	$("body").css("overflow", "auto");
	$("#panel_cover").hide(0);
	$("#ratingstars_float").hide(500);
	var userid = document.getElementById('userid').value;
	if(userid<2){
		$(".login_bottom").animate({
		bottom: "0px",
		}, 250);
	}else{
	var targettile = document.getElementById('targettile').value;
	var rate = document.getElementById('targetrate').value;

	var author = document.getElementById("targetauthor").value;
	var mediano = document.getElementById("targetmediano").value;
	var authorno = document.getElementById("targetauthorno").value;
	var articleno = document.getElementById("targetarticleno").value;
	var dateint = document.getElementById("targetdateint").value;
	var chartid = document.getElementById("targetchartid").value;
	var categoryno = document.getElementById("targetcategoryno").value;

	$.post("./function_rating_input.php", 
	{ rate : rate, mediano : mediano, authorno : authorno, articleno : articleno, categoryno : categoryno, dateint : dateint},
	function(data) {
		//입력한 점수 애니메이션
		if(rate=='none'){
		$("#article_rate_"+targettile).html("<img src='./img/star_icon.png' style='padding-bottom:0px;width:12px;height:12px;margin-right:3px'><div style='cursor:pointer;display:inline-block;vertical-align:top'>평가하기</div>")
		}else{
		$("#article_rate_"+targettile).html("<img src='./img/star_icon_filled.png' style='padding-bottom:0px;width:12px;height:12px;margin-right:3px;'><div style='cursor:pointer;display:inline-block;vertical-align:top'>"+rate+".00점</div>")
		}
		var data = data.split(";");
		if(data[0]=='none'){
			var avg_rate = 0;
			var rate_rounded = 'none'
		}else{
			var avg_rate = parseFloat(data[0]);
			var rate_rounded = Math.round(avg_rate*2)/2*10;			
		}
		var rated_time = data[1];
		var media_avg_rate = parseFloat(data[2]);
		var media_rate_rounded = Math.round(media_avg_rate*2)/2*10;
		var author_avg_rate = parseFloat(data[3]);
		var author_rate_rounded = Math.round(author_avg_rate*2)/2*10;
		if(isNaN(author_avg_rate)){
			author_rate_rounded = 'none';
			author_avg_rate = '0.00';
		}
		// article star reload
		var target_now = $(".ratingstar_to_show_"+articleno);
		target_now.animate({ opacity: 0 }, 500, function () { target_now.attr("src", "img/new_rating_"+rate_rounded+".png");});
		target_now.animate({ opacity: 1 }, 500);

		// article star 옆 rate
		var target_now11 = $(".rating_to_show_"+articleno)
		target_now11.html(avg_rate.toFixed(2));

		// article star count reload
		var target_now15 = $(".rated_time_"+articleno)
		target_now15.html(rated_time);

		// media rating load
		var target_now1 = $("#ratingstar_to_show_media_"+targettile)
		target_now1.animate({ opacity: 0 }, 500, function () { target_now1.attr("src", "img/new_rating_"+media_rate_rounded+".png");});
		target_now1.animate({ opacity: 1 }, 500);
		var target_now2 = $("#media_rate_"+targettile)
		var avg_rate = Math.round(media_avg_rate*100)/100;
		target_now2.html(avg_rate.toFixed(2));

		// author rating load
		var target_now3 = $("#ratingstar_to_show_author_"+targettile)
		target_now3.animate({ opacity: 0 }, 500, function () { target_now3.attr("src", "img/new_rating_"+author_rate_rounded+".png");});
		target_now3.animate({ opacity: 1 }, 500);
		var target_now4 = $("#author_rate_"+targettile)
		var avg_rate = Math.round(author_avg_rate*100)/100;
		target_now4.html(avg_rate.toFixed(2));

		drawgraph(chartid, articleno);
		if(rated_time==0){
			$(".ratingbadge_"+articleno).hide();
		}else{
			$(".ratingbadge_"+articleno).show();
		}
	});

}
})//click

$(".article_save").live("click", function(){
	var articleno = $(this).data("articleno");
	var targettile = $(this).data("targettile");
	$.post("./function_save.php", 
	{ articleno : articleno },
	function(love) {
		if(love == 'yes'){
			$("#article_save_"+targettile).html("<img src='./img/love_icon_filled.png' style='padding-bottom:0px;width:12px;height:12px;margin-right:3px;'><div style='cursor:pointer;display:inline-block;vertical-align:top''>담아두기</div>")
		}else{
			$("#article_save_"+targettile).html("<img src='./img/love_icon.png' style='padding-bottom:0px;width:12px;height:12px;margin-right:3px;'><div style='cursor:pointer;display:inline-block;vertical-align:top''>담아두기</div>")
		}
	});
})//click

// 카테고리 bar를 탑으로 고정
$(window).scroll(function() {
	//현재스크롤의 위치가 화면의 보이는 위치보다 크다면
	if ($(window).scrollTop() >= $(document).height() - $(window).height()-550){ 
		var category = document.getElementById('categoryno_cur').value;
		var last_scroll_count = $(".scroll_visible_"+category+":last").data("scrollcount");
		next_scroll_count = parseInt(last_scroll_count)+1;
		$(".scrollcount_"+category+"_"+next_scroll_count).addClass("scroll_visible_"+category)
		$(".scrollcount_"+category+"_"+next_scroll_count).show(0, function(){
			var center_div_id = document.getElementById('center_div_id').value;
			var center = $("div#"+center_div_id);
			center.css('height', 'auto');
			var height = center.height();
			$("#mflick").css('height', height);
		});
	}
	$('#top_menu').hide();
}); //scroll


//보여지는 카테고리 전체 수를 입력한다
var category_howmany = 2;

$("#panel_cover, .left_panel_x").live("click", function(){
	$("#panel_cover").hide();
	$("#left_panel").animate({ left: '-300px' })
	$("#right_panel").animate({ right: '-200px' })
	$("#left_panel").animate({ scrollTop: 0 }, 0);
	$("body").css("overflow", "auto");
	$('#datepicker1').hide();
})

$("#panel_cover, .right_panel_x").live("click", function(){//여기여기여기
	var dateint = document.getElementById("dateint").value;
	var showdate = dateint;
	$('#bardate').load('./media_bar_date.php?date='+dateint+'&showdate='+showdate)
	$("#panel_cover").hide();
	$("#panel_cover2").hide();
	$("#left_panel").animate({ left: '-300px' })
	$("#right_panel").animate({ right: '-200px' })
	$("#right_panel").animate({ scrollTop: 0 }, 0);
	$("body").css("overflow", "auto");
	$("#ratingstars_float").hide(500);
	$('#datepicker1').hide();
})

$("#sand").live("click", function(){
	//left panel을 나타낸다
	if ($("#left_panel").css('left') == '-300px') {
		$("body").css("overflow", "hidden");
		$("#panel_cover").show(0);
		$("#left_panel").animate({ left: '0px' })
		$("#left_panel_x").show(0);
	}else{
	//left panel을 숨긴다
		$("body").css("overflow", "auto");
		$("#panel_cover").hide(500);
		$("#left_panel").animate({ left: '-300px' })
		$("#left_panel_x").hide(0);
	}
})

$("#person").live("click", function(){
	if ($("#right_panel").css('right') == '-200px') {
		$("#panel_cover").show(0);
		$("#right_panel").animate({ right: '0px' })
	}else{
		$("#panel_cover").hide(500);
		$("#right_panel").animate({ right: '-200px' })
	}
})

$(".article_rate").live("click", function(){
	$("#panel_cover").show();
	$("#ratingstars_float").show(500);
	$("body").css("overflow", "hidden");
	$(".ratingstars_img_in").attr("src", "img/star_float_empty.png");
	$(".ratingstars_img").css('font-weight', '500');
	var targettile = $(this).data("targettile");
	var targetarticleno = $(this).data("articleno");
	var targetrate = $(this).data("rate");
	var targetauthor = $(this).data("author");
	var targetmediano = $(this).data("mediano");
	var targetauthorno = $(this).data("authorno");
	var targetdateint = $(this).data("dateint");
	var targetchartid = $(this).data("chartid");
	var targett = $(this).data("t");
	var targetcategoryno = $(this).data("categoryno");

	document.getElementById("targettile").value=targettile;
	document.getElementById("targetarticleno").value=targetarticleno;
	document.getElementById("targetrate").value=targetrate;
	document.getElementById("targetauthor").value=targetauthor;
	document.getElementById("targetmediano").value=targetmediano;
	document.getElementById("targetauthorno").value=targetauthorno;
	document.getElementById("targetdateint").value=targetdateint;
	document.getElementById("targetchartid").value=targetchartid;
	document.getElementById("targett").value=targett;
	document.getElementById("targetcategoryno").value=targetcategoryno;
	document.getElementById('targetrate').value='none';
})



var periodno = jindo.$('periodno').value;
$("#li_period_"+periodno).css("font-weight", "bold");
$("#li_period_"+periodno).css("background-color", "#f0f0f0");
//$("#li_period_"+periodno).children("div").css("border-bottom", "1px solid #b94a48");

var category = document.getElementById('categoryno_cur').value;
$(".li"+category).children("div").css("font-weight", "bold");
$(".li"+category).children("div").css("border-bottom", "2px solid #b94a48");

var oFlicking = new jindo.m.Flicking(jindo.$('mflick'),{
		nTotalContents : category_howmany, //전체 아이템 개수
		sAnimation : 'slide',
		bUseDiagonalTouch : false,
		bUseCircular : true,
		nFlickThreshold:30
	}).attach({
		'beforeFlicking' : function(oCustomEvt){
			$('#top_menu').hide();
			var nIndex = oCustomEvt.nContentsIndex * 1;
			//oCustomEvt.stop();
			if(oCustomEvt.bLeft){
				var nextelement = this.getPrevElement();
				nextelement.html("<div style='margin-top:50%;margin-left:50%;padding-left:-50px;width:100px;'><img src = 'http://critiquers.org/img/ajax_load.gif'></div>")
				var next = this.getContentIndex()+1;
				var next = parseInt(next % category_howmany);
				var next = document.getElementById('categoryno_next').value;

				$(".category").children("div").css("border-bottom", "0px");
				$(".category").children("div").css("font-weight", "normal");
				$("#li"+next).children("div").css("font-weight", "bold");
				$("#li"+next).children("div").css("border-bottom", "2px solid #b94a48");
			}else{
				var prevelement = this.getNextElement();
				prevelement.html("<div style='margin-top:50%;margin-left:50%;padding-left:-50px;width:100px;'><img src = 'http://critiquers.org/img/ajax_load.gif'></div>")
				var prev_or = this.getContentIndex();
				var prev = this.getContentIndex()+category_howmany-1;
				var prev = parseInt(prev % category_howmany);
				var prev = document.getElementById('categoryno_prev').value;

				$(".category").children("div").css("border-bottom", "0px");
				$(".category").children("div").css("font-weight", "normal");
				$("#li"+prev).children("div").css("font-weight", "bold");
				$("#li"+prev).children("div").css("border-bottom", "2px solid #b94a48");
			}
			},
		'afterFlicking' : function(oCustomEvt){
			$("html, body").animate({ scrollTop: 0 }, 0); //48
			var sMessage = ''
			//플리킹 효과를 통해 현재 화면을 움직였을 경우
			if(oCustomEvt.bLeft){
				var nextelement = this.getNextElement();
				//왼쪽으로 움직였을 경우 오른쪽 panel만 업데이트
				//var next = this.getNextIndex();
				var next = document.getElementById('categoryno_next').value;
				var next = (parseInt(next)+1) % category_howmany;

				var dateint = jindo.$('dateint').value;
				var periodno = jindo.$('periodno').value;
				var url_now = "media_1_main.php?category="+next+"&periodno="+periodno+"&dateint="+dateint;
				var center = this.getElement();
				center.css('height', 'auto');
				var height = center.height();
				$("#mflick").css('height', height);
				var id = nextelement.attr("id");
				$.ajax({
					url: url_now,
					//url: aAjaxSource[next],
					type: "POST",
					success: function(data){
					nextelement.html(data);
				},
					complete: function(){
					center.css('height', 'auto');
					var height = center.height();
					$("#mflick").css('height', height);
					$("#mflick").find("script").each(function(i) {
						eval($(this).text());
					});
				}
				});
				var prev = document.getElementById('categoryno_prev').value;
				var cur = document.getElementById('categoryno_cur').value;
				var next = document.getElementById('categoryno_next').value;
				document.getElementById('categoryno_prev').value=cur % category_howmany;
				document.getElementById('categoryno_cur').value=next % category_howmany;
				document.getElementById('categoryno_next').value=(parseInt(next)+1) % category_howmany;
			}else{
				//오른쪽으로 움직였을 경우 왼쪽 panel만 업데이트
				//var prev_or = this.getPrevIndex();
				var prevelement = this.getPrevElement();
				var prev = document.getElementById('categoryno_prev').value;
				var prev = (((parseInt(prev)-1) % category_howmany)+category_howmany) % category_howmany;
				var dateint = jindo.$('dateint').value;
				var periodno = jindo.$('periodno').value;
				var url_now = "media_1_main.php?category="+prev+"&periodno="+periodno+"&dateint="+dateint;
				var center = this.getElement();
				center.css('height', 'auto');
				var height = center.height();
				$("#mflick").css('height', height);
				var id = prevelement.attr("id");
				$.ajax({
					url: url_now,
					//url: aAjaxSource[prev_or],
					type: "POST",
					success: function(data){
					prevelement.html(data);
				},
					complete: function(){
					center.css('height', 'auto');
					var height = center.height();
					$("#mflick").css('height', height);
					$("#mflick").find("script").each(function(i) {
						eval($(this).text());
					});
				}
				});
				//var prev = document.getElementById('categoryno_prev').value;
				var cur = document.getElementById('categoryno_cur').value;
				var next = document.getElementById('categoryno_next').value;
				document.getElementById('categoryno_prev').value=prev;
				document.getElementById('categoryno_cur').value=(parseInt(prev) +1 )% category_howmany;
				document.getElementById('categoryno_next').value=cur % category_howmany;
			}
			var oScroll = new jindo.m.Scroll("view", {
				bUseHScroll : false,
				bUseVScroll: true,
				bUseBounce:false,
				bUseMomentum : false,
				bUseScrollbar:false
				//nHeight : 600
			});
		},
		'beforeMove' : function(oCustomEvt){
				var nIndex = oCustomEvt.nContentsIndex * 1;
			},
		'move' : function(oCustomEvt){
			//setContentIndex로 플리킹 효과가 아닌 전체 panel의 정보가 바뀔경우 3개 panel의 모든 정보를 바꾼다
			var center = this.getElement();
			var prevelement = this.getPrevElement();
			var nextelement = this.getNextElement();
			center.html("<div style='margin-top:50%;margin-left:50%;padding-left:-50px;width:100px;'><img src = 'http://critiquers.org/img/ajax_load.gif'></div>")
			prevelement.html("<div style='margin-top:50%;margin-left:50%;padding-left:-50px;width:100px;'><img src = 'http://critiquers.org/img/ajax_load.gif'></div>")
			nextelement.html("<div style='margin-top:50%;margin-left:50%;padding-left:-50px;width:100px;'><img src = 'http://critiquers.org/img/ajax_load.gif'></div>")

			var dateint = jindo.$('dateint').value;
			var periodno = jindo.$('periodno').value;
			//getPrevIndex 이런 애들이 이동 후에 번호를 따라가지를 않네
			var cur = this.getContentIndex(cur);
			var prev_or = this.getPrevIndex();
			var next = this.getNextIndex();
			var next = (parseInt(cur)+1) % category_howmany;

			document.getElementById('categoryno_prev').value=prev_or;
			document.getElementById('categoryno_cur').value=cur;
			document.getElementById('categoryno_next').value=next;

			$("html, body").animate({ scrollTop: 0 }, 0); //48
			var url_center = "media_1_main.php?category="+cur+"&periodno="+periodno+"&dateint="+dateint;
			var url_prevelement = "media_1_main.php?category="+prev_or+"&periodno="+periodno+"&dateint="+dateint;
			var url_nextelement = "media_1_main.php?category="+next+"&periodno="+periodno+"&dateint="+dateint;
			
			$.ajax({
				url: url_center,
				type: "POST",
				async: true,
				success: function(data){
				center.html(data);
				},
				complete: function(){
					center.css('height', 'auto');
					var height = center.height();
					$("#mflick").css('height', height);
					$("html, body").animate({ scrollTop: 0 }, 0); //48
				}
			});
			$.ajax({
				url: url_prevelement,
				type: "POST",
				async: true,
				success: function(data){
				prevelement.html(data);
			}
			});
			$.ajax({
				url: url_nextelement,
				type: "POST",
				async: true,
				success: function(data){
				nextelement.html(data);
				$("#mflick").find("script").each(function(i) {
					eval($(this).text());
				});
			}
			});
		}
	});

//불러온다
var n = jindo.$('categoryno_cur').value;
oFlicking.refresh(n);

//날짜설정
$('.categorydate').live("click", function(){
	var dateint = $(this).data('dateint');
	var showdate = $(this).data('showdate');
	$('#bardate').load('./bar_date.php?date='+dateint+'&showdate='+showdate)
	document.getElementById('dateint').value=dateint;
	//$(".categorydate").children("div").css("font-weight", "normal");
	//$(".categorydate").children("div").css("background-color", "transparent");
	//$(this).children("div").css("font-weight", "bold");
	//$(this).children("div").css("background-color", "#eaeaea");
	var n = jindo.$('categoryno_cur').value;
	oFlicking.refresh(n);
})

//날짜이동
$('.datemove').live("click", function(){
	var dateint = $(this).data('dateint');
	var showdate = $(this).data('showdate');
	$('#bardate').load('./bar_date.php?date='+dateint+'&showdate='+showdate)
})

//기간설정
$('.categoryperiod').live("click", function(){
	var periodno = $(this).data("periodno");
	document.getElementById('periodno').value=periodno;
	$(".categoryperiod").css("font-weight", "normal");
	$(".categoryperiod").css("background-color", "transparent");
	$(this).css("font-weight", "bold");
	$(this).css("background-color", "#eaeaea");
	var n = jindo.$('categoryno_cur').value;
	oFlicking.refresh(n);
})

//매체 카테고리 설정
$(".category").live("click", function(){
	categoryno = $(this).data("categoryno");
	document.getElementById('categoryno_cur').value=categoryno;
	$(".category").children("div").css("border-bottom", "0px");
	$(".category").children("div").css("font-weight", "normal");
	$(this).children("div").css("font-weight", "bold");
	$(this).children("div").css("border-bottom", "2px solid #b94a48");
	oFlicking.refresh(categoryno);
})

//Rotation 시 width 재설정
$(window).bind( 'orientationchange', function(e){
});//Rotation 시 width 재설정 종료

$('div#right_arrow').live("click", function(){
	oFlicking.moveNext();
})
$('div#left_arrow').live("click", function(){
	oFlicking.movePrev(); 
})

$(document).keydown(function(e) {
	switch(e.which) {
	case 37: // left
	oFlicking.movePrev(); 
	break;

	case 39: // right
	oFlicking.moveNext();
	break;

	default: return; // exit this handler for other keys
	}
	e.preventDefault(); // prevent the default action (scroll / move caret)
});

});//ready 종료
</script>
</head>
<body>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.3&appId=493328504033025";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
</html>