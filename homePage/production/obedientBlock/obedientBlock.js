//事件绑定函数，解决浏览器兼容
var EventUtil={
	getEvent: function (event) {
		return event?event:window.event;
	},
	getTarget: function (event) {
		return event.target?event.target:event.srcElement;
	},
	addEvent: function (target,type,handler) {
		if(target.addEventListener){
			return target.addEventListener(type,handler,false);
		}else if(target.attachEvent){
			return target.attachEvent("on"+type,handler);
		}else{
			return target["on"+click]=handler;
		}	
	}	
};

//表格基础格子类
//将内阁格子对象化
function Node(i,j) {
	this.dom=document.getElementsByTagName("td")[11*i+j];
	this.row=i;
	this.col=j;
	this.wall=0;
	this.orideg=0;
	
}
//在某个格子内显示活动格子
Node.prototype.appear = function(directionNum,cls) {
	temp=document.createElement("div");
	temp.className=cls;
	temp.style.transform="rotate("+directionNum*90+"deg)";
	this.orideg=directionNum*90;
	this.dom.appendChild(temp);
};

//在某格子中取消显示活动格子
Node.prototype.disappear=function(){
	if(this.dom.hasChildNodes()){
		this.dom.removeChild(this.dom.firstChild);			
	}		
};

//在某个格子将活动格子顺时针旋转
Node.prototype.rotate=function(num){
	this.orideg+=num;
	this.dom.firstChild.style.transform="rotate("+this.orideg+"deg)";
};		

