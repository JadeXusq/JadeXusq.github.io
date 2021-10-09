/**
 * f12禁用
 */
document.onkeydown =document.onkeyup = document.onkeypress=function(){
	if(window.event.keyCode == 123) {
		window.event.returnValue=false;
		return(false);
	}
}
// 禁用触摸
$("body").on("touchmove",function(e){
	e.preventDefault();
})

$(function() {
	FastClick.attach(document.body);//fastclick引入
});


/**
 * 微信提示框
 * @param  {string}   msg      弹窗信息
 * @param  {Function} callback 回调方法
 * @return void
 */
function tipMsg(msg,callback){
	$('#iosDialog').fadeIn(200);
	$("#iosDialog .weui-dialog__bd").html(msg);
	$("#iosDialog .weui-dialog__btn").click(function(){
		if(callback)
			callback();
		else
			$('#iosDialog').fadeOut(200);
	})
}

/**
 * 适配控制
 * @param  {string} dom 父级dom节点
 * @param  {number} sw  设计稿宽度
 * @param  {number} sh  设计稿高度
 * @return void
 */
function screenControl(dom,sw,sh){
	var h=window.innerHeight;
	var w=window.innerWidth;
    var s = h / sh;
    var d = (h - sh) / 2;
    var t = (w - sw) / 2;
    if(w>h){//横屏
        $(dom).css("left", "50%");
        $(dom).css("transform", "scale(" + s + ") translate3d(-50%,0,0)");
        $(dom).css("-webkit-transform", "scale(" + s + ") translate3d(-50%,0,0)");
        var d = (h - sh) / 2;
        $("body").css("overflow","hidden");
    }else{
    	var wScale=w/sw;
        $(dom).css("left", "0");
        $(dom).css("transform", "scale(" + wScale + ")");
        $(dom).css("-webkit-transform", "scale(" + wScale + ")");
        $(dom).css("height",h/wScale+"px");
        var d = (h - sh) / 2;
        $("body").css("overflow","hidden");
    }
    var scale=(sw/sh)/(window.innerWidth/window.innerHeight)-0.08;
    if(scale>1)
        scale=1;
    $(".result-content,.result-panel .home-logo,.test-text,.code-content").css({
        "transform":"scale("+scale+")",
        "-webkit-transform":"scale("+scale+")",
    })
    $(".loading_panel").show();
}

/**
 * 加载背景图片
 */
function setLoadImgArr(){
    let arr=[];
    for(var i=0;i<$("[data-type=load]").length;i++){
        arr.push($($("[data-type=load]")[i]).attr("data-src"));
    }
    return arr;
}

/**
 * 设置背景图片
 */
function setBgImg(){
    for(var i=0;i<$("[data-type=load]").length;i++){
        var src=$($("[data-type=load]")[i]).attr("data-src");
        $($("[data-type=load]")[i]).css("background-image","url("+src+")");
        $($("[data-type=load]")[i]).css("background-repeat","no-repeat");
    }
}

/**
 * 浏览器类型
 * @return {object} 浏览器类型对象
 */
function browser(){
    var u = navigator.userAgent;
    return {
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
        weixin: u.toLowerCase().match(/MicroMessenger/i) == 'micromessenger', //是否微信
        alipay: u.indexOf('AlipayClient') > -1, //是否支付宝
    };
}

/**
 * 获取地址栏参数
 * @param  {string} name 需要获取的地址栏参数名
 * @return {string}      需要获取的地址栏参数值
 */
function getUrl(name) {
  var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
  if (reg.test(location.href)) return decodeURI(RegExp.$2.replace(/\+/g, " "));
  return "";
}
