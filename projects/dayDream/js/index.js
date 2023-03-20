/**
 * infor 主体js代码
 * user xsq
 * date 2019-03-12
 */

/**
 * 适配相关
 */

var G_sex='';//全局性别
var G_sexChoose=false;//是否选择性别
var G_username;//用户姓名
var G_currentQuestionIndex=1;//题目索引
var inputFocus=false;//是否输入
var isAnswer=false;
var G_questionArr=[
		{question:'梦境中出现了一个引路人，你期待ta是什么样子？',a:'天真可爱的小女孩',b:'美艳动人的兔女郎',c:'面带笑容的慈祥老人'},
		{question:'梦中出现音乐 你觉得是哪种？',a:'一切没有你想的那么糟',b:'封锁线',c:'达摩流浪者'},
		{question:'在你的梦境里突然出现了一对男女，男生面对着女生，低头单膝下跪，你觉得男生是要干嘛？',a:'向女孩求婚',b:'为约会迟到在道歉',c:'鞋带松了系鞋带'},
		{question:'你准备进入更深层的梦境中，你会选择哪样私密物件作为判断的图腾？',a:'定好时间的闹钟',b:'一枚别致的戒指',c:'会流动的沙漏'},
		{
			male:{question:'桌上有三杯特饮，喝下你就能从梦境中清醒圆梦，你会选择哪一杯？',a:'完美体形 · 莫吉托',b:'从不脱发 ·  金菲士',c:'从不脱发 ·  金菲士'},
			female:{question:'桌上有三杯特饮，喝下你就能从梦境中清醒圆梦，你会选择哪一杯？',a:'不节食暴瘦 · 莫吉托',b:'帝都买楼 · 亚历山大',c:'无限名牌包包 · 金菲士'}
		},
	];
var G_answerArr=[];
var G_result={//结果
	title:[
		{resultArr:["兄dei，今⽣恐怕要靠⾃⼰了，打好这份⼯，梦有时只有在梦中最美","姑娘，靠梦不如靠自己，做好自我增值，找个比梦靠谱的对象还是有的","白日梦有千万种，你只会做一种，不太可能实现的那种，还是脚踏实地的好","白日梦就像一条冰毛巾，能让你透心凉，但并不能让你缓解疲惫"]},
		{resultArr:["帝都买楼能成的，名跑轿车会有的，不信你再努力十年看看","dream小屋能买的，限量包包会有的，不信你再努力十年看看","做白日梦最大的好处就是，做做看有可能成真，做砸了大不了就是醒来","你的白日梦就像双翼蝴蝶，最开始都是毛毛虫，做着做着就美了"]},
		{resultArr:["拥有最强的能力，做最酷的白日梦，你就是这座城最厉害的仔","画最靓的妆，做最美的白日梦，你就是这座城最厉害的妞","不用害怕白人做梦会被撞得遍体鳞伤，你已经有最好的条件了","当你觉得无能为力的时候，就该做做白日梦，梦和现实是相反的"]},
	],
	description:[
		{
			courage:["有首歌你的多听梁静茹的《勇气》","不用害怕什么梦砸了也就是醒罢了"],
			luky:["去买张彩票吧给公益事业做点贡献","白日梦总是要有的说不定你能遇到万一呢？"],
			sleep:["1s、2s、3s...刚才是发生什么了吗？","你的白日梦时间已不足请疯狂充值"],
			desire:["阳光、雨露和温馨的家都能让你开心","纯真简单的满足是你灵魂的核，发着光"],
			strive:["我知道，你尽力了","努力就像挤牙膏总还是有的"],
		},
		{
			courage:["你常感孤独因为敢选少数派的梦想","很多事不能犹豫由其是做梦这事"],
			luky:["运气这事可遇不可求还是靠自己好点","运气不好就多做几次梦质量不够，数量来凑"],
			sleep:["把握有限的时间做自己最想做的梦","放心执念，诸事随缘做梦是这样，做白日梦也是这样"],
			desire:["不需要刻意美化欲望用实际行动去满足","对梦境和现实有一定认知是件好事"],
			strive:["做事干脆利落做梦纯粹执着","坚守自己的白日梦不需要受别人的影响"],
		},
		{
			courage:["内心强大的你再瞎的梦也做得起","放手一搏你终将实现独一无二的梦"],
			luky:["你身上有幸运光芒和别人的不一样","只要梦的方向正常你一定能找到实现的那扇门"],
			sleep:["既然是做梦，那干脆就梦票大的","有些白日梦是得时间久些才不会提前全剧终"],
			desire:["看清梦的荒谬，人间也可以很值得","追求白日梦的奇幻赋予简单生活的一种高级感"],
			strive:["累了就睡一觉，再原地复活","即使一直不能实现梦想也绝不会被虚幻侵蚀"],
		},
		{
			courage:["你快说！从梁静茹那偷了多少勇气？","已经没有什么能阻挡你做白日梦了"],
			luky:["是传说中的锦鲤本人了","你有吸引幸运女神的魔力她甘愿为你服务"],
			sleep:["你做梦的时候梦境就是真实的，对不对？","你一定是天选上夜班的人只做白日梦"],
			desire:["人间能有满足你的东西吗？","你的人生字典里，一定没有“四大皆空”这个词"],
			strive:["努力努力再努力，你是全人类的努力代言人","天将圆白日梦于你也必先努力爆表哟"],
		},
	]
}
var G_resultScore=0;//得分

