<?
session_start();
require("/var/www/html/include_connect.php");

$url = "http://www.critiquers.org";
$user_id = $_SESSION['user_id'];
$sql = "DELETE FROM g_user WEHRE no=$user_id";
//$query = mysql_query($sql);
if($query){
?>
<script type="text/javascript">
alert('탈퇴되었습니다.');
</script>
<meta http-equiv="refresh" content="0; url=<?=$url;?>" />
<?
}
?>