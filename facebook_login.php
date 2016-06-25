<?
session_start();
require("/var/www/html/include_connect.php");
require("/var/www/html/include_variables.php");

$facebook_id = $_POST['id'];

if($facebook_id == ''){ //받아온 id가 없으면 아무것도 실행시키지 않는다
$_SESSION['facebook_id'] = '';
$_SESSION['user_id'] = '';
}else{ //받아온 id가 있으면 실행시킨다

$sql = "SELECT no, signout_date from g_users WHERE facebook_id = '$facebook_id'";
$result = mysql_query($sql, $connect);
$result_array = mysql_fetch_array($result);
$user1_id = $result_array[0];
$signout_date = $result_array[1];
$signout_date_60days = date("Y-m-d", time()+60*24*60*60);
echo $user1_id;
echo ";";
echo $signout_date_60days;
echo ";";
$date_int = date("Y-m-d");
if($signout_date==NULL || $signout_date_60days<$date_int){  // 60일 지났거나 새로 가입
	$_SESSION['facebook_id'] = $facebook_id;
	$_SESSION['user_id'] = $user1_id;
	echo 'permit';
}else{ //탈퇴한지 60일 안지난 경우
	$_SESSION['facebook_id'] = '';
	$_SESSION['user_id'] = '';
	echo 'stillban';
}
$facebook_email = $_POST['email'];
$facebook_link = $_POST['link'];
$facebook_name = $_POST['name'];
$facebook_gender = $_POST['gender'];
$facebook_verified = $_POST['verified'];

$date_timestamp = date("Y-m-d H:i:s");

$sql = "INSERT INTO `critiquers_kr`.`g_users` (account_type, nickname, facebook_id, facebook_email, facebook_link, facebook_name, facebook_gender, facebook_verified, last_visit_date) VALUES ('facebook', '$facebook_name', '$facebook_id', '$facebook_email', '$facebook_link', '$facebook_name', '$facebook_gender', '$facebook_verified', '$date_timestamp') ON DUPLICATE KEY UPDATE facebook_name='$facebook_name', facebook_email='$facebook_email', facebook_gender='$facebook_gender', facebook_verified='$facebook_verified', last_visit_date='$date_timestamp'";
$query = mysql_query($sql, $connect);

// g_Network에 친구목록을 입력한다
$friends = $facebook_friends[data];
//print_r($friends);
$friends_howmany = count($friends);
$i = 0;

$facebook_id;
$facebook_name;
while($i < $friends_howmany){
	$friend_now = $friends[$i];
	$friend_now_name = $friend_now[name];
	$friend_now_id = $friend_now[id];

	$sql = "SELECT * from g_users WHERE facebook_id = '$facebook_now_id'";
	$result = mysql_query($sql, $connect);
	$result_array = mysql_fetch_array($result);
	$user2_id = $result_array[0];
	if($user2_id=='0'){
		$user2_id = NULL;
	}

	// 작은 id넘버를 user1_id로 설정하여 변수를 저장한다
	if($user1_id > $user2_id){
		$user1_facebook_id = $facebook_id;
		$user2_facebook_id = $friend_now_id;
		$user1_facebook_name =$facebook_name;
		$user2_facebook_name =$friend_now_name;
	}else{
		$tmp = $user1_id;
		$user1_id = $user2_id;
		$user2_id = $tmp;
		$user1_facebook_id = $friend_now_id;
		$user2_facebook_id = $facebook_id;
		$user1_facebook_name = $friend_now_name;
		$user2_facebook_name = $facebook_name;
	}

	//네트워크 Edge 입력
	$sql = "INSERT INTO g_network (user1_id, user2_id, user1_facebook_id, user2_facebook_id, user1_facebook_name, user2_facebook_name) VALUES ('$user1_id', '$user2_id', '$user1_facebook_id', '$user2_facebook_id', '$user1_facebook_name', '$user2_facebook_name') ON DUPLICATE KEY UPDATE user1_facebook_name='$user1_facebook_name', user2_facebook_name='$user2_facebook_name'";
	$query = mysql_query($sql, $connect);
	$i++;
}
}//받아온 id가 있으면 실행시킨다 종료
?>