//彩色活动格子类
//定义活动格子;
function ActiveNode(row,col){
	this.row=row;
	this.col=col;	
	this.directionNum=0;
	this.wallArr=[];
}
//活动格子的创建方法
ActiveNode.prototype.create = function() {	
	nodearr[this.row][this.col].appear(0,"active");
};
//活动格子取消显示方法
ActiveNode.prototype.cancel=function(){
	nodearr[this.row][this.col].disappear();	
};
//活动格子向指定方向dir前进一格
ActiveNode.prototype.go=function (dir,movFlag) {
	switch (dir){
		//up
		case 0:
			nodearr[this.row][this.col].disappear();
			this.row--;
			if(movFlag){
				this.directionNum=dir;
			}				
			nodearr[this.row][this.col].appear(this.directionNum,"active");												
			break;
		//right
		case 1:			
			nodearr[this.row][this.col].disappear();
			this.col++;
			if(movFlag){
				this.directionNum=dir;
			}				
			nodearr[this.row][this.col].appear(this.directionNum,"active");						
			break;
		//down
		case 2:			
			nodearr[this.row][this.col].disappear();
			this.row++;
			if(movFlag){
				this.directionNum=dir;
			}				
			nodearr[this.row][this.col].appear(this.directionNum,"active");						
			break;
		//left
		case 3:			
			nodearr[this.row][this.col].disappear();
			this.col--;
			if(movFlag){
				this.directionNum=dir;
			}				
			nodearr[this.row][this.col].appear(this.directionNum,"active");						
			break;
	}	
};
//活动格子修为墙的方法
ActiveNode.prototype.wall =function(){
	var temp;
	switch (this.directionNum){
		//up
		case 0:
			temp=this.row-1;
			if(temp<1){
				console.log("已到达边界");
				break;
			}else if(nodearr[temp][this.col].wall==1){
				console.log("前方已修筑为墙");
				break;
			}
			nodearr[temp][this.col].appear(this.directionNum,"wall");
			this.wallArr.push(nodearr[temp][this.col]);
			nodearr[temp][this.col].wall=1;					
			break;
		//right
		case 1:
			temp=this.col+1;
			if(temp>10){
				console.log("已到达边界");
				break;
			}else if(nodearr[this.row][temp].wall==1){
				console.log("前方已修筑为墙");
				break;
			}
			nodearr[this.row][temp].appear(this.directionNum,"wall");
			this.wallArr.push(nodearr[this.row][temp]);
			nodearr[this.row][temp].wall=1;
			break;
		//down
		case 2:
			temp=this.row+1;
			if(this.row>10){
				console.log("已到达边界");
				break;
			}else if(nodearr[temp][this.col].wall==1){
				console.log("前方已修筑为墙");
				break;
			}
			nodearr[temp][this.col].appear(this.directionNum,"wall");
			this.wallArr.push(nodearr[temp][this.col]);
			nodearr[temp][this.col].wall=1;
			break;
		//left
		case 3:
			temp=this.col-1;
			if(temp<1){
				console.log("已到达边界");
				break;
			}else if(nodearr[this.row][temp].wall==1){
				console.log("前方已修筑为墙");
				break;
			}
			nodearr[this.row][temp].appear(this.directionNum,"wall");
			this.wallArr.push(nodearr[this.row][temp]);
			nodearr[this.row][temp].wall=1;
			break;
	}
};
//粉刷墙
ActiveNode.prototype.wallPaint =function(color){
	var temp;
	switch (this.directionNum){
		//up
		case 0:
			temp=this.row-1;
			if(temp<1){
				console.log("已到达边界");
				break;
			}else if(nodearr[temp][this.col].wall==0){
				console.log("前方不是墙");
				break;
			}
			nodearr[temp][this.col].dom.firstChild.style.backgroundColor=color;			
			break;
		//right
		case 1:
			temp=this.col+1;
			if(temp>10){
				console.log("已到达边界");
				break;
			}else if(nodearr[this.row][temp].wall==0){
				console.log("前方不是墙");
				break;
			}
			nodearr[this.row][temp].dom.firstChild.style.backgroundColor=color;
			break;
		//down
		case 2:
			temp=this.row+1;
			if(this.row>10){
				console.log("已到达边界");
				break;
			}else if(nodearr[temp][this.col].wall==0){
				console.log("前方不是墙");
				break;
			}
			nodearr[temp][this.col].dom.firstChild.style.backgroundColor=color;
			break;
		//left
		case 3:
			temp=this.col-1;
			if(temp<1){
				console.log("已到达边界");
				break;
			}else if(nodearr[this.row][temp].wall==0){
				console.log("前方不是墙");
				break;
			}
			nodearr[this.row][temp].dom.firstChild.style.backgroundColor=color;
			break;
	}
};
//活动格子的移动方法
ActiveNode.prototype.move = function(strOp) {
	//如果指令strOp中存在错误指令，退出函数
	for(var i=0;i<strOp.length;i++){	
		if(strOp[i].valid){
			alert("指令错误！\rGO：向蓝色边所面向的方向前进一格\rTUN LEF：向左转\rTUN RIG：向右转\rTUN BAC：向右转\rTRA LEF：向屏幕的左侧移动一格，方向不变\rTRA TOP：向屏幕的上面移动一格，方向不变\rTRA RIG：向屏幕的右侧移动一格，方向不变\rTRA BOT：向屏幕的下面移动一格，方向不变\rMOV LEF：方向转向屏幕左侧，并向屏幕的左侧移动一格\rMOV TOP：方向转向屏幕上面，向屏幕的上面移动一格\rMOV RIG：方向转向屏幕右侧，向屏幕的右侧移动一格\rMOV BOT：方向转向屏幕下面，向屏幕的下面移动一格");
			return false;
		}
	}	
	var the=this,
		steps=[];
	//将指令集strOp分步存入数组step中
	for(var i=0;i<strOp.length;i++){
		if(strOp[i].type.indexOf("bru #")!=-1){
			if(strOp[i].num==""){
				steps.push([strOp[i].type.split("#")[0].trim(),"#"+strOp[i].type.split("#")[1].trim(),i]);
			}else{
				steps.push([strOp[i].type.replace("#","").trim(),"#"+strOp[i].num,i]);
			}
		}else{
			strOp[i].num=parseInt(strOp[i].num)?parseInt(strOp[i].num):1;
			while(strOp[i].num){
				steps.push([strOp[i].type,strOp[i].num,i]);
				strOp[i].num--;			
			}
		}	
				
	}
	//遍历步骤数组step，执行指令	
	var stepsLen=steps.length,
		index=0;
	var timer=setInterval(function () {			
		switch (steps[index][0]){
			case "go":
				switch (the.directionNum){
					//up
					case 0:
						if(the.row-steps[index][1]<1||nodearr[the.row-1][the.col].wall==1) {
							alert("第"+(steps[index][2]+1)+"行出现错误：步数超出范围或前方出现墙");
							clearInterval(timer);
							return false;
						}
						the.go(0,0);								
						break;
					//right
					case 1:			
						if(the.col+steps[index][1]>10||nodearr[the.row][the.col+1].wall==1) {
							alert("第"+(steps[index][2]+1)+"行出现错误：步数超出范围或前方出现墙");
							clearInterval(timer);
							return false;
						}
						the.go(1,0);		
						break;
					//down
					case 2:			
						if(the.row+steps[index][1]>10||nodearr[the.row+1][the.col].wall==1) {
							alert("第"+(steps[index][2]+1)+"行出现错误：步数超出范围或前方出现墙");
							clearInterval(timer);
							return false;
						}
						the.go(2,0);		
						break;
					//left
					case 3:			
						if(the.col-steps[index][1]<1||nodearr[the.row][the.col-1].wall==1) {
							alert("第"+(steps[index][2]+1)+"行出现错误：步数超出范围或前方出现墙");
							clearInterval(timer);
							return false;
						}
						the.go(3,0);		
						break;
				}
				break;

			case "tun lef":
				nodearr[the.row][the.col].rotate(-90);
				the.directionNum=(the.directionNum+3)%4;					
				break;
			case "tun rig":
				nodearr[the.row][the.col].rotate(90);
				the.directionNum=(the.directionNum+1)%4;
				break;
			case "tun bac":
				nodearr[the.row][the.col].rotate(180);
				the.directionNum=(the.directionNum+2)%4;
				break;				
			
			case "tra top":
				if(the.row-steps[index][1]<1||nodearr[the.row-1][the.col].wall==1) {
					alert("第"+(steps[index][2]+1)+"行出现错误：步数超出范围或前方出现墙");
					clearInterval(timer);
					return false;
				}
				the.go(0,0);
				break;				
			case "tra rig":
				if(the.col+steps[index][1]>10||nodearr[the.row][the.col+1].wall==1) {
					alert("第"+(steps[index][2]+1)+"行出现错误：步数超出范围或前方出现墙");
					clearInterval(timer);
					return false;
				}
				the.go(1,0);
				break;				
			case "tra bot":
				if(the.row+steps[index][1]>10||nodearr[the.row+1][the.col].wall==1) {
					alert("第"+(steps[index][2]+1)+"行出现错误：步数超出范围或前方出现墙");
					clearInterval(timer);
					return false;
				}
				the.go(2,0);
				break;				
			case "tra lef":
				if(the.col-steps[index][1]<1||nodearr[the.row][the.col-1].wall==1) {
					alert("第"+(steps[index][2]+1)+"行出现错误：步数超出范围或前方出现墙");
					clearInterval(timer);
					return false;
				}
				the.go(3,0);
				break;

			case "mov top":
				if(the.row-steps[index][1]<1||nodearr[the.row-1][the.col].wall==1) {
					alert("第"+(steps[index][2]+1)+"行出现错误：步数超出范围或前方出现墙");
					clearInterval(timer);
					return false;
				}
				the.go(0,1);
				break;				
			case "mov rig":
				if(the.col+steps[index][1]>10||nodearr[the.row][the.col+1].wall==1) {
					alert("第"+(steps[index][2]+1)+"行出现错误：步数超出范围或前方出现墙");
					clearInterval(timer);
					return false;
				}
				the.go(1,1);
				break;				
			case "mov bot":
				if(the.row+steps[index][1]>10||nodearr[the.row+1][the.col].wall==1) {
					alert("第"+(steps[index][2]+1)+"行出现错误：步数超出范围或前方出现墙");
					clearInterval(timer);
					return false;
				}
				the.go(2,1);
				break;				
			case "mov lef":
				if(the.col-steps[index][1]<1||nodearr[the.row][the.col-1].wall==1) {
					alert("第"+(steps[index][2]+1)+"行出现错误：步数超出范围或前方出现墙");
					clearInterval(timer);
					return false;
				}
				the.go(3,1);
				break;			
			case "build":
				the.wall(the.directionNum);				
				break;
			case "bru":
				the.wallPaint(steps[index][1]);
				break;
		}
		index++;
		if(index>=stepsLen){
			clearInterval(timer);
		}
	},500);	
};

