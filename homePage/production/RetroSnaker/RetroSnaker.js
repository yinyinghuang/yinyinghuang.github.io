/********************************************************************
定义事件绑定函数，解决浏览器兼容
********************************************************************/
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
	},
	getKeyCode:function(){
		return event.keyCode?event.keyCode:event.which;
	}	
};
/********************************************************************
定义表格基础格子类，将内阁格子对象化
********************************************************************/
function Node(i,j) {
	this.dom=document.getElementsByTagName('td')[20*i+j];	
	this.row=i;
	this.col=j;
	this.snaker=0;
	this.apple=0;
}
//在某个格子内显示活动格子
Node.prototype.appear = function(cls) {
	temp=document.createElement("div");
	temp.className=cls;
	this.dom.appendChild(temp);
	this[cls]=1;
};
//在某格子中取消显示活动格子
Node.prototype.disappear=function(){
	this.snaker=0;
	this.dom.removeChild(this.dom.firstChild);	
};
//将表格格子存放在下面这个数组内
var nodearr=[];
for(var i=0;i<10;i++){
	nodearr[i]=[];
	for(var j=0;j<20;j++){
		nodearr[i][j]=new Node(i,j);
	}
}
/********************************************************************
定义定义蛇类
********************************************************************/
function Snaker(i,j) {
	this.row=i;
	this.col=j;
	this.directionNum="up";
}
//蛇的创建方法
Snaker.prototype.create=function(){
	nodearr[this.row][this.col].appear("snaker");
};
//蛇取消显示方法
Snaker.prototype.cancel=function(){
	nodearr[this.row][this.col].disappear();	
};
//蛇尾移动到蛇头前进的下一个位置
Snaker.prototype.go=function (node) {
	this.cancel();
	this.row=node.row;
	this.col=node.col;
	this.directionNum=node.directionNum;
	switch (this.directionNum){
		//up
		case "up":			
			this.row--;												
			break;
		//right
		case "right":
			this.col++;						
			break;
		//down
		case "down":
			this.row++;						
			break;
		//left
		case "left":
			this.col--;									
			break;
	}
	nodearr[this.row][this.col].appear("snaker");		
};
/********************************************************************
定义苹果相关操作函数
********************************************************************/
//随机生成苹果
function createApple(){
	var r=Math.floor(10*Math.random());
	var c=Math.floor(20*Math.random());
	while(nodearr[r][c].snaker==1){
		r=Math.floor(10*Math.random());
		c=Math.floor(20*Math.random());
	}
	nodearr[r][c].apple=1;
	nodearr[r][c].appear("apple");
	return nodearr[r][c];
}
//吃掉苹果
function eatApple(i,j) {
	var newNode=new Snaker(i,j);
	nodearr[i][j].disappear();
	nodearr[i][j].apple=0;
	newNode.directionNum=snakerArr[0].directionNum;	
	newNode.create();
	snakerArr.unshift(newNode);	
}
/********************************************************************
定义获取速度函数
********************************************************************/
function getSpeed(value){
	switch(value){
		case "easy":
			return 300;
		case "normal":
			return 100;
		case "crazy":
			return 20;
	}
}
/********************************************************************
定义获取分数函数
********************************************************************/
function setGoal(num){
	document.getElementById('goal').innerHTML=num;
}
/********************************************************************
定义获取结果函数
********************************************************************/
function Result(){
	this.msg=document.getElementById('result');
	this.goal=document.getElementById('final-goal');
	this.mask=document.getElementById('mask');
	this.confirm=document.getElementById('confirm');
	this.alert=function(){
		var w=document.body.clientWidth||document.documentElement.clientWidth;
		var h=document.body.clientHeight||document.documentElement.clientHeight;
		console.log(w);
		console.log(h);
		this.mask.style.width=w+"px";
		this.mask.style.height=h+"px";
		this.goal.innerHTML=goal+"分";
		this.msg.style.display=this.mask.style.display="block";
		this.confirm.focus();
	};
	this.close=function(){
		this.confirm.blur();
		this.msg.style.display=this.mask.style.display="none";
	};
}
/********************************************************************
定义蛇移动方法函数
********************************************************************/
function move() {
	//每执行一次定时器，将snakerArr的最后一个格子移动到第一个格子的下一个位置。	
	timer=setTimeout(function(){
			var dir=snakerArr[0].directionNum,
			cur_r=snakerArr[0].row,
			cur_c=snakerArr[0].col,
			last=snakerArr.length-1;
		switch (dir){
				//up
				case "up":					
					if(cur_r<1||nodearr[cur_r-1][cur_c].snaker==1) {
						result.alert();
						init();
						return false;		
					}else if(nodearr[cur_r-1][cur_c].apple==1){
						cur_r--;
						eatApple(cur_r,cur_c);
						goal+=10;	
						setGoal(goal);							
						apple=createApple();
						if(goal==100){
							speed=speed/2;
						}else if(goal==200){
							speed=speed/2;
						}
					}else{
						Snaker.prototype.go.call(snakerArr[last],snakerArr[0]);
						snakerArr.unshift(snakerArr.pop());	
					}																			
					break;
				//right
				case "right":
					if(cur_c>18||nodearr[cur_r][cur_c+1].snaker==1) {
						result.alert();
						init();						
						return false;				
					}else if(nodearr[cur_r][cur_c+1].apple==1){
						cur_c++;
						eatApple(cur_r,cur_c);
						goal+=10;		
						setGoal(goal);							
						apple=createApple();
						if(goal==100){
							speed=speed/2;
						}else if(goal==200){
							speed=speed/2;
						}
					}else{
						Snaker.prototype.go.call(snakerArr[last],snakerArr[0]);
						snakerArr.unshift(snakerArr.pop());	
					}																						
					break;
				//down
				case "down":					
					if(cur_r>8||nodearr[cur_r+1][cur_c].snaker==1) {
						result.alert();
						init();						
						return false;				
					}else if(nodearr[cur_r+1][cur_c].apple==1){
						cur_r++;
						eatApple(cur_r,cur_c);
						goal+=10;	
						setGoal(goal);								
						apple=createApple();
						if(goal==100){
							speed=speed/2;
						}else if(goal==200){
							speed=speed/2;
						}
					}else{
						Snaker.prototype.go.call(snakerArr[last],snakerArr[0]);
						snakerArr.unshift(snakerArr.pop());	
					}																			
					break;
				//left
				case "left":					
					if(cur_c<1||nodearr[cur_r][cur_c-1].snaker==1) {
						result.alert();
						init();						
						return false;				
					}else if(nodearr[cur_r][cur_c-1].apple==1){
						cur_c--;
						eatApple(cur_r,cur_c);	
						goal+=10;	
						setGoal(goal);						
						apple=createApple();
						if(goal==100){
							speed=speed/2;
						}else if(goal==200){
							speed=speed/2;
						}
					}else{
						Snaker.prototype.go.call(snakerArr[last],snakerArr[0]);
						snakerArr.unshift(snakerArr.pop());	
					}																		
					break;									
			}			
			timer=setTimeout(arguments.callee,speed);
					
	},speed);			
}
/********************************************************************
定义初始化函数
********************************************************************/
function init(){
	clearTimeout(timer);
	result=new Result();	
	goal=0;
	setGoal(goal);
	runflag=0;
	speed=getSpeed(level.value);
	asnaker=new Snaker(9,10);
	asnaker.create("snaker");
	for(var i=0;i<snakerArr.length;i++){
		snakerArr[i].cancel();
	}
	snakerArr=[];
	snakerArr.push(asnaker);	
	if(apple){
		apple.disappear();
	}
	apple=createApple();
}

