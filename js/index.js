$(function(){
	var creatbtn=$(".create")[0];
	var canvasBox=$(".canvas-box")[0];
	var obj,canvas,copy,c;
	creatbtn.onclick=function(){
		var w=800;
		var h=624;
		var str="";
		str+="<canvas width="+w+" height="+h+" id='canvas'></canvas><div class='copy'></div>";
		canvasBox.innerHTML=str;
		canvas=$("canvas")[0];
		obj=canvas.getContext("2d");  //创建一张画布
		copy=document.querySelector(".copy");
		$(copy).css({width:w,height:h})
		c=new palette(obj,canvas,copy);
		c.draw();
		paint();
	};

	function paint(){
		var lineWidth=document.querySelector(".lineWidth input[type=range]");
		lineWidth.onchange=function(){
			c.lineWidth=this.value;
		}
		// xian.onclick=function(){
		// 	c.type="line";	
		// 	c.draw();
		// }
		// ju.onclick=function(){
		// 	c.type="rect";
		// 	c.draw();
		// }
		// yuan.onclick=function(){
		// 	c.type="arc";
		// 	c.draw();
		// }
		// duobian.onclick=function(){
		// 	c.type="poly";
		// 	c.draw();
		// }
		// duojiao.onclick=function(){
		// 	c.type="jiao";
		// 	c.draw();
		// }
		// qian.onclick=function(){
		// 	c.pen();
		// } 	
	    var divs=$(".lineWidth~div");
	    divs.each(function(i,obj){
	    	$(obj).click(function(){
	    		c.type=this.id;
	    		c.draw();
	    		if(c.type=="pen"){
	    			c.pen();
	    		}
	    		//角数
	    		if(c.type=="jiao"){
	    			c.jiaonum=prompt("请输入你想要的角数");
	    			if(c.jiaonum==1){
	    				alert("没有这个值，亲，最小值为2哦");
	    				return;
	    			}
	    		}
	    		//边数
	    		if(c.type=="poly"){
	    			c.polynum=prompt("请输入你想要的边数");
	    			if(c.polynum<3){
	    				alert("没有这个值，亲，最小值为3哦");
	    				return;
	    			}
	    		}
	    		divs.eq().removeClass("hot");
	    		$(this).index().addClass("hot");
	    	})
	    })

		var fillcolor=document.querySelector('.fillcolor input[type=color]');
		var strokecolor=document.querySelector('.strokecolor input[type=color]');
		var fillcheck=document.querySelector('.fillcolor input[type=checkbox]');
		var strokecheck=document.querySelector('.strokecolor input[type=checkbox]');


		//判断  边框还是  填充
		strokecheck.onclick=fillcheck.onclick=function(){
			if(strokecheck.checked == true && fillcheck.checked!=true){
				c.style=0;
			}else if(strokecheck.checked !=true && fillcheck.checked ==true){
				c.style=1;
			}else if(strokecheck.checked==true && fillcheck.checked ==true){
				c.style=2;
			}
		}
		fillcolor.onchange=function(){
			c.fillStyle=this.value;
		}
		strokecolor.onchange=function(){
			c.strokeStyle=this.value;
		}
	}

	//保存
	var save=$(".save");
	save.click(function(){
		window.location.href=canvas.toDataURL("image/png",1).replace("image/png","image/octet-stream; Content-Disposition:attachment; filename=foobar.png");
	})

	//撤销  恢复
	var back=$(".back")[0];
	var go=$(".go")[0];
	back.onclick=function(){
		if (c.history.length==0) {
			// c.go.push(c.history[c.history.length-1]);
			// c.obj.clearRect(0,0,c.width,c.height);
			alert("已经是最后一个了哦.")
			return;
		}else if(c.history.length>1){
			// c.go.push(c.history[c.history.length-1]);
			c.history.pop();
			c.obj.putImageData(c.history[c.history.length-1],0,0);
		}	
	}
	go.onclick=function(){
		if (c.back.length>0) {
			c.obj.putImageData(c.back[c.back.length-1],0,0);
			c.history.push(c.back[c.back.length-1]);
			c.back.pop();
			return;
		};
	}

	//橡皮擦
	var er=$(".er");
	er.click(function(){

	})
})