//指令区域
//定义指令区域
function Command() {
	this.orderDom=document.getElementById("order");
	this.cmdList=[];		
}
//清除指令行数
Command.prototype.removeOrder = function() {
	while(this.orderDom.firstChild){
		this.orderDom.removeChild(this.orderDom.firstChild);
	}
};
//验证指令是否正确
Command.prototype.valid=function (cmd) {
	var valid,			
		reCmd=/^(go|tra lef|tra bot|tra rig|tra top|mov lef|mov rig|mov bot|mov top)\s*[0-9]{0,1}$|^(tun lef|tun rig|tun bac|build)|bru \#[0-9a-f]{3,6}$/ig;
	cmd=cmd.trim();
	if(reCmd.test(cmd)||cmd==""){//指令正确
		valid=0;
	}else{//指令错误
		valid=1;
	}
	return valid;
};
//获取指令
Command.prototype.getCmd = function(oriCmd) {
	var cmdList=[];	
	var cmd=oriCmd.split(/[\r\n]/);
	for(var i=0;i<cmd.length;i++){
		cmdList[i]={};		
		cmdList[i].type=cmd[i].replace(/[0-9]/g,"").trim().toLowerCase();
		cmdList[i].num=cmd[i].replace(/[^0-9]/ig,"");
		cmdList[i].valid=this.valid(cmd[i]);
	}
	this.cmdList=cmdList;
};
//渲染指令行数区域
Command.prototype.render = function(oriCmd) {
	this.getCmd(oriCmd);
	for(var i=0;i<this.cmdList.length;i++){
		var temp=document.createElement("div");
		var temp_txt=document.createTextNode(i+1);
		temp.appendChild(temp_txt);
		this.orderDom.appendChild(temp);
		if(this.cmdList[i].valid){
			temp.className="wrong";
		}
	}			
};