var G_userResult={courage:-1,luky:-1,sleep:-1,desire:-1,strive:-1}//用户得分表
var G_userResultIndex={courage:-1,luky:-1,sleep:-1,desire:-1,strive:-1};//用户得分内容索引
// input bug
$("input").focus(function(){
	$("#orientLayer").addClass("mod-orient-layer__block");
	inputFocus=true;
})
$("input").blur(function(){
	inputFocus=false;
	$("#orientLayer").removeClass("mod-orient-layer__block");
})
$(window).resize(function(){
	if(!inputFocus)
		screenControl(".container",750,1218);
})


// 开始播放开头视频
$(".start-btn").on("click",function(){
	$(".loading_panel").fadeOut(500,function(){
		$(".loading_panel").remove();
		$(".video-panel").show();
	})
	$(".video").show();
	$("#video")[0].play();
})

//监听视频结束
$("#video").on("ended",function(){
	$(".video-panel").fadeOut(500,function(){
		$(".video-panel").remove();
		$(".music-panel").show();
		$(".logo-panel").show();
		$("#music")[0].play();
		$(".home-panel .home-logo,.sub-title,.home-start").addClass("fadeUp");
		$(".home-panel").fadeIn(500)
	})
})

//音乐播放结束跳转下个场景
// $("#music-question").on("ended",function(){
// 	$(".bg-content").animate({bottom:"-4324px"},1900,function(){
// 		$("."+G_sex+"-walk").css("bottom",4324-350+"px");
// 		$("."+G_sex+"-walk").css("left","550px");
// 		peopleWalk();
// 	});
// })

//音频控制
$(".music-panel").on("click",function(){
	if($("#music")[0].paused){
		$("#music")[0].play();
		$(".music-off").hide();
		$(".container .music-panel,.container-copy .music-panel").addClass("rotate");
	}else{
		$("#music")[0].pause();
		$(".music-off").show();
		$(".container .music-panel,.container-copy .music-panel").removeClass("rotate");
	}
})

// 进入性别选择
$(".home-start").on("click",function(){
	$(".home-panel,.logo-panel").fadeOut(500);
	var timeout=setTimeout(()=>{
		$(".home-panel").remove();
		clearTimeout(timeout);
	},500)
	$(".sex-panel").fadeIn(500);
})

//性别切换
$(".sex").on("click",function(){
	G_sex=$(this).attr("data-value");
	if(G_sex=='male'){
		$(".male-select").css("background-image","url('assets/img/male-select.png')");
		$(".female-select").css("background-image","url('assets/img/female-unselect.png')");
	}else{
		$(".male-select").css("background-image","url('assets/img/male-unselect.png')");
		$(".female-select").css("background-image","url('assets/img/female-select.png')");
	}
})

