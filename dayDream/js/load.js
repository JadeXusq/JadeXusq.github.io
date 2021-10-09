screenControl(".container",750,1218);//适配初始化
screenControl(".container-copy",750,1218);//适配初始化

var loadImgArr=[];//图片数组
var can_play=true;//是否可播放
setBgImg();//设置预加载图片背景图片
loadImgArr=setLoadImgArr();//初始化需要预加载data-src为load的图片列表
$("#music")[0].pause();
$("#music-question")[0].pause();
// 预加载其余图片
loadImgArr.push('assets/img/male-select.png');
loadImgArr.push('assets/img/female-select.png');
loadImgArr.push('assets/img/part03-01-01.gif');
loadImgArr.push('assets/img/part03-01-02.gif');
loadImgArr.push('assets/img/part03-01-03.gif');
loadImgArr.push('assets/img/part04-05-01.png');
loadImgArr.push('assets/img/part04-05-02.png');
loadImgArr.push('assets/img/part04-05-03.png');
loadImgArr.push('assets/img/play.png');
loadImgArr.push('assets/img/pause.png');
for(var i=1;i<=5;i++){
	for(var j=1;j<=3;j++){
		loadImgArr.push('assets/img/type-'+i+'-'+j+'.png');
	}
}
// loadImgArr.push('assets/img/logo-bg.png');
// loadImgArr.push('assets/img/logo-bg-outer.png');

var loader = new resLoader({
	resources:loadImgArr,
	onStart : function(total){
		// $("#music")[0].play();
		// $("#music")[0].pause();
		// $("#music-question")[0].play();
		// $("#music-question")[0].pause();
		// $("#music")[0].pause();
	},
	onProgress : function(current, total){
		// $("#music")[0].pause();
		let timeout=setTimeout(()=>{
			$(".progress-inner").css("width",(current/total)*100+"%");
			$("#progress").html(((current/total)*100).toFixed(0));
			clearTimeout(timeout);
		},current*5)
	},
	onComplete : function(total){
		let timeout=setTimeout(()=>{
			$(".progress-inner").css("width","100%");
			$("#progress").html('100');
			$(".progress-text").fadeOut(500);
			$(".progress-content p").fadeOut(500);
			$(".progress-outer").fadeOut(500);
			$(".start-btn").fadeIn(500);
			clearTimeout(timeout);
		},total*5)
	}
});
loader.start();//启用图片预加载

