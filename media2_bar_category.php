<?
session_start();
require("/var/www/html/include_connect.php");
require("/var/www/html/include_variables.php");

$today = date("Y-m-d");
$date_int = $_GET['date'];
if($date_int == ''){
	$date_int = $today;
}
$category = $_GET['category'];
if($category==''){
	$category = 0;
}
$category_names = array("매체-평점","매체-공유","기자-평점","기자-공유");
$category_names = array("매체", "기자");
$category_howmany = count($category_names);

if($author==''){
	$i = 0;
	$show = $media;
}else{
	$i = 1;
	$show = $media." / ".$author;
}
?>
<div id="barcategory"><div id="li<?=$i;?>" class="categorybar category" data-categoryno="<?=$i?>" style="width:130px"><div class="barcategory_in" style="width:100%;color:#454545<? //border-bottom:2px solid #b94a48 ?>"><? //<img src='./img/media2_category=$i;.png' style='height:16px;'></div>?>
	<div style="padding-top:3px"><b><?=$show;?></b></div></div>
</div>