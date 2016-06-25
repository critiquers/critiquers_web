<?php
ini_set('max_execution_time', 300);
session_start();
require("/var/www/html/include_connect.php");
include_once '/var/www/html/rssdb/Snoopy.class.php';
?>
<meta charset="UTF-8">
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

$url = 'http://www.nocutnews.co.kr/news/4608746';





$html = file_get_contents_curl($url);
//parsing begins here:
$doc = new DOMDocument();
$doc->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8')); // important!
$nodes = $doc->getElementsByTagName('title');
//get and display what you need:
$title = $nodes->item(0)->nodeValue;
$metas = $doc->getElementsByTagName('meta');

echo $html;


mysql_close($connect);
?>