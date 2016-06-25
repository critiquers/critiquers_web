function tab(a){
document.getElementById("tab1").style.display = 'none';
document.getElementById("tab2").style.display = 'none';
document.getElementById("tab3").style.display = 'none';
document.getElementById("tab4").style.display = 'none';
document.getElementById("tab"+a).style.display = 'block';
document.getElementById("t").value = a;
}

function tab_assessment(a){
document.getElementById("tab1").style.display = 'none';
document.getElementById("tab2").style.display = 'none';
document.getElementById("tab3").style.display = 'none';
document.getElementById("tab4").style.display = 'none';
document.getElementById("tab"+a).style.display = 'block';
}

function tab_assessment_move(a){
document.getElementById("t").value = a;
document.locator.submit();
}

function categorymove(a){
document.getElementById("c").value = a;
document.getElementById("a").value = '';
document.getElementById("al").value = '';
document.getElementById("t").value = '';
document.locator.submit();
}

function logintab(a){
document.getElementById	("headerright1").style.display = 'none';
document.getElementById("headerright2").style.display = 'none';
document.getElementById("headerright"+a).style.display = 'block';
}

function articleview(){
document.getElementById("articleview").style.display = 'block';
}

function groupview(a){
document.getElementById("g").value = a;
document.getElementById("a").value = '';
document.getElementById("al").value = '';
document.locator.submit();
}

function articleview_close(t, belongwhere){
//document.getElementById("articleview").style.display = 'none';
document.getElementById("a").value = '';
document.getElementById("t").value = t;
if(belongwhere){
	document.locator.action = belongwhere;
}
document.locator.submit();
}

function tab_move(a,b){
document.getElementById("t").value = a;
document.getElementById("a").value = '';
document.getElementById("al").value = '';
document.getElementById("g").value = b;
document.locator.submit();
}

function tab_over(a){
document.getElementById("t").value = a;
document.locator.submit();
}

function order_change(a){ //a가 0이면 인기순 1이면 평점순으로 한다 
document.getElementById("a").value = '';
document.getElementById("o").value = a;
document.locator.submit();
}

function tab_order_change(a){ //a가 0이면 1위부터 1이면 꼴찌부터
document.getElementById("go").value = a;
document.locator.submit();
}

function article_move(a, t){
document.getElementById("a").value = a;
	if(t){
	document.getElementById("t").value = t;
	}
document.locator.submit();
}

function newsup_submit(){
	/* 각각의 항목 글자숫자제한 넣을 것 */
	if(!document.getElementById("title").value){
	alert('제목을 입력하십시오.');
	document.getElementById("title").focus();
		return false;
	}else if(!document.getElementById("url").value){
	alert('인터넷 주소(URL)를 입력하십시오.')
	document.getElementById("url").focus();
		return false;
	}else if(!document.getElementById("author").value){
	alert('저자명을 입력하십시오.')
	document.getElementById("author").focus();
		return false;
	}else if(!document.getElementById("media").value){
	alert('발행매체명을 입력하십시오.')
	document.getElementById("media").focus();
		return false;
	}else if(!document.getElementById("date").value){
	alert('발행일을 입력하십시오.')
	document.getElementById("date").focus();
		return false;
	}else if(isNaN(document.getElementById("date").value) || document.getElementById("date").value.length!=8){
	alert('발행일은 예시와 같이 8자리의 숫자로 입력해주십시오.')
	document.getElementById("date").focus();
		return false;
	}else if(!document.getElementById("agree").checked){
	alert('링크 등록 취지 및 목적에 동의하셔야 등록할 수 있습니다.')
	document.getElementById("agree").focus();
		return false;
	}else{
	document.newsup.submit();	
	}
}

