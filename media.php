<?
session_start();
require("/var/www/html/include_connect.php");
require("/var/www/html/include_variables.php");
$date_int = $_GET['date'];
if($date_int==''){
	$date_int = date("Y-m-d");
}
$category = $_GET['category'];
if($category==''){
	$category = 0;
}
$periodno = $_GET['period'];
if($periodno==''){
	$periodno = 3;
}
$media = $_GET['media'];
$author = $_GET['author'];

if($media=='' && $author==''){
	//미디어 변수가 없을 때, 랭킹 페이지를 띄운다
	include('media_1.php');
}else{
	//미디어 변수가 있을 때, 해당 미디어 페이지를 띄운다
	include('media_2.php');
}
?>