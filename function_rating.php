<? //article_list 를 눌렀을 때 언론사 / 기자 평점을 입력해주는 용도
session_start();
require("/var/www/html/include_connect.php");
require("/var/www/html/include_variables.php");
$user_id = $_SESSION['user_id'];
$facebook_id = $_SESSION['facebook_id'];
$media_no = $_POST['mediano'];
$author_no = $_POST['authorno'];
$article_no = $_POST['articleno'];

if($media_no){ //유효한 request만 작업한다

// media_avg_rate를 불러온다
$sql = "SELECT avg_rate, rated_time from e_medialist where no='$media_no'";
$result = mysql_query($sql) or die(mysqli_error($this->db_link));
$result_array = mysql_fetch_array($result);
$media_avg_rate = $result_array[0];
$media_rated_time = $result_array[1];
	if($media_rated_time==0){
		$media_avg_rate = 'none';
	}

// author_avg_rate를 불러온다
if($author_no>0){
	$sql2 = "SELECT avg_rate, rated_time from e_authorlist where no='$author_no'";
	$result2 = mysql_query($sql2) or die(mysqli_error($this->db_link));
	$result_array2 = mysql_fetch_array($result2);
	$author_avg_rate = $result_array2[0];
	$author_rated_time = $result_array2[1];
	if($author_rated_time==0){
		$author_avg_rate = 'none';
	}
}

$sql3 = "SELECT no from c_article_save WHERE user_id='$user_id' AND article_no='$article_no'";
$result3 = mysql_query($sql3) or die(mysqli_error($this->db_link));
$result_array3 = mysql_fetch_array($result3);
$no = $result_array3[0];
if($no){
	$love = 'yes';
}else{
	$love = 'no';
}

$sql4 = "SELECT rating from c_rating WHERE facebook_id='$facebook_id' AND article_no='$article_no'";
$result4 = mysql_query($sql4) or die(mysqli_error($this->db_link));
$result_array4 = mysql_fetch_array($result4);
$myrate = $result_array4[0];

echo $media_avg_rate;
echo ";";
echo $author_avg_rate;
echo ";";
echo $love;
echo ";";
echo $myrate;
}//유효한 request만 작업한다 종료
?>