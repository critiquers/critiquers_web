<?php
ini_set('max_execution_time', 300);
session_start();
require("/var/www/html/include_connect.php");
include_once '/var/www/html/rssdb/Snoopy.class.php';
?>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?
function file_get_contents_curl($url){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	$data = curl_exec($ch);
	curl_close($ch);
	return $data;
}


$url = "http://www.albamon.com/list/gi/mon_gib_read.asp?AL_GI_No=36070357";


$html = file_get_contents_curl($url);
//parsing begins here:
$doc = new DOMDocument();
$doc->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8')); // important!
$nodes = $doc->getElementsByTagName('title');
//get and display what you need:
$title = $nodes->item(0)->nodeValue;
$metas = $doc->getElementsByTagName('meta');
$work_location = array();

for ($i = 0; $i < $metas->length; $i++){
	$meta = $metas->item($i);
	if($meta->getAttribute('property') == 'og:image'){
		if($image==NULL){
			$image = $meta->getAttribute('content');
			break;
		}
	}
}

echo $html;

mysql_close($connect);
?>