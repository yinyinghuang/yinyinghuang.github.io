window.onload=function(){
	waterfall("main","box");
	var dataInt={"data":[{"scr":"1.jpg"},{"scr":"4.jpg"},{"scr":"3.jpg"},{"scr":"1.jpg"},{"scr":"4.jpg"},{"scr":"1.jpg"},{"scr":"4.jpg"},{"scr":"1.jpg"},{"scr":"4.jpg"}]};
	window.onscroll=function(){
		if(checkScrollSlide){
			for(var i=0;i<dataInt.data.length;i++){
				var oParent=document.getElementById("main");

				var oBox=document.createElement("div");
				oBox.className="box";
				oParent.appendChild(oBox);

				var oPic=document.createElement("div");
				oPic.className="pic";
				oBox.appendChild(oPic);

				var oImg=document.createElement("img");
				oImg.src="images/"+dataInt.data[i].scr;
				oPic.appendChild(oImg);
			}
			waterfall("main","box");
		}
	};
	
};
/**
 * 自定义瀑布流布局排版函数
 *
 */
function waterfall(parent,box){
	var oParent=document.getElementById(parent);
	var oBox=getByClass(oParent,box);
	//计算列数
	var oBoxW=oBox[0].offsetWidth;	
	var cols=parseInt(document.documentElement.clientWidth/oBoxW);	
	oParent.style.cssText="width:"+oBoxW*cols+"px;margin:0 auto";

	//设置存放每列高度数组
	var hArr=[];
	for(var i=0;i<oBox.length;i++){
		if(i<cols){
			hArr.push(oBox[i].offsetHeight);
		}else{
			var minH=Math.min.apply(null,hArr);
			var index=getIndex(hArr,minH);
			oBox[i].style.position="absolute";
			oBox[i].style.top=minH+"px";
			oBox[i].style.left=oBoxW*index+"px";
			hArr[index]+=oBox[i].offsetHeight;
		}
	}
	
}


/**
 * 自定义根据classname获取元素对象
 */

function getByClass(parent,cls){
	var result=[];
	var elem=parent.getElementsByTagName("*");
	for(var i=0;i<elem.length;i++){
		
		if(elem[i].className.indexOf(cls)!=-1){
			result.push(elem[i]);
		}
	}
	return result;
}
/**
 * 获取数值中某个值得索引值
 */

function getIndex(arr,value){
	for(var i in arr){
		if(arr[i]==value){
			return i;
		}
	}
}

function checkScrollSlide(){
	var oParent=document.getElementById("main");
	var oBox=getByClass("main","box");
	var lastBoxH=oBox[oBox.length-1].offsetHeight+parseInt(oBox[oBox.length-1].height/2);
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	var height=document.body.clientHeight||document.documentElement.clientHeight;
	return (lastBoxH<scrollTop+height)?true:false;
}