function linkadd_submit(){
	if(!document.newsup.selectoption1.value){
	alert('윗글과 아랫글의 관계를 설정하십시오.');
	document.newsup.selectoption1.focus();
	}else if(!document.newsup.selectoption2.value){
	alert('윗글과 아랫글의 관계를 설정하십시오.');
	document.newsup.selectoption2.focus();
	}else if(!document.getElementById("title").value){
	alert('제목을 입력하십시오.');
	document.getElementById("title").focus();
	}else if(!document.getElementById("url").value){
	alert('인터넷 주소(URL)를 입력하십시오.')
	document.getElementById("url").focus();
	}else if(!document.getElementById("author").value){
	alert('저자명을 입력하십시오.')
	document.getElementById("author").focus();
	}else if(!document.getElementById("media").value){
	alert('발행매체명을 입력하십시오.')
	document.getElementById("media").focus();
	}else if(!document.getElementById("date").value){
	alert('발행일을 입력하십시오.')
	document.getElementById("date").focus();
	}else if(isNaN(document.getElementById("date").value) || document.getElementById("date").value.length!=8){
	alert('발행일은 예시와 같이 8자리의 숫자로 입력해주십시오.')
	document.getElementById("date").focus();
	}else if(!document.getElementById("agree").checked){
	alert('링크 등록 취지 및 목적에 동의하셔야 등록할 수 있습니다.')
	document.getElementById("agree").focus();
	}else{
	document.newsup.submit();	
	}
}

function groupup_submit(){
	/* 각각의 항목 글자숫자제한 넣을 것 */
	if(!document.getElementById("newsgroupname").value){
		alert('새로 등록할 뉴스그룹의 제목을 입력하십시오.'); /* 12자 */
		document.getElementById("newsgroupname").focus();
		return false;
	}else if(!document.getElementById("grouptitle").value){
		alert('첫 기사의 제목을 입력하십시오.'); /* 70자 */
		document.getElementById("grouptitle").focus();
		return false;
	}else if(!document.getElementById("groupurl").value){
		alert('첫 기사의 인터넷 주소(URL)를 입력하십시오.') /* 150자 */
		document.getElementById("groupurl").focus();
		return false;
	}else if(!document.getElementById("groupauthor").value){
		alert('첫 기사의 저자명을 입력하십시오.') /* 8자 */
		document.getElementById("groupauthor").focus();
		return false;
	}else if(!document.getElementById("groupmedia").value){
		alert('첫 기사의 발행매체명을 입력하십시오.') /* 10자 */
		document.getElementById("groupmedia").focus();
		return false;
	}else if(!document.getElementById("groupdate").value){
		alert('첫 기사의 발행일을 입력하십시오.')
		document.getElementById("groupdate").focus();
		return false;
	}else if(isNaN(document.getElementById("groupdate").value) || document.getElementById("date").value.length!=8){
		alert('첫 기사의 발행일은 예시와 같이 8자리의 숫자로 입력해주십시오.')
		document.getElementById("groupdate").focus();
		return false;
	}else if(!document.getElementById("groupagree").checked){
		alert('링크 등록 취지 및 목적에 동의하셔야 등록할 수 있습니다.')
		document.getElementById("groupagree").focus();
		return false;
	}else{
	document.groupup.submit();	
	}
}

function login_twitter(a){
win1 = window.open(a, 'Twitter', 'toolbars=no, scroll=no, resizable=no, width=580, height=560');
   win1.focus();	
}

function login_facebook(a){
win1 = window.open(a, 'Twitter', 'toolbars=no, scroll=no, resizable=no, width=1080, height=560');
   win1.focus();	
}

function login_alert(){
alert('로그인이 필요합니다');	
}

function articlelistcolor(a){
	a.style.backgroundcolor="#666666";	
}

function popup_linkadd(a){
	popup_linkadd = window.open('./function_linkadd.php?a='+a, '링크맵에 연결 추가하기', 'toolbars=no, scroll=no, resizable=no, width=580, height=560');
	popup_linkadd.focus();
}