//为指令行数区域绑定渲染
//初始化界面
var command=new Command();
var op_type=document.getElementById("op_type");
command.render(op_type.value);
EventUtil.addEvent(op_type,"keyup",function(){
	command.removeOrder();
	var cmd=op_type.value;
	command.render(cmd);		
});
//指令区域发生滚动，指令行数随之滚动
EventUtil.addEvent(op_type,"scroll",function(){
	var scroll_top=op_type.scrollTop,
		order=document.getElementById("order");
	order.style.top=-scroll_top+"px";
});

//将表格格子存放在下面这个数组内
var nodearr=[];
for(var i=0;i<11;i++){
	nodearr[i]=[];
	for(var j=0;j<11;j++){
		nodearr[i][j]=new Node(i,j);
	}
}
//创建活动格子
var activeNode=new ActiveNode(5,5);
activeNode.create();
//为执行按钮绑定事件
var start=document.getElementById("start");
EventUtil.addEvent(start,"click",function () {
	var op_type=document.getElementById("op_type");
	command.getCmd(op_type.value);
	activeNode.move(command.cmdList);
});
//为重置按钮绑定事件
var reset=document.getElementById("reset");
EventUtil.addEvent(reset,"click",function () {
	//重置格子区
	for(var i=0;i<11;i++){
		for(var j=0;j<11;j++){
			if(nodearr[i][j].wall){
				nodearr[i][j].wall=0;
				nodearr[i][j].disappear();
			}			
		}
	}
	activeNode.cancel();
	activeNode=new ActiveNode(5,5);
	activeNode.create();

	//重置指令区
	command.getCmd(op_type.value);
	command.removeOrder();
	op_type.value="";
	command.render(op_type.value);
});
//随进生成一组五颜六色的墙
var buildWall=document.getElementById("build-wall");
EventUtil.addEvent(buildWall,"click",function(){
	
	activeNode.cancel();
	var index=Math.ceil(Math.random()*10),color,awall;
	var axis=Math.round(Math.random())?new ActiveNode(index,1):new ActiveNode(1,index);
	if(Math.round(Math.random())){
		awall=new ActiveNode(index,1);
		awall.directionNum=1;
		while(awall.col<10){
			awall.wall();
			color="#"+Math.round(Math.random()*16777215).toString(16);
			awall.wallPaint(color);
			awall.col++;
		}
		awall.col=2;
		awall.directionNum=3;
		awall.wall();
		color="#"+Math.round(Math.random()*16777215).toString(16);
		awall.wallPaint(color);
	}else{
		awall=new ActiveNode(1,index);
		awall.directionNum=2;
		while(awall.row<10){
			awall.wall();
			color="#"+Math.round(Math.random()*16777215).toString(16);
			awall.wallPaint(color);
			awall.row++;
		}
		awall.row=2;
		awall.directionNum=0;
		awall.wall();
		color="#"+Math.round(Math.random()*16777215).toString(16);
		awall.wallPaint(color);

	}
});

/*//随机生成一组墙
var buildWall=document.getElementById("build-wall");
EventUtil.addEvent(buildWall,"click",function(){
	//生成的墙个数
	var num=Math.floor(6*Math.random());
	//随机生成墙位置，存入数组
	var wallArr=[];
	while(num){		
		var r=Math.ceil(10*Math.random());
		var c=Math.ceil(10*Math.random());
		var d=Math.floor(4*Math.random());
		var awall=new ActiveNode(r,c);
		awall.directionNum=d;
		wallArr.push(awall);
		num--;
	}
	//在格子当中显示墙
	for(var i in wallArr){
		wallArr[i].wall();
	}	
});
*/