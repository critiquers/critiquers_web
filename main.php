<?
require("/var/www/html/include_connect.php");
$t=$_GET['category'];
$periodno=$_GET['periodno'];
$date_int=$_GET['dateint'];
$date_timestamp = strtotime($date_int);
$date_to_show = date("n월 j일", $date_timestamp);
$yoil = array("일","월","화","수","목","금","토");
$period_name = array("실시간","1일간","3일간","7일간","한달간","반년간","일년간");
$yoil_to_show = $yoil[date('w',strtotime($date_int))];

//$sql3 = "SELECT category_explain from f_category WHERE date_int<='$date_int' ORDER by date_int desc LIMIT 0, 1";
//$result3 = mysql_query($sql3) or die(mysqli_error($this->db_link));
//$result_array = mysql_fetch_array($result3);
//$category_explain = $result_array[0];
//$category_explain = explode(',',$category_explain);
$category_explain = array('▩', '전체', '보수', '진보', '중도', '인디', '블로그', '비즈', '소셜');
//$category_howmany = count($category_names);
$category_howmany = 9;
if($category_explain[$t]=='▩'){
	include('main_mark.php');
}else{
if($date_int != date("Y-m-d") && $periodno==0){ //전날의 실시간 카테고리
?>
<div style="width:100%;line-height:120%;font-size:12px;padding:13px 15px 10px 15px;background-color:#efefef">과거 날짜의 실시간 카테고리는 당일 마지막 6시간 동안의 기사를 보여드립니다.</div>
<?
}//전날의 실시간 카테고리 종료
$t=$_GET['category'];
?>


<!-- 메인뉴스 리스트 -->
<div id="newslist" style="min-height:100%;">
<?
$date_int=$_GET['dateint'];
include("./include_main_news_list.php");
?>
</div>
<!-- 메인뉴스 리스트 끝-->
<? } ?>