//确认性别选择
$(".select-confirm").on("click",function(){
	if(!G_sex){
		tipMsg('请先选择性别');
		return;
	}
	if(G_sexChoose&&!$("#username").val()){
		tipMsg('请填写你的名字');
		return;
	}else if(G_sexChoose){
		G_username=$("#username").val();
		$(".male,.female").hide();
		$(".sex-input-panel,.select-confirm").fadeOut(500);
		$(".through-content,.through-light,.all-light").fadeIn(500);
		$(".through-all").css("bottom","-70px");
		// $(".all-light").addClass("moveUp");
		// $(".through-content").addClass("scaleBig").fadeOut(2000);
		//过渡效果
		var timeout1=setTimeout(function(){
			$(".brand-small").show().addClass("through");
			setTimeout(()=>{
				$(".brand-small").fadeOut(500);
			},1500);
			clearTimeout(timeout1)
		},500)
		var timeout2=setTimeout(function(){
			$(".brand-center-content").show().addClass("through");
			setTimeout(()=>{
				$(".brand-center-content").fadeOut(500);
			},1500);
			clearTimeout(timeout2)
		},1500)
		var timeout3=setTimeout(function(){
			$(".brand-big-content").show().addClass("through");
			setTimeout(()=>{
				$(".brand-big-content").fadeOut(500);
			},1500);
			clearTimeout(timeout3)
		},2500)


		var timeout4=setTimeout(function(){
			$(".tip-text").show().addClass("scaleBig");
			setTimeout(()=>{
				$(".tip-text").fadeOut(500);
			},1500);
			clearTimeout(timeout4)
		},3500)
		var timeout5=setTimeout(function(){
			$(".through-text").show().addClass("through");
			setTimeout(()=>{
				$(".through-text").fadeOut(500);
			},1500);
			clearTimeout(timeout5)
		},4500)

		$(".sex-panel .star-bg").addClass("moveUpSlow");
		$(".sex-panel .ball-02").animate({top:"-90px",left:"0px"},3000);
		$(".sex-panel .ball-01").animate({top:"-90px",right:"-10px"},3000);
		$(".sex-panel .ball-03").animate({left:"-10px"},3000);
		$(".sex-panel .ball-04").animate({right:"-10px"},3000);
		var timeout=setTimeout(()=>{
			$(".sex-panel").fadeOut(500);
			// $(".music-panel").hide();
			// $("#music")[0].pause();
			// $(".music-off").hide();
			$(".dream-panel").fadeIn(500,function(){
				peopleWalk();//踏入梦境
			});
			var hideTimeout=setTimeout(()=>{
				$(".sex-panel").remove();
				clearTimeout(hideTimeout);
			},500)
			clearTimeout(timeout);
		},6500);
		return;
	}
	$(".sex-text").hide();
	$(".sex-input-panel").show();
	$(".male-select").hide();
	$(".female-select").hide();
	if(G_sex=='male'){
		$(".female").hide();
		$(".male").css("left","250px");
	}else{
		$(".male").hide();
		$(".female").css("right","230px");
	}
	G_sexChoose=true;
})

// 回答问题
$(".answer").on("click",function(){
	var num=$(this).attr("data-value");
	if(G_currentQuestionIndex!=2){
		if(G_currentQuestionIndex==G_answerArr.length+1&&!isAnswer){
			$(this).find(".light-border").show().addClass("lightFast");
			G_answerArr.push(num);
			$(".question-panel").fadeOut(500,function(){
				G_currentQuestionIndex++;
				isAnswer=true;
				$(".answer .light-border").hide();
				if(G_currentQuestionIndex==2){
					welcome();
				}
				// if(G_currentQuestionIndex==3){
				// 	playAnswerMusic();
				// }
				if(G_currentQuestionIndex==4){//相伴工厂答题后
					changeLoveBg();
				}
				if(G_currentQuestionIndex==5){//渴望商城答题后
					sleep();
				}
				if(G_currentQuestionIndex==6){//酒吧答题后
					hideDreamPanel();
				}
			});
		}
	}else{
		G_answerArr[1]=num;
		playAnswerMusic();
	}
	return;
})

// 购买通道
$(".order-btn").on("click",function(){
	window.location.href="https://www.baidu.com";
})
// 试试手气
$(".luck-btn").on("click",function(){

})

