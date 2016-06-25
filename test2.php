<?
session_start();
require("/var/www/html/include_connect.php");
require("/var/www/html/include_variables.php");
$today = date("Y-m-d");
$today_time = strtotime($today);
$yesterday = date("Y-m-d", $today_time-1*24*60*60);

$dateint = $yesterday;

$y = date("Y");
$m = date("n");
$j = date("j");
//echo $dateint;
echo "크리티커스에서 좋은 평가를 받은 기사";
echo "<br>";
echo $y."년 ".$m."월 ".$j."일";
echo "<br><br>";
$sql = "SELECT * from b_article_shared_1 WHERE date_int='$dateint' ORDER BY rate_value desc, facebook_no desc LIMIT 0, 10";

$result = mysql_query($sql,$connect);
$i=1;
while($print = mysql_fetch_array($result)){ // 그 클러스터의 기사들을 뿌려준다
	$url = $print['url'];
	$title = html_entity_decode($print['title']);
	$media = $print['media'];
	$rated_time = $print['rated_time'];
	$rate_total = $print['rate_total'];
	$facebook_no = $print['facebook_no'];
	if($rated_time>0){
		$or = $rate_total/$rated_time;
	}else{
		$or = 0;
	}
	$avg_rate = round($or*100,0)/100;
	echo $i.".";
	echo "<br>";
	echo $title;
	echo "<br>";
	echo $url;
	echo "<br>";
	//echo "평점 : ".sprintf("%.2f", $avg_rate)." (".$rated_time.") / 공유수 : ".$facebook_no;
	echo $media." | 평점 : ".$avg_rate." | 공유수 : ".$facebook_no;
	echo "<br> <br>";
	$i++;
}
?>