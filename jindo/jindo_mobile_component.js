/** Jindo Mobile Component(minify:0) : ../www/docs/jindo-mobile/archive/1.7.1/
 *	jindo.m
 *	jindo.m.Component
 *	jindo.m.Transition
 *	jindo.m.UIComponent
 *	jindo.m.LayerEffect
 *	jindo.m.Effect
 *	jindo.m.ContractEffect
 *	jindo.m.ExpandEffect
 *	jindo.m.FadeEffect
 *	jindo.m.FlipEffect
 *	jindo.m.PopEffect
 *	jindo.m.SlideEffect
 *	jindo.m.Touch
 *	jindo.m.Flicking
 *	jindo.m.FlickingAnimation
 *	jindo.m.AlignFlipFlicking
 *	jindo.m.CoverFlicking
 *	jindo.m.FlipFlicking
 *	jindo.m.SlideFlicking
 *	jindo.m.DynamicPlugin
 *	jindo.m.PullPlugin
 *	jindo.m.Validator
 *	jindo.m.NumberValidator
 *	jindo.m.CurrencyValidator
 *	jindo.m.DateValidator
 *	jindo.m.EmailValidator
 *	jindo.m.RequireValidator
 *	jindo.m.TelValidator
 *	jindo.m.UrlValidator
 *	jindo.m.Accordion
 *	jindo.m.AjaxHistory
 *	jindo.m.Calendar
 *	jindo.m.CheckRadioCore
 *	jindo.m.CheckBox
 *	jindo.m.CircularFlicking
 *	jindo.m.CorePagination
 *	jindo.m.CoreScroll
 *	jindo.m.CoreTab
 *	jindo.m.Datepicker
 *	jindo.m.Dialog
 *	jindo.m.DragArea
 *	jindo.m.DropArea
 *	jindo.m.LayerPosition
 *	jindo.m.ScrollEnd
 *	jindo.m.FloatingLayer
 *	jindo.m.Scroll
 *	jindo.m.IndexScroll
 *	jindo.m.LayerManager
 *	jindo.m.Loading
 *	jindo.m.MoreContentButton
 *	jindo.m.PageLayoutUI
 *	jindo.m.PageNavigation
 *	jindo.m.PreventClickEvent
 *	jindo.m.PreviewFlicking
 *	jindo.m.RadioButton
 *	jindo.m.RevealSidebarUI
 *	jindo.m.Selectbox
 *	jindo.m.SlideTab
 *	jindo.m.Slider
 *	jindo.m.Tab
 *	jindo.m.TextArea
 *	jindo.m.Validation
 *	jindo.m.TextInput
 *	jindo.m.ToggleSlider
 */
(function(_namespace){var jsTags=document.getElementsByTagName("script");var jsTag=jsTags[jsTags.length-1];if(jsTag&&/[\?&]jindo=([^&]+)/.test(jsTag.src)) {_namespace=RegExp.$1;}var jindo=window[_namespace];
/**
    @fileOverview 진도모바일 컴포넌트의 기본 네임스페이스인 동시에, static 객체이다
    @author sculove
    @version 1.7.1
    @since 2011. 11. 16
**/
/**
    진도모바일 컴포넌트의 기본 네임스페이스인 동시에, static 객체이다

    @class jindo.m
    @group Component
    @update
    
    @history 1.7.0 Support 갤럭시S4 대응
    @history 1.7.0 Bug ie10 msPointerEnabled 값 버그 수정
    @history 1.5.0 Update Component 의존성 제거
    @history 1.5.0 Support Window Phone8 지원
    @history 1.4.0 Support iOS 6 지원
    @history 1.2.0 Support Chrome for Android 지원<br /> 갤럭시 S2 4.0.3 업데이트 지원
    @history 1.1.0 Support Android 3.0/4.0 지원<br /> jindo 2.0.0 mobile 버전 지원
    @history 1.1.0 Update Namespace, jindo의 Namespace 하위로 지정
    @history 0.9.5 Update getTouchPosition() Method 삭제<br />
                        hasTouchEvent() Method 삭제
    @history 0.9.0 Release 최초 릴리즈
**/
if(typeof jindo.m == "undefined" && typeof Node != "undefined") {
    /**
        addEventListener된 객체를 알기위한 함수
        A태그에 click 이벤트가 bind될 경우에만 적용
    **/
    var ___Old__addEventListener___ = Node.prototype.addEventListener;
    Node.prototype.addEventListener = function(type, listener, useCapture){
            var callee = arguments.callee;
            if(callee && type === "click" && this.tagName === "A"){
                (this.___listeners___ || (this.___listeners___=[]) ).push({
                    listener : listener,
                    useCapture : useCapture
                });
            }
            return ___Old__addEventListener___.apply(this, arguments);
    };

    /**
        removeEventListener된 객체를 알기위한 함수
        A태그에 click 이벤트가 unbind될 경우에만 적용
    **/
    var ___Old__removeEventListener___ = Node.prototype.removeEventListener;
    Node.prototype.removeEventListener = function(type, listener, useCapture){
            var callee = arguments.callee;
            if(callee && type === "click" && this.tagName === "A"){
                if(this.___listeners___) {
                    this.___listeners___.pop();
                }
            }
            return ___Old__removeEventListener___.apply(this, arguments);
    };
}

window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame|| window.msRequestAnimationFrame || function(callback) { return setTimeout(callback, 16); };
})();

window.cancelAnimationFrame = (function () {
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame|| window.mozCancelAnimationFrame|| window.msCancelAnimationFrame || clearTimeout;
})();

jindo.m = (function() {
    var _isVertical = null,
        _nPreWidth = -1,
        _nRotateTimer = null,
        _htHandler = {},
        _htDeviceInfo = {},
        _htTouchEventName = {
            start : 'mousedown',
            move : 'mousemove',
            end : 'mouseup',
            cancel : null
        };

    /**
         터치이벤트 명 정제
     */
    function _initTouchEventName() {
        if('ontouchstart' in window){
            _htTouchEventName.start = 'touchstart';
            _htTouchEventName.move  = 'touchmove';
            _htTouchEventName.end = 'touchend';
            _htTouchEventName.cancel = 'touchcancel';
        } else if(window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 0) {
            _htTouchEventName.start = 'MSPointerDown';
            _htTouchEventName.move  = 'MSPointerMove';
            _htTouchEventName.end = 'MSPointerUp';
            _htTouchEventName.cancel = 'MSPointerCancel';
        }
    }

    /**
         resize 이벤트 정제해서 리턴.
        @return {String} 이벤트명
        @date 2011. 11. 11
        @author sculove
     */
    function _getOrientationChangeEvt(){
        var bEvtName = 'onorientationchange' in window ? 'orientationchange' : 'resize';
        /**
         * andorid 버그
         * 2.3에서는 orientationchange 이벤트가 존재하나, orientationchange를 적용할 경우, width와 height가 바꿔서 나옴 (setTimeout 500ms 필요)
         *  : 삼성안드로이드 2.3에서는 방향전환을 resize 이벤트를 이용하여 확인할 경우,
         *    만약, 사용자가 window에 resize이벤트를 bind할 경우 브라우저가 죽는 버그가 있음
         * 2.2에서는 orientationchange 이벤트가 2번 발생함. (처음에는 width,height가 바뀌고, 두번째는 정상적으로 나옴)
         * 그 이하는 resize로 처리
         * in-app 버그
         * in-app인 경우 orientationChange발생시, width,height값이 바꿔서 나옴 (setTimeout 200ms 필요)
         */
        if( (_htDeviceInfo.android && _htDeviceInfo.version === "2.1") ) {//|| htInfo.galaxyTab2) {
            bEvtName = 'resize';
        }
        return bEvtName;
    }

    /**
        디바이스 기기의 가로,세로 여부를 판단함.
        @date 2011. 11. 11
        @author sculove
     */
    function _getVertical() {
        var bVertical = null,
            sEventType = _getOrientationChangeEvt();
        if(sEventType === "resize") {
            var screenWidth = document.documentElement.clientWidth;
            if (screenWidth < _nPreWidth) {
                bVertical = true;
            } else if (screenWidth == _nPreWidth) {
                bVertical = _isVertical;
            } else {
                bVertical = false;
            }
            _nPreWidth = screenWidth;
            // console.log("getVertical : resize로 판별 -> " + bVertical);
        } else {
            var windowOrientation = window.orientation;
            if (windowOrientation === 0 || windowOrientation == 180) {
                bVertical = true;
            } else if (windowOrientation == 90 || windowOrientation == -90) {
                bVertical = false;
            }
            // console.log("getVertical : orientationChange로 판별 -> " + bVertical);
        }
        return bVertical;
    }

    /**
        indo.m. 공통 이벤트 attach
        @date 2011. 11. 11
        @author sculove
     */
    function _attachEvent() {
        // jindo.$Element(window).attach(_getOrientationChangeEvt(), _onOrientationChange)
            // .attach("laod", _onOrientationChange)
            // .attach("pageshow", _onPageshow);
       var fn = jindo.$Fn(_onOrientationChange, this);
       fn.attach(window, _getOrientationChangeEvt()).attach(window, 'load').attach(window, 'pageshow');
    }

    /**
        브라우저 정보와 버전 정보를 갖는 this._htDeviceInfo를 초기화한다
        @date 2011. 11. 11
        @modify 2012.03.05 bInapp 추가
        @modify 2012.05.09 android 버전 정규식 수정
        @modify oyang2 2012.07.30 optimus 추가
        @modify oyang2 2012.09.17 단말기 정보 추가
        @author oyang2, sculove
     */
    function _initDeviceInfo() {
        var sName = navigator.userAgent;
        var ar = null;
        function f(s,h) {
            return ((h||"").indexOf(s) > -1);
        }
        _htDeviceInfo = {
            "iphone" : f('iPhone', sName),
            "ipad" : f('iPad', sName),
            "android" : f('Android', sName),
            "win" : f('Windows Phone', sName),
            "galaxyTab" : f('SHW-M180', sName),
            "galaxyTab2" : f('SHW-M380', sName),
            // "galaxyK" : f('SHW-M130K',sName),
            // "galaxyU" : f('SHW-M130L',sName),
            "galaxyS" : f('SHW-M110',sName),
            "galaxyS2" : f('SHW-M250',sName) || f('GT-I9100',sName),
            "galaxyS2LTE" : f('SHV-E110',sName),
            "galaxyS3" : f('SHV-E210',sName) || f('SHW-M440',sName) || f('GT-I9300',sName),
            "galaxyNote" : f('SHV-E160', sName),
            "galaxyNote2" : f('SHV-E250', sName),
            "galaxyNexus" : f('Galaxy Nexus', sName),
            "optimusLte2" : f('LG-F160', sName),
            "optimusVu" : f('LG-F100', sName),
            "optimusLte" : f('LG-LU6200', sName) || f('LG-SU640', sName) || f('LG-F120K', sName),
            "galaxyS4" : f('SHV-E300', sName) || f('GT-I9500', sName) || f('GT-I9505', sName) || f('SGH-M919', sName)|| f('SPH-L720', sName)|| f('SGH-I337', sName)|| f('SCH-I545', sName),
            "bChrome" : (f('CrMo',sName) || f('Chrome', sName)),
            "bSBrowser" : f('SAMSUNG', sName) && f('Chrome', sName),
            "bInapp" : false,
            "version" : "",
            "browserVersion" : ""
        };
     
        if(_htDeviceInfo.iphone || _htDeviceInfo.ipad){
            ar = sName.match(/OS\s([\d|\_]+\s)/i);
            if(ar !== null&& ar.length > 1){
                _htDeviceInfo.version = ar[1];
            }
        } else if(_htDeviceInfo.android){
            ar = sName.match(/Android\s([^\;]*)/i);
            if(ar !== null&& ar.length > 1){
                _htDeviceInfo.version = ar[1];
            }
        } else if(_htDeviceInfo.win){
            ar = sName.match(/Windows Phone\s([^\;]*)/i);
            if(ar !== null&& ar.length > 1){
                _htDeviceInfo.version = ar[1];
            }
        }
        _htDeviceInfo.version = _htDeviceInfo.version.replace(/\_/g,'.').replace(/\s/g, "");

        // browser 버전 
        if(_htDeviceInfo.bChrome) {
            ar = sName.match(/Chrome\/([^\s]*)/i);
            if(ar !== null&& ar.length > 1){
                _htDeviceInfo.browserVersion = ar[1].replace(/\_/g,'.').replace(/\s/g, "");
            }
        } else {
            _htDeviceInfo.browserVersion = _htDeviceInfo.version;
        }

        // device name 설정
        for(var x in _htDeviceInfo){
            if (typeof _htDeviceInfo[x] == "boolean" && _htDeviceInfo[x] && _htDeviceInfo.hasOwnProperty(x)) {
                if(x[0] !== "b") {
                    _htDeviceInfo.name = x;
                }
            }
        }

        //제조사 추가
        _htDeviceInfo["samsung"] = f('GT-', sName) || f('SCH-', sName) || f('SHV-', sName)||f('SHW-', sName) ||f('SPH', sName) || f('SWT-', sName) ||f('SGH-', sName) || f("EK-", sName) || f("Galaxy Nexus", sName) || f("SAMSUNG", sName);
        _htDeviceInfo["lg"] = f('LG-', sName);
        _htDeviceInfo["pantech"] = f('IM-', sName);

        //inapp여부 추가.true 일경우는 확실한 inapp이며,false - 웹브라우저 혹은 알수없는 경우
        if(_htDeviceInfo.iphone || _htDeviceInfo.ipad) {
             if(!f('Safari', sName)){
                 _htDeviceInfo.bInapp = true;
             }
        }else if(_htDeviceInfo.android){
            sName = sName.toLowerCase();
            if( f('inapp', sName) || f('app', sName.replace('applewebkit',''))){
                _htDeviceInfo.bInapp = true;
            }
        }
    }

    /**
        가로,세로 변경 여부 확인
        @date 2011. 11. 11
        @author sculove
     */
    function _onOrientationChange(we) {
        var self = this;
        if(we.type === "load") {
            _nPreWidth = document.documentElement.clientWidth;
            /**
             * 웹 ios에서는 사이즈가 아닌 orientationChange로 확인
             * 왜? iphone인 경우, '개발자콘솔'이 설정된 경우 초기 처음 오동작
             */
            if(!_htDeviceInfo.bInapp && ( _htDeviceInfo.iphone || _htDeviceInfo.ipad || _getOrientationChangeEvt() !== "resize")) {    // 웹ios인 경우
                _isVertical = _getVertical();
            } else {
                if(_nPreWidth > document.documentElement.clientHeight) {
                    _isVertical = false;
                } else {
                    _isVertical = true;
                }
            }
            // console.log("Rotate init isVertical : " + this._isVertical);
            return;
        }
        if (_getOrientationChangeEvt() === "resize") { // android 2.1 이하...
            // console.log("Rotate Event is resize");
            setTimeout(function(){
                _orientationChange(we);
            }, 0);
        } else {
            //console.log("Rotate Event is orientationChange");
            var nTime = 200;
            if(_htDeviceInfo.android) {  // android 2.2이상
                nTime = 500;
            }
            clearTimeout(_nRotateTimer);
            _nRotateTimer = setTimeout(function() {
                _orientationChange(we);
            },nTime);
        }
    }

    /**
        현재 폰의 위치가 가로인지 세로인지 확인
        @date 2011. 11. 11
        @author sculove
     */
    function _orientationChange(we) {
        var nPreVertical = _isVertical;
        _isVertical = _getVertical();
        //console.log("회전 : " + nPreVertical + " -> " + this._isVertical);
        if (jindo.$Agent().navigator().mobile || jindo.$Agent().os().ipad) {
            if (nPreVertical !== _isVertical) {
                _fireEvent("mobilerotate", {
                    isVertical: _isVertical
                });
            }
        // } else {    // PC일 경우, 무조건 호출
        //     _fireEvent("mobilerotate", {
        //         isVertical: _isVertical
        //     });
        }
    }

    /**
         pageShow 이벤트
         @date 2011. 11. 11
         @author sculove
     */
    function _onPageshow(we) {
        _isVertical = _getVertical();
        setTimeout(function() {
            _fireEvent("mobilePageshow", {});
        },300);
    }

    /**
        WebKitCSSMatrix를 이용하여 left, top 값을 추출
        @return {HashTable} top, left
     */
    function _getCssOffsetFromCSSMatrix(element) {
        var curTransform  = new WebKitCSSMatrix(window.getComputedStyle(element).webkitTransform);
        return {
            top : curTransform.m42,
            left : curTransform.m41
        };
    }

    function _fireEvent(sType, ht) {
        if(_htHandler[sType]) {
            for (var i=0, len=_htHandler[sType].length; i < len; i++){
                _htHandler[sType][i].call(this, ht);
            }
        }
    }

    /**
        transform에서 translate,translate3d의 left와 top 값을 추출
        @return {HashTable} top,left
     */
    function _getCssOffsetFromStyle(element) {
        var nTop = 0,
            nLeft = 0,
            aTemp = null,
            s = element.style[jindo.m.getCssPrefix() + "Transform"];
        if(!!s && s.length >0){
            aTemp = s.match(/translate.{0,2}\((.*)\)/);
            if(!!aTemp && aTemp.length >1){
                var a = aTemp[1].split(',');
                if(!!a && a.length >1){
                    nTop = parseInt(a[1],10);
                    nLeft = parseInt(a[0],10);
                }
            }
        }
        return {
            top : nTop,
            left : nLeft
        };
    }

    // 내부 변수 m
    var __M__ = {
        /** MOVE 타입 */
        MOVETYPE : {
            0 : 'hScroll',
            1 : 'vScroll',
            2 : 'dScroll',
            3 : 'tap',
            4 : 'longTap',
            5 : 'doubleTap',
            6 : 'pinch',
            7 : 'rotate',
            8 : 'pinch-rotate'
        },
        sVersion : "unknown",   // deprecated (jindo.m.Component.VERSION 으로 이관)

        /** @lends jindo.m.prototype */
        /**
            초기화 함수

            @constructor
            @ignore
            @static
        **/
        $init : function() {
            _initDeviceInfo();
            _initTouchEventName();
            _attachEvent();
        },

        /**
            모바일 기기 회전시, 적용할 함수를 bind 함

            @method bindRotate
            @param {Object} fHandlerToBind
            @history 1.7.0 Bug PC일 경우, 초기 로딩시 rotate이벤트가 발생하는 문제 제거
            @history 0.9.5 Bug rotate 인식오류 문제 해결
            @date 2011. 11. 11
            @author sculove
            @example
                var f = jindo.$Fn(this.setSize, this).bind();

                jindo.m.bindRotate(f);  // bind함
                jindo.m.unbindRotate(f);    // unbind함
        **/

        bindRotate : function(fHandlerToBind) {
            var aHandler = _htHandler["mobilerotate"];
            if (typeof aHandler == 'undefined'){
                aHandler = _htHandler["mobilerotate"] = [];
            }
            aHandler.push(fHandlerToBind);
        },
        /**
            모바일 기기 회전시, 적용할 함수를 unbind 함

            @method unbindRotate
            @param {Object} fHandlerToUnbind
            @date 2011. 11. 11
            @author sculove
            @example
                var f = jindo.$Fn(this.setSize, this).bind();

                jindo.m.bindRotate(f);  // bind함
                jindo.m.unbindRotate(f);    // unbind함
        **/
        unbindRotate : function(fHandlerToUnbind) {
            var aHandler = _htHandler["mobilerotate"];
            if (aHandler) {
                for (var i = 0, fHandler; (fHandler = aHandler[i]); i++) {
                    if (fHandler === fHandlerToUnbind) {
                        aHandler.splice(i, 1);
                        break;
                    }
                }
            }
        },

        /**
            pageshow호출, 함수 bind

            @method bindPageshow
            @param {Object} fHandlerToBind
            @history 0.9.5 Update Method 추가
            @author sculove
            @date 2011. 11. 11
            @example
                var f = jindo.$Fn(this.setSize, this).bind();

                jindo.m.bindPageshow(f);    // bind함
                jindo.m.unbindPageshow(f);  // unbind함
        **/
        bindPageshow : function(fHandlerToBind) {
            var aHandler = _htHandler["mobilePageshow"];
            if (typeof aHandler == 'undefined'){
                aHandler = _htHandler["mobilePageshow"] = [];
            }
            aHandler.push(fHandlerToBind);
            // this.attach("mobilePageshow", fHandlerToBind);
        },

        /**
            pageshow호출, 함수 unbind

            @method unbindPageshow
            @param {Object} fHandlerToBind
            @history 0.9.5 Update Method 추가
            @author sculove
            @date 2011. 11. 11
            @example
                var f = jindo.$Fn(this.setSize, this).bind();

                jindo.m.bindPageshow(f);    // bind함
                jindo.m.unbindPageshow(f);  // unbind함
        **/
        unbindPageshow : function(fHandlerToUnbind) {
            var aHandler = _htHandler["mobilePageshow"];
            if (aHandler) {
                for (var i = 0, fHandler; (fHandler = aHandler[i]); i++) {
                    if (fHandler === fHandlerToUnbind) {
                        aHandler.splice(i, 1);
                        break;
                    }
                }
            }
        },

        /**
            브라우저 정보와 버전 정보를 제공한다.

            @method getDeviceInfo
            @author oyang2, sculove
            @date 2011. 11. 11
            @return {Object}
            @history 1.7.0 Bug 갤럭시S4, bSBrowser, browserVersion 속성 추가
            @history 1.7.0 Bug name 잘못 나오는 오류 수정
            @history 1.7.0 Bug 갤럭시S3 해외판(GT-I9300) 갤럭시S3로 인지못하는 버그 수정
            @history 1.6.0 Bug name에 제조사 이름이 들어가는 버그 수정
            @history 1.5.0 Upate win,galaxyNote2 속성 추가
            @history 1.5.0 Upate samsung, lg 속성 추가
            @history 1.5.0 Upate pentech 속성 추가
            @history 1.4.0 Upate 단말기 정보(samsung, lg, pentech) 추가
            @history 1.3.5 Upate 단말기 속성 추가<br /> (optimusLte, optimusLte2, optimusVu)
            @history 1.2.0 Upate bChrome 속성 추가
            @history 1.1.0 Upate bInapp 속성 추가,<br /> galaxyTab2 속성 추가
            @history 0.9.5 Upate bInapp galaxyU 속성 추가<br /> galaxyS 속성 추가
            @example
                jindo.m.getDeviceInfo().iphone      //아이폰 여부
                jindo.m.getDeviceInfo().ipad        //아이패드 여부
                jindo.m.getDeviceInfo().android  //안드로이드 여부
                jindo.m.getDeviceInfo().galaxyTab   //갤럭시탭 여부
                jindo.m.getDeviceInfo().galaxyTab2  //갤럭시탭2 여부
                jindo.m.getDeviceInfo().galaxyS  //갤럭시S 여부
                jindo.m.getDeviceInfo().galaxyS2    //갤럭시S2 여부
                jindo.m.getDeviceInfo().galaxyS2LTE    //갤럭시S2 LTE 여부
                jindo.m.getDeviceInfo().galaxyNexus    //갤럭시 넥서스 LTE 여부
                jindo.m.getDeviceInfo().optimusLte2    //옵티머스 LTE2 여부
                jindo.m.getDeviceInfo().optimusVu    //옵티머스뷰 여부
                jindo.m.getDeviceInfo().optimusLte    //옵티머스 LTE 여부
                jindo.m.getDeviceInfo().version  //안드로이드, 아이폰시 버젼정보 제공
                jindo.m.getDeviceInfo().bChrome  //크롬 브라우저 여부
                jindo.m.getDeviceInfo().bInapp      //인앱여부, true- 인앱, false - 웹브라우저 혹은 알수없는 경우
                jindo.m.getDeviceInfo().win        //MS Window 인경우
                jindo.m.getDeviceInfo().pantech    //팬텍 단말기인 경우
                jindo.m.getDeviceInfo().samsung    //삼성 단말기인 경우
                jindo.m.getDeviceInfo().lg          //엘지 단말기인 경우
                jindo.m.name                        //현재 단말기기 정보제공
        **/
        getDeviceInfo : function(){
            return _htDeviceInfo;
        },

        /**
             터치이벤트에 따라 엘리먼트 애니메이션 진행후 클릭되는 이슈를 가진 브라우저인지 판단
             @date 2012.11.05
            @return {Boolean}
            @author oyang2
         */
        hasClickBug : function(){
            return ( _htDeviceInfo.iphone || _htDeviceInfo.ipad || (_htDeviceInfo.win && ((_htDeviceInfo.version *1) >= 8)) );
        },

         /**
            현재 모바일기기의 가로,세로 여부를 반환한다.

            @method isVertical
            @author sculove
            @history 1.3.0 Bug 페이지 캐쉬될 경우, rotate 값이 갱신되지 않는 버그 수정
            @history 1.1.0 Update 초기 로드시 가로일경우 값이 제대로 나오지 않는 문제 해결
            @example
                jindo.m.isVertical; // 수직여부 반환

        **/
        isVertical : function() {
            if(_isVertical === null) {
                return _getVertical();
            } else {
                return _isVertical;
            }
        },

        /**
            TextNode를 제외한 상위노드를 반환한다.

            @return {HTMLElement} el
            @date 2011. 11. 11
            @method getNodeElement
            @deprecated
            @history 1.5.0 Update deprecated
            @history 0.9.5 Update Method 추가
            @author oyang2
            @example
                var elParent=jindo.m.getNodeElement(el); // TextNode를 제외한 상위노드를 반환한다.
        **/
        getNodeElement : function(el){
            while(el.nodeType != 1){
                el = el.parentNode;
            }
            return el;
        },

        /**
            현재 스크롤 Element의 offet을 구한다.

            @method getCssOffset
            @date 2011. 11. 11
            @author sculove
            @param {HTMLElement} element  ComputedStyle 값을 이용하여 offset을 얻는 함수
            @return {Object} {top,left}
            @history 1.1.0 Update 웹킷 이외의 브라우저도 처리 가능하도록 기능 개선
            @example
                var oObject=jindo.m.getCssOffset(el); // CSSOffset을 반환한다.
        **/
        getCssOffset : function(element){
            var htOffset;
            /** Andorid 3.0대에서는 WebKitCSSMatrix가 있지만, 안됨. 버그 */
            if(_htDeviceInfo.android && parseInt(_htDeviceInfo.version,10) === 3) {
               htOffset = _getCssOffsetFromStyle(element);
            } else {
               if('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()){
                  htOffset = _getCssOffsetFromCSSMatrix(element);
               } else {
                  htOffset = _getCssOffsetFromStyle(element);
               }
            }
            return htOffset;
        },

        /**
            TransitionEnd 이벤트 bind

            @method attachTransitionEnd
            @author sculove, oyang2
            @date 2011. 11. 11
            @param {HTMLElement} element attach할 엘리먼트
            @param {Function} fHandlerToBind attach할 함수
            @example
                jindo.m.attachTransitionEnd(el, function() { alert("attach"); }); // el에 transitionEnd 이벤트를 attach한다.
                jindo.m.detachTransitionEnd(el, function() { alert("detach"); }); // el에 transitionEnd 이벤트를 detach한다.

        **/
        attachTransitionEnd : function(element,fHandlerToBind) {
            var nVersion = + jindo.$Jindo().version.replace(/[a-z.]/gi,"");
            // console.log(nVersion);
            /* 진도 1.5.1에서 정상 동작. 그 이하버젼은 버그 */
            if(nVersion > 230) {   // jindo
                element._jindo_fn_ = jindo.$Fn(fHandlerToBind,this).attach(element, "transitionend");
            } else {
                var sEvent = ((this.getCssPrefix() === "ms")? "MS": this.getCssPrefix()) + "TransitionEnd";
                element.addEventListener(sEvent, fHandlerToBind, false);
            }
        },

        /**
            TransitionEnd 이벤트 unbind

            @method detachTransitionEnd
            @date 2011. 11. 11
            @author sculove, oyang2
            @param {HTMLElement} element dettach할 엘리먼트
            @param {Function} fHandlerToUnbind dettach할 함수
            @example
                jindo.m.attachTransitionEnd(el, function() { alert("attach"); }); // el에 transitionEnd 이벤트를 attach한다.
                jindo.m.detachTransitionEnd(el, function() { alert("detach"); }); // el에 transitionEnd 이벤트를 detach한다.


        **/
        detachTransitionEnd : function(element, fHandlerToUnbind) {
            var nVersion = + jindo.$Jindo().version.replace(/[a-z.]/gi,"");
            // console.log(nVersion);
            /* 진도 1.5.1에서 정상 동작. 그 이하버젼은 버그 */
            if(nVersion > 230) {   // jindo
                if(element._jindo_fn_) {
                    element._jindo_fn_.detach(element, "transitionend");
                    delete element._jindo_fn_;
                }
            } else {
                var sEvent = ((this.getCssPrefix() === "ms")? "MS": this.getCssPrefix()) + "TransitionEnd";
                element.removeEventListener(sEvent, fHandlerToUnbind, false);
            }
        },

        /**
             MSPointerEvent 처럼 신규 이벤트들이 2.3.0이하 진도에서 attach안되는 문제를 해결하기 위한 코드
            jindo 2.4.0 이상 버전에서는 사용가능, 하위 버전에서는 _notSupport namespace  진도 사용
            @date 2012. 12.06
            @author oyang2
            @example
            jindo.m._attachFakeJindo(el, function(){alert('MSPointerDown'), 'MSPointerDown' });a
         */
        _attachFakeJindo : function(element, fn, sEvent){
            var nVersion = + jindo.$Jindo().version.replace(/[a-z.]/gi,"");
            var wfn = null;
            if(nVersion < 230 && (typeof _notSupport !== 'undefined')) {
                //use namespace jindo
                wfn = _notSupport.$Fn(fn).attach(element, sEvent);
            }else{
                //use jindo
                wfn = jindo.$Fn(fn).attach(element, sEvent);
            }
            return wfn;
        },

        /**
            브라우저별 대처 가능한 이벤트명을 리턴한다.
            @date 2012. 12.06
            @author oyang2
            @example
            jindo.m._getTouchEventName();
         */
        _getTouchEventName : function(){
            return  _htTouchEventName;
        },

        /**
            브라우저 CssPrefix를 얻는 함수

            @method getCssPrefix
            @author sculove
            @date 2011. 11. 11
            @return {String} return cssPrefix를 반환. webkit, Moz, O,...
            @history 0.9.5 Update Method 추가
            @example
                jindo.m.getCssPrefix(); // 브라우저별 prefix를 반환한다.
        **/
        getCssPrefix : function() {
            var sCssPrefix = "";
            if(typeof document.body.style.MozTransition !== "undefined") {
                sCssPrefix = "Moz";
            } else if(typeof document.body.style.OTransition !== "undefined") {
                sCssPrefix = "O";
            } else if(typeof document.body.style.msTransition !== 'undefined'){
                sCssPrefix = "ms";
            } else {
                sCssPrefix = "webkit";
            }
            return sCssPrefix;
        },


        /**
            자신을 포함하여 부모노드중에 셀렉터에 해당하는 가장 가까운 엘리먼트를 구함

            @method getClosest
            @date 2012. 02. 20
            @author sculove
            @param {String} sSelector CSS클래스명 또는 태그명
            @param {HTMLElement} elBaseElement 기준이 되는 엘리먼트
            @return {HTMLElement} 구해진 HTMLElement
            @history 1.1.0 Update Method 추가
            @example
                jindo.m.getClosest("cssName", elParent);   // elParent하위에 cssName 클래스명이 아닌 첫번째 Element를 반환한다.
        **/
        getClosest : function(sSelector, elBaseElement) {
            //console.log("[_getClosest]", sSelector, elBaseElement)
            var elClosest;
            var welBaseElement = jindo.$Element(elBaseElement);

            var reg = /<\/?(?:h[1-5]|[a-z]+(?:\:[a-z]+)?)[^>]*>/ig;
            if (reg.test(sSelector)) {
                // 태그 일경우
                 if("<" + elBaseElement.tagName.toUpperCase() + ">" == sSelector.toUpperCase()) {
                     elClosest = elBaseElement;
                 } else {
                     elClosest = welBaseElement.parent(function(v){
                         if("<" + v.$value().tagName.toUpperCase() + ">" == sSelector.toUpperCase()) {
                            //console.log("v", v)
                            return v;
                        }
                    });
                    elClosest = elClosest.length ? elClosest[0].$value() : false;
                 }
            } else {
                //클래스명일 경우
                 if(sSelector.indexOf('.') == 0) { sSelector = sSelector.substring(1,sSelector.length); }
                 if(welBaseElement.hasClass(sSelector)) {
                    elClosest = elBaseElement;
                 } else {
                    elClosest = welBaseElement.parent(function(v){
                        if(v.hasClass(sSelector)) {
                            //console.log("v", v)
                            return v;
                        }
                    });
                    elClosest = elClosest.length ? elClosest[0].$value() : false;
                }
            }
            //console.log("elClosest", elClosest)
            return elClosest;
        },

        /**
            CSS3d를 사용할수 있는 기기 값 불린 반환.
            @method useCss3d
            @param {Boolean} flicking 에서 사용하는지 여부
            @return {Boolean} CSS3d를 사용할 수 있는 기기일 경우 true를 반환
            @since 2012. 6. 22
            @history 1.7.0 Update Method 추가
            @history 1.7.0 Update 안드로이드 4.1이상에서는 CSS3d가속을 사용하도록 변경 (안드로이드 4.1부터는 BlackList 기반)<br/>
            네이버 메인 호환 장비 추가 등록
        **/
        useCss3d : function(isFlicking) {
            if(isFlicking === undefined){
                isFlicking = false;
            }
            var bRet = false;
            // 크롬일 경우, false처리 (why? 크롬은 글짜가 약간 틀어져 보임. 속도상도 css3d적용 전후와 크게 차이가 나지 않음)
            // 크롬 25이상일 경우에는 글짜가 blur되는 버그가 수정됨.
            // 또한 삼섬 SBrowser에서도 이러한 문제가 수정됨.
            if(_htDeviceInfo.bChrome && _htDeviceInfo.browserVersion < "25" && !_htDeviceInfo.bSBrowser) {
                return bRet;
            }
            if(_htDeviceInfo.iphone || _htDeviceInfo.ipad) {
                bRet = true;
            } else if(_htDeviceInfo.android){
                if(_htDeviceInfo.version >= "4.1.0") {
                    // 안드로이드 젤리빈 이상은 BlackList 기반으로 관리
                    bRet = true;
                } else {
                    var s = navigator.userAgent.match(/\(.*\)/)[0];
                    // if(!isFlicking){
                    //     isEtc = isEtc || f('SHV-E110', s);    // 갤s2 LTE 제외
                    // }
                    if(_htDeviceInfo.version >= "4.0.3" && 
                        /SHW-|SHV-|GT-|SCH-|SGH-|SPH-|LG-F160|LG-F100|LG-F180|LG-F200|EK-|IM-A|LG-F240|LG-F260/.test(s) &&
                        !/SHW-M250|SHW-M420|SHW-M200|GT-S7562/.test(s)) {
                        bRet = true;
                    } 
                }
            }
            return bRet;
        },

        /**
            fixed  속성을 지원하는지 확인하는 함수
            @method useFixed
            @since 2012. 6. 22
            @return {Boolean} isFixed
            @history 1.7.0 Update Method 추가
            @remark
                1. ios
                - ios5 (scrollTo가 발생된 경우 랜더링 되지 않는 버그)
                2. android
                - 3.x 부터 지원함 (그전에도 지원했지만, 하이라이트 적용문제로 처리할 수 없음)
                scroll, flicking과 함께 사용할 경우, 깜빡거림
        **/
        useFixed : function() {
            var isFixed = false;
            if(_htDeviceInfo.bChrome ||
               (_htDeviceInfo.android && parseInt(_htDeviceInfo.version,10) >= 3) ||
               ((_htDeviceInfo.iphone || _htDeviceInfo.ipad) && (parseInt(_htDeviceInfo.version,10) >= 5)) ||
               (_htDeviceInfo.win && parseInt(_htDeviceInfo.version,10) >= 8)) {
                isFixed = true;
            }
            return isFixed;
        },



        /**
            TimingFunction를 사용할수 있는 기기 값 불린 반환.
            @method useTimingFunction
            @since 2012. 6. 30
            @history 1.7.1 Bug iOS6.0일 경우에만, timingFunction=false되도록 수정
            @history 1.7.0 Update Method 추가
            @param {Boolean} bUseFlicking flicking 컴포넌트에서 사용여부
            @return {Boolean} TimingFunction를 사용할 수 있는 기기일 경우 true를 반환
        **/
        useTimingFunction : function(bUseFilcking) {
            if(typeof bUseFilcking === 'undefined'){
                bUseFilcking = false;
            }
            var bUse = this.useCss3d();
            if(_htDeviceInfo.android || 
                ( (_htDeviceInfo.iphone || _htDeviceInfo.ipad) && /^6.0/.test(_htDeviceInfo.version) )
                ) {
                bUse = false;
            }
            return bUse;
        },

        /**
            디바이스 화면 사이즈를 반환 (viewport가 device-width 속성으로 지정되었을때의 크기)

            @since 2012. 6. 22
            @param {Boolean} isMinSize
            @return {Object} width, height
        **/
        _clientSize : function(isMinSize) {
            if(typeof isMinSize === 'undefined'){
                isMinSize = false;
            }
            var oSize = {};
            var oRet = jindo.$Document().clientSize();
            var nVersion = parseInt(_htDeviceInfo.version,10);

            if( (_htDeviceInfo.ipad || _htDeviceInfo.iphone) || _htDeviceInfo.bChrome) {
                if(isMinSize && _htDeviceInfo.iphone) {
                    oRet.height = this.isVertical()? 356 : 268;
                }
                return oRet;
            }

            switch(_htDeviceInfo.name){
                case "galaxyTab"    : oSize = { portrait : 400,  landscape : 683 };
                    oSize.landscape -= 92;
                    oSize.portrait -= 66;
                    break;
                case "galaxyTab2"   : oSize = { portrait : 1280,  landscape : 800 };
                    oSize.landscape -= 152;
                    oSize.portrait -= 152;
                    break;
                case "galaxyS"      : oSize = { portrait : 320,  landscape : 533 };
                    oSize.landscape -= 81;  // android 2.2/2.3
                    oSize.portrait -= 81;
                    break;
                case "galaxyS2LTE"  :
                case "galaxyS2"     : oSize = { portrait : 320,  landscape : 533 };
                    if(nVersion==4) {
                        oSize.landscape -= 77;
                        oSize.portrait -= 77;
                    } else {
                        oSize.landscape -= 83;
                        oSize.portrait -= 83;
                    }
                    break;
                case "galaxyS3"     : oSize = { portrait : 360,  landscape : 640 };
                    oSize.landscape -= 73;
                    oSize.portrait -= 73;
                    break;
                case "galaxyNote"   :
                case "galaxyNote2"   : oSize = { portrait : 400,  landscape : 640 };
                    if(nVersion==4) {
                        oSize.landscape -= 77;
                        oSize.portrait -= 77;
                    } else {
                        oSize.landscape -= 103;
                        oSize.portrait -= 103;
                    }
                    break;
                case "galaxyNexus"  : oSize = { portrait : 360,  landscape : 598 };
                    oSize.landscape -= 83;
                    oSize.portrait -= 83;
                    break;
                case "optimusLte" : oSize = { portrait : 360,  landscape : 640 };
                    oSize.landscape -= 73;
                    oSize.portrait -= 73;
                    break;
                case "optimusLte2" : oSize = { portrait : 360,  landscape : 640 };
                    oSize.landscape -= 73;
                    oSize.portrait -= 73;
                    break;
                case "optimusVu" : oSize = { portrait : 439,  landscape : 585 };
                    oSize.landscape -= 73;
                    oSize.portrait -= 73;
                    break;
            }
            if(this.isVertical()) {
                if(isMinSize || (oSize.landscape && oSize.landscape > oRet.height)) {
                    oRet.height = oSize.landscape;
                }
            } else {
                if(isMinSize || (oSize.portrait && oSize.portrait > oRet.height)) {
                    oRet.height = oSize.portrait;
                }
            }
            return oRet;
        },

        /**
            기기별 주소창 높이를 구한다.
            @author oyang2
            @return {Number} nHeight
         */
        _getAdressSize : function(){
            var nSize = 0;
            if(_htDeviceInfo.bInapp){
                return nSize;
            }
             var nVersion = parseInt(_htDeviceInfo.version,10);
            if( _htDeviceInfo.iphone){
                nSize = 60;
            }else if(_htDeviceInfo.android){
                switch(_htDeviceInfo.name ){
                    case "galaxyTab"    :
                        nSize = 66;
                        break;
                    case "galaxyTab2"   :
                        nSize = 48;
                        break;
                    case "galaxyS"      :
                        nSize = 56;  // android 2.2/2.3
                        break;
                    case "galaxyS2LTE"  :
                    case "galaxyS2"     :
                        if(nVersion==4) {
                            nSize = 52;
                        } else {
                           nSize = 58;
                        }
                        break;
                    case "galaxyS3"     :
                        nSize  = 48;
                        break;
                    case "galaxyNote"   :
                    case "galaxyNote2"   :
                        if(nVersion==4) {
                            nSize = 52;
                        } else {
                            nSize = 78;
                        }
                        break;
                    case "galaxyNexus"  :
                        nSize = 52;
                        break;
                    case "optimusVu" :  //lg ics는 모두 48인
                    case "optimusLte" :
                    case "optimusLte2" :
                        nSize = 48;
                        break;
                 }
            }
            return nSize;
        }
    };
    __M__._isUseFixed = __M__.useFixed;
    __M__._isUseTimingFunction = __M__.useTimingFunction;
    __M__._isUseCss3d = __M__.useCss3d;
    __M__.$init();
    return __M__;
})();
/**
    @fileOverview 진도 컴포넌트를 구현하기 위한 코어 클래스
    @version 1.7.1
    @since 2011. 7. 13.
**/

/**
    진도 모바일 컴포넌트를 구현하기 위한 코어 클래스.
    다른 컴포넌트가 상속받는 용도로 사용된다.

    @class jindo.m.Component
    @uses jindo.m
    @keyword component, base, core
    @group Component
    @update
    @invisible
**/
jindo.m.Component = jindo.$Class({
    /** @lends jindo.m.Component.prototype */

    _htEventHandler : null,
    _htOption : null,
    $static : {
        VERSION : "1.7.1"
    },

    /**
        jindo.m.Component를 초기화한다.
        @constructor
    **/
    $init : function() {
        var aInstance = this.constructor.getInstance();
        aInstance.push(this);
        this._htEventHandler = {};
        this._htOption = {};
        this._htOption._htSetter = {};
    },

    /**
        옵션값을 설정하거나 가져온다.
        htCustomEventHandler 옵션을 선언해서 attach() 메소드를 사용하지 않고 커스텀 이벤트핸들러를 등록할 수 있다.

        @method option
        @param {String} sName 옵션의 이름
        @param {String} sValue 옵션의 값
        @return {this} 컴포넌트 객체 자신
        @example
            var MyComponent = jindo.$Class({
                method : function() {
                    alert(this.option("foo"));
                }
            }).extend(jindo.m.Component);

            var oInst = new MyComponent();
            oInst.option("foo", 123); // 또는 oInst.option({ foo : 123 });
            oInst.method(); // 결과 123
        @example
            //커스텀이벤트핸들러 등록예제
            oInst.option("htCustomEventHandler", {
                test : function(oCustomEvent) {

                }
            });

            //이미 "htCustomEventHandler" 옵션이 설정되어있는 경우에는 무시된다.
            oInst.option("htCustomEventHandler", {
                change : function(oCustomEvent) {

                }
            });
    **/
    option : function(sName, vValue) {
        switch (typeof sName) {
            case "undefined" :
                var oOption = {};
                for(var i in this._htOption){
                    if(!(i == "htCustomEventHandler" || i == "_htSetter")){
                        oOption[i] = this._htOption[i];
                    }
                }
                return oOption;
            case "string" :
                if (typeof vValue != "undefined") {
                    if (sName == "htCustomEventHandler") {
                        if (typeof this._htOption[sName] == "undefined") {
                            this.attach(vValue);
                        } else {
                            return this;
                        }
                    }

                    this._htOption[sName] = vValue;
                    if (typeof this._htOption._htSetter[sName] == "function") {
                        this._htOption._htSetter[sName](vValue);
                    }
                } else {
                    return this._htOption[sName];
                }
                break;
            case "object" :
                for(var sKey in sName) {
                    if (sKey == "htCustomEventHandler") {
                        if (typeof this._htOption[sKey] == "undefined") {
                            this.attach(sName[sKey]);
                        } else {
                            continue;
                        }
                    }
                    if(sKey !== "_htSetter"){
                        this._htOption[sKey] = sName[sKey];
                    }

                    if (typeof this._htOption._htSetter[sKey] == "function") {
                        this._htOption._htSetter[sKey](sName[sKey]);
                    }
                }
                break;
        }
        return this;
    },

    /**
        옵션의 setter 함수를 설정하거나 가져온다.
        옵션의 setter 함수는 지정된 옵션이 변경되면 수행되는 함수이다.

        @method optionSetter
        @param {String} sName setter의 이름
        @param {Function} fSetter setter 함수
        @return {this} 컴포넌트 객체 자신
        @example
            oInst.option("sMsg", "test");
            oInst.optionSetter("sMsg", function(){
                alert("sMsg 옵션값이 변경되었습니다.");
            });
            oInst.option("sMsg", "change"); -> alert발생
        @example
            //HashTable 형태로 설정가능
            oInst.optionSetter({
                "sMsg" : function(){
                },
                "nNum" : function(){
                }
            });
    **/
    optionSetter : function(sName, fSetter) {
        switch (typeof sName) {
            case "undefined" :
                return this._htOption._htSetter;
            case "string" :
                if (typeof fSetter != "undefined") {
                    this._htOption._htSetter[sName] = jindo.$Fn(fSetter, this).bind();
                } else {
                    return this._htOption._htSetter[sName];
                }
                break;
            case "object" :
                for(var sKey in sName) {
                    this._htOption._htSetter[sKey] = jindo.$Fn(sName[sKey], this).bind();
                }
                break;
        }
        return this;
    },

    /**
        이벤트를 발생시킨다.

        @method fireEvent
        @param {String} sEvent 커스텀이벤트명
        @param {Object} oEvent 커스텀이벤트 핸들러에 전달되는 객체.
        @return {Boolean} 핸들러의 커스텀이벤트객체에서 stop메소드가 수행되면 false를 리턴
        @example
            //커스텀 이벤트를 발생시키는 예제
            var MyComponent = jindo.$Class({
                method : function() {
                    this.fireEvent('happened', {
                        sHello : 'world',
                        nAbc : 123
                    });
                }
            }).extend(jindo.m.Component);

            var oInst = new MyComponent().attach({
                happened : function(oCustomEvent) {
                    alert(oCustomEvent.sHello + '/' + oCustomEvent.nAbc); // 결과 : world/123
                }
            });

            <button onclick="oInst.method();">Click me</button>
    **/
    fireEvent : function(sEvent, oEvent) {
        oEvent = oEvent || {};
        var fInlineHandler = this['on' + sEvent],
            aHandlerList = this._htEventHandler[sEvent] || [],
            bHasInlineHandler = typeof fInlineHandler == "function",
            bHasHandlerList = aHandlerList.length > 0;

        if (!bHasInlineHandler && !bHasHandlerList) {
            return true;
        }
        aHandlerList = aHandlerList.concat(); //fireEvent수행시 핸들러 내부에서 detach되어도 최초수행시의 핸들러리스트는 모두 수행

        oEvent.sType = sEvent;
        if (typeof oEvent._aExtend == 'undefined') {
            oEvent._aExtend = [];
            oEvent.stop = function(){
                if (oEvent._aExtend.length > 0) {
                    oEvent._aExtend[oEvent._aExtend.length - 1].bCanceled = true;
                }
            };
        }
        oEvent._aExtend.push({
            sType: sEvent,
            bCanceled: false
        });

        var aArg = [oEvent],
            i, nLen;

        for (i = 2, nLen = arguments.length; i < nLen; i++){
            aArg.push(arguments[i]);
        }

        if (bHasInlineHandler) {
            fInlineHandler.apply(this, aArg);
        }

        if (bHasHandlerList) {
            var fHandler;
            for (i = 0, fHandler; (fHandler = aHandlerList[i]); i++) {
                fHandler.apply(this, aArg);
            }
        }

        return !oEvent._aExtend.pop().bCanceled;
    },

    /**
        커스텀 이벤트 핸들러를 등록한다.

        @method attach
        @param {String} sEvent 커스텀 이벤트 명
        @param {Function} fHandlerToAttach 등록 할 커스텀 이벤트 핸들러
            @param {Object} fHandlerToAttach.oCustomEvent 커스텀 이벤트 객체
        @return {this} 컴포넌트 객체 자신
        @example
            //이벤트 등록 방법 예제
            //아래처럼 등록하면 appear 라는 사용자 이벤트 핸들러는 총 3개가 등록되어 해당 이벤트를 발생시키면 각각의 핸들러 함수가 모두 실행됨.
            //attach 을 통해 등록할때는 이벤트명에 'on' 이 빠지는 것에 유의.
            function fpHandler1(oEvent) { .... };
            function fpHandler2(oEvent) { .... };

            var oInst = new MyComponent();
            oInst.onappear = fpHandler1; // 직접 등록
            oInst.attach('appear', fpHandler1); // attach 함수를 통해 등록
            oInst.attach({
                appear : fpHandler1,
                more : fpHandler2
            });
    **/
    attach : function(sEvent, fHandlerToAttach) {
        if (arguments.length == 1) {

            jindo.$H(arguments[0]).forEach(jindo.$Fn(function(fHandler, sEvent) {
                this.attach(sEvent, fHandler);
            }, this).bind());

            return this;
        }

        var aHandler = this._htEventHandler[sEvent];

        if (typeof aHandler == 'undefined'){
            aHandler = this._htEventHandler[sEvent] = [];
        }

        aHandler.push(fHandlerToAttach);

        return this;
    },

    /**
        커스텀 이벤트 핸들러를 해제한다.

        @method detach
        @param {String} sEvent 커스텀 이벤트 명
        @param {Function} fHandlerToDetach 등록 해제 할 커스텀 이벤트 핸들러
        @return {this} 컴포넌트 객체 자신
        @example
            //이벤트 해제 예제
            oInst.onappear = null; // 직접 해제
            oInst.detach('appear', fpHandler1); // detach 함수를 통해 해제
            oInst.detach({
                appear : fpHandler1,
                more : fpHandler2
            });
    **/
    detach : function(sEvent, fHandlerToDetach) {
        if (arguments.length == 1) {
            jindo.$H(arguments[0]).forEach(jindo.$Fn(function(fHandler, sEvent) {
                this.detach(sEvent, fHandler);
            }, this).bind());

            return this;
        }

        var aHandler = this._htEventHandler[sEvent];
        if (aHandler) {
            for (var i = 0, fHandler; (fHandler = aHandler[i]); i++) {
                if (fHandler === fHandlerToDetach) {
                    aHandler = aHandler.splice(i, 1);
                    break;
                }
            }
        }

        return this;
    },

    /**
        등록된 모든 커스텀 이벤트 핸들러를 해제한다.

        @method detachAll
        @param {String} sEvent 이벤트명. 생략시 모든 등록된 커스텀 이벤트 핸들러를 해제한다.
        @return {this} 컴포넌트 객체 자신
        @example
            //"show" 커스텀이벤트 핸들러 모두 해제
            oInst.detachAll("show");

            //모든 커스텀이벤트 핸들러 해제
            oInst.detachAll();
    **/
    detachAll : function(sEvent) {
        var aHandler = this._htEventHandler;

        if (arguments.length) {

            if (typeof aHandler[sEvent] == 'undefined') {
                return this;
            }

            delete aHandler[sEvent];

            return this;
        }

        for (var o in aHandler) {
            delete aHandler[o];
        }
        return this;
    }
});

/**
    다수의 컴포넌트를 일괄 생성하는 Static Method

    @method factory
    @static
    @param {Array} aObject 기준엘리먼트의 배열
    @param {HashTable} htOption 옵션객체의 배열
    @return {Array} 생성된 컴포넌트 객체 배열
    @example
        var Instance = jindo.m.Component.factory(
            cssquery('li'),
            {
                foo : 123,
                bar : 456
            }
        );
**/

jindo.m.Component.factory = function(aObject, htOption) {
    var aReturn = [],
        oInstance;

    if (typeof htOption == "undefined") {
        htOption = {};
    }

    for(var i = 0, el; (el = aObject[i]); i++) {
        oInstance = new this(el, htOption);
        aReturn[aReturn.length] = oInstance;
    }

    return aReturn;
};

/**
    컴포넌트의 생성된 인스턴스를 리턴한다.
    
    @method getInstance
    @static
    @deprecated
    
    @remark 본 메서드는 deprecated 되었으며 멀지 않은 릴리즈부터 사라질 예정입니다. 
    
    @return {Array} 생성된 인스턴스의 배열
**/
jindo.m.Component.getInstance = function(){
    if (typeof this._aInstance == "undefined") {
        this._aInstance = [];
    }
    return this._aInstance;
};/**
	@fileOverview 엘리먼트의 css 스타일을 조정해 부드러운 움직임(변형)을 표현한다
	@author "oyang2"
	@version 1.7.1
	@since 2011. 12. 13.
**/
/**
	jindo.m.Transition 컴포넌트는 엘리먼트의 css 스타일을 조정해 부드러운 움직임(변형)을 표현한다

	@class jindo.m.Transition
	@extends jindo.m.Component
	@keyword transition, 트랜지션
	@group Component

	@history 1.3.0 Update {bUseCss3d} 옵션삭제
	@history 1.3.0 Update {bUseTimingFunction} 옵션추가
	@history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
	@history 1.2.0 Update {bUseCss3d} Option 추가
	@history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
	@history 1.1.0 Update Android의 경우 translate호출시에 [css3+자바스크립트] 형식을 혼합해서 사용하는 형식으로 수정
	@history 1.1.0 Update 스크립트로 TimingFunction을 구현
	@history 1.0.0 Release 최초 릴리즈
**/
if(typeof jindo.m.TimingFunction === 'undefined'){
	jindo.m.TimingFunction ={};
}

jindo.m.TimingFunction._cubicBezier = function(x1, y1, x2, y2){
	return function(t){
		var cx = 3.0 * x1,
				bx = 3.0 * (x2 - x1) - cx,
				ax = 1.0 - cx - bx,
				cy = 3.0 * y1,
				by = 3.0 * (y2 - y1) - cy,
				ay = 1.0 - cy - by;

	    function sampleCurveX(t) {
	    	return ((ax * t + bx) * t + cx) * t;
	    }
	    function sampleCurveY(t) {
	    	return ((ay * t + by) * t + cy) * t;
	    }
	    function sampleCurveDerivativeX(t) {
	    	return (3.0 * ax * t + 2.0 * bx) * t + cx;
	    }
	    function solveCurveX(x,epsilon) {
	    	var t0, t1, t2, x2, d2, i;
	    	for (t2 = x, i = 0; i<8; i++) {
	    		x2 = sampleCurveX(t2) - x;
	    		if (Math.abs(x2) < epsilon) {
	    			return t2;
	    		}
	    		d2 = sampleCurveDerivativeX(t2);
	    		if(Math.abs(d2) < 1e-6) {
	    			break;
	    		}
	    		t2 = t2 - x2 / d2;
	    	}
		    t0 = 0.0;
		    t1 = 1.0;
		    t2 = x;
		    if (t2 < t0) {
		    	return t0;
		    }
		    if (t2 > t1) {
		    	return t1;
		    }
		    while (t0 < t1) {
		    	x2 = sampleCurveX(t2);
		    	if (Math.abs(x2 - x) < epsilon) {
		    		return t2;
		    	}
		    	if (x > x2) {
		    		t0 = t2;
		    	} else {
		    		t1 = t2;
		    	}
		    	t2 = (t1 - t0) * 0.5 + t0;
		    }
	    	return t2; // Failure.
	    }
	    return sampleCurveY(solveCurveX(t, 1 / 200));
	};
};

jindo.m.TimingFunction.linear =  jindo.m.TimingFunction._cubicBezier(0.0,0.0,1.0,1.0);
jindo.m.TimingFunction.ease_out =  jindo.m.TimingFunction._cubicBezier(0.0,0.0,0.58,1.0);
jindo.m.TimingFunction.ease_in =  jindo.m.TimingFunction._cubicBezier(0.42,0.0,1.0,1.0);
jindo.m.TimingFunction.ease_in_out =  jindo.m.TimingFunction._cubicBezier(0.42,0.0,0.58,1.0);
jindo.m.TimingFunction.ease_out_in =  jindo.m.TimingFunction._cubicBezier(0.00,0.42,1.0,0.58);
jindo.m.TimingFunction.cubicBezier =  function(x1, y1, x2, y2){
	return  jindo.m.TimingFunction._cubicBezier(x1, y1, x2, y2);
};

jindo.m.Transition = jindo.$Class({
	_aTaskQueue : null,

	/* @lends jindo.m.Transition.prototype */
	/**
		초기화 함수
		@constructor

		@param {Object} [htOption] 초기화 옵션 객체
			@param {String} [htOption.sTransitionTimingFunction='ease-in-out'] css Timeing function을 설정
			<ul>
			<li>ease : 속도가 급가속되다가 급감속되는 효과 (거의 끝에서 급감속됨)</li>
			<li>linear : 등속효과</li>
			<li>ease-in : 속도가 점점 빨라지는 가속 효과</li>
			<li>ease-out : 속도가 천천히 줄어드는 감속효과</li>
			<li>ease-in-out : 속도가 천천히 가속되다가 천천히 감속되는 효과 (가속과 감속이 부드럽게 전환됨)</li>
			</ul>
			@param {Function} [htOption.bUseTimingFunction=jindo.m._isUseTimingFunction()] translate 혹은 translate3d 속성을 css3의 TimingFunction을 사용할지 여부. <br /> false로 설정할 경우 자바스크립트의 setTimeout을 이용하여 애니메이션을 처리한다.
	**/
	$init : function(htOption) {
		this.option({
			/**
				기본 속성 지정
				@to do
			**/
			sTransitionTimingFunction : 'ease-in-out',
			bUseTimingFunction : jindo.m._isUseTimingFunction()
		});
		this.option(htOption || {});
		this._initVar();
		this._attachEvent();
	},

	/**
		jindo.m.Transition 에서 사용하는 모든 인스턴스 변수를 초기화한다.
	**/
	_initVar: function() {
		this._aTaskQueue = [];
		this._bIsPlaying = false;
		this._sCssPrefix = jindo.m.getCssPrefix();

		this._aBeforeStatus = []; //transition 시작전 element의 style 상태를 저장한 배열

		if(this._sCssPrefix.length > 0){
			this._sCssPrefix = '-' + this._sCssPrefix.toLowerCase()+'-';
		}

		this._bNoUseCss3d = !this.option('bUseTimingFunction');
		//안드로이드 전용 타이머.
		this._nTimerAnimate = null;
		this._htCurrentTask = null;
	},

	/**
		Transition 을 시작한다.
		@method start
	**/
	start : function(){
		if((!this.isPlaying()) && this.isExistTask()){
			this._prepareTask();
		}
	},

	/**
		현재 트랜지션이 진행중인지 리턴한다.

		@method isPlaying
		@return {Boolean}
	**/
	isPlaying : function(){
		return this._bIsPlaying;
	},


	/**
		다음 진행할 트랜지션이 있는지 리턴한다.

		@method isExistTask
		@return {Boolean}
	**/
	isExistTask : function(){
		if(!this._aTaskQueue){
			return false;
		}
		var nLen = this._aTaskQueue.length;
		var bValue = (nLen > 0)? true : false;

		return bValue;
	},

	/**
		Transition을 큐에 담는다.
		여러 단계의 Transition을 담아두고 순차적으로 실행시킬때 사용한다.
		@remark start() 메소드가 호출되기 전까지 수행되지 않는다.

		@method queue
		@param {HTMLElement} el 트랜지션 대상 에리먼트
		@param {Number} nDuration 트랜지션 수행 시간
		@param {Object} htCommand 적용할 명령 해시 테이블
		@return {this}
		@example 여러개의 명령을 지정하는 예제
			oTransition.queue(jindo.$('div1'),
					1000, {
						htStyle : {
							"left : "200px",
							"top" : "50px",
							"width" : "200px",
							"height" : "200px",
							"background-color" : "#CCC"
						}
					}
			);

		@example 여러개의 명령을 지정하는 예제(css3 명령 지정예제)
			oTransition.queue(jindo.$('div1'),
					1000, {
						htStyle : {
							"width" : "200px",
							"height" : "200px",
							"background-color" : "#CCC"
						},
						htTransform : {
							"transform" : "translate(100px,100px)"
						}
					}
			);

		@example 콜백함수를 지정하는 예제
			oTransition.queue(jindo.$('div1'),
					1000, {
						htStyle : {
							"width" : "200px",
							"height" : "200px",
							"background-color" : "#CCC"
						},
						htTransform : {
							"transform" : "translate(100px,100px)"
						},
						fCallback : function(){
							alert("트랜지션 끝");
						}
					}
			);
		@example 콜백에 스타일을 지정하는 예제
			oTransition.queue(jindo.$('div1'),
					1000, {
						htStyle : {
							"width" : "200px",
							"height" : "200px",
							"background-color" : "#CCC"
						},
						htTransform : {
							"transform" : "translate(100px,100px)"
						},
						fCallback : {
							htStyle : {
								"background-color" : "red"
							},
							htTransform : {
								"transform" : "rotate(30deg)"
							}
						}
					}
			);
	**/
	queue : function(elTarget, nDuration, aCommand){
		var htTask = {
			sType : 'style',
			sTaskName : '',
			elTarget : elTarget,
			nDuration : nDuration
		};

		htTask.htDefault = {};
		htTask.htStyle = aCommand.htStyle || {};
		htTask.htTransform = aCommand.htTransform || {};
		htTask.sTaskName = aCommand.sTaskName || null;
		htTask.fCallback =  aCommand.fCallback;

		htTask.htDefault['transition-timing-function'] = (typeof htTask.htTransform['transition-timing-function'] === 'undefined')? this._getDefaultTransition().sTransitionTimingFunction : htTask.htTransform['transition-timing-function'];
		htTask.htDefault['transition-property'] = (typeof htTask.htTransform['transition-property'] === 'undefined')? "all" : htTask.htTransform['transition-property'];
		htTask.htDefault['transition-duration']  = nDuration+"ms";

		this._pushTask(htTask);
		return this;
	},

	/**
		현재 트랜지션을 중지한다. bAfter가 true이면 현재 트랜지션이 완료된 상태로 중지한다.<br />
		false 값이면 현재 트랜지션 이전 상태로 중지한다.

		@method stop
		@param {Boolean} bAfter
	**/
	stop : function(bAfter){
		//console.log('stop! ' + this._bIsPlaying);
		if(!this.isPlaying()){
			return;
		}
		//console.log('STOP!2 호출');
		if(typeof bAfter === 'undefined'){
			bAfter = true;
		}

		/**
			Transition의 stop 메소드를 통해 중지하였을 때 발생

			@event stop
			@param {String} sType 커스텀 이벤트명
			@param {String} sTaskName 사용자가 설정한 sTaskName. 설정한 값이 없을 경우 null값 반환
			@param {HTMLElement} element Transition 대상 엘리먼트
			@param {Number} nDuration Transiton이 수행되는 시간
			@param {Function} stop 수행시 Transition이 중지 되지 않고 그대로 실행된다.
		**/
		if(!this._fireCustomEvent('stop', {
			element : this._htCurrentTask.elTarget,
			sTaskName : this._htCurrentTask.sTaskName,
			nDuration : this._htCurrentTask.nDuration
		})){
			return;
		}

		this._stopTransition(bAfter);
	},

	/**
		현재 queue에 쌓여있는 모든 태스크를 삭제한다. 현재 트랜지션이 실행중이면 중지하고 삭제한다.
		@remark bStopAfter가 true이면 현재 트랜지션이 완료된 상태로 중지하고 false 값이면 현재 트랜지션 이전 상태로 중지한다.

		@method clear
		@param {Boolean} bStopAfter
		@history 1.1.0 Update Method 추가
	**/
	clear : function(bStopAfter){
		this.stop(bStopAfter);
		this._aTaskQueue = [];
		//console.log('TranslateCrear!');
	},

	/**
		현재 태스크를 재시작한다.
	**/
	_resume : function(){
		if(this._htCurrentTask){
			this._doTask();
		}
	},

	/**
		현재 진행중인 태스크를 중지한다. bAfter가 true 이면 태스크 이후의 설정으로 바꾸고 false 이면 태스크 전의 설정으로 바꿔준다.
		@param {Boolean} bAfter
	**/
	_stopTransition : function(bAfter){
		//console.log('Stop!');
		this._detachTransitionEnd();

		this._elCurrent.style[this._sCssPrefix+'transition-property'] = 'none';
		this._initTransition();

		//transition 이전 상태로 되돌려야 할 경우
		if(!bAfter){
			//console.log(this._elCurrent);
			var nIndex = this._getBeforeStatusElement(this._elCurrent);
			if(nIndex > -1){
				//console.log(this._aBeforeStatus[nIndex].style);
				jindo.$Element(this._elCurrent).attr('style', this._aBeforeStatus[nIndex].style);
			}
		}

		this._htCurrentTask = null;
		this._bIsPlaying = false;
	},

	/**
		진행할 태스크를 준비하고 실행한다.
	**/
	_prepareTask : function(){
		var htTask = this._popTask();

		if(htTask === null || !htTask){
			this._bIsPlaying = false;
			return;
		}
		this._htCurrentTask = htTask;

		this._resume();
	},

	/**
		htTask를 queue에 추가 한다.
		@param {Object}
	**/
	_pushTask : function(htTask){
		this._aTaskQueue.push(htTask);
	},

	/**
		현재 queue 에저장된 작업에서 진행 해야 할 작업을 리턴한다,
		@return {HashTable | null}
	**/
	_popTask : function(){
		if(!this.isExistTask()){
			return null;
		}

		var htTask = this._aTaskQueue.shift();
		if(htTask){
			return htTask;
		}else{
			return null;
		}

	},

	/**
		현재 태스크를 실행한다.
	**/
	_doTask : function(){
		//console.log('//// doTask ' +this._htCurrentTask.sTaskName);
		if(this._htCurrentTask){
			this._bIsPlaying = true;

			/**
				Transition이 시작 될때 발생

				@event start
				@param {String} sType 커스텀 이벤트명
				@param {String} sTaskName 사용자가 설정한 sTaskName. 설정한 값이 없을 경우 null값 반환
				@param {HTMLElement} element Transition 대상 엘리먼트
				@param {Number} nDuration Transiton이 수행되는 시간
				@param {Function} stop 수행시 Transition이 실행되지 않는다. 전체 Transtion 실행도 멈춘다
			**/
			if(!this._fireCustomEvent('start', {
				element : this._htCurrentTask.elTarget,
				sTaskName : this._htCurrentTask.sTaskName,
				nDuration : this._htCurrentTask.nDuration
			})){
				//this._htCurrentTask;
				return;
			}

			var el = this._htCurrentTask.elTarget;
			var wel = jindo.$Element(el);
			this._elCurrent = el;

			this._setBeforeStatus(wel);

			var nDuration = this._htCurrentTask.nDuration;

			var bAttachEvt = this._bAttachTransitionEvt();
			if(bAttachEvt){
				this._attachTransitionEnd(el);
			}

			//기본 transition을 설정한다.
			this._setDefaultTransition(wel,bAttachEvt);

			var bDiff = false;
			bDiff = this._setTransform(wel);
			bDiff = this._setStyle(wel, this._htCurrentTask.htStyle) || bDiff;
			
			if(nDuration === 0){
				this._onTransitionEnd();
			}else {
				if(!bDiff){
					var self = this;
					setTimeout(function(){
						self._onTransitionEnd();
					}, nDuration);
				}
			}
		}
	},

	/**
		트랜지션 기본값을 설정한다
		@param {Element} wel
	**/
	_setDefaultTransition : function(wel, bAttachEvt){
		for(var p in this._htCurrentTask.htDefault){
			var sValue = this._htCurrentTask.htDefault[p];

			if(!(p.indexOf('duration') > -1 && !bAttachEvt)){
				wel.$value().style[this._sCssPrefix+p] = sValue;
			}
		}
	},

	/**
		wel에 스타일을 설정한다.

		@param {Element} wel
		@param {HashTable{
	**/
	_setStyle : function(wel, htOption){
		var bDiff = false;
		var elBody = document.getElementsByTagName("body")[0];
		var wTmpEl = jindo.$Element("<span style='left:-1000px;'>");
		
		for(var p in htOption){
			
			var sCurrent = wel.css(p);
			wTmpEl.css(p, htOption[p]);
			var elTmpAppend = elBody.appendChild(wTmpEl.$value());
			
			if(sCurrent != wTmpEl.css(p)){
				bDiff = true;
			}
			elBody.removeChild(elTmpAppend);
			wel.css(p, htOption[p]);
		}
		return bDiff;

	},


	_setStyleForAndroid : function(){

	},

	/**
		wel에 css3의 transform을 설정한다.
	**/
	_setTransform : function(wel){
		var bDiff = false;
		if(this._bNoUseCss3d){ //안드로이드 전용 transform
			bDiff = this._setTransformForAnrdoid(wel);
		}else{
			bDiff = this._setTransformForIos(wel);
		}

		return bDiff;
	},

	/**
		css3의 transfrom을 설정한다.
	**/
	_setTransformForIos : function(wel){
		var bDiff = false;
		for (var p in this._htCurrentTask.htTransform){
			var sValue = this._htCurrentTask.htTransform[p];
			wel.$value().style[this._sCssPrefix+p] = sValue;
			bDiff = true;
		}
		return bDiff;
	},

	/**
		css3와 javascript 방식으로 translate 시키는 로직
	**/
	_setTransformForAnrdoid : function(wel){
		var bDiff = false;
		var el = wel.$value();
		//console.log('//', this._htCurrentTask.htTransform);

		for (var p in this._htCurrentTask.htTransform){
			var sValue = this._htCurrentTask.htTransform[p];

			if(sValue.indexOf('translate') > -1){
				var nDuration = this._htCurrentTask.nDuration;
				var reg = new RegExp(/(translate.*)\((.*)\)/);
				var aMatch = sValue.match(reg);
				var sPreValue = aMatch[1];
				var aTemp = aMatch[2].replace(/px/g,'').split(',');
				var sTransfrom = "transform";
				var htBeforeOffset = jindo.m.getCssOffset(el);
				//console.log(sValue);
				var startTime = (new Date()).getTime();
				var self = this;
				(function translate(){
					//console.log('translate');
					var now = (new Date()).getTime();
					//console.log(now - (startTime + nDuration));
					if(now >= (startTime + nDuration) ){
						//clearTimeout(self._nTimerAnimate);
						cancelAnimationFrame(self._nTimerAnimate);
						//최종px 움직이기
						el.style[self._sCssPrefix+sTransfrom] = sValue;
						self._onTransitionEnd();
						return;
					}
					//debugger;
					var nGap = (now - startTime);
					var nX = ((sPreValue.indexOf('X')> -1) || (aTemp.length >1))? aTemp[0] : null;
					var nY = null;
					if(sPreValue.indexOf('Y')> -1){
						nY = aTemp[0];
					}else if(aTemp.length > 1){
						nY = aTemp[1];
					}
					var nZ = null;
					if(sPreValue.indexOf('Z')> -1){
						nZ = aTemp[0];
					}else if(aTemp.length > 2){
						nZ = aTemp[2];
					}
					var aText =[];
					var sX = (nX !== null)? self._getcubicBeziserPosition(htBeforeOffset.left, nX, nDuration, nGap)+"px" : null;
					var sY = (nY !== null)? self._getcubicBeziserPosition(htBeforeOffset.top, nY, nDuration, nGap)+"px" : null;
					var sZ = (nZ !== null)? nZ+"px" : null;
					//debugger;
					if(sX !== null) {aText.push(sX);}
					if(sY !== null) {aText.push(sY);}
					if(sZ !== null) {aText.push(sZ);}
					//console.log(aText.join(","));

					//el.style[self._sCssPrefix+sTransfrom] = sPreValue+"("+sX+"px,"+sY+"px)";
					el.style[self._sCssPrefix+sTransfrom] = sPreValue+"("+aText.join(",")+")";
					//console.log(self._sCssPrefix+sTransfrom, sPreValue+"("+aText.join(",")+")");
					//self._nTimerAnimate = setTimeout(translate, 1);
					self._nTimerAnimate = requestAnimationFrame(translate);
				})();

			}else{
				wel.$value().style[this._sCssPrefix+p] = sValue;
			}
			bDiff = true;
		}
		return bDiff;
	},

	/**
		transitionEnd 이벤트를 걸어야 하는지에 대한 여부를 리턴한다.
		- duration이 0일 경우에는 이벤트를 걸지 않는다.
		- android 방식일 경우에도 걸지 않는다.

		@retrun {Boolean}
	**/
	_bAttachTransitionEvt : function(){
		var bValue = true;
		if(this._htCurrentTask.nDuration === 0) {
			bValue = false;
		}else{
			if(this._bNoUseCss3d){
				for (var p in this._htCurrentTask.htTransform){
					var sValue = this._htCurrentTask.htTransform[p];
					if(sValue.indexOf('translate') > -1){
						bValue = false;
					}
				}
			}
		}

		return bValue;
	},

	/**
		wel의 태스크 실행전 css로 복구한다.
		@param {Element}wel
	**/
	_setBeforeStatus : function(wel){
		var nIndex = this._getBeforeStatusElement(wel.$value());

		if(nIndex > -1){
			this._aBeforeStatus[nIndex].style = wel.attr('style');
		}else{
			this._aBeforeStatus.push({
				el : wel.$value(),
				style : wel.attr('style')
			});
		}
	},

	/**
		저장된 이전 task에서 el에 관련된 task의 index를 리턴한다.
		@param {HTMLElement} el
		@return {Number} index
	**/
	_getBeforeStatusElement : function(el){
		var nIndex = -1;

		for(var i=0,nLen = this._aBeforeStatus.length; i<nLen; i++){
			if(this._aBeforeStatus[i].el === el){
				nIndex = i;
				break;
			}
		}

		return nIndex;
	},

	/**
		현재 트랜지션의 기본설정값을 리턴한다.
	**/
	_getDefaultTransition : function(){

		return {
			sTransitionTimingFunction : this.option('sTransitionTimingFunction'),
			TransitionProperty : 'all'
		};
	},

	/**
		커스텀 이벤트를 발생시킨다.
		@param {String} 커스텀 이벤트 이름
		@param {Object} 커스텀 이벤트 파라미터
	**/
	_fireCustomEvent : function(sName, htParam){
		return this.fireEvent(sName,htParam);
	},

	/**
		트랜지션이 모두 종료된 시점에 발생하며 콜백함수가 있으면 콜백을 실행시키고 다음 작업이 있으면 다음 작업을 시작한다.
	**/
	_onTransitionEnd : function(){
		this._detachTransitionEnd();
		//console.log('transitionEND');
		//불필요한  transition css 속성 제거
		this._initTransition();
		var self = this;
		if(this._htCurrentTask){
			var sCallbackType = typeof this._htCurrentTask.fCallback;
			if(sCallbackType == 'function'){
				if(this._bNoUseCss3d){
					setTimeout(function(){
						self._htCurrentTask.fCallback();
					},5);
				}else{
					self._htCurrentTask.fCallback();
				}
			}else if(sCallbackType == 'object'){
				var wel = jindo.$Element(this._htCurrentTask.elTarget), p;
				for (p in this._htCurrentTask.fCallback.htTransform){
					var sValue = this._htCurrentTask.fCallback.htTransform[p];
					if(p == 'transform'){
						var sPrefix = this._sCssPrefix+p;
						var sText = wel.$value().style[sPrefix];
						if(sText.length > 0){
							//@to-do transform 추가하거나 기존값이면 대체하는 로직 추가할것;
							//sValue = sText + sValue;
							sValue = sValue;
						}
					}
					wel.$value().style[this._sCssPrefix+p] = sValue;
				}
				for (p in this._htCurrentTask.fCallback.htStyle) {
					wel.css(p, this._htCurrentTask.fCallback.htStyle[p]);
				}

			}
		}

		if(this._htCurrentTask){
			/**
				Transition이 끝날 때 발생

				@event end
				@param {String} sType 커스텀 이벤트명
				@param {String} sTaskName 사용자가 설정한 sTaskName. 설정한 값이 없을 경우 null값 반환
				@param {HTMLElement} element Transition 대상 엘리먼트
				@param {Number} nDuration Transiton이 수행되는 시간
				@param {Function} stop 수행시 영향을 받는것은 없다
			**/
			this._fireCustomEvent('end',{
				element : this._htCurrentTask.elTarget,
				sTaskName : this._htCurrentTask.sTaskName,
				nDuration : this._htCurrentTask.nDuration
			});
		}
		setTimeout(function(){
			self._prepareTask();
		},10);
	},

	/**
		트랜지션의 기본값으로 설정한다.
	**/
	_initTransition : function(el){
		if(typeof el === 'undefined'){
			el = this._elCurrent;
		}

		//불필요한  transition css 속성 제거
		el.style[this._sCssPrefix +'transition-duration'] = null;
		el.style[this._sCssPrefix +'transition-timing-function'] = null;
		el.style[this._sCssPrefix + 'perspective'] = null;
		el.style[this._sCssPrefix + 'transform-style']  = null;
		el.style[this._sCssPrefix +'transition-property'] = null;

	},

	/**
		현재 설정된 timingfunction을 기반으로 시작지점과 끝 지점의 position을 기반으로 현재 시간의 위치를 계산하여 리턴한다.
		@param {Number} 시작지점
		@param {Number} 끝지점
		@param {Number} 트랜지션 duration 시간
		@param {Number} 위치를 알고싶은 현재 시점의 시간.
		@return {Number} 현재 시간의 계산된 위치
	**/
	_getcubicBeziserPosition : function(nStart, nEnd, nDuration, nCurrentTime){
		nStart = nStart*1;
		nEnd = nEnd*1;
		var sFunction = this.option('sTransitionTimingFunction').replace(/-/g,'_');
		var f  = jindo.m.TimingFunction[sFunction];

		var t = nCurrentTime/nDuration;
		t = (t>1)? 1: t;

		var nCurrent = f(t);
		var nValue = nStart+ ((nEnd-nStart)* nCurrent.toFixed(2));

		return 	nValue;
	},

	/**
		csstransitionEnd 이벤틀 attach
	**/
	_attachTransitionEnd : function(el){
		this._elTransition = el;
		jindo.m.attachTransitionEnd(this._elTransition, this._htEvent['transitionEnd']);
	},

	/**
		csstransitionEnd 이벤트 detach
	**/
	_detachTransitionEnd : function(){
		if(this._elTransition){
			jindo.m.detachTransitionEnd(this._elTransition, this._htEvent['transitionEnd']);
			this._elTransition = null;
		}
	},

	/**
		jindo.m.Transition 에서 사용하는 모든 이벤트를 바인드한다.
	**/
	_attachEvent : function() {
		this._htEvent = {};
		this._htEvent['transitionEnd'] = jindo.$Fn(this._onTransitionEnd, this).bind();
	},

	/**
		jindo.m.Transition 에서 사용하는 모든 이벤트를 해제한다.
	**/
	_detachEvent : function() {
		this._detachTransitionEnd();
		this._htEvent = null;
	},

	/**
		jindo.m.Transition 에서 사용하는 모든 객체를 release 시킨다.
		@method destroy
	**/
	destroy : function() {
		this._detachEvent();

		for(var p in this._htWElement) {
			this._htWElement[p] = null;
		}
		this._htWElement = null;
		this._aTaskQueue = null;
		this._bIsPlaying = null;
		this._sCssPrefix = null;
		this._aBeforeStatus = null;
		this._bNoUseCss3d = null;
		this._nTimerAnimate = null;

		this._htCurrentTask = null;
	}
}).extend(jindo.m.Component);/**
	@fileOverview UI 컴포넌트를 구현하기 위한 코어 클래스
	 @version 1.7.1
**/
/**
	UI Component에 상속되어 사용되는 Jindo Mobile Component의 Core

	@class jindo.m.UIComponent
	@extends jindo.m.Component
	@keyword uicomponent, component, 유아이컴포넌트
	@group Component
	@invisible
**/
jindo.m.UIComponent = jindo.$Class({
	/** @lends jindo.m.UIComponent.prototype */

	/**
		@constructor
		jindo.m.UIComponent를 초기화한다.
	**/
	$init : function() {
		this._bIsActivating = false; //컴포넌트의 활성화 여부
	},

	/**
		컴포넌트의 활성여부를 가져온다.

		@method isActivating
		@return {Boolean}
	**/
	isActivating : function() {
		return this._bIsActivating;
	},

	/**
		컴포넌트를 활성화한다.
		_onActivate 메소드를 수행하므로 반드시 상속받는 클래스에 _onActivate 메소드가 정의되어야한다.

		@method activate
		@return {this}
	**/
	activate : function() {
		if (this.isActivating()) {
			return this;
		}
		this._bIsActivating = true;

		if (arguments.length > 0) {
			this._onActivate.apply(this, arguments);
		} else {
			this._onActivate();
		}

		return this;
	},

	/**
		컴포넌트를 비활성화한다.
		_onDeactivate 메소드를 수행하므로 반드시 상속받는 클래스에 _onDeactivate 메소드가 정의되어야한다.

		@method deactivate
		@return {this}
	**/
	deactivate : function() {
		if (!this.isActivating()) {
			return this;
		}
		this._bIsActivating = false;

		if (arguments.length > 0) {
			this._onDeactivate.apply(this, arguments);
		} else {
			this._onDeactivate();
		}

		return this;
	}
}).extend(jindo.m.Component);
/**
    @fileOverview 특정 Layer에 애니메이션 효과를 적용하여 보여주거나, 숨기거나, 이동시키는 컴포넌트
    @author "oyang2"
    @version 1.7.1
    @since 2011. 12. 13.
**/
/**
    특정 Layer에 애니메이션 효과를 적용하여 보여주거나, 숨기거나, 이동시키는 컴포넌트

    @class jindo.m.LayerEffect
    @extends jindo.m.UIComponent
    @uses jindo.m.Transition
    @keyword layer, effect, animation, 레이어, 효과, 애니메이션
	@group Component
    
    @history 1.5.0 Support Window Phone8 지원
    @history 1.4.0 Support  iOS 6 지원
    @history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
    @history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
    @history 1.1.0 Bug slide시 옵션으로 거리값을 지정해도 설정되지 않던 문제 해결
    @history 0.9.0 Release 최초 릴리즈
**/

jindo.m.LayerEffect = jindo.$Class({
    /* @lends jindo.m.LayerEffect.prototype */
    /**
        초기화 함수

        @constructor
        @param {Object} [htOption] 초기화 옵션 객체
            @param {Number} [htOption.nDuration=250] 애니메이션 적용시간 (ms)
            @param {String} [htOption.sTransitionTimingFunction='ease-in-out'] css Timeing function을 설정
            @param {Boolean} [htOption.bActivateOnload=true] 컴포넌트 로드시 activate() 수행여부
    **/
    $init : function(el, htUserOption) {
        this.option({
            nDuration : 250,
            bActivateOnload : true
        });
        this.option(htUserOption || {});
        this._initVar();
        this.setLayer(el);

        this._initTransition();

        if(this.option("bActivateOnload")) {
            this.activate();
        }
    },

    _htEffect :{
        'expand' : "jindo.m.ExpandEffect",
        'contract' : "jindo.m.ContractEffect",
        "fade" : "jindo.m.FadeEffect",
        "pop" : "jindo.m.PopEffect",
        "slide" : "jindo.m.SlideEffect",
        "flip" : "jindo.m.FlipEffect"
    },

    /**
        jindo.m.LayerEffect 에서 사용하는 모든 인스턴스 변수를 초기화한다.
    **/
    _initVar: function() {
        this._htEffectInstance  = {};
        this._htLayerInfo = {};
        this._htWElement = {}; //jindo.m.LayerEffect에서 사용하는 엘리먼트 참조

        this.bAndroid = jindo.m.getDeviceInfo().android;
        this.sClassHighligting = '_effct_hide_highlighting_tmp';
    },

    /**
        Transition 컴포넌트 생성
    **/
    _initTransition : function(){
        this._oTransition = new jindo.m.Transition();
    },

    /**
        sType에 해당하는 Effect의 인스턴스 생성한다.
        @param {String} sType
    **/
    _createEffect : function(sType){
        if(this._htEffect[sType] && !this._htEffectInstance[sType]) {

            //console.log("객체 생성 : new " +this._htEffect[sType] + "()" );
            try{
                this._htEffectInstance[sType] = eval("new " + this._htEffect[sType] + "()");
            }catch(e){
                //console.log(e);
            }

            this._htEffectInstance[sType].setLayerInfo(this._htLayerInfo);
        }
    },

    /**
        높이나 넓이값을 조정하여 레이어를 확대한다.
        @remark 현재 레이어가 안보이는 상태일 경우 레이어를 보이게 하고 애니메이션을 수행한다.

        @method expand
        @param {Object} htOption
        @example
            oLayerEffect.expand() //아래쪽으로 높이값을 조정하여 확대한다.
        @example
            oLayerEffect.expand({
                sDirection : 'up',  // 'up','down','left',right'설정가능하며 기본값은 'down'이다
                nDuration : 500, //효과 애니메이션 적용시간 (ms)
                sTransitionTimingFunction : 'ease-in-out', //효과 effect ('ease', 'linear', ease-in', 'ease-out', 'ease-in-out')
                htFrom : {opacity : 0, zIndex: 10}, //expand 이전의 css를 설정한다.
                htTo : {opacity : 1, zIndex: 20} //expand 이후의 css를 설정한다.
            });
    **/
    expand : function(htOption){
        var sType = 'expand';
        this._run(sType, htOption);
    },

    /**
        높이나 넓이값을 조정하여 레이어를 축소한다
        @remrark 현재 레이어가 안보이는 상태일 경우 레이어를 보이게 하고 애니메이션을 수행한다.

        @method contract
        @param {Object} htOption
        @example
            oLayerEffect.contract() //레이어를 아래쪽으로 방향으로 축소한다.
        @example
            oLayerEffect.contract({
                sDirection : 'up',  // 'up','down','left',right'설정가능하며 기본값은 'down'이다
                nDuration : 500, //효과 애니메이션 적용시간 (ms)
                sTransitionTimingFunction : 'ease-in-out', //효과 effect ('ease', 'linear', ease-in', 'ease-out', 'ease-in-out')
                htFrom : {opacity : 0, zIndex: 10}, //contract 이전의 css를 설정한다.
                htTo : {opacity : 1, zIndex: 20} //contract 이후의 css를 설정한다.
            });
    **/
    contract : function(htOption){
        var sType = 'contract';
        this._run(sType, htOption);
    },

    /**
        레이어의 투명도를 조정하여 숨기거나 보여준다.
        @remark fadeOut 이후에는 레이어를 감춘다.

        @method fade
        @param {Object} htOption
        @example
            oLayerEffect.fade(); //기본으로 fade In 효과 투명도를 높여 보여주는 효과를 준다
        @example
            oLayerEffect.fade({
                sDirection : 'out',  // 'in' 또는 'out'을 정할수 있으며 기본값은 'in' 이다.
                nDuration : 500, //효과 애니메이션 적용시간 (ms)
                sTransitionTimingFunction : 'ease-in-out', //효과 effect ('ease', 'linear', ease-in', 'ease-out', 'ease-in-out')
                htFrom : {opacity : 0, z-index: 10}, //fade 이전의 css를 설정한다. opacity 설정하지 않을 경우 기본값은 0이다
                htTo : {opacity : 1, z-index: 20} //fade 이후의 css를 설정한다.  opacity 설정하지 않을 경우 기본값은 1이다
            });
    **/
    fade : function(htOption){
        var sType = "fade";
        //console.log('\\\\\\ Fade', htOption );
        this._run(sType, htOption);
    },

    /**
        scale 조정을 통해 pop 효과를 낸다.
        @remark
            popOut 이후에는 레이어를 감춘다.<br />
            - ios3의 경우 scale 값이 0이 아닌 0.1로 세팅합니다. <br />
            - htFrom과 htTo의 scale을 설정하지 않으면 'in'일 경우 0-1로 설정하며 'out'일 경우 1-0으로 설정합니다.(ios3 예외)

        @method pop
        @param {Object} scale 조정을 통해 pop 효과를 낸다. popOut 이후에는 레이어를 감춘다.<br />
            - ios3의 경우 scale 값이 0이 아닌 0.1로 세팅합니다.<br />
            - htFrom과 htTo의 scale을 설정하지 않으면 'in'일 경우 0-1로 설정하며 'out'일 경우 1-0으로 설정합니다.(ios3 예외)

        @example
            oLayerEffect.pop() //pop in 효과를내며 scale을 점점 줄여서 레이어가 없어지는 효과를 낸다.
        @example
            oLayerEffect.pop({
                sDirection : 'in',  // 'in','out' 설정가능하며 기본값은 'in'이다
                nDuration : 500, //효과 애니메이션 적용시간 (ms)
                sTransitionTimingFunction : 'ease-in-out', //효과 effect ('ease', 'linear', ease-in', 'ease-out', 'ease-in-out')
                htFrom : {opacity : 0, zIndex: 10}, //pop 이전의 css를 설정한다. opacity의 기본값은 'in'의 경우 0.1이며 'out'의 경우 1이다
                htTo : {opacity : 1, zIndex: 20} //pop 이후의 css를 설정한다. opacity의 기본값은 'in'의 경우 1이며 'out'의 경우 0.1이다
            });
    **/
    pop : function(htOption){
        var sType = "pop";
        this._run(sType, htOption);
    },

    /**
        레이어를 설정된 방향으로 움직인다

        @method slide
        @param {Object} htOption
        @example
            oLayerEffect.slide(); //기본방향이 왼쪽이기 때문에 왼쪽으로 레이어의 넓이만큼 움직인다.
        @example
            oLayerEffect.slide({
                elBaseLayer :  jindo.$('wrapper') //기준 뷰 엘리먼트를 설정할 경우 레이어는 기준뷰를 중심으로 slide 동작을 합니다.
            });
        @example
            oLayerEffect.slide({
                sDirection : 'left', //'left, 'right, 'up', 'down' 설정가능하다
                nDuration : 500, //효과 애니메이션 적용시간 (ms)
                nSize : 200, //slide 할 거리, 디폴트 값은 레이어 크기가 됨 (px)
                sTransitionTimingFunction : 'ease-in-out', //효과 effect ('ease', 'linear', ease-in', 'ease-out', 'ease-in-out')
                elBaseLayer : jindo.$('wrapper'), //기준 뷰가 되는 엘리먼트, 없을 경우 설정하지 않는다.
                htTo : {opacity : 1} , //레이어의 slide 이후의 css를 설정
                htFrom : {opacity : 0.7}  //레이어의 slide 이전의 css를 설정
            });
    **/
    slide : function(htOption){
        var sType = "slide";
        this._run(sType, htOption);
    },

    /**
        레이어을 방향에 따라 뒤집는 효과를 낸다. (iOS 전용)

        @method flip
        @param{Object} htOption 레이어을 방향에 따라 뒤집는 효과를 낸다. (iOS 전용)
        @example
            oLayerEffect.flip(); //현재 레이어 엘리먼트를 좌우로 뒤집는다
        @example
            oLayerEffect.flip({
                sDirection : 'up',  // 'up','down','left',right'설정가능하며 기본값은 'left'이다
                nDuration : 500, //효과 애니메이션 적용시간 (ms)
                sTransitionTimingFunction : 'ease-in-out', //효과 effect ('ease', 'linear', ease-in', 'ease-out', 'ease-in-out')
                elFlipFrom : jindo.$('flip'), //두개의 레이어가 뒤집히는 효과를 낼때 뒤쪽으로 뒤집히는 엘리먼트, 한개 레이어 효과가 필요할때는 설정하지 않는다.
                elFlipTo : jindo.$('layer1') //두개의 레이어가 뒤집히는 효과를 낼때 앞쪽으로 뒤집히는 엘리먼트, 한개 레이어 효과가 필요할때는 설정하지 않는다
                htFrom : {opacity : 0, zIndex: 10}, //flip 이전의 css를 설정한다. opacity 값은 기본값은 0이다
                htTo : {opacity : 1, zIndex: 20} //flip 이후의 css를 설정한다. opacity 값은 기본값은 1이다
            });
    **/
    flip: function(htOption){
        var sType = "flip";
        this._run(sType, htOption);
    },

    /**
        현재 effect가 실행 여부를 리턴한다

        @method isPlaying
        @return {Boolean}
    **/
    isPlaying : function(){
        return this._oTransition.isPlaying();
    },

    /**
        커스텀 이벤트 발생
     */
    _fireCustomEvent : function(sType, htOption){
        return this.fireEvent(sType, htOption);
    },


    /**
        sType의 이펙트를 실행
        @param {String} sType
        @param {HashTabl}
     */
    _run : function(sType, htOption){
        if(!this._isAvailableEffect()){
            return;
        }

        this._createEffect(sType);

        if(typeof htOption === 'undefined'){
            htOption = {};
        }

        var oEffect = this._htEffectInstance[sType];

        var el = this.getLayer();
        var nDuration = (typeof htOption.nDuration  === 'undefined')? this.option('nDuration') : parseInt(htOption.nDuration,10);
        var htBefore = oEffect.getBeforeCommand(el, htOption);
        var htCommand = oEffect.getCommand(el, htOption);

        //customEvent
        /**
            애니메이션 효과가 시작하기 직전 발생한다

            @event beforeEffect
            @param {String} sType 커스텀 이벤트명
            @param {HTMLElement} elLayer 애니메이션 효과가 적용된 레이어 엘리먼트
            @param {String} sEffect 적용할 애니메이션 효과 이름 , '-'을 구분한다. (fade-in, slide-left)
            @param {Number} nDuration 애니메이션 적용 시간(ms)
            @param {Function} stop 수행시 애니메이션 효과 시작되지 않는다.
        **/
        if(!this._fireCustomEvent("beforeEffect", {
            elLayer : el,
            sEffect :htCommand.sTaskName,
            nDuration :nDuration
        })){
            return;
        }

        //console.log('LAYER=------- , rund');

        if(htBefore){
            this._oTransition.queue(this.getLayer(), 0, htBefore);
        }

        this._oTransition.queue(this.getLayer(), nDuration , htCommand);

        this._oTransition.start();
    },

    /**
        el을 을 effect 대상 레이어로 설정한다.

        @method setLayer
        @param {HTMLElement} el
    **/
    setLayer : function(el){
        this._htWElement["el"] = jindo.$(el);
        this._htWElement["wel"] = jindo.$Element(this._htWElement["el"]);
        var elFocus;
        //android 하이라이팅 문제로 인하여 엘리먼트 추가;
        if(!!this.bAndroid){
            elFocus = jindo.$$.getSingle('.'+this.sClassHighligting, this._htWElement['el']);

            if(!elFocus){
                var sTpl = '<a href="javascript:void(0)" style="position:absolute" class="'+this.sClassHighligting+'"></a>';
                elFocus = jindo.$(sTpl);
                this._htWElement['wel'].append(elFocus);
                elFocus.style.opacity = '0';
                elFocus.style.width= 0;
                elFocus.style.height= 0;
                elFocus.style.left = "-1000px";
                elFocus.style.top = "-1000px";
            }
        }

        this.setSize();
    },

    /**
        현재 이펙트를 멈춘다.
        @remark bAfter 가 true일 경우 이펙트 이후 상태로 멈추고, false 일경우 이펙트 이전 상태로 되돌린다.

        @method stop
        @return {Boolean} bAfter
    **/
    stop : function(bAfter){
        if(typeof bAfter === 'undefined'){
            bAfter = true;
        }
        if(this._oTransition){
            this._oTransition.stop(bAfter);
        }
    },

    /**
        현재 큐에 쌓여있는 모든 effect 실행을 삭제한다.
        @remark
            현재 이펙트가 실행중이면 중지하고 삭제한다.<br />
            bAfter 가 true일 경우 이펙트 이후 상태로 멈추고, false 일경우 이펙트 이전 상태로 되돌린다.

        @method clearEffect
        @return {Boolean} bAfter
        @history 1.1.0 Update Method 추가
    **/
    clearEffect : function(bAfter){
        if(this._oTransition){
            this._oTransition.clear(bAfter);
        }
    },
    /**
        현재 레이어를 리턴한다.

        @method getLayer
        @return {HTMLElement}
    **/
    getLayer : function(){
        return this._htWElement["el"];
    },

    /**
        레이어를 사이즈 및 CSS 정보를 설정한다.

        @method setSize
    **/
    setSize : function(){
        var elToMeasure = this._htWElement['el'].cloneNode(true);
        var welToMeasure = jindo.$Element(elToMeasure);
        welToMeasure.opacity(0);
        this._htWElement['wel'].after(welToMeasure);
        welToMeasure.show();

        this._htLayerInfo["nWidth"] = this._htWElement["wel"].width();
        this._htLayerInfo["nHeight"] = this._htWElement["wel"].height();

        welToMeasure.css({
            position : "absolute",
            top : "0px",
            left : "0px"
        });
        this._htLayerInfo['nMarginLeft'] = parseInt(welToMeasure.css('marginLeft'),10);
        this._htLayerInfo['nMarginTop'] = parseInt(welToMeasure.css('marginTop'),10);
        this._htLayerInfo['nMarginLeft']  = isNaN(this._htLayerInfo['nMarginLeft'] )? 0 : this._htLayerInfo['nMarginLeft'];
        this._htLayerInfo['nMarginTop'] = isNaN(this._htLayerInfo['nMarginTop'])? 0 : this._htLayerInfo['nMarginTop'];
        this._htLayerInfo['nOpacity'] = this._htWElement["wel"].opacity();
        this._htLayerInfo['sPosition'] = this._htWElement["wel"].css('position');
        var sDisplay = this._htWElement['wel'].css('display');

        sDisplay = ((sDisplay === 'none') || (sDisplay.length === 0))? 'block' : sDisplay;
        this._htLayerInfo['sDisplay'] = sDisplay;
        this._htLayerInfo['sClassHighligting'] = this.sClassHighligting;

        welToMeasure.leave();

        this._setEffectLayerInfo();

        //console.log('/////setSize', this._htLayerInfo);
    },

    /**
        레이어정보를 다시 설정한다.
     */
    _setEffectLayerInfo : function(){
        for(var p in this._htEffectInstance){
            this._htEffectInstance[p].setLayerInfo(this._htLayerInfo);
        }
    },
    /**
        transition end 이벤트 핸들러
     */
    _onTransitionEnd : function(oCustomEvent){
        if(oCustomEvent.sTaskName){
            /**
                애니메이션 효과가 종료된 직후 발생한다.

                @event afterEffect
                @param {String} sType 커스텀 이벤트명
                @param {HTMLElement} elLayer 애니메이션 효과가 적용된 레이어 엘리먼트
                @param {String} sEffect 적용할 애니메이션 효과 이름 , '-'을 구분한다. (fade-in, slide-left)
                @param {Number} nDuration 애니메이션 적용 시간(ms)
                @param {Function} stop stop를 호출하여 영향 받는 것은 없다.
            **/
            this._fireCustomEvent("afterEffect", {
                elLayer : oCustomEvent.element,
                sEffect : oCustomEvent.sTaskName,
                nDuration : oCustomEvent.nDuration
            });
        }
    },

    /**
        transition stop 이벤트 핸들러
     */
    _onTransitionStop : function(oCustomEvent){
        if(oCustomEvent.sTaskName){
            /**
                애니메이션 효과가 stop 될때 발생한다.

                @event stop
                @param {String} sType 커스텀 이벤트명
                @param {HTMLElement} elLayer 애니메이션 효과가 적용된 레이어 엘리먼트
                @param {String} sEffect 적용할 애니메이션 효과 이름 , '-'을 구분한다. (fade-in, slide-left)
                @param {Number} nDuration 애니메이션 적용 시간(ms)
                @param {Function} stop 호출하여 영향 받는 것은 없다.
            **/
            this._fireCustomEvent("stop", {
                elLayer : oCustomEvent.element,
                sEffect : oCustomEvent.sTaskName,
                nDuration : oCustomEvent.nDuration
            });
        }
    },

    /**
        현재 effect를 실행 시킬수 있는 상태인지 리턴한다
        @return {Boolean}
    **/
    _isAvailableEffect : function(){
        return this.isActivating();
    },

    /**
        jindo.m.LayerEffect 컴포넌트를 활성화한다.
        activate 실행시 호출됨
    **/
    _onActivate : function() {
        this._attachEvent();
    },

    /**
        jindo.m.LayerEffect 컴포넌트를 비활성화한다.
        deactivate 실행시 호출됨
    **/
    _onDeactivate : function() {
        this._detachEvent();
    },


    /**
        jindo.m.LayerEffect 에서 사용하는 모든 이벤트를 바인드한다.
    **/
    _attachEvent : function() {
        this._htEvent = {};
        this._htEvent["end"] = jindo.$Fn(this._onTransitionEnd, this).bind();
        this._htEvent["stop"] = jindo.$Fn(this._onTransitionStop, this).bind();

        if(this._oTransition){
            this._oTransition.attach({
                "end" : this._htEvent["end"],
                "stop" : this._htEvent["stop"]
            });
        }
    },

    /**
        jindo.m.LayerEffect 에서 사용하는 모든 이벤트를 해제한다.
    **/
    _detachEvent : function() {
        this._htEvent = null;

        if(this._oTransition){
            this._oTransition.detachAll();
        }
    },

    /**
        jindo.m.LayerEffect 에서 사용하는 모든 객체를 release 시킨다.
        @method destroy
    **/
    destroy: function() {
        this.deactivate();

        for(var p in this._htWElement) {
            this._htWElement[p] = null;
        }
        this._htWElement = null;

    }
}).extend(jindo.m.UIComponent);


/**
    @fileOverview effect플러그인 상위 클래스 
    @author "oyang2"
    @version 1.7.1
    @since 2011. 12. 13.
**/
/**
    effect플러그인 상위 클래스 

    @class jindo.m.Effect
    @uses jindo.m.LayerEffect
    @invisible
    @keyword effect
    @group Component
**/

jindo.m.Effect = jindo.$Class({
	/* @lends jindo.m.Effect.prototype */
    /**
        초기화 함수

        @constructor
       
    **/
	$init : function(){
		this._sCssPrefix = jindo.m.getCssPrefix();
		var htDInfo = jindo.m.getDeviceInfo();		
		this.bIos = (htDInfo.iphone || htDInfo.ipad);
		this.bIos3 = htDInfo.iphone && (htDInfo.version.length > 0) && (htDInfo.version.substring(0,1)== '3');
		this.bAndroid = htDInfo.android;
		this.bAndroid3Up  = htDInfo.android && (htDInfo.version.length > 0) && (htDInfo.version.substring(0,1)>= '3');	
		this.bAndroid2_1  = htDInfo.android && (htDInfo.version.length > 0) && (htDInfo.version === '2.1');	
		this.sTranOpen =  (this.bIos )?'translate3d(' : 'translate(';
		this.sTranEnd =  (this.bIos)?',0px)' : ')';
		this._initVar();
		
	},
	
	_initVar : function(){
		this._htLayerInfo = {};
	},
	
	setLayerInfo : function(htInfo){
		this._htLayerInfo = {};
		
		for(var p in htInfo){
			this._htLayerInfo[p] = htInfo[p];
		}
		
		//console.log('이펙트에서 설정해용', this._htLayerInfo);
	},	
	
	getTransitionTask : function(){
		return null;
	},
	
	getBeforeCommand : function(){
		return null;
	}, 
	getCommand : function(){
		return null;
	}
});/**
    @fileOverview  ContractEffect 플러그인 
    @author "oyang2"
    @version 1.7.1
    @since 2011. 12. 15.
**/
/**
    ContractEffect 플러그인 

    @class jindo.m.ContractEffect
    @invisible
    @extends jindo.m.Effect
    @keyword contract, effect, 접기 
    @group Component
**/

jindo.m.ContractEffect = jindo.$Class({
	 /* @lends jindo.m.ContractEffect.prototype */
    /**
        초기화 함수
    **/
	sEffectName : "contract",
	
	getCommand : function(el, htOption){
		var sDirection = htOption.sDirection? htOption.sDirection :'down';
		
		var sProperty = 'width';
		var nSize = this._htLayerInfo["nWidth"];
		
		if(sDirection == 'up' || sDirection == 'down'){
			sProperty = 'height';
			nSize = this._htLayerInfo["nHeight"];
		}
		
		var htStyle = htOption.htTo || {};
		htStyle[sProperty] = "0px";
		
		if(sDirection == 'right'){
			htStyle["margin-left"] = (this._htLayerInfo["nMarginLeft"]+ this._htLayerInfo["nWidth"]) + "px";
		}
		
		if(sDirection == 'down'){
			htStyle["margin-top"] = (this._htLayerInfo["nMarginTop"]+ this._htLayerInfo["nHeight"]) + "px";
		}
		
		return {
			sTaskName : this.sEffectName+"-"+sDirection ,
			htStyle : htStyle,
			htTransform : {},
			fCallback : {
				htStyle : {
					"margin-left" : this._htLayerInfo["nMarginLeft"]+"px",
					"margin-top" : this._htLayerInfo["nMarginTop"]+"px"
				}
			}
		};
	},
	
	getBeforeCommand : function(el, htOption){
		var sDirection = htOption.sDirection? htOption.sDirection :'down';
		
		var htBeforeStyle = htOption.htFrom || {};		
		htBeforeStyle["overflow"]  = "hidden";
		
		return {
			htStyle : htBeforeStyle ,
			htTransform : {}
		};
	}
	
}).extend(jindo.m.Effect);/**
    @fileOverview  expandeffect 플러그인 
    @author "oyang2"
    @version 1.7.1
    @since 2011. 12. 15.
**/
/**
    expandeffect 플러그인

    @class jindo.m.ExpandEffect
    @invisible
    @extends jindo.m.Effect
    @keyword expand, effect, 펼치기
    @group Component
**/

jindo.m.ExpandEffect = jindo.$Class({
	/** @lends jindo.m.ExpandEffect.prototype */
	 /**
        초기화 함수
    **/
	sEffectName : "expand",
	
	getCommand : function(el, htOption){
		var sDirection = htOption.sDirection? htOption.sDirection :'down';
		
		var sProperty = 'width';
		var nSize = this._htLayerInfo["nWidth"];
		
		if(sDirection == 'up' || sDirection == 'down'){
			sProperty = 'height';
			nSize = this._htLayerInfo["nHeight"];
		}
		
		var htStyle = htOption.htTo || {};
		htStyle[sProperty] = nSize+"px";
		
		if(sDirection == 'left'){
			htStyle["margin-left"] = this._htLayerInfo["nMarginLeft"]+"px";
		}
		
		if(sDirection == 'up'){
			htStyle["margin-top"] = this._htLayerInfo["nMarginTop"]+"px";
		}
		
		return {
			sTaskName : this.sEffectName+"-"+sDirection , 
			htStyle : htStyle,
			htTransform : {}
		};
	},
	
	getBeforeCommand : function(el, htOption){
		var sDirection = htOption.sDirection? htOption.sDirection :'down';
		
		var sProperty = 'width';
		
		if(sDirection == 'up' || sDirection == 'down'){
			sProperty = 'height';
		}
		
		var htBeforeStyle = htOption.htFrom || {};	
		htBeforeStyle[sProperty] = "0";
		htBeforeStyle["overflow"] = "hidden";
		
		if(sDirection == 'left'){			
			htBeforeStyle["margin-left"] = (this._htLayerInfo["nWidth"] + this._htLayerInfo["nMarginLeft"])+"px";
		}
		
		if(sDirection == 'up'){
			htBeforeStyle["margin-top"] = (this._htLayerInfo["nHeight"] +this._htLayerInfo["nMarginTop"]) +"px";
			//console.log(htBeforeStyle);
		}	
				
		return {
			htStyle : htBeforeStyle ,
			htTransform : {}
		};
	}
	
}).extend(jindo.m.Effect);/**
    @fileOverview  fade effect 플러그인 
    @author "oyang2"
    @version 1.7.1
    @since 2011. 12. 15.
**/
/**
   fade effect 플러그인 

    @class jindo.m.FadeEffect
    @invisible
    @extends jindo.m.Effect
    @keyword fade, effect, 보이기, 감추기
    @group Component 
**/

jindo.m.FadeEffect = jindo.$Class({
	/** @lends jindo.m.FadeEffect.prototype */
	/**
        초기화 함수
    **/
	sEffectName : "fade",
		
	getCommand : function(el, htOption){
		var sDirection = htOption.sDirection? htOption.sDirection :'in';
		
		
		var htStyle = htOption.htTo || {};
		var nOpacity = (sDirection == 'in')? 1 : 0;
		
		htStyle["opacity"] = (typeof htStyle.opacity !== 'undefined')? htStyle.opacity : nOpacity;
		
		var htCallback = {};
		if(sDirection == 'out'){
			htCallback.htStyle ={}; 
			htCallback.htStyle["display"]  = "none";
			htCallback.htStyle["opacity"] = this._htLayerInfo['nOpacity'];
		}
				
		return {
			sTaskName : this.sEffectName + "-"+sDirection,
			htStyle : htStyle,
			htTransform : {},
			fCallback : htCallback
		};
	},
	
	getBeforeCommand : function(el, htOption){
		var sDirection = htOption.sDirection? htOption.sDirection :'in';
		//debugger;
	
		var htBeforeStyle = htOption.htFrom || {};
		var nOpacity  = (sDirection == 'in')? 0 : 1;
		htBeforeStyle["display"] = this._htLayerInfo['sDisplay'];
		
		htBeforeStyle["opacity"] = (typeof htBeforeStyle.opacity == 'undefined')? nOpacity : htBeforeStyle.opacity;
		
		return {
			htStyle : htBeforeStyle ,
			htTransform : {}
		};
	}
	
}).extend(jindo.m.Effect);/**
    @fileOverview  flip effect 플러그인 
    @author "oyang2"
    @version 1.7.1
    @since 2011. 12. 15.
**/
/**
   flip effect 플러그인 

    @class jindo.m.FlipEffect
    @invisible
    @extends jindo.m.Effect
    @keyword flip, effect, 책장넘기기 
    @group Component
**/

jindo.m.FlipEffect = jindo.$Class({
	/** @lends jindo.m.FlipEffect.prototype */
	/**
        초기화 함수
    **/
	sEffectName : "flip",
		
	getCommand : function(el, htOption){
		var sDirection = htOption.sDirection? htOption.sDirection :"left";
		
		var sCoord = 'Y';
		if(sDirection == 'up' || sDirection == 'down'){
			sCoord = 'X';
		}
		
		var htStyle = htOption.htTo || {};
		
		
		var welFrom = htOption.elFlipFrom? jindo.$Element(htOption.elFlipFrom) : jindo.$Element(el);
		var welTo =   htOption.elFlipTo? jindo.$Element(htOption.elFlipTo) : null;
		
		var htTo = this._getCssRotate(this._getCssTransfrom(welFrom));
		
		htTo[sCoord] = htTo[sCoord]+ ((sDirection == 'left' || sDirection == 'down')?180*-1 : 180);
		var sTransfrom = 'rotateX('+ htTo.X+'deg) rotateY('+htTo.Y+'deg)';
		
		if(welTo){
			welTo.$value().style[this._sCssPrefix +"Transform"] = 'rotate'+sCoord+'(0deg)';
			sTransfrom = 'rotate'+sCoord+'(0deg)';
		}
		
		return {
			sTaskName : this.sEffectName + "-" + sDirection,
			htStyle : htStyle,
			htTransform : {
				"transform-style" : "preserve-3d",
				"transform" : sTransfrom
			}
		};
	},
	
	getBeforeCommand : function(el, htOption){
		var sDirection = htOption.sDirection? htOption.sDirection :"left";
		
		var htBeforeStyle = htOption.htFrom || {};
		
		var sCoord = "Y", 
			nFrom = 0;
		
		if(sDirection == 'up' || sDirection == 'down'){
			sCoord = "X";
		}
		
		var welFrom = htOption.elFlipFrom? jindo.$Element(htOption.elFlipFrom) : jindo.$Element(el);
		var welTo =   htOption.elFlipTo? jindo.$Element(htOption.elFlipTo) : null;
		
		var elParent = welFrom.$value().parentNode;
		elParent.style.webkitPerspective = '1200';
		
		var htFrom = this._getCssRotate(this._getCssTransfrom(welFrom));
		var sTransfrom = 'rotateX('+ htFrom.X+'deg) rotateY('+htFrom.Y+'deg)';
		
		if(welTo){
			welTo.$value().style[this._sCssPrefix +"Transform"] = 'rotate'+sCoord+'(-180deg)';
			sTransfrom = 'rotate'+sCoord+'(-180deg)';
		}
				
		return {
			htStyle : htBeforeStyle ,
			htTransform : {
				"perspective" : "1200",
				"transform-style" : "preserve-3d",
				"transform" : sTransfrom
			}
		};
	},
	
	
	
	_getCssRotate : function(str){
		var sRotate = str;
		
		var htReturn ={
			X : 0,
			Y : 0
		};
		
		if(!sRotate){
			return htReturn;
		}
		
		var aTemp = sRotate.match(/rotateX\((\-?\d*)deg/);	
		
		if(aTemp && aTemp.length >1){
			htReturn['X'] =aTemp[1]*1;
			if(htReturn['X']%360 == 0){
				htReturn['X'] = 0;
			}
		}
		
		aTemp = sRotate.match(/rotateY\((\-?\d*)deg/);
		if(aTemp && aTemp.length >1){
			htReturn['Y'] =aTemp[1]*1;
			if(htReturn['Y']%360 == 0){
				htReturn['Y'] = 0;
			}
		}
		
		return htReturn;		
	},
	
	_getCssTransfrom : function(wel){
		
		return wel.css(this._sCssPrefix +"Transform") || "";		
	}
	
}).extend(jindo.m.Effect);/**
    @fileOverview  pop effect 플러그인 
    @author "oyang2"
    @version 1.7.1
    @since 2011. 12. 15.
    
    @2012.01.05
     - Android 3.0 대응 pop-in 코드 삽입 (0.1~1로 추가되도록 수정) 
**/
/**
   pop effect 플러그인 

    @class jindo.m.PopEffect
    @invisible
    @extends jindo.m.Effect
    @keyword pop, effect, pop-in, pop-out
    @group Component
**/

jindo.m.PopEffect = jindo.$Class({
	/** @lends jindo.m.PopEffect.prototype */
	/**
        초기화 함수
        @invisibl@invisiblee
    **/
	
	sEffectName : "pop",

	getCommand : function(el, htOption){
		var sDirection = htOption.sDirection? htOption.sDirection :'in';
		
		var htStyle = htOption.htTo || {};
		if(typeof htStyle["opacity"] === 'undefined'){
			htStyle["opacity"] = (sDirection == 'in')? 1 : 0.1;
		}
		//htStyle["opacity"] = (sDirection == 'in')? 1 : 0.1;
		
		var nScale = (sDirection == 'in')? 1 : ((this.bIos3 || this.bAndroid3Up)? 0.1: 0);		
		var htCallback = {};
		if(sDirection == 'out'){
			htCallback.htStyle ={}; 
			htCallback.htStyle["display"]  = "none";
			htCallback.htStyle["opacity"]  = this._htLayerInfo['nOpacity'];
			htCallback.htTransform = {};
			htCallback.htTransform["transform"] = "scale(1)";
		}
		
		var sTransform = 'scale('+nScale+')';
		if(this.bAndroid3Up){
			sTransform += ' scaleZ(1.0)';
		}
		
		return {
			sTaskName : this.sEffectName + "-" +sDirection,
			htStyle : htStyle,
			htTransform : {
				'transform' : sTransform,
				'transform-origin' : '50% 50%'
			},
			fCallback : htCallback
		};
	},
	
	getBeforeCommand : function(el, htOption){
		var sDirection = htOption.sDirection? htOption.sDirection :'in';
				
		var htBeforeStyle = htOption.htFrom || {};
		if(typeof htBeforeStyle["opacity"] === 'undefined'){
			htBeforeStyle["opacity"] = (sDirection == 'in')? 0.1 : 1;
		}
		
		htBeforeStyle["display"] = this._htLayerInfo['sDisplay'];
		
		var nScale = (sDirection == 'in')? ((this.bIos3||this.bAndroid3Up)? 0.1: 0) : 1;
		
		var sTransform = 'scale('+nScale+')';
		if(this.bAndroid3Up){
			sTransform += ' scaleZ(1.0)';
		}
				
		return {
			htStyle : htBeforeStyle ,
			htTransform : {
				'transform' : sTransform,
				'transform-origin' : '50% 50%'
			}
		};
	}
}).extend(jindo.m.Effect);/**
    @fileOverview  slide effect 플러그인 
    @author "oyang2"
    @version 1.7.1
    @since 2011. 12. 15.
    
    @2012.01.16 수정사항
     - android3.0, android4.0 대응 추가 
**/
/**
   slide effect 플러그인 
    @class jindo.m.SlideEffect
    @invisible
    @extends jindo.m.Effect
    @keyword slide, effect, slide-left, slide-right, slide-up, slide-out 
    @group Component
**/


jindo.m.SlideEffect = jindo.$Class({
	/** @lends jindo.m.SlideEffect.prototype */
	/**
        초기화 함수
        @invisible
    **/
	sEffectName : "slide",

	/**
	 * @description 레이어를 설정된 방향으로 움직인다
	 * @param {HTMLElement} el slide 대상 엘리먼트
	 * @param {HashTable} slide 옵션
	 * 		- sDirection : 'left', //'left, 'right, 'up', 'down' 설정가능하다
	 *		- nDuration : 500, //효과 애니메이션 적용시간 (ms)
	 *		- nSize : 200, //slide 할 거리, 디폴트 값은 레이어 크기가 됨 (px)
	 *		- sTransitionTimingFunction : 'ease-in-out', //효과 effect ('ease', 'linear', ease-in', 'ease-out', 'ease-in-out')
	 *		- elBaseLayer : jindo.$('wrapper'), //기준 뷰가 되는 엘리먼트, 없을 경우 설정하지 않는다.
	 *		- htTo : {opacity : 1} , //레이어의 slide 이후의 css를 설정
	 *		- htFrom : {opacity : 0.7}  //레이어의 slide 이전의 css를 설정
	 */
	getCommand : function(el, htOption){
		var sDirection = htOption.sDirection? htOption.sDirection :'left';		
		
		var htCurOffset = jindo.m.getCssOffset(el);
		
		var toX = htCurOffset.left;
		var toY = htCurOffset.top;
		var nW,nH,wel;
		nW = (typeof htOption.nSize != 'undefined')? htOption.nSize : this._htLayerInfo['nWidth'];
		nH =  (typeof htOption.nSize != 'undefined')? htOption.nSize : this._htLayerInfo['nHeight'];
		
		if(sDirection == 'up' || sDirection == 'down'){
			toY  += ((sDirection == 'up')? nH*-1 : nH); 
		}
		
		if(sDirection == 'left' || sDirection == 'right'){
			toX += ((sDirection == 'left')? nW*-1 : nW);
		}
		
		var htTransform = {};
		
		if(typeof htOption.elBaseLayer != 'undefined'){
			toX = 0;
			toY = 0;
			var welBaseLayer = jindo.$Element(htOption.elBaseLayer);
			wel = jindo.$Element(el);
			nH = (typeof htOption.nSize != 'undefined')? htOption.nSize : welBaseLayer.height();
			nW = (typeof htOption.nSize != 'undefined')? htOption.nSize : welBaseLayer.width();

			if(sDirection == 'up' || sDirection == 'down'){
				toY = (sDirection == 'down')?  nH * -1 : nH;
			}
			
			if(sDirection == 'left' || sDirection == 'right'){
				toX = (sDirection == 'left')? nW: nW*-1;
			}
			toX = toX*-1;
			toY = toY*-1;
		}
		
		htTransform["transform"] = this.sTranOpen + toX + 'px, ' + toY + 'px'+ this.sTranEnd;
		
		//fCallback 등록
		var sPosition = this._htLayerInfo["sPosition"];
		var bAndroid = this.bAndroid;
		var bAndroid3Up = this.bAndroid3Up;
		var sClassHighligting = this._htLayerInfo['sClassHighligting'];
		var bAndroid2_1 = this.bAndroid2_1;
		
		wel = jindo.$Element(el);
		
		return {
			sTaskName : this.sEffectName+"-"+ sDirection,
			htStyle : htOption.htTo || {},
			htTransform : htTransform,
			fCallback : function(){
				var htCurOffset = jindo.m.getCssOffset(el);	
				var top = wel.css('top').replace('px','')*1;
				var left = wel.css('left').replace('px','')*1;
				top = isNaN(top)? 0 : top;
				left = isNaN(left)? 0 : left;
				
				//console.log('before '+top+" , "+left);				
				if(sPosition == "relative"){
					wel.css("position", 'relative');
				}else{
					wel.css("position","absolute");
				}				
				
				var sPrefix = jindo.m.getCssPrefix();
				wel.css(sPrefix+'Transform','');
				
				//안드로이드 4.0버그 left, top을 설정하기 전에 offset을 호출해야 설정이 된다.
				if(bAndroid3Up){
					wel.offset();
				}				
				wel.$value().style.top = parseInt((top+htCurOffset.top),10)+"px";
				wel.$value().style.left = parseInt((htCurOffset.left+ left),10)+"px";	
				
								
				if(bAndroid && !bAndroid3Up){
				//if(bAndroid){
					var elFocus = jindo.$$.getSingle('.'+ sClassHighligting, wel.$value());
					if(elFocus){	
						if(bAndroid2_1){
							setTimeout(function(){
								elFocus.focus();							
							},5);		
						}else{
							elFocus.focus();
						}
					}
				}
			}
		};
	},
	
	/**
	 * @description 레이어를 설정된 방향으로 움직이기 전에 미리 설정해야 할 옵션들을 설정한다.
	 * @param {HTMLElement} el slide 대상 엘리먼트
	 * @param {HashTable} slide 옵션
	 * 		- sDirection : 'left', //'left, 'right, 'up', 'down' 설정가능하다
	 *		- nDuration : 500, //효과 애니메이션 적용시간 (ms)
	 *		- nSize : 200, //slide 할 거리, 디폴트 값은 레이어 크기가 됨 (px)
	 *		- sTransitionTimingFunction : 'ease-in-out', //효과 effect ('ease', 'linear', ease-in', 'ease-out', 'ease-in-out')
	 *		- elBaseLayer : jindo.$('wrapper'), //기준 뷰가 되는 엘리먼트, 없을 경우 설정하지 않는다.
	 *		- htTo : {opacity : 1} , //레이어의 slide 이후의 css를 설정
	 *		- htFrom : {opacity : 0.7}  //레이어의 slide 이전의 css를 설정
	 */
	getBeforeCommand : function(el, htOption){
		var sDirection = htOption.sDirection? htOption.sDirection :'left';
		
		var htBeforeStyle = htOption.htFrom || {};
		var htTransform = {};
		
		var wel = jindo.$Element(el);
		
		if(typeof htOption.elBaseLayer != 'undefined'){
			var welBaseLayer = jindo.$Element(htOption.elBaseLayer);
			
			if(!welBaseLayer.isParentOf(wel)){
				welBaseLayer.append(wel);
				var sPosition = wel.css('position');
				if(!(sPosition == 'relative' || sPosition == 'absolute') ){
					wel.css('position', 'absolute');
				}
				wel.css('opacity',0);
			}
			
			var fromX = 0, fromY = 0;
			
			var nH = welBaseLayer.height();
			var nW = welBaseLayer.width();
			
			
			if(sDirection == 'up' || sDirection == 'down'){
				fromY = (sDirection == 'down')?  nH * -1 : nH;
			}
			
			if(sDirection == 'left' || sDirection == 'right'){
				fromX = (sDirection == 'left')? nW: nW*-1;
			}
			welBaseLayer.css('overflow','hidden');
			htBeforeStyle["left"] = fromX+"px";
			htBeforeStyle["top"] = fromY +"px";
			
			//console.log('beforedddd', welBaseLayer.offset());
			htBeforeStyle["opacity"] = this._htLayerInfo['nOpacity'];
			//htTransform["transform"] = this.sTranOpen + fromX + 'px, ' + fromY+ 'px'+ this.sTranEnd;	
			
		}
		return {
			htStyle : htBeforeStyle ,
			htTransform : htTransform
		};
	}

	
}).extend(jindo.m.Effect);

/**
    @fileOverview 모바일 터치 컴포넌트
    @(#)jindo.m.Touch.js 2011. 8. 24.
    @author oyang2
    @version 1.7.1
    @since 2011. 8. 24.
**/
/**
    기준 레이어에서의 사용자 터치 움직임을 분석하여 scroll,tap 등의 동작을 분석하는 컴포넌트

    @class jindo.m.Touch
    @extends jindo.m.UIComponent
    @keyword touch
    @group Component

	@history 1.5.0 Support Window Phone8 지원
    @history 1.5.0 Update [nEndEventThreshold] 옵션 추가
    @history 1.2.0 Support Chrome for Android 지원<br />
                    갤럭시 S2 4.0.3 업데이트 지원
    @history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
    @history 0.9.0 Release 최초 릴리즈
 */
jindo.m.Touch = jindo.$Class({
	/* @lends jindo.m.Touch.prototype */
    /**
        초기화 함수

       @constructor
	   @extends jindo.m.UIComponent
       @param {String | HTMLElement} vEl Touch이벤트를 분석할 타켓 엘리먼트 혹은 아이디.
       @param {Object} htOption 초기화 옵션 설정을 위한 객체.
            @param {Number} [htOption.nMomentumDuration=350] 가속에 대해 판단하는 기준시간(단위 ms)
            <ul>
            <li>touchstart, touchend 간격의 시간이 nMomentumDuration 보다 작을 경우 가속값을 계산한다.</li>
            <li>일반적으로 android가 iOS보다 반응 속도가 느리므로 iOS보다 큰값을 세팅한다.</li>
            <li>android의 경우 500~1000 정도가 적당하다.</li>
            <li>iOS의 경우 200~350이 적당하다.</li>
            </ul>
            @param {Number} [htOption.nMoveThreshold=7] touchMove 커스텀 이벤트를 발생시키는 최소 단위 움직임 픽셀
            <ul>
            <li>세로모드의 스크롤 작업일 경우 0~2 정도가 적당하다</li>
            <li>가로모드의 스크롤 작업일 경우 4~7 정도가 적당하다</li>
            </ul>
            @param {Number} [htOption.nSlopeThreshold=25] scroll 움직임에 대한 방향성(수직,수평,대각선)을 판단하는 움직인 거리
            <ul>
            <li>사용자가 터치를 시작한 이후에 25픽셀 이상 움직일 경우 scroll에 대한 방향을 판단한다.</li>
            <li>25픽셀이하로 움직였을 경우 방향성에 대해서 판단하지 않는다.</li>
            </ul>
            @param {Number} [htOption.nLongTapDuration=1000] 롱탭을 판단하는 기준 시간(단위ms)
            <ul>
            <li>600~1000정도의 값이 적당하다.</li>
            </ul>
            @param {Number} [htOption.nDoubleTapDuration=400] 더블탭을 판단하는 탭간의 기준 시간(단위ms)
            <ul>
            <li>이 값을 길게 설정하면 Tap 커스텀 이벤트의 발생이 늦어지기 때문에 1500 이상의 값은 세팅하지 않는것이 적당하다.</li>
            </ul>
            @param {Number} [htOption.nTapThreshold=6] tap에 대해 판단할때 최대 움직인 거리 (단위 px)
            <ul>
            <li>사용자 터치를 시작한 이후 수직,수평방향으로 nTapThreshold 이하로 움직였을때 tap이라고 판단한다.</li>
            <li>doubleTap을 사용할 경우에는 이 값을 좀더 크게 5~8 정도 설정하는 것이 적당하다.</li>
            <li>doubleTap을 사용하지 않을 때 iOS에서는 0~2정도 설정하는 것이 적당하다.</li>
            <li>doubleTap을 사용하지 않을 때 android에서는 4~6 정도 설정하는 것이 적당하다.</li>
            </ul>
            @param {Number} [htOption.nPinchThreshold=0.1] pinch를 판단하는 최소 scale 값
            <ul>
            <li>최초의 멀티터치간의 거리를 1의 비율로 보았을때 움직이는 터치간의 간격이 이 값보다 크거나 작게 변하면 pinch로 분석한다.</li>
            </ul>
            @param {Number} [htOption.nRotateThreshold=5] rotate 판단하는 최소 angle 값
            @param {Number} [htOption.nEndEventThreshold=0] touchmove 이후 touchend 이벤트를 강제로 발생시키는 기준 시간 
            <ul>
            <li>0일경우 강제로 touchend 이벤트를 발생시키지 않는다.</li>
            </ul>
            @param {Boolean} [htOption.bActivateOnload=true] Touch 컴포넌트가 로딩 될때 활성화 시킬지 여부를 결정한다.<br />false로 설정하는 경우에는 oTouch.activate()를 호출하여 따로 활성화 시켜야 한다.

	 */
	$init : function(sId, htUserOption){
		this._el = jindo.$(sId);

		var htDefaultOption = {
			nMomentumDuration :350,
			nMoveThreshold : 7,
			nSlopeThreshold : 25,
			nLongTapDuration : 1000,
			nDoubleTapDuration : 400,
			nTapThreshold : 6,
			nPinchThreshold : 0.1,
			nRotateThreshold : 5,
			nEndEventThreshold : 0, 
			bActivateOnload : true	
		};

		this.option(htDefaultOption);
		this.option(htUserOption || {});
		
		this._initVariable();		
		this._setSlope();
		//활성화
		if(this.option("bActivateOnload")) {
			this.activate(); //컴포넌트를 활성화한다.
		}

	},

	/**
		jindo.m.Touch 인스턴스 변수를 초기화한다.
	**/
	_initVariable : function(){
		this._hasTouchEvent = false;
		
		this._htEventName = jindo.m._getTouchEventName();
		if(this._htEventName.start.indexOf('touch') > -1){
		    this._hasTouchEvent  = true;
		}else if(this._htEventName.start.indexOf('MSPointer') > -1){
		     if (typeof this._el.style.msTouchAction != 'undefined'){
                this._el.style.msTouchAction = "none";
            }
		}
		this._radianToDegree  =  180/Math.PI;

		this._htMoveInfo={
			nStartX : 0,
			nStartY :0,
			nBeforeX : 0,
			nBeforeY : 0,
			nStartTime :0,
			nBeforeTime : 0,
			nStartDistance : 0,
			nBeforeDistance :0,
			nStartAngle : 0,
			nLastAngle : 0
		};

		this.bStart = false;
		this.bMove = false;
		this.nMoveType = -1;
		this.htEndInfo ={};
		this._nVSlope = 0;
		this._nHSlope = 0;
		this.bSetSlope = false;
	},

	/**
		jindo.m.Touch 사용하는 이벤트 attach 한다
	**/
	_attachEvents : function(){
		this._htEvent = {};
		var bTouch = this._hasTouchEvent;
		this._htEvent[this._htEventName.start] = {
			fn : jindo.$Fn(this._onStart, this).bind(),
			el : this._el
		};
		
	    //jindo.m._attachFakeJindo(this._el, this._htEvent[this._htEventName.start].fn, this._htEventName.start);
		
		this._htEvent[this._htEventName.move] = {
		    fn : jindo.$Fn(this._onMove, this).bind(),
			el : this._el
		};
		
		this._htEvent[this._htEventName.end] = {
		    fn : jindo.$Fn(this._onEnd, this).bind(),
			el : this._el
		};

		//resize event
		this._htEvent["rotate"] = jindo.$Fn(this._onResize, this).bind();
		jindo.m.bindRotate(this._htEvent["rotate"]);	
		
		if(this._htEventName.cancel){
			this._htEvent[this._htEventName.cancel] = {
			    fn : jindo.$Fn(this._onCancel, this).bind(),
				el : this._el
			};
		}
		
		//attach events
		for(var p in this._htEvent){
		    if(this._htEvent[p].fn){
		        this._htEvent[p].ref  = jindo.m._attachFakeJindo(this._htEvent[p].el, this._htEvent[p].fn, p);
		    }
		}
	},

	/**
		jindo.m.Touch 사용하는 이벤트 detach 한다
	**/
	_detachEvents : function(){
		for(var p in this._htEvent){
			var htTargetEvent = this._htEvent[p];
			if (htTargetEvent.ref) {
				htTargetEvent.ref.detach(htTargetEvent.el, p);
			}
		}
		jindo.m.unbindRotate(this._htEvent["rotate"]);
		this._htEvent = null;
	},

	/**
		touchcancel 발생시에 touchEnd이벤트로 바로 호출한다.
		ios3 에서는 클립보드 활성화 되면 바로 touchcancel 발생
		android 계열에서 빠르고 짧게 스크롤 하면 touchcancel 발생함
		@param {$Event}  jindo.$Event
	**/
	_onCancel : function(oEvent){
		this._onEnd(oEvent);
	},


	/**
		touchstart(mousedown) 이벤트 핸들러
		@param {$Event}  jindo.$Event
	**/
	_onStart : function(oEvent){
		//touch 정보들의 초기화
		this._resetTouchInfo();

		var htInfo = this._getTouchInfo(oEvent);

		var htParam ={
			element : htInfo[0].el,
			nX : htInfo[0].nX,
			nY : htInfo[0].nY,
			oEvent : oEvent
		};

		/**
			사용자가 터치 영역에 터치하는 순간 발생한다.<br />가장 처음 발생하는 커스텀이벤트

			@event touchStart
			@param {String} sType 커스텀 이벤트명
			@param {HTMLElement} element 현재 터치된 영역의 Element
			@param {Number} nX 터치영역의 X좌표
			@param {Number} nY 터치 영역의 Y좌표
			@param {Object} oEvent jindo.$Event object
			@param {Function} stop 이후 모든 커스텀 이벤트를 중지한다.
		**/
		if(!this._fireCustomEvent('touchStart', htParam)){
			return;
		}

		//touchstart 플래그 세팅
		this.bStart = true;

		//move info update
		this._htMoveInfo.nStartX = htInfo[0].nX;
		this._htMoveInfo.nBeforeX = htInfo[0].nX;
		this._htMoveInfo.nStartY = htInfo[0].nY;
		this._htMoveInfo.nBeforeY = htInfo[0].nY;
		this._htMoveInfo.nStartTime = htInfo[0].nTime;
		this._htMoveInfo.aStartInfo = htInfo;

		this._startLongTapTimer(htInfo, oEvent);
	},

	/**
		touchMove(mousemove) 이벤트 핸들러
		@param {$Event}  jindo.$Event
	**/
	_onMove : function(oEvent){
		if(!this.bStart){
			return;
		}
		this.bMove = true;

		var htInfo = this._getTouchInfo(oEvent);
		//addConsole('[touchMove]'+htInfo.length);
		
		//커스텀 이벤트에 대한 파라미터 생성.
		var htParam = this._getCustomEventParam(htInfo, false);

		//싱글터치는 3,4 일때 다시 계산한다.
		if(htInfo.length === 1){			
			if(this.nMoveType < 0 || this.nMoveType == 3 || this.nMoveType == 4){
			    var nMoveType = this._getMoveType(htInfo);
			    if(!((this.nMoveType == 4) && (nMoveType == 3)) ){
				    this.nMoveType = nMoveType;
				}
			}			
		}else{ //멀티터치일경우 8번이 아니면 다시 계산한다.
			if(this.nMoveType !== 8){
				this.nMoveType = this._getMoveType(htInfo);
			}
		}

		//커스텀 이벤트에 대한 파라미터 생성.
		htParam = this._getCustomEventParam(htInfo, false);

		//longtap timer 삭제
		if((typeof this._nLongTapTimer != 'undefined') && this.nMoveType != 3){
			this._deleteLongTapTimer();
		}

		htParam.oEvent = oEvent;

		var nDis = 0;
		if(this.nMoveType == 0){ //hScroll일 경우
			nDis = Math.abs(htParam.nVectorX);
		}else if(this.nMoveType == 1){ //vScroll일 경우
			nDis = Math.abs(htParam.nVectorY);
		}else{ //dScroll 일 경우
			nDis = Math.abs(htParam.nVectorX) + Math.abs(htParam.nVectorY);
		}

		//move간격이 옵션 설정 값 보다 작을 경우에는 커스텀이벤트를 발생하지 않는다
		if(nDis < this.option('nMoveThreshold')){
			return;
		}

		/**
			nMoveThreshold 옵션값 이상 움직였을 경우 발생한다

			@event touchMove
			@param {String} sType 커스텀 이벤트명
			@param {String} sMoveType 현재 분석된 움직임
			@param {HTMLElement} element 현재 터치된 영역의 Element
			@param {Number} nX 터치영역의 X좌표
			@param {Number} nY 터치 영역의 Y좌표
			@param {Array} aX 모든 터치 영역의 X좌표
			@param {Array} aY 모든 터치 영역의 Y좌표
			@param {Number} nVectorX 이전 touchMove(혹은 touchStart)의 X좌표와의 상대적인 거리.(직전 좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
			@param {Number} nVectorY 이전 touchMove(혹은 touchStart)의 Y좌표와의 상대적인 거리.(직전 좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
			@param {Number} nDistanceX touchStart의 X좌표와의 상대적인 거리.(touchStart좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
			@param {Number} nDistanceY touchStart의 Y좌표와의 상대적인 거리.(touchStart좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
			@param {Number} nStartX touchStart의 X좌표
			@param {Number} nStartY touchStart의 Y좌표
			@param {Number} nStartTimeStamp touchStart의 timestamp 값
			@param {Number} nScale 멀티터치일경우 계산된 scale값 (싱글터치의 경우 이 프로퍼티가 없다)
			@param {Number} nRotation 멀티터치일경우 계산된 rotation값 (싱글터치의 경우 이 프로퍼티가 없다)
			@param {Object} oEvent jindo.$Event object
			@param {Function} stop stop 이후 커스텀이벤트는 발생하지 않는다.
		**/
		if(!this.fireEvent('touchMove', htParam)){
			this.bStart = false;
			return;
		}
		//touchInfo 정보의  before 정보만 업데이트 한다.
		this._htMoveInfo.nBeforeX = htInfo[0].nX;
		this._htMoveInfo.nBeforeY = htInfo[0].nY;
		this._htMoveInfo.nBeforeTime = htInfo[0].nTime;
	},

	/**
		touchend(mouseup) 이벤트 핸들러
		@param {$Event}  jindo.$Event
	**/
	_onEnd : function(oEvent){
	    //addConsole(oEvent.type);
	    //console.log(oEvent);
	   if(!this.bStart){
            return;
        }
       //addConsole('---- '+oEvent.type);
        var self = this;                
        this._deleteLongTapTimer();
        this._deleteEndEventTimer();
        
        //touchMove이벤트가 발생하지 않고 현재 롱탭이 아니라면 tap으로 판단한다.
        if(!this.bMove && (this.nMoveType != 4)){
            this.nMoveType = 3;
        }
        
        //touchEnd 시점에 판단된  moveType이 없으면 리턴한다. 
        if(this.nMoveType < 0){
            return;
        }
        
        var htInfo = this._getTouchInfo(oEvent);
        
        //현재 touchEnd시점의 타입이 doubleTap이라고 판단이 되면
        if(this._isDblTap(htInfo[0].nX, htInfo[0].nY, htInfo[0].nTime)){            
            clearTimeout(this._nTapTimer);
            delete this._nTapTimer;
            this.nMoveType = 5; //doubleTap 으로 세팅
        }
        
        //커스텀 이벤트에 대한 파라미터 생성.
        var htParam = this._getCustomEventParam(htInfo, true);
        htParam.oEvent = oEvent;
        var sMoveType = htParam.sMoveType;
        

				/**
					nMoveThreshold 옵션값 이상 움직였을 경우 발생한다

					@event touchEnd
					@param {String} sType 커스텀 이벤트명
					@param {String} sMoveType 현재 분석된 움직임
					@param {HTMLElement} element 현재 터치된 영역의 Element
					@param {Number} nX 터치영역의 X좌표
					@param {Number} nY 터치 영역의 Y좌표
					@param {Array} aX 모든 터치 영역의 X좌표
					@param {Array} aY 모든 터치 영역의 Y좌표
					@param {Number} nVectorX 이전 touchMove(혹은 touchStart)의 X좌표와의 상대적인 거리.(직전 좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
					@param {Number} nVectorY 이전 touchMove(혹은 touchStart)의 Y좌표와의 상대적인 거리.(직전 좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
					@param {Number} nDistanceX touchStart의 X좌표와의 상대적인 거리.(touchStart좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
					@param {Number} nDistanceY touchStart의 Y좌표와의 상대적인 거리.(touchStart좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
					@param {Number} nStartX touchStart의 X좌표
					@param {Number} nStartY touchStart의 Y좌표
					@param {Number} nStartTimeStamp touchStart의 timestamp 값
					@param {Number} nScale 멀티터치일경우 계산된 scale값 (싱글터치의 경우 이 프로퍼티가 없다)
					@param {Number} nRotation 멀티터치일경우 계산된 rotation값 (싱글터치의 경우 이 프로퍼티가 없다)
					@param {Object} oEvent jindo.$Event object
					@param {Function} stop stop 이후 커스텀이벤트는 발생하지 않는다.
				**/
        //doubletap 핸들러가  있고, 현재가  tap 인 경우
        if( (typeof this._htEventHandler[jindo.m.MOVETYPE[5]] != 'undefined' && (this._htEventHandler[jindo.m.MOVETYPE[5]].length > 0))&& (this.nMoveType == 3) ){
            this._nTapTimer = setTimeout(function(){
                self.fireEvent('touchEnd', htParam);
                self._fireCustomEvent(sMoveType, htParam);              
                delete self._nTapTimer;
            }, this.option('nDoubleTapDuration'));  
            
        }else{
            this.fireEvent('touchEnd', htParam);
            if(this.nMoveType != 4){
                if(this.nMoveType === 8){
                    htParam.sMoveType = jindo.m.MOVETYPE[6];
                    this._fireCustomEvent(jindo.m.MOVETYPE[6], htParam);
                    htParam.sMoveType = jindo.m.MOVETYPE[7];
                    this._fireCustomEvent(jindo.m.MOVETYPE[7], htParam);
                }else{
                    setTimeout(function(){
                        self._fireCustomEvent(sMoveType, htParam);
                    },0);
                }
            }
        }       
            
        this._updateTouchEndInfo(htInfo);       
        this._resetTouchInfo();
	},

	/**
	 * touchend 를 임의적으로 만드는 타이머를 생성한다.
	 */
	_startEndEventTimer : function(oEvent){
	    var self = this;
        //console.log('_start');
        this._nEndEventTimer = setTimeout(function(){
                self._onEnd(oEvent);             
                delete self._nEndEventTimer;
        },self.option('nEndEventThreshold'));
	},
	
	
	/**
	 *touchend 를 임의적으로 만드는 타이머를 지운다. 
	 */
	_deleteEndEventTimer : function(){
	    if(typeof this._nEndEventTimer != 'undefined'){
	      // console.log('_delete');
            clearTimeout(this._nEndEventTimer);
            delete this._nEndEventTimer;
        }
	},
	
	/**
	 * sEvent 명으로 커스텀 이벤트를 발생시킨다 
	 * @param {String} sEvent
	 * @param {HashTable} 커스텀이벤트 파라미터
	 * @return {Boolean} fireEvent의 리턴값
	 */
	_fireCustomEvent :  function(sEvent, htOption){
		return this.fireEvent(sEvent, htOption);
	},

	/**
		커스텀이벤트를 발생시킬 때 필요한 파라미터를 생성한다.

		@param {Object} 현재 터치 정보들을 담고 있는 해시테이블
		@param {Boolean} touchEnd 시점인지 여부, touchEnd일 경우 가속에 대한 추가 정보를 필요로 한다.
		@return {Object}
			- {HTMLElement} element 현재 이벤트 객체의 대상 엘리먼트
			- {Number} nX x좌표
			- {Number} nY y좌표
			- {Number} nVectorX 이전 x 좌표와의 차이
			- {Number} nVectorY 이전 y 좌표와의 차이
			- {Number} nDistanceX touchstart와의 x 좌표 거리
			- {Number} nDistanceY touchstart와의 y 좌표 거리
			- {String} sMoveType 현재 분석된 움직임의 이름
			- {Number} nStartX touchstart시점의 x 좌표
			- {Number} nStartY touchstart시점의 y 좌표
			- {Number} nStartTimeStamp touchstart시점의 timestamp
			- {Number} nMomentumX x 좌표의 가속 값 (touchEnd일경우에만 발생)
			- {Number} nMomentumY y 좌표의 가속 값 (touchEnd일경우에만 발생)
			- {Number} nSpeedX x 좌표의 속도값 (touchEnd일경우에만 발생)
			- {Number} nSpeedY y 좌표의 속도값 (touchEnd일경우에만 발생)
			- {Number} nDuration touchstart와 touchEnd사이의 시간값
			- {Array} aX 터치지점의 x 좌표
			- {Array} aY 터치지점의 y 좌표
			- {Number} nScale 멀티터치일경우 계산된 scale값
			- {Number} nRotation 멀티터치일경우 계산된 rotate값
	**/
	_getCustomEventParam : function(htTouchInfo, bTouchEnd){
		var sMoveType = jindo.m.MOVETYPE[this.nMoveType];
		var nDuration = htTouchInfo[0].nTime - this._htMoveInfo.nStartTime;
		var nVectorX = 0,
			nVectorY = 0,
			nMomentumX = 0,
			nMomentumY = 0,
			nSpeedX= 0,
			nSpeedY = 0,
			nDisX= 0,
			nDisY= 0;

		nDisX = (this.nMoveType === 1)? 0 : htTouchInfo[0].nX - this._htMoveInfo.nStartX; //vScroll
		nDisY = (this.nMoveType === 0)? 0 : htTouchInfo[0].nY -this._htMoveInfo.nStartY ; //hScroll

		nVectorX = htTouchInfo[0].nX - this._htMoveInfo.nBeforeX;
		nVectorY = htTouchInfo[0].nY - this._htMoveInfo.nBeforeY;
		//scroll 이벤트만 계산 한다
		if(bTouchEnd && (this.nMoveType == 0 || this.nMoveType == 1 || this.nMoveType == 2 )){
			if(nDuration <= this.option('nMomentumDuration')){
				nSpeedX = Math.abs(nDisX)/nDuration ;
				nMomentumX = (nSpeedX*nSpeedX) / 2;

				nSpeedY = Math.abs(nDisY)/nDuration ;
				nMomentumY =  (nSpeedY*nSpeedY) / 2;
			}
		}

		var htParam  = {
			element : htTouchInfo[0].el,
			nX : htTouchInfo[0].nX,
			nY : htTouchInfo[0].nY,
			nVectorX : nVectorX,
			nVectorY : nVectorY,
			nDistanceX : nDisX,
			nDistanceY : nDisY,
			sMoveType : sMoveType,
			nStartX : this._htMoveInfo.nStartX,
			nStartY : this._htMoveInfo.nStartY,
			nStartTimeStamp : this._htMoveInfo.nStartTime
		};

		if((htTouchInfo.length) > 1 || (this.nMoveType >= 6)){
			htParam.nScale = this._getScale(htTouchInfo);
			htParam.nRotation = this._getRotation(htTouchInfo);
			if(htParam.nScale === null){
				htParam.nScale = this._htMoveInfo.nBeforeScale;
			}
			if(htParam.nRotation === null){
				htParam.nRotation = this._htMoveInfo.nBeforeRotation;
			}

		}

		if(htTouchInfo.length >= 1){
			var aX = [];
			var aY =[];
			var aElement = [];
			for(var i=0,nLen= htTouchInfo.length; i<nLen; i++){
				aX.push(htTouchInfo[i].nX);
				aY.push(htTouchInfo[i].nY);
				aElement.push(htTouchInfo[i].el);
			}
			htParam.aX = aX;
			htParam.aY = aY;
			htParam.aElement = aElement;
		}

		//touchend 에는 가속에 대한 계산값을 추가로 더 필요로 한다.
		if(bTouchEnd){
			htParam.nMomentumX = nMomentumX;
			htParam.nMomentumY = nMomentumY;
			htParam.nSpeedX = nSpeedX;
			htParam.nSpeedY = nSpeedY;
			htParam.nDuration = nDuration;
		}

		return htParam;
	},

	/**
		doubleTap을 판단하기 위해서 마지막 touchend의 정보를 업데이트 한다.
		doubleTap을 분석 할 경우 가장 마지막의 touch에 대한 정보를 비교해야 하기 때문에 이 값을 업데이트 한다.

		@param {Object} touchEnd에서의 좌표 및 엘리먼트 정보 테이블
			- {HTMLElement} touchEnd시점의 엘리먼트
			- {Number} touchEnd timestamp
			- {Number} touchEnd의 x 좌표
			- {Number} touchEnd의 y 좌표
	**/
	_updateTouchEndInfo : function(htInfo){
		this.htEndInfo = {
			element: htInfo[0].el,
			time : htInfo[0].nTime,
			movetype : this.nMoveType,
			nX : htInfo[0].nX,
			nY : htInfo[0].nY
		};
	},

	/**
		longTap 타이머를 삭제한다.
	**/
	_deleteLongTapTimer : function(){
		if(typeof this._nLongTapTimer != 'undefined'){
			clearTimeout(this._nLongTapTimer);
			delete this._nLongTapTimer;
		}
	},

	/**
		longTap 커스텀 핸들러가 존재 할 경우 longTap 타이머를 시작한다.

		@param {Object} longTap에 대한 정보 객체
		@param {Object} event 객체
	**/
	_startLongTapTimer : function(htInfo, oEvent){
		var self = this;

		//long tap handler 가 있을경우
		if((typeof this._htEventHandler[jindo.m.MOVETYPE[4]] != 'undefined') && (this._htEventHandler[jindo.m.MOVETYPE[4]].length > 0)){
			self._nLongTapTimer = setTimeout(function(){

				/**
					사용자의 터치 시작 이후로 일정 기준시간 동안 계속 움직임이 tap으로 분석되면 발생 한다.

					@event longTap
					@param {String} sType 커스텀 이벤트명
					@param {HTMLElement} element 현재 터치된 영역의 Element
					@param {Number} nX 터치영역의 X좌표
					@param {Number} nY 터치 영역의 Y좌표
					@param {Object} oEvent jindo.$Event object
					@param {Function} stop stop를 호출하여 영향 받는 것이 없다.
				**/
				self.fireEvent('longTap',{
					element :  htInfo[0].el,
					oEvent : oEvent,
					nX : htInfo[0].nX,
					nY : htInfo[0].nY
				});
				delete self._nLongTapTimer;
				//현재 moveType 세팅
				self.nMoveType = 4;
			}, self.option('nLongTapDuration'));
		}
	},

	/**
		화면 전환시에 스크롤 기준 값을 다시 구한다.
	**/
	_onResize : function(){
		this._setSlope();
	},

	/**
		이전 탭의 정보와 비교하여 현재 동작이 더블탭임을 판단한다
		@param {Number} nX pageX 좌표
		@param {Number} nY pageY 좌표
		@param {Number} nTimeStamp 이벤트 timestamp
	**/
	_isDblTap : function(nX, nY, nTime){
		if((typeof this._nTapTimer != 'undefined') && this.nMoveType == 3){
			var nGap = this.option('nTapThreshold');
			if( (Math.abs(this.htEndInfo.nX - nX) <= nGap) && (Math.abs(this.htEndInfo.nY-nY) <= nGap) ){
				return true;
			}
		}
		return false;
	},

	/**
		vScroll, hScroll을 판단하는 기준 기울기를 계산한다
		단말기 스크린을 기준으로 계산한다

		hScroll = (세로/2)/가로
		vScroll = 세로/(가로/2)
	**/
	_setSlope : function(){
		if(!this.bSetSlope){
			this._nHSlope = ((window.innerHeight/2) / window.innerWidth).toFixed(2)*1;
			this._nVSlope = (window.innerHeight / (window.innerWidth/2)).toFixed(2)*1;
		}
	},

	/**
		vScroll, hScroll을 판단하는 기준 기울기를 설정한다.

		@method setSlope
		@param {Number} nVSlope 수직스크롤 판단 기울기
		@param {Number} nHSlope 수평스크롤 판단 기울기
		@remark
			nVSlope 기울기 보다 클 경우 수직 스크롤로 판단한다.
			nHSlope 기울기 보다 작을 경우 수평 스크롤로 판단한다.
			nVSlope와 nHSlope 사이값인 경우 대각선 스크롤로 판단한다.
	**/
	setSlope : function(nVSlope, nHSlope){
		this._nHSlope = nHSlope;
		this._nVSlope = nVSlope;

		this.bSetSlope = true;
	},

	/**
		vScroll, hScroll을 판단하는 기준 기울기를 리턴한다

		@method getSlope
		@return {Object} elBody 아코디언 블럭의 body 엘리먼트
		@remark
			- {Number} nVSlope 수직스크롤 판단 기울기
			- {Number} nHSlope 수평스크롤 판단 기울기
	**/
	getSlope : function(){
		return{
			nVSlope :  this._nVSlope,
			nHSlope : this._nHSlope
		};
	},

	/**
		터치의 기본정보를 모두 초기화 한다.
	**/
	_resetTouchInfo : function(){
		for(var x in this._htMoveInfo){
			this._htMoveInfo[x] = 0;
		}
		this._deleteLongTapTimer();
		this.bStart = false;
		this.bMove = false;
		this.nMoveType = -1;
	},

	/**
		현재 x,y 좌표값으로 현재 움직임이 무엇인지 판단한다.
		@param {Number} x
		@param {Number} y
	**/
	_getMoveTypeBySingle: function(x, y){
		var nType = this.nMoveType;

		var nX = Math.abs(this._htMoveInfo.nStartX - x);
		var nY = Math.abs(this._htMoveInfo.nStartY - y);
		var nDis = nX + nY;

		//tap정의
		var nGap = this.option('nTapThreshold');
		if((nX <= nGap) && (nY <= nGap)){
			nType = 3;
		}else{
			nType = -1;
		}

		if(this.option('nSlopeThreshold') <= nDis){
			var nSlope = parseFloat((nY/nX).toFixed(2),10);

			if((this._nHSlope === -1) && (this._nVSlope === -1)){
				nType = 2;
			}else{
				if(nSlope <= this._nHSlope){
					nType = 0;
				}else if(nSlope >= this._nVSlope){
					nType = 1;
				}else {
					nType = 2;
				}
			}
		}

		return nType;
	},
	/**

	**/
	_getMoveTypeByMulti : function(aPos){
		var nType = -1;

		//console.log('scale : '+this._htMoveInfo.nBeforeScale);
		if((this.nMoveType === 6) ||  Math.abs(1- this._htMoveInfo.nBeforeScale) >= this.option('nPinchThreshold')){
			nType = 6;
		}

		if((this.nMoveType === 7) ||  Math.abs(0- this._htMoveInfo.nBeforeRotation) >= this.option('nRotateThreshold')){
			if(nType === 6){
				nType = 8;
			}else{
				nType = 7;
			}
		}

		//멀티터치이면서 rotate도 아니고 pinch도 아닐경우
		if(nType === -1){
			return this.nMoveType;
			//nType = this._getMoveTypeBySingle(aPos[0].nX, aPos[0].nY);
		}

		return nType;
	},

	/**

	**/
	_getScale : function(aPos){
		var nScale = -1;

		var nDistance = this._getDistance(aPos);
		if(nDistance <= 0){
			return null;
		}

		if(this._htMoveInfo.nStartDistance === 0){
			nScale = 1;
			this._htMoveInfo.nStartDistance = nDistance;
		}else{
			nScale = nDistance/this._htMoveInfo.nStartDistance;
			//this._htMoveInfo.nBeforeDistance = nDistance;
		}

		this._htMoveInfo.nBeforeScale = nScale;

		return nScale;
	},

	_getRotation : function(aPos){
		var nRotation = -1;

		var nAngle = this._getAngle(aPos);

		if(nAngle === null){
			return null;
		}

		if(this._htMoveInfo.nStartAngle === 0){
			this._htMoveInfo.nStartAngle = nAngle;
			nRotation = 0;
		}else{
			nRotation = nAngle- this._htMoveInfo.nStartAngle;
		}

		this._htMoveInfo.nLastAngle = nAngle;
		this._htMoveInfo.nBeforeRotation = nRotation;

		//console.log('rotate - ' + nRotation);
		return nRotation;
	},

	/**
		현재 x,y 좌표값으로 현재 움직임이 무엇인지 판단한다.
		@param {Number} x
		@param {Number} y
	**/
	_getMoveType : function(aPos){
		var nType = this.nMoveType;

		if(aPos.length === 1){
			nType = this._getMoveTypeBySingle(aPos[0].nX, aPos[0].nY);
		}else if(aPos.length === 2){ //pinch or rotate
			nType = this._getMoveTypeByMulti(aPos);
			//nType = 6;
		}

		return nType;
	},


	_getDistance : function(aPos){
		if(aPos.length === 1){
			return -1;
		}
		 return Math.sqrt(
				 Math.pow(Math.abs(aPos[0].nX - aPos[1].nX), 2) +
				 Math.pow(Math.abs(aPos[0].nY - aPos[1].nY), 2)
			);
	},

	 _getAngle: function(aPos) {
		 if(aPos.length === 1){
			return null;
		 }
			var deltaX = aPos[0].nX - aPos[1].nX,
				deltaY = aPos[0].nY - aPos[1].nY;

		 var nAngle =  Math.atan2(deltaY, deltaX) * this._radianToDegree;

		 if(this._htMoveInfo.nLastAngle !== null){
			 var nDiff = Math.abs(this._htMoveInfo.nLastAngle - nAngle);
			 var nNext = nAngle + 360;
			 var nPrev = nAngle - 360;

			 if(Math.abs(nNext - this._htMoveInfo.nLastAngle) < nDiff){
				 nAngle = nNext;
			 }else if(Math.abs(nPrev - this._htMoveInfo.nLastAngle) < nDiff){
				 nAngle = nPrev;
			 }
		 }
		 //console.log('angle : '+ nAngle);
		 return nAngle;
	 },


	/**
		touch 이벤트에서 필요한 좌표값과 엘리먼트, timestamp를 구한다
		@param {$Event} jindo.$Event
		@return {Array}
	**/
	_getTouchInfo : function(oEvent){
		var aReturn = [];
		var nTime = oEvent.$value().timeStamp;

		if(this._hasTouchEvent){
			var oTouch = oEvent.$value().changedTouches;
			for(var i=0, nLen = oTouch.length; i<nLen; i++){
				aReturn.push({
					el : jindo.m.getNodeElement(oTouch[i].target),
					nX : oTouch[i].pageX,
					nY : oTouch[i].pageY,
					nTime : nTime
				});
			}

		}else{
			aReturn.push({
				el : oEvent.element,
				nX : oEvent.pos().pageX,
				nY : oEvent.pos().pageY,
				nTime : nTime
			});
		}

		return aReturn;
	},

	/**
		기준엘리먼트를 el을 리턴한다.

		@method getBaseElement
		@return {HTMLElement} el
	**/
	getBaseElement : function(el){
		return this._el;
	},

	/**
		jindo.m.Touch 컴포넌트를 비활성화한다.
		deactivate 실행시 호출됨
	**/
	_onDeactivate : function(){
		this._detachEvents();
	},

	/**
		jindo.m.Touch 컴포넌트를 활성화한다.
		activate 실행시 호출됨
	**/
	_onActivate : function(){
		this._attachEvents();
	},

	/**
		jindo.m.Touch 에서 사용하는 모든 객체를 release 시킨다.
		@method destroy
	**/
	destroy : function() {
		var p;
		this.deactivate();

		this._el = null;

		for(p in this._htMoveInfo){
			this._htMoveInfo[p] = null;
		}
		this._htMoveInfo = null;

		for(p in this.htEndInfo){
			this.htEndInfo[p] = null;
		}
		this.htEndInfo = null;

		this.bStart = null;
		this.bMove = null;
		this.nMoveType = null;
		this._nVSlope = null;
		this._nHSlope = null;
		this.bSetSlope = null;
	}

	/**
		사용자의 터치가 끝난 이후에 움직임이 tap으로 분석되었을 경우 발생한다.(touchEnd이후에 발생)
		@remark 만약 doubleTap의 커스텀 이벤트 핸들러가 있는 경우 doubleTap에 대한 분석을 위해 touchEnd 이후에 기준 시간 이후에 tap이 발생한다

		@event tap
		@param {String} sType 커스텀 이벤트명
		@param {String} sMoveType 현재 분석된 움직임
		@param {HTMLElement} element 현재 터치된 영역의 Element
		@param {Number} nX 현재 터치영역의 X좌표
		@param {Number} nY 현재 터치 영역의 Y좌표
		@param {Number} nVectorX 이전 touchMove 혹은 touchStart의 X좌표와의 상대적인 거리(직전 좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
		@param {Number} nVectorY 이전 touchMove 혹은 touchStart의 Y좌표와의 상대적인 거리(직전 좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
		@param {Number} nDistanceX touchStart의 X좌표와의 상대적인 거리 (touchStart좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
		@param {Number} nDistanceY touchStart의 Y좌표와의 상대적인 거리 (touchStart좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
		@param {Object} oEvent jindo.$Event object
		@param {Function} stop stop를 호출하여 영향 받는 것이 없다.
	**/

	/**
		tap과 tap사이의 발생간격이 기준 시간 이하일경우 발생한다.

		@event doubleTap
		@param {String} sType 커스텀 이벤트명
		@param {HTMLElement} element 현재 터치된 영역의 Element
		@param {Number} nX 터치영역의 X좌표
		@param {Number} nY 터치 영역의 Y좌표
		@param {Object} oEvent jindo.$Event object
		@param {Function} stop stop를 호출하여 영향 받는 것이 없다.
	**/

	/**
		사용자의 터치가 끝난 이후에 움직임이 수평 스크롤으로 분석되었을 경우 발생한다.
		@remark touchEnd이후에 발생.분석 기준의 픽셀 이하로 움직였을 경우에는 분석되지 않아서 커스텀 이벤트 발생하지 않는다.

		@event hScroll
		@param {String} sType 커스텀 이벤트명
		@param {HTMLElement} element 현재 터치된 영역의 Element
		@param {Number} nX 현재 터치영역의 X좌표
		@param {Number} nY 현재 터치 영역의 Y좌표
		@param {Array} aX 모든 터치 영역의 X좌표
		@param {Array} aY 모든 터치 영역의 Y좌표
		@param {Number} nVectorX 이전 touchMove 혹은 touchStart의 X좌표와의 상대적인 거리 (직전 좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
		@param {Number} nVectorY 이전 touchMove 혹은 touchStart의 Y좌표와의 상대적인 거리 (직전 좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
		@param {Number} nDistanceX touchStart의 X좌표와의 상대적인 거리 (touchStart좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
		@param {Number} nDistanceY touchStart의 Y좌표와의 상대적인 거리 (touchStart좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
		@param {Number} nSpeedX 가속 발생 구간일 경우 현재 터치움직임의 수평방향 속도, 가속 구간이 아닐경우 0
		@param {Number} nSpeedY 가속 발생 구간일 경우 현재 터치움직임의 수직방향 속도, 가속 구간이 아닐경우 0
		@param {Number} nMomentumX 가속 발생 구간일 경우 현재 터치 움직임의 수평방향 운동에너지값,가속 구간이 아닐경우 0
		@param {Number} nMomentumY 가속 발생 구간일 경우 현재 터치 움직임의 수직방향 운동에너지값,가속 구간이 아닐경우 0
		@param {Number} nStartX touchStart의 X좌표
		@param {Number} nStartY touchStart의 Y좌표
		@param {Number} nStartTimeStamp touchStart의 timestamp 값
		@param {Object} oEvent jindo.$Event object
		@param {Function} stop stop를 호출하여 영향 받는 것이 없다.
	**/

	/**
		사용자의 터치가 끝난 이후에 움직임이 수직 스크롤으로 분석되었을 경우 발생한다.
		@remark touchEnd이후에 발생.분석 기준의 픽셀 이하로 움직였을 경우에는 분석되지 않아서 커스텀 이벤트 발생하지 않는다.

		@event vScroll
		@param {String} sType 커스텀 이벤트명
		@param {Number} element 현재 터치된 영역의 Element
		@param {Number} nX 현재 터치영역의 X좌표
		@param {Number} nY 현재 터치 영역의 Y좌표
		@param {Array} aX 모든 터치 영역의 X좌표
		@param {Array} aY 모든 터치 영역의 Y좌표
		@param {Number} nVectorX 이전 touchMove 혹은 touchStart의 X좌표와의 상대적인 거리 (직전 좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
		@param {Number} nVectorY 이전 touchMove 혹은 touchStart의 Y좌표와의 상대적인 거리 (직전 좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
		@param {Number} nDistanceX touchStart의 X좌표와의 상대적인 거리 (touchStart좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
		@param {Number} nDistanceY touchStart의 Y좌표와의 상대적인 거리 (touchStart좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
		@param {Number} nSpeedX 가속 발생 구간일 경우 현재 터치움직임의 수평방향 속도, 가속 구간이 아닐경우 0
		@param {Number} nSpeedY 가속 발생 구간일 경우 현재 터치움직임의 수직방향 속도, 가속 구간이 아닐경우 0
		@param {Number} nMomentumX 가속 발생 구간일 경우 현재 터치 움직임의 수평방향 운동에너지값,가속 구간이 아닐경우 0
		@param {Number} nMomentumY 가속 발생 구간일 경우 현재 터치 움직임의 수직방향 운동에너지값,가속 구간이 아닐경우 0
		@param {Number} nStartX touchStart의 X좌표
		@param {Number} nStartY touchStart의 Y좌표
		@param {Number} nStartTimeStamp touchStart의 timestamp 값
		@param {Object} oEvent jindo.$Event object
		@param {Function} stop stop를 호출하여 영향 받는 것이 없다.
	**/

	/**
		사용자의 터치가 끝난 이후에 움직임이 대각선 스크롤으로 분석되었을 경우 발생.
		@remark touchEnd이후에 발생.분석 기준의 픽셀 이하로 움직였을 경우에는 분석되지 않아서 커스텀 이벤트 발생하지 않는다

		@event dScroll
		@param {String} sType 커스텀 이벤트명
		@param {HTMLElement} element 현재 터치된 영역의 Element
		@param {Number} nX 현재 터치영역의 X좌표
		@param {Number} nY 현재 터치 영역의 Y좌표
		@param {Array} aX 모든 터치 영역의 X좌표
		@param {Array} aY 모든 터치 영역의 Y좌표
		@param {Number} nVectorX 이전 touchMove 혹은 touchStart의 X좌표와의 상대적인 거리 (직전 좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
		@param {Number} nVectorY 이전 touchMove 혹은 touchStart의 Y좌표와의 상대적인 거리 (직전 좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
		@param {Number} nDistanceX touchStart의 X좌표와의 상대적인 거리 (touchStart좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
		@param {Number} nDistanceY touchStart의 Y좌표와의 상대적인 거리 (touchStart좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
		@param {Number} nSpeedX 가속 발생 구간일 경우 현재 터치움직임의 수평방향 속도, 가속 구간이 아닐경우 0
		@param {Number} nSpeedY 가속 발생 구간일 경우 현재 터치움직임의 수직방향 속도, 가속 구간이 아닐경우 0
		@param {Number} nMomentumX 가속 발생 구간일 경우 현재 터치 움직임의 수평방향 운동에너지값,가속 구간이 아닐경우 0
		@param {Number} nMomentumY 가속 발생 구간일 경우 현재 터치 움직임의 수직방향 운동에너지값,가속 구간이 아닐경우 0
		@param {Number} nStartX touchStart의 X좌표
		@param {Number} nStartY touchStart의 Y좌표
		@param {Number} nStartTimeStamp touchStart의 timestamp 값
		@param {Object} oEvent jindo.$Event object
		@param {Function} stop stop를 호출하여 영향 받는 것은 없다.
	**/


	/**
		사용자의 터치가 끝난 이후에 움직임이 pinch로 분석되었을 경우 발생.
		@remark touchEnd이후에 발생.분석 기준의 scale값 이하일 경우 분석되지 않아서 커스텀 이벤트 발생하지 않는다

		@event pinch
		@param {String} sType 커스텀 이벤트명
		@param {HTMLElement} element 현재 터치된 영역의 Element
		@param {Number} nX 현재 터치영역의 X좌표
		@param {Number} nY 현재 터치 영역의 Y좌표
		@param {Array} aX 모든 터치 영역의 X좌표
		@param {Array} aY 모든 터치 영역의 Y좌표
		@param {Number} nScale 멀티터치일경우 계산된 scale값
		@param {Number} nRotation 멀티터치일경우 계산된 rotation값 (pinch이면서 rotate일 경우 이 값도 존재한다)
		@param {Number} nStartTimeStamp touchStart의 timestamp 값
		@param {Object} oEvent jindo.$Event object
		@param {Function} stop stop를 호출하여 영향 받는 것은 없다.

		@history 1.2.0 Update (MultiTouch) Custom Event 추가
	**/

	/**
		사용자의 터치가 끝난 이후에 움직임이 rotate로 분석되었을 경우 발생.
		@remark touchEnd이후에 발생.분석 기준의 rotate값 이하일 경우 분석되지 않아서 커스텀 이벤트 발생하지 않는다.

		@event rotate
		@param {String} sType 커스텀 이벤트명
		@param {HTMLElement} element 현재 터치된 영역의 Element
		@param {Number} nX 현재 터치영역의 X좌표
		@param {Number} nY 현재 터치 영역의 Y좌표
		@param {Array} aX 모든 터치 영역의 X좌표
		@param {Array} aY 모든 터치 영역의 Y좌표
		@param {Number} nRotation 멀티터치일경우 계산된 rotation값
		@param {Number} nScale 멀티터치일경우 계산된 scale값 (pinch이면서 rotate일 경우 이 값도 존재한다)
		@param {Number} nStartTimeStamp touchStart의 timestamp 값
		@param {Object} oEvent jindo.$Event object
		@param {Function} stop stop를 호출하여 영향 받는 것은 없다.

		@history 1.2.0 Update (MultiTouch) Custom Event 추가

	**/

}).extend(jindo.m.UIComponent);/**
    @fileOverview 여러개의 콘텐츠 영역을 사용자 터치의 움직임을 통해 좌/우, 상/하 로 슬라이드하여 보여주는 컴포넌트
    @author oyang2
    @version 1.7.1
    @since 2012-06-16
**/
/**
    여러개의 콘텐츠 영역을 사용자 터치의 움직임을 통해 좌/우, 상/하 로 슬라이드하여 보여주는 컴포넌트

    @class jindo.m.Flicking
    @extends jindo.m.UIComponent
    @uses jindo.m.Touch
    @keyword flicking, 플리킹
    @group Component
    @update
	
    @history 1.7.1 Bug bUseDiagonalTouch=false일 경우, 대각선 플리킹시 플리킹이 약간 움직이는 버그 수정
    @history 1.7.1 Bug 안드로이드 2.x에서 플리킹 사용시 깜박이는 문제 수정
    @history 1.7.0 Bug bUseTimingFunction이 true일 경우, prev로 이동하지 않는 버그 수정
    @history 1.7.0 Update base엘리먼트에 z-index = 2000으로 설정 (Css3d사용시 충돌하는 버그 수정)
    @history 1.6.0 Bug bUseCircular가 false일 경우, 처음 패널에서 전 패널로 가려고 할때, 마지막 패널에서 다음 패널로 가려고 할때, beforeFlicking/afterFlicking이벤트가 발생하지 않도록 수정.
    @history 1.6.0 Update 구조개선
    @history 1.5.0 Support Window Phone8 지원
    
    @history 1.5.0 Update [sroll] 커스텀 이벤트 추가
    @history 1.5.0 Update [rotate] 커스텀 이벤트 추가
    @history 1.4.0 Support iOS 6 지원
    @history 1.4.0 Upate [sAnimation] alignFlip 효과 지원
    @history 1.4.0 Bug 슬라이드 플리킹에서 모멘텀이 발생하는 문제 수정
    @history 1.3.5 Support Android 4.1(젤리빈) 대응
    @history 1.3.5 Update [sAnimation] flip 효과 지원<br />
                        [beforeFlicking] slide 타입에서 stop() 호출하면 다시 제자리로 돌아가는 bounce 기능 추가
    @history 1.3.5 Bug slide 타입에서 ios에서 afterFlicking에서 패널의 마크업을 바꿀 경우 잔상이 보이는 버그 해결
    @history 1.3.0 Update sAnimation, bUseCiarcular 옵션에 따라 플리킹 애니메이션을 지정 할 수 있도록 구조 개선
    @history 1.3.0 Support 갤럭시 S3 4.0.3 업데이트 지원, 갤럭시노트 4.0.3 업데이트 지원, 갤럭시S2 LTE 4.0.3 지원
    @history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
    @history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
    @history 0.9.0 Release 최초 릴리즈
**/

jindo.m.Flicking = jindo.$Class({
    /*  @lends jindo.m.Flicking.prototype */
    /**
        초기화 함수

        @constructor
        @param {String|HTMLElement} el 플리킹 기준 Element (필수)
        @param {Object} [htOption] 초기화 옵션 객체
            @param {Boolean} [htOption.bHorizontal=true] 가로여부
            @param {Number} [htOption.nDefaultIndex=0] 초기 로드시의 화면에 보이는 콘텐츠의 인덱스
            @param {String} [htOption.sClassPrefix='flick-'] Class의 prefix명
            @param {String} [htOption.sContentClass='ct'] 컨텐츠 영역의 class suffix명
            @param {Number} [htOption.nDuration=100] 슬라이드 애니메이션 지속 시간
            @param {Number} [htOption.nFlickThreshold=40] 콘텐츠가 바뀌기 위한 최소한의 터치 드래그한 거리 (pixel)
            @param {Boolean} [htOption.bUseCircular=false] 순환플리킹여부를 지정한다. true로 설정할 경우 3판이 연속으로 플리킹된다.
            @param {String} [htOption.sAnimation='slide'] 플리킹 애니메이션을 지정한다. "slide"와 "cover", "flip", "alignFlip" 만 현재 지정가능
            @param {Number} [htOption.nFlickDistanceOffset=null] 각 컨텐츠의 위치에서 상대적인 위치 값을 설정하여
플리킹 이동을 이 위치만큼 이동하게 수정가능한 옵션
            @param {Boolean} [htOption.bAutoResize=true] 화면전환시에 리사이즈에 대한 처리 여부
            @param {Number} [htOption.nBounceDuration=100] nFlickThreshold 이하로 움직여서 다시 제자리로 돌아갈때 애니메이션 시간
            @param {Boolean} [htOption.bUseCss3d=jindo.m._isUseCss3d(true)] css3d(translate3d) 사용여부<br />
                모바일 단말기별로 다르게 설정된다. 상세내역은 <auidoc:see content="jindo.m">[jindo.m]</auidoc:see>을 참조하기 바란다.
            @param {Boolean} [htOption.bUseTimingFunction=jindo.m._isUseTimingFunction()] 애니메이션 동작방식을 css의 TimingFunction을 사용할지 여부<br />false일 경우 setTimeout을 이용하여 애니메이션 실행.<br />
            모바일 단말기별로 다르게 설정된다. 상세내역은 <auidoc:see content="jindo.m">[jindo.m]</auidoc:see>을 참조하기 바란다.
            @param {Boolean} [htOption.bUseTranslate=true] css의 translate 속성을 사용할지 여부<br /> false일 경우 "left", "top" 속성을 이용함.
            @param {Boolean} [htOption.bUseDiagonalTouch=true] 대각선스크롤 방향으 터치도 플리킹으로 사용할지 여부
            @param {Boolean} [htOption.bSetNextPanelPos=false] 플리킹할때 다음 패널의 top위치를 항상 맨 위로 사용할지 여부
            @param {Boolean} [htOption.bActivateOnload=true] 컴포넌트 로드시 activate 여부
        @history 1.7.0 Update [bAutoSize] 옵션 삭제
        @history 1.6.0 Bug [bUseDiagonalTouch] 옵션 버그 수정
        @history 1.5.0 Update [bSetNextPanelPos] 옵션 추가 
        @history 1.5.0 Update [bUseDiagonalTouch] 옵션 추가
        @history 1.3.0 Update [sAnimation] Option 추가<br />
        @history 1.3.0 Update [bUseTranslate] Option 추가<br />
        @history 1.3.0 Update [bUseTimingFunction] Option 추가<br />
        @history 1.2.0 Update [nFlickDistanceOffset] Option 추가<br />
        @history 1.2.0 Update [bUseCss3d] Option 추가<br />
        @history 1.2.0 Update [bAutoSize] Option 추가<br />
    **/
    $init : function(sId, htUserOption){
         this.option({
           bHorizontal : true,
           nDefaultIndex : 0,
           sClassPrefix : 'flick-',
           sContentClass : 'ct',
           nDuration : 100,
           nFlickThreshold : 40,
           bUseCircular : false,
           sAnimation : 'slide',
           nFlickDistanceOffset :  null,
           bAutoResize : true,
           // bAutoSize : true,
           nBounceDuration : 100,
           bSetNextPanelPos :  false, //플리킹시에 다음판에 대해서 현재 스크롤 위치에 높이값을 맞출지 여부
           bUseCss3d : jindo.m._isUseCss3d(true), //css3d사용여부 bUseTranslate가 true 일때만 사
           bUseTimingFunction : jindo.m._isUseTimingFunction(true), //스크립트방식으로 애니메이션을 사용할지 csstimingfunction을 사용할지 여부
           bUseTranslate : true, //css의 translate를 사용할지 style 속성의 top, left속성 사용할지 여부
           bActivateOnload : true,
           bUseDiagonalTouch : false, //대각선스크롤을 플리킹에 사용할지 여부
           nDefaultScale : 0.94 //cover효과에서 사용되는 scale 사이즈 
        });
        
        this._el = jindo.$(sId);
        var htInfo = jindo.m.getDeviceInfo();

        //cover관련 코드 분기
        //cover는 같은 레이어 위치에 있고, display:none을 사용하기 때문에 3d로 사용해도 하이라이팅 이슈가 없음
        if((typeof htUserOption !== 'undefined') && (typeof htUserOption["sAnimation"] !== 'undefined') && (htUserOption["sAnimation"] === "cover")){
             if((htInfo.android && !htInfo.bChrome) && (parseInt(htInfo.version,10) >= 4 ) && ( htInfo.galaxyS2|| htInfo.galaxyNote)){
                  this.option('bUseCss3d', true);
             }

        }

        this.option(htUserOption || {});

        this._initVar();


        if(this.option("bActivateOnload")) {
             this.activate();
        }
    },


     $static : {
        _htAnimation : {
            'circular-slide' : 'SlideFlicking',
            'slide' : 'SlideFlicking',
            'cover' : 'CoverFlicking',
            'circular-cover' : 'CoverFlicking',
            'flip' : 'FlipFlicking',
            'circular-flip' : 'FlipFlicking',
            'alignFlip' : 'AlignFlipFlicking',
            'circular-alignFlip' : 'AlignFlipFlicking'
        }
    },

    /**
        jindo.m.Flicking 에서 사용하는 모든 인스턴스 변수를 초기화한다.
    **/
    _initVar: function() {
        this._oFlickingAnimation = null; //animation plugin
    },


    /**
        sType으로 플리킹 애니메이션을 설정한다.

        @method setFlickingAnimation
        @param {String} sType "slide" 또는 "cover" 중에 설정가능
    **/
    setFlickingAnimation : function(sType){
        if(typeof sType === 'undefined'){
            sType = this.option('sAnimation');
            if(this.option('bUseCircular')){
                sType  = 'circular-' + sType;
            }
        }

        if(!jindo.m.Flicking._htAnimation[sType]) {
            return false;
        }

        if(!this._oFlickingAnimation || (this.option('sAnimation') !== sType)){
             this._createAnimation(sType);
        }
    },
    
     /**
        animation 인스턴스 생성한다.
    **/
    _createAnimation : function(sType){
        if(jindo.m.Flicking._htAnimation[sType]) {
            if(this._oFlickingAnimation){
                this._oFlickingAnimation.detachAll();
                this._oFlickingAnimation = null;
            }
                       
            try{
               //this._oFlickingAnimation = eval("new " + jindo.m.Flicking._htAnimation[sType] + "("+);
               this._oFlickingAnimation = new jindo.m[jindo.m.Flicking._htAnimation[sType]](this._el, this.option());
               //this._attachFlicking();
            }catch(e){
                // console.log('ERROR ! ' + e);
            }

        }
    },

  
    /**
        n이 중앙에 오도록 panel을 다시 좌우 배열해서 배치한다.

        @method refresh
        @param {Number} n 현재 화면에 보여져야할 content의 인덱스
        @param {Boolean} bResize 화면 크기가 변화되어 다시 사이즈를 업데이트 해야 할경우
        @param {Boolean} bFireEvent 커스텀이벤트 발생여부
    **/
    refresh : function(n, bResize, bFireEvent){
        if( this._oFlickingAnimation){
             this._oFlickingAnimation.refresh(n,bResize, bFireEvent);
        }
    },

  

    /**
        el엘리먼트가 몇번째 인덱스인지 리턴한다.

        @method getIndexByElement
        @param {HTMLElement} el
        @return {Number} index
    */
   getIndexByElement : function(el){
        if(this._oFlickingAnimation){
            return this._oFlickingAnimation.getIndexByElement(el);
        }else{
            return -1;
        }
   },

    /**
        현재 화면에 중앙에 보이는 컨텐츠 혹은 패널의 래핑된 엘리먼트를 리턴한다.

        @method getElement
        @return {jindo.$Element} el
    **/
    getElement : function(){
        if(this._oFlickingAnimation){
            return this._oFlickingAnimation.getElement();
        }else{
            return null;
        }
    },

    /**
        현재 화면에 중앙에 보이는 컨텐츠 혹은 패널의 래핑된 엘리먼트를 리턴한다. (deprecated 예정)

        @method getContentElement
        @deprecated
        @return {jindo.$Element} el
    **/
    getContentElement: function(){
        return this.getElement();
    },


    /**
        현재 플리킹 화면에 보이는 컨텐츠의 인덱스를 리턴한다.
        @method getContentIndex
        @return {Number} n
    **/
    getContentIndex : function(){
        if(this._oFlickingAnimation){
            return this._oFlickingAnimation.getContentIndex();
        }else{
            return null;
        }
    },


    /**
        이후 컨텐츠의 패널 엘리먼트의 래핑된 엘리먼트를 리턴한다.

        @method getNextElement
        @return {jindo.$Element} el
        @history 1.1.0 Update Method 추가
    **/
    getNextElement : function(){
       if(this._oFlickingAnimation){
            return this._oFlickingAnimation.getNextElement();
        }else{
            return null;
        }
    },

    /**
        이전 컨텐츠의 패널 엘리먼트의 래핑된 엘리먼트를 리턴한다.

        @method getPrevElement
        @return {jindo.$Element} el
        @history 1.1.0 Update Method 추가
    **/
    getPrevElement : function(){
        if(this._oFlickingAnimation){
            return this._oFlickingAnimation.getPrevElement();
        }else{
            return null;
        }
    },

    /**
        전체 컨텐츠의 개수를 리턴한다.

        @method getTotalContents
        @return {Number} n
        @history 1.1.0 Update Method 추가
    **/
    getTotalContents : function(){
        if(this._oFlickingAnimation){
            return this._oFlickingAnimation.getTotalContents();
        }else{
            return null;
        }
    },

    /**
        전체 패널의 개수를 리턴한다.

        @method getTotalPanels
        @return {Number} [$Element]
    **/
    getTotalPanels : function(){
        if(this._oFlickingAnimation){
            return this._oFlickingAnimation.getTotalPanels();
        }else{
            return null;
        }
    },

    /**
        전체 패널의 배열을 반환한다.

        @method getPanels
        @history 1.7.0 Update Method 추가 
        @return {Array} n
    **/
    getPanels : function(){
        if(this._oFlickingAnimation){
            return this._oFlickingAnimation._htWElement.aPanel;
        }else{
            return null;
        }
    },

    /**
        이전 컨텐츠의 인덱스를 리턴한다.

        @method getPrevIndex
        @return {Number} n
    **/
    getPrevIndex : function(){
       if(this._oFlickingAnimation){
            return this._oFlickingAnimation.getPrevIndex();
        }else{
            return null;
        }
    },


    /**
        이후 컨텐츠의 인덱스를 리턴한다.

        @method getNextIndex
        @return {Number} n
    **/
    getNextIndex : function(){
       if(this._oFlickingAnimation){
            return this._oFlickingAnimation.getNextIndex();
        }else{
            return null;
        }
    },

    /**
        다음 플리킹화면으로 이동한다.

        @method moveNext
        @param {Number} nDuration 플리킹 애니메이션 시간
    **/
    moveNext : function(nDuration){
        if(!this.isActivating()){
            return;
        }
        if(this._oFlickingAnimation){
            this._oFlickingAnimation.moveNext(nDuration);
        }
    },

    /**
        이전  플리킹화면으로 이동한다.

        @method movePrev
        @param {Number} nDuration 플리킹 애니메이션 시간
    **/
    movePrev : function(nDuration){
       if(!this.isActivating()){
            return;
        }
        if(typeof nDuration === 'undefined'){
            nDuration = this.option('nDuration');
        }

        if(this._oFlickingAnimation){
            this._oFlickingAnimation.movePrev(nDuration);
        }
    },


    /**
        n 번째 컨텐츠로 현재 플리킹화면을 이동한다.

        @method moveTo
        @param {Number} n 이동해야하는 컨텐츠 인덱스
        @param {Number} nDuration 애니메이션 시간
        @param {Number} bFireEvent 커스텀 이벤트 발생여부
    **/
    moveTo : function(nIndex, nDuration, bFireEvent){
        if((typeof nIndex === 'undefined') || (nIndex == this.getContentIndex()) ){
            return;
        }
        if(nIndex < 0 || nIndex >= this.getTotalContents() ){
            return;
        }
        
        if(this._oFlickingAnimation){
            this._oFlickingAnimation.moveTo(nIndex, nDuration, bFireEvent);
        }

    },


    /**
        현재 애니메이션중인지 여부를 리턴한다.

        @method isAnimating
        @return {Boolean}  bAnimation
    **/
    isAnimating : function(){
        return this._doFlicking;
    },

    /**
        화면전환시에 리사이즈처리 및 위치 처리를 한다.
    **/
    _onResize : function(evt){
        if(this.option('bAutoResize')){
            var n = this.getIndexByElement(this.getElement().$value());
            this.refresh(n, true, false);
        }
        /**
            단말기가 회전될 때 발생한다

            @event rotate
            @param {String} sType 커스텀 이벤트명
            @param {Boolean} isVertical 수직여부
            @param {Function} stop 수행시 영향을 받는것은 없다
            @history 1.5.0 Update Custom Event 추가
        **/
        this.fireEvent("rotate",{
            isVertical : evt.isVertical
        });
    },


        /**
        jindo.m.Flicking 컴포넌트를 활성화한다.
        activate 실행시 호출됨
        */
     _onActivate : function() {
         if(this._oFlickingAnimation){
             
         }else{
             this.setFlickingAnimation();
         }
         
         this._oFlickingAnimation.activate();
         this._attachEvent();
         this.refresh(this.getContentIndex(), true, false);
         
     },

    /**
        jindo.m.Flicking 컴포넌트를 비활성화한다.
        deactivate 실행시 호출됨
        */
     _onDeactivate : function() {
         this._detachEvent();
     },

    /**
        jindo.m.Flicking 에서 사용하는 모든 이벤트를 바인드한다.
    **/
    _attachEvent : function() {
        this._htEvent = {};
        /* rotate */
       this._htEvent["rotate"] = jindo.$Fn(this._onResize, this).bind();
       jindo.m.bindRotate(this._htEvent["rotate"]);

       /* pageshow 이벤트 처리 */
       this._htEvent["pageshow"] = jindo.$Fn(this._onResize, this).bind();
       //jindo.m.bindPageshow(this._htEvent["pageshow"]);
        
      this._attachFlicking();
    },
    
    _attachFlicking : function(){
        /* custom event 처리 */
       if(this._oFlickingAnimation){
           this._oFlickingAnimation.detachAll();
           var self = this;
           
           this._oFlickingAnimation.attach({
                /**
            플리킹영역에 터치가 시작되었을 때 발생한다

            @event touchStart
            @param {String} sType 커스텀 이벤트명
            @param {HTMLElement} element 현재 터치된 영역의 Element
            @param {Number} nX 터치 영역 X좌표
            @param {Number} nY 터치 영역 Y좌표
            @param {object} oEvent jindo.$Event object
            @param {Function} stop 플리킹 액션이 수행되지 않는다
            @history 1.2.0 Update Custom Event 추가
        **/
               'touchStart' : function(oCustomEvent){
                   if(!self.fireEvent('touchStart', oCustomEvent)){
                       oCustomEvent.stop();
                   }
                   
               },
                /**
            플리킹영역에 터치 움직임이 있을 때 발생한다. Touch이벤트의 'touchMove'와 동일하다

            @event touchMove
            @param {String} sType 커스텀 이벤트명
            @param {String} sMoveType 현재 분석된 움직임
            @param {HTMLElement} stopelement 현재 터치된 영역의 Element
            @param {Number} nX 터치영역의 X좌표
            @param {Number} nY 터치 영역의 Y좌표
            @param {Number} nVectorX 이전 touchMove(혹은 touchStart)의 X좌표와의 상대적인 거리.(직전 좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
            @param {Number} nVectorY 이전 touchMove(혹은 touchStart)의 Y좌표와의 상대적인 거리.(직전 좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
            @param {Number} nDistanceX touchStart의 X좌표와의 상대적인 거리.(touchStart좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
            @param {Number} nDistanceY touchStart의 Y좌표와의 상대적인 거리.(touchStart좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
            @param {Number} nStartX touchStart의 X좌표
            @param {Number} nStartY touchStart의 Y좌표
            @param {Object} oEvent jindo.$Event object
            @param {Function} stop수행시 영향 받는것 없다.
            @history 1.2.0 Update Custom Event 추가
        **/
               'touchMove' : function(oCustomEvent){
                   self.fireEvent('touchMove', oCustomEvent);
               },
               /**
            플리킹영역에 터치가 끝났을 때 발생한다. Touch이벤트의 'touchEnd'와 동일하다.

            @event touchEnd
            @param {String} sType 커스텀 이벤트명
            @param {String} sMoveType 현재 분석된 움직임
            @param {HTMLElement} element 현재 터치된 영역의 Element
            @param {Number} nX 터치영역의 X좌표
            @param {Number} nY 터치 영역의 Y좌표
            @param {Number} nVectorX 이전 touchMove(혹은 touchStart)의 X좌표와의 상대적인 거리.(직전 좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
            @param {Number} nVectorY 이전 touchMove(혹은 touchStart)의 Y좌표와의 상대적인 거리.(직전 좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
            @param {Number} nDistanceX touchStart의 X좌표와의 상대적인 거리.(touchStart좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
            @param {Number} nDistanceY touchStart의 Y좌표와의 상대적인 거리.(touchStart좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
            @param {Number} nStartX touchStart의 X좌표
            @param {Number} nStartY touchStart의 Y좌표
            @param {Object} oEvent jindo.$Event object
            @param {Function} stop수행시 영향 받는것 없다.
        **/
               'touchEnd' : function(oCustomEvent){
                    self.fireEvent('touchEnd', oCustomEvent);
                   
               },
               
               /**
                플리킹되기 전에 발생한다

                @event beforeFlicking
                @param {String} sType 커스텀 이벤트명
                @param {Number} nContentsIndex 현재 콘텐츠의 인덱스
                @param {Number} nContentsNextIndex (Number) :플리킹될 다음 콘텐츠의 인덱스
                @param {Boolean} bLeft 플리킹 방향이 왼쪽인지에 대한 여부 (세로 플리킹일 경우 이 값은 없다)
                @param {Boolean} bTop 플리킹 방향이 위쪽인지에 대한 여부 (가로 플리킹일 경우 이 값은 없다)
                @param {Function} stop 플리킹되지 않는다.
            **/
               'beforeFlicking' : function(oCustomEvent){
                   if(!self.fireEvent('beforeFlicking', oCustomEvent)){
                       oCustomEvent.stop();
                   }
               },
               
                /**
                현재 화면에 보이는 콘텐츠가 플리킹액션을 통해 바뀔경우 수행된다.

                @event afterFlicking
                @param {String} sType 커스텀 이벤트명
                @param {Number} nContentsIndex 현재 콘텐츠의 인덱스
                @param {Boolean} bLeft 플리킹 방향이 왼쪽인지에 대한 여부 (세로 플리킹일 경우 이 값은 없다)
                @param {Boolean} bTop 플리킹 방향이 위쪽인지에 대한 여부 (가로 플리킹일 경우 이 값은 없다)
                @param {Function} stop 수행시 영향을 받는것은 없다.
            **/
               'afterFlicking' : function(oCustomEvent){
                   self.fireEvent('afterFlicking', oCustomEvent);
               },
               
               /**
                    현재 화면에 보이는 콘텐츠가 바꾸기 직전에  수행된다.

                    @event beforeMove
                    @param {String} sType 커스텀 이벤트명
                    @param {Number} nContentsIndex 현재 콘텐츠의 인덱스
                    @param {Number} nContentsNextIndex (Number) :이동 할 콘텐츠의 인덱스
                    @param {Function} stop 이동하지 않는다.
                **/
               'beforeMove' : function(oCustomEvent){
                   if(!self.fireEvent('beforeMove', oCustomEvent)){
                       oCustomEvent.stop();
                   }
               },
                /**
                        현재 화면에 보이는 콘텐츠가 바뀔경우 수행된다

                        @event move
                        @param {String} sType 커스텀 이벤트명
                        @param {Number} nContentsIndex 현재 콘텐츠의 인덱스
                        @param {Function} stop 수행시 영향을 받는것은 없다
                    **/
               'move' : function(oCustomEvent){
                   self.fireEvent('move', oCustomEvent);
               },
                 /**
                플리킹 액션이 아닌 기본 스크롤 기능이 발생될 때

                @event scroll
                @param {String} sType 커스텀 이벤트명
                @param {Function} stop 수행시 영향 받는것 없다.
                @history 1.5.0 Update Custom Event 추가
            **/
               'scroll' : function(oCustomEvent){
                   self.fireEvent('scroll');
               },
               /**
                플리킹 임계치에 도달하지 못하고 사용자의 액션이 끝났을 경우, 원래 인덱스로 복원하기 전에 발생하는 이벤트

                @event beforeRestore
                @param {String} sType 커스텀 이벤트명
                @param {Number} nContentsIndex 현재 콘텐츠의 인덱스
                @param {Function} stop 플리킹이 복원되지 않는다.
                @history 1.7.0 Update Custom Event 추가                
            **/
               'beforeRestore' : function(oCustomEvent){
                   if(!self.fireEvent('beforeRestore', oCustomEvent)){
                       oCustomEvent.stop();
                   }
               },
               
                /**
                플리킹 임계치에 도달하지 못하고 사용자의 액션이 끝났을 경우, 원래 인덱스로 복원한 후에 발생하는 이벤트

                @event restore
                @param {String} sType 커스텀 이벤트명
                @param {Number} nContentsIndex 현재 콘텐츠의 인덱스
                @history 1.7.0 Update Custom Event 추가                  
            **/
               'restore' : function(oCustomEvent){
                   self.fireEvent('restore', oCustomEvent);
               }
           });
       }  
    },

    /**
        jindo.m.Flicking 에서 사용하는 모든 이벤트를 해제한다.
    **/
    _detachEvent : function() {
        /* rotate */
        jindo.m.unbindRotate(this._htEvent["rotate"]);

        /*그외*/
       for(var p in this._htEvent){
            var htTargetEvent = this._htEvent[p];
            if (typeof htTargetEvent.ref !== "undefined") {
                htTargetEvent.ref.detach(htTargetEvent.el, p);
            }
        }
        
        /* 커스텀 이벤트 */
        if(this._oFlickingAnimation){
            this._oFlickingAnimation.detachAll();
        }

        this._htEvent = null;
    },

    /**
        jindo.m.Flicking 에서 사용하는 모든 객체를 release 시킨다.
        @method destroy
    **/
    destroy: function() {
        this.deactivate();

        for(var p in this._htWElement) {
            this._htWElement[p] = null;
        }
        this._htWElement = null;

        this._oFlickingAnimation = null;
        for(var p1 in this._htIndexInfo){
            this._htIndexInfo[p] = null;
        }

        this._isIos = null;
        this._bAndroid = null;
        this._nVersion = null;
        this._fnDummyFnc = null;
        this._doFlicking = null;
        this._bClickBug = null;
        this._b3dExecption = null;
        this._bDummyTagException = null;

    }
}).extend(jindo.m.UIComponent);/**
    @fileOverview  flicking 상위 클래스 
    @author "oyang2"
    @version 1.7.1
    @since  2012. 05. 24
    
**/
/**
   flicking 상위 클래스 

    @class jindo.m.FlickingAnimation
    @uses jindo.m.Flicking
    @invisible
    @keyword flicking
    @group Component
**/

jindo.m.FlickingAnimation = jindo.$Class({
     /** @lends jindo.m.FlickingAnimation.prototype */
    /**
     * @description 초기화 함수
     * @constructs
     */
     $init : function(sId, htUserOption){
         this.option(htUserOption || {});
         this._setWrapperElement(sId);
         this._initVar();
         this._initTouch();
         this._createDummyTag();
         
         if(this.option("bActivateOnload")) {
             this.activate();
         }
     },
     
     _initVar : function(){
         this._oTouch = null; //touch 인스턴스 
         this._doFlicking = false;
         this._bTouchStart  = false;
         this._bMove = false;

         var nDefaultIndex = this.option('nDefaultIndex')||0;
         if(!this._checkIndex(nDefaultIndex)){ nDefaultIndex = 0;}
         if(this.option('bUseCircular')){ nDefaultIndex = nDefaultIndex%3;}
         
         this._htIndexInfo = {
             nContentIndex : nDefaultIndex, 
             nNextContentIndex : nDefaultIndex,
             welElement : this._htWElement.aPanel[nDefaultIndex],
             welNextElement : this._htWElement.aPanel[nDefaultIndex],
             sDirection : null
         };

         var htInfo = jindo.m.getDeviceInfo();
         this._isIos = (htInfo.iphone || htInfo.ipad);
         this._bAndroid = htInfo.android && (!htInfo.bChrome);
         this._nVersion = htInfo.version;
         this._fnDummyFnc = function(){return false;};
         this._bClickBug = jindo.m.hasClickBug();
         this._sCssPrefix = jindo.m.getCssPrefix();
         this._elTransition  = null;
         
         this._wfTransitionEnd = jindo.$Fn(this._onTransitionEnd, this).bind();
        

         //더미 엘리먼트를 만들어서 focus 호출해야 하는 것들
         this._bDummyTagException = (this._bAndroid && (this._nVersion < "3") ); 
     },
     
     /**
      *  플리킹 내부에서 쓰는 엘리먼트를 저장한다.
      */
     _setWrapperElement : function(sId){
         this._htWElement = {}; //baseElement
         var el = jindo.$(sId);
         var sClass = '.'+ this.option('sClassPrefix');
         // zIndex 2000 추가
         this._htWElement.base = jindo.$Element(el).css("zIndex", 2000);
         this._htWElement.container = jindo.$Element(jindo.$$.getSingle(sClass+'container',el));
         var aContents = jindo.$$(sClass+this.option('sContentClass'), el);

         this._htWElement.aPanel = jindo.$A(aContents).forEach(function(value,index, array){
             array[index] = jindo.$Element(value);
         }).$value();

         //ie10 대응 코드
         if(typeof this._htWElement.base.$value().style.msTouchAction !== 'undefined'){
             this._htWElement.base.css('msTouchAction','none');
         }
     },
     
     /**
      * 플리킹 시작전에 설정해야 하는 스타일 및 사이즈들을 설정한다.
      */
     _initFlicking : function(){
         this._setElementStyle();
         this._setElementSize();
     },
     
     /**
      * @override 할것 
      */
     _setElementStyle : function(){
         
     },
     
     /**
      * @override 할것 
      */
     _setElementSize : function(){
         
     },
     
     /**
      *     플리킹 내부에서 사용하는 터치컴포넌트 인스턴스 생성한다.
      */
     _initTouch : function(){
         this._oTouch = new jindo.m.Touch(this._htWElement.base.$value(),{
            nSlopeThreshold : 4,
            nMoveThreshold : 0,
            nEndEventThreshold : (jindo.m.getDeviceInfo().win)? 400:0,
            bActivateOnload : false
        });
     },
     
     /**
       안드로이드 전용 랜더링 버그 해결을 위한 더미 태그를 만든다.
     */
    _createDummyTag : function(){
        //android 포커스를 위한 더미 태그가 필요
        if(this._bDummyTagException) {
            //debugger;
            this._htWElement.aDummyTag = [];
            for(var i=0,nLen = this._htWElement.aPanel.length;i<nLen;i++){
                var wel =this._htWElement.aPanel[i];
                var elDummyTag = jindo.$$.getSingle("._cflick_dummy_atag_", wel.$value());
                if(!elDummyTag){
                    elDummyTag = jindo.$("<a href='javascript:void(0);' class='_cflick_dummy_atag_'></a>");
                    elDummyTag.style.position = "absolute";
                    elDummyTag.style.left = "-1000px";
                    elDummyTag.style.top = "-1000px";
                    elDummyTag.style.width = 0;
                    elDummyTag.style.height = 0;
                    wel.append(elDummyTag);
                }
                this._htWElement.aDummyTag.push(elDummyTag);
            }
        }
    },

    /**
        안드로이드에서 css 속성을 사용해서 transform 이후에 포커스를 잃는 현상의 버그 수정하는 코드
    **/
    _focusFixedBug : function(){
        if(!this._htWElement || typeof this._htWElement.aDummyTag === 'undefined'){
            return;
        }

        for(var i=0,nLen= this._htWElement.aDummyTag.length;i<nLen;i++){
            this._htWElement.aDummyTag[i].focus();
        }
    },
     
     /**
      *     터치 이벤트의 start 이벤트 핸들러 
      */
     _onStart : function(oCustomEvent){
         if (this._doFlicking) {
             return;
         }

       /**
            플리킹영역에 터치가 시작되었을 때 발생한다

            @event touchStart
            @param {String} sType 커스텀 이벤트명
            @param {HTMLElement} element 현재 터치된 영역의 Element
            @param {Number} nX 터치 영역 X좌표
            @param {Number} nY 터치 영역 Y좌표
            @param {object} oEvent jindo.$Event object
            @param {Function} stop 플리킹 액션이 수행되지 않는다
            @history 1.2.0 Update Custom Event 추가
        **/
       if(!this.fireEvent('touchStart', oCustomEvent)){
           oCustomEvent.stop();
           return;
        }

        this._bTouchStart = true;
        this._clearAnchor();
        this._onAfterStart();
     },
     
     /**
      * @override
      */
     _onAfterStart : function(){
         
     },
     
     _onMove : function(oCustomEvent){
        var bH = this.option('bHorizontal');
        /** 시스템 스크롤 막기 */
        var weParent = oCustomEvent.oEvent;
        if(oCustomEvent.sMoveType === jindo.m.MOVETYPE[0]) {  //수평이고,수평스크롤인 경우 시스템 스크롤 막기
            if(bH) {
                weParent.stop(jindo.$Event.CANCEL_ALL);
            }else{
             /**
                플리킹 액션이 아닌 기본 스크롤 기능이 발생될 때

                @event scroll
                @param {String} sType 커스텀 이벤트명
                @param {Function} stop 수행시 영향 받는것 없다.
                @history 1.5.0 Update Custom Event 추가
            **/
                this.fireEvent('scroll');
                this._bTouchStart = false;
                return;
            }
        } else if(oCustomEvent.sMoveType === jindo.m.MOVETYPE[1]) {   //수직이고, 수직스크롤인 경우 시스템 스크롤 막기
            if(!bH) {
                weParent.stop(jindo.$Event.CANCEL_ALL);
            }else{
                this.fireEvent('scroll');
                this._bTouchStart = false;
                return;
            }
        }else if(oCustomEvent.sMoveType === jindo.m.MOVETYPE[2]) {
            //대각선 일때 시스템 스크롤 막기
            if(this.option('bUseDiagonalTouch')){
                weParent.stop(jindo.$Event.CANCEL_ALL);
            }else{
                this.fireEvent('scroll');
                this._bTouchStart = false;
                return;
            }
        }

        if (this._doFlicking) {
            return;
        }
        if(!this._bTouchStart){
            return;
        }

        /**
            플리킹영역에 터치 움직임이 있을 때 발생한다. Touch이벤트의 'touchMove'와 동일하다

            @event touchMove
            @param {String} sType 커스텀 이벤트명
            @param {String} sMoveType 현재 분석된 움직임
            @param {HTMLElement} stopelement 현재 터치된 영역의 Element
            @param {Number} nX 터치영역의 X좌표
            @param {Number} nY 터치 영역의 Y좌표
            @param {Number} nVectorX 이전 touchMove(혹은 touchStart)의 X좌표와의 상대적인 거리.(직전 좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
            @param {Number} nVectorY 이전 touchMove(혹은 touchStart)의 Y좌표와의 상대적인 거리.(직전 좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
            @param {Number} nDistanceX touchStart의 X좌표와의 상대적인 거리.(touchStart좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
            @param {Number} nDistanceY touchStart의 Y좌표와의 상대적인 거리.(touchStart좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
            @param {Number} nStartX touchStart의 X좌표
            @param {Number} nStartY touchStart의 Y좌표
            @param {Object} oEvent jindo.$Event object
            @param {Function} stop수행시 영향 받는것 없다.
            @history 1.2.0 Update Custom Event 추가
        **/
        this.fireEvent('touchMove', oCustomEvent);

        var nDis = bH? oCustomEvent.nDistanceX : oCustomEvent.nDistanceY;
        var nVector = bH? oCustomEvent.nVectorX : oCustomEvent.nVectorY;
        var nPos = bH? oCustomEvent.nX : oCustomEvent.nY;

        this._onAfterMove(nDis, nVector, nPos);
        this._bMove = true;
     },
     
     /**
      * @override 
      */
     _onAfterMove : function(nDis, nVector, nPos){
         
     },
     
     /**
      * touchend bind 코드 
      */
     _onEnd : function(oCustomEvent, nDuration){
            if (this._doFlicking) {
                return;
            }
            if(!this._bTouchStart){
                return;
            }
    
            this._doFlicking = true;
    
            var bH = this.option('bHorizontal');
    
            //스크롤일경우 뒤의 click이벤트를 막기위한 코드 젤리빈의 경우 아래 코드 실행시 시스템 스크롤의 가속 기능이 꺼진다.
            if( !(this._bAndroid && (this._nVersion >= "4.1")) ){
                if (oCustomEvent.sMoveType === jindo.m.MOVETYPE[0] || oCustomEvent.sMoveType === jindo.m.MOVETYPE[1] || oCustomEvent.sMoveType === jindo.m.MOVETYPE[2]) {
                    oCustomEvent.oEvent.stop(jindo.$Event.CANCEL_DEFAULT);
                }
            }
    
            //탭 혹은 롱탭일때
            if (oCustomEvent.sMoveType === jindo.m.MOVETYPE[3] || oCustomEvent.sMoveType === jindo.m.MOVETYPE[4]) {
                this._restoreAnchor();
            }
    
            var nTime = this.option('nDuration');
            var htInfo = this._getSnap(oCustomEvent.nDistanceX, oCustomEvent.nDistanceY, nTime, oCustomEvent.sMoveType);
    
            var nDis = bH? oCustomEvent.nDistanceX: oCustomEvent.nDistanceY;
            var nVector = bH? oCustomEvent.nVectorX : oCustomEvent.nVectorY;
            var nPos = bH? oCustomEvent.nX : oCustomEvent.nY;
    
            //플리킹이 다시 되돌아 갈때..(기준픽셀을 채우지 못하여 되돌아 갈때 )
            if(htInfo.sDirection === null){
                nTime = this.option('nBounceDuration');
                if(nDis === 0 || ((oCustomEvent.sMoveType === jindo.m.MOVETYPE[2]) && !this.option('bUseDiagonalTouch')) ) {
                    this._endAnimation(false);
                    //return;
                }
            }
    
            var htParam = {
                  nContentsIndex : this.getContentIndex(),
                  nContentsNextIndex: htInfo.nContentIndex
            };
    
            if(this._bFlickLeft !== null){
                //가로일때는   bLeft,  세로일때는 bTop 으로
                if(this.option('bHorizontal')){
                    htParam.bLeft = this._bFlickLeft;
                }else{
                    htParam.bTop = this._bFlickLeft;
                }
            }
            if(htInfo.sDirection !== null){
                /**
                    플리킹되기 전에 발생한다
    
                    @event beforeFlicking
                    @param {String} sType 커스텀 이벤트명
                    @param {Number} nContentsIndex 현재 콘텐츠의 인덱스
                    @param {Number} nContentsNextIndex (Number) :플리킹될 다음 콘텐츠의 인덱스
                    @param {Boolean} bLeft 플리킹 방향이 왼쪽인지에 대한 여부 (세로 플리킹일 경우 이 값은 없다)
                    @param {Boolean} bTop 플리킹 방향이 위쪽인지에 대한 여부 (가로 플리킹일 경우 이 값은 없다)
                    @param {Function} stop 플리킹되지 않는다.
                **/
                if(!this.fireEvent('beforeFlicking', htParam)){
                    this.restorePosition();
                    return;
                }
            } else {
                 /**
                    플리킹 임계치에 도달하지 못하고 사용자의 액션이 끝났을 경우, 원래 인덱스로 복원하기 전에 발생하는 이벤트
    
                    @event beforeRestore
                    @param {String} sType 커스텀 이벤트명
                    @param {Number} nContentsIndex 현재 콘텐츠의 인덱스
                    @param {Function} stop 플리킹이 복원되지 않는다.
                **/
                if(!this.fireEvent('beforeRestore', {
                    nContentsIndex : this.getContentIndex()
                })) {
                    return;
                }
            }
    
            this._htIndexInfo.nNextContentIndex = htInfo.nContentIndex;
            this._htIndexInfo.welNextElement = htInfo.welElement;
            this._htIndexInfo.sDirection = htInfo.sDirection;
            
            nDis = bH? oCustomEvent.nDistanceX : oCustomEvent.nDistanceY;
            nVector = bH? oCustomEvent.nVectorX : oCustomEvent.nVectorY;
            nPos = bH? oCustomEvent.nX : oCustomEvent.nY;
    
            this._onAfterEnd(nDis, nVector, nPos, nDuration);
            /**
                플리킹영역에 터치가 끝났을 때 발생한다. Touch이벤트의 'touchEnd'와 동일하다.
    
                @event touchEnd
                @param {String} sType 커스텀 이벤트명
                @param {String} sMoveType 현재 분석된 움직임
                @param {HTMLElement} element 현재 터치된 영역의 Element
                @param {Number} nX 터치영역의 X좌표
                @param {Number} nY 터치 영역의 Y좌표
                @param {Number} nVectorX 이전 touchMove(혹은 touchStart)의 X좌표와의 상대적인 거리.(직전 좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
                @param {Number} nVectorY 이전 touchMove(혹은 touchStart)의 Y좌표와의 상대적인 거리.(직전 좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
                @param {Number} nDistanceX touchStart의 X좌표와의 상대적인 거리.(touchStart좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
                @param {Number} nDistanceY touchStart의 Y좌표와의 상대적인 거리.(touchStart좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
                @param {Number} nStartX touchStart의 X좌표
                @param {Number} nStartY touchStart의 Y좌표
                @param {Object} oEvent jindo.$Event object
                @param {Function} stop수행시 영향 받는것 없다.
            **/
            this.fireEvent('touchEnd', oCustomEvent);
     },
     
     /**
      * @override
      */
     _onAfterEnd : function(){
         
     },
     
     _endAnimation : function(bFireEvent){
            var self = this;
            if(typeof bFireEvent === 'undefined'){
                bFireEvent = true;
            }
            this._doFlicking = false;
            this._bTouchStart =  false;
            this._bMove = false;
            
            var isFireRestore = this._htIndexInfo.sDirection == null && 
            this._htIndexInfo.nContentIndex === this._htIndexInfo.nNextContentIndex ? true : false;
            //index 정보 업데이트
            this._resetIndexInfo(this._htIndexInfo.nNextContentIndex, this._htIndexInfo.welNextElement);
            if(bFireEvent){
                /**
                    현재 화면에 보이는 콘텐츠가 바뀔경우 수행된다.
    
                    @event afterFlicking
                    @param {String} sType 커스텀 이벤트명
                    @param {Number} nContentsIndex 현재 콘텐츠의 인덱스
                    @param {Boolean} bLeft 플리킹 방향이 왼쪽인지에 대한 여부 (세로 플리킹일 경우 이 값은 없다)
                    @param {Boolean} bTop 플리킹 방향이 위쪽인지에 대한 여부 (가로 플리킹일 경우 이 값은 없다)
                    @param {Function} stop 수행시 영향을 받는것은 없다.
                **/
                this._fireCustomEvent('afterFlicking');
            } 
            if(isFireRestore) {
                /**
                    플리킹 임계치에 도달하지 못하고 사용자의 액션이 끝났을 경우, 원래 인덱스로 복원한 후에 발생하는 이벤트

                    @event restore
                    @param {String} sType 커스텀 이벤트명
                    @param {Number} nContentsIndex 현재 콘텐츠의 인덱스
                    @history 1.7.0 Update Custom Event 추가                  
                **/               
                this.fireEvent("restore", {
                    nContentsIndex : this._htIndexInfo.nContentIndex
                });
            }
    
            //ios 업데이트
            this._restoreAnchor();
            this._setAnchorElement();
            setTimeout(function(){
                self._createDummyTag();
                self._focusFixedBug();
            }, 5);
            this._bFlickLeft = null;
     },
     
     /**
        컨텐츠인덱스 정보를 다시 세팅한다.
    **/
    _resetIndexInfo : function(n, el){
        this._htIndexInfo.nContentIndex = n;
        this._htIndexInfo.nNextContentIndex = n;

        if(typeof el === 'undefined'){
            if(this.option('bUseCircular')){
                n = n%3;
            }
            el =  this._htWElement.aPanel[n];
        }

        this._htIndexInfo.welElement = el;
        this._htIndexInfo.welNextElement = el;
        this._htIndexInfo.sDirection = null;
    },
    
    _checkIndex : function(n){
        var bRet = true;
        if(isNaN((n*1)) || n < 0){
            bRet = false;
        }
        var nMax = this.getTotalContents()-1;
        if( n > nMax){
            bRet = false;
        }
        
        return bRet;
    },
    
     /**
      * @override
      */
     refresh : function(n, bResize, bFireEvent){
         var self = this;
         if(typeof n === 'undefined'){
            n = this.getContentIndex();
         }
         
         if(!this._checkIndex(n)){
             return;
         }

         if(typeof bResize === 'undefined'){
            bResize = true;
         }

         if(typeof bFireEvent === 'undefined'){
            bFireEvent = true;
         }

        if(bFireEvent){
                /**
                    현재 화면에 보이는 콘텐츠가 바뀔경우 수행된다.

                    @event beforeMove
                    @param {String} sType 커스텀 이벤트명
                    @param {Number} nContentsIndex 현재 콘텐츠의 인덱스
                    @param {Number} nContentsNextIndex (Number) :이동 할 콘텐츠의 인덱스
                    @param {Function} stop 이동하지 않는다.
                **/
            if(!this._fireCustomEvent('beforeMove',{
                  nContentsIndex : this.getContentIndex(),
                  nContentsNextIndex : n
            })){
                return;
            }
        }
        this._refresh(n, bResize);
        this._resetIndexInfo(n);

        if(bFireEvent){
                    /**
                        현재 화면에 보이는 콘텐츠가 바뀔경우 수행된다

                        @event move
                        @param {String} sType 커스텀 이벤트명
                        @param {Number} nContentsIndex 현재 콘텐츠의 인덱스
                        @param {Function} stop 수행시 영향을 받는것은 없다
                    **/
            this._fireCustomEvent('move');
        }

        //ios 업데이트
        this._restoreAnchor();
        this._setAnchorElement();

        //android css transform 이후에 포커싱 안되는 문제를 해결하기 위한 코드
        this._createDummyTag();
        setTimeout(function(){
            self._focusFixedBug();
        }, 100);
         
     },
     
     /**
      * @override
      */
     _refresh : function(n, bResize){
         
     },
     
       /**
        * @override
        n번째 컨텐츠로 화면을 이동한다.

        @param {Number} n 이동해야하는 컨텐츠 인덱스
        @param {Number} nDuration  애니메이션시간
        @param {Boolean} beforeMove, move 커스텀이벤트 발생여부
    **/
     
     moveTo : function(nIndex, nDuration, bFireEvent){
        if((typeof nIndex === 'undefined') || (nIndex == this.getContentIndex()) ){
            return;
        }
        if(nIndex < 0 || nIndex >= this.getTotalContents() ){
            return;
        }
        
        if(typeof nDuration === 'undefined'){
            nDuration = this.option('nDuration');
        }
        
        if(typeof bFireEvent === 'undefined'){
            bFireEvent = true;
        }
        this._moveTo(nIndex, nDuration, bFireEvent);
     },
     
     /**
        플리킹 이후에 움직여야하는 거리와 컨텐트 인덱스를 구한다
        @return {Object}
    **/
    _getSnap : function(nDistanceX, nDistanceY, nDuration, sType){
        var nFinalDis = this.option('bHorizontal')? nDistanceX : nDistanceY;

        var welElement = this._htIndexInfo.welElement;
        var nContentIndex = this.getContentIndex();
        var sDirection = null;

        //가로 대각선일 경우
        
        if(!((sType === jindo.m.MOVETYPE[2]) && !this.option('bUseDiagonalTouch')) && this._bMove){
            if(Math.abs(nFinalDis) >= this.option('nFlickThreshold') ){
                if(nFinalDis < 0 ){ //왼쪽 방향 혹은 위쪽 방향으로 밀고 있을 때
                    welElement = this.getNextElement();
                    nContentIndex =  this.getNextIndex();
                    this._bFlickLeft = true; //
                    sDirection = 'next';
                }else{ //오른쪽 방향 혹은 아래 방향으로 밀때
                    welElement = this.getPrevElement();
                    nContentIndex = this.getPrevIndex();
                    this._bFlickLeft = false;
                    sDirection  = 'prev';
                }
            }
        }
        if(this._htIndexInfo.welElement.$value() === welElement.$value()){
            sDirection = null;
        }

        return {
            elElement : welElement.$value(),
            welElement: welElement,
            nContentIndex : nContentIndex,
            sDirection : sDirection
        };
    },
     
     _onResize : function(){
         //to-do 
     },
     
     /**
        커스텀이벤트 발생시킨다
        @param {String} 커스텀 이벤트 명
        @param {Object} 커스텀 이벤트 파라미터
        @return {Boolean}
    **/
    _fireCustomEvent : function(sEventName, htParam){
        if(typeof htParam === 'undefined'){
            htParam =  {
                //nContentsIndex : this.getContentIndex()
                nContentsIndex : this._htIndexInfo.nContentIndex
            };
            //가로일때는   bLeft,  세로일때는 bTop 으로
            if(this._bFlickLeft){
                if(this.option('bHorizontal')){
                    htParam.bLeft = this._bFlickLeft;
                }else{
                    htParam.bTop = this._bFlickLeft;
                }
            }
        }

        return this.fireEvent(sEventName,htParam);
    },
    
    restorePosition : function(){
        this._onAfterEnd();
    },

     
     /**
        scroll 이벤트 핸들러
        ios6의 경우 기본 스크롤이 활성화된 상태에서 플리킹작업은 진행하면 플리킹이 완료되었는지 알수가 없다.
        이를 보완하는 코드 추가
     **/
     // _onScroll : function(){
     //     if(this._doFlicking){
     //          var n = this.getIndexByElement(this.getElement().$value());
     //          var self = this;
     //          setTimeout(function(){
     //              if(self._doFlicking){
     //                    var n = self._htIndexInfo.nContentIndex;
     //                    var bFireEvent = false;
     //                    if(self._htIndexInfo.nNextContentIndex !== self._htIndexInfo.nContentIndex){
     //                        n = self._htIndexInfo.nNextContentIndex;
     //                        bFireEvent = true;
     //                    }
     //                    self._endAnimation(bFireEvent);
     //                    self.refresh(n, true, false);
     //               }
     //          }, (this.option('nDuration') + 20));
     //    }
     // },
     
     /**
      * 
      */
     movePrev : function(nDuration){
         if(this._doFlicking){
            return;
         }

         var welPrev = this.getPrevElement();
         if(welPrev.$value() === this.getElement().$value()){
               return;
         }
         if(typeof nDuration === 'undefined'){
             nDuration = this.option('nDuration');
         }
         this._bTouchStart = true;
         this._bMove = true;
         this._movePrev(nDuration);
     },
     
     /**
      * @override
      */
     _movePrev : function(nDuration){
         var n = this.option('nFlickThreshold');
         this._onEnd({
            nDistanceX : n+10,
            nDistanceY : n+10,
            nX : 10,
            nY : 10
         }, nDuration); 
     },
     
     
     moveNext : function(nDuration){
         if(this._doFlicking){
            return;
         }
         var welNext = this.getNextElement();
         if(welNext.$value() === this.getElement().$value()){
            return;
         }
         
         if(typeof nDuration === 'undefined'){
             nDuration = this.option('nDuration');
         }
         
         this._bTouchStart = true;
         this._bMove = true;
         this._moveNext(nDuration);
     },
     
     /**
      * @override
      */
     _moveNext : function(nDuration){
         var n = this.option('nFlickThreshold')*-1;
         var nPos = this.option('bHorizontal')? this._htWElement.base.width() :  this._htWElement.base.height();
      
           this._onEnd({
                nDistanceX : n-10,
                nDistanceY : n-10,
                nX : 10,
                nY : 10
            }, nDuration);
     },
     
     /**
      *  transitionEnd 이벤트 attach
      */
     _attachTransitionEnd : function(el, nTime){
         if(el !== this._elTransition ){
             this._elTransition = el;
             var self = this;
             if(nTime === 0){
                 setTimeout(function(){
                    self._onTransitionEnd();    
                 }, 10);
             }else{
                jindo.m.attachTransitionEnd(el, this._wfTransitionEnd);
             }
          }
     },
     
     _detachTarnsitonEnd : function(){
         if(this._elTransition){
            jindo.m.detachTransitionEnd(this._elTransition, this._wfTransitionEnd);
            this._elTransition = null;
         }
     },
     
     
     getIndexByElement : function(el){
        var bValue = -1;
        for(var i=0, nLen = this._htWElement.aPanel.length; i<nLen; i++){
            if(this._htWElement.aPanel[i].$value() === el){
                bValue = i;
                break;
            }
        }
        return bValue;
     },
     
     /**
        현재 화면에 중앙에 보이는 컨텐츠 혹은 패널의 래핑된 엘리먼트를 리턴한다.

        @method getElement
        @return {jindo.$Element} el
    **/
    getElement : function(){
        var el = null;

        // if(!this.option('bUseCircular')){
            // el = this._htWElement.aPanel[this.getContentIndex()];
        // }else{
            // el = jindo.$Element(this._htIndexInfo.welElement);
        // }
// 
        // return el;
        
        return this._htIndexInfo.welElement;
    },

    /**
        현재 화면에 중앙에 보이는 컨텐츠 혹은 패널의 래핑된 엘리먼트를 리턴한다. (deprecated 예정)

        @method getContentElement
        @return {jindo.$Element} el
    **/
    getContentElement: function(){
        return this.getElement();
    },
    
    /**
        현재 플리킹 화면에 보이는 컨텐츠의 인덱스를 리턴한다.
        @method getContentIndex
        @return {Number} n
    **/
    getContentIndex : function(){
        //return this.getIndexByElement(this.getElement().$value());
        return this._htIndexInfo.nContentIndex;
    },
    
    

    /**
        이후 컨텐츠의 패널 엘리먼트의 래핑된 엘리먼트를 리턴한다.

        @method getNextElement
        @return {jindo.$Element} el
        @history 1.1.0 Update Method 추가
    **/
    getNextElement : function(){
        var n = this.getNextIndex();

        if(this.option('bUseCircular')){
            n = this.getIndexByElement(this.getElement().$value());
            n = ((n+1)>2)?  0 : (n+1);
        }

        return this._htWElement.aPanel[n];
    },

    /**
        이전 컨텐츠의 패널 엘리먼트의 래핑된 엘리먼트를 리턴한다.

        @method getPrevElement
        @return {jindo.$Element} el
        @history 1.1.0 Update Method 추가
    **/
    getPrevElement : function(){

        var n = this.getPrevIndex();

        if(this.option('bUseCircular')){
            n = this.getIndexByElement(this.getElement().$value());
            n = ((n-1)< 0)? 2: (n-1);
            //console.log(n);
        }
        return this._htWElement.aPanel[n];
    },

    /**
        전체 컨텐츠의 개수를 리턴한다.

        @method getTotalContents
        @return {Number} n
        @history 1.1.0 Update Method 추가
    **/
    getTotalContents : function(){
        var bValue = this._htWElement.aPanel.length;

        if(this.option('bUseCircular')){
            if(typeof this.option('nTotalContents') ==='undefined'){
                bValue = 3;
            }else{
                bValue = this.option('nTotalContents');
            }
        }
        return bValue;

    },

    /**
        전체 패널의 개수를 리턴한다.

        @method getTotalPanels
        @return {Number} n
    **/
    getTotalPanels : function(){
         if(this.option('bUseCircular')){
             return 3;
         }else{
             return  this.getTotalContents();
         }
    },

    /**
        전체 패널의 배열을 반환한다.

        @method getPanels
        @return {Array} n
    **/
    getPanels : function(){
         return this._htWElement.aPanel;
    },

    /**
        이전 컨텐츠의 인덱스를 리턴한다.

        @method getPrevIndex
        @return {Number} n
    **/
    getPrevIndex : function(){

        var n = this.getContentIndex()-1;

        if(this.option('bUseCircular') && (n < 0) ){
            n = this.getTotalContents() - 1;
        }

        n = Math.max(0, n);

        return n;
    },


    /**
        이후 컨텐츠의 인덱스를 리턴한다.

        @method getNextIndex
        @return {Number} n
    **/
    getNextIndex : function(){
        var n = this.getContentIndex()+1;

        var nMax = this.getTotalContents() - 1;
        if(this.option('bUseCircular') && (n > nMax) ){
            n = 0;
        }

        n = Math.min(nMax, n);

        return n;
    },
    
    /**
     * @override 
     */
    _onTransitionEnd : function(){
        
    },
     /**
        flicking 내에 a 엘리먼트를 모두 가져와서 세팅한다. (ios에서만)
     **/
     _setAnchorElement : function(el){
        //ios에서만 처리되도록 수정.
        if(this._bClickBug){
            this._aAnchor = jindo.$$("A", this._htWElement.container.$value());
        }
     },
     
     /**
        Anchor 삭제 
     **/
     _clearAnchor : function() {
        if(this._aAnchor && !this._bBlocked) {
            var aClickAddEvent = null;
            for(var i=0, nILength=this._aAnchor.length; i<nILength; i++) {
                if (this._fnDummyFnc !== this._aAnchor[i].onclick) {
                    this._aAnchor[i]._onclick = this._aAnchor[i].onclick;
                }
                this._aAnchor[i].onclick = this._fnDummyFnc;
                aClickAddEvent = this._aAnchor[i].___listeners___ || [];
                for(var j=0, nJLength = aClickAddEvent.length; j<nJLength; j++) {
                    ___Old__removeEventListener___.call(this._aAnchor[i], "click", aClickAddEvent[j].listener, aClickAddEvent[j].useCapture);
                }
            }
            this._bBlocked = true;
        }
     },
    
     /**
        Anchor 복원. for iOS
     **/
     _restoreAnchor : function() {
        if(this._aAnchor && this._bBlocked) {
            var aClickAddEvent = null;
            for(var i=0, nILength=this._aAnchor.length; i<nILength; i++) {
                if(this._fnDummyFnc !== this._aAnchor[i]._onclick) {
                    this._aAnchor[i].onclick = this._aAnchor[i]._onclick;
                } else {
                    this._aAnchor[i].onclick = null;
                }
                aClickAddEvent = this._aAnchor[i].___listeners___ || [];
                for(var j=0, nJLength = aClickAddEvent.length; j<nJLength; j++) {
                    ___Old__addEventListener___.call(this._aAnchor[i], "click", aClickAddEvent[j].listener, aClickAddEvent[j].useCapture);
                }
            }
            this._bBlocked = false;
        }
     },
     
     /**
        jindo.m.Flicking 컴포넌트를 활성화한다.
        activate 실행시 호출됨
     **/
     _onActivate : function() {
         this._attachEvent();
         this._setAnchorElement();
         this._oTouch.activate();
     },

    /**
        jindo.m.Flicking 컴포넌트를 비활성화한다.
        deactivate 실행시 호출됨
    **/
     _onDeactivate : function() {
         this._detachEvent();
         this._oTouch.deactivate();
     },
     
    /**
        jindo.m.Flicking 에서 사용하는 모든 이벤트를 바인드한다.
    **/
    _attachEvent : function() {
        this._htEvent = {};
        /* Touch 이벤트용 */
        this._htEvent["touchMove"] = jindo.$Fn(this._onMove, this).bind();
        this._htEvent["touchEnd"] = jindo.$Fn(this._onEnd, this).bind();
        this._htEvent["touchStart"] = jindo.$Fn(this._onStart, this).bind();

        /* Touch attach */
        this._oTouch.attach("touchStart", this._htEvent["touchStart"]);
        this._oTouch.attach("touchMove", this._htEvent["touchMove"]);
        this._oTouch.attach("touchEnd", this._htEvent["touchEnd"]);

        /* rotate */
       this._htEvent["rotate"] = jindo.$Fn(this._onResize, this).bind();
       jindo.m.bindRotate(this._htEvent["rotate"]);

       /* pageshow 이벤트 처리 */
        this._htEvent["pageshow"] = jindo.$Fn(this._onResize, this).bind();
        jindo.m.bindPageshow(this._htEvent["pageshow"]);

    },

    /**
        jindo.m.Flicking 에서 사용하는 모든 이벤트를 해제한다.
    **/
    _detachEvent : function() {
        /* touch detach */
        this._oTouch.detachAll();

        /* rotate */
        jindo.m.unbindRotate(this._htEvent["rotate"]);

        /*그외*/
       for(var p in this._htEvent){
            var htTargetEvent = this._htEvent[p];
            if (typeof htTargetEvent.ref !== "undefined") {
                htTargetEvent.ref.detach(htTargetEvent.el, p);
            }
        }
        this._htEvent = null;
    },
    /**
        jindo.m.Flicking 에서 사용하는 모든 객체를 release 시킨다.
        @method destroy
    **/
    destroy: function() {
        this.deactivate();

        for(var p in this._htWElement) {
            this._htWElement[p] = null;
        }
        this._htWElement = null;

        this._oTouch = null;
        this._oFlickingAnimation = null;
        for(var p1 in this._htIndexInfo){
            this._htIndexInfo[p] = null;
        }

        this._isIos = null;
        this._bAndroid = null;
        this._nVersion = null;
        this._fnDummyFnc = null;
        this._doFlicking = null;
        this._bClickBug = null;
        this._b3dExecption = null;
        this._bDummyTagException = null;
    } 
    
}).extend(jindo.m.UIComponent);
/**
   AlignFlip flicking 플러그인 

    @class jindo.m.AlignFlipFlicking
    @invisible
    @extends  jindo.m.FlickingAnimation
    @keyword flip, flicking
    @group Component
**/
jindo.m.AlignFlipFlicking= jindo.$Class({
    /** @lends jindo.m.SlideFlicking.prototype */
    /**
        초기화 함수
    **/
    sAnimationName  : 'alignFlip',
    $init : function(){
        this._bMoveDirection = null;
        this._bMove = false;
        this._initFlicking();
    },
    
     _initFlicking : function(){
        this._setElementSize();
        this._setElementStyle();
    },
    
    /**
     * @override 플리킹에 필요한 스타일을 추가한다.
     */
   _setElementStyle : function(){
       this._htWElement.base.css('overflow','hidden').css('position','relative');
         jindo.$A(this._htWElement.aPanel).forEach(function(value,index, array){
            var wel = value;            
            wel.css('position', 'absolute').css('width','100%').css('height','100%');   
        });
        
        this._htWElement.base.css(this._sCssPrefix+'Perspective',1200); 
   },
    /**
     * @override 플리킹에 필요한 사이즈를 추가한다.
     */
   _setElementSize : function(){
       this.nWidth = this._htWElement.base.width();
       this.nHeight = this._htWElement.base.height();
   },
   
    /**
     * @description 플립 되기전에 플립 엘리먼트에 대한 세팅한다.
     */
    _setFlipElement : function(){
        var nBase = 90;
        var welCurrent = this._getFlipElement();
        this._setFlipAlign(welCurrent);
        
        if(this._bMoveDirection === "prev"){
            if(this._htOption['sFlipAlign'] ==="left"){
                this._rotate(welCurrent, nBase*-1);
            }else if(this._htOption['sFlipAlign'] ==="top"){
                this._rotate(welCurrent, nBase);
            }
        }else if(this._bMoveDirection === "next"){
            if(this._htOption['sFlipAlign'] ==="bottom"){
                this._rotate(welCurrent, nBase*-1);
            }else if(this._htOption['sFlipAlign'] ==="right"){
                this._rotate(welCurrent, nBase);
            }
        }
       
        welCurrent.show().css('zIndex', 110);
        
        var welNext = (this._bMoveDirection === "prev")? this.getPrevElement():this.getNextElement();
        
        if(welNext.$value() !== welCurrent.$value()){
            welNext.show().css('zIndex', 90);
        }
    },
    
    /**
     * @description 플립되어야 하는 엘리먼트를 리턴한다.
     * @return {Element}
     */
    _getFlipElement : function(){
        var welCurrent = this.getContentElement();
        if(this._bMoveDirection === "prev"){
             if(this.option('sFlipAlign') === "left" || this.option('sFlipAlign')=="top"){
                 welCurrent = this.getPrevElement();
             }
        }else if(this._bMoveDirection === "next"){
             if(this.option('sFlipAlign') === "right" || this.option('sFlipAlign')=="bottom"){
                 welCurrent = this.getNextElement();
             }
        }
        return welCurrent;
    },
    
     /**
     * @description wel의 flip 정렬을 설정한다.
     */
    _setFlipAlign : function(wel){
        var sAlign = "";
        if(this.option('bHorizontal')){
            sAlign = this.option('sFlipAlign') + " center";
        }else{
            sAlign =  "center " + this.option('sFlipAlign');
        }
        
        wel.css( this._sCssPrefix+ "TransformOrigin" , sAlign );
    },
    
    /**
     * @description wel의 rotate를 설정하는 메소드
     * @param {Element} wel
     * @param {Number} nDeg
     */
    _rotate : function(wel, nDeg){
        if(wel){
            var sRotate = this.option('bHorizontal')?  "rotateY(" + nDeg + "deg)" : "rotateX(" + nDeg + "deg)";
            var htCss = {};
            htCss[this._sCssPrefix+"Transition"] = this._sCssPrefix+"-transform 0s linear";
            htCss[this._sCssPrefix+"Transform"] =  "perspective(500px) " + sRotate + " rotateZ(0deg)";
            
            wel.css(htCss);
        }
        
        return wel;
    },
    
    /**
     * @description 이전 플리킹에 대한  플립을 진행한다
     * @param {Element} 플립 대상 엘리먼트
     * @param {Number}  deg
     */
    _setPrevRotate : function(welTarget, nDeg){
        var nCDeg = this.option('bHorizontal')? nDeg : -nDeg;
        
        var nBaseDeg = 0;
        if(this.option('sFlipAlign') ==="left"){
            nBaseDeg = -70;
        }else if(this.option('sFlipAlign') ==="top"){
            nBaseDeg = 80;
        }
        
        var nCurrentDeg = nBaseDeg + nCDeg;
        
        
        if(this.option('sFlipAlign') === "right"){
            nCurrentDeg = Math.min(90, nCurrentDeg);
        }else if(this.option('sFlipAlign') === "bottom"){
            nCurrentDeg = Math.max(-90, nCurrentDeg);
        }else if(this.option('sFlipAlign') === "left"){
            nCurrentDeg = Math.min(0, nCurrentDeg);
        }else{
            nCurrentDeg = Math.max(0, nCurrentDeg);
        }
        
        this._rotate(welTarget, nCurrentDeg).css('zIndex', 110);        
    },
    
    /**
     * @description 이후 플리킹에 대한  플립을 진행한다
     * @param {Element} 플립 대상 엘리먼트
     * @param {Number}  deg
     */
    _setNextRotate : function(welTarget, nDeg){
        var nCDeg = this.option('bHorizontal')? -nDeg : nDeg;
        var nMinDeg = 0;
       
        var nBaseDeg = 0;
        if(this.option('sFlipAlign') ==="right"){
            nBaseDeg = 70;
        }else if(this.option('sFlipAlign') ==="bottom"){
            nBaseDeg = -80;
        }
        var nCurrentDeg = nBaseDeg + nCDeg;
        
        if(this.option('sFlipAlign') === "top"){
            nCurrentDeg = Math.min(90, nCurrentDeg);
        }else if(this.option('sFlipAlign')=== "left"){
            nCurrentDeg = Math.max(-90, nCurrentDeg);
        }else if(this.option('sFlipAlign') === "bottom"){
            nCurrentDeg = Math.min(0, nCurrentDeg);
        } else{
            nCurrentDeg = Math.max(0, nCurrentDeg);
        }
      
         
        this._rotate(welTarget, nCurrentDeg).css('zIndex', 110);        
    },
   
/**
   * @override
   */
  _onAfterStart : function(){
      this._resetInfo();
  },
  
  /**
   * @override
   */
  _onAfterMove : function(nDis, nVector, nPos){
      //기존의  movePanel을 넣으면 됨 
      if(this._bMoveDirection === null){
              if(nDis > 0){  //
                      this._bMoveDirection = 'prev';
              }else if(nDis < 0){
                      this._bMoveDirection = 'next';
              }else{
                      return;
              }
              this._setFlipElement();

              this._restoreAnchor();      
              this._setAnchorElement();
              this._clearAnchor();
              
          }else{
               var nSize = this.option('bHorizontal')? this.nWidth : this.nHeight;
               var welTarget = this.getContentElement();
               if(this._bMoveDirection === 'prev'){
                      if(this.option('sFlipAlign') ==="left" || this.option('sFlipAlign') === "top"){
                            welTarget  = this.getPrevElement();
                      }
                      this._nDeg =Math.max(0, Math.min(70, Math.round((nDis * 1/(nSize)) * 70)));
                      this._setPrevRotate(welTarget, this._nDeg);
                      
               }else if(this._bMoveDirection === 'next'){
                       if(this.option('sFlipAlign') ==="right" || this.option('sFlipAlign') === "bottom"){
                            welTarget  = this.getNextElement();
                      }
                      
                      this._nDeg = Math.max(0, Math.min(70, Math.round((nDis * -1/(nSize)) * 70)));
                      // console.log(welTarget.$value(), this._nDeg);
                      this._setNextRotate(welTarget, this._nDeg);
               }
       
          }
          
          this._bMove = true;
  },
  
  /**
   * @override
   */
  _onAfterEnd : function(){
      //this._htIndexInfo 에 정보가 있음 
      // if(this._htIndexInfo.sDirection === null){
          // //제자리로 돌아가야함 
      // }else{
        this._bFinished = false;
        var bRepos = (this._htIndexInfo.sDirection === null)? true : false;
        if(this._bMoveDirection !== this._htIndexInfo.sDirection){
            bRepos = true;
            this._htIndexInfo.sDirection = null;
            this._htIndexInfo.nNextContentIndex = this._htIndexInfo.nContentIndex;
            this._htIndexInfo.welNextElement = this._htIndexInfo.welElement;
        }
        
        if(this._bMoveDirection === "prev" && (this.getElement().$value() === this.getPrevElement())){
            bRepos = true;
            this._htIndexInfo.sDirection = null;
            this._htIndexInfo.nNextContentIndex = this._htIndexInfo.nContentIndex;
            this._htIndexInfo.welNextElement = this._htIndexInfo.welElement;
        }
        
        if(this._bMoveDirection === "next" && (this.getElement().$value() === this.getNextElement().$value())){
            bRepos = true;
            this._htIndexInfo.sDirection = null;
            this._htIndexInfo.nNextContentIndex = this._htIndexInfo.nContentIndex;
            this._htIndexInfo.welNextElement = this._htIndexInfo.welElement;
        }
        
        var welCurrent = this._getFlipElement();
        
        var self = this;
         
        var nDuration = bRepos? this.option('nBounceDuration') : this.option('nDuration');
        var nTotalDig = bRepos? 0 : 90;
        
         if(this._nDeg === 0){
              this._bFinished = true;
              setTimeout(function(){
                      self._onTransitionEnd();
               },10);
          }else{
              var startTime = (new Date()).getTime(),
                  nStartDeg = this._nDeg,
                  nMinDeg = 90;
                  
               (function timer(){
                                var now = (new Date()).getTime(),nEaseOut;
                                if (now >= startTime + nDuration) {
                                      //clearTimeout(self._nTimerAnimate);
                                      cancelAnimationFrame(self._nTimerAnimate);
                                       if(self._bMoveDirection === 'next'){
                                             self._setNextRotate(welCurrent, nTotalDig);
                                        }else{
                                             self._setPrevRotate(welCurrent,nTotalDig );
                                        }
                                      self._onTransitionEnd();
                                      return;
                                 }
                                 now = (now - startTime) / nDuration - 1;
                                 nEaseOut = Math.sqrt(1 - Math.pow(now,2));
                                 var nDeg = (nTotalDig - nStartDeg)*nEaseOut + nStartDeg;
                                 //console.log('--END ' + nDeg, self._nDeg);
                                 self._nDeg = Math.min(nDeg, nMinDeg);
                                 if(self._bMoveDirection === 'next'){
                                      self._setNextRotate(welCurrent, self._nDeg);
                                 }else{
                                      self._setPrevRotate(welCurrent,  self._nDeg);
                                 }
                                 //self._nTimerAnimate = setTimeout(timer, 10);   
                                 self._nTimerAnimate = requestAnimationFrame(timer);

                  }());
          }
      
  },
  
  _resetInfo : function(){
        this._bMoveDirection = null; 
        this._bMove = false;
        this._nDeg = -1;
        this._bFinished = true;
    },
  
  /**
   * @override
   */
    _onTransitionEnd : function(){
        this._detachTarnsitonEnd();
        var bFireEvent = true;
        if(this._htIndexInfo.sDirection === null){
            bFireEvent = false;
        }
        
        this._restorePanel(this._htIndexInfo.welNextElement.$value()); 
        this._resetInfo();  
        this._endAnimation(bFireEvent);
    },
    
    /**
     * @description 화면 패널에 대하 show/hide 부분 수정
     */
    _restorePanel : function(el){
         jindo.$A(this._htWElement.aPanel).forEach(function(value, i, array){
            value.$value().style[this._sCssPrefix +'TransitionDuration'] = null;
            value.$value().style[this._sCssPrefix +'Transform'] = '';
            if(value.$value() === el){
                value.show().css('zIndex', 10);
            }else{
                 value.hide().css('zIndex', 1);
            }
        },this);
        
    },
    
    
    /**
     * @description n번째 패널 중앙에 오도록 panel을 다시 좌우 배열해서 배치한다.
     * @param {Number} n 현재 화면에 보여져야할 content의 인덱스
     * @param {Boolean} bResize 화면 크기가 변화되어 다시 사이즈를 업데이트 해야 할경우 true 
     * @param {Boolean} bFireEvent 커스텀이벤트 발생여부
     */
    _refresh : function(n, bResize){
        if(typeof n === 'undeinfed'){
            n = this.getContentIndex();
        }
        var nCenter = n;
        if(this.option('bUseCircular')){
            nCenter = n%3;
        }
        
        if(bResize){
             this._setElementSize();
        }
        this._htWElement.base.css(this._sCssPrefix+"PerspectiveOrigin", "50% 50%");
         
        for(var i=0,nLen = this._htWElement.aPanel.length;i<nLen;i++){
            if(i === nCenter){
                this._htWElement.aPanel[i].show().css('zIndex',10);
            }else{
                this._htWElement.aPanel[i].hide().css('zIndex',1);
            }
        }
        
        this._htIndexInfo.nContentIndex = n;
        this._htIndexInfo.welElement = this._htWElement.aPanel[nCenter]; 
        
    },
    
    /**
     * @override
     * @description n 컨텐츠로 이동한다 
 * @param {Number} n 컨텐츠 인덱스 
 * @param {Number} nDruation  애니메이션 시
 * @param {Boolean} flicking  커스텀 이벤트 발생여부
     */
    _moveTo : function(n, nDruation, bFireEvent){
         this.refresh(n, false, bFireEvent);
    },
    
      /**
     * @description 이전 컨텐츠로 이동한다.
 * @param {Number} nDuration 애니메이션 시간 
     */ 
   _movePrev : function(nDuration){
       this._bMoveDirection = 'prev';
       this._bMove = true;
       this._nDeg = 1;
       
        var n = this.option('nFlickThreshold');
        this._setFlipElement();
        this._onEnd({
            nDistanceX : n+10,
            nDistanceY : n+10,
            nX : 10,
            nY : 10
        }, nDuration); 
    },
    
     /**
     * @description 이후 컨텐츠로 이동한다.
 * @param {Number} nDuration 애니메이션 시간 
     */
    _moveNext : function(nDuration){
       this._bMoveDirection = 'next';
       this._bMove = true;
       this._nDeg = 1;
        this._setFlipElement();
       var n = this.option('nFlickThreshold')*-1;
       var nPos = this.option('bHorizontal')? this._htWElement.base.width() :  this._htWElement.base.height();
      
       this._onEnd({
            nDistanceX : n-10,
            nDistanceY : n-10,
            nX : nPos -10,
            nY : nPos -10
        }, nDuration);
    }
}).extend(jindo.m.FlickingAnimation);
/**
   Cover flicking 플러그인 

    @class jindo.m.CoverFlicking
    @invisible
    @extends  jindo.m.FlickingAnimation
    @keyword flip, flicking
    @group Component
**/
jindo.m.CoverFlicking= jindo.$Class({
    /** @lends jindo.m.SlideFlicking.prototype */
    /**
        초기화 함수
    **/
    sAnimationName  : 'cover',
    $init : function(){
         this._bMoveDirection = null;
         this._sTranslateStart = "translate(";
         this._sTranslateEnd = ")";
         this._sScaleStart = "scale(";
         this._sScaleEnd = ")";
         this._initFlicking();
        
    },
    
    _initFlicking : function(){
         this._setElementSize();
         this._setElementStyle();
         this._prepareFlicking();
    },
   
    
    /**
     * @override 플리킹에 필요한 스타일을 추가한다.
     */
   _setElementStyle : function(){
       this._htWElement.base.css('overflow','hidden');
       this._htWElement.container.css('position','relative');
       jindo.$A(this._htWElement.aPanel).forEach(function(value,index, array){
            var wel = value;            
            wel.css('position', 'absolute').css('width','100%').css('height','100%');   
        });
   },
    /**
     * @override 플리킹에 필요한 사이즈를 추가한다.
     */
   _setElementSize : function(){
       this._htWElement.container.height(this._htWElement.base.height());
   },
   
   _prepareFlicking : function(){
       if(this.option('bUseCss3d')){
             this._sTranslateStart = "translate3d(";
             this._sTranslateEnd = ",0px)";
       }
       var sTransfrom = this.option('bUseTranslate')? "-webkit-transform" : (this.option('bHorizontal')? 'left' : 'top');
          
       for(var i=0, nLen =  this._htWElement.aPanel.length; i<nLen; i++){
             if(this._htOption['bUseTranslate'] ){
                   this._htWElement.aPanel[i].css(this._sCssPrefix + 'Transform', this._sTranslateStart +"0px,0px" + this._sTranslateEnd);   
             }else{
                  this._htWElement.aPanel[i].css(sTransfrom, '0px');
             }
             this._htWElement.aPanel[i].css(this._sCssPrefix + 'TransitionProperty', "all");           
        }   
   },
/**
   * @override
   */
  _onAfterStart : function(){
      this._resetInfo();
  },
  
  /**
   * @override
   */
  _onAfterMove : function(nDis, nVector, nPos){
      //기존의  movePanel을 넣으면 됨 
      if(this._bMoveDirection  === null && (Math.abs(nDis) > 5) ){
               if(nDis > 0){
                   this._bMoveDirection = 'prev';
               }else{
                   this._bMoveDirection = 'next';
               }
               
               var welZoom = (this._bMoveDirection  === 'prev')? this.getPrevElement() : this.getNextElement();
               if(welZoom.$value() === this.getElement().$value()){
                   this._bMoveDirection = null;
                   welZoom = null;
               }else{
                     this._prepareZoomAnim(welZoom);
               }
        }
        
        this._setPosition(nDis, nVector, nPos, 0, false); 
  },
  
  /**
   * @override
   */
  _onAfterEnd : function(nDis, nVector, nPos, nDuration){
      if(typeof nDuration === 'undefined'){
            nDuration = this.option('nDuration');
      }
      if(!this.option('bUseTimingFunction') && (nDuration !== 0) ){
          var self = this;
           var startTime = (new Date()).getTime(),
                 nStartDis = nDis, nBeforeDis = nDis, nBeforePos = nPos,  nTotalDis = this.option('bHorizontal')? this._htWElement.base.width(): this._htWElement.base.height();
                 if(this._htIndexInfo.sDirection === null ||this._bMoveDirection === null || ((this._bMoveDirection === 'prev') && (nDis < 0) ) || ((this._bMoveDirection === 'next') && (nDis > 0) )){
                    
                     nTotalDis = 0;
                     this._htIndexInfo.nNextContentIndex = this._htIndexInfo.nContentIndex;
                     this._htIndexInfo.welNextElement = this._htIndexInfo.welElement;
                     this._htIndexInfo.sDirection = null;
                     nDuration = this.option('nBounceDuration');
                 }
                 
                 if(nDis < 0){
                     nTotalDis = nTotalDis*-1;
                 }
                    (function animate () {
                        var now = (new Date()).getTime(),nEaseOut;
                        if (now >= startTime + nDuration) {
                            //clearTimeout(self._nTimerAnimate);
                             cancelAnimationFrame(self._nTimerAnimate);
                            delete self._nTimerAnimate;
                            self._onTransitionEnd();
                            return;
                        }
                        now = (now - startTime) / nDuration - 1;
                        nEaseOut = Math.sqrt(1 - Math.pow(now,2));
                        var nDis = (nTotalDis - nStartDis)*nEaseOut + nStartDis;
                        //console.log( '======', nBeforeDis, (nBeforePos+ nBeforeDis));
                        self._setPosition( nDis,  (nDis-nBeforeDis), (nBeforePos+ nBeforeDis), 0, false);
                        nBeforeDis = nDis;
                        //self._nTimerAnimate = setTimeout(animate, 1);  
                        self._nTimerAnimate = requestAnimationFrame(animate);    
            })();
      }else{
          this._setPosition(nDis, nVector, nPos, nDuration, true); 
      }
  },
  
   _setPosition : function( nDis, nVector, nPos, nDuration, bEnd){
        if(typeof nDuration === 'undefined'){
            nDuration = 0;
        }        
        if(this.option('bUseTranslate')){
            this._setPositionTransform( nDis, nPos, nDuration, bEnd);
          
        }else{
             this._setPositionForStyle( nDis, nVector ,nPos, nDuration, bEnd);
        }
    },
    
    /**
     * @description wel 엘리먼트의 위치를 left, top 속성으로 설정한다. 
 * @param {HTMLElement} wel 위치를 잡을 대상 엘리먼트 
 * @param {Number} nDis touchstart 시점에서 부터의 거리
 * @param {Number} nVector 이전 터치와의 상대 거리 
 * @param {Number} nPos 현재 터치지점의 좌표 
 * @param {Number} nDuration 애니메이션 시간 
 * @param {Boolean} bEnd 현재 touchEnd 시점여부 
     */
     _setPositionForStyle : function( nDis,  nVector, nPos, nDuration, bEnd){
         var bReturn = false;
         if(bEnd){
             if(this._htIndexInfo.sDirection !== null){
                if(nDis < 0 && (this._bMoveDirection === 'next') ){
                    nDis =  this._htWElement.base.width()*-1;
                }else if(nDis > 0 && (this._bMoveDirection === 'prev')){
                    nDis =  this._htWElement.base.width();
                }else{
                    nDis = 0;
                    this._htIndexInfo.nNextContentIndex = this._htIndexInfo.nContentIndex;
                    this._htIndexInfo.welNextElement = this._htIndexInfo.welElement;
                    this._htIndexInfo.sDirection = null;
                    bReturn = true;
                    nDuration = this.option('nBounceDuration');
                }
            }else{ //
                 nDis = 0;
                 bReturn = true;
                 nDuration = this.option('nBounceDuration');
            }
            
        }else{
            nDis = nVector;
        }
        
        var wel = this.getElement();
        
        var sName = this.option('bHorizontal')? 'left' : 'top';
        var nPosition = !bEnd? (parseFloat(wel.css(sName).replace('px',''),10) || 0) + nDis : nDis;
        var htCss = {};
        //htCss[this._sCssPrefix+'TransitionProperty'] = sName;
        htCss[this._sCssPrefix+'TransitionDuration'] = (nDuration === 0)? '0' : nDuration +"ms" ;
        htCss[sName]  = nPosition+ 'px';
        
        
        var welZoom = this._getZoomElement();
        
        var htZoomCss = this._getCalculateZoom(nPos, nDuration, bEnd, bReturn);
       
       if(bEnd){
            this._attachTransitionEnd(wel.$value());
        }
        
        if(welZoom){
            //welZoom.css(htZoomCss);
            for(var p in htZoomCss){
                welZoom.$value().style[p] = htZoomCss[p];
            }
            
            //console.log(welZoom.css(this._sCssPrefix+'Transform'), welZoom.css('opacity'),"///" ,htZoomCss[this._sCssPrefix+'Transform'], htZoomCss['opacity']);
        }
        wel.css(htCss);
    },
    
    /**
     * @description wel 엘리먼트의 위치를 css의 translate 속성으로 설정한다. 
 * @param {HTMLElement} wel 위치를 잡을 대상 엘리먼트 
 * @param {Number} nDis touchstart 시점에서 부터의 거리
 * @param {Number} nPos 현재 터치지점의 좌표
 * @param {Number} nDuration 애니메이션 시간 
 * @param {Boolean} bEnd 현재 touchEnd 시점여부 
     */
    _setPositionTransform : function( nDis, nPos, nDuration, bEnd){
        var bReturn = false;
        if(bEnd){
            if(this._htIndexInfo.sDirection !== null){
                if(nDis < 0 && (this._bMoveDirection === 'next') ){
                    nDis =  this._htWElement.base.width()*-1;
                }else if(nDis > 0 && (this._bMoveDirection === 'prev')){
                    nDis =  this._htWElement.base.width();
                }else{
                    nDis = 0;
                    this._htIndexInfo.nNextContentIndex = this._htIndexInfo.nContentIndex;
                    this._htIndexInfo.welNextElement = this._htIndexInfo.welElement;
                    this._htIndexInfo.sDirection = null;
                    bReturn = true;
                    nDuration = this.option('nBounceDuration');
                }
            }else{
                 nDis = 0;
                 bReturn = true;
                 nDuration = this.option('nBounceDuration');
            }
        }
        
        var nX = this.option('bHorizontal')? nDis :0;
        var nY = this.option('bHorizontal')? 0: nDis;
        
       
        var htCss = {};
        htCss[this._sCssPrefix+'TransitionProperty'] = "all";
        htCss[this._sCssPrefix+'TransitionDuration'] =  (nDuration === 0)? '0' : nDuration +"ms" ;
        htCss[this._sCssPrefix+'Transform'] = this._sTranslateStart + nX +"px,"+nY+ "px"+ this._sTranslateEnd;
        
        // console.log(wel.$value(), this._sTranslateStart + nX +"px,"+nY+ this._sTranslateEnd);
        
        var wel = this.getElement();
        var welZoom = this._getZoomElement();
        
        var htZoomCss = this._getCalculateZoom(nPos, nDuration, bEnd, bReturn);
        //console.log(htZoomCss);
      
        if(bEnd){
            this._attachTransitionEnd(wel.$value(), nDuration);
        }
        
        if(welZoom){
            welZoom.css(htZoomCss);
        }
       
        wel.css(htCss);
    },
  
  /**
     * @description 설정값들을 초기화 한다.
     */
    _resetInfo : function(){
        this._bMoveDirection = null;
    },
    
     /**
     * @description welZoom 을 zoom 작업을 진행하기 전에 설정해야 하는 값들을 설정한다. 
 * @param {HTMLElement} welZoom 줌인대상 엘리먼트
     */
    _prepareZoomAnim : function(welZoom){
        //debugger;
          welZoom.show();
          welZoom.$value().style[this._sCssPrefix+'Transform']  =  this._sScaleStart + this.option('nDefaultScale') + ", "+ this.option('nDefaultScale') + this._sScaleEnd;
        
    },
    
    /**
     * @description zoom 되어야할 엘리먼트를 리턴한다.
     */
    _getZoomElement : function(){
        var welZoom = null;
        
        if(this._bMoveDirection  === 'prev'){
            welZoom = this.getPrevElement();
        }else if(this._bMoveDirection  === 'next'){
            welZoom = this.getNextElement();
        }
        
        if(welZoom &&  (welZoom.$value() === this.getElement().$value()) ){
            welZoom = null;
        }
        
        return welZoom;
    },
    
    /**
     * @description  nPos값에 대한 zoom 엘리먼트에 적용할 css를 리턴한다.
 * @param {Number} nPos 현재 터치 지점의 좌표
 * @param {Number} nDuration 애니메이션 시간 
 * @param {Boolean} bEnd touchEnd여부 
 * @param {Boolean} bReturn 패널 방향이 최초 방향과 달라서 플리킹되지 않고 다시 되돌아 가는 애니메이션을 해야 하는지에 대한 여부
     */
    _getCalculateZoom : function(nPos, nDuration, bEnd, bReturn ){
        var nCalculate = 1;
        
        nCalculate = !bEnd? this._getCalculate(nPos) : nCalculate;
        nCalculate = bReturn? 0 : nCalculate;
        
        var nScaleX = this._htOption['nDefaultScale'];
        var htZoomCss = {};
        htZoomCss[this._sCssPrefix+'TransitionDuration'] =  (nDuration === 0)? '0' : nDuration +"ms" ;
        htZoomCss['opacity'] = nCalculate;
        htZoomCss[this._sCssPrefix+'Transform'] = this._sScaleStart +  (nScaleX + nCalculate * (1 - nScaleX) ) + ',' + ( nScaleX + nCalculate * (1 - nScaleX) ) + this._sScaleEnd;
        
        return htZoomCss;
        
    },
    
     /**
     * @description nPos에 대한 적용할 scale 값을 리턴한다.
 * @param {Number} nPos 현재 터치 지점
     */
    _getCalculate : function(nPos){
        var nRange = this.option('bHorizontal')? this._htWElement.base.width() :  this._htWElement.base.height();
    
        var nCalculate =( this._bMoveDirection === 'prev')? 1 + (nPos - nRange) / nRange : ( nRange - nPos ) / nRange ;
        
        return Math.min(1, nCalculate);
          
    },
    
    _restorePanel : function(el){
         for(var i=0,nLen = this._htWElement.aPanel.length;i<nLen;i++){
            var welCurrent = this._htWElement.aPanel[i];
            if(welCurrent.$value() === el){
                this._htWElement.aPanel[i].show().css('zIndex',10).opacity(1);
            }else{
                this._htWElement.aPanel[i].hide().css('zIndex',1).opacity(0.2);
            }
        }
        
        this._htIndexInfo.welElement = this._htIndexInfo.welNextElement;
        
    },
  /**
   * @override
   */
    _onTransitionEnd : function(){
        this._detachTarnsitonEnd();
        var bFireEvent = true;
        if(this._htIndexInfo.sDirection === null){
            bFireEvent = false;
        }
        
        var sCss = this.option('bHorizontal')? 'left' : 'top'; 
        
        jindo.$A(this._htWElement.aPanel).forEach(function(value, i, array){
            value.$value().style[this._sCssPrefix +'TransitionDuration'] = null;
            if(this._htOption['bUseTranslate']){
               value.$value().style[this._sCssPrefix+'Transform'] = this._sTranslateStart +"0px, 0px" + this._sTranslateEnd;
            }else{
                value.$value().style[sCss] = '0px';
            }
        },this);
        
        this._restorePanel(this._htIndexInfo.welNextElement.$value());
        //
        
        this._endAnimation(bFireEvent);
    },
    
    
    /**
     * @description n번째 패널 중앙에 오도록 panel을 다시 좌우 배열해서 배치한다.
     * @param {Number} n 현재 화면에 보여져야할 content의 인덱스
     * @param {Boolean} bResize 화면 크기가 변화되어 다시 사이즈를 업데이트 해야 할경우 true 
     * @param {Boolean} bFireEvent 커스텀이벤트 발생여부
     */
    _refresh : function(n, bResize ){
         var nCenter = n;
        
         if(this.option('bUseCircular')){
             nCenter = n%3;
         }
         
        
         if(bResize){
             this._setElementSize();
         }    
        
        for(var i=0,nLen = this._htWElement.aPanel.length;i<nLen;i++){
            if(i === nCenter){
                this._htWElement.aPanel[i].show().css('zIndex',10).opacity(1);
            }else{
                this._htWElement.aPanel[i].hide().css('zIndex',1).opacity(0.2);
            }
        }
        
    },
    
    /**
     * @override
     * @description n 컨텐츠로 이동한다 
 * @param {Number} n 컨텐츠 인덱스 
 * @param {Number} nDruation  애니메이션 시
 * @param {Boolean} flicking  커스텀 이벤트 발생여부
     */
    _moveTo : function(nIndex, nDuration , bFireEvent){
        this.refresh(nIndex, false, bFireEvent);
    },
    
    /**
     * @description 다음 컨텐츠로 이동한다
 * @param {Object} nDuration 애니메이션 시간
     */
    _moveNext : function(nDuration){
       this._bMoveDirection = 'next';
       var welZoom = this.getNextElement();
       if(welZoom.$value() === this.getElement().$value()){
           return;
       }
       
       this._prepareZoomAnim(welZoom);
       var n = this.option('nFlickThreshold')*-1;
       var nPos =this.option('bHorizontal')? this._htWElement.base.width() :  this._htWElement.base.height();
      
       this._onEnd({
            nDistanceX : n-10,
            nDistanceY : n-10,
            nX : nPos -10,
            nY : nPos -10
        }, nDuration);    
    },
    
   /**
    * @description 이전 컨텐츠로 이동한다
 * @param {Object} nDuration 애니메이션 시간 
    */
    _movePrev : function(nDuration){
        this._bMoveDirection = 'prev';
       var welZoom = this.getPrevElement();
       if(welZoom.$value() === this.getElement().$value()){
           return;
       }
      
        this._prepareZoomAnim(welZoom);
        var n = this.option('nFlickThreshold');
        
        this._onEnd({
            nDistanceX : n+10,
            nDistanceY : n+10,
            nX : 10,
            nY : 10
        }, nDuration);      
    }
}).extend(jindo.m.FlickingAnimation);

/**
   Flip flicking 플러그인 

    @class jindo.m.FlipFlicking
    @invisible
    @extends  jindo.m.FlickingAnimation
    @keyword flip, flicking
    @group Component
**/
jindo.m.FlipFlicking = jindo.$Class({ 
    /** @lends jindo.m.FlipFlicking.prototype */
    /**
        초기화 함수
    **/
    sAnimationName  : 'flip',
    
    $init : function(){
        this._bMoveDirection = null;
        this._bMove = false;
        this._initFlicking();
    },
    _initFlicking : function(){
        this._setElementSize();
        this._setElementStyle();
        this._prepareFlip();
    },
   
    _prepareFlip : function(){
       if(typeof this._htWElement.left === 'undefined'){
           this._htWElement.base.css(this._sCssPrefix+'Perspective',1200);

           var sPrevClass = this.option('sClassPrefix') + "left";
           var sNextClass = this.option('sClassPrefix') + "right";
           
           this._htWElement.container.append(jindo.$('<div class="'+sPrevClass+'" style="position:absolute;overflow:hidden;left:0px;top:0px;outline:1px solid rgba(255, 0, 0, .0);"></div>'));
           this._htWElement.container.append(jindo.$('<div class="'+ sNextClass +'"  style="position:absolute;overflow:hidden;left:0px;top:0px;outline:1px solid rgba(255, 0, 0, .0);"></div>'));
           this._htWElement.container.height(this._htWElement.base.height());
           
           this._htWElement.left = jindo.$Element(jindo.$$.getSingle("."+sPrevClass,  this._htWElement.container.$value()));
           this._htWElement.right = jindo.$Element(jindo.$$.getSingle("."+sNextClass,  this._htWElement.container.$value()));
           if(this.option('bHorizontal')){
               this._htWElement.left.css("height", "100%");
               this._htWElement.right.css("height", "100%");
           }else{
               this._htWElement.left.css("width" ,"100%");
               this._htWElement.right.css("width", "100%");
           }
              
       }
       
       if(this.option('bHorizontal')){
           this._htWElement.left.width(this.nCenter);
           this._htWElement.right.width(this.nCenter);
       }else{
           this._htWElement.left.height(this.nCenter);
           this._htWElement.right.height(this.nCenter);
       }
    },
    
     /**
     *  플리킹에 필요한 스타일을 추가한다.
     */
    _setElementStyle : function(){
        this._htWElement.base.css('overflow','hidden');
        this._htWElement.container.css('position','relative').height( this.nHeight );
         jindo.$A(this._htWElement.aPanel).forEach(function(value,index, array){
            var wel = value;            
            wel.css('position', 'absolute').css('width','100%').css('height','100%');   
        });
    },
    
     /**
     *  플리킹에 필요한 사이즈를 추가한다.
     */
    _setElementSize : function(){
        this.nWidth = this._htWElement.base.width();
        this.nHeight = this._htWElement.base.height();
        this.nCenter = Math.round((this.option('bHorizontal')? this.nWidth: this.nHeight) / 2);
    },
     
    _refresh : function(n, bResize ){
        if(typeof n === 'undeinfed'){
            n = this.getContentIndex();
        }
        var nCenter = n;
        
        if(this.option('bUseCircular')){
            nCenter = n%3;
        }
        
        if(bResize){
             this._setElementSize();
             this._prepareFlip();
        }
        this._htWElement.left.hide().show();
        this._htWElement.right.hide().show();
        
        this._htWElement.right.css(this.option('bHorizontal')?"left" : "top" ,  (this.nCenter) + "px");
        var htCss ={};
        htCss[this._sCssPrefix+"PerspectiveOrigin"] = "50% 50%";

        this._htWElement.base.css(htCss);
        
         for(var i=0,nLen = this._htWElement.aPanel.length;i<nLen;i++){
            if(i === nCenter){
                this._htWElement.aPanel[i].show().css('zIndex',10);
            }else{
                this._htWElement.aPanel[i].hide().css('zIndex',1);
            }
         }
        
        this._htIndexInfo.nContentIndex = n;
        this._htIndexInfo.welElement = this._htWElement.aPanel[nCenter];
        
    },
    
    
    _setCloneElement : function(){
        var bH = this.option('bHorizontal');
        var welCurrent = this.getContentElement();
        var welShow;
        if( this._bMoveDirection === 'prev'){
             welShow = this.getPrevElement();
             if(welShow.$value() === welCurrent.$value()){
                 this._htWElement.left.empty().append(jindo.$Element(jindo.$('<div></div>')).show().width(this.nWidth));
             }else{
                 this._htWElement.left.empty().append(jindo.$Element(welShow.$value().cloneNode(true)).show().width(this.nWidth));
             }
             
             this._htWElement.right.empty().append(jindo.$Element(welCurrent.$value().cloneNode(true)).css(bH?"margin-left" :"margin-top", "-" + (this.nCenter) + "px").width(this.nWidth).height(this.nHeight));
             welShow.before(this._htWElement.left).after(this._htWElement.right);
        }else if( this._bMoveDirection === 'next'){
             welShow = this.getNextElement();
             this._htWElement.left.empty().append(jindo.$Element(welCurrent.$value().cloneNode(true)).show().width(this.nWidth));
             if(welShow.$value() === welCurrent.$value()){
                 this._htWElement.right.empty().append(jindo.$Element(jindo.$('<div></div>')).show().css(bH?"margin-left" :"margin-top", "-" + (this.nCenter) + "px").width(this.nWidth).height(this.nHeight));
             }else{
                this._htWElement.right.empty().append(jindo.$Element(welShow.$value().cloneNode(true)).show().css(bH?"margin-left" :"margin-top", "-" + (this.nCenter) + "px").width(this.nWidth).height(this.nHeight));
             }
             welCurrent.before(this._htWElement.left).after(this._htWElement.right);
        }
    },
    
    _onAfterMove : function(nDis, nVector, nPos){
          if(this._bMoveDirection === null){
              if(nDis > 0){  //
                      this._bMoveDirection = 'prev';
              }else if(nDis < 0){
                      this._bMoveDirection = 'next';
              }else{
                      return;
              }
              this._setCloneElement();

              this._restoreAnchor();      
              this._setAnchorElement();
              this._clearAnchor();
          }else{
               var nSize = this.option('bHorizontal')? this.nWidth : this.nHeight;
               var welCurrent = this.getContentElement(),
                   welTarget,nAngle;
               if(this._bMoveDirection === 'prev'){
                      welTarget  = this.getPrevElement();
                      nAngle = (welTarget.$value() === welCurrent.$value())? 60 : 180;
                      this._nDeg =Math.max(0, Math.min(nAngle, Math.round((nDis * 1/(nSize)) * nAngle)));
                      this._setPrevRotate(welCurrent , welTarget,  this._htWElement.left, this._htWElement.right, this._nDeg);
                      
               }else if(this._bMoveDirection === 'next'){
                      welTarget = this.getNextElement();
                      nAngle = (welTarget.$value() === welCurrent.$value())? 60 : 180;
                      this._nDeg = Math.max(0, Math.min(nAngle, Math.round((nDis * -1/(nSize)) * nAngle)));
                      this._setNextRotate(welCurrent ,welTarget,  this._htWElement.left, this._htWElement.right, this._nDeg);
               }
          }
          
          this._bMove = true;
        
    },
    
    _onAfterEnd : function(){
        if(this._bMove){
            this._flipAnimate();
        }  
    },
    _rotate : function(wel, nDeg){
        if(wel){
            var sRotate = this.option('bHorizontal')?  "rotateY(" + nDeg + "deg)" : "rotateX(" + nDeg + "deg)";
            
            var htCss ={};
                htCss[this._sCssPrefix + "Transition"] = this._sCssPrefix+"-transform 0s linear";
                htCss[this._sCssPrefix +"Transform"] = "perspective(500px) " + sRotate + " rotateZ(0deg)";
   
            wel.css(htCss);
        }
        
        return wel;
    },
    
  
    
    _setBackgroundShadow : function(wel, nDeg){
         var n = (nDeg > 90) ? (180 - nDeg) : nDeg,
            h,
            hex = "#000000";

         h = Number(Math.round((n / 90) * 255)).toString(16);
            if (h.length < 2) {
                h = h + h;
            }
            hex = "#" + h + h + h;
            
            wel.css("background-image", "-webkit-gradient(linear, 100% 0%, 0% 0%, from("+ hex +"), to("+ hex +"))");
             wel.css("background-image", "-ms-gradient(linear, 100% 0%, 0% 0%, from("+ hex +"), to("+ hex +"))");
            
            
            return wel;
          
    },
    
    _clearBackgrond : function(wel){
         return wel.css({
            "background-image" : "",
            "background-color" : "#fff"
        });
    },

    
    _setNextRotate : function(welCurrent, welShow, welLeft, welRight, nDeg){
         //console.log('_set next', nDeg);
        var nCurrentDeg = this.option('bHorizontal')? -nDeg : nDeg;
        var nShowDeg = this.option('bHorizontal')? (180 - nDeg):  -(180 - nDeg);
        if(welCurrent.$value() === welShow.$value()){
            welShow = null;
        }
        
        this._rotate(welCurrent, nCurrentDeg).addClass('gradient');
        if(welShow){
            this._rotate(welShow, nShowDeg).addClass('gradient');
        }  
        
       // welShow.addClass("gradient").rotateY(180 - nDeg);
        
           if (nDeg === 0) {
                welLeft.hide();
                welRight.hide();
                
                if(welShow){
                    this._rotate(welShow, 0).hide();
                }
             //   welShow.rotateY(0).hide().removeClass("gradient");
            } else if (nDeg < 90) {
               
                setTimeout(function(){
                    //welLeft.show('').offset();
               },0);
                welLeft.show('inline-block');
               welRight.show();
               welLeft.css('zIndex', 110);
               welCurrent.css('zIndex', 100);
               welRight.css('zIndex', 90);
               this._clearBackgrond(welLeft.first());
               this._setBackgroundShadow(welRight.first(), nDeg);
               
                welCurrent.show();
                if(welShow){
                welShow.hide();
                }
            } else if (nDeg < 180){
                welShow.show().css('zIndex', 100);
                
                welCurrent.hide();
                welLeft.show().css('zIndex', 90);
                welRight.show().css('zIndex', 110);
                
                this._setBackgroundShadow(welLeft.first(), nDeg);
                this._clearBackgrond(welRight.first());
                welShow.show();
                
                welCurrent.hide();
               
            } else {
                welLeft.hide();
                welRight.hide();
                
                //welShow.removeClass("gradient");
            }
        
    },
    
    _setPrevRotate : function(welCurrent, welShow, welLeft, welRight,nDeg){
        //console.log('_set prev', nDeg);
        var bH = this.option('bHorizontal');
        var nCurrentDeg = bH? nDeg : -nDeg;
        var nShowDeg = bH? -(180 - nDeg) :  (180 - nDeg);
        //var nCurrentDeg =nDeg;
        //var nShowDeg = -(180 - nDeg);
        
        if(welCurrent.$value() === welShow.$value()){
            welShow = null;
        }
        
        this._rotate(welCurrent,nCurrentDeg).addClass('gradient');
        if(welShow){
            this._rotate(welShow, nShowDeg ).addClass('gradient');
        }
        
        if (nDeg === 0) {
                welLeft.hide();
                welRight.hide();
                
                welCurrent.removeClass("gradient");
                if(welShow){
                    this._rotate(welShow, 0).hide().removeClass("gradient");
                }
               // welShow.rotateY(0).hide().removeClass("gradient");
            } else if (nDeg < 90) {
                //welCloneLeft.show().first().setBackgroundShadow(nDeg);
                //welCloneRight.show().first().clearBackground();
                welLeft.show().css('zIndex', 90);
                welRight.show().css('zIndex', 110);
                this._setBackgroundShadow(welLeft.first(), nDeg);
                this._clearBackgrond(welRight.first());
                
                welCurrent.show().css('zIndex', 100);
                if(welShow){
                    welShow.hide();
                }
            } else if (nDeg < 180){
                //welCloneLeft.show().first().clearBackground();
                //welCloneRight.show().first().setBackgroundShadow(nDeg);
                welLeft.show().css('zIndex', 110);
                welRight.show().css('zIndex',90);
                this._clearBackgrond(welLeft.first());
                this._setBackgroundShadow(welRight.first());
                
                welCurrent.hide();
                if(welShow){
                    welShow.show().css('zIndex', 100);
                }
            } else {
                welLeft.hide();
                welRight.hide();
                
                if(welShow){
                    welShow.removeClass("gradient");
                }
            }
    },
  
    _flipAnimate : function(){
        this._bFinished = false;
        var bRepos = (this._htIndexInfo.sDirection === null)? true : false;
        var welCurrent = this.getContentElement();
        var self = this;
        var welShow = null;
         if(this._bMoveDirection === 'next'){
              welShow = this.getNextElement();
         }else if(this._bMoveDirection === 'prev'){
              welShow = this.getPrevElement();
         }
         
         if(welCurrent.$value() === welShow.$value()){
             bRepos = true;
             this._htIndexInfo.sDirection = null;
         }
         
        var nDuration = bRepos? this.option('nBounceDuration') : this.option('nDuration');
        var nTotalDig = bRepos? 0 : 180;
         if(this._nDeg === 0){
              this._bFinished = true;
              setTimeout(function(){
                          self._onTransitionEnd();
               },10);
          }else{
              var startTime = (new Date()).getTime(),
                  nStartDeg = this._nDeg;
               (function timer(){
                                var now = (new Date()).getTime(),nEaseOut;
                                if (now >= startTime + nDuration) {
                                      cancelAnimationFrame(self._nTimerAnimate);
                                      self._onTransitionEnd();
                                      return;
                                 }
                                 now = (now - startTime) / nDuration - 1;
                                 nEaseOut = Math.sqrt(1 - Math.pow(now,2));
                                 var nDeg = (nTotalDig - nStartDeg)*nEaseOut + nStartDeg;
                                 self._nDeg = Math.min(nDeg, 180);
                                 if(self._bMoveDirection === 'next'){
                                     self._setNextRotate(welCurrent, welShow, self._htWElement.left, self._htWElement.right, self._nDeg);
                                 }else{
                                     self._setPrevRotate(welCurrent, welShow, self._htWElement.left, self._htWElement.right, self._nDeg);
                                 }
                                 self._nTimerAnimate = requestAnimationFrame(timer);   

                  }());
          }
    },
    
    
    _onAfterStart : function(){
        this._resetInfo();  
    },
    
    _resetInfo : function(){
        this._bMoveDirection = null; 
        this._bMove = false;
        this._nDeg = -1;
        this._bFinished = true;
        this._htWElement.left.css('zIndex', 1);
        this._htWElement.right.css('zIndex', 1);
    },
    
    _onTransitionEnd : function(){
        var bFireEvent = true;
        if(this._htIndexInfo.sDirection === null){
            bFireEvent = false;
        }
        
        jindo.$A(this._htWElement.aPanel).forEach(function(value, i, array){
            value.$value().style[this._sCssPrefix +'TransitionDuration'] = null;
            value.$value().style[this._sCssPrefix +'Transform'] = '';
        },this);
        
        this._resetInfo();
        this._endAnimation(bFireEvent);
    },
    
     /**
     * @description 이전 컨텐츠로 이동한다.
 * @param {Number} nDuration 애니메이션 시간 
     */ 
   _movePrev : function(nDuration){
       this._bMoveDirection = 'prev';
       this._bMove = true;
       this._nDeg = 1;
       this._setCloneElement();
       
        var n = this.option('nFlickThreshold');
        this._onEnd({
            nDistanceX : n+10,
            nDistanceY : n+10,
            nX : 10,
            nY : 10
        }, nDuration); 
    },
    
    /**
     * @description 이후 컨텐츠로 이동한다.
 * @param {Number} nDuration 애니메이션 시간 
     */
    _moveNext : function(nDuration){
       this._bMoveDirection = 'next';
       this._bMove = true;
       this._nDeg = 1;
       this._setCloneElement();
       var n = this.option('nFlickThreshold')*-1;
       var nPos = this.option('bHorizontal')? this._htWElement.base.width() :  this._htWElement.base.height();
      
       this._onEnd({
            nDistanceX : n-10,
            nDistanceY : n-10,
            nX : nPos -10,
            nY : nPos -10
        }, nDuration);
    }
}).extend(jindo.m.FlickingAnimation);
/**
   Slide flicking 플러그인 

    @class jindo.m.SlideFlicking
    @invisible
    @extends  jindo.m.FlickingAnimation
    @keyword flip, flicking
    @group Component
**/
jindo.m.SlideFlicking= jindo.$Class({
    /** @lends jindo.m.SlideFlicking.prototype */
    /**
        초기화 함수
    **/
    sAnimationName  : 'slide',
    $init : function(){
        this._htPosition = {};
        this._sTranslateStart = "translate(";
        this._sTranslateEnd = ")";
        this._initFlicking();
    },  
    
     _initFlicking : function(){
         this._setElementSize();
         this._setElementStyle();
         this._setPanelPos();
         this._prepareFlicking();
    },
    
    _setPanelPos : function(){
        var bH = this.option('bHorizontal');
        var el = this._htWElement.base.$value();
        var nW = bH? el.clientWidth : el.clientHeight;
        this._nDefaultSize = nW;
        if(this.option('bUseCircular')){
             this._htPosition.htPanel = {
                left : 0,
                center : 100,
                right : 200
            };
            this._htPosition.htContainer = {
                left: nW * -1,
                center : 0,
                right : nW 
            };
        }else{
            this._htPosition.aPos = [];
            var sLen = bH? 'width' : 'height';
            var nPos = 0;
            var nBeforePos = 0;
            for(var i=0,nLen = this._htWElement.aPanel.length; i<nLen;i++){
                if(i != 0){
                    if(this.option('nFlickDistanceOffset') === null){
                        nPos += this._htWElement.aPanel[i-1][sLen]()*-1;
                    }else{
                        nW = this._htWElement.aPanel[i-1][sLen]()*-1;
                        nPos = nBeforePos + nW + (this.option('nFlickDistanceOffset')*-1);
                        nBeforePos +=nW;                    
                    }
                }           
                this._htPosition.aPos.push(nPos);     
            }
        }
    },
    
    /**
     *  @description  애니메이션 작업전에 각 패널및 컨테이너의 설정값을 설정한다. 
     */
    _prepareFlicking : function(){
        if(this.option('bUseCss3d')){
             this._sTranslateStart = "translate3d(";
             this._sTranslateEnd = ",0px)";
        }
        
        for(var i=0, nLen =  this._htWElement.aPanel.length; i<nLen; i++){
              if(this.option('bUseTranslate')){
                    this._htWElement.aPanel[i].css(this._sCssPrefix + 'Transform', this._sTranslateStart +"0px,0px" + this._sTranslateEnd);   
              }
             this._htWElement.aPanel[i].css(this._sCssPrefix + 'TransitionProperty', "all");           
        }   
    },
    
    
    /**
     * @override 플리킹에 필요한 스타일을 추가한다.
     */
    _setElementStyle : function() {
        this._htWElement.base.css('overflow','hidden');
        this._htWElement.container.css('position','relative');
        if(this.option('bHorizontal')){
              this._htWElement.container.css('clear','both');
        }
        var self = this;
        
        jindo.$A(this._htWElement.aPanel).forEach(function(value,index, array){
            var wel = value;
            if(self.option('bUseCircular')){
                wel.css('position', 'absolute').css('width','100%').css('height','100%');
            }
            if(self.option('bHorizontal')){
                wel.css('float','left');
            }
        });
   },
    
    /**
     * @override 플리킹에 필요한 사이즈를 지정한다. 
     */
    _setElementSize : function(){
        this._htWElement.container.height(this._htWElement.base.height());
       
        
        if(!this.option('bUseCircular')) {// && this.option('bAutoSize')){
             var bH = this.option('bHorizontal');
             var nLen = this._htWElement.aPanel.length;
             var nSize = bH? this._htWElement.base.width(): this._htWElement.base.height();
             var nMaxSize = nSize * nLen;
             if(bH){
                 this._htWElement.container.width(nMaxSize);
             }else{
                 this._htWElement.container.height(nMaxSize);
             }
             
             jindo.$A(this._htWElement.aPanel).forEach(function(value){
                    if(bH) {
                      value.width(nSize);  
                    } else {
                      value.height(nSize);  
                    }
             });
        }
    },
  
    _onAfterStart : function(){
        
    },
 
      
    /**
       * @override
    */
    _onAfterMove : function(nDis, nVector, nPos){
          //기존의  movePanel을 넣으면 됨 
          //옵션설정이 되었을 경우 
        if(this.option('bSetNextPanelPos') && (Math.abs(nDis) >5 )){
            var welCenter = this.getElement();
            var welPrev = this.getPrevElement();
            var welNext = this.getNextElement();
            var nTop = welCenter.offset().top - window.scrollY;
            if( nTop < 0 ){
                 this._bSetTopPos  = true;
                 if(this._isIos){
                     var sValue =this._sTranslateStart +"0,"+ (nTop*-1)+"px" + this._sTranslateEnd;
                     welPrev.css(this._sCssPrefix + 'Transform', sValue);
                     welNext.css(this._sCssPrefix + 'Transform', sValue);
                 }else{
                     welPrev.css('top', nTop*-1 + "px");
                     welNext.css('top', nTop*-1 + "px");
                 }
            }
        }
        this._setPosition( nDis, nVector, nPos, 0, false);
    },
  
  
   /**
   * @override
   */
   _onAfterEnd : function(nDis, nVector, nPos, nDuration){
        var wel = this._htWElement.container;
        var nDistance;
        if(typeof nDuration === 'undefined'){
            nDuration = this.option('nDuration');
        }
        //var nDuration = this.option('nDuration');
        if(this._htIndexInfo.sDirection === null){
            nDuration = this.option('nBounceDuration');
        }
        
        if(!this.option('bUseTimingFunction') && (nDuration > 0) ){
            //script  방식으로 애니메이션 처리
            var self = this;
            nDistance =  this._nLastDis? this._nLastDis :  nDis;
             var startTime = (new Date()).getTime(),
                 nStartDis =  nDis, nBeforeDis = nDis, nStartVector = nVector, nTotalDis = this.option('bHorizontal')? this._htWElement.base.width(): this._htWElement.base.height();
            //console.log('didididi', this._htIndexInfo.sDirection);    
            if(this._htIndexInfo.sDirection === null){
                if(!this.option('bUseTranslate')){ 
                    nTotalDis = -100;
                }else{
                    nTotalDis = 0;
                }
             }
             if(nDistance < 0){
                   nTotalDis = nTotalDis*-1;
             }
                 
                    (function animate () {
                        var now = (new Date()).getTime(),nEaseOut, nDis;
                        if (now >= startTime + nDuration) {
                            //clearTimeout(self._nTimerAnimate);
                            cancelAnimationFrame(self._nTimerAnimate);
                            delete self._nTimerAnimate;
                            self._setPosition(nTotalDis,  (nDis-nBeforeDis), nPos, 0, false);
                            setTimeout(function(){
                                self._onTransitionEnd();
                            },100);
                            //self._onTransitionEnd();
                            return;
                        }
                        
                       
                        now = (now - startTime) / nDuration - 1;
                        nEaseOut = Math.sqrt(1 - Math.pow(now,2));
                        nDis = (nTotalDis - nStartDis)*nEaseOut + nStartDis;
                       self._setPosition( nDis,  (nDis-nBeforeDis), nPos, 0, false);
                       nBeforeDis = nDis;
                        //self._nTimerAnimate = setTimeout(animate, 1);   
                       self._nTimerAnimate = requestAnimationFrame(animate);

            })();
        }else{
            this._setPosition(nDis, nVector, nPos, nDuration, true);
        }
        
   },
    
    _getContainerPos : function(){
        var wel = this._htWElement.container;
        var nLeft = parseInt(wel.css("left"),10),
            nTop = parseInt(wel.css("top"),10);
        nLeft = isNaN(nLeft) ? 0 : nLeft;
        nTop = isNaN(nTop) ? 0 : nTop;
        var htPos = jindo.m.getCssOffset(wel.$value());
        //nLeft += htPos.left;
        //nTop += htPos.top;
        return {
            left : nLeft+htPos.left, 
            top : nTop+htPos.top,
            css_left : nLeft, 
            css_top :  nTop
        };
    },
    
  
  _setPosition : function( nDis, nVector, nPos, nDuration, bEnd){
       if(typeof nDuration === 'undefined'){
            nDuration = 0;
       }        
       if(!this.option('bUseTranslate')){
           this._setPositionForStyle(nDis, nVector , nDuration, bEnd);
       }else{
            this._setPositionTransform(nDis,nDuration, bEnd);
       }
    },
  /**
     * @description wel 엘리먼트의 위치를 left, top 속성으로 설정한다. 
 * @param {HTMLElement} wel 위치를 잡을 대상 엘리먼트 
 * @param {Number} nDis touchstart 시점에서 부터의 거리
 * @param {Number} nVector 이전 터치와의 상대 거리 
 * @param {Number} nDuration 애니메이션 시간 
 * @param {Boolean} bEnd 현재 touchEnd 시점여부 
     */
    _setPositionForStyle : function( nDis, nVector, nDuration, bEnd){
        var sName = this.option('bHorizontal')? 'left' : 'top';
        
        if(bEnd){
           if(this.option('bUseCircular')){
               if(this._htIndexInfo.sDirection === null){
                   nDis = -100;
               }else{
                   if(nDis < 0){
                        nDis = -200;
                    }else{
                        nDis = 0;
                    }
               }
           }else{
               nDis = this._getMovePos();
           }
        }
        
        var n = 0;
        
        if(this.option('bUseCircular')){
            n = ((nDis/this._nDefaultSize) * 100) - 100;
        }else{
            if(bEnd){
                n = nDis;
            }else{
                n = nVector + this._getContainerPos()['css_'+ sName];
            }
        }
        var nPos = bEnd? nDis : n;
       
        
        this._nLastDis = nDis;
       if(bEnd){
            if(nPos === parseFloat(this._htWElement.container.css(sName).replace('px',''),10) ){
                nDuration = 0;
            }
            this._attachTransitionEnd(this._htWElement.container.$value(), nDuration);
        }
         var nX = this.option('bHorizontal')? nPos :0;
         var nY = this.option('bHorizontal')? 0: nPos;
        this._setPosContainer(nX, nY, nDuration);
        //wel.css(htCss);
    },
    
    /**
     * @description wel 엘리먼트의 위치를 css의 translate 속성으로 설정한다. 
 * @param {HTMLElement} wel 위치를 잡을 대상 엘리먼트 
 * @param {Number} nDis touchstart 시점에서 부터의 거리
 * @param {Number} nDuration 애니메이션 시간 
 * @param {Boolean} bEnd 현재 touchEnd 시점여부 
     */
    _setPositionTransform : function(nDis, nDuration, bEnd){
        var bH = this.option('bHorizontal');
        if(bEnd){
            if(this._htIndexInfo.sDirection === null){
                nDis = 0;
            }else{
                if(this.option('bUseCircular')){
                    nDis = (this._htIndexInfo.sDirection === "next")? this._htPosition.htContainer.left : this._htPosition.htContainer.right;
                }else{
                    nDis = this._getMovePos();
                }
            }
        }
        
        // console.log("nDis" , nDis);
// 
	    //var bH = this.option('bHorizontal');
	    var nX = bH? nDis :0;
	    var nY = bH? 0: nDis;

	    this._nLastDis = nDis;
	       
	       if(bEnd){
	            var htCssOffset = jindo.m.getCssOffset(this._htWElement.container.$value());
	            if((htCssOffset.left === nX) && (htCssOffset.top === nY)){
	                nDuration = 0;
	            }
	            this._attachTransitionEnd(this._htWElement.container.$value(), nDuration);
	        }
            this._setPosContainer(nX, nY, nDuration);
    },
  /**
   * @override
   */
    _onTransitionEnd : function(){
        this._detachTarnsitonEnd();
        var bFireEvent = true;
        if(this._htIndexInfo.sDirection === null){
            bFireEvent = false;
        }
        
        this._nLastDis  = null;
        //console.log(this._htIndexInfo);
        //if(this.option("bUseCircular")){
        this._restorePanel(this._htIndexInfo.welNextElement.$value());
        //}
        this._endAnimation(bFireEvent);
        if(this._bFireMoveEvent){
            this._fireCustomEvent('move');
            this._bFireMoveEvent = false;
        }
    },
    
    
    /**
     * @description el이 화면에 중앙에 오도록 각 패널과 컨테이너 재배치 한다.
 * @param {HTMLElement} el 화면에 중앙에 오는 엘리먼트 
     */
    _restorePanel : function(el){
         var self =this;
         var sPosition = this.option('bHorizontal')? 'left':'top'; 
         
         var nCenter = this.getIndexByElement(el);
         this._refresh(nCenter, false);
         
         if(this.option('bUseCircular')){
             if(this._bSetTopPos){
                if(this._isIos){
                    this._htWElement.aPanel[nCenter].css(this._sCssPrefix + 'Transform', this._sTranslateStart +"0px,0px" + this._sTranslateEnd);   
                    this._htWElement.aPanel[nPrev].css(this._sCssPrefix + 'Transform', this._sTranslateStart +"0px,0px" + this._sTranslateEnd);   
                    this._htWElement.aPanel[nNext].css(this._sCssPrefix + 'Transform', this._sTranslateStart +"0px,0px" + this._sTranslateEnd);   
                }else{
                    this._htWElement.aPanel[nCenter].css("top","");
                    this._htWElement.aPanel[nPrev].css("top","");
                    this._htWElement.aPanel[nNext].css("top","");
                }
                this._bSetTopPos =  false;
            }
            
            if(this._isIos && this.option('bUseCircular')){
                 var nPrev = (((nCenter-1) < 0 )? 2 : (nCenter-1))%3;
                 var nNext =  (((nCenter+1) > 2 )? 0 : (nCenter+1))%3;
                 var welClonePrev = jindo.$Element(this._htWElement.aPanel[nPrev].$value().cloneNode(true));
                 var welCloneNext = jindo.$Element(this._htWElement.aPanel[nNext].$value().cloneNode(true));
                 
                 this._htWElement.aPanel[nPrev].replace(welClonePrev);
                 this._htWElement.aPanel[nNext].replace(welCloneNext);
                 
                 this._htWElement.aPanel[nPrev] = welClonePrev;
                 this._htWElement.aPanel[nNext] = welCloneNext;
                 this._htWElement.aPanel[nPrev] = welClonePrev;
                 this._htWElement.aPanel[nNext] = welCloneNext;
            } 
         }
    },
  
    
    /**
     * @description n번째 패널 중앙에 오도록 panel을 다시 좌우 배열해서 배치한다.
     * @param {Number} n 현재 화면에 보여져야할 content의 인덱스
     * @param {Boolean} bResize 화면 크기가 변화되어 다시 사이즈를 업데이트 해야 할경우 true 
     * @param {Boolean} bFireEvent 커스텀이벤트 발생여부
     */
    _refresh : function(n, bResize ){
         var nCenter = n;
        
         if(this.option('bUseCircular')){
             nCenter = n%3;
         }
         
         if(bResize){
               this._setElementSize();
               this._setPanelPos();
         }   
			
          var sPosition = this.option('bHorizontal')? 'left':'top'; 
          this._htWElement.container.css(this._sCssPrefix+'TransitionDuration', '0ms');
          if(this.option('bUseCircular')){
              //순환일 경우 
              this._htWElement.container.css(sPosition, '-100%');
              if (this.option('bUseTranslate')) {
                    this._htWElement.container.css(this._sCssPrefix + 'Transform', this._sTranslateStart + "0px,0px" + this._sTranslateEnd);
               }
               var nPrev = (((nCenter-1) < 0 )? 2 : (nCenter-1))%3;
               var nNext =  (((nCenter+1) > 2 )? 0 : (nCenter+1))%3;
               this._htWElement.aPanel[nCenter].css(sPosition, this._htPosition.htPanel.center + "%").css('zIndex',10);
               this._htWElement.aPanel[nPrev].css(sPosition, this._htPosition.htPanel.left+ "%").css('zIndex',1);
               this._htWElement.aPanel[nNext].css(sPosition, this._htPosition.htPanel.right+ "%").css('zIndex',1);
          }else{
              //비순환일 경우
              var nPos = 0;
              if(nCenter > 0){
                  nPos = this._htPosition.aPos[nCenter];
              }
              this._htWElement.container.css(this._sCssPrefix + 'Transform', "");
              this._htWElement.container.css(sPosition, nPos+"px");
          }
    },
    
    
    
    /**
     * @override
     * @description n 컨텐츠로 이동한다 
 * @param {Number} n 컨텐츠 인덱스 
 * @param {Number} nDruation  애니메이션 시
 * @param {Boolean} flicking  커스텀 이벤트 발생여부
     */
     _moveTo : function(nIndex, nDuration , bFireEvent){
        if(this.option('bUseCircular')){
             this.refresh(nIndex, false, bFireEvent);
        }else{
            if(bFireEvent){
                if(!this._fireCustomEvent('beforeMove',{
                      nContentsIndex : this.getContentIndex(),
                      nContentsNextIndex : nIndex
                })){
                    return;
                }
            }
            
            var nDis = this._getMovePos(nIndex);
            var nX =  this.option('bHorizontal')? nDis : 0;
            var nY =  this.option('bHorizontal')? 0: nDis;
            this._htIndexInfo.welNextElement = this._htWElement.aPanel[nIndex];
            this._htIndexInfo.nNextContentIndex = nIndex;
            if(bFireEvent){
                this._bFireMoveEvent = true;
                // if(nDuration !== 0){
                    // this._attachTransitionEnd(this._htWElement.container.$value(), nDuration);
                // }else{
                    // var self = this;
                    // setTimeout(function(){
                          // self._onTransitionEnd();
                    // },100);
                // }
            }
            if(nDuration !== 0){
                    this._attachTransitionEnd(this._htWElement.container.$value(), nDuration);
                }else{
                    var self = this;
                    setTimeout(function(){
                          self._onTransitionEnd();
                    },100);
                }
            this._setPosContainer(nX, nY, nDuration);
            //if(!this.bFireEvent){
                 //this._onTransitionEnd();
            //}
        }
    },
    _getMovePos : function(nIndex){
         var bRet = 0;
         var sPos =  this.option('bHorizontal')? "left" : "top";
         var htPos =  this._getContainerPos();
         if(typeof nIndex === 'undefined'){
              if(this._htIndexInfo.sDirection !== null){
                  nIndex = this._htWElement.aPanel.length-1;
                  htPos =  this._getContainerPos();
                  var nCurrent = htPos[sPos];
                  var nMax = this._htPosition.aPos.length;
                  for(var i=0,nLen = nMax; i<nLen; i++){               
                            if(nCurrent >= (this._htPosition.aPos[i])){
                                nIndex = i;
                                break;
                            }               
                  }
                  if ((nIndex == this.getContentIndex()) && nIndex > 0 && (this._htIndexInfo.sDirection === 'prev')) nIndex--;
                  if ((nIndex == this.getContentIndex()) && (nIndex < (nMax-1)) && (this._htIndexInfo.sDirection === 'next')) nIndex++;
              }else{
                  nIndex = this.getContentIndex();
              }
            
         }
         
         bRet  = this._htPosition.aPos[nIndex];
         if(this.option('bUseTranslate')){
             bRet -= (htPos['css_'+sPos]);
         }
         //bRet  = this._htPosition.aPos[nIndex] - (htPos['css_'+sPos]);
         
         return bRet;
    },
    
    _setPosContainer : function(nX, nY, nDuration){
        if(typeof nDuration === 'undefined'){
            nDuration = 0;
        }
        var htCss = {};
            htCss[this._sCssPrefix+'TransitionProperty'] = "all";
            htCss[this._sCssPrefix+'TransitionDuration'] =  (nDuration === 0)? '0' : nDuration +"ms" ;
            
        if(this.option('bUseTranslate')){
            htCss[this._sCssPrefix+'Transform'] =  this._sTranslateStart + nX +"px,"+nY+"px" + this._sTranslateEnd;
        }else{
             var sUnit = this.option('bUseCircular')? "%" : "px";
             if(this.option('bHorizontal')) {
                htCss['left']  = nX+ sUnit; 
             } else {
                htCss['top']  = nY+ sUnit; 
             }
        }
            
        this._htWElement.container.css(htCss);
    }
}).extend(jindo.m.FlickingAnimation);
/**
    @fileOverview 대용량 스크롤 사용가능한 스크롤컴포넌트 플러그인
    @author sculove
    @version 1.7.1
    @since 2012. 7. 27.
**/
/**
    가로나 세로에 대해서만 적용됨.

    @class jindo.m.DynamicPlugin
    @extends jindo.m.Component
    @keyword scroll, 스크롤
    @group Component
    @invisible
**/
jindo.m.DynamicPlugin = jindo.$Class({
    /* @lends jindo.m.DynamicPlugin.prototype */
    /**
        초기화 함수

        @ignore
        @constructor
        @param {String|HTMLElement} el Scroll할 Element (필수)
        @param {Object} [htOption] 초기화 옵션 객체
            @param {Number} [htOption.nRatio=1.5]
            @param {String} [htOption.sListElement="li"]
            @param {String} [htOption.sDirection="V"]
    **/
    $init : function(el,htUserOption) {
        this.option({
            nRatio : 1.5,
            sListElement : "li",
            sDirection : "V"
        });
        this.option(htUserOption || {});
        this._initVar(el);
        // this.refresh();
    },

    /**
        jindo.m.DynamicPlugin 에서 사용하는 모든 인스턴스 변수를 초기화한다.
    **/
    _initVar: function(el) {
        this._wel = jindo.$Element(el);
        this._aListElement = null;
        this._nStartIdx = -1;
        this._nEndIdx = -1;
        this._nRatio = parseInt(this.option("nRatio"),10);
        this._nPos = -1;
        this._nSize = -1;
        this._sDirection = this.option("sDirection");
    },

    /**

        @param  {Number} nPos  현재 위치 정보
    **/
    refresh : function(nPos) {
        var aListElement = this._wel.queryAll(this.option("sListElement"));
        var wel;
        if(!aListElement) {
            return;
        }
        this._aListElement = [];
        for(var i=0, nLength = aListElement.length; i < nLength; i++) {
            wel = jindo.$Element(aListElement[i]);
            this._aListElement.push({
                el : wel.$value(),
                wel : wel,
                htRange : this._getElementPos(wel),
                sDisplay : wel.css("display"),
                sPosition : wel.css("position")
            });
        }
        this._nPos = nPos || 0;
        this._nSize = this._sDirection == "V" ? this._wel.height() : this._wel.width();
        this._covertPositionType();
    },

    /**
        포지션정보를 absolute로 변경하고 top,left값을 설정한다. 또한, 바깥영역의 엘리먼트를 hidden시킨다.
    **/
    _covertPositionType : function() {
        var nStartPos = this._getStartBoundary(),
            nEndPos = this._getEndBoundary();
        for(var i=0, ht, nLength = this._aListElement.length; i < nLength; i++) {
            ht = this._aListElement[i];
            if(this._sDirection == "V") {
                ht.wel.css({
                    "top" : ht.htRange.nStartPos + "px",
                    "width" : "100%"
                });
            } else {
                ht.wel.css({
                    "left" : ht.htRange.nStartPos + "px",
                    "height" : "100%"
                });
            }
            ht.wel.css("position","absolute");
            if(ht.htRange.nStartPos <= -nStartPos) {
                // ht.el.style.display = "none";
                this._nStartIdx = i;
            } else if(ht.htRange.nEndPos <= -nEndPos) {
                ht.el.style.display = ht.sDisplay;
                this._nEndIdx = i;
            } else {
                ht.el.style.display = "none";
            }
        }
    },

    /**
        위치 이동시 엘리먼트를 변경한다.
    **/
    updateListStatus : function(sDirection, nPos) {
        if(!this._aListElement) {
            return;
        }
        this._nPos = nPos;
        var nStartPos = this._getStartBoundary(),
            nEndPos = this._getEndBoundary(),
            nLength = this._aListElement.length,
            ht, i, nWelPos;

        if(sDirection == "forward") {
            for(i=this._nStartIdx+1; i<nLength;i++) {
                ht = this._aListElement[i];
                nWelPos = ht.htRange.nEndPos;
                if(nWelPos < -nStartPos) {
                    ht.el.style.display = "none";
                    this._nStartIdx = i;
                } else {
                    break;
                }
            }
            for(i=this._nEndIdx; i<nLength;i++) {
                ht = this._aListElement[i];
                nWelPos = ht.htRange.nStartPos;
                if(nWelPos < -nEndPos) {
                    ht.el.style.display = ht.sDisplay;
                    this._nEndIdx++;
                } else {
                    break;
                }
            }
        } else if(sDirection == "backward") {
            for(i=this._nEndIdx-1; i >= 0; i--) {
                ht = this._aListElement[i];
                nWelPos = ht.htRange.nStartPos;
                if(nWelPos < -nEndPos) {
                    break;
                } else {
                    ht.el.style.display = "none";
                    this._nEndIdx--;
                }
            }
            for(i=this._nStartIdx; i>=0; i--) {
                ht = this._aListElement[i];
                nWelPos = ht.htRange.nEndPos;
                if(nWelPos < -nStartPos) {
                    break;
                } else {
                    ht.el.style.display = ht.sDisplay;
                    this._nStartIdx--;
                }
            }
        }
    },

    /**
        상단 Range 위치를 반환한다.
        @return {Number} 상단 Range의 위치
    **/
    _getStartBoundary : function() {
        return this._nPos + (this._nSize * this._nRatio);
    },

    /**
        하단 Range 위치를 반환한다.
        @return {Number} 하단 Range의 위치
    **/
    _getEndBoundary : function() {
        return this._nPos - this._nSize - (this._nSize * this._nRatio);
    },

    /**
        엘리먼트의 위치를 반환한다.
        @param  {jindo.$Element} wel        대상 엘리먼트
        @return {Object}            nStartPos, nEndPos
    **/
    _getElementPos : function(wel) {
        var nStartPos,nEndPos;
        if(this._sDirection == "V") {
            nStartPos = wel.offset().top - this._wel.offset().top;
            nEndPos = nStartPos + wel.height();
        } else {
            nStartPos = wel.offset().left - this._wel.offset().left;
            nEndPos = nStartPos + wel.width();
        }
        return {
            nStartPos: nStartPos,
            nEndPos: nEndPos
        };
    }
}).extend(jindo.m.Component);/**
    @fileOverview Pull/Down기능을 사용하는 플러그인.
    @author sculove
    @version 1.7.1
    @since 2013. 1. 11.
**/
/**
    @class jindo.m.PullPlugin
    @extends jindo.m.Component
    @keyword scroll, 스크롤
    @group Component
    @invisible
    
    @history 1.6.0 Release 최초 릴리즈
**/
jindo.m.PullPlugin = jindo.$Class({
    /* @lends jindo.m.PullPlugin.prototype */
    /**
        초기화 함수

        @constructor
        @param {Object} [oParent] Plugin 을 사용하기 위한 상위(Parent) object
    **/
    $init : function(oParent) {
        this.option(oParent.option());
        this._initVar(oParent);
        this._initPullDownFunc();
        this._initPullUpFunc();
    },

    /**
        jindo.m.PullPlugin 에서 사용하는 모든 인스턴스 변수를 초기화한다.
    **/
    _initVar: function(oParent) {
        this._oParent = oParent;
        this._htWElement = oParent._htWElement;
        this._isPullDown = false;
        this._isPullUp = false;
        this._isUpdating = false;
        this._nOrgMaxScrollTop = null;

        this._htWElement["pullDown"] = jindo.$Element(this._htWElement["wrapper"].query("." + this.option("sClassPrefix") + "pullDown"));
        this._htWElement["pullUp"] = jindo.$Element(this._htWElement["wrapper"].query("." + this.option("sClassPrefix") + "pullUp"));
    },
    
    /**
        pull Down/up 관련 상태을 초기화합니다.
    **/
    refresh : function() {
        this.option(this._oParent.option());
        this._isUpdating = false;
        this._nOrgMaxScrollTop = null;

        this._isPullDown = this.option("bUsePullDown") && this.option("bUseVScroll") && !this.option("bUseHScroll") && this.option("bUseBounce") && (this._htWElement["pullDown"] !== null);
        this._isPullUp = this.option("bUsePullUp") && this.option("bUseVScroll") && !this.option("bUseHScroll") && this.option("bUseBounce") && (this._htWElement["pullUp"] !== null);
        
        if (this._isPullDown && this.option("fnPullDownIdle")) {
            this._htWElement["pullDown"]._isReady_ = false;
            this._htWElement["pullDown"].show();
            this.option("fnPullDownIdle")(this._htWElement["pullDown"]);
        }
        if (this._isPullUp && this.option("fnPullUpIdle")) {
            this._htWElement["pullUp"]._isReady_ = false;
            this._htWElement["pullUp"].show();
            this.option("fnPullUpIdle")(this._htWElement["pullUp"]);
        }
        // Pulldown/up에 대한 처리
        if(!this.option("bUseVScroll")) {
            if(this._htWElement["pullDown"] !== null) {
                this._htWElement["pullDown"].hide();
            }
            if(this._htWElement["pullUp"] !== null) {
                this._htWElement["pullUp"].hide();
            }
        }

        // pulldown 상태 정리 후 스크롤 사이즈 변경
        this._oParent.nScrollW = this._htWElement["scroller"].width();
        this._oParent.nScrollH = this._htWElement["scroller"].height() - this._getBottomMargin();
        this._oParent.nMinScrollTop = -this._getTopMargin();
        this._oParent.nMaxScrollTop = this._oParent.nWrapperH - this._oParent.nScrollH;
    },

    _getTopMargin : function() {
        return (this._isPullDown ? this._htWElement["pullDown"].height() : 0) + this.option("nOffsetTop");
    },

    _getBottomMargin : function() {
        return (this._isPullUp ? this._htWElement["pullUp"].height() : 0) + this.option("nOffsetBottom");
    },
    
    /**
        pull down 관련 함수 옵션이 설정되지 않았을 경우 초기화한다.
    **/
    _initPullDownFunc : function() {
        if(this.option("bUsePullDown") === true) {
            if(!this.option("fnPullDownIdle")) {
                this.option("fnPullDownIdle", function(wel) {
                    wel.html("업데이트하시려면 아래로 내려주세요");
                });
            }
            if(!this.option("fnPullDownBeforeUpdate")) {
                this.option("fnPullDownBeforeUpdate", function(wel) {
                    wel.html("업데이트 합니다");
                });
            }
            if(!this.option("fnPullDownUpdating")) {
                this.option("fnPullDownUpdating", function(wel) {
                    wel.html("업데이트 중입니다...");
                });
            }
        }
    },

	/**
	 * Pull up 관련 함수 옵션이 설정되지 않았을 경우 초기화 한다.
	 */
    _initPullUpFunc : function() {
        if(this.option("bUsePullUp") === true) {
            if(!this.option("fnPullUpIdle")) {
                this.option("fnPullUpIdle", function(wel) {
                    wel.html("더 보시려면 위로 올려주세요");
                });
            }
            if(!this.option("fnPullUpBeforeUpdate")) {
                this.option("fnPullUpBeforeUpdate", function(wel) {
                    wel.html("로드 합니다");
                });
            }
            if(!this.option("fnPullUpUpdating")) {
                this.option("fnPullUpUpdating", function(wel) {
                    wel.html("로드 중...");
                });
            }
        }
    },
    
    /**
        Update적용시 touchMove 기능 처리
        - notice => ready => pullDown/up 상태

        @param {Jindo.$Event} we
    **/
    touchMoveForUpdate : function(we, nMaxScrollTop) {
        if (this._isUpdating) {
            return;
        }
        var nTopMargin = this._getTopMargin(),
            nBottomMargin = this._getBottomMargin();

        // nOrgMax값이 있을 경우
        nMaxScrollTop = this._nOrgMaxScrollTop || nMaxScrollTop;

        // 위에인 경우
        if (this._isPullDown) {
            if (this._htWElement["pullDown"]._isReady_) {
                if (nTopMargin > this._oParent._nTop) {
                    this._htWElement["pullDown"]._isReady_ = false;
                    if (this.option("fnPullDownIdle")) {
                        this.option("fnPullDownIdle")(this._htWElement["pullDown"]);
                        this._oParent.nMinScrollTop=-nTopMargin;
                    }
                }
            } else {
                if (this._oParent._nTop > nTopMargin) {
                    this._htWElement["pullDown"]._isReady_ = true;
                    if (this.option("fnPullDownBeforeUpdate")) {
                        this.option("fnPullDownBeforeUpdate")(this._htWElement["pullDown"]);
                        this._oParent.nMinScrollTop=0;
                    }
                }
            }
        }

        // 아래인 경우
        if (this._isPullUp) {
            if (this._htWElement["pullUp"]._isReady_) {
                if (this._oParent._nTop >= (nMaxScrollTop - nBottomMargin)) {
                    this._htWElement["pullUp"]._isReady_ = false;
                    if (this.option("fnPullUpIdle")) {
                        this.option("fnPullUpIdle")(this._htWElement["pullUp"]);
                        this._oParent.nMaxScrollTop=nMaxScrollTop;
                    }
                }
            } else {
                if (this._oParent._nTop < (this._oParent.nMaxScrollTop - nBottomMargin)) {
                    this._htWElement["pullUp"]._isReady_ = true;
                    if (this.option("fnPullUpBeforeUpdate")) {
                        this.option("fnPullUpBeforeUpdate")(this._htWElement["pullUp"]);
                        this._nOrgMaxScrollTop = nMaxScrollTop;
                        this._oParent.nMaxScrollTop= nMaxScrollTop - nBottomMargin;
                    }
                }
            }
        }
    },
    
    /**
     * 스크롤이 끝나고 Scroll 객체에서 호출되는 함수
     */
	pullUploading : function() {
        var isUp = null,
            wel = null;
        if(this._isPullDown && this._htWElement["pullDown"]._isReady_) {
            wel = this._htWElement["pullDown"];
            isUp = isUp || false;
        }
        if(this._isPullUp && this._htWElement["pullUp"]._isReady_) {
            wel = this._htWElement["pullUp"];
            isUp = isUp || true;
        }
        if(!wel){
            return false;
        }
        var fn = isUp ? this.option("fnPullUpUpdating") : this.option("fnPullDownUpdating"),
        self = this;

        this._isUpdating = true;
        wel._isReady_ = false;

        if (fn) {
            setTimeout(function(){
                fn(wel);
                if (isUp) {
                    self._fireEventPullUp();
                } else {
                    self._fireEventPullDown();
                }
            }, 0);
        }
    },
    
    
    /**
     * Scroll객체에서 사용자 정의한 함수 호출
     * pull down이 발생했을때 호출
     */
    _fireEventPullDown : function() {
        if(!this._htWElement) {
            return;
        }

        this._oParent.fireEvent("pullDown", {
            welElement : this._htWElement["pullDown"],
            oScroll : this._oParent
        });
    },
    
    /**
        pullUp 사용자 이벤트를 호출한다.
        pull up이 발생했을때 호출
    **/
    _fireEventPullUp : function() {
        if(!this._htWElement) {
            return;
        }

        this._oParent.fireEvent("pullUp", {
            welElement : this._htWElement["pullUp"],
            oScroll : this._oParent
        });
    }
}).extend(jindo.m.Component);/**
    @fileOverview  Validator 상위 클래스 
    @author "sculove"
    @version 1.7.1
    @since  2011. 11. 23.
    
**/
/**
   Validator 상위 클래스 

    @class jindo.m.Validator
    @invisible
    @keyword validator
    @group Component
**/
jindo.m.Validator = jindo.$Class({
	/** @lends jindo.m.Validator.prototype */
	/**
	 * @description 초기화 함수
	 * @constructs
	 */

	/**
	 * @description validate 한다.
	 * @return {HashTable}  {bValid, sCorrectedValue}
	 */	
	validate : function(sValue, sFormat) {
		var sCorrectedValue = this._getCorrectedValue(sValue, sFormat),
			htResult = {
				bValid : this._isValid(sCorrectedValue, sFormat),
				sCorrectedValue : null
			};
		if(sCorrectedValue !== sValue) {
			htResult.sCorrectedValue = sCorrectedValue;
		} 
		return htResult;
	}
});
/**
    @fileOverview  Number Validator 플러그인 
    @author "sculove"
    @version 1.7.1
    @since  2011. 11. 23.
    
**/
/**
   Number Validator 플러그인 

    @class jindo.m.NumberValidator
    @invisible
    @extends jindo.m.Validator
    @group Component
    @keyword Number, NumberValidator
**/
jindo.m.NumberValidator = jindo.$Class({
	/** @lends jindo.m.NumberValidator.prototype */
	/**
	 * @description 초기화 함수
	 * @constructs
	 */
	rx :  /^[+\-]?(\d{1,3},)?(\d{3},)*(\d)+(\.\d+)?$/,
	
	_isValid : function(sValue, sFormat) {
		return this.rx.test(sValue); 
	},
	
	_getCorrectedValue : function(sValue, sFormat) {
		// 숫자 형식 필터링
		sValue = this._filterNumber(sValue);
		// 포맷 적용		
		if(sFormat) {	
			sValue = this._applyComma(sValue);
		}
		return sValue;
	},
	
	/**
	 * @description 숫자에 ,를 붙이는 함수
	 */
	_applyComma : function(sValue) {
		var sResult = "",
			nIdx = 0,
			ch = null,
			chCode = null,
			nDotIdx = sValue.indexOf("."),
			sIntValue = ( nDotIdx !== -1  ? sValue.substring(0,nDotIdx) : sValue ),
			sPointValue = ( nDotIdx !== -1 ? sValue.substr(nDotIdx) : "");
		
//		console.log(sValue + " --" + sIntValue + " || " + sPointValue);
		if(sIntValue.length > 3) {
			for(var i=sIntValue.length-1; i>=0; i--, nIdx++) {
				ch = sIntValue.charAt(i); 
				chCode = sIntValue.charCodeAt (i); 
				sResult = (nIdx !==0 && nIdx %3 === 0 && (chCode > 47 && chCode < 58) ? ch + "," + sResult : ch + sResult); 
			}
			return (sPointValue !== "" ? sResult + sPointValue : sResult);
		} else {
			return sValue;
		}
	},
	
	/**
	 * @description 숫자를 추출하는 함수(-와 숫자로만 구성된값)
	 */
	_filterNumber : function(sValue) {
		var cFirst, aValue, sIntValue, sPointValue;
		// 불필요한 문자 제거
		sValue = sValue.replace(/[^\d\.\-]/g,"");
		//.replace(/\.{2,}/g,"").replace(/-{2,}/g,"");
		
		// 맞지 않는 - 제거
		cFirst = sValue.charAt(0);
		sValue = sValue.replace(/-/g,"");
		sValue = ( cFirst === "-" ? cFirst + sValue : sValue );
		if( sValue.length <= 0 || sValue === "-") {
			return sValue;
		}
		// 맞지 않는 . 제거, 정수부분 정수로 변경
		aValue = sValue.split('.');
		if(aValue.length > 1) {
			sIntValue = aValue.shift();
			//console.log(sIntValue);
			cFirst = sIntValue.charAt(0);
			sIntValue = (sIntValue === "" ? 0 : parseInt(sIntValue,10));
			if(cFirst === "-" && sIntValue === 0) {
				sIntValue = "-" + sIntValue;
			}
			sPointValue = aValue.join("");
			sValue = sIntValue + "." + sPointValue;	
		} else {
			sValue = String(parseFloat(aValue.join(""),10));
		}
		return sValue;
	}
}).extend(jindo.m.Validator);/**
    @fileOverview  Currency Validator 플러그인 
    @author "sculove"
    @version 1.7.1
    @since  2011. 12. 24.
    
**/
/**
   Currency Validator 플러그인 

    @class jindo.m.CurrencyValidator
    @invisible
    @extends jindo.m.NumberValidator
    @group Component
    @keyword Currency, CurrencyValidator
**/
jindo.m.CurrencyValidator = jindo.$Class({
	/** @lends jindo.m.CurrencyValidator.prototype */
	/**
	 * @description 초기화 함수
	 * @constructs
	 */
	rx :  /^[+\-]?[^\s\t\v\d]+(\d{1,3},)?(\d{3},)*(\d)+(\.\d+)?$/,
	
	_getCorrectedValue : function(sValue, sFormat) {
		// 숫자 형식 필터링, 콤마적용 
		sValue = this._applyComma(this._filterNumber(sValue));
		sFormat = sFormat || "\\";
		sValue = ( sValue.charAt(0) === "-" ?  "-" + sFormat + sValue.substring(1) : sFormat + sValue ); 
		return sValue;
	}

}).extend(jindo.m.NumberValidator);/**
    @fileOverview  Date Validator 플러그인 
    @author "sculove"
    @version 1.7.1
    @since  2011. 11. 23.
    
**/
/**
   Date Validator 플러그인 

    @class jindo.m.DateValidator
    @invisible
    @extends jindo.m.Validator
    @group Component
    @keyword Date, DateValidator
**/
jindo.m.DateValidator = jindo.$Class({
	/** @lends jindo.m.DateValidator.prototype */
	/**
	 * @description 초기화 함수
	 * @constructs
	 */
	
	_isValid : function(sValue, sFormat) {
		sFormat = sFormat || "yyyy-mm-dd";
		sValue = sValue.replace(/[\.\-]/g,"");
		var sFormatData = sFormat.replace(/[\d\.\-]/g,""),
			nYear = sValue.substr(sFormatData.indexOf("yyyy"),4) * 1, 
			nMonth = sValue.substr(sFormatData.indexOf("mm"),2) * 1,
			nDay = sValue.substr(sFormatData.indexOf("dd"),2) * 1;
		//console.log("년도 : " + nYear + ":"+ nMonth + ":"+ nDay + "==" + sValue + "__" + sFormatData.length+ "__" + sValue.length);
		if((nMonth >= 1 && nMonth <= 12) && (nDay >= 1 && nDay <= 31) && (nYear >= 1000)) {
			return true;
		}
		return false;
	},
	
	_getCorrectedValue : function(sValue, sFormat) {
		sFormat = sFormat || "yyyy-mm-dd";
		var sFormatData = sFormat.replace(/[\d\.\-]/g,"");
		
		// 불필요한 문자 제거
		sValue = sValue.replace(/[^\d]/g,"").substr(0,sFormatData.length);
		if(sValue.length >= (sFormatData.length-1) ) {
			sValue = this._getFormatted(sValue, sFormat);
		}
		return sValue;
	},
	
	/**
	 * @description 입력 문자열을 지정한 date 포맷 값으로 변경.
	 * @param {String} sFormat 포맷 형식.
	 * @param {String} sDateStr 포맷 변경 문자열.
	 */
	_getFormatted : function(sDateStr, sFormat){
		var sFormatData = sFormat.replace(/[\.\-]/g,""),
			sYear = sDateStr.substr(sFormatData.indexOf("yyyy"),4),
			sMonth = sDateStr.substr(sFormatData.indexOf("mm"),2),
			sDay = sDateStr.substr(sFormatData.indexOf("dd"),2);
		return sFormat.replace(/(yyyy|mm|dd)/gi,
	        function($1){
	            switch ($1){
	                case 'yyyy': return sYear;
	                case 'mm': return sMonth;
	                case 'dd':   return sDay;
	            }
	        } 
	    );
	}
}).extend(jindo.m.Validator);/**
    @fileOverview  Email Validator 플러그인 
    @author "sculove"
    @version 1.7.1
    @since  2011. 11. 23.
    
**/
/**
   Email Validator 플러그인 

    @class jindo.m.EmailValidator
    @invisible
    @extends jindo.m.Validator
    @group Component
    @keyword Email, EmailValidator
**/
jindo.m.EmailValidator = jindo.$Class({
	/** @lends jindo.m.EmailValidator.prototype */
	/**
	 * @description 초기화 함수
	 * @constructs
	 */
	rx : /^(([\w\-]+\.)+[\w\-]+|([a-zA-Z]{1}|[\w\-]{2,}))@((([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\.([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\.([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\.([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])){1}|([a-zA-Z]+[\w\-]+\.)+[a-zA-Z]{2,4})$/,
	
	/**
	 * @description 유효성 검증
	 * @param sValue 검증할 메일주소
	 */
	_isValid : function(sValue) {
		if(this.rx.test(sValue)) {
			return true;
		} else {
			return false;
		}
	},	
	
 	/**
	 * @description 유효문자로 변경
	 * @param sValue 검증할 메일주소
	 */
	_getCorrectedValue : function(sValue){
		sValue = sValue.replace(/[^\w\.\@]/g,"").replace(/\.{2,}/g,".");
		var aEmail = sValue.split("@");
		if(aEmail.length > 2) {
			sValue = aEmail.shift() + "@" + aEmail.join("");
		}
		return sValue;
	}	
}).extend(jindo.m.Validator);/**
    @fileOverview  RequireValidator 플러그인 
    @author "sculove"
    @version 1.7.1
    @since  2011. 11. 23.
    
**/
/**
   RequireValidator 플러그인 

    @class jindo.m.RequireValidator
    @invisible
    @extends jindo.m.Validator
    @group Component
    @keyword Require, RequireValidator
**/
jindo.m.RequireValidator = jindo.$Class({
	/** @lends jindo.m.RequireValidator.prototype */
	/**
	 * @description 초기화 함수
	 * @constructs
	 */
	/**
	 * @description validate 한다.
	 * @return {HashTable}  {bValid, sPreValue, sType, sCorrectedValue}
	 */	
	validate : function(sValue) {
		sValue = jindo.$S(sValue).trim();
		var htResult = {
			bValid : false,
			sCorrectedValue : null
		};
		sValue != "" ? true : false;
		htResult.bValid = sValue;
		return htResult;
	}
}).extend(jindo.m.Validator);/**
    @fileOverview  TelValidator 플러그인 
    @author "sculove"
    @version 1.7.1
    @since  2011. 11. 23.
    
**/
/**
   TelValidator 플러그인 

    @class jindo.m.TelValidator
    @invisible
    @extends jindo.m.Validator
    @group Component
    @keyword tel, telvalidator
**/
jindo.m.TelValidator = jindo.$Class({
	/** @lends jindo.m.TelValidator.prototype */
	/**
	 * @description 초기화 함수
	 * @constructs
	 */
	rx : /^(\d{2,3})(\d{3,4})(\d{4})$/,
	
	_isValid : function(sValue) {
		sValue = sValue.replace(/[^\d]/g, "");
		if(this.rx.test(sValue)) {
			var nLength = sValue.length,
				bResult = false;
			if(sValue.charAt(0) === "0") {
				// 02-123-4567
				// 02-1234-5678
				// 01X-123-4567, 07X-123-4567, 지역번호-123-4567
				// 01X-1234-5678, 07X-1234-5678, 0505-123-4567, 지역번호-1234-5678
				if( (nLength === 9 && sValue.substring(0,2) === "02") || nLength === 10 || nLength === 11 ) {
					bResult = true;			
				}	
			}
			return bResult;
		} else {
			return false;
		}
	},
		
	/**
	 * @description 유효문자로 변경
	 * @param sValue 검증할 메일주소
	 */
	_getCorrectedValue : function(sValue,sFormat){
		sValue = sValue.replace(/[^\d]/g, "");
		sValue = (sValue.length > 11 ? sValue.substr(0,11) : sValue);
		return this._applyFormat(sValue, sFormat);
	},
	
	/**
	 * @description 포맷을 적용함
	 */
	_applyFormat : function(sValue, sFormat) {
		sFormat = sFormat || "-";
		var nLength = sValue.length;
		if(sValue.charAt(0) === "0") {
			if(nLength === 9 && sValue.substring(0,2) === "02") {
				// 02-123-4567
				sValue = sValue.substr(0,2) + sFormat + sValue.substr(2,3) +  sFormat + sValue.substr(5,4);
			} else if(nLength === 10) {
				if(sValue.substr(0,2) === "02") {
					// 02-1234-5678
					sValue = sValue.substr(0,2) + sFormat + sValue.substr(2,4) +  sFormat + sValue.substr(6,4);		
				} else {
					// 01X-123-4567, 07X-123-4567,  지역번호-123-4567
					sValue = sValue.substr(0,3) + sFormat + sValue.substr(3,3) +  sFormat + sValue.substr(6,4);			
				}
			} else if(nLength === 11) {
				// 01X-1234-5678, 07X-1234-5678, 0505-123-4567, 지역번호-1234-5678
				if(sValue.substr(0,4) === "0505") {
					sValue = sValue.substr(0,4) + sFormat + sValue.substr(4,3) +  sFormat + sValue.substr(7,4);
				} else {
					sValue = sValue.substr(0,3) + sFormat + sValue.substr(3,4) +  sFormat + sValue.substr(7,4);
				}
			}	
		}		
		return sValue;
	}	
}).extend(jindo.m.Validator);/**
    @fileOverview  UrlValidator 플러그인 
    @author "sculove"
    @version 1.7.1
    @since  2011. 11. 23.
    
**/
/**
   UrlValidator 플러그인 

    @class jindo.m.UrlValidator
    @invisible
    @extends jindo.m.Validator
    @group Component
    @keyword url, urlvalidator
**/
jindo.m.UrlValidator = jindo.$Class({
	/** @lends jindo.m.UrlValidator.prototype */
	/**
	 * @description 초기화 함수
	 * @constructs
	 */
	rx : /(^(http:\/\/)|^(https:\/\/)|(^[A-Za-z0-9\.\-]+))+([A-Za-z0-9\.\-])*(\.[A-Za-z]{2,}(\/([A-Za-z0-9\.\-])*)*)$/,

	/*
	 * @description 유효성 검증
	 * @param sValue 검증할 메일주소
	 */
	_isValid : function(sValue, sFormat) {
		if(this.rx.test(sValue)) {
			return true;
		} else {
			return false;
		}
	},	
	
	/* @description 유효문자로 변경
	 * @param sValue 검증할 메일주소
	 */
	_getCorrectedValue : function(sValue){
		return sValue.replace(/[^A-Za-z0-9-\?&\.\:\/]/g,"").replace(/\.{2,}/g,"").replace(/\?{2,}/g,"").replace(/&{2,}/g,"").replace(/\:{3,}/g,"");
	}	
}).extend(jindo.m.Validator);/**
	@fileOverview 모바일 전용 아코디언
	@version 1.7.1
	@since 2011. 7. 13.
**/
/**
	제목탭과 내용탭이 쌍으로 펼쳐지고 접혀지는 컴포넌트

	@class jindo.m.Accordion
	@extends jindo.m.UIComponent
	@use jindo.m.Transition
	@keyword accordion, accordian, 아코디언
	@group Component

	@history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
	@history 1.1.0 Support Android 3.0/4.0 지원 갤럭시<br />jindo 2.0.0 mobile 버전 지원
	@history 0.9.0 Release 최초 릴리즈
**/

jindo.m.Accordion = jindo.$Class({
	/* @lends jindo.m.Accordion.prototype */
	/**
		초기화 함수

		@constructor
		@param {String|HTMLElement} el Accordion 컴포넌트를 적용한 레이어의 id 혹은 HTMLElement
		@param {Object} [htOption] 초기화 옵션 객체
			@param {String} [htOption.sClassPrefix='accordion-'] 초기 HTML/CSS구조에서 필요한 className 앞에 붙는 prefix를 정의
			@param {String} [htOption.sDirection='vertical'] Accordion이 펼쳐질 방향
				<ul>
				<li>vertical : 세로</li>
				<li>horizontal : 가로</li>
				</ul>
			@param {Number} [htOption.nDefalutIndex=-1] 디폴트로 확장될 인덱스, 선언하지 않을시 확장하지 않음
			@param {Boolean} [htOption.bUseToggle=false] Header에 클릭발생시 Block의 확장(Expand)/축소(Collapse) 토글여부
			@param {String} [htOption.sTransitionTimingFunction=ease] Block의 확장(Expand)/축소(Collapse) Effect효과
				<ul>
				<li>ease : 속도가 급가속되다가 급감속되는 효과 (거의 끝에서 급감속됨)</li>
				<li>linear : 등속효과</li>
				<li>ease-in : 속도가 점점 빨라지는 가속 효과</li>
				<li>ease-out : 속도가 천천히 줄어드는 감속효과</li>
				<li>ease-in-out : 속도가 천천히 가속되다가 천천히 감속되는 효과 (가속과 감속이 부드럽게 전환됨)</li>
				</ul>
			@param {Number} [htOption.nDuration=500] Block의 확장(Expand)/축소(Collapse) Effect처리 지속시간
	**/
	$init : function(el,htOption) {
		var htDefaultOption = {
			bActivateOnload : true,
			sClassPrefix : 'accordion-',
			sDirection : 'vertical',
			nDefalutIndex :  -1,
			bUseToggle : false,
			sTransitionTimingFunction : "ease",
			nDuration : 500
		};
		this.option(htDefaultOption);
		this.option(htOption || {});

		this._initVar(el);

		this._setWrapperElement();
		if(this.option("bActivateOnload")) {
			this.activate();
		}

		this._setSize();
		this._setDefaultExpand();
	},

	/**
		변수 초기화 함수
		인스턴스 변수를 초기화한다.

		@param {String|HTMLElement} el Accordion 컴포넌트를 적용한 레이어의 id 혹은 HTMLElement
	**/
	_initVar : function(el) {
		this._elContainer = (typeof el == "string") ? jindo.$(el) : el;
		this._aAccordionBlock = jindo.$$("." + this.option("sClassPrefix") + "block", this._elContainer);

		var htInfo = jindo.m.getDeviceInfo();
		var nVersion = parseFloat(htInfo.version,10);
		if(htInfo.android && (nVersion <3) ){
			var elDummyTag = jindo.$$.getSingle("._accordion_dummy_atag_", this._elContainer);
			if(!elDummyTag){
				elDummyTag = jindo.$("<a href='javascript:void(0);' class='_accordion_dummy_atag_'></a>");
				elDummyTag.style.position = "absolute";
				elDummyTag.style.left = "-1000px";
				elDummyTag.style.top = "-1000px";
				elDummyTag.style.width = 0;
				elDummyTag.style.height = 0;
				jindo.$Element(this._elContainer).append(elDummyTag);
			}
		}

		this._nExpand = -1;
		this._wfTransitionEnd = jindo.$Fn(this._onTransitionEnd, this).bind();
	},

	/**
		jindo.m.Accordion 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
	**/
	_setWrapperElement : function() {

	},

	/**
		jindo.m.Accordion 컴포넌트를 활성화한다.
		activate 실행시 호출됨
	**/
	_onActivate : function() {
		this._attachEvent();
	},

	/**
		jindo.m.Accordion 컴포넌트를 비활성화한다.
		deactivate 실행시 호출됨
	**/
	_onDeactivate : function() {
		this._detachEvent();
	},

	/**
		jindo.m.Accordion 에서 사용하는 모든 이벤트를 바인드한다.
	**/
	_attachEvent : function() {
		this._htEvent = {};

		jindo.$A(this._aAccordionBlock).forEach(function(el, index, array){
			this._htEvent["click_" + index] = {
				ref : jindo.$Fn(this._onClick, this).attach(this.getHandler(index), "click"),
				el	: this.getHandler(index)
			};
		}, this);
	},

	/**
		특정 이벤트를 해제한다.

		@param {String} sEventKey 이벤트 키
	**/
	_detachEvent : function(sEventKey) {
		if(sEventKey) {
			var htTargetEvent = this._htEvent[sEventKey];
			htTargetEvent.ref.detach(htTargetEvent.el, sEventKey.substring(0, sEventKey.indexOf("_")));
		}
	},

	/**
		jindo.m.Accordion 에서 사용하는 모든 이벤트를 해제한다.
	**/
	_detachEventAll : function() {
		for(var p in this._htEvent) {
			this._detachEvent(p);
		}

		this._htEvent = null;
	},

	/**
		아코디언 핸들클릭시 이벤트 핸들러

		@param {jindo.$Event} we 랩핑된 이벤트객체
		@ignore
	**/
	_onClick : function(we){
		we.stop();
		var elBlock = this._getBlock(we.element);
		var nIndex = (elBlock) ? jindo.$A(this._aAccordionBlock).indexOf(elBlock) : null;

		var nCurrentIndex = this.getExpandIndex();
		var bUseToggle = this.option("bUseToggle");
		if(typeof nIndex == 'number'){
			if(nIndex == nCurrentIndex) {
				if(bUseToggle) {
					this.collapse(nCurrentIndex);
					this._nExpand = -1;
				}
			} else {
				this.expand(nIndex);
				if(nCurrentIndex > -1) {
					this.collapse(nCurrentIndex);
				}
			}
		}
	},

	/**
	 * 아코디언 블럭의 각 사이즈 정보세팅함수
	 */
	_setSize : function() {
		this._htBlockSize = {};
		var nHeaderSize, nBodySize;
		jindo.$A(this._aAccordionBlock).forEach(function(el, index, array){
			nHeaderSize = this._getHeaderSize(index);
			nBodySize = this._getBodySize(index);
			this._htBlockSize[index] = {
				nHeaderSize : nHeaderSize,
				nBodySize : nBodySize
			};

			if(this.option("sDirection") == "vertical") {
				jindo.$Element(el).height(nHeaderSize);
			} else {
				jindo.$Element(el).width(nHeaderSize);
			}
		}, this);
	},

	/**
		아코디언 블럭의 헤더 사이즈 반환함수

		param {Number} nIndex 아코디언 블럭의 인덱스
		@return {Number} 아코디언 nIndex번째 블럭의 헤더 사이즈
	**/
	_getHeaderSize : function(nIndex) {
		var welHead = jindo.$Element(this.getHead(nIndex));
		var nHeaderSize = (this.option("sDirection") == "vertical") ? welHead.height() : welHead.width();
		return nHeaderSize;
	},

	/**
		아코디언 블럭의 바디 사이즈 반환함수

		param {Number} nIndex 아코디언 블럭의 인덱스
		@return {Number} 아코디언 nIndex번째 블럭의 바디 사이즈
	**/
	_getBodySize : function(nIndex) {
		var welBody = jindo.$Element(this.getBody(nIndex));
		var nBodySize = (this.option("sDirection") == "vertical") ? welBody.height() : welBody.width();
		return nBodySize;
	},

	/**
		아코디언 블럭의 전체 사이즈(header + body) 반환함수

		@param {Number} nIndex 아코디언 블럭의 인덱스
		@return {Number} 아코디언 nIndex번째 블럭의 사이즈
	**/
	_getSize : function(nIndex) {
		if(!this._htBlockSize || !this._htBlockSize[nIndex]) {
			this._setSize();
		}
		var nSize = this._htBlockSize[nIndex]["nHeaderSize"] + this._htBlockSize[nIndex]["nBodySize"];
		return nSize;
	},

	/**
		 디폴트로 Expnad할 블럭 처리함수
	**/
	_setDefaultExpand : function() {
		var nDefaultIndex = this.option("nDefalutIndex");
		if(nDefaultIndex > -1) {
			setTimeout(jindo.$Fn(function() {
				this.expand(nDefaultIndex);
			}, this).bind(),100);
		}
	},

	/**
		아코디언 블럭의 헤더 반환함수

		@method getHead
		@param {Number} nIndex 아코디언 블럭의 인덱스
		@return {HTMLElement} 아코디언 블럭의 header 엘리먼트
	**/
	getHead : function(nIndex){
		return jindo.$$.getSingle('dt', this._aAccordionBlock[nIndex]);
	},

	/**
		아코디언 블럭의 바디 반환함수

		@method getBody
		@param {Number} nIndex 아코디언 블럭의 인덱스
		@return {HTMLElement} 아코디언 블럭의 body 엘리먼트
	**/
	getBody : function(nIndex){
		return jindo.$$.getSingle('dd', this._aAccordionBlock[nIndex]);
	},

	/**
		아코디언 블럭 반환함수

		@param {HTMLElement} el 아코디언 블럭의 핸들 엘리먼트
		@return {jindo.$Element} 랩핑된 엘리먼트 객체
	**/
	_getBlock : function(el){
		var sClassPrefix = this.option("sClassPrefix") +"block";
		//return jindo.$Element(el).hasClass('.'+sClassPrefix)? el: jindo.$$.getSingle("! ." + sClassPrefix, el);

		//var elBlock = this._getClosest(sClassPrefix, el);
		var elBlock = jindo.m.getClosest(sClassPrefix, el);
		return elBlock;
	},

	/**
		아코디언 블럭의 핸들러 반환함수

		@method getHandler
		@param {Number} nIndex 아코디언 블럭의 인덱스
		@return {HTMLElement} 아코디언 블럭의 핸들러 엘리먼트
	**/
	getHandler : function(nIndex){
		var elHead = this.getHead(nIndex);
		return jindo.$$.getSingle('.'+this.option('sClassPrefix')+'handler', elHead) || elHead;
	},

	/**
		현재 Expand되어 있는 아코디언 블럭의 Index 반환함수

		@method getExpandIndex
		@return {Number} 아코디언 블럭의 Index(전체가 collapse되어있는 경우 -1을 반환한다.)
	**/
	getExpandIndex : function(){
		return this._nExpand;
	},

	/**
		아코디언 블럭 Expand 처리함수

		@method expand
		@param {Number} nIndex 아코디언 블럭의 인덱스
	**/
	expand : function(nIndex){
		this._elBlock = this._aAccordionBlock[nIndex];
		if(typeof this._elBlock == 'undefined'){ return;}
		/**
			Block이 확장(Expand)되기 전에 발생

			@event beforeExpand
			@param {String} sType 커스텀 이벤트명
			@param {Number} nBeforeIndex  기존에 확장(Expand)되어있는 Block의 인덱스 <br />- 모두 축소(Collapse)된 상태라면 -1 반환
			@param {Number} nIndex  확장(Expand)처리할 Block의 인덱스
			@param {HTMLElement} elBlock 확장(Expand)처리할 Block 엘리먼트
			@param {Function} stop 수행시 Block이 확장(Expand)되지 않음
		**/
		if(!this.fireEvent("beforeExpand", {
			sType : "beforeExpand",
			elBlock : this._elBlock,
			nBeforeIndex : this._nExpand,
			nIndex : nIndex
		})){ return; }

		this._setTransition(this._elBlock, this._getSize(nIndex));
		this._nExpand = nIndex;
		/**
			Block이 확장(Expand)된 후에 발생

			@event expand
			@param {String} sType 커스텀 이벤트명
			@param {Number} nIndex 확장(Expand)처리한 Block의 인덱스
			@param {HTMLElement} elBlock 확장(Expand)처리한 Block 엘리먼트
			@param {Function} stop 수행시 Block이 확장(Expand)되지 않음
		**/
		this.fireEvent("expand", {
			sType : "expand",
			elBlock : this._elBlock,
			nIndex : nIndex
		});
	},

	/**
		아코디언 블럭 collapse 처리함수

		@method collapse
		@param {Number} nIndex 아코디언 블럭의 인덱스
	**/
	collapse : function(nIndex){
		this._elBlock = this._aAccordionBlock[nIndex];
		if(typeof this._elBlock == 'undefined'){ return;}

		/**
			Block이 축소(Collapse)되기 전에 발생

			@event beforeCollapse
			@param {String} sType 커스텀 이벤트명
			@param {Number} nIndex 축소(Collapse)처리할 Block의 인덱스
			@param {HTMLElement} elBlock 축소(Collapse)처리할 Block 엘리먼트
			@param {Function} stop 수행시 Block이 축소(Collapse)되지 않음
		**/
		if(!this.fireEvent("beforeCollapse", {
			sType : "beforeCollapse",
			elBlock : this._elBlock,
			nIndex : nIndex
		})){ return; }

		this._setTransition(this._elBlock, this._getHeaderSize(nIndex));
		if(this._nExpand == nIndex) { this._nExpand = -1; }

		/**
			Block이 축소(Collapse)된 후에 발생

			@event collapse
			@param {String} sType 커스텀 이벤트명
			@param {Number} nIndex 축소(Collapse)처리한 Block의 인덱스
			@param {HTMLElement} elBlock 축소(Collapse)처리한 Block 엘리먼트
			@param {Function} stop 수행시 Block이 축소(Collapse)되지 않음
		**/
		this.fireEvent("collapse", {
			sType : "collapse",
			elBlock : this._elBlock,
			nIndex : nIndex
		});
	},

	/**
		전체 Collapse 처리함수

		@method collapseAll
	**/
	collapseAll  : function(){
		var nIndex = this.getExpandIndex();

		if(nIndex > -1){
			this.collapse(nIndex);
		}

		this._nExpand = -1;
	},

	/**
		Effect 설정함수

		@method setEffect
		@param {Object} htEffect 이펙트 옵션
			@param {String} htEffect.sTransitionTimingFunction Effect Type (ease|linear|ease-in|ease-out|ease-in-out)
			@param {Number} htEffect.nDuration Effect 처리시간(단위 ms)
	**/
	setEffect : function(htEffect) {
		if(htEffect.sTransitionTimingFunction && (htEffect.sTransitionTimingFunction == "ease" || htEffect.sTransitionTimingFunction == "linear" || htEffect.sTransitionTimingFunction == "ease-in" || htEffect.sTransitionTimingFunction == "ease-out" || htEffect.sTransitionTimingFunction == "ease-in-out")) {
			this.option("sTransitionTimingFunction", htEffect.sTransitionTimingFunction);
		}

		if(htEffect.nDuration && htEffect.nDuration > 0) {
			this.option("nDuration", htEffect.nDuration);
		}
	},

	/**
		아코디언 블럭의 Expand/Collapse 처리시 Effect 처리함수

		@param {HTMLElement} elBlock 아코디언 블럭 엘리먼트
		@param {Number} nBlockSize 아코디언 블럭 사이즈
		@param {String} sTransitionTimingFunction Effect Type (ease|linear|ease-in|ease-out|ease-in-out)
		@param {Number} nDuration Effect 처리시간(단위 ms)
	**/
	_setTransition : function(elBlock, nBlockSize, sTransitionTimingFunction, nDuration){
		sTransitionTimingFunction = sTransitionTimingFunction || this.option("sTransitionTimingFunction");
		nDuration = nDuration || this.option("nDuration");

		if(nDuration > 0){
			this._attachTransitionEnd(elBlock);
		}

		var sTransition = "";
		var sDirection = this.option("sDirection");
		elBlock.style.webkitTransition = "";
		elBlock.style.mozTransition = "";

		if(sDirection === "vertical") {
			sTransition  = "height " + nDuration + "ms " + sTransitionTimingFunction;
			elBlock.style.webkitTransition = sTransition;
			elBlock.style.mozTransition = sTransition;
			elBlock.style.height = nBlockSize + "px";
		} else if(sDirection === "horizontal") {
			sTransition  = "width " + nDuration + "ms " + sTransitionTimingFunction;
			elBlock.style.webkitTransition = sTransition;
			elBlock.style.mozTransition = sTransition;
			elBlock.style.width = nBlockSize + "px";
		}

		if(nDuration === 0) {
			this._onTransitionEnd({srcElement: elBlock});
		}
	},

	/**
		아코디언 블럭의 Expand/Collapse 처리시 Effect 처리 종료함수
	**/
	_attachTransitionEnd : function(elBlock){
		this._elTransition = elBlock;
		this._elTransition.addEventListener('webkitTransitionEnd', this._wfTransitionEnd, false);
	},

	/**
	 * Effect 처리와 관련된 이벤트 해제 처리함수
	 */
	_detachTransitionEnd : function(el){
		el.removeEventListener('webkitTransitionEnd', this._wfTransitionEnd, false);
		this._elTransition = null;

	},

	/**
	 * TransitionEnd 이벤트 핸들러
	 */
	_onTransitionEnd : function(evt){

		//리랜더링을 하게 끔..
		var elDummyTag = jindo.$$.getSingle("._accordion_dummy_atag_", this._elContainer);
		if(elDummyTag){
			elDummyTag.focus();
		}

		this._detachTransitionEnd(evt.srcElement);

	},

	/**
		객체를 release 시킨다.

		@method destroy
	**/
	destroy : function() {
		this._detachEventAll();

		this._elContainer = null;
		this._aAccordionBlock = null;
		this._elBlock = null;
		this._htBlockSize = null;
		this._nExpand = null;
	}
}).extend(jindo.m.UIComponent);
/**
	@fileOverview 페이지 이동 없이 동적으로 화면 UI를 구성할 경우 페이지 이동을 인식시켜서 앞으로/뒤로가기 버튼을 사용할 수 있는 컴포넌트
	@author "oyang2"
	@version 1.7.1
	@since 2011. 9. 20.
**/
/**
	페이지 이동 없이 동적으로 화면 UI를 구성할 경우 페이지 이동을 인식시켜서 앞으로/뒤로가기 버튼을 사용할 수 있는 컴포넌트

	@class jindo.m.AjaxHistory
	@extends jindo.m.Component
	@keyword ajax, history, 히스토리, hash, 해쉬, 해시, pushState
	@group Component

	@history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
	@history 1.1.0 Support Android 3.0/4.0 지원 갤럭시<br />jindo 2.0.0 mobile 버전 지원
	@history 1.1.0 Update [bUseHash] Option 추가
	@history 0.9.0 Release 최초 릴리즈
**/
jindo.m.AjaxHistory = jindo.$Class({
	/* @lends jindo.m.AjaxHistory.prototype */
	/**
		hashchange 이벤트 사용여부
		@type {Boolean}
	**/
	bHashEvent : false,
	/**
		pushState 이벤트 사용여부
		@type {Boolean}
	**/
	bPushState : false,
	/**
		setInterval()의 리턴 값
		@type {Number}
	**/
	_nIntervalId : 0,
	/**
		히스토리 데이터 저장 객체
		@type {Object}
	**/
	_htLastState : {},

	/**
		초기화 함수

		@constructor
		@param {Object} [htOption] 추가 옵션 (생략가능)
			@param {Number} [htOption.nCheckInterval=100] 'onhashchange','popstate' 이벤트가 발생하지 않는 브라우저에서 location.hash의 변경을 체크할 주기
			@param {Boolean} [htOption.bUseHash=false] 'pushState', 'replaceState' 지원하는 브라우저에서도 무조건 해시값 변경을 통해 ajaxhistory를 사용하고 싶을 경우 true로 설정한다.
		@example
			var oAjaxHistoryInstance;

			oAjaxHistoryInstance = new jindo.m.AjaxHistory({	 *
			nCheckInterval : 100, // setInterval()을 이용하여 로케이션 변경을 체크 시, 체크 주기
			bUseHash :  false //무조건 해시값을 사용할지 여부
			}).attach({
					//초기 load 이벤트에는 addHistory의 두번째 인자로 true값을 설정함
					'load' : function(){
						oAjaxHistoryInstance.addHistory({
							"sPageNumber" : "1",
							"aParameter" : [1,2,3]
						}, true);
					},
					'change' : function(oCustomEvt){
						oAjaxHistoryInstance.addHistory({
							"sPageNumber" : "2",
							"aParameter" : [4,5,6]
						});
					}
			});
			oAjaxHistoryInstance.initialize(); //초기화
	**/

	$init : function(htOption) {
		this.option({
			nCheckInterval : 100,
			bUseHash : false //
		});
		this.option(htOption || {});
	},

	/**
		컴포넌트 초기화 후에, 로케이션 변경 체크 및 초기 이벤트 발생을 위한 초기화 함수

		@method initialize
		@return {this}
	**/
	initialize : function(){
		this._initVar();
		this._attachEvent();
		var sHash = this._getHash();

		if(sHash){
			this._htLastState = this._getDecodedData(sHash);
			/**
				사용자가 앞으로/뒤로가기 버튼을 눌러 이동을 하거나 히스토리 데이터가 포함된 URL을 이용하여 접근시 발생한다.

				@event change
				@param {String} sType 커스텀이벤트명
				@param bLoad (Boolean) : 초기 로드된 페이지에 해시 정보가 있을 경우 true
					@history 1.4.0 Update change 커스텀 이벤트에 bLoad 속성 추가
				@param htHistoryData (HashTable) : 현재 페이지의 히스토리 데이터
				@example
					oAjaxHistoryInstance.attach("change", function(oCustomEvent){
						//htHistoryData의 데이터를 바탕으로 화면 UI를 재구성한다
						showPage(oCustomEvent.htHistoryData.nPage);
					});
			*/
			this.fireEvent("change", {
				bLoad: true,
				htHistoryData : this._htLastState
			});
		}else{
			/**
				페이지가 처음 로딩시에 발생되는 이벤트
				@remark 페이지 처음 로딩시에 location.hash 값에 다른 히스토리데이터가 있을 경우 load 대신에 change 이벤트가 발생한다.

				@event load
				@param {String} sType 커스텀이벤트명
				@example
					oAjaxHistoryInstance.attach("load", function(oCustomEvent){
						 //초기 로딩시에 초기 UI구성을 위한 작업을 수행.
					});
			*/
			this.fireEvent('load');
		}

		return this;
	},

	/**
		jindo.m.AjaxHistory 에서 사용하는 모든 인스턴스 변수를 초기화한다.

		@method _initVar
		@private
	**/
	_initVar: function() {
		var htInfo = jindo.m.getDeviceInfo();

		this.bHashEvent = 'onhashchange' in window;
		/*ios4.2 버전에서 pusthState, replaceState는 지원이 되지만 버그가 있기 때문에 사용하지 않는다 */
		this.bPushState = (typeof window.history !== 'undefined')&& (typeof window.history.pushState !== 'undefined') && (typeof window.history.replaceState !== 'undefined') && !((htInfo.iphone || htInfo.ipad)&& (parseFloat(htInfo.version,10) < 4.3));

		this._nIntervalId = 0;
		this._oAgent = jindo.$Agent().navigator();

		this._bAndroid =  htInfo.android;

		if(this.option('bUseHash')){
			this.bPushState = false;
		}
	},

	/**
		jindo.m.AjaxHistory 에서 사용하는 모든 이벤트를 바인드한다.

		@method _attachEvent
		@private
	**/
	_attachEvent : function() {
		this._htEvent = {};

		if(this.bPushState){
			this._htEvent['popstate'] ={
				ref : jindo.$Fn(this._onPopState, this).attach(window,'popstate'),
				el : window
			};
		}else if(this.bHashEvent){
			//hashchange event supports
			this._htEvent["hashchange"] = {
				ref : jindo.$Fn(this._onHashChange, this).attach(window, "hashchange"),
				el	: window
			};
		}else{
			//ios3.x bug fix
			clearInterval(this._nIntervalId);
			this._nIntervalId = setInterval(jindo.$Fn(this._onHashChange, this).bind(), this.option("nCheckInterval"));
		}
	},

	/**
		@method _onPopState
		@private
	**/
	_onPopState : function(event){
		var state = event.$value().state;
		if(state){
			var htData = this._cloneObject(state);

			if(!this._compareData(htData, this._htLastState)){
				this._htLastState = htData;
				this._onChange();
			}
		}
	},
	/**
		@method _onHashChange
		@private
	**/
	_onHashChange : function(){
		var htData = this._getDecodedData(this._getHash());
		if(!this._compareData(htData, this._htLastState)){
			this._htLastState = htData;
			this._onChange();
		}
	},
	/**
		@method _onChange
		@private
	**/
	_onChange : function(){
		// change 이벤트 발생
		this.fireEvent("change", {
			bLoad: false,
			htHistoryData : this._htLastState
		});
	},

	/**
		htData 브라우저의 히스토리에 추가

		@method addHistory
		@param {Object} htData 추가할 히스토리 데이터 객체
		@param {Boolean} bLoad 초기 load 인지 여부
	**/
	addHistory : function(htData, bLoad){
		if(typeof bLoad === 'undefined'){
			bLoad = false;
		}
		if(htData && typeof(htData) == "object" && jindo.$H(htData).length() > 0){
			var sNewHash = this._cloneObject(htData);
			//2012-04-01 이전hash값과 똑같은 값이 들어올 경우 처리하지 않는다.
			if(this._compareData(sNewHash, this._htLastState)){
				return;
			}
			this._htLastState = sNewHash;

			var sHash = this._getEncodedData(this._htLastState);
			if(this.bPushState){
				if(bLoad){
					this._replaceState(this._htLastState);
				}else{
					this._pushState(this._htLastState);
				}
			}else{
				var self = this;
				if(this._bAndroid ){
					setTimeout(function(){
						self._setHash(sHash);
					},0);
				}else{
					this._setHash(sHash);
				}
			}
		}
	},
	/**
		@method _replaceState
		@private
	**/
	_replaceState : function(htData){
		history.replaceState( htData, document.title, location.href );
	},
	/**
		@method _pushState
		@private
	**/
	_pushState : function(htData){
		history.pushState(htData, document.title, location.href);
	},

	/**
		@method _setHash
		@private
	**/
	_setHash : function(sHash){
		location.hash = sHash;
	},

	/**
		두 데이터 객체를 비교하여 결과를 리턴
		- 하위 데이터가 Object나 Array일 경우, 재귀적으로 비교

		@param {Object} htBase 비교 기준 객체
		@param {Object} htComparison 비교 객체
		@param {Boolean} 비교 결과
	**/

	/**
		@method _compareData
		@private
	**/
	_compareData : function(htBase, htComparison){
		if(htBase && htComparison){
			if(jindo.$H(htBase).length() == jindo.$H(htComparison).length()){
				for(var x in htBase){
					if(typeof(htBase[x]) == "object"){
						if(!arguments.callee(htBase[x], htComparison[x])){
							return false;
						}
					}else{
						if(htBase[x] != htComparison[x]){
							return false;
						}
					}
				}

				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	},

	/**
		htHistoryData 객체를 Json 문자열로 변환 후, 인코딩하여 리턴
		- JSON.stringify() 함수를 브라우저에서 지원할 경우, 해당 함수 사용
		- 위의 함수를 지원하지 않을 경우, jindo.$Json().toString() 함수 사용

		@param {Object} htHistoryData 히스토리 데이터 객체
		@return {String} Json 문자열로 변환 후, 인코딩한 문자열
	**/

	/**
		@method _getEncodedData
		@private
	**/
	_getEncodedData : function(htHistoryData){
		if(htHistoryData){
			// JSON.stringify() 함수를 지원하는 경우
			if(typeof(JSON) == "object" && typeof(JSON.stringify) == "function"){
				return encodeURIComponent(JSON.stringify(htHistoryData));
			}else{
				return encodeURIComponent(jindo.$Json(htHistoryData).toString());
			}
		}else{
			return "";
		}
	},

	/**
		인코딩된 히스토리 데이터를 HashTable 객체로 변환 후, 리턴
		- JSON.parse() 함수를 브라우저에서 지원할 경우, 해당 함수 사용
		- 위의 함수를 지원하지 않을 경우, jindo.$Json().toObject() 함수 사용

		@param {String} sEncodedHash 인코딩된 히스토리 데이터
		@return {Object} 디코딩 후, HashTable로 변환한 객체
	**/
	_getDecodedData : function(sEncodedHash){
		try {
			if(sEncodedHash){
				var sHashString = decodeURIComponent(sEncodedHash);
				// JSON.parse() 함수를 지원하는 경우
				if(typeof(JSON) == "object" && typeof(JSON.parse) == "function"){
					return JSON.parse(sHashString);
				}else{
					return jindo.$Json(sHashString).toObject();
				}
			}
		} catch (e) {}
		return {};
	},

	/**
		@method _cloneObject
		@private
	**/
	_cloneObject : function(htObj){
		var hash, newHash;

		if(htObj){
			hash = jindo.$Json(htObj).toString();
			newHash = jindo.$Json(hash).toObject();
		}else{
			newHash = {};
		}

		return newHash;
	},
	/**
		@method _getHash
		@private
	**/
	_getHash : function(){
		return this._oAgent.firefox ? encodeURIComponent(location.hash.substring(1)) : location.hash.substring(1);

	},


	/**
		jindo.m.AjaxHistory 에서 사용하는 모든 이벤트를 해제한다.

		@method _detachEvent
		@private
	**/
	_detachEvent : function() {
		for(var p in this._htEvent) {
			var htTargetEvent = this._htEvent[p];
			htTargetEvent.ref.detach(htTargetEvent.el, p);
		}

		this._htEvent = null;
	},


	/**
		jindo.m.AjaxHistory 에서 사용하는 모든 객체를 release 시킨다.

		@method destroy
	**/
	destroy: function() {
		this._detachEvent();

		clearInterval(this._nIntervalId);
		this._nIntervalId = null;
	}
}).extend(jindo.m.Component);/**
	@fileOverview 정년도/월의 달력을 지정한 엘리먼트에 표시하는 컴포넌트이다. 미리 지정해놓은 엘리먼트에 삽입되기 때문에 원하는 디자인과 마크업 구조를 적용할 수 있다
	@author sculove
	@version 1.7.1
	@since 2012. 05. 14.
**/
/**
	정년도/월의 달력을 지정한 엘리먼트에 표시하는 컴포넌트이다. 미리 지정해놓은 엘리먼트에 삽입되기 때문에 원하는 디자인과 마크업 구조를 적용할 수 있다

	@class jindo.m.Calendar
	@extends jindo.m.UIComponent
	@uses jindo.m.Transition
	@keyword calendar, 달력
	@group Component
	@invisible
**/
jindo.m.Calendar = jindo.$Class({
	/* @lends jindo.m.Calendar.prototype */
	/**
		초기화 함수

		@constructor
		@param {String|HTMLElement} el
		@param {Object} [htOption] 초기화 옵션 객체
			@param {Boolean} [htOption.bActivateOnload=true] 컴포넌트 로드시 activate 여부
			@param {String} [htOption.sClassPrefix='calendar-'] Class의 prefix명
			@param {Number} [htOption.nEffectDuration=200] fade-in/out Duration시간
			@param {String} [htOption.sTitleFormat='yyyy.mm'] className이 '[prefix]title' 인 엘리먼트를 찾아서 해당 형식대로 날짜를 출력한다. 다음의 형식을 사용할 수 있다.
			@param {Array} [htOption.aMonthTitle=[]] 월 이름
			@param {Object} [htOption.htToday] 오늘
	**/
	$init : function(el, htOption) {
		var oDate = new Date();
		this.option({
			bActivateOnload : true,
			sClassPrefix : "calendar-",
			bUseEffect : false,
			nEffectDuration : 200,
			sTitleFormat : "yyyy.mm", //달력의 제목부분에 표시될 형식
			aMonthTitle : ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"], //월 이름
			htToday : {nYear:oDate.getFullYear() , nMonth:oDate.getMonth() + 1 , nDate: oDate.getDate()}
		});
		this.option(htOption || {});
		this._initVar();
		this._setWrapperElement(el);
		if(this.option("bActivateOnload")) {
			this.activate();
		}
	},

	/**
		jindo.m.Calendar 에서 사용하는 모든 인스턴스 변수를 초기화한다.
	**/
	_initVar : function() {
		this._bVisible = false;
		this._oToday = this.option("htToday");
		this._oViewDate = null;
		this._nSelectDate = -1;
		this._sClassPrefix = this.option("sClassPrefix");
		this._aDayInfo = [];
		if(this.option("bUseEffect")) {
			this._oTransition = new jindo.m.Transition();
		}
	},

	/**
		jindo.m.Calendar 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
	**/
	_setWrapperElement : function(el) {
		this._htWElement = {};
		this._htWElement["calendarBase"] = jindo.$Element(el);
		this._htWElement["calendarBase"].css({
			"position" : "absolute",
			"display" : "none"
		});

		// 날짜 정보 추출
		var aTh = this._htWElement["calendarBase"].queryAll("th");
		for(var i=0, nLength=aTh.length; i<nLength; i++) {
			this._aDayInfo.push(jindo.$Element(aTh[i]).text());
		}
		this._htWElement["calendarTitle"] = jindo.$Element(this._htWElement["calendarBase"].query("." + this._sClassPrefix + "title"));
		this._htWElement["calendarTable"] = jindo.$Element(this._htWElement["calendarBase"].query("table"));
		this._htWElement["calendarTbody"] = jindo.$Element(this._htWElement["calendarTable"].query("tbody"));
		this._htWElement["yearPreBtn"] = jindo.$Element(this._htWElement["calendarBase"].query("." + this._sClassPrefix + "btn-prev-year"));
		this._htWElement["preBtn"] = jindo.$Element(this._htWElement["calendarBase"].query("." + this._sClassPrefix + "btn-prev-mon"));
		this._htWElement["yearNextBtn"] = jindo.$Element(this._htWElement["calendarBase"].query("." + this._sClassPrefix + "btn-next-year"));
		this._htWElement["nextBtn"] = jindo.$Element(this._htWElement["calendarBase"].query("." + this._sClassPrefix + "btn-next-mon"));
		this._htWElement["closeBtn"] = jindo.$Element(this._htWElement["calendarBase"].query("." + this._sClassPrefix + "btn-close"));
	},

	getCalendarBase : function() {
		return this._htWElement["calendarBase"];
	},

	/**
		jindo.m.Calendar 컴포넌트를 활성화한다.
		activate 실행시 호출됨
	**/
	_onActivate : function() {
		this._attachEvent();
	},
	/**
		jindo.m.Calendar 컴포넌트를 비활성화한다.
		deactivate 실행시 호출됨
	**/
	_onDeactivate : function() {
		this._detachEvent();
	},
	/**
		jindo.m.Calendar 에서 사용하는 모든 이벤트를 바인드한다.
	**/
	_attachEvent : function(){
		this._htEvent = {};
		// 이전 년도 버튼
		if(this._htWElement["yearPreBtn"]){
			this._htEvent["pre_year_click"] = {
					el  : this._htWElement["yearPreBtn"],
					ref : jindo.$Fn(this._onYearPre, this).attach(this._htWElement["yearPreBtn"], "click")
			};
		}
		// 이전 달 버튼
		if(this._htWElement["preBtn"]){
			this._htEvent["pre_click"] = {
					el  : this._htWElement["preBtn"],
					ref : jindo.$Fn(this._onPre, this).attach(this._htWElement["preBtn"], "click")
			};
		}
		// 다음 년도 버튼
		if(this._htWElement["yearNextBtn"]){
			this._htEvent["next_year_click"] = {
					el  : this._htWElement["yearNextBtn"],
					ref : jindo.$Fn(this._onYearNext, this).attach(this._htWElement["yearNextBtn"], "click")
			};
		}
		// 다음 달 버튼
		if(this._htWElement["nextBtn"]){
			this._htEvent["next_click"] = {
					el  : this._htWElement["nextBtn"],
					ref : jindo.$Fn(this._onNext, this).attach(this._htWElement["nextBtn"], "click")
			};
		}
		// 닫기 버튼.
		if(this._htWElement["closeBtn"]){
			this._htEvent["close_click"] = {
					el  : this._htWElement["closeBtn"],
					ref : jindo.$Fn(this._onClose, this).attach(this._htWElement["closeBtn"], "click")
			};
		}
		// 날짜 선택.
		this._htEvent["table_click"] = {
				el  : this._htWElement["calendarTable"],
				ref : jindo.$Fn(this._onDate, this).attach(this._htWElement["calendarTable"], "click")
		};
	},
	/**
		이전달 클릭시 처리
	**/
	_onPre : function(we){
		this._moveDate("pre");
		we.stop();
	},
	/**
		이전년도 클릭시 처리
	**/
	_onYearPre : function(we){
		this._moveDate("preYear");
		we.stop();
	},
	/**
		다음달 클릭시 처리
	**/
	_onNext : function(we){
		this._moveDate("next");
		we.stop();
	},
	/**
		다음년도 클릭시 처리
	**/
	_onYearNext : function(we){
		this._moveDate("nextYear");
		we.stop();
	},
	/**
		닫기 클릭시 처리.
	**/
	_onClose : function(we){
		this.hide();
		we.stop();
	},
	/**
		날짜 선택시 처리.
	**/
	_onDate : function(we){
		if(!this._bVisible) { return; }
		var wel = jindo.$Element(we.element),
			sCellDate = "";
		if(wel.$value().tagName != "td"){
			wel = wel.parent(function(v){
				return (v.$value().tagName.toLowerCase() == "td");
			})[0];
		}
		if(wel) {
			sCellDate = wel.attr("data-cal-date");
			if(sCellDate && sCellDate.length == 8){
				this._nSelectDate = sCellDate * 1;
				/**
					Calendar에서 일자를 선택 할 경우 발생합니다.

					@event selectDate
					@param {String} sType 커스텀이벤트명
					@param {Object} oSelectDate 선택 된 날짜 Date 정보 ex){nYear:2011 , nMonth:1, nDate:1}
				**/
				if(this.fireEvent("selectDate", {
					// nSelectDate : this._nSelectDate,
					oSelectDate : this.getSelectDate()
				})) {
					wel.addClass(this._sClassPrefix + 'selected');
					this.hide();
				}
			}
		}
		we.stopDefault();
		return false;
	},

	/**
		Calendar 월 이동 계산 처리
	**/
	_moveDate : function(sMode){
		if(!this._bVisible) { return; }
		var oOldDate = {
				nYear : this._oViewDate.nYear,
				nMonth : this._oViewDate.nMonth,
				nDate : this._oViewDate.nDate
			},
			oMoveDate = {
				nDate : this._oViewDate.nDate
			};
		switch(sMode) {
			case "pre" : oMoveDate.nYear = (oOldDate.nMonth == 1) ? oOldDate.nYear - 1 : oOldDate.nYear;
				oMoveDate.nMonth = (oOldDate.nMonth == 1) ? 12 : oOldDate.nMonth - 1;
				break;
			case "preYear" : oMoveDate.nYear = oOldDate.nYear - 1;
				oMoveDate.nMonth = oOldDate.nMonth;
				break;
			case "next" : oMoveDate.nYear = (oOldDate.nMonth == 12) ? oOldDate.nYear + 1 : oOldDate.nYear;
				oMoveDate.nMonth = (oOldDate.nMonth == 12) ? 1 : oOldDate.nMonth + 1;
				break;
			case "nextYear" : oMoveDate.nYear = oOldDate.nYear + 1;
				oMoveDate.nMonth = oOldDate.nMonth;
				break;
		}
		/**
			Calendar에서 현재 날짜에서 이전 달(년도) / 다음 달(년도)로 이동하기전 호출된다.

			@event beforeMoveDate
			@param {String} sType 커스텀이벤트명
			@param {Object} oOldDate 이동 하기전 날짜 Date 정보 ex){nYear:2011 , nMonth:1, nDate:1}
			@param {Object} oMoveDate 이동할 날짜 Date 정보 ex){nYear:2011 , nMonth:1, nDate:1}
		**/
		if(this.fireEvent("beforeMoveDate", {
				oOldDate :  oOldDate,
				oMoveDate : oMoveDate
			})) {
			this._drawCalendar(oMoveDate);
			/**
				Calendar에서 현재 날짜에서 이전 달(년도) / 다음 달(년도)로 이동할 경우 발생한다.

				@event moveDate
				@param {String} sType 커스텀이벤트명
				@param oOldDate {Objec} 이동 하기전 날짜 Date 정보 ex){nYear:2011 , nMonth:1, nDate:1}
				@param oMoveDate {Object} 이동할 날짜 Date 정보 ex){nYear:2011 , nMonth:1, nDate:1}
			**/
			this.fireEvent("moveDate", {
				oOldDate : oOldDate,
				oMoveDate : oMoveDate
			});
		}
	},

	/**
		jindo.m.Calendar 에서 사용하는 모든 이벤트를 해제한다.
	**/
	_detachEvent : function(){
		for(var p in this._htEvent) {
			var ht = this._htEvent[p];
			ht.ref.detach(ht.el, p.substring(p.lastIndexOf("_")+1));
		}
		this._htEvent = null;
	},

	/**
		Calendar 를 보여 준다.

		@method show
		@example
			oCalendar.show();
	**/
	show : function(oDrawDate, oSelectedDate){
		if(!oDrawDate){
			oDrawDate = this._oToday;
		}
		/**
			Calendar가 나타나기전 발생한다.

			@event beforeShowCalendar
			@param {String} sType 커스텀이벤트명
			@param {Object} oDrawDate그려질 날짜 Date 정보 ex){nYear:2011 , nMonth:1, nDate:1}
		**/
		if(this.fireEvent("beforeShowCalendar",{
				oDrawDate  : oDrawDate
			})) {
			this._nSelectDate = this._getDateNumber(oSelectedDate);
			// Calendar 생성.
			if(this._getDateNumber(oDrawDate, "YearMonth") != (this._oViewDate) ? this._getDateNumber(this._oViewDate, "YearMonth") : 0 ){
				this._drawCalendar(oDrawDate);
			} else {
				this._drawDayColor();
			}
			var self=this;

			this._htWElement["calendarBase"].show();
			if(this.option("bUseEffect")){
				this._htWElement["calendarBase"].opacity(0);
				this._oTransition.queue(this._htWElement["calendarBase"].$value(), this.option("nEffectDuration"), {
					htStyle : {
						opacity : 1
					},
					fCallback : function(){
						self._afterShow(oDrawDate);
					}
				});
				setTimeout(function() {
					self._oTransition.start();
				},10);
			} else {
				this._afterShow(oDrawDate);
			}
		}
	},
	_afterShow : function(oSelectDate) {
		this._htWElement["calendarBase"].css("zIndex", "1000");
		this._bVisible = true;
		/**
			Calendar가 나타날 경우 발생한다.

			@event showCalendar
			@param {String} sType 커스텀이벤트명
			@param {Object} oDrawDate 그려질 날짜 Date 정보 ex){nYear:2011 , nMonth:1, nDate:1}
		**/
		this.fireEvent("showCalendar",{
			oDrawDate : oSelectDate
		});
	},
	/**
		Calendar 를 숨긴다.

		@method hide
		@example
			oCalendar.hide();
	**/
	hide : function(){
		var oSelectDate = this.getSelectDate();
		/**
			Calendar가 사라지기 전 발생한다.

			@event beforeHideCalendar
			@param {String} sType 커스텀이벤트명
			@param {Object} oSelectDate 선택된 날짜 Date 정보 ex){nYear:2011 , nMonth:1, nDate:1}
		**/
		if(this.fireEvent("beforeHideCalendar",{
				"oSelectDate"  : oSelectDate
			})) {
			this._bVisible = false;
			// 이펙트 사용.
			if(this.option("bUseEffect")){
				var self=this;
				this._oTransition.queue(this._htWElement["calendarBase"].$value(), this.option("nEffectDuration"), {
					htStyle : {
						opacity : 0
					},
					fCallback : function(){
						self._afterHide(oSelectDate);
					}
				});
				self._oTransition.start();
			} else {
				this._afterHide(oSelectDate);
			}
		}
	},
	_afterHide : function(oSelectDate) {
		this._htWElement["calendarBase"].css("zIndex", "0").hide();
		/**
			Calendar가 사라질 경우 발생한다.

			@event hideCalendar
			@param {String} sType 커스텀이벤트명
			@param {Object} oSelectDate 선택된 날짜 Date 정보 ex){nYear:2011 , nMonth:1, nDate:1}
		**/
		this.fireEvent("hideCalendar",{
			"oSelectDate"  : oSelectDate
		});
	},
	/**
		Calendar 의 노출 여부를 반환.

		@method isVisible
		@return {boolean} Calendar 노출 여부.
		@example
			var bVisible = oCalendar.isVisible();	// bVisible true : 노출 false : 비노출
	**/
	isVisible : function(){
		return this._bVisible;
	},
	/**
		Calendar 의 선택 날짜를 반환.

		@method getSelectDate
		@return {Object} Calendar 선택 날짜 객체. {nYear:년도 , nMonth: 월, nDate: 날 }
		@example
			var htDate = oCalendar.getSelectDate();
			htDate.nYear; // 선택 년도
			htDate.nMonth; // 선택 월
			htDate.nDate; // 선택 날짜
	**/
	getSelectDate : function(){
		var sSelectDate, oSelectDate;
		if(this._nSelectDate && this._nSelectDate > 0){
			sSelectDate = this._nSelectDate + "";
			oSelectDate = {
				nYear : Number(sSelectDate.substr(0,4)),
				nMonth : Number(sSelectDate.substr(4,2)),
				nDate : Number(sSelectDate.substr(6,4))
			};
		}
		return oSelectDate;
	},
	/**
		Calendar Table을 그린다.
	**/
	_drawCalendar : function(oDrawDate){
		this._oViewDate = {
			nYear : oDrawDate.nYear,
			nMonth : oDrawDate.nMonth,
			nDate : oDrawDate.nDate
		};
		// if(this.fireEvent("beforeDraw",{
		// 	nYear : oDrawDate.nYear,
		// 	nMonth : oDrawDate.nMonth
		// })) {
			this._drawCalendarHeaderHtml();
			this._drawCalendarBodyHtml();
			this._drawDayColor();
			// this.fireEvent("afterDraw", {
			// 	nYear : oDrawDate.nYear,
			// 	nMonth : oDrawDate.nMonth
			// });
		// }
	},
	/**
		Calendar 현재 날짜 선택 날짜를 표시한다.
	**/
	_drawDayColor : function(){
		var nTodayDate = this._getDateNumber(this._oToday),
			nSelectDate = this._nSelectDate, // 선택한 날
			aCells = this._htWElement["calendarTbody"].queryAll('td');

		// 그려진 날짜를 비교하여 오늘 날짜와 선택 한날짜에 CSS 클래스 적용.
		for (var i = 0, nLength = aCells.length, welCell; i < nLength; i++) {
			welCell = jindo.$Element(aCells[i]);
			if( !welCell.hasClass(this._sClassPrefix + 'prev-mon') && !welCell.hasClass(this._sClassPrefix + 'next-mon') ) {
				var nDate = welCell.attr('data-cal-date') * 1;
				welCell[nTodayDate === nDate ? 'addClass' : 'removeClass'](this._sClassPrefix + 'today');
				welCell[(nSelectDate > -1 && nSelectDate === nDate) ? 'addClass' : 'removeClass'](this._sClassPrefix + 'selected');
				if(nTodayDate == nSelectDate) {
					welCell.removeClass(this._sClassPrefix + 'today');
				}
			}
		}
	},

	/**
		Calendar Header 부분을 구성 한다.
	**/
	_drawCalendarHeaderHtml : function() {
		var nYear = this._oViewDate.nYear,
			nMonth = this._oViewDate.nMonth;
		if (nMonth < 10) {
			nMonth = ("0" + (nMonth * 1)).toString();
		}
		if(this._htWElement["calendarTitle"]) {
			this._htWElement["calendarTitle"].text(this.option("sTitleFormat").replace(/yyyy/g, nYear).replace(/y/g, (nYear).toString().substr(2,2)).replace(/mm/g, nMonth).replace(/m/g, (nMonth * 1)).replace(/M/g, this.option("aMonthTitle")[nMonth-1]));
		}
	},

	/**
		Calendar 본체 부분을 구성 한다.
	**/
	_drawCalendarBodyHtml : function() {
		var aHTML = [],oDate, nFirstTime, nLastTime,
			bPaintLastDay = false,
			nNowTime, aClassName, nNowDate, nDay,bPrevMonth,bNextMonth;

		// 해당 월의 마지막 날
		oDate = new Date(this._oViewDate.nYear, this._oViewDate.nMonth, 0);
		nLastTime = oDate.getTime();
		// 해당 월의 첫날
		oDate = new Date(this._oViewDate.nYear, this._oViewDate.nMonth - 1, 1);
		nFirstTime = oDate.getTime();

		while (oDate.getDay() !== 0) {
			oDate.setDate(oDate.getDate() - 1);
		}

		while(!bPaintLastDay){
			aHTML.push('<tr>');
			for (var i = 0; i < 7; i++) {
				nNowTime = oDate.getTime();
				aClassName = [];
				nNowDate = '';
				nDay = oDate.getDay();
				bPrevMonth = false;
				bNextMonth = false;

				if (nNowTime < nFirstTime) {
					aClassName.push(this._sClassPrefix + 'prev-mon');
					bPrevMonth = true;
				}
				if (nLastTime < nNowTime) {
					aClassName.push(this._sClassPrefix + 'next-mon');
					bNextMonth = true;
				}
				if (nDay === 0) { aClassName.push(this._sClassPrefix + 'sun'); }
				if (nDay === 6) { aClassName.push(this._sClassPrefix + 'sat'); }
				nNowDate = oDate.getFullYear() * 10000 + (oDate.getMonth() + 1) * 100 + oDate.getDate();
				aHTML.push('<td class="' + aClassName.join(' ') + '" data-cal-date="' + nNowDate + '"><a href="javascript:void(0)" class="' + this._sClassPrefix + 'date">' + oDate.getDate() + '</a></td>');
				oDate.setDate(oDate.getDate() + 1);
				if (nLastTime === nNowTime) {
					bPaintLastDay = true;
				}
				// this.fireEvent("draw", {
				// 	bPrevMonth : bPrevMonth,
				// 	bNextMonth : bNextMonth,
				// 	// elDate :
				// 	// elDateContainer :
				// 	// sHTML :
				// 	nYear : oDate.getFullYear(),
				// 	nMonth : oDate.getMonth() + 1,
				// 	nDate : oDate.getDate()
				// });
			}
			aHTML.push('</tr>');
		}
		this._htWElement["calendarTbody"].html(aHTML.join(''));
	},

	/**
		연월일을 포함한 HashTable이 특정 두 날 사이에 존재하는지 확인한다.

		@method isBetween
		@param {Object} htDate 비교를 원하는 날
		@param {Object} htFrom 시작 날짜
		@param {Object} htTo 끝 날짜
		@return {Boolean}
		@example
			oCalendar.isBetween({nYear:2010, nMonth:5, nDate:12}, {nYear:2010, nMonth:1, nDate:1}, {nYear:2010, nMonth:12, nDate:31}); => true
	**/
	isBetween : function(htDate, htFrom, htTo) {
		if (this.getDateObject(htDate).getTime() > this.getDateObject(htTo).getTime() || this.getDateObject(htDate).getTime() < this.getDateObject(htFrom).getTime()) {
			return false;
		} else {
			return true;
		}
	},

	/**
		요일 정보를 반환한다.

		@method getDayName
		@param  {Number} nIdx 요일 인덱스 (0~6)
		@return {String}		요일명
	**/
	getDayName : function(nIdx) {
		return this._aDayInfo[nIdx];
	},

	/**
		Date 객체를 구한다.

		@method getDateObject
		@param {Object} htDate 날짜 객체
		@return {Date}
		@example
			jindo.Calendar.getDateObject({nYear:2010, nMonth:5, nDate:12});
			jindo.Calendar.getDateObject(2010, 5, 12); //연,월,일
	**/
	getDateObject : function(htDate) {
		if (arguments.length == 3) {
			return new Date(arguments[0], arguments[1] - 1, arguments[2]);
		}
		return new Date(htDate.nYear, htDate.nMonth - 1, htDate.nDate);
	},

	/**
		Date객체를 String으로 변경한다.

		@param {Object} htDate Date객체
		@param {String} sType YearMonth 인 경우, 년과 월로 계산. 그외는 년,월,일로 계산
		@return {Number} 숫자형태의 날짜
	**/
	_getDateNumber : function(htDate, sType){
		var nDate;
		if(sType === "YearMonth") {
			nDate = (htDate) ? (htDate.nYear * 10000 + htDate.nMonth * 100) : -1;
		} else {
			nDate = (htDate) ? (htDate.nYear * 10000 + htDate.nMonth * 100 + htDate.nDate) : -1;
		}
		return nDate;
	},
	/**
		jindo.m.Calendar 에서 사용하는 모든 객체를 release 시킨다.

		@method destroy
	**/
	destroy : function() {
		this.deactivate();
		this._bVisible = false;
		this._oToday = null;
		this._oViewDate = null;
		this._nSelectDate = -1;
		this._sClassPrefix = null;
		if(this.option("bUseEffect")){
			this._oTransition.destroy();
			this._oTransition = null;
		}
		this._aDayInfo = null;
	}
}).extend(jindo.m.UIComponent);
/**
	@fileOverview Form Element의 CheckBox / RadioButton 컴포넌트의 Core 클래스.
	@author sshyun
	@version 1.7.1
	@since 2011. 11. 1.

**/
/**
	Form Element의 CheckBox / RadioButton 컴포넌트의 Core 클래스.

	@class jindo.m.CheckRadioCore
	@extends jindo.m.UIComponent
	@keyword checkradio
	@group Component
	@invisible
**/

jindo.m.CheckRadioCore = jindo.$Class({
	/* @lends jindo.m.CheckRadioCore.prototype */
	/**
		초기화 함수

		@constructor
		@param {Varient} el Layout Wrapper
	**/
	$init : function(el, htOption) {
	},
	/**
		jindo.m.CheckRadioCore 에서 사용하는 모든 인스턴스 변수를 초기화한다.
	**/
	_initVar : function(sFormType, sFormClass) {
		this._sFormType = sFormType;
		this._sFormFixClass = sFormClass;
		this._sUnitClass = this.option("sClassPrefix") + sFormClass +"-unit";
		this._sOnClass = this.option("sClassPrefix")+ sFormClass + "-on";
		this._sFormClass = this.option("sClassPrefix") + sFormClass;
		this._sDisableClass = this.option("sClassPrefix")+ sFormClass + "-disable";
		var oDeviceInfo = jindo.m.getDeviceInfo();
		this._bMobile = (oDeviceInfo.iphone || oDeviceInfo.ipad || oDeviceInfo.android);

		this._sClickEvent = (this._bMobile) ? "touchend" : "click";
		this._bMove = false;

	},

	/**
		jindo.m.CheckRadioCore 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
	**/
	_setWrapperElement : function(el, sPrefix) {

		this._htWElement = {};
		this._aWElUnitList = [];
		this._aWElFormList = [];

		el = (typeof el == "string" ? jindo.$(el) : el);
		this._htWElement["base"] = jindo.$Element(el);
		this._htWElement["container"] = jindo.$Element(jindo.$$.getSingle('.' + sPrefix + this._sFormFixClass +'-cont', el));

		var aUnitList = this._htWElement["container"].queryAll('.' + this._sUnitClass);
		var aFormList = this._htWElement["container"].queryAll('.' + this._sFormClass);
		// 각 체크박스 엘리먼트와 Wrapper 엘리먼트를 가져온다.

		for ( var i = 0; i < aUnitList.length; i++) {
			this._aWElUnitList[i] = jindo.$Element(aUnitList[i]);
			this._aWElFormList[i] = jindo.$Element(aFormList[i]);
		}
	},
	/**
		jindo.m.CheckRadioCore 컴포넌트를 활성화한다.
		activate 실행시 호출됨
	**/
	_onActivate : function() {
		this._attachEvent();
	},
	/**
		jindo.m.CheckRadioCore 컴포넌트를 비활성화한다.
		deactivate 실행시 호출됨
	**/
	_onDeactivate : function() {
		this._detachEvent();
	},
	/**
		jindo.m.CheckRadioCore 에서 사용하는 모든 이벤트를 바인드한다.
	**/
	_attachEvent : function() {
		this._htEvent = {};
		this._htEvent["form_touchmove"] = {
				el  : this._htWElement["container"].$value(),
				ref : jindo.$Fn(this._onTouchMove, this).attach( this._htWElement["container"].$value(), "touchmove")
		};
		this._htEvent["form_"+this._sClickEvent] = {
				el  : this._htWElement["container"].$value(),
				ref : jindo.$Fn(this._onCheck, this).attach( this._htWElement["container"].$value(), this._sClickEvent)
		};

		if(this._bMobile){
			for ( var i = 0; i < this._aWElFormList.length; i++) {
				this._htEvent["form"+i+"_click"] = {
						el  : this._aWElFormList[i].$value(),
						ref : jindo.$Fn(this._onFormClick, this).attach( this._aWElFormList[i].$value(), "click")
				};
			}

		}
	},
	/**
		jindo.m.CheckRadioCore 에서 사용하는 모든 이벤트를 해제한다.
	**/
	_detachEvent : function() {
		for(var p in this._htEvent) {
			var ht = this._htEvent[p];
			ht.ref.detach(ht.el, p.substring(p.lastIndexOf("_")+1));
		}
		this._htEvent = null;
	},
	/**
		container 에서 TouchMove 이벤트 처리.
		@param {Object} we 이벤트 객체.
	**/
	_onTouchMove : function(we){
		this._bMove = true;
	},
	/**
		CheckBox/RadioButton 에서 Click 이벤트 처리.
		@param {Object} we 이벤트 객체.
	**/
	_onFormClick : function(we){
		var sClassName = this._sUnitClass;
		var welElement = jindo.$Element(we.element);
		welElement = welElement.parent(function(v){
			return v.hasClass(sClassName);
		})[0];

		var bCurrentChecked = we.element.checked;
		var sChecked = welElement.attr("data-cb-checked");
		var bChecked = (sChecked && sChecked == "on") ? true : false;

		if(bCurrentChecked != bChecked){
			we.element.checked = bChecked;
		}
	},

	/**
		CheckBox/RadioButton container 에서 클릭이벤트 처리.
		@param {Object} we 이벤트 객체.
	**/
	_onCheck : function(we){
		if(we.element && !this._bMove) {
			var elEventElement = jindo.m.getNodeElement(we.element);
			var welElement = jindo.$Element(elEventElement);

			var sClassName = this._sUnitClass;
			var sTagName = elEventElement.tagName.toLowerCase();
			var sType = elEventElement.getAttribute("type");
			sType = (sType) ? sType : "";
			// Container 하위 에서 클릭 되었는지 체크
			if(this._htWElement["container"].isParentOf(welElement) &&
					!welElement.hasClass(sClassName)){
				welElement = welElement.parent(function(v){
					return v.hasClass(sClassName);
				})[0];
			} else if((welElement.$value() === this._htWElement["container"].$value())){
				return false;
			}

			if((welElement.hasClass(this._sDisableClass))){
				return false;
			}

			var bClickOverForm = false;
			if(sTagName == "input" && sType.toLowerCase() == this._sFormType) {
				bClickOverForm = true;
			}
			this._afterCheck(welElement, bClickOverForm);
		}
		this._bMove = false;
	},

	/**
		CheckBox/RadioButton 클릭후 처리 함수
		각 컴포넌트에서 Override 하여 사용.
	**/
	_afterCheck : function(welElement, bClickOverForm){
	},

	/**
		체크박스 Element 의 배열의 index 배열을 반환.
		@param {Variant} checkbox Element.
		@return {Array} Index 배열값
	**/
	_getFormIdx : function(vElement){
		var aIdxList = [];
		var aElList = [];
		var sUnitClassName = this._sUnitClass;
		var sFormClassName = this._sFormClass;
		var waElUnitList = jindo.$A(this._aWElUnitList);
		var waElFormList = jindo.$A(this._aWElFormList);

		if(vElement instanceof Array){
			aElList = vElement;
		} else if(typeof vElement == "object"){
			aElList.push(vElement);
		} else if(!vElement || vElement === null){
			var nLength = this._aWElUnitList.length;
			for ( var i = 0; i < nLength; i++) {
				aIdxList.push(i);
			}
		}

		// Unit Element 와 Form Element 배열에서 특정 Element 의 Index 를 검색.
		var nIdx = -1;
		if(aElList.length > 0){
			waElUnitList.forEach(function(welElement, nElIdx){
				for ( var i = 0; i < aElList.length; i++) {
					if(aElList[i] === welElement.$value()){
						aIdxList.push(nElIdx);
					}
				}
			});

			if(aElList.length > aIdxList.length){
				waElFormList.forEach(function(welElement, nElIdx){
					for ( var i = 0; i < aElList.length; i++) {
						if(aElList[i] === welElement.$value()){
							aIdxList.push(nElIdx);
						}
					}
				});
			}
		}
		return aIdxList;
	},

	/**
		CheckBox/RadioButton 활성화 처리
		@param {Variant} vElement 체크를 설정할 CheckBox/RadioButton Element.
		@param {boolean} bUse 활성화 여부
	**/
	_useSettingForm : function(vElement, bUse){
		var aIdx = this._getFormIdx(vElement);
		var aElFormList = [];
		var aElUnitList = [];
		var sEvent = (bUse) ? "enable" : "disable";

		for ( var i = 0; i < aIdx.length; i++) {
			this._setUsedForm(bUse, this._aWElFormList[aIdx[i]].$value(), this._aWElUnitList[aIdx[i]]);
			aElFormList[i] = this._aWElFormList[aIdx[i]].$value();
			aElUnitList[i] = this._aWElUnitList[aIdx[i]].$value();
		}
		return {
			aFormList: aElFormList,
			aUnitList: aElUnitList
		};
	},
	/**
		CheckBox 활성화 지정. CheckBox disabled와 Unit css Class 지정.
		@param {Variant} vElement 체크를 설정할 checkbox Element.
		@param {boolean} bUse 활성화 여부
	**/
	_setUsedForm : function(bEnable, elForm, welUnit){
		if(!bEnable){
			welUnit.addClass(this._sDisableClass);
			elForm.disabled = true;
		} else {
			welUnit.removeClass(this._sDisableClass);
			elForm.disabled = false;
		}
	},

	/**
		jindo.m.CheckRadioCore 에서 사용하는 모든 객체를 release 시킨다.
		@method destroy
	**/
	destroy : function() {
		this.deactivate();

		for ( var p in this._htWElement) {
			this._htWElement[p] = null;
		}
		this._htWElement = null;
		this._sUnitClass = null;
		this._sOnClass = null;
		this._sFormClass = null;
		this._sDisableClass = null;
		this._aWElUnitList = null;
		this._aWElFormList = null;
	}
}).extend(jindo.m.UIComponent);/**
	@fileOverview Form Element의 CheckBox를 모바일에 환경에 맞게 커스터마이징한 컴포넌트
	@author sshyun
	@version 1.7.1
	@since 2011. 9. 16.
**/
/**
	Form Element의 CheckBox를 모바일에 환경에 맞게 커스터마이징한 컴포넌트

	@class jindo.m.CheckBox
	@extends jindo.m.CheckRadioCore
	@keyword input, checkbox, 체크박스, 디자인
	@group Component

	@history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
	@history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
	@history 0.9.5 Update [bUseRadius] Option 삭제<br />
						[sRadiusSize] Option 삭제<br />
						[sCheckBgColor] Option 삭제	<br />
						[sUncheckBgColor] Option 삭제
	@history 0.9.0 Release 최초 릴리즈
**/
jindo.m.CheckBox = jindo.$Class({
	/* @lends jindo.m.CheckBox.prototype */
	/**
		초기화 함수

		@constructor
		@param {Varient} el Checkbox Layout Wrapper
		@param {Object} [htOption] 초기화 옵션 객체
			@param {String} [htOption.sClassPrefix='fcb-'] 컴포넌트 로드시 activate 여부
			@param {String} [htOption.sType='v'] 세로 / 가로 타입 여부 (가로 :h, 세로:v)
			@param {Boolean} [htOption.bActivateOnload=true] 컴포넌트 로드시 activate 여부
	**/
	$init : function(el, htOption) {
		this.option({
			sClassPrefix	: "fcb-",
			sType			: "v",
			bActivateOnload : true,
			sUncheckBgColor : "transparent"
		});
		this.option(htOption || {});
		this._initVar();
		this._setWrapperElement(el, this.option("sClassPrefix"));
		this._initCheckLoad();
		if(this.option("bActivateOnload")) {
			this.activate();
		}

	},
	/**
		jindo.m.CheckBox 에서 사용하는 모든 인스턴스 변수를 초기화한다.
	**/
	_initVar : function() {
		this.$super._initVar("checkbox", "checkbox");
	},
	/**
		초기 체크 박스 체크 여부 확인.
	**/
	_initCheckLoad : function(){
		var aCheckUnit = this._htWElement["container"].queryAll('.' + this._sUnitClass);
		var welUnit, elCheckbox;
		for ( var i = 0; i < aCheckUnit.length; i++) {
			welUnit = jindo.$Element(aCheckUnit[i]);
			//elCheckbox = welUnit.query("input[type=checkbox]");
			elCheckbox = jindo.$$.getSingle("input[type=checkbox]", welUnit.$value());
			this._setChecked(elCheckbox.checked, elCheckbox, welUnit);
		}
		welUnit = elCheckbox = null;
	},

	/**
		CheckBox Toggle 효과 처리. List 에서 클릭시.
		@param {Object} welElement List Wrapper 엘리먼트.
	**/
	_afterCheck : function(welElement, bClickOverForm){
		var elCheckbox = jindo.$$.getSingle("." + this._sFormClass, welElement.$value());
		var sChecked = welElement.attr("data-cb-checked");
		var bChecked = (sChecked && sChecked == "on") ? false : true;
		//체크박스와 설정을 맞추기 위해 무조건 체크박스를 다시 설정한다.
	//	if(!bClickOverForm){
			elCheckbox.checked = bChecked;
	//	}
		this._setChecked(bChecked, elCheckbox, welElement);
	},
	/**
		체크여부 설정 처리.

		@param {Boolean} bChecked 체크여부
		@param {Element} elCheckbox CheckBox 엘리먼트
		@param {$Element} welUnit  CheckBox Wrapper 엘리먼트
		@history 0.9.5 Update sCheckBgColor Option 삭제
		@history 0.9.5 Update sUncheckBgColor Option 삭제
	**/
	_setChecked : function(bChecked, elCheckbox, welUnit){
		var sEvent = "unchecked";
		var sBgColor = this.option("sCheckBgColor");
		// 체크해제 경우
		if(!bChecked){
			sBgColor = (sBgColor) ? this.option("sUncheckBgColor") : null;
			welUnit.removeClass(this._sOnClass);
			welUnit.attr("data-cb-checked", "off");
		//체크 경우
		} else {
			welUnit.addClass(this._sOnClass);
			welUnit.attr("data-cb-checked", "on");
			sEvent = "checked";
		}
		//(sBgColor) ? welUnit.css("backgroundColor", sBgColor + " !important") : null;

		/**
			Check Box 선택해제시 발생.

			@event unchecked
			@param {String} sType 커스텀이벤트명
			@param {Elment} elCheckBoxUnit CheckBox Unit 엘리먼트
			@param {Elment} elCheckBox CheckBox 엘리먼트
		**/
		this.fireEvent(sEvent, {
			elCheckBoxUnit : welUnit.$value(),
			elCheckBox : elCheckbox
		});
	},
	/**
		check 된 항목값을 반환한다.

		@method getCheckedValue
		@return {Array} 체크된 값의 배열 정보.
		@example
			var aValues = oCheckBox.getCheckedValue();
			for(var i = 0 ; i < aValues.length ; i++){
				alert(aValues[i]);
			}
	**/
	getCheckedValue : function(){
		var aValue = [];
		var aCheckBoxList = this._aWElFormList;
		var elTempCheck = null;
		for ( var i = 0; i < aCheckBoxList.length; i++) {
			elTempCheck = aCheckBoxList[i].$value();
			if(!elTempCheck.disabled && elTempCheck.checked){
				aValue.push(elTempCheck.value);
			}
		}
		return aValue;
	},
	/**
		입력한 CheckBox 엘리먼트를 선택 / 선택해제 시킨다.

		@method setCheckedBox
		@param {Boolean} bChecked check 여부
		@param {Variant} vElement 체크를 설정할 checkbox Element.<br />
		CheckBox input 엘리먼트 배열 또는 CheckBox Unit 엘리먼트 배열 또는 단일 엘리먼트가 입력 될수 있고,
		입력값이 없을시 모든 CheckBox 엘리먼트가 기준이 된다.

		@example
			// 배열 선택시
			oCheckBox.setCheckedBox(true, [jindo.$("unit1"),jindo.$("unit2")]);
			// 단일 선택시
			oCheckBox.setCheckedBox(true, jindo.$("unit1"));
			// 전체 선택시
			oCheckBox.setCheckedBox(true);

			// 배열 선택해제시
			oCheckBox.setCheckedBox(false, [jindo.$("unit1"),jindo.$("unit2")]);
			// 단일 선택해제시
			oCheckBox.setCheckedBox(false, jindo.$("unit1"));
			// 전체 선택해제시
			oCheckBox.setCheckedBox(false);
	**/
	setCheckedBox : function(bChecked, vElement){
		var aIdx = this._getFormIdx(vElement);
		var elInput = null;
		for ( var i = 0; i < aIdx.length; i++) {
			elInput = this._aWElFormList[aIdx[i]].$value();
			if(!elInput.disabled){
				elInput.checked = bChecked;
				this._setChecked(bChecked, elInput, this._aWElUnitList[aIdx[i]]);
			}
		}
	},
	/**
		CheckBox 를 활성화 시킨다.

		@method enable
		@param {Variant} vElement 활성화 할 checkbox Element.<br />
		CheckBox input 엘리먼트 배열 또는 CheckBox Unit 엘리먼트 배열 또는 단일 엘리먼트가 입력 될수 있고,
		입력값이 없을시 모든 체크박스 엘리먼트가 기준이 된다.

		@example
			// 배열 활성화
			oCheckBox.enable([jindo.$("unit1"),jindo.$("unit2")]);
			// 단일 활성화
			oCheckBox.enable(jindo.$("unit1"));
			// 전체 활성화
			oCheckBox.enable();
	**/
	enable : function(vElement){
		var htElForm = this._useSettingForm(vElement, true);

		/**
			Check Box 활성화 되었을 경우 발생.

			@event enable
			@param {String} sType 커스텀이벤트명
			@param {Array} aCheckBoxUnitList활성화 되는 CheckBox Unit 엘리먼트 배열
			@param {Array} aCheckBoxList활성화 되는 CheckBox 엘리먼트 배열
		**/
		this.fireEvent("enable", {
			aCheckBoxList: htElForm.aFormList,
			aCheckBoxUnitList: htElForm.aUnitList
		});
	},
	/**
		CheckBox 를 비활성화 시킨다.

		@method disable
		@param {Variant} vElement 비활성화 할 checkbox Element.<br />
		CheckBox input 엘리먼트 배열 또는 CheckBox Unit 엘리먼트 배열 또는 단일 엘리먼트가 입력 될수 있고,
		입력값이 없을시 모든 체크박스 엘리먼트가 기준이 된다.

		@example
			// 배열 비활성화
			oCheckBox.disable([jindo.$("unit1"),jindo.$("unit2")]);
			// 단일 비활성화
			oCheckBox.disable(jindo.$("unit1"));
			// 전체 비활성화
			oCheckBox.disable();
	**/
	disable : function(vElement){
		var htElForm = this._useSettingForm(vElement, false);

		/**
			Check Box 비활성화 되었을 경우 발생.

			@event disable
			@param {String} sType 커스텀이벤트명
			@parama {Array} CheckBoxUnitList 활성화 되는 CheckBox Unit 엘리먼트 배열
			@param {Array} aCheckBoxList 활성화 되는 CheckBox 엘리먼트 배열
		**/
		this.fireEvent("disable", {
			aCheckBoxList: htElForm.aFormList,
			aCheckBoxUnitList: htElForm.aUnitList
		});
	},
	/**
		index 번호로 CheckBox Element 를 반환한다.

		@method geElementtByIndex
		@param {Number} nIdx 가져올 index 번호.
		@return {Object} CheckBox Element 객체 {elCheckBox, elCheckBoxUnit} 으로 구성된 객체를 반환
		@example
			// 0번째 CheckBox 가져오기.
			var oCheckBox = oCheckBox.geElementtByIdx(0);
			oCheckBox.elCheckBoxUnit; // CheckBox Unit Element 객체
			oCheckBox.elCheckBox; // CheckBox Element 객체
	**/
	geElementtByIndex : function(nIdx){
		return {
			elCheckBox: this._aWElFormList[nIdx].$value(),
			elCheckBoxUnit: this._aWElUnitList[nIdx].$value()
		};
	},
	/**
		jindo.m.CheckBox 에서 사용하는 모든 객체를 release 시킨다.

		@method destroy
		@example
			oCheckBox.destroy();
	**/
	destroy : function() {
		this.$super.destroy();
	}
}).extend(jindo.m.CheckRadioCore);/**
	@fileOverview 3개의 Panel영역을 무한대로 순환하여 플리킹할 수 있는 컴포넌트
	@author "oyang2"
	@version 1.7.1
	@since 2011. 11. 01.
**/
/**
	3개의 Panel영역을 무한대로 순환하여 플리킹할 수 있는 컴포넌트

	@class jindo.m.CircularFlicking
	@extends jindo.m.UIComponent
	@uses jindo.m.Touch
	@uses jindo.m.SlideFlicking
	@deprecated
	@keyword rolling, circular, 롤링, 순환, 회전, 플리킹
	@group Component

	@history 1.5.0 deprecated
	@history 1.4.0 Support OS 6 지원
	@history 1.3.5 Support Android 4.1(젤리빈) 대응
	@history 1.3.5 Bug ios에서 afterFlicking에서 패널의 마크업을 바꿀 경우 잔상이 보이는 버그 해결
	@history 1.3.0 Support 갤럭시 s3 ICS 대응
	@history 1.3.0 Update 애니메이션 구조 개선
	@history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
	@history 1.2.0 Bug android 4.x에서 발생하는 세로플리킹 오류 해결
	@history 1.2.0 Update [nBounceDuration] Option 추가<br />
						[bUseCss3d] Option 추가
	@history 1.1.0 Support Android 3.0/4.0 지원<br />Support jindo 2.0.0 mobile 버전 지원
	@history 1.1.0 Update Android의 경우 translate호출시에 [css3+자바스크립트] 형식을 혼합해서 사용하는 형식으로 수정
	@history 1.1.0 Update [bUsePreserve3dForAndorid] Option 삭제
	@history 0.9.5 Bug iOS에서 가로모드에서 플리킹 후 깜박이는 문제 해결
	@history 0.9.5 Update Class prefix 변경('ct' → 'panel')<br />
						[bUsePreserve3dForAndorid] Option 추가<br />
						getItemIndex() Method 삭제
	@history 0.9.0 Release 최초 릴리즈
**/
jindo.m.CircularFlicking = jindo.$Class({
	/* @lends jindo.m.CircularFlicking.prototype */
	/**
		초기화 함수

		@constructor
		@param {HTMLElement | String} el 플리킹 기준 엘리먼트 (혹은 id)
		@param {Object} [htOption] 초기화 옵션 객체
			@param {Boolean} [htOption.bHorizontal=true] 가로여부 (세로 플리킹일 경우 false로 설정한다)
			@param {String} [htOption.sClassPrefix='flick-'] Class의 prefix명
			@param {Number} [htOption.nDuration=200] 콘텐츠가 바뀌기 위한 최소한의 터치 드래그한 거리 (pixel)
			@param {Number} [htOption.nFlickThreshold=40] 슬라이드 애니메이션 시간
			@param {Number} [htOption.nTotalContents=3] 전체 플리킹할 콘텐츠의 개수(패널의 개수보다 많을 수 있다)
			@param {Number} [htOption.nBounceDuration=100] nFlickThreshold 이하로 움직여서 다시 제자리로 돌아갈때 애니메이션 시간
			@param {Boolean} [htOption.bUseCss3d=true] css3d(translate3d) 사용여부
			@param {Boolean} [htOption.bUseTimingFunction=true] css의 translate 속성을 사용할지 여부<br /> false일 경우 "left", "top" 속성을 이용함.
			@param {Boolean} [htOption.bUseTranslate=true] 애니메이션 동작방식을 css의 TimingFunction을 사용할지 여부<br /> false일 경우 setTimeout을 이용하여 애니메이션 실행.
			@param {Boolean} [htOption.bUseDiagonalTouch=true] 대각선스크롤 방향으 터치도 플리킹으로 사용할지 여부
			@param {Boolean} [htOption.bSetNextPanelPos=false] 플리킹할때 다음 패널의 top위치를 항상 맨 위로 사용할지 여부
			@param {Boolean} [htOption.bActivateOnload=true] 컴포넌트 로드시 activate 여부

		@example
			var oCircularFlicking = new jindo.m.CircularFlicking('layer1', {
				bHorizontal : true,  //가로 플리킹 여부 세로 플리킹일 경우 false
				sClassPrefix : 'flick-',
				nDuration : 200, //flicking 타임
				nFlickThreshold : 40, //페이지 단위로 옮길때 최소 move 거리
				nTotalContents : 3,
				nBounceDuration : 100, //바운스에 대한 시간설정
				bUseCss3d : jindo.m._isUseCss3d(), //ios와 크롬은 true, 안드로이드 기본브라우저는 false
				bUseTimingFunction : jindo.m._isUseTimingFunction(), //스크립트방식으로 애니메이션을 사용할지 csstimingfunction을 사용할지 여부
				bUseTranslate : true, //css의 translate를 사용할지 style 속성의 top, left속성 사용할지 여부
				bUseDiagonalTouch : true, //대각선스크롤을 플리킹에 사용할지 여부
                bSetNextPanelPos :  false, //플리킹시에 다음판에 대해서 현재 스크롤 위치에 높이값을 맞출지 여부
				bActivateOnload : true
			});
	**/
    $init : function(sId, htUserOption) {
        this.option({
            bHorizontal : true,
            sClassPrefix : 'flick-',
            nFlickThreshold : 40,
            nDuration : 100,
            nTotalContents : 3,
            nBounceDuration : 100,
            bActivateOnload : true,
            bSetNextPanelPos : false,   //플리킹시에 다음판에 대해서 현재 스크롤 위치에 높이값을 맞출지 여부
            bUseCss3d : jindo.m._isUseCss3d(true),
            bUseTimingFunction : jindo.m._isUseTimingFunction(true), //스크립트방식으로 애니메이션을 사용할지 csstimingfunction을 사용할지 여부
            bUseTranslate : true, //css의 translate를 사용할지 style 속성의 top, left속성 사용할지 여부
            bUseDiagonalTouch : true //대각선스크롤을 플리킹에 사용할지 여부
        });

        this.option(htUserOption || {});

        this._initVar();
        this._setWrapperElement(sId);
        this._initFlicking();

        if(this.option("bActivateOnload")) {
            this.activate();
        }
    },
    /**
		jindo.m.CircularFlicking 에서 사용하는 모든 인스턴스 변수를 초기화한다.
	**/
    _initVar: function() {
        this._oFlicking = null;
    },


   /**
		Flickking 컴포넌트 초기화 한다.
	**/
    _initFlicking : function(){
        var htOption = this.option();
        htOption["sContentClass"] = "panel";
        htOption["sAnimation"] = "slide";
        htOption["bUseCircular"] = true;
        htOption["bActivateOnload"] = false;
        
        this._oFlicking = new jindo.m.Flicking(this._htWElement.base.$value(), htOption).attach({
            'touchStart' : jindo.$Fn(this._onTouchStart,this).bind(),
            'touchMove' : jindo.$Fn(this._onTouchMove, this).bind(),
            'touchEnd' : jindo.$Fn(this._onTouchEnd,this).bind(),
            'beforeMove' :  jindo.$Fn(this._onBeforeMove,this).bind(),
            'move' :  jindo.$Fn(this._onMove,this).bind(),
            'rotate' : jindo.$Fn(this._onRotate,this).bind(),
            'scroll' : jindo.$Fn(this._onScroll,this).bind(),
            'beforeFlicking' : jindo.$Fn(this._onBeforeFlicking, this).bind(),
            'afterFlicking' : jindo.$Fn(this._onAfterFlicking,this).bind()
        });
    },

    /**
        jindo.m.CircularFlicking 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
    **/
    _setWrapperElement: function(el) {
        this._htWElement = {};
        el = jindo.$(el);
        var sClass = '.'+ this.option('sClassPrefix');

        this._htWElement.base = jindo.$Element(el);

        this._htWElement.container = jindo.$Element(jindo.$$.getSingle(sClass+'container',el));

        // WRAPPER -> CONTAINER로 수정
        var aPanel = jindo.$$(sClass+"panel", el);
        this._htWElement.aPanel = jindo.$A(aPanel).forEach(function(value,index, array){
            var wel = jindo.$Element(value);
            array[index] = wel;
        }).$value();
    },



    /**
        현재 화면 중앙에 보이는 영역에 Panel의 인덱스를 리턴한다.

        @method getPanelIndex
        @return {Number} n
        @history 0.9.5 Update Method 추가
    **/
    getPanelIndex : function(){
        return this._oFlicking.getIndexByElement(this.getPanelElement().$value());

    },

    /**
        현재 화면 중앙에 보이는 영역에 Panel의 엘리먼트를 래핑된 형태로 리턴한다.

        @method getPanelElement
        @return {jindo.$Element}
        @history 1.1.0 Update Method 추가
    **/
    getPanelElement : function(){
        return this._oFlicking.getElement();
    },

    /**
        현재 화면에서 오른쪽(아래쪽) 영역에 Panel의 인덱스를 리턴한다.

        @method getRightPanelIndex
        @return {Number} n
        @history 0.9.5 Update Method 추가
    **/
    getRightPanelIndex : function(){
        return this._oFlicking.getIndexByElement(this.getRightPanelElement().$value());
    },

    /**
        현재 화면에서 오른쪽(아래쪽) 영역에 Panel 엘리먼트를 래핑된 형태로 리턴한다.

        @method getRightPanelElement
        @return {jindo.$Element}
        @history 1.1.0 Update Method 추가
    **/
    getRightPanelElement : function(){
        return this._oFlicking.getNextElement();
    },


    /**
        현재 화면 왼쪽(위쪽) 영역에 Panel의 인덱스를 리턴한다.

        @method getLeftPanelIndex
        @return {Number} n
        @history 0.9.5 Update Method 추가
    **/
    getLeftPanelIndex : function(){
         return this._oFlicking.getIndexByElement(this.getLeftPanelElement().$value());
    },

    /**
        현재 화면 왼쪽(위쪽) 영역에 Panel 엘리먼트를 래핑된 형태로 리턴한다.

        @method getLeftPanelElement
        @return {jindo.$Element}
        @history 1.1.0 Update Method 추가
    **/
    getLeftPanelElement : function(){
        return this._oFlicking.getPrevElement();
    },


   /**
        컴포넌트의 옵션값 nTotalContent을 기준으로 현재 화면에 보이는 콘텐츠 영역의 Content의 인덱스를 반환한다.
        @remark Panel의 인덱스가 아닌 Content의 인덱스를 리턴한다.

        @method getContentIndex
        @return {Number} n
        @history 0.9.5 Update Method 추가
    **/
    getContentIndex : function(){
        return this._oFlicking.getContentIndex();
    },

   /**
        오른쪽(아래쪽) Panel의 content의 인덱스를 리턴한다.

        @method getRightContentIndex
        @return {Number} n
        @history 0.9.5 Update Method 추가
    **/
    getRightContentIndex : function(){
        return this._oFlicking.getNextIndex();
    },

    /**
        왼쪽(위쪽) Panel의 content의 인덱스를 리턴한다

        @method getLeftContentIndex
        @return {Number} n
        @history 0.9.5 Update Method 추가
    **/
    getLeftContentIndex : function(){
        return this._oFlicking.getPrevIndex();
    },


    /**
        touchStart 발생 처리
    **/
    _onTouchStart : function(oCustomEvt){
        /**
            플리킹 영역에 터치가 시작되었을 때 발생한다.
            @remark Touch이벤트의 'touchStart'와 동일하다.

            @event touchStart
            @param {String} sType 커스텀이벤트명
            @param {HTMLElement} element 현재 터치된 영역의 Element
            @param {Number} nX 터치영역의 X좌표
            @param {Number} nY 터치 영역의 Y좌표
            @param {Object} oEvent jindo.$Event object
            @param {Function} stop  플리킹 액션이 수행되지 않는다
        **/

        var bRet = this.fireEvent('touchStart', oCustomEvt);
        if(!bRet){
            oCustomEvt.stop();
            return;
        }
    },

    /**
        touchMove가 발생할때 처리
     */
    _onTouchMove : function(oCustomEvt){
         /**
            플리킹 영역에서 터치 움직임이 있을 때 발생한다.
            @remark Touch이벤트의 'touchMove'와 동일하다.

            @event touchMove
            @param {String} sType 커스텀이벤트명
            @param {String} sMoveType (String) : 현재 분석된 움직임
            @param {HTMLElement} element 현재 터치된 영역의 Element
            @param {Number} nX 터치영역의 X좌표
            @param {Number} nY 터치 영역의 Y좌표
            @param {Number} nVectorX 이전 touchMove(혹은 touchStart)의 X좌표와의 상대적인 거리.(직전 좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
            @param {Number} nVectorY 이전 touchMove(혹은 touchStart)의 Y좌표와의 상대적인 거리.(직전 좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
            @param {Number} nDistanceX touchStart의 X좌표와의 상대적인 거리.(touchStart좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
            @param {Number} nDistanceY touchStart의 Y좌표와의 상대적인 거리.(touchStart좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
            @param {Number} nStartX touchStart의 X좌표
            @param {Number} nStartY touchStart의 Y좌표
            @param {Object} oEvent jindo.$Event object
            @param {Function} stop 수행시 영향 받는것 없다.
        **/
        this.fireEvent('touchMove', oCustomEvt);
    },

    /**
        touchEnd 가 발생할때 처리
    **/

    _onTouchEnd : function(oCustomEvt){
         /**
            플리킹 영역에서 터치가 끝났을 때 발생한다.
            @remark Touch이벤트의 'touchEnd'와 동일하다.

            @event touchEnd
            @param {String} sType 커스텀이벤트명
            @param {String} sMoveType (String) : 현재 분석된 움직임
            @param {HTMLElement} element 현재 터치된 영역의 Element
            @param {Number} nX 터치영역의 X좌표
            @param {Number} nY 터치 영역의 Y좌표
            @param {Number} nVectorX 이전 touchMove(혹은 touchStart)의 X좌표와의 상대적인 거리.(직전 좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
            @param {Number} nVectorY 이전 touchMove(혹은 touchStart)의 Y좌표와의 상대적인 거리.(직전 좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
            @param {Number} nDistanceX touchStart의 X좌표와의 상대적인 거리.(touchStart좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
            @param {Number} nDistanceY touchStart의 Y좌표와의 상대적인 거리.(touchStart좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
            @param {Number} nStartX touchStart의 X좌표
            @param {Number} nStartY touchStart의 Y좌표
            @param {Object} oEvent jindo.$Event object
            @param {Function} stop 수행시 영향 받는것 없다.
        **/
         this.fireEvent('touchEnd', oCustomEvt);
    },

    /**
        beforeMove 가 발생할때 처리
    **/
    _onBeforeMove :function(oCustomEvt){
        var nPanelIndex = oCustomEvt.nContentsNextIndex % 3;
        /**
                플리킹 액션없이 패널 혹은 컨텐츠가 바뀌기 전에 발생한다.
                @remark setContentIndex/refresh 메소드를 통해 각 패널이 바뀔 경우

                @event beforeMove
                @param {String} sType 커스텀이벤트명
                @param {Number} nPanelIndex 현재 화면에 보이는 패널의 인덱스
                @param {Number} nNextPanelIndex 플리킹되어 중앙 화면에 보일 패널의 인덱스
                @param {Number} nContentIndex 현재 화면에 보이는 컨텐츠의 인덱스
                @param {Number} nNextContentIndex 플리킹되어 중앙 화면에 보일 컨텐츠의 인덱스
                @param {Function} stop  수행시 영향을 받는것은 없다

                @history 0.9.5 Update Custom Event 추가
        **/
        if(!this.fireEvent('beforeMove',{
                nPanelIndex : this.getPanelIndex(),
                nContentIndex : oCustomEvt.nContentsIndex,
                nNextPanelIndex : nPanelIndex,
                nNextContentIndex : oCustomEvt.nContentsNextIndex
            })){
                oCustomEvt.stop();
            }
    },

    /**
        move 가 발생할 때 처리
     */
    _onMove :function(oCustomEvt){
            /**
                플리킹 액션없이 패널 혹은 컨텐츠가 바뀌었을 경우
                @remark setContentIndex/refresh 메소드를 통해 각 패널이 바뀔 경우

                @event move
                @param {String} sType 커스텀이벤트명
                @param {Number} nPanelIndex 현재 화면에 보이는 중앙 영역의 패널의 인덱스
                @param {Number} nPanelLeftIndex 왼쪽 (혹은 위쪽)영역에 있는 패널의 인덱스
                @param {Number} nPanelRightIndex 오른쪽 (혹은 아래쪽)영역에 있는 패널의 인덱스
                @param {Number} nContentIndex 현재 화면에 보이는 컨텐츠의 인덱스
                @param {Number} nContentLeftIndex 왼쪽 (혹은 위쪽)영역에 컨텐츠의 인덱스
                @param {Number} nContentRightIndex 오른쪽 (혹은 아래쪽)영역에 컨텐츠 인덱스
                @param {Function} stop  수행시 영향을 받는것은 없다

                @history 0.9.5 Update Custom Event 추가
            **/
         this.fireEvent('move',{
             nPanelIndex : this.getPanelIndex(),
             nPanelLeftIndex :  this.getLeftPanelIndex(),
             nPanelRightIndex : this.getRightPanelIndex(),
             nContentIndex : this.getContentIndex(),
             nContentLeftIndex : this.getLeftContentIndex(),
             nContentRightIndex :  this.getRightContentIndex()
         });
    },
    /**
        rotate 발생 처리
     */
    _onRotate :function(evt){
        /**
                단말기를 전환하였을 경우 발생.

                @event rotate
                @param {String} sType 커스텀이벤트명
                @param {Boolean} isVertical 수직 여부
                @param {Function} stop  수행시 영향을 받는것은 없다

                @history 1.5.0 Update Custom Event 추가
         **/
        this.fireEvent('rotate', evt);
    },

    /**
        scroll 발생 처리
     */
    _onScroll :function(){
        /**
                플리킹 액션이 아닌 기본 스크롤 액션이 발생할 경우.

                @event scroll
                @param {String} sType 커스텀이벤트명
                @param {Function} stop  수행시 영향을 받는것은 없다

                @history 1.5.0 Update Custom Event 추가
         **/
        this.fireEvent('scroll');
    },
    /**
        beforeFlicking 발생 처리
     */
    _onBeforeFlicking  : function(oCustomEvent){
        //console.log(oCustomEvent);
        var htParam = {
            nContentIndex : oCustomEvent.nContentsIndex,
            nNextContentIndex : oCustomEvent.nContentsNextIndex,
            nPanelIndex : this.getPanelIndex(),
            nNextPanelIndex : this.getLeftPanelIndex()
        };
        if(oCustomEvent.bTop){
            htParam["bTop"] = oCustomEvent.bTop;

        }
        if(oCustomEvent.bLeft){
            htParam["bLeft"] = oCustomEvent.bLeft;
        }
        if(htParam["bTop"] || htParam["bLeft"]){
                htParam["nNextPanelIndex"]  = this.getRightPanelIndex();
        }
        /**
            플리킹 액션을 통해 panel이 바뀌기 전에 발생한다.
            @remark 플리킹 액션은 터치를 통해 플리킹 되거나 movePrev()/moveNext()메소드를 통해 플리킹되는 경우이다

            @event beforeFlicking
            @param {String} sType 커스텀이벤트명
            @param {Number} nPanelIndex 현재 화면에 보이는 패널의 인덱스
            @param {Number} nNextPanelIndex 플리킹되어 중앙 화면에 보일 패널의 인덱스
            @param {Number} nContentIndex 현재 화면에 보이는 컨텐츠의 인덱스
            @param {Number} nNextContentIndex 플리킹되어 중앙 화면에 보일 컨텐츠의 인덱스
            @param {Boolean} bLeft 플리킹 방향이 왼쪽인지 대한 여부
            @param {Function} stop 수행시 영향을 받는것은 없다

            @history 1.3.5 Update stop() 호출하면 다시 제자리로 돌아가는 bounce 기능 추가
            @history 0.9.5 Update Custom Event 추가
        **/
        if(!this.fireEvent('beforeFlicking', htParam)){
            oCustomEvent.stop();
        }
    },

    /**
       afterFlicking 발생 처리
     */
    _onAfterFlicking : function(oCustomEvent) {
        var htParam = {
             nPanelIndex : this.getPanelIndex(),
             nPanelLeftIndex : this.getLeftPanelIndex(),
             nPanelRightIndex : this.getRightPanelIndex(),
             nContentIndex : this.getContentIndex(),
             nContentLeftIndex : this.getLeftContentIndex(),
             nContentRightIndex:  this.getRightContentIndex()
        };

        if(oCustomEvent.bTop){
            htParam["bTop"] = oCustomEvent.bTop;

        }
        if(oCustomEvent.bLeft){
            htParam["bLeft"] = oCustomEvent.bLeft;
        }
        this._htWElement.aPanel = this._oFlicking._oFlickingAnimation._htWElement.aPanel;
        /**
                플리킹 액션을 통해 panel이 바뀐 이후에 발생한다.
                @remark 플리킹 액션은 터치를 통해 플리킹 되거나 movePrev()/moveNext()메소드를 통해 플리킹되는 경우이다.

                @event afterFlicking
                @param {String} sType 커스텀이벤트명
                @param {Number} nPanelIndex 현재 화면에 보이는 중앙 영역의 패널의 인덱스
                @param {Number} nPanelLeftIndex 왼쪽 (혹은 위쪽)영역에 있는 패널의 인덱스
                @param {Number} nPanelRightIndex 오른쪽 (혹은 아래쪽)영역에 있는 패널의 인덱스
                @param {Number} nContentIndex 현재 화면에 보이는 컨텐츠의 인덱스
                @param {Number} nContentLeftIndex 왼쪽 (혹은 위쪽)영역에 컨텐츠의 인덱스
                @param {Number} nContentRightIndex 오른쪽 (혹은 아래쪽)영역에 컨텐츠 인덱스
                @param {Boolean} bLeft 가로플리킹일 경우 플리킹 방향이 왼쪽인지 여부(세로 플리킹일 경우 이 값은 없다)
                @param {Boolean} bTop 세로플리킹일 경우 플리킹 방향이 위쪽인지 여부 (가로 플리킹일 경우 이 값은 없다)
                @param {Function} stop 수행시 영향을 받는것은 없다

        **/
        this.fireEvent('afterFlicking', htParam);
    },
    /**
        nDuration 시간만큼 다음(오른쪽 콘텐츠, 아래)로 이동한다.

        @method moveNext
        @param {Number} nDuration 애니메이션 시간
    **/
    moveNext : function(nDuration){
        if(!this.isActivating()){
            return;
        }

        this._oFlicking.moveNext();
    },

    /**
        nDuration 시간만큼 이전(왼쪽 콘텐츠, 위쪽)로 이동한다.

        @method movePrev
        @param {Number} nDuration 애니메이션 시간
    **/
    movePrev : function(nDuration){
        if(!this.isActivating()){
            return;
        }

        this._oFlicking.movePrev();
    },

    /**
        n배열이 중앙에 오도록 panel을 다시 좌우 배열해서 배치한다.

        @method refresh
        @param {Number} n 현재 화면에 보여져야할 content의 인덱스
        @param {Boolean} bResize 화면 크기가 변화되어 다시 사이즈를 업데이트 해야 할경우
        @param {Boolean} bFireEvent 커스텀이벤트 발생여부
    **/
    refresh : function(n, bResize, bFireEvent){
        var self = this;

        if(!this.isActivating()){
            return;
        }

        if(typeof bResize === 'undefined'){
            bResize = false;
        }
        if(typeof bFireEvent === 'undefined'){
            bFireEvent = false;
        }

        this._oFlicking.refresh(n, bResize, bFireEvent);
    },

    /**
        현재 중앙에 보이는 컨텐츠의 인덱스를 n으로 설정한다.

        @method setContentIndex
        @param {Number} n 컨텐츠 인덱스
        @param {Boolean} bRefresh panel의 위치를 다시 잡을지에 대한 여부
        @history 0.9.5 Update Method 추가
    **/
    setContentIndex : function(n, bRefresh){
        if(!this.isActivating()){
            return;
        }

        n = parseInt(n,10);
        if(n < 0 || n > (this.option('nTotalContents')-1)){
            return;
        }

        if(typeof bRefresh === 'undefined'){
            bRefresh = true;
        }

        this.refresh(n, bRefresh, true);
    },


    /**
        jindo.m.Flicking 컴포넌트를 활성화한다.
        activate 실행시 호출됨
    **/
    _onActivate : function() {
        this._oFlicking.activate();
    },

    /**
        jindo.m.Flicking 컴포넌트를 비활성화한다.
        deactivate 실행시 호출됨
    **/
    _onDeactivate : function() {
        this._oFlicking.deactivate();
    },

    /**
        jindo.m.Flicking 에서 사용하는 모든 객체를 release 시킨다.
        @method destroy
    **/
    destroy: function() {
        this.deactivate();
        this._oFlicking = null;
        for(var p in this._htWElement) {
            this._htWElement[p] = null;
        }
    }
}).extend(jindo.m.UIComponent);
/**
	@fileOverview 페이징 코어 컴포넌트
	@author "oyang2"
	@version 1.7.1
	@since 2011. 7. 20.
**/
/**
	페이징 코어 컴포넌트

	@class jindo.m.CorePagination
	@extends jindo.m.UIComponent
	@keyword corepagination,페이징 코어, 목록
	@group Component

	@history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
	@history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
	@history 1.0.0 - -
	@history 0.9.5 - -
	@history 0.9.0 Release 최초 릴리즈
	@invisible
**/
jindo.m.CorePagination = jindo.$Class({
	/**
		현재 페이지
	**/
	_nCurrentPage : 1,
	/* @lends jindo.m.CorePagination.prototype */
	/**
		초기화 함수

		@ignore
		@constructor
		@param {Object} [htOption] 초기화 옵션 객체
			@param {Number} [htOption.nItem=10]
			@param {Number} [htOption.nItemPerPage=10]
			@param {Number} [htOption.nPage=1]
			@param {Boolean} [htOption.bActivateOnload=true]
	**/
	$init : function(htOption) {
		this.option({
			nItem : 10,
			nItemPerPage : 10,
			nPage : 1,
			bActivateOnload : true
		});
		this.option(htOption || {});
		this._nCurrentPage = this.option('nPage');
	},

	/**
		전체 아이템 개수를 리턴한다.
		@method getItemCount
		@return {Number} 전체 아이템 개수
	**/
	getItemCount : function(){
		return this.option('nItem');
	},

	/**
		한페이지당 보여줄 아이템의 개수를 리턴한다.
		@method getItemPerPage
		@return {Number} 한페이지당 보여줄 아이템의 개수
	**/
	getItemPerPage : function(){
		return this.option('nItemPerPage');
	},


	/**
		현재 페이지를 리턴한다.
		@method getCurrentPage
		@return {Number} 현재 페이지
	**/
	getCurrentPage : function(){
		return this._nCurrentPage;
	},

	/**
		전체 아이템 개수를 설정한다.
		@method setItemCount
		@param {Number} n 아이템 개수
	**/
	setItemCount : function(n){
		this.option('nItem', n);
	},

	/**
		한페이지당 아이템 개수를 설정한다
		@method setItemPerPage
		@param {Number} n 한 페이지당 아이템 개수
	**/
	setItemPerPage : function(n){
		this.option('nItemPerPage',n);
	},

	/**
		n 페이지로 이동한다.
		@param {Number} n
	**/
	movePageTo : function(n){
		var nBefore = this._nCurrentPage;

		var nPage = this._convertToAvailPage(n);
		if(nPage != this._nCurrentPage){
			this._nCurrentPage = nPage;
		}
	},

	/**
		현재 페이지의 다음 페이지로 이동한다.
		@method nextPageTo
	**/
	nextPageTo : function(){
		var nPage = this._nCurrentPage +1;
		this.movePageTo(nPage);
	},

	/**
		현재 페이지의 다음 페이지로 이동한다.
		@method previousPageTo
	**/
	previousPageTo : function(){
		var nPage = this._nCurrentPage-1;
		this.movePageTo(nPage);
	},

	/**
		다음 페이지가 있는지 리턴한다.
		@method hasNextPage
		@return {Boolean}
	**/
	hasNextPage : function(){
		var nPage =this.getCurrentPage(),
			totalPage = this.getTotalPages();

		return nPage&& (nPage < totalPage);
	},

	/**
		이전 페이지가 있는지 리턴한다.
		@method hasPreviousPage
		@return {Boolean}
	**/
	hasPreviousPage : function(){
		return (this.getCurrentPage() > 1);
	},

	/**
		전체 페이지 수를 리턴한다.
		@method getTotalPages
		@return {Number} 전체 페이지 수
	**/
	getTotalPages : function(){
		var nTotal = this.option('nItem'),
			nCount = this.option('nItemPerPage');

		if(!nCount){
			return null;
		}

		return Math.ceil(nTotal/nCount);
	},

	/**
		n 페이지의 아이템들의 start, end 인덱스를 리턴한다.
		@method getPageItemIndex
		@param {Number} n
		@return {Object}
		@example
			var htIndex = oCorePagination.getPageIntemIndex(2);
			htIndex.nStart //2페이지의 아이템의 시작 인덱스
			htIndex.nEnd //2페이지의 아이템의 끝 인덱스
	**/
	getPageItemIndex : function(nPage){
		nPage = this._convertToAvailPage(nPage);

		var nTotal = this.option('nItem'),
			nCount = this.option('nItemPerPage'),
			start, end;

		if(!nPage || !nCount){
			return null;
		}

		start = (nPage-1) * nCount;
		end = Math.min(start+ nCount, nTotal)-1;

		return {
			nStart :  start,
			nEnd : end
		};
	},

	/**
		n번째 아이템이 몇번째 페이지인지 구한다.
		@method getPageOfItem
		@param {Number} n
		@return {Number}
	**/
	getPageOfItem : function(n){
		return Math.ceil(n / this.getItemPerPage());
	},

	_convertToAvailPage : function(nPage){
		var nLastPage = this.getTotalPages();

		nPage = Math.max(nPage, 1);
		nPage = Math.min(nPage, nLastPage);

		return nPage;
	}
}).extend(jindo.m.UIComponent);/**
    @fileOverview 페이지의 고정영역 내부를 터치하여 스크롤링 할 수 있는 컴포넌트
    @author sculove
    @version 1.7.1
    @since 2011. 8. 18.
*/
/**
    페이지의 고정영역 내부를 터치하여 스크롤링 할 수 있는 컴포넌트

    @class jindo.m.CoreScroll
    @extends jindo.m.UIComponent
    @uses jindo.m.Touch
    @uses jindo.m.DynamicPlugin{,1}
    @deprecated
    @keyword scroll, 스크롤
    @group Component

    @history 1.7.0 Bug bUseHighlight=fasle일 경우, 안드로이드 4.x 갤럭시 시리즈에서 하이라이트 사라지지 않는 문제 제거
	  @history 1.6.0 deprecated
    @history 1.5.0 Support Window Phone8 지원
    @history 1.5.0 Update  touchStart, touchMove , touchEnd 이벤트에서 중지할 경우 뒤 이벤트 안타도록 수정
    @history 1.4.0 Support OS 6 지원
    @history 1.4.0 Update {bUseBounce} bUseBounce : false일 경우, 스크롤을 더이상 할수 없을 때 시스템 스크롤이 발생하는 기능 추가
    @history 1.4.0 Bug 가로 스크롤일경우, 터치 위치의 y가 30보다 작을경우 스크롤이 안되는 버그 수정
    @history 1.3.0 Update {sListElement} Option 추가
    @history 1.3.0 Update {nRatio} Option 추가
    @history 1.3.0 Support Android 젤리빈(4.1) 대응
    @history 1.3.0 Support 갤럭시 4.0.4 업데이트 지원
    @history 1.3.0 Update {bUseTimingFunction} Option 추가
    @history 1.3.0 Update {bUseTranslate} Option 추가
    @history 1.3.0 Update {bUseCss3d} Option 기본값 변경. 모바일 단말기에 맞게 3d 사용여부를 설정함
    @history 1.3.0 Update {bUseMomentum} Option 기본값 변경. iOS는 true, Android는 false → 모두 true
    @history 1.3.0 Update Wrapper의 position이 static 일 경우, relative로 변경<br/>그외는 position이 변경되지 않도록 수정
    @history 1.3.0 Update Wrapper와 scroller가 동일하고 bUseBounce가 true인 경우, 스크롤이 가능하도록 변경
    @history 1.3.0 Bug Scroll과 Flicking 함께 사용할때 A link가 클릭안되는 문제 수정
    @history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
    @history 1.2.0 Update bUseTransition → bUseCss3d<br>Option Name 수정
    @history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
    @history 1.1.0 Update 따로 클래스명을 정의하지 않아도 wrapper내의 첫번째 엘리먼트를 무조건 Scroller 엘리먼트로 처리하도록 수정
    @history 1.1.0 Update document 선택시 wrapper이 visible이 true일 경우에만 작동하도록 수정
    @history 1.1.0 Update 스크롤 여부에 따른 마크업 지정 편의 개선 (가로스크롤은 scroller의 높이값 100% 설정, 세로스크롤 경우 scroller의 넓이값 100% 설정)
    @history 1.1.0 Update {bUseTransition} Option 기본값 수정<br>iOS, 갤럭시 S2 : true, 그외 : false
    @history 1.1.0 Update {bUseHighlight} Option 추가
    @history 1.0.0 - -
    @history 0.9.5 Bug iOS에서 클릭영역 누른 상태에서, 이동후 버튼을 놓았을시, 초기에 선택한 위치에 clickable 엘리먼트가 존재할 경우, click 되는 문제 해결
    @history 0.9.5 Update {bUseBounce} false인 경우, 이동,가속시 외부영역으로 이동되지 않도록 수정
    @history 0.9.5 Update {sClassPrefix} Option 추가
    @history 0.9.5 Update {bUseTransition} Option 추가
    @history 0.9.5 Update {sPrefix → sClassPrefix} Option명 수정
    @history 0.9.5 Update {bUseFocus} Option명 삭제
    @history 0.9.0 Release 최초 릴리즈
**/
jindo.m.CoreScroll = jindo.$Class({
	/* @lends jindo.m.CoreScroll.prototype */
	   /**
        초기화 함수

        @constructor
        @param {String|HTMLElement} el CoreScroll할 Element (필수)
        @param {Object} [htOption] 초기화 옵션 객체
            @param {Boolean} [htOption.bActivateOnload=true] 컴포넌트 로드시 activate 여부
            @param {Boolean} [htOption.bUseHScroll=false] 수평 스크롤 사용 여부. 스크롤영역의 width가 wrapper의 width보다 클 경우 적용 가능함.
            @param {Boolean} [htOption.bUseVScroll=true] 수직 스크롤 사용 여부. 스크롤영역의 height가 wrapper의 height보다 클 경우 적용 가능함.
            @param {Boolean} [htOption.bUseMomentum=true] 스크롤시 가속도 사용여부
            @param {Number} [htOption.nDeceleration=0.0006] 가속도의 감속계수. 이 값이 클수록, 가속도는 감소한다
            @param {Number} [htOption.nOffsetTop=0] 수직 스크롤시, 상위 offset
            @param {Number} [htOption.nOffsetBottom=0] 수직 스크롤시, 하위 offset
            @param {Number} [htOption.nHeight=0] Wrapper의 height값. 값이 0일 경우 wrapper의 height로 설정됨
            @param {Number} [htOption.nWidth=0] Wrapper의 width값. 값이 0일 경우 wrapper의 width로 설정됨
            @param {Boolean} [htOption.bUseBounce=true] 가속 이동후, 바운스 처리되는 여부
            @param {Boolean} [htOption.bUseHighlight=true] 하이라이트 사용 여부
            @param {String} [htOption.sClassPrefix='scroll_'] CoreScroll 내부 엘리먼트 구분 클래스 prefix
            @param {Function} [htOption.bUseCss3d=jindo.m._isUseCss3d()] 하드웨어 3d 가속 여부<br />
                모바일 단말기별로 다르게 설정된다. 상세내역은 <auidoc:see content="jindo.m">[jindo.m]</auidoc:see>을 참조하기 바란다.
            @param {Function} [htOption.bUseTimingFunction=jindo.m._isUseTimingFunction()] 스크롤 애니메이션 동작방식을 결정한다.<br />
                bUseTimingFunction가 true일 경우, CSS3로 애니메이션을 구현하고, false일 경우, 스크립트로 애니메이션을 구현한다.<br />
                모바일 단말기별로 다르게 설정된다. 상세내역은 <auidoc:see content="jindo.m">[jindo.m]</auidoc:see>을 참조하기 바란다.<br />
            @param {String} [htOption.sListElement=''] sListElement는 리스트의 구성요소가 되는 엘리먼트 명이다.<br />
                sListElement 옵션값을 지정한 상태에서 스크롤이 일어날 경우, 이동 경로 방향으로 고정 범위의 scroller 영역만을 동적으로 유지한다.<br />
                여기서 ‘고정범위’는 ‘화면에 보이는 View영역의 높이 X nRatio’ 옵션 값이다.<br />
                이 옵션이 적용될 경우, bUseCss3d와 bUseTimingFunction은 false값을 가진다.<br />
            @param {Number} [htOption.nRatio=1.5] sListElement가 설정되었을때, 유지하는 고정범위 비이다.
            @param {Boolean} [htOption.bUseTranslate=true] 컨텐츠의 좌표이동 방법을 결정한다.<br />
                bUseTranslate가 true일 경우, CSS3의 Translate으로 이동하고, false일 경우, style의 left,top으로 이동한다.
    **/
	$init : function(el,htUserOption) {
		this.option({
			bActivateOnload : true,
			bUseHScroll : false,
			bUseVScroll : true,
			bUseMomentum : true,
			nDeceleration : 0.0006,
			nOffsetTop : 0,
			nOffsetBottom : 0,
			nHeight : 0,
			nWidth : 0,
			bUseBounce : true,
			bUseHighlight : true,
			sClassPrefix : 'scroll_',
			bUseCss3d : jindo.m._isUseCss3d(),
			bUseTimingFunction : jindo.m._isUseTimingFunction(),
			sListElement : '',
			nRatio : 1.5,
			bUseTranslate : true
		});
		this.option(htUserOption || {});
		this._initVar();
		this._setWrapperElement(el);
		if(this.option("bActivateOnload")) {
			this.activate();
		}
		// console.log("bUseHighlight : " + this.option("bUseHighlight") + ", bUseCss3d:" + this.option("bUseCss3d") + ", bUseTimingFunction : " + this.option("bUseTimingFunction") + ", bUseTranslate : " + this.option("bUseTranslate"));
	},

    /**
        jindo.m.CoreScroll 에서 사용하는 모든 인스턴스 변수를 초기화한다.
    **/
	_initVar: function() {
		var htDeviceInfo = jindo.m.getDeviceInfo();
		this.isPositionBug = htDeviceInfo.android && !htDeviceInfo.bChrome;
		this.isIos = htDeviceInfo.ipad || htDeviceInfo.iphone;
		this.isClickBug = jindo.m.hasClickBug();
		// this.isDubleEndBug = htDeviceInfo.win8;
		this.nVersion = parseFloat(htDeviceInfo.version.substr(0,3));
		this.sCssPrefix = jindo.m.getCssPrefix();
		this.sTranOpen = null;
		this.sTranEnd = null;
		this.nWrapperW = null;
		this.nWrapperH = null;
		this.nScrollW = null;
		this.nScrollH = null;
		this.nMaxScrollLeft = null;
		this.nMaxScrollTop = null;
		this.nMinScrollTop = null;
		this.bUseHScroll = null;
		this.bUseVScroll = null;
		this._nLeft = 0;
		this._nTop = 0;
		this.bUseHighlight = this.option("bUseHighlight");
		this._aAni = [];
		this._nAniTimer = -1;
		this._nFixedPositionBugTimer = -1;
		// this._nFixedDubbleEndBugTimer = null;
		this._nTouchEndTimer = -1;

		this._oTouch = null;
		this._oDynamicScrollPlugin = null;
		this._bUseDynamicScroll = false;
		this._isAnimating = false;		// 순수 animate 처리
		this._isControling = false;		// 사용자가 움직이고 있는가?
		this._isStop = false;

		// DynamicScroll을 사용한다고 할경우, bUseCss3d는 항상 false
		if(this.option("sListElement")) {
			this.option("bUseCss3d", false);
		}
		this._setTrans();

		/**
		 *  하이라이트 기능을 사용할 경우에만 적용됨.
		 *  android 경우, css,offset, translate에 의해 이동된 영역의 하이라이트 및 영역이 갱신되지 않는 문제
		 * translate의 위치를 초기화하고 css, offset에 맞게 위치를 변경해준다. 또한 대상 영역하위의 a tag에 focus를 준다.
		 */
		if(this.bUseHighlight) {
			if(this.isPositionBug) {
				this._elDummyTag = null;	//for focus
			}
			/**
			 *  iOS를 위한 anchor 처리
			 * ios일 경우, touchstart시 선택된 영역에 anchor가 있을 경우, touchend 시점에 touchstart영역에 click이 타는 문제
			 * 모든 a link에 bind된, onclick 이벤트를 제거한다.
			 */
			if(this.isClickBug) {
				this._aAnchor = null;
				this._fnDummyFnc = function(){return false;};
				this._bBlocked = false;
			}
		}
	},

    /**
        3d Trans 또는 Trans를 기기별로 적용
    **/
	_setTrans : function() {
		if(this.option("bUseCss3d")) {
			this.sTranOpen = "3d(";
			this.sTranEnd = ",0)";
		} else {
			this.sTranOpen = "(";
			this.sTranEnd = ")";
		}
	},


    /**
        현재 포지션을 반환함.

        @method getCurrentPos
        @return {Object} nTop, nLeft의 값을 반환한다.
        @history 1.1.0 Update Method 추가
    **/
	getCurrentPos : function() {
		return {
			nTop : this._nTop,
			nLeft : this._nLeft
		};
	},

    /**
        wrapper 엘리먼트와 scroller 엘리먼트를 설정한다.

        @method setLayer
        @param {Varient} el 엘리먼트를 가리키는 문자열이나, HTML엘리먼트
    **/
	setLayer : function(el) {
		this._htWElement["wrapper"] = jindo.$Element(el);
		this._htWElement["wrapper"].css("overflow", "hidden");
		if(this._htWElement["wrapper"].css("position") == "static") {
			this._htWElement["wrapper"].css("position", "relative");
		}
		if(!this.bUseHighlight) {
			this._htWElement["wrapper"].css("-" + this.sCssPrefix + "-tap-highlight-color","transparent");
		}
		this.setScroller();
	},

    /**
        스크롤러관련 엘리먼트를 설정함

        @method setScroller
    **/
	setScroller : function() {
		this._htWElement["scroller"] = this._htWElement["wrapper"].first();

		/**
		 * Transform : translate이 초기에 적용될 경우,
		 * ios계열에서 깜빡거리거나, 이벤트 행이 걸리는 문제가 발생함
		 * hide시킨후, 적용을 하면 이러한 현상이 완화됨.
		 *
		 * 따라서, hide -> Transfom : translate 적용 -> show
		 */
		this._htWElement["scroller"].css({
				"position" : "absolute",
				"zIndex" : 1,
				"left" : 0,
				"top" : 0
		});
		if(this.option("bUseTranslate") || this.option("bUseCss3d")) {
			this._htWElement["scroller"].css("-" + this.sCssPrefix + "-transition-property", "-" + this.sCssPrefix + "-transform")
				.css("-" + this.sCssPrefix + "-transform", "translate" + this.sTranOpen + "0,0" + this.sTranEnd);
		}
		if(this.option("bUseTimingFunction")) {
			this._htWElement["scroller"].css("-" + this.sCssPrefix + "-transition-timing-function", "cubic-bezier(0.33,0.66,0.66,1)");
		}
		// 안드로이드 버그 수정 (android 2.x 이하 버젼)
		if(this.isPositionBug && this.bUseHighlight && this.nVersion < 3) {
			this._elDummyTag = this._htWElement["scroller"].query("._scroller_dummy_atag_");
			
			if(!this._elDummyTag) {
				this._elDummyTag = jindo.$("<a href='javascript:void(0);' style='position:absolute;height:0px;width:0px;' class='_scroller_dummy_atag_'></a>");
				this._htWElement["scroller"].append(this._elDummyTag);
			}else{
			    this._elDummyTag = this._elDummyTag.$value();
			}
		}
	},

    /**
        jindo.m.CoreScroll 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
        @param {Varient} el 엘리먼트를 가리키는 문자열이나, HTML엘리먼트
    **/
	_setWrapperElement: function(el) {
		this._htWElement = {};
		this.setLayer(el);
	},

    /**
        스크롤러를 위한 환경을 재갱신함

        @method refresh
        @param {Object} bNoRepos true 일 경우, 포지션을 갱신하지 않음
    **/
	refresh : function(bNoRepos) {

		if(!this.isActivating()) {
			return;
		}
		// wrapper와 스크롤러의 크기 판별
		// wrappwer 크기 지정
		if(this.option("nWidth")) {
			this._htWElement["wrapper"].width(parseInt(this.option("nWidth"),10));
		}
		if(this.option("nHeight")) {
			this._htWElement["wrapper"].height(parseInt(this.option("nHeight"),10));
		}
		var nWidthLeft = parseInt(this._htWElement["wrapper"].css("border-left-width"),10),
			nWidthRight = parseInt(this._htWElement["wrapper"].css("border-right-width"),10),
			nHeightTop = parseInt(this._htWElement["wrapper"].css("border-top-width"),10),
			nHeightBottom = parseInt(this._htWElement["wrapper"].css("border-bottom-width"),10);
		nWidthLeft = isNaN(nWidthLeft) ? 0 : nWidthLeft;
		nWidthRight = isNaN(nWidthRight) ? 0 : nWidthRight;
		nHeightTop = isNaN(nHeightTop) ? 0 : nHeightTop;
		nHeightBottom = isNaN(nHeightBottom) ? 0 : nHeightBottom;
		// console.log( nWidthLeft + " , " + nWidthLeft + " , " + nHeightTop + " , " + nHeightBottom  );
		this.nWrapperW = this._htWElement["wrapper"].width() - nWidthLeft - nWidthRight;
		this.nWrapperH = this._htWElement["wrapper"].height() - nHeightTop - nHeightBottom;
		this.nScrollW = this._htWElement["scroller"].width();
		this.nScrollH = this._htWElement["scroller"].height() - this.option("nOffsetBottom");

		this.nMaxScrollLeft = this.nWrapperW - this.nScrollW;
		this.nMaxScrollTop = this.nWrapperH - this.nScrollH;
		this.nMinScrollTop = -this.option("nOffsetTop");
		// console.log(this.nWrapperW + " , " + this.nWrapperH + "||" + this.nScrollW + "," + this.nScrollH);

		// 모든 A태그
		if(this.bUseHighlight && this.isClickBug) {
			this._aAnchor = jindo.$$("A", this._htWElement["scroller"].$value());
		}
		// 스크롤 여부 판별
		this.bUseHScroll = this.option("bUseHScroll") && (this.nWrapperW <= this.nScrollW);
		this.bUseVScroll = this.option("bUseVScroll") && (this.nWrapperH <= this.nScrollH);
//		console.log(this.bUseHScroll, this.bUseVScroll, this._htWElement["wrapper"].height(), this._htWElement["wrapper"].$value().offsetHeight);

		// 스크롤 여부에 따른 스타일 지정
		if(this.bUseHScroll && !this.bUseVScroll) {	// 수평인 경우
			this._htWElement["scroller"].$value().style["height"] = "100%";
		}
		if(!this.bUseHScroll && this.bUseVScroll) {	// 수직인 경우
			this._htWElement["scroller"].$value().style["width"] = "100%";
		}

		/**
		 * 범위(nRation * 2) 보다 scroller가 작을 경우는 적용되지 않는다.
		 */
		this._bUseDynamicScroll = false;
		if(this.option("sListElement") && !(this.bUseVScroll && this.bUseHScroll) ) {
			var nRange = this.option("nRatio") * 2;
			if( this.bUseVScroll && (this.nScrollH > (this.nWrapperH * nRange)) ) {
				this._createDynamicScrollPlugin("V");
			} else if( this.bUseHScroll && (this.nScrollW > (this.nWrapperW * nRange)) ) {
				this._createDynamicScrollPlugin("H");
			}
		}

		if(!this.bUseHScroll && !this.bUseVScroll) { // 스크롤이 발생하지 않은 경우, 안드로이드인경우 포지션을 못잡는 문제
			this._fixPositionBug();
		}
		if(!bNoRepos) {
			this.restorePos(0);
		}
		// console.log(this.bUseVScroll + " , " + this.bUseHScroll);
		// console.log(this._htWElement["scroller"].toString());
	},

    /**
        jindo.m.DynamicScrollPlugin 생성
        @param  {String} sDirection V(수직), H(수평)
    **/
	_createDynamicScrollPlugin : function(sDirection) {
		if(!this._oDynamicScrollPlugin) {
			// alert("createDynamicScrollPlugin---");
			this._oDynamicScrollPlugin = new jindo.m.DynamicPlugin(this._htWElement["wrapper"], {
				nRatio : this.option("nRatio"),
				sListElement : this.option("sListElement"),
				sDirection : sDirection
			});
		}
		this._oDynamicScrollPlugin.refresh(sDirection == "V" ? this._nTop : this._nLeft);
		this.option("bUseTimingFunction", false);
		this._bUseDynamicScroll = true;
	},

    /**
        스크롤의 위치를 지정함
        @param {Number} nLeft
        @param {Number} nTop
    **/
	_setPos : function(nLeft,nTop) {
		var sDirection;
		nLeft = this.bUseHScroll ? nLeft : 0;
		nTop = this.bUseVScroll ? nTop : 0;
        // console.log("setPos : " + this._nLeft + ", " + this._nTop + ", (nLeft,nTop) : " + nLeft + ", " + nTop);
		if(this._bUseDynamicScroll) {
			sDirection = this._checkDirection(nLeft,nTop);
		}
		/**
            스크롤러 위치 변경되기 전

            @event beforePosition
            @param {String} sType 커스텀 이벤트명
            @param {Number} nLeft Scroller의 left 값
            @param {Number} nTop Scroller의 top 값
            @param {Number} nMaxScrollLeft Scroller의 최대 left 값
            @param {Number} nMaxScrollTop Scroller의 최대 top 값
            @param {Function} stop 수행시 position 이벤트가 발생하지 않음
        **/
		if (this._fireEvent("beforePosition")) {
			this._isControling = true;
			this._nLeft = nLeft;
			this._nTop = nTop;
			if(this._bUseDynamicScroll) {
				this._oDynamicScrollPlugin.updateListStatus(sDirection, this.bUseVScroll ? this._nTop : this._nLeft);
			}
			if(this.option("bUseTranslate")) {
				if (this.bUseHighlight && this.isPositionBug) {
					var htStyleOffset = this.getStyleOffset(this._htWElement["scroller"]);
					nLeft -= htStyleOffset.left;
					nTop -= htStyleOffset.top;
				}
				this._htWElement["scroller"].css("-" + this.sCssPrefix + "-transform", "translate" + this.sTranOpen + nLeft + "px, " + nTop + "px" + this.sTranEnd);
			} else {
				this._htWElement["scroller"].css({
					"left" : nLeft + "px",
					"top" : nTop + "px"
				});
			}
			// this.tick();
			 /**
                스크롤러 위치 변경된 후

                @event position
                @param {String} sType 커스텀 이벤트명
                @param {Number} nLeft Scroller의 left 값
                @param {Number} nTop Scroller의 top 값
                @param {Number} nMaxScrollLeft Scroller의 최대 left 값
                @param {Number} nMaxScrollTop Scroller의 최대 top 값
                @param {Function} stop 수행시 영향을 받는것이 없음
            **/
			this._fireEvent("position");
		}
	},

	_checkDirection : function(nLeft, nTop) {
		var nBeforePos = this.bUseVScroll ? this._nTop : this._nLeft,
			nAfterPos = this.bUseVScroll ? nTop : nLeft,
			sDirection;
		if(nBeforePos > nAfterPos) {
        	sDirection = "forward";
        } else {
        	sDirection = "backward";
        }
        return sDirection;
	},

    /**
        스크롤영역으로 복원함

        @method restorePos
        @param {Number} nDuration
    **/
	restorePos : function(nDuration) {
		if(!this.bUseHScroll && !this.bUseVScroll) {
			return;
		}
		// 최대, 최소범위 지정
		var nNewLeft = this.getPosLeft(this._nLeft),
			nNewTop = this.getPosTop(this._nTop);

		if (nNewLeft === this._nLeft && nNewTop === this._nTop) {
			/* 최종 종료 시점 */
			this._isControling = false;
			 /**
                스크롤러 위치 변경이 최종적으로 끝났을 경우

                @event afterScroll
                @param {String} sType 커스텀 이벤트명
                @param {Number} nLeft Scroller의 left 값
                @param {Number} nTop Scroller의 top 값
                @param {Number} nMaxScrollLeft Scroller의 최대 left 값
                @param {Number} nMaxScrollTop Scroller의 최대 top 값
                @param {Function} stop 수행시 영향을 받는것이 없음
            **/
			this._fireEvent("afterScroll");
			this._fixPositionBug();
			return;
		} else {
			this.scrollTo(nNewLeft, nNewTop , nDuration);
		}
	},

    /**
        모멘텀을 계산하여 앞으로 이동할 거리와 시간을 속성으로 갖는 객체를 반환함
        @param {Number} nDistance
        @param {Number} nSpeed
        @param {Number} nMomentum
        @param {Number} nSize
        @param {Number} nMaxDistUpper
        @param {Number} nMaxDistLower
    **/
	_getMomentum: function (nDistance, nSpeed, nMomentum, nSize, nMaxDistUpper, nMaxDistLower) {
		var nDeceleration = this.option("nDeceleration"),
			nNewDist = nMomentum / nDeceleration,
			nNewTime = 0,
			nOutsideDist = 0;
		//console.log("momentum : " + nDistance + ", " + nSpeed + ", " + nMomentum + ",  " + nSize + ", " + nMaxDistUpper + " , " + nMaxDistLower + ", " + nNewDist);
		if (nDistance < 0 && nNewDist > nMaxDistUpper) {
			nOutsideDist = nSize / (6 / (nNewDist / nSpeed * nDeceleration));
			nMaxDistUpper = nMaxDistUpper + nOutsideDist;
			nSpeed = nSpeed * nMaxDistUpper / nNewDist;
			nNewDist = nMaxDistUpper;
		} else if (nDistance > 0 && nNewDist > nMaxDistLower) {
			nOutsideDist = nSize / (6 / (nNewDist / nSpeed * nDeceleration));
			nMaxDistLower = nMaxDistLower + nOutsideDist;
			nSpeed = nSpeed * nMaxDistLower / nNewDist;
			nNewDist = nMaxDistLower;
		}
		nNewDist = nNewDist * (nDistance > 0 ? -1 : 1);
		nNewTime = nSpeed / nDeceleration;
		//console.log("momentum nSpeed : " + nSpeed + ", nMomentum : " + nMomentum + ", nNewDist : " + nNewDist + ", nTop : " + this._nTop + ", nNewTime : " + nNewTime);
		return {
			nDist: nNewDist,
			nTime: Math.round(nNewTime)
		};
	},

    /**
        애니메이션을 초기화한다.
    **/
	_stop : function() {
		if(this.option("bUseTimingFunction")) {
			jindo.m.detachTransitionEnd(this._htWElement["scroller"].$value(), this._htEvent["TransitionEnd"]);
		} else {
			cancelAnimationFrame(this._nAniTimer);
		}
		this._aAni = [];
		this._isAnimating = false;
		this._isStop = true;
	},

    /**
        스크롤을 해당 위치(nLeft, nTop)로 이동한다.
        @remark 최상위의 위치는 0,0 이다.<br />
            스크롤의 내용을 아래로 내리거나, 오른쪽으로 이동하려면 - 값을 주어야 한다.

        @method scrollTo
        @param {Number} nLeft -일 경우, 스크롤 내용이 오른쪽으로 이동한다.
        @param {Number} nTop -일 경우, 스크롤 내용이 아래로 이동한다.
        @param {Number} nDuration
        @history 1.1.0 Update nLeft, nTop 값이 양수일 경우 아래쪽, 오른쪽 방향으로 가도록 변경(음수일 경우 "절대값"으로 계산됨)

    **/
	scrollTo: function (nLeft, nTop , nDuration) {
		this._stop();
		nLeft = this.bUseHScroll ? nLeft : 0;
		nTop = this.bUseVScroll ? nTop : 0;
		this._aAni.push({
			nLeft: nLeft,
			nTop: nTop,
			nDuration: nDuration || 0
		});
		this._animate();
	},

    /**
        동작 여부를 반환

        @method isMoving
        @return {Boolean}  동작 여부
    **/
	isMoving : function() {
		return this._isControling;
	},

    /**
        애니메이션을 호출한다.
    **/
	_animate : function() {
		var self = this,
			oStep;
		if (this._isAnimating) {
			return;
		}
		if(!this._aAni.length) {
			this.restorePos(300);
			return;
		}
		// 동일할 경우가 아닐때 까지 큐에서 Step을 뺌.
		do {
			oStep = this._aAni.shift();
			if(!oStep) {
				return;
			}
		} while( oStep.nLeft == this._nLeft && oStep.nTop == this._nTop );

		if(oStep.nDuration == 0) {
			if (this.option("bUseTimingFunction")) {
				this._transitionTime(0);
			}
			this._setPos(oStep.nLeft, oStep.nTop);
			this._animate();
		} else {
			// this.start();
			this._isAnimating = true;
			// Transition을 이용한 animation
			if (this.option("bUseTimingFunction")) {
				this._transitionTime(oStep.nDuration);
				this._setPos(oStep.nLeft, oStep.nTop);
				this._isAnimating = false;
				jindo.m.attachTransitionEnd(this._htWElement["scroller"].$value(), this._htEvent["TransitionEnd"]);
			} else {
				// AnimationFrame을 이용한 animation
				var startTime = (new Date()).getTime(),
					nStartLeft = this._nLeft, nStartTop = this._nTop;
				(function animate () {
					var now = (new Date()).getTime(),nEaseOut;
					if (now >= startTime + oStep.nDuration) {
						self._setPos(oStep.nLeft, oStep.nTop);
						self._isAnimating = false;
						self._animate();
						return;
					}
					now = (now - startTime) / oStep.nDuration - 1;
					nEaseOut = Math.sqrt(1 - Math.pow(now,2));
					self._setPos((oStep.nLeft - nStartLeft) * nEaseOut + nStartLeft, (oStep.nTop - nStartTop) * nEaseOut + nStartTop);
					if (self._isAnimating) {
						self._nAniTimer = requestAnimationFrame(animate);
					}
				})();
			}
		}
	},

    /**
        transition duration 지정
        @param {Nubmer} nDuration
    **/
	_transitionTime: function (nDuration) {
		nDuration += 'ms';
		this._htWElement["scroller"].css("-" + this.sCssPrefix + "-transition-duration", nDuration);
		this._fireEventSetDuration(nDuration);
	},

    /**
        Anchor 삭제. for iOS
    **/
	_clearAnchor : function() {
		// console.log("clear : " + !!this._aAnchor + " | " + this._bBlocked + " | " + this.isClickBug);
		if(this.isClickBug && this._aAnchor && !this._bBlocked) {
			var aClickAddEvent = null;
			for(var i=0, nILength=this._aAnchor.length; i<nILength; i++) {
				if(!this._aAnchor[i].___isClear___) {
					if (this._fnDummyFnc !== this._aAnchor[i].onclick) {
						this._aAnchor[i]._onclick = this._aAnchor[i].onclick;
					}
					this._aAnchor[i].onclick = this._fnDummyFnc;
					this._aAnchor[i].___isClear___ = true;
					aClickAddEvent = this._aAnchor[i].___listeners___ || [];
					for(var j=0, nJLength = aClickAddEvent.length; j<nJLength; j++) {
						___Old__removeEventListener___.call(this._aAnchor[i], "click", aClickAddEvent[j].listener, aClickAddEvent[j].useCapture);
					}
				}
			}
			this._bBlocked = true;
			// addConsole("삭제");
		}
	},

    /**
        Anchor 복원. for iOS
    **/
	_restoreAnchor : function() {
		//console.log("restore : " + this._aAnchor + " , " + this._bBlocked);
		if(this.isClickBug && this._aAnchor && this._bBlocked) {
			var aClickAddEvent = null;
			for(var i=0, nILength=this._aAnchor.length; i<nILength; i++) {
				if(this._aAnchor[i].___isClear___) {
					if(this._fnDummyFnc !== this._aAnchor[i]._onclick) {
						this._aAnchor[i].onclick = this._aAnchor[i]._onclick;
					} else {
						this._aAnchor[i].onclick = null;
					}
					this._aAnchor[i].___isClear___ = null;
					aClickAddEvent = this._aAnchor[i].___listeners___ || [];
					for(var j=0, nJLength = aClickAddEvent.length; j<nJLength; j++) {
						___Old__addEventListener___.call(this._aAnchor[i], "click", aClickAddEvent[j].listener, aClickAddEvent[j].useCapture);
					}
				}
			}
			this._bBlocked = false;
			// addConsole("복");
		}
	},

    /**
        이동중 멈추는 기능. 이때 멈춘 위치의 포지션을 지정
    **/
	_stopScroll : function() {
		var htCssOffset = jindo.m.getCssOffset(this._htWElement["scroller"].$value()),
			htStyleOffset ={left : 0, top : 0}, nTop, nLeft;

		if(this.isPositionBug && this.bUseHighlight || !this.option("bUseTranslate")) {
			htStyleOffset = this.getStyleOffset(this._htWElement["scroller"]);
		}

		nLeft = htCssOffset.left + htStyleOffset.left;
		nTop = htCssOffset.top + htStyleOffset.top;
		// addConsole(nLeft + "," + this._nLeft + "|" + nTop + "," +this._nTop);
		if(nLeft !== parseInt(this._nLeft,10) || nTop !== parseInt(this._nTop,10)) {
			this._stop();
			this._setPos(this.getPosLeft(nLeft), this.getPosTop(nTop));
			this._isControling = false;
			this._fireEvent("afterScroll");
			this._fixPositionBug();
		}
	},

    /**
        Style의 left,top을 반환함

        @method getStyleOffset
        @param {jindo.$Element} wel
    **/
	getStyleOffset : function(wel) {
		var nLeft = parseInt(wel.css("left"),10),
			nTop = parseInt(wel.css("top"),10);
		nLeft = isNaN(nLeft) ? 0 : nLeft;
		nTop = isNaN(nTop) ? 0 : nTop;
		return {
			left : nLeft,
			top : nTop
		};
	},

    /**
        Boundary를 초과하지 않는 X (left) 포지션 반환

        @method getPosLeft
        @param {Number{}} nPos
    **/
	getPosLeft : function(nPos) {
		return (nPos >= 0 ? 0 : (nPos <= this.nMaxScrollLeft ? this.nMaxScrollLeft : nPos) );
	},

    /**
        Boundary를 초과하지 않는 Y (top) 포지션 반환

        @method getPosTop
        @param {Number{}} nPos
    **/
	getPosTop : function(nPos) {
		return (nPos >= this.nMinScrollTop ? this.nMinScrollTop : (nPos <= this.nMaxScrollTop ? this.nMaxScrollTop : nPos) );
	},


    /**
        setDuration 사용자 이벤트 호출
    **/
	_fireEventSetDuration : function(nDuration) {

		this.fireEvent("setDuration", {
			nDuration: nDuration,
			bUseHScroll : this.bUseHScroll,
			bUseVScroll : this.bUseVScroll
		});
	},

    /**
        beforeScroll 사용자 이벤트 호출
    **/
	_fireEventbeforeScroll : function(htParam) {
	       /**
            touchEnd시 스크롤인 경우, 스크롤러의 위치가 변경되기 전
            여기에서 넘어가는 파라미터를 변경시, 변경된 값이 스크롤러의 위치 변경에 영향을 미침

            @event beforeScroll
            @param {String} sType 커스텀 이벤트명
            @param {Number} nDistanceX touchStart의 X좌표와의 상대적인 거리.(touchStart좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
            @param {Number} nDistanceY touchStart의 Y좌표와의 상대적인 거리.(touchStart좌표에서 위쪽방향이면 양수, 아래쪽 방향이면 음수)
            @param {Number} nMomentumX 가속 발생 구간일 경우 현재 터치 움직임의 수평방향 운동에너지값,가속 구간이 아닐경우 0
            @param {Number} nMomentumY 가속 발생 구간일 경우 현재 터치 움직임의 수직방향 운동에너지값,가속 구간이 아닐경우 0
            @param {Number} nLeft Scroller의 left 값
            @param {Number} nTop Scroller의 top 값
            @param {Number} nNextLeft 가속 발생시, 변경될 scroller의 left값 (가속 미발생시, nLeft와 동일)
            @param {Number} nNextTop 가속 발생시, 변경될 scroller의 top값 (가속 미발생시, nTop와 동일)
            @param {Number} nTime 가속 발생시, 가속이 적용될 ms시간 (가속 미발생시, 0)
            @param {Function} stop 수행시 scroll 이벤트가 발생하지 않음
        **/
		return this.fireEvent("beforeScroll", htParam);
	},

    /**
        scroll 사용자 이벤트 호출
    **/
	_fireEventScroll : function(htParam) {
	    /**
            touchEnd시 스크롤인 경우, 스크롤러의 위치가 변경된 후
            여기에서 넘어가는 파라미터를 변경시, 변경된 값이 스크롤러의 위치 변경에 영향을 미침

            @event scroll
            @param {String} sType 커스텀 이벤트명
            @param {Number} nDistanceX touchStart의 X좌표와의 상대적인 거리.(touchStart좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
            @param {Number} nDistanceY touchStart의 Y좌표와의 상대적인 거리.(touchStart좌표에서 위쪽방향이면 양수, 아래쪽 방향이면 음수)
            @param {Number} nMomentumX 가속 발생 구간일 경우 현재 터치 움직임의 수평방향 운동에너지값,가속 구간이 아닐경우 0
            @param {Number} nMomentumY 가속 발생 구간일 경우 현재 터치 움직임의 수직방향 운동에너지값,가속 구간이 아닐경우 0
            @param {Number} nLeft Scroller의 left 값
            @param {Number} nTop Scroller의 top 값
            @param {Number} nNextLeft 가속 발생시, 변경될 scroller의 left값 (가속 미발생시, nLeft와 동일)
            @param {Number} nNextTop 가속 발생시, 변경될 scroller의 top값 (가속 미발생시, nTop와 동일)
            @param {Number} nTime 가속 발생시, 가속이 적용될 ms시간 (가속 미발생시, 0)
            @param {Function} stop 수행시 영향을 받는것이 없음
        **/
		this.fireEvent("scroll", htParam);
	},

    /**
        범용 사용자 이벤트 호출
    **/
	_fireEvent : function(sType) {
		return this.fireEvent(sType, {
			nLeft : this._nLeft,
			nTop : this._nTop,
			nMaxScrollLeft : this.nMaxScrollLeft,
			nMaxScrollTop : this.nMaxScrollTop
		});
	},

    /**
        범용 touch 사용자 이벤트
    **/
	_fireTouchEvent : function(sType, we) {
		return this.fireEvent(sType, {
			nLeft : this._nLeft,
			nTop : this._nTop,
			nMaxScrollLeft : this.nMaxScrollLeft,
			nMaxScrollTop : this.nMaxScrollTop,
			oEvent : we
		});
	},

    /**
        Touchstart시점 이벤트 핸들러
        @param {jindo.$Event} we
    **/
	_onStart : function(we) {
		// console.log	("touchstart (" + we.nX + "," + we.nY + ") this._isAnimating " + this._isAnimating);
		this._clearPositionBug();
		/**
                touchStart 내부 스크롤로직이 실행되기 전

                @event beforeTouchStart
                @param {String} sType 커스텀 이벤트명
                @param {Number} nLeft Scroller의 left 값
                @param {Number} nTop Scroller의 top 값
                @param {Number} nMaxScrollLeft Scroller의 최대 left 값
                @param {Number} nMaxScrollTop Scroller의 최대 top 값
                @param {jindo.$Event} oEvent touchStart 이벤트 객체
                @param {Function} stop 수행시 touchStart 이벤트가 발생하지 않음
            **/
		if(this._fireTouchEvent("beforeTouchStart",we)) {
			this._clearAnchor();
			this._isAnimating = false;
			this._isControling = true;
			this._isStop = false;
			if (this.option("bUseTimingFunction")) {
				this._transitionTime(0);
			}
			// 이동중 멈추었을 경우
			this._stopScroll();
			// addConsole("start : " + this._isStop);
			/**
                touchStart 내부 스크롤로직이 실행된 후

                @event touchStart
                @param {String} sType 커스텀 이벤트명
                @param {Number} nLeft Scroller의 left 값
                @param {Number} nTop Scroller의 top 값
                @param {Number} nMaxScrollLeft Scroller의 최대 left 값
                @param {Number} nMaxScrollTop Scroller의 최대 top 값
                @param {jindo.$Event} oEvent touchStart 이벤트 객체
                @param {Function} stop 수행시 영향을 받는것이 없음
            **/
			if(!this._fireTouchEvent("touchStart",we)) {
				we.stop();
			}
		} else {
			we.stop();
		}
	},

    /**
        이동시점 이벤트 핸들러
        @param {jindo.$Event} we
    **/
	_onMove : function(we) {
		this._clearTouchEnd();
		// addConsole("move : " + we.sMoveType);
		// console.log("touchmove (" + we.nX + "," + we.nY + "), Vector (" + we.nVectorX + "," + we.nVectorY + ") sMoveType : " + we.sMoveType);
		/** 시스템 스크롤 막기 */
		var weParent = we.oEvent;
		if(we.sMoveType === jindo.m.MOVETYPE[0]) {	//수평이고, 수평스크롤인 경우 시스템 스크롤 막기
			if(this.bUseHScroll) {
				if( !this.option("bUseBounce") && ( (this._nLeft >= 0 && we.nVectorX > 0) || (this._nLeft <= this.nMaxScrollLeft && we.nVectorX < 0) )  ) {
					this._forceRestore(we);
					return;
				} else {
					weParent.stop(jindo.$Event.CANCEL_ALL);
				}
			} else {
				return true;
			}
		} else if(we.sMoveType === jindo.m.MOVETYPE[1]) {	//수직이고, 수직스크롤인 경우 시스템 스크롤 막기
			if(this.bUseVScroll) {
				if( !this.option("bUseBounce") && ( (this._nTop >= this.nMinScrollTop && we.nVectorY > 0) || (this._nTop <= this.nMaxScrollTop && we.nVectorY < 0) )  ) {
					this._forceRestore(we);
					return;
				} else {
					weParent.stop(jindo.$Event.CANCEL_ALL);
				}
			} else {
				return true;
			}
		} else if(we.sMoveType === jindo.m.MOVETYPE[2]) {	//대각선일 경우, 시스템 스크롤 막기
			weParent.stop(jindo.$Event.CANCEL_ALL);
		} else {	// 탭, 롱탭인 경우, 다 막기
			weParent.stop(jindo.$Event.CANCEL_ALL);
			return true;
		}
        /**
            touchMove 내부 스크롤로직이 실행되기 전

            @event beforeTouchMove
            @param {String} sType 커스텀 이벤트명
            @param {Number} nLeft Scroller의 left 값
            @param {Number} nTop Scroller의 top 값
            @param {Number} nMaxScrollLeft Scroller의 최대 left 값
            @param {Number} nMaxScrollTop Scroller의 최대 top 값
            @param {jindo.$Event} oEvent touchMove  이벤트 객체
            @param {Function} stop 수행시 move 이벤트가 발생하지 않음
        **/
		if (this._fireTouchEvent("beforeTouchMove",we)) {
			var nNewLeft, nNewTop;
			this._clearPositionBug();
			if(this.option("bUseBounce")) {
				nNewLeft = this._nLeft + (this._nLeft >=0 || this._nLeft <= this.nMaxScrollLeft ? we.nVectorX/2 : we.nVectorX);
				nNewTop = this._nTop + (this._nTop >= this.nMinScrollTop || this._nTop <= this.nMaxScrollTop ? we.nVectorY/2 : we.nVectorY);
				/** 갤럭시S3에서는 상단영역을 벗어나면 touchEnd가 발생하지 않음
				 * 상단영역 30이하로 잡힐 경우 복원
				 */
				// if (this.bUseVScroll && we.nY <= 30 && !this.bUseHScroll) {
				// 	this._forceRestore(we);
				// 	return;
				// }
				var self=this;
				this._nTouchEndTimer = setTimeout(function() {
					// addConsole("안타나?");
					self._forceRestore(we);
				},500);
			} else {
				nNewLeft = this.getPosLeft(this._nLeft + we.nVectorX);
				nNewTop = this.getPosTop(this._nTop + we.nVectorY);
			}
			this._setPos(nNewLeft, nNewTop);
			/**
                touchMove 내부 스크롤로직이 실행된 후

                @event touchMove
                @param {String} sType 커스텀 이벤트명
                @param {Number} nLeft Scroller의 left 값
                @param {Number} nTop Scroller의 top 값
                @param {Number} nMaxScrollLeft Scroller의 최대 left 값
                @param {Number} nMaxScrollTop Scroller의 최대 top 값
                @param {jindo.$Event} oEvent touchMove  이벤트 객체
                @param {Function} stop 수행시 영향을 받는것이 없음
            **/
			if(!this._fireTouchEvent("touchMove",we)) {
				we.stop();
			}
		} else {
			we.stop();
		}
	},

    /**
        Touchend 시점 이벤트 핸들러
        @param {jindo.$Event} we
    **/
	_onEnd : function(we) {
		// console.log("touchend [" + we.sMoveType + "](" + we.nX + "," + we.nY + "), Vector(" + we.nVectorX + "," + we.nVectorY + "), MomentumY : "+ we.nMomentumY + ", speedY : " + we.nSpeedY);
		// addConsole("OnEndProcess");
		/**
            touchEnd 내부 스크롤로직이 실행되기 전

            @event beforeTouchEnd
            @param {String} sType 커스텀 이벤트명
            @param {Number} nLeft Scroller의 left 값
            @param {Number} nTop Scroller의 top 값
            @param {Number} nMaxScrollLeft Scroller의 최대 left 값
            @param {Number} nMaxScrollTop Scroller의 최대 top 값
            @param {jindo.$Event} oEvent touchEnd 이벤트 객체
            @param {Function} stop 수행시 touchEnd 이벤트가 발생하지 않음
        **/
		if (this._fireTouchEvent("beforeTouchEnd",we)) {
			this._clearPositionBug();
			this._clearTouchEnd();
			// addConsole("end : " + we.sMoveType);
			// 1) 스크롤인 경우
			if (we.sMoveType === jindo.m.MOVETYPE[0] || we.sMoveType === jindo.m.MOVETYPE[1] || we.sMoveType === jindo.m.MOVETYPE[2]) {
				this._endForScroll(we);
				if(this.isClickBug || this.nVersion < 4.1) {
					we.oEvent.stop(jindo.$Event.CANCEL_DEFAULT);
				}
			} else {	// 2) 스크롤이 아닌 경우
				// 클릭 이후 페이지 뒤로 돌아왔을 경우, 문제가됨. 동작중인 상태를 초기화함
				this._isControling = false;
				if (!this._isStop) {
					if(this.bUseHighlight) {
						this._restoreAnchor();
					}
				}
			}
			/**
                touchEnd 내부 스크롤로직이 실행된 직후

                @event touchEnd
                @param {String} sType 커스텀 이벤트명
                @param {Number} nLeft Scroller의 left 값
                @param {Number} nTop Scroller의 top 값
                @param {Number} nMaxScrollLeft Scroller의 최대 left 값
                @param {Number} nMaxScrollTop Scroller의 최대 top 값
                @param {jindo.$Event} oEvent touchEnd 이벤트 객체
                @param {Function} 수행시 영향 받는것 없음.
            **/
			if(!this._fireTouchEvent("touchEnd",we)) {
				we.stop();
			}
		} else {
			we.stop();
		}
	},

    /**
        스크롤을 강제로 복귀한다.
        @param  {jindo.$Event} we 이벤트
    **/
	_forceRestore : function(we) {
		we.nMomentumX = we.nMomentumY = null;
		this._endForScroll(we);
		this._clearPositionBug();
		this._clearTouchEnd();
	},

    /**
        touchEnd 시점 스크롤 처리
        @param {jindo.$Event} we
    **/
	_endForScroll : function(we) {
		clearTimeout(this._nFixedDubbleEndBugTimer);

		var htMomentumX = { nDist:0, nTime:0 },
			htMomentumY = { nDist:0, nTime:0 },
			htParam = {
				nMomentumX : we.nMomentumX,
				nMomentumY : we.nMomentumY,
				nDistanceX : we.nDistanceX,
				nDistanceY : we.nDistanceY,
				nLeft : this._nLeft,
				nTop : this._nTop
			};
		if (this.option("bUseMomentum") && (we.nMomentumX || we.nMomentumY) ) {
			if (this.bUseHScroll) {
				htMomentumX = this._getMomentum(-we.nDistanceX, we.nSpeedX, we.nMomentumX, this.nWrapperW, -this._nLeft, -this.nMaxScrollLeft + this._nLeft);
			}
			if (this.bUseVScroll) {
				htMomentumY = this._getMomentum(-we.nDistanceY, we.nSpeedY, we.nMomentumY, this.nWrapperH, -this._nTop, -this.nMaxScrollTop + this._nTop);
			}
			htParam.nNextLeft = this._nLeft + htMomentumX.nDist;
			htParam.nNextTop = this._nTop + htMomentumY.nDist;
			htParam.nTime = Math.max(Math.max(htMomentumX.nTime, htMomentumY.nTime),10);
			if (this._fireEventbeforeScroll(htParam)) {
				if(this.option("bUseBounce")) {
					this.scrollTo(htParam.nNextLeft, htParam.nNextTop, htParam.nTime);
				} else {
					this.scrollTo(this.getPosLeft(htParam.nNextLeft), this.getPosTop(htParam.nNextTop), htParam.nTime);
				}
				this._fireEventScroll(htParam);
			}
		} else {
			htParam.nNextLeft = this._nLeft;
			htParam.nNextTop = this._nTop;
			htParam.nTime = 0;
			if (this._fireEventbeforeScroll(htParam)) {
				if( this._nLeft !== htParam.nNextLeft || this._nTop !== htParam.nNextTop ) {
					this.scrollTo(htParam.nNextLeft, htParam.nNextTop, htParam.nTime);
				} else {
					this.restorePos(300);
				}
				this._fireEventScroll(htParam);
			}
		}
	},

    /**
        TransitionEnd 이벤트 핸들러
        @param {jindo.$Event} we
    **/
	_onTransitionEnd : function(we) {
		jindo.m.detachTransitionEnd(this._htWElement["scroller"].$value(), this._htEvent["TransitionEnd"]);
		this._animate();
	},

    /**
        스크롤 도중 scroll 영역 바깥을 선택하였을시, 스크롤을 중지시킴
        @param {jindo.$Event} we
    **/
	_onDocumentStart : function(we) {
		if(this._htWElement["wrapper"].visible()) {
			if(this._htWElement["wrapper"].isChildOf(we.element)) {
					return true;
			} else {
				// 전체 스크롤 사용시 막음
				this._stopScroll();
			}
		}
	},

    /**
        jindo.m.CoreScroll 컴포넌트를 활성화한다.
        activate 실행시 호출됨
    **/
	_onActivate : function() {
		if(!this._oTouch) {
			this._oTouch = new jindo.m.Touch(this._htWElement["wrapper"].$value(), {
				nMoveThreshold : 0,
				nMomentumDuration : (jindo.m.getDeviceInfo().android ? 500 : 200),
				nTapThreshold : 1,
				nSlopeThreshold : 5,
				nEndEventThreshold : (jindo.m.getDeviceInfo().win8 ? 100 : 0)
			});
		} else {
			this._oTouch.activate();
		}
		this._attachEvent();
		this.refresh();
	},

    /**
        jindo.m.CoreScroll 컴포넌트를 비활성화한다.
        deactivate 실행시 호출됨
    **/
	_onDeactivate : function() {
		this._detachEvent();
		this._oTouch.deactivate();
	},

    /**
        jindo.m.CoreScroll 에서 사용하는 모든 이벤트를 바인드한다.
    **/
	_attachEvent : function() {
		this._htEvent = {};
		/* Touch 이벤트용 */
		this._htEvent["touchStart"] = jindo.$Fn(this._onStart, this).bind();
		this._htEvent["touchMove"] = jindo.$Fn(this._onMove, this).bind();
		this._htEvent["touchEnd"] = jindo.$Fn(this._onEnd, this).bind();
		this._htEvent["TransitionEnd"] = jindo.$Fn(this._onTransitionEnd, this).bind();
		this._htEvent["document"] = jindo.$Fn(this._onDocumentStart, this).attach(document, "touchstart");
		this._oTouch.attach({
			touchStart : this._htEvent["touchStart"],
			touchMove : this._htEvent["touchMove"],
			touchEnd :  this._htEvent["touchEnd"]
		});
	},

    /**
        안드로이드 계열 버그
        css3로 스타일 변경 후, 하이라이트안되는 문제
        [해결법] transition관련 property를 null로 처리
     *       offset 변경
     *       a tag focus 하면 됨
    **/
	_fixPositionBug : function() {
		if(this.isPositionBug && this.bUseHighlight && this.option("bUseTranslate")) {
			var self = this;
			this._clearPositionBug();
			this._nFixedPositionBugTimer = setTimeout(function() {
				if(self._htWElement && self._htWElement["scroller"]) {
					self.makeStylePos(self._htWElement["scroller"]);
					if(self.nVersion < 3) {
						self._elDummyTag.focus();
					}
				}
			}, 200);
		}
		// this.end();
	},

    /**
        translate의 포지션을 스타일로 바꾼다.

        @method makeStylePos
        @param {jindo.$Element} wel
    **/
	makeStylePos : function(wel) {
		var ele = wel.$value();
		var htCssOffset = jindo.m.getCssOffset(ele);
		var htScrollOffset = wel.offset();
		if(this.nVersion >= 4) {
			ele.style["-" + this.sCssPrefix + "-transform"] = "translate" + this.sTranOpen + "0px, 0px" + this.sTranEnd;
		} else {
			ele.style["-" + this.sCssPrefix + "-transform"] = null;
		}
        ele.style["-" + this.sCssPrefix + "-transition-duration"] = null;
		//alert(htCssOffset.top + " , " + htCssOffset.left + " --- " + htScrollOffset.top + " , " + htScrollOffset.left);
		wel.offset(htCssOffset.top + htScrollOffset.top, htCssOffset.left + htScrollOffset.left);
	},

    /**
        android인 경우, 버그수정 timer를 제거
    **/
	_clearPositionBug : function() {
		if(this.isPositionBug && this.bUseHighlight) {
			clearTimeout(this._nFixedPositionBugTimer);
			this._nFixedPositionBugTimer = -1;
		}
	},

	_clearTouchEnd : function() {
		clearTimeout(this._nTouchEndTimer);
		this._nTouchEndTimer = -1;
	},

    /**
        jindo.m.CoreScroll 에서 사용하는 모든 이벤트를 해제한다.
    **/
	_detachEvent : function() {
		jindo.m.detachTransitionEnd(this._htWElement["scroller"].$value(), this._htEvent["TransitionEnd"]);
		this._htEvent["document"].detach(document,"touchstart");
		this._oTouch.detachAll();
		if (this._elDummyTag) {
			this._htWElement["scroller"].remove(this._elDummyTag);
		}
	},

	/** Temporary **/
	/** FPS 확인 Start **/
    // start : function() {
    //     this._nCount = 0;
    //     this._nElapse = 0;
    //     this._nStart = Date.now();
    //     this._aData = [];
    // },

    // _fps : function() {
    //     if (this._nElapse > 300) {
    //         var cur = this._nCount / (this._nElapse / 1000);
    //         this._aData.push(cur);
    //         var nSum = 0;
    //         for(var i=0, nLength = this._aData.length; i< nLength; i++) {
    //				nSum += this._aData[i];
    //         }
    //         var o = {
    //             cur: cur,
    //             max: Math.max.apply(null, this._aData),
    //             min: Math.min.apply(null, this._aData),
    //             avg : nSum / this._aData.length
    //         };
    //         console.log("FPS current : " + o.cur + ", max : " + o.max + ", min : " + o.min + ", avg : " + o.avg);
    //         return o;
    //     }
    // },

    // end : function() {
    //     return this._fps();
    // },

    // tick : function() {
    //     var now = Date.now();
    //     this._nCount++;
    //     this._nElapse = Date.now() - this._nStart;
    //     return this._fps();
    // },
    /** FPS 확인 End **/

    /**
        jindo.m.CoreScroll 에서 사용하는 모든 객체를 release 시킨다.
        @method destroy
    **/
	destroy: function() {
		this.deactivate();
		for(var p in this._htWElement) {
			this._htWElement[p] = null;
		}
		this._htWElement = null;
		this._oTouch.destroy();
		delete this._oTouch;
	}
}).extend(jindo.m.UIComponent);/**
    @fileOverview 탭컴포넌트 상위 컴포넌트
    @author sculove
    @version 1.7.1
    @since 2012. 3. 19.
**/
/**
    탭컴포넌트 상위 컴포넌트

    @class jindo.m.CoreTab
    @extends jindo.m.UIComponent
    @uses jindo.m.SlideEffect {0,}
    @keyword tab, 탭
    @group Component

    @history 1.7.0 Bug 안드로이드 4.x 갤럭시 시리즈에서 하이라이트 사라지지 않는 문제 제거
    @history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
    @history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
    @history 1.0.0 - -
    @history 0.9.5 - -
    @history 0.9.0 Release 최초 릴리즈
    @invisible
**/
jindo.m.CoreTab = jindo.$Class({
    /* @lends jindo.m.CoreTab.prototype */
    /**
        초기화 함수

        @constructor
        @param {Varient} el Tab Layout Wrapper
        @param {Object} [htOption] 초기화 옵션 객체
            @param {String} [htOption.sClassPrefix='tc-']
            @param {Number} [htOption.nDefaultIndex=0]
            @param {Number} [htOption.nPanelDuration=0]
            @param {Number} [htOption.nHeight=0]
            @param {Number} [htOption.nWidth=0]
            @param {Boolean} [htOption.bActivateOnload=true]
    **/
    $init : function(el, htUserOption) {
        this.option({
            sClassPrefix        : "tc-",
            nDefaultIndex       : 0,
            nPanelDuration      : 0,
            nHeight             : 0,
            nWidth              : 0,
            bActivateOnload     : true
        });
        this.option(htUserOption || {});
        this._initVar();
        this._setWrapperElement(el);
    },

    /**
        jindo.m.CoreTab 에서 사용하는 모든 인스턴스 변수를 초기화한다.
    **/
    _initVar : function() {
        this._sPrefix = this.option('sClassPrefix');
        this._nCurrentIndex = -1;
        this._aTab = [];
        this._aPanel = [];
        this._oPanelEffect = null;
    },

    /**
        jindo.m.CoreTab 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
    **/
    _setWrapperElement : function(el) {
        this._htWElement = {};
        el = (typeof el == "string" ? jindo.$(el) : el);
        if(!el) {
            return;
        }
        this._htWElement["baseElement"] = jindo.$Element(el);
        this._htWElement["tab_container"] = jindo.$Element(this._htWElement["baseElement"].query('.' + this._sPrefix + 'tab-cont'));
        this._htWElement["panel_container"] = jindo.$Element(this._htWElement["baseElement"].query('.' + this._sPrefix + 'panel-cont'));

        // 탭 외부를 선택시 하이라이트 되는 문제
        if(this._htWElement["tab_container"]) {
            this._htWElement["tab_container"].css('-' + jindo.m.getCssPrefix() + '-tap-highlight-color', 'transparent');
        }
    },

    /**
        초기 tab, panel 데이터 초기화
    **/
    _initData : function() {
        var isPanelEffect = this.option("nPanelDuration"),
            nWidth,nHeight;
        this._aTab = this._htWElement["tab_container"].queryAll('.' + this._sPrefix + 'tab');
        this._aPanel = this._htWElement["panel_container"].queryAll('.' + this._sPrefix + 'panel');

        if(isPanelEffect) {
            nWidth = (this.option("nWidth") == 0 ? this._htWElement["panel_container"].width() - parseInt(this._aPanel[0].css("paddingLeft"),10) - parseInt(this._aPanel[0].css("paddingRight"),10) : this.option("nWidth")) + "px";
            nHeight = this.option("nHeight") + "px";
        }

        for(var i=0, nLength=this._aTab.length; i < nLength; i++) {
            this._aTab[i] = jindo.$Element(this._aTab[i]).attr("data-index", i);
            this._aPanel[i] = jindo.$Element(this._aPanel[i]);
            if(isPanelEffect) {
                this._aPanel[i].css({
                    width : nWidth,
                    height : nHeight,
                    position : "absolute"
                });
            }
        }
        if(isPanelEffect) {
            this._oPanelEffect = new jindo.m.LayerEffect(this._aPanel[0].$value());
            this._htWElement["panel_container"].css({
                position : "relative",
                "overflow" : "hidde",
                height : nHeight
            });
        }
    },

    /**
        내부 data-index를 얻는다.
        @param  {jindo.$Element} welElement index를 얻고자하는 jindo.$Element
        @return {Number}            index 값
    **/
    _getIdx : function(welElement) {
        return parseInt(welElement.attr("data-index"),10);
    },

    /**

        @param  {jindo.$Element} welElement 확인하고자 하는 엘리먼트
        @return {jindo.$Element}            Tab의 jindo.$Element
    **/
    _getTabElement : function(welElement) {
        var sTabClassName = this._sPrefix + "tab",
            sMoreTabClassName = this._sPrefix + "more-tab";
        if(welElement.hasClass(sTabClassName) || welElement.hasClass(sMoreTabClassName)) {
            return welElement;
        } else if(this._htWElement["tab_container"].isParentOf(welElement) && (!welElement.hasClass(sTabClassName) || !welElement.hasClass(sMoreTabClassName))) {
            return welElement.parent(function(v){
                return v.hasClass(sTabClassName) || v.hasClass(sMoreTabClassName);
            },2)[0];
        }
        return welElement;
    },

    /**
        jindo.m.CoreTab 컴포넌트를 활성화한다.
        activate 실행시 호출됨
    **/
    _onActivate : function() {
        this._attachEvent();
    },

    /**
        jindo.m.CoreTab 컴포넌트를 비활성화한다.
        deactivate 실행시 호출됨
    **/
    _onDeactivate : function() {
        this._detachEvent();
    },

    /**
        jindo.m.CoreTab 에서 사용하는 모든 이벤트를 바인드한다.
    **/
    _attachEvent : function() {
        this._htEvent = {};
        this._htEvent["tab_click"] = {
            el  : this._htWElement["tab_container"],
            ref : jindo.$Fn(this._onSelect, this).attach( this._htWElement["tab_container"], "click")
        };
    },
    /**
        jindo.m.CoreTab 에서 사용하는 모든 이벤트를 해제한다.
    **/
    _detachEvent : function() {
        for(var p in this._htEvent) {
            var ht = this._htEvent[p];
            ht.ref.detach(ht.el, p.substring(p.lastIndexOf("_")+1));
        }
        this._htEvent = null;
        if(this._oPanelEffect) {
            this._oPanelEffect.detachAll();
        }
    },

    /**
        현재 Tab의 인덱스를 반환한다.
        @return {Number} 현재 tab의 index를 반환함 (index는 0부터)
    **/
    getCurrentIndex : function() {
        return this._nCurrentIndex;
    },

    /**
     * 현재 Tab의 페이지를 반환한다.
     * @return {Number} 현재 tab의 현재 페이지를 반환함 (page수는 1부터)
     */
    // getCurrentPage : function() {
    //  return (this._nCurrentIndex + 1);
    // },

    /**
        현재 Tab을 반환
        @param {Number} nIdx 옵션 (index는 0부터)
        @return {HTMLElement, Array} index가 있을 경우, index에 해당하는 TAB HTMLElement반환
                                        index가 없을 경우, TAB HTMLElement 배열을 반환
        @example
         var aTab = oComponent.getTab();
         var elTab = oComponent.getTab(2);
    **/
    getTab : function(nIdx) {
        if(nIdx !== null && this._aTab.length > nIdx) {
            return this._aTab[nIdx];
        } else {
            return this._aTab;
        }
    },

    /**
        현재 Panel을 반환
        @param {Number} nIdx 옵션 (index는 0부터)
        @return {HTMLElement, Array} index가 있을 경우, index에 해당하는 Panel HTMLElement반환
                                        index가 없을 경우, Panel HTMLElement 배열을 반환
        @example
         var aPanel = oComponent.getPanel();
         var elPanel = oComponent.getPanel(2);
    **/
    getPanel : function(nIdx) {
        if(nIdx !== null && this._aPanel.length > nIdx) {
            return this._aPanel[nIdx];
        } else {
            return this._aPanel;
        }
    },

    /**
        탭을 선택했을 시, 이벤트 처리
        @param {Object} we
    **/
    _onSelect : function(we) {
        if(we.element) {
            if(this._oPanelEffect && this._oPanelEffect.isPlaying() ) {
                we.stop(jindo.$Event.CANCEL_ALL);
                return false;
            }
            var welElement = this._getTabElement(jindo.$Element(we.element));
            this._onAfterSelect(welElement);
        }
    },

    /**
        index에 해당하는 패널 선택
        @param {Object} nIdx
    **/
    select : function(nIdx) {
        if(nIdx !== null && nIdx >= 0 && this._aTab.length > nIdx && (this._nCurrentIndex != nIdx)) {

            /**
            패널이 선택되기 전 발생

            @event beforeSelect
            @param {String} sType 커스텀 이벤트명
            @param {Number} nIndex 선택되기전의 tab 인덱스 번호 (0부터 시작)
            @param {HTMLElement} elTab 선택되기 전 tab Element
            @param {HTMLElement} elPanel 선택되기 전 panel Element
            @param {Function} stop 수행시 패널이 선택되지 않는다.
          **/
            if (this._fireEventBefore("beforeSelect")) {
                var sSelect = this._sPrefix + "selected";
                this._beforeSelect(nIdx);

                // 변경할 탭 선택
                this._aTab[nIdx].addClass(sSelect);
                this._aPanel[nIdx].addClass(sSelect);
                this._aPanel[nIdx].show();
                if(this._nCurrentIndex > -1){
                    this._aTab[this._nCurrentIndex].removeClass(sSelect);
                    if(this._oPanelEffect) {
                        this._slide(this._nCurrentIndex, nIdx);
                    } else {
                        this._aPanel[this._nCurrentIndex].removeClass(sSelect);
                        this._aPanel[this._nCurrentIndex].hide();
                    }
                }
                this._nCurrentIndex = nIdx;
                 /**
                패널이 선택되기 전 발생

                @event select
                @param {String} sType 커스텀 이벤트명
                @param {Number} nIndex 선택되기전의 tab 인덱스 번호 (0부터 시작)
                @param {HTMLElement} elTab 선택되기 전 tab Element
                @param {HTMLElement} elPanel 선택되기 전 panel Element
                @param {Function} stop 수행시 영향받는것 없다.
              **/
                this._fireEvent("select");
            }
        }
    },

    /**
        슬라이드 효과를 준다.
        @param  {Number} nBeforeIdx [전에 선택된 index]
        @param  {Number} nIdx        [현재 선택하려는 index]
    **/
    _slide : function(nBeforeIdx, nIdx) {
        var self=this,
            isLeft = nBeforeIdx < nIdx,
            nWidth = this._aPanel[nIdx].width();
         /**
            패널 슬라이드 효과가 발생하기 전에 발생

            @event slide
            @param {String} sType 커스텀 이벤트명
            @param {Number} nIndex 선택되기전의 tab 인덱스 번호 (0부터 시작)
            @param {HTMLElement} elTab 선택되기 전 tab Element
            @param {HTMLElement} elPanel 선택되기 전 panel Element
            @param {Function} stop 수행시 슬라이드 효과가 발생하지 않는다
        **/
        if (this._fireEventBefore("beforeSlide")) {
            this._oPanelEffect.setLayer(this._aPanel[nIdx].$value());
            this._oPanelEffect.attach("afterEffect", function() {
                self._onPannelAfterEffct(nBeforeIdx, nIdx);
            });
            this._aPanel[nIdx].css({
                "left" : isLeft ? nWidth : -nWidth,
                "zIndex" : 9
            });

            this._oPanelEffect.slide({
                sDirection : isLeft ? 'left' : "right",
                nDuration : this.option("nPanelDuration"), //효과 애니메이션 적용시간 (ms)
                nSize : nWidth
            });
        }
    },

    /**
        slide완료 후 작업
        @param  {Number} nBeforeIdx [전에 선택된 index]
        @param  {Number} nIdx        [현재 선택하려는 index]
    **/
    _onPannelAfterEffct : function(nBeforeIdx, nIdx) {
        this._aPanel[nBeforeIdx].removeClass(this._sPrefix + "selected");
        this._aPanel[nBeforeIdx].hide();
        this._aPanel[nBeforeIdx].css("zIndex",1);
        this._aPanel[nIdx].css("zIndex" , 2);
        this._oPanelEffect.detachAll("afterEffect");
        /**
            패널 슬라이드 효과가 발생한 후에 발생

            @event slide
            @param {String} sType 커스텀 이벤트명
            @param {Number} nIndex 선택된 tab 인덱스 번호 (0부터 시작)
            @param {HTMLElement} elTab 선택된 tab Element
            @param {HTMLElement} elPanel 선택된 panel Element
            @param {Function} 수행시 영향받는것은 없다
        **/
        this._fireEvent("slide");
    },

    /**
        Before 사용자 이벤트 호출
    **/
    _fireEventBefore : function(sType) {
        return this.fireEvent(sType, {
            nIndex : this._nCurrentIndex,
            elTab : this._aTab[this._nCurrentIndex],
            elPanel : this._aPanel[this._nCurrentIndex]
        });
    },

    /**
        사용자 이벤트 호출
    **/
    _fireEvent : function(sType) {
        this.fireEvent(sType, {
            nIndex : this._nCurrentIndex,
            elTab : this._aTab[this._nCurrentIndex],
            elPanel : this._aPanel[this._nCurrentIndex]
        });
    },

    /**
        jindo.m.CoreTab 에서 사용하는 모든 객체를 release 시킨다.
        @method destroy
    **/
    destroy : function() {
        for(var p in this._htWElement) {
            this._htWElement[p] = null;
        }
        this._htWElement = null;

        for(p in this._aTab) {
            this._aTab[p] = null;
        }
        this._aTab = null;

        for(p in this._aPanel) {
            this._aPanel[p] = null;
        }
        this._aPanel = null;

        if(this._oPanelEffect) {
            this._oPanelEffect.destroy();
            this._oPanelEffect = null;
        }
    }
}).extend(jindo.m.UIComponent);/**
	@fileOverview Form Element의 Input Form에 날짜를 쉽게 입력할 수 있도록 Calendar를 제공하는 컴포넌트
	@author sshyun, sculove
	@version 1.7.1
	@since 2011. 9. 22.
**/
/**
	Form Element의 Input Form에 날짜를 쉽게 입력할 수 있도록 Calendar를 제공하는 컴포넌트

	@class jindo.m.Datepicker
	@extends jindo.m.UIComponent
	@uses jindo.m.Calendar
	@keyword input, date, picker, 달력, 날짜, 선택
	@group Component

  @history 1.7.0 Bug 안드로이드 4.x 갤럭시 시리즈에서 하이라이트 사라지지 않는 문제 제거
	@history 1.3.0 Update jindo.Calendar →jindo.m.Calendar로 교체<br />
						[beforeDraw] Custom 이벤트 삭제<br />
						[draw] Custom 이벤트 삭제<br />
						[afterDraw] Custom 이벤트 삭제
	@history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
	@history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
	@history 1.1.0 Bug 다중인스턴스일시 동일월 경우 날짜표시 안되는 문제 혜결<br />
						2012년 1월 31일 선택 후, 2012년 2월 달 달력으로 이동시 31일 자리에 선택표시가 나오는 문제 해결<br />
						오늘 날짜와 선택날짜가 동일할 경우, 선택날짜가 표시되도록 수정
	@history 0.9.5 Release 최초 릴리즈
**/
jindo.m.Datepicker = jindo.$Class({
	/* @lends jindo.m.Datepicker.prototype */
	/**
		초기화 함수

		@constructor
		@param {Varient} el input 엘리먼트 또는 ID
		@param {Object} [htOption] 초기화 옵션 객체
			@param {String} [htOption.sClassPrefix="calendar-"] Class의 prefix명
			@param {String} [htOption.sFormat="yyyy-mm-dd"] 선택 날짜 값에 대한 포맷 다음의 형식을 사용할 수 있다.
				<table class="tbl_board">
				<tr>
				<th>표시형식</th>
				<th>설명</th>
				<th>결과</th>
				</tr>
				<tbody>
				<tr>
				<td>yyyy</td>
				<td>4자리 연도</td>
				<td>2010</td>
				</tr>
				<tr>
				<td>yy</td>
				<td>2자리 연도</td>
				<td>10</td>
				</tr>
				<tr>
				<td>mm</td>
				<td>월</td>
				<td>9</td>
				</tr>
				<tr>
				<td>dd</td>
				<td>일</td>
				<td>26</td>
				</tr>
				<tr>
				<td>day</td>
				<td>[prefix]sun ~ [prefix]sat 클래스가 '요일표시 해더영역' 의 값으로 표기</td>
				<td>일</td>
				</tr>
				</tbody>
				</table>
			@param {Boolean} [htOption.bActivateOnload=true] 컴포넌트 로드시 activate 여부
			@param {Boolean} [htOption.bAutoHide=false] input과 Calendar 외의 영역을 선택 했을때 Calendar를 사라지게 할지 여부
	**/
	$init : function(el, htOption) {
		this.option({
			sClassPrefix : "calendar-",
			sFormat : "yyyy-mm-dd",
			bActivateOnload : true,
			bAutoHide : false
		});
		this.option(htOption || {});
		this._initVar();
		this._initCalendar(el);
		if(this.option("bActivateOnload")) {
			this.activate();
		}
	},

	$static : {
		INDEX_ATTR : "data-datepickerid"
	},

	/**
		jindo.m.Datepicker 에서 사용하는 모든 인스턴스 변수를 초기화한다.
	**/
	_initVar : function() {
		this._oCalendar = null;
		this._htDatePickerSet = {};
		this._htSelectedDatePickerSet = null;
	},

	/**
		jindo.m.Datepicker 에서 사용하는 Calendar를 초기화한다.
		@param {Varient} el Calendar Base 엘리먼트 또는 ID
	**/
	_initCalendar : function(el) {
		var sClassPrefix = this.option("sClassPrefix"),
			htCalendarOption = this.option();
		htCalendarOption.bActivateOnload = true;
		this._oCalendar = new jindo.m.Calendar( (jindo.$Element(el) ? jindo.$Element(el) : this._insertCalendarTemplate()), htCalendarOption);
	},

	/**
		선택가능한 날짜인지 확인한다.
		@param {Object} htDatePickerSet
		@param {Object} htDate
	**/
	_isSelectable : function(htDatePickerOption, htDate) {
		return this._oCalendar.isBetween(htDate, htDatePickerOption["htSelectableDateFrom"], htDatePickerOption["htSelectableDateTo"]);
	},

	/**
		DatePicker를 적용할 셋을 추가한다.
		@param {Element} elInput 날짜가 입력될 input 엘리먼트
		@param {Object} htOption Datepicker Calendar Option 정보
		@return {this} this
		@example
			oDatePicker.addDatePickerSet(
				jindo.$("input"), //날짜가 입력될 input 엘리먼트
				{
					nYear : 1983, //기본으로 설정될 연도
					nMonth : 5, //기본으로 설정될 월
					nDate : 12, //기본으로 설정될 일
					htSelectableDateFrom : { //선택가능한 첫 날짜
						nYear : 1900,
						nMonth : 1,
						nDate : 1
					},
					htSelectableDateTo : { //선택가능한 마지막 날짜
						nYear : 2100,
						nMonth : 12,
						nDate : 31
					},
					sPosition: "bottomLeft", // Calendar 위치. input을 기준으로
						 //   bottomLeft : Calenadr 를 input 의 아래 왼쪽에 위치
						 //   bottomRight : Calenadr 를 input 의 아래 오른쪽끝에 위치
						 //   topLeft : Calenadr 를 input 의 위쪽 왼쪽에 위치
						 //   topRight : Calenadr 를 input 의 위쪽 오른쪽끝에 위치
						 //   leftTop : Calenadr 를 input 의 왼쪽에 상단에 위치
						 //   leftBottom : Calenadr 를 input 의 왼쪽에 하단에 위치
						 //   rightTop : Calenadr 를 input 의 오른쪽에 상단에 위치
						 //   rightBottom : Calenadr 를 input 의 오른쪽에 하단에 위치
					zIndex: 50				// Calendar 가 나타날 경우 z-index 값
				}
			);
	**/
	addDatePickerSet : function(elInput, htOption) {
		if (typeof elInput == "undefined") {
			return this;
		}
		var sDatePikerSetId = "DATEPICKER_" + (new Date()).getTime() +"_" + Math.floor((Math.random() * 100)),
			welInput = jindo.$Element(elInput),
			htCalendarOption = this._oCalendar.option(),
			htDefaultOption = {
				nYear : htCalendarOption.htToday.nYear,
				nMonth : htCalendarOption.htToday.nMonth,
				nDate : htCalendarOption.htToday.nDate,
				htSelectableDateFrom : { //선택가능한 첫 날짜
					nYear : 1900,
					nMonth : 1,
					nDate : 1
				},
				htSelectableDateTo : { //선택가능한 마지막 날짜
					nYear : 2100,
					nMonth : 12,
					nDate : 31
				},
				sPosition: "bottomLeft",
				zIndex: 50,
				sDatePikerSetId : sDatePikerSetId
			};

		if (typeof htOption != "undefined") {
			//빈 값은 기본값으로 셋팅해줌.
			for (var value in htOption) {
				if (typeof htDefaultOption[value] != "undefined") {
					htDefaultOption[value] = htOption[value];
				}
			}
		}
		htOption = htDefaultOption;
		welInput.replace("<span style='position:relative;display:inline-block;'>" + welInput.toString() + "</span>");
		welInput = jindo.$Element(elInput);
		welInput.attr("readOnly",true).attr(jindo.m.Datepicker.INDEX_ATTR, sDatePikerSetId);
		htOption.elInput = welInput.$value();
		htOption.wfFocusFunc = this._attachFocusEvent(welInput);
		this._htSelectedDatePickerSet = this._htDatePickerSet[sDatePikerSetId] = htOption;
		return this;
	},

	/**
		DatePicker를 적용할 셋을 제거한다.
		@param {Element} elInput Datepicker를 제거할 input 엘리먼트
		@return {this} this
		@example
			var elInput = jindo.$("input") //Datepicker를 제거할 input 엘리먼트
			oDatePicker.removeDatePickerSet(elInput);
	**/
	removeDatePickerSet : function(elInput) {
		var welInput = jindo.$Element(elInput),
			sDatePikerSetId = welInput.attr(jindo.m.Datepicker.INDEX_ATTR),
			htDatePickerSet = this._htDatePickerSet[sDatePikerSetId];
		this._detachFocusEvent(htDatePickerSet.wfFocusFunc, welInput);

		if (htDatePickerSet === this._htSelectedDatePickerSet) {
			this._htSelectedDatePickerSet = null;
		}
		delete this._htDatePickerSet[sDatePikerSetId];
		return this;
	},

	/**
		jindo.m.Datepicker 컴포넌트를 활성화한다.
		activate 실행시 호출됨
	**/
	_onActivate : function() {
		this._attachEvent();
	},
	/**
		jindo.m.Datepicker 컴포넌트를 비활성화한다.
		deactivate 실행시 호출됨
	**/
	_onDeactivate : function() {
		this.hide();
		this._detachEvent();
	},
	/**
		jindo.m.Datepicker 에서 사용하는 모든 이벤트를 바인드한다.
	**/
	_attachEvent : function() {
		this._htEvent = {};
		if(this.option("bAutoHide")) {
			this._htEvent["document"] = jindo.$Fn(this._onDocument, this).attach(document, "touchend");
		}
		this._htEvent["selectDate"] = jindo.$Fn(this._onSelectDate, this).bind();
		this._htEvent["deliveryEvent"] = jindo.$Fn(this._onDeliveryEvent, this).bind();
		this._oCalendar.attach({
			"selectDate" : this._htEvent["selectDate"],
			"beforeMoveDate" : this._htEvent["deliveryEvent"],
			"moveDate" : this._htEvent["deliveryEvent"],
			"beforeHideCalendar" : this._htEvent["deliveryEvent"],
			"hideCalendar" : this._htEvent["deliveryEvent"],
			"beforeShowCalendar" : this._htEvent["deliveryEvent"],
			"showCalendar" : this._htEvent["deliveryEvent"]
			// "beforeDraw" : this._htEvent["deliveryEvent"],
			// "afterDraw" : this._htEvent["deliveryEvent"]
		});
	},


	/**
		Calendar 템플릿을 생성 한다.
	**/
	_insertCalendarTemplate : function(){
		var aHtml = [],
			welCalendar = jindo.$Element("jmc_calt"),
			sPrefix = this.option("sClassPrefix");
		if(!welCalendar) {
			aHtml.push('<div>');
			aHtml.push('<a href="javascript:void(0)" class="' + sPrefix + 'btn ' + sPrefix + 'btn-prev-year">&lt;&lt;</a>');
			aHtml.push('<a href="javascript:void(0)" class="' + sPrefix + 'btn ' + sPrefix + 'btn-prev-mon">&lt;</a>');
			aHtml.push('<strong class="' + sPrefix + 'title"></strong>');
			aHtml.push('<a href="javascript:void(0)" class="' + sPrefix + 'btn ' + sPrefix + 'btn-next-mon">&gt;</a>');
			aHtml.push('<a href="javascript:void(0)" class="' + sPrefix + 'btn ' + sPrefix + 'btn-next-year">&gt;&gt;</a>');
			aHtml.push('</div><table cellspacing="0" cellpadding="0" style="');
			aHtml.push('-' + jindo.m.getCssPrefix() + '-tap-highlight-color:transparent;"><thead><tr>');
			aHtml.push('<th class="' + sPrefix + 'sun">일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th class="' + sPrefix + 'sat">토</th>');
			aHtml.push('</tr></thead><tbody>');
			aHtml.push('<tr class="' + sPrefix + 'week">');
			aHtml.push('<td><a href="javascript:void(0)" class="' + sPrefix + 'date"></a></td>');
			aHtml.push('<td><a href="javascript:void(0)" class="' + sPrefix + 'date"></a></td>');
			aHtml.push('<td><a href="javascript:void(0)" class="' + sPrefix + 'date"></a></td>');
			aHtml.push('<td><a href="javascript:void(0)" class="' + sPrefix + 'date"></a></td>');
			aHtml.push('<td><a href="javascript:void(0)" class="' + sPrefix + 'date"></a></td>');
			aHtml.push('<td><a href="javascript:void(0)" class="' + sPrefix + 'date"></a></td>');
			aHtml.push('<td><a href="javascript:void(0)" class="' + sPrefix + 'date"></a></td>');
			aHtml.push('</tr></tbody></table>');
			aHtml.push('<div class="' + sPrefix + 'bottom"><a href="javascript:void(0)" class="' + sPrefix + 'btn ' + sPrefix + 'btn-close">닫기</a></div>');
			welCalendar = jindo.$Element('<div id="jmc_calt" class="' + sPrefix + 'base" style="position:absolute;display:none"></div>');
			welCalendar.html(aHtml.join(""));
			welCalendar.appendTo(document.body);
		}
		return welCalendar;
	},

	/**
		jindo.m.Calendar 에서 사용하는 모든 이벤트를 해제한다.
	**/
	_detachEvent : function(){
		var htDatepickerset = null;
		if(this.option("bAutoHide")) {
			this._htEvent["document"].detach(document, "touchend");
		}

		for(var p in this._htDatePickerSet) {
			htDatepickerset = this._htDatePickerSet[p];
			this._detachFocusEvent(htDatepickerset.wfFocusFunc, htDatepickerset.elInput);
		}
		this._oCalendar.detachAll();
		this._htSelectedDatePickerSet = null;
		this._htEvent = null;
	},
	/**
		input 에 포커스 이벤트 처리. Calendar를 생성하여 디스플레이 해준다.
	**/
	_onFocus : function(we){
		if(!this.isActivating()){
			return false;
		}
		this.show(we.element);
	},

	/**
		Document Touch 이벤트 처리
	**/
	_onDocument : function(we){
		var el = we.element,
			wel = jindo.$Element(el),
			welCalendarBase = this._oCalendar.getCalendarBase(),
			elInput = this._htSelectedDatePickerSet.elInput;
		if(welCalendarBase.$value() != el && !welCalendarBase.isParentOf(wel) && elInput != el) {
			this.hide();
			if(elInput) {
				elInput.blur();
			}
		}
		return true;
	},
	/**
		Calendar 날짜 선택 이벤트 핸들러.
	**/
	_onSelectDate : function(we){
		if(!this._oCalendar.isVisible()) {
			return;
		}
		if (this._isSelectable(this._htSelectedDatePickerSet, we.oSelectDate)) {
			var el = this._htSelectedDatePickerSet.elInput;
			this.setDate(el, we.oSelectDate);
			el.blur();
			this.fireEvent("selectDate", {
				oSelectDate : we.oSelectDate,
				oCalendar : this._oCalendar
			});
			return true;
		} else {
			we.stop(jindo.$Event.CANCEL_ALL);
			return false;
		}
	},

	_onDeliveryEvent : function(we) {
		we.oCalendar = this._oCalendar;
		return this.fireEvent(we.sType, we);
	},

	/**
		Datepicker Calendar 선택 날짜를 설정 한다.
		@param {Element} elInput 변경 Datepicker Input 엘리먼트
		@param {Object} htDate 설정, 날짜 {nYear : 2011, nMonth : 9, nDate : 30} 형식
		@example
			var elInput = jindo.$("input");
			var htDate = {nYear : 2011, nMonth : 9, nDate : 30};
			oDatepicker.setDate(elInput, htDate);
	**/
	setDate : function(elInput, htDate){
		if(!this.isActivating()) {
			return false;
		}
		var sDatepickerId = (elInput) ? elInput.getAttribute(jindo.m.Datepicker.INDEX_ATTR) : null,
			htDatePickerSet = this._htDatePickerSet[sDatepickerId];

		if(!sDatepickerId || !this._isSelectable(htDatePickerSet, htDate)){
			return false;
		}
		elInput.value = this._formatDate(htDate);
		htDatePickerSet.nYear = htDate.nYear;
		htDatePickerSet.nMonth = htDate.nMonth;
		htDatePickerSet.nDate = htDate.nDate;
		this._htDatePickerSet[sDatepickerId] = htDatePickerSet;
	},

	/**
		날짜 표시 형식 변환 후 반환.
	**/
	_formatDate : function(htDate){
		var oDate = new Date(htDate.nYear, htDate.nMonth-1, htDate.nDate),
			sDay = this._oCalendar.getDayName(oDate.getDay());
		return this.option("sFormat").replace(/(yyyy|yy|mm|dd|day)/gi,
			function($1){
				switch ($1){
					case 'yyyy': return oDate.getFullYear();
					case 'yy': return oDate.getFullYear().toString().substr(2);
					case 'mm':
						var sMonth = (oDate.getMonth()+1) + "";
						sMonth = sMonth.length === 1 ? '0' + sMonth : sMonth;
						return sMonth;
					case 'dd':
						var sDate = oDate.getDate() + "";
						sDate = sDate.length === 1 ? '0' + sDate : sDate;
						return sDate;
					case 'day' : return sDay;
				}
			}
		);
	},

	/**
		Datepicker에서 선택 한 날짜를 삭제한다.
		@param {Element} elInput 변경 Datepicker Input 엘리먼트
		@example
			var elInput = jindo.$("input");
			oDatepicker.deleteDate(elInput);
	**/
	deleteDate : function(elInput){
		if(!elInput){ return; }
		var welInput = jindo.$Element(elInput),
			htDatePickerSet = this._htDatePickerSet[welInput.attr(jindo.m.Datepicker.INDEX_ATTR)],
			oDate = new Date();
		elInput.value = "";
		htDatePickerSet.nYear = oDate.getFullYear();
		htDatePickerSet.nMonth = oDate.getMonth() + 1;
		htDatePickerSet.nDate = oDate.getDate();

		if(this._isCurrentDatePicker(welInput.$value())) {
			this.hide();
		}
		this.fireEvent("clear",{
			oCalendar : this._oCalendar
		});
	},

	/**
		현재 데이터 피커가 자신에 할당되어 있는지 여부 반
	**/
	_isCurrentDatePicker : function(elInput){
		var sDatepickerId = (elInput) ? elInput.getAttribute(jindo.m.Datepicker.INDEX_ATTR) : null,
			sSelectDatepickerId = this._htSelectedDatePickerSet.sDatePikerSetId;
		return (sDatepickerId == sSelectDatepickerId);
	},

	/**
		Datepicker 객체를 활성화 한다.
		@param {Element} elInput 변경 Datepicker Input 엘리먼트. 없을 경우 등록된 모든 Input에 대해 활성화.
		@example
			var elInput = jindo.$("input");
			oDatepicker.enable(elInput);
			oDatepicker.enable(); //등록된 모든 Input 에 대해 활성화
	**/
	enable : function(elInput){
		if(elInput){
			var welInput = jindo.$Element(elInput);
			welInput.$value().disabled = false;
		} else {
			var htDatePickerSet = this._htDatePickerSet;
			for ( var sKey in htDatePickerSet) {
				htDatePickerSet[sKey].elInput.disabled = false;
			}
		}
		this.fireEvent("enable",{
			oCalendar : this._oCalendar
		});
	},

	_attachFocusEvent : function(welInput) {
		return jindo.$Fn(this._onFocus,this).attach(welInput,"focus");
	},

	_detachFocusEvent : function(wfFocusFunc, welInput) {
		wfFocusFunc.detach(welInput,"focus");
	},

	/**
		Datepicker 객체를 비활성화 한다.
		@param {Element} elInput 변경 Datepicker Input 엘리먼트. 없을 경우 등록된 모든 Input에 대해 비활성화.
		@example
			var elInput = jindo.$("input");
			oDatepicker.disable(elInput);
			oDatepicker.disable(); //등록된 모든 Input 에 대해 비활성화
	**/
	disable : function(elInput){
		var htDatePickerSet = this._htDatePickerSet;
		if(elInput){
			var welInput = jindo.$Element(elInput);
			welInput.$value().disabled = true;
		} else {
			for ( var sKey in htDatePickerSet) {
				htDatePickerSet[sKey].elInput.disabled = true;
			}
		}
		this.hide();
		this.fireEvent("disable",{
			oCalendar : this._oCalendar
		});
	},

	/**
		Calelndar를 위치할 Position 설정.
	**/
	setPosition : function(elInput, sPosition) {
		var welInput = jindo.$Element(elInput),
			htDatePickerSet = this._htDatePickerSet[welInput.attr(jindo.m.Datepicker.INDEX_ATTR)],
			welCalendarBase = this._oCalendar.getCalendarBase(),
			htCss = {},
			elCalendarBase = welCalendarBase.$value(),
			bVisible = welCalendarBase.visible();
		if(!bVisible) {
			welCalendarBase.css("left","-999px");
			welCalendarBase.show();
		}
		var nCalendarHeight = welCalendarBase.height(),
			nCalendarWidth = welCalendarBase.width(),
			nInputHeight = welInput.height(),
			nInputWidth = welInput.width();
		sPosition = sPosition || htDatePickerSet.sPosition;
		elCalendarBase.style.left = null;
		elCalendarBase.style.right = null;
		elCalendarBase.style.top = null;
		if(!bVisible) {
			welCalendarBase.hide();
		}
		switch (sPosition) {
			case "leftTop":
				htCss.top = "0px";
				htCss.left = "-" + nCalendarWidth + "px";
				break;
			case "leftBottom":
				htCss.top = "-" + (nCalendarHeight - nInputHeight) + "px";
				htCss.left = "-" + nCalendarWidth + "px";
				break;
			case "rightTop":
				htCss.top = "0px";
				htCss.left = nInputWidth + "px";
				break;
			case "rightBottom":
				htCss.top = "-" + (nCalendarHeight - nInputHeight) + "px";
				htCss.left = nInputWidth + "px";
				break;
			case "bottomLeft":
				htCss.top = nInputHeight + "px";
				htCss.left = "0px";
				break;
			case "bottomRight":
				htCss.top = nInputHeight + "px";
				htCss.right = "0px";
				break;
			case "topLeft":
				htCss.top = "-" + nCalendarHeight + "px";
				htCss.left = "0px";
				break;
			case "topRight":
				htCss.top = "-" + nCalendarHeight + "px";
				htCss.right = "0px";
				break;
		}
		htDatePickerSet.sPosition = sPosition;
		welCalendarBase.css(htCss);
	},

	/**
		Datepicker 달력을 보여준다.
		@param {Element} elInput Calendar를 보여줄 Datepicker Input 엘리먼트.
		@example
			var elInput = jindo.$("input");
			oDatepicker.show(elInput);
	**/
	show : function(elInput){
		var welInput = jindo.$Element(elInput),
			welCalendarBase = this._oCalendar.getCalendarBase(),
			htDatePickerSet = this._htDatePickerSet[welInput.attr(jindo.m.Datepicker.INDEX_ATTR)],
			oDrawDate  = {"nYear" : htDatePickerSet.nYear, "nMonth" : htDatePickerSet.nMonth, "nDate" : htDatePickerSet.nDate};
		this._htSelectedDatePickerSet = htDatePickerSet;
		welInput.parent().append(welCalendarBase);
		if(htDatePickerSet.zIndex != "none"){
			welCalendarBase.css("zIndex", htDatePickerSet.zIndex);
		}
		this.setPosition(elInput, htDatePickerSet.sPosition);
		this._oCalendar.show(oDrawDate, elInput.value ? oDrawDate : 0);
	},

	/**
		Datepicker 달력을 닫는다.
		@example
			oDatepicker.hide();
	**/
	hide : function(){
		if(this._oCalendar.isVisible()) {
			this._oCalendar.hide();
		}
	},

	/**
		jindo.m.Datepicker 에서 사용하는 모든 객체를 release 시킨다.

		@method destroy
		@example
			oDatepicker.destroy();
	**/
	destroy : function() {
		this.deactivate();
		this._oCalendar = null;
		this._htDatePickerSet = null;
	}
}).extend(jindo.m.UIComponent);/**
	@fileOverview 사용자 대화창을 생성하는 컴포넌트
	@author icebelle
	@version 1.7.1
	@since 2011. 8. 5
**/
/**
	사용자 대화창을 생성하는 컴포넌트

	@class jindo.m.Dialog
	@extends jindo.m.UIComponent
	@uses jindo.m.LayerEffect, jindo.m.SlideEffect, jindo.m.PopEffect, jindo.m.FlipEffect {0,}
	@keyword dialog, 다이얼로그, 대화상자
	@group Component
    
  @history 1.6.0 Bug 안드로이드 ics에서 화면전환시 사이즈 못맞추는 버그 해결
	@history 1.3.0 Update [sDialogColor] Option 추가
	@history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
	@history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
	@history 0.9.0 Release 최초 릴리즈
**/

jindo.m.Dialog = jindo.$Class({
	/* @lends jindo.m.Dialog.prototype */
	/**
		초기화 함수

		@constructor
		@param {Object} [htOption] 초기화 옵션 객체
			Dialog에 적용될 Class의 prefix명
			layer와 각 버튼에 prefix+"명칭" 으로 클래스가 구성된다
			@param {String} [htOption.bActivateOnload=true]
			@param {String} [htOption.sClassPrefix="dialog-"]
			@param {String} [htOption.sPosition="center"] Dialog 레이어가 보여질 위치
			<ul>
			<li>"top" : 화면 상단중앙</li>
			<li>"center" : 중앙</li>
			<li>"bottom" : 화면 하단중앙</li>
			<li>"all" : 화면 전체</li>
			</ul>
			@param {Boolean} [htOption.bUseEffect=true] Dialog 레이어가 보여질때 Effect(pop)효과 사용여부
			@param {Boolean} [htOption.bAutoClose=false] Dialog이외의 영역에 클릭(터치)발생시 Dialog 자동닫힘 사용여부
			@param {Boolean} [htOption.bAutoReposition=true] 리사이즈 발생시 Dialog위치 자동재설정 사용여부
			@param {String} [htOption.sFoggyColor="gray"] Foggy레이어 색상
			@param {Number} [htOption.nFoggyOpacity=0.5] Foggy레이어 투명도 (0~1)
			@param {String} [htOption.sEffectType="pop"] 이펙트 종류
			<ul>
			<li>"slide-up" : "slide-up"으로 보여지고, "slide-down"으로 사라짐</li>
			<li>"slide-down" : "slide-down"으로 보여지고, "slide-up"으로 사라짐</li>
			<li>"flip" : "flip"으로 보여지고, 사라짐(iOS전용)</li>
			</ul>
			@param {Number} [htOption.nEffectDuration=500] 이펙트 지속시간(ms단위, 최소값100)
			@param {String} [htOption.sDialogColor="white"] Dialog 레이어의 백그라운드 컬러
	**/
	$init : function(htOption) {
		//console.log("$init")
		var htDefaultOption = {
			bActivateOnload : true,
			sClassPrefix : "dialog-",
			sPosition : "center",
			bUseEffect : true,
			bAutoClose : false,
			bAutoReposition : true,
			sFoggyColor : "gray",
			nFoggyOpacity : 0.5,
			sEffectType : "pop",
			nEffectDuration : 500,
			sDialogColor : "white"
		};
		this.option(htDefaultOption);
		this.option(htOption || {});

		this._setWrapperElement();
		this._initVar();
		this._setDeviceSize();
		this._initElement();

		if(this.option("bActivateOnload")) {
			this.activate();
		}
	},

	/**
		jindo.m.Dialog 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
	**/
	_setWrapperElement : function() {
		this._htWElement = {};
		this._htWElement["dialog_container"] =  jindo.$Element('<div class="' + this.option("sClassPrefix") + 'container"></div>');
		this._htWElement["dialog_foggy"] =  jindo.$Element('<div class="' + this.option("sClassPrefix") + 'fog"></div>');
		this._htWElement["dialog_layer"] =  jindo.$Element('<div class="' + this.option("sClassPrefix") + 'layer"></div>');
		this._htWElement["dialog_clone"] =  jindo.$Element('<div class="' + this.option("sClassPrefix") + 'clone"></div>');
	},

	/**
		인스턴스 변수를 초기화한다.
	**/
	_initVar : function() {
		this._htDialogSize = {
			width : 0,
			height : 0
		};

		this._sTemplate = null;
		this._bIsShown = false;
		this._bProcessingShow = false;
		this._bProcessingHide = false;
		this._htDeviceInfo = jindo.m.getDeviceInfo();
		this._bIOS = (this._htDeviceInfo.iphone || this._htDeviceInfo.ipad) ? true : false;
		this._bIsRenderBug = true; //ios와 android 모두 화면 전환시에 dialog창을 토글 시킨 상태에서 화면 크기를 맞춤
		this._bAndroid = this._htDeviceInfo.android ? true : false;
	},

	/**
		디바이스의 View영역 사이즈를 구한다.
	**/
	_setDeviceSize : function() {
		if (this._bIOS || (this._bAndroid) || !jindo.$Agent().navigator().mobile) {
			this._htDeviceSize = jindo.$Document().clientSize();
		} else {
			this._htDeviceSize = {
				width : window.screen.width,
				height : window.screen.height
			};
		}
	},

	/**
		다이얼로그 컨테이너의 초기위치를 설정한다.
	**/
	_initContainerTop : function() {
		//console.log("_initContainerTop")
		var nTop = 0;
		var bUseEffect = this.option("bUseEffect");
		var sEffectType = this.option("sEffectType");

		if(bUseEffect && (sEffectType == "slide-up" || sEffectType == "slide-down")) {
			// 슬라이드 효과일경우 화면 상단/하단에 위치하도록 설정한다.
			nTop = this._htDeviceSize.height * ((sEffectType == "slide-up") ? 1 : -1);
		}
		// 페이지가 스크롤된 만큼 보정처리한다.
		nTop += window.pageYOffset;

		this._htWElement["dialog_container"].css("top", nTop + "px");
	},

	/**
		Element를 초기화한다.
	**/
	_initElement : function() {
		// 포그레이어 초기화
		this._htWElement["dialog_foggy"].css({
			position : "absolute",
			padding : "0px",
			margin : "0px",
			border : "0px",
			backgroundColor : this.option("sFoggyColor"),
			opacity : this.option("nFoggyOpacity"),
			width : this._htDeviceSize.width + "px",
			height : this._htDeviceSize.height + "px",
			left : "0px",
			top : "0px"
		});
		this._htWElement["dialog_foggy"].appendTo(this._getContainer());

		// 다이얼로그 창 초기화
		this._htWElement["dialog_layer"].css({
			position : "relative",
			backgroundColor : this.option('sDialogColor')
		});
		this._htWElement["dialog_layer"].appendTo(this._getContainer());

		// 다이얼로그 컨테이너 초기화
		this._htWElement["dialog_container"].css({
			position : "absolute",
			overflow : "hidden",
			width : this._htDeviceSize.width + "px",
			height : this._htDeviceSize.height + "px",
			left : "0px",
			zIndex : 100
		});
		this._initContainerTop();
		this._htWElement["dialog_container"].hide();
		this._htWElement["dialog_container"].appendTo(document.body);

		if(this.option("bUseEffect")) {
			this._oLayerEffect = new jindo.m.LayerEffect(this._getContainer());
		}

		// 다이얼로그 클론창 초기화
		this._htWElement["dialog_clone"].css({
			position : "absolute",
			left : "-1000px",
			top : "-1000px"
		});
		this._htWElement["dialog_clone"].appendTo(document.body);
		this._htWElement["dialog_clone"].hide();
	},

	/**
		jindo.m.Dialog 컴포넌트를 활성화한다.
	**/
	_onActivate : function() {
		this._attachEvent();
	},

	/**
		jindo.m.Dialog 컴포넌트를 비활성화한다.
		deactivate 실행시 호출됨
	**/
	_onDeactivate : function() {
		this._detachEventAll();
	},

	/**
		jindo.m.Dialog 에서 사용하는 모든 이벤트를 바인드한다.
	**/
	_attachEvent : function() {
		this._htEvent = {};
		/*this._htEvent["click"] = {
			ref : jindo.$Fn(this._onClick, this).attach(this._getContainer(), "click"),
			el	: this._getContainer()
		};*/

		// click event 처리
		this._htEvent["click"] = {
			ref : jindo.$Fn(this._onClick, this).attach(this.getDialog(), "click"),
			el	: this.getDialog()
		};

		this._htEvent["touchend"] = {
			ref : jindo.$Fn(this._onClick, this).attach(this._getFoggy(), "touchend"),
			el	: this._getFoggy()
		};

		/*
		this._htEvent["touchstart"] = {
			ref : jindo.$Fn(this._onTouchStart, this).attach(this._getContainer(), "touchstart"),
			el	: this._getContainer()
		};*/

		// 스크롤 방지 처리
		this._htEvent["touchmove"] = {
			ref : jindo.$Fn(this._onTouchMove, this).attach(this._getContainer(), "touchmove"),
			el	: this._getContainer()
		};

		/*
		this._htEvent["touchmove"] = {
			ref : jindo.$Fn(this._onTouchMove, this).attach(document, "touchmove"),
			el	: document
		};*/

		// 리사이즈 처리
		if (this.option("bAutoReposition")) {
			this._htEvent["rotate"] = jindo.$Fn(this._onResize, this).bind();
			jindo.m.bindRotate(this._htEvent["rotate"]);
		}
	},

	/**
		특정 이벤트를 해제한다.
		@param {String} sEventKey 이벤트 키
	**/
	_detachEvent : function(sEventKey) {
		if(sEventKey) {
			var htTargetEvent = this._htEvent[sEventKey];
			if (htTargetEvent.ref) {
				htTargetEvent.ref.detach(htTargetEvent.el, sEventKey);
			}
		}
	},

	/**
		jindo.m.Dialog 에서 사용하는 모든 이벤트를 해제한다.
	**/
	_detachEventAll : function() {
		for(var p in this._htEvent) {
			this._detachEvent(p);
		}
		jindo.m.unbindRotate(this._htEvent["rotate"]);
		this._htEvent = null;
	},

	/**
		다이얼로그 레이어 내부에서 닫기, 확인, 취소 버튼을 처리하기위한 핸들러
		@param {jindo.$Event} we 랩핑된 이벤트객체
	**/
	_onClick : function(we) {
		var sClassPrefix = this.option("sClassPrefix");
		var elClosestClose, elClosestConfirm, elClosestCancel, elClosestLayer, elClosestAnchor;

		if ((elClosestClose = jindo.m.getClosest(("." + sClassPrefix + "close"), we.element))) {

			/**
				닫기 버튼(dialog-close)이 눌렸을 경우에 발생

				@event close
				@param {String} sType 커스텀 이벤트명
				@param {HTMLElement} elLayer 다이얼로그 Element
			**/
			if(this.fireEvent("close", {
				sType : "close",
				elLayer : this.getDialog()
			})) {
				this.hide();
			}
		} else if ((elClosestConfirm = jindo.m.getClosest(("." + sClassPrefix + "confirm"), we.element))) {

			/**
				확인 버튼(dialog-confirm)이 눌렸을 경우에 발생

				@event confirm
				@param {String} sType 커스텀 이벤트명
				@param {HTMLElement} elLayer 다이얼로그 Element
			**/
			if(this.fireEvent("confirm", {
				sType : "confirm",
				elLayer : this.getDialog()
			})) {
				this.hide();
			}
		} else if ((elClosestCancel = jindo.m.getClosest(("." + sClassPrefix + "cancel"), we.element))) {

			/**
				취소 버튼(dialog-cancel)이 눌렸을 경우에 발생

				@event cancel
				@param {String} sType 커스텀 이벤트명
				@param {HTMLElement} elLayer 다이얼로그 Element
			**/
			if (this.fireEvent("cancel", {
				sType : "cancel",
				elLayer : this.getDialog()
			})) {
				this.hide();
			}
		} else if ((elClosestLayer = jindo.m.getClosest(("." + sClassPrefix + "layer"), we.element))) {
			// 다이얼로그 안쪽영역 클릭
			if ((elClosestAnchor = jindo.m.getClosest(("a"), we.element))) {
				// 링크가 클릭된 경우
				return false;
			}
		} else {
			// 다이얼로그 외 바깥영역 클릭
			if(this.option("bAutoClose")) { this.hide(); }
		}
		we.stop();
		return false;
	},

	/**
		터치스타트 이벤트를 처리하기위한 핸들러 - 롱탭/하이라이팅 막기
		@param {jindo.$Event} we 랩핑된 이벤트객체
	**/
	_onTouchStart : function(we) {
		var sClassPrefix = this.option("sClassPrefix");
		var elClosestLayer;
		if (!(elClosestLayer = jindo.m.getClosest(("." + sClassPrefix + "layer"), we.element))) {
			we.stop(jindo.$Event.CANCEL_ALL);
			return false;
		}
	},

	/**
		터치무브 이벤트를 처리하기위한 핸들러 - 스크롤 막기
		@param {jindo.$Event} we 랩핑된 이벤트객체
	**/
	_onTouchMove : function(we) {
		we.stop(jindo.$Event.CANCEL_ALL);
		return false;
	},

	/**
		리사이즈를 처리하기위한 핸들러
		@param {jindo.$Event} we 랩핑된 이벤트객체
	**/
	_onResize : function(we) {
		// Show/Hide를 처리하는 중에 리사이즈 발생시
		if(this._bProcessingShow || this._bProcessingHide) {
			if(this.option("bUseEffect")) {
				this._getLayerEffect().stop();
			} else {
				if(this._bProcessingShow) {
					this._endShowEffect();
				} else {
					this._endHideEffect();
				}
			}
		}

		if(this._oTimeout) {
			clearTimeout(this._oTimeout);
			this._oTimeout = null;
		}
		if (this.isShown() && this._bIsRenderBug) {
			this._htWElement["dialog_container"].hide();
		}
		this._oTimeout = setTimeout(jindo.$Fn(function() {
			this._resizeDocument();

			if (this.isShown() && this._bIsRenderBug) {
				this._htWElement["dialog_container"].show();
			}
			
			if(this.option("bUseEffect")) {
                this._getLayerEffect().setSize();
            }
		}, this).bind(), 300);
	},

	/**
		리사이즈를 처리한다.
	**/
	_resizeDocument : function() {
		this._setDeviceSize();
		// Container Resize
		this._htWElement["dialog_container"].css({
			width : this._htDeviceSize.width + "px",
			height : this._htDeviceSize.height + "px"
		});
		// FogLayer Resize
		this._htWElement["dialog_foggy"].css({
			width : this._htDeviceSize.width + "px",
			height : this._htDeviceSize.height + "px"
		});
		
		// Dialog Resize
		this._resizeDialog(true);

		// LayerEffect Resize
		if(this.option("bUseEffect")) { this._getLayerEffect().setSize(); }
	},

	/**
		setTemplate등으로 다이얼로그가 수정되었을경우 다이얼로그의 리사이즈를 처리한다.
		@param (Boolean} bForced 무조건 _repositionDialog()를 수행할지 여부
	**/
	_resizeDialog : function(bForced) {
		//console.log("_resizeDialog")
		if(this._setDialogSize() || bForced) {
			// Dialog Reposition
			this._repositionDialog();
		}
	},
	/**
		생성된 LayerEffect 컴포넌트의 인스턴스를 가져온다.
		@return {jindo.m.LayerEffect} LayerEffect 컴포넌트의 인스턴스
	**/
	_getLayerEffect : function() {
		return this._oLayerEffect;
	},

	/**
		다이얼로그 컨테이너 엘리먼트를 반환한다.
		@return {HTMLElement} elDialogContainer 다이얼로그 컨테이너 엘리먼트
	**/
	_getContainer : function() {
		return this._htWElement["dialog_container"].$value();
	},

	/**
		Foggy 엘리먼트를 반환한다.
		@return {HTMLElement} Foggy 엘리먼트
	**/
	_getFoggy : function() {
		return this._htWElement["dialog_foggy"].$value();
	},

	/**
		다이얼로그 엘리먼트를 반환한다.

		@method getDialog
		@return {HTMLElement} elDialog 다이얼로그 엘리먼트
	**/
	getDialog : function() {
		return this._htWElement["dialog_layer"].$value();
	},

	/**
		다이얼로그 레이어에 대한 템플릿을 설정한다.
		@remark 다이얼로그 레이어의 내용을 동적으로 설정하기 위해 템플릿 형태로 설정한다.

		@method setTemplate
		@remark Jindo의 jindo.$Template 참고
		@param {String} sTemplate 템플릿 문자열
		@example
			oDialog.setTemplate('<div><a href="#" class="dialog-close"><img width="15" height="14" alt="레이어닫기" src="http://static.naver.com/common/btn/btn_close2.gif"/></a></div><div style="position:absolute;top:30px;left:10px;">{=text}</div><div style="position:absolute;bottom:10px;right:10px;"><button type="button" class="dialog-confirm">확인</button><button type="button" class="dialog-cancel">취소</button></div></div>');
	**/
	setTemplate : function(sTemplate) {
		this._sTemplate = sTemplate;
		this._oTemplate = jindo.$Template(this._sTemplate);


		this._htWElement["dialog_clone"].html(sTemplate);
		this._resizeDialog();
	},

	/**
		설정된 다이얼로그 레이어의 템플릿을 가져온다.

		@method getTemplate
		@return {String} sTemplate 설정된 템플릿 문자열
	**/
	getTemplate : function() {
		return this._sTemplate;
	},

	/**
		다이얼로그 레이어의 사이즈를 저장한다.
	**/
	_setDialogSize : function() {
		//console.log("_setDialogSize")
		var nLayerWidth;
		var nLayerHeight;
		if(this.option("sPosition") == "all") {
			// 다이얼로그 레이어의 사이즈를 디바이스 사이즈로 설정한다.
			nLayerWidth = this._htDeviceSize.width;
			nLayerHeight = this._htDeviceSize.height;
		} else {
			// 실제 다이얼로그 레이어의 사이즈를 구하기위해 클론을 사용한다.
			this._htWElement["dialog_clone"].show();
			nLayerWidth = Math.min(this._htWElement["dialog_clone"].width(), this._htDeviceSize.width);
			nLayerHeight = Math.min(this._htWElement["dialog_clone"].height(), this._htDeviceSize.height);
			this._htWElement["dialog_clone"].hide();
		}

		// 기존에 설정해놨던 사이즈와 동일할 경우 return false; 처리한다.
		if(this._htDialogSize.width == nLayerWidth && this._htDialogSize.height == nLayerHeight) {
			return false;
		}

		// 새로 구한 사이즈를 저장한다.
		this._htDialogSize = {
			width : nLayerWidth,
			height : nLayerHeight
		};

		// 다이얼로그 레이어의 사이즈를 설정한다.
		this._htWElement["dialog_layer"].css({
			width : nLayerWidth + "px",
			height : nLayerHeight + "px"
		});

		return this._htDialogSize;
	},

	/**
		다이얼로그 레이어의 사이즈를 반환한다.
		@return {Object} htDialogSize 다이얼로그 레이어 사이즈정보
	**/
	_getDialogSize : function() {
		return this._htDialogSize;
	},

	/**
		다이얼로그의 위치를 재계산한다.
	**/
	_repositionDialog : function() {
		//console.log("_repositionDialog")

		var htLayerPosition = this._getDialogPosition();
		this._htWElement["dialog_layer"].css({
			top : htLayerPosition.top + "px",
			left : htLayerPosition.left + "px"
		});

		this._htWElement["dialog_container"].css({
			top : window.pageYOffset + "px",
			left : window.pageXOffset + "px"
		});
		

		if(!this.isShown()) {
			var sEffectType = this.option("sEffectType");
			if(sEffectType == "slide-up" || sEffectType == "slide-down") {
				this._initContainerTop();
			}
		}
	},

	/**
		다이얼로그 레이어의 위치를 반환한다.
		@return {Object} htLayerPosition 다이얼로그 레이어 위치정보
	**/
	_getDialogPosition : function() {
		var nWidth = this._htDeviceSize.width;
		var nHeight = this._htDeviceSize.height;
		var nLayerWidth = this._getDialogSize().width;
		var nLayerHeight = this._getDialogSize().height;

		var htLayerPosition = {};
		switch(this.option("sPosition")) {
		case "top":
			htLayerPosition.top = 0;
			htLayerPosition.left = parseInt((nWidth - nLayerWidth) / 2, 10);
			break;
		case "center":
			htLayerPosition.top = parseInt((nHeight - nLayerHeight) / 2, 10);
			htLayerPosition.left = parseInt((nWidth - nLayerWidth) / 2, 10);
			break;
		case "bottom":
			htLayerPosition.top = parseInt(nHeight - nLayerHeight,10);
			htLayerPosition.left = parseInt((nWidth - nLayerWidth) / 2, 10);
			break;
		case "all" :
			htLayerPosition.top = 0;
			htLayerPosition.left = 0;
			break;
		}

		return htLayerPosition;
	},

	/**
		다이얼로그 레이어에 위치를 설정한다.

		@method setPosition
		@param {String} sPosition ("top"|"center"|"bottom"|"all")
	**/
	setPosition : function(sPosition) {
		if(sPosition == "top" || sPosition == "center" || sPosition == "bottom" || sPosition == "all") {
			this.option("sPosition", sPosition);
		}

		this._resizeDialog();
	},

	/**
		이펙트 사용을 설정한다.

		@method useEffect
	**/
	useEffect : function() {
		if(this.option("bUseEffect")) { return false; }
		this.option("bUseEffect", true);
		this._initContainerTop();
	},

	/**
		이펙트 효과를 없앤다.

		@method unuseEffect
	**/
	unuseEffect : function() {
		if(!this.option("bUseEffect")) { return false; }
		this.option("bUseEffect", false);
		this._initContainerTop();
	},

	/**
		이펙트 타입을 설정한다.

		@method setEffectType
		@param {String} sEffectType 이펙트 타입
	**/
	setEffectType : function(sEffectType) {
		this.useEffect();

		if(sEffectType == "pop" || sEffectType == "slide-up" || sEffectType == "slide-down" || sEffectType == "flip") {
			this.option("sEffectType", sEffectType);
			this._initContainerTop();
		}
	},

	/**
		이펙트 지속시간을 설정한다.

		@method setEffectDuration
		@param {Number} nEffectDuration 이펙트 지속시간 (ms단위)
	**/
	setEffectDuration : function(nEffectDuration) {
		this.useEffect();

		if(nEffectDuration && nEffectDuration > 99) {
			this.option("nEffectDuration", nEffectDuration);
		}
	},


	/**
		이펙트 효과를 설정한다.

		@method setEffect
		@param {Object} htEffectOption 이펙트 효과 정보(이펙트 종류, 시간)
	**/
	setEffect : function(htEffectOption) {
		this.useEffect();

		if(htEffectOption.type) {
			this.setEffectType(htEffectOption.type);
		}

		if(htEffectOption.duration) {
			this.setEffectDuration(htEffectOption.duration);
		}
	},

	/**
		다이얼로그 레이어가 보여지고 있는지 가져온다.

		@method isShown
		@return {Boolean} 다이얼로그 레이어의 노출여부
	**/
	isShown : function() {
		return this._bIsShown;
	},

	/**
		다이얼로그를 보여준다.

		@method show
		@param {Object} htTemplate 다이얼로그 템플릿 Text치환 정보
		@param {Object} htEventHandler 커스텀 이벤트 정보
	**/
	show : function(htTemplate, htEventHandler) {
		//console.log("show")
		if(this.isShown()) { return false; }

		this._bProcessingShow = true;

		// 다이얼로그가 보이는 동안에 스크롤을 막기
		this._htEvent["touchstart"] = {
			ref : jindo.$Fn(this._onTouchStart, this).attach(document, "touchstart"),
			el	: document
		};

		// custom event attach
		if(htEventHandler) {
			this._showAttachedEvent = htEventHandler;
			this.attach(htEventHandler);
		}

		// Dialog가 뜬 상태에서는 스크롤 불가처리
		this._resizeDocument();

		// Template처리
		if(typeof htTemplate == "undefined") {
			htTemplate = {};
		} else {
			this._htWElement["dialog_clone"].html(this._oTemplate.process(htTemplate));
			this._resizeDialog();
		}
		this._htWElement["dialog_layer"].html(this._oTemplate.process(htTemplate));

		/**
			Dailog가 보여지기 전에 발생

			@event beforeshow
			@param {String} sType 커스텀 이벤트명
			@param {HTMLElement} elLayer 다이얼로그 Element
			@param {Function} stop 수행시 다이얼로그가 Show되지 않음
		**/
		if(!this.fireEvent("beforeShow", {
			sType : "beforeShow",
			elLayer : this.getDialog()
		})) { return; }

		this._showDialogLayer();
	},

	/**
		이펙트 사용여부에 따라 분기처리한다.
	**/
	_showDialogLayer : function() {
		//console.log("_showDialogLayer")

		if(this.option("bUseEffect")) {
			this._getLayerEffect().attach("afterEffect", jindo.$Fn(this._endShowEffect, this).bind());
			this._startShowEffect();
		} else {
			// Effect 효과 없음
			this._htWElement["dialog_container"].show();
			this._endShowEffect();
		}
	},

	/**
		Show시 보여줄 이펙트효과를 시작한다.
	**/
	_startShowEffect : function() {
		//console.log("_startShowEffect")

		var sEffectType = this.option("sEffectType");
		var nEffectDuration = this.option("nEffectDuration");

		switch(sEffectType) {
		case "slide-up":
			this._htWElement["dialog_container"].show();
			this._getLayerEffect().setSize();
			this._getLayerEffect().slide({
				sDirection : "up",
				nDuration : nEffectDuration
			});
			break;
		case "slide-down":
			this._htWElement["dialog_container"].show();
			this._getLayerEffect().setSize();
			this._getLayerEffect().slide({
				sDirection : "down",
				nDuration : nEffectDuration
			});
			break;
		case "pop":
			this._getLayerEffect().pop({
				sDirection : "in",
				nDuration : nEffectDuration,
				htFrom : {opacity : 1}
			});
			break;
		case "flip":
			this._htWElement["dialog_container"].show();
			this._getLayerEffect().flip({
				nDuration : nEffectDuration,
				elFlipFrom : this._getContainer(),
				elFlipTo : this._getContainer(),
				htFrom : {opacity : 0},
				htTo : {opacity : 1}
			});
			//this._htWElement["dialog_container"].show();
			break;
		}
	},

	/**
		Show시 보여줄 이펙트효과를 끝낸다.
	**/
	_endShowEffect : function() {
		//console.log("_endShowEffect")

		if(this.option("bUseEffect")) { this._getLayerEffect().detachAll("afterEffect"); }

		/**
			Dailog가 보여진 후에 발생

			@event show
			@param {String} sType 커스텀 이벤트명
			@param {HTMLElement} elLayer 다이얼로그 Element
		**/
		this.fireEvent("show", {
			sType : "show",
			elLayer : this.getDialog()
		});

		this._bIsShown = true;
		this._bProcessingShow = false;
	},

	/**
		다이얼로그를 숨긴다.

		@method hide
	**/
	hide : function() {
		//console.log("hide")
		if(!this.isShown()) { return false; }

		this._bProcessingHide = true;

		/**
			Dailog가 숨겨지기 전에 발생

			@event beforeHide
			@param {String} sType 커스텀 이벤트명
			@param {HTMLElement} elLayer 다이얼로그 Element
			@param {Function} stop 수행시 다이얼로그가 Hide되지 않음
		**/
		if(!this.fireEvent("beforeHide", {
			sType : "beforeHide",
			elLayer : this.getDialog()
		})) { return; }

		this._hideDialogLayer();
	},

	/**
		이펙트 사용여부에 따라 분기처리한다.
	**/
	_hideDialogLayer : function() {
		//console.log("_hideDialogLayer")

		if(this.option("bUseEffect")) {
			this._getLayerEffect().attach("afterEffect", jindo.$Fn(this._endHideEffect, this).bind());
			this._startHideEffect();
		} else {
			// Effect 효과 없음
			this._htWElement["dialog_container"].hide();
			this._endHideEffect();
		}
	},

	/**
		Hide시 보여줄 이펙트효과를 시작한다.
	**/
	_startHideEffect : function() {
		//console.log("_startHideEffect")

		var sEffectType = this.option("sEffectType");
		var nEffectDuration = this.option("nEffectDuration");

		switch(sEffectType) {
		case "slide-up":
			this._getLayerEffect().slide({
				sDirection : "down",
				nDuration : nEffectDuration
			});
			break;
		case "slide-down":
			this._getLayerEffect().slide({
				sDirection : "up",
				nDuration : nEffectDuration
			});
			break;
		case "pop":
			this._getLayerEffect().pop({
				sDirection : "out",
				nDuration : nEffectDuration,
				htTo : {opacity : 0}
			});
			break;
		case "flip":
			this._getLayerEffect().flip({
				nDuration : nEffectDuration,
				elFlipFrom : this._getContainer(),
				elFlipTo : this._getContainer(),
				htTo : {opacity : 0}
			});
			break;
		}
	},

	/**
		Hide시 보여줄 이펙트효과를 끝낸다.
	**/
	_endHideEffect : function() {
		//console.log("_endHideEffect")

		if(this.option("bUseEffect")) { this._getLayerEffect().detachAll("afterEffect"); }

		/**
			Dailog가 숨겨진 후에 발생

			@event hide
			@param {String} sType 커스텀 이벤트명
			@param {HTMLElement} elLayer 다이얼로그 Element
		**/
		this.fireEvent("hide", {
			sType : "hide",
			elLayer : this.getDialog()
		});

		// custom event detach
		if(this._showAttachedEvent) {
			for(var evt in this._showAttachedEvent) {
				//console.log(evt)
				this.detachAll(evt);
			}
			this._showAttachedEvent = null;
		}

		// 다이얼로그가 보이는 동안에 스크롤을 막기 해제
		this._detachEvent("touchstart");

		this._htWElement["dialog_container"].hide();
		this._htWElement["dialog_container"].css("opacity", 1);

		if(window.pageYOffset || window.pageXOffset) {
			this._htWElement["dialog_container"].css({
				top : "0px",
				left : "0px"
			});
		}

		this._bIsShown = false;
		this._bProcessingHide = false;
	},

	/**
		객체를 release 시킨다.

		@method destroy
	**/
	destroy : function() {
		this._detachEventAll();

		if(this.option("bUseEffect")) {
			this._getLayerEffect().destroy();
			this._oLayerEffect = null;
		}

		this._htWElement["dialog_container"].leave();
		this._htWElement["dialog_clone"].leave();
		this._htWElement = null;
		this._htDeviceSize = null;
		this._htDialogSize = null;
		this._sTemplate = null;
		this._oTemplate = null;
		this._bIsShown = null;
		this._bProcessingShow = null;
		this._bProcessingHide = null;
		this._oTimeout = null;
		this._htDeviceInfo = null;
		this._bIOS = null;
		this._bIsRenderBug = null;
		this._bAndroid = null;
	}
}).extend(jindo.m.UIComponent);/**
	@fileOverview 기준 엘리먼트의 자식들 중 특정 클래스명을 가진 모든 엘리먼트를 Drag 가능하게 하는 컴포넌트
	@author "oyang2"
	@version 1.7.1
	@since 2012. 2. 7.
**/
/**
	기준 엘리먼트의 자식들 중 특정 클래스명을 가진 모든 엘리먼트를 Drag 가능하게 하는 컴포넌트

	@class jindo.m.DragArea
	@extends jindo.m.UIComponent
	@uses jindo.m.Touch
	@keyword drag, area, 드래그&드랍, 드래그, 영역
	@group Component

	@history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
	@history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
	@history 1.1.0 Release 최초 릴리즈
**/
jindo.m.DragArea = jindo.$Class({
	/* @lends jindo.m.DragArea.prototype */
	/**
		초기화 함수

		@constructor
		@param {HTMLElement | String} el 기준 엘리먼트 (혹은 id)
		@param {Object} [htOption] 초기화 옵션 객체
			@param {String} [htOption.sClassPrefix='drag-'] Class의 prefix명
			@param {Boolean} [htOption.bFlowOut=false] 기준 엘리먼트 영역 밖으로 이동 드래그 가능한지 여부
			@param {Number} [htOption.nThreshold=10] 최초 드래그가 시작되기 위한 최소 사용자 움직임값 (px)
			@param {Number} [htOption.nMoveThreshold=3] 드래그 이벤트가 발생되는 사용자 움직임 값(px)
			@param {Boolean} [htOption.bActivateOnload=true] 컴포넌트 로드시 activate 여부

		@example
			var  oDrag = new jindo.m.DragArea('layer1', {
				sClassPrefix : 'drag-',
				bFlowOut : false, //기준 엘리먼트 영역 밖으로 이동 가능한지에 대한 여부
				nThreshold : 10, //최초 드래그가 시작되기 위한 최소 사용자 움직임값 (px)
				nMoveThreshold : 3, //드래그 이벤트가 발생되는 사용자 움직임 값(px)
				bActivateOnload : true
			});
	**/
	$init : function(el, htOption) {
		this.option({
			sClassPrefix : 'drag-',
			bFlowOut : false, //기준 엘리먼트 영역 밖으로 이동 가능한지에 대한 여부
			nThreshold : 10,
			nMoveThreshold : 3,
			bActivateOnload : true
		});

		this.option(htOption || {});
		this._initVar();
		this._setWrapperElement(el);
		this._initTouch();
		this._setAnchorElement();

		if(this.option("bActivateOnload")) {
			this.activate();
		}
	},

	/**
		jindo.m.DragArea 에서 사용하는 모든 인스턴스 변수를 초기화한다.
	**/
	_initVar: function() {
		this._oTouch = null;
		this._sDragClass = '.'+ this.option('sClassPrefix')+"dragging";
		this._sHandleClass = '.'+this.option('sClassPrefix')+"handle";

		this._htInfo = {
			elDrag : null,
			elHandle : null,
			nStartX : null,
			nStartY : null,
			nX : null,
			nY : null,
			bDragStart : false, //dragStart가 시작되었는지 여부
			nCount : 0, //실제 드래그객체의 offset을 움직인 개수
			bPrepared : false //드래깅할 준비가 되어 있는지 여부
		};

		this._sCssUserSelect = "-"+jindo.m.getCssPrefix()+"-user-select";
		this._sCssUserSelectValue = document.body.style[this._sCssUserSelect];
		var htInfo = jindo.m.getDeviceInfo();
		this._isIos = (htInfo.iphone || htInfo.ipad);

		this._aAnchor = null;
		this._fnDummyFnc = function(){return false;};
		this._bBlocked = false;

		var nVersion = parseFloat(htInfo.version,10);
		this._bTouchStop = false;
		this._bTouchStop = htInfo.android && ((nVersion == 2.1) || (nVersion >= 3 ));
		if(!this._bTouchStop){
			this._bTouchStop = htInfo.iphone && (nVersion >= 3 && nVersion <4 );
		}

	},

	/**
		jindo.m.DragArea 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
	**/
	_setWrapperElement: function(el) {
		this._htWElement = {};
		el = jindo.$(el);
		this._htWElement.base = jindo.$Element(el);
	},

	/**
		jindo.m.Touch컴포넌트를 초기화 한다.
	**/
	_initTouch : function(){
		if(!this._oTouch){
			this._oTouch = new jindo.m.Touch(this._htWElement.base.$value(),{
				nSlopeThreshold : 1,
				nMoveThreshold : this.option('nMoveThreshold'),
				bActivateOnload : false
			});
			this._oTouch.setSlope(-1,-1);
		}
	},

	/**
		el 안에 드래깅가능한 엘리먼트인지를 판단하여 리턴한다.
	**/
	_getDragElement : function(el, sClass){
		if (jindo.$$.test(el, "input[type=text], textarea, select")){
			return null;
		}

		var self = this;

		var isChildOfDragArea = function(baseElement, el) {
			if (!el) {
				return false;
			}
			if (baseElement === document ||baseElement === el) {
				return true;
			}
			return jindo.$Element(baseElement).isParentOf(el);
		};

		//var elReturn = jindo.$$.test(el, this._sDragClass) ? el : jindo.$$.getSingle('! ' + this._sDragClass, el);
		var elReturn = jindo.$$.test(el, this._sDragClass) ? el : jindo.m.getClosest(this._sDragClass, el);

		if (!isChildOfDragArea(this._htWElement.base, elReturn)) {
			elReturn = null;
		}
		var elHandle = null;

		if(elReturn){
			try{
				elHandle = jindo.$$.getSingle(this._sHandleClass, elReturn);
			}catch(e){
				//console.log(e);
			}
			if(elHandle){
				if (!isChildOfDragArea(elHandle, el)) {
					elReturn = null;
			//		elHandle = null;
				}
			}
		}
		return {
			elDrag : elReturn,
			elHandle : elHandle
		};
	},

	/**
		touchstart 이벤트 핸들러
	**/
	_onStart : function(oCustomEvt){
		if(!this.isActivating()){
			return;
		}

		this._initInfo();

		var htElement = this._getDragElement(oCustomEvt.element, this._sHandleClass );

		if(!htElement.elDrag){return;}

		var htParam = {
			elHandle :	 htElement.elHandle,
			elDrag : htElement.elDrag,
			oEvent : oCustomEvt.oEvent
		};

		if(!this.fireEvent('handleDown',htParam)){
			return;
		}

		//안드로이드2.1 , 3.0 버그 픽스
		if(this._bTouchStop){
			oCustomEvt.oEvent.stop();
		}

		//드래깅할 준비 플래그 세팅
		this._htInfo.bPrepared = true;

		//ios일 경우 A태그에 대한 클릭을 방지 코드
		this._clearAnchor();

		this._htInfo.welDrag = jindo.$Element(htParam.elDrag);
		this._htInfo.elHandle = htParam.elHandle;
		var htOffset = this._htInfo.welDrag.offset();
		this._htInfo.nStartX = htOffset.left;
		this._htInfo.nStartY = htOffset.top;


		//롱탭시에 나올수 있는 복사하기를 막기위해 css를 추가한다.
		document.body.style[this._sCssUserSelect] = "none";

		this._oTouch.attach({
			touchMove : this._htEvent["touchMove"],
			touchEnd :  this._htEvent["touchEnd"]
		});



	},

	/**
		touchmove 이벤트 핸들러
	**/
	_onMove : function(oCustomEvt){
		//드래깅할 준비가 안되어 있다면
		if(!this._htInfo.bPrepared){
			return;
		}

		var nDisX = oCustomEvt.nDistanceX,
			nDisY = oCustomEvt.nDistanceY;

		if((Math.abs(nDisX)+Math.abs(nDisY)) < this.option('nThreshold')){
			return;
		}

		oCustomEvt.oEvent.stop();

		var htOffset = {
			nX : this._htInfo.nStartX+ nDisX,
			nY : this._htInfo.nStartY+ nDisY
		};

		if(!this.option('bFlowOut')){
			var htNewOffset = this._onReCalculateOffset(this._htInfo.welDrag.$value(), htOffset.nX, htOffset.nY);
			htOffset.nX = htNewOffset.nX;
			htOffset.nY = htNewOffset.nY;
		}

		var htParam = {
			nX : htOffset.nX,
			nY : htOffset.nY,
			elDrag : this._htInfo.welDrag.$value(),
			elHandle : this._htInfo.elHandle,
			nGapX : nDisX,
			nGapY :	nDisY,
			nDragCount : this._htInfo.nCount,
			nTouchX : oCustomEvt.nX,
			nTouchY : oCustomEvt.nY
		};

		if(!this._htInfo.bDragStart){

			/**
				드래그가 시작될 때 발생(최초 한번의 드래그가 실행전)

				@event dragStart
				@param {String} sType 커스텀이벤트명
				@param {HTMLElement} elHandle 드래그 엘리먼트내의 핸들 영역. 없을 경우 null로 반환됨
				@param {HTMLElement} elDrag 실제로 드래드될 엘리먼트
				@param {Number} nX 드래그 엘리먼트가 이동될 x 좌표 (left)
				@param {Number} nY 드래그 엘리먼트가 이동될 y 좌표 (top)
				@param {Number} nGapX handledown된 x 좌표와 dragstart x 좌표의 차이
				@param {Number} nGapY handledown된 y 좌표와 dragstart y 좌표의 차이
				@param {Number} nTouchX 현재 터치 X 좌표값
				@param {Number} nTouchY 현재 터치 Y 좌표값
				@param {Number} nDragCount 실제로 drag되어 엘리먼트의 좌표를 움직인 카운트 (dragStart에서는 무조건 0)
				@param {Function} stop 드래그를 중지시킨다.이후 모든 이벤트는 발생하지 않는다.
			**/
			if(!this.fireEvent('dragStart', htParam)){
				this._htInfo.bPrepared = false;
				return;
			}
		}

		this._htInfo.bDragStart = true;
		/**
			드래그가 시작되고 엘리먼트가 이동되기 직전에 발생 (이동중 beforedrag, drag 순으로 연속적으로 발생)

			@event beforeDrag
			@param {String} sType 커스텀이벤트명
			@param {HTMLElement} elHandle 드래그 엘리먼트내의 핸들 영역. 없을 경우 null로 반환됨
			@param {HTMLElement} elDrag 실제로 드래드될 엘리먼트
			@param {Number} nX 드래그 엘리먼트가 이동될 x 좌표 (left)
			@param {Number} nY 드래그 엘리먼트가 이동될 y 좌표 (top)
			@param {Number} nGapX handledown된 x 좌표와 dragstart x 좌표의 차이
			@param {Number} nGapY handledown된 y 좌표와 dragstart y 좌표의 차이
			@param {Number} nTouchX 현재 터치 X 좌표값
			@param {Number} nTouchY 현재 터치 Y 좌표값
			@param {Number} nDragCount 실제로 drag되어 엘리먼트의 좌표를 움직인 카운트
			@param {Function} stop drag 이벤트를 발생시키지 않고 중단.
		**/
		if(!this.fireEvent('beforeDrag',htParam)){
			return;
		}

		this._htInfo.welDrag.css('position','absolute');
		this._htInfo.welDrag.offset(htParam.nY,htParam.nX);
		this._htInfo.nX = htParam.nX;
		this._htInfo.nY = htParam.nY;
		this._htInfo.nCount++;

		/**
			드래그 엘리먼트가 이동하는 중에 발생 (이동중 beforedrag, drag 순으로 연속적으로 발생)

			@event drag
			@param {String} sType 커스텀이벤트명
			@param {HTMLElement} elHandle 드래그 엘리먼트내의 핸들 영역. 없을 경우 null로 반환됨
			@param {HTMLElement} elDrag 실제로 드래드될 엘리먼트
			@param {Number} nX 드래그 엘리먼트가 이동될 x 좌표 (left)
			@param {Number} nY 드래그 엘리먼트가 이동될 y 좌표 (top)
			@param {Number} nGapX handledown된 x 좌표와 dragstart x 좌표의 차이
			@param {Number} nGapY handledown된 y 좌표와 dragstart y 좌표의 차이
			@param {Number} nTouchX 현재 터치 X 좌표값
			@param {Number} nTouchY 현재 터치 Y 좌표값
			@param {Number} nDragCount 실제로 drag되어 엘리먼트의 좌표를 움직인 카운트
			@param {Function} stop drag 이벤트를 발생시키지 않고 중단.
		**/
		this.fireEvent('drag', htParam);
	},

	/**
		기준엘리먼트 내에 drag 엘리먼트가 벗어날 수 없도록 좌표를 재계산한다.

		@param {HTMLElement} drag대상 엘리먼트
		@param {Number} nX
		@param {Number} nY
	**/
	_onReCalculateOffset : function(elDrag, nX, nY){
		var elParent = this._htWElement.base;

		var htOffset = elParent.offset();
		var htParent = {
			//nX :  elParent.$value().offsetLeft,
			//nY :  elParent.$value().offsetTop,
			nX : htOffset.left,
			nY : htOffset.top,
			nWidth : elParent.$value().offsetWidth,
			nHeight : elParent.$value().offsetHeight
		};

		var htDrag = {
			nWidth : elDrag.offsetWidth,
			nHeight : elDrag.offsetHeight
		};

		var newX = Math.max(nX, htParent.nX);
		newX = Math.min(newX, htParent.nX+htParent.nWidth - htDrag.nWidth);

		var newY = Math.max(nY, htParent.nY);
		newY = Math.min(newY, htParent.nY+htParent.nHeight - htDrag.nHeight);

		return {
			nX : newX,
			nY : newY
		};

	},

	/**
		touchend 이벤트 핸들러
	**/
	_onEnd : function(oCustomEvt){
		//console.log('onEnd');
		//드래깅할 준비가 안되어 있다면
		if(!this._htInfo.bPrepared){
			return;
		}

		this._stopDrag(false);
		//탭 혹은 롱탭일때

		if (oCustomEvt.sMoveType === jindo.m.MOVETYPE[3] || oCustomEvt.sMoveType === jindo.m.MOVETYPE[4]) {
			this._restoreAnchor();
		}

		if(this._htInfo.welDrag){
			var htParam = {
				elDrag : this._htInfo.welDrag.$value(),
				elHandle : this._htInfo.elHandle
			};

			/**
				드래그 완료 이후 터치가 끝났을 때 발생

				@event handleUp
				@param {String} sType 커스텀 이벤트명
				@param {HTMLElement} elHandle 드래그 엘리먼트내의 핸들 영역. 없을 경우 null로 반환됨
				@param {HTMLElement} elDrag 실제로 드래드될 엘리먼트
				@param {Function} stop 이후 수행에 영향받는 이벤트 없다.
			**/
			this.fireEvent('handleUp', htParam);
		}

		this._initInfo();
	},

	/**
		현재 드래깅중인지 리턴한다.
		@method isDragging
		@return {Boolean}
	**/
	isDragging : function(){
		return this._htInfo.bDragStart;
	},

	/**
		현재 드래깅을 중지한다.
		@method stopDragging
	**/
	stopDragging : function(){
		this._stopDrag(true);
	},

	/**
		드래깅을 중지하고 dragEnd 이벤트를 발생한다.
		@param {Boolean} bInterupted 터치이벤트가 아닌 사용자 강제 종료 여부
	**/
	_stopDrag : function(bInterupted){
		if (typeof bInterupted === 'undefined'){
			bInterupted = false;
		}

		this._oTouch.detach({
			touchMove : this._htEvent["touchMove"],
			touchEnd :  this._htEvent["touchEnd"]
		});

		//user-select의 부분 되돌리기
		document.body.style[this._sCssUserSelect] = this._sCssUserSelectValue? this._sCssUserSelectValue : "";

		if(this.isDragging()){
			var htParam = {
				nX : parseInt(this._htInfo.welDrag.css("left"), 10) || 0,
				nY : parseInt(this._htInfo.welDrag.css("top"), 10) || 0,
				elDrag : this._htInfo.welDrag.$value(),
				elHandle : this._htInfo.elHandle,
				bInterupted : bInterupted
			};
			/**
				드래그(엘리먼트 이동)가 완료된 후에 발생 (touchEnd 시점에 발생, 뒤이어 hanldeup발생)

				@event dragEnd
				@param {String} sType 커스텀 이벤트명
				@param {HTMLElement} elHandle 드래그 엘리먼트내의 핸들 영역. 없을 경우 null로 반환됨
				@param {HTMLElement} elDrag 실제로 드래드될 엘리먼트
				@param {Number} nX 드래그 엘리먼트가 이동될 x 좌표 (left)
				@param {Number} nY 드래그 엘리먼트가 이동될 y 좌표 (top)
				@param {Boolean} bInterupted 드래그중 stopDragging() 호출로 강제적으로 드래그가 종료되었는지의 여부
				@param {Function} stop 이후 수행에 영향받는 이벤트 없다.
			**/
			this.fireEvent('dragEnd', htParam);
			this._htInfo.bDragStart = false;
		}

	},

	/**
		flicking 내에 a 엘리먼트를 모두 가져와서 세팅한다. (ios에서만)
	**/
	_setAnchorElement : function(){
		//ios에서만 처리되도록 수정.
		if(this._isIos ){
			this._aAnchor = jindo.$$("A", this._htWElement.base.$value());
		}
	},

	/**
		Anchor 삭제
	**/
	_clearAnchor : function() {
		if(this._aAnchor && !this._bBlocked) {
			var aClickAddEvent = null;
			for(var i=0, nILength=this._aAnchor.length; i<nILength; i++) {
				if (this._fnDummyFnc !== this._aAnchor[i].onclick) {
					this._aAnchor[i]._onclick = this._aAnchor[i].onclick;
				}
				this._aAnchor[i].onclick = this._fnDummyFnc;
				aClickAddEvent = this._aAnchor[i].___listeners___ || [];
				for(var j=0, nJLength = aClickAddEvent.length; j<nJLength; j++) {
					___Old__removeEventListener___.call(this._aAnchor[i], "click", aClickAddEvent[j].listener, aClickAddEvent[j].useCapture);
				}
			}
			this._bBlocked = true;
		}
	},

	/**
		Anchor 복원. for iOS
	**/
	_restoreAnchor : function() {
		if(this._aAnchor && this._bBlocked) {
			var aClickAddEvent = null;
			for(var i=0, nILength=this._aAnchor.length; i<nILength; i++) {
				if(this._fnDummyFnc !== this._aAnchor[i]._onclick) {
					this._aAnchor[i].onclick = this._aAnchor[i]._onclick;
				} else {
					this._aAnchor[i].onclick = null;
				}
				aClickAddEvent = this._aAnchor[i].___listeners___ || [];
				for(var j=0, nJLength = aClickAddEvent.length; j<nJLength; j++) {
					___Old__addEventListener___.call(this._aAnchor[i], "click", aClickAddEvent[j].listener, aClickAddEvent[j].useCapture);
				}
			}
			this._bBlocked = false;
		}
	},

	/**
		터치 정보를 리셋한다.
	**/
	_initInfo : function(){
		this._htInfo.welDrag = null;
		this._htInfo.elHandle = null;
		this._htInfo.nStartX = null;
		this._htInfo.nStartY = null;
		this._htInfo.nX = null;
		this._htInfo.nY = null;
		this._htInfo.bDragStart = false;
		this._htInfo.nCount = 0;
	},

	/**
		jindo.m.DragArea 컴포넌트를 활성화한다.
		activate 실행시 호출됨
	**/
	_onActivate : function() {
		this._attachEvent();
		this._oTouch.activate();
	},

	/**
		jindo.m.DragArea 컴포넌트를 비활성화한다.
		deactivate 실행시 호출됨
	**/
	_onDeactivate : function() {
		this._detachEvent();
		this._oTouch.deactivate();
	},

	/**
		jindo.m.DragArea 에서 사용하는 모든 이벤트를 바인드한다.
	**/
	_attachEvent : function() {
		this._htEvent = {};
		/*Touch 이벤트용 */
		this._htEvent["touchMove"] = jindo.$Fn(this._onMove, this).bind();
		this._htEvent["touchEnd"] = jindo.$Fn(this._onEnd, this).bind();
		this._htEvent["touchStart"] = jindo.$Fn(this._onStart, this).bind();

		/*Touch attach */
		this._oTouch.attach("touchStart", this._htEvent["touchStart"]);
	},

	/**
		jindo.m.DragArea 에서 사용하는 모든 이벤트를 해제한다.
	**/
	_detachEvent : function() {
		/*touch detach */
		this._oTouch.detachAll();

		for(var p in this._htEvent){
			this._htEvent[p] = null;
		}

		this._htEvent = null;
	},

	/**
		jindo.m.DragArea 에서 사용하는 모든 객체를 release 시킨다.
		@method destroy
	**/
	destroy : function() {
		this.deactivate();

		for(var p in this._htWElement) {
			this._htWElement[p] = null;
		}

		for(p in this._htInfo) {
			this._htInfo[p] = null;
		}

		this._htWElement = null;
		this._htInfo = null;
		this._isIos = null;
		this._aAnchor = null;
		this._fnDummyFnc = null;
		this._bBlocked = null;
		this._bTouchStop = null;
	}
}).extend(jindo.m.UIComponent);
/**
	@fileOverview DropArea 컴포넌트는 DragArea 컴포넌트로 드래그된 엘리먼트가 드랍되었을 때 지정한 동작을 수행할 수 있도록 도와주는 컴포넌트
	@author "oyang2"
	@version 1.7.1
	@since 2012. 2. 20.
**/
/**
	DropArea 컴포넌트는 DragArea 컴포넌트로 드래그된 엘리먼트가 드랍되었을 때 지정한 동작을 수행할 수 있도록 도와주는 컴포넌트

	@class jindo.m.DropArea
	@extends jindo.m.UIComponent
	@uses jindo.m.DragArea
	@keyword drop, area, 드래그&드랍, 드랍, 영역
	@group Component

	@history 1.3.0 Update 플리킹이나 스크롤 컴포넌트내에서도 정상동작하도록 수정
	@history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
	@history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
	@history 1.1.0 Release 최초 릴리즈
**/
jindo.m.DropArea = jindo.$Class({
	/* @lends jindo.m.DropArea.prototype */
	/**
		초기화 함수

		@constructor
		@param {HTMLElement | String} el 기준 엘리먼트 (혹은 id)
		@param {Object} [htOption] 초기화 옵션 객체
			@param {String} [htOption.sClassPrefix='drop-'] Class의 prefix명
			@param {String} [htOption.oDragInstance=null] Drop이 될 대상인 DragArea 컴포넌트의 인스턴스 (필수지정)
			@param {Boolean} [htOption.bUseTouchPoint=false] 드롭엘리먼트 영역에 OVER를 감지 할때 터치 포인트를 사용할지에 대한 여부
			@param {Boolean} [htOption.bActivateOnload=true]

		@example
			var  oDrop = new jindo.m.DropArea('layer1', {
				sClassPrefix : 'drop-',
				oDragInstance : null, //jindo.m.DragArea 인스턴스
				bUseTouchPoint : false, //드롭엘리먼트 영역에 OVER를 감지 할때 터치 포인트를 사용할지에 대한 여부
				bActivateOnload : true
			});
	**/
	$init : function(el, htOption) {
		this.option({
			sClassPrefix : 'drop-',
			oDragInstance : null,
			bActivateOnload : true,
			bUseTouchPoint : false
		});
		this.option(htOption || {});

		this._initVar();
		this._setWrapperElement(el);

		if(this.option("bActivateOnload")) {
			this.activate();
		}
	},

	/**
		jindo.m.DropArea 에서 사용하는 모든 인스턴스 변수를 초기화한다.
	**/
	_initVar: function() {
		this._waOveredDroppableElement = jindo.$A([]);
		this._sEvent = 'ontouchstart' in window? 'touchmove' : 'mousemove';
		this._sDropClassName = '.' + this.option('sClassPrefix')+"area";

		this._aItem = null;
		this._aItemRect = null;
		this._elHandle = null;
		this._elDragging = null;

		var htInfo = jindo.m.getDeviceInfo();
		//상위 스크롤이 적용되었을 경우 오프셋을 다시 구할지 여부
		// 아이폰 인앱브라우저의 경우 오프셋이 상위 translate가 모두 계산된 값으로 리턴된다.
		this._bReCalculateOffset = ((htInfo.iphone || htInfo.ipad) && htInfo.bInapp )? false: true;
	},

	/**
		jindo.m.DropArea 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
	**/
	_setWrapperElement: function(el) {
		this._htWElement = {};
		el = jindo.$(el);
		this._htWElement["base"] = jindo.$Element(el);
	},

	/**
		el의 offset 범위를 구해서 리턴한다.
		@param {HTMLElement} el
		@return {Object}
	**/
	_getRectInfo : function(el){
		var htOffset = jindo.$Element(el).offset();

		var nVectorX = 0;
		var nVectorY = 0;

		if(this._bReCalculateOffset ){
			jindo.$Element(el).parent(function(v){
					var htCssOffset = jindo.m.getCssOffset(v.$value());
					nVectorX += htCssOffset.left;
					nVectorY += htCssOffset.top;
			});
		}

		return {
			nLeft : htOffset.left + (nVectorX),
			nTop : htOffset.top + (nVectorY),
			nRight : htOffset.left + nVectorX + el.offsetWidth,
			nBottom : htOffset.top + nVectorY +el.offsetHeight
		};
	},

	/**
		기준레이어내의 모든 드롭엘리먼트를 구하고 각 드롭엘리먼트의 위치범위를 저장한다.
	**/
	_reCalculate : function() {

		var elBase = this._htWElement["base"].$value();
		var aItem = jindo.$$(this._sDropClassName , elBase);

		if (elBase.tagName && jindo.$$.test(elBase, this._sDropClassName )) {
			aItem.push(elBase);
		}
		//console.log('다시구해 ' + aItem.length);
		this._aItem = aItem;
		this._aItemRect = [];

		for (var i = 0, el; (el = aItem[i]); i++) {
			this._aItemRect.push(this._getRectInfo(el));
		}
	},
	/**
		el을 기준으로 현재 위치에 맞는 drop area를 찾는다.
	**/
	_findDroppableElement : function(el) {
		var elDroppable = jindo.$$.test(el, this._sDropClassName ) ? el : jindo.m.getClosest(this._sDropClassName , el);

		if (!this._isChildOfDropArea(el)) { //기준 엘리먼트가 document인 경우 Magnetic일때 문서밖으로 커서이동시 event 발생!
			elDroppable = null;
		}
		return elDroppable;
	},

	/**
		el이 기준 엘리먼트내의 자식 노드인지 확인한다.
		@param {HTMLElement}
	**/
	_isChildOfDropArea : function(el) {
		if (this._el === document || this._el === el){
			return true;
		}
		return this._htWElement["base"].isParentOf(el);
	},


	_isDropMove : function(nLeft, nTop, nRight, nBottom){
		var aItem = this._aItem;
		var aItemRect = this._aItemRect, i, htRect, el;

		if(!this.option('bUseTouchPoint')){
			for (i = 0; ((htRect = aItemRect[i]) && (el = aItem[i])); i++) {
				var bHOver = this._checkOverArea({nMin: htRect.nLeft, nMax : htRect.nRight}, {nMin : nLeft, nMax : nRight});
				var bVOver = this._checkOverArea({nMin: htRect.nTop, nMax : htRect.nBottom}, {nMin : nTop, nMax : nBottom});

				if(bHOver && bVOver){
					this._addOveredDroppableElement(el);
					this._fireMoveEvent(el, htRect, {nX : nLeft,nY: nTop});
				}else{
					this._removeOveredDroppableElement(el);
				}

			}
		}else{
			//console.log('터치 포인트로 게산해여');
			for (i = 0; ((htRect = aItemRect[i]) && (el = aItem[i])); i++) {
				if ( htRect.nLeft <= nLeft && nLeft <= htRect.nRight && htRect.nTop <= nTop && nTop <= htRect.nBottom ) {
					this._addOveredDroppableElement(el);
					this._fireMoveEvent(el, htRect, {nX : nLeft,nY: nTop});
				} else {
					this._removeOveredDroppableElement(el);
				}
			}
		}
	},

	/**
		min, max 값으로 base 값안에 check값이 있는지 판단.
	**/
	_checkOverArea : function(htBase, htCheck){

		if(htCheck.nMin < htBase.nMin){
			if(htCheck.nMax > htBase.nMin){
				return true;
			}
		}else{
			if(htCheck.nMin < htBase.nMax){
				return true;
			}
		}
		return false;
	},

	/**
		커스텀 이벤트 move를 발생시킨다
	**/
	_fireMoveEvent : function(elDrop, htRect, htTouchInfo){
		var nRatioX = (htTouchInfo.nX - htRect.nLeft) / (htRect.nRight - htRect.nLeft);
		var nRatioY = (htTouchInfo.nY - htRect.nTop) / (htRect.nBottom - htRect.nTop);

		/**
			Drag된 채 Drop 가능한 엘리먼트위에서 움직일 경우 발생

			@event move
			@param {String} sType 커스텀 이벤트명
			@param {HTMLElement} elDrop Drop된 대상 엘리먼트
			@param {HTMLElement} elDrag 드래그된 엘리먼트
			@param {HTMLElement} elHandle 드래그된 엘리먼트 내 핸들 영역 (없는 경우 null)
			@param {Number} nRatioX (Number): 드랍될 엘리먼트 내부의 좌우비율
			@param {Number} nRatioY (Number): 드랍될 엘리먼트 내부의 상하비율
			@param {Function} stop 수행시 영향을 받는것은 없다
		**/
		this.fireEvent('move',{
			elHandle : this._elHandle,
			elDrag : this._elDragging,
			elDrop : elDrop,
			nRatioX : nRatioX,
			nRatioY : nRatioY
		});
	},

	/**
		el을 드롭엘리먼트로 추가한다. 존재하지 않으면 'over' 커스텀 이벤트를 발생한다.
		@param {HTMLElement} el
	**/
	_addOveredDroppableElement : function(elDroppable) {
		if (this._waOveredDroppableElement.indexOf(elDroppable) == -1) {
			this._waOveredDroppableElement.push(elDroppable);

			/**
				Drag된 채 Drop 가능한 엘리먼트에 올라갈 경우 발생

				@event over
				@param {HTMLElement} elDrop Drop된 대상 엘리먼트
				@param {HTMLElement} elDrag 드래그된 엘리먼트
				@param {HTMLElement} elHandle 드래그된 엘리먼트 내 핸들 영역 (없는 경우 null)
				@param {Function} stop 수행시 영향을 받는것은 없다
			**/
			this.fireEvent('over', {
				elHandle : this._elHandle,
				elDrag : this._elDragging,
				elDrop : elDroppable
			});
		}
	},

	/**
		el을 드롭엘리먼트에서 제거한다. 제거되면 'out' 커스텀 이벤트를 발생한다.
		@param {HTMLElement} el
	**/
	_removeOveredDroppableElement : function(elDroppable) {
		var nIndex = this._waOveredDroppableElement.indexOf(elDroppable);
		if (nIndex != -1) {
			this._waOveredDroppableElement.splice(nIndex, 1);

			/**
				Drag된 채 Drop 가능한 엘리먼트에서 벗어날 경우 발생

				@event out
				@param {String} sType 커스텀 이벤트명
				@param {HTMLElement} elDrop Drop된 대상 엘리먼트
				@param {HTMLElement} elDrag 드래그된 엘리먼트
				@param {HTMLElement} elHandle 드래그된 엘리먼트 내 핸들 영역 (없는 경우 null)
				@param {Function} stop 수행시 영향을 받는것은 없다
			**/
			this.fireEvent('out', {
				elHandle : this._elHandle,
				elDrag : this._elDragging,
				elDrop : elDroppable
			});
		}
	},

	/**
		현재 드롭엘리먼트를 삭제하고 drop 커스텀 이벤트를 발생한다.
	**/
	_clearOveredDroppableElement : function(){
		for (var elDroppable; (elDroppable = this._waOveredDroppableElement.$value()[0]); ) {
			this._waOveredDroppableElement.splice(0, 1);
			/**
				Drop 가능한 엘리먼트에 성공적으로 드랍 될 경우 발생

				@event drop
				@param {String} sType 커스텀 이벤트명
				@param {HTMLElement} elDrop Drop된 대상 엘리먼트
				@param {HTMLElement} elDrag 드래그된 엘리먼트
				@param {HTMLElement} elHandle 드래그된 엘리먼트 내 핸들 영역 (없는 경우 null)
				@param {Function} stop 수행시 영향을 받는것은 없다
			**/
			this.fireEvent('drop', {
				elHandle : this._elHandle,
				elDrag : this._elDragging,
				elDrop : elDroppable
			});
		}
	},

	/**
		Drag되고 있는 채, 마우스가 올라간 엘리먼트의 리스트를 구함
		@method getOveredLists
		@return {Array} 겹쳐진 엘리먼트
	**/
	getOveredLists : function() {
		return this._waOveredDroppableElement ? this._waOveredDroppableElement.$value() : [];
	},

	/**
		jindo.m.DropArea 컴포넌트를 활성화한다.
		activate 실행시 호출됨
	**/
	_onActivate : function() {
		this._attachEvent();

		if(this.option('oDragInstance')){
			var oDrag = this.option('oDragInstance');
			var self = this;

			oDrag.attach({

				/**
					드래그될 handle(handle 영역이 없을 경우 drag영역)에 터치 하였을 때(oDragInstance의 handleDown 연이어 발생

					@event handleDown
					@param {String} sType 커스텀 이벤트명
					@param {HTMLElement} elDrag 드래그된 엘리먼트
					@param {HTMLElement} elHandle 드래그된 엘리먼트 내 핸들 영역 (없는 경우 null)
					@param {Object} oEvent jindo.$Event object
					@param {Function} stop 드래그를 중지시킨다. 이후 모든 이벤트는 발생하지 않는다.
				**/
				'handleDown' : function(oCustomEvent){
					//console.log('drop HandleDown');
					self._elHandle = oCustomEvent.elHandle;
					self._elDragging = oCustomEvent.elDrag;
					self._waOveredDroppableElement.empty();
					self.fireEvent(oCustomEvent.sType, oCustomEvent);
				},
				/**
					드래그가 시작될 때 발생(최초 한번의 드래그가 실행전)(oDragInstance의 dratStart 연이어 발생)

					@event dragStart
					@param {String} sType 커스텀 이벤트명
					@param {HTMLElement} elDrag 드래그된 엘리먼트
					@param {HTMLElement} elHandle 드래그된 엘리먼트 내 핸들 영역 (없는 경우 null)
					@param {Number} nX 드래그 엘리먼트가 이동될 x 좌표 (left)
					@param {Number} nY 드래그 엘리먼트가 이동될 y 좌표 (top)
					@param {Number} nGapX handledown된 x 좌표와 dragstart x 좌표의 차이
					@param {Number} nGapY handledown된 y 좌표와 dragstart y 좌표의 차이
					@param {Number} nTouchX 현재 터치 X 좌표값
					@param {Number} nTouchY 현재 터치 Y 좌표값
					@param {Number} nDragCount 실제로 drag되어 엘리먼트의 좌표를 움직인 카운트 (dragStart에서는 무조건 0)
					@param {Function} stop 드래그를 중지시킨다. 이후 모든 이벤트는 발생하지 않는다.

				**/
				'dragStart' : function(oCustomEvent){
					//self._reCalculate();
					if(!self.fireEvent(oCustomEvent.sType, oCustomEvent)){
						oCustomEvent.stop();
					}else{
						self._reCalculate();
						//self._htEvent["touchMove"].attach(document, self._sEvent);
					}
				},
				/**
					드래그가 시작되고 엘리먼트가 이동되기 직전에 발생(oDragInstance의 beforeDrag 연이어 발생)

					@event beforeDrag
					@param {String} sType 커스텀 이벤트명
					@param {HTMLElement} elDrag 드래그된 엘리먼트
					@param {HTMLElement} elHandle 드래그된 엘리먼트 내 핸들 영역 (없는 경우 null)
					@param {Number} nX 드래그 엘리먼트가 이동될 x 좌표 (left)
					@param {Number} nY 드래그 엘리먼트가 이동될 y 좌표 (top)
					@param {Number} nGapX handledown된 x 좌표와 dragstart x 좌표의 차이
					@param {Number} nGapY handledown된 y 좌표와 dragstart y 좌표의 차이
					@param {Number} nTouchX 현재 터치 X 좌표값
					@param {Number} nTouchY 현재 터치 Y 좌표값
					@param {Number} nDragCount 실제로 drag되어 엘리먼트의 좌표를 움직인 카운트
					@param {Function} stop 드래그를 중지시킨다. 이후 모든 이벤트는 발생하지 않는다.
				**/
				'beforeDrag' : function(oCustomEvent){
					self.fireEvent(oCustomEvent.sType, oCustomEvent);
				},
				/**
					드래그 엘리먼트가 이동후 발생(oDragInstance의 drag 연이어 발생)

					@event drag
					@param {String} sType 커스텀 이벤트명
					@param {HTMLElement} elDrag 드래그된 엘리먼트
					@param {HTMLElement} elHandle 드래그된 엘리먼트 내 핸들 영역 (없는 경우 null)
					@param {Number} nX 드래그 엘리먼트가 이동될 x 좌표 (left)
					@param {Number} nY 드래그 엘리먼트가 이동될 y 좌표 (top)
					@param {Number} nGapX handledown된 x 좌표와 dragstart x 좌표의 차이
					@param {Number} nGapY handledown된 y 좌표와 dragstart y 좌표의 차이
					@param {Number} nTouchX 현재 터치 X 좌표값
					@param {Number} nTouchY 현재 터치 Y 좌표값
					@param {Number} nDragCount 실제로 drag되어 엘리먼트의 좌표를 움직인 카운트
					@param {Function} stop 드래그를 중지시킨다. 이후 모든 이벤트는 발생하지 않는다.
				**/
				'drag' : function(oCustomEvent){
					self._elDragging = oCustomEvent.elDrag;
					var wel = jindo.$Element(oCustomEvent.elDrag);

					var nTop =self.option('bUseTouchPoint')?  oCustomEvent.nTouchY	: oCustomEvent.nY;
					var nLeft = self.option('bUseTouchPoint')? oCustomEvent.nTouchX: oCustomEvent.nX;
					var nRight = nLeft+wel.width();
					var nBottom = nTop +wel.height();

					self._isDropMove(nLeft, nTop, nRight, nBottom );

					self.fireEvent(oCustomEvent.sType, oCustomEvent);
				},
				/**
					드래그(엘리먼트 이동)가 완료된 후에 발생.(oDragInstance의 dragEnd 연이어 발생)
					@event dragEnd
					@param {String} sType 커스텀 이벤트명
					@param {HTMLElement} elDrag 드래그된 엘리먼트
					@param {HTMLElement} elHandle 드래그된 엘리먼트 내 핸들 영역 (없는 경우 null)
					@param {Number} nX 드래그 엘리먼트가 이동될 x 좌표 (left)
					@param {Number} nY 드래그 엘리먼트가 이동될 y 좌표 (top)
					@param {Boolean} bInterupted 드래그중 stopDragging() 호출로 강제적으로 드래그가 종료되었는지의 여부
					@param {Function} stop 수행시 영향을 받는것은 없다

				**/
				'dragEnd': function(oCustomEvent){
					//self._htEvent["touchMove"].detach(document, self._sEvent);

					var oParam = {};
					oParam.aElDrop = self.getOveredLists().concat();

					for(var p in oCustomEvent){
						oParam[p] = oCustomEvent[p];
					}

					self._clearOveredDroppableElement();

					self.fireEvent(oCustomEvent.sType, oParam);

				},
				/**
					드래그 완료 이후 터치가 끝났을 때 발생(oDragInstance의 hanldeUp 연이어 발생)

					@event handleUp
					@param {String} sType 커스텀 이벤트명
					@param {HTMLElement} elDrag 드래그된 엘리먼트
					@param {HTMLElement} elHandle 드래그된 엘리먼트 내 핸들 영역 (없는 경우 null)
					@param {Function} stop 수행시 영향을 받는것은 없다
				**/
				'handleUp' : function(oCustomEvent){
					self.fireEvent('handleUp',{
						elHandle : self._elHandle,
						elDrag : self._elDragging
					});
					//console.log('handleUp');
					self._elHandle = null;
					self._elDragging = null;
				}
			});
		}
	},

	/**
		jindo.m.DropArea 컴포넌트를 비활성화한다.
		deactivate 실행시 호출됨
	**/
	_onDeactivate : function() {
		this._detachEvent();
		if(this.option('oDragInstance')){
			var oDrag = this.option('oDragInstance');
			oDrag.detachAll();
		}
	},

	/**
		jindo.m.DropArea 에서 사용하는 모든 이벤트를 바인드한다.
	**/
	_attachEvent : function() {
		this._htEvent = {};

		/*Touch 이벤트용 */
		//this._htEvent["touchMove"] = jindo.$Fn(this._onTouchMove, this);
	},

	/**
		jindo.m.DropArea 에서 사용하는 모든 이벤트를 해제한다.
	**/
	_detachEvent : function() {
		//this._htEvent["touchMove"].detach(this._htWElement.base, this._sEvent);
		this._htEvent = null;
	},

	/**
		jindo.m.DropArea 에서 사용하는 모든 객체를 release 시킨다.
		@method destroy
	**/
	destroy : function() {
		this.deactivate();

		for(var p in this._htWElement) {
			this._htWElement[p] = null;
		}
		this._htWElement = null;

	}

}).extend(jindo.m.UIComponent);

/**
    @fileOverview 레이어를 화면의 특정 영역에 위치시킬 수 있는 컴포넌트
    @author sculove
    @version 1.7.1
    @since 2011. 6. 30.
**/
/**
    레이어를 화면의 특정 영역에 위치시킬 수 있는 컴포넌트

    @class jindo.m.LayerPosition
    @extends jindo.m.UIComponent
    @keyword layer, position, 레이어, 위치
    @group Component

    @history 1.5.0 Bug iOS6에서 가로,세로 회전시 레이어 위치 못잡는 버그 수정
    @history 1.5.0 Support Window Phone8 지원
    @history 1.3.5 Update [bUseFixed] Option 기본값 수정 (false → true)
    @history 1.3.0 Update [bUseFixed] Option 추가
    @history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
    @history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
    @history 1.1.0 Update Android 3.0/4.0, iOS5일 경우 position: fixed 적용
    @history 0.9.5 Bug iOS에서 모바일기기 회전시(가로에서 세로로) HTML 깨지는 문제 해결
    @history 0.9.5 Bug 뒤로가기 버튼 눌렀을 때 오류 문제 해결
    @history 0.9.0 Release 최초 릴리즈
**/
jindo.m.LayerPosition = jindo.$Class({
    /* @lends jindo.m.LayerPosition.prototype */
    /**
        초기화 함수

        @constructor
        @param {Varient} el 대상 엘리먼트 (필수)
        @param {Object} [htOption] 초기화 옵션 객체
            @param {Boolean} [htOption.bActivateOnload=true] <auidoc:see content="jindo.m.FloatingLayer">FloatingLayer</auidoc:see> 컴포넌트가 로딩 될때 활성화 시킬지 여부를 결정한다.<br /> false로 설정하는 경우에는 LayerPosition.activate()를 호출하여 따로 활성화 시켜야 한다.
            @param {Boolean} [htOption.bAutoReposition=true] 화면 이동시, 또는 스크롤 이동시 LayerPosition이 자동으로 적용될지 여부를 결정한다
            @param {String} [htOption.sPosition="center"] LayerPosition의 영역을 지정한다. top, center, bottom, all의 총4개 영역이 있다.
            @param {Number} [htOption.nLeftMargin=0] LayerPosition의 nLeft마진을 지정한다
            @param {Number} [htOption.nRightMargin=0] LayerPosition의 nRight마진을 지정한다
            @param {Number} [htOption.nTopMargin=0] LayerPosition의 nTop마진을 지정한다
            @param {Number} [htOption.nBottomMargin=0] LayerPosition의 nBottom마진을 지정한다
            @param {Boolean} [htOption.bUseFixed=true] position:fixed 사용 여부를 설정한다. (단말기에서 position:fixed를 지원하지 않을 경우 옵션값은 무시된다)

        @example
            var oLpBottom = new jindo.m.LayerPosition("layer_bottom", {
                 bActivateOnload : true,
                 bAutoReposition : true,
                 sPosition : "center",
                 nLeftMargin : 0,
                 nRightMargin : 0,
                 nTopMargin : 0,
                 nBottomMargin : 0
            }).attach({
                "beforePosition" :  function(we) {
                 },
                "position" :  function(we) {
                 }
            });
    **/
    $init : function(el,htUserOption) {
        this.option({
             bActivateOnload : true,
             bAutoReposition : true,
             sPosition : "center",
             nLeftMargin : 0,
             nRightMargin : 0,
             nTopMargin : 0,
             nBottomMargin : 0,
             bUseFixed : true
        });
        this.option(htUserOption || {});
        this._initVar();
        this._setWrapperElement(el);
        if(this.option("bActivateOnload")) {
            this.activate();
        }
    },

    /**
        position:fixed 동작여부를 반환한다.

        @method isUseFixed
        @return {Boolean} position:fixed 사용여부
    **/
    isUseFixed : function() {
        return this._bUseFixedProperty;
    },

    /**
        jindo.m.LayerPosition 컴포넌트를 활성화한다.
        activate 실행시 호출됨
    **/
    _onActivate : function() {
        this._isVertical = jindo.m.isVertical();    // 모바일 기기 세로 여부
        if (this.option("bAutoReposition")) {
            this._attachEvent();
        }
        this.setPosition();
    },

    /**
        jindo.m.LayerPosition 컴포넌트를 비활성화한다.
        deactivate 실행시 호출됨
    **/
    _onDeactivate : function() {
        if (this.option("bAutoReposition")) {
            this._detachEvent();
        }
        // this._htWElement["element"].remove(this._elDummyTag);
    },

    /**
        jindo.m.LayerPosition 에서 사용하는 모든 인스턴스 변수를 초기화한다.
    **/
    _initVar: function() {
        var nLeft = this.option("nLeftMargin"),
            nTop = this.option("nTopMargin");
        this._htMargin = {
            nLeft: nLeft,
            nRight: this.option("nRightMargin"),
            nTop: nTop,
            nBottom: this.option("nBottomMargin")
        };
        this._sPosition = this.option("sPosition");
        this._htOldPosition = {
            nTop : null,
            nLeft : null,
            nBottom : null
        };
        this._htPosition = {
            nTop : null,
            nLeft : null,
            nBottom : null
        };
        // native fixed를 사용하는 경우
        // alert(this.option("bUseFixed") + " , " + jindo.m._isUseFixed());
        this._bUseFixedProperty = this.option("bAutoReposition") && (this.option("bUseFixed") && jindo.m._isUseFixed()) ;
        this._isVertical = null;    // 모바일 기기 세로 여부
        this._hasOrientationChange = jindo.m.getDeviceInfo().ipad || jindo.m.getDeviceInfo().iphone || jindo.m.getDeviceInfo().bChrome;
        this._nPreWidth = -1;
    },

    /**
        현재 설정된 sPosition 타입을 반환

        @method getPosition
        @return {String} center, top, bottom, all 중 값을 반환함
        @history 0.9.5 Update getArea() → getPosition()으로 Mehtod명 수정
    **/
    getPosition : function() {
        return this._sPosition;
    },

    /**
        현재 설정된 마진값을 반환

        @method getMargin
        @return {Object} {nTop,nLeft,nBottom,nRight} 반환
    **/
    getMargin : function() {
        return this._htMargin;
    },

    /**
        현재 LayerPosition이 적용된 Layer를 반환한다

        @method getLayer
        @return {HTMLElement} Layer 반환
    **/
    getLayer : function() {
        return this._htWElement["element"].$value();
    },

    /**
        현재 Layer의 위치 정보를 반환한다.

        @method getCurrentPosition
        @return {Object} {nTop, nLeft, nBottom} 형태의 객체 반환
    **/
    getCurrentPosition : function() {
        return this._htPosition;
    },

    /**
        jindo.m.LayerPosition 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
    **/
    _setWrapperElement: function(el) {
        this._htWElement = {};
        this.setLayer(el);
    },
    /**
        보여주고 숨겨줄 레이어 객체를 설정한다.<br />
        @remark
            설정된 엘리먼트는 document.body에 append된다.<br />
            - 지정한 엘리먼트의 position은 absolute로 지정됨<br />
            - bAutoReposition이 true이고, fixed속성이 가능한 경우, position은 fixed로 지정됨

        @method setLayer
        @return {this}
    **/
    setLayer : function(el) {
        this._htWElement["element"] = jindo.$Element(el);
        if(this._bUseFixedProperty) {
            this._htWElement["element"].css("position", "fixed");
        } else {
            this._htWElement["element"].css("position", "absolute");
        }
        if(!this._htWElement["element"].parent().isEqual(document.body)) {
            this._htWElement["element"].appendTo(document.body);
        }
        return this;
    },

    /**
        상단 중앙에 위치

        @method top
        @param {Object} htMargin {nLeft, nTop}의 상대 위치 지정
    **/
    top : function(htMargin) {
        this.setPosition("top", htMargin);
    },

    /**
        하단 중앙에 위치

        @method bottom
        @param {Object} htMargin {nLeft, nBottom}의 상대 위치 지정
    **/
    bottom : function(htMargin) {
        this.setPosition("bottom", htMargin);
    },

    /**
        중앙에 위치

        @method center
        @param {Object} htMargin {nLeft, nTop}의 상대 위치 지정
    **/
    center : function(htMargin) {
        this.setPosition("center", htMargin);
    },

    /**
        전체 화면에 위치

        @method all
        @param {Object} htMargin { nTop, nBottom, nLeft, nRight } 의 내부 공간영역지정
    **/
    all : function(htMargin) {
        this.setPosition("all", htMargin);
    },

    /**
        Layer의 내부 Margin을 가지는 전체크기를 설정하고, 위치정보를 반환한다

        @param {Number} nWidth
        @param {Number} nHeight
        @return {Object} {nTop, nLeft} 형태의 객체 반환
    **/
    _fixedLayerSize : function(nWidth, nHeight) {
        var nLeft = parseInt(this._htMargin.nLeft,10),
            nTop = parseInt(this._htMargin.nTop,10),
            htPadding = {
                "padding-top" : parseInt(this._htWElement["element"].css("padding-top"),10),
                "padding-bottom" : parseInt(this._htWElement["element"].css("padding-bottom"),10),
                "padding-left" : parseInt(this._htWElement["element"].css("padding-left"),10),
                "padding-right" :   parseInt(this._htWElement["element"].css("padding-right"),10)
            }, htBorder = {
                "border-top-width" : parseInt(this._htWElement["element"].css("border-top-width"),10),
                "border-bottom-width" : parseInt(this._htWElement["element"].css("border-bottom-width"),10),
                "border-left-width" : parseInt(this._htWElement["element"].css("border-left-width"),10),
                "border-right-width" : parseInt(this._htWElement["element"].css("border-right-width"),10)
            };
        nWidth -= htPadding["padding-left"] + htPadding["padding-right"] + htBorder["border-left-width"] + htBorder["border-right-width"] + nLeft + parseInt(this._htMargin.nRight,10);
        nHeight -= htPadding["padding-top"] + htPadding["padding-bottom"] + htBorder["border-top-width"] + htBorder["border-bottom-width"] + nTop + parseInt(this._htMargin.nBottom,10);

        // 스크롤여부에 따라 크기 조정
        this._htWElement["element"].css({
            width : nWidth + "px",
            height: nHeight + "px"
        });

        return {
            nTop : nTop,
            nLeft : nLeft
        };
    },

    /**
        Position에 맞는 Layer의 Position (top,left)를 구함
        (단, All인 경우, Layer의 크기도 변함)
    **/
    _getPosition : function() {
        var nLayerWidth = this._htWElement["element"].width(),
            nLayerHeight = this._htWElement["element"].height(),
            htElementPosition = {},
            // View...
            oClientSize = jindo.$Document().clientSize(),
            nWidth = oClientSize.width,
            nHeight = oClientSize.height;
            // nWidth = window.innerWidth;
            // nHeight = window.innerHeight;
            // console.log(nWidth + ", " + nHeight + "... " + document.documentElement.clientWidth + ", " + document.documentElement.clientHeight);
        //Layer에 마진이 있는경우 렌더링 보정.
        nLayerWidth += parseInt(this._htWElement["element"].css('marginLeft'), 10) + parseInt(this._htWElement["element"].css('marginRight'), 10) || 0;
        nLayerHeight += parseInt(this._htWElement["element"].css('marginTop'), 10) + parseInt(this._htWElement["element"].css('marginBottom'), 10) || 0;

        if(this._sPosition === "all") {
            htElementPosition = this._fixedLayerSize(nWidth, nHeight);
        } else {
            htElementPosition.nLeft = parseInt((nWidth - nLayerWidth) / 2,10) + parseInt(this._htMargin.nLeft,10);
            switch (this._sPosition) {
                case "top":
                    htElementPosition.nTop = parseInt(this._htMargin.nTop,10);
                    break;
                case "center":
                    htElementPosition.nTop = parseInt((nHeight - nLayerHeight) / 2,10) + parseInt(this._htMargin.nTop,10);
                    break;
                case "bottom":
                    if(this._bUseFixedProperty) {
                        htElementPosition.nBottom = parseInt(this._htMargin.nBottom,10);
                    } else {
                        htElementPosition.nTop = parseInt(nHeight - nLayerHeight,10) - parseInt(this._htMargin.nBottom,10);
                    }
                    break;
            }
            if(!this._bUseFixedProperty) {
                htElementPosition = this._adjustScrollPosition(htElementPosition);
            }
        }
        return htElementPosition;
    },

    /**
        스크롤이 있을 경우 Position 수정
        @param {Object} htPosition
    **/
    _adjustScrollPosition : function(htPosition) {
        var htScrollPosition = jindo.$Document().scrollPosition();
            //oClientSize = jindo.$Document().clientSize();
            // nMaxTop = this._nDocumentHeight - oClientSize.height,
            // nMaxLeft = this._nDocumentWidth - oClientSize.width;
        /*
         android 3.1에서 화면바깥 영역으로 바운딩하면 화면영역으로 돌아오는데,
         1.화면바깥 영역으로 스크롤하면 UI상 원래 위치로 돌아오지만, 값(pageX/YOffest , scrollX/Y)은  화면 영역밖의 값인-를 반환한다.
            => 스크롤 영역바깥영역일 경우, 최상단,하단값을 반환하도록 수정
        2.화면의 스크롤 크기를 나타내는 document.scrollWidth/Height, document.Width/Height도 늘어난 화면 영역값을 반환하지만, 화면이 원래 위치로 돌아온 후에는 원래 스크롤 영역이 아닌 늘어난 스크롤 영역을 나타냄
            => 초기 로딩시, 측정된 스크롤 사이즈를 기준으로 계산

        결국. Android 3.x, 4.x 는 position:fixed로 문제해결!
        */
        htPosition.nTop += htScrollPosition.top;
        htPosition.nLeft += htScrollPosition.left;
        return htPosition;
    },

    /**
        포지션을 잡음

        @method setPosition
        @param {String} sPosition : Layer Area종류 "top", "center", "bottom", "all" (옵션)
        @param {Object} htMargin {nTop,nLeft,nBottom,nRight} 객체 (옵션)<br/>
             중앙기준으로 상태좌표 이동 (all인 경우는 내부마진임)<br/>
             top Area인 경우 nTop, nLeft<br/>
             center Area인 경우 nTop, nLeft<br/>
             bottom Area인 경우 nBottom, nLeft<br/>
             all Area인 경우 nTop,nBottom, nLeft, nRight (all인 경우는 내부마진임)<br/>
        @history 0.9.5 Update 비동기식 처리방식에서 동기식으로 변경
    **/
   setPosition : function(sPosition, htMargin) {
        if(!this.isActivating()) {
            return;
        }
        this._htMargin = htMargin || this._htMargin;
        this._sPosition = sPosition || this._sPosition;
        /**
            포지션을 잡기 전에 발생

            @event beforePosition
            @param {String} sType 커스텀 이벤트명
            @param {HTMLElement} elLayer LayerPostion 적용된 Layer
            @param {Object} htMargin {nLeft,nTop,nBottom,nright}의 마진 객체
            @param {Object} htPosition 포지션 변경 전의 {nLeft,nTop} 객체
            @param {Function} stop position을 중지한다. beforeAdjust이후 커스텀 이벤트(position)가 발생하지 않는다.
        **/
        if(this._fireEvent("beforePosition")) {
            var bVisible = this._htWElement["element"].visible();
            if (!bVisible) {
                this._htWElement["element"].css({
                    left : "-9999px"
                }).show();
            }
            this._htOldPosition = this._htPosition;
            this._htPosition = this._getPosition();

            if (!bVisible) {
                this._htWElement["element"].hide();
            }

            // 기존 포지션과 현재 포지션값이 다를경우 변경. 그렇지 않으면 포지션을 변경하지 않음
            // 안보이는 경우는 무조건 변경함
            if (!bVisible || this._htOldPosition.nLeft !== this._htPosition.nLeft || this._htOldPosition.nTop !== this._htPosition.nTop || this._htOldPosition.nBottom !== this._htPosition.nBottom) {
                if(typeof this._htPosition.nTop === "undefined" ) {
                    this._htWElement["element"].$value().style.top = null;
                } else if(typeof this._htPosition.nBottom === "undefined" ) {
                    this._htWElement["element"].$value().style.bottom = null;
                }
                this._htWElement["element"].css({
                    left : this._htPosition.nLeft + "px",
                    top : this._htPosition.nTop + "px",
                    bottom : this._htPosition.nBottom + "px"
                });
                // alert(this._htOldPosition.nTop + "...." + this._htPosition.nTop);
                // this._fixedBugForAndroid();
            }
            /**
                포지션을 잡은 후에 발생. setPosition을 사용할 경우, 옵션값에 fSuccessFnc 함수를 지정하면 position 이벤트 발생후에 fSuccessFnc함수가 호출됨

                @event position
                @param {String} sType 커스텀 이벤트명
                @param {HTMLElement} elLayer LayerPostion 적용된 Layer
                @param {Object} htMargin {nLeft,nTop,nBottom,nright}의 마진 객체
                @param {Object} htPosition 포지션 변경 후의 {nLeft,nTop} 객체
                @param {Function} stop stop stop를 호출하여 영향 받는 것이 없음.
            **/
            this._fireEvent("position");
        }
    },

    /**
        jindo.m.LayerPosition 에서 사용하는 모든 이벤트를 바인드한다.
    **/
    _attachEvent : function() {
        this._htEvent = {};
        this._htEvent["actionEvent"] = jindo.$Fn(this._onEvent, this);
        this._htEvent["pageShow"] = jindo.$Fn(this._onPageShow, this).bind();
        if(this._bUseFixedProperty) {
            this._htEvent["actionEvent"].attach(window, "resize");
        } else {
            this._htEvent["actionEvent"].attach(window, "scroll").attach(window, "resize");
        }
        jindo.m.bindPageshow(this._htEvent["pageShow"]);

        if(this._hasOrientationChange) {
            this._htEvent["rotate"] = jindo.$Fn(this._onOrientationChange, this).attach(window, "orientationchange");
        }
    },

    /**
        jindo.m.LayerPosition 에서 사용하는 모든 이벤트를 해제한다.
    **/
    _detachEvent : function() {
        this._htEvent["actionEvent"].detach(window, "scroll")
                    .detach(window, "resize");
        jindo.m.unbindPageshow(this._htEvent["pageShow"]);
        if(this._hasOrientationChange) {
            this._htEvent["rotate"].detach(window, "orientationchange");
        }
        this._htEvent = null;
    },

    /**
        재포지션을 잡는 이벤트
        onScroll, onResize에서 처리함
        단, fixed 지원기기일 경우, onResize에서 처리됨
    **/
    _onEvent : function(we) {
        /**
         * Android 4.0 랜더링 버그
         * 모바일 기기 가로에서 세로로 바뀔경우, 화면의 위치는 정상이나, 화면이 랜더링 되지 않는 버그
         * 강제로 reflow를 발생.
         */
        if(jindo.m._isUseFixed() && jindo.m.getDeviceInfo().android) {
            this._htWElement["element"].css("left",this._htWElement["element"].css("left"));
        }
        if (this._htWElement["element"].visible()){
            this.setPosition();
        }
    },

    /**
        화면 전환 이벤트
    **/
    _onOrientationChange : function() {
        if (this._htWElement["element"].visible()){
            var self = this;
            /*
             * 레이어의 width가 100%로 되었을경우, 가로로 로딩후, 세로로 변경시 레이어가 깨지는 문제가 발생함.
             * 변경시 기존 값을 저장하고 width에 맞게 조절하는 기능을 함
             */
            if(window.innerWidth < this._htWElement["element"].width() ) {
                this._nPreWidth = this._htWElement["element"].width();
                this._htWElement["element"].width(window.innerWidth);
            } else {
                if(this._nPreWidth !== -1) {
                     this._htWElement["element"].width(this._nPreWidth);
                }
            }
            this._htWElement["element"].hide();
            this.setPosition();
            if(jindo.m.getDeviceInfo().android && !jindo.m.getDeviceInfo().bChrome) {
                this._htWElement["element"].show();
            } else {
                /**
                 * iOS5,6, chrome인 경우, 화면전환시 천천히 끌려가며 포지션을 잡는 현상이 발생
                 * delay 강제 발생후 처리
                 */
                setTimeout(function() {
                    self.setPosition();
                    self._htWElement["element"].show();
                },10);
            }
        }
    },

    /**
        History Backk 했을 경우
    **/
    _onPageShow : function() {
        if(this.isActivating()) {
            this.deactivate();
            this.activate();
        }
    },

    /**
        사용자 이벤트 호출
    **/
    _fireEvent : function(sType) {
        return this.fireEvent(sType, {
            elLayer : this.getLayer(),
            htMargin : this.getMargin(),
            htPosition : this.getCurrentPosition()
        });
    },

    /**
        jindo.m.LayerPosition 에서 사용하는 모든 객체를 release 시킨다.
        @method destroy
    **/
    destroy: function() {
        this.deactivate();
        for(var p in this._htWElement) {
            this._htWElement[p] = null;
        }
        delete this._htWElement;
        delete this._htMargin;
        delete this._sPosition;
        delete this._htPosition;
        delete this._htOldPosition;
        delete this._bUseFixedProperty;
    }
}).extend(jindo.m.UIComponent);
/**
    @fileOverview Scroll이 종료된 시점을 알려주는 컴포넌트
    @author sculove
    @version 1.7.1
    @since 2011. 12. 05.
    <1.0.0 이후 변경 사항>
    1. Android 3.x, 4.x 대응
     : 연속적인 scroll 이벤트 후 touchend는 발생하지 않음

    <1.1.0 이후 변경 사항>
     : 네이버앱에서 ios4이하 버전 스크롤 발생하지 않는 것 수정
       document이벤트에서 window로 변경
    <1.2.0 이후 변경 사항>
     : touchStart를 다중 발생할 경우, scrollEnd가 발생되지 않는 버그 수정
     : 마지막, 상단에서 스크롤시 scrollEnd 미발생 버그 수정
**/
/**
    Scroll이 종료된 시점을 알려주는 컴포넌트

    @class jindo.m.ScrollEnd
    @extends jindo.m.Component
    @keyword scrollend
    @group Component

    @history 1.3.0 Bug touchStart를 다중 발생할 경우, scrollEnd가 발생되지 않는 버그 수정
    @history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
    @history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
    @history 1.1.0 Release 최초 릴리즈
**/
jindo.m.ScrollEnd = jindo.$Class({
    /* @lends jindo.m.ScrollEnd.prototype */
    /**
        초기화 함수

        @constructor
    **/
    $init : function(el,htUserOption) {
        this._initVar();
        this._setWrapperElement(el);
        this._attachEvent();
    },

    /**
        변수 초기화
    **/
    _initVar : function() {

        this._nType = this._getDetectType();
        if(this._nType === 2){
             this._nScrollTimer = -1;
        }
        this._isTouched = false;
        this._isMoved = false;
        this._nObserver = null;
        this._nScrollEndTimer = null;
        this._nPreLeft = null;
        this._nPreTop = null;
        // this._isTop = false;
    },

    /**
        scrollend를 감지하는 방법 타입을 리턴한다.
        Type 0: iOS, 1: Android (2.x), 2: Android (3.x이상 ),win8
        @date 2012-11-06
        @author oyang2
        @return {String} type
     */
    _getDetectType : function(){
        var nRet = 0;

        if(jindo.m.getDeviceInfo().android){
            if(parseInt(jindo.m.getDeviceInfo().version,10) >= 3) {
                nRet = 2;
            } else {
                nRet = 1;
            }
        }else if(jindo.m.getDeviceInfo().win){
             if(parseInt(jindo.m.getDeviceInfo().version,10) >= 8) {
                 nRet = 2;
             }
        }

        return nRet;
    },

    /**
        객체 초기화
    **/
    _setWrapperElement : function(el) {
        this._htElement = {};
        this._htElement["body"] = document.body;
    },

    /**
        이벤트 활성화
    **/
    _attachEvent : function() {
        this._htEvent = {};
        this._htEvent["event_scroll"] = {
            ref : jindo.$Fn(this._onScroll, this).attach(window, "scroll"),
            el : window
        };

        if(this._nType == 1) {
            this._htEvent["event_touchstart"] = {
                ref : jindo.$Fn(this._onStartForAndroid, this).attach(this._htElement["body"], "touchstart"),
                el : this._htElement["body"]
            };
            this._htEvent["event_touchmove"] = {
                ref : jindo.$Fn(this._onMoveForAndroid, this).attach(this._htElement["body"], "touchmove"),
                el : this._htElement["body"]
            };
            this._htEvent["event_touchend"] = {
                ref : jindo.$Fn(this._onEndForAndroid, this).attach(this._htElement["body"], "touchend"),
                el : this._htElement["body"]
            };
        }
    },

    /**
        이벤트 비활성화
    **/
    _detachEvent : function() {
        for(var p in this._htEvent) {
            var ht = this._htEvent[p];
            ht.ref.detach(ht.el, p.substring(p.lastIndexOf("_")));
        }
    },

    /**
        이벤트 감시자 시작
    **/
    _startObserver : function() {
        var self = this;
        this._stopObserver();
        this._nObserver = setInterval(function() {
            self._observe();
        },100);
    },

    /**
        이벤트 감시
    **/
    _observe : function() {
        if(this._isTouched || (this._nPreTop !== window.pageYOffset || this._nPreLeft !== window.pageXOffset) ) {
            this._nPreTop = window.pageYOffset;
            this._nPreLeft = window.pageXOffset;
        } else {
            this._stopObserver();
            //console.log("옵저버끝 " + window.pageYOffset);
            this._fireEventScrollEnd();
        }
    },

    /**
        이벤트 감시자 중지
    **/
    _stopObserver : function() {
        clearInterval(this._nObserver);
        this._nObserver = null;
    },

    /**
        scroll 이벤트 핸들러
    **/
    _onScroll : function(we) {
        switch(this._nType) {
            case 0 : this._fireEventScrollEnd(); break;
            case 1 : this._startObserver(); break;
            case 2 : var self = this;
                  clearTimeout(this._nScrollTimer);
                  this._nScrollTimer = setTimeout(function() {
                      self._fireEventScrollEnd();
                  },350);
                  break;
        }
    },

    /**
        touchstart 이벤트 핸들러
    **/
    _onStartForAndroid : function(we) {
        // console.log("start");
        // this._stopObserver();
        this._isTouched = true;
        this._isMoved = false;

        this._nPreTop = null;
        this._nPreLeft = null;

        // if(window.pageYOffset === 0) {
        //  this._isTop = true;
        // } else {
        //  this._isTop = false;
        // }
    },

    /**
        touchstart 이벤트 핸들러
    **/
    _onMoveForAndroid : function(we) {
        // console.log("move");
        this._isMoved = true;
    },

    /**
        touchend 이벤트  핸들러
    **/
    _onEndForAndroid : function(we) {
        // console.log("end");
        this._isTouched = false;
        /*
         * android인 경우, 주소창이 보이면 scroll이벤트가 발생하지 않음.
         * 주소창이 보여서 스크롤이 발생하여도 window.pageYOffset 0이므로,
         * touchstart시점이 0 에서 시작할 경우, 움직임이 있고,
         * 200ms이후, window.pageYOffset 위치가 0일 경우, 스크롤 End를 호출한다.
         */

        //addConsole("[touchend] isTop : " + this._isTop + ", isMoved : " + this._isMoved);
        // if(this._isTop && this._isMoved) {
        if(this._isMoved) {
            this._startObserver();
        }
    },


    /**
        scrollEnd 사용자 이벤트 호출
    **/
    _fireEventScrollEnd : function() {
        // console.log("scroll end");
        this.fireEvent("scrollEnd", {
            nTop : window.pageYOffset,
            nLeft : window.pageXOffset
        });
    },

    _fireEventScrollEndForAndroid : function() {
        var self = this;
        clearTimeout(this._nScrollEndTimer);
        this._nScrollEndTimer = setTimeout(function() {
            self._fireEventScrollEnd();
        },500);
    },

    /**
        객체 초기화
        @method destroy
    **/
    destroy: function() {
        this._detachEvent();
        this._nType = -1;
        this._isTouched = null;
        this._isMoved = null;
        this._nObserver = null;
        this._nPreLeft = null;
        this._nPreTop = null;
    }
}).extend(jindo.m.Component);
/**
    @fileOverview 스크롤이 발생하더라도 화면의 특정위치에 레이어가 띄워져 있는 컴포넌트
    @author sculove
    @version 1.7.1
    @since 2011. 7. 19.
**/
/**
    스크롤이 발생하더라도 화면의 특정위치에 레이어가 띄워져 있는 컴포넌트

    @class jindo.m.FloatingLayer
    @extends jindo.m.UIComponent
    @uses jindo.m.LayerPosition
    @uses jindo.m.ScrollEnd
    @uses jindo.m.LayerEffect, jindo.m.SlideEffect, jindo.m.FadeEffect {0,}
    @keyword floating, layer, fixed, 플로팅, 레이어, 고정
    @group Component

    @history 1.6.0 Bug iOS에서 정상동작하지 않는 오류 수정
    @history 1.5.0 Support Window Phone8 지원
    @history 1.4.0 Support iOS 6 지원
    @history 1.4.0 Bug FloatingLayer의 Width/Height가 %로 지정된 경우에도 처리되도록 수정
    @history 1.3.5 Support 갤럭시 4.0.4 업데이트 지원
    @history 1.3.5 Bug hide호출 후, show되지 않는 버그 수정
    @history 1.3.0 Update [bUseHideUI] Option 추가<br />
                        [bUseFixed] Option 추가<br />
                        [nFadeOutDuration] 기본값 0에서 200으로 변경
    @history 1.3.0 Bug 갤럭시s2,s 안정화 작업 (다중 fade-in 발생시 발생안되도록 수정 (깜빡임방지))<br />
                        플로팅 레이어 사라진 이후, 사라진 영역에서 이벤트가 발생하지 않는 현상 수정
    @history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
    @history 1.2.0 Bug ios4이하 버전의 네이버앱에서 사라지는 문제 해결
    @history 1.2.0 Update position:fixed가 가능한 모바일 기기(iOS5, Android3.0~)에서는 Layer이동시, 사라지지 않고 항상 고정되어 플로팅되도록 UI 변경
    @history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
    @history 1.1.0 Bug iOS3에서 Layer선택 후 이동시 사라지는 문제 해결<br />
                        iOS3에서 이동 후 깜빡이는 문제 개선
    @history 1.1.0 Update 내부 하이라이팅 제거
    @history 1.1.0 Bug Android에서 시스템 스크롤 가속시 가속효과가 발생하지 않거나, 레이어가 보이면서 위치를 잡아가는 문제 해결
    @history 0.9.5 Bug Form엘리먼트 위로 FloatingLayer가 뜰 경우, form이 보이는 문제 해결<br />
                        주소창 보이거나 감춰질때, 포지션 오류 문제 해결
    @history 0.9.5 Update [nFadeInDuration] Option 기본값 수정 (200 → 0)<br />
                        [nFadeOutDuration] Option 기본값 수정 (200 → 0)<br />
                        [bAutoResize] Option 삭제<br />
    @history 0.9.0 Release 최초 릴리즈
**/
jindo.m.FloatingLayer = jindo.$Class({
   /* @lends jindo.m.FloatingLayer.prototype */
    /**
        초기화 함수

        @constructor
        @param {HTMLElement} el 대상 엘리먼트 (필수)
        @param {Object} [htOption] 초기화 옵션 객체
            @param {Boolean} [htOption.bActivateOnload=true]
            @param {String} [htOption.sPosition="bottom"] <auidoc:see content="jindo.m.FloatingLayer">FloatingLayer</auidoc:see>가 화면에 보여질때의 위치 옵셥. top일 경우, 상단 중앙에 위치하고 , center일 경우 화면 중앙, bottom일 경우 화면 하단 중앙에 위치한다.
            @param {String} [htOption.sDirection="up"] <auidoc:see content="jindo.m.FloatingLayer">FloatingLayer</auidoc:see> 컴포넌트가 화면에 보여질때의 slide되는 위치 옵셥. up,down, left, right가 있다.
            @param {Number} [htOption.nSlideDuration=500] <auidoc:see content="jindo.m.FloatingLayer">FloatingLayer</auidoc:see>가 화면에 완전히 보여지는 시간 (단위 ms)
            @param {String} [htOption.sSlideTimingFunction="ease-in-out"] Slide시 애니메이션 효과
            <ul>
            <li>ease : 속도가 급가속되다가 급감속되는 효과 (거의 끝에서 급감속됨)</li>
            <li>linear : 등속효과</li>
            <li>ease-in : 속도가 점점 빨라지는 가속 효과</li>
            <li>ease-out : 속도가 천천히 줄어드는 감속효과</li>
            <li>ease-in-out : 속도가 천천히 가속되다가 천천히 감속되는 효과 (가속과 감속이 부드럽게 전환됨)</li>
            </ul>
            @param {Number} [htOption.nFadeInDuration=0] <auidoc:see content="jindo.m.FloatingLayer">FloatingLayer</auidoc:see>가 스크롤될때 사라졌다 fadein되는 시간 (단위 ms)<br />bUseFixed 옵션이 true이고, position:fixed 속성이 사용가능한 기기에서는 옵션 사용 불가
            @param {String} [htOption.sFadeInTimingFunction="ease-in-out"] Fade in시 애니메이션 효과
            <ul>
            <li>ease : 속도가 급가속되다가 급감속되는 효과 (거의 끝에서 급감속됨)</li>
            <li>linear : 등속효과</li>
            <li>ease-in : 속도가 점점 빨라지는 가속 효과</li>
            <li>ease-out : 속도가 천천히 줄어드는 감속효과</li>
            <li>ease-in-out : 속도가 천천히 가속되다가 천천히 감속되는 효과 (가속과 감속이 부드럽게 전환됨)</li>
            </ul>
            bUseFixed 옵션이 true이고, position:fixed 속성이 사용가능한 기기에서는 옵션 사용 불가
            @param {Number} [htOption.nFadeOutDuration=200] <auidoc:see content="jindo.m.FloatingLayer">FloatingLayer</auidoc:see>가 hide될 때 fadeout되는 시간 (단위 ms)
            bUseFixed 옵션이 true이고, position:fixed 속성이 사용가능한 기기에서는 옵션 사용 불가
            @param {String} [htOption.sFadeOutTimingFunction="ease-in-out"] Fade out시 애니메이션 효과
            <ul>
            <li>ease : 속도가 급가속되다가 급감속되는 효과 (거의 끝에서 급감속됨)</li>
            <li>linear : 등속효과</li>
            <li>ease-in : 속도가 점점 빨라지는 가속 효과</li>
            <li>ease-out : 속도가 천천히 줄어드는 감속효과</li>
            <li>ease-in-out : 속도가 천천히 가속되다가 천천히 감속되는 효과 (가속과 감속이 부드럽게 전환됨)</li>
            </ul>
            bUseFixed 옵션이 true이고, position:fixed 속성이 사용가능한 기기에서는 옵션 사용 불가
            @param {Boolean} [htOption.bUseHideUI=true] FloatingLayer 스크롤시 사라지는 UI 사용 여부를 결정한다.<br />bUseFixed 옵션이 true이고, position:fixed 속성이 사용가능한 기기에서는 옵션 사용 불가
            @param {Boolean} [htOption.bUseFixed=false] position:fixed 속성이 사용 가능한 기기에서는 FloatingLayer 를 position:fixed로 구성한다.
            @param {String} [htOption.nTimeout=-1] <auidoc:see content="jindo.m.FloatingLayer">FloatingLayer</auidoc:see>가 nTimeout시간 이후 사라지는 시간 (단위 ms), -1로 설정될 경우, 자동 숨기는 기능은 제공하지 않는다
    **/
    $init : function(el,htUserOption) {
        this.option({
             bActivateOnload : true,
             sPosition : "bottom",
             sDirection : "up",
             nSlideDuration : 500,
             sSlideTimingFunction : "ease-in-out",
             nFadeInDuration : 0,
             sFadeInTimingFunction : "ease-in-out",
             nFadeOutDuration : 200,
             sFadeOutTimingFunction : "ease-in-out",
             bUseHideUI : true,
             bUseFixed : false,
             nTimeout : -1
        });
        this.option(htUserOption || {});
        this._initVar();
        this._setWrapperElement(el);
        if(this.option("bActivateOnload")) {
            this.activate();
        }
    },

    /**
        jindo.m.FloatingLayer 에서 사용하는 모든 인스턴스 변수를 초기화한다.
    **/
    _initVar: function() {
        this._oFloatingEffect = null;
        this._oFadeinEffect = null;
        this._oLayerPosition = null;
        this._oScrollEnd = null;
        this._nTimeoutTimer = -1;
        this._isFixed = false;
        this._isLayerOn = false;
        this._isMoving = false; // 이동 여부
    },

    /**
        jindo.m.FloatingLayer 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
    **/
    _setWrapperElement: function(el) {
        this._htWElement = {};
        this._htWElement["element"] = jindo.$Element(el);
        this._htWElement["viewElement"] = jindo.$Element(this._createView());
    },

    /**
        사용하는 컴포넌트를 초기화한다.
    **/
    _initComponent : function() {
        var self = this,
            el = this._htWElement["element"].$value();
        // Layer Position 지정
        this._oLayerPosition = new jindo.m.LayerPosition(this._htWElement["viewElement"], {
            sPosition : this.option("sPosition"),
            bActivateOnload : false,
            bUseFixed : this.option("bUseFixed"),
            bAutoReposition : true
        });
        // LayerEffect (Slide(show), FadeOut(hide) 지정)
        this._oFloatingEffect = new jindo.m.LayerEffect(el);
        if(this.option("bUseHideUI") && this.option("nFadeInDuration") !== 0) {
            this._oFadeinEffect = new jindo.m.LayerEffect(this._htWElement["viewElement"].$value(), {
                nDuration: this.option("nFadeInDuration")
            }).attach("afterEffect",function() {
                // self._htWElement["viewElement"].show();
                self._startHideTimer();
            });
        }
        // Fixed 지정
        this._isFixed = this._oLayerPosition.isUseFixed();
        // ScrollEnd 지정
        this._oScrollEnd = new jindo.m.ScrollEnd();
    },

    /**
        Layer 를 반환한다.
        @method getLayer
        @return {HTMLElement}
    **/
    getLayer : function() {
        return this._htWElement["element"].$value();
    },

    /**
        el의 width와 height가 동일한 div을 만듦
        @return {jindo.$Element} welView
    **/
    _createView : function () {
        var bVisible = this._htWElement["element"].visible(),
            welView = jindo.$Element("<div class='_floatingLayer_view_divtag_' style='display:none;'>"),
            sWidth = "", sHeight = "";
        // el의 width와 height 얻기
        if (!bVisible) {
            this._htWElement["element"].css({
                left : "-9999px"
            }).show();
        }
        sWidth = this._htWElement["element"].css("width").indexOf("%") != -1 ? this._htWElement["element"].css("width") : this._htWElement["element"].width() + "px";
        sHeight = this._htWElement["element"].css("height").indexOf("%") != -1 ? this._htWElement["element"].css("height") : this._htWElement["element"].height() + "px";
        welView.css({
            width : sWidth,
            height : sHeight,
            zIndex : 1000
        });
        if (!bVisible) {
            this._htWElement["element"].hide();
        }
        return welView;
    },

    /**
        View의 크기를 갱신한다.

        @method resize
        @history 0.9.5 Update Method 추가

    **/
    resize : function(nWidth, nHeight) {
        this._htWElement["viewElement"].css({
            width : nWidth + "px",
            height : nHeight + "px"
        });
        this._oLayerPosition.setPosition();
    },

    /**
        FloatingLayer를 보임
        @method show
    **/
    show : function() {
        /**
            레이어가 보여기지 전에 발생

            @event beforeShow
            @param {String} sType 커스텀 이벤트명
            @param {jindo.$Element} welLayer Layer
            @param {Function} stop show를 중지한다. beforeShow이후 커스텀 이벤트(show)가 발생하지 않는다.
        **/
        if (this._fireEvent("beforeShow")) {
            // 1. LayerPosition activate
            if(!this._oLayerPosition.isActivating()) {
                this._oLayerPosition.activate();
            }
            // 2. FloatingEffect 이벤트 show로 설정
            this._setFloatingEffect(true);
            // 3. Slide
            this._htWElement["element"].show();
            this._htWElement["viewElement"].show();
            this._oFloatingEffect.slide({
                sDirection: this.option("sDirection"),
                nDuration: this.option("nSlideDuration"),
                sTransitionTimingFunction : this.option("sSlideTimingFunction"),
                elBaseLayer: this._htWElement["viewElement"].$value()
            });
        }
    },

    /**
        FloatingLayer를 숨김
        @method hide
    **/
    hide : function() {
        /**
            레이어가 사라지기 전에 발생

            @event beforeHide
            @param {String} sType 커스텀 이벤트명
            @param {jindo.$Element} welLayer Layer
            @param {Function} stop Hide를 중지한다. beforeHide이후 커스텀 이벤트(hide)가 발생하지 않는다.
        **/
        if (this._fireEvent("beforeHide")) {
            // 0. hide Timer 제거
            this._stopHideTimer();
            // 1. LayerPosition deactivate
            if(this._oLayerPosition.isActivating()) {
                this._oLayerPosition.deactivate();
            }
            // 2. Floating관련 이벤트 detach
            this._detachFloatingEvent();
            // 3. FloatingEffect 이벤트 hide로 설정
            this._setFloatingEffect(false);
            // 4. Fade out
            if(this.option("nFadeOutDuration") !== 0) {
                this._oFloatingEffect.fade({
                    sDirection: "out",
                    nDuration: this.option("nFadeOutDuration"),
                    sTransitionTimingFunction : this.option("sFadeOutTimingFunction")
                });
            } else {
                this._htWElement["viewElement"].hide();
                this._fireEvent("hide");
            }
        }
    },

    /**
        사용자 이벤트 호출
    **/
    _fireEvent : function(sType) {
        return this.fireEvent(sType, {
            welLayer : this._htWElement["element"]
        });
    },

    /**
        nTimeout속성이 -1보다 클경우 타이머 지정
        타이머 이후 사라짐.
    **/
    _startHideTimer : function() {
        if (this.option("nTimeout") > -1) {
            var self = this;
            this._stopHideTimer();
            this._nTimeoutTimer = setTimeout(function(){
                self.hide();
            }, this.option("nTimeout"));
        }
    },

    /**
        nTimeout의 타이머 중지
    **/
    _stopHideTimer : function() {
        clearTimeout(this._nTimeoutTimer);
        this._nTimeoutTimer = -1;
    },

    /**
        touch가 시작될 경우 (ios,안드로이드 일 경우 touchstart)
        @param {jindo.$Event} we
    **/
    _onTouchStart : function(we) {
        this._initFloatingData();
        if (this._isLayer(we.element)) {
            this._isLayerOn = true;
            this._htWElement["viewElement"].show();
        } else {
            // 상위 레이어에서 부터 시작안함
            this._htWElement["viewElement"].hide();
            /* 갤럭시 S3인 경우 hide된 후 reflow가 발생하지 않으면 스크롤바가 사라지지 않는다. */
            this._htWElement["viewElement"].css("left", this._htWElement["viewElement"].css("left") + "px");
        }
    },

    /**
        scrollEnd일 경우 처리
        ios는 touchEnd 시점이  scrollEnd
        @param {jindo.$Event} we
    **/
    _onScrollEnd : function(we) {
        if(this.option("bUseHideUI")) {
            if(this._isFixed) {
                this._startHideTimer();
            } else {
                this._runFadeIn();
            }
        } else {
            this._oLayerPosition.setPosition();
            this._startHideTimer();
        }
    },

    /**
        touchmove시
        @param {jindo.$Event} we
    **/
    _onTouchMove : function(we) {
        // this._clearFixedBug();
        this._isMoving = true;
    },

    /**
        포지션 변경없이 터치가 될경우
        @param {jindo.$Event} we
    **/
    _onTouchEnd : function(we) {
        if(this._isLayerOn) {
            this._oLayerPosition.setPosition();
            return;
        } else if (!this._isMoving) {
            this._runFadeIn();
        }
    },

    /**
        fadein 실행하는 함수
    **/
    _runFadeIn : function() {
        if(!this._htWElement["viewElement"].visible()) {
            if (this._isLayerOn) {
                this._startHideTimer();
            } else {
                this._fadeIn();
            }
        }
    },

    /**
        포지션 지정 완료 후 fade-in
    **/
    _fadeIn : function() {
        this._oLayerPosition.setPosition();
        if(this._oFadeinEffect) {
            // 중복 fade-in 문제 제거 (fade-in 하기전에 모든 큐 내용 제거)
            this._oFadeinEffect.clearEffect(true);
            this._oFadeinEffect.fade({
                sDirection: "in",
                sTransitionTimingFunction : this.option("sFadeInTimingFunction")
            });
        } else {
            this._htWElement["viewElement"].show();
            this._startHideTimer();
        }
    },

    /**
        Layer인지 아닌지 확인 (Layer는 하위 자식도 포함)
        @param {Object} el
    **/
    _isLayer : function(el) {
        if(el && (this._htWElement["element"].isEqual(el) || this._htWElement["viewElement"].isEqual(el) || this._htWElement["viewElement"].isParentOf(el)) ) {
            return true;
        } else {
            return false;
        }
    },

    /**
        Floating 제어 처음일 경우
    **/
    _initFloatingData : function() {
        // Timer 모두 중지
        this._stopHideTimer();

        // Effect 중지
        if(this._oFloatingEffect && this.option("nFadeOutDuration") !== 0) {
            this._oFloatingEffect.clearEffect(true);
        }
        if(this._oFadeinEffect){
            this._oFadeinEffect.clearEffect(true);
        }
        // 속성값 중지
        this._isMoving = false;
        this._isLayerOn = false;
    },

    /**
        jindo.m.FloatingLayer 컴포넌트를 활성화한다.
        activate 실행시 호출됨
    **/
    _onActivate : function() {
        this._initComponent();
    },

    /**
        jindo.m.FloatingLayer 컴포넌트를 비활성화한다.
        deactivate 실행시 호출됨
    **/
    _onDeactivate : function() {
        this._detachEvent();
        if(this._oFadeinEffect) {
            this._oFadeinEffect.detachAll("afterEffect");
            this._oFadeinEffect.destroy();
        }
        this._oFloatingEffect.destroy();
        this._oScrollEnd.destroy();
        this._oLayerPosition.destroy();
        this._htWElement["element"].appendTo(document.body);
        this._htWElement["viewElement"].leave();
    },

    /**
        Floating관련 이벤트를 바인드한다.
    **/
    _attachFloatingEvent : function() {
        this._htEvent = {};
        if(this.option("bUseHideUI") && !this._isFixed) {
            var htEventName = jindo.m._getTouchEventName();
            this._htEvent[htEventName.start] = {
                el : document.body,
                fn : jindo.$Fn(this._onTouchStart, this).bind()
                //ref : jindo.$Fn(this._onTouchStart, this).attach(document.body, "touchstart")
            };
            this._htEvent[htEventName.move] = {
                el : document.body,
                fn : jindo.$Fn(this._onTouchMove, this).bind()
                //ref : jindo.$Fn(this._onTouchMove, this).attach(document.body, "touchmove")
            };
            this._htEvent[htEventName.end] = {
                el : document.body,
                fn: jindo.$Fn(this._onTouchEnd, this).bind()
                //ref : jindo.$Fn(this._onTouchEnd, this).attach(document.body, "touchend")
            };
            if(htEventName.cancel){
                this._htEvent[htEventName.cancel] = {
                    el : document.body,
                    fn :  jindo.$Fn(this._onTouchEnd, this).bind()
                    //ref : jindo.$Fn(this._onTouchEnd, this).attach(document.body, "touchcancel")
                };
            }

            //attach events
            for(var p in this._htEvent){
                if(this._htEvent[p].fn){
                    this._htEvent[p].ref  = jindo.m._attachFakeJindo(this._htEvent[p].el, this._htEvent[p].fn, p);
                }
            }
        }
        this._oScrollEnd.attach("scrollEnd", jindo.$Fn(this._onScrollEnd,this).bind());
    },

    /**
        jindo.m.FloatingLayer 에서 사용하는 모든 이벤트를 해제한다.
    **/
    _detachEvent : function() {
        this._detachFloatingEvent();
    },

    /**
        FloatingEffect 처리 후 타입 show,hide 지정
        @param {Boolean} type
    **/
    _setFloatingEffect : function(isShow) {
        var self=this;
        this._oFloatingEffect.detachAll("afterEffect");
        this._oFloatingEffect.clearEffect(true);
        if(this._oFadeinEffect){
            this._oFadeinEffect.clearEffect(true);
        }
        if(isShow) {
            // show할때 이벤트 등록
            this._oFloatingEffect.attach("afterEffect", function(){
                // Floating관련 이벤트 attach
                self._attachFloatingEvent();
                self._startHideTimer();
                /**
                    레이어가 보여진 후에 발생

                    @event show
                    @param {String} sType 커스텀 이벤트명
                    @param {jindo.$Element} welLayer Layer
                    @param {Function} stop stop를 호출하여 영향 받는 것이 없음
                **/
                self._fireEvent("show");
            });
        } else {
            if(this.option("nFadeOutDuration") !== 0) {
                this._oFloatingEffect.attach("afterEffect", function() {
                    self._htWElement["viewElement"].hide();
                    /**
                        레이어가 사라진 후에 발생

                        @event hide
                        @param {String} sType 커스텀 이벤트명
                        @param {jindo.$Element} welLayer Layer
                        @param {Function} stop stop를 호출하여 영향 받는 것이 없음
                    **/
                    self._fireEvent("hide");
                });
            }
        }
    },

    /**
        Floating관련 이벤트를 해제한다.
    **/
    _detachFloatingEvent : function() {
        for(var p in this._htEvent) {
            var ht = this._htEvent[p];
            if (ht.ref) {
                ht.ref.detach(ht.el, p);
            }
        }
        this._oScrollEnd.detachAll("scrollEnd");
        this._htEvent = null;
    },

    /**
        jindo.m.FloatingLayer 에서 사용하는 모든 객체를 release 시킨다.
        @method destroy
    **/
    destroy: function() {
        this.deactivate();
        for(var p in this._htWElement) {
            this._htWElement[p] = null;
        }
        delete this._htWElement;
        this._initFloatingData();
    }
}).extend(jindo.m.UIComponent);/**
    @fileOverview 페이지의 고정영역 내부를 터치하여 스크롤링 할 수 있는 컴포넌트
    @author sculove
    @version 1.7.1
    @since 2011. 8. 18.
*/
/**
    페이지의 고정영역 내부를 터치하여 스크롤링 할 수 있는 컴포넌트

    @class jindo.m.Scroll
    @extends jindo.m.UIComponent
    @uses jindo.m.Touch
    @uses jindo.m.DynamicPlugin{,1}
    @uses jindo.m.PullPlugin{,1}
    @keyword scroll, 스크롤
    @group Component
    @update

    @history 1.7.0 Bug bUseHighlight=fasle일 경우, 안드로이드 4.x 갤럭시 시리즈에서 하이라이트 사라지지 않는 문제 제거 
    @history 1.7.0 Update base엘리먼트에 z-index = 2000으로 설정 (Css3d사용시 충돌하는 버그 수정)
    @history 1.7.0 Update 불필요 노출 메소드 deprecated<br/>
    getPosLeft, getPostTop, getStyleOffset, makeStylePos, restorPos, setLayer, setScroller
    @history 1.6.0 스크롤 컴포넌트 플러그인 구조로 구조개선
    @history 1.5.0 Bug jindo 1.5.3 이하 버전에서 대용량 스크롤시 스크롤바가 보이지 않는 문제 수정
    @history 1.5.0 Support Window Phone8 지원
    @history 1.5.0 Update  touchStart, touchMove , touchEnd 이벤트에서 중지할 경우 뒤 이벤트 안타도록 수정
    @history 1.4.0 Support iOS 6 지원
    @history 1.4.0 Update {bUseBounce} bUseBounce : false일 경우, 스크롤을 더이상 할수 없을 때 시스템 스크롤이 발생하는 기능 추가
    @history 1.4.0 Bug 가로 스크롤일경우, 터치 위치의 y가 30보다 작을경우 스크롤이 안되는 버그 수정
    @history 1.3.5 Bug 스크롤바 이동시, bUseTranslate, bUseTimingFunction 옵션 적용되도록 수정
    @history 1.3.5 Update 스크롤바 fade in-out 효과 제거<br />스크롤바 border-radius, opacity 효과 제거
    @history 1.3.0 Support Android 젤리빈(4.1) 대응
    @history 1.3.0 Support 갤럭시 4.0.4 업데이트 지원
    @history 1.3.0 Update Wrapper의 position이 static 일 경우, relative로 변경<br/>그외는 position이 변경되지 않도록 수정
    @history 1.3.0 Update Wrapper와 scroller가 동일하고 bUseBounce가 true인 경우, 스크롤바가 안보이고, 스크롤이 가능하도록 변경
    @history 1.3.0 Bug Scroll과 Flicking 함께 사용할때 A link가 클릭안되는 문제 수정
    @history 1.2.0 Update pullDown/pullUp 상태가 아닌 경우, pullDown/pullUp 엘리먼트를 hide시키는 UI 변경
    @history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
    @history 1.1.0 Bug destroy() 호출시 Scroll객체 destroy 호출 안되는 문제 해결<br />
                    중복 scroll 사용시, scroll이 정상 동작하지 않는 문제 해결<br />
                    뒤로가기시 스크롤의 속성값이 초기화 되지않는 문제 해결
    @history 1.1.0 Support jindo 2.0.0 mobile 버전 지원
    @history 1.1.0 Support Android 3.0/4.0 지원
    @history 1.1.0 Update 따로 클래스명을 정의하지 않아도 wrapper내의 첫번째 엘리먼트를 무조건 Scroller 엘리먼트로 처리하도록 수정
    @history 1.1.0 Update document 선택시 wrapper이 visible이 true일 경우에만 작동하도록 수정
    @history 1.1.0 Update 스크롤 여부에 따른 마크업 지정 편의 개선 (가로스크롤은 scroller의 높이값 100% 설정, 세로스크롤 경우 scroller의 넓이값 100% 설정)
    @history 0.9.5 Bug iOS에서 클릭영역 누른 상태에서, 이동후 버튼을 놓았을시, 초기에 선택한 위치에 clickable 엘리먼트가 존재할 경우, click 되는 문제 해결
    @history 0.9.5 Update [bUseBounce] false인 경우, 이동,가속시 외부영역으로 이동되지 않도록 수정
    
    @history 0.9.0 Release 최초 릴리즈
**/
jindo.m.Scroll = jindo.$Class({
    /* @lends jindo.m.Scroll.prototype */
       /**
        초기화 함수

        @constructor
        @param {String|HTMLElement} el CoreScroll할 Element (필수)
        @param {Object} [htOption] 초기화 옵션 객체
            @param {Number} [htOption.nHeight=0] Wrapper의 height값. 값이 0일 경우 wrapper의 height로 설정됨
            @param {Number} [htOption.nWidth=0] Wrapper의 width값. 값이 0일 경우 wrapper의 width로 설정됨
            @param {Boolean} [htOption.bActivateOnload=true] 컴포넌트 로드시 activate 여부
            @param {Boolean} [htOption.bUseHScroll=false] 수평 스크롤 사용 여부. 스크롤영역의 width가 wrapper의 width보다 클 경우 적용 가능함.
            @param {Boolean} [htOption.bUseVScroll=true] 수직 스크롤 사용 여부. 스크롤영역의 height가 wrapper의 height보다 클 경우 적용 가능함.
            @param {Boolean} [htOption.bUseMomentum=true] 스크롤시 가속도 사용여부
            @param {Number} [htOption.nDeceleration=0.0006] 가속도의 감속계수. 이 값이 클수록, 가속도는 감소한다
            @param {Boolean} [htOption.bUseBounce=true] 가속 이동후, 바운스 처리되는 여부
            @param {Boolean} [htOption.bUseHighlight=true] 하이라이트 사용 여부
            @param {String} [htOption.sClassPrefix='scroll_'] CoreScroll 내부 엘리먼트 구분 클래스 prefix
            @param {Boolean} [htOption.bAutoResize=false] 기기 회전시, 크기 자동 재갱신
            @param {Boolean} [htOption.bUseCss3d=jindo.m._isUseCss3d()] 하드웨어 3d 가속 여부<br />
                모바일 단말기별로 다르게 설정된다. 상세내역은 <auidoc:see content="jindo.m">[jindo.m]</auidoc:see>을 참조하기 바란다.
            @param {Boolean} [htOption.bUseTimingFunction=jindo.m._isUseTimingFunction()] 스크롤 애니메이션 동작방식을 결정한다.<br />
                bUseTimingFunction가 true일 경우, CSS3로 애니메이션을 구현하고, false일 경우, 스크립트로 애니메이션을 구현한다.<br />
                모바일 단말기별로 다르게 설정된다. 상세내역은 <auidoc:see content="jindo.m">[jindo.m]</auidoc:see>을 참조하기 바란다.<br />
            @param {Boolean} [htOption.bUseTranslate=true] 컨텐츠의 좌표이동 방법을 결정한다.<br />
                bUseTranslate가 true일 경우, CSS3의 Translate으로 이동하고, false일 경우, style의 left,top으로 이동한다.
            @param {Boolean} [htOption.bUseScrollbar=true] 스크롤바 사용 여부
            @param {Boolean} [htOption.bUseFixedScrollbar=false] 고정 스크롤바 적용 여부
            @param {String} [htOption.sScrollbarBorder="1px solid white"] 스크롤바 보더 스타일을 지정
            @param {String} [htOption.sScrollbarColor="#8e8e8e"] 스크롤바의 색상을 지정
            @param {Number} [htOption.nScrollbarHideThreshold=0] 스크롤 바를 hide 시킬때 딜레이 타임
            @param {Boolean} [htOption.bUseScrollBarRadius=true] 스크롤 바의 radius 설정 여부

            @param {String} [htOption.bUsePullDown=false] pull down update 기능 사용 여부
            @param {Boolean} [htOption.bUsePullUp=false] pull up update 기능 사용 여부
            @param {Number} [htOption.fnPullDownIdle=null] bUsePullDown 가 true일 시, pullDown 미발생 시 엘리먼트를 구성하는 함수.<br />
                첫번째 파라미터로 pullDown의 jindo.$Element가 넘어져 온다.
            @param {Number} [htOption.fnPullDownBeforeUpdate=null] bUsePullDown 가 true일 시, pullDown 발생 전 엘리먼트를 구성하는 함수.<br />
                첫번째 파라미터로 pullDown의 jindo.$Element가 넘어져 온다.
            @param {Number} [htOption.fnPullDownUpdating=null] bUsePullDown 가 true일 시, pullDown 발생 시 엘리먼트를 구성하는 함수.<br />
                첫번째 파라미터로 pullDown의 jindo.$Element가 넘어져 온다.
            @param {Number} [htOption.fnPullUpIdle=null] bUsePullUp이 true일 시, pullUp 미발생 시 엘리먼트를 구성하는 함수.<br />
                첫번째 파라미터로 pullUp의 jindo.$Element가 넘어져 온다.
            @param {Number} [htOption.fnPullUpBeforeUpdate=null] bUsePullUp이 true일 시, pullUp 발생 전 엘리먼트를 구성하는 함수.<br />
                첫번째 파라미터로 pullUp의 jindo.$Element가 넘어져 온다.
            @param {Number} [htOption.fnPullUpUpdating=null] bUsePullUp이 true일 시, pullUp 발생 시 엘리먼트를 구성하는 함수.<br />
                첫번째 파라미터로 pullUp의 jindo.$Element가 넘어져 온다.

            @param {String} [htOption.sListElement=''] sListElement는 리스트의 구성요소가 되는 엘리먼트 명이다.<br />
                sListElement 옵션값을 지정한 상태에서 스크롤이 일어날 경우, 이동 경로 방향으로 고정 범위의 scroller 영역만을 동적으로 유지한다.<br />
                여기서 ‘고정범위’는 ‘화면에 보이는 View영역의 높이 X nRatio’ 옵션 값이다.<br />
                이 옵션이 적용될 경우, bUseCss3d와 bUseTimingFunction은 false값을 가진다.<br />
            @param {Number} [htOption.nRatio=1.5] sListElement가 설정되었을때, 유지하는 고정범위 비이다.
            @param {Boolean} [htOption.bUseDiagonalTouch=true] 대각선스크롤 방향의 터치도 플리킹으로 사용할지 여부
        @history 1.6.0 Update [bUseDiagonalTouch] Option 추가
        @history 1.5.0 Update [bUseScrollBarRadius] Option 추가
        @history 1.5.0 Update [nScrollbarHideThreshold] Option 추가
        @history 1.3.5 Update [sScrollbarBorder] Option 기본값 수정 ("1px solid rgba(255,255,255,0.9)" → "1px solid white")
        @history 1.3.5 Update [sScrollbarColor] Option 기본값 수정 ("rgba(0,0,0,0.5)" → "#8e8e8e")
        @history 1.3.0 Update [sListElement] Option 추가
        @history 1.3.0 Update [nRatio] Option 추가
        @history 1.3.0 Update [bUseTimingFunction] Option 추가
        @history 1.3.0 Update [bUseTranslate] Option 추가
        @history 1.3.0 Update [sScrollbarBorder] Option 추가
        @history 1.3.0 Update [sScrollbarColor] Option 추가
        @history 1.3.0 Update [bUseCss3d] Option 기본값 변경. 모바일 단말기에 맞게 3d 사용여부를 설정함
        @history 1.3.0 Update [bUseMomentum] Option 기본값 변경. iOS는 true, Android는 false → 모두 true
        @history 1.2.0 Update [nOffsetTop] Option 추가
        @history 1.2.0 Update [nOffsetBottom] Option 추가
        @history 1.2.0 Update [bUseTransition → bUseCss3d] Option Name 수정
        @history 1.1.0 Update [bUseTransition] Option 기본값 수정<br>iOS, 갤럭시 S2 : true, 그외 : false
        @history 1.1.0 Update [bUseHighlight] Option 추가
        @history 0.9.5 Update [bUseFixedScrollbar] Option 추가
        @history 0.9.5 Update [sClassPrefix] Option 추가
        @history 0.9.5 Update [bUseTransition] Option 추가
        @history 0.9.5 Update [sPrefix → sClassPrefix] Option명 수정
        @history 0.9.5 Update [bUseFocus] Option명 삭제
        @history 0.9.5 Update [sPullDownId] Option명 삭제
        @history 0.9.5 Update [sPullUpId] Option명 삭제

    **/
    $init : function(el,htUserOption) {
        this.option({
            bActivateOnload : true,
            bUseHScroll : false,
            bUseVScroll : true,
            bUseMomentum : true,
            nDeceleration : 0.0006,
            nOffsetTop : 0,
            nOffsetBottom : 0,
            nHeight : 0,
            nWidth : 0,
            bUseBounce : true,
            bUseHighlight : true,
            sClassPrefix : 'scroll_',
            bUseCss3d : jindo.m._isUseCss3d(),
            bUseTimingFunction : jindo.m._isUseTimingFunction(),
            bUseTranslate : true,
            bAutoResize : false,
            bUseDiagonalTouch : true,
            
            /* 대용량 옵션 */
            sListElement : '',
            nRatio : 1.5,

            /* 스크롤바 옵션 */
            bUseScrollbar : true,
            nScrollbarHideThreshold : 0,
            bUseFixedScrollbar : false,
            sScrollbarBorder : "1px solid white",
            sScrollbarColor : "#8e8e8e",
            bUseScrollBarRadius : true,

            /* PullDown/PullUp 옵션 */
            bUsePullDown : false,
            bUsePullUp : false,
            fnPullDownIdle : null,
            fnPullDownBeforeUpdate : null,
            fnPullDownUpdating : null,
            fnPullUpIdle : null,
            fnPullUpBeforeUpdate : null,
            fnPullUpUpdating : null
        });
        this.option(htUserOption || {});
        this._initVar();
        this._setWrapperElement(el);
        if(this.option("bActivateOnload")) {
            this.activate();
        }
        // console.log("bUseHighlight : " + this.option("bUseHighlight") + ", bUseCss3d:" + this.option("bUseCss3d") + ", bUseTimingFunction : " + this.option("bUseTimingFunction") + ", bUseTranslate : " + this.option("bUseTranslate"));
    },

    /**
        jindo.m.Scroll 에서 사용하는 모든 인스턴스 변수를 초기화한다.
    **/
    _initVar: function() {
        var htDeviceInfo = jindo.m.getDeviceInfo();
        this.isPositionBug = htDeviceInfo.android && !htDeviceInfo.bChrome;
        this.isIos = htDeviceInfo.ipad || htDeviceInfo.iphone;
        this.isClickBug = jindo.m.hasClickBug();
        this.nVersion = parseFloat(htDeviceInfo.version.substr(0,3));
        this.sCssPrefix = jindo.m.getCssPrefix();
        this.sTranOpen = null;
        this.sTranEnd = null;
        this.nWrapperW = null;
        this.nWrapperH = null;
        this.nScrollW = null;
        this.nScrollH = null;
        this.nMaxScrollLeft = null;
        this.nMaxScrollTop = null;
        this.nMinScrollTop = 0;
        this.bUseHScroll = null;
        this.bUseVScroll = null;
        this.bUseHighlight = this.option("bUseHighlight");
        this._nPropHScroll = null;
        this._nPropVScroll = null;

        this._nLeft = 0;
        this._nTop = 0;
        this._aAni = [];

        this._htTimer = {
            "ani" : -1,
            "fixed" : -1,
            "touch" : -1,
            "scrollbar" : -1
        };
        this._htPlugin = {
            "dynamic" : {},
            "pull" : {}
        };

        this._oTouch = null;
        this._isAnimating = false;      // 순수 animate 처리
        this._isControling = false;     // 사용자가 움직이고 있는가?
        this._isStop = false;

        
        // DynamicScroll을 사용한다고 할경우, bUseCss3d는 항상 false
        if(this.option("sListElement")) {
            this.option("bUseCss3d", false);
        }
        this._setTrans();

        /**
         *  하이라이트 기능을 사용할 경우에만 적용됨.
         *  android 경우, css,offset, translate에 의해 이동된 영역의 하이라이트 및 영역이 갱신되지 않는 문제
         * translate의 위치를 초기화하고 css, offset에 맞게 위치를 변경해준다. 또한 대상 영역하위의 a tag에 focus를 준다.
         */
        if(this.bUseHighlight) {
            if(this.isPositionBug) {
                this._elDummyTag = null;    //for focus
            }
            /**
             *  iOS를 위한 anchor 처리
             * ios일 경우, touchstart시 선택된 영역에 anchor가 있을 경우, touchend 시점에 touchstart영역에 click이 타는 문제
             * 모든 a link에 bind된, onclick 이벤트를 제거한다.
             */
            if(this.isClickBug) {
                this._aAnchor = null;
                this._fnDummyFnc = function(){return false;};
                this._bBlocked = false;
            }
        }
    },

    /**
        3d Trans 또는 Trans를 기기별로 적용
    **/
    _setTrans : function() {
        if(this.option("bUseCss3d")) {
            this.sTranOpen = "3d(";
            this.sTranEnd = ",0)";
        } else {
            this.sTranOpen = "(";
            this.sTranEnd = ")";
        }
    },

    /**
        현재 포지션을 반환함.

        @method getCurrentPos
        @return {Object} nTop, nLeft의 값을 반환한다.
        @history 1.1.0 Update Method 추가
    **/
    getCurrentPos : function() {
        return {
            nTop : this._nTop,
            nLeft : this._nLeft
        };
    },

    /**
        wrapper 엘리먼트와 scroller 엘리먼트를 설정한다.
        @deprecated 
        @method setLayer
        @param {Varient} el 엘리먼트를 가리키는 문자열이나, HTML엘리먼트
    **/
    setLayer : function(el) {
        this._htWElement["wrapper"] = jindo.$Element(el);
        // zIndex 2000 값 추가
        this._htWElement["wrapper"].css({
            "overflow" : "hidden",
            "zIndex" : 2000
        });
        if(this._htWElement["wrapper"].css("position") == "static") {
            this._htWElement["wrapper"].css("position", "relative");
        }
        if(!this.bUseHighlight) {
            // this._htWElement["wrapper"].css("-" + this.sCssPrefix + "-tap-highlight-color","rgba(0,0,0,0)");
            this._htWElement["wrapper"].css("-" + this.sCssPrefix + "-tap-highlight-color","transparent");
        }

        this.setScroller();
    },

    /**
        스크롤러관련 엘리먼트를 설정함
        @deprecated 
        @method setScroller
    **/
    setScroller : function() {
        this._htWElement["scroller"] = this._htWElement["wrapper"].first();

        /**
         * Transform : translate이 초기에 적용될 경우,
         * ios계열에서 깜빡거리거나, 이벤트 행이 걸리는 문제가 발생함
         * hide시킨후, 적용을 하면 이러한 현상이 완화됨.
         *
         * 따라서, hide -> Transfom : translate 적용 -> show
         */
        this._htWElement["scroller"].css({
                "position" : "absolute",
                "zIndex" : 1,
                "left" : 0,
                "top" : 0
        });
        if(this.option("bUseTranslate") || this.option("bUseCss3d")) {
            this._htWElement["scroller"].css("-" + this.sCssPrefix + "-transition-property", "-" + this.sCssPrefix + "-transform")
                .css("-" + this.sCssPrefix + "-transform", "translate" + this.sTranOpen + "0,0" + this.sTranEnd);
        }
        if(this.option("bUseTimingFunction")) {
            this._htWElement["scroller"].css("-" + this.sCssPrefix + "-transition-timing-function", "cubic-bezier(0.33,0.66,0.66,1)");
        }
        // 안드로이드 버그 수정 (android 2.x 이하 버젼)
        if(this.isPositionBug && this.bUseHighlight && this.nVersion < 3) {
            this._elDummyTag = this._htWElement["scroller"].query("._scroller_dummy_atag_");
            if(!this._elDummyTag) {
                this._elDummyTag = jindo.$("<a href='javascript:void(0);' style='position:absolute;height:0px;width:0px;' class='_scroller_dummy_atag_'></a>");
                this._htWElement["scroller"].append(this._elDummyTag);
            } else{
                this._elDummyTag = this._elDummyTag.$value();
            }
        }
    },

    /**
        width값을 설정하거나, 반환한다.

        @method width
        @param {Number} nValue
    **/
    width : function(nValue) {
        if(nValue) {
            this.option("nWidth", nValue);
            this.refresh();
        } else {
            if(this.option("nWidth")) {
                return parseInt(this.option("nWidth"),10);
            } else {
                return this._htWElement["wrapper"].width();
            }
        }
    },

    /**
        height값을 설정하거나, 반환한다.

        @method height
        @param {Number} nValue
    **/
    height : function(nValue) {
        if(nValue) {
            this.option("nHeight", nValue);
            this.refresh();
        } else {
            if(this.option("nHeight")) {
                return parseInt(this.option("nHeight"),10);
            } else {
                return this._htWElement["wrapper"].height();
            }
        }
    },

    /**
        jindo.m.Scroll 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
        @param {Varient} el 엘리먼트를 가리키는 문자열이나, HTML엘리먼트
    **/
    _setWrapperElement: function(el) {
        this._htWElement = {};
        this.setLayer(el);
    },

    /**
        수평 스크롤 여부를 반환한다.
        @method hasHScroll
        @return {Boolean} 스크롤가능 여부를 반환한다.
        @history 1.2.0 Update Method 추가
    **/
    hasHScroll : function() {
        return this.bUseHScroll;
    },

    /**
        수직 스크롤 여부를 반환한다.

        @method hasVScroll
        @return {Boolean} 스크롤가능 여부를 반환한다.
        @history 1.2.0 Update Method 추가
    **/
    hasVScroll : function() {
        return this.bUseVScroll;
    },


    /**
        jindo.m.DynamicPlugin 생성 / refresh
        @param  {String} sDirection V(수직), H(수평)
    **/
    _createDynamicPlugin : function(sDirection) {
        var ht = {
            nRatio : this.option("nRatio"),
            sListElement : this.option("sListElement"),
            sDirection : sDirection
        };
        if(this._inst("dynamic")) {
            this._inst("dynamic").option(ht);
        } else {
            this._htPlugin["dynamic"].o = new jindo.m.DynamicPlugin(this._htWElement["wrapper"], ht);
        }
        this._inst("dynamic").refresh(sDirection == "V" ? this._nTop : this._nLeft);
        this.option("bUseTimingFunction", false);
        this._htPlugin["dynamic"].bUse = true;
    },

    /**
     * 범위(nRation * 2) 보다 scroller가 작을 경우는 적용되지 않는다.
     */
    _refreshDynamicPlugin : function() {
        this._htPlugin["dynamic"].bUse = false;
        if(this.option("sListElement") && !(this.bUseVScroll && this.bUseHScroll) ) {
            var nRange = this.option("nRatio") * 2;
            if( this.bUseVScroll && (this.nScrollH > (this.nWrapperH * nRange)) ) {
                this._createDynamicPlugin("V");
            } else if( this.bUseHScroll && (this.nScrollW > (this.nWrapperW * nRange)) ) {
                this._createDynamicPlugin("H");
            }
        }
    },

    /**
     * Pulldown/up 기능 제
     */
    _refreshPullPlugin : function(){
    	this._htPlugin["pull"].bUse = this.option("bUsePullDown") || this.option("bUsePullUp");
        if(!this._isUse("pull")) {
        	return false;
        }
        
        if(!this._inst("pull")) {
            this._htPlugin["pull"].o = new jindo.m.PullPlugin(this);
        }
        this._inst("pull").refresh();
        return true;
    },
    
    /**
     * IndexScroll 기능 제공 
     */
    // _refreshIndexPlugin : function(){
    // 	this._htPlugin["index"].bUse = this.option("bUseIndex");
    //     if(!this._isUse("index")) { 
    //     	return;
    //     }
        
    //     if(!this._inst("index")) {
    //         this._htPlugin["index"].o = new jindo.m.IndexPlugin(this);
    //     }
    //     this._inst("index").refresh();
    // },

    /**
        스크롤러를 위한 환경을 재갱신함

        @method refresh
        @param {Object} bNoRepos true 일 경우, 포지션을 갱신하지 않음
    **/
    refresh : function(bNoRepos) {
        if(!this.isActivating()) {
            return;
        }
        // wrapper와 스크롤러의 크기 판별
        if(this.option("nWidth")) {
            this._htWElement["wrapper"].width(parseInt(this.option("nWidth"),10));
        }
        if(this.option("nHeight")) {
            this._htWElement["wrapper"].height(parseInt(this.option("nHeight"),10));
        }
        
        var nWidthLeft = parseInt(this._htWElement["wrapper"].css("border-left-width"),10),
            nWidthRight = parseInt(this._htWElement["wrapper"].css("border-right-width"),10),
            nHeightTop = parseInt(this._htWElement["wrapper"].css("border-top-width"),10),
            nHeightBottom = parseInt(this._htWElement["wrapper"].css("border-bottom-width"),10);
        nWidthLeft = isNaN(nWidthLeft) ? 0 : nWidthLeft;
        nWidthRight = isNaN(nWidthRight) ? 0 : nWidthRight;
        nHeightTop = isNaN(nHeightTop) ? 0 : nHeightTop;
        nHeightBottom = isNaN(nHeightBottom) ? 0 : nHeightBottom;
        
        this.nWrapperW = this._htWElement["wrapper"].width() - nWidthLeft - nWidthRight;
        this.nWrapperH = this._htWElement["wrapper"].height() - nHeightTop - nHeightBottom;
        

        if(!this._refreshPullPlugin()) {
            this.nScrollW = this._htWElement["scroller"].width();
            this.nScrollH = this._htWElement["scroller"].height() - this.option("nOffsetBottom");
            this.nMinScrollTop = -this.option("nOffsetTop");
            this.nMaxScrollTop = this.nWrapperH - this.nScrollH;
        }
        this.nMaxScrollLeft = this.nWrapperW - this.nScrollW;

        // 모든 A태그
        if(this.bUseHighlight && this.isClickBug) {
            this._aAnchor = jindo.$$("A", this._htWElement["scroller"].$value());
        }

        // 스크롤 여부 판별
        this.bUseHScroll = this.option("bUseHScroll") && (this.nWrapperW <= this.nScrollW);
        this.bUseVScroll = this.option("bUseVScroll") && (this.nWrapperH <= this.nScrollH);
//      console.log(this.bUseHScroll, this.bUseVScroll, this._htWElement["wrapper"].height(), this._htWElement["wrapper"].$value().offsetHeight);

        // 스크롤 여부에 따른 스타일 지정
        if(this.bUseHScroll && !this.bUseVScroll) { // 수평인 경우
            this._htWElement["scroller"].$value().style["height"] = "100%";
        }
        if(!this.bUseHScroll && this.bUseVScroll) { // 수직인 경우
            this._htWElement["scroller"].$value().style["width"] = "100%";
        }

        // Pulgin refresh
        this._refreshDynamicPlugin();
        // this._refreshIndexPlugin();

        // 스크롤바 refresh (없을시 자동 생성)
        if(this.option("bUseScrollbar")) {
            this._refreshScroll("V");
            this._refreshScroll("H");
        }

        if(!this.bUseHScroll && !this.bUseVScroll) { // 스크롤이 발생하지 않은 경우, 안드로이드인경우 포지션을 못잡는 문제
            this._fixPositionBug();
        }

        if(!bNoRepos) {
            this.restorePos(0);
        }
    },

    /**
        스크롤의 위치를 지정함
        @param {Number} nLeft
        @param {Number} nTop
    **/
    _setPos : function(nLeft,nTop) {
        var sDirection;
        nLeft = this.bUseHScroll ? nLeft : 0;
        nTop = this.bUseVScroll ? nTop : 0;
        
        // console.log("setPos : " + this._nLeft + ", " + this._nTop + ", (nLeft,nTop) : " + nLeft + ", " + nTop);
        if(this._isUse("dynamic")) {
            sDirection = this._checkDirection(nLeft,nTop);
        }
        /**
            스크롤러 위치 변경되기 전

            @event beforePosition
            @param {String} sType 커스텀 이벤트명
            @param {Number} nLeft Scroller의 left 값
            @param {Number} nTop Scroller의 top 값
            @param {Number} nMaxScrollLeft Scroller의 최대 left 값
            @param {Number} nMaxScrollTop Scroller의 최대 top 값
            @param {Function} stop 수행시 position 이벤트가 발생하지 않음
        **/
        if (this._fireEvent("beforePosition")) {
            this._isControling = true;
            this._nLeft = nLeft;
            this._nTop = nTop;
            if(this._isUse("dynamic")) {
                this._inst("dynamic").updateListStatus(sDirection, this.bUseVScroll ? this._nTop : this._nLeft);
            }
            if(this.option("bUseTranslate")) {
                if (this.bUseHighlight && this.isPositionBug) {
                    var htStyleOffset = this.getStyleOffset(this._htWElement["scroller"]);
                    nLeft -= htStyleOffset.left;
                    nTop -= htStyleOffset.top;
                }
                
                this._htWElement["scroller"].css("-" + this.sCssPrefix + "-transform", "translate" + this.sTranOpen + nLeft + "px, " + nTop + "px" + this.sTranEnd);
            } else {
                this._htWElement["scroller"].css({
                    "left" : nLeft + "px",
                    "top" : nTop + "px"
                });
            }

            if(this.option("bUseScrollbar")) {
                this._htTimer["scrollbar"] = clearTimeout(this._htTimer["scrollbar"]);
                this._setScrollBarPos("V", this._nTop);
                this._setScrollBarPos("H", this._nLeft);
            }
            // this.tick();
             /**
                스크롤러 위치 변경된 후

                @event position
                @param {String} sType 커스텀 이벤트명
                @param {Number} nLeft Scroller의 left 값
                @param {Number} nTop Scroller의 top 값
                @param {Number} nMaxScrollLeft Scroller의 최대 left 값
                @param {Number} nMaxScrollTop Scroller의 최대 top 값
                @param {Function} stop 수행시 영향을 받는것이 없음
            **/
            this._fireEvent("position");
            
            // if(this._isUse("index")){
            //     this._inst("index").setPosFixedIndex(this._nTop);
            // }
            
        }
    },


	/**
	 * Plugin 사용 여부 상태 조회
	 * @param {String} sName
	 */
    _isUse : function(sName) {
        return this._htPlugin[sName].bUse;
    },

	/**
	 * Plugin 객채 조
	 * @param {String} sName
	 */
    _inst : function(sName) {
        return this._htPlugin[sName].o;
    },

    /**
     * @to-do Dynamic으로 빼고 싶음.
     */
    _checkDirection : function(nLeft, nTop) {
        var nBeforePos = this.bUseVScroll ? this._nTop : this._nLeft,
            nAfterPos = this.bUseVScroll ? nTop : nLeft,
            sDirection;
        if(nBeforePos > nAfterPos) {
            sDirection = "forward";
        } else {
            sDirection = "backward";
        }
        return sDirection;
    },

    /**
        스크롤영역으로 복원함
        @deprecated 
        @method restorePos
        @param {Number} nDuration
    **/
    restorePos : function(nDuration) {
        if(!this.bUseHScroll && !this.bUseVScroll) {
            return;
        }
        // 최대, 최소범위 지정
        var nNewLeft = this.getPosLeft(this._nLeft),
            nNewTop = this.getPosTop(this._nTop);
        if (nNewLeft === this._nLeft && nNewTop === this._nTop) {
            /* 최종 종료 시점 */
            this._isControling = false;
            this._fireAfterScroll();
            this._fixPositionBug();
            return;
        } else {
            this._scrollTo(nNewLeft, nNewTop , nDuration);
        }
    },

    /**
        모멘텀을 계산하여 앞으로 이동할 거리와 시간을 속성으로 갖는 객체를 반환함
        @param {Number} nDistance
        @param {Number} nSpeed
        @param {Number} nMomentum
        @param {Number} nSize
        @param {Number} nMaxDistUpper
        @param {Number} nMaxDistLower
    **/
    _getMomentum: function (nDistance, nSpeed, nMomentum, nSize, nMaxDistUpper, nMaxDistLower) {
        var nDeceleration = this.option("nDeceleration"),
            nNewDist = nMomentum / nDeceleration,
            nNewTime = 0,
            nOutsideDist = 0;
        //console.log("momentum : " + nDistance + ", " + nSpeed + ", " + nMomentum + ",  " + nSize + ", " + nMaxDistUpper + " , " + nMaxDistLower + ", " + nNewDist);
        if (nDistance < 0 && nNewDist > nMaxDistUpper) {
            nOutsideDist = nSize / (6 / (nNewDist / nSpeed * nDeceleration));
            nMaxDistUpper = nMaxDistUpper + nOutsideDist;
            nSpeed = nSpeed * nMaxDistUpper / nNewDist;
            nNewDist = nMaxDistUpper;
        } else if (nDistance > 0 && nNewDist > nMaxDistLower) {
            nOutsideDist = nSize / (6 / (nNewDist / nSpeed * nDeceleration));
            nMaxDistLower = nMaxDistLower + nOutsideDist;
            nSpeed = nSpeed * nMaxDistLower / nNewDist;
            nNewDist = nMaxDistLower;
        }
        nNewDist = nNewDist * (nDistance > 0 ? -1 : 1);
        nNewTime = nSpeed / nDeceleration;
        //console.log("momentum nSpeed : " + nSpeed + ", nMomentum : " + nMomentum + ", nNewDist : " + nNewDist + ", nTop : " + this._nTop + ", nNewTime : " + nNewTime);
        return {
            nDist: nNewDist,
            nTime: Math.round(nNewTime)
        };
    },

    /**
        애니메이션을 초기화한다.
    **/
    _stop : function() {
        if(this.option("bUseTimingFunction")) {
            jindo.m.detachTransitionEnd(this._htWElement["scroller"].$value(), this._htEvent["TransitionEnd"]);
        } else {
            cancelAnimationFrame(this._htTimer["ani"]);
        }
        this._aAni = [];
        this._isAnimating = false;
        this._isStop = true;
    },

    _scrollTo: function (nLeft, nTop , nDuration) {
        this._stop();
        nLeft = this.bUseHScroll ? nLeft : 0;
        nTop = this.bUseVScroll ? nTop : 0;
        this._aAni.push({
            nLeft: nLeft,
            nTop: nTop,
            nDuration: nDuration || 0
        });
        this._animate();
    },


    /**
        left, top 기준으로 스크롤을 이동한다.
        스크롤을 해당 위치(nLeft, nTop)로 이동한다.<br/>
        @method scrollTo
        @param {Number} nLeft 0~양수 만 입력 가능하다. (-가 입력된 경우는 절대값으로 계산된다)
        @param {Number} nTop 0~양수 만 입력 가능하다. (-가 입력된 경우는 절대값으로 계산된다)
        @param {Number} nDuration 기본값은 0ms이다.
        @remark
            최상위의 위치는 0,0 이다. -값이 입력될 경우는 '절대값'으로 판단한다.<br/>
            스크롤의 내용을 아래로 내리거나, 오른쪽으로 이동하려면 + 값을 주어야 한다.<br/>
        @example
            oScroll.scrollTo(0,100); //목록이 아래로 100px 내려간다.
            oScroll.scrollTo(0,-100); //목록이 아래로 100px 내려간다. (절대값이 100이므로)

        @history 1.1.0 Update nLeft, nTop 값이 양수일 경우 아래쪽, 오른쪽 방향으로 가도록 변경 (음수일 경우 "절대값"으로 계산됨)

    **/

    scrollTo : function(nLeft, nTop, nDuration) {
        nDuration = nDuration || 0;
        nLeft = -Math.abs(nLeft);
        nTop = -Math.abs(nTop);
        nTop += this.getTop();

        this._scrollTo( (nLeft >= this.getLeft() ? this.getLeft() : (nLeft <= this.getRight() ? this.getRight() : nLeft) ),
            (nTop >= this.getTop() ? this.getTop() : (nTop <= this.getBottom() ? this.getBottom() : nTop) ),
            nDuration);
    },

    /**
        오른쪽 위치 반환

        @method getRight
        @return {Number}
    **/
    getRight : function() {
        return this.nMaxScrollLeft;
    },

    /**
        왼쪽 위치 반환

        @method getLeft
        @return {Number}
    **/
    getLeft : function() {
        return 0;
    },

    /**
        아래쪽 위치 반환

        @method getBottom
        @return {Number}
    **/
    getBottom : function() {
        return this.nMaxScrollTop;
    },

    /**
        위쪽 위치 반환

        @method getTop
        @return {Number}
    **/
    getTop : function() {
        return this.nMinScrollTop;
    },

    /**
        동작 여부를 반환

        @method isMoving
        @return {Boolean}  동작 여부
    **/
    isMoving : function() {
        return this._isControling;
    },

    /**
        애니메이션을 호출한다.
    **/
    _animate : function() {
        var self = this,
            oStep;
        if (this._isAnimating) {
            return;
        }
        if(!this._aAni.length) {
            this.restorePos(300);
            return;
        }
        // 동일할 경우가 아닐때 까지 큐에서 Step을 뺌.
        do {
            oStep = this._aAni.shift();
            if(!oStep) {
                return;
            }
        } while( oStep.nLeft == this._nLeft && oStep.nTop == this._nTop );
        if(oStep.nDuration == 0) {
            if (this.option("bUseTimingFunction")) {
                this._transitionTime(0);
            }
            this._setPos(oStep.nLeft, oStep.nTop);
            this._animate();
        } else {
            // this.start();
            this._isAnimating = true;
            // Transition을 이용한 animation
            if (this.option("bUseTimingFunction")) {
                this._transitionTime(oStep.nDuration);
                this._setPos(oStep.nLeft, oStep.nTop);
                this._isAnimating = false;
                jindo.m.attachTransitionEnd(this._htWElement["scroller"].$value(), this._htEvent["TransitionEnd"]);
            } else {
                // AnimationFrame을 이용한 animation
                var startTime = (new Date()).getTime(),
                    nStartLeft = this._nLeft, nStartTop = this._nTop;
                (function animate () {
                    var now = (new Date()).getTime(),nEaseOut;
                    if (now >= startTime + oStep.nDuration) {
                        self._setPos(oStep.nLeft, oStep.nTop);
                        self._isAnimating = false;
                        self._animate();
                        return;
                    }
                    now = (now - startTime) / oStep.nDuration - 1;
                    nEaseOut = Math.sqrt(1 - Math.pow(now,2));
                    self._setPos((oStep.nLeft - nStartLeft) * nEaseOut + nStartLeft, (oStep.nTop - nStartTop) * nEaseOut + nStartTop);
                    if (self._isAnimating) {
                        self._htTimer["ani"] = requestAnimationFrame(animate);
                    }
                })();
            }
        }
    },

    /**
        디바이스 회전시, 처리
        @param {jindo.$Event} we
    **/
    _onRotate : function(we) {
        this.refresh();
    },


    /**
        transition duration 지정
        @param {Nubmer} nDuration
    **/
    _transitionTime: function (nDuration) {
        nDuration += 'ms';
        this._htWElement["scroller"].css("-" + this.sCssPrefix + "-transition-duration", nDuration);
        if(this.option("bUseScrollbar")) {
            this._setScrollbarDuration(nDuration);
        }
    },

    _setScrollbarDuration : function(nDuration) {
        if (this.bUseHScroll && this._htWElement["HscrollbarIndicator"]) {
            this._htWElement["HscrollbarIndicator"].css("-" + this.sCssPrefix + "-transition-duration", nDuration);
        }
        if (this.bUseVScroll && this._htWElement["VscrollbarIndicator"]) {
            this._htWElement["VscrollbarIndicator"].css("-" + this.sCssPrefix + "-transition-duration", nDuration);
        }
    },

    /**
        Anchor 삭제. for iOS
    **/
    _clearAnchor : function() {
        // console.log("clear : " + !!this._aAnchor + " | " + this._bBlocked + " | " + this.isClickBug);
        if(this.isClickBug && this._aAnchor && !this._bBlocked) {
            var aClickAddEvent = null;
            for(var i=0, nILength=this._aAnchor.length; i<nILength; i++) {
                if(!this._aAnchor[i].___isClear___) {
                    if (this._fnDummyFnc !== this._aAnchor[i].onclick) {
                        this._aAnchor[i]._onclick = this._aAnchor[i].onclick;
                    }
                    this._aAnchor[i].onclick = this._fnDummyFnc;
                    this._aAnchor[i].___isClear___ = true;
                    aClickAddEvent = this._aAnchor[i].___listeners___ || [];
                    for(var j=0, nJLength = aClickAddEvent.length; j<nJLength; j++) {
                        ___Old__removeEventListener___.call(this._aAnchor[i], "click", aClickAddEvent[j].listener, aClickAddEvent[j].useCapture);
                    }
                }
            }
            this._bBlocked = true;
            // addConsole("삭제");
        }
    },

    /**
        Anchor 복원. for iOS
    **/
    _restoreAnchor : function() {
        //console.log("restore : " + this._aAnchor + " , " + this._bBlocked);
        if(this.isClickBug && this._aAnchor && this._bBlocked) {
            var aClickAddEvent = null;
            for(var i=0, nILength=this._aAnchor.length; i<nILength; i++) {
                if(this._aAnchor[i].___isClear___) {
                    if(this._fnDummyFnc !== this._aAnchor[i]._onclick) {
                        this._aAnchor[i].onclick = this._aAnchor[i]._onclick;
                    } else {
                        this._aAnchor[i].onclick = null;
                    }
                    this._aAnchor[i].___isClear___ = null;
                    aClickAddEvent = this._aAnchor[i].___listeners___ || [];
                    for(var j=0, nJLength = aClickAddEvent.length; j<nJLength; j++) {
                        ___Old__addEventListener___.call(this._aAnchor[i], "click", aClickAddEvent[j].listener, aClickAddEvent[j].useCapture);
                    }
                }
            }
            this._bBlocked = false;
        }
    },

    /**
        이동중 멈추는 기능. 이때 멈춘 위치의 포지션을 지정
    **/
    _stopScroll : function() {
        var htCssOffset = jindo.m.getCssOffset(this._htWElement["scroller"].$value()),
            htStyleOffset ={left : 0, top : 0}, nTop, nLeft;

        if(this.isPositionBug && this.bUseHighlight || !this.option("bUseTranslate")) {
            htStyleOffset = this.getStyleOffset(this._htWElement["scroller"]);
        }

        nLeft = htCssOffset.left + htStyleOffset.left;
        nTop = htCssOffset.top + htStyleOffset.top;

        // console.log(nLeft + "," + this._nLeft + "|" + nTop + "," +this._nTop);
        if(nLeft !== parseInt(this._nLeft,10) || nTop !== parseInt(this._nTop,10)) {
            this._stop();
            this._setPos(this.getPosLeft(nLeft), this.getPosTop(nTop));
            this._isControling = false;
            this._fireAfterScroll();
            this._fixPositionBug();
        }
    },

    /**
        Style의 left,top을 반환함
        @deprecated 
        @method getStyleOffset
        @param {jindo.$Element} wel
    **/
    getStyleOffset : function(wel) {
        var nLeft = parseInt(wel.css("left"),10),
            nTop = parseInt(wel.css("top"),10);
        nLeft = isNaN(nLeft) ? 0 : nLeft;
        nTop = isNaN(nTop) ? 0 : nTop;
        return {
            left : nLeft,
            top : nTop
        };
    },

    /**
        Boundary를 초과하지 않는 X (left) 포지션 반환
        @deprecated 
        @method getPosLeft
        @param {Number} nPos
    **/
    getPosLeft : function(nPos) {
        return (nPos >= 0 ? 0 : (nPos <= this.nMaxScrollLeft ? this.nMaxScrollLeft : nPos) );
    },

    /**
        Boundary를 초과하지 않는 Y (top) 포지션 반환
        @deprecated 
        @method getPosTop
        @param {Number} nPos
    **/
    getPosTop : function(nPos) {
        return (nPos >= this.nMinScrollTop ? this.nMinScrollTop : (nPos <= this.nMaxScrollTop ? this.nMaxScrollTop : nPos) );
    },

    /**
        scrollbar를 숨긴다
        @param {String} sDirect H,V 수평과 수직을 나타낸다.
    **/
    _hideScrollBar : function(sDirection) {
        if(!this._htWElement) { return; }
        var wel = this._htWElement[sDirection + "scrollbar"],
            bUseScroll = (sDirection === "H" ? this.bUseHScroll : this.bUseVScroll);
        if(bUseScroll && wel) {
            wel.hide();
            /* 갤럭시 S3인 경우 hide된 후 reflow가 발생하지 않으면 스크롤바가 사라지지 않는다. */
            wel.css("left",wel.css("left") + "px");
            if(this.isPositionBug && this.bUseHighlight) {
                this.makeStylePos(this._htWElement[sDirection + "scrollbarIndicator"]);
            }
        }
        
    },

    _fireAfterScroll : function() {
        if (this.option("bUseScrollbar")) {
            var self = this;
            this._htTimer["scrollbar"] = setTimeout(function(){
                if(!self.option("bUseFixedScrollbar")) {
                    self._hideScrollBar("V");
                    self._hideScrollBar("H");
                }
            }, this.option('nScrollbarHideThreshold'));
        }
        /**
            스크롤러 위치 변경이 최종적으로 끝났을 경우

            @event afterScroll
            @param {String} sType 커스텀 이벤트명
            @param {Number} nLeft Scroller의 left 값
            @param {Number} nTop Scroller의 top 값
            @param {Number} nMaxScrollLeft Scroller의 최대 left 값
            @param {Number} nMaxScrollTop Scroller의 최대 top 값
            @param {Function} stop 수행시 영향을 받는것이 없음
        **/
        this._fireEvent("afterScroll");
    },

    /**
        beforeScroll 사용자 이벤트 호출
    **/
    _fireEventbeforeScroll : function(htParam) {
           /**
            touchEnd시 스크롤인 경우, 스크롤러의 위치가 변경되기 전
            여기에서 넘어가는 파라미터를 변경시, 변경된 값이 스크롤러의 위치 변경에 영향을 미침

            @event beforeScroll
            @param {String} sType 커스텀 이벤트명
            @param {Number} nDistanceX touchStart의 X좌표와의 상대적인 거리.(touchStart좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
            @param {Number} nDistanceY touchStart의 Y좌표와의 상대적인 거리.(touchStart좌표에서 위쪽방향이면 양수, 아래쪽 방향이면 음수)
            @param {Number} nMomentumX 가속 발생 구간일 경우 현재 터치 움직임의 수평방향 운동에너지값,가속 구간이 아닐경우 0
            @param {Number} nMomentumY 가속 발생 구간일 경우 현재 터치 움직임의 수직방향 운동에너지값,가속 구간이 아닐경우 0
            @param {Number} nLeft Scroller의 left 값
            @param {Number} nTop Scroller의 top 값
            @param {Number} nNextLeft 가속 발생시, 변경될 scroller의 left값 (가속 미발생시, nLeft와 동일)
            @param {Number} nNextTop 가속 발생시, 변경될 scroller의 top값 (가속 미발생시, nTop와 동일)
            @param {Number} nTime 가속 발생시, 가속이 적용될 ms시간 (가속 미발생시, 0)
            @param {Function} stop 수행시 scroll 이벤트가 발생하지 않음
        **/
        return this.fireEvent("beforeScroll", htParam);
    },

    /**
        scroll 사용자 이벤트 호출
    **/
    _fireEventScroll : function(htParam) {
        /**
            touchEnd시 스크롤인 경우, 스크롤러의 위치가 변경된 후
            여기에서 넘어가는 파라미터를 변경시, 변경된 값이 스크롤러의 위치 변경에 영향을 미침

            @event scroll
            @param {String} sType 커스텀 이벤트명
            @param {Number} nDistanceX touchStart의 X좌표와의 상대적인 거리.(touchStart좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
            @param {Number} nDistanceY touchStart의 Y좌표와의 상대적인 거리.(touchStart좌표에서 위쪽방향이면 양수, 아래쪽 방향이면 음수)
            @param {Number} nMomentumX 가속 발생 구간일 경우 현재 터치 움직임의 수평방향 운동에너지값,가속 구간이 아닐경우 0
            @param {Number} nMomentumY 가속 발생 구간일 경우 현재 터치 움직임의 수직방향 운동에너지값,가속 구간이 아닐경우 0
            @param {Number} nLeft Scroller의 left 값
            @param {Number} nTop Scroller의 top 값
            @param {Number} nNextLeft 가속 발생시, 변경될 scroller의 left값 (가속 미발생시, nLeft와 동일)
            @param {Number} nNextTop 가속 발생시, 변경될 scroller의 top값 (가속 미발생시, nTop와 동일)
            @param {Number} nTime 가속 발생시, 가속이 적용될 ms시간 (가속 미발생시, 0)
            @param {Function} stop 수행시 영향을 받는것이 없음
        **/
        this.fireEvent("scroll", htParam);
    },

    /**
        범용 사용자 이벤트 호출
    **/
    _fireEvent : function(sType) {
        return this.fireEvent(sType, this._getNowPosition());
    },

    /**
        범용 touch 사용자 이벤트
    **/
    _fireTouchEvent : function(sType, we) {
        return this.fireEvent(sType, this._getNowPosition(we));
    },
    
    /**
     * 공통 현재 위치 정보 return 처리
     */
    _getNowPosition : function(we) {
        return {
            nLeft : this._nLeft,
            nTop : this._nTop,
            nMaxScrollLeft : this.nMaxScrollLeft,
            nMaxScrollTop : this.nMaxScrollTop,
            oEvent : we || {}
        };
    },

     /**
        pullDown 사용여부를 지정할수 있습니다.

        @method setUsePullDown
        @param {Boolean} bUse
    **/
    setUsePullDown : function(bUse) {
        if(this._isUse("pull")) {
            this.option("bUsePullDown", bUse);
            this.refresh();
        }
    },

    /**
        pullUp 사용여부를 지정할 수 있습니다.

        @method setUsePullUp
        @param {Boolean} bUse
    **/
    setUsePullUp : function(bUse) {
        if(this._isUse("pull")) {
            this.option("bUsePullUp", bUse);
            this.refresh();
        }
    },

    /**
        Touchstart시점 이벤트 핸들러
        @param {jindo.$Event} we
    **/
    _onStart : function(we) {
        // console.log  ("touchstart (" + we.nX + "," + we.nY + ") this._isAnimating " + this._isAnimating);
        this._clearPositionBug();
        /**
            touchStart 내부 스크롤로직이 실행되기 전

            @event beforeTouchStart
            @param {String} sType 커스텀 이벤트명
            @param {Number} nLeft Scroller의 left 값
            @param {Number} nTop Scroller의 top 값
            @param {Number} nMaxScrollLeft Scroller의 최대 left 값
            @param {Number} nMaxScrollTop Scroller의 최대 top 값
            @param {jindo.$Event} oEvent touchStart 이벤트 객체
            @param {Function} stop 수행시 touchStart 이벤트가 발생하지 않음
        **/
        if(this._fireTouchEvent("beforeTouchStart",we)) {
            this._clearAnchor();
            this._isAnimating = false;
            this._isControling = true;
            this._isStop = false;
            if (this.option("bUseTimingFunction")) {
                this._transitionTime(0);
            }
            // 이동중 멈추었을 경우
            this._stopScroll();
            /**
                touchStart 내부 스크롤로직이 실행된 후

                @event touchStart
                @param {String} sType 커스텀 이벤트명
                @param {Number} nLeft Scroller의 left 값
                @param {Number} nTop Scroller의 top 값
                @param {Number} nMaxScrollLeft Scroller의 최대 left 값
                @param {Number} nMaxScrollTop Scroller의 최대 top 값
                @param {jindo.$Event} oEvent touchStart 이벤트 객체
                @param {Function} stop 수행시 영향을 받는것이 없음
            **/
            if(!this._fireTouchEvent("touchStart",we)) {
                we.stop();
            }
        } else {
            we.stop();
        }
    },

    /**
        이동시점 이벤트 핸들러
        @param {jindo.$Event} we
    **/
    _onMove : function(we) {
        this._clearTouchEnd();
        // console.log("touchmove (" + we.nX + "," + we.nY + "), Vector (" + we.nVectorX + "," + we.nVectorY + ") sMoveType : " + we.sMoveType);
        if(this._isUse("pull")) {
            this._inst("pull").touchMoveForUpdate(we, this.nMaxScrollTop);
        }
        /** 시스템 스크롤 막기 */
        var weParent = we.oEvent;
        if(we.sMoveType === jindo.m.MOVETYPE[0]) {  //수평이고, 수평스크롤인 경우 시스템 스크롤 막기
            if(this.bUseHScroll) {
                if( !this.option("bUseBounce") && ( (this._nLeft >= 0 && we.nVectorX > 0) || (this._nLeft <= this.nMaxScrollLeft && we.nVectorX < 0) )  ) {
                    this._forceRestore(we);
                    return;
                } else {
                    weParent.stop(jindo.$Event.CANCEL_ALL);
                }
            } else {
                return true;
            }
        } else if(we.sMoveType === jindo.m.MOVETYPE[1]) {   //수직이고, 수직스크롤인 경우 시스템 스크롤 막기
            if(this.bUseVScroll) {
                if( !this.option("bUseBounce") && ( (this._nTop >= this.nMinScrollTop && we.nVectorY > 0) || (this._nTop <= this.nMaxScrollTop && we.nVectorY < 0) )  ) {
                    this._forceRestore(we);
                    return;
                } else {
                    weParent.stop(jindo.$Event.CANCEL_ALL);
                }
            } else {
                return true;
            }
        } else if(we.sMoveType === jindo.m.MOVETYPE[2]) {   //대각선일 경우, 시스템 스크롤 막기
            if(this.option('bUseDiagonalTouch')){
                weParent.stop(jindo.$Event.CANCEL_ALL);
            } else{
                return;
            }
        } else {    // 탭, 롱탭인 경우, 다 막기
            weParent.stop(jindo.$Event.CANCEL_ALL);
            return true;
        }
        /**
            touchMove 내부 스크롤로직이 실행되기 전

            @event beforeTouchMove
            @param {String} sType 커스텀 이벤트명
            @param {Number} nLeft Scroller의 left 값
            @param {Number} nTop Scroller의 top 값
            @param {Number} nMaxScrollLeft Scroller의 최대 left 값
            @param {Number} nMaxScrollTop Scroller의 최대 top 값
            @param {jindo.$Event} oEvent touchMove  이벤트 객체
            @param {Function} stop 수행시 move 이벤트가 발생하지 않음
        **/
        if (this._fireTouchEvent("beforeTouchMove",we)) {
            var nNewLeft, nNewTop;
            this._clearPositionBug();
            
            if(this.option("bUseBounce")) {
                nNewLeft = this._nLeft + (this._nLeft >=0 || this._nLeft <= this.nMaxScrollLeft ? we.nVectorX/2 : we.nVectorX);
                nNewTop = this._nTop + (this._nTop >= this.nMinScrollTop || this._nTop <= this.nMaxScrollTop ? we.nVectorY/2 : we.nVectorY);
                /** 갤럭시S3에서는 상단영역을 벗어나면 touchEnd가 발생하지 않음
                 * 상단영역 30이하로 잡힐 경우 복원
                 */
                var self=this;
                this._htTimer["touch"] = setTimeout(function() {
                    self._forceRestore(we);
                },500);
            } else {
                nNewLeft = this.getPosLeft(this._nLeft + we.nVectorX);
                nNewTop = this.getPosTop(this._nTop + we.nVectorY);
            }
            this._setPos(nNewLeft, nNewTop);
            /**
                touchMove 내부 스크롤로직이 실행된 후

                @event touchMove
                @param {String} sType 커스텀 이벤트명
                @param {Number} nLeft Scroller의 left 값
                @param {Number} nTop Scroller의 top 값
                @param {Number} nMaxScrollLeft Scroller의 최대 left 값
                @param {Number} nMaxScrollTop Scroller의 최대 top 값
                @param {jindo.$Event} oEvent touchMove  이벤트 객체
                @param {Function} stop 수행시 영향을 받는것이 없음
            **/
           
            if(!this._fireTouchEvent("touchMove",we)) {
                we.stop();
            }

        } else {
            we.stop();
        }
    },


    /**
        Touchend 시점 이벤트 핸들러
        @param {jindo.$Event} we
    **/
    _onEnd : function(we) {
        // console.log("touchend [" + we.sMoveType + "](" + we.nX + "," + we.nY + "), Vector(" + we.nVectorX + "," + we.nVectorY + "), MomentumY : "+ we.nMomentumY + ", speedY : " + we.nSpeedY);
        // addConsole("OnEndProcess");
        /**
            touchEnd 내부 스크롤로직이 실행되기 전

            @event beforeTouchEnd
            @param {String} sType 커스텀 이벤트명
            @param {Number} nLeft Scroller의 left 값
            @param {Number} nTop Scroller의 top 값
            @param {Number} nMaxScrollLeft Scroller의 최대 left 값
            @param {Number} nMaxScrollTop Scroller의 최대 top 값
            @param {jindo.$Event} oEvent touchEnd 이벤트 객체
            @param {Function} stop 수행시 touchEnd 이벤트가 발생하지 않음
        **/

		if(this._isUse("pull")){
			this._inst("pull").pullUploading();
		}

        if (this._fireTouchEvent("beforeTouchEnd",we)) {
            this._clearPositionBug();
            this._clearTouchEnd();
            // addConsole("end : " + we.sMoveType);
            // 1) 스크롤인 경우
            if (we.sMoveType === jindo.m.MOVETYPE[0] || we.sMoveType === jindo.m.MOVETYPE[1] || we.sMoveType === jindo.m.MOVETYPE[2]) {
                this._endForScroll(we);
                if(this.isClickBug || this.nVersion < 4.1) {
                    we.oEvent.stop(jindo.$Event.CANCEL_DEFAULT);
                }
            } else {    // 2) 스크롤이 아닌 경우
                // 클릭 이후 페이지 뒤로 돌아왔을 경우, 문제가됨. 동작중인 상태를 초기화함
                this._isControling = false;
                if (!this._isStop) {
                    if(this.bUseHighlight) {
                        this._restoreAnchor();
                    }
                }
            }
            /**
                touchEnd 내부 스크롤로직이 실행된 직후

                @event touchEnd
                @param {String} sType 커스텀 이벤트명
                @param {Number} nLeft Scroller의 left 값
                @param {Number} nTop Scroller의 top 값
                @param {Number} nMaxScrollLeft Scroller의 최대 left 값
                @param {Number} nMaxScrollTop Scroller의 최대 top 값
                @param {jindo.$Event} oEvent touchEnd 이벤트 객체
                @param {Function} 수행시 영향 받는것 없음.
            **/
            if(!this._fireTouchEvent("touchEnd",we)) {
                we.stop();
            }
        } else {
            we.stop();
        }
    },


    /**
        스크롤을 강제로 복귀한다.
        @param  {jindo.$Event} we 이벤트
    **/
    _forceRestore : function(we) {
        we.nMomentumX = we.nMomentumY = null;
        this._endForScroll(we);
        this._clearPositionBug();
        this._clearTouchEnd();
    },

    /**
        touchEnd 시점 스크롤 처리
        @param {jindo.$Event} we
    **/
    _endForScroll : function(we) {
        clearTimeout(this._nFixedDubbleEndBugTimer);

        var htMomentumX = { nDist:0, nTime:0 },
            htMomentumY = { nDist:0, nTime:0 },
            htParam = {
                nMomentumX : we.nMomentumX,
                nMomentumY : we.nMomentumY,
                nDistanceX : we.nDistanceX,
                nDistanceY : we.nDistanceY,
                nLeft : this._nLeft,
                nTop : this._nTop
            };
        if (this.option("bUseMomentum") && (we.nMomentumX || we.nMomentumY) ) {
            if (this.bUseHScroll) {
                htMomentumX = this._getMomentum(-we.nDistanceX, we.nSpeedX, we.nMomentumX, this.nWrapperW, -this._nLeft, -this.nMaxScrollLeft + this._nLeft);
            }
            if (this.bUseVScroll) {
                htMomentumY = this._getMomentum(-we.nDistanceY, we.nSpeedY, we.nMomentumY, this.nWrapperH, -this._nTop, -this.nMaxScrollTop + this._nTop);
            }
            htParam.nNextLeft = this._nLeft + htMomentumX.nDist;
            htParam.nNextTop = this._nTop + htMomentumY.nDist;
            htParam.nTime = Math.max(Math.max(htMomentumX.nTime, htMomentumY.nTime),10);
            if (this._fireEventbeforeScroll(htParam)) {
                if(this.option("bUseBounce")) {
                    this._scrollTo(htParam.nNextLeft, htParam.nNextTop, htParam.nTime);
                } else {
                    this._scrollTo(this.getPosLeft(htParam.nNextLeft), this.getPosTop(htParam.nNextTop), htParam.nTime);
                }
                this._fireEventScroll(htParam);
            }
        } else {
            htParam.nNextLeft = this._nLeft;
            htParam.nNextTop = this._nTop;
            htParam.nTime = 0;
            if (this._fireEventbeforeScroll(htParam)) {
                if( this._nLeft !== htParam.nNextLeft || this._nTop !== htParam.nNextTop ) {
                    this._scrollTo(htParam.nNextLeft, htParam.nNextTop, htParam.nTime);
                } else {
                    this.restorePos(300);
                }
                this._fireEventScroll(htParam);
            }
        }
    },

    /**
        TransitionEnd 이벤트 핸들러
        @param {jindo.$Event} we
    **/
    _onTransitionEnd : function(we) {
        jindo.m.detachTransitionEnd(this._htWElement["scroller"].$value(), this._htEvent["TransitionEnd"]);
        this._animate();
    },

    /**
        스크롤 도중 scroll 영역 바깥을 선택하였을시, 스크롤을 중지시킴
        @param {jindo.$Event} we
    **/
    _onDocumentStart : function(we) {
        if(this._htWElement["wrapper"].visible()) {
            if(this._htWElement["wrapper"].isChildOf(we.element)) {
                    return true;
            } else {
                // 전체 스크롤 사용시 막음
                this._stopScroll();
            }
        }
    },

    /**
        jindo.m.Scroll 컴포넌트를 활성화한다.
        activate 실행시 호출됨
    **/
    _onActivate : function() {
        if(!this._oTouch) {
            this._oTouch = new jindo.m.Touch(this._htWElement["wrapper"].$value(), {
                nMoveThreshold : 0,
                nMomentumDuration : (jindo.m.getDeviceInfo().android ? 500 : 200),
                nTapThreshold : 1,
                nSlopeThreshold : 5,
                nEndEventThreshold : (jindo.m.getDeviceInfo().win8 ? 100 : 0)
            });
        } else {
            this._oTouch.activate();
        }
        this._attachEvent();
        this.refresh();
    },

    /**
        jindo.m.Scroll 컴포넌트를 비활성화한다.
        deactivate 실행시 호출됨
    **/
    _onDeactivate : function() {
        this._detachEvent();
        this._oTouch.deactivate();
    },

    /**
        jindo.m.Scroll 에서 사용하는 모든 이벤트를 바인드한다.
    **/
    _attachEvent : function() {
        this._htEvent = {};
        /* Touch 이벤트용 */
        this._htEvent["touchStart"] = jindo.$Fn(this._onStart, this).bind();
        this._htEvent["touchMove"] = jindo.$Fn(this._onMove, this).bind();
        this._htEvent["touchEnd"] = jindo.$Fn(this._onEnd, this).bind();
        this._htEvent["TransitionEnd"] = jindo.$Fn(this._onTransitionEnd, this).bind();
        this._htEvent["document"] = jindo.$Fn(this._onDocumentStart, this).attach(document, "touchstart");
        this._oTouch.attach({
            touchStart : this._htEvent["touchStart"],
            touchMove : this._htEvent["touchMove"],
            touchEnd :  this._htEvent["touchEnd"]
        });

        if(this.option("bAutoResize")) {
            this._htEvent["rotate"] = jindo.$Fn(this._onRotate, this).bind();
            jindo.m.bindRotate(this._htEvent["rotate"]);
        }
    },

    /**
        안드로이드 계열 버그
        css3로 스타일 변경 후, 하이라이트안되는 문제
        [해결법] transition관련 property를 null로 처리
     *       offset 변경
     *       a tag focus 하면 됨
    **/
    _fixPositionBug : function() {
        if(this.isPositionBug && this.bUseHighlight && this.option("bUseTranslate")) {
            var self = this;
            this._clearPositionBug();
            this._htTimer["fixed"] = setTimeout(function() {
                if(self._htWElement && self._htWElement["scroller"]) {
                    self.makeStylePos(self._htWElement["scroller"]);
                    if(self.nVersion < 3) {
                        self._elDummyTag.focus();
                    }
                }
            }, 200);
        }
        // this.end();
    },

    /**
        translate의 포지션을 스타일로 바꾼다.
        @deprecated 
        @method makeStylePos
        @param {jindo.$Element} wel
    **/
    makeStylePos : function(wel) {
        var ele = wel.$value();
        var htCssOffset = jindo.m.getCssOffset(ele);
        var htScrollOffset = wel.offset();
        if(this.nVersion >= 4) {
            ele.style["-" + this.sCssPrefix + "-transform"] = "translate" + this.sTranOpen + "0px, 0px" + this.sTranEnd;
        } else {
            ele.style["-" + this.sCssPrefix + "-transform"] = null;
        }
        ele.style["-" + this.sCssPrefix + "-transition-duration"] = null;
        //alert(htCssOffset.top + " , " + htCssOffset.left + " --- " + htScrollOffset.top + " , " + htScrollOffset.left);
        wel.offset(htCssOffset.top + htScrollOffset.top, htCssOffset.left + htScrollOffset.left);
    },

    /**
        android인 경우, 버그수정 timer를 제거
    **/
    _clearPositionBug : function() {
        if(this.isPositionBug && this.bUseHighlight) {
            clearTimeout(this._htTimer["fixed"]);
            this._htTimer["fixed"] = -1;
        }
    },

    _clearTouchEnd : function() {
        clearTimeout(this._htTimer["touch"]);
        this._htTimer["touch"] = -1;
    },

    /**
        jindo.m.Scroll 에서 사용하는 모든 이벤트를 해제한다.
    **/
    _detachEvent : function() {
        jindo.m.detachTransitionEnd(this._htWElement["scroller"].$value(), this._htEvent["TransitionEnd"]);
        this._htEvent["document"].detach(document,"touchstart");

        if(this.option("bAutoResize")) {
            jindo.m.unbindRotate(this._htEvent["rotate"]);
        }

        this._oTouch.detachAll();
        if (this._elDummyTag) {
            this._htWElement["scroller"].remove(this._elDummyTag);
        }
    },


    /**
        스크롤바를 생성한다.
        @param {String} sDirection 수평, 수직 방향
    **/
    _createScroll : function(sDirection) {
        if( !(sDirection === "H" ? this.bUseHScroll : this.bUseVScroll) ) {
            return;
        }
        var welScrollbar = this._htWElement[sDirection + "scrollbar"],
            welScrollbarIndicator = this._htWElement[sDirection + "scrollbarIndicator"],
            welWrapper = this._htWElement["wrapper"];

        // 기존에 존재하면 삭제
        if(welScrollbar) {
            welWrapper.remove(welScrollbar);
            this._htWElement[sDirection + "scrollbar"] = this._htWElement[sDirection + "scrollbarIndicator"] = null;
        }

        // scrollbar $Element 생성
        welScrollbar = this._createScrollbar(sDirection);
        welScrollbarIndicator = this._createScrollbarIndicator(sDirection);
        this._htWElement[sDirection + "scrollbar"]= welScrollbar;
        this._htWElement[sDirection + "scrollbarIndicator"] = welScrollbarIndicator;
        welScrollbar.append(welScrollbarIndicator);
        welWrapper.append(welScrollbar);
        // scrollbar 갱신
        // this._refreshScroll(sDirection);
    },

    /**
        스크롤바 Wrapper를 생성한다
        @param {String} sDirection
    **/
    _createScrollbar : function(sDirection) {
        var welScrollbar = jindo.$Element("<div>");
        welScrollbar.css({
            "position" : "absolute",
            "zIndex" : 100,
            "bottom" : (sDirection === "H" ? "1px" : (this.bUseHScroll ? '7' : '2') + "px"),
            "right" : (sDirection === "H" ? (this.bUseVScroll ? '7' : '2') + "px" : "1px"),
            "pointerEvents" : "none"
            // "overflow" : "hidden"
        });
        if(this.option("bUseFixedScrollbar")) {
            welScrollbar.show();
        } else {
            welScrollbar.hide();
        }
        if (sDirection === "H") {
            welScrollbar.css({
                height: "5px",
                left: "2px"
            });
        } else {
            welScrollbar.css({
                width: "5px",
                top: "2px"
            });
        }
        return welScrollbar;
    },

    /**
        스크롤바 Indicator를 생성한다.
        @param {String} sDirection
    **/
    _createScrollbarIndicator : function(sDirection) {
        // scrollbar Indivator 생성
        var welScrollbarIndicator = jindo.$Element("<div>").css({
            "position" : "absolute",
            "zIndex" : 100,
            "border": this.option("sScrollbarBorder"),
            "pointerEvents" : "none",
            "left" : 0,
            "top" : 0,
            "background-color" : this.option("sScrollbarColor")});
        if(this.isIos && this.option('bUseScrollBarRadius')) {
            welScrollbarIndicator.css("-" + this.sCssPrefix + "-border-radius", "12px");
        }
        if(this.option("bUseTranslate") || this.option("bUseCss3d")) {
            welScrollbarIndicator.css("-" + this.sCssPrefix + "-transition-property", "-" + this.sCssPrefix + "-transform")
                .css("-" + this.sCssPrefix + "-transform", "translate" + this.sTransOpen + "0,0" + this.sTransEnd);
        }
        if(this.option("bUseTimingFunction")) {
            welScrollbarIndicator.css("-" + this.sCssPrefix + "-transition-timing-function", "cubic-bezier(0.33,0.66,0.66,1)");
        }
        if(sDirection === "H") {
            welScrollbarIndicator.height(5);
        } else {
            welScrollbarIndicator.width(5);
        }
        return  welScrollbarIndicator;
    },

    /**
        스크롤 바의 상태를 갱신한다.
        @param {String} sDirection 수평, 수직 방향
    **/
    _refreshScroll : function(sDirection) {
        // 스크롤이 사용 불가하거나, 사이즈가 동일한 경우는 스크롤바를 생성하지 않는다.
        if(sDirection === "H") {
            if(!this.bUseHScroll || this.nWrapperW == this.nScrollW) {
                return;
            }
        } else {
            if(!this.bUseVScroll || this.nWrapperH == this.nScrollH) {
                return;
            }
        }
        // 스크롤바가 존재하지 않을 경우 새로 생성함
        if(!this._htWElement[sDirection + "scrollbar"]) {
            this._createScroll(sDirection);
        }
        var welScrollbar = this._htWElement[sDirection + "scrollbar"],
            welScrollbarIndicator = this._htWElement[sDirection + "scrollbarIndicator"],
            nSize = 0;
        if(sDirection === "H" ) {
            nSize = Math.max(Math.round(Math.pow(this.nWrapperW,2) / this.nScrollW), 8);
            this._nPropHScroll = (this.nWrapperW - nSize) / this.nMaxScrollLeft;
            welScrollbar.width(this.nWrapperW);
            welScrollbarIndicator.width(isNaN(nSize) ? 0 : nSize);
        } else {
            nSize = Math.max(Math.round(Math.pow(this.nWrapperH,2) / this.nScrollH), 8);
            this._nPropVScroll = (this.nWrapperH - nSize) / this.nMaxScrollTop;
            welScrollbar.height(this.nWrapperH);
            welScrollbarIndicator.height(isNaN(nSize) ? 0 : nSize);
        }
    },

    _setScrollBarPos: function (sDirection, nPos) {
        if(!(sDirection === "H" ? this.bUseHScroll : this.bUseVScroll)) {
            return;
        }
        var welIndicator = this._htWElement[sDirection + "scrollbarIndicator"],
            welScrollbar = this._htWElement[sDirection + "scrollbar"];
        nPos = this["_nProp" + sDirection + 'Scroll'] * nPos;
        if(!this.option("bUseFixedScrollbar") && !welScrollbar.visible()) {
            welScrollbar.show();
        }
        if(welIndicator) {
            if(this.option("bUseTranslate")) {
                if (this.isPositionBug && this.bUseHighlight)  {
                    var nBufferPos = parseInt( ( sDirection === "H" ? welIndicator.css("left") : welIndicator.css("top") ), 10);
                    nPos -= isNaN(nBufferPos) ? 0 : nBufferPos;
                }
                // console.log(nPos, this.sCssPrefix, "translate" + this.sTranOpen + (sDirection === "H" ? nPos + "px,0" : "0," + nPos + "px") + this.sTranEnd);
                welIndicator.css("-" + this.sCssPrefix + "-transform", "translate" + this.sTranOpen + (sDirection === "H" ? nPos + "px,0" : "0," + nPos + "px") + this.sTranEnd);
            } else {
                if(sDirection === "H") {
                    welIndicator.css("left", nPos + "px");
                } else {
                    welIndicator.css("top", nPos + "px");
                }
            }
        }
    },

    /** Temporary **/
    /** FPS 확인 Start **/
    // start : function() {
    //     this._nCount = 0;
    //     this._nElapse = 0;
    //     this._nStart = Date.now();
    //     this._aData = [];
    // },

    // _fps : function() {
    //     if (this._nElapse > 300) {
    //         var cur = this._nCount / (this._nElapse / 1000);
    //         this._aData.push(cur);
    //         var nSum = 0;
    //         for(var i=0, nLength = this._aData.length; i< nLength; i++) {
    //              nSum += this._aData[i];
    //         }
    //         var o = {
    //             cur: cur,
    //             max: Math.max.apply(null, this._aData),
    //             min: Math.min.apply(null, this._aData),
    //             avg : nSum / this._aData.length
    //         };
    //         console.log("FPS current : " + o.cur + ", max : " + o.max + ", min : " + o.min + ", avg : " + o.avg);
    //         return o;
    //     }
    // },

    // end : function() {
    //     return this._fps();
    // },

    // tick : function() {
    //     var now = Date.now();
    //     this._nCount++;
    //     this._nElapse = Date.now() - this._nStart;
    //     return this._fps();
    // },
    /** FPS 확인 End **/

    /**
        jindo.m.Scroll 에서 사용하는 모든 객체를 release 시킨다.
        @method destroy
    **/
    destroy: function() {
        this.deactivate();
        for(var p in this._htWElement) {
            this._htWElement[p] = null;
        }
        this._htWElement = null;
        this._oTouch.destroy();
        delete this._oTouch;
    }
}).extend(jindo.m.UIComponent);/**
    @fileOverview 페이지의 고정영역 내부를 터치하여 스크롤링 할 수 있고, 인덱스 표기 기능 및 스크롤바가 있는 컴포넌트
    @author sculove
    @version 1.7.1
    @since 2012. 4. 2.
**/
/**
    페이지의 고정영역 내부를 터치하여 스크롤링 할 수 있고, 인덱스 표기 기능 및 스크롤바가 있는 컴포넌트

    @class jindo.m.IndexScroll
    @extends jindo.m.Scroll
    @group Component

    @history 1.7.0 Bug 안드로이드 4.x 갤럭시 시리즈에서 하이라이트 사라지지 않는 문제 제거
    @history 1.7.0 Update base엘리먼트에 z-index = 2000으로 설정 (Css3d사용시 충돌하는 버그 수정)
    @history 1.5.0 Support Window Phone8 지원
    @history 1.4.0 Support iOS 6 지원
    @history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
    @history 1.2.0 Release 최초 릴리즈
**/
jindo.m.IndexScroll = jindo.$Class({
    /* @lends jindo.m.IndexScroll.prototype */
    /**
        초기화 함수

        @constructor
        @param {String|HTMLElement} el Scroll할 Element (필수)
        @remark <auidoc:see content="jindo.m.Scroll">jindo.m.Scroll</auidoc:see>의 옵션과 동일하다
        @param {Object} [htOption] 초기화 옵션 객체
            @param {Boolean} [htOption.bUseIndexView=false] 인덱스뷰를 보여준다.
            인덱스뷰에 표기될 내용은 기본적으로 <strong>[sClassPrefix]index</strong>로 지정된 엘리먼트의 text 정보로 구성되어 진다.<br />
            인덱스의 text정보와 다르게 다르게 인덱스뷰를 구성하기 위해서는 <strong>[sClassPrefix]index</strong>로 지정된 엘리먼트에 <strong>data-text</strong> 속성을 지정하여 표시할 인덱스이름 정보를 변경할 수 있다.<br />
            인덱스뷰의 디자인은 <strong>[sClassPrefix]indexview</strong>, <strong>[sClassPrefix]indexview-item</strong> 클래스 통해 조절가능하다.
    **/
    $init : function(el,htUserOption) {},

    /**
        jindo.m.IndexScroll 에서 사용하는 모든 인스턴스 변수를 초기화한다.
    **/
    _initVar: function() {
        this.$super._initVar();
        this._aIndexInfo = null;
        this._bUseIndex = true;
        if( (jindo.m.getDeviceInfo().iphone || jindo.m.getDeviceInfo().ipad) && (parseInt(jindo.m.getDeviceInfo().version,10) < 5) ) {
            this._sEvent = "click";
        } else {
            this._sEvent = "touchstart";
        }
    },

    /**
        jindo.m.IndexScroll 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
    **/
    _setWrapperElement: function(el) {
        this.$super._setWrapperElement(el);
        this._createFixedIndex();
        this._createIndexView();
    },

    /**
        section Element를 추출하여 정보를 갱신한다.
    **/
    _refreshIndexInfo : function() {
        var aIndexElement = this._htWElement["scroller"].queryAll("." + this.option("sClassPrefix") + "index"),
            aIndexInfo = [],
            nWrapperMarginTop = this._htWElement["wrapper"].offset().top;
        for(var i=0, nLength = aIndexElement.length; i < nLength; i++) {
            aIndexInfo.push(this._getIndexInfo(jindo.$Element(aIndexElement[i]), nWrapperMarginTop));
        }
        for(i=0, nLength = aIndexInfo.length-1; i < nLength; i++) {
            aIndexInfo[i].nNextTop = aIndexInfo[i+1].nTop;
            aIndexInfo[i].nLast = aIndexInfo[i+1].nTop - aIndexInfo[i].nHeight;
        }
        // console.log(aIndexInfo);
        this._aIndexInfo = aIndexInfo;
        if(this.option("bUseIndexView")) {
            this._refreshIndexView();
        }
    },

    /**
        인덱스뷰 생성
    **/
    _createIndexView : function() {
        var nId = this.option("sClassPrefix") + "_indexview__";
        this._htWElement["indexview"] = jindo.$Element(nId);
        if(!this._htWElement["indexview"]) {
            this._htWElement["indexview"] = jindo.$Element("<ul id='" + nId + "' class='" + this.option("sClassPrefix") + "indexview' style='position:absolute;z-index:2002;-" + jindo.m.getCssPrefix() + "-tap-highlight-color:transparent;'>");
            this._htWElement["indexview"].appendTo(document.body);
        }
    },

    /**
        인덱스뷰 보이기

        @method showIndexView
        @history 1.4.0 Update 메소드 추가
    **/
    showIndexView : function() {
        if(this.option("bUseIndexView") && this._htWElement["indexview"]) {
            this._htWElement["indexview"].show();

        }
    },

    /**
        인덱스뷰 감추기

        @method hideIndexView
        @history 1.4.0 Update 메소드 추가
    **/
    hideIndexView : function() {
        if(this.option("bUseIndexView") && this._htWElement["indexview"]) {
            this._htWElement["indexview"].hide();
        }
    },

    /**
        인덱스뷰데이터 갱신
    **/
    _refreshIndexView : function() {
        var htOffset = this._htWElement["wrapper"].offset(),
            sName,wel,nTop,nLeft,
            sHTML = "";
        for(var i=0, nLength = this._aIndexInfo.length; i<nLength; i++ ) {
            wel = this._aIndexInfo[i].wel;
            sName = wel.attr("data-text") ? wel.attr("data-text") : wel.text();
            sHTML += "<li class='" + this.option("sClassPrefix") + "indexview_item' data-index='"+ i + "'>" + sName + "</li>";
        }
        this._htWElement["indexview"].html(sHTML);

        nTop = htOffset.top + this._htWElement["wrapper"].height()/2;
        nLeft = htOffset.left + this._htWElement["wrapper"].width();
        this._htWElement["indexview"].css({
            top : (nTop - this._htWElement["indexview"].height()/2) + "px",
            left : (nLeft - this._htWElement["indexview"].width() - 10) + "px"
        });
    },

    _attachEvent : function() {
        this.$super._attachEvent();
        this._htEvent["position"] = jindo.$Fn(this._onPosition, this).bind();
        this.attach("position", this._htEvent["position"]);
        if(this.option("bUseIndexView")) {
            this._htEvent["indexview"] = jindo.$Fn(this._onIndexView, this).attach(this._htWElement["indexview"], this._sEvent);
        }
    },

    _detachEvent : function() {
        this.detach("position", this._htEvent["position"]);
        if(this.option("bUseIndexView")) {
            this._htEvent["indexview"].detach(this._htWElement["indexview"], this._sEvent);
        }
    },

    /**
        인덱스뷰 선택시 이동
        @param  {jindo.$Event} we
    **/
    _onIndexView : function(we) {
        if(we.element.tagName == "LI") {
            var wel = jindo.$Element(we.element),
                nIdx = wel.attr("data-index");
            this.scrollTo(0,this._aIndexInfo[nIdx].nTop);
        }
    },

    /**
        스크롤 포지션 변경시 처리
        @param  {jindo.$Event} we 스크롤변경
    **/
    _onPosition : function(we) {
        if(this._bUseIndex) {
            this._setPosFixedIndex(-we.nTop);
        }
    },

    /**
        섹션 정보를 반환한다.
        @param  {jindo.$Element} welIndex 섹션 엘리먼트
        @param  {Number} Wrapper의 Top offset
        @return {Object} 섹션정보(위치값)
    **/
    _getIndexInfo : function(welIndex, nWrapperMarginTop) {
        var htInfo = {};
        htInfo.wel = welIndex;
        htInfo.nTop = welIndex.offset().top - nWrapperMarginTop;
        htInfo.nHeight = welIndex.height();
        htInfo.nBottom = htInfo.nTop + htInfo.nHeight;
        // console.log(htInfo.nTop,htInfo.nHeight, htInfo.nBottom);
        return htInfo;
    },

    /**
        fixed된 index을 표기하거나 sliding 한다.
        @param {Number} nTop 현재스크롤의 top 위치
    **/
    _setPosFixedIndex : function(nTop) {
        var nIdx = this._getCurrentIdx(nTop),
            htIndexInfo = this._aIndexInfo[nIdx],
            nMoveTop;
        // console.log(nIdx, htIndexInfo);
        if(nIdx == -1) {
            this._htWElement["index_top"].hide();
            this._htWElement["index_bottom"].hide();
        } else {
            if(htIndexInfo.nLast && (htIndexInfo.nLast <= nTop && nTop < htIndexInfo.nNextTop) ) {
                // console.log("slide", nIdx, htIndexInfo);
                nMoveTop = htIndexInfo.nLast - nTop;
                this._htWElement["index_top"].html(htIndexInfo.wel.outerHTML())
                    .css("top", nMoveTop + "px");
                this._htWElement["index_bottom"].html(this._aIndexInfo[nIdx+1].wel.outerHTML())
                    .css("top" , (nMoveTop + htIndexInfo.nHeight) + "px").show();
            } else {
                // console.log("fixed", nIdx, htIndexInfo);
                this._htWElement["index_top"].html(htIndexInfo.wel.outerHTML())
                    .css("top", "0px").show();
                this._htWElement["index_bottom"].hide();
            }
        }
    },

    /**
        fixed된 index를 숨기기.

        @method hideIndex
        @history 1.4.0 Update 메소드 추가
    **/
    hideIndex : function() {
        this._bUseIndex = false;
        this._htWElement["index_top"].hide();
        this._htWElement["index_bottom"].hide();
    },

    /**

        fixed된 index를 보이기

        @method showIndex
        @history 1.4.0 Update 메소드 추가
    **/
    showIndex : function() {
        this._bUseIndex = true;
        this._setPosFixedIndex(this._nTop);
        this._htWElement["index_top"].show();
    },

    /**
     * [_getCurrentIdx description]
     * @param  {Numbrt} nPos nPos에 해당하는 스크롤의 top 정보
     * @return {Number}      top정보를 바탕으로 현재 section이 속해있는 index를 반환한다.
     */
    _getCurrentIdx : function(nPos) {
        for(var i=0, nLength = this._aIndexInfo.length; i < nLength; i++) {
            if(this._aIndexInfo[i].nTop > nPos) {
                break;
            }
        }
        return i-1;
    },
    /**
        fixedSection으로 사용될 2개의 Element를 생성한다.
    **/
    _createFixedIndex : function() {
        var sStyle = 'position:absolute;width:100%;top:0;z-index:2001; display:none';
        this._htWElement["index_top"] = jindo.$Element(this._htWElement["wrapper"].query("._scroller_index_scroll_top_"));
        if(!this._htWElement["index_top"]) {
             this._htWElement["index_top"] = jindo.$Element("<div style='" + sStyle +"' class='_scroller_index_scroll_top_'></div>");
             this._htWElement["wrapper"].append( this._htWElement["index_top"]);
        }
        this._htWElement["index_bottom"] = jindo.$Element(this._htWElement["wrapper"].query("._scroller_index_scroll_bottom_"));
        if(!this._htWElement["index_bottom"]) {
             this._htWElement["index_bottom"] = jindo.$Element("<div style='" + sStyle +"' class='_scroller_index_scroll_bottom_'></div>");
             this._htWElement["wrapper"].append( this._htWElement["index_bottom"]);
        }
    },

    /**
        Scroll영역의 내용이 변경될 경우, refresh를 호출하여 변경된 내용의 값을 갱신한다.
        @remark refresh는 wrapper 엘리먼트가 보일경우 정상적으로 동작한다.

        @method refresh
    **/
    refresh : function() {
        if(this.option("bUsePullDown")) {
            this.option("bUsePullDown",false);
        }
        if(this.option("bUsePullUp")) {
            this.option("bUsePullUp",false);
        }
        if(this.option("bUseHScroll")) {
            this.option("bUseHScroll",false);
        }
        this.option("bUseCss3d",false);
        this.$super.refresh();
        this._refreshIndexInfo();
    }
}).extend(jindo.m.Scroll);/**
	@fileOverview 특정 Layer의 Show/Hide를 처리하는 컴포넌트 (터치가 발생한 위치에따라 Show/Hide 여부를 판단)
	@author sculove
	@version 1.7.1
	@since 2011. 6. 30.
**/
/**
	특정 Layer의 Show/Hide를 처리하는 컴포넌트 (터치가 발생한 위치에따라 Show/Hide 여부를 판단)

	@class jindo.m.LayerManager
	@extends jindo.m.UIComponent
	@uses jindo.m.Touch
	@keyword layer, manager, 레이어, 관리
	@group Component

	@history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
	@history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
	@history 0.9.0 Release 최초 릴리즈
**/
jindo.m.LayerManager = jindo.$Class({
	/* @lends jindo.m.LayerManager.prototype */
	/**
		초기화 함수

		@constructor
		@param {HTMLElement | String} el 숨기고자하는 레이어 엘리먼트 (혹은 id)
		@param {Object} [htOption] 초기화 옵션 객체
			@param {Boolean} [htOption.bActivateOnload=true] <auidoc:see content="jindo.m.LayerManager">LayerManager</auidoc:see> 컴포넌트가 로딩 될때 활성화 시킬지 여부를 결정한다.<br />
			false로 설정하는 경우에는 LayerManager.activate()를 호출하여 따로 활성화 시켜야 한다.
	**/
	$init : function(el,htOption) {
		var oDeviceInfo = jindo.m.getDeviceInfo();
		this.option({
			bActivateOnload : true
		});
		this.option(htOption || {});
		this._initVar();
		this._setWrapperElement(el);
		if(this.option("bActivateOnload")) {
			this.activate();
		}
	},

	/**
		인스턴스 변수를 초기화한다.
	**/
	_initVar : function() {
		this._aLink = [];
		this._oTouch = null;
	},

	/**
		jindo.m.LayerManager 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
	**/
	_setWrapperElement : function(el) {
		this._htWElement = {};
		this.setLayer(el);
	},

	/**
		jindo.m.LayerManager 컴포넌트를 활성화한다.
		activate 실행시 호출됨
	**/
	_onActivate : function() {
		this._attachEvent();
	},

	/**
  		jindo.m.LayerManager 컴포넌트를 비활성화한다.
		deactivate 실행시 호출됨
	**/
	_onDeactivate : function() {
		this._detachEvent();
	},

	/**
		보여주고 숨겨줄 레이어 객체를 설정한다.

		@method setLayer
		@return {this}
	**/
	setLayer : function(el) {
		el = (typeof el == "string" ? jindo.$(el) : el);
		this._htWElement["element"] = jindo.$Element(el);
		this._htWElement["element"].css("position", "absolute");
		return this;
	},

	/**
		Layer가 보여지고 있는지 여부를 가져온다.

		@method getVisible
		@return {Boolean}
	**/
	getVisible : function(){
		return this._htWElement["element"].visible();
	},

	/**
		보여주고 숨겨줄 레이어 객체를 가져온다.

		@method getLayer
		@return {HTMLElement}
	**/
	getLayer : function() {
		return this._htWElement["element"].$value();
	},

	/**
		link된 엘리먼트 배열을 가져온다.

		@method getLinks
		@return {Array}
	**/
	getLinks : function() {
		return this._aLink;
	},

	/**
		생성자의 옵션으로 지정한 이벤트가 발생해도 레이어를 닫지 않게 할 엘리먼트를 지정한다

		@method link
		@param {vElement} vElement 이벤트를 무시할 엘리먼트 또는 엘리먼트의 ID (인자를 여러개 주어서 다수 지정 가능)
		@return {this} 인스턴스 자신
		@example
			o.link(jindo.$("one"), "two", oEl);
	**/
	link : function(vElement){
		if (arguments.length > 1) {
			for (var i = 0, len = arguments.length; i < len; i++) {
				this.link(arguments[i]);
			}
			return this;
		}
		if (this._find(vElement) != -1) {
			return this;
		}
		this._aLink.push(vElement);
		return this;
	},

	/**
		생성자의 옵션으로 지정한 이벤트가 발생해도 레이어를 닫지 않게 할 엘리먼트 지정한 것을 제거한다

		@method unlink
		@param {vElement} vElement 이벤트가 무시된 엘리먼트 또는 엘리먼트의 ID (인자를 여러개 주어서 다수 지정 가능)
		@return {this} 인스턴스 자신
		@example
			o.unlink(jindo.$("one"), "two", oEl);
	**/
	unlink : function(vElement){
		if (arguments.length > 1) {
			for (var i = 0, len = arguments.length; i < len; i++) {
				this.unlink(arguments[i]);
			}
			return this;
		}
		var nIndex = this._find(vElement);
		if (nIndex > -1) {
			this._aLink.splice(nIndex, 1);
		}
		return this;
	},

	/**
		el에 발생한 이벤트를 무시할것인지를 결정
		@param {Object} el
		@return {Boolean} 무시할 경우 true, 무시하지 않을 경우 false
	**/
	_check : function(el){
		var wel = jindo.$Element(el);
		for (var i = 0, elLink, welLink; (elLink = this._aLink[i]); i++) {
			welLink = jindo.$Element(elLink);
			if (welLink) {
				elLink = welLink.$value();
				if (elLink && (el == elLink || wel.isChildOf(elLink))) {
					return true;
				}
			}
		}
		return false;
	},

	/**
		Link에 el이 포함되었는지 여부 확인
		@param {Object} el
		@return {Number} 포함된 index 반환, 없을시 -1
	**/
	_find : function(el){
		for (var i = 0, elLink; (elLink = this._aLink[i]); i++) {
			if (elLink == el) {
				return i;
			}
		}
		return -1;
	},

	/**
		beforeShow 사용자 이벤트 호출
	**/
	_fireEventBeforeShow : function() {
		/**
			Layer를 보여주기 전에 발생

			@event beforeShow
			@param {String} sType 커스텀 이벤트명
			@param {HTMLElement} elLayer 보여지고 감춰지는 대상 Layer
			@param {Array} aLinkedElement Link된 엘리먼트들
			@param {Function} stop show를 중지한다. beforeShow이후 커스텀 이벤트(show)가 발생하지 않는다.
		**/
		return this.fireEvent("beforeShow", {
			elLayer : this.getLayer(),
			aLinkedElement : this.getLinks()
		});
	},

	/**
		show 사용자 이벤트 호출
	**/
	_fireEventShow : function() {
		/**
			Layer를 보여준 후에 발생

			@event show
			@param {String} sType 커스텀 이벤트명
			@param {HTMLElement} elLayer 보여지고 감춰지는 대상 Layer
			@param {Array} aLinkedElement (Array) : Link된 엘리먼트들
			@param {Function} stop stop를 호출하여 영향 받는 것이 없음.
		**/
		this.fireEvent("show", {
			elLayer : this.getLayer(),
			aLinkedElement : this.getLinks()
		});
	},

	/**
		beforeHide 사용자 이벤트 호출
	**/
	_fireEventBeforeHide : function(el) {
		/**
			Layer를 감추기 전에 발생

			@event beforeHide
			@param {String} sType 커스텀 이벤트명
			@param {HTMLElement} elTarget 이벤트가 발생한 엘리먼트
			@param {HTMLElement} elLayer 보여지고 감춰지는 대상 Layer
			@param {Array} aLinkedElement (Array) : Link된 엘리먼트들
			@param {Function} stop hide를 중지한다. beforeHide이후 커스텀 이벤트(hide)가 발생하지 않는다.
		**/
		return this.fireEvent("beforeHide", {
			elTarget : el,
			elLayer : this.getLayer(),
			aLinkedElement : this.getLinks()
		});
	},

	/**
		hide 사용자 이벤트 호출
	**/
	_fireEventHide : function(el) {
		/**
			Layer를 감춘 후에 발생

			@event hide
			@param {String} sType 커스텀 이벤트명
			@param {HTMLElement} elTarget 이벤트가 발생한 엘리먼트
			@param {HTMLElement} elLayer 보여지고 감춰지는 대상 Layer
			@param {Array} aLinkedElement (Array) : Link된 엘리먼트들
			@param {Function} stop stop를 호출하여 영향 받는 것이 없음.
		**/
		this.fireEvent("hide", {
			elTarget : el,
			elLayer : this.getLayer(),
			aLinkedElement : this.getLinks()
		});
	},

	/**
		레이어를 보여준다.

		@method show
		@return {this}
	**/
	show : function() {
		if (!this.getVisible()) {
			if (this._fireEventBeforeShow()) {
				this._htWElement["element"].show();
				this._fireEventShow();
			}
		}
		return this;
	},

	/**
		레이어를 숨긴다.

		@method hide
		@param {HTMLElement} el 이벤트의 타겟을 받는 엘리먼트
		@return {this}
	**/
	hide : function(el) {
		if (this.getVisible()) {
			if (this._fireEventBeforeHide(el)) {
				this._htWElement["element"].hide();
				this._fireEventHide(el);
			}
		}
		return this;
	},

	/**
		레이어를 보여주거나 숨기도록 요청한다

		@method toggle
		@return {this} 인스턴스 자신
	**/
	toggle: function(){
		if (this.getVisible()) {
			this.hide();
		} else {
			this.show();
		}
		return this;
	},

	/**
		레이어의 이벤트를 처리한다.
		@param {Object} we
	**/
	_onEvent : function(we){
		var el = we.element;
		if (this.getVisible()) {
			if (this._check(el)) { // hide()수행중이 아니고 links 객체들 안에서 발생한거면 무시

				/**
					Layer를 감춘 후에 발생

					@event ignore
					@param {String} sType 커스텀 이벤트명
					@param {HTMLElement} elTarget 이벤트가 발생한 엘리먼트
					@param {Function} stop stop를 호출하여 영향 받는 것이 없음.
				**/
				this.fireEvent("ignore", {
					elTarget : el
				});
			} else { //이벤트에 의해 hide()
				this.hide(el);
				return true;
			}
			we.stop();
		}
	},

	/**
		jindo.m.LayerManager 에서 사용하는 모든 이벤트를 바인드한다.
	**/
	_attachEvent : function() {
		var self = this;
		this._oTouch = new jindo.m.Touch(document).attach("touchEnd", function(we) {
			if(we.sMoveType === jindo.m.MOVETYPE[3]) {
				self._onEvent(we);
			}
		});
	},

	/**
		jindo.m.LayerManager 에서 사용하는 모든 이벤트를 해제한다.
	**/
	_detachEvent : function() {
		if(this._oTouch) {
			this._oTouch.detachAll("touchEnd");
		}
	},

	/**
		jindo.m.LayerManager 객체를 release 시킨다.
		@method destroy
	**/
	destroy : function() {
		this.deactivate();

		for(var p in this._htWElement) {
			this._htWElement[p] = null;
		}
		this._htWElement = null;
		delete this._aLink;
		delete this._oTouch;
	}
}).extend(jindo.m.UIComponent);/**
    @fileOverview 진행 대기 상태를 알려주는 로딩 컴포넌트
    @author sculove
    @version 1.7.1
    @since 2011. 8. 18.
**/
/**
    진행 대기 상태를 알려주는 로딩 컴포넌트

    @class jindo.m.Loading
    @extends jindo.m.UIComponent
    @keyword loading, 로딩
    @group Component

    @history 1.5.0 Bug 전체화면 로딩 중 단말기 회전시, foggy 영역이 맞지않는 문제 수정
    @history 1.5.0 Update 전체화면 로딩의 기준이 body에서 클라이언트 화면 크기로 수정
    @history 1.5.0 Support Window Phone8 지원
    @history 1.3.0 Bug 전체화면 로딩이후, 선택되지 않는 문제 수정
    @history 1.2.0 Release 로딩후 click 이벤트가 발생하지 않는 문제
    @history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
    @history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
    @history 1.1.0 Release 최초 릴리즈
**/
jindo.m.Loading = jindo.$Class({
    /* @lends jindo.m.Loading.prototype */
    /**
        초기화 함수

        @constructor
        @param {Varient} el 기준이 되는 엘리먼트. null일 경우, 전체화면을 대상으로 로딩이 생성된다.
        @param {Object} [htOption] 초기화 옵션 객체
            @param {Boolean} [htOption.bActivateOnload=true] 컴포넌트 로드시 activate 여부
            @param {NUmber} [htOption.nWidth=31] 로딩이미지의 가로크기
            @param {NUmber} [htOption.nHeight=31] 로딩이미지의 세로크기
            @param {String} [htOption.sDefaultForeground="black"] 로딩이미지의 색상
            @param {String} [htOption.sDefaultBackground="transparent"] 로딩이미지의 배경색
            @param {String} [htOption.sLoadingText="로딩중입니다"] 로딩텍스트 내용 (HTML)<br />null인 경우, 텍스트가 표기되지 않는다.
            @param {Boolean} [htOption.bUseFoggy] Foggy 사용여부, 기본값 : el ? false=true
            <ul>
            <li>전체화면 기준일 경우 </li>
            <li>부분화면 기준일 경우 false</li>
            </ul>
            @param {String} [htOption.sFoggyColor="gray"] Foggy 색상
            @param {NUmber} [htOption.nFoggyOpacity=0.3] Foggy 투명도
    **/
    $init : function(el, htUserOption) {
        this.option({
             bActivateOnload : true,
             nWidth : 31,
             nHeight : 31,
             sDefaultForeground : "black",
             sDefaultBackground : "transparent",
             sLoadingText : "로딩중입니다",
             bUseFoggy : el ? false : true,
             sFoggyColor : "gray",
             nFoggyOpacity : 0.3
        });
        this.option(htUserOption || {});
        this._setWrapperElement(el);
        if(this.option("bActivateOnload")) {
            this.activate();
        }
    },

    $static : {
        DELAY : ["0","-.9167s","-.833s","-.75s","-.667s","-.5833s","-.5s","-.41667s","-.333s","-.25s","-.1667s","-.0833s"],
        ANIMATION_STYLE : "_loading_animation_sytle_",
        CONTAINER_CLASS : "_loading_container_class_"
    },

    /**
        jindo.m.Loading 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
        @param {Varient} el 엘리먼트를 가리키는 문자열이나, HTML엘리먼트
    **/
    _setWrapperElement: function(el) {
        this._htWElement = {};
        this._htWElement["base"] = jindo.$Element(jindo.$(el) ? jindo.$(el) : document.body);
        this._createLoading();
    },

    /**
        로딩 생성
    **/
    _createLoading : function() {
        /**
         *   container - foggy
         *                       - loadingbox - loading
         *                                              - text
        */
        this._createLoadingStyle();
        // Container 생성
        this._htWElement["container"] = jindo.$Element("<div style='zIndex: 1000'>")
                .addClass(jindo.m.Loading.CONTAINER_CLASS);
        // foggy 생성
        if(this.option("bUseFoggy")) {
            this._createFoggy().appendTo(this._htWElement["container"]);
        }
        // loadingbox 생성
        this._createLoadingElement();
        this._htWElement["loadingbox"] = jindo.$Element("<div>").css({
                "zIndex" : 1000,
                "position" : "absolute"
            }).append(this._htWElement["loading"]);
        // text 생성
        if(this.option("sLoadingText")) {
            this._createLoadingText().appendTo(this._htWElement["loadingbox"]);
        }
        this._htWElement["loadingbox"].appendTo(this._htWElement["container"]);
    },

    /**
        Foggy Layer 생성
    **/
    _createFoggy : function() {
        this._htWElement["foggy"] = jindo.$Element("<div>").css({
                position : "absolute",
                padding : "0px",
                margin : "0px",
                border : "0px",
                backgroundColor : this.option("sFoggyColor"),
                opacity : this.option("nFoggyOpacity"),
                width : "100%",
                height : "100%",
                left : "0px",
                top : "0px",
                zIndex : 1000
        });
        return this._htWElement["foggy"];
    },

    /**
        위치를 지정한다.
    **/
    _setPosition : function() {
        var nWidth = this._htWElement["loadingbox"].width(),
            nHeight = this._htWElement["loadingbox"].height(),
            htScrollPosition;
        if(this._isBody()) {
            htScrollPosition = jindo.$Document().scrollPosition();
            this._htWElement["container"].css({
                "left" : htScrollPosition.left + "px",
                "top" : htScrollPosition.top + "px",
                "width" : window.innerWidth + "px",
                "height" : window.innerHeight + "px"
            });
        } else {
            if(this._htWElement["container"].width() < nWidth) {
                this._htWElement["container"].width(nWidth);
            }
            if(this._htWElement["container"].height() < nHeight) {
                this._htWElement["container"].height(nHeight);
            }
        }
       this._htWElement["loadingbox"].css({
                "top" : "50%",
                "left" : "50%",
                "margin-left" : -parseInt(nWidth/2,10) + "px",
                "margin-top" : -parseInt(nHeight/2,10) + "px"
        });
    },

    _isBody : function() {
        return this._htWElement["base"].isEqual(document.body);
    },

    /**
        Loading를 보여준다.
        @method show
    **/
    show : function() {
            /**
            Loading이 보이기 전에 발생

            @event beforeShow
            @param {String} sType 커스텀 이벤트명
            @param {Function} stop 수행시 show 사용자 이벤트가 발생하지 않습니다

        **/
        if(this.fireEvent("beforeShow")) {
            var aSpan = this._htWElement["loading"].queryAll("span"),
                sCssPrefix = jindo.m.getCssPrefix();
            for(var i=0; i<aSpan.length; i++) {
                jindo.$Element(aSpan[i]).css(sCssPrefix + "Animation", "loadingfade 1s linear " + jindo.m.Loading.DELAY[i] + " infinite");
            }
            this._attachEvent();
            // 전체인경우 화면사이즈에 맞게 크기 조절
            if(this._isBody()) {
                this._htWElement["container"].css({
                    "width" : window.innerWidth + "px",
                    "height" : window.innerHeight + "px"
                });
            }
            this._htWElement["container"].show();
            this._setPosition();
            /**
                Loading이 보인 후에 발생

                @event show
                @param {String} sType 커스텀 이벤트명
            **/
            this.fireEvent("show");
        }
    },

    /**
        Loading를 감춘다.
        @method hide
    **/
    hide : function() {
        /**
            Loading이 사라지기 전에 발생

            @event beforeHide
            @param {String} sType 커스텀 이벤트명
            @param {Function} stop 수행시 hide 사용자 이벤트가 발생하지 않습니다
        **/
        if(this.fireEvent("beforeHide")) {
            var aSpan = this._htWElement["loading"].queryAll("span"),
                sCssPrefix = jindo.m.getCssPrefix();
            for(var i=0; i<aSpan.length; i++) {
                jindo.$Element(aSpan[i]).css(sCssPrefix + "Animation", "");
            }
            this._detachEvent();
            this._htWElement["container"].hide();
            /**
                Loading이 사라진 후에 발생

                @event hide
                @param {String} sType 커스텀 이벤트명
            **/
            this.fireEvent("hide");
        }
    },

    /**
        스크롤 방지를 위한 것
        @param {jindo.$Event} 진도 이벤트
    **/
    _onPrevent : function(we) {
        we.stop(jindo.$Event.CANCEL_ALL);
        return false;
    },

    /**
        모바일 기기 방향 전환시 조절
        @param {jindo.$Event} 진도 이벤트
    **/
    _onRotate : function(we) {
        if(this._htWElement["container"].visible()) {
            /**
             * ios인 경우, 가로에서 세로로 화면 회전시 마크업이 축소되어 있는 상태가 발생함.
             * 이에 대한 처리를 해줌
             */
            if(jindo.m.getDeviceInfo().andorid) {
                this._setPosition();
            } else {
                this._htWElement["container"].hide();
                var self=this;
                setTimeout(function(){
                    self._htWElement["container"].show();
                    self._setPosition();
                },0);
            }
        }
    },

    /**
        이벤트 bind
    **/
    _attachEvent : function() {
        this._htEvent["rotate"] = jindo.$Fn(this._onRotate, this).bind();
        this._htEvent["prevent"] = jindo.$Fn(this._onPrevent, this)
            .attach(this._htWElement["container"],"touchstart")
            .attach(this._htWElement["container"],"touchmove");
        jindo.m.bindRotate(this._htEvent["rotate"]);
    },

    /**
        이벤트 unbind
    **/
    _detachEvent : function() {
        if(this._htEvent["prevent"]) {
            this._htEvent["prevent"].detach(this._htWElement["container"], "touchmove")
                .detach(this._htWElement["container"],"touchstart");
        }
        jindo.m.unbindRotate(this._htEvent["rotate"]);
    },

    /**
        animation-keyframe을 사용하기 위한 설정
    **/
    _createLoadingStyle : function() {
        if(!jindo.$(jindo.m.Loading.ANIMATION_STYLE)) {
            var style_sheet = document.createElement('style');
            if(style_sheet) {
                    style_sheet.setAttribute('type', 'text/css');
                    style_sheet.setAttribute('id',  jindo.m.Loading.ANIMATION_STYLE);
                    var sText = "@-"+jindo.m.getCssPrefix() +"-keyframes loadingfade{from{opacity:1}to{opacity:0}}";
                    var rules = document.createTextNode(sText);
                    if(style_sheet.styleSheet){// IE
                        style_sheet.styleSheet.cssText = rules.nodeValue;
                    }else{
                         style_sheet.appendChild(rules);
                    }

                    var head = document.getElementsByTagName('head')[0];
                    if(head){
                        head.appendChild(style_sheet);
                    }
            }
        }
    },

    /**
        Loading  구성요소 설정
    **/
    _createLoadingElement : function() {
            var sCssPrefix = jindo.m.getCssPrefix(),
                aHtml = [];
            for(var i=0; i<12; i++) {
                aHtml.push("<span style='display:block;position:absolute;top:40%;left:48%;width:11%;height:24%;border-radius:6px;background:");
                aHtml.push(this.option("sDefaultForeground"));
                aHtml.push("; opacity:0; -");
                aHtml.push(sCssPrefix);
                aHtml.push("-transform:rotate(");
                aHtml.push(i * 30);
                aHtml.push("deg) translate(0,-140%);'></span>");
            }
            this._htWElement["loading"] = jindo.$Element("<div>").css({
                "position" : "relative",
                "margin" : "0 auto"
            }).html(aHtml.join(""));
    },

    /**
        지정한 옵션값을 갱신한다.

        @method refresh
    **/
    refresh : function() {
        this._htWElement["loading"].css({
            "width" : this.option("nWidth") + "px",
            "height" : this.option("nHeight") + "px",
            "background" : this.option("sDefaultBackground")
        });
        if(this._htWElement["text"]) {
            this._htWElement["text"].html(this.option("sLoadingText"));
        }
    },

    /**
        텍스트 모듈을 만듦
    **/
    _createLoadingText : function() {
        this._htWElement["text"] = jindo.$Element("<div>").css({
            "margin" : "2px 0 0 0",
            "bottom" : 0,
            "width" : "100%",
            "text-align" : "center"
        });
        return this._htWElement["text"];
    },

    /**
        jindo.m.Loading 컴포넌트를 활성화한다.
        activate 실행시 호출됨
    **/
    _onActivate : function() {
        this._htEvent = {};
        this._htWElement["container"].appendTo(this._htWElement["base"]);
        if(this._isBody()) {
            this._htWElement["container"].css({
                "position" : "absolute",
                "top" : 0,
                "left" : 0,
                "width" : "100%",
                "height" : "100%"
            }).hide();
        } else {
            this._htWElement["container"].css({
                "position" : "relative"
            }).hide();
        }
        this.refresh();
    },

    /**
        jindo.m.Loading 컴포넌트를 비활성화한다.
        deactivate 실행시 호출됨
    **/
    _onDeactivate : function() {
        this._detachEvent();
        this._htWElement["container"].leave();
    },

    /**
        jindo.m.Loading 에서 사용하는 모든 객체를 release 시킨다.
        @method destroy
    **/
    destroy: function() {
        this.deactivate();
        for(var p in this._htWElement) {
            this._htWElement[p] = null;
        }
        this._htWElement = null;
    }
}).extend(jindo.m.UIComponent);/**
	@fileOverview 더보기 버튼을 클릭하여 지정된 개수만큼의 목록을 동적으로 추가하는 컴포넌트
	@author "oyang2"
	@version 1.7.1
	@since 2011. 7. 20.
**/
/**
	더보기 버튼을 클릭하여 지정된 개수만큼의 목록을 동적으로 추가하는 컴포넌트

	@class jindo.m.MoreContentButton
	@extends jindo.m.CorePagination
	@group Component

	@history 1.3.1 Update sClassPrefix + reminder 가 존재할 경우, 남은 건수를 표기
	@history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
	@history 1.2.0 Bug jindo mobile 2.0.x버전 문법 오류 수정
	@history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
	@history 0.9.0 Release 최초 릴리즈
**/
jindo.m.MoreContentButton = jindo.$Class({
	/* @lends jindo.m.MoreContentButton.prototype */
	/**
		초기화 함수

		@constructor
		@param {HTMLElement|String} sId 더보기 컴포넌트 기준 엘리먼트 아이디 혹은 엘리먼트
		@param {Object} [htOption] 초기화 옵션 객체
			@param {String} [htOption.sClassPrefix='more_'] 초기 HTML/CSS 구조에서 필요한 className 앞에 붙는 prefix 정보
			@param {Number} [htOption.nTotalItem=10] 실제 아이템의 전체 개수.
			화면에 전체 아이템 개수를 보여줄 값.<br />
			예를 들어 아이템 개수는 2만개 이고 더보기하여 로드할 아이템의 개수는 600개일 경우 nTotalItem에는 2만개를 세팅하고, nShowMaxItem에는 600개로 세팅한다. 전체 아이템 개수와 더보기할 아이템의 개수가 같을 경우 같은 값을 설정한다.
			@param {Number} [htOption.nShowMaxItem=10] 더보기 하여 화면에 보여줄 아이템의 최대 개수
			@param {Number} [htOption.nItemPerPage=10] 더보기 버튼을 클릭하였을 경우 추가될 아이템의 개수
			@param {Number} [htOption.nPage=1]
			@param {Boolean} [htOption.bActivateOnload=true]
			@param {Object} [htOption.htAjax={ sApi : null,
					htAjaxOption : { type: 'xhr' },
					htQuery : {},
					sStart : 'start',
					sDisplay : 'display' }] 더보기 할 때 마다 Ajax 호출이 필요하면 Ajax 호출에 대한 옵션을 설정한다.<br />
					Ajax 호출을 하지 않으면 이 값을 설정하지 않거나 null 값을 설정한다.<br />
				@param {Number} [htOption.htAjax.sApi=null] Ajax  호출이 필요한 경우 API 를 저장한다.<br /> Ajax 호출이 필요 없을 경우에는 null 값을 저장한다.
				@param {String} [htOption.htAjax.htAjaxOption={type : 'xhr'}] Ajax 호출시에 onload를 제외한 필요한 옵션값을 저장한다. 자세한 옵션 정보는 jindo.$Ajax의 옵션을 참고.
				@param {String} [htOption.htAjax.htQuery={}] Ajax 호출시에 필요한 아이템의 시작 위치(start) 필요한 아이템 개수 (display)를 제외한 파라미터가 있을 경우에는 HashTable 형식으로 저장한다. 기본값 : {}(비어있는 HashTable)
				@param {String} [htOption.htAjax.sStart="start"] Ajax 호출시에 필요한 아이템의 시작 위치(start)의 파라미터 이름을 설정한다.
				@param {String} [htOption.htAjax.sDisplay="display"] Ajax 호출시에 필요한 아이템 개수(display)의 파라미터 이름을 설정한다.
	**/
	$init : function(el, htOption) {
		this.option({
			sClassPrefix : 'more_',
			nTotalItem : 10, //실제 아이템 개수
			nShowMaxItem : 10, //최대 더보기 하여 보여줄 개수
			nItemPerPage : 10,
			nPage : 1,
			bActivateOnload : true,
			htAjax : {}
		});

		this.option(htOption || {});
		this.option('nItem', this.option('nShowMaxItem'));

		this._initVar();
		this._setWrapperElement(el);

		if(this.option("bActivateOnload")) {
			this.activate();
			this._nCurrentPage = this.option('nPage');
			this.updateInfo();
		}
	},

	/**
		jindo.m.MoreContentButton 에서 사용하는 모든 인스턴스 변수를 초기화한다.
	**/
	_initVar: function() {
		//this._nCurrentPage = this.option('nPage');
		var _htDefalutAjax = {
			sApi : null,
			htAjaxOption : {
				type: 'xhr'
			},
			htQuery : {},
			sStart : 'start',
			sDisplay : 'display'
		};

		var htAjax = this.option('htAjax');

		if(!htAjax){
			this.option('htAjax', _htDefalutAjax);
			return;
		}

		for(var p in _htDefalutAjax){
			if(typeof htAjax[p] == 'undefined'){
				htAjax[p] = _htDefalutAjax[p];
			}
		}

		//ajax option
		for( p in _htDefalutAjax.htAjaxOption){
			if(typeof htAjax.htAjaxOption[p] == 'undefined'){
				htAjax.htAjaxOption[p] = _htDefalutAjax.htAjaxOption[p];
			}
		}

		//query string option
		for( p in _htDefalutAjax.htQuery){
			if(typeof htAjax.htQuery[p]== 'undefined'){
				htAjax.htQuery[p] = _htDefalutAjax.htQuery[p];
			}
		}

		if(!!htAjax.sApi){
			//htAjax.htAjaxOption.onload = this._onAjaxResponse;
			this.oAjax = new jindo.$Ajax(htAjax.sApi, htAjax.htAjaxOption);
		}
	},

	/**
		jindo.m.MoreContentButton 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
	**/
	_setWrapperElement: function(el) {
		this._htWElement = {};
		var sClass = '.'+ this.option('sClassPrefix');
		this._htWElement.elBase = jindo.$Element(el);

		this._htWElement.elMoreButton = jindo.$Element(this._htWElement.elBase.query(sClass+'button'));
		this._htWElement.elTop = jindo.$Element(this._htWElement.elBase.query(sClass+'top'));
		this._htWElement.elLoading = jindo.$Element(this._htWElement.elBase.query(sClass+'loading'));
		this._htWElement.elMoreCnt = jindo.$Element(this._htWElement.elBase.query(sClass+'moreCnt'));

		this._htWElement.elTotal = jindo.$Element(this._htWElement.elBase.query(sClass+'total'));
		this._htWElement.elCurrent = jindo.$Element(this._htWElement.elBase.query(sClass+'current'));
		this._htWElement["elRemainder"] = jindo.$Element(this._htWElement.elBase.query(sClass+'remainder'));

		this._htWElement.elLast = jindo.$Element(this._htWElement.elBase.query(sClass+'last'));
		if(!!this._htWElement.elLast){
			this._htWElement.elLastTotal = jindo.$Element(this._htWElement.elLast.query(sClass+'total'));
			this._htWElement.elLastCurrent = jindo.$Element(this._htWElement.elLast.query(sClass+'current'));
			this._htWElement["elLastRemainder"] = jindo.$Element(this._htWElement.elLast.query(sClass+'remainder'));
		}
	},

	_onClickMore : function(oEvent){
		oEvent.stop(jindo.$Event.CANCEL_DEFAULT);
		if(this.hasNextPage()){
			this.more();
		}
	},

	_onClickTop : function(oEvent){
		oEvent.stop(jindo.$Event.CANCEL_DEFAULT);
		/**
			맨위로 버튼을 클릭할 때 발생한다.

			@event goTop
			@param {String} sType 커스텀 이벤트명
			@param {HTMLElement} element 클릭한 엘리먼트
			@param {Function} stop 호출 후에 영향 받는것 없다.

			@history 1.1.0 Update CustomEvent 추가
		**/
		this.fireEvent('goTop',{
			element : oEvent.element
		});
	},


	more : function(bFireEvent){
		if (typeof bFireEvent == "undefined") {
			bFireEvent = true;
		}
		var nPage = this._nCurrentPage +1;
		var nBeforePage = this.getCurrentPage();
		if(bFireEvent){
			/**
				더보기 수행전 발생한다.

				@event beforeMore
				@param {String} sType 커스텀 이벤트명
				@param {Number} nPage 더보기를 수행하여 이동할 페이지
				@param {Number} nCurrentPage 현재 페이지
				@param {Function} stop 더보기 수행을 중지한다.<br /> 'beforeMore' 이후 커스텀 이벤트 ('more')를 발생하지 않는다.
			**/
			if(!this.fireEvent('beforeMore',{
				nPage : nPage,
				nCurrentPage : nBeforePage
			})){
				return;
			}
		}
		var htIndex = this.getPageItemIndex(nPage);
		if(!htIndex){
			this.updateInfo();
			return;
		}

		this.showLoadingImg();

		if(!!this.option('htAjax').sApi){
			this._callAjax(nPage,true, bFireEvent);
		}else{
			this._move(nPage);
			if(bFireEvent){
				/**
					더보기 수행 이후에 발생한다

					@event more
					@param {String} sType 커스텀 이벤트명
					@param {Number} nPage 현재 페이지
					@param {Number} nStartIndex 현재 페이지의 아이템 시작 인덱스
					@param {Number} nEndIndex 현재 페이지의 아이템 끝 인덱스
					@param {jindo.$Ajax.Response} oResponse Ajax 호출 이후에 응답데이터<br />Ajax 호출 설정이 되어 있을때에만 값이 존재한다.
				**/
				this.fireEvent('more',{
					nPage : nPage,
					nStartIndex : htIndex.nStart,
					nEndIndex : htIndex.nEnd
				});
			}
			this.updateInfo();
		}
	},

	/**
		nPage 페이지로 이동한다.

		@method movePageTo
		@param {Number} nPage
		@param {Boolean} bFireEvent 커스텀 이벤트 발생 여부

	**/
	movePageTo : function(nPage, bFireEvent){
		if (typeof bFireEvent == "undefined") {
			bFireEvent = true;
		}

		var nBeforePage = this.getCurrentPage();
		if(bFireEvent){
			/**
				movePageTo 함수를 통해 페이지 이동 전에 발생한다.

				@event beforeMovePage
				@param {String} sType 커스텀 이벤트명
				@param {Number} nPage 이동할 페이지
				@param {Number} nCurrentPage (Number) :현재 페이지
				@param {Function} stop 페이지 이동을 중지한다. movePage가 발생하지 않는다.
				@history 1.1.0 Update CustomEvent 추가
			**/
			if(!this.fireEvent('beforeMovePage',{
				nPage : nPage,
				nCurrentPage : nBeforePage
			})){
				return;
			}
		}
		var htIndex = this.getPageItemIndex(nPage);
		if(!htIndex){
			this.updateInfo();
			return;
		}

		this.showLoadingImg();

		if(!!this.option('htAjax').sApi){
			this._callAjax(nPage, false ,bFireEvent);
		}else{
			this._move(nPage);

			if(bFireEvent){
				/**
					movePageTo 함수를 통해 페이지 이동전에 발생한다

					@event movePage
					@param {String} sType 커스텀 이벤트명
					@param {Number} nPage 현재 페이지
					@param {Number} nBeforePage 이동 전 페이지
					@param {Number} nStartIndex 첫번째 아이템의 인덱스
					@param {Number} nEndIndex 현재 페이지의 마지막 아이템의 인덱스
					@param {Function} stop 호출 후에 영향 받는것 없다.
					@history 1.1.0 Update CustomEvent 추가
				**/
				this.fireEvent('movePage',{
					nPage : nPage,
					nBeforePage : nBeforePage,
					nStartIndex : 0,
					nEndIndex : htIndex.nEnd
				});
			}
			this.updateInfo();
		}
	},

	_move : function(nPage){
		var n = this._convertToAvailPage(nPage);
		if(n != this._nCurrentPage){
			this._nCurrentPage = n;
		}

	},

	/**
		더보기 영역을 현재 페이지에 맞게 정보들을 설정한다.

		@method updateInfo
		@history 1.4.0 Bug setShowMaxItem(0)으로 설정후 updateInfo메소드 호출시 버그 수정
	**/
	updateInfo : function(){
		var nPage = this.getCurrentPage(),
			htIndex = this.getPageItemIndex(nPage);
		this.hideLoadingImg();
		if(nPage >= this.getTotalPages() ){
			if(this._htWElement.elBase){
				this._htWElement.elBase.addClass('u_pg_end');
			}
			if(this._htWElement.elMoreButton){
				this._htWElement.elMoreButton.hide();
			}
			if(this._htWElement.elLast){
				this._htWElement.elLast.show('block');
			}
		}else{
			if(this._htWElement.elBase){
				this._htWElement.elBase.removeClass('u_pg_end');
			}
			if(this._htWElement.elMoreButton){
				this._htWElement.elMoreButton.show('block');
			}
			if(this._htWElement.elLast){
				this._htWElement.elLast.hide();
			}
		}
		// current 처리
		if(!!this._htWElement.elCurrent && !!htIndex){
			var sText = htIndex.nEnd+1;
			this._htWElement.elCurrent.text(this._setNumberFormat(sText));
		}

		if(typeof this._htWElement.elLastCurrent != 'undefined' && this._htWElement.elLastCurrent && !!htIndex){
			this._htWElement.elLastCurrent.text(this._setNumberFormat(htIndex.nEnd+1));
		}

		// remainder 처리
		if(!!this._htWElement["elRemainder"] && !!htIndex){
			this._htWElement["elRemainder"].text(this._setNumberFormat(parseInt(this.option('nTotalItem'),10) - (htIndex.nEnd+1)));
		}

		if(!!this._htWElement["elLastRemainder"] && !!htIndex){
			this._htWElement["elLastRemainder"].text(this._setNumberFormat(parseInt(this.option('nTotalItem'),10) - (htIndex.nEnd+1)));
		}

		// total 처리
		if(!!this._htWElement.elTotal){
			this._htWElement.elTotal.text(this._setNumberFormat(this.option('nTotalItem')));
		}
		if(typeof this._htWElement.elLastTotal != 'undefined' && this._htWElement.elLastTotal){
			this._htWElement.elLastTotal.text(this._setNumberFormat(this.option('nTotalItem')));
		}

		if(!!this._htWElement.elMoreCnt && !!htIndex){
			var nCnt = Math.min(this.getItemPerPage(), this.getItemCount() - htIndex.nEnd-1);
			this._htWElement.elMoreCnt.text(this._setNumberFormat(nCnt));
		}
	},

	_callAjax : function(nPage, bMore ,bFireEvent){
		var self = this;
		this.oAjax.option('onload', null);

		this.oAjax.option('onload', function(res){
			self._onAjaxResponse(res, nPage, bMore, bFireEvent);
		});
		this.oAjax.request(this._getQueryString(nPage, bMore));
	},

	_onAjaxResponse : function(oResponse, nPage, bMore, bFireEvent){
		if(bFireEvent){
			this._move(nPage);
			var sEvent = bMore? 'more' : 'movePage';

			var htIndex = this.getPageItemIndex(nPage);

			this.fireEvent(sEvent,{
				oResponse : oResponse,
				nPage : nPage,
				nStartIndex : bMore? htIndex.nStart : 0,
				nEndIndex : htIndex.nEnd
			});
		}
		this.updateInfo();
	},

	_getQueryString : function(nPage, bMore){
		if(typeof bMore === 'undefined'){
			bMore = true;
		}
		var htQuery = this.option('htAjax').htQuery || {};

		var htIndex = this.getPageItemIndex(nPage);

		htQuery[this.option('htAjax').sStart] = bMore? htIndex.nStart : 0;
		htQuery[this.option('htAjax').sDisplay] = Math.min(this.getItemPerPage(), (this.getShowMaxItem() - htIndex.nStart));

		return htQuery;

	},

	_setNumberFormat: function(sText) {
		sText = sText.toString();
		var sReturn = "";
		var nDot = 0;
		var nLastPosition = sText.length;
		for (var i = nLastPosition; i >= 0; i--) {
			var sChar = sText.charAt(i);
			if (i > nLastPosition) {
				sReturn = sChar + sReturn;
				continue;
			}
			if (/[0-9]/.test(sChar)) {
				if (nDot >= 3) {
					sReturn = ',' + sReturn;
					nDot = 0;
				}
				nDot++;
				sReturn = sChar + sReturn;
			}
		}
		return sReturn;
	},

	/**
		로딩이미지를 보여준다
		@method showLoadingImg
	**/
	showLoadingImg : function(){
		if(!!this._htWElement.elLoading){
			this._htWElement.elLoading.show();
		}
	},

	/**
		로딩이미지를 감춘다
		@method hideLoadingImg
	**/
	hideLoadingImg : function(){
		if(!!this._htWElement.elLoading){
			this._htWElement.elLoading.hide();
		}
	},

	/**
		1페이지로 더보기를 다시 그린다. 커스텀이벤트는 발생하지 않는다.

		@method reset
		@param {Number} nShowMaxItem 더보기할 아이템의 개수가 바뀌었을 경우 설정해준다.

	**/
	reset : function(nShowMaxItem){
		if (typeof nShowMaxItem == "undefined") {
			nShowMaxItem = this.option('nShowMaxItem');
		}

		this.setShowMaxItem(nShowMaxItem);
		this.movePageTo(1, false);
	},
	/**
		전체 아이템 개수를 구한다.

		@method getTotalItem
		@return {Number}

	**/
	getTotalItem : function(){
		return this.option('nTotalItem');
	},

	/**
		전체 아이템 개수를 n으로 설정한다.

		@method setTotalItem
		@param {Number} n

	**/
	setTotalItem : function(n){
		this.option('nTotalItem', n);
	},

	/**
		더보기 할 전체 아이템 개수를 구한다.

		@method getShowMaxItem
		@return {Number}

	**/
	getShowMaxItem : function(){
		return this.option('nShowMaxItem');
	},

	/**
		더보기할 전체 아이템 개수를 n으로 설정한다.

		@method setShowMaxItem
		@param {Number} n
	**/
	setShowMaxItem : function(n){
		this.option('nShowMaxItem', n);
		this.option('nItem', n);
	},

	/**
		jindo.m.MoreContentButton 컴포넌트를 활성화한다.
		activate 실행시 호출됨
	**/
	_onActivate : function() {
		this._attachEvent();
	},

	/**
		jindo.m.MoreContentButton 컴포넌트를 비활성화한다.
		deactivate 실행시 호출됨
	**/
	_onDeactivate : function() {
		this._detachEvent();
	},

	/**
		jindo.m.MoreContentButton 에서 사용하는 모든 이벤트를 바인드한다.
	**/
	_attachEvent : function() {
		this._htEvent = {};
		if(!!this._htWElement.elMoreButton){
			this._htEvent["click_More"] = {
				ref : jindo.$Fn(this._onClickMore, this).attach(this._htWElement.elMoreButton, 'click'),
				el : this._htWElement.elMoreButton.$value()
			};
		}
		if(!!this._htWElement.elTop){
			this._htEvent["click_Top"] = {
				ref : jindo.$Fn(this._onClickTop, this).attach(this._htWElement.elTop, 'click'),
				el : this._htWElement.elTop.$value()
			};
		}
	},

	/**
		jindo.m.MoreContentButton 에서 사용하는 모든 이벤트를 해제한다.
	**/
	_detachEvent : function() {
		for(var p in this._htEvent) {
			var htTargetEvent = this._htEvent[p];
			htTargetEvent.ref.detach(htTargetEvent.el, p.substring(0, p.indexOf("_")));
		}

		this._htEvent = null;
	},

	/**
		jindo.$Ajax Header 값을 설정한다.

		@method header
		@see http://jindo.nhncorp.com/docs/jindo/archive/Jindo2-latest/ko/symbols/%24Ajax.html#header 참조
	**/
	header : function(vName, vValue) {
		if(this.oAjax) {
			return this.oAjax.header(vName, vValue);
		}
	},

	/**
		jindo.m.MoreContentButton 에서 사용하는 모든 객체를 release 시킨다.
		@method destroy
	**/
	destroy : function() {
		this._detachEvent();

		for(var p in this._htWElement) {
			this._htWElement[p] = null;
		}
		this._htWElement = null;
	}
}).extend(jindo.m.CorePagination);/**
	@fileOverview 페이지의 레이아웃을 잡는 UI 템플릿
	@author icebelle
	@version 1.7.1
	@since 2011. 06. 29.
**/
/**
	페이지의 레이아웃을 잡는 UI 템플릿

	@class jindo.m.PageLayoutUI
	@extends jindo.m.Component
	@uses jindo.m.Scroll
	@uses jindo.m.AlignFlipFlicking, jindo.m.CoverFlicking, jindo.m.FlickingAnimation, jindo.m.FlipFlicking, jindo.m.SlideFlicking {0,}
	@uses jindo.m.AjaxHistory {0,}
	@uses jindo.m.Loading {0,}
	@keyword pagination, page, 페이지, 목록
	@group UI Template
	
	@history 1.6.0 Bug 플리킹영역에 대각선 터치에 대해서 플리킹하지 않도록 수정
	@history 1.5.0 Support Window Phone8 지원
	@history 1.4.0 Support iOS 6 지원
	@history 1.4.0 Update [bUseFullScreen] 옵션 추가
	@history 1.4.0 Bug jindo2 1.4.7에서 스크립트 버그 수정<br />
						Flingking sClassPrefix 지정해도 적용되지 않는 버그 수정
	@history 1.3.0 Release 최초 릴리즈
**/
jindo.m.PageLayoutUI = jindo.$Class({
	/* @lends jindo.m.PageLayoutUI.prototype */
	/**
		초기화 함수

		@constructor
		@param {Object} [htOption] 초기화 옵션 객체
              @param {Number} [htOption.nDefaultIndex=0] 페이지 로딩시 초기에 보여져야할 페이지 인덱스번호 <br /> MultiContentLayout / MultiPageLayout일 경우에만 해당된다.
              @param {Boolean} [htOption.bUseLoading=false] 페이지 초기 로딩시 로딩레이어 사용여부
              @param {Function} [htOption.fnDomReady = null] 내부적으로 Layout 마크업이 생성된후에 호출되는 함수
              @param {Object} [htOption.htScrollOption = m.Scroll 생성자 ] Scroll 생성시 초기화 옵션 <br />  m.Scroll참고
              @param {Object} [htOption.htHistoryOption = m.AjaxHistory 생성자] AjaxHistory 생성시 초기화 옵션  <br />  m.AjaxHistory 참고 
              @param {Object} [htOption.htFlickingOption = m.Flikcing 생성자] Flicking 생성시 초기화 옵션  <br /> m.Flikcing 참고 
              @param {Object} [htOption.htLoadingOption = {m.Loading 생성자}] Loading 생성시 초기화 옵션  <br /> m.Loading 참고 
              

	**/
	$init : function(htOption) {
		this._initVar(htOption);
		this._showDefaultPage();

		// 로딩레이어 보이기
		this.showLoading();

		// Layout에 맞는 마크업 재구성
		this._checkLayout();
		this._rebuildLayout();

		// DomReady 콜백함수 수행
		if(htOption && htOption.fnDomReady && typeof htOption.fnDomReady == "function") {
			htOption.fnDomReady({
				welRoot : this.getRoot()
			});
		}

		// Scroll 컴포넌트 초기화
		this._initScrollManager();

		// page 초기화 처리
		if(this._bMultiPage) {
			this._initMultiPage(this._aPages, this._nDefaultIndex);
		} else {
			this._initPage(this._aPages[0], 0);
		}

		// 플리킹을 사용하지 않을 경우 각 페이지들의 위치를 0,0으로 잡아준다.
		if(!this._bUseFlicking) {
			if(this._bMultiPage) { this._setMultiPagePosition(); }
			else if(this._bMultiContent) { this._setMultiContentPosition(); }
		}

		// Flicking 컴포넌트 초기화
		if(this._bUseFlicking) { this._initFlicking(this._welFlickView.$value()); }

		this._attachEvent();

		// AjaxHistory 컴포넌트 초기화
		if(this._bUseAjaxHistory) { this._initAjaxHistory(); }
	},

	/**
		사용변수 초기화
		@param {Object} htOption 사용자 초기화 옵션
	**/
	_initVar : function(htOption) {
		htOption = htOption || {};
		this._htEvent = {};
		this._nCurrentIndex = htOption.nDefaultIndex || 0;
		this._htScrollOption = htOption.htScrollOption || {};
		this._htFlickingOption = htOption.htFlickingOption || {};
		this._htFlickingOption["sClassPrefix"] = this._htFlickingOption["sClassPrefix"] || "flick-";
		this._htFlickingOption["sContentClass"] = this._htFlickingOption["sContentClass"] || "ct";
		this._htHistoryOption = htOption.htHistoryOption || {};
		this._bUseLoading = htOption.bUseLoading || false;
		this._htLoadingOption = htOption.htLoadingOption || {};
		this._bUseFullScreen = htOption.bUseFullScreen || false;
		this._oTimeout = null;

		//this._oClientSize = jindo.$Document().clientSize();
		this._oClientSize = jindo.m._clientSize();
		//full screen 추가
		if(this._bUseFullScreen){
			this._oClientSize.height += jindo.m._getAdressSize();
		}

		this._welRoot = (htOption.vBaseElement) ? jindo.$Element(htOption.vBaseElement) : jindo.$Element(document.body);
		this._bUseRebuild = (this._welRoot.attr("markup") && this._welRoot.attr("markup").toUpperCase() == "DETAILED") ? false : true;
		this._aPages = jindo.$ElementList(this._welRoot.queryAll(".jmc-page")).$value();
		this._nPageCount = this._aPages.length;
		this._aContents = jindo.$ElementList(this._welRoot.queryAll(".jmc-content")).$value();
		this._nContentCount = this._aContents.length;
		this._bMultiPage = this._nPageCount > 1 ? true : false;
		this._bMultiContent = this._nContentCount > 1 ? true : false;

		/*
		console.log("	this._welRoot", this._welRoot)
		console.log("	this._bUseRebuild", this._bUseRebuild)
		console.log("	this._nPageCount", this._nPageCount)
		console.log("	this._nContentCount", this._nContentCount)
		console.log("  	this._bMultiPage : ", this._bMultiPage)
		console.log("	this._bMultiContent : ", this._bMultiContent)
		console.log("-----------------------------------------------------")
		console.log("	this._nCurrentIndex", this._nCurrentIndex)
		console.log("	this._htScrollOption", this._htScrollOption)
		console.log("	this._htFlickingOption", this._htFlickingOption)
		console.log("	this._htHistoryOption", this._htHistoryOption)
		console.log("  	this._bUseLoading : ", this._bUseLoading)
		console.log("	this._htLoadingOption", this._htLoadingOption)
		console.log("	this._oClientSize", this._oClientSize)
		console.log("=====================================================")
		*/
	},

	/**
		디폴트 페이지 show 처리
	**/
	_showDefaultPage : function() {
		// 멀티 페이지일 경우 디폴트 페이지만 우선 show 처리
		if(this._bMultiPage) { this._aPages[this._nCurrentIndex].show(); }
		if(this._bMultiContent) { this._aPages[0].show(); }
	},

	/**
		사용자가 설정한 Layout의 타입을 파악하는 함수
	**/
	_checkLayout : function() {
		var bFlicking = (this._welRoot.attr("flicking") && this._welRoot.attr("flicking").toUpperCase() == "YES") ? true : false;
		if(this._bMultiPage && bFlicking) {
			// 멀티페이지 플리킹
			this._bUseFlicking = true;
		} else if(!this._bMultiPage && this._nContentCount > 1 && bFlicking) {
			// 싱글페이지 다중컨텐츠
			this._bUseFlicking = true;
		} else {
			this._bUseFlicking = false;
		}
		//console.log("	this._bUseFlicking : ", this._bUseFlicking)

		if(this._bMultiPage || this._bMultiContent) {
			this._bUseAjaxHistory = true;
		} else {
			this._bUseAjaxHistory = false;
		}
		//console.log("	this._bUseAjaxHistory : ", this._bUseAjaxHistory)
	},

	/**
		Layout에 맞는 마크업을 재구성하는 함수
	**/
	_rebuildLayout : function() {
		//console.log("_rebuildLayout")
		if(this._bUseRebuild) {
			var elDocumentFragment = document.createDocumentFragment();
			var welFlickCT;
			// 멀티페이지에 플리킹 사용시 플리킹 컨테이너 생성
			if(this._bMultiPage && this._bUseFlicking) {
				this._welFlickView = jindo.$Element('<div class="' + this._htFlickingOption["sClassPrefix"] + 'view"></div>');
				var welFlickContainer = jindo.$Element('<div class="' + this._htFlickingOption["sClassPrefix"] + 'container"></div>');
				
				this._welFlickView.appendTo(elDocumentFragment);
				welFlickContainer.appendTo(this._welFlickView.$value());
			}

			for(var i = 0; i < this._nPageCount; i++) {
				// 각 페이지 내부의 레이아웃 처리
				var elPageLayout = this._rebuildPage(this._aPages[i]);
				this._aPages[i].append(elPageLayout);

				if(this._bMultiPage && this._bUseFlicking) {
					// 멀티페이지에 플리킹 사용시 각 페이지를 flick-ct로 append 처리
					welFlickCT = jindo.$Element('<div class="' + this._htFlickingOption["sClassPrefix"] + this._htFlickingOption["sContentClass"] + '"></div>');
					welFlickCT.appendTo(welFlickContainer.$value());
					this._aPages[i].appendTo(welFlickCT.$value());
				}

				this._aPages[i].show();
			}

			this._welRoot.append(elDocumentFragment);
		} else {
			if(this._bUseFlicking) {
				this._welFlickView = jindo.$Element(this._welRoot.query("." + this._htFlickingOption["sClassPrefix"] + "view"));
			}
			if(!this._bMultiPage && this._bMultiContent) {
				this._welContentView = jindo.$Element(this._welRoot.query(".jmc-content-view"));
			}
		}
	},

	/**
		jmc-page의 마크업을 재구성 하는 함수
		@param {jindo.$Element} welPage 기준 페이지(jmc-page) 엘리먼트
	**/
	_rebuildPage : function(welPage) {
		var elPageFragment = document.createDocumentFragment();

		var welScrollWrapper = jindo.$Element('<div class="scroll-wrapper"></div>');
		var welScroller = jindo.$Element('<div class="scroller"></div>');

		// 헤더 처리
		var welHeader = jindo.$Element(welPage.query(".jmc-header"));
		var bFixedHeader = (welHeader && welHeader.attr("position") == "fixed") ? true : false;
		//console.log("	bFixedHeader : ", bFixedHeader)
		if(bFixedHeader) {
			// 헤더 고정인 경우 스크롤 컨테이너 바깥에 삽입
			if(welHeader) { welHeader.appendTo(elPageFragment); }
		} else {
			// 헤더 고정이 아닌경우 스크롤 컨테이너 안쪽에 삽입
			if(welHeader) { welHeader.appendTo(welScroller.$value()); }
		}

		// 컨텐츠 처리
		if(!this._bMultiPage && this._bMultiContent) {
			// 싱글페이지의 다중 컨텐츠일 경우
			var aWelContents= jindo.$ElementList(welPage.queryAll(".jmc-content")).$value();
			var elFlickingContent = this._rebuildFlickingContent(aWelContents);
			elPageFragment.appendChild(elFlickingContent);
		} else {
			// 그 외의 모든 경우
			var welContent = jindo.$Element(welPage.query(".jmc-content"));
			welScrollWrapper.appendTo(elPageFragment);
			welScroller.appendTo(welScrollWrapper.$value());
			welContent.appendTo(welScroller.$value());
		}

		// 풋터 처리
		var welFooter = jindo.$Element(welPage.query(".jmc-footer"));
		var bFixedFooter = (welFooter && welFooter.attr("position") == "fixed") ? true : false;
		//console.log(" 	bFixedFooter : ", bFixedFooter)
		if(bFixedFooter) {
			// 풋터 고정인 경우 스크롤 컨테이너 바깥에 삽입
			if(welFooter) { welFooter.appendTo(elPageFragment); }
		} else {
			// 풋터 고정이 아닌경우 스크롤 컨테이너 안쪽에 삽입
			if(welFooter) { welFooter.appendTo(welScroller.$value()); }
		}

		return elPageFragment;
	},

	/**
		컨텐츠가 플리킹되는 Layout의 flicking되는 영역의 마크업을 재구성하는 함수
		@param {Array} aWelContents 컨텐츠 엘리먼트 배열
	**/
	_rebuildFlickingContent : function(aWelContents) {
		var elContentFragment = document.createDocumentFragment();
		var welFlickContainer;
		if(this._bUseFlicking) {
			this._welFlickView = jindo.$Element('<div class="' + this._htFlickingOption["sClassPrefix"] + 'view"></div>');
				welFlickContainer = jindo.$Element('<div class="' + this._htFlickingOption["sClassPrefix"] + 'container"></div>');

			this._welFlickView.appendTo(elContentFragment);
			welFlickContainer.appendTo(this._welFlickView.$value());
		} else {
			this._welContentView = jindo.$Element('<div class="jmc-content-view"></div>');
			this._welContentView.appendTo(elContentFragment);
		}

		var welFlickCT, welContentCT, welScrollWrapper, welScroller;
		for(var i = 0, len = aWelContents.length; i < len; i++) {
			welScrollWrapper = jindo.$Element('<div class="scroll-wrapper"></div>');
			welScroller = jindo.$Element('<div class="scroller"></div>');

			if(this._bUseFlicking) {
				// 다중 컨텐츠에 플리킹을 사용할 경우
				welFlickCT = jindo.$Element('<div class="' + this._htFlickingOption["sClassPrefix"] + this._htFlickingOption["sContentClass"] + '"></div>');
				welFlickCT.appendTo(welFlickContainer.$value());
				welScrollWrapper.appendTo(welFlickCT.$value());
			} else {
				welContentCT = jindo.$Element('<div class="jmc-content-ct" style="background-color:#fff;"></div>');
				welContentCT.appendTo(this._welContentView.$value());
				welScrollWrapper.appendTo(welContentCT.$value());
			}

			welScroller.appendTo(welScrollWrapper.$value());
			aWelContents[i].appendTo(welScroller.$value());
		}

		return elContentFragment;
	},

	/**
		이벤트 attach 처리함수
	**/
	_attachEvent : function() {
		// 기기회전 처리
		this._htEvent["rotate"] = jindo.$Fn(this._onResize, this).bind();
		jindo.m.bindRotate(this._htEvent["rotate"]);

		this._htEvent["load"] = jindo.$Fn(this._onLoad, this).attach(window, "load");
	},

	/**
		onLoad 이벤트 핸들러
	**/
	_onLoad : function() {
		//console.log("_onLoad")
		//var oClientSize = jindo.$Document().clientSize();
		var oClientSize = jindo.m._clientSize(this._bUseFullScreen);
		//alert(oClientSize.height  +  " , "+ jindo.m._getAdressSize());
		if(this._bUseFullScreen){
			oClientSize.height += jindo.m._getAdressSize();
		}

		// onLoad 시점에서 화면사이즈가 달라지는 케이스를 위한 예외처리
		if(this._oClientSize.height != oClientSize.height || this._oClientSize.width != oClientSize.width) {
			this._onResize();
		} else {
			// 로딩레이어 숨기기
			this.hideLoading();
		}

		this._hideAddress();
	},

	/**
		onResize 이벤트 핸들러
	**/
	_onResize : function() {
		if(this._oTimeout) {
			clearTimeout(this._oTimeout);
			this._oTimeout = null;
		}

		//this._oTimeout = setTimeout(jindo.$Fn(function() {
			//console.log("_onResize")
			//this._oClientSize = jindo.$Document().clientSize();
			this._oClientSize = jindo.m._clientSize(this._bUseFullScreen);
			if(this._bUseFullScreen){
				if(window.pageYOffset === 0){
					this._oClientSize.height +=  jindo.m._getAdressSize();
				}
			 }


			if(this._bMultiPage) {
				if(this._bUseFlicking) {
					// 플리킹이 되는 멀티페이지일 경우
					this._resizeFlicking();
					this._resizePage();
					this._resizeScroll();
				} else {
					// 단순 멀티페이지일 경우
					this._resizePage();
					this._resizeScroll();
				}
			} else {
				if(this._bMultiContent) {
					if(this._bUseFlicking) {
						// 플리킹이 되는 싱글페이지일 경우
						this._resizePage();
						this._resizeFlicking();
						this._resizeScroll();
					} else {
						// 플리킹이 안되는 싱글페이지일 경우
						this._resizePage();
						this._resizeContentView();
						this._resizeScroll();
					}
				} else {
					// 단순 싱글페이지일 경우
					this._resizePage();
					this._resizeScroll();
				}
			}

			// 로딩레이어 숨기기
			this.hideLoading();
		//}, this).bind(), 300);

		//주소창 감추는 코드 추가
		this._hideAddress();
	},

	/**
		주소창을 감추는 코드 추가
	**/
	_hideAddress : function(){
		if(this._bUseFullScreen){
			setTimeout(function(){
				window.scrollTo(0,1);
			},500);
		}
	},

	/**
		각 페이지의 리사이즈를 처라하는 함수
	**/
	_resizePage : function() {
		for(var i = 0; i < this.getPageCount(); i++) {
			this._aPages[i]["oPage"].resize(this._oClientSize);
		}
	},

	/**
		플리킹이 안되는 다중컨텐츠 영역의 리사이즈를 처리하는 함수
	**/
	_resizeContentView : function() {
		//console.log(this._welContentView)
		var htFlickSize = this._getFlickSize();
		this._welContentView.css({
			"position" : "relative",
			"width" : htFlickSize.width + "px",
			"height" : htFlickSize.height + "px"
		});
	},

	/**
		플리킹 영역의 리사이즈를 처리하는 함수
	**/
	_resizeFlicking : function() {
		if(!this._bUseFlicking) { return false; }

		var htFlickSize = this._getFlickSize();
		this._oFlicking.resize({
			"nFlickWidth" : htFlickSize.width,
			"nFlickHeight" : htFlickSize.height
		});
	},

	/**
		스크롤 영역의 리사이즈를 처리하는 함수
	**/
	_resizeScroll : function() {
		var aScrollSize = [];
		for(var i = 0; i < this.getPageCount(); i++) {
			aScrollSize.push({
				"nScrollWidth" : this._aPages[i]["oPage"].getNoneFixedWidth(),
				"nScrollHeight" : this._aPages[i]["oPage"].getNoneFixedHeight()
			});
		}
		this._oScroll.resize(aScrollSize);
	},

	/**
		로딩 컴포넌트 초기화 처리함수
	**/
	_initLoading : function() {
		if(!this._bUseLoading) { return false; }
		//console.log("_initLoading")

		this._oLoading = new jindo.m.Loading(null, this._htLoadingOption);
		this._oLoading.show();
	},

	/**
		스크롤 컴포넌트 관리모듈을 초기화 함수
	**/
	_initScrollManager : function() {
		this._oScroll = new jindo.m.PageLayoutUI.ScrollManager({
			"oPageLayout" : this,
			"htOption" : this._htScrollOption
		});
	},

	/**
		스크롤 컴포넌트 생성 함수

		@method addScroll
		@param {Object} htScrollOption 스크롤 컴포넌트 초기화 옵션
	**/
	addScroll : function(htScrollOption) {
		this._oScroll.addScroll(htScrollOption);
	},

	/**
		MultiPageLayout의 DOM 초기화 처리함수

		@param {Array} aPages	페이지 정보 배열
		@param {Number} nDefaultIndex	디폴트 페이지 인덱스
	**/
	_initMultiPage : function(aPages, nDefaultIndex) {
		//console.log("_initMultiPage")
		for(var i = 0; i < this.getPageCount(); i++) {
			this._initPage(aPages[i], i);
		}
	},

	/**
		SinglePage가 플리킹을 사용하지 않을때 Position 초기화 처리함수
	**/
	_setMultiContentPosition : function() {
		if(!this._bMultiContent ) { return false; }
		//console.log("_setMultiContentPosition")

		this._resizeContentView();
		this._aContentCT = jindo.$ElementList(this._welRoot.queryAll(".jmc-content-ct")).$value();
		var nZIndex;
		for(var i = 0; i < this.getContentCount(); i++) {
			nZIndex = (i === this._nCurrentIndex) ? 10 : 1;
			this._aContentCT[i].css({
				"top" : "0px",
				"left" : "0px",
				"position" : "absolute",
				"overflow" : "hidden",
				"zIndex" : nZIndex
			});
		}
	},

	/**
		MultiPage가 플리킹을 사용하지 않을때 Position 초기화 처리함수
	**/
	_setMultiPagePosition : function() {
		if(!this._bMultiPage) { return false; }
		//console.log("_setMultiPagePosition")

		var nZIndex;
		for(var i = 0; i < this.getPageCount(); i++) {
			nZIndex = (i === this._nCurrentIndex) ? 10 : 1;
			this._aPages[i]["welPage"].css({
				"top" : "0px",
				"left" : "0px",
				"position" : "absolute",
				"overflow" : "hidden",
				"zIndex" : nZIndex
			});
		}
	},

	/**
		jmc-page의 초기화 함수

		@param {jindo.$Element} welPage	페이지 엘리먼트
		@parma {Number} nPageIndex		디폴트 페이지 인덱스
	**/
	_initPage : function(welPage, nPageIndex) {
		//console.log("_initPage", welPage)
		this._aPages[nPageIndex] = {
			"welPage" : welPage,
			"oPage" : new jindo.m.PageLayoutUI.Page(welPage.$value(), {
				"oPageLayout" : this,
				"nIndex" : nPageIndex,
				"nCurrentIndex" :  this._nCurrentIndex,
				"htPageSize" : this._oClientSize
			})
		};
	},

	/**
		플리킹 컴포넌트 초기화 함수
		@param {Element} elFlickView	 플리킹 기준(flick-view) 엘리먼트
	**/
	_initFlicking : function(elFlickView) {
		//console.log("_initFlicking")
		var htFlickSize = this._getFlickSize();
		//console.log(htFlickSize);
		this._oFlicking = jindo.m.PageLayoutUI.Flicking;
		this._oFlicking.init(elFlickView, {
			"oPageLayout" : this,
			"nDefaultIndex" : this._nCurrentIndex,
			"nFlickWidth" : htFlickSize.width,
			"nFlickHeight" : htFlickSize.height,
			"htOption" : this._htFlickingOption
		});
	},

	/**
		히스토리 컴포넌트 초기화 함수
	**/
	_initAjaxHistory : function() {
		//console.log("_initAjaxHistory");
		this._oAjaxHistory = jindo.m.PageLayoutUI.AjaxHistory;

		this._oAjaxHistory.init({
			"oPageLayout" : this,
			"htOption" : this._htHistoryOption
		});
	},

	/**
		플리킹 영역의 사이즈 반환함수
	**/
	_getFlickSize : function() {
		var htFlickSize = {};

		if(this._bMultiPage) {
			htFlickSize = this._oClientSize;

		} else {
			htFlickSize["width"] = this._aPages[0]["oPage"].getNoneFixedWidth();
			htFlickSize["height"] = this._aPages[0]["oPage"].getNoneFixedHeight();
		}
		return htFlickSize;
	},

	/**
		현재 보여지는 영역의 인덱스 반환함수

		@method getCurrentIndex
		@return {Number} nCurrentIndex	 현재 페이지 인덱스
	**/
	getCurrentIndex : function() {
		if(this._bUseFlicking) {
			this._nCurrentIndex = this._oFlicking.getCurrentIndex();
		}
		return this._nCurrentIndex;
	},

	/**
		전체 페이지 개수 반환함수

		@method getPageCount
		@return {Number} nPageCount	 전체 페이지 개수
	**/
	getPageCount : function() {
		return this._nPageCount;
	},

	/**
		전체 컨텐츠 개수 반환함수

		@method getContentCount
		@return {Number} nContentCount	 전체 컨텐츠 개수
	**/
	getContentCount : function() {
		var nContentCount;
		if(this._bMultiPage) {
			nContentCount = this.getPageCount();
		} else {
			nContentCount = this._oScroll.getScrollCount();
		}
		return nContentCount;
	},

	/**
		컨텐츠 엘리먼트 반환함수

		@method getContentCT
		@param {Number} nContentIndex	컨텐츠 인덱스
		@return {jindo.$Element} welContentCT	nContentIndex에 해당하는 컨텐츠 엘리먼트
	**/
	getContentCT : function(nContentIndex) {
		return this._aContentCT[nContentIndex];
	},

	/**
		루트 엘리먼트 반환 함수
		@method getRoot
		@return {jindo.$Element} welRoot	루트 엘리먼트
	**/
	getRoot : function() {
		var welRoot;
		if(this._bMultiPage && this._bUseFlicking) {
			welRoot = this._welFlickView;
		} else {
			welRoot = this._welRoot;
		}
		return welRoot;
	},

	/**
		jmc-page를 구성하는 header, content, footer를 반환하는 함수

		@method getPage
		@param {Number} nIndex	페이지 인덱스
		@return {HahTable / Array} Page	nIndex에 해당하는 페이지 엘리먼트 정보
	**/
	getPage : function(nIndex) {
		var vPage;
		if(typeof nIndex == "undefined") {
			vPage = [];
			for(var i = 0; i < this.getContentCount(); i++) {
				vPage.push(this._getPage(i));
			}
		} else {
			vPage = this._getPage(nIndex);
		}

		//console.log("vPage", vPage)
		return vPage;
	},

	/**
		페이지 엘리먼트 정보를 반환하는 함수

		@param {Number} nIndex	페이지 인덱스
		@return {HahTable} htPage	nIndex에 해당하는 페이지 엘리먼트 정보
	**/
	_getPage : function(nIndex) {
		var nPageIndex;
		//console.log("this._bMultiPage", this._bMultiPage)
		if(this._bMultiPage) {
			nPageIndex = nIndex;
		} else {
			nPageIndex = 0;
		}
		var oPage = this._aPages[nPageIndex]["oPage"];
		//console.log("oPage", oPage)

		var htPage = {
			"welHeader" : jindo.$Element(oPage.getHeader()),
			"welContent" : this._oScroll.getScrollContent(nIndex),
			"welFooter": jindo.$Element(oPage.getFooter())
		};
		//console.log("htPage", htPage)

		return htPage;
	},

	/**
		페이지의 내용 업데이트 시 후처리 함수
		@method refresh
	**/
	refresh : function() {
		this._onResize();
	},

	/**
		히스토리 추가시 처리함수
		@method addHistory
	**/
	addHistory : function() {
		this._oAjaxHistory.addHistory();
	},

	/**
		히스토리가 변경시 처리함수

		@method changeHistory
		@param {Number} nIndex	페이지 인덱스
	**/
	changeHistory : function(nIndex) {
		if(this._bUseFlicking) {
			this._oFlicking.moveTo(nIndex);
		} else {
			this.moveTo(nIndex);
		}
	},

	/**
		페이지 이동 처리함수

		@method moveTo
		@param {Number} nIndex	페이지 인덱스
	**/
	moveTo : function(nIndex) {
		if(typeof nIndex == "undefined") { return false; }

		if(this._bUseFlicking) {
			this._oFlicking.moveTo(nIndex);
		} else {
			if(!this.onBeforeMovePage({
				"nContentsIndex" : this.getCurrentIndex(),
				"nContentsNextIndex" : nIndex
			})) { return; }
			this.show(nIndex);
			this.onAfterMovePage({
				"nContentsIndex" : nIndex
			});
		}
	},

	/**
		nIndex에 해당하는 영역의 노출 처리함수

		@method show
		@param {Number} nIndex	페이지 인덱스
	**/
	show : function(nIndex) {
		if(typeof nIndex == "undefined") { return false; }

		this.hide(this.getCurrentIndex());
		if(this._bMultiPage) {
			this._aPages[nIndex]["oPage"].show();
		} else if(this._bMultiContent) {
			this._aPages[0]["oPage"].showContentView(nIndex);
		}

		this._nCurrentIndex = nIndex;
	},

	/**
		nIndex에 대당하는 영역의 숨김 처리함수

		@method hide
		@param {Number} nIndex	페이지 인덱스
	**/
	hide : function(nIndex) {
		if(typeof nIndex == "undefined") { nIndex = this._nCurrentIndex; }

		if(this._bMultiPage) {
			this._aPages[nIndex]["oPage"].hide();
		} else if(this._bMultiContent) {
			this._aPages[0]["oPage"].hideContentView(nIndex);
		}

		/*
		if(!this._bUseFicking) {
			this._aPages[nIndex]["oPage"].hide();
		}*/
	},

	/**
		@method showLoading
	**/
	showLoading : function() {
		if(!this._bUseLoading) { return false; }
		//console.log("showLoading")
		if(!this._oLoading) { this._initLoading(); }
		this._oLoading.show();
	},

	/**
		@method hideLoading
	**/
	hideLoading : function() {
		if(!this._bUseLoading) { return false; }
		//console.log("hideLoading")
		this._oLoading.hide();
	},

	/**
		플리킹 영역에 touchstart가 발생하는 순간 수행되는 함수

		@method onTouchStartFlicking
		@param {Object} oCustomEvent	이벤트 객체
	**/
	onTouchStartFlicking : function(oCustomEvent){
		return this.fireEvent("touchStart", {
			sType : "touchStart",
			element : oCustomEvent.element,
			nX : oCustomEvent.nX,
			nY : oCustomEvent.nY
		});
	},

	/**
		페이지 이동전 수행되는 함수

		@method onBeforeMovePage
		@param {Object} oCustomEvent	이벤트 객체
	**/
	onBeforeMovePage : function(oCustomEvent) {
		/**
			페이지가 이동되기 전에 발생 (MultiPageLayout일 경우에만 해당됨)

			@event beforeMovePage
			@param {String} sType 커스텀 이벤트명
			@param {Number} nCurrentPage 현재 페이지의 인덱스 번호
			@param {Number} nPage 이동할 페이지의 인덱스 번호
			@param {Function} stop 수행시 페이지가 이동되지 않음
		**/
		return this.fireEvent("beforeMovePage", {
			sType : "beforeMovePage",
			nCurrentPage : oCustomEvent.nContentsIndex,
			nPage : oCustomEvent.nContentsNextIndex,
			bLeft : oCustomEvent.bLeft
		});
	},

	/**
		페이지 이동후 수행되는 함수

		@method onAfterMovePage
		@param {Object} oCustomEvent	이벤트 객체
	**/
	onAfterMovePage : function(oCustomEvent) {
		// 히스토리 정보 세팅
		if(this._bUseAjaxHistory) { this.addHistory(); }
		/**
			페이지가 이동된 후에 발생 (MultiPageLayout일 경우에만 해당됨)

			@event afterMovePage
			@param {String} sType 커스텀 이벤트명
			@param {Number} nCurrentPage 현재 페이지의 인덱스 번호
		**/
		this.fireEvent("afterMovePage", {
			sType : "afterMovePage",
			nCurrentPage : oCustomEvent.nContentsIndex
		});
	}
}).extend(jindo.m.Component);





/**
	각 페이지(jmc-page)를 관리하는 Page 컴포넌트 인스턴스 생성 및 관리
**/
jindo.m.PageLayoutUI.Page = jindo.$Class({
	$init : function(el,htOption) {
		//console.log("== jindo.m.PageLayoutUI.Page ==")
		this._initVar(el,htOption);
		this._setWrapperElement();
		this._setFixedArea();

		this._initScroll();
	},

	/**
		변수 초기화 처리함수
	**/
	_initVar : function(el, htOption) {
		this._welPage = jindo.$Element(el);
		this._oPageLayout = htOption.oPageLayout;
		this._nIndex = htOption.nIndex;
		this._htPageSize = htOption.htPageSize;
		this._htWElement = {};
	},

	/**
		엘리먼트 정보 처리함수
	**/
	_setWrapperElement : function() {
		this._htWElement["header"] = jindo.$Element(this._welPage.query(".jmc-header"));
		this._htWElement["footer"] = jindo.$Element(this._welPage.query(".jmc-footer"));

		//console.log("this._htWElement", this._htWElement)
	},

	/**
		jindo.m.Page 컴포넌트를 활성화한다.
		activate 실행시 호출됨
	**/
	_onActivate : function() {
	},

	/**
		jindo.m.Page 컴포넌트를 비활성화한다.
			activate 실행시 호출됨
	**/
	_onDeactivate : function() {
	},

	/**
		고정영역 정보 처리함수
	**/
	_setFixedArea : function() {
		this._bHeaderFixed = this._htWElement["header"] && this._htWElement["header"].attr("position") == "fixed" ? true : false;
		this._bFooterFixed = this._htWElement["footer"] && this._htWElement["footer"].attr("position") == "fixed" ? true : false;
		//console.log("this._bHeaderFixed", this._bHeaderFixed)
		//console.log("this._bFooterFixed", this._bFooterFixed)
	},

	/**
		스크롤 처리 함수
	**/
	_initScroll : function() {
		this._oPageLayout.addScroll({
			"welBaseElement" : this._welPage,
			"nScrollWidth" : this.getNoneFixedWidth(),
			"nScrollHeight" : this.getNoneFixedHeight()
		});
	},

	/**
		welTarget의 높이값 반환함수
		@param {jindo.$Element} welTarget 대상 엘리먼트
		@return {Number} nHeight	높이값
	**/
	_getHeight : function(welTarget) {
		var nHeight = welTarget.$value().offsetHeight;
		//Layer에 마진이 있는경우 렌더링 보정.
		nHeight += parseInt(welTarget.css('marginTop'), 10) + parseInt(welTarget.css('marginBottom'), 10) || 0;

		return nHeight;
	},

	/**
		헤더영역 높이 반환함수
		@return {Number} nHeaderHeight 헤더 높이값
	**/
	_getHeaderHeight : function() {
		var nHeaderHeight = this._getHeight(this._htWElement["header"]);
		return nHeaderHeight;
	},

	/**
		풋터영역 높이 반환함수
		@return {Number} nFooterHeight 풋터 높이값
	**/
	_getFooterHeight : function() {
		var nFooterHeight = this._getHeight(this._htWElement["footer"]);
		return nFooterHeight;
	},

	/**
		리사이즈 처리함수
		@param {Object} htPageSize 페이지 사이즈 정보 변수
	**/
	resize : function(htPageSize) {
		//console.log("Page >> resize >> htPageSize", htPageSize.width, htPageSize.height)
		//this._htPageSize = htPageSize || jindo.$Document().clientSize();
		this._htPageSize = htPageSize || jindo.m._clientSize();

		/*this._oScroll.resize({
			"nScrollWidth" : this.getNoneFixedWidth(),
			"nScrollHeight" : this.getNoneFixedHeight()
		});*/
	},

	/**
		고정영역을 제외한 영역의 너비 반환함수
		@return {Number} nNoneFixedWidth 비고정 영역 너비값
	**/
	getNoneFixedWidth : function() {
		var nScrollWidth = this._htPageSize.width;
		return nScrollWidth;
	},

	/**
		고정영역을 제외한 영역의 높이 반환함수
		@return {Number} nNoneFixedHeight 비고정 영역 높이값
	**/
	getNoneFixedHeight : function() {
		var nHeight = this._htPageSize.height;
		var nNoneFixedHeight;
		if(this._bHeaderFixed) {
			if(this._bFooterFixed) {
				// 상단, 하단 고정
				nNoneFixedHeight = parseInt(nHeight - this._getHeaderHeight() - this._getFooterHeight(), 10);
			} else {
				// 상단만 고정
				nNoneFixedHeight = parseInt(nHeight - this._getHeaderHeight(), 10);
			}
		} else {
			if(this._bFooterFixed) {
				// 하단만 고정
				nNoneFixedHeight = parseInt(nHeight - this._getFooterHeight(), 10);
			} else {
				// 고정없음
				nNoneFixedHeight = nHeight;
			}
		}

		return nNoneFixedHeight;
	},

	/**
		헤더 엘리먼트 반환함수
		@return {jindo.$Element} welHeader	헤더 엘리먼트
	**/
	getHeader : function() {
		return this._htWElement["header"] ? this._htWElement["header"].$value() : null;
	},

	/**
		풋터 엘리먼트 반환함수
		@return {jindo.$Element} welFooter	풋터 엘리먼트
	**/
	getFooter : function() {
		return this._htWElement["footer"] ? this._htWElement["footer"].$value() : null;
	},

	/**
		nContentIndex에 해당하는 컨텐츠 보이기 처리함수
		@param {Number} nContentIndex 컨텐츠 인덱스 번호
	**/
	showContentView : function(nContentIndex) {
		//console.log("Page >> showContentView ", nContentIndex);
		var welContentView = this._oPageLayout.getContentCT(nContentIndex);
		//welContentView.show();
		welContentView.css({ "zIndex" : 10 });
	},

	/**
		nContentIndex에 해당하는 컨텐츠 숨기기 처리함수
		@param {Number} nContentIndex 컨텐츠 인덱스 번호
	**/
	hideContentView : function(nContentIndex) {
		//console.log("Page >> hideContentView ", nContentIndex);
		var welContentView = this._oPageLayout.getContentCT(nContentIndex);
		welContentView.css({ "zIndex" : 1 });
		//welContentView.hide();
	},

	/**
		보이기 처리 함수
	**/
	show : function() {
		//console.log("Page >> show ");
		//this._welPage.show();
		this._welPage.css({ "zIndex" : 10 });
	},

	/**
		숨기기 처리 함수
	**/
	hide : function() {
		//console.log("Page >> hide ");
		this._welPage.css({ "zIndex" : 1 });
		//this._welPage.hide();
	}
});





/**
	Scroll 컴포넌트 인스턴스 생성 및 관리
**/
jindo.m.PageLayoutUI.ScrollManager = jindo.$Class({
	$init : function(htOption) {
		//console.log("== jindo.m.PageLayoutUI.ScrollManager ==")
		this._initVar(htOption);
	},

	/**
		변수 초기화 처리 함수
	**/
	_initVar : function(htOption) {
		this._aScrolls = [];
		this._aScrollOptions = [];
		this._oPageLayout = htOption.oPageLayout;
		this._htOption = htOption.htOption;
		this._nTotalScrollCnt = 0;
	},

	/**
		스크롤 추가 처리 함수
	**/
	addScroll : function(htScrollOption) {
		//console.log("**addScroll", htScrollOption, this._oPageLayout._bMultiPage)

		this._aScrollWrappers = jindo.$ElementList(htScrollOption.welBaseElement.queryAll(".scroll-wrapper")).$value();
		this._nTotalScrollCnt += this._aScrollWrappers.length;
		var nWidth = htScrollOption.nScrollWidth;
		var nHeight = htScrollOption.nScrollHeight;

		var welScrollWrapper, welScroller, welContent;
		var oScroll, htOption;
		// 스크롤 옵션 생성
		htOption = this._htOption || {};
		htOption["nWidth"] = nWidth;
		htOption["nHeight"] = nHeight;
		for(var i = 0, nLen = this._aScrollWrappers.length; i < nLen; i++) {
			// console.log("	scroll : " + i)
			// 스크롤 인스턴스 생성
			welScrollWrapper = this._aScrollWrappers[i];
			oScroll = new jindo.m.Scroll(welScrollWrapper.$value(), htOption);
			welContent = jindo.$Element(welScrollWrapper.query(".jmc-content"));
			welContent.show();
			oScroll.refresh();

			// 컨텐츠가 적어서 스크롤이 안생겼을 경우
			if(!oScroll.hasVScroll()) {
				// console.log('--?');
				welScroller = jindo.$Element(welScrollWrapper.query(".scroller"));
				welScroller.css({
					"width" : nWidth + "px",
					"height" : (nHeight-1) + "px"
				});
			}

			// 스크롤 관련정보 저장
			this._aScrolls.push(oScroll);
			htOption = {
				"welWrapper" : welScrollWrapper,
				"welScroller" : welScroller,
				"welContent" : welContent,
				"nWidth" : nWidth,
				"nHeight" : nHeight
			};
			this._aScrollOptions.push(htOption);
		}
	},

	/**
		전체 생성된 스크롤 개수 반환함수
		@return  {Number} nScrollCount	스크롤개수
	**/
	getScrollCount : function() {
		 return this._aScrolls.length;
	},

	/**
		nIndex에 해당하는 스크률의 Wrapper 엘리먼트 반환함수
		@param {Number} nIndex 스크롤 인덱스
		@return {jindo.$element||array} vWrapper	Wrapper엘리먼트 || Wrapper엘리먼트 배열
	**/
	getScrollWrapper : function(nIndex) {
		var vWrapper;
		if(typeof nIndex == "undefined") {
			vWrapper = this._aScrollWrappers;
		} else {
			vWrapper = this._aScrollWrappers[nIndex];
		}
		return vWrapper;
	},

	/**
		nIndex에 해당하는 스크롤의 Contnet 엘리먼트 반환함수
		@param {Number} nIndex 스크롤 인덱스
		@return {jindo.$element||array} vContent	Content엘리먼트 || Content엘리먼트 배열
	**/
	getScrollContent : function(nIndex) {
		var vContent;
		if(typeof nIndex == "undefined") {
			vContent = [];
			for(var i = 0, nLen = this._aScrollOptions.length; i < nLen; i++) {
				vContent.push(this._aScrollOptions[nIndex]["welContent"]);
			}
		} else {
			vContent = this._aScrollOptions[nIndex]["welContent"];
		}
		return vContent;
	},

	/**
		리사이즈 처리 함수
		@param {Array} aScrollSize	스크롤 영역 사이즈 정보 배열
	**/
	resize : function(aScrollSize) {
		//console.log("ScrollManager >> resize >> htScrollSize")
		var oSize, nWidth, nHeight;
		for(var i = 0, nLen = this._aScrolls.length; i < nLen; i++) {
			oSize = aScrollSize[i] || aScrollSize[0];
			nWidth = oSize.nScrollWidth;
			nHeight = oSize.nScrollHeight;
			//console.log(nWidth, nHeight)

			// 컨텐츠가 적어서 스크롤이 안생겼을 경우
			if(!this._aScrolls[i].hasVScroll()) {
				this._aScrollOptions[i].welScroller.css({
					"width" : nWidth + "px",
					"height" : nHeight + "px"
				});
			}

			// Wrapper 리사이즈 처리
			this._aScrolls[i].option({
				"nWidth" : nWidth,
				"nHeight" : nHeight
			});
			this._aScrolls[i].refresh();

			// 리사이즈 처리된 값 저장
			this._aScrollOptions[i]["nWidth"] = nWidth;
			this._aScrollOptions[i]["nHeight"] = nHeight;
		}
	}
});




/**
	Flicking 컴포넌트 인스턴스 생성 및 관리
**/
jindo.m.PageLayoutUI.Flicking = {
	init : function(elFlickView, htOption) {
		//console.log("== jindo.m.PageLayoutUI.Flicking ==")
		this._initVar(elFlickView, htOption);
		this._setFlickingArea();

		// 플리킹 인스턴스 생성
		htOption = this._htOption;
		htOption["bAutoResize"] = false;
		htOption["nDefaultIndex"] = this._nCurrentIndex;
		htOption["bUseDiagonalTouch"] = false;
		this._oFlicking = new jindo.m.Flicking(this._welFlickView.$value(), htOption);
		// 커스텀이벤트 attach
		this._oFlicking.attach({
			"touchStart" : jindo.$Fn(this._onTouchStartFlicking, this).bind(),
			"beforeFlicking" : jindo.$Fn(this._onStartFlicking, this).bind(),
			"afterFlicking" : jindo.$Fn(this._onEndFlicking, this).bind(),
			"move" : jindo.$Fn(this._onEndFlicking, this).bind()
		});
	},

	/**
		변수 초기화 처리 함수
	**/
	_initVar : function(elFlickView, htOption) {
		this._welFlickView = jindo.$Element(elFlickView);
		this._oPageLayout = htOption.oPageLayout;
		this._nWidth = htOption.nFlickWidth;
		this._nHeight = htOption.nFlickHeight;
		this._nCurrentIndex = htOption.nDefaultIndex;
		this._htOption = htOption.htOption || {};
		this._aFlickingContents = jindo.$ElementList(this._welFlickView.queryAll("." + this._htOption.sClassPrefix + this._htOption.sContentClass)).$value();
		this._aInnerContents = jindo.$ElementList(this._welFlickView.queryAll(".jmc-content")).$value();
	},

	/**
		플리킹 영역을 엘리먼트 초기설정을 처리한다.
	**/
	_setFlickingArea : function() {
		this._welFlickView.css({
			"width" : this._nWidth + "px",
			"height" : this._nHeight + "px"
		});

		var elFlickingContent;
		for(var i = 0, nLen = this._aFlickingContents.length; i < nLen; i++) {
			elFlickingContent = this._aFlickingContents[i];
			elFlickingContent.css({
				"float" : "left",
				"width" : "100%",
				"height" : "100%"
			});
		}
	},

	/**
	 *@description 플리킹 영역에 touchstart가 발생하는 순
	**/
	_onTouchStartFlicking : function(oCustomEvt){
		if(this._oPageLayout.onTouchStartFlicking(oCustomEvt)){
			return true;
		}else{
			//플리킹 취소
			if(oCustomEvt.stop) {
				oCustomEvt.stop();
			} else {
				return false;
			}
		}

	},

	/**
		beforeFlicking에 수행되는 함수
		@param {Object} oCustomEvent	이벤트 객체
	**/
	_onStartFlicking : function(oCustomEvent) {
		if(this._oPageLayout.onBeforeMovePage(oCustomEvent)) {
			return true;
		} else {
			// 플리킹이 취소된 경우 처리
			if(oCustomEvent.stop) {
				oCustomEvent.stop();
			} else {
				return false;
			}
		}
	},

	/**
		afterFlicking에 수행되는 함수
		@param {Object} oCustomEvent	이벤트 객체
	**/
	_onEndFlicking : function(oCustomEvent) {
		var nCurrentIndex = oCustomEvent.nContentsIndex;
		//console.log("Flicking >> resize >> _onEndFlicking", "현재 페이지 nCurrentIndex", nCurrentIndex)

		// 페이지 이동처리
		this._oPageLayout.onAfterMovePage(oCustomEvent);
	},

	/**
		리사이즈 처리함수
		@param {Object} htFlickSize	리사이즈 정보 변수
	**/
	resize : function(htFlickSize) {
		//console.log("Flicking >> resize >> htScrollSize", htFlickSize.nFlickWidth, htFlickSize.nFlickHeight)
		this._nWidth = htFlickSize.nFlickWidth;
		this._nHeight = htFlickSize.nFlickHeight;

		// 플리킹 영역 리사이즈
		this._welFlickView.css({
			"width" : this._nWidth + "px",
			"height" : this._nHeight + "px"
		});
		this._oFlicking.refresh();
	},

	/**
		현재 패널의 인덱스 반환함수

		@method getCurrentIndex
		@return {Number} nCurrentIndex	현재 패널의 인덱스 번호
	**/
	getCurrentIndex : function() {
		return this._oFlicking.getContentIndex();
	},

	/**
		nIndex에 해당하는 패널로 이동처리 함수

		@method moveTo
		@param {Number} nIndex		플리킹 패널의 인덱스 번호
	**/
	moveTo : function(nIndex, nDuration) {
		if(typeof nIndex == "undefined") { return false; }

		// 터치로 인한 플리킹이 아니라 moveTO로 바로 호출되었을때 커스텀 이벤트 처리
		if(!this._onStartFlicking({
			"nContentsIndex" : this._oFlicking.getContentIndex(),
			"nContentsNextIndex" : nIndex
		})) { return; }
		this._oFlicking.moveTo(nIndex, nDuration);
	}
};





/**
	AjaxHistory 컴포넌트 인스턴스 생성 및 관리
**/
jindo.m.PageLayoutUI.AjaxHistory = {
	init : function(htOption) {
		//console.log("== jindo.m.PageLayoutUI.AjaxHistory ==")
		this._initVar(htOption);

		// AjaxHistory 인스턴스 생성
		this._oAjaxHistory = new jindo.m.AjaxHistory(this._htOption);

		// 커스텀이벤트 attach
		this._oAjaxHistory.attach({
			"load" : jindo.$Fn(this._onLoadHistory, this).bind(),
			"change" : jindo.$Fn(this._onChangeHistory, this).bind()
		});

		this._oAjaxHistory.initialize();
	},

	/**

	**/
	_initVar : function(htOption) {
		this._oPageLayout = htOption.oPageLayout;
		this._htOption = htOption.htOption;
	},

	/**
		초기 로딩시 히스토리 처리함수
	**/
	_onLoadHistory : function(oCustomEvent) {
		//console.log("AjaxHistory >> _onLoadHistory");
		this.addHistory(true);
	},

	/**
		히스토리에 변경이 발생시 수행되는 함수
	**/
	_onChangeHistory : function(oCustomEvent) {
		//console.log("AjaxHistory >> _onChangeHistory >> ", decodeURIComponent(jindo.$Json(oCustomEvent.htHistoryData).toString()));
		var htData = jindo.$Json(oCustomEvent.htHistoryData).toObject();
		this._oPageLayout.changeHistory(htData.page);
	},

	/**
		히스토리 추가 처리함수
	**/
	addHistory : function(bLoad) {
		//console.log("AjaxHistory >> _addHistory >> currentIndex", this._oPageLayout.getCurrentIndex());
		this._oAjaxHistory.addHistory({
			"page" : this._oPageLayout.getCurrentIndex()
		}, bLoad);
	}
};
/**
	@fileOverview 여러개의 항목들을 페이지 형태로 표현해 주는 컴포넌트
	@author "oyang2"
	@version 1.7.1
	@since 2011. 7. 22.
**/
/**
	여러개의 항목들을 페이지 형태로 표현해 주는 컴포넌트

	@class jindo.m.PageNavigation
	@extends jindo.m.CorePagination
	@keyword pagination, page, 페이지, 목록
	@group Component
	@update

	@history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
	@history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
	@history 0.9.0 Release 최초 릴리즈
**/
jindo.m.PageNavigation = jindo.$Class({
	/* @lends jindo.m.PageNavigation.prototype */
	/**
		초기화 함수

		@constructor
		@param {Object} [htOption] 초기화 옵션 객체
			@param {String} [htOption.sClassPrefix='page_'] 초기 HTML/CSS 구조에서 필요한 className 앞에 붙는 prefix 정보
			@param {Number} [htOption.nItem=10] 전체 아이템 개수
			@param {Number} [htOption.nItemPerPage=10] 한페이지당 보여줄 아이템의 개수
			@param {Number} [htOption.nPage=1] 현재페이지
			@param {Boolean} [htOption.bActivateOnload=true] 컴포넌트 로드시 activate() 수행여부
			@param {HTMLElement} [htOption.sInfoTemplate={=PAGE} / {=TOTALPAGE}] info 엘리먼트내에 innerHTML로 들어갈 마크업 템플릿.
				<ul>
				<li>{=PAGE} 의 경우 현재 페이지로 치환된다.</li>
				<li>{=TOTALPAGE} 의 경우 전체 페이지수로 치환된다.</li>
				<li>{=STARTINDEX} 의 경우 현재 페이지의 아이템 시작 인덱스로 치환된다.</li>
				<li>{=ENDINDEX} 의 경우 현재페이지의 아이템 끝 인덱스로 치환된다.</li>
				</ul>
			@param {String} [htOption.htAjax={
					sApi : null,
					htAjaxOption : { type: 'xhr' },
					htQuery : {},
					sPage : 'page',
					sDisplay : 'display' }
					] 더보기 할 때 마다 Ajax 호출이 필요하면 이 Ajax 호출에 대한 옵션을 설정한다.<br />
				Ajax 호출을 하지 않으면 이 값을 설정하지 않거나 null 값을 설정 한다.<br />
				@param {Number} [htOption.htAjax.sApi=null] Ajax 호출이 필요한 경우 API 를 저장한다.
					Ajax 호출이 필요 없을 경우에는 null 값을 저장한다.
				@param {HTMLElement} [htOption.htAjax.htAjaxOption=type : 'xhr']  Ajax 호출시에 onload를 제외한 필요한 옵션값을 저장한다.
					자세한 옵션 정보는 jindo.$Ajax의 옵션을 참고
				@param {HTMLElement} [htOption.htAjax.htQuery={}] Ajax 호출시에 필요한 현재 페이지 정보(page) 필요한 아이템 개수 (display)를 제외한
					파라미터가 있을 경우에는 HashTable 형식으로 저장한다.<br />
					기본값 : {}(비어있는 HashTable)
				@param {String} [htOption.htAjax.sPage='page'] Ajax 호출시에 필요한 현재 페이지 정보의 파라미터 이름을 설정한다.
				@param {String} [htOption.htAjax.sDisplay='display'] Ajax 호출시에 필요한 아이템 개수(display)의 파라미터 이름을 설정한다.
			@param {Boolean} [htOption.bUseCircular=false] 네비게이션 순환여부를 결정한다.
		@history 1.7.0 Update [bUseCircular] 옵션 추가
	**/
	$init : function(el, htOption) {
		this.option({
			sClassPrefix : 'page_',
			nItem : 10, //아이템 개수
			nItemPerPage : 10,
			nPage : 1,
			bActivateOnload : true,
			sInfoTemplate : '{=PAGE} / {=TOTALPAGE}',
			bUseCircular : false,
			htAjax : {}
		});
		this.option(htOption || {});
		this._initVar();
		this._setWrapperElement(el);

		if(this.option("bActivateOnload")) {
			this.activate();
			this._nCurrentPage = this.option('nPage');
		}
	},
	/**
		jindo.m.MoreContentButton 에서 사용하는 모든 인스턴스 변수를 초기화한다.
	**/
	_initVar: function() {
		var _htDefalutAjax = {
			sApi : null,
			htAjaxOption : {
				type: 'xhr'
			},
			htQuery : {},
			sPage : 'page',
			sDisplay : 'display'
		};

		var htAjax = this.option('htAjax');

		if(!htAjax){
			this.option('htAjax', _htDefalutAjax);
			return;
		}

		for(var p in _htDefalutAjax){
			if(typeof htAjax[p] == 'undefined'){
				htAjax[p] = _htDefalutAjax[p];
			}
		}

		//ajax option
		for( p in _htDefalutAjax.htAjaxOption){
			if(typeof htAjax.htAjaxOption[p] == 'undefined'){
				htAjax.htAjaxOption[p] = _htDefalutAjax.htAjaxOption[p];
			}
		}

		//query string option
		for( p in _htDefalutAjax.htQuery){
			if(typeof htAjax.htQuery[p]== 'undefined'){
				htAjax.htQuery[p] = _htDefalutAjax.htQuery[p];
			}
		}

		if(!!htAjax.sApi){
			this.oAjax = new jindo.$Ajax(htAjax.sApi, htAjax.htAjaxOption);
		}
	},

	/**
		jindo.m.PageNavigation 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
	**/
	_setWrapperElement: function(el) {
		this._htWElement = {};
		el = jindo.$(el);
		var sClass = '.'+this.option('sClassPrefix');

		this._htWElement.elBase = jindo.$Element(el);

		this._htWElement.elPrev = jindo.$Element(jindo.$$.getSingle(sClass+'prev', el));
		this._htWElement.elNext = jindo.$Element(jindo.$$.getSingle(sClass+'next', el));
		this._htWElement.elPrevOff = jindo.$Element(jindo.$$.getSingle(sClass+'prev-off', el));
		this._htWElement.elNextOff = jindo.$Element(jindo.$$.getSingle(sClass+'next-off', el));
		this._htWElement.elInfo = jindo.$Element(jindo.$$.getSingle(sClass+'info', el));

	},

	_onClickPrev : function(oEvent){
		oEvent.stop();
		if(!this.hasPreviousPage()) {
			if(this.option("bUseCircular")) {
				this.movePageTo(this.getTotalPages());
			}
			return;
		}

		var nPage = this.getCurrentPage();
		this.movePageTo(nPage-1);

	},

	_onClickNext : function(oEvent){
		oEvent.stop();
		if(!this.hasNextPage()) {
			if(this.option("bUseCircular")) {
				this.movePageTo(1);
			}
			return;
		}
		var nPage = this.getCurrentPage();
		this.movePageTo(nPage+1);
	},

	/**
		n 페이지로 이동합니다.

		@method movePageTo
		@param {Number} n
		@param {Boolean} bFireEvent 커스텀 이벤트 발생 여부
	**/
	movePageTo : function(n, bFireEvent){
		if(typeof bFireEvent == 'undefined'){
			bFireEvent = true;
		}

		if(bFireEvent){
			if(!this._fireEventBefore(n)){ return;}
		}

		if(!!this.option('htAjax').sApi){
			this._callAjax(n, bFireEvent);
		}else{
			this._move(n);
			if(bFireEvent){
				this._fireEventEnd();
			}
			this.updateInfo();
			this.updateNavigation();
		}

	},

	_move : function(n){
		var nPage = this._convertToAvailPage(n);
		if(nPage != this._nCurrentPage){
			this._nCurrentPage = nPage;
		}
	},

	_callAjax : function(nPage, bFireEvent){

		var self = this;
		this.oAjax.option('onload', null);

		this.oAjax.option('onload', function(res){
			self._onAjaxResponse(res, nPage ,bFireEvent);
		});
		this.oAjax.request(this._getQueryString(nPage));

	},

	_fireEventBefore : function(nPage){
		/**
			페이지 이동하기 직전에 발생한다.

			@event beforeMove
			@param {String} sType 커스텀 이벤트명
			@param {Number} nPage 이동하려는 페이지
			@param {Number} nCurrentPage 현재 페이지
			@param {Number} nItemCount 전체 아이템 개수
			@param {Number} nItemPerPage 한페이지당 보여줄 아이템의 개수
			@param {Number} nTotalPages 전체 페이지 수
			@param {Function} stop 페이지이동을 수행을 중지한다.<br /> 'beforeMove' 이후의 커스텀 이벤트 'move'는 발생하지 않는다.
			@history 1.7.0 Update nItem, nItemPerPage 속성 추가
		**/
		return this.fireEvent('beforeMove', {
			nPage : nPage,
			nCurrentPage: this.getCurrentPage(),
			nItemCount : this.getItemCount(),
			nItemPerPage : this.getItemPerPage(),
			nTotalPages : this.getTotalPages()
		});
	},

	_fireEventEnd : function(oResponse){
		if(typeof oResponse == 'undefined'){
			oResponse = null;
		}
		var nPage = this.getCurrentPage();
		var htIndex = this.getPageItemIndex(nPage);
		/**
			페이지 이동이후 발생한다

			@event move
			@param {String} sType 커스텀 이벤트명
			@param {Number} nPage 현재 페이지
			@param {Number} nItemCount 전체 아이템 개수
			@param {Number} nItemPerPage 한페이지당 보여줄 아이템의 개수
			@param {Number} nTotalPages 전체 페이지 수
			@param {Number} nStartIndex 현재페이지의 시작 인덱스 (0부터 시작값)
			@param {Number} nEndIndex 현재페이지의 끝 인덱스 (0부터 시작값)
			@param {jindo.$Ajax.Response} oResponse Ajax 호출시 응답 객체<br /> Ajax 호출 설정이 되어 있을때에만 값이 존재한다.
			@history 1.7.0 Update nItem, nItemPerPage 속성 추가
		**/
		return this.fireEvent('move',{
			nPage : this.getCurrentPage(),
			nStartIndex : htIndex.nStart,
			nEndIndex : htIndex.nEnd,
			oResponse : oResponse,
			nItemCount : this.getItemCount(),
			nItemPerPage : this.getItemPerPage(),
			nTotalPages : this.getTotalPages()
		});
	},

	_onAjaxResponse : function(oResponse, nPage, bFireEvent){
		this._move(nPage);

		if(bFireEvent){
			this._fireEventEnd(oResponse);
		}

		this.updateInfo();
		this.updateNavigation();
	},

	_getQueryString : function(n){
		var htQuery = this.option('htAjax').htQuery || {};
		var htIndex = this.getPageItemIndex(n);

		htQuery[this.option('htAjax').sPage] = n;
		htQuery[this.option('htAjax').sDisplay] = Math.min(this.getItemPerPage(), (this.getItemCount() - htIndex.nStart));

		return htQuery;
	},

	/**
		현재페이지에 맞게 정보 영역을 업데이트 합니다.

		@method updateInfo
	**/
	updateInfo : function(){
		if(!this._htWElement.elInfo){ return;}

		var nPage = this.getCurrentPage();
		var htIndex = this.getPageItemIndex(nPage);

		var sText = this.option('sInfoTemplate').replace(/\{=PAGE\}/,nPage).replace(/\{=TOTALPAGE\}/, this.getTotalPages())
		.replace(/\{=ITEMCOUT\}/, this.option('nItem')).replace(/\{=STARTINDEX\}/,htIndex.nStart+1).replace(/\{=ENDINDEX\}/,htIndex.nEnd+1);

		this._htWElement.elInfo.html(sText);
	},

	/**
		현재페이지에 맞게 이전, 이후 링크 정보를 업데이트 합니다.

		@method updateNavigation
	**/
	updateNavigation : function(){
		var nPage = this.getCurrentPage();

		if(!!this._htWElement.elPrev) {this._htWElement.elPrev.hide();}
		if(!!this._htWElement.elNext) {this._htWElement.elNext.hide();}
		if(this._htWElement.elPrevOff) {this._htWElement.elPrevOff.hide();}
		if(this._htWElement.elNextOff) {this._htWElement.elNextOff.hide();}

		if(this.getTotalPages() == 1){
			return;
		}

		if(this.option("bUseCircular")) {
			if(!!this._htWElement.elPrev){this._htWElement.elPrev.show('inline-block');}
			if(!!this._htWElement.elNext){this._htWElement.elNext.show('inline-block');}
		} else {
			if(nPage == 1){
				if(!!this._htWElement.elPrevOff) {this._htWElement.elPrevOff.show('inline-block');}
				if(!!this._htWElement.elNext){this._htWElement.elNext.show('inline-block');}
			}else if (nPage == this.getTotalPages()){
				if(!!this._htWElement.elNextOff){this._htWElement.elNextOff.show('inline-block');}
				if(!!this._htWElement.elPrev){this._htWElement.elPrev.show('inline-block');}
			}else{
				if(!!this._htWElement.elPrev){this._htWElement.elPrev.show('inline-block');}
				if(!!this._htWElement.elNext){this._htWElement.elNext.show('inline-block');}
			}
		}

	},

	/**
		1페이지로 더보기를 다시 그린다. 커스텀이벤트는 발생하지 않는다.

		@method reset
		@param {Number} nItem 아이템의 개수가 바뀌었을 경우 설정해준다.
	**/
	reset : function(nItem){
		if (typeof nItem == "undefined") {
			nItem = this.option('nItem');
		}

		this.setItemCount(nItem);
		this.movePageTo(1, false);
	},

	/**
		jindo.m.PageNavigation 컴포넌트를 활성화한다.
		activate 실행시 호출됨
	**/
	_onActivate : function() {
		this._attachEvent();
	},

	/**
		jindo.m.PageNavigation 컴포넌트를 비활성화한다.
		deactivate 실행시 호출됨
	**/
	_onDeactivate : function() {
		this._detachEvent();
	},

	/**
		jindo.m.PageNavigation 에서 사용하는 모든 이벤트를 바인드한다.
	**/
	_attachEvent : function() {
		this._htEvent = {};
		if(!!this._htWElement.elNext){
			this._htEvent["click_Next"] = {
				ref : jindo.$Fn(this._onClickNext, this).attach(this._htWElement.elNext, 'click'),
				el : this._htWElement.elNext.$value()
			};
		}
		if(!!this._htWElement.elPrev){
			this._htEvent["click_Prev"] = {
				ref : jindo.$Fn(this._onClickPrev, this).attach(this._htWElement.elPrev, 'click'),
				el : this._htWElement.elPrev.$value()
			};
		}

	},

	/**
		jindo.m.PageNavigation 에서 사용하는 모든 이벤트를 해제한다.
	**/
	_detachEvent : function() {
		for(var p in this._htEvent) {
			var htTargetEvent = this._htEvent[p];
			htTargetEvent.ref.detach(htTargetEvent.el, p.substring(0, p.indexOf("_")));
		}
		this._htEvent = null;
	},

	/**
		jindo.m.PageNavigation 에서 사용하는 모든 객체를 release 시킨다.
		@method destroy
	**/
	destroy : function() {
		this.deactivate();

		for(var p in this._htWElement) {
			this._htWElement[p] = null;
		}
		this._htWElement = null;
	}
}).extend(jindo.m.CorePagination);/**
	@fileOverview 안드로이드 이벤트 투과 방지 컴포넌트
	@author sculove
	@version 1.7.1
	@since 2012. 2. 6
**/
/**
	안드로이드 이벤트 투과 방지 컴포넌트

	@class jindo.m.PreventClickEvent
	@extends jindo.m.UIComponent
	@keyword preventclickevent
	@group Component

	@history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
	@history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
	@history 1.1.0 Release 최초 릴리즈
**/
jindo.m.PreventClickEvent = jindo.$Class({
	/* @lends jindo.m.PreventClickEvent.prototype */
	/**
		초기화 함수

		@constructor
		@param {Object} [htOption] 초기화 옵션 객체
			@param {Boolean} [htOption.bActivateOnload=true] 컴포넌트 로드시 activate 여부
			@param {String} [htOption.sClassPrefix="evt-"] 이벤트 통과 엘리먼트 지정 Class Prefix
	**/
	$init : function(el, htOption) {
		this.option({
			 bActivateOnload : true,
			 sClassPrefix : "evt-"
		});
		this.option(htOption || {});
		this._setWrapperElement(el);
		if(this.option("bActivateOnload")) {
			this.activate();
		}
	},

	/**
		jindo.m.PreventClickEvent 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
	**/
	_setWrapperElement: function(el) {
		this._htWElement = {};
		this._htWElement["target"] = jindo.$Element(el);
	},

	/**
		jindo.m.PreventClickEvent 컴포넌트를 비활성화한다.
		deactivate 실행시 호출됨
	**/
	_onDeactivate : function(){
		this._detachEvents();
	},

	/**
		jindo.m.PreventClickEvent 컴포넌트를 활성화한다.
		activate 실행시 호출됨
	**/
	_onActivate : function(){
		this._attachEvents();
	},

	/**
		jindo.m.PreventClickEvent 사용하는 이벤트 attach 한다
	**/
	_attachEvents : function(){
		this._htEvent ={};
		this._htEvent["prevent"] = jindo.$Fn(this._onPrevent, this).attach(this._htWElement["target"], "touchstart");
	},


	/**
		jindo.m.PreventClickEvent 사용하는 이벤트 detach 한다
	**/
	_detachEvents : function(){
		this._htEvent["prevent"].detach(this._htWElement["target"], "touchstart");
		this._htEvent["prevent"] = null;
	},

	/**
		이벤트 방지 모듈
	**/
	_onPrevent : function(we) {
		var wel = jindo.$Element(jindo.m.getNodeElement(we.element));
		if(!wel.hasClass(this.option("sClassPrefix") + "except")) {
			we.stop(jindo.$Event.CANCEL_ALL);

			/**
				기준엘리먼트에서 이벤트가 중지된 경우, 사용자 이벤트가 발생

				@event prevent
				@param {String} sType 커스텀 이벤트명
				@param {$Element} wel 이벤트가 중지된 엘리먼트
			**/
			this.fireEvent("prevent", {
				wel : wel
			});
			return false;
		} else {
			/**
				기준엘리먼트에서 이벤트가 통과된 경우, 사용자 이벤트가 발생

				@event expand
				@param {String} sType 커스텀 이벤트명
				@param {$Element} wel 이벤트가 통과된 엘리먼트
			**/
			this.fireEvent("pass", {
				wel : wel
			});
		}
	},

	/**
		jindo.m.PreventClickEvent 에서 사용하는 모든 객체를 release 시킨다.
		@method destroy
	**/
	destroy : function() {
		this.deactivate();
		for(var p in this._htWElement) {
			this._htWElement[p] = null;
		}
		this._htWElement = null;
		this._htEvent = null;
	}
}).extend(jindo.m.UIComponent);
/**
	@fileOverview 안드로이드 이벤트 투과 방지 컴포넌트
	@author mania
	@version 1.7.1
	@since 2012. 2. 25
**/
/**
	기본 플리킹에서 좌/우 컨텐츠를 미리 보여주는 컴포넌트 

	@class jindo.m.PreviewFlicking
	@extends jindo.m.UIComponent
	@uses jindo.m.Touch
	@keyword previewflicking
	@group Component
	@new

	@history 1.7.0 Release 최초 릴리즈
**/
jindo.m.PreviewFlicking = jindo.$Class({
	/*  @lends jindo.m.PreviewFlicking.prototype */
	
	/**
        초기화 함수

		@constructor
		@param {String|HTMLElement} el 플리킹 기준 Element (필수)
		@param {Object} [htOption] 초기화 옵션 객체
		@param {Number} [htOption.nDefaultIndex=0] 초기 로드시의 화면에 보이는 콘텐츠의 인덱스
		@param {String} [htOption.sClassPrefix='flick-'] Class의 prefix명
		@param {String} [htOption.sContentClass='ct'] 컨텐츠 영역의 class suffix명
		@param {String} [htOption.sBaseClass='base'] 컨텐츠를 아우르는 영역의 class suffix명
		@param {String} [htOption.nMinWidth=''] 컴포넌트의 최소 넓이 
		@param {Number} [htOption.nDuration=100] 슬라이드 애니메이션 지속 시간
		@param {Number} [htOption.nFlickThreshold=40] 콘텐츠가 바뀌기 위한 최소한의 터치 드래그한 거리 (pixel)
		@param {Boolean} [htOption.bUseCircular=false] 순환플리킹여부를 지정한다. true로 설정할 경우 5판이 연속으로 플리킹된다.
		@param {Boolean} [htOption.bAutoResize=true] 화면전환시에 리사이즈에 대한 처리 여부
		@param {Number} [htOption.nBounceDuration=100] nFlickThreshold 이하로 움직여서 다시 제자리로 돌아갈때 애니메이션 시간
		@param {Boolean} [htOption.bUseCss3d=jindo.m._isUseCss3d(true)] css3d(translate3d) 사용여부<br />
		    모바일 단말기별로 다르게 설정된다. 상세내역은 <auidoc:see content="jindo.m">[jindo.m]</auidoc:see>을 참조하기 바란다.
		@param {Boolean} [htOption.bUseTimingFunction=jindo.m._isUseTimingFunction()] 애니메이션 동작방식을 css의 TimingFunction을 사용할지 여부<br />false일 경우 setTimeout을 이용하여 애니메이션 실행.<br />
		모바일 단말기별로 다르게 설정된다. 상세내역은 <auidoc:see content="jindo.m">[jindo.m]</auidoc:see>을 참조하기 바란다.
		@param {Boolean} [htOption.bUseTranslate=true] css의 translate 속성을 사용할지 여부<br /> false일 경우 "left" 속성을 이용함.
		@param {Boolean} [htOption.bUseDiagonalTouch=true] 대각선스크롤 방향으 터치도 플리킹으로 사용할지 여부
		@param {Boolean} [htOption.bActivateOnload=true] 컴포넌트 로드시 activate 여부
    **/
	$init : function(sEl, htUserOption){
		this.option({
			nDefaultIndex : 0,
			sClassPrefix : 'flick-',
			sContentClass : 'ct',
			sBaseClass : 'base',
			nMinWidth : "",
			nDuration : 100,
			nFlickThreshold : 40,
			bUseCircular : false,
			bAutoResize : true,
			nBounceDuration : 100,
			bUseCss3d : jindo.m._isUseCss3d(true), //css3d사용여부 bUseTranslate가 true 일때만 사
			bUseTimingFunction : jindo.m._isUseTimingFunction(true), //스크립트방식으로 애니메이션을 사용할지 csstimingfunction을 사용할지 여부
			bUseTranslate : true, 	//css의 translate를 사용할지 style 속성의 left속성 사용할지 여부
			bActivateOnload : true,
			bUseDiagonalTouch : true //대각선스크롤을 플리킹에 사용할지 여부
		});
		
		this.option(htUserOption || {});
		this._sEl = sEl;
		this._setWrapperElement();
		
		this._initVar();
		this._createDummyTag();

		if(this.option("bActivateOnload")) {
			this.activate();
		}
		
	},  

	/**
	 * 플리킹 내부에서 쓰는 엘리먼트를 저장한다.
	 */
	_setWrapperElement : function(){
		this._htWElement = {};
		var el = jindo.$(this._sEl);
		var sClass = '.'+ this.option("sClassPrefix");

		this._htWElement.base = jindo.$Element(jindo.$$.getSingle(sClass+this.option('sBaseClass'),el));
		this._htWElement.container = jindo.$Element(jindo.$$.getSingle(sClass+'container',el));
		var aContents = jindo.$$(sClass+this.option('sContentClass'), el);

		this._htWElement.aPanel= jindo.$A(aContents).forEach(function(value,index, array){
			array[index] = jindo.$Element(value);
		}).$value();
		
		//ie10 대응 코드
		if(typeof this._htWElement.base.$value().style.msTouchAction !== 'undefined'){
			this._htWElement.base.css('msTouchAction','none');
		}
	},

	/**
	 *  jindo.m.PreViewFlicking 에서 사용하는 모든 인스턴스 변수를 초기화한다.
	 */
	_initVar: function() {
		this._htPosition = {};
		this._sTranslateStart = "translate(";
        	this._sTranslateEnd = ")";
		this._doFlicking = false;
		this._bTouchStart  = false;
		this._bMove = false;
		this._sCssPrefix = jindo.m.getCssPrefix();
		this._fnDummyFnc = function(){return false;};
		this._wfTransitionEnd = jindo.$Fn(this._onTransitionEnd, this).bind();
		this._bClickBug = jindo.m.hasClickBug();

		var htInfo = jindo.m.getDeviceInfo();
		this._bAndroid = htInfo.android && (!htInfo.bChrome);
		this._nVersion = htInfo.version;
		//더미 엘리먼트를 만들어서 focus 호출해야 하는 것들
		this._bDummyTagException = (this._bAndroid && (this._nVersion < "3") ); 
         
		var nDefaultIndex = this.option("nDefaultIndex");
		this._htIndexInfo = {
			nContentIndex : nDefaultIndex, 
			nNextContentIndex : nDefaultIndex,
			welElement : this._htWElement.aPanel[nDefaultIndex],
			welNextElement : this._htWElement.aPanel[nDefaultIndex],
			sDirection : null
		};
	},

	/**
	 * 플리킹 내부에서 사용하는 터치컴포넌트 인스턴스 생성한다.
	 */	
	_initTouch : function(){
		this._oTouch = new jindo.m.Touch(jindo.$(this._sEl),{
			nSlopeThreshold : 4,
			nMoveThreshold : 0,
			nEndEventThreshold : (jindo.m.getDeviceInfo().win)? 400:0,
			bActivateOnload : true
		});

	},

	/**
	 * 플리킹을 초기화 하기 위한 초기 셋팅 처리를 한다.
	 */
	_initFlicking : function(){
		this._setElementStyle();
		this._prepareFlicking();
		this._attachEvent();
		this._setPanelPos();

		for ( var i = 0 , nFor = this._htWElement.aPanel.length ; i < nFor ; i++ ){
			this._htWElement.aPanel[i].css("left", (i*20)+ "%");
		}
	},

	/**
	 *  플리킹에 필요한 스타일을 추가한다.
	 */
	_setElementStyle : function() {
		
		jindo.$Element(this._sEl).css("overflow","hidden");
		this._htWElement.base.css({
			"position" : "relative",
			"width" : "50%",
			"min-width" : this.option("nMinWidth").replace(/\D/gi, "") + "px",
			"margin" : "0 auto"
		});

		this._htWElement.container.css({
			"position" : "relative",
			"width" : this._htWElement.aPanel.length * 100 + "%"
		});
		this._htWElement.container.css('clear','both');
		var self = this;

		jindo.$A(this._htWElement.aPanel).forEach(function(value,index, array){
			var wel = value;
			if(self.option('bUseCircular')){
				wel.css('position', 'absolute');
			}
			wel.css({
				"left" : 0,
				"float" : "left",
				"width" : (100 / self._htWElement.aPanel.length)  +"%"
			});
		});
	},

	/**
	 * 판넬의 위치 정의
	 */
	_setPanelPos : function(){
		var el = this._htWElement.base.$value();
		var nW = el.clientWidth;
		this._nDefaultSize = nW;

		if(this.option('bUseCircular')){
			this._htPosition.htPanel = {
				left : -100,
				center : -100,
				right : -100
			};
			this._htPosition.htContainer = {
				left: nW * -1,
				center : 0,
				right : nW 
			};
		}else{
			this._htPosition.aPos = [];
			var sLen = 'width';
			var nPos = 0;
			var nBeforePos = 0;
			for(var i=0,nLen = this._htWElement.aPanel.length; i<nLen;i++){
				if(i != 0){
						nPos += this._htWElement.aPanel[i-1][sLen]()*-1;
				}           
				this._htPosition.aPos.push(nPos);     
			}
		}
	},

	/**
	 * 애니메이션 작업전에 각 패널및 컨테이너의 설정값을 설정한다. 
	 */
	_prepareFlicking : function(){
		// css3d 사용
		if(this.option('bUseCss3d')){
			this._sTranslateStart = "translate3d(";
			this._sTranslateEnd = ",0px)";
		}

		for(var i=0, nLen =  this._htWElement.aPanel.length; i<nLen; i++){
			if(this.option('bUseTranslate')){
				this._htWElement.aPanel[i].css(this._sCssPrefix + 'Transform', this._sTranslateStart +"0px,0px" + this._sTranslateEnd);   
			}
			this._htWElement.aPanel[i].css(this._sCssPrefix + 'TransitionProperty', "all");           
		}   
	},
	
	/**
	 * jindo.m.Flicking 에서 사용하는 모든 이벤트를 바인드한다.
	 **/
	_attachEvent : function() {
		this._htEvent = {};
		/* Touch 이벤트용 */
		this._htEvent["touchMove"] = jindo.$Fn(this._onMove, this).bind();
		this._htEvent["touchEnd"] = jindo.$Fn(this._onEnd, this).bind();
		this._htEvent["touchStart"] = jindo.$Fn(this._onStart, this).bind();

		/* Touch attach */
		this._oTouch.attach("touchStart", this._htEvent["touchStart"]);
		this._oTouch.attach("touchMove", this._htEvent["touchMove"]);
		this._oTouch.attach("touchEnd", this._htEvent["touchEnd"]);

		/* rotate */
		this._htEvent["rotate"] = jindo.$Fn(this._onResize, this).bind();
		jindo.m.bindRotate(this._htEvent["rotate"]);

		 // pageshow 이벤트 처리 
		this._htEvent["pageshow"] = jindo.$Fn(this._onResize, this).bind();
		jindo.m.bindPageshow(this._htEvent["pageshow"]);

	},

	/**
	 * touchStart 이벤트 호출 함수
	 * @param {Objext} oCustomEvent jindo.$Event object
	 **/
	_onStart : function(oCustomEvent){
		if (this._doFlicking) {
			return;
		}

		this._bTouchStart = true;
		this._clearAnchor();
		this.fireEvent('touchStart', oCustomEvent);

	},

	/**
	 * touchMove 이벤트 호출 함수
	 * @param {Objext} oCustomEvent jindo.$Event object
	 **/	
	_onMove : function(oCustomEvent){
		/** 시스템 스크롤 막기 */
		var weParent = oCustomEvent.oEvent;

		if(oCustomEvent.sMoveType === jindo.m.MOVETYPE[0]) {  //수평이고,수평스크롤인 경우 시스템 스크롤 막기
			weParent.stop(jindo.$Event.CANCEL_ALL);
		} else if(oCustomEvent.sMoveType === jindo.m.MOVETYPE[1]) {   //수직이고, 수직스크롤인 경우 시스템 스크롤 막기
			this.fireEvent('scroll');
			return;
		}else if(oCustomEvent.sMoveType === jindo.m.MOVETYPE[2]) {
			//대각선 일때 시스템 스크롤 막기
			if(this.option('bUseDiagonalTouch')){
				weParent.stop(jindo.$Event.CANCEL_ALL);
			}else{
				this.fireEvent('scroll');
				return;
			}
		}

		if (this._doFlicking) {
			return;
		}
		if(!this._bTouchStart){
			return;
		}

		/**
			플리킹영역에 터치 움직임이 있을 때 발생한다. Touch이벤트의 'touchMove'와 동일하다

			@event touchMove
			@param {String} sType 커스텀 이벤트명
			@param {String} sMoveType 현재 분석된 움직임
			@param {HTMLElement} stopelement 현재 터치된 영역의 Element
			@param {Number} nX 터치영역의 X좌표
			@param {Number} nY 터치 영역의 Y좌표
			@param {Number} nVectorX 이전 touchMove(혹은 touchStart)의 X좌표와의 상대적인 거리.(직전 좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
			@param {Number} nVectorY 이전 touchMove(혹은 touchStart)의 Y좌표와의 상대적인 거리.(직전 좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
			@param {Number} nDistanceX touchStart의 X좌표와의 상대적인 거리.(touchStart좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
			@param {Number} nDistanceY touchStart의 Y좌표와의 상대적인 거리.(touchStart좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
			@param {Number} nStartX touchStart의 X좌표
			@param {Number} nStartY touchStart의 Y좌표
			@param {Object} oEvent jindo.$Event object
			@param {Function} stop수행시 영향 받는것 없다.
		**/
		if(this.fireEvent('touchMove', oCustomEvent)){

			var nDis = oCustomEvent.nDistanceX;
			var nVector = oCustomEvent.nVectorX;

			this._setPosition( nDis, nVector, 0, false);
			this._bMove = true;
		}else{
			weParent.stop(jindo.$Event.CANCEL_ALL);
		}

	},

	/**
	 * touchEnd 이벤트 호출 함수
	 * @param {Objext} oCustomEvent jindo.$Event object
	 * @param {Number} nDuration 슬라이드 애니메이션 지속 시간
	 **/	
	_onEnd : function(oCustomEvent, nDuration){

		if (this._doFlicking) {
			return;
		}
		if(!this._bTouchStart){
			return;
		}
	    
		this._doFlicking = true;
    
		//스크롤일경우 뒤의 click이벤트를 막기위한 코드 젤리빈의 경우 아래 코드 실행시 시스템 스크롤의 가속 기능이 꺼진다.
		if( !(this._bAndroid && (this._nVersion >= "4.1")) ){
			if (oCustomEvent.sMoveType === jindo.m.MOVETYPE[0] || oCustomEvent.sMoveType === jindo.m.MOVETYPE[1] || oCustomEvent.sMoveType === jindo.m.MOVETYPE[2]) {
			oCustomEvent.oEvent.stop(jindo.$Event.CANCEL_DEFAULT);
			}
		}
	    
		//탭 혹은 롱탭일때
		if (oCustomEvent.sMoveType === jindo.m.MOVETYPE[3] || oCustomEvent.sMoveType === jindo.m.MOVETYPE[4]) {
			this._restoreAnchor();
		}
	    
		var nTime = this.option('nDuration');
		var htInfo = this._getSnap(oCustomEvent.nDistanceX, oCustomEvent.nDistanceY, nTime, oCustomEvent.sMoveType);
		
		//플리킹이 다시 되돌아 갈때..(기준픽셀을 채우지 못하여 되돌아 갈때 )
		if(htInfo.sDirection === null){
			nTime = this.option('nBounceDuration');
			if(nDis === 0 || ((oCustomEvent.sMoveType === jindo.m.MOVETYPE[2]) && !this.option('bUseDiagonalTouch')) ) {
				this._endAnimation(false);
				return;
			}
		}
	    
		var htParam = {
			nContentsIndex : this.getContentIndex(),
			nContentsNextIndex: htInfo.nContentIndex
		};
	    
		if(this._bFlickLeft !== null){
			htParam.bLeft = this._bFlickLeft;
		}
	    
		if(htInfo.sDirection !== null){
            /**
                플리킹되기 전에 발생한다

                @event beforeFlicking
                @param {String} sType 커스텀 이벤트명
                @param {Number} nContentsIndex 현재 콘텐츠의 인덱스
                @param {Number} nContentsNextIndex (Number) :플리킹될 다음 콘텐츠의 인덱스
                @param {Boolean} bLeft 플리킹 방향이 왼쪽인지에 대한 여부
                @param {Function} stop 플리킹되지 않는다.
            **/
            if(!this.fireEvent('beforeFlicking', htParam)){
                this.restorePosition();
                return;
            }
        } else {
             /**
                플리킹 임계치에 도달하지 못하고 사용자의 액션이 끝났을 경우, 원래 인덱스로 복원하기 전에 발생하는 이벤트

                @event beforeRestore
                @param {String} sType 커스텀 이벤트명
                @param {Number} nContentsIndex 현재 콘텐츠의 인덱스
                @param {Function} stop 플리킹이 복원되지 않는다.
            **/
            if(!this.fireEvent('beforeRestore', {
                nContentsIndex : this.getContentIndex()
            })) {
                return;
            }
        }

		this._htIndexInfo.nNextContentIndex = htInfo.nContentIndex;
		this._htIndexInfo.welNextElement = htInfo.welElement;
		this._htIndexInfo.sDirection = htInfo.sDirection;
		
		var nDis = oCustomEvent.nDistanceX;
		var nVector = oCustomEvent.nVectorX;
		// var nPos = oCustomEvent.nX;
		
		this._onAfterEnd(nDis, nVector, nDuration);
		/**
		    플리킹영역에 터치가 끝났을 때 발생한다. Touch이벤트의 'touchEnd'와 동일하다.
		
		    @event touchEnd
		    @param {String} sType 커스텀 이벤트명
		    @param {String} sMoveType 현재 분석된 움직임
		    @param {HTMLElement} element 현재 터치된 영역의 Element
		    @param {Number} nX 터치영역의 X좌표
		    @param {Number} nY 터치 영역의 Y좌표
		    @param {Number} nVectorX 이전 touchMove(혹은 touchStart)의 X좌표와의 상대적인 거리.(직전 좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
		    @param {Number} nVectorY 이전 touchMove(혹은 touchStart)의 Y좌표와의 상대적인 거리.(직전 좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
		    @param {Number} nDistanceX touchStart의 X좌표와의 상대적인 거리.(touchStart좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
		    @param {Number} nDistanceY touchStart의 Y좌표와의 상대적인 거리.(touchStart좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
		    @param {Number} nStartX touchStart의 X좌표
		    @param {Number} nStartY touchStart의 Y좌표
		    @param {Object} oEvent jindo.$Event object
		    @param {Function} stop수행시 영향 받는것 없다.
		**/
		this.fireEvent('touchEnd', oCustomEvent);
	},


	/**
	 * 판넬 위치처리시 옵션에 따른 분기 처리
	 * @param {Number} nDis touchstart 시점에서 부터의 거리
	 * @param {Number} nVector 이전 터치와의 상대 거리 
	 * @param {Number} nDuration 애니메이션 시간 
	 * @param {Boolean} bEnd 현재 touchEnd 시점여부 
	 */
	_setPosition : function( nDis, nVector, nDuration, bEnd){

		if(typeof nDuration === 'undefined'){
			nDuration = 0;
		}    
		if(!this.option('bUseTranslate')){
			this._setPositionForStyle(nDis, nVector , nDuration, bEnd);
		}else{
			this._setPositionTransform(nDis,nDuration, bEnd);
		}

	},

	/**
	* wel 엘리먼트의 위치를 left, top 속성으로 설정한다. 
	* @param {HTMLElement} wel 위치를 잡을 대상 엘리먼트 
	* @param {Number} nDis touchstart 시점에서 부터의 거리
	* @param {Number} nVector 이전 터치와의 상대 거리 
	* @param {Number} nDuration 애니메이션 시간 
	* @param {Boolean} bEnd 현재 touchEnd 시점여부 
	*/
	_setPositionForStyle : function( nDis, nVector, nDuration, bEnd){
		var sName = 'left';

		if(bEnd){
			if(this.option('bUseCircular')){
				if(this._htIndexInfo.sDirection === null){
					nDis = -100;
				}else{
					if(nDis < 0){
						nDis = -100;
					}else{
						nDis = 0;
					}
				}
			}else{
				nDis = this._getMovePos();
			}
		}

		var n = 0;
		if(this.option('bUseCircular')){
			n = ((nDis/this._nDefaultSize) * 100) ;
		}else{
			if(bEnd){
				n = nDis;
			}else{
				n = nVector + this._getContainerPos()['css_'+ sName];
			}
		}

		if(bEnd && !this.option('bUseCircular')){
			var nIndex = this._htIndexInfo.nContentIndex;

			if( this._htIndexInfo.sDirection === "next"){
				nIndex++;
			}else if( this._htIndexInfo.sDirection === "prev") {
				nIndex--;
			}
			nDis = this._htPosition.aPos[nIndex];

		}

		var nPos = bEnd? nDis : n;

		this._nLastDis = nDis;
		if(bEnd){
			if(nPos === parseFloat(this._htWElement.container.css(sName).replace('px',''),10) ){
				nDuration = 0;
			}
			this._attachTransitionEnd(this._htWElement.container.$value(), nDuration);
		}

		this._setPosContainer(nPos, nDuration);

	},

	/**
	* @description wel 엘리먼트의 위치를 css의 translate 속성으로 설정한다. 
	* @param {HTMLElement} wel 위치를 잡을 대상 엘리먼트 
	* @param {Number} nDis touchstart 시점에서 부터의 거리
	* @param {Number} nDuration 애니메이션 시간 
	* @param {Boolean} bEnd 현재 touchEnd 시점여부 
	*/
	_setPositionTransform : function(nDis, nDuration, bEnd){
		// var bH = this.option('bHorizontal');
		if(bEnd){
			if(this._htIndexInfo.sDirection === null){
				nDis = 0;
			}else{

				if(this.option('bUseCircular')){
					nDis = (this._htIndexInfo.sDirection === "next")? this._htPosition.htContainer.left : this._htPosition.htContainer.right;
				}else{
					nDis = this._getMovePos();
				}
			}
		}

		this._nLastDis = nDis;

		if(bEnd){
			var htCssOffset = jindo.m.getCssOffset(this._htWElement.container.$value());
			if((htCssOffset.left === nDis) && (htCssOffset.top === 0)){
				nDuration = 0;
			}
			this._attachTransitionEnd(this._htWElement.container.$value(), nDuration);
		}

		this._setPosContainer(nDis, nDuration);
	},

	/**
	 * container 영역 위치 설정
	 * 
	 * @param {Number} nX 이동할 X 좌표
	 * @param {Number} nDuration 슬라이드 애니메이션 지속 시간
	 */
	_setPosContainer : function(nX, nDuration){
		if(typeof nDuration === 'undefined'){
			nDuration = 0;
		}
		var htCss = {};
		htCss[this._sCssPrefix+'TransitionProperty'] = "all";
		htCss[this._sCssPrefix+'TransitionDuration'] =  (nDuration === 0)? '0' : nDuration +"ms" ;

		if(this.option('bUseTranslate')){
			htCss[this._sCssPrefix+'Transform'] =  this._sTranslateStart + nX +"px, 0px" + this._sTranslateEnd;
		}else{
			var sUnit = this.option('bUseCircular')? "%" : "px";
			htCss['left']  = nX+ sUnit;
		}
		this._htWElement.container.css(htCss);
	},

	/**
	 * 플리킹 이후에 움직여야하는 거리와 컨텐츠 인덱스를 구한다
	 * 
	 * @param {Number} nDistanceX touchStart의 X좌표와의 상대적인 거리.(touchStart좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
	 * @param {Number} nDistanceY touchStart의 Y좌표와의 상대적인 거리.(touchStart좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
	 * @param {Number} nDuration 슬라이드 애니메이션 지속 시간
	 * @param {String} sType 커스텀 이벤트명
	 * @return {Object} 플리킹 이후에 움직여야 하는 거리와 컨텐츠 인덱스
	 */
	_getSnap : function(nDistanceX, nDistanceY, nDuration, sType){
		var nFinalDis = nDistanceX;

		var welElement = this._htIndexInfo.welElement;
		var nContentIndex = this.getContentIndex();
		var sDirection = null;

		//가로 대각선일 경우
		if(!((sType === jindo.m.MOVETYPE[2]) && !this.option('bUseDiagonalTouch')) && this._bMove){
			if(Math.abs(nFinalDis) >= this.option('nFlickThreshold') ){
				if(nFinalDis < 0 ){ //왼쪽 방향 혹은 위쪽 방향으로 밀고 있을 때
					welElement = this.getNextElement();
					nContentIndex =  this.getNextIndex();
					this._bFlickLeft = true; //
					sDirection = 'next';
				}else{ //오른쪽 방향 혹은 아래 방향으로 밀때
					welElement = this.getPrevElement();
					nContentIndex = this.getPrevIndex();
					this._bFlickLeft = false;
					sDirection  = 'prev';
				}
			}
		}

		if(this._htIndexInfo.welElement.$value() === welElement.$value()){
			sDirection = null;
		}
		return {
			elElement : welElement.$value(),
			welElement: welElement,
			nContentIndex : nContentIndex,
			sDirection : sDirection
		};
	},

	/**
	 * 플리킹 애니메이션이 끝나는 시점의 처리 함수 
	 * 
	 * @param {Boolean} bFireEvent 사용자 호출 함수 실행 여부 
	 */
	_endAnimation : function(bFireEvent){
		//
		var self = this;
		if(typeof bFireEvent === 'undefined'){
			bFireEvent = true;
		}
		this._doFlicking = false;
		this._bTouchStart =  false;
		this._bMove = false;

		var isFireRestore = this._htIndexInfo.sDirection == null && 
        this._htIndexInfo.nContentIndex === this._htIndexInfo.nNextContentIndex ? true : false;
		//index 정보 업데이트
		this._resetIndexInfo(this._htIndexInfo.nNextContentIndex, this._htIndexInfo.welNextElement);

		if(bFireEvent){
			/**
			현재 화면에 보이는 콘텐츠가 플리킹액션을 통해 바뀔경우 수행된다.

			@event flicking
			@param {String} sType 커스텀 이벤트명
			@param {Number} nContentsIndex 현재 콘텐츠의 인덱스
			@param {Boolean} bLeft 플리킹 방향이 왼쪽인지에 대한 여부
			@param {Function} stop 수행시 영향을 받는것은 없다.
			**/
			this._fireCustomEvent("flicking");
		}
        if(isFireRestore) {
            /**
            플리킹 임계치에 도달하지 못하고 사용자의 액션이 끝났을 경우, 원래 인덱스로 복원한 후에 발생하는 이벤트

            @event restore
            @param {String} sType 커스텀 이벤트명
            @param {Number} nContentsIndex 현재 콘텐츠의 인덱스
            **/               
            this.fireEvent("restore", {
                nContentsIndex : this._htIndexInfo.nContentIndex
            });
        }

		//ios 업데이트
		this._restoreAnchor();
		this._setAnchorElement();
		setTimeout(function(){
		    self._createDummyTag();
		    self._focusFixedBug();
		}, 5);
		this._bFlickLeft = null;
	},

	/**
	 * _onEnd 함수 실행 후 호출되는 함수
	 * 판넬을 지정하는 위치로 이동시킨다.
	 * 
	 * @param {Number} nDis touchstart 시점에서 부터의 거리
	 * @param {Number} nVector 이전 터치와의 상대 거리 
	 * @param {Number} nDuration 슬라이드 애니메이션 지속 시간
	 */
	_onAfterEnd : function(nDis, nVector, nDuration){

		var wel = this._htWElement.container;
		if(typeof nDuration === 'undefined'){
			nDuration = this.option('nDuration');
		}
		//var nDuration = this.option('nDuration');
		if(this._htIndexInfo.sDirection === null){
			nDuration = this.option('nBounceDuration');
		}

		if(!this.option('bUseTimingFunction') && (nDuration > 0)  && (this._htIndexInfo.sDirection !== null) ){
			//script  방식으로 애니메이션 처리
			var self = this;
			var nDistance =  this._nLastDis? this._nLastDis :  nDis;
			var startTime = (new Date()).getTime(),
			nStartDis =  nDis, nBeforeDis = nDis, nStartVector = nVector, nTotalDis = this._htWElement.base.width();
			// nStartDis =  nDis, nBeforeDis = nDis, nStartVector = nVector, nTotalDis = this.option('bHorizontal')? this._htWElement.base.width(): this._htWElement.base.height();

			if(this._htIndexInfo.sDirection === null){
				if(!this.option('bUseTranslate')){ 
					nTotalDis = -100;
				}else{
					nTotalDis = 0;
				}
			}
			if(nDistance < 0){
				nTotalDis = nTotalDis*-1;
			}

			(function animate () {
				var now = (new Date()).getTime(),nEaseOut, nDis;
				if (now >= startTime + nDuration) {
				//clearTimeout(self._nTimerAnimate);
					cancelAnimationFrame(self._nTimerAnimate);
					delete self._nTimerAnimate;
					self._setPosition(nTotalDis,  (nDis-nBeforeDis), 0, false);
					setTimeout(function(){
					self._onTransitionEnd();
					},100);
					//self._onTransitionEnd();
					return;
				}

				now = (now - startTime) / nDuration - 1;
				nEaseOut = Math.sqrt(1 - Math.pow(now,2));
				nDis = (nTotalDis - nStartDis)*nEaseOut + nStartDis;
				self._setPosition( nDis,  (nDis-nBeforeDis), 0, false);
				nBeforeDis = nDis;
				//self._nTimerAnimate = setTimeout(animate, 1);   
				self._nTimerAnimate = requestAnimationFrame(animate);
			})();

		}else{
			this._setPosition(nDis, nVector, nDuration, true);
		}

	},

	/**
	 * 이동할 판넬의 넓이 정보를 얻어온다.
	 * 
	 * @param {Number} nIndex 판넬의 index
	 * @return {Number} nRet 판넬의 넓이 정보  
	 */
	_getMovePos : function(nIndex){
		var nRet = 0;
		var sPos =  "left";
		var htPos =  this._getContainerPos();

		if(typeof nIndex === 'undefined'){
			if(this._htIndexInfo.sDirection !== null){
				nIndex = this._htWElement.aPanel.length-1;
				htPos =  this._getContainerPos();
				var nCurrent = htPos[sPos];
				var nMax = this._htPosition.aPos.length;
				for(var i=0,nLen = nMax; i<nLen; i++){               
					if(nCurrent >= (this._htPosition.aPos[i])){
						nIndex = i;
						break;
					}               
				}

				if ((nIndex == this.getContentIndex()) && nIndex > 0 && (this._htIndexInfo.sDirection === 'prev')) nIndex--;
				if ((nIndex == this.getContentIndex()) && (nIndex < (nMax-1)) && (this._htIndexInfo.sDirection === 'next')) nIndex++;
			}else{
				nIndex = this.getContentIndex();
			}

		}

		nRet  = this._htPosition.aPos[nIndex];
		if(this.option('bUseTranslate')){
			nRet -= (htPos['css_'+sPos]);
		}
		nRet  = this._htPosition.aPos[nIndex] - (htPos['css_'+sPos]);

		return nRet;
	},
    
    /**
     * container 의 속성 정보 
     * 
     * @return {Object} left, top 등의 속성 정보 
     */
	_getContainerPos : function(){
		var wel = this._htWElement.container;
		var nLeft = parseInt(wel.css("left"),10),
		nTop = parseInt(wel.css("top"),10);
		nLeft = isNaN(nLeft) ? 0 : nLeft;
		nTop = isNaN(nTop) ? 0 : nTop;
		var htPos = jindo.m.getCssOffset(wel.$value());
		//nLeft += htPos.left;
		//nTop += htPos.top;

		return {
			left : nLeft+htPos.left, 
			top : nTop+htPos.top,
			css_left : nLeft, 
			css_top :  nTop
		};
	},
	
	/**
	 * transition 종료 후 처리 함수 
	 */
	_onTransitionEnd : function(){
		//
		this._detachTarnsitonEnd();
		var bFireEvent = true;

		if(this._htIndexInfo.sDirection === null){
			bFireEvent = false;
		}

		this._nLastDis  = null;
		this._restorePanel(this._htIndexInfo.welNextElement.$value());
		this._endAnimation(bFireEvent);

		if(this._bFireMoveEvent){
			this._fireCustomEvent("move");
			this._bFireMoveEvent = false;
		}
	},


	/**
	 * @description el이 화면에 중앙에 오도록 각 패널과 컨테이너 재배치 한다.
	 * @param {HTMLElement} el 화면에 중앙에 오는 엘리먼트 
	*/
	_restorePanel : function(el){
		var self =this;
		var nPer = this._htWElement.aPanel.length;
		var nCenter = this.getIndexByElement(el);

		this._refresh(nCenter, false);

		if(this.option('bUseCircular')){
			
			if(this._isIos && this.option('bUseCircular')){
				var nPrev = (((nCenter-1) < 0 )? (nPer - 1) : (nCenter-1))%nPer;
				var nNext =  (((nCenter+1) > (nPer - 1) )? 0 : (nCenter+1))%nPer;
				var welClonePrev = jindo.$Element(this._htWElement.aPanel[nPrev].$value().cloneNode(true));
				var welCloneNext = jindo.$Element(this._htWElement.aPanel[nNext].$value().cloneNode(true));

				this._htWElement.aPanel[nPrev].replace(welClonePrev);
				this._htWElement.aPanel[nNext].replace(welCloneNext);

				this._htWElement.aPanel[nPrev] = welClonePrev;
				this._htWElement.aPanel[nNext] = welCloneNext;
			} 
		}
	},

	/**
	 * @description n번째 패널 중앙에 오도록 panel을 다시 좌우 배열해서 배치한다.
	 * @param {Number} n 현재 화면에 보여져야할 content의 인덱스
	 * @param {Boolean} bResize 화면 크기가 변화되어 다시 사이즈를 업데이트 해야 할경우 true 
	*/
	_refresh : function(n, bResize ){

		var nCenter = n;

		if(this.option('bUseCircular')){
			nCenter = n % this._htWElement.aPanel.length;
		}

		if(bResize){
			this._setPanelPos();
		}   

		var sPosition = 'left'; 
		this._htWElement.container.css(this._sCssPrefix+'TransitionDuration', '0ms');
		if(this.option('bUseCircular')){
			//순환일 경우 
			// this._htWElement.container.css(sPosition, '-100%');
			if (this.option('bUseTranslate')) {
				this._htWElement.container.css(this._sCssPrefix + 'Transform', this._sTranslateStart + "0px,0px" + this._sTranslateEnd);
			}else {

				this._htWElement.container.css("left" , "0");
			}

			var nSum = 0;
			var nLen = this._htWElement.aPanel.length;
			var nCompare = Math.floor(nLen/2);

			for ( var i = 0  ; i < nLen ; i++ ){
				nSum = i - nCenter;
				if( nSum > nCompare ){
					nSum = nSum - nLen;
				}else if( nSum < -nCompare ) {
					nSum = nSum + nLen;
				}
				this._htWElement.aPanel[i].css(sPosition, (nSum  * 20 )+ "%");
			}



		}else{
			//비순환일 경우
			var nPos = 0;
			if(nCenter > 0){
				nPos = this._htPosition.aPos[nCenter];
			}
			this._htWElement.container.css(this._sCssPrefix + 'Transform', "");
			this._htWElement.container.css(sPosition, nPos+"px");
		}

	},


	/**
	 * transitionEnd 함수 attach 를 위한 처리 
	 * 
	 * @param {Element} el 대상의 엘리먼
	 * @param {Number} nTime 슬라이드 애니메이션 지속 시간 
	 */
	_attachTransitionEnd : function(el, nTime){
		if(el !== this._elTransition ){
			this._elTransition = el;
			var self = this;
			//
			if(nTime === 0){
				setTimeout(function(){
					self._onTransitionEnd();    
				}, 10);
			}else{
				jindo.m.attachTransitionEnd(el, this._wfTransitionEnd);
			}
		}
	},
	
	/**
	 * transitionEnd 함수 detach 를 위한 처리 
	 */
	_detachTarnsitonEnd : function(){
		if(this._elTransition){
			jindo.m.detachTransitionEnd(this._elTransition, this._wfTransitionEnd);
			this._elTransition = null;
		}
	},

	/**
	 * 컨텐츠인덱스 정보를 다시 세팅한다.
	 * 
	 * @param {Number} n 컨텐츠 인덱스
	 * @param {HTMLElement} el  컨텐츠 인덱스에 해당하는 Element
	 */
	
	_resetIndexInfo : function(n, el){
		

		this._htIndexInfo.nContentIndex = n;
		this._htIndexInfo.nNextContentIndex = n;

		if(typeof el === 'undefined'){
			if(this.option('bUseCircular')){
				n = n%this._htWElement.aPanel.length;
			}
			el =  this._htWElement.aPanel[n];
		}

		this._htIndexInfo.welElement = el;
		this._htIndexInfo.welNextElement = el;
		this._htIndexInfo.sDirection = null;
	},


	/**
	 * 모바일 기기의 rotate 시 호출 함수
	 * 회전으로 인한 재 정의 
	 * @param {Object} evt isVertical 수직여부
	 */
	_onResize : function(evt){
		if(this.option('bAutoResize')){
			var n = this.getIndexByElement(this.getElement().$value());
			this.refresh(n, true, false);
		}

		/**
		  단말기가 회전될 때 발생한다

		  @event rotate
		  @param {String} sType 커스텀 이벤트명
		  @param {Boolean} isVertical 수직여부
		  @param {Function} stop 수행시 영향을 받는것은 없다
		**/
		this.fireEvent("rotate",{
			isVertical : evt.isVertical
		});
	},
    

	/**
	 * jindo.m.PreviewFlicking 컴포넌트를 활성화한다.
	 * activate 실행시 호출됨
	 */
	_onActivate : function() {
		// this._attachEvent();
		this._setAnchorElement();
		this._initTouch();
		this._initFlicking();
		this.refresh(this.getContentIndex(), true);

	},

	/**
	 * jindo.m.PreviewFlicking 컴포넌트를 비활성화한다.
	 * deactivate 실행시 호출됨 
	 */
	_onDeactivate : function() {
		this._detachEvent();
	},
	
	/**
	 * 객체 초기화 및 Bind 해제, 이벤트를 detach 한다.
	 */
	_detachEvent : function() {
		/* touch detach */
		this._oTouch.detachAll();

		/* rotate */
		jindo.m.unbindRotate(this._htEvent["rotate"]);

		/*그외*/
		for(var p in this._htEvent){
			var htTargetEvent = this._htEvent[p];
			if (typeof htTargetEvent.ref !== "undefined") {
				htTargetEvent.ref.detach(htTargetEvent.el, p);
			}
		}

		this._htEvent = null;

	},

	/**
	 * flicking 내에 a 엘리먼트를 모두 가져와서 세팅한다. (ios에서만) 
	 */
	_setAnchorElement : function(el){
	//ios에서만 처리되도록 수정.
		if(this._bClickBug){
			this._aAnchor = jindo.$$("A", this._htWElement.container.$value());
		}
	},

	/**
	 * Anchor 삭제
	 * IOS인경우 플리킹시 링크가 의도치 않게 처리될 수 있어 링크 제거하는 처리 
	 */
	_clearAnchor : function() {
		if(this._aAnchor && !this._bBlocked) {
			var aClickAddEvent = null;
			for(var i=0, nILength=this._aAnchor.length; i<nILength; i++) {
				if (this._fnDummyFnc !== this._aAnchor[i].onclick) {
					this._aAnchor[i]._onclick = this._aAnchor[i].onclick;
				}
				this._aAnchor[i].onclick = this._fnDummyFnc;
				aClickAddEvent = this._aAnchor[i].___listeners___ || [];
				for(var j=0, nJLength = aClickAddEvent.length; j<nJLength; j++) {
					___Old__removeEventListener___.call(this._aAnchor[i], "click", aClickAddEvent[j].listener, aClickAddEvent[j].useCapture);
				}
			}
			this._bBlocked = true;
		}
	},

	/**
	 * Anchor 복원. for iOS
	 */
	_restoreAnchor : function() {
		if(this._aAnchor && this._bBlocked) {
			var aClickAddEvent = null;
			for(var i=0, nILength=this._aAnchor.length; i<nILength; i++) {
				if(this._fnDummyFnc !== this._aAnchor[i]._onclick) {
					this._aAnchor[i].onclick = this._aAnchor[i]._onclick;
				} else {
					this._aAnchor[i].onclick = null;
				}
				aClickAddEvent = this._aAnchor[i].___listeners___ || [];
				for(var j=0, nJLength = aClickAddEvent.length; j<nJLength; j++) {
					___Old__addEventListener___.call(this._aAnchor[i], "click", aClickAddEvent[j].listener, aClickAddEvent[j].useCapture);
				}
			}
			this._bBlocked = false;
		}
	},

	/**
	 * 플리킹 동작 시 브라우저 별 또는 상태에 따라 발생된 버그를 해결하기 위한 처
	 */
	_setFixedBug : function(){
		var self = this;
		//ios 업데이트
		this._restoreAnchor();
		this._setAnchorElement();

		//android css transform 이후에 포커싱 안되는 문제를 해결하기 위한 코드
		this._createDummyTag();
		setTimeout(function(){
			self._focusFixedBug();
		}, 100);
	},

	/**
	 * 안드로이드 전용 랜더링 버그 해결을 위한 더미 태그를 만든다.
	 */
	_createDummyTag : function(){
	//android 포커스를 위한 더미 태그가 필요
		if(this._bDummyTagException) {
			//debugger;
			this._htWElement.aDummyTag = [];
			for(var i=0,nLen = this._htWElement.aPanel.length;i<nLen;i++){
				var wel =this._htWElement.aPanel[i];
				var elDummyTag = jindo.$$.getSingle("._cflick_dummy_atag_", wel.$value());
				if(!elDummyTag){
					elDummyTag = jindo.$("<a href='javascript:void(0);' class='_cflick_dummy_atag_'></a>");
					elDummyTag.style.position = "absolute";
					elDummyTag.style.left = "-1000px";
					elDummyTag.style.top = "-1000px";
					elDummyTag.style.width = 0;
					elDummyTag.style.height = 0;
					wel.append(elDummyTag);
				}
				this._htWElement.aDummyTag.push(elDummyTag);
			}
		}
	},

	/**
	 * 안드로이드에서 css 속성을 사용해서 transform 이후에 포커스를 잃는 현상의 버그 수정하는 코드
	 */
	_focusFixedBug : function(){
		if(!this._htWElement || typeof this._htWElement.aDummyTag === 'undefined'){
			return;
		}

		for(var i=0,nLen= this._htWElement.aDummyTag.length;i<nLen;i++){
			this._htWElement.aDummyTag[i].focus();
		}
	},


	/**
	 * 커스텀이벤트 발생시킨다
	 * @param {String} 커스텀 이벤트 명
	 * @param {Object} 커스텀 이벤트 파라미터
	 * @return {Boolean} 
	 */
	_fireCustomEvent : function(sEventName, htParam){
		if(typeof htParam === 'undefined'){
			htParam =  {
				//nContentsIndex : this.getContentIndex()
				nContentsIndex : this._htIndexInfo.nContentIndex
			};
			if(this._bFlickLeft){
				htParam.bLeft = this._bFlickLeft;
			}
		}

		return this.fireEvent(sEventName,htParam);
	},


	/**
	 * nIndex 컨텐츠로 이동한다 
	 * @param {Number} nIndex 컨텐츠 인덱스 
	 * @param {Number} nDruation  슬라이드 애니메이션 지속 시간
	 * @param {Boolean} bFireEvent  커스텀 이벤트 발생여부
	 */
	_moveTo : function(nIndex, nDuration , bFireEvent){
		if(this.option('bUseCircular')){
			this.refresh(nIndex, false, bFireEvent);
		}else{
			if(bFireEvent){
				if(!this._fireCustomEvent('beforeMove',{
					nContentsIndex : this.getContentIndex(),
					nContentsNextIndex : nIndex
				})){
					return;
				}
			}

			var nDis = this._getMovePos(nIndex);
			this._htIndexInfo.welNextElement = this._htWElement.aPanel[nIndex];
			this._htIndexInfo.nNextContentIndex = nIndex;
			if(bFireEvent){
				this._bFireMoveEvent = true;
			}
			if(nDuration !== 0){
				this._attachTransitionEnd(this._htWElement.container.$value(), nDuration);
			}else{
				var self = this;
				setTimeout(function(){
				self._onTransitionEnd();
				},100);
			}
			this._setPosContainer(nDis, nDuration);
		}
	},

	/**
	 * 플리킹 영역을 다시 재정의 한다.
	 * 
	 * @method refresh
	 * @param {Number|} n 컨텐츠의 index 정보 
	 * @param {Boolean} bResize 리사이즈 발생 여부 
	 * @param {Boolean} bFireEvent 커스텀 이벤트 발생 여부 
	 */
	refresh : function(n, bResize, bFireEvent){
		var self = this;
		if(typeof n === 'undefined'){
			n = this.getContentIndex();
		}

		if(typeof bResize === 'undefined'){
			bResize = true;
		}

		if(typeof bFireEvent === 'undefined'){
			bFireEvent = true;
		}

		if(bFireEvent){
			/**
			현재 화면에 보이는 콘텐츠가 바꾸기 직전에 수행된다.

			@event beforeMove
			@param {String} sType 커스텀 이벤트명
			@param {Number} nContentsIndex 현재 콘텐츠의 인덱스
			@param {Number} nContentsNextIndex (Number) :이동 할 콘텐츠의 인덱스
			@param {Function} stop 이동하지 않는다.
			**/
			if(!this._fireCustomEvent('beforeMove',{
				nContentsIndex : this.getContentIndex(),
				nContentsNextIndex : n
			})){
				return;
			}
		}
		
		this._refresh(n, bResize);
		this._resetIndexInfo(n);

		if(bFireEvent){
			/**
			현재 화면에 보이는 콘텐츠가 바뀔경우 수행된다

			@event move
			@param {String} sType 커스텀 이벤트명
			@param {Number} nContentsIndex 현재 콘텐츠의 인덱스
			@param {Function} stop 수행시 영향을 받는것은 없다
			**/
			this._fireCustomEvent('move');
		}

		this._setFixedBug();
	},

	/**
	 * 현재 플리킹 화면에 보이는 컨텐츠의 인덱스를 리턴한다.
	 * @method getContentIndex
	 * @return {Number} n
	 */
	getContentIndex : function(){
		return this._htIndexInfo.nContentIndex;
	},

	/**
	 * 이후 컨텐츠의 패널 엘리먼트의 래핑된 엘리먼트를 리턴한다.
	 * @method getNextElement
	 * @return {jindo.$Element} el
	 */
	getNextElement : function(){
		var n = this.getNextIndex();

		if(this.option('bUseCircular')){
			n = this.getIndexByElement(this.getElement().$value());
			n = ((n+1) > this._htWElement.aPanel.length -1 )?  0 : (n+1);
		}

		return this._htWElement.aPanel[n];
	},

	/**
	 * 이전 컨텐츠의 패널 엘리먼트의 래핑된 엘리먼트를 리턴한다.
	 * @method getPrevElement
	 * @return {jindo.$Element} el
	 */
	getPrevElement : function(){

		var n = this.getPrevIndex();

		if(this.option('bUseCircular')){
			n = this.getIndexByElement(this.getElement().$value());
			n = ((n-1)< 0)? this._htWElement.aPanel.length - 1: (n-1);
		}
		return this._htWElement.aPanel[n];
	},
	
	/**
	 * 이후 컨텐츠의 인덱스를 리턴한다.
	 * @method getNextIndex
	 * @return {Number} n
	 */
	getNextIndex : function(nIndex){

		var n = (nIndex || this.getContentIndex()) +1;
		var nMax = this.getTotalContents() - 1;
		
		if(this.option('bUseCircular') && (n > nMax) ){
			n = 0;
		}
		n = Math.min(nMax, n);

		return n;
	},

	/**
	 * 이전 컨텐츠의 인덱스를 리턴한다.
	 * @method getPrevIndex
	 * @return {Number} n
	 */
	getPrevIndex : function(){

		var n = this.getContentIndex()-1;

		if(this.option('bUseCircular') && (n < 0) ){
			n = this.getTotalContents() - 1;
		}

		n = Math.max(0, n);
		return n;
	},

	/**
	 * 전체 컨텐츠의 개수를 리턴한다.
	 * @method getTotalContents
	 * @return {Number} nValue
	 */
	getTotalContents : function(){
		var nValue = this._htWElement.aPanel.length;

		if(this.option('bUseCircular')){
			if(typeof this.option('nTotalContents') ==='undefined'){
				nValue = this._htWElement.aPanel.length;
			}else{
				nValue = this.option('nTotalContents');
			}
		}
		return nValue;

	},

	/**
	 * 엘리먼트를 기준으로 하는 index 정보 리턴
	 * @param {Element} el 조회하고자 하는 element
	 * @return {Number} nValue Index 정보 
	 */
	getIndexByElement : function(el){
		var nValue = -1;
		for(var i=0, nLen = this._htWElement.aPanel.length; i<nLen; i++){
			if(this._htWElement.aPanel[i].$value() === el){
				nValue = i;
				break;
			}
		}
		return nValue;
	},

	/**
	 * 현재 화면에 중앙에 보이는 컨텐츠 혹은 패널의 래핑된 엘리먼트를 리턴한다.
	 * @method getElement
	 * @return {jindo.$Element} el
	 */
	getElement : function(){
		return this._htIndexInfo.welElement;
	},

	/**
	 * 다음 플리킹화면으로 이동한다.
	 * @method moveNext
	 * @param {Number} nDuration 플리킹 애니메이션 시간
	 */
	moveNext : function(nDuration){
		
		if(!this.isActivating()){
			return;
		}
		if(this._doFlicking){
			return;
		}
		var welNext = this.getNextElement();
		if(welNext.$value() === this.getElement().$value()){
			return;
		}

		if(typeof nDuration === 'undefined'){
			nDuration = this.option('nDuration');
		}

		this._bTouchStart = true;
		this._bMove = true;

		var n = this.option('nFlickThreshold')*-1;
		// var nPos = this._htWElement.base.width();

		this._onEnd({
			nDistanceX : n-10,
			nDistanceY : n-10,
			nX : 10,
			nY : 10
		}, nDuration);

	},

	/**
	 * 이전  플리킹화면으로 이동한다.
	 * @method movePrev
	 * @param {Number} nDuration 플리킹 애니메이션 시간
	 */
	movePrev : function(nDuration){
		if(!this.isActivating()){
			return;
		}
		if(typeof nDuration === 'undefined'){
			nDuration = this.option('nDuration');
		}

		if(this._doFlicking){
			return;
		}

		var welPrev = this.getPrevElement();
		if(welPrev.$value() === this.getElement().$value()){
			return;
		}
		if(typeof nDuration === 'undefined'){
			nDuration = this.option('nDuration');
		}
		this._bTouchStart = true;
		this._bMove = true;

		var n = this.option('nFlickThreshold');
		this._onEnd({
			nDistanceX : n+10,
			nDistanceY : n+10,
			nX : 10,
			nY : 10
		}, nDuration); 
	},


	/**
	 * n 번째 컨텐츠로 현재 플리킹화면을 이동한다.
	 * @method moveTo
	 * @param {Number} n 이동해야하는 컨텐츠 인덱스
	 * @param {Number} nDuration 애니메이션 시간
	 * @param {Number} bFireEvent 커스텀 이벤트 발생여부
	 */
	moveTo : function(nIndex, nDuration, bFireEvent){
		
		if((typeof nIndex === 'undefined') || (nIndex == this.getContentIndex()) ){
			return;
		}
		if(nIndex < 0 || nIndex >= this.getTotalContents() ){
			return;
		}

		if((typeof nIndex === 'undefined') || (nIndex == this.getContentIndex()) ){
			return;
		}
		if(nIndex < 0 || nIndex >= this.getTotalContents() ){
			return;
		}

		if(typeof nDuration === 'undefined'){
			nDuration = this.option('nDuration');
		}

		if(typeof bFireEvent === 'undefined'){
			bFireEvent = true;
		}
		this._moveTo(nIndex, nDuration, bFireEvent);

	},

	/**
	 * 초기화 처리 
	 */
	destroy : function(){
		this.deactivate();

		this._htWElement = null;
		this._htPosition = {};
		this._sTranslateStart = "translate(";
       	this._sTranslateEnd = ")";
		this._bTouchStart  = false;
		this._bMove = false;
		this._sCssPrefix = null;
		this._wfTransitionEnd = jindo.$Fn(this._onTransitionEnd, this).bind();
		this._htIndexInfo = null;
		this._sEl = null;
		this._isIos = null;
		this._bAndroid = null;
		this._nVersion = null;
		this._fnDummyFnc = null;
		this._doFlicking = null;
		this._bClickBug = null;
		this._b3dExecption = null;
		this._bDummyTagException = null;
	}

}).extend(jindo.m.UIComponent);/**
	@fileOverview Form Element의 RadioButton을 모바일에 환경에 맞게 커스터마이징한 컴포넌트
	@author sshyun
	@version 1.7.1
	@since 2011. 9. 19.
**/
/**
	Form Element의 RadioButton을 모바일에 환경에 맞게 커스터마이징한 컴포넌트

	@class jindo.m.RadioButton
	@extends jindo.m.CheckRadioCore
	@keyword radio
	@group Component

	@history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
	@history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
	@history 0.9.5 Update [bUseRadius] Option 삭제<br />
						[sRadiusSize] Option 삭제<br />
						[sCheckBgColor] Option 삭제<br />
						[sUncheckBgColo] Option 삭제<br />
	@history 0.9.0 Release 최초 릴리즈
**/
jindo.m.RadioButton = jindo.$Class({
	/* @lends jindo.m.RadioButton.prototype */
	/**
		초기화 함수

		@constructor
		@param {Varient} el Checkbox Layout Wrapper
		@param {Object} [htOption] 초기화 옵션 객체
			@param {String} [htOption.sClassPrefix="frb-"] Class의 prefix명
			@param {String} [htOption.sType="v"] 세로 / 가로 타입 여부 (가로 :h, 세로:v)
			@param {Boolean} [htOption.bActivateOnload=true] 컴포넌트 로드시 activate 여부
			@param {String} [htOption.sUncheckBgColor="transparent"]
	**/
	$init : function(el, htOption) {
		this.option({
			sClassPrefix	: "frb-",
			sType			: "v",
			bActivateOnload : true,
			sUncheckBgColor : "transparent"
		});
		this.option(htOption || {});
		this._initVar();
		this._setWrapperElement(el, this.option("sClassPrefix"));
		this._initRadioLoad();
		if(this.option("bActivateOnload")) {
			this.activate();
		}
	},

	/**
		jindo.m.RadioButton 에서 사용하는 모든 인스턴스 변수를 초기화한다.
	**/
	_initVar : function() {
		this.$super._initVar("radio", "radiobtn");
		this._nPreSelectIdx = -1;
	},
	/**
		초기 radio button 체크 여부 확인.
	**/
	_initRadioLoad : function(){
		var aRadioBtnList = this._aWElFormList;
		for ( var i = 0; i < aRadioBtnList.length; i++) {
			if(aRadioBtnList[i].$value().checked){
				this._setChecked(i);
				break;
			}
		}
	},

	_afterCheck : function(welElement, bClickOverForm){
		var nIdx = -1;
		nIdx = this._htWElement["container"].indexOf(welElement);
		this._setChecked(nIdx);
	},

	/**
		CheckBox/RadioButton 에서 Click 이벤트 처리.

		@param {Object} we 이벤트 객체.
	**/
	_onFormClick : function(we){
		var sClassName = this._sUnitClass;
		var welElement = jindo.$Element(we.element);
		welElement = welElement.parent(function(v){
			return v.hasClass(sClassName);
		})[0];
		var sChecked = welElement.attr("data-cb-checked");
		we.element.checked = (sChecked && sChecked == "on") ? true : false;
		var nIdx = this._htWElement["container"].indexOf(welElement);
		if(we.element.checked){
			if(this._nPreSelectIdx != nIdx){
				this._onCheck(we);
			}
		}
	},

	/**
		체크여부 설정 처리.

		@param {Number} nIdx 체크할 RadioButton index
	**/
	_setChecked : function(nIdx){
		var elCurrentRadioBtn = this._aWElFormList[nIdx].$value();
		var welCurrentRadioUnit = this._aWElUnitList[nIdx];
		if(elCurrentRadioBtn.disabled){
			return false;
		}
		var sBgColor = this.option("sCheckBgColor");
		var elPreRadioUnit = null;
		var elPreRadioBtn = null;
		// 이전 index RadioButton 선택 해제
		if(this._nPreSelectIdx > -1){
			sBgColor = (sBgColor) ? this.option("sUncheckBgColor") : null;
			elPreRadioUnit = this._aWElUnitList[this._nPreSelectIdx].$value();
			elPreRadioBtn = this._aWElFormList[this._nPreSelectIdx].$value();
			this._aWElUnitList[this._nPreSelectIdx].removeClass(this._sOnClass);
			elPreRadioBtn.checked = false;
			if(sBgColor){
				this._aWElUnitList[this._nPreSelectIdx].css("backgroundColor", sBgColor + " !important");
			}
		}

		welCurrentRadioUnit.addClass(this._sOnClass);
		welCurrentRadioUnit.attr("data-cb-checked","on");
		elCurrentRadioBtn.checked = true;
		sBgColor = this.option("sCheckBgColor");
		if(sBgColor){
			welCurrentRadioUnit.css("backgroundColor", sBgColor + " !important");
		}
		this._nPreSelectIdx = nIdx;
		/**
			RadioButton 이 선택 시 발생.

			@event checked
			@param {String} sType 커스텀 이벤트명
			@param {Elment} elPreRadioButtonUnit 이전 선택한 RadioButton Unit 엘리먼트
			@param {Elment} elPreRadioButton 이전 선택한 RadioButton 엘리먼트
			@param {Elment} elRadioButtonUnit RadioButton Unit 엘리먼트
			@param {Elment} elRadioButton RadioButton 엘리먼트

		**/
		this.fireEvent("checked", {
			elPreRadioButtonUnit : elPreRadioUnit,
			elPreRadioButton : elPreRadioBtn,
			elRadioButtonUnit : welCurrentRadioUnit.$value(),
			elRadioButton : elCurrentRadioBtn
		});
	},
	/**
		check 된 항목값을 반환한다.

		@method getCheckedValue
		@return {String} 체크된 RadioButton value 값.
		@example
			var sValue = oRadioButton.getCheckedValue();
			alert(sValue);
	**/
	getCheckedValue : function(){
		var sValue = "";
		if(this._nPreSelectIdx > -1){
			if(!this._aWElFormList[this._nPreSelectIdx].$value().disabled){
				sValue = this._aWElFormList[this._nPreSelectIdx].$value().value;
			}
		}
		return sValue;
	},
	/**
		입력한 RadioButton 엘리먼트를 선택 / 선택해제 시킨다.

		@method setCheckedButton
		@param {Variant} vElement 체크를 설정할 checkbox Element.
		RadioButton input 엘리먼트 또는 RadioButton Unit 엘리먼트  엘리먼트가 입력 될수 있다.
		@example
			// 선택시
			oRadioButton.setCheckedButton(jindo.$("unit1"));
	**/
	setCheckedButton : function(vElement){
		var aIdx = this._getFormIdx(vElement);
		if(aIdx.length > 0)	{this._setChecked(aIdx[0]);}
	},
	/**
		RadioButton 를 활성화 시킨다.

		@method enable
		@param {Variant} vElement 활성화 할 RadioButton Element.
		RadioButton input 엘리먼트 배열 또는 RadioButton Unit 엘리먼트 배열 또는 단일 엘리먼트가 입력 될수 있고,
		입력값이 없을시 모든 체크박스 엘리먼트가 기준이 된다.

		@example
			// 배열 활성화
			oRadioButton.enable([jindo.$("unit1"),jindo.$("unit2")]);
			// 단일 활성화
			oRadioButton.enable(jindo.$("unit1"));
			// 전체 활성화
			oRadioButton.enable();
	**/
	enable : function(vElement){
		var htElForm = this._useSettingForm(vElement, true);

		/**
			RadioButton이 활성화 되었을 경우 발생.

			@event enable
			@param {String} sType 커스텀 이벤트명
			@param {Array} aRadioButtonUnitList 활성화 되는 RadioButton Unit 엘리먼트 배열
			@param {Array} aRadioButtonList 활성화 되는 RadioButton 엘리먼트 배열

		**/
		this.fireEvent("enable", {
			aRadioButtonList: htElForm.aFormList,
			aRadioButtonUnitList: htElForm.aUnitList
		});
	},
	/**
		RadioButton 를 비활성화 시킨다.

		@method disable
		@param {Variant} vElement 비활성화 할 RadioButton Element.
		RadioButton input 엘리먼트 배열 또는 RadioButton Unit 엘리먼트 배열 또는 단일 엘리먼트가 입력 될수 있고,
		입력값이 없을시 모든 체크박스 엘리먼트가 기준이 된다.
		@example
			// 배열 비활성화
			oRadioButton.disable([jindo.$("unit1"),jindo.$("unit2")]);
			// 단일 비활성화
			oRadioButton.disable(jindo.$("unit1"));
			// 전체 비활성화
			oRadioButton.disable();
	**/
	disable : function(vElement){
		var htElForm = this._useSettingForm(vElement, false);

		/**
			RadioButton이 비활성화 되었을 경우 발생.

			@event disable
			@param {String} sType 커스텀 이벤트명
			@param {Array} aRadioButtonUnitList 활성화 되는 RadioButton Unit 엘리먼트 배열
			@param {Array} aRadioButtonList 활성화 되는 RadioButton 엘리먼트 배열


		**/
		this.fireEvent("disable", {
			aRadioButtonList: htElForm.aFormList,
			aRadioButtonUnitList: htElForm.aUnitList
		});
	},
	/**
		index 번호로 RadioButton Element 를 반환한다.

		@method getElementByIndex
		@param {Number} nIdx 가져올 index 번호.
		@return {Object} RadioButton Element 객체 {elRadioButton : 대상 엘리먼트, elRadioButtonUnit : 대상 엘리먼트} 으로 구성된 객체를 반환
		@example
			// 0번째 RadioButton 가져오기.
			var oRadioButton = oRadioButton.getElementByIndex(0);
			oRadioButton.elRadioButtonUnit; // RadioButton Unit Element 객체
			oRadioButton.elRadioButton; // RadioButton Element 객체
	**/
	getElementByIndex : function(nIdx){
		return {
			elRadioButton: this._aWElFormList[nIdx].$value(),
			elRadioButtonUnit: this._aWElUnitList[nIdx].$value()
		};
	},
	/**
		jindo.m.RadioButton 에서 사용하는 모든 객체를 release 시킨다.

		@method destroy
		@example
			oRadioButton.destroy();
	**/
	destroy : function() {
		this.$super.destroy();
	}
}).extend(jindo.m.CheckRadioCore);/**
	@fileOverview 슬라이드효과를 통해 좌,우에 존재하는 메뉴를 나타나게하는 템플릿
	@author sculove
	@version 1.7.1
	@since 2012. 6. 13.
**/
/**
	슬라이드효과를 통해 좌,우에 존재하는 메뉴를 나타나게하는 템플릿

	@class jindo.m.RevealSidebarUI
	@extends jindo.m.UIComponent
	@uses jindo.m.Scroll
	@uses jindo.m.Transition
	@keyword revealsidebar
	@group UI Template
  
  @history 1.7.0 Bug 안드로이드 4.x 갤럭시 시리즈에서 하이라이트 사라지지 않는 문제 제거
	@history 1.4.0 Support iOS 6 지원
	@history 1.3.0 Release 최초 릴리즈
**/
jindo.m.RevealSidebarUI = jindo.$Class({
	/* @lends jindo.m.RevealSidebarUI.prototype */

	/**
		초기화 함수

		@constructor
		@param {Varient} el Main 엘리먼트 (필수)
		@param {Object} [htOption] 초기화 옵션 객체
			@param {Boolean} [htOption.bActivateOnload=true] 컴포넌트 로드시 activate 여부
			@param {Number} [htOption.nSildeThreshold=50] 좌,우 메뉴 슬라이드후 보여지는 영역 크기
			@param {String} [htOption.sDefaultArea="main"] 초기 화면 상태 <ul>
				<li>"left" : 좌측 메뉴가 열려있는 상태</li>
				<li>"main" : 좌,우측 메뉴가 모두 닫혀있는 상태</li>
				<li>"right" : 우측 메뉴가 열려있는 상태</li></ul>
			@param {Function} [htOption.htScrollOption={}] Scroll 생성시 초기화 옵션, [jindo.m.Scroll] 참고
			@param {Number} [htOption.nSlideDuration=200] 슬라이드 효과 시간 (ms)
			@param {Function} [htOption.bUseCss3d=jindo.m._isUseCss3d()] 하드웨어 3d 가속 여부<br />
				모바일 단말기별로 다르게 설정된다.<br />
				ios, 갤럭시s3 에서는 true, 크롬및 안드로이드에서는 false
			@param {Function} [htOption.bUseTimingFunction=jindo.m._isUseTimingFunction()]
				애니메이션 동작방식을 결정한다.<br />
				bUseTimingFunction가 true일 경우, CSS3로 애니메이션을 구현하고, false일 경우, 스크립트로 애니메이션을 구현한다.<br />
				모바일 단말기별로 다르게 설정된다.<br />
				ios true, 크롬및 안드로이드에서는 false
	**/
	$init : function(el, htOption) {
		this.option({
			bActivateOnload : true,
			nSildeThreshold : 50,
			sDefaultArea : "main",
			htScrollOption : {},
			nSlideDuration : 200,
			bUseCss3d : jindo.m._isUseCss3d(),
			bUseTimingFunction : jindo.m._isUseTimingFunction()
		});
		this.option(htOption || {});
		this._initVar();
		this._setWrapperElement(el);
		this._initComponent();
		if(this.option("bActivateOnload")) {
			this.activate();
		}
	},

	/**
		jindo.m.RevealSidebarUI 에서 사용하는 모든 인스턴스 변수를 초기화한다.
	**/
	_initVar : function() {
		this._oTransition = new jindo.m.Transition({
			bUseTimingFunction : this.option("bUseTimingFunction")
		});
		this._sStatus = this.option("sDefaultArea");
		this._oLeftLayoutInfo = null;
		this._oRightLayoutInfo = null;
		this._oLeftScroll = null;
		this._oRightScroll = null;
		this._oSize = jindo.m._clientSize();
		this._bUseRebuild = false;
		this.sTranOpen = null;
		this.sTranEnd = null;
		this._setTrans();
	},

	/**
		3d Trans 또는 Trans를 기기별로 적용
	**/
	_setTrans : function() {
		if(this.option("bUseCss3d")) {
			this.sTranOpen = "3d(";
			this.sTranEnd = ",0)";
		} else {
			this.sTranOpen = "(";
			this.sTranEnd = ")";
		}
	},

	/**
		jindo.m.RevealSidebarUI 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
	**/
	_setWrapperElement: function(el) {
		this._htWElement = {};
		el = jindo.$Element(el);
		this._htWElement["body"] = jindo.$Element(jindo.$$.getSingle(".rs-body")).css({
			"overflow" : "hidden"
		});
		if(this._htWElement["body"].css("position") == "static" ) {
			this._htWElement["body"].css("position","relative");
		}
		this._bUseRebuild = (this._htWElement["body"].attr("markup") && this._htWElement["body"].attr("markup").toUpperCase() == "DETAILED") ? false : true;
		this._htWElement["main"] = jindo.$Element(this._htWElement["body"].query(".rs-main"));

		//jindo.m.PageLayoutUI와 연계하기 위해서
		if( this._bUseRebuild && el && !el.isEqual(this._htWElement["body"])) {
			this._htWElement["main"].hide();
			this._htWElement["main"] = el;
			this._htWElement["main"].addClass("rs-main");
		}
		this._htWElement["main"].css({
				"position" : "absolute",
				"zIndex" : 10,
				"left" : 0
		});
		this._htWElement["left"] = jindo.$Element(this._htWElement["body"].query(".rs-left")).css({
			"position" : "absolute",
			"zIndex" : 5,
			"left" : 0
		}).show();
		this._htWElement["right"] = jindo.$Element(this._htWElement["body"].query(".rs-right")).css({
			"position" : "absolute",
			"zIndex" : 5,
			"left" : this.option("nSildeThreshold") + "px"
		}).show();
		this._htWElement["blocker"] = jindo.$Element("<div style='position:absolute;opacity:0;display:none;z-index:1000;opacity:0;-webkit-tap-highlight-color:transparent'>");
		this._htWElement["blocker"].appendTo(this._htWElement["body"]);
		this._oLeftLayoutInfo = this._setLayout(this._htWElement["left"]);
		this._oRightLayoutInfo = this._setLayout(this._htWElement["right"]);
	},

	/**
		화면사이즈 변경시 갱신한다.
		@method resize
	**/
	resize : function() {
		// 화면 사이즈 resize
		this._oSize = jindo.m._clientSize();
		this._htWElement["right"].show();
		this._htWElement["left"].show();

		var oLeftSize = this._getScrollSize(this._oLeftLayoutInfo),
			oRightSize = this._getScrollSize(this._oRightLayoutInfo),
			nPos = this._getPos(this._sStatus);

		this._htWElement["right"].css("width", oRightSize.nWidth + "px");
		this._htWElement["left"].css("width", oLeftSize.nWidth + "px");

		// body resize
		this._htWElement["body"].css({
			width : this._oSize.width + "px",
			height : this._oSize.height + "px"
		});
		// blocker resize
		this._htWElement["blocker"].css({
			width : this.option("nSildeThreshold") + "px",
			height : this._oSize.height + "px",
			left : this._sStatus == "left" ? nPos + "px" : "0px"
		});

		// Element 영역 resize, 위치 정하기
		this._htWElement["main"].css({
			"width" : this._oSize.width + "px",
			"height" : this._oSize.height + "px"
		}).css(jindo.m.getCssPrefix() + "Transform", "translate" + this.sTranOpen + nPos + "px,0px" + this.sTranEnd);

		// scroll resize
		this._oLeftScroll.option({
			"nWidth" : oLeftSize.nWidth,
			"nHeight" : oLeftSize.nHeight
		});
		this._oRightScroll.option({
			"nWidth" : oRightSize.nWidth,
			"nHeight" : oRightSize.nHeight
		});
		this._oLeftScroll.refresh();
		this._oRightScroll.refresh();
		switch(this._sStatus) {
			case "left" : this._htWElement["right"].hide(); break;
			case "right" : this._htWElement["left"].hide(); break;
			case "main" :
				this._htWElement["left"].hide();
				this._htWElement["right"].hide();
				break;
		}
	},

	/**
		회전시 resize 적용

		@param  {jindo.$Event} we
	**/
	_onRotate : function(we) {
		this.resize();
	},

	/**
		좌,우 메뉴의 스크롤 컴포넌트를 초기화한다.
	**/
	_initComponent : function() {
		this._oLeftScroll = this._initScroll(this._oLeftLayoutInfo);
		this._oRightScroll = this._initScroll(this._oRightLayoutInfo);
	},

	/**
		스크롤 컴포넌트를 초기화한다.
	**/
	_initScroll : function(oLayoutInfo) {
		return new jindo.m.Scroll(oLayoutInfo.welWrapper, this.option("htScrollOption"));
	},

	/**
		좌,우 메뉴의 DOM형태를 구성하고, 구성된 엘리먼트를 반환한다.

		@param {jindo.$Element} wel 상위 엘리먼트
	**/
	_setLayout : function(wel) {
		var welHeader = jindo.$Element(wel.query(".rs-header")),
			welFooter = jindo.$Element(wel.query(".rs-footer")),
			welContent = jindo.$Element(wel.query(".rs-content")),
			bHeaderFixed = welHeader && welHeader.attr("position") == "fixed",
			bFooterFixed = welFooter && welFooter.attr("position") == "fixed",
			welWrapper = null;

		if(this._bUseRebuild) {
			welWrapper = this._arrangeDom({
				welContent : welContent,
				bHeaderFixed : bHeaderFixed,
				bFooterFixed : bFooterFixed,
				welHeader : welHeader,
				welFooter : welFooter
			});
		} else {
			welWrapper = jindo.$Element(wel.query(".scroller"));
		}
		return {
			welWrapper : welWrapper,
			welHeader : welHeader,
			welFooter : welFooter,
			bHeaderFixed : bHeaderFixed,
			bFooterFixed : bFooterFixed
		};
	},

	/**
		스크롤 사이즈를 설정한다.

		@param  {Object} oLayoutInfo
		@return {Object} nWidht,nHeight의 해쉬테이블 반환
	**/
	_getScrollSize : function(oLayoutInfo) {
		var nLeft = 0,
			nNoFixedHeight = this._oSize.height,
			bVisible = oLayoutInfo.welWrapper.visible();

		if(!bVisible) {
			nLeft = oLayoutInfo.welWrapper.css("left");
			oLayoutInfo.welWrapper.css("left", "-999px").show();
		}
		if(oLayoutInfo.bHeaderFixed) {
			nNoFixedHeight -= oLayoutInfo.welHeader.height();
		}
		if(oLayoutInfo.bFooterFixed) {
			nNoFixedHeight -= oLayoutInfo.welFooter.height();
		}
		if(!bVisible) {
			oLayoutInfo.welWrapper.css("left", nLeft).hide();
		}
		return {
			nWidth : this._oSize.width - this.option("nSildeThreshold"),
			nHeight : nNoFixedHeight
		};
	},

	/**
		DOM을 재정렬한다.

		@param  {[type]} ht [description]
		@return {jindo.$Element}	Scroller의 부모인 Wrapper객체를 반환한다.
	**/
	_arrangeDom : function(ht) {
		ht.welContent.wrap("<div>").wrap("<div>");
		var welScroller = ht.welContent.parent();
		if(!ht.bHeaderFixed && ht.welHeader) {
			welScroller.prepend(ht.welHeader);
		}
		if(!ht.bFooterFixed && ht.welFooter) {
			welScroller.append(ht.welFooter);
		}
		return welScroller.parent();
	},

	/**
		사이드바를 보여준다 (슬라이드 효과)

		@param  {Boolean} isRight true인 경우, 오른쪽 메뉴가, false인 경우 왼쪽 메뉴가 보인다.
		@param  {Number} nDuration 동작시간
	**/
	_slide : function(isRight, nDuration) {
		var nPos = this._getPos(isRight ? "right" : "left"),
			self=this;
		nDuration = ( typeof nDuration == "undefined" ) ? this.option("nSlideDuration") : nDuration;

		/**
			페이지가 메인으로 복원되기 전에 발생

			@event beforeSlide
			@param {String} sType 커스텀 이벤트명
			@param {String} sStatus 이동 전 페이지 상태(left,main,right)
			@param {Function} stop 수행시 페이지가 이동되지 않음
		**/
		if(this.fireEvent("beforeSlide", {
			sStatus : this._sStatus
		})) {
			self._htWElement["blocker"].show();
			if(isRight) {
				this._htWElement["left"].css("zIndex",5).hide();
				this._htWElement["right"].css("zIndex",6).show();
				self._htWElement["blocker"].css("left","0px");
				this._sStatus = "right";
			} else {
				this._htWElement["right"].css("zIndex",5).hide();
				this._htWElement["left"].css("zIndex",6).show();
				self._htWElement["blocker"].css("left",nPos + "px");
				this._sStatus = "left";
			}
			this._oTransition.queue( this._htWElement["main"].$value(), nDuration, {
				htTransform : {
					"transform" : "translate" + self.sTranOpen + nPos + "px,0px" + self.sTranEnd
				},
				fCallback : function() {
					/**
						페이지가 이동된 후에 발생

						@event slide
						@param {String} sType 커스텀 이벤트명
						@param {String} sStatus 이동 후 페이지 상태(left,main,right)
					**/
					self.fireEvent("slide" ,{
						sStatus : self._sStatus
					});
				}
			}).start();
		}
	},

	/**
		이동할 위치를 계산해준다.

		@param  {String} sStatus 상태
		@return {Number} 위치정보
	**/
	_getPos : function(sStatus) {
		var nPos = parseInt(this._oSize.width - this.option("nSildeThreshold"),10);
		switch(sStatus) {
			case "left" : break;
			case "main" : nPos = 0; break;
			case "right" : nPos = -nPos; break;
		}
		return nPos;
	},

	/**
		타입을 선택하여 이동한다.

		@method move
		@param  {[type]} sType left, main, right 세가지 타입 중 한가지 타입으로 이동한다.
		@param  {[type]} nDuration 이동시 이동시간 (기본 : 옵션값)
	**/
	move : function(sType, nDuration) {
		nDuration = ( typeof nDuration == "undefined" ) ? this.option("nSlideDuration") : nDuration;
		switch(sType) {
			case "left" : this._slide(false,nDuration); break;
			case "main" : this.restore(nDuration); break;
			case "right" : this._slide(true,nDuration); break;
		}
	},

	/**
		왼쪽이나 오른쪽으로 메뉴를 슬라이드 한다.<br />
		만약, 왼쪽이나 오른쪽 메뉴가 보여지고 있을 경우에는 메인화면으로 복원된다.

		@method toggleSlide
		@param  {Boolean} isRight true인 경우, 오른쪽 메뉴가, false인 경우 왼쪽 메뉴가 보인다.
	**/
	toggleSlide : function(isRight) {
		if(this._sStatus != "main") {
			this.restore();
			return;
		} else {
			this._slide(isRight);
			return;
		}
	},

	/**
		메인화면으로 복원시킨다.

		@method restore
		@param  {[type]} nDuration 이동시 이동시간 (기본 : 옵션값)
	**/
	restore : function(nDuration) {
		// if(this._sStatus == "main") {
		//	 return;
		// }
		nDuration = ( typeof nDuration == "undefined" ) ? this.option("nSlideDuration") : nDuration;

		/**
			페이지가 메인으로 복원되기 전에 발생

			@event beforeRestore
			@param {String} sType 커스텀 이벤트명
			@param {String} sStatus 이동 전 페이지 상태(left,main,right)
			@param {Function} stop 수행시 페이지가 이동되지 않음
		**/
		if(this.fireEvent("beforeRestore", {
			sStatus : this._sStatus
		})) {
			var self=this;
			this._oTransition.queue(this._htWElement["main"].$value(), nDuration, {
				htTransform : {
					"transform" : "translate" + self.sTranOpen + "0px,0px" + self.sTranEnd
				},
				fCallback : function() {
					self._sStatus = "main";
					self._htWElement["blocker"].hide();
					self._htWElement["left"].hide();
					self._htWElement["right"].hide();

					/**
						페이지가 메인으로 복원된 후에 발생

						@event restore
						@param {String} sType 커스텀 이벤트명
						@param {String} sStatus 이동 후 페이지 상태(left,main,right)
					**/
					self.fireEvent("restore",{
						sStatus : self._sStatus
					});
				}
			}).start();
		}
	},

	/**
		jindo.m.RevealSidebarUI 컴포넌트를 활성화한다.
		activate 실행시 호출됨
	**/
	_onActivate : function() {
		this._attachEvent();
		this.resize();
		// 위치 resize
		this.move(this._sStatus, 0);
	},

	/**
		jindo.m.RevealSidebarUI 컴포넌트를 비활성화한다.
			activate 실행시 호출됨
	**/
	_onDeactivate : function() {
		this._detachEvent();
	},

	/**
		jindo.m.RevealSidebarUI 에서 사용하는 모든 이벤트를 바인드한다.
	**/
	_attachEvent : function() {
		this._htEvent = {};
		this._htEvent["restore"] = jindo.$Fn(this._onRestore, this).attach(this._htWElement["blocker"], "click");
		this._htEvent["rotate"] = jindo.$Fn(this._onRotate, this).bind();
		jindo.m.bindRotate(this._htEvent["rotate"]);
	},

	/**
		jindo.m.RevealSidebarUI 에서 사용하는 모든 이벤트를 해제한다.
	**/
	_detachEvent : function(){
		this._htEvent["restore"].detach(this._htWElement["blocker"], "click");
		jindo.m.unbindRotate(this._htEvent["rotate"]);
		this._htEvent = null;
	},

	/**
		jindo.m.RevealSidebarUI이 회전시 발생한다.
	**/
	_onRestore : function(we) {
		this.restore();
	},

	/**
		jindo.m.RevealSidebarUI 에서 사용하는 모든 객체를 release 시킨다.

		@method destroy
		@example
			oSelect.destroy();
	**/
	destroy : function() {
		this.deactivate();
		this._oLeftScroll.destroy();
		this._oLeftScroll=null;
		this._oRightScroll.destroy();
		this._oRightScroll=null;
		this._oTransition.destroy();
		this._oTransition= null;
	}
}).extend(jindo.m.UIComponent);/**
	@fileOverview Form Element의 selectbox를 모바일에 환경에 맞게 커스터마이징한 컴포넌트
	@author sculove
	@version 1.7.1
	@since 2012. 5. 31.
**/
/**
	Form Element의 selectbox를 모바일에 환경에 맞게 커스터마이징한 컴포넌트

	@class jindo.m.Selectbox
	@extends jindo.m.UIComponent
	@uses jindo.m.Scroll
	@keyword selectbox, 셀렉트박스
	@group Component

  @history 1.7.0 안드로이드 2.3.6 버전에서 native selectbox 에 opacity 값을 0으로 주면 선택이 되지 않는 문제 해결
    @history 1.7.0 Bug 안드로이드 4.x 갤럭시 시리즈에서 하이라이트 사라지지 않는 문제 제거
	@history 1.3.0 Release 최초 릴리즈
**/
jindo.m.Selectbox = jindo.$Class({
	/* @lends jindo.m.Selectbox.prototype */
	/**
		초기화 함수

		@constructor
		@param {Varient} el input 엘리먼트 또는 ID
		@param {Object} [htOption] 초기화 옵션 객체
			@param {Boolean} [htOption.bActivateOnload=true] 컴포넌트 로드시 activate 여부
			@param {String} [htOption.sClassPrefix="select-"] Class의 prefix명
			@param {String} [htOption.sPlaceholder="선택해주세요"] 선택된 아이템이 없을 경우, context영역에 표시되는 안내문구
			@param {Number} [htOption.nHeight=80] 사용자 디자인 형태일 경우 selecmenu의 height 크기
			@param {String} [htOption.sItemTag="li"] 사용자 디자인 형태일 경우 selecmenu의 구성 아이템 태그
			@param {Number} [htOption.nDefaultIndex=-1] 초기 설정되는 값의 인덱스
	**/
	$init : function(el, htOption) {
		this.option({
			bActivateOnload : true,
			sClassPrefix : "select-",
			sPlaceholder : "선택해주세요",
			nHeight : 80,
			sItemTag : "li",
			nDefaultIndex : -1
		});
		this.option(htOption || {});
		this._initVar();
		this._setWrapperElement(el);
		this._init();
		if(this.option("bActivateOnload")) {
			this.activate();
			this.select(this.option("nDefaultIndex"));
		}
	},
	/**
		jindo.m.Selectbox 에서 사용하는 모든 인스턴스 변수를 초기화한다.
	**/
	_initVar : function() {
		this._isNative = false;
		this._oScroll = null;
		this._sClassPrefix = this.option("sClassPrefix");
		this._aItems = null;
		this._nCurrentIdx = -1;
	},

	/**
		jindo.m.Selectbox 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
		@param {Varient} el 엘리먼트를 가리키는 문자열이나, HTML엘리먼트
	**/
	_setWrapperElement: function(el) {
		this._htWElement = {};
		this._htWElement["base"] = jindo.$Element(el);
		this._htWElement["content"] = jindo.$Element(this._htWElement["base"].query("." + this._sClassPrefix + "content"));
		this._htWElement["arrow"] = jindo.$Element(this._htWElement["base"].query("." + this._sClassPrefix + "arrow"));
		this._htWElement["selectmenu"] = jindo.$Element(this._htWElement["base"].query("." + this._sClassPrefix + "selectmenu"));
	},

	/**
		jindo.m.Selectbox 에서 사용하는 모든 엘리먼트의 속성을 설정한다.
	**/
	_init : function() {
		this._isNative = this._htWElement["selectmenu"].$value().tagName == "SELECT" ? true : false;
		this._htWElement["base"].css({
			"position" : "relative",
			"display" : "-webkit-box",
			"-webkit-box-align" : "center",
			"-webkit-box-pack" : "center",
			"-webkit-tap-highlight-color" : "transparent"
		});
		this._htWElement["content"].css({
			"display" : "block",
			"overflow" : "hidden",
			"text-overflow" : "ellipsis",
			"cursor" : "pointer",
			"text-align" : "center",
			"width" : "90%"
		});

		if(this._htWElement["arrow"]) {
			this._htWElement["arrow"].css({
				"position" : "relative",
				"text-align" : "right",
				"display" : "block",
				"text-algn" : "right"
			});
		}
		this._htWElement["selectmenu"].css({
			"position" : "absolute",
			"left" : "0px",
			// "top" : "60px",
			"margin" : "0px",
			"zIndex" : 100
		});

		if(this._isNative) {
			this._htWElement["selectmenu"].css({
				"opacity" : "0.0001",
				"height" : "100%",
				"min-height" : "100%",
				"width" : "100%"
			});
		} else {
			this._htWElement["selectmenu"].css({
				"width" : "100%"
			}).hide();
			this._htWElement["selectmenu"].first().css("width","100%");
			this._oScroll = new jindo.m.Scroll(this._htWElement["selectmenu"].$value(), {
				nHeight : this.option("nHeight"),
				bUseScrollbar : false,
				bUseMomentum : true,
				bUseHighlight : false,
				bUseBounce : true
			});
		}
		this._refreshItems();
	},


	/**
		jindo.m.Selectbox 컴포넌트를 활성화한다.
		activate 실행시 호출됨
	**/
	_onActivate : function() {
		this._attachEvent();
	},

	/**
		jindo.m.Selectbox 컴포넌트를 비활성화한다.
		deactivate 실행시 호출됨
	**/
	_onDeactivate : function() {
		this._detachEvent();
	},

	/**
		jindo.m.Selectbox 에서 사용하는 모든 이벤트를 바인드한다.
	**/
	_attachEvent : function() {
		this._htEvent = {};
		if(this._isNative) {
			this._htWElement["selectmenu"].show();
		} else {
			this._htEvent["selectmenu"] = jindo.$Fn(this._onShow,this).attach(this._htWElement["base"], "click");
			this._htEvent["document"] = jindo.$Fn(this._onDocumentStart, this).attach(document, "touchstart");
		}
		this._htEvent["select"] = jindo.$Fn(this._onSelect,this).attach(this._htWElement["selectmenu"], this._isNative ? "change" : "click");
	},

	/**
		jindo.m.Selectbox 에서 사용하는 모든 이벤트를 해제한다.
	**/
	_detachEvent : function(){
		if(this._isNative) {
			this._htWElement["selectmenu"].hide();
		} else {
			this._htEvent["selectmenu"].detach(this._htWElement["base"], "click");
			this._htEvent["document"].detach(document, "touchstart");
		}
		this._htEvent["select"].detach(this._htWElement["selectmenu"], this._isNative ? "change" : "click");
		this._htEvent = null;
	},

	/**
		메뉴의 아이템 선택시 나타나는 이벤트 핸들러
		@param  {jindo.$Event} we
	**/
	_onShow : function(we) {
		this._showMenuForCustom();
	},

	/**
		사용자 디자인일 경우, 선택시 메뉴 나타나는 이벤트 핸들러
		@param  {jindo.$Event} we
	**/
	_onSelect : function(we) {
		// console.log("onSelect");
		if(this._isNative) {
			 this.select(we.element.selectedIndex);
		} else {
			var welParent = jindo.$Element(we.element).parent();
			this.select(welParent.indexOf(we.element));
		}
		we.stop();
	},

	/**
		스크롤 도중 scroll 영역 바깥을 선택하였을시, 스크롤을 중지시킴
		@param {jindo.$Event} we
	**/
	_onDocumentStart : function(we) {
		if(this._htWElement["selectmenu"].visible()) {
			if(this._htWElement["selectmenu"].isParentOf(we.element) || this._htWElement["selectmenu"].isEqual(we.element) ) {
				return true;
			} else {
				this._hideMenuForCustom();
			}
		}
	},

	/**
		인덱스에 해당하는 엘리먼트를 선택한다.

		@method select
		@param  {Number} nIdx 인덱스
		@example
			oSelect.select(nIdx);  // nIdx의 아이템을 선택한다.
	**/
	select : function(nIdx) {
		if(0 <= nIdx && nIdx < this._aItems.length) {
			if(nIdx != this._nCurrentIdx) {

				/**
					아이템 선택되기 전에 발생하는 사용자 이벤트

					@event beforeSelect
					@param {String} sType 커스텀 이벤트명
					@param {Number} nCurrentIdx 현재 선택된 아이템의 index
					@param {String} sValue 현재 선택된 아이템의 값
					@param {Function} stop 달력이 새로 그려지지 않도록 중단시키는 메소드
				**/
				if(this.fireEvent("beforeSelect", {
					nCurrentIdx : this._nCurrentIdx,
					sValue : this.getValue()
				})) {
					if(this._isNative) {
						this._aItems[nIdx].selected = true;
						this._setValue(this._aItems[nIdx].value);
					} else {
						var wel = jindo.$Element(this._aItems[nIdx]);
						if(this._aItems[this._nCurrentIdx]) {
							jindo.$Element(this._aItems[this._nCurrentIdx]).removeClass(this._sClassPrefix + "selected");
						}
						wel.addClass(this._sClassPrefix + "selected");
						this._setValue(wel.text());
						this._hideMenuForCustom();
					}
					var nPrevIdx = this._nCurrentIdx;
					this._nCurrentIdx = nIdx;

				/**
					아이템 선택된 후에 발생하는 사용자 이벤트

					@event select
					@param {String} sType 커스텀 이벤트명
					@param {Number} nPrevIdx 선택되기 전 아이템의 index
					@param {Number} nCurrentIdx 선택된 아이템의 index
					@param {String} sPrevValue 선택되기 전 아이템의 값
					@param {String} sValue 선택된 아이템의 값
				**/
					this.fireEvent("select", {
						nPrevIdx : nPrevIdx,
						sPrevValue : this.getValue(nPrevIdx),
						nCurrentIdx : this._nCurrentIdx,
						sValue : this.getValue()
					});
				}
			}
		} else {
			this._setValue(this.option("sPlaceholder"));
		}
	},

	/**
		custom 셀렉트 메뉴일 경우, 보이게 한다.
	**/
	_showMenuForCustom : function() {
		if(!this._isNative && !this._htWElement["selectmenu"].visible()) {
			this._htWElement["selectmenu"].show();
			var nItemHeight = jindo.$Element(this._htWElement["selectmenu"].query(this.option("sItemTag"))).height();
			this._oScroll.refresh();
			this._oScroll.scrollTo(0, this._nCurrentIdx < 0 ? 0 : -this._nCurrentIdx * nItemHeight);
			this._htEvent["selectmenu"].detach(this._htWElement["base"], "click");
		}
	},

	/**
		custom 셀렉트 메뉴일 경우, 보이게 한다.
	**/
	_hideMenuForCustom : function() {
		if(!this._isNative && this._htWElement["selectmenu"].visible()) {
			this._htWElement["selectmenu"].hide();
			this._htEvent["selectmenu"].attach(this._htWElement["base"], "click");
		}
	},

	/**
		아이템 정보를 재갱신한다.
	**/
	_refreshItems : function() {
		if(this._isNative) {
			this._aItems = this._htWElement["selectmenu"].$value().options;
		} else {
			this._aItems = this._htWElement["selectmenu"].queryAll(this.option("sItemTag"));
		}
	},

	/**
		데이터를 갱신하여줌.

		@method refresh
		@param  {Array} aData 실제 데이터 배열
		@example
			oSelect.refresh(aData);  // aData로 데이터를 갱신
	**/
	refresh : function(aData) {
		var sHTML = "";
		var sItemTag = this._isNative ? "option" : this.option("sItemTag");
		for(var i=0, nLength = aData.length; i < nLength; i++) {
			sHTML += "<";
			sHTML += sItemTag;
			sHTML += ">";
			sHTML += aData[i];
			sHTML += "</";
			sHTML += sItemTag;
			sHTML += ">";
		}
		if(this._isNative) {
			this._htWElement["selectmenu"].html(sHTML);
		} else {
			this._htWElement["selectmenu"].first().html(sHTML);
		}
		this._refreshItems();
		this._nCurrentIdx = -1;
		this.select(this._nCurrentIdx);
	},

	/**
		값을 설정한다.
		@param {String} sValue 선택된 내용의 값을 설정한다.
	**/
	_setValue : function(sValue) {
		this._htWElement["content"].text(sValue);
	},

	/**
		현재 인덱스 값을 반환한다.

		@method getCurrentIdx
		@return {Number}  현재 설정된 인덱스 값
	**/
	getCurrentIdx : function() {
		return this._nCurrentIdx;
	},

	/**
		현재 선택된 아이템의 이름을 반환하거나, 특정 인덱스에 해당하는 아이템의 이름을 반환한다.

		@method getValue
		@param  {Number} nIdx 옵션.
		@return {String}		인덱스를 줄경우, 인덱스에 해당하는 아이템의 이름을 반환.
		@example
			oSelect.getValue(); // 현재 선택된 아이템의 값을 반환
			oSelect.getValue(2); // 인덱스2인 아이템의 값을 반환
	**/
	getValue : function(nIdx) {
		var sValue = "";
		nIdx = (typeof nIdx === "undefined") ? this._nCurrentIdx : nIdx;
		if(0<= nIdx && nIdx < this._aItems.length) {
			if(this._isNative) {
				sValue = this._aItems[nIdx].value;
			} else {
				sValue = jindo.$Element(this._aItems[nIdx]).text();
			}
		}
		return sValue;

	},

	/**
		disable 한다.

		@method disable
		@example
			oSelect.disable();
	**/
	disable : function() {
		var sClassName = this._sClassPrefix + "disable";
		if(this._htWElement["base"].hasClass(sClassName)) {
			return;
		}
		this._htWElement["base"].addClass(sClassName);
		if(this._isNative) {
			this._htWElement["selectmenu"].hide();
		} else {
			this._htWElement["selectmenu"].hide();
			this._htEvent["selectmenu"].detach(this._htWElement["base"], "click");
		}
	},

	/**
		enable한다.

		@method enable
		@example
			oSelect.enable();
	**/
	enable : function() {
		var sClassName = this._sClassPrefix + "disable";
		if(!this._htWElement["base"].hasClass(sClassName)) {
			return;
		}
		this._htWElement["base"].removeClass(this._sClassPrefix + "disable");
		if(this._isNative) {
			this._htWElement["selectmenu"].show();
		} else {
			this._htEvent["selectmenu"].attach(this._htWElement["base"], "click");
		}
	},

	/**
		jindo.m.Selectbox 에서 사용하는 모든 객체를 release 시킨다.

		@method destroy
		@example
			oSelect.destroy();
	**/
	destroy : function() {
		this.deactivate();
		if(this._oScroll) {
			this._oScroll.destroy();
		}
	}
}).extend(jindo.m.UIComponent);/**
    @fileOverview 여러 패널로 나뉘어진 영역에 탭을 이용한 슬라이드 네비게이팅을 제공하는 컴포넌트
    @author sculove
    @version 1.7.1
    @since 2011. 7. 14.
**/
/**
    여러 패널로 나뉘어진 영역에 탭을 이용한 슬라이드 네비게이팅을 제공하는 컴포넌트

    @class jindo.m.SlideTab
    @extends jindo.m.CoreTab
    @uses jindo.m.SlideEffect
    @keyword slidetab
    @group Component

    @history 1.7.0 초기 nDefaultIndex 값을 한 페이지에서 노출될 개수보다 높게 정의했을때 애니메이션 기능 되던 문제.<br />
                            select(nPage) 함수 호출시 다음/이전 페이지의 첫번째 탭으로 이동되던 문제.  
    @history 1.7.0 Bug resize 함수 오류 수정
    @history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
    @history 1.2.0 Update 패널 슬라이드 기능 추가
    @history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
    @history 0.9.0 Release 최초 릴리즈
**/
jindo.m.SlideTab = jindo.$Class({
    /* @lends jindo.m.SlideTab.prototype */
    /**
        초기화 함수

        @constructor
        @param {String|HTMLElement} el SlideTab할 Element (필수)
        @param {Object} [htOption] 초기화 옵션 객체
            @param {Number} [htOption.nDefaultIndex=0] 초기 선택되는 Tab컴포넌트 index를 지정한다.
            @param {Number} [htOption.nSlideDuration=200] 이전, 다음버튼 클릭시에 slide되어 완전히 보여지는 시간 (단위 ms)
            @param {String} [htOption.sTimingFunction="ease-in-out"] Slide시 애니메이션 효과
            <ul>
            <li>ease : 속도가 급가속되다가 급감속되는 효과 (거의 끝에서 급감속됨)</li>
            <li>linear : 등속효과</li>
            <li>ease-in : 속도가 점점 빨라지는 가속 효과</li>
            <li>ease-out : 속도가 천천히 줄어드는 감속효과</li>
            <li>ease-in-out : 속도가 천천히 가속되다가 천천히 감속되는 효과 (가속과 감속이 부드럽게 전환됨)</li>
            </ul>
            @param {Number} [htOption.nCountPerVeiw=3] Tab 컴포넌트의 한 페이지당 표시되는 tab 수. 이 값은 최상위 tab컴포넌트의 width값에 의해 분할된다.
            @param {Boolean} [htOption.bActivateOnload=true] <auidoc:see content="jindo.m.FloatingLayer">FloatingLayer</auidoc:see>  컴포넌트가 로딩 될때 활성화 시킬지 여부를 결정한다.<br />
                false로 설정하는 경우에는 Tab.activate()를 호출하여 따로 활성화 시켜야 한다.
    **/
    $init : function(el,htOption) {
        this.option({
             nSlideDuration : 200,
             sTimingFunction : "ease-in-out",
             nCountPerVeiw : 3
        });
        this.option(htOption || {});
        this._initData();
        if(this.option("bActivateOnload")) {
            this.resize();
            this.activate();
        }
        this.select(this.option("nDefaultIndex"), {"bEffect": false});
    },

    /**
        jindo.m.SlideTab 에서 사용하는 모든 인스턴스 변수를 초기화한다.
        @override
    **/
    _initVar: function() {
        this.$super._initVar();
        this._nCurrentPage = 1;
        this._nTotalPage = 1;
        this._nPageWidth = 0;
        this._aDummyTab = [];
        this._oEffect = null;
        this._isNext = null;
    },

    /**
        jindo.m.SlideTab 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
        @override
    **/
    _setWrapperElement: function(el) {
        var sPrefix = this._sPrefix;
        this.$super._setWrapperElement(el);
        this._htWElement["tab_view"] = jindo.$Element(this._htWElement["baseElement"].query('.' + sPrefix + 'tabview'));
        this._htWElement["tab_container"] = jindo.$Element(this._htWElement["baseElement"].query('.' + sPrefix + 'tab-cont'));
        this._htWElement["prev"] = jindo.$Element(this._htWElement["baseElement"].query('.' + sPrefix + 'prev'));
        this._htWElement["next"] = jindo.$Element(this._htWElement["baseElement"].query('.' + sPrefix + 'next'));
        this._htWElement["baseElement"].css("position","relative");
        this._htWElement["tab_view"].css("overflow","hidden");
    },

    /**
        초기 tab, panel 데이터 초기화
        @override
    **/
    _initData : function() {
        this.$super._initData();
        var nCountPreView = this.option("nCountPerVeiw"),
            el = null,
            nRemainPage;

        // total Page 사이즈 결정
        this._nTotalPage = parseInt(this._aTab.length / nCountPreView, 10);
        nRemainPage = this._aTab.length % nCountPreView;
        if(nRemainPage > 0 ) {
            this._nTotalPage++;
        }
        // dummy tab 생성
        for(var j=0, nLength=nCountPreView - nRemainPage; j< nLength; j++) {
            el = jindo.$("<li></li>");
            this._aDummyTab.push(jindo.$Element(el));
            this._htWElement["tab_container"].append(el);
        }
        // Effect 생성
        this._oEffect = new jindo.m.LayerEffect(this._htWElement["tab_container"].$value());
    },

    /**
        현재 Tab의 페이지를 반환한다.

        @method getCurrentPage
        @return {Number} 현재 tab의 현재 페이지를 반환함 (page수는 1부터)
    **/
    getCurrentPage : function() {
        return this._nCurrentPage;
    },

    /**
        현재 Tab의 총 페이지수를 반환

        @method getTotalPage
        @return {Number} 현재 Tab의 총 페이지수를 반환. (초기값 1)
    **/
    getTotalPage : function() {
        return this._nTotalPage;
    },

    /**
        Tab을 View에 맞게 조절 및 Page 설정값 조정
        @method resize
    **/
    resize : function() {
        var nTabWidth, nPrePageWidth = this._nPageWidth;
        // tab 사이즈 결정
        this._nPageWidth = this._htWElement["tab_view"].width() - this._htWElement["prev"].width() - this._htWElement["next"].width();
        nTabWidth = this._nPageWidth / this.option("nCountPerVeiw");

        if(nPrePageWidth > this._nPageWidth) {  // 기존 사이즈 보다 작아지는 경우
            this._setTabWidth(nTabWidth);
            this._htWElement["tab_container"].width(this._nPageWidth * this._nTotalPage);
        } else {        // 기존 사이즈 보다 커지는 경우
            this._htWElement["tab_container"].width(this._nPageWidth * this._nTotalPage);
            this._setTabWidth(nTabWidth);
        }
        this._htWElement["tab_container"].css("left", (this._nCurrentPage-1) * -this._nPageWidth );
    },

    /**
        Tab의 width를 설정한다.
    **/
    _setTabWidth : function(nTabWidth) {
        for(var i in this._aTab) {
            this._aTab[i].width(nTabWidth);
        }
        for(i in this._aDummyTab) {
            this._aDummyTab[i].width(nTabWidth);
        }
    },

    /**
        beforePrev 사용자 이벤트 호출
    **/
    _fireEventBeforePrev : function() {

        /**
            이전버튼 이벤트 발생 전에 발생

            @event beforePrev
            @param {String} sType 커스텀 이벤트명
            @param {Number} nPage 이전버튼 이벤트 발생 전 페이지 번호 (1번부터 시작)
            @param {Number} nIndex 이전버튼 이벤트 발생 전에 선택된 tab 인덱스 번호 (0부터 시작)
            @param {Number} nTotalPage 총 페이지 개수
            @param {Function} stop prev를 중지한다. beforePrev이후 커스텀 이벤트(prev)가 발생하지 않는다.
        **/
        return this.fireEvent("beforePrev", {
            nPage : this._nCurrentPage,
            nIndex : this._nCurrentIndex,
            nTotalPage : this._nTotalPage
        });
    },

    /**
        Prev 사용자 이벤트 호출
    **/
    _fireEventPrev : function() {
        /**
            이전버튼 이벤트 발생 후에 발생

            @event prev
            @param {String} sType 커스텀 이벤트명
            @param {Number} nPage 이전버튼 이벤트 발생 후 페이지 번호 (1번부터 시작)
            @param {Number} nIndex 이전버튼 이벤트 발생 후에 선택된 tab 인덱스 번호 (0부터 시작)
            @param {Number} nTotalPage 총 페이지 개수
            @param {Function} stop stop stop를 호출하여 영향 받는 것이 없음.
        **/
        this.fireEvent("prev", {
            nPage : this._nCurrentPage,
            nIndex : this._nCurrentIndex,
            nTotalPage : this._nTotalPage
        });
    },

    /**
        beforeNext 사용자 이벤트 호출
    **/
    _fireEventBeforeNext : function() {
        /**
            이전버튼 이벤트 발생 후에 발생

            @event beforeNext
            @param {String} sType 커스텀 이벤트명
            @param {Number} nPage 이후버튼 이벤트 발생 전 페이지 번호 (1번부터 시작)
            @param {Number} nIndex 이후버튼 이벤트 발생 전에 선택된 tab 인덱스 번호 (0부터 시작)
            @param {Number} nTotalPage 총 페이지 개수
            @param {Function} stop next를 중지한다. beforeNext이후 커스텀 이벤트(next)가 발생하지 않는다.
        **/
        return this.fireEvent("beforeNext", {
            nPage : this._nCurrentPage,
            nIndex : this._nCurrentIndex,
            nTotalPage : this._nTotalPage
        });
    },

    /**
        Prev 사용자 이벤트 호출
    **/
    _fireEventNext : function() {
        /**
            이후버튼 이벤트 발생 후에 발생

            @event next
            @param {String} sType 커스텀 이벤트명
            @param {Number} nPage 이후버튼 이벤트 발생 후 페이지 번호 (1번부터 시작)
            @param {Number} nIndex 이후버튼 이벤트 발생 후에 선택된 tab 인덱스 번호 (0부터 시작)
            @param {Number} nTotalPage 총 페이지 개수
            @param {Function} stop stop stop를 호출하여 영향 받는 것이 없음.
        **/
        this.fireEvent("next", {
            nPage : this._nCurrentPage,
            nIndex : this._nCurrentIndex,
            nTotalPage : this._nTotalPage
        });
    },

    _onAfterSelect : function(welElement) {
        this.select(this._getIdx(welElement));
    },

    /**
        index에 해당하는 패널 선택
        @param {Object} nIdx
    **/
    _beforeSelect : function(nIdx) {
    },

    /**
     * index에 해당하는 패널 선택
     * @param {Object} nIdx
     * @history 1.7.0 htOption 추가 {bSelect : 버튼 클릭을 통해 실행된 경우 , bEffect : 사용자가 임의로 움직임을 처리 하기 위한 duration 정보}
     * @history 1.5.0 Bug 셀렉트 될 경우, 해당 뷰로 이동하는 버그 수정
     */
    select : function(nIdx, htOption) {
        this.$super.select(nIdx);
        var nPage = parseInt(nIdx / ~~this.option("nCountPerVeiw"),10) + 1,
            nDiff = nPage - this.getCurrentPage();
        if( nDiff > 0 ) {
            this.next(nDiff, htOption);
        } else if(nDiff < 0) {
            this.prev(-nDiff, htOption);
        }
    },

    /**
     * @description jindo.m.SlideTab 에서 사용하는 모든 이벤트를 바인드한다.
     * @override
     */
    _attachEvent : function() {
        this.$super._attachEvent();
        this._htEvent["prev_click"] = {
            ref: jindo.$Fn(this._onPrev, this).attach(this._htWElement["prev"], "click"),
            el: this._htWElement["prev"]
        };
        this._htEvent["next_click"] = {
            ref : jindo.$Fn(this._onNext, this).attach( this._htWElement["next"], "click"),
            el : this._htWElement["next"]
        };
        this._oEffect.attach("afterEffect", jindo.$Fn(this._onAfterEffect, this).bind());
    },

    /**
     * @description jindo.m.SlideTab 에서 사용하는 모든 이벤트를 해체한다.
     * @override
     */
    _detachEvent : function() {
        this._oEffect.detachAll();
        this.$super._detachEvent();
    },

    /**
     * 효가가 완료되었을 경우, 현재 페이지값을 변경하고, 현재 페이지의 첫번째 tab을 선택
     *  버튼을 통해 이동한(this._bSelect == true) 경우 페이지의 첫번째 아이템을 선택할 수 있도록 처리 하기 위한<br />
     *  반대로 버튼을 통하지 않았을 경우 (select(4)) 선택한 탭이 위치한 페이지로 이동만 가능하도록 한다.
     */
    _onAfterEffect : function() {
        if(this._isNext) {
            this._nCurrentPage++;
            this._fireEventNext();
        } else {
            this._nCurrentPage--;
            this._fireEventPrev();
        }
        this._isNext = null;
        
        if(this._bSelect){
            this.select((this._nCurrentPage-1) * this.option("nCountPerVeiw"));
        }
    },

    /**
     * 이번 버튼이 눌러졌을 경우 이벤트 처리
     * @param {Object} we
     */
    _onPrev : function(we) {
        if(this._oPanelEffect && this._oPanelEffect.isPlaying() ) {
            we.stop(jindo.$Event.CANCEL_ALL);
            return false;
        }
        this.prev(1, {"bSelect" : true});
    },

    /**
     * @description 이전으로 이동한다.
     * @param {Number} 이전으로 이동할 페이지수 (기본값 1)
     * @history 1.7.0 htOption 추가 {bSelect : 버튼 클릭을 통해 실행된 경우(true) 첫번째 탭을 선택한다 , bEffect : 사용자가 임의로 움직임을 처리 하기 위한 duration 정보}
     * @history 1.5.0 Update Method 추가
     */
    prev : function(nNum, htOption) {
        if(nNum != undefined && nNum <= 0){
            return false;
        }
        nNum = nNum || 1;
        htOption = !htOption ? {} : htOption;
        this._bSelect = htOption.bSelect || false;
        var nPrevPage = this._nCurrentPage - nNum + 1;
        if ((nPrevPage > 1) && !this._oEffect.isPlaying()) {
            if(!htOption.bEffect && htOption.bEffect != undefined){
                this._htWElement["tab_container"].css("left" , this._nPageWidth * nNum);
                this._onAfterEffect();
            }else{
                if (this._fireEventBeforePrev()) {
                    this._oEffect.slide({
                        sDirection: "right",
                        nDuration: this.option("nSlideDuration"),
                        sTransitionTimingFunction : this.option("sTimingFunction"),
                        nSize: this._nPageWidth * nNum
                    });
                }
            }
            this._nCurrentPage = nPrevPage;
            this._isNext = false;
        }
    },

    /**
     * 이후 버튼이 눌러졌을 경우 이벤트 처리
     * @param {Object} we
     */
    _onNext : function(we) {
//      console.log(this._nCurrentPage, this._nTotalPage);
        if(this._oPanelEffect && this._oPanelEffect.isPlaying() ) {
            we.stop(jindo.$Event.CANCEL_ALL);
            return false;
        }
        this.next(1, {"bSelect" : true});
    },

    /**
     * @description 다음으로 이동한다.
     * @param {Number} 다음으로 이동할 페이지수 (기본값 1)
     * @history 1.7.0 htOption 추가 {bSelect : 버튼 클릭을 통해 실행된 경우(true) 첫번째 탭을 선택한다  , bEffect : 사용자가 임의로 움직임을 처리 하기 위한 duration 정보}
     * @history 1.5.0 Update Method 추가
     */
    next : function(nNum, htOption) {
        if(nNum != undefined && nNum <= 0){
            return false;
        }
        nNum = nNum || 1;
        htOption = !htOption ? {} : htOption;
        this._bSelect = htOption.bSelect || false;
        var nNextPage = this._nCurrentPage + nNum -1;
        if ((nNextPage < this._nTotalPage) && !this._oEffect.isPlaying()) {
            if (this._fireEventBeforeNext()) {
                this._nCurrentPage = nNextPage;
                this._isNext = true;
                if(!htOption.bEffect && htOption.bEffect != undefined){
                    this._htWElement["tab_container"].css("left" , -this._nPageWidth * nNum);
                    this._onAfterEffect();
                }else{
                    this._oEffect.slide({
                        sDirection: "left",
                        nDuration: this.option("nSlideDuration"),
                        sTransitionTimingFunction : this.option("sTimingFunction"),
                        nSize: this._nPageWidth * nNum
                    });
                }
            }
        }
    },

    /**
        jindo.m.SlideTab 에서 사용하는 모든 객체를 release 시킨다.
        @override
        @method destroy
    **/
    destroy : function() {
        this.deactivate();
        for(var p in this._aDummyTab) {
            this._aDummyTab[p] = null;
        }
        this._aDummyTab = null;
        this._initVar();

        if(this._oEffect) {
            this._oEffect.destroy();
            this._oEffect = null;
        }
        this.$super.destroy();
    }
}).extend(jindo.m.CoreTab);/**
	@fileOverview 클릭 또는 드래그로 슬라이더 바를 이동시켜 값을 설정할 수 있는 컴포넌트
	@author "oyang2"
	@version 1.7.1
	@since 2011. 9. 5.
**/
/**
	클릭 또는 드래그로 슬라이더 바를 이동시켜 값을 설정할 수 있는 컴포넌트

	@class jindo.m.Slider
	@extends jindo.m.UIComponent
	@uses jindo.m.Touch
	@keyword slider, thumb, track, 슬라이더
	@group Component

	@history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
	@history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
	@history 0.9.0 Release 최초 릴리즈
**/
jindo.m.Slider = jindo.$Class({
	/* @lends jindo.m.Slider.prototype */
	/**
		초기화 함수
		@constructor
		@param {String | HTMLElement} 기준 엘리먼트
		@param {Object} htOption 초기화 옵션 설정을 위한 객체
			@param {String} [htOption.sClassPrefix='slider-'] Class의 prefix명
			@param {Boolean} [htOption.bVertical=false] 슬라이더 세로 여부
			@param {Number} [htOption.nMinValue=0] 슬라이더의 최소값
			@param {Number} [htOption.nMaxValue=100] 슬라이더의 최대값
			@param {Number} [htOption.nDefaultValue=0] 슬라이더의 초기 로드 값
			@param {Boolean} [htOption.bActivateOnload=true] 컴포넌트 로드시 activate 여부
		@example
			var oSlider = new jindo.m.Slider('slider1', {
				sClassPrefix : 'slider-', //클래스명 접두어
				bVertical : false, //슬라이더 세로 여부
				nMinValue : 0, //슬라이더 최소값
				nMaxValue : 100, //슬라이더 최대값
				nDefaultValue : 0 , //초기 로드 thumb 값
				bActivateOnload : true // 활성화여부
			}).attach({
				'beforeChange' : function(oCustomEvt){

				},
				'change' : function(oCustomEvt){

				}
			})
	**/
	$init : function(sId, htOption) {
		this.option({
			 sClassPrefix : 'slider-',
			 bVertical : false,
			 nMinValue : 0,
			 nMaxValue : 100,
			 nDefaultValue : 0,
			 bActivateOnload : true
		});
		this.option(htOption || {});

		this._setWrapperElement(sId);
		this._initVar();

		if(this.option("bActivateOnload")) {
			this.activate();
			this.setValue(this.option('nDefaultValue'));
		}
	},

	/**
		jindo.m.Slider 에서 사용하는 모든 인스턴스 변수를 초기화한다.
	**/
	_initVar: function() {
		var nMove = this.option('bVertical')? 0: 6;
		nMove = jindo.m.getDeviceInfo().win? 0 : nMove;

		this._oTouch = new jindo.m.Touch(this._htWElement.track.$value(),{
			nMoveGap: nMove,
			bActivateOnload: false
		});
		//
		this._oTouch.attach({
			'touchMove' : jindo.$Fn(this._onMove, this).bind(),

			/**
				Thumb에 손을 떼었을 때 발생

				@event touchEnd
				@param {Number} nValue 현재 Thumb의 위치의 계산된 슬라이더 값
				@param {Number} nPosition 현재 Thumb의 위치의 전체 track대비의 퍼센트 값
				@history 1.4.0 Update 사용자 이벤트 추가
			**/
			'touchEnd' : jindo.$Fn(this._onMove, this).bind(),
			'touchStart' : jindo.$Fn(this._onStart, this).bind()
		});

		this._htSwap ={
			left : this.option('bVertical')? 'top' : 'left',
			width :  this.option('bVertical')? 'height' : 'width',
			nX :  this.option('bVertical')? 'nY' : 'nX'
		};

		//size 조정
		var nSize = this._htWElement.thumb[this._htSwap.width]()/2;
		this._htWElement.thumb.css('margin-'+this._htSwap.left, nSize*-1);
	},

	/**
		jindo.m.Slider 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
	**/
	_setWrapperElement: function(el) {
		this._htWElement = {};
		el = jindo.$(el);
		var sClass = '.' + this.option('sClassPrefix');

		this._htWElement.track = jindo.$Element(el);
		var elThumb = jindo.$$.getSingle(sClass+'thumb', el);
		this._htWElement.thumb = elThumb? jindo.$Element(elThumb) : null;
		var elRang = jindo.$$.getSingle(sClass+'range', el);
		this._htWElement.range = elRang? jindo.$Element(elRang) : null;
	},

	_onStart : function(oCustomEvt){
		var htParam = {
			nValue : this.getValue(),
			nPosition : this.getPosition()
		};
		/**
			Thumb에 손을 터치 했을 때 발생

			@event touchStart
			@param {Number} nValue 현재 Thumb의 위치의 계산된 슬라이더 값
			@param {Number} nPosition 현재 Thumb의 위치의 전체 track대비의 퍼센트 값

		**/
		if(!this.fireEvent('touchStart', htParam)){
			return;
		}

		//하이라이팅 막아버리기
		oCustomEvt.oEvent.stop(jindo.$Event.CANCEL_DEFAULT);
	},

	_onMove : function(oCustomEvt){
		if(oCustomEvt.sType == 'touchMove'){
			oCustomEvt.oEvent.stop(jindo.$Event.CANCEL_DEFAULT);
		}

		var nCurrent = oCustomEvt[this._htSwap.nX] - this._htWElement.track.offset()[this._htSwap.left] - (this._htWElement.thumb[this._htSwap.width]()/2);
		var nPos = this._getAdjustedPos(nCurrent);

		this._move(nPos);

		this.fireEvent(oCustomEvt.sType, {
			nValue : this.getValue(),
			nPosition : this.getPosition()
		});

	},

	_move : function(nPos, bFireEvent){
		if(typeof bFireEvent == 'undefined'){
			bFireEvent = true;
		}

		var nValue = this.getValue(nPos);
		var nAdjustPos = Math.round(nPos);
		var nAdjustValue = this.getValue(nAdjustPos);

		var htOption = {
			nValue : nValue,
			nPosition : nPos,
			nAdjustValue : nAdjustValue,
			nAdjustPosition : nAdjustPos
		};

		if(bFireEvent && !this._fireBeforeEvent(htOption)){
			return;
		}

		if(htOption.nAdjustValue != nAdjustValue){
			htOption.nAdjustPosition = this._getPositionFromValue(htOption.nAdjustValue);
		}

		this._moveThumb(htOption.nAdjustPosition);

		if(bFireEvent){
			this._fireChangeEvent(htOption);
		}

		if(this._htWElement.range){
			this._htWElement.range.css(this._htSwap.width, htOption.nAdjustPosition+'%');
		}
	},

	_fireBeforeEvent : function(htOption){

		/**
			Thumb이 움직이기 직전에 발생한다

			@event beforeChange
			@param {String} sType 커스텀 이벤트명
			@param {Number} nValue 이동하려는 Thumb의 위치의 계산된 슬라이더 값. 위치 값에 따라 소수점 발생함
			@param {Number} nPosition 이동하려는 Thumb의 위치의 전체 track대비의 퍼센트 값
			@param {Number} nAdjustValue nAdjustPosition값으로 계산된 슬라이드 값
			@param {Number} nAdjustPosition nPosition 반올림하여 정수로 계산된 값
			@param {Function} stop 수행시 슬라이더가 이동하지 않으며 change 이벤트가 발생하지 않는다
		**/
		return this.fireEvent('beforeChange',htOption);
	},

	_fireChangeEvent : function(htOption){

		/**
			Thumb이 움직인 이후에 발생한다.

			@event change
			@param {String} sType 커스텀 이벤트명
			@param {Number} nValue 이동하려는 Thumb의 위치의 계산된 슬라이더 값.위치 값에 따라 소수점 발생한다.
			@param {Number} nPosition 이동하려는 Thumb의 위치의 전체 track대비의 퍼센트 값
			@param {Number} nAdjustValue beforeChange에서 다시 설정한 슬라이더 값(변경된 값이 없으면 nValue의 반올림한 정수의 값)
			@param {Number} nAdjustPosition nAdjustValue값에 대한 퍼센트값
			@param {Function} stop 수행시 영향을 받는것은 없다.
		**/
		this.fireEvent('change', htOption);
	},

	_moveThumb : function(n){
		if(n > 100 || n < 0){ return;}

		this._htWElement.thumb.css('webkitTransitionDuration', '0ms');
		this._htWElement.thumb.css('webkitTransitionProperty',this._htSwap.left);
		this._htWElement.thumb.css(this._htSwap.left ,n+"%");
	},

	_getTrackInfo : function(){
		var nTrackSize = this.option('bVertical')? this._htWElement.track.height() : this._htWElement.track.width();
		var nThumbSize = this.option('bVertical')? this._htWElement.thumb.height() : this._htWElement.thumb.width();

		var nMaxPos =  nTrackSize-(nThumbSize/2);

		return {
			maxPos : nMaxPos,
			max :  this.option('nMaxValue')*1,
			min :  this.option('nMinValue')*1
		};

	},

	/**
		옵션을 설정한 nMinValue, nMaxValue에 대한 상대값으로 nPos에 대한 해당 Thumb의 위치값을 얻어온다
		@param {Number} nPos
		@return {Number}
	**/
	getValue : function(nPos) {
		if(typeof nPos == 'undefined'){
			nPos = this.getPosition();
		}

		var oInfo = this._getTrackInfo();
		var nValue = oInfo.min + ((oInfo.max- oInfo.min) * (nPos/100));

		return nValue;
	},


	/**
		옵션을 설정한 nMinValue, nMaxValue에 대한 상대값으로 해당 Thumb의 위치값을 설정한다
		@param {Number}  nValue Thumb의 value 값
		@param {Boolean} bFireEvent 커스텀 이벤트 발생여부
	**/
	setValue : function(nValue, bFireEvent){
		nValue = nValue * 1;
		var nPos = this._getPositionFromValue(nValue);

		if(typeof bFireEvent == 'undefined'){
			bFireEvent = true;
		}

		this._move(nPos, bFireEvent);
	},

	_getAdjustedPos : function(nDistance){
		var htInfo = this._getTrackInfo();

		var nPecent = (nDistance * 100)/htInfo.maxPos;

		nPecent = Math.max(0, nPecent);
		nPecent = Math.min(nPecent,100);

		return nPecent;
	},

	/**
		현재 Thumb의 위치값을(퍼센트) 리턴한다.
		@return {Number}
	**/
	getPosition : function() {
		var sPos = this._htWElement.thumb.css(this._htSwap.left);

		return (sPos == "auto") ? 0 : parseFloat(sPos, 10);
	},

	/**
		Thumb의 위치값을 퍼센트로 설정한다
		@param{Number} Thumb의 위치 퍼센트 값
		@param {Boolean} bFireEvent 커스텀 이벤트 발생여부
	**/
	setPosition : function(nPos, bFireEvent){
		if(typeof bFireEvent == 'undefined'){
			bFireEvent = true;
		}

		this._move(nPos, bFireEvent);
	},

	_getPositionFromValue : function(nValue){
		var htInfo = this._getTrackInfo();

		var nPecent = ((nValue- htInfo.min) * 100) /(htInfo.max-htInfo.min);
		nPecent = isNaN(nPecent)? 100 : nPecent;
		nPecent = Math.max(0, nPecent);
		nPecent = Math.min(100, nPecent);

		return nPecent;
	},


	_onClick : function(evt){
		evt.stop();
	},

	/**
		jindo.m.Slider 에서 사용하는 모든 이벤트를 바인드한다.
	**/
	_attachEvent : function() {
		this._htEvent = {};
		// thumb click event 처리
//		this._htEvent["click"] = {
//			ref : jindo.$Fn(this._onClick, this).attach(this._htWElement.thumb, "click"),
//			el	: this._htWElement.thumb
//		};

	},

	/**
		특정 이벤트를 해제한다.
		@param {String} sEventKey 이벤트 키
	**/
	_detachEvent : function(sEventKey) {
		if(sEventKey) {
			var htTargetEvent = this._htEvent[sEventKey];
			htTargetEvent.ref.detach(htTargetEvent.el, sEventKey);
		}
	},

	/**
		jindo.m.Slider 컴포넌트를 활성화한다.
		activate 실행시 호출됨
	**/
	_onActivate : function() {
		this._attachEvent();
		this._oTouch.activate();
	},

	/**
		jindo.m.Slider 컴포넌트를 비활성화한다.
		deactivate 실행시 호출됨
	**/
	_onDeactivate : function() {
		this._detachEvent();
		this._oTouch.deactivate();
	},

	/**
		jindo.m.Slider 에서 사용하는 모든 객체를 release 시킨다.
		@method destroy
	**/
	destroy : function() {
		this.deactivate();
		for(var p in this._htWElement) {
			this._htWElement[p] = null;
		}
		this._htWElement = null;

		for(p in this._htSwap) {
			this._htSwap[p] = null;
		}
		this._htSwap = null;

		this._oTouch.detachAll();
	}
}).extend(jindo.m.UIComponent);/**
	@fileOverview 여러 패널로 나뉘어진 영역에 탭을 이용한 네비게이팅을 제공하는 컴포넌트
	@author sculove
	@version 1.7.1
	@since 2012. 03. 19
**/
/**
	여러 패널로 나뉘어진 영역에 탭을 이용한 네비게이팅을 제공하는 컴포넌트

	@class jindo.m.Tab
	@extends jindo.m.CoreTab
	@keyword tab, 탭
	@group Component

	@history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
	@history 1.2.0 Update 패널 슬라이드 기능 추가<br />더보기 기능 추가
	@history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
	@history 0.9.0 Release 최초 릴리즈
**/
jindo.m.Tab = jindo.$Class({
	/* @lends jindo.m.Tab.prototype */
	/**
		초기화 함수

		@constructor
		@param {Varient} el Tab Layout Wrapper
		@param {Object} [htOption] 초기화 옵션 객체
			@param {String} [htOption.sMoreText="더보기"] 더보기탭 생성시 생성된 더보기 탭의 내용을 지정한다.
			@param {Number} [htOption.nCountOnList=0] 탭 생성시 화면에 표시될 탭의 개수. 탭의 개수보다 이 값이 작을 경우, 더보기 탭이 생성된다.<br />0 일 경우는 더보기 탭을 사용하지 않는다.
			@param {Boolean} [htOption.bActivateOnload=true] 컴포넌트가 로딩 될때 활성화 시킬지 여부를 결정한다.<br /> false로 설정하는 경우에는 activate()를 호출하여 따로 활성화 시켜야 한다.
			@param {Number} [htOption.nDefaultIndex=0] 탭생성시 선택될 탭의 index 정보.

	**/
	$init : function(el, htOption) {
		this.option({
			sMoreText : "더보기",
			nCountOnList : 0 	// 이 항목에 지정한 갯수 만큼만 탭을 보여줍니다. 그 이상의 탭은 "더보기" 목록에 넣습니다.
								// 현재 3으로 지정했으므로, 3개의 탭을 보여주고 + "더보기"에 나머지 탭을 넣게 됩니다.
								// 만약 0으로 설정하거나 실제 tab보다 개수가 클경우 "더보기" 기능을 사용하지 않습니다.
		});
		this.option(htOption || {});
		this._initData();
		if(this.option("bActivateOnload")) {
			this.activate();
		}
		this.select(this.option("nDefaultIndex"));
	},

	/**
		jindo.m.Tab 에서 사용하는 모든 인스턴스 변수를 초기화한다.
		@override
	**/
	_initVar : function() {
		this.$super._initVar();
		this._isMore = false;
		this._nCurrentMoreTab = -1;
	},

	/**
		초기 tab, panel 데이터 초기화
		@override
	**/
	_initData : function() {
		this.$super._initData();
		var nCountOnList = this.option("nCountOnList");
		// 더보기 관련 기능 추가
		if(nCountOnList > 0 && this._aTab.length > nCountOnList) {
			this._makeMoreContainer(nCountOnList);
		}
	},

	/**
		more버튼을 구성한다.
		@param  {Number} nCountOnList [more외로 유지할 탭 개수]
	**/
	_makeMoreContainer: function(nCountOnList) {
		this._htWElement["more_tab"] = jindo.$Element('<li class="'+ this._sPrefix + 'more-tab"><a style="display: block; height: 100%">' + this.option("sMoreText") +  ' <span class="' + this._sPrefix + 'arrow-down"></span></a></li>');
		this._htWElement["more_container_wrap"] = jindo.$Element('<div style="position:relative; width:100%;z-index:10">');
		this._htWElement["more_container"] = jindo.$Element('<ul class="' + this._sPrefix + 'more-cont" style="display:none; position: absolute">');
		for(var i=nCountOnList, nLength = this._aTab.length; i<nLength; i++) {
			this._tab2more(i);
		}
		this._htWElement["more_container_wrap"].append(this._htWElement["more_container"]);
		this._htWElement["more_tab"].append(this._htWElement["more_container_wrap"]);
		this._htWElement["tab_container"].append(this._htWElement["more_tab"]);
		this._htWElement["more_arrow"] = jindo.$Element(this._htWElement["more_tab"].query("span"));
		this._nCurrentMoreTab = nCountOnList-1;
		this._isMore = true;
	},

	/**
		더보기 버튼 이벤트 attach
	**/
	_attachMoreContainerEvent : function() {
		this._htEvent["more_click"] = {
			el  : this._htWElement["more_container"],
			ref : jindo.$Fn(this._onClickMore, this).attach(this._htWElement["more_container"], "click")
		};
	},

	/**
		더보기 버튼 클릭시 발생하는 이벤
		@param  {[type]} we [description]
	**/
	_onClickMore: function(we) {
		if(this._isMore) {
			var welElement = jindo.$Element(we.element);
			var sClassName = this._sPrefix + "more-li";
			if(!welElement.hasClass(sClassName)) {
				welElement = welElement.parent(function(v){
					return v.hasClass(sClassName);
				},1)[0];
			}
			this.select(this._getIdx(welElement));
			we.stop(jindo.$Event.CANCEL_BUBBLE);
		}
	},

	/**
		 tab을 more로 이동
		@param  {Number} nIdx 이동할 index
	**/
	_tab2more : function(nIdx) {
		var wel = this._htWElement["more_container"].first(),
			isMoved = false,
			nTargetIdx;

		this._aTab[nIdx].className(this._sPrefix + "more-li");
		this._aTab[nIdx].first().className(this._sPrefix + "more-lia");
		while(wel) {
			nTargetIdx = this._getIdx(wel);
			if(nTargetIdx > nIdx) {
				wel.before(this._aTab[nIdx]);
				isMoved = true;
				break;
			}
			wel = wel.next();
		}
		if(!isMoved) {
			this._htWElement["more_container"].append(this._aTab[nIdx]);
		}
	},

	/**
		 more를 Tab으로 이동
		@param  {Number} nIdx 이동할 index
	**/
	_more2tab : function(nIdx) {
		this._aTab[nIdx].className(this._sPrefix + "tab");
		this._aTab[nIdx].first().className(this._sPrefix + "taba");
		this._htWElement["more_tab"].before(this._aTab[nIdx]);
		this._nCurrentMoreTab = nIdx;
	},

	/**
		 셀렉트 이벤트 선택 후 처리
	**/
	_onAfterSelect : function(welElement) {
		// more 버튼이 선택된 경우
		if(welElement.hasClass(this._sPrefix + "more-tab")) {
			var isHide = this._htWElement["more_container"].visible();

			/**
				더보기탭이 있을 경우, 더보기 내용이 보이기 전에 발생

				@event beforeShow
				@param {String} sType 커스텀 이벤트명
				@param {Number} nIndex 선택되기전의 tab 인덱스 번호 (0부터 시작)
				@param {HTMLElement} elTab 선택되기 전의 tab Element
				@param {HTMLElement} elPanel 선택되기 전의 panel Element
			**/
			if( this._fireEventBefore( isHide ? "beforeHide" : "beforeShow") ) {
				this._htWElement["more_container"].toggle();
				this._htWElement["more_tab"].toggleClass(this._sPrefix + "more-on");
				this._htWElement["more_arrow"].toggleClass(this._sPrefix + "arrow-down", this._sPrefix + "arrow-up");

				/**
					더보기탭이 있을 경우, 더보기 내용이 보인 후에 발생

					@event show
					@param {String} sType 커스텀 이벤트명
					@param {Number} nIndex 선택된 tab 인덱스 번호 (0부터 시작)
					@param {HTMLElement} elTab 선택된 tab Element
					@param {HTMLElement} elPanel 선택된 panel Element
				**/
				this._fireEventBefore( isHide ? "hide" : "show");
			}
		} else {
			// more버튼이 있는 경우는 사라지게 한다.
			this._hideMoreList();
			this.select(this._getIdx(welElement));
		}
	},

	/**
		 더보기 리스트 숨기
		@return {[type]} [description]
	**/
	_hideMoreList : function() {
		if(this._isMore) {

			/**
				더보기탭이 있을 경우, 더보기 내용이 사라지 전에 발생

				@event beforeHide
				@param {String} sType 커스텀 이벤트명
				@param {Number} nIndex 선택되기전의 tab 인덱스 번호 (0부터 시작)
				@param {HTMLElement} elTab 선택되기 전의 tab Element
				@param {HTMLElement} elPanel 선택되기 전의 panel Element

			**/
			if( this._fireEventBefore("beforeHide") ) {
				this._htWElement["more_container"].hide();
				this._htWElement["more_tab"].removeClass(this._sPrefix + "more-on");
				this._htWElement["more_arrow"].className(this._sPrefix + "arrow-up");

				/**
					더보기탭이 있을 경우, 더보기 내용이 사라 후에 발생

					@event hide
					@param {String} sType 커스텀 이벤트명
					@param {Number} nIndex 선택된 tab 인덱스 번호 (0부터 시작)
					@param {HTMLElement} elTab 선택된 tab Element
					@param {HTMLElement} elPanel 선택된 panel Element
				**/
				this._fireEventBefore("hide");
			}
		}
	},

	/**
		index에 해당하는 패널 선택
		@param {Object} nIdx
	**/
	_beforeSelect : function(nIdx) {
		if(this._isMore) {
			// console.log("현재moreTab : " + this._nCurrentMoreTab + " , " + nIdx);
			if( (nIdx >= this.option("nCountOnList")-1) && (this._nCurrentMoreTab != nIdx) ) {
				// more 숨기기
				this._hideMoreList();
				// Tab과 more를 이동
				this._tab2more(this._nCurrentMoreTab);
				this._more2tab(nIdx);
			}
		}
	},

	/**
		jindo.m.Tab 에서 사용하는 모든 이벤트를 바인드한다.
		@override
	**/
	_attachEvent : function() {
		this.$super._attachEvent();
		if(this._isMore) {
			this._attachMoreContainerEvent();
		}
	},

	/**
		jindo.m.Tab 에서 사용하는 모든 이벤트를 해제한다.
		@override
	**/
	_detachEvent : function() {
		this.$super._detachEvent();
	},

	/**
		jindo.m.Tab 에서 사용하는 모든 객체를 release 시킨다.
		@override
		@method destroy
	**/
	destroy : function() {
		this.deactivate();
		this.$super.destroy();
	}
}).extend(jindo.m.CoreTab);/**
	@fileOverview Form Element의 Textarea를의 입력값의 변화를 감지하여 자동으로 높이값을 증가시키는 컴포넌트
	@author sshyun
	@version 1.7.1
	@since 2011. 9. 21.
**/
/**
	Form Element의 Textarea를의 입력값의 변화를 감지하여 자동으로 높이값을 증가시키는 컴포넌트

	@class jindo.m.TextArea
	@extends jindo.m.UIComponent
	@keyword textArea
	@group Component

	@history 1.2.0 Release nMaxHeight 값 설정시. expand 이벤트 미발생 문제 수정
	@history 1.3.0 Update [bUseAutoHeight] Option 추가
	@history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
	@history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
	@history 0.9.5 Bug Android에서 focus시 커스텀 이벤트가 2번 발생하는 문제 해결
	@history 0.9.5 Bug Android에서 blur시 커스텀 이벤트가 2번 발생하는 문제 해결
	@history 0.9.0 Release 최초 릴리즈
**/
jindo.m.TextArea = jindo.$Class({
	/* @lends jindo.m.TextArea.prototype */
	/**
	초기화 함수
		@constructor
		@param {Varient} el textarea 엘리먼트 또는 ID
		@param {Object} [htOption] 초기화 옵션 객체
			@param {Boolean} [htOption.bActivateOnload=true] 컴포넌트 로드시 activate 여부
			@param {String} [htOption.sClassPrefix="fta-"] Class의 prefix명
			@param {Boolean} [htOption.bUseRadius=false] Check Box 영역의 모서리 라운드 효과 여부
			@param {String} [htOption.sRadiusSize="0.5em"] Check Box 영역의 모서리 라운드 크기
			@param {Boolean} [htOption.bUseAutoHeight=false] Textarea height 텍스트 크기에 맞게 자동 감소, 증가하는 기능 사용여부
			@param {Number} [htOption.nExpandHeight=30] Textarea height 증가 크기.(px 단위)
			@param {Number} [htOption.nMaxHeight=-1] Textarea 최대 height 크기 .(px 단위), 기본값 : -1(무한대)
	**/
	$init : function(el, htOption) {
		this.option({
			bActivateOnload : true,
			sClassPrefix	: "fta-",
			bUseRadius 		: false,
			sRadiusSize		: "0.5em",
			bUseAutoHeight  : false,
			nExpandHeight	: 30,
			nMaxHeight		: -1
		});
		this.option(htOption || {});
		this._initVar();
		this._setWrapperElement(el);
		// 코너 곡선 여부 추가.
		if(this.option("bUseRadius")){
			this._applyRadiusStyle(this.option("sRadiusSize"));
		}
		if(this.option("bActivateOnload")) {
			this.activate();
		}
	},

	/**
		jindo.m.TextArea 에서 사용하는 모든 인스턴스 변수를 초기화한다.
	**/
	_initVar : function() {
		this._nTimer = -1;
		this._bTouchTextArea = false;
		this._touchMoved = false;
		this._sBeforeValue = "";
		this._nInitHeight = -1;
	},

	/**
		jindo.m.TextArea 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
		@param {Varient} el textarea 엘리먼트 또는 ID
	**/
	_setWrapperElement : function(el) {
		this._htWElement = {};
		var sPrefix = this.option('sClassPrefix');
		el = (typeof el == "string" ? jindo.$(el) : el);
		this._htWElement["textarea"] = jindo.$Element(el);
		this._nInitHeight = this._htWElement["textarea"].height();
	},
	/**
		테두리 라운드 효과 설정.
		@param {String} sRadius 곡선 Radius 값.
	**/
	_applyRadiusStyle : function(sRadius){
		var sCssName = jindo.m.getCssPrefix() + "BorderRadius";
		var oCssProperty = {
			sCssName : sRadius,
			"borderRadius" : sRadius
		};
		this._htWElement["textarea"].css(oCssProperty);
	},

	/**
		jindo.m.TextArea 컴포넌트를 활성화한다.
		activate 실행시 호출됨
	**/
	_onActivate : function() {
		this._attachEvent();
	},
	/**
		jindo.m.TextArea 컴포넌트를 비활성화한다.
		deactivate 실행시 호출됨
	**/
	_onDeactivate : function() {
		this._detachEvent();
		clearInterval(this._nTimer);
		this._nTimer = -1;
	},
	/**
		jindo.m.TextArea 에서 사용하는 모든 이벤트를 바인드한다.
	**/
	_attachEvent : function() {
		this._htEvent = {};
		var elTextArea = this._htWElement["textarea"].$value();
		this._htEvent["textarea_focus"] = {
			el  : elTextArea,
			ref : jindo.$Fn(this._onFocus, this).attach( elTextArea, "focus")
		};
		this._htEvent["textarea_blur"] = {
			el  : elTextArea,
			ref : jindo.$Fn(this._onBlur, this).attach( elTextArea, "blur")
		};

	},

	/**
		jindo.m.TextArea 에서 사용하는 모든 이벤트를 해제한다.
	**/
	_detachEvent : function() {
		for(var p in this._htEvent) {
			var ht = this._htEvent[p];
			ht.ref.detach(ht.el, p.substring(p.lastIndexOf("_")+1));
		}
		this._htEvent = null;
	},
	/**
		TextArea 에 Focus 이벤트 처리.
		@param {Object} we 이벤트 객체.
	**/
	_onFocus : function(we){
		if(this._nTimer > -1){
			return;
		}
		this._htWElement["textarea"].addClass(this.option('sClassPrefix') + "textarea-focus");
		this._nTimer = setInterval(jindo.$Fn(this._checkHeightAndExpand, this).bind(), 10);

		/**
			Textarea 에 포커스가 일어 날 때 발생.

			@event focus
			@param {String} sType 커스텀 이벤트명
			@param {Element} elTextArea Textarea 엘리먼트
		**/
		this.fireEvent("focus",{
			elTextArea : this._htWElement["textarea"].$value()
		});
	},
	/**
		TextArea 에 Blur 이벤트 처리.
		@param {Object} we 이벤트 객체.
	**/
	_onBlur : function(we){
		if (this._nTimer == -1) {
			return;
		}
		clearInterval(this._nTimer);
		this._nTimer = -1;
		this._htWElement["textarea"].removeClass(this.option('sClassPrefix') + "textarea-focus");

		/**
			Textarea 에 포커스가 없어질 때 발생.

			@event blur
			@param {String} sType 커스텀 이벤트명
			@param {Element} elTextArea Textarea 엘리먼트
		**/
		this.fireEvent("blur",{
			elTextArea : this._htWElement["textarea"].$value()
		});
	},
	/**
		텍스트 영역의 높이가 적으면, 확장한다.
	**/
	_checkHeightAndExpand : function() {
		var sValue = this._htWElement["textarea"].$value().value;
		this._adjustHeight();
		if(sValue != this._sBeforeValue) {
			this._sBeforeValue = sValue;

			/**
				Textarea 값이 변경되었을 때 발생.

				@event change
				@param {String} sType 커스텀 이벤트명
				@param {Element} elTextArea Textarea 엘리먼트
			**/
			this.fireEvent("change",{
				elTextArea : this._htWElement["textarea"].$value()
			});
		}
	},

	/**
		입력 상자의 크기가 현재 까지 입력된 글의 내용을 스크롤 없이 보여주기 충분한지를 체크한다.
		@private
	**/
	_adjustHeight : function() {
		var elTextArea = this._htWElement["textarea"].$value(),
			nLength = this.option("nExpandHeight"),
			nClientHeight = elTextArea.clientHeight,
			nHeight = elTextArea.scrollHeight,
			nMaxHeight = this.option("nMaxHeight"),
			nBeforeLength = this._sBeforeValue.split("\n").length,
			nCurrentLength = elTextArea.value.split("\n").length,
			nTextHeight = parseInt(this._htWElement["textarea"].css("line-height"),10),
			nNextHeight = 0;

		if( nBeforeLength > nCurrentLength) {	// 값의 축소
			if(this.option("bUseAutoHeight")) {
				nNextHeight = (nTextHeight * nCurrentLength);
				if(nMaxHeight != -1 && nNextHeight > nMaxHeight) {
					return;
				}
				if(this._nInitHeight <= nNextHeight) {
					elTextArea.style.height = nNextHeight + "px";
				} else {
					elTextArea.style.height = this._nInitHeight + "px";
				}
			}
		} else if( nBeforeLength < nCurrentLength) {	// 값의 확대
			if(nHeight > nClientHeight) {
				nNextHeight = (nHeight + nLength);
				if(nMaxHeight == -1 || nNextHeight <= nMaxHeight ) {
					elTextArea.style.height = nNextHeight + "px";

					/**
						Textarea 에 여러줄이 입력되어 높이가 늘어날 때 발생.

						@event expand
						@param {String} sType 커스텀 이벤트명
						@param {Element} elTextArea Textarea 엘리먼트
					**/
					this.fireEvent("expand",{
						elTextArea : this._htWElement["textarea"].$value()
					});
				} else if(nMaxHeight == -1 || nNextHeight > nMaxHeight ) {
					if(nHeight != nMaxHeight) {
						elTextArea.style.height = nMaxHeight + "px";
						this.fireEvent("expand",{
							elTextArea : this._htWElement["textarea"].$value()
						});
					}
				}
			}
		}
	},

	/**
		입력 상자의 높이를 늘인다.
		@private
	**/
	_expandHeight : function() {
		var elTextArea = this._htWElement["textarea"].$value(),
			nMaxHeight = this.option("nMaxHeight"),
			nExpandHeight = this.option("nExpandHeight"),
			nScrollHeight = parseInt(elTextArea.scrollHeight,10),
			nHeight = parseInt(elTextArea.style.height,10),
			nNewHeight = nScrollHeight + nExpandHeight;

		// MAX인 경우
		if(nMaxHeight > 0 && nHeight == nMaxHeight) {
			return;
		}
		if (nMaxHeight > 0 && nNewHeight > nMaxHeight) {
			elTextArea.style.height = nMaxHeight + "px";
			if(typeof this._htEventHandler["change"] === 'undefined') {
				clearInterval(this._nTimer);
			}
			// console.log("최대값으로 지정...");
		} else {
			elTextArea.style.height = nNewHeight + "px";
			// console.log("확장~");
		}

	},

	/**
		TextArea 값을 반환.

		@method getValue
		@return {String} TextArea value 값
		@example
	 *
		var sValue = oTextArea.getValue();
	**/
	getValue : function(){
		return this._htWElement["textarea"].$value().value;
	},
	/**
		TextArea 값을 입력.

		@method setValue
		@param {String} sValue TextArea value 값
		@example
			var sValue = "test";
			oTextArea.getValue(sValue);
	**/
	setValue : function(sValue){
		this._htWElement["textarea"].$value().value = sValue;
		this._checkHeightAndExpand();
	},
	/**
		TextArea 값을 지움.

		@method deleteValue
		@example
			oTextArea.deleteValue();
	**/
	deleteValue : function(){
		this._htWElement["textarea"].$value().value = "";
	},
	/**
		TextArea 활성화.

		@method enable
		@example
			oTextArea.enable();
	**/
	enable : function(){
		var elTextArea = this._htWElement["textarea"].$value();
		elTextArea.disabled = false;
		this._htWElement["textarea"].removeClass(this.option("sClassPrefix") + "textarea-disable");

		/**
			Textarea 가 활성화될 때 발생.

			@event enable
			@param {String} sType 커스텀 이벤트명
			@param {Element} elTextArea Textarea 엘리먼트
		**/
		this.fireEvent("enable",{
			elTextArea : elTextArea
		});
	},
	/**
		TextArea 비활성화.

		@method disable
		@example
			oTextArea.enable();
	**/
	disable : function(){
		var elTextArea = this._htWElement["textarea"].$value();
		elTextArea.disabled = true;
		this._htWElement["textarea"].addClass(this.option("sClassPrefix") + "textarea-disable");

		/**
			Textarea 가 비활성화 될 때 발생.

			@event disable
			@param {String} sType 커스텀 이벤트명
			@param {Element} elTextArea Textarea 엘리먼트
		**/
		this.fireEvent("disable",{
			elTextArea : elTextArea
		});
	},
	/**
		Textarea height 증가 크기값 설정

		@method setExpandHeigh
		@param {Number} nExpandHeight 증가 크기값
		@history 0.9.5 Update Method 추가
		@example
			oTextArea.setExpandHeight(50);
	**/
	setExpandHeight : function(nExpandHeight){
		this.option("nExpandHeight", nExpandHeight);
	},
	/**
		Textarea height 증가 크기값 반환

		@method getExpandHeight
		@return {Number} 증가 크기값
		@history 0.9.5 Update Method 추가
		@example
			var nExpandHeight = oTextArea.getExpandHeight();
	**/
	getExpandHeight : function(){
		return this.option("nExpandHeight");
	},
	/**
		Textarea height 최대 크기값 설정

		@method setMaxHeight
		@param {Number} nMaxHeight 최대 크기값
		@history 0.9.5 Update Method 추가
		@example
			oTextArea.setMaxHeight(200);
	**/
	setMaxHeight : function(nMaxHeight){
		this.option("nMaxHeight", nMaxHeight);
		var elTextArea = this._htWElement["textarea"].$value();
		var nScrollHeight = elTextArea.scrollHeight;

		if (nMaxHeight > 0 && nScrollHeight > nMaxHeight){
			elTextArea.style.height = nMaxHeight + "px";
		}
	},
	/**
		Textarea height 최대 크기값 반환

		@method getMaxHeight
		@return {Number} 최대 크기값
		@history 0.9.5 Update Method 추가
		@example
			var nMaxHeight = oTextArea.getMaxHeight();
	**/
	getMaxHeight : function(){
		return this.option("nMaxHeight");
	},
	/**
		jindo.m.TextArea 에서 사용하는 모든 객체를 release 시킨다.
		@method destroy
	**/
	destroy : function() {
		this.deactivate();

		if (this._oTimer) {
			clearInterval(this._oTimer);
			this._oTimer = null;
		}

		for ( var p in this._htWElement) {
			this._htWElement[p] = null;
		}
		this._htWElement = null;


		this._bTouchTextArea = null;
		this._touchMoved = null;
	}
}).extend(jindo.m.UIComponent);/**
	@fileOverview 유효성을 처리할 수 있는 각각의 Validator들을 관리하고, 각각의 Validator의 유효성을 검증하는 유틸성 모듈
	@author sculove
	@version 1.7.1
	@since 2011. 11. 23.
**/
/**
	유효성을 처리할 수 있는 각각의 Validator들을 관리하고, 각각의 Validator의 유효성을 검증하는 유틸성 모듈

	@class jindo.m.Validation
	@keyword validation
	@uses jindo.m.CurrencyValidator, jindo.m.DateValidator, jindo.m.EmailValidator, jindo.m.NumberValidator, jindo.m.RequireValidator, jindo.m.TelValidator, jindo.m.UrlValidator {1,}
	@group Component

	@history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
	@history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
	@history 1.0.0 Release 최초 릴리즈
**/
jindo.m.Validation = jindo.$Class({
	/* @lends jindo.m.Validation.prototype */
	/**
		초기화 함수

		@constructor
	**/
	$init : function() {},

	$static : {
		_htValidator : {},
		_htValidatorType : {
			"email" : "jindo.m.EmailValidator",
			"url" : "jindo.m.UrlValidator",
			"tel" : "jindo.m.TelValidator",
			"date" : "jindo.m.DateValidator",
			"number" : "jindo.m.NumberValidator",
			"currency" : "jindo.m.CurrencyValidator",
			"require" : "jindo.m.RequireValidator"
		},

		/**
			sType에 맞는 Validatior를 생성한다.
		**/
		_createValidator : function(sType) {
			if(jindo.m.Validation._htValidatorType[sType] && !jindo.m.Validation._htValidator[sType]) {
				//console.log("객체 생성 : new " + jindo.m.Validation._htValidatorType[sType] + "()");
				jindo.m.Validation._htValidator[sType] = eval("new " + jindo.m.Validation._htValidatorType[sType] + "()");
			}
		},

		/**
			@static
			sType의 Validatior를 추가 또는 갱신한다.
			@param {String} sType validatior 타입
			@param {String} sClassName validatior 클래스명
		**/
		add : function(sType, sClassName) {
			jindo.m.Validation._htValidatorType[sType] = sClassName;
		},

		/**
			@static
			sType의 Validatior 를 삭제한다.
			@param {String} sType validatior 타입
		**/
		remove : function(sType) {
			delete jindo.m.Validation._htValidatorType[sType];
		},

		/**
			validation문자열을 분석하여 HashTab로 결과를 반환한다
			parse 된 Validation Type은 자동으로 Validator를 생성한다.

			@param {String} sValidate validation문자열
			@return {Object} htValidateData key : value = "Validator타입" : sFormat""
		**/
		_parse : function(sValidate) {
			var aValidate = sValidate.split(";");
			var sType, sValue, htValidateData = {};
			for(var i=0, nLength = aValidate.length; i<nLength; i++) {
				var aTemp = aValidate[i].split(":");
				if(aTemp) {
					sType = aTemp[0];
					sValue = aTemp.length >1 ? aTemp[1] : null;
					htValidateData[sType] = htValidateData[sType] || sValue;
					// static으로 Validator들 생성하여 저장
					jindo.m.Validation._createValidator(sType);
				}
			}
			return htValidateData;
		},

		/**
			sValidate에 대해 Validation 한다.

			@static
			@param {String} sValidate validation문법
			@param {String} sValue validate할 문장,내용
			@param {Object} {bValid : 성공여부, sCorrectedValue : 수정된 값, sPreValue : 이전 값, sType : validation type}
		**/
		validate : function(sValidate, sValue) {
			var htResult, htValidateData = jindo.m.Validation._parse(sValidate);

			/*require인 경우 예외처리*/
			if("require" in htValidateData) {
				htResult = jindo.m.Validation._htValidator["require"].validate(sValue);
				if(!htResult.bValid) {
					return {
						bValid : false,
						sType : "require",
						sPreValue : sValue
					};
				} else {
					delete htValidateData["require"];
				}
			}
			/*값이 없는 경우 null */
			if(jindo.$S(sValue).trim() == "") {
				return null;
			}
			for(var sType in htValidateData) {
				htResult = jindo.m.Validation._htValidator[sType].validate(sValue, htValidateData[sType]);
				if(!htResult.bValid) {
					htResult.sType = sType;
					htResult.sPreValue = sValue;
					return htResult;
				}
			}
			htResult.bValid = true;
			htResult.sPreValue = sValue;
			return htResult;
		}
	}
});/**
	@fileOverview Form Element의 Text Input의 입력값의 변화를 감지하여 유효성 검사를 수행하고, 삭제 아이콘을 제공하는 컴포넌트
	@author sculove
	@version 1.7.1
	@since 2011. 11. 23.
**/
/**
	Form Element의 Text Input의 입력값의 변화를 감지하여 유효성 검사를 수행하고, 삭제 아이콘을 제공하는 컴포넌트

	@class jindo.m.TextInput
	@extends jindo.m.UIComponent
	@uses jindo.m.Validation {0,}
	@keyword textinput
	@group Component

	@history 1.7.0 Bug 마크업 구조에 따라, 삭제 버튼 선택시 스크립트 오류발생하는 문제 해결
	@history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
	@history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
	@history 1.1.0 Bug validate 이후 값이 변경되어 input 값이 없을 경우, 삭제 버튼이 지워지지 않는 문제 해결
	@history 1.0.0 Bug Validation 관련 버그수정
	@history 1.0.0 Update 속성 간소화<br>data-validate-use, data-validate-type, data-display-format → date-validate
	@history 1.0.0 Update 유효성 검사 시점 변경<br>실시간 유효성 검사 → blur시점 검사 (iOS4,5에서 javascript로 input값을 변경시, 한글입력이 있을 경우, 입력되었던 글자가 사라지는 이슈)
	@history 0.9.0 Release 최초 릴리즈
**/
jindo.m.TextInput = jindo.$Class({
	/* @lends jindo.m.TextInput.prototype */
	/**
		초기화 함수

		@constructor
		@param {Varient} el Input Box 기준 엘리먼트
		@param {Object} [htOption] 초기화 옵션 객체
			@param {String} [htOption.sClassPrefix="fit-"] Class의 prefix명
			@param {Boolean} [htOption.bUseValidate=false] data-validate 속성이 지정된 TextInput의 유효성 검사여부를 지정한다.
			@param {Boolean} [htOption.bActivateOnload=true] 컴포넌트 로드시 activate 여부
	**/
	$init : function(el, htOption) {
		this.option({
			sClassPrefix	: "fit-",
			bUseValidate : false,
			bActivateOnload : true
		});
		this.option(htOption || {});
		this._initVar();
		this._setWrapperElement(el);
		this._init();

		if(this.option("bActivateOnload")) {
			this.activate();
		}
	},

	$static : {
		INDEX_ATTR : "data-index",
		VALIDATE_ATTR : "data-validate"
	},

	/**
		jindo.m.TextInput 에서 사용하는 모든 인스턴스 변수를 초기화한다.
	**/
	_initVar : function() {
		this._aTextInput = [];
		this._sPreValue = null;
		this._nWatcher = null;
		this._sClickEvent = (jindo.m.getDeviceInfo().iphone || jindo.m.getDeviceInfo().ipad || jindo.m.getDeviceInfo().android) ? "touchstart" : "mousedown";
		this._nFocusTimer = null;
		this._nBlurTimer = null;
	},

	/**
		jindo.m.TextInput 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
	**/
	_setWrapperElement : function(el) {
		this._htWElement = {};
		this._htWElement["baseElement"] = jindo.$Element(el);
	},

	/**

	**/
	_init : function() {
		var welUnit, welInput, welDel, sValidate, aBaseList, aValidate = [];
		aBaseList = this._htWElement["baseElement"].queryAll("." + this.option("sClassPrefix") + "textinput-unit");
		for(var i=0, nLength=aBaseList.length; i<nLength; i++) {
			 // Unit 지정
			 welUnit = jindo.$Element(aBaseList[i]);
			 welUnit.attr(jindo.m.TextInput.INDEX_ATTR, i).css("position" , "relative");
			 // Input 지정
			 welInput = jindo.$Element(welUnit.query("input"));
			 welInput.attr(jindo.m.TextInput.INDEX_ATTR, i);
			 // Del 지정
			 welDel = welUnit.query("." + this.option("sClassPrefix") + "clear-btn");
			 if(welDel) {
				welDel = jindo.$Element(welDel);
				welDel.attr(jindo.m.TextInput.INDEX_ATTR, i).css({
					"position" : "absolute",
					"zIndex" : 100,
					"cursor" : "pointer"	,
					"right" : "0px",
					"top" : "0px"
				}).hide();
			 }
			 this._aTextInput.push({
				welUnit : welUnit,
				welInput : welInput,
				welDel : welDel
			 });
		}
	},

	/**
		jindo.m.TextInput 에서 사용하는 모든 이벤트를 바인드한다.
	**/
	_attachEvent : function() {
		this._htEvent = {};
		this._htEvent["focus"] = jindo.$Fn(this._onFocus, this);
		this._htEvent["blur"] = jindo.$Fn(this._onBlur, this);
		this._htEvent["clear"] = jindo.$Fn(this._onClear, this);
		for(var i=0, nLength=this._aTextInput.length; i<nLength; i++) {
			this._attachUnitEvent(this._aTextInput[i]);
		}
	},

	/**
		input단위 이벤트 attach
	**/
	_attachUnitEvent : function(htUnit) {
		this._htEvent["focus"].attach(htUnit.welInput, "focus");
		this._htEvent["blur"].attach(htUnit.welInput, "blur");
		if(htUnit.welDel) {
			this._htEvent["clear"].attach(htUnit.welDel, this._sClickEvent);
		}
	},

	/**
		jindo.m.TextInput 에서 사용하는 모든 이벤트를 해제한다.
	**/
	_detachEvent : function() {
		for(var i=0, nLength=this._aTextInput.length; i<nLength; i++) {
			this._detachUnitEvent(this._aTextInput[i]);
		}
		for(var p in this._htEvent ) {
			this._htEvent[p] = null;
		}
		this._htEvent = null;
	},

	/**
		input단위 이벤트 detach
	**/
	_detachUnitEvent : function(htUnit) {
		this._htEvent["focus"].detach(htUnit.welInput, "focus");
		this._htEvent["blur"].detach(htUnit.welInput, "blur");
		if(htUnit.welDel) {
			this._htEvent["clear"].detach(htUnit.welDel, this._sClickEvent);
		}
	},

	/**
		'X' 버튼 활성화 처리.
		@param {jindo.$Element} welInput input $Element 객체.
	**/
	_displayClearBtn : function(welInput){
		var nIdx = this.getIndex(welInput),
			welClearBtn = this._aTextInput[nIdx].welDel;

		// 버튼이 없다면 ...
		if(!welClearBtn) {
			return;
		}
		// 버튼 제어
		if(jindo.$S(welInput.$value().value).trim() != "") {


			/**
				삭제 버튼이 보여지기 전에 발생

				@event beforeShowClearBtn
				@param {String} sType 커스텀 이벤트명
				@param {Number} nIndex TextInput의 인덱스 (0부터 시작)
				@param {jindo.$Element }welClearBtn (jindo.$Element) : 삭제 버튼
				@param {Function} stop 수행시 showClearBtn 이벤트가 발생하지 않음
			**/
			if(!welClearBtn.visible() && this.fireEvent("beforeShowClearBtn", {
					nIndex : nIdx,
					welClearBtn : welClearBtn
				})) {
				welClearBtn.show();

				/**
					삭제 버튼이 보여진 후에 발생.

					@event showClearBtn
					@param {String} sType 커스텀 이벤트명
					@param {Number} nIndex TextInput의 인덱스 (0부터 시작)
					@param {jindo.$Element} welClearBtn (jindo.$Element) : 삭제 버튼
				**/
				this.fireEvent("showClearBtn", {
					nIndex : nIdx,
					welClearBtn : welClearBtn
				});
			}
		} else {

			/**
				삭제 버튼이 숨기기 전에 발생.

				@event beforeHideClearBtn
				@param {String} sType 커스텀 이벤트명
				@param {Number} nIndex TextInput의 인덱스 (0부터 시작)
				@param {jindo.$Element} welClearBtn (jindo.$Element) : 삭제 버튼
				@param {Function} stop 수행시 hideClearBtn 이벤트가 발생하지 않음
			**/
			if(welClearBtn.visible() && this.fireEvent("beforeHideClearBtn", {
					nIndex : nIdx,
					welClearBtn : welClearBtn
				})) {
				welClearBtn.hide();

				/**
					삭제 버튼이 숨겨진 후에 발생.

					@event hideClearBtn
					@param {String} sType 커스텀 이벤트명
					@param {Number} nIndex TextInput의 인덱스 (0부터 시작)
					@param {jindo.$Element} welClearBtn (jindo.$Element) : 삭제 버튼
				**/
				this.fireEvent("hideClearBtn", {
					nIndex : nIdx,
					welClearBtn : welClearBtn
				});
			}
		}
	},

	/**
		validatie 한다
		@param {jindo.$Element} welInput input $Element 객체.
	**/
	_validate : function(welInput) {
		var sValidate = welInput.attr(jindo.m.TextInput.VALIDATE_ATTR);
		if(!sValidate) {
			return;
		}
		var sValue = welInput.$value().value,
			htResult = jindo.m.Validation.validate(sValidate, sValue),
			nIdx=this.getIndex(welInput);
		if(htResult) {
			// valid가 유효하지 않을 경우, 값을 수정함 (?)
			if(typeof htResult.sCorrectedValue !== "undefined" && htResult.sCorrectedValue !== null) {
				// if(jindo.m.getDeviceInfo().iphone || jindo.m.getDeviceInfo().ipad) {
					// // ios 버그....
					// if(welInput.$value().value.indexOf(htResult.sCorrectedValue) != -1) {
						// var sTmp = htResult.sCorrectedValue.substr(welInput.$value().value.length);
						// if(this._checkUnicode(sTmp)) {
							// htResult.sCorrectedValue += " ";
						// }
					// }
					// welInput.$value().value =  this._sPreValue = htResult.sCorrectedValue;
				// } else {
					welInput.$value().value =  this._sPreValue = htResult.sCorrectedValue;
			//	}
			}
			// console.log("Validation Result : " + htResult.bValid + ", sCorrectedValue : " + htResult.sCorrectedValue);

			/**
				Input 에 값 입력시 유효한 값일 경우 발생.

				@event valid
				@param {String} sType 커스텀 이벤트명
				@param {Number} nIndex TextInput의 인덱스 (0부터 시작)
				@param {Object} htTextInput TextInput 정보 객체
					@param {jindo.$Element} welUnit TextInput Unit 엘리먼트
					@param {jindo.$Element} welInput input 엘리먼트
					@param {jindo.$Element} welDel 삭제 엘리먼트
				@param {Object} htValidate Validate 정보 객체
					@param {Boolean} bValid Validate 성공여부(항상 true반환)
					@param {String} sCorrectedValue 필터링 및 포맷팅 된 값이다. 이 값으로 Validate 한 결과값이 bValid이다,
					@param {String} sPreValue Validate 전 input 엘리먼트의 값

			**/
			/**
				input에 값 입력시 유효한 값이 아닐 경우 발생

				@event invalid
				@param {String} sType 커스텀 이벤트명
				@param {Number} nIndex TextInput의 인덱스 (0부터 시작)
				@param {Object} htTextInput TextInput 정보 객체
					@param {jindo.$Element} welUnit TextInput Unit 엘리먼트,
					@param {jindo.$Element} welInput input 엘리먼트,
					@param {jindo.$Element} welDel 삭제 엘리먼트
				@param {Object} htValidate Validate 정보 객체
					@param {Boolean} bValid Validate 성공여부(항상 false반환),
					@param {String} sCorrectedValue 필터링 및 포맷팅 된 값이다. 이 값으로 Validate 한 결과값이 bValid이다,
					@param {String} sPreValue Validate 전 input 엘리먼트의 값
			**/
			this.fireEvent( (htResult.bValid ? "valid" : "invalid"), {
				htValidate : htResult,
				htTextInput : this._aTextInput[nIdx],
				nIndex : nIdx
			});
		}
	},

	/**
		TextInput Box  에서 Focus 이벤트 처리.
		android일 경우, fouce가 2번 타는 문제 발생함

		@param {jindo.$Event} we 이벤트 객체.
	**/
	_onFocus : function(we){
		var nIdx = this.getIndex(we.element);
		var self=this;
		if(jindo.m.getDeviceInfo().android) {
			clearTimeout(this._nFocusTimer);
			this._nFocusTimer = setTimeout(function() {
				self._processFocus(nIdx);
			},100);
		} else {
			self._processFocus(nIdx);
		}
	},

	/**
		Focus 이벤트 발생시 처리하는 모듈
		@param {Number} nIdx 감시할 Element의 idx
	**/
	_processFocus : function(nIdx) {
		var htTextInput = this._aTextInput[nIdx];
		var welTextInputUnit = htTextInput.welUnit;
		var sCssName = this.option("sClassPrefix") + "focus";
		if(!welTextInputUnit.hasClass(sCssName)) {
			welTextInputUnit.addClass(sCssName);
		}
		// 입력값 변경을 감시할 Watcher 실행
		this._runWatcher(htTextInput.welInput);
		// focus 사용자 이벤트 발생
		/**
			input에 포커스시 발생

			@event focus
			@param {String} sType 커스텀 이벤트명
			@param {Number} nIndex TextInput의 인덱스 (0부터 시작)
			@param {object} htTextInput TextInput 정보 객체
				{ welUnit (jindo.$Element) : TextInput Unit 엘리먼트,<br />
				welInput (jindo.$Element) : input 엘리먼트,<br />
				welDel (jindo.$Element) : 삭제 엘리먼트 }<br />
		**/
		this.fireEvent("focus", {
			nIndex : nIdx,
			htTextInput : htTextInput
		});
	},

	/**
		TextInput Box  에서 Blur 이벤트 처리.
		@param {jindo.$Event} we 이벤트 객체.
	**/
	_onBlur : function(we){
		var nIdx = this.getIndex(we.element);
		var self=this;
		if(jindo.m.getDeviceInfo().android) {
			clearTimeout(this._nBlurTimer);
			this._nBlurTimer = setTimeout(function() {
				self._processBlur(nIdx);
			},100);
		} else {
			self._processBlur(nIdx);
		}
	},

	/**
		Blur 이벤트 발생시 처리하는 모듈
		@param {Number} nIdx 감시할 Element의 idx
	**/
	_processBlur : function(nIdx) {
		this._aTextInput[nIdx].welUnit.removeClass(this.option("sClassPrefix") + "focus");
		// 입력값 변경을 감시할 Watcher 중지
		this._stopWatcher();
		if(this.option("bUseValidate")) {
			var welInput = this._aTextInput[nIdx].welInput;
			this._validate(welInput);
			this._displayClearBtn(welInput);
		}

		/**
			input에 포커스가 없어질 경우 발생

			@event blur
			@param {String} sType 커스텀 이벤트명
			@param {Number} nIndex TextInput의 인덱스 (0부터 시작)
			@param {Object} htTextInput TextInput 정보 객체
				{ welUnit (jindo.$Element) : TextInput Unit 엘리먼트,<br />
				welInput (jindo.$Element) : input 엘리먼트,<br />
				welDel (jindo.$Element) : 삭제 엘리먼트 }
		**/
		this.fireEvent("blur", {
			nIndex : nIdx,
			htTextInput : this._aTextInput[nIdx]
		});
	},

	/**
		'X' 버튼 이벤트 처리.
		@param {jindo.$Event} we 이벤트 객체.
	**/
	_onClear : function(we){
		//console.log("클리어...");
		var sUnitClass = this.option("sClassPrefix") + "textinput-unit",
			welBtn = jindo.$Element(we.element);

		// 마크업 의존성 제거 (상위에서 검색)
		if(!welBtn.hasClass(sUnitClass)) {
			var aP =welBtn.parent(function(v){
				return v.hasClass(sUnitClass);
			});
			if(aP.length > 0) {
				welBtn = aP[0];
			} else {
				return;
			}
		}

		var	nIndex = this.getIndex(welBtn),
			welInput = this._aTextInput[nIndex].welInput,
			htInfo = jindo.m.getDeviceInfo(),
			nVersion = parseInt(htInfo.version,10);
		welInput.$value().value = "";

		/**
			Android 3.x는 input값이 변경되는 경우, focus가 벗어나야 정상적으로 화면에 출력됨
			따라서, 할당된 이벤트를 제거후, blur를 주고, focus를 준 후, 다시 이벤트를 할당하여, 정상적으로 동작하도록 수정함.
			단, 삭제 후에 키패드가 사라지는 오류 발생
		**/
		if(htInfo.android && nVersion === 3) {
			this._detachUnitEvent(this._aTextInput[nIndex]);
			welInput.$value().blur();
			welInput.$value().focus();
			this._attachUnitEvent(this._aTextInput[nIndex]);
		} else {
			/**
				ios는 한글 자소 입력시 문제가 됨. "소" 입력후, 삭제버튼 클릭. 그 후 "ㅅ" 입력하면 "솟"으로 나옴
				단, ios5이상은 처리 가능함.
			**/
			if(!htInfo.android && nVersion > 4) {
				welInput.$value().blur();
				welInput.$value().focus();
			}
		}
		this._displayClearBtn(welInput);

		/**
			삭제 버튼을 눌러 Input 값을 삭제 할 경우 발생.

			@event clear
			@param {String} sType 커스텀 이벤트명
			@param {Number} nIndex TextInput의 인덱스 (0부터 시작)
			@param {Object} htTextInput TextInput 정보 객체
				{ welUnit (jindo.$Element) : TextInput Unit 엘리먼트,<br />
				welInput (jindo.$Element) : input 엘리먼트,<br />
				welDel (jindo.$Element) : 삭제 엘리먼트 }
		**/
		this.fireEvent("clear", {
			nIndex : nIndex,
			htTextInput : this._aTextInput[nIndex]
		});
		/*TODO 에이.. 스크롤 확인.. 정말 Cancel_all해야만 하는가?*/
		we.stop(jindo.$Event.CANCEL_ALL);
		return false;
	},

	/**
		Watcher를 실행한다
		@param {jindo.$Element} welInput
	**/
	_runWatcher : function(welInput) {
		var self = this,
			sValue = null;
		this._stopWatcher();
		this._nWatcher = setInterval( function() {
			self._onChange(welInput);
		}, 100);
	},

	/**
		Watcher를 제거한다.
	**/
	_stopWatcher : function() {
		clearInterval(this._nWatcher);
		this._nWatcher = null;
		this._sPreValue = null;
	},

	/**
		TextInput Box  에서 입력값 변경시 처리.
		@param {jindo.$Element} welInput 모니터링할 input 객체
	**/
	_onChange : function(welInput){
		//console.log("값이 변경되었나?");
		var sValue = welInput.$value().value;
		if(this._sPreValue != sValue) {
			//console.log("값이 변경되었음...");
			this._sPreValue = sValue;

			/**
				input 글자를 입력시 발생.

				@event change
				@param {String} sType 커스텀 이벤트명
				@param {String} sPreValue 입력 하기 바로직전의 input 값.
				@param {Number} nIndex TextInput의 인덱스 (0부터 시작)
				@param {jindo.$Element} welInput (jindo.$Element) : Input 엘리먼트
			**/
			this.fireEvent("change", {
				sPreValue : sValue,
				welInput : welInput,
				nIndex : this.getIndex(welInput)
			});
			this._displayClearBtn(welInput);
		} else {
			//console.log("값이 변화없음.");
			this._displayClearBtn(welInput);
		}
	},

	/**
		TextInput Unit 엘리먼트 배열을 반환
		@param {Variant} vElement index를 찾을 TextInput Unit Element.
		@return {Array} jindo.$Element의 배열
	**/
	_getTextInputList : function(vElement){
		var aTextInputUnit = [],
			i,nLength;
		if(vElement) {
			if(vElement instanceof Array) {
				for(i=0, nLength = vElement.length; i<nLength; i++) {
					aTextInputUnit.push(jindo.$Element(vElement[i]));
				}
			} else {
				aTextInputUnit.push(jindo.$Element(vElement));
			}
		} else {
			for(i=0, nLength = this._aTextInput.length; i<nLength; i++) {
				aTextInputUnit.push(this._aTextInput[i].welUnit);
			}
		}
		return aTextInputUnit;
	},

	/**
		활성화 비활성화 OS별 설정.
		@param {Variant} vElement  활성화 / 비활성화 하는 TextInput Unit Element.
		@param {boolean} 활성화 / 비활성화 여부
		@return {[type]}
	**/
	 _useSettingUnit : function(vElement, bUse){
		var self = this;
		// Andorid인 경우 watcher가 돌고 있을 경우(즉, 포커스가 있는 경우), 포커스가 있는 input의 삭제버튼이 사라지지 않는 문제가 있었음
		this._stopWatcher();
		var aTextInputUnit = this._getTextInputList(vElement);
		if(jindo.m.getDeviceInfo().android) {
			setTimeout(function() {
				self._useSettingUnitCore(aTextInputUnit, bUse);
			},100);
		} else {
			self._useSettingUnitCore(aTextInputUnit, bUse);
		}
	},

	/**
		활성화 비활성화 설정.
		@param {aTextInputUnit} aTextInputUnit  활성화 / 비활성화 하는 TextInput Unit Element.
		@param {boolean} 활성화 / 비활성화 여부
	**/
	_useSettingUnitCore : function(aTextInputUnit, bUse){
		for (var i = 0, nLength = aTextInputUnit.length ; i < nLength ; i++) {
			if(bUse) {
				this._enableElement(aTextInputUnit[i]);
			} else {
				this._disableElement(aTextInputUnit[i]);
			}
		}

		/**
			TextInput이 활성화 되었을 경우 발생.

			@event enable
			@param {String} sType 커스텀 이벤트명
			@param {Array} aTextInputUnit 활성화된 input 엘리먼트(jindo.$Element) 참조 배열.
		**/
		/**
			TextInput이 비활성화 되었을 경우 발생

			@event disable
			@param {String} sType 커스텀 이벤트명
			@param {Array} aTextInputUnit 비활성화된 input 엘리먼트(jindo.$Element) 참조 배열.
		**/
		this.fireEvent( (bUse ? "enable" : "disable"),{
			aTextInputUnit: aTextInputUnit
		});
	},

	/**
		활성화 처리.
		@param {jindo.$Element} 활성화 TextInput Unit
	**/
	_enableElement : function(welUnit){
		var nIdx = this.getIndex(welUnit),
			welInput = this._aTextInput[nIdx].welInput;
		this._detachUnitEvent(this._aTextInput[nIdx]);
		this._attachUnitEvent(this._aTextInput[nIdx]);
		welUnit.removeClass(this.option("sClassPrefix") + "disable");
		welInput.$value().disabled = false;
		this._displayClearBtn(welInput);
	},

	/**
		비활성화 처리.
		@param {jindo.$Element} 활성화 TextInput Unit
	**/
	_disableElement : function(welUnit){
		var nIdx = this.getIndex(welUnit),
			welInput = this._aTextInput[nIdx].welInput,
			welDel = this._aTextInput[nIdx].welDel;
		this._detachUnitEvent(this._aTextInput[nIdx]);
		welUnit.addClass(this.option("sClassPrefix") + "disable");
		welInput.$value().disabled = true;
		if(welDel){
			welDel.hide();
		}
	},

	/**
		TextInput 을 활성화 시킨다.

		@method enable
		@param {Variant} vElement 활성화 할 TextInput Unit Element.
			TextInput Unit 엘리먼트 배열 또는 단일 TextInput Unit 엘리먼트가 입력 될수 있고, 입력값이 없을시 모든 TextInput Unit 엘리먼트가 기준이 된다.
		@example
			// 배열 활성화
			oTextInput.enable([jindo.$("unit1"),jindo.$("unit2")]);
			// 단일 활성화
			oTextInput.enable(jindo.$("unit1"));
			// 전체 활성화
			oTextInput.enable();
	**/
	enable : function(vElement){
		if(this.isActivating()) {
			this._useSettingUnit(vElement, true);
		}
	},

	/**
		TextInput 을 비활성화 시킨다.

		@method disable
		@param {Variant} vElement 비활성화 할 TextInput Unit Element.
			TextInput Unit 엘리먼트 배열 또는 단일 TextInput Unit 엘리먼트가 입력 될수 있고, 입력값이 없을시 모든 TextInput Unit 엘리먼트가 기준이 된다.
		@example
			// 배열 비활성화
			oTextInput.disable([jindo.$("unit1"),jindo.$("unit2")]);
			// 단일 비활성화
			oTextInput.disable(jindo.$("unit1"));
			// 전체 비활성화
			oTextInput.disable();
	**/
	disable : function(vElement){
		if(this.isActivating()) {
			this._useSettingUnit(vElement, false);
		}
	},

	/**
		index 번호로 TextInput Unit Element 를 반환한다.

		@method getElement
		@param {Number} nIdx 가져올 index 번호.
		@return {jindo.$Element} TextInput Unit Element 객체
		@example
			// 0번째 TextInput Unit Element 가져오기.
			var welUnit = oTextInput.getElement(0);
	**/
	getElement : function(nIdx){
		if(nIdx < this._aTextInput.length && nIdx >= 0) {
			return this._aTextInput[nIdx].welUnit;
		}
	},

	/**
		index 번호로 TextInput Input Element 를 반환한다.

		@method getInputElement
		@param {Number} nIdx 가져올 index 번호.
		@return {jindo.$Element} TextInput Input Element 객체
		@example
			// 0번째 TextInput Input Element 가져오기.
			var welInput = oTextInput.getInputElement(0);
	**/
	getInputElement : function(nIdx) {
		if(nIdx < this._aTextInput.length && nIdx >= 0) {
			return this._aTextInput[nIdx].welInput;
		}
	},

	/**
		index 번호로 TextInput Del Element 를 반환한다.

		@method getDelElement
		@param {Number} nIdx 가져올 index 번호.
		@return {jindo.$Element} TextInput Del Element 객체
		@example
			// 0번째 TextInput Del Element 가져오기.
			var welDel = oTextInput.getDelElement(0);
	**/
	getDelElement : function(nIdx) {
		if(nIdx < this._aTextInput.length && nIdx >= 0) {
			return this._aTextInput[nIdx].welDel;
		}
	},

	/**
		index 번호를 반환한다.

		@method getIndex
		@param {jindo.$Element, Element, String} nIdx 가져올 엘리먼트
		@return {Number} TextInput Index
	**/
	getIndex : function(ele) {
		return parseInt(jindo.$Element(ele).attr(jindo.m.TextInput.INDEX_ATTR),10);
	},

	/**
		TextInput Unit 개수를 반환

		@method getLength
		@return {Number}
	**/
	getLength : function() {
		return this._aTextInput.length;
	},

	/**
		jindo.m.Tab 컴포넌트를 활성화한다.
		activate 실행시 호출됨
	**/
	_onActivate : function() {
		this._attachEvent();
	},
	/**
		jindo.m.Tab 컴포넌트를 비활성화한다.
		deactivate 실행시 호출됨
	**/
	_onDeactivate : function() {
		this._detachEvent();
		this._stopWatcher();
	},
	/**
		jindo.m.TextInput 에서 사용하는 모든 객체를 release 시킨다.
		@method destroy
	**/
	destroy : function() {
		this.deactivate();
		for ( var p in this._htWElement) {
			this._htWElement[p] = null;
		}
		this._htWElement = null;
	}
}).extend(jindo.m.UIComponent);/**
	@fileOverview 클릭 또는 드래그로 슬라이더 자를 토글시켜 On/Off를 설정할 수 있는 컴포넌트
	@author "oyang2"
	@version 1.7.1
	@since 2011. 9. 8.
**/
/**
	클릭 또는 드래그로 슬라이더 자를 토글시켜 On/Off를 설정할 수 있는 컴포넌트

	@class jindo.m.ToggleSlider
	@extends jindo.m.UIComponent
	@uses jindo.m.Touch
	@keyword toggleslider
	@group Component

	@history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
	@history 1.1.0 Support Android 3.0/4.0 지원
	@history 1.1.0 Bug bStatus 옵션값을 false로 설정해도 기본값이 변하지 않던 문제 해결
	@history 1.1.0 Support jindo 2.0.0 mobile 버전 지원
	@history 0.9.0 Release 최초 릴리즈
**/
jindo.m.ToggleSlider = jindo.$Class({
	/* @lends jindo.m.ToggleSlider.prototype */
	/**
		초기화 함수

		@constructor
		@param {Object} [htOption] 초기화 옵션 객체
			@param {String} [htOption.sClassPrefix='tslider-'] Class의 prefix명
			@param {Boolean} [htOption.bUseDrag=true] 드래그 가능여부
			@param {Boolean} [htOption.bActivateOnload=true] 컴포넌트 로드시 activate 여부
			@param {Number} [htOption.nOnPosition=50] on 상태가 되는 thumb의 style left 퍼센트 속성
			@param {Number} [htOption.nOffPosition=0] off 상태가 되는 thumb의 style left 퍼센트 속성
			@param {Boolean} [htOption.bStatus=true] 초기 상태값 (on일 경우 true, off일경우 false)
			@param {Number} [htOption.nDuration=100]
	**/
	$init : function(sId, htOption) {
		this.option({
			sClassPrefix : 'tslider-',
			bUseDrag : true,
			bActivateOnload : true,
			nOnPosition : 50,
			nOffPosition: 0,
			bStatus : true,
			nDuration : 100
		});

		this.option(htOption || {});

		this._setWrapperElement(sId);
		this._initVar();

		if(this.option("bActivateOnload")) {
			this.activate();
			if(this.option('bStatus')){
				this.bStatusOn = false;
				this._move(true, false);
			}else{
				this.bStatusOn = true;
				this._move(false, false);
			}
		}
	},

	/**
		jindo.m.ToggleSlider 에서 사용하는 모든 인스턴스 변수를 초기화한다.
	**/
	_initVar: function() {
		if(this._htWElement.track){
			this._oTouch = new jindo.m.Touch(this._htWElement.track.$value(),{
				nSlopeThreshold : 1,
				nMoveGap: 2,
				bActivateOnload: false
			});

			this._oTouch.attach({
				'touchMove' : jindo.$Fn(this._onMove, this).bind(),
				'touchEnd' : jindo.$Fn(this._onEnd, this).bind(),
				'touchStart' : jindo.$Fn(this._onStart, this).bind()
			});
		}else{
			this._oTouch = null;
		}

		this.bMove = false;
		this.bStatusOn = this.option('bStatus');
		this.htInfo = {
			nMax : Math.max(this.option('nOnPosition'), this.option('nOffPosition')),
			nMin : Math.min(this.option('nOnPosition'), this.option('nOffPosition')),
			nGap  : Math.round(Math.abs((this.option('nOnPosition')-this.option('nOffPosition'))/2))
		};

		this._wfTransitionEnd = jindo.$Fn(this._onTransitionEnd, this).bind();
		this._bFireChange = false;
//		this._bAnimation = false;
//		console.log('init ', this._bAnimation);
	},

	/**
		jindo.m.ToggleSlider 에서 사용하는 모든 엘리먼트의 참조를 가져온다.
	**/
	_setWrapperElement: function(el) {
		this._htWElement = {};
		el = jindo.$(el);

		var sClass = '.' + this.option('sClassPrefix');

		this._htWElement.base = jindo.$Element(el);

		var aRadio = el? jindo.$$('[name='+this.option('sClassPrefix')+'radio]', el): null;
		this._htWElement.aRadio = jindo.$A(aRadio).forEach(function(value, index,array){
			array[index] = jindo.$Element(value);
		}).$value();

		this._htWElement.track = el? jindo.$Element(jindo.$$.getSingle(sClass+'track', el)) : null;
		this._htWElement.thumb = el? jindo.$Element(jindo.$$.getSingle(sClass+'thumb', el)) : null;
	},

	_onStart : function(oCustomEvt){
		//하이라이팅 막아버리기
		oCustomEvt.oEvent.stop(jindo.$Event.CANCEL_DEFAULT);
	},
	_onMove : function(oCustomEvt){
		if(!this.option('bUseDrag')){ return;}
//		if(this._bAnimation){
//			return;
//		}

		oCustomEvt.oEvent.stop(jindo.$Event.CANCEL_DEFAULT);

		this.bMove = true;

		var nDis = oCustomEvt.nDistanceX;
       
		var n = this._getAdjustedPos(nDis);
		this._moveThumb(n);

	},

	_onEnd : function(oCustomEvt){
//		console.log('end', this._bAnimation);
//		if(this._bAnimation){
//			return;
//		}

		if(oCustomEvt.sMoveType == 'tap'){
			this.toggle();
		}else{
			if(this.bMove){
				var nCurrent = this.isOn()? this.option('nOnPosition') : this.option('nOffPosition');
				var nPos = this._getPosition();
				if( Math.abs(nCurrent- nPos) > this.htInfo.nGap ){
					this.toggle();
				}else{
					this._move(this.isOn(), false);
				}

			}else{
				this.toggle();
			}
		}

		this.bMove = false;
	},

	_move : function(bOn ,bFireEvent){
		if(typeof bFireEvent == 'undefined'){
			bFireEvent = true;
		}

		var nDis = this.option('nOffPosition');

		if(bFireEvent){

			/**
				현재 상태 값이 바뀌기 전에 발생한다.

				@event beforeChange
				@param {String} sType 커스텀 이벤트명
				@param {Boolean} bOn 현재 상태값이 On인지에 대한 여부
				@param {Function} stop 수행시 토글 슬라이더의 상태값이 바뀌지 않으며 change 이벤트가 발생하지 않는다.
			**/
			if(!this.fireEvent('beforeChange',{
				bOn : this.isOn()
			})){
				return false;
			}
		}

		if(bOn) {nDis = this.option('nOnPosition');}


		this._bFireChange = bFireEvent;

		this.bStatusOn = bOn;
		this._moveThumb(nDis, this.option('nDuration'));

		this._updateForm();
	},

	/**
		현재 상태값을 토글한다

		@method toggle
	**/
	toggle : function(){
		if(this.isOn()){
			this.off();
		}else{
			this.on();
		}
	},

	/**
		현재 상태값을 on으로 바꾼다

		@method on
	**/
	on : function(){
		if(!this.isOn()){
			this._move(true);
		}
	},

	/**
		현재 상태값을 off로 바꾼다

		@method off
	**/
	off : function(){
		if(this.isOn()){
			this._move(false);
		}
	},

	/**
		현재 상태이 on 인지 리턴한다

		@method isOn
		@return {Boolean} on인지 여부
	**/
	isOn : function(){
		return this.bStatusOn;
	},

	_updateForm : function(){
		if(!this._htWElement.aRadio){ return;}
		var value = this.isOn()? 'on' : 'off';

		for(var i=0,nLen = this._htWElement.aRadio.length;i<nLen; i++){
			var wel = this._htWElement.aRadio[i];
			if(wel.$value().value == value){
				wel.$value().checked = true;
			}else{
				wel.$value().checked = false;
			}
		}
	},

	_moveThumb : function(n, nTime){
		if(n > this.htInfo.nMax || n < this.htInfo.nMin ){ return;}

		if(typeof nTime == 'undefined'){
			nTime = 0;
		}

		var nCurrent = parseInt(this._htWElement.thumb.css('left'),10);

		if((nTime > 0) && (nCurrent !== n) ){
			this._attachTransitionEnd();
//			console.log('_attach', this._bAnimation, nTime);
//			this._bAnimation = true;
		}

		if(this._htWElement.thumb){
			this._htWElement.thumb.css('webkitTransitionDuration', nTime+'ms');
			this._htWElement.thumb.css('webkitTransitionProperty','left');
			this._htWElement.thumb.css('left' ,n+"%");
		}
		if(nTime === 0 || (nCurrent === n)){
			this._onTransitionEnd();
		}
	},

	_onTransitionEnd : function(){
		this._detachTransitionEnd();

		if(this._bFireChange){

			/**
				현재 status 값이 바뀔경우 발생한다.

				@event change
				@param {String} sType 커스텀 이벤트명
				@param {Boolean} bOn 현재 상태값이 On인지에 대한 여부
				@param {Function} stop 수행시 영향받는것 없다.
			**/
			this.fireEvent('change',{
				bOn : this.isOn()
			});
		}

		this._bFireChange = false;

//		this._bAnimation = false;
//		console.log('_onTransitionEnd', this._bAnimation);

	},

	/**
		transitionEnd 이벤트 attach
	**/
	_attachTransitionEnd : function(){
		jindo.m.attachTransitionEnd(this._htWElement.thumb.$value(), this._wfTransitionEnd);
	},

	/**
		transitionEnd 이벤트 detach
	**/
	_detachTransitionEnd : function(){
		jindo.m.detachTransitionEnd(this._htWElement.thumb.$value(), this._wfTransitionEnd);
	},

	_getAdjustedPos : function(nDis){

		var nPecent = Math.round((nDis * 100) / this._htWElement.track.width());

		nPecent = nPecent + (this.isOn()? this.option('nOnPosition') : this.option('nOffPosition'));

		nPecent = Math.max(this.htInfo.nMin, nPecent);
		nPecent = Math.min(this.htInfo.nMax, nPecent);

		return nPecent;
	},

	_getPosition : function(){
		var sPos = this._htWElement.thumb.css('left');

		return (sPos == "auto") ? 0 : parseInt(sPos, 10);
	},

	_onClick : function(evt){
		evt.stop(jindo.$Event.CANCEL_DEFAULT);
	},

	/**
		jindo.m.ToggleSlider 에서 사용하는 모든 이벤트를 바인드한다.
	**/
	_attachEvent : function() {
		this._htEvent = {};
		// thumb click event 처리
		this._htEvent["click"] = {
			ref : jindo.$Fn(this._onClick, this).attach(this._htWElement.thumb, "click"),
			el	: this._htWElement.thumb
		};

	},

	/**
		특정 이벤트를 해제한다.
		@param {String} sEventKey 이벤트 키
	**/
	_detachEvent : function(sEventKey) {
		if(sEventKey) {
			var htTargetEvent = this._htEvent[sEventKey];
			htTargetEvent.ref.detach(htTargetEvent.el, sEventKey);
		}
	},

	/**
		jindo.m.ToggleSlider 컴포넌트를 활성화한다.
		activate 실행시 호출됨
	**/
	_onActivate : function() {
		this._attachEvent();
		if(this._oTouch){
			this._oTouch.activate();
		}
	},

	/**
		jindo.m.ToggleSlider 컴포넌트를 비활성화한다.
		deactivate 실행시 호출됨
	**/
	_onDeactivate : function() {
		this._detachEvent();
		if(this._oTouch){
			this._oTouch.deactivate();
		}
	},

	/**
		jindo.m.ToggleSlider 에서 사용하는 모든 객체를 release 시킨다.
		@method destroy
	**/
	destroy : function() {
		this.deactivate();

		for(var p in this._htWElement) {
			this._htWElement[p] = null;
		}
		this._htWElement = null;

		this._oTouch.detachAll();
		this._oTouch = null;

		this.bMove = null;
		this.bStatusOn = null;
		this._wfTransitionEnd = null;
		this._bFireChange = null;

	}
}).extend(jindo.m.UIComponent);

})("jindo");