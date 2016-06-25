<?php
	if($_SESSION['userid'] || $_SESSION['penname']){
		$loggedin = 'true';
	}
	$userid = $_SESSION['userid'];
	$userno = $_SESSION['userno'];
	$penname = $_SESSION['penname'];
	$accounttype = $_SESSION['accounttype'];
        $t = $_GET['t'];
        if(!is_numeric($t)){
            $t = 1;
        }
        $length = strlen($_GET['d']);
        $year = substr($_GET['d'], 0, 4);
        $month = substr($_GET['d'], 4, 2);
        $day = substr($_GET['d'], 6, 2);
	if($length==8 && checkdate($month, $day, $year)){
    	$d = $_GET['d'];
        $year = substr($_GET['d'], 0, 4);
        $month = substr($_GET['d'], 4, 2);
        $day = substr($_GET['d'], 6, 2);
	}else{
    	$d=date("Ymd");
    	$year = substr($d, 0, 4);
    	$month = substr($d, 4, 2);
    	$day = substr($d, 6, 2);
	}
	if(is_numeric($_GET['a'])){
    	$a = $_GET['a'];
	}
	if($_GET['o']==0 || $_GET['o']==1){
    	$o = $_GET['o'];
	}else{
		$o = 0;
	}
	if($_GET['g']){
    	$g = $_GET['g'];
	}else{
    	$g = 0;
	}
	$mktime = mktime();
    if(is_numeric($_GET['al'])){
        $al = $_GET['al'];
    }else{
        $al = 1;
    }
    if(is_numeric($_GET['dl'])){
        $dl = $_GET['dl'];
    }else{
        $dl = 1;
    }
if(is_numeric($_GET['gl'])){
        $gl = $_GET['gl'];
    }else{
        $gl = 1;
    }
    $kw = mysql_escape_string($_GET['kw']); // 검색 키워드를 변수로 선언

if(is_numeric($_GET['go'])){
        $go = $_GET['go'];
    }else{
        $go = 0;
    }
if(is_numeric($_GET['c'])){
        $c = $_GET['c'];
    }else{
        $c = 0;
    }
if(is_numeric($_GET['n'])){
        $n = $_GET['n'];
    }else{
        $n = 0;
    }
$rating_total_count_sql = "SELECT COUNT(*) FROM c_rating";
$rating_total_count_result = mysql_query($rating_total_count_sql);
$rating_total_count = mysql_fetch_array($rating_total_count_result);
$rating_total_count = $rating_total_count[0];
?>