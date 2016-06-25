<!-- 기사 목록 -->
<div style="width:100%;background-color:#f3f3f3;border-top:1px solid #e2e2e2;height:8px"></div><div class="article_list" t="<?=$t;?>" articleno="<?=$articleno;?>" categoryno="<?=$category;?>" belong="<?=$media;?>" author="<?=$author;?>" mediano="<?=$media_no;?>" authorno="<?=$author_no;?>" chartid="<?=$articleno."_".$t;?>" dateint="<?=$article_date_int;?>">
	<div class="article_info_10" style="<?if($repimage){?>background: url('<?=$repimage;?>') no-repeat center center;<? }?>background-size:cover;">
		<span class="article_info_11"><?=$count;?></span>
	</div>
	<div class="article_info_12">
		<div class="article_info_13">
		<a href='<?=$url;?>' class="newslist_a" href='javascript:void()' rel="external" target="_blank" id="newsitem<?=$count?>"><h4 class="newslist_title_h4"><?=$title;?></h4></a>
		</div>

		<span class="newslist_newsbox_span_author"><?=$media;?></span>
		<span class="newslist_stars">
		<img src = "img/new_rating_<?
		//dd
		$img_rate = round($rate*2,0)/2;
		if($rated_time==0){
			echo "none";
		}else{
			echo $img_rate;
		} 
		?>.png" id="ratingstar_to_show_<?=$t;?>_<?=$articleno;?>" class="newslist_stars_img ratingstar_to_show" style="margin-top:-2px;">
		</span>
		<span class="newslist_badge"><small style="color:#FFFFFF"><img class="newslist_fb_img" src="img/ico_fb.png"><?=number_format($facebook_no);?><img class="newslist_tw_img" src="img/ico_star.png"><span id="rated_time_<?=$t;?>_<?=$articleno;?>" class="rated_time"><?=number_format($rated_time);?></span></small></span>
	</div>
</div>
<!-- addon -->
<div id="article_addon_<?=$t;?>_<?=$articleno;?>" class="article_addon" style="display:none;width:100%;">
<!-- 평점 별 -->
<div class="ratingstars" articleno="<?=$articleno;?>" categoryno="<?=$category;?>" belong="<?=$media;?>" author="<?=$author;?>" mediano="<?=$media_no;?>" authorno="<?=$author_no;?>" facebookno="<?=$facebook_no;?>" twitterno="<?=$twitter_no;?>" dateint="<?=$article_date_int;?>" t="<?=$t;?>" chartid="<?=$articleno."_".$t;?>">
	<img class="ratingstars_img" rate="0" src = "img/m_rating00.png"><img class="ratingstars_img" rate="1" src = "img/m_rating10.png"><img class="ratingstars_img" rate="2" src = "img/m_rating20.png"><img class="ratingstars_img" rate="3" src = "img/m_rating30.png"><img class="ratingstars_img" rate="4" src = "img/m_rating40.png"><img class="ratingstars_img" rate="5" src = "img/m_rating50.png" style="border-right:0px;">
</div>
<!-- 통계, 저자 정보, 공유기능 -->
<div class="article_info">
<?
if($_SESSION['user_id'] == 10113){ ?>
	<div style="float:left;"><a onclick="delete_article(<?=$category;?>, <?=$articleno;?>, <?=$media_no;?>)"><img src = "img/delete.png" style="width:12px;height:12px;margin:5px"></a></div>

<? } ?>
	<!-- 가운데 -->
	<div class="article_info_1">
		<div class="article_info_2">
			<div id="chart_<?=$articleno."_".$t;?>" class="ratingchart"></div>
		</div><div class="article_info_3" style="height:96px">
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