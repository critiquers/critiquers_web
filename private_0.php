<?
session_start();
$user_id = $_SESSION['user_id'];
?>
<head>
<meta property="fb:app_id" content="493328504033025" /> 
<meta property="fb:admins" content="685403928"/>
<meta property="og:url" content="http://www.critiquers.org/private_comment.php" />
<meta property="og:title" content="크리티커스 - 언론평가 프로젝트" />
<meta property="og:type" content="article" />
<meta property="og:description"  content="현재까지 <?=number_format($rating_total_count);?>번의 언론평가가 누적되었습니다." />
<meta property="og:image"  content="http://www.critiquers.org/img/logo/logo_fb.png" /> 
</head>
<style type="text/css">
table.announce_table {width:100%;border-spacing:0px;margin-bottom:20px;font-size:14px;border-top:1px solid #C0C0C0;border-bottom:1px solid #C0C0C0;border-right:1px solid #C0C0C0;}
td.announce_first {width:12%;background-color:#DDDDDD;color:#BBBBBB;font-weight:bold;font-size:24px;padding-top:10px;padding-bottom:10px;text-align:center;}
td.announce_second {padding:15px;padding-top:17px;}
td.announce_content {padding:15px;background-color:#fcfcfc;border-left:0px;line-height:170%;font-size:13px;border-top:1px solid #eaeaea;}
td.announce_last{border-top:1px solid #CCCCCC;}
div.announce_date{font-size:11px;color:grey;margin-top:3px;}
div.quit {width:100%;font-size:12px; text-align:right;margin-top:30px;padding:10px;}
a:visited {text-decoration:none;}
</style>
<script type="text/javascript">
  function iframeLoaded() {
      var iFrameID = document.getElementById('idIframe');
      if(iFrameID) {
            // here you can make the height, I delete it first, then I make it again
            iFrameID.height = "";
            iFrameID.height = iFrameID.contentWindow.document.body.scrollHeight + "px";
      }   
  }
</script> 

<div id="body1_m1" style="height:auto;background-color:white">

<div style="width:100%;height:33px;">
	<div style="height:31px;float:left">
		<div style="display:table-cell;height:20px;padding-top:4px;vertical-align:top">
			<div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:9px;margin-left:8px;margin-top:6px"></div><div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:14px;margin-left:1px;margin-top:6px"></div><div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:6px;margin-left:1px;margin-right:3px;margin-top:6px"></div>
		</div>
		<div style="display:table-cell;height:20px;font-weight:bold;padding-top:9px;vertical-align:top">로그아웃</div>
	</div>
</div>

<div style="width:100%;padding:0px 10px 6px 31px;line-height:130%;font-size:12px;">크리티커스 로그인은 페이스북 로그인과 연동됩니다. 페이스북 로그아웃을 원하시면 아래 버튼을 클릭해주세요.</div>
<div class="pagination_show_right" style="margin-left:31px;margin-bottom:30px;border:1px solid #eaeaea;border-radius:4px;cursor:pointer" onclick="privatelogout()">로그아웃</div>


<div style="width:100%;height:33px;">
	<div style="height:31px;float:left">
		<div style="display:table-cell;height:20px;padding-top:4px;vertical-align:top">
			<div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:9px;margin-left:8px;margin-top:6px"></div><div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:14px;margin-left:1px;margin-top:6px"></div><div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:6px;margin-left:1px;margin-right:3px;margin-top:6px"></div>
		</div>
		<div style="display:table-cell;height:20px;font-weight:bold;padding-top:9px;vertical-align:top">공지사항</div>
	</div>
</div>


<table class="announce_table" style="cursor:pointer">
<tr id="announce_title_1">
	<td class="announce_first">></td>
	<td class="announce_second">크리티커스가 임시 오픈합니다.<div class="announce_date">2016-04-30</span></td>
</tr>
<tr id="announce_draw_1" style="display:none">
	<td class="announce_first"></td>
	<td class="announce_content">안녕하세요? 크리티커스가 본격 오픈하기 전 트래픽 및 기능을 점검하기 위해 서비스를 임시 오픈합니다.<br>임시 오픈기간 동안 서비스의 기능과 안정도를 전면적으로 검토할 예정이고, 사용자 여러분의 피드백을 적극 수용하고 반영하고자 합니다.<br>의견이나 제안이 있으시다면, 아래 의견 및 제안 창에 댓글을 남겨주시거나 페이스북 페이지 www.facebook.com/critiquers 혹은 CritiquersContact@gmail.com 으로 연락주시면 대단히 감사드리겠습니다.</td>
<td colspan="2" class="announce_last"></td>
</tr>
</table>


<div style="width:100%;height:33px;">
	<div style="height:31px;float:left">
		<div style="display:table-cell;height:20px;padding-top:4px;vertical-align:top">
			<div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:9px;margin-left:8px;margin-top:6px"></div><div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:14px;margin-left:1px;margin-top:6px"></div><div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:6px;margin-left:1px;margin-right:3px;margin-top:6px"></div>
		</div>
		<div style="display:table-cell;height:20px;font-weight:bold;padding-top:9px;vertical-align:top">의견 및 제안</div>
	</div>
</div>

<div style="width:100%;padding:0px 10px 6px 31px;line-height:130%;font-size:12px;">크리티커스에 대한 의견이나 제안을 남겨주세요.</div>

<div style="width:100%;border-top:1px solid #CCCCCC"></div>

<iframe id="idIframe" onload="iframeLoaded()" src="./private_comment_1.php" style="width:100%;border:0px solid #000000" frameborder="0"></iframe>

<div style="width:100%;border-top:1px solid #CCCCCC"></div>
<br>

<div style="width:100%;height:33px;">
	<div style="height:31px;float:left">
		<div style="display:table-cell;height:20px;padding-top:4px;vertical-align:top">
			<div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:9px;margin-left:8px;margin-top:6px"></div><div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:14px;margin-left:1px;margin-top:6px"></div><div style="display:inline-block;background-color:rgb(245, 199, 150);width:5px;height:6px;margin-left:1px;margin-right:3px;margin-top:6px"></div>
		</div>
		<div style="display:table-cell;height:20px;font-weight:bold;padding-top:9px;vertical-align:top">문의하기</div>
	</div>
</div>
<div style="padding:0px 30px;line-height:150%;font-size:13px"><a href="http://www.facebook.com/critiquers" target="_blank" style="color:#627aad">www.facebook.com/critiquers</a>로 메시지를 보내주시거나, <a href="mailto:CritiquersContact@gmail.com" target="_top" style="color:#627aad">CritiquersContact@gmail.com</a> 으로 메일을 보내주세요.</div>
<div style="clear:both;"></div>
<br>


<div style="padding:0px 30px;line-height:150%;">
</div><!--body1_m1 종료-->
<div class="quit"><a href = "signout.php">탈퇴하기</a></div>
<?
include("footer.php");
?>