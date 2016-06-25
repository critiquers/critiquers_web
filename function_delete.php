<?
session_start();
require("/var/www/html/include_connect.php");
require("/var/www/html/include_variables.php");

$user_id = $_SESSION['user_id'];
$article_no = $_GET['articleno'];
$media_no = $_GET['mediano'];
$category_no = $_GET['categoryno'];

if($article_no > 0 && $media_no > 0){
	if($user_id == 10113){
		$sql = "DELETE FROM b_article_all WHERE no='$article_no'";
		$query = mysql_query($sql, $connect);
		echo $sql;
		echo "<br>";

		$sql = "DELETE FROM b_article_shared_$category_no WHERE no='$article_no'";
		$query = mysql_query($sql, $connect);
		echo $sql;
		echo "<br>";

		$sql = "DELETE FROM z_media_$media_no WHERE no='$article_no'";
		$query = mysql_query($sql, $connect);
		echo $sql;
		echo "<br>";

		$sql = "DELETE FROM b_article_shared_1 WHERE no='$article_no'";
		$query = mysql_query($sql, $connect);
		echo $sql;
		echo "<br>";
	}
}
?>