var asnaker,snakerArr=[],apple,runflag=0,speed,goal,result,timer;
var dir=document.getElementById("dir"),
	play=document.getElementById("play"),
	pause=document.getElementById("pause"),
	reset=document.getElementById("reset"),
	close=document.getElementById('confirm'),
	level=document.getElementById("level");
//初始化
init();
//绑定事件
EventUtil.addEvent(play,"click",function(){
	runflag=1;
	move();
});
EventUtil.addEvent(dir,"click",function(event){
	if(!runflag) return;
	var target=EventUtil.getTarget(event);
	if(target&&target.nodeName=="BUTTON"){
		var sHead=snakerArr[0],
			sNeck=snakerArr[1]||snakerArr[0];
		switch (target.id){
			case "up":
				//若蛇头下一节在蛇头上方，蛇头方向不改变
				if(sHead.row-1!=sNeck.row){
					sHead.directionNum="up";
				}		
				break;
			case "right":
				//若蛇头下一节在蛇头右方，蛇头方向不改变
				if(sHead.col+1!=sNeck.col){
					sHead.directionNum="right";
				}
				break;
			case "down":
				//若蛇头下一节在蛇头下方，蛇头方向不改变
				if(sHead.row+1!=sNeck.row){
					sHead.directionNum="down";
				}
				break;
			case "left":
				//若蛇头下一节在蛇头左方，蛇头方向不改变
				if(sHead.col-1!=sNeck.col){
					sHead.directionNum="left";
				}
				break;
		}
		
	}
});
EventUtil.addEvent(window,"keydown",function(event){
	if(!runflag) return;	
	var keyCode=EventUtil.getKeyCode(event),	
		sHead=snakerArr[0],
		sNeck=snakerArr[1]||snakerArr[0];
	switch (keyCode){
		case 38:
			//若蛇头下一节在蛇头上方，蛇头方向不改变
			if(sHead.row-1!=sNeck.row){
				sHead.directionNum="up";
			}		
			break;
		case 39:
			//若蛇头下一节在蛇头右方，蛇头方向不改变
			if(sHead.col+1!=sNeck.col){
				sHead.directionNum="right";
			}
			break;
		case 40:
			//若蛇头下一节在蛇头下方，蛇头方向不改变
			if(sHead.row+1!=sNeck.row){
				sHead.directionNum="down";
			}
			break;
		case 37:
			//若蛇头下一节在蛇头左方，蛇头方向不改变
			if(sHead.col-1!=sNeck.col){
				sHead.directionNum="left";
			}
			break;
	}	
});
EventUtil.addEvent(pause,"click",function(){
	clearTimeout(timer);
});
EventUtil.addEvent(reset,"click",function(){	
	init();
});
EventUtil.addEvent(close,"click",function(){	
	result.close();
});
EventUtil.addEvent(close,"keydown",function(event){	
	if(EventUtil.getKeyCode(event)==13){
		result.close();
	}
});
EventUtil.addEvent(level,"change",function(){	
	var value=level.value;
	speed=getSpeed(value);
});