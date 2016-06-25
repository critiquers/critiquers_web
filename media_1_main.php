<?
$category=$_GET['category'];
$periodno = $_GET['periodno'];
$date_int = $_GET['dateint'];
$time = strtotime($date_int);
$period_array = array(
"date_int='".date("Y-m-d", $time)."'",
"date_int<='".date("Y-m-d", $time)."' AND date_int>='".date("Y-m-d", $time-3*24*60*60)."'",
"date_int<='".date("Y-m-d", $time)."' AND date_int>='".date("Y-m-d", $time-7*24*60*60)."'",
"date_int<='".date("Y-m-d", $time)."' AND date_int>='".date("Y-m-d", $time-31*24*60*60)."'",
"date_int<='".date("Y-m-d", $time)."' AND date_int>='".date("Y-m-d", $time-31*6*24*60*60)."'",
"date_int<='".date("Y-m-d", $time)."' AND date_int>='".date("Y-m-d", $time-365*24*60*60)."'"
);
$period_string_array = array('1일 간', '3일 간', '7일 간', '한 달 간', '반 년 간', '일 년 간');
if($category=='0'){
	include('./media_1_main_media.php');
}else{
	include('./media_1_main_author.php');
}
?>