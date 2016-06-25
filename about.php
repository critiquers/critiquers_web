<?
session_start();
require("/var/www/html/include_connect.php");
require("/var/www/html/include_variables.php");
if($_SESSION['user_id'] == ''){
	$_SESSION['user_id'] = 1;
}
$date_int = $_GET['date'];
if($date_int==''){
	$date_int = date("Y-m-d");
}
$category = $_GET['category'];
if($category==''){
	$category = 1;
}
$periodno = $_GET['period'];
if($periodno==''){
	$periodno = 1;
}
?>
<html xmlns="http://www.w3.org/1999/xhtml">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,height=device-height, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
<meta property="fb:app_id" content="493328504033025" /> 
<meta property="og:type"   content="article" /> 
<meta property="og:title"  content="크리티커스 - 언론평가 프로젝트" />
<meta property="og:description"  content="현재까지 <?=number_format($rating_total_count);?>번의 언론평가가 누적되었습니다." />
<meta property="og:image"  content="http://www.critiquers.org/img/logo/logo_fb.png" /> 
<head>
<link rel="shortcut icon" href="img/favicon.ico" type='image/x-ico' />
<title>크리티커스</title>
<link type="text/css" rel="stylesheet" href="css/default.css" />
</head>
<body>
<script>(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.3&appId=493328504033025";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<form name="locator" action="./" method="GET">
<input type="hidden" id="center_div_id" name="center_div_id" value="" /><!-- center_div_id 변수 -->
<input type="hidden" id="userid" name="userid" value="" style="margin-top:150px;"/><!-- userid 변수 -->
<input type="hidden" id="dateint" name="dateint" value="<?=$date_int;?>" /><!-- date 변수 -->
<input type="hidden" id="periodno" name="periodno" value="<?=$periodno;?>" /><!-- period 변수 -->
<input type="hidden" id="categoryno" name="categoryno" value="<?=$category;?>" /><!-- category 변수 -->
<input type="hidden" id="categoryno_prev" name="categoryno_prev" value="0" style="width:30px"/>
<input type="hidden" id="categoryno_cur" name="categoryno_cur" value="<?=$category;?>" style="width:30px"/>
<input type="hidden" id="categoryno_next" name="categoryno_next" value="0" style="width:30px"/>

<input type="hidden" id="ip" name="ip" value="<?=$_SERVER['REMOTE_ADDR'];?>" /><!-- 접속자의 ip -->
</form>

<div id="panel_cover" style="display:none;position:fixed;top:0;left:0;width:100%;height:130%;background-color:rgba(0, 0, 0, 0.35);z-index:5000;cursor:pointer"></div>

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

<div id="total_container" style="margin:auto">

<!-- header -->
<div id="header_container" style="border-bottom:1px solid #cacaca;-webkit-box-shadow: 0 3px 4px -4px rgba(0, 0, 0, 0.35);-moz-box-shadow: 0 3px 4px -4px rgba(0, 0, 0, 0.35);box-shadow: 0 3px 4px -4px rgba(0, 0, 0, 0.35);">
	<div style="width:14%;border:0px solid red;display:inline-block;text-align:center">
	</div><div style="width:72%;display:inline-block;text-align:center">
		<a href="./" style=";"><img class="title_logo" src="img/logo/logo_new.png"></a>
	</div><div style="width:14%;border:0px solid red;display:inline-block;text-align:center">
		<img id="person" src="img/personal.png" style="width:30px;height:30px;padding:6px 6px 3px 6px;cursor:pointer;">
	</div>
	<!--로고-->
</div><!-- headercontainer 종료 -->

 <div class="about_container">
	<div class="about_landing">
		<div style="padding-top:210px;">
			<img src = "img/logo/logo_new.png" style="width:140px;margin-bottom:8px">
			<br>
			<span style="font-size:14px;">독자가 언론을 평가하는 곳</span>
		</div>
	</div>
	<div class="about_landing_band"><b>About</b>
	</div>

	<div class="about_wrapper">
	<div class="about_title"><크리티커스>는<br>
	언론평가 프로젝트입니다</div>
	<div class="about_description"><크리티커스>는 언론을 평가하고 견제하기 위한 공공프로젝트인 동시에 좋은 저널리즘 컨텐츠를 선별하는 미디어 큐레이션 서비스입니다. <크리티커스>에서는 누구나 읽은 뉴스를 0점부터 5점까지 자유롭게 평가할 수 있습니다. 이 평가는 그 뉴스 뿐 아니라 그 뉴스를 쓴 기자, 그리고 그 기자가 소속된 언론사에도 누적됩니다. <크리티커스>는 독자가 직접 평가내린 각 언론사와 기자의 평점을 상시적으로 공개하며 높은 평점을 받은 뉴스를 소개해드립니다.</div>
	</div>



	<div class="about_description_band about_bg_2" style="background-size:100%;"></div>

	<div class="about_wrapper">
	<div class="about_title">집단지성에 기반합니다</div>
	<div class="about_description">뉴스를 읽고 무엇을 생각할지에 대해 모두는 자유롭습니다. 그러나 무슨 뉴스를 읽을지에 대해 우리는 자유롭지 않습니다. 오늘 당신이 읽은 뉴스는 누가 정한 기사였습니까? <크리티커스>에서는 소셜미디어에서 더 많이 공유될수록, 더 많은 사람으로부터 더 높은 평점을 받은 글일수록 상위에 소개됩니다. 이를 통해 특정 포털사, 언론사, 소수집단, 개인이 고른 뉴스가 아닌, 시민 다수가 중요하다고 판단하는 뉴스를 선별해내고자 합니다.</div>
	</div>



	<div class="about_description_band about_bg_3" style="background-size:100%;"></div>

	<div class="about_wrapper">
	<div class="about_title">언론을 고민합니다</div>
	<div class="about_description">사람들은 보도되는 뉴스를 보며 그 너머 어딘가에 표면이 아닌 진짜 문제가 있을 것이라고 짐작합니다. 표면 아래의 진짜 문제가 무엇인지를 찾아내고 풀어내는 것. 그것이 언론의 힘이자 지향점이라고 생각합니다. 언론이 객관성이라는 명목 아래 팩트를 묘사하는 데 머물지 않기를 바랍니다. <크리티커스>는 단순한 사실관계를 전달하는데 그치지 않고 사건과 현상의 맥락과 의미, 분석을 전하는 깊이있는 글이 높은 평가를 받는 언론의 장이 되고자 합니다.</div>
	</div>



	<div class="about_description_band about_bg_5" style="background-size:100%;"></div>

	<div class="about_wrapper">
	<div class="about_title">좋은 언론을 찾아냅니다</div>
	<div class="about_description">편향적인 논조, 기계적인 중립, 선정적인 제목, 의도적인 침묵, '아니면 말고'식의 보도, 검색어 어뷰징 등 우리는 언론의 갖은 비행을 목격합니다. 하지만 나쁜 언론을 비판하는 일보다 더 중요한 것은 좋은 언론을 발굴해내고 또 널리 알리는 일입니다. 언론에 대한 조롱과 경멸이 끊이 지않는 시대에도 묵묵히 진실과 정의를 좇는 기자와 편집자, 작가, 블로거들이 있습니다. 우리는 그들의 목소리를 찾아내고, 높이 평가하며, 더 널리 알려지도록 해야합니다. <크리티커스>는 나쁜 언론에 대한 회의와 비난 사이에서, 좋은 언론을 찾아내 널리 알리고자 합니다.</div>
	</div>

	<div class="about_description_band about_bg_6" style="background-size:100%;"></div>
	
	<div class="about_wrapper">
	<div class="about_title">언론 생태계를 지킵니다</div>
	<div class="about_description">정보 생산은 권력이며, 경쟁하지 않는 권력은 부패합니다. 언론계의 부패와 타락을 막기 위해서는 다양한 언론 간의 역동적인 경쟁이 필수적입니다. 규모가 큰 매체라고해서 언론 시장 전체를 독식해서는 안되며, 소규모 매체의 이름없는 기자가 쓴 글이라도 좋은 내용이라면 널리 읽혀져야 합니다. <크리티커스>는 기성 언론매체 뿐 아니라 다양한 소규모 매체와 블로거를 찾아 널리 소개하고자 합니다.</div>
	</div>

	<div class="about_description_band about_bg_4" style="background-size:100%;"></div>
	
	<div class="about_wrapper">
	<div class="about_title">진영을 넘어섭니다</div>
	<div class="about_description">사람들은 주로 자신과 정치적 성향이 가까운 매체를 통해 정보를 접합니다. 게다가 최근에는 소셜미디어를 통해 뉴스가 전파되다보니 비슷한 성향의 정보만 반복적으로 접하는 "정치 정보의 진영화"가 더욱 심각한 문제가 되고 있습니다. 더 나은 사회적 선택이 이루어지기 위해서는, 비록 다른 성향의 매체이더라도 가치있는 주장과 정보라면 널리 읽혀져야 합니다. <크리티커스>는 보수부터 중도와 진보까지, 일간신문부터 인터넷매체와 블로거까지, 여러 언론을 비교하기 쉽게 소개함으로써 정치 정보의 진영화를 극복하고자 합니다.</div>
	</div>

	<div class="about_description_band about_bg_7" style="background-size:100%;"></div>

	<div class="about_wrapper">
	<div class="about_title">함께 해주세요</div>
	<div class="about_description"><?=date("Y");?>년 <?=date("n");?>월 <?=date("j");?>일 현재, <크리티커스>를 통해 <?=number_format($rating_total_count);?>번의 언론 평가가 누적되었습니다. 더 많은 사람들이 언론을 견제하려할 때 더 많은 언론이 권력을 견제하려 할 것이라 믿습니다. <크리티커스>를 통한 언론평가는 아래의 페이스북 페이지를 통해서도 만나실 수 있습니다. <br><br>

	<b>크리티커스 프로젝트</b><a href ="https://www.facebook.com/Critiquers" target="_blank"><img src="/img/fb.png" style="width:13px;margin-left:5px;margin-bottom:-1px"></a><br>
	<span style="font-size:12px;color:#808080;line-height:130%">크리티커스 프로젝트의 새로운 소식을 전해드립니다.</span><br><br>

	<b>크리티커스 포스트</b><a href ="https://www.facebook.com/CritiquersPost" target="_blank"><img src="/img/fb.png" style="width:13px;margin-left:5px;margin-bottom:-1px"></a><br>
	<span style="font-size:12px;color:#808080;line-height:130%">크리티커스에서 좋은 평가를 받은 핵심 기사를 매일 선정하여 타임라인에 소개해드립니다.</span><br><br>

	</div>
	</div>
	<div style="width:100%;border-top:1px solid #eaeaea;margin-top:10px;margin-bottom:30px;"></div>
	<div style="width:100%;overflow:hidden;text-overflow:ellipsis;padding:0px 8% 22px 8%">
		<div class="fb-like" data-href="http://www.facebook.com/Critiquers" data-layout="standard" data-width="500" data-action="like" data-show-faces="true" data-share="false" style="width:100%;margin:3px 4px 0px 20px;float:left"></div>
	<iframe id="idIframe" onload="iframeLoaded()" src="./private_comment_1.php" style="width:100%;border:0px solid #000000;" frameborder="0"></iframe>
	</div>


</div>
<?
include("footer.php");
?>
<div class="toast toast_signout" style="display:none;z-index:200;">
</div>
</div> <!--total_container 종료 -->
</body>
<!-- 기본 스크립트 -->
<script type="text/javascript" src="jindo/jindo.all.ns.js" charset="utf-8"></script>
<script type="text/javascript" src="jindo/jindo_mobile_component.js"></script>
<script type="text/javascript" src="jindo/jquery-1.9.1.min.js" charset="utf-8"></script>
<script type="text/javascript" src="js/jquery.js"></script>
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
<!--// 기본 스크립트 끝 -->
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

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
	$('#bardate').load('./bar_date.php?date='+dateint+'&showdate='+showdate)
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

$("#a_menu").live("click", function(e){
	if ($('#top_menu').css('display') == 'none') {
		$('#top_menu').show();
	}else{
		$('#top_menu').hide();
	}
})

$("#login_bottom_next").live("click", function(){
	$("div.login_bottom").animate({
	bottom: "-=100",
	}, 1800);
});
$("#loggedout_button").live("click", function(){
	fblogin();
})
$("#loggedin_button").live("click", function(){
	fblogout();
})


function iframeLoaded() {
	var iFrameID = document.getElementById('idIframe');
	if(iFrameID) {
		// here you can make the height, I delete it first, then I make it again
		//iFrameID.height = "";
		iFrameID.height = iFrameID.contentWindow.document.body.scrollHeight + "px";
	}   
}

window.setInterval(function(){
	iframeLoaded();
//	var center = $("#about_container");
//	center.css('height', 'auto');
//	var height = center.height();
//	$("#about_container").css('height', height);
}, 1000);

// 카테고리 bar를 탑으로 고정
$(window).scroll(function() {
	$('#top_menu').hide();
	//$('div#image_div').css('padding-top', '65%')
}); //scroll


//Rotation 시 width 재설정
$(window).bind( 'orientationchange', function(e){
		setTimeout(function () {
	$(".chart").html("");
	$(".markscript").find("script").each(function(i) {
	eval($(this).text());
	});
		}, 500);
});//Rotation 시 width 재설정 종료
});//ready 종료
</script>
</html>