/**
 * 进入梦境,人物行走
 */
function peopleWalk(){
	isAnswer=false;
	$("."+G_sex+"-walk").show();
	var bottom=parseInt($("."+G_sex+"-walk").css("bottom"));
	var left=parseFloat($("."+G_sex+"-walk").css("left"));
	$("."+G_sex+"-walk").css("left","900px");
	var distance=450;
	if(G_currentQuestionIndex==4)
		distance=800;
	bottom=bottom+distance;
	if(G_currentQuestionIndex==5){
		bottom=200;
		$("."+G_sex+"-walk").css("-webkit-transform","scale3d(2.2,2.2,1)");
		$("."+G_sex+"-walk").css("transform","scale3d(2.2,2.2,1)");
	}
	if(G_currentQuestionIndex==4){
		$(".desk").fadeIn(500,function(){
			var timeout=setTimeout(function() {
					$("."+G_sex+"-walk").animate({
						bottom:bottom+"px",
						left:left+'px'
					},3000,function(){
						setQuestion();
						$(".question-panel").fadeIn(500);
					})
			}, 200);
		});
	}else{
		if(G_currentQuestionIndex==2)
			$(".confirm").show();
		else
			$(".confirm").hide();
		$("."+G_sex+"-walk").animate({
			bottom:bottom+"px",
			left:left+'px'
		},3000,function(){
			setQuestion();
			$(".question-panel").fadeIn(500);
		})
	}
}

/**
 * 设置问题
 */
function setQuestion(){
	var question;
	if(G_currentQuestionIndex!=5){
		question=G_questionArr[G_currentQuestionIndex-1];
	}else{
		question=G_questionArr[G_currentQuestionIndex-1][G_sex];
	}
	if(G_currentQuestionIndex==2){
		$(".control-content").show();
		$(".answer .quesiton-border>div").css({"justify-content":"left","padding-left":"60px"});
	}else if(G_currentQuestionIndex==3){
		$(".control-content").hide();
		$(".answer .quesiton-border>div").css({"justify-content":"center","padding-left":"0"});

		$(".question-title,.question-title .light-border").css("height","150px");
		$(".question-title .light-border").css("background-size","592px 150px");
		$(".question-title .quesiton-border").css("height","132px");
		$(".question-title").css("top","-18px");
	}else if(G_currentQuestionIndex==4){
		$(".question-title,.question-title .light-border").css("height","114px");
		$(".question-title .light-border").css("background-size","592px 114px");
		$(".question-title .quesiton-border").css("height","96px");
		$(".question-title").css("top","-18px");
	}
	$(".question-title .quesiton-border>div").html(question.question);
	$(".answer-1 .quesiton-border>div").html(question.a);
	$(".answer-2 .quesiton-border>div").html(question.b);
	$(".answer-3 .quesiton-border>div").html(question.c);
}
/**
 *欢迎
 */
function welcome(){
	var index=getIndex(0);
	if(index==0){
		num=3;
	}else if(index==1){
		num=1;
	}else{
		num=2;
	}
	$(".talk-border"+num).fadeIn(500,function(){
		var timeout=setTimeout(()=>{
			$(".talk-border"+num).fadeOut(500,function(){
				$(".bg-content").animate({bottom:"-2299px"},1900,function(){
					$("."+G_sex+"-walk").css("bottom",2299-350+"px");
					$("."+G_sex+"-walk").css("left","550px");
					peopleWalk();
					clearTimeout(timeout);
				});
			});
		},2000)
	})
}
/**
 * 切换下跪图片
 */
function changeLoveBg(){
	var arr=[
		{img:'part03-01-01.gif',width:270,height:398,x:0,y:0},
		{img:'part03-01-02.gif',width:242,height:398,x:0,y:0},
		{img:'part03-01-03.gif',width:270,height:398,x:0,y:0},
	];
	var index=getIndex(2);
	$(".factory-man").css({"background-image":"url(assets/img/"+arr[index].img+")","background-size":arr[index].width+"px "+arr[index].height+"px"});
	var timeout=setTimeout(()=>{
		$(".bg-content").animate({bottom:-(7020-parseFloat($(".container").css("height")))+"px"},1900,function(){
			$("."+G_sex+"-walk").css("bottom",6029-800+"px");
			$("."+G_sex+"-walk").css("left","478px");
			peopleWalk();
			clearTimeout(timeout);
		});
	},3000)
}

