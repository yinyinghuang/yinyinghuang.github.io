$(function(){
	//侧栏导航
	$("#aside-nav span").each(function(){
		var len=$(this).next().children().length;
		$(this).html("("+len+")");
	});
	$("#aside-nav").children("ul").children("li").click(function(){
		var $secList=$(this).children("ul");
		if ($secList.is(":hidden")) {			
			$secList.slideDown();
		}else{
			$secList.slideUp();
		}		
	});
	//回到顶部
	$(window).scroll(function(){
		if($(window).scrollTop()>100){
			$("#back-to-top").fadeIn(500);
		}else{
			$("#back-to-top ").fadeOut(500);
		}
	});
	$("#back-to-top").click(function(){
		$("body,html").animate({"scrollTop":0},500);
	});
});