<?
session_start();
require("/var/www/html/include_connect.php");
require("/var/www/html/include_variables.php");
$category = 1;
$user_id = $_SESSION['user_id'];
if($user_id<2){ //로그인 된 경우만
?>
<meta http-equiv="refresh" content="0; url=./" />
<?
}else{
?>
<html xmlns="http://www.w3.org/1999/xhtml">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,height=device-height, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
<meta property="fb:app_id" content="493328504033025" /> 
<meta property="fb:admins" content="685403928"/>
<meta property="og:url" content="http://www.critiquers.org/private_comment.php" />
<meta property="og:title" content="크리티커스 - 언론평가 프로젝트" />
<meta property="og:type" content="article" />
<meta property="og:description"  content="현재까지 <?=number_format($rating_total_count);?>번의 언론평가가 누적되었습니다." />
<meta property="og:image"  content="http://www.critiquers.org/img/logo/logo_fb.png" /> 
<head>
<link rel="shortcut icon" href="img/favicon.ico" type='image/x-ico' />
<title>크리티커스</title>
<link type="text/css" rel="stylesheet" href="css/default.css" />
<body>
<form name="locator" action="./" method="GET">
<input type="hidden" id="center_div_id" name="center_div_id" value="" style="margin-top:120px"/><!-- center_div_id 변수 -->
<input type="hidden" id="userid" name="userid" value=""/><!-- userid 변수 -->
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
			<a href="./" style="color:#0a0a0a"><div style="width:100%;display:block;padding:10px 6px;text-align:center;"><img src = "./img/top_menu_home.png" style="width:40px"><br>메인화면</div></a><a href="./media.php" style="color:#0a0a0a"><div style="width:100%;display:block;padding:10px 6px;text-align:center;"><img src = "./img/top_menu_guide.png" style="width:40px"><br>언론 랭킹</div></a>
			<a href="./about.php" style="color:#0a0a0a"><div style="width:100%;display:block;padding:10px 6px;text-align:center;"><img src = "./img/top_menu_intro.png" style="width:40px"><br>서비스 소개</div></a>
			<a onclick="mypage()" style="color:#0a0a0a" style="width:24px;height:24px"><div style="width:100%;display:block;padding:10px 6px;text-align:center;"><img src = "./img/top_menu_sign.png" style="width:40px"><br><span id="top_menu_login">가입/로그인</span></div></a>
	</div>
	<div style="width:100%;text-align:center;margin-top:40px;">
		<div style="display:inline-block;vertical-align:middle;margin-top:15px" class="fb-like" data-href="http://www.facebook.com/critiquers" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>
		<a href="http://www.facebook.com/critiquers" target="_blank" style="display:inline-block;    vertical-align:middle;margin-top:15px"><img src = '/img/fb.png' class="footer_fb" style="width:20px;height:20px;margin-left:10px;margin-top:5px;"></a>
	</div>
</div>
<div id="total_container" style="margin:auto;border:0px solid skyblue">
<!-- header -->
<div id="header_container" style="box-shadow:0 10px 12px -4px rgba(0, 0, 0, 0.35);">
	<div style="width:14%;border:0px solid red;display:inline-block;text-align:center">
	</div><div style="width:72%;display:inline-block;text-align:center">
		<a href="./" style=";"><img class="title_logo" src="img/logo/logo_new.png"></a>
	</div><div style="width:14%;border:0px solid red;display:inline-block;text-align:center">
		<img id="person" src="img/personal.png" style="width:30px;height:30px;padding:6px 6px 3px 6px;cursor:pointer;">
	</div>
	<!--로고-->
</div><!-- headercontainer 종료 -->
 
<div style="margin-top:78px">
	<div style="height:31px;">
		<div style="display:table-cell;height:20px;padding-top:4px;vertical-align:top">
			<div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:9px;margin-left:8px;margin-top:6px"></div><div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:14px;margin-left:1px;margin-top:6px"></div><div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:6px;margin-left:1px;margin-right:3px;margin-top:6px"></div>
		</div>
		<div style="display:table-cell;height:20px;font-weight:bold;padding-top:9px;vertical-align:top">탈퇴하기</div>
	</div>
</div>
<div>
	<div style="padding:0px 10px 6px 31px;line-height:130%;font-size:12px;">탈퇴를 원하시면 아래 버튼을 눌러주세요.<br>탈퇴시 60일간 동일 계정으로 재가입이 허용되지 않습니다.</div>

	<div style="text-align:center;margin-top:150px;margin-bottom:220px"><span style="background-color:#fafafa;border-radius:15px;padding:15px;color:#FFF;box-shadow: 0px 4px 16px 1px rgba(0, 0, 0, 0.35)"><a href = "signout_exe.php" style="color:#000">탈퇴하기</a></span></div>
</div>
<?
include("footer.php");
?>
</div><!--total_container 종료-->
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

$("#person").live("click", function(){
	if ($("#right_panel").css('right') == '-200px') {
		$("#panel_cover").show(0);
		$("#right_panel").animate({ right: '0px' })
	}else{
		$("#panel_cover").hide(500);
		$("#right_panel").animate({ right: '-200px' })
	}
})

function mypage(){
	userid = document.getElementById('userid').value
	if(userid>1){ //로그인 되었을 경우
		window.location.replace('./private.php');
	}else{
		fblogin();
	}
}
</script>
<!--// 기본 스크립트 끝 -->
</head>
<script>(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.3&appId=493328504033025";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
</html>

<?
}//else 종료
?>