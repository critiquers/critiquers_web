<?
session_start();
require("/var/www/html/include_connect.php");

$url = urldecode($_GET['url']);
$article_no = $_GET['articleno'];
$user_id = $_SESSION['user_id'];
$date_int = date("Y-m-d");
if($user_id!=''){
$sql = "INSERT INTO c_article_read (user_id, article_no, date_int) VALUES ('$user_id', '$article_no', '$date_int')";
$query = mysql_query($sql);
}
?>
<meta http-equiv="refresh" content="0; url=<?=$url;?>" />