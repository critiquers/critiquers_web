<?
session_start();
require("/var/www/html/include_connect.php");

// 목록출력부
$sql = "SELECT textified_list from b_article_textified_$t WHERE date_int='$date_int' AND period_no='$periodno'";
$query = mysql_query($sql);
$result = mysql_fetch_array($query);
$textified_list = $result[0];
$textified_list_array = array();
$textified_list_array = json_decode($textified_list, true);
?>
<div style="min-height:600px;margin-top:0px;background-color:#f3f3f3">
<?
$sql = $sql." LIMIT 0, 100";
if($textified_list == '[]' || $textified_list == '' ){ // 아무것도 없을 경우
?>
	<div style="clear:both"?>
		<div style="width:100%;border-top:1px solid #eaeaea;"></div>
			<div style="padding: 30px;color:#0a0a0a;background-color:#fcfcfc;line-height:1.5">
			선택하신 날짜, 기간, 카테고리에<br>해당하는 기사가 없습니다.
			</div>
<? } // 아무것도 없을 경우 종료
$count=1;
foreach($textified_list_array as $print){
if($count<101){
$scrollcount = floor(($count-1)/10);
$articleno = $print['no'];
$url = urldecode($print['url']);
$article_date_int = $print['date_int'];
$category = $print['category'];
$title = urldecode($print['title']);
$title = str_replace("&lt;br&gt;","&nbsp;",$title);
$title = str_replace("&lt;BR&gt;","&nbsp;",$title);
$title = str_replace("&nbsp;&nbsp;","&nbsp;",$title);
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
include("include_main_news_list_article.php");
//

}//if $count
$count++;
} // 기사 목록을 출력하는 부분 foreach
?>
<div style="width:100%;border-top:1px solid #eaeaea;"></div>
</div>
</div>
<?
include("footer.php");
?>