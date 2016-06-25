<?
$dateint = $_GET['dateint'];
if($dateint==''){
	$dateint = date("y-m-d");
}
$dateint_yearmonth = date("y-m", strtotime($dateint));
$dateint_start = $dateint_yearmonth."-01";

//다음달의 1일
$dateint_nextmonth = date('Y-m-d', strtotime($dateint_start.'+1 month'));

//전달의 1일
$dateint_prevmonth = date('Y-m-d', strtotime($dateint_start.'-1 month'));

$dateint_year = date("Y", strtotime($dateint));
$dateint_month = date("n", strtotime($dateint));

$date = date('Y-m-d', strtotime('+1 month', strtotime('2015-01-01')));

$month_ago = 
$month_after = 

// 1. 총일수 구하기
$last_day = date("t", strtotime($dateint));

// 2. 시작요일 구하기
$start_week = date("w", strtotime($dateint_yearmonth."-01"));


echo $start_Week;

// 3. 총 몇 주인지 구하기
$total_week = ceil(($last_day + $start_week) / 7);

// 4. 마지막 요일 구하기
$last_week = date('w', strtotime(date($dateint_yearmonth)."-".$last_day));
?>
<table cellpadding='0' cellspacing='1' style="width:100%;height:100%;font-size:14px">
  <tr>
    <td height="50" align="center" colspan="1"><a href="include_calendar.php?dateint=<?=$dateint_prevmonth;?>"><</a></td>
    <td height="50" align="center" colspan="5" style="font-weight:bold;"><?=$dateint_year;?>년 <?=$dateint_month;?>월</td>
    <td height="50" align="center" colspan="1"><a href="include_calendar.php?dateint=<?=$dateint_nextmonth; ?>">></td>
  </tr>
  <tr>
    <td height="30" align="center">일</td>
    <td align="center">월</td>
    <td align="center">화</td>
    <td align="center">수</td>
    <td align="center">목</td>
    <td align="center">금</td>
    <td align="center">토</td>
  </tr>
        
  <?
    // 5. 화면에 표시할 화면의 초기값을 1로 설정
    $day=1;

    // 6. 총 주 수에 맞춰서 세로줄 만들기
    for($i=1; $i <= $total_week; $i++){?>
  <tr>
    <?
        // 7. 총 가로칸 만들기
        for ($j=0; $j<7; $j++){
    ?>
    <td class="datecell" height="30" align="center" style="cursor:pointer">
      <?
        // 8. 첫번째 주이고 시작요일보다 $j가 작거나 마지막주이고 $j가 마지막 요일보다 크면 표시하지 않아야하므로
        //    그 반대의 경우 -  ! 으로 표현 - 에만 날자를 표시한다.
        if (!(($i == 1 && $j < $start_week) || ($i == $total_week && $j > $last_week))){

            if($j == 0){
                // 9. $j가 0이면 일요일이므로 빨간색
                echo "<font color='#FF0000'>";
            }else if($j == 6){
                // 10. $j가 0이면 일요일이므로 파란색
                echo "<font color='#0000FF'>";
            }else{
                // 11. 그외는 평일이므로 검정색
                echo "<font color='#000000'>";
            }

            // 12. 오늘 날자면 굵은 글씨
            if($day == date("j", time($dateint))){
                echo "<b style='font-size:16px'>";
            }
            
            // 13. 날자 출력
            echo $day;

            if($day == date("j", time($dateint))){
                echo "</b>";
            }

            echo "</font>";

            // 14. 날자 증가
            $day++;
        }
        ?>
    </td>
    <?}?>
  </tr>
  <?}?>
</table> 
