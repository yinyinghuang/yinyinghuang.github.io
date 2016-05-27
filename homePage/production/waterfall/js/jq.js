var hArr=[];
$(function(){
	var initBoxs=[];	
	$("#main").find(".box").each(function(){
		initBoxs.push($(this));
	});
	waterfall(initBoxs);

	var dataInt={"data":[{"scr":"1.jpg"},{"scr":"4.jpg"},{"scr":"3.jpg"},{"scr":"1.jpg"},{"scr":"4.jpg"},{"scr":"1.jpg"},{"scr":"4.jpg"},{"scr":"1.jpg"},{"scr":"4.jpg"}]};
	$(window).on("scroll",function(){
		var boxs=[];
		if(checkScrollSlide){
			$.each(dataInt.data,function(){
				var $box=$("<div>").addClass("box").appendTo($("#main"));
				var $pic=$("<div>").addClass("pic").appendTo($box);
				$("<img>").attr("src","images/"+$(this).attr("scr")).appendTo($pic);
				boxs.push($box);
			});
			waterfall(boxs);
		}
	});
	
});

//自定义瀑布流式布局
function waterfall(newBoxs){
	var $parent=$("#main");
	
	//计算列数
	var w=newBoxs[0].outerWidth();

	var cols=parseInt($parent.width()/w);
	$parent.css({
		"width":cols*w+"px",
		"margin":"0 auto"
	});	

	//设置存放列高度的数组
	
	
	$.each(newBoxs,function(index,value){
		var h=value.outerHeight();
		
		if(index<cols&&hArr.length<cols){
			hArr[index]=h;
		}else{
			var minH=Math.min.apply(null,hArr);
			
			var minHIndex=$.inArray(minH,hArr);

			value.css({
				"position":"absolute",
				"left":minHIndex*w+"px",
				"top":minH+"px"
			});
			
			hArr[minHIndex]+=h;
		}
	});
}

//是否满足加载条件
function checkScrollSlide(){
	var $lastBox=$(".box").last();
	var lastBoxH=$lastBox.offset().top+parseInt($lastBox.outHeight()/2);
	
	var scrollTop=$(window).scrollTop();
	var h=$(window).height();

	return (lastBoxH<scrollTop+h)?true:false;

}