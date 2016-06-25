<?
session_start();
require("/var/www/html/include_connect.php");
?>
<div style="width:100%;height:40px;margin-top:0px;padding-top:6px;background-color:#fcfcfc">
	<div style="height:31px;float:left">
		<div style="display:table-cell;height:20px;padding-top:4px;vertical-align:top">
			<div style="display:inline-block;background-color:#6b83b2;width:5px;height:9px;margin-left:8px;margin-top:6px"></div><div style="display:inline-block;background-color:#6b83b2;width:5px;height:14px;margin-left:1px;margin-top:6px"></div><div style="display:inline-block;background-color:#6b83b2;width:5px;height:6px;margin-left:1px;margin-right:3px;margin-top:6px"></div>
		</div>
		<div style="display:table-cell;height:20px;font-weight:bold;padding-top:9px;vertical-align:top">이슈모음</div>
	</div>
	<div style="height:31px;float:right">
		<div class="pagination_show_right pagination_show" style="margin-right:4px;border:1px solid #eaeaea;border-radius:4px"><a class="paging"><?=$date_to_show;?> (<?=$yoil_to_show;?>)</a></div>
	</div>
</div>

<div style=";margin-bottom:16px;">

<?
$sql0 = "SELECT * from c_cluster WHERE dateint='$date_int' ORDER BY facebook_total desc";
$resultout0 = mysql_query($sql0);
$cluster_count = 1;
while($print1 = mysql_fetch_array($resultout0)){ // 뉴스 클러스터를 뿌려준다
	$no = $print1[0];
	$facebook_total = $print1[2];
	$articlelist = $print1[3];
	$articlelist_array = explode(',', $articlelist);
	$articlelist_count = sizeof($articlelist_array);
$sql = "SELECT * from b_article_all WHERE no IN($articlelist) ORDER by facebook_no desc";
$count=1;
$resultout = mysql_query($sql);
$numResults = mysql_num_rows($resultout);
if($numResults>10){
	$numResults = 10;
}
while($print = mysql_fetch_array($resultout)){ // 그 클러스터의 기사들을 뿌려준다
$articleno = $print[0];
$url = $print[1];
$title = $print[2];
$article_date_int = $print[3];
$categoryno = $print[5];
$media = $print[6];
$media_no = $print[7];
$author = $print[8];
$author_no = $print[9];
$rate_total = $print[10];
$rated_time = $print[11];
if($rated_time>0){
	$or = $rate_total/$rated_time;
}else{
	$or = 0;
}
$avg_rate = round($or*100,0)/100;
$rate = round($or*2,0)/2*10;
$facebook_no = $print[13];
$twitter_no = $print[14];
$repimage = urldecode($print['rep_image']);
if($repimage == 'cqrs_noimage'){
	$repimage = '';
}
if($count<11){ //100개까지만 게시합니다
if($count == 1){ //클러스터링 제목을 뽑아냅니다 ?>

<? if($cluster_count < 4){ ?>
	<div style="width:100%;background-color:#f3f3f3;border-top:1px solid #e2e2e2;height:12px<?
	if($cluster_count ==1){ echo 'display:none;border:0px;'; }?>"></div><div class="cluster_title" data-t="<?=$t;?>" data-articleno="<?=$articleno;?>" data-categoryno="<?=$category;?>" data-belong="<?=$media;?>" data-author="<?=$author;?>" data-mediano="<?=$media_no;?>" data-authorno="<?=$author_no;?>" data-chartid="<?=$articleno."_".$t;?>" data-dateint="<?=$article_date_int;?>" data-clusterno="<?=$cluster_count;?>">
<? }else{ ?>
	<div class="cluster_title_hidden" style="display:none;width:100%;background-color:#f3f3f3;border-top:1px solid #e2e2e2;height:12px"></div><div style="display:none;" class="cluster_title cluster_title_hidden" data-t="<?=$t;?>" data-articleno="<?=$articleno;?>" data-categoryno="<?=$category;?>" data-belong="<?=$media;?>" data-author="<?=$author;?>" data-mediano="<?=$media_no;?>" data-authorno="<?=$author_no;?>" data-chartid="<?=$articleno."_".$t;?>" data-dateint="<?=$article_date_int;?>" data-clusterno="<?=$cluster_count;?>">
<? } ?>
	<div class="article_info_10" style="display:table-cell;<?if($repimage){?>background: url('<?=$repimage;?>') no-repeat center center;<? }?>background-size:cover;">
		<span class="article_info_11" style="background-color:rgba(107, 131, 178, .78);"><?=$cluster_count;?></span>
	</div>
	<div class="article_info_12" style="display:table-cell;">
		<div class="article_info_13">
		<div style="line-height:140%;min-height:30px;padding-right:7px;color: #5e5966;"><?=$title;?></div>
		</div>

		<div class="newslist_newsbox_span_author"><b style="color:#6b83b2"><?=$articlelist_count;?></b>건의 연관 기사가 <b style="color:#6b83b2"><?=number_format($facebook_total);?></b>번 공유됨</div>
	</div>
</div>

<? } //클러스터링 제목 종료
// -- 기사 목록 --
include('./include_main_news_list_cluster_article.php');
}//if $count
$count++;
$t++;
}// 기사 목록을 출력하는 부분 foreach
?>
<!--<div class="cluster_article_list cluster_<?=$cluster_count;?>" style="border-top:1px solid #eaeaea;margin-bottom:35px;box-shadow: 0 10px 12px -4px rgba(0, 0, 0, 0.35);display:none"></div>-->
<?
$cluster_count++;

}//뉴스 클러스터를 뿌려준다 종료
?>
<div style="width:100%;border-top:1px solid #eaeaea;"></div>
	<div style="width:100%;height:40px;text-align:right">
<? if($cluster_count > 4){ ?>
	<div class="drawdown_cluster"><div style="padding-top:10px">펼쳐보기</div></div>
<? } ?>
	</div>
</div>