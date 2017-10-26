	
	var parts=$('.part');
	var $navDisc=$('#fixed-bar');
	var curIndex=0;

var initResume=function(clientHeight){
	$('.part').css('height',clientHeight);
};

var upIsShow=function(scrollTopVal,screenH){
	var up=$('#up');
	if(scrollTopVal > (screenH/2)){
		up.fadeIn('slow');
	}else{
		up.fadeOut('slow');
	}
};

var controlDiscLight=function($navItems,curItemIndex){
	// 控制切换圆点导航的active
	$navItems.removeClass('active');
	$navItems.eq(curItemIndex).addClass('active');
};

var findBetweenBarItemScrollTop=function(itemScrollTops,curScrollTop){
	// 找到滚动当前位置属于哪个section
	for(var i in itemScrollTops){
		var index=parseInt(i);
		if(index!=(itemScrollTops.length-1)){
			if(itemScrollTops[index]<=curScrollTop && curScrollTop < itemScrollTops[index+1]){
				return index;
			}
			continue;
		}
		return index;
	}
};

var scrollControlDiscChange=function($nav,$parts,curScrollTop){
	// 控制滚动时圆点的切换显示
	var $navItems=$nav.find('.bar-item');
	var itemScrollTops=[];
	var curItemIndex=0;
	for(var i=0;i< $navItems.length;i++){
		var key=$parts.eq(i).offset().top;
		itemScrollTops.push(key);
	}
	curItemIndex=findBetweenBarItemScrollTop(itemScrollTops,curScrollTop);
	controlDiscLight($navItems,curItemIndex);
};

// 控制part1的背景动画
var scrollControlPart1Bg=function($part1,clientHeight,curScrollTop){
	if($part1.offset().top <=curScrollTop &&
		curScrollTop< ($part1.offset().top +clientHeight)){
			// $part1.find('.wrap').animate({
			// 	backgroundPosition:'center '+Math.ceil((clientHeight-curScrollTop)/10)
			// }, 50);
			var value='-200px '+(-Math.ceil((clientHeight-curScrollTop))/2)+"px";
			$('#wrap').css('background-position',value);
	}else{
		$part1.find('.wrap').css('background-position','center center');
	}

};

var scrollChangePart=function(clientHeight){	

	// 滚动监听事件
	$(window).scroll(function(event) {
		//控制向上滑动按钮的显示
		upIsShow($(document).scrollTop(),clientHeight);
		//控制技能圈的展示
		var part5Top=$('#part5').offset().top;
		var curScrollTop=$(this).scrollTop();
		if((curScrollTop+clientHeight)>=part5Top){
			//绘画技能分值圆弧
			makeCircle();
		}
		// 控制导航圆点的显示
		scrollControlDiscChange($navDisc,parts,curScrollTop);
		// 控制part1的背景动画
		var $part1=$('.part1');
		scrollControlPart1Bg($part1,clientHeight,curScrollTop);
	});

	// 当聚焦页面时，并按上下键触发part的改变
	$(window).keyup(function(event) {
		var partHeight=parseInt($(parts[curIndex]).css('height'));
		var scrollTopVal=$(document).scrollTop();
		var curPartOffsetTop=$(parts[curIndex]).offset().top+partHeight;
		var timer=null;
		if(event.keyCode !=38 && event.keyCode !=40 ){ return null;}
		if((scrollTopVal+clientHeight) > curPartOffsetTop){
			if(curIndex < parts.length){
				curIndex++;
			} 
		}
		if(curIndex>=1){
			if((scrollTopVal+clientHeight)<curPartOffsetTop){
				curIndex >0?curIndex--:null;
			}
		}

			$('html,body').animate({
					'scrollTop':$(parts[curIndex]).offset().top
				},
				500); 
	});
};
// clickToUp
var clickToUp=function(){
	$('#up').bind('click', function(event) {
	event.preventDefault();
	$('html,body').animate({
		scrollTop: $('html').offset().top},
		1000);
		return false;
	});
};
// 点击切换导航的圆点的active状态，并切换到相应的part
var clickToChangeNavItem=function($navDisc,parts){
	$navDisc.delegate('.bar-item', 'click', function(event) {
		var $navItems = $navDisc.find('.bar-item');
		var curItemIndex = $navItems.index($(event.target));
		$('html,body').animate({
			scrollTop:parts.eq(curItemIndex).offset().top},
			500);
	});
};

//绘制圆弧
var makeCircle=function(){
       $('.chart').easyPieChart({
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#69e168',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1000,
			scaleColor:false,
			scaleLength:0

        });		
};

// 当页面重新设置大小时
$(window).resize(function(event) {
		// 重新初始化parts的高度
		initResume($(window).height());
});

$(function(){
	//初始化页面section高度
	initResume($(window).height());
	// 屏幕滑动时监听改变屏幕所显示的part
	scrollChangePart($(window).height());
	// 点击置顶按钮平滑滚动到页面顶部
	clickToUp();
	// 点击切换导航的圆点的active状态，并切换到相应的part
	clickToChangeNavItem($navDisc,parts);

});