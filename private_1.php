<?php
session_start();
require("/var/www/html/include_connect.php");
$user_id = $_SESSION['user_id'];

// 목록출력부
$sql = "SELECT article_no from c_article_save WHERE user_id='$user_id' ORDER BY no desc";
$sql = $sql." LIMIT 0, 100";
$query = mysql_query($sql, $connect) or die(mysql_error());
while($print = mysql_fetch_array($query)){ //
	$no = $print[0];
	$newslist .=  ",";
	$newslist .= $print[0];
}
$newslist = substr($newslist, 1);
$sql = "SELECT * from b_article_all WHERE no IN($newslist) ORDER by FIND_IN_SET(no, '$newslist')";
?>
<div style="min-height:300px">
<?
//여기까지 sql을 하나로 다 모았다 그 sql에는 limit 구문이 없다
//이제 sql에 limit구문을 붙여서 한페이지 분량의 row를 가져온다
if($newslist == ''){
?>
<div style="clear:both"?>
<div style="width:100%;border-top:1px solid #eaeaea;"></div>
<table articleno="<?=$articleno;?>" class="newslist_table">
<tr>
<td style="padding: 30px;">
아직 스크랩하신 기사가 없습니다.
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
while($print = mysql_fetch_array($resultout)){
$scrollcount = floor(($count-1)/10);
$articleno = $print[0];
$url = $print[1];
$title = $print[2];
$date_int = $print[3];
$categoryno = $print[5];
$media = $print[6];
$media_no = $print[7];
$author = $print[8];
$author_no = $print[9];
$rate_total = $print[10];
$rated_time = $print[11];
if($rated_time>0){
	$or = $rate_total/$rated_time;
}else{
	$or = 0;
}
$avg_rate = round($or*100,0)/100;
$rate = round($or*2,0)/2*10;

$facebook_no = $print[13];
$twitter_no = $print[14];
$repimage = urldecode($print['rep_image']);
if($repimage == 'cqrs_noimage'){
	$repimage = '';
}
//기사 출력부분 호출
$t=1;
include("include_main_news_list_article.php");
//

	$count++;
	} // 기사 목록을 출력하는 부분
?>
<div style="width:100%;border-top:1px solid #eaeaea;"></div>
</div>
</div>
<?
include("footer.php");
?>