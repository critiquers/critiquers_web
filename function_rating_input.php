<? // 기자 평점을 입력해주는 용도
session_start();
require("/var/www/html/include_connect.php");
require("/var/www/html/include_variables.php");

$user_id = $_SESSION['user_id'];
$facebook_id = $_SESSION['facebook_id'];
$article_no = $_POST['articleno'];
if($article_no){ //유효한 request만 작업한다
$author_no = $_POST['authorno'];
$media_no = $_POST['mediano'];
$categoryno = $_POST['categoryno'];
$facebook_thattime = $_POST['facebook_thattime'];
$facebook_no = $facebook_thattime;
$twitter_thattime = $_POST['twitter_thattime'];
$twitter_no = $twitter_thattime;
$twitter_no = 0;
$rating = $_POST['rate'];
$ip = $_SERVER['REMOTE_ADDR'];
$today = date("Y-m-d");
$date_int = $_POST['dateint'];

if($rating=='none'){ // $rating이 none으로 넘어왔으면, 기존 평가를 지운다.
	$sql = "DELETE from c_rating WHERE user_id='$user_id' AND article_no='$article_no'";
	$query = mysql_query($sql, $connect);
}else{ // 아니면 평가를 입력한다.
	$sql = "INSERT INTO c_rating(user_id, facebook_id, ip_address, date_int, article_no, media_no, author_no, rating, facebook_thattime, twitter_thattime) VALUES('$user_id', '$facebook_id', INET_ATON('$ip'), '$date_int', '$article_no', '$media_no', '$author_no', '$rating', '$facebook_thattime', '$twitter_thattime') ON DUPLICATE KEY UPDATE rating='$rating'";
	$query = mysql_query($sql, $connect);
}
if($query){// 입력 성공
//Article DB의 Rate항목을 업데이트 해준다
//평점을 구한다

$rate_total = 0;
$rated_time = 0;
$sql = "SELECT sum(rating), count(rating) from c_rating where article_no='$article_no'";
$result = mysql_query($sql,$connect);
$result_array = mysql_fetch_array($result);
$rate_total = $result_array[0];
$rated_time = $result_array[1];
if($rated_time > 0){
	$gpa = round($rate_total / $rated_time, 2);
	$gpa = sprintf("%1.2f" ,$gpa);
}else{
	$gpa = 'none';
}

$sql = "SELECT count(rating) from c_rating where article_no='$article_no' AND rating>3";
$result = mysql_query($sql,$connect);
$result_array = mysql_fetch_array($result);
$morethanthree = $result_array[0];

$sql = "SELECT count(rating) from c_rating where article_no='$article_no' AND rating=3";
$result = mysql_query($sql,$connect);
$result_array = mysql_fetch_array($result);
$twoorthree = $result_array[0];

$sql = "SELECT count(rating) from c_rating where article_no='$article_no' AND rating<3";
$result = mysql_query($sql,$connect);
$result_array = mysql_fetch_array($result);
$lessthantwo = $result_array[0];

$sql = "SELECT facebook_no from b_article_all where no='$article_no'";
$result = mysql_query($sql,$connect);
$result_array = mysql_fetch_array($result);
$facebook_no = $result_array[0];

$rate_value = $morethanthree*4 + $twoorthree - 1.5*$lessthantwo;
if($rate_value<0){
	$rate_value = 0;
}
if($facebook_no<10){
	$rate_value = 0;
}

//http://www.wolframalpha.com/input/?i=plot+y%3D1.8%2Barctan%28x-5%29%2F1.5%2C+0%3Cx%3C5%2C+-1%3Cy%3C2
//$rate_value = 1.915601+atan($gpa-5)/1.5;
$snsrate = floor(100*(1.5*33.15*atan(($facebook_no+15)*($twitter_no+15)/10000)+0.000001*($facebook_no+15)*($twitter_no+15)) - 111.885);
//$total_value = -(round($snsrate*$rate_value))-1; //total value는 negative
//$total_value_inv = -1*$total_value; //total value는 positive

/* 평점과 SNS 총점을 업데이트 해준다 */

//b_article_all
$sql1 = "UPDATE b_article_all SET rate_total='$rate_total', rated_time='$rated_time', rate_value='$rate_value' WHERE  no='$article_no'";
$result1 = mysql_query($sql1,$connect);

//b_shared_category
$sql2 = "UPDATE b_article_shared_1 SET rate_total =  '$rate_total', rated_time =  '$rated_time', rate_value =  '$rate_value' WHERE no = '$article_no'";
$result2 = mysql_query($sql2,$connect);

//b_shared_category
$sql3 = "UPDATE b_article_shared_$categoryno SET rate_total =  '$rate_total', rated_time =  '$rated_time', rate_value =  '$rate_value' WHERE no = '$article_no'";
$result3 = mysql_query($sql3,$connect);

//z_media_number
$sql5 = "UPDATE z_media_$media_no SET rate_total =  '$rate_total', rated_time =  '$rated_time', rate_value =  '$rate_value' WHERE no =  '$article_no'";
$result5 = mysql_query($sql5,$connect);

//media update
$time = strtotime($today);
$dateforsql = date('Y-m-d', $time-31*24*60*60);
$sql6 = "SELECT avg(rating), count(rating) from c_rating where media_no='$media_no' AND date_int>='$dateforsql' GROUP BY media_no";
$result6 = mysql_query($sql6,$connect);
$result_array6 = mysql_fetch_array($result6);
$media_avg_rate = $result_array6[0];
$media_rated_time = $result_array6[1];
$sql7 = "UPDATE e_medialist SET avg_rate='$media_avg_rate', rated_time='$media_rated_time' WHERE no='$media_no'";
$result7 = mysql_query($sql7,$connect);

//author update
if($author_no>0){
	$sql8 = "SELECT avg(rating), count(rating) from c_rating where author_no='$author_no' AND date_int>='$dateforsql' GROUP BY author_no";
	$result8 = mysql_query($sql8) or die(mysqli_error($this->db_link));
	$result_array8 = mysql_fetch_array($result8);
	$author_avg_rate = $result_array8[0];
	$author_rated_time = $result_array8[1];
	$sql9 = "UPDATE e_authorlist SET avg_rate='$author_avg_rate', rated_time='$author_rated_time' WHERE no='$author_no'";
	$result9 = mysql_query($sql9,$connect);
}

echo $gpa;
echo ";";
echo $rated_time;
echo ";";
echo $media_avg_rate;
echo ";";
echo $author_avg_rate;
echo ";";
} //입력 성공 종료
}//유효한 request만 작업한다 종료
?>