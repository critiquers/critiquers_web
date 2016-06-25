<?
session_start();
require("/var/www/html/include_connect.php");
require("/var/www/html/include_variables.php");

$user_id = $_SESSION['user_id'];
$article_no = $_POST['articleno'];
$date_int = date("Y-m-d");

$sql3 = "SELECT no from c_article_save WHERE user_id='$user_id' AND article_no='$article_no'";
$result3 = mysql_query($sql3) or die(mysqli_error($this->db_link));
$result_array3 = mysql_fetch_array($result3);
$no = $result_array3[0];
if($no){
	$love = 'yes';
}else{
	$love = 'no';
}

if($love == 'no'){
	$sql = "INSERT IGNORE INTO c_article_save(user_id, article_no, date_int) VALUES ('$user_id', '$article_no', '$date_int')";
	$query = mysql_query($sql, $connect);
	echo "yes";
}else{
	$sql = "DELETE FROM c_article_save WHERE user_id='$user_id' AND article_no='$article_no'";
	$query = mysql_query($sql, $connect);
	echo "no";
}
?>