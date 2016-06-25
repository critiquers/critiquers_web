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
?>
<div id="barcategory"><?
	$width = 100/$category_howmany;
	for ($i=0; $i<$category_howmany; $i++){
	?><div id="li<?=$i;?>" class="categorybar category" data-categoryno="<?=$i?>" style="width:50%"><div class="barcategory_in" style="width:100%"><?

	//echo $category_names[$i];
	echo "<img src='./img/media_category$i.png' style='height:14px;padding-top:2px;'>";

	?></div>
	</div><?
	}
?></div>