$(function(){

	$("#fullpage").fullpage({
		verticalCentered:false,
		anchors:["page1","page2","page3","page4","page5"],
		fixedElements:"header",
		menu:"#menu",
		afterLoad:function(link,index){
			switch(index){
				case 1:
					$("#me").animate({"margin-top":"10px"},700,function(){
						$("#look-me").fadeIn(700,function(){
							$("#desc1").fadeIn(700,function(){
								$("#desc2").fadeIn(700,function(){
									$("#desc3").fadeIn(700,function(){
										$("#desc4").fadeIn(700);
									});
								});
							});
						});
					});
					break;
				case 2:
					$(".head").eq(0).addClass("show");
					$("#a-img1").animate({"margin-left":"-120px"},700,function(){
						$("#a-img2").animate({"margin-left":"-120px"},400,function(){
							$("#a-img3").animate({"margin-left":"-120px"},400,function(){
								$("#a-img4").animate({"margin-left":"-120px"},400,function(){
									$("#about-me-list").find(".top").find("img").animate({"margin-left":"0"},700);
								});
							});
						});
					});
					$("#about-me-intr p").eq(0).animate({"margin-top":0},700,function(){
						$("#about-me-intr p").eq(1).animate({"margin-top":0},700,function(){
							$("#about-me-intr p").eq(2).animate({"margin-top":0},700);
						});
					});
														
					break;
				case 3:
					$(".head").eq(1).addClass("show");
					$("#skill-list .icon,blockquote").css({"transform":"scale(1)","transition":"transform 1s"});
					break;
				case 4:
					$(".head").eq(2).addClass("show");
					var i=-1;
					$("#pro-list .logo-box").each(function(){
						var $this=$(this);
						if ( !$this.hasClass("show")) {
							i++;
							setTimeout(function(){
								$this.addClass("show");
							},700*i);
						}
					});
					$("#pro-more").addClass("show");
					break;
				case 5:
					$(".head").eq(3).addClass("show");
					$("#contact-content").addClass("show");
					break;
			}
		},
		onLeave:function(link,index){
			switch(index){
				case 1:
					
					break;
				case 2:
					$(".head").eq(0).removeClass("show");
					
					break;
				case 3:
					$(".head").eq(1).removeClass("show");
					;
					break;
				case 4:
					$(".head").eq(2).removeClass("show");
					break;
				case 5:
					$(".head").eq(3).removeClass("show");
					break;
			}
		}

	});
/* 顶部导航 */
	$("#nav-about-me").click(function(){
		alert("建设中~");
	});
	$("#lang").find("button").click(function(){
		window.location.pathname="homePage/en_index.html";
	});
/* 首页 */
	$("#reality").click(function(){
		var img=$("#me").find("img");
		img.attr({"src":"images/realone.jpg"}).fadeOut(100,function(){
			img.attr({"src":"images/cat.jpg"}).fadeIn(200,function(){
				$("#hide").addClass("show");
			});
		});
	});
	$("#hide").click(function(){
		$("#hide").removeClass("show");
	});
/* 技能 */
	$("#skill-list").find("li").click(function(){
		$(this).addClass("selected")
		.find(".hint").slideDown().end()
		.siblings().removeClass("selected")
		.find(".hint").slideUp();
	});
/* 展区 */
	$("#pro-more button").click(function(){
		$(this).next().fadeIn(700);
	});
/* 联系我 */

});
