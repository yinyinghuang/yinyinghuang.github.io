
window.onload=function(){
	//初始化
	randomArr();
	//为按钮绑定事件
	var reset=document.getElementById("reset"),
		bubble=document.getElementById("bubble"),
		insert=document.getElementById("insert"),
		select=document.getElementById("select"),
		quick=document.getElementById("quick"),
		et=document.getElementById("e-time"),
		type=document.getElementById("type");
	reset.onclick=function(){
		randomArr();
		et.innerHTML="";
		type.innerHTML="";
	};
	bubble.onclick=function(){
		var eTime=bubbleSort(curArr);
		et.innerHTML=eTime;
		type.innerHTML="冒泡排序";

	};
	insert.onclick=function(){
		var eTime=insertSort(curArr);
		et.innerHTML=eTime;
		type.innerHTML="插入排序";
	};
	select.onclick=function(){
		var eTime=selectSort(curArr);
		et.innerHTML=eTime;
		type.innerHTML="选择排序";
	};
	quick.onclick=function(){
		var eTime=quickSort(curArr,0,curArr.length-1);
		et.innerHTML=eTime;
		type.innerHTML="快速排序";

	};
};
var timer,curArr;

//随机生成1-100不重复数组
function randomArr(){
	if (timer) {clearTimeout(timer);}
	var arr=[],arrObj={};
	while(arr.length<=99){
		var random=Math.ceil(Math.random()*100);
		if (!arrObj[random]) {
			arrObj[random]=1;
			arr.push(random);
		}
	}
	curArr=arr;
	paint(arr);
}
//交换位置
function swap(arr,i,j){
	var temp=arr[j];
	arr[j]=arr[i];
	arr[i]=temp;
}
//冒泡排序
function bubbleSort(arr){
	var state=[];
	var start=new Date().getTime();
	for(var i=0;i<arr.length;i++){	
		var exchange=0;	
		for(var j=0;j<arr.length-i-1;j++){
			if (arr[j]>arr[j+1]) {
				swap(arr,j,j+1);
				exchange=1;	
				state.push(JSON.parse(JSON.stringify(arr)));
			}
		}
		if (!exchange){//若出现一次没有交换的情况，则序列有序
			break;
		}		
	}
	var end=new Date().getTime();		
	draw(state);
	return (end-start)+"ms";		
}
//直插排序
function insertSort(arr){
	var state=[];
	var start=new Date().getTime();
	for(var i=1;i<arr.length;i++){
		var temp=arr[i];
		for(var j=i-1;j>=0&&temp<arr[j];j--){				
			arr[j+1]=arr[j];
			state.push(JSON.parse(JSON.stringify(arr)));				
		}
		arr[j+1]=temp;
		state.push(JSON.parse(JSON.stringify(arr)));
	}
	var end=new Date().getTime();		
	draw(state);
	return (end-start)+"ms";
}
//选择排序
function selectSort(arr){
	var state=[];
	var start=new Date().getTime();
	for(var i=0;i<arr.length-1;i++){
		var min=i;//记录最小值位置
		for(var j=i+1;j<arr.length;j++){
			if(arr[j]<arr[min]){
				min=j;
			}
		}
		if (min!=i) {
			swap(arr,i,min);
			state.push(JSON.parse(JSON.stringify(arr)));
		}
	}
	var end=new Date().getTime();	
	draw(state);
	return (end-start)+"ms";
}
//快速排序
var state=[];
function quickSort(arr,left,right){
	var start=new Date().getTime();
	if (left<right) {
		var pivotPos=partition(arr,left,right);
		arguments.callee(arr,left,pivotPos-1);
		arguments.callee(arr,pivotPos,right);
	}
	var end=new Date().getTime();	
	draw(state);
	return (end-start)+"ms";
	function partition(arr,left,right){
		var pivotPos=Math.floor((left+right)/2);
		var pivot=arr[pivotPos];
		var i=left,j=right;
		while(i<=j){
			while(arr[i]<pivot){
				i++;
			}
			while(arr[j]>pivot){
				j--;
			}								
			if(i<=j){
				swap(arr,i,j);
				i++;
				j--;
				state.push(JSON.parse(JSON.stringify(arr)));
			}
		}
		return i;
	}

}
//渲染
function draw(arr){	
	if(timer){
		clearTimeout(timer);
	}
	if(!arr.length)return;	
	timer=setTimeout(function(){
		var s=arr.shift()||[];
		paint(s);				
		if(arr.length) {
			timer=setTimeout(arguments.callee,20);
		}						
	},20);	
}
function paint(arr){
	var showbox=document.getElementById("show");
	var str="";			
	for(var i=0;i<arr.length;i++){
		str+="<div class='item' style='height:"+3.5*parseInt(arr[i])+"px'></div>";
	}		
	showbox.innerHTML=str;
}



