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
	$category = 1;
}
$category_howmany = 9;
$category_width = array('15%', '22%', '22%', '22%', '22%', '22%', '25%', '22%', '22%'); //이들의 합은 99
?>

<div id="barcategory" style="overflow:hidden;"><div id="category_move1" class="scrollingHotSpotLeft" style="width:10%;float:left;display:inline-block;background-color:transparent"><div class="barcategory_in" style="width:100%;"><</div></div><div id="barcategory_scroll" style="z-index:99;width:80%;overflow-x: scroll;margin:0px;float:left;"><?
	$width = 100/($category_howmany);
	for ($i=0; $i<$category_howmany; $i++){
	?><div id="li<?=$i;?>" class="li<?=$i;?> categorybar category" data-categoryno="<?=$i?>" style="width:<?=$category_width[$i]; ?>"><div class="barcategory_in" style="width:100%;"><?

	//echo $category_names[$i];
	echo "<img src='./img/category$i.png' style='height:14px;padding-top:2px'>";

	?></div>
	</div><?
	}
?></div><div id="category_move2" class="scrollingHotSpotRight" style="display:inline-block;width:10%;float:right;display:inline-block;background-color:transparent"><div class="barcategory_in" style="width:100%;">></div></div>
</div>