function newsaddsearch(){
	if(!document.getElementById("category").value){
		alert('검색분류를 설정하십시오.');
		document.getElementById("category").focus();
		return false;
	}else if(!document.getElementById("keyword").value){
		alert('검색어를 설정하십시오.');
		document.getElementById("keyword").focus();
		return false;
	}else{
		return true;
	}
}
function newsaddsearchsubmit(){
	if(!document.getElementById("category").value){
		alert('검색분류를 설정하십시오.');
		document.getElementById("category").focus();
		return false;
	}else if(!document.getElementById("keyword").value){
		alert('검색어를 설정하십시오.');
		document.getElementById("keyword").focus();
		return false;
	}else{
		document.newsadd_search.submit();
	}
}
function linkaddsubmit(){
	var radios = document.getElementsByName("selection");
		for(var i = 0; i < radios.length; i++) {
    		if(radios[i].checked){
    			var selectedValue = radios[i].value;
    		}
		}
	if(!document.linkadd.selectoption1.value){
		alert('윗글과 아랫글의 관계를 설정하십시오.');
		document.linkadd.selectoption1.focus();
	}else if(!document.linkadd.selectoption2.value){
		alert('윗글과 아랫글의 관계를 설정하십시오.');
		document.linkadd.selectoption2.focus();
	}else if(!selectedValue){
		alert('윗글을 연결한 대상글을 선택하십시오.');
	}else{
		document.linkadd.selectedvalue.value = selectedValue;
		document.linkadd.submit();
	}
}

function comment_iframeresize(kbs){
	var the_height = document.getElementById(kbs).contentWindow.document.body.scrollHeight;
	document.getElementById(kbs).height = the_height;
}

function comment_iframeresize2(kbs){
	var the_height = document.getElementById(kbs).contentWindow.document.body.scrollHeight;
	document.getElementById(kbs).height = the_height+40;
}

function ratearticle(){
	if(document.rating.rate.value!=""){
		document.rating.submit();
	}
}

function ratearticle2(){
	if(document.rating2.rate.value!=""){
		document.rating2.submit();
	}
}

function commentinput_submit(){
	if(document.getElementById("textarea").value.length < 10){
		alert('10자 이상 입력하셔야 합니다')
	}else if(document.getElementById("textarea").value.length > 500){
		alert('500자 이하로 입력하실 수 있습니다')
	}else{
		document.commentinput.submit();
	}
}

function add_news(g){
	win1 = window.open('function_groupup_addnews.html?g='+g, '뉴스기사 추가하기', 'toolbars=no, scroll=no, resizable=no, width=460, height=400');
   win1.focus();
}

function pager1(a,b){
document.getElementById("a").value = '';
document.getElementById("al").value = a;
document.getElementById("t").value = b;
document.locator.submit();
}

function pager2(a,b){
document.getElementById("al").value = '';
document.getElementById("g").value = '';
document.getElementById("gl").value = a;
document.getElementById("t").value = b;
document.locator.submit();
}

function articleread(a, b){
document.getElementById("a").value = a;
document.getElementById("t").value = b;
document.locator.submit();
}

function searchread(a){
document.getElementById("a").value = a;
document.locator.action = "./search.php"
document.locator.submit();
}

function gl_move(a,b){
document.getElementById("gl").value = a;
document.getElementById("t").value = b;
document.locator.submit();
}

function gl_move_assessment(a,b){
document.getElementById("gl").value = a;
document.getElementById("t").value = b;
document.getElementById("author").value = "";
document.getElementById("belong").value = "";
document.locator.submit();
}

function articleNew(a,b,c){ //main_news_list에서 사용하는 새창열기
	document.getElementById("articleview").attr('display') = 'block';
	//document.getElementById("t").value = b;
	//h = screen.height - 100;
	articleWin = window.open(c, '_system', 'toolbar=yes,location=yes,directories=no,status=no,menubar=yes,scrollbars=yes,resizable=yes ,width=780, height='+h+', top=0, left=0');
//	articleWin = window.open(c, '_blank');
//	articleWin.focus();
//	document.locator.method = "GET";
//	document.locator.submit();
}

function articleNew2(c){ // articleView에서 사용하는 새창열기
	h = screen.height - 100;
	articleWin = window.open(c, '_blank', 'toolbar=yes,location=yes,directories=no,status=no,menubar=yes,scrollbars=yes,resizable=yes ,width=780, height='+h+', top=0, left=0');
	articleWin = window.open(c, '_blank');
	articleWin.focus();	
}

function reportthis(a,b){
	alert('야야')
	document.getElementById("reportno").value = a;
	document.getElementById("reporttype").value = b;
	document.reporter.submit();
}

function newsgroup_delete(){
	if(confirm('정말로 삭제하시겠습니까?')){
		document.locator.action = "function_group_delete.php";
		document.locator.method = "POST";
		document.locator.submit();
	}
}