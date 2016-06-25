<?
session_start();
require("/var/www/html/include_connect.php");
require("/var/www/html/include_variables.php");
$category = 1;
$user_id = $_SESSION['user_id'];
if($user_id<2){ //로그인 안된 경우는 메인으로 튕궈라
?>
<meta http-equiv="refresh" content="0; url=./" />
<? }else{ // 로그인 된 경우만
$date_int = date("Y-m-d");
$sql = "UPDATE g_users SET signout_date = '$date_int' WHERE no= '$user_id'";
$query = mysql_query($sql);
$user_id = NULL;
$_SESSION = array();
// sends as Set-Cookie to invalidate the session cookie
if (isset($_COOKIE[session_name()])) { 
    $params = session_get_cookie_params();
    setcookie(session_name(), '', 1, $params['path'], $params['domain'], $params['secure'], isset($params['httponly']));
}
session_destroy();
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
<!-- 기본 스크립트 -->
<script type="text/javascript" src="jindo/jindo.all.ns.js" charset="utf-8"></script>
<script type="text/javascript" src="jindo/jindo_mobile_component.js"></script>
<script type="text/javascript" src="jindo/jquery-1.9.1.min.js" charset="utf-8"></script>
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/d3.js"></script>
<script type="text/javascript" src="js/d3.min.js"></script>
<script src="js/kakao.min.js"></script>
<!--GoogleAnalytics-->
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-48747835-1', 'critiquers.org');
ga('send', 'pageview');
<!--// facebook 스크립트 -->
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response.status);
	// The response object is returned with a status field that lets the
	// app know the current login status of the person.
	// Full docs on the response object can be found in the documentation
	// for FB.getLoginStatus().
	if (response.status === 'connected') {
		// Logged into your app and Facebook.
		FB.api('/me/permissions', function(data) {
			var array=eval(data);
			friends_granted = array.data[1].status;
			if(friends_granted=='declined'){
				alert("\n회원님\n\n크리티커스에서는 조직적인 평가 조작을 방지하기 위해 회원분들의 친구목록을 수집하고 있습니다.\n\n개인정보보호를 위해 모든 개인식별정보는 난수화되어 처리되오니, 수집에 동의해주시면 대단히 감사드리겠습니다. 크리티커스를 이용해주셔서 매번 깊이 감사드립니다.\n\n크리티커스팀 드림\n")
				FB.login(function (response) {
				connected();
				}, {
					scope: 'user_friends',
					auth_type: 'rerequest'
				});
			}else{
				connected();
			}
			
		})
//		} else if (response.status === 'not_authorized') {
//			// The person is logged into Facebook, but not your app.
//			document.getElementById('status').innerHTML = 'Please log ' +
//				'into this app.';
	} else {
		document.getElementById('userid').value = '';
		// The person is not logged into Facebook, so we're not sure if
		// they are logged into this app or not.
		//document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
	}
}

// This function is called when someone finishes with the Login
// Button. See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

window.fbAsyncInit = function() {
FB.init({
	appId: '493328504033025',
	cookie: true,	// enable cookies to allow the server to access 
			// the session
	xfbml: true,	// parse social plugins on this page
	version: 'v2.5' // use version 2.2
});
// Now that we've initialized the JavaScript SDK, we call 
// FB.getLoginStatus().	This function gets the state of the
// person visiting this page and can return one of three states to
// the callback you provide.	They can be:
//
// 1. Logged into your app ('connected')
// 2. Logged into Facebook, but not your app ('not_authorized')
// 3. Not logged into Facebook and can't tell if they are logged into
//		your app or not.
//
// These three cases are handled in the callback function.

FB.getLoginStatus(function(response) {
//	statusChangeCallback(response);
});
};
// Load the SDK asynchronously
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/ko_KR/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.	See statusChangeCallback() for when this call is made.
function connected() {
	console.log('Welcome! Fetching your information.... ');
	FB.api('/me', function(response) {
		console.log('Successful login for: ' + response.name);
		id = response.id;
		email = response.email;
		link = response.link;
		name = response.name;
		gender = response.gender;
		verified = response.verified;

	FB.api('/me/friends', function(data) {
	var friends = data;
		$.post("./facebook_login.php", { "id": id, "email": email, "link": link, "name": name, "gender": gender, "friends": friends, "verified": verified},
		function (data){
			if(data == ''){
			document.getElementById('userid').value = '';
			}else{
			current_userid = document.getElementById('userid').value;
			document.getElementById('userid').value = data;
				$('#top_menu_login').html('마이페이지')
				$('.toast').html(name+"님으로 로그인되었습니다")
				$('.toast').stop().fadeIn(400).delay(3000).fadeOut(400);
				$("div.login_bottom").animate({
				bottom: "-=100",
				}, 200);
			}
			//로그인 처리 후 콜백 함수
			//var userid = data;
		});
	})

		//alert(response.name)
	}, {scope: 'email, user_friends'});
}
function fblogout() {
	FB.logout(function (response) {
	//Do what ever you want here when logged out like reloading the page
	document.getElementById('loggedin_button').style.display = 'none';
	document.getElementById('loggedout_button').style.display = 'block';
	document.getElementById('userid').value = '';
	$('#top_menu_login').html('가입/로그인')
	$.post("./facebook_logout.php");
	});
}

function fblogin(){
	FB.login(function (response) {
	//Do what ever you want here when logged out like reloading the page
	//document.getElementById('loggedin_button').style.display = 'none';
	//document.getElementById('loggedout_button').style.display = 'block';
	connected();
	}, {
		scope: 'user_friends',
		auth_type: 'rerequest'
	});
}
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

$(window).scroll(function() {
	$('#top_menu').hide();
});
$("a#a_menu").live("click", function(e){
	if ($('#top_menu').css('display') == 'none') {
		$('#top_menu').show();
	}else{
		$('#top_menu').hide();
	}
})
</script>
<link type="text/css" rel="stylesheet" href="css/default.css" />
<!--// 기본 스크립트 끝 -->
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
<input type="hidden" id="center_div_id" name="center_div_id" value="" style="margin-top:220px"/><!-- center_div_id 변수 -->
<input type="hidden" id="userid" name="userid" value=""/><!-- userid 변수 -->
<input type="hidden" id="dateint" name="dateint" value="<?=$date_int;?>" /><!-- date 변수 -->
<input type="hidden" id="periodno" name="periodno" value="<?=$periodno;?>" /><!-- period 변수 -->
<input type="hidden" id="categoryno" name="categoryno" value="<?=$category;?>" /><!-- category 변수 -->
<input type="hidden" id="categoryno_prev" name="categoryno_prev" value="0" style="width:30px"/>
<input type="hidden" id="categoryno_cur" name="categoryno_cur" value="<?=$category;?>" style="width:30px"/>
<input type="hidden" id="categoryno_next" name="categoryno_next" value="0" style="width:30px"/>

<input type="hidden" id="ip" name="ip" value="<?=$_SERVER['REMOTE_ADDR'];?>" /><!-- 접속자의 ip -->
</form>

<div id="total_container" style="margin:auto;border:0px solid skyblue">
<!-- header -->
<div id="header_container" style="margin:0px;box-shadow: 0 10px 12px -4px rgba(0, 0, 0, 0.35);">
	<div id="top_menu">
		<div style="width:100%;text-align:center;font-size:11px;">
			<div style="display:inline-block;margin:0px 15px 0px 0px"><a href="./"><img src = "./img/top_menu_home.png" style="width:40px"><br>메인화면</a></div><div style="display:inline-block;margin:0px 15px 0px 15px"><a href="./about.php"><img src = "./img/top_menu_guide.png" style="width:40px"><br>소개</a></div><div style="display:inline-block;margin:0px 15px 0px 15px"><a href="http://www.facebook.com/Critiquers" target="_blank"><img src = "./img/top_menu_fb.png" style="width:40px"><br>페이스북</a></div><div style="display:inline-block;margin:0px 0px 0px 15px"><a onclick="mypage()" style="cursor: pointer;"><img src = "./img/top_menu_sign.png" style="width:40px"><br><span id="top_menu_login">가입/로그인</span></a></div>
		</div>
	</div>
	<div style="height:100%;padding-left:15px;float:left">
		<a href="./" style=";"><img src="img/logo/logo_new.png" style="height:36px;margin:8px 0px 4px 0px;"></a>
	</div>
	<div style="height:100%;float:right;">
		<div class="menu_selector">
			<a href="./" target="_self">뉴스</a>
		</div>
		<div class="menu_selector">
			<a href="./media.php" target="_self">매체</a>
		</div>
		<div class="menu_selector menu_selector_active">
			<a id="a_menu"><img src="img/menu.png" style="width:20px;height:10px;padding-top:10px"></a>
		</div>	
	</div>
	<!--로고-->
</div><!-- headercontainer 종료 -->
<div style="padding-top:50px">
	<div style="height:31px;">
		<div style="display:table-cell;height:20px;padding-top:4px;vertical-align:top">
			<div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:9px;margin-left:8px;margin-top:6px"></div><div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:14px;margin-left:1px;margin-top:6px"></div><div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:6px;margin-left:1px;margin-right:3px;margin-top:6px"></div>
		</div>
		<div style="display:table-cell;height:20px;font-weight:bold;padding-top:9px;vertical-align:top">탈퇴하기</div>
	</div>
</div>
<div>
	<div style="padding:0px 10px 6px 31px;line-height:130%;font-size:12px;">탈퇴를 원하시면 아래 버튼을 눌러주세요.<br>탈퇴시 60일간 동일 계정으로 재가입이 허용되지 않습니다.</div>

	<div style="text-align:center;margin:auto;margin-top:150px;margin-bottom:220px;font-size:12px"><div style="background-color:#fafafa;margin:auto;line-height:160%;border-radius:15px;width:230px;padding:15px;color:#FFF;box-shadow: 0px 4px 16px 1px rgba(0, 0, 0, 0.35);color:#000000">탈퇴되었습니다.<br>그동안 사용해주셔서 감사합니다.</div></div>
</div>
<?
include("footer.php");
?>
</div><!--total_container 종료-->
</body>
</html>

<?
}//else 종료
?>