/**
 * 瘫沙发
 */
function sleep(){
	var arr=[
		{img:'part04-05-01.png',width:268,height:289,x:190,y:90},
		{img:'part04-05-02.png',width:204,height:204,x:0,y:0},
		{img:'part04-05-03.png',width:130,height:181,x:0,y:0},
	];
	var index=getIndex(3);
	$(".gift").css({
		"background-image":"url(assets/img/"+arr[index].img+")",
		"background-size":arr[index].width+"px "+arr[index].height+"px",
		"background-repeat":"no-repeat",
		"width":arr[index].width+"px ",
		"height":arr[index].height+"px",
	})
	$("."+G_sex+"-walk").animate({
		"bottom":"6229px",
		"left":"298px"
	},1000,function(){
		$("."+G_sex+"-walk").fadeOut(500,function(){
			$("."+G_sex+"-sleep").fadeIn(500,function(){
				var timeout=setTimeout(()=>{
					$(".bg-content").fadeOut(500,function(){
						$(".bg-content").remove();
						clearTimeout(timeout);
						$(".bg-par").fadeIn(500,function(){
							$("."+G_sex+"-walk").css("bottom","-350px");
							$("."+G_sex+"-walk").css("left","478px");
							peopleWalk();
						});
					});
				},1000);
			})
		})
	})
}

/**
 * 播放问题音乐
 */
function playAnswerMusic(){
	var answer=G_answerArr[1];
	var index=getIndex(1);
	$(".answer .light-border").hide();
	$(".control-content .control").css("background-image","url(assets/img/play.png)")
	$(".slice,.bar").removeClass("rotate");
	$(".answer-"+(index+1)+" .control").css("background-image","url(assets/img/pause.png)")
	$(".answer-"+(index+1)+" .slice").addClass('rotate');
	$(".answer-"+(index+1)+" .bar").addClass('rotate');

	$("#music-question").attr("src","assets/audio/question-"+(index+1)+".mp3");
	$("#music-question")[0].load();
	// if(browser().ios&&browser.weixin===false){
	// 	var timeout=setTimeout(()=>{
	// 		$(".bg-content").animate({bottom:"-4324px"},1900,function(){
	// 			$("."+G_sex+"-walk").css("bottom",4324-350+"px");
	// 			$("."+G_sex+"-walk").css("left","550px");
	// 			peopleWalk();
	// 			clearTimeout();
	// 		});
	// 	},2000)
	// }
}
// 提交
$(".confirm").on("click",function(){
	$("#music-question")[0].pause();
	$(".question-panel").fadeOut(500,function(){
		G_currentQuestionIndex=3;
		$(".bg-content").animate({bottom:"-4324px"},1900,function(){
			$("."+G_sex+"-walk").css("bottom",4324-350+"px");
			$("."+G_sex+"-walk").css("left","550px");

			$(".control-content").hide();
			$(".answer .quesiton-border>div").css({"justify-content":"center;","padding-left":"0"});
			peopleWalk();
		});
	})
})

/**
 * 隐藏梦境
 */
function hideDreamPanel(){
	var interval=setInterval(()=>{
		var timeout1=setTimeout(()=>{
			$(".create-text span").html('..');
			clearTimeout(timeout1);
		},500)
		var timeout2=setTimeout(()=>{
			$(".create-text span").html('...');
			clearTimeout(timeout2);
		},1000)
		var timeout3=setTimeout(()=>{
			$(".create-text span").html('.');
			clearTimeout(timeout3);
		},1500)
	},1500)
	$(".dream-panel").fadeOut(500,function(){
		// $(".logo-wall").show();
		$(".logo-panel").show();
		// var timeout=setTimeout(()=>{
			// $(".logo-wall").fadeOut(500,function(){
				// $(".logo-wall").remove();
				$(".result-panel").show();
				$(".container-copy").show();
				getReuslt();
			// });
		// },4000)
	})
}
/**
 * 获取索引
 */
