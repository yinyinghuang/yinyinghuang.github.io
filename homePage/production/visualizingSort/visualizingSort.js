
window.onload=function(){
	//初始化
	randomArr();
	//为按钮绑定事件
	var reset=document.getElementById("reset"),
		bubble=document.getElementById("bubble"),
		insert=document.getElementById("insert"),
		shell=document.getElementById("shell"),
		select=document.getElementById("select"),
		quick=document.getElementById("quick"),
		heap=document.getElementById("heap"),
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
	shell.onclick=function(){
		var eTime=shellSort(curArr);
		et.innerHTML=eTime;
		type.innerHTML="希尔排序";
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
	heap.onclick=function(){
		var eTime=heapSort(curArr);
		et.innerHTML=eTime;
		type.innerHTML="堆排序";

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
//希尔排序
function shellSort(arr){
	var len=arr.length,d,state=[],i,j;
	var start=new Date().getTime();
	d=Math.floor(len/2);
	while(d>0){
		for(i=d;i<=len;i++){
			j=i-d;
			while(j>=0&&arr[j]>arr[j+d]){
				swap(arr,j,j+d);
				state.push(JSON.parse(JSON.stringify(arr)));
				j-=d;
			}
		}
		d=Math.floor(d/2);
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
//堆排序
function heapSort(arr){
	var state=[];
	var start=new Date().getTime();
	//构建堆
	buildHeap(arr);

	//从数列的尾部开始进行调整
	for(var i=arr.length-1; i>0; i--){
		//堆顶永远是最大元素，故，将堆顶和尾部元素交换，将
		//最大元素保存于尾部，并且不参与后面的调整
		var temp = arr[i];
		arr[i] = arr[0];
		arr[0] = temp;
		state.push(JSON.parse(JSON.stringify(arr)));
		//进行调整，将最大）元素调整至堆顶
		headAdjust(arr, 0, i);
	}
	var end=new Date().getTime();	
	draw(state);
	return (end-start)+"ms";
	//构建堆
	function buildHeap(arr){
		//从最后一个拥有子节点的节点开始，将该节点连同其子节点进行比较，
		//将最大的数交换与该节点,交换后，再依次向前节点进行相同交换处理，
		//直至构建出大顶堆（升序为大顶，降序为小顶）
		for(var i=arr.length/2; i>=0; i--){
			headAdjust(arr, i, arr.length);
		}
	}
	//调整函数
	function headAdjust(arr, pos, len){
		//将当前节点值进行保存
		var temp = arr[pos];

		//定位到当前节点的左边的子节点
		var child = pos * 2 + 1;

		//递归，直至没有子节点为止
		while(child < len){
		//如果当前节点有右边的子节点，并且右子节点较大的场合，采用右子节点
		//和当前节点进行比较
			if(child + 1 < len && arr[child] < arr[child + 1]){
				child += 1;
			}

			//比较当前节点和最大的子节点，小于则进行值交换，交换后将当前节点定位
			//于子节点上
			if(arr[pos] < arr[child]){
				arr[pos] = arr[child];
				state.push(JSON.parse(JSON.stringify(arr)));
				pos = child;
				child = pos * 2 + 1;
			}
			else{
				break;
			}
			arr[pos] = temp;
			state.push(JSON.parse(JSON.stringify(arr)));
		}

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



