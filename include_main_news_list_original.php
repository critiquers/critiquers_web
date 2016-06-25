<?
session_start();
require("/var/www/html/include_connect.php");

// 목록출력부
$sql = "SELECT textified_list from b_article_textified_$t WHERE date_int='$date_int' AND period_no='$periodno'";
$query = mysql_query($sql);
$result = mysql_fetch_array($query);
$textified_list = $result[0];
$textified_list_array = array();
$textified_list_array = json_decode($textified_list, true);
?>
<div style="min-height:300px;margin-top:15px;">
<?
$sql = $sql." LIMIT 0, 100";
if($textified_list == '[]' || $textified_list == '' ){ // 아무것도 없을 경우
?>
<div style="clear:both"?>
<div style="width:100%;border-top:1px solid #eaeaea;"></div>
<table articleno="<?=$articleno;?>" class="newslist_table">
<tr>
<td style="padding: 30px;">
선택하신 날짜, 기간, 카테고리에 해당하는<br>기사가 없습니다.
</td>
</tr>
</table>
<? } // 아무것도 없을 경우 종료
$count=1;
foreach($textified_list_array as $print){
if($count<101){
$articleno = $print['no'];
$url = urldecode($print['url']);
$article_date_int = $print['date_int'];
$category = $print['category'];
$title = urldecode($print['title']);
$media = urldecode($print['media']);
$media_no = $print['media_no'];
$author = urldecode($print['author']);
$author_no = $print['author_no'];
//$comment_no = $print[6];
//$link_no = $print[7];
$rate_total = $print['rate_total'];
$rated_time = $print['rated_time'];
if($rated_time>0){
	$or = $rate_total/$rated_time;
}else{
	$or = 0;
}
$rate = round($or*2,0)/2*10;

$facebook_no = $print['facebook_no'];
$twitter_no = $print['twitter_no'];
$repimage = urldecode($print['rep_image']);
if($repimage == 'cqrs_noimage'){
	$repimage = '';
}
$midwidth = strlen($ordernumber);
?>
<table articleno="<?=$articleno;?>" class="newslist_table">
<tr>
<a href='<?=$url;?>' target="_blank" class="newslist_a" class="list-group-item"href='javascript:void()' rel="external" id="newsitem<?=$t."_".$count;?>">
<td class="articletd" t="<?=$t;?>" articleno="<?=$articleno;?>" categoryno="<?=$category;?>" belong="<?=$media;?>" author="<?=$author;?>" mediano="<?=$media_no;?>" authorno="<?=$author_no;?>" chartid="<?=$articleno."_".$t;?>" dateint="<?=$article_date_int;?>" style="<?
if($repimage){
?>background: url('<?=$repimage;?>') no-repeat center center;<?  
}else{?>background: url('http://www.critiquers.org/img/noimagery.png') no-repeat center center;
<?}?>background-size:cover;">
	<?//기사 대표 이미지?>
	<div class="newslist_article_no">
		<span class="label label-warning" class="newslist_span_no"><i><?=$count;?></i></span>
	</div>
</td>
<td class="newslist_newsbox" t="<?=$t;?>" articleno="<?=$articleno;?>" categoryno="<?=$category;?>" belong="<?=$media;?>" author="<?=$author;?>" mediano="<?=$media_no;?>" authorno="<?=$author_no;?>" chartid="<?=$articleno."_".$t;?>" dateint="<?=$article_date_int;?>" style="background-color:white;border-right:1px solid #eaeaea;">
<div class="newslist_newsbox_in">
	  <?//기사제목이랑 언론사명 점수 별점?>
	  <div class="newslist_newsbox_in_in"> 
			<div style="float:left">
			<a href='<?=$url;?>' class="newslist_a" href='javascript:void()' rel="external" target="_blank" class="list-group-item" id="newsitem<?=$count?>"><h4 class="list-group-item-heading" class="newslist_title_h4" style="line-height:1.32"><?
					$title = str_replace("&lt;br&gt;","&nbsp;",$title);
					$title = str_replace("&lt;BR&gt;","&nbsp;",$title);
					echo $title;
					?></h4></a>
			</div>
</div>
</div>
			<div style="clear:both"></div>
			<div class="newslist_newsbox_below">
			<span class="list-group-item-text" class="newslist_newsbox_below_span">
						  <span class="newslist_newsbox_span_author"><!-- onclick="javascript:location.href='./assessment_m.php?belong=<?=$print[9];?>'" --><?=$media;?></span>
			</span>

			<span class="list-group-item-text" class="newslist_stars">
			<img src = "img/new_rating_<?
			//dd
			$img_rate = round($rate*2,0)/2;
			if($rated_time==0){
				echo "none";
			}else{
				echo $img_rate;
			} 
			?>.png" class="newslist_stars_img ratingstar_to_show">
			</span>
			<span class="badge" class="newslist_badge" style="float:right;background-color:#c8c8c8;"><small style="color:#FFFFFF"><img class="newslist_fb_img" src="img/ico_fb.png"><?=number_format($facebook_no);?><img class="newslist_tw_img" src="img/ico_star.png"><span class="rated_time"><?=number_format($rated_time);?></span></small></span>
			</div>
	  </div>
</div>
</td></a>
</tr>
<tr>
<td class="ratingstars" id="ratingstars_<?=$articleno."_".$t;?>" chartid="<?=$articleno."_".$t;?>" articleno="<?=$articleno;?>" categoryno="<?=$category;?>" belong="<?=$media;?>" author="<?=$author;?>" mediano="<?=$media_no;?>" authorno="<?=$author_no;?>" facebookno="<?=$facebook_no;?>" twitterno="<?=$twitter_no;?>" dateint="<?=$article_date_int;?>" colspan=2 align="center" style="border:0px;">
	<div class="rating_stars_div">
		<div style="border:0px">
			<img class="ratingstars_img" rate="0" src = "img/m_rating00.png"><img class="ratingstars_img" rate="1" src = "img/m_rating10.png"><img class="ratingstars_img" rate="2" src = "img/m_rating20.png"><img class="ratingstars_img" rate="3" src = "img/m_rating30.png"><img class="ratingstars_img" rate="4" src = "img/m_rating40.png"><img class="ratingstars_img" rate="5" src = "img/m_rating50.png" style="border-right:0px;">
		</div>
		<div style="width:90%;max-width:360px;border-top:1px solid #e7e7e7;margin-bottom:3px"></div>
		<div style="width:90%;max-width:360px;text-align:center;">
			  <table>
			  <tr>
			  <td rowspan="2" id="chart_<?=$articleno."_".$t;?>" style="width:37%;border-right:0px solid #e7e7e7;">
					<div id="chart_<?=$articleno."_".$t;?>" class="ratingchart" style="width:100%; height:100%;"></div>
			  </td>
			 <td style="width:35%;height:50%;border-right:0px solid #e7e7e7;font-size:13px;padding:7px;">
					<img src = "img/new_rating_none.png" class="newslist_stars_img ratingstar_to_show_media" style="margin:0px;margin-right:3px;float:left"><div style="margin-left:4px;margin-top:-1px"><em class="media_rate">0.00</em></div>
					<div style="width:100px;height:16px;white-space: nowrap;overflow:hidden;text-overflow:ellipsis;color:#716b7a;"><a href="./media.php?media=<?=$media;?>" style="color:gray;"><?=$media;?></a></div>
			  </td>
			  <td rowspan="2" style="width:28%;padding:2px 3px 4px 4px;">
				<img class="ratingstars_function kakao_share" src="img/link_kakao.png" url="<?=rawurlencode($url);?>" linktitle="<?=rawurlencode($title);?>"><img class="ratingstars_function article_save" articleno="<?=$articleno;?>" src="img/folder.png" style="border-right:0px;"><img class="ratingstars_function" src="img/link_twitter.png" onclick="window.open('https://twitter.com/intent/tweet?text=<?=urlencode($title);?>&url=<?=$url;?>', '_blank')"><img class="ratingstars_function" src="img/link_facebook.png" onclick="window.open('http://www.facebook.com/sharer/sharer.php?u=<?=urlencode($url);?>&title=<?=urlencode($title);?>', '_blank')">
			  </td>
			  </tr>
			  <tr>
			  <td style="width:35%;height:50%;font-size:13px;border-top:1px solid #e7e7e7;border-right:0px solid #e7e7e7;padding:7px;">
			  <? if($author){ ?>
					<img src = "img/new_rating_none.png" class="newslist_stars_img ratingstar_to_show_author" style="margin:0px;float:left;margin-right:3px;"><div style="margin-left:4px;margin-top:-1px"><em class="author_rate">0.00</em></div>
					<div style="width:100px;height:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#716b7a;"><a href="./media.php?media=<?=$media;?>&author=<?=$author;?>" style="color:gray;"><?=$author;?></a></div>
			  <? } ?>
			  </td>
			  </tr>
			  </table>
		</div>
	</div>
</td>
</tr>
</table>
<?
	}//if $count
$count++;
} // 기사 목록을 출력하는 부분 foreach
?>
<div style="width:100%;border-top:1px solid #eaeaea;"></div>
</div>
</div>
<?
include("footer.php");
?>