function getIndex(questionNum){
	var index;
	var answer=G_answerArr[questionNum];
	switch(answer){
		case 'a':
				index=0;
			break;
		case 'b':
				index=1;
			break;
		case 'c':
				index=2;
			break;
	}
	return index;
}

/*
 * 获取结果
 */
function getReuslt(){
	for(var key in G_userResult){
		G_userResult[key]=Math.floor(100*Math.random()+1);
		G_userResultIndex[key]=getDescriptionIndex(G_userResult[key]);
		$("."+key+"-content span").html(G_userResult[key]);
		var index=Math.floor(Math.random()*2);
		$("."+key+"-content .score-bottom").html(G_result.description[G_userResultIndex[key]][key][index]);
		if(key=='sleep')
			setSleepBottom(G_result.description[G_userResultIndex[key]][key][index]);
		G_resultScore+=G_userResult[key];
	}

	$(".score-name").html(G_username);
	$(".score").html(G_resultScore);

	setScoreImg();
	$(".container .music-panel").hide();
	$(".container-copy .music-panel").show();
	html2canvas(document.querySelector(".container"),{
		width:window.innerWidth,
		height:window.innerHeight,
	}).then(canvas => {
	    document.body.appendChild(canvas)
	    var url=canvas.toDataURL();
	    // console.log(url)
	    $("#canvas-img").attr("src",url);
	});
}

/*
 * 设置分数图
 */
function setScoreImg(){
	$(".type-1").attr("src","assets/img/type-1-"+(G_userResultIndex.desire+1)+".png");
	$(".type-2").attr("src","assets/img/type-2-"+(G_userResultIndex.luky+1)+".png");
	$(".type-3").attr("src","assets/img/type-3-"+(G_userResultIndex.sleep+1)+".png");
	$(".type-4").attr("src","assets/img/type-4-"+(G_userResultIndex.strive+1)+".png");
	$(".type-5").attr("src","assets/img/type-5-"+(G_userResultIndex.courage+1)+".png");
}

// /*
//  * 数组重排
//  */
// function randomSort(arr, newArr) {
// 	// 如果原数组arr的length值等于1时，原数组只有一个值，其键值为0
// 	// 同时将这个值push到新数组newArr中
// 	if(arr.length == 1) {
// 		newArr.push(arr[0]);
// 		return newArr; // 相当于递归退出
// 	}
// 	// 在原数组length基础上取出一个随机数
// 	var random = Math.ceil(Math.random() * arr.length) - 1;
// 	// 将原数组中的随机一个值push到新数组newArr中
// 	newArr.push(arr[random]);
// 	// 对应删除原数组arr的对应数组项
// 	arr.splice(random,1);
// 	return randomSort(arr, newArr);
// }
// /*
//  * 随机对应分值
//  */
// function randomScore(){
// 	var score=G_resultScore-5;
// 	var num=0;
// 	for(var key in G_userResult){
// 		if(G_userResult[key]!=-1){
// 			score-=G_userResult[key];
// 			num++;
// 		}
// 	}
// 	if(num==4)
// 		return score; 
// 	let randomNum=Math.floor((score+1)*Math.random());
// 	return randomNum;
// }

/*
 * 获取分值对应文案
 */
function getDescriptionIndex(score){
	if(score<=30)
		return 0;
	else if(score<=60)
		return 1;
	else if(score<=90)
		return 2;
	else
		return 3;
}


function setSleepBottom(str){
	if(G_userResultIndex.sleep==0){
		$(".sleep-content .score-bottom").html('('+G_userResult.sleep*6+'s)'+str);
	}else if(G_userResultIndex.sleep==1){
		$(".sleep-content .score-bottom").html('('+(G_userResult.sleep-30)*4+'h)'+str);
	}else if(G_userResultIndex.sleep==2){
		$(".sleep-content .score-bottom").html('('+(G_userResult.sleep-60)*1+'d)'+str);
	}else if(G_userResultIndex.sleep==0){
		$(".sleep-content .score-bottom").html('(永恒)'+str);
	}
}

// peopleWalk();
// getReuslt();