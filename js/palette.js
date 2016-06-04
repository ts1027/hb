
function palette(cobj,canvas,copy){
	this.obj=cobj;
	this.canvas=canvas;
	this.copy=copy;
	this.width=canvas.width;
	this.height=canvas.height;  
	this.lineWidth=1; 
	this.strokeStyle="#000000";  //边框的颜色
	this.fillStyle="#000000";
	this.style=0;   //绘制的类型  0:线条  1：填充  2：都有
	this.type="jiao";
	this.history=[];
	this.op="pen"; 
	this.polynum=5;  //多边形
	this.jiaonum=5;
}

palette.prototype.draw=function(){
	var that=this;
	that.copy.onmousedown=function(e){
		var dx=e.offsetX;
		var dy=e.offsetY;
		that.reset();
		that.copy.onmousemove=function(e){
			var mx=e.offsetX;
			var my=e.offsetY;
			that.obj.clearRect(0,0,that.width,that.height);  //清除画布
			if(that.history.length>0){
				that.obj.putImageData(that.history[that.history.length-1],0,0,0,0,that.width,that.height);
			}
			that[that.type](dx,dy,mx,my);
		}
		document.onmouseup=function(){
			that.copy.onmousemove=null;
			document.onmouseup=null;
			that.history.push(that.obj.getImageData(0,0,that.width,that.height));
		}
	} 
};
//重置函数
palette.prototype.reset=function(){
	this.obj.fillStyle=this.fillStyle;
	this.obj.strokeStyle=this.strokeStyle;
	this.obj.lineWidth=this.lineWidth;
}
//直线
palette.prototype.line=function(x1,y1,x2,y2){
	this.obj.beginPath();
	this.obj.lineTo(x1,y1);
	this.obj.lineTo(x2,y2);
	this.obj.stroke();
	this.obj.closePath();
}
//矩形
palette.prototype.rect=function(x1,y1,x2,y2){
	var w=x2-x1;
	var h=y2-y1;
	this.obj.beginPath();
	this.obj.rect(x1+.5,y1+.5,w,h);    //创建一个矩形
	this.obj.closePath();
	if(this.style==0){
		this.obj.stroke();
	}else if(this.style==1){
		this.obj.fill();
	}else if(this.style==2){
		this.obj.fill();
		this.obj.stroke();
	}
}
//圆
palette.prototype.arc=function(x1,y1,x2,y2){
	//半径  勾股定理
	var r=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	this.obj.beginPath();
	this.obj.arc(x1,y1,r,0,2*Math.PI,false);
	this.obj.closePath();
	if(this.style==0){
		this.obj.stroke();
	}else if(this.style==1){
		this.obj.fill();
	}else if(this.style==2){
		this.obj.fill();
		this.obj.stroke();
	}
}



//多边形
palette.prototype.poly=function(x1,y1,x2,y2){
	var r=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	var b=this.polynum;
	var ag=360/b;
	// var that=this;
	this.obj.beginPath();
	for(var i=0;i<b;i++){
		this.obj.lineTo(x1+Math.cos(i*ag*Math.PI/180)*r,y1+Math.sin(i*ag*Math.PI/180)*r)
	}
	this.obj.closePath();
	if(this.style==0){
		this.obj.stroke();
	}else if(this.style==1){
		this.obj.fill();
	}else if(this.style==2){
		this.obj.fill();
		this.obj.stroke();
	}
}
//多角形
palette.prototype.jiao=function(x1,y1,x2,y2){
	var r=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	var r1=r/2.5;
	var b=this.jiaonum*2;
	var ag=360/b;
	this.obj.beginPath();
	for(var i=0;i<b;i++){
		if(i%2==0){
			this.obj.lineTo(x1+Math.cos(i*ag*Math.PI/180)*r,y1+Math.sin(i*ag*Math.PI/180)*r)
		}else{
			this.obj.lineTo(x1+Math.cos(i*ag*Math.PI/180)*r1,y1+Math.sin(i*ag*Math.PI/180)*r1)
		}
		
	}
	this.obj.closePath();
	if(this.style==0){
		this.obj.stroke();
	}else if(this.style==1){
		this.obj.fill();
	}else if(this.style==2){
		this.obj.fill();
		this.obj.stroke();
	}
}

palette.prototype.pen=function(flag){
		var that=this;
		this.copy.onmousedown=function(e){
			var dx=e.offsetX;
			var dy=e.offsetY;
			//that.reset();
			that.obj.beginPath();
			that.copy.onmousemove=function(e){
				var mx=e.offsetX;
				var my=e.offsetY;
				that.obj.lineTo(mx,my)
				that.obj.stroke();
			}
			document.onmouseup=function(){
				that.obj.closePath();
				that.copy.onmousemove=null;
				document.onmouseup=null;
				that.history.push(that.obj.getImageData(0,0,that.width,that.height));

			}
		} 	
}

palette.prototype.er=function(x1,y1,x2,y2){

}


	