var cargado=false;

var ElementoEscenario=function(x,y,w,h,sr){
	this.x=x;
	this.y=y;
	this.width=w;
	this.height=h;
	this.sprite=null;
	
	this.render = function(){
		if (cargado){
			ctx.drawImage(this.sprite,this.x,this.y);
		}
	}
	
	this.tocado=function(x,y){
		if((x>=this.x)&&(x<=this.x+this.width)&&(y>=this.y)&&(y<=this.y+this.height)){
			return 1;
		}else{
			return 0;
		}
	}
	
	this.sprite = new Image();
	this.sprite.onload = onImageLoad;
	this.sprite.src = sr
}

var onImageLoad=function(){
	console.log("Imagen cargada.");
	cargado=true;
}