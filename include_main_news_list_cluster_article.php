<!-- 기사 목록 -->
<a href='<?=$url;?>' class="newslist_a" href='javascript:void()' rel="external" target="_blank" id="newsitem<?=$count?>"><div class="article_list cluster_<?=$cluster_count;?> cluster_article_list" data-t="<?=$t;?>" data-articleno="<?=$articleno;?>" data-categoryno="<?=$category;?>" data-belong="<?=$media;?>" data-author="<?=$author;?>" data-mediano="<?=$media_no;?>" data-authorno="<?=$author_no;?>" data-chartid="<?=$articleno."_".$t;?>" data-dateint="<?=$article_date_int;?>" style="display:none;<?
	if($count==1){
		echo "-webkit-box-shadow: inset 0 20px 20px -20px rgba(0,0,0,0.35);-moz-box-shadow: inset 0 20px 20px -20px rgba(0,0,0,0.35);box-shadow: inset 0 20px 20px -20px rgba(0,0,0,0.35);";
	}else if($count==$numResults){
		echo "-webkit-box-shadow: inset 0 -20px 20px -20px rgba(0,0,0,0.35);-moz-box-shadow: inset 0 -20px 20px -20px rgba(0,0,0,0.35);box-shadow: inset 0 -20px 20px -20px rgba(0,0,0,0.35);";
	}
	?>">
	<div style="display:inline-block;vertical-align:top;width:10%;color:#0a0a0a;padding-left:3px;text-align:center;margin:0px;font-size:15px;margin-top:3px;"><?=$count;?>.</div><div style="display:inline-block;vertical-align:top;width:63%;padding:7px;padding-left:0px;padding-top:5px;margin:0px">
		<div style="font-size:11px;color:#666666;margin-bottom:4px;padding-left:1px;padding-right:7px"><?=$media;?><? if($author){ echo " | ".$author; } ?></div>
		<div style="width:100%;line-height:140%;min-height:30px;padding-right:1px;"><?=$title;?></div>
		<div style="font-size:11px;padding:7px;padding-left:0px;padding-bottom:3px;padding-top:10px;">
			<div class="newslist_badge" style="display:table-cell;vertical-align:top;height:14px;">
				<div style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left"><img src="img/ico_fb.png" style="width:9px;height:9px;margin: 0px 2px 0px 0px;"></div>
				<div style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left"><?=number_format($facebook_no);?></div>
				<div style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left;margin-left:4px"><img src="img/ico_str.png" style="width:9px;height:9px;margin: 0px 2px 0px 0px;"></div>
				<div id="rated_time_<?=$t;?>_<?=$articleno;?>" class="rated_time" style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left"><?=number_format($rated_time);?></div>
			</div>
		</div>
		<? if($rated_time>0){ ?>
		<div style="font-size:11px;padding:7px;padding-left:0px;padding-top:0px">
			<div class="newslist_badge" style="display:table-cell;vertical-align:top;height:14px;">
				<div style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left">
					<img src = "img/new_rating_<?
					//dd
					$img_rate = round($rate*2,0)/2;
					if($rated_time==0){
						echo "none";
					}else{
						echo $img_rate;
					} 
					?>.png" id="ratingstar_to_show_<?=$t;?>_<?=$articleno;?>" class="newslist_stars_img ratingstar_to_show" style=";margin-top:-2px;float:none">
				</div>
				<div style="display:inline-block;padding-top:0px;border:0px solid blue;height:9px;float:left">
						<?=sprintf("%.2f", $avg_rate); ?>
				 </div>
			</div>
		</div>
		<? } ?>
	</div>	<div style="display:inline-block;position:relative;text-align:center;vertical-align:top;width:25%;max-height:80px;margin:0px">
		<div style="margin-top:100%">
			<div style="position:absolute;top:0;bottom:0;left:0;right:0;display:table-cell;border:0px solid blue;width:100%;max-width:160px;height:100%;background: url('<?=$repimage;?>') no-repeat center center;background-size:cover;float:right;"></div>
		</div>
	</div>
