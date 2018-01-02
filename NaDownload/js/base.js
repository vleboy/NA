/**
 * Created by Administrator on 2017/11/2 0002.
 */

var isChina = ''

var os = function () {
    var ua = navigator.userAgent,
        isQB = /(?:MQQBrowser|QQ)/.test(ua),
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isIpad = /(?:iPad|PlayBook)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isFireFox && /(?:Tablet)/.test(ua)),
        isSafari = /(?:Safari)/.test(ua),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isOpen = /(?:Opera Mini)/.test(ua),
        isUC = /(?:UCWEB|UCBrowser)/.test(ua),
        isPc = !isPhone && !isAndroid && !isSymbian;
    return {
        isQB: isQB,
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc,
        isOpen: isOpen,
        isUC: isUC,
        isIpad: isIpad
    };
}();

getWindowHeight()
getIp()
//获取高度及样式
function getWindowHeight() {
    if (os.isPc) {
        $(".pc_modal").removeClass('pc_modal');

    } else {
        mobileTerminal()
    }

}

function mobileTerminal () {
    $('.mobile_modal').removeClass('mobile_modal');
    //判断是安卓还是ios
    var browser = {
        versions: function () {
            var u = navigator.userAgent;
            return {//移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1//是否web应该程序，没有头部与底部
                //isMicro: u.indexOf('MicroMessenger')>-1 //微信浏览器
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };

    if (browser.versions.mobile) {//判断是否是移动设备打开
        var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            //在微信中打开
            //$('#j_weixin').removeClass('weixin_none');
            //$('#j_weixin').css('height', (document.documentElement.clientHeight || document.body.clientHeight) + 'px')
        }
        else if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
            $('.isIos').removeClass('isIos');
        }
        else if (browser.versions.android || browser.versions.trident || browser.versions.presto || browser.versions.gecko) {
            $('.isAndroid').removeClass('isAndroid');
        }
    }
}

function iosModal () {
    $('.modal-bg').removeClass('modal-bg');
}

function closeModal(){
    $('.active-modal').addClass('modal-bg');
    $('.active-modal-bg').addClass('modal-bg');
}


function getIp () {
    $.ajax({
        type : "GET",
        url : "https://844sz7nr7l.execute-api.ap-southeast-1.amazonaws.com/dev/ipquery",
        data : {},
        success : function(result) {//返回数据根据结果进行相应的处理
            if(result.payload.data.country === '中国') {
                $('.isChina-ios').attr('href','itms-services://?action=download-manifest&url=https://assetdownload.oss-cn-hangzhou.aliyuncs.com/ios/autoinstall'+ result.payload.version +'.plist')
                $('.isChina-android').attr('href','http://app.risheng3d.com/apk/NAGame'+ result.payload.version +'.apk')
                $('.isChina').removeClass('isChina');
            } else {
                $('.isNoChina-ios').attr('href','itms-services://?action=download-manifest&url=https://oss.na12345.com/autoinstall'+ result.payload.version +'.plist')
                $('.isNoChina-android').attr('href','http://oss.na12345.com/NAGame'+ result.payload.version +'.apk')
                $('.isNoChina').removeClass('isNoChina');
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $('.isChina').removeClass('isChina');
        }
    });
}