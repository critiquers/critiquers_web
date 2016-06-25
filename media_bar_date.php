<div id="bardate" style="text-align:center;padding:0px;margin-bottom:30px;">
<?
$yoil = array("일","월","화","수","목","금","토");
$today = date("Y-m-d");
$today_time = strtotime($today);
$yesterday = date("Y-m-d", $today_time-1*24*60*60);
$yesterday2 = date("Y-m-d", $today_time-2*24*60*60);
$date_int = $_GET['date'];
$showdate = $_GET['showdate'];
if($date_int == ''){
	$date_int = $today;
}
if($showdate == ''){
	$showdate = $today;
}
$date_int_time = strtotime($showdate);
$date_yesterday = date("Y-m-d", $date_int_time-1*24*60*60);
$date_yesterday2 = date("Y-m-d", $date_int_time-2*24*60*60);
$date_yesterday5 = date("Y-m-d", $date_int_time-5*24*60*60);
$date_yesterday7 = date("Y-m-d", $date_int_time-7*24*60*60);
$date_tomorrow = date("Y-m-d", $date_int_time+1*24*60*60);
$date_tomorrow2 = date("Y-m-d", $date_int_time+2*24*60*60);
$date_tomorrow5 = date("Y-m-d", $date_int_time+5*24*60*60);
$date_tomorrow7 = date("Y-m-d", $date_int_time+7*24*60*60);

if($showdate>=$yesterday2){ //오늘부터 보여주는 경우
	$startdate = $today; ?>
	<div style="width:180px;text-align:center;margin:auto;">
		<div data-showdate="<?=$showdate;?>" data-dateint="<?=$date_yesterday8;?>" style="display:inline-block;width:50px;height:50px;padding:0px;text-align:center;margin:auto;font-weight:bold;";><img src="./img/date_up_gray.png" style="display:inline-block;width:50px;" title="이전 날짜 보기"></div>
	</div>
<div class="box1" style="display:inline-block;width:184px;height:156px;margin:auto;"><div class="box2" style="display:table-cell;height:156px;width:127px;padding:0px;vertical-align:top"><?
		for($i=0;$i<5;$i++){
			$date_int_time = strtotime($startdate);
			$datenow = date("Y-m-d", $date_int_time-$i*24*60*60);
			$yoil_to_show = $yoil[date('w',strtotime($datenow))];
			?><div class="categorydate" data-showdate="<?=$datenow;?>" data-dateint='<?=$datenow;?>' style="display:block;vertical-align:top;width:100%;padding:13px;border:1px solid #cacaca;border-bottom:0px;text-align:center;cursor:pointer;margin:0px;background-color:#fafafa;border-radius:0px;padding:0px;margin:0px;background-color:#fafafa;<?
			if($i==0){
				echo "border-radius:10px 10px 0px 0px;";
			}else if($i==4){
				echo "border-radius:0px 0px 10px 10px;border-bottom:1px solid #cacaca;";
			}
			if($datenow == $date_int){
				echo "background-color:#f0f0f0;font-weight:bold;";
			}
			?>"><div style="display:block;vertical-align:top;width:180px;height:30px;margin:0px;padding-top:9px;"><?=$datenow;?> (<?=$yoil_to_show;?>)</div></div><?
		} //for문 종료
	?></div>
</div>
<!-- down mark -->
<div class="datemove" data-showdate="<?=$date_yesterday7;?>" data-dateint="<?=$date_int;?>" style="width:180px;padding:0px;text-align:center;margin:auto;"><img src="./img/date_down.png" style="width:50px;cursor:pointer;" title="다음 날짜 보기"></div>


<? }else{ //그보다 더 과거인 경우


	$startdate = $date_tomorrow2;?>
	<div class="datemove" data-showdate="<?=$date_tomorrow5;?>" data-dateint='<?=$date_int;?>' style="width:125px;height:50px;padding:0px;text-align:center;margin:auto;bold;";><img src="./img/date_up.png" style="width:50px;cursor:pointer;" title="이전 날짜 보기"></div>
<div class="box1" style="display:inline-block;width:184px;height:156px;margin:auto;"><div class="box2" style="display:table-cell;height:156px;width:127px;padding:0px;vertical-align:top"><?
		for($i=0;$i<5;$i++){
			$date_int_time = strtotime($startdate);
			$datenow = date("Y-m-d", $date_int_time-$i*24*60*60);
			$yoil_to_show = $yoil[date('w',strtotime($datenow))];
			?><div class="categorydate" data-showdate='<?=$datenow;?>' data-dateint='<?=$datenow;?>' style="display:block;vertical-align:top;width:100%;padding:13px;border:1px solid #cacaca;border-bottom:0px;text-align:center;cursor:pointer;margin:0px;background-color:#fafafa;border-radius:0px;padding:0px;margin:0px;background-color:#fafafa;<?
			if($i==0){
				echo "border-radius:10px 10px 0px 0px;";
			}else if($i==4){
				echo "border-radius:0px 0px 10px 10px;border-bottom:1px solid #cacaca;";
			}
			if($datenow == $date_int){
				echo "background-color:#f0f0f0;font-weight:bold;";
			}
			?>"><div style="display:block;vertical-align:top;width:180px;height:30px;margin:0px;padding-top:9px;"><?=$datenow;?> (<?=$yoil_to_show;?>)</div></div><?
		} //for문 종료
	?></div>
</div>
<!-- down mark -->
<div class="datemove" data-showdate="<?=$date_yesterday5;?>" data-dateint="<?=$date_int;?>" style="width:180px;padding:0px;text-align:center;margin:auto;"><img src="./img/date_down.png" style="width:50px;cursor:pointer;" title="다음 날짜 보기"></div>
<? } //그보다 더 과거 종료 ?>
</div>