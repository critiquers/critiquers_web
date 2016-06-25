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
		/* FB.api('/me/permissions', function(data) {
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
			
		}) */
		connected();
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
	statusChangeCallback(response);
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
function connected(clicked) {
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
			var data = data.split(";");
			var userid = data[0];
			var signoutdate = data[1];
			var signout = data[2];
			if(signout == 'stillban'){ //탈퇴한지 60일 안지난 경우
				$.post("./facebook_logout.php");
					if(clicked == 'clicked'){ //클릭한 경우만 보여준다
						$('.toast_signout').html("탈퇴한 회원은 60일간 재가입할 수 없습니다.<br>"+signoutdate+" 이후 다시 가입하실 수 있습니다.")
						$('.toast_signout').stop().fadeIn(400).delay(8000).fadeOut(400);
						$(".login_bottom").animate({
						bottom: "-=100",
						}, 200);
					}
			}else{ //탈퇴한지 60일 지난 경우
				document.getElementById('userid').value = userid;
				$('#top_menu_login').html('마이페이지')
				$('.toast_normal').html(name+"님으로 로그인되었습니다")
				$('.toast_normal').stop().fadeIn(400).delay(3000).fadeOut(400);
				$(".login_bottom").animate({
				bottom: "-=100",
				}, 200);
			}//탈퇴기간 아님
			}
			//로그인 처리 후 콜백 함수
			//var userid = data;
		});
	})

		//alert(response.name)
	//}, {scope: 'email, user_friends'});
	}, {scope: 'email'});
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

function privatelogout() {
	$.post("./facebook_logout.php");
	FB.logout(function (response) {
	//Do what ever you want here when logged out like reloading the page
	document.getElementById('userid').value = '';
	$('#top_menu_login').html('가입/로그인')
	$.post("./facebook_logout.php");
	});
	alert('로그아웃 되었습니다');
	window.location.href = 'http://www.critiquers.org';
}

function fblogin(clicked){
	FB.login(function (response) {
	//Do what ever you want here when logged out like reloading the page
	//document.getElementById('loggedin_button').style.display = 'none';
	//document.getElementById('loggedout_button').style.display = 'block';
	var clicked2 = clicked;
	if(clicked==''){
		clicked2='none'
	}
	connected(clicked2);
	}, {
		//scope: 'user_friends',
		//auth_type: 'rerequest'
	});
}