</div></a>

<!-- addon -->
<div id="article_addon_<?=$t;?>_<?=$articleno;?>" class="article_addon" style="display:none;width:100%;background-color:#f1f1f1">
<!-- 평점 별 -->
<div class="ratingstars" articleno="<?=$articleno;?>" categoryno="<?=$category;?>" belong="<?=$media;?>" author="<?=$author;?>" mediano="<?=$media_no;?>" authorno="<?=$author_no;?>" facebookno="<?=$facebook_no;?>" twitterno="<?=$twitter_no;?>" dateint="<?=$article_date_int;?>" t="<?=$t;?>" chartid="<?=$articleno."_".$t;?>" style="background-color:#f1f1f1">
	<img class="ratingstars_img" rate="0" src = "img/m_rating00.png"><img class="ratingstars_img" rate="1" src = "img/m_rating10.png"><img class="ratingstars_img" rate="2" src = "img/m_rating20.png"><img class="ratingstars_img" rate="3" src = "img/m_rating30.png"><img class="ratingstars_img" rate="4" src = "img/m_rating40.png"><img class="ratingstars_img" rate="5" src = "img/m_rating50.png" style="border-right:0px;">
</div>
<!-- 통계, 저자 정보, 공유기능 -->
<div class="article_info" style="background-color:#f1f1f1">
<?
if($_SESSION['user_id'] == 10113){ ?>
	<div style="float:left;"><a onclick="delete_article(<?=$category;?>, <?=$articleno;?>, <?=$media_no;?>)"><img src = "img/delete.png" style="width:12px;height:12px;margin:5px"></a></div>

<? } ?>
	<!-- 가운데 -->
	<div class="article_info_1">
		<div class="article_info_2">
			<div id="chart_<?=$articleno."_".$t;?>" class="ratingchart"></div>
		</div><div class="article_info_3" style="height:94px">
			<div class="article_info_4" style="">
				<div class="article_info_5"><img src ="img/new_rating_none.png" id="ratingstar_to_show_media_<?=$t;?>_<?=$articleno;?>" class="newslist_stars_img"><em id="media_rate_<?=$t;?>_<?=$articleno;?>" class="media_rate">0.00</em></div>
				<div class="article_info_6"><a href="./media.php?media=<?=$media;?>" class="article_info_7" title="<?=$media;?>"><?=$media;?></a></div>
			</div>
			<div class="article_info_8">
				<? if($author){ ?>
						<div class="article_info_5"><img src = "img/new_rating_none.png" id="ratingstar_to_show_author_<?=$t;?>_<?=$articleno;?>" class="newslist_stars_img"><em id="author_rate_<?=$t;?>_<?=$articleno;?>" class="author_rate">0.00</em></div>
						<div class="article_info_6"><a href="./media.php?media=<?=$media;?>&author=<?=$author;?>" class="article_info_7" title="<?=$author;?>"><?=$author;?></a></div>
				<? } ?>
			</div>
		</div><div class="article_info_9">
			<img class="ratingstars_function kakao_share" src="img/link_kakao.png" url="<?=rawurlencode($url);?>" linktitle="<?=rawurlencode($title);?>"><img class="ratingstars_function article_save" articleno="<?=$articleno;?>" src="img/folder.png" style="border-right:0px;"><img class="ratingstars_function" src="img/link_twitter.png" onclick="window.open('https://twitter.com/intent/tweet?text=<?=urlencode($title);?>&url=<?=$url;?>', '_blank')"><img class="ratingstars_function" src="img/link_facebook.png" onclick="window.open('http://www.facebook.com/sharer/sharer.php?u=<?=urlencode($url);?>&title=<?=urlencode($title);?>', '_blank')">
		</div>
	</div>
	<!-- 가운데 종료 -->
</div>
</div> <!-- addon 종료 -->