var canvas = null;
var ctx = null;
var cargado=0;

var PNJ=function(x,y,d,v,pMin,pMax,sr){
	this.x=x;
	this.y=y;
	this.direccion=d;
	this.velocidad=v;
	this.currentFrame=1;
	this.sprite=null;
	this.pMin=pMin;
	this.pMax=pMax;
	
	this.render = function(){
		if (cargado===1){
			var image_number = "";
			if (this.currentFrame<10) {
				image_number = "0"+this.currentFrame;
			}
			else{
				image_number = ""+this.currentFrame;
			}
			var image_name = "person"+image_number+".png";
			
			var current_image_json=imagenes_data.frames[image_name].frame;
			ctx.drawImage(this.sprite,current_image_json.x, current_image_json.y, current_image_json.w, current_image_json.h,this.x,this.y,current_image_json.w,current_image_json.h);
			
			if(this.direccion===2){
				this.currentFrame=this.direccion;
			}
			else{
				this.currentFrame=(this.currentFrame%3)+this.direccion;
				this.currentFrame++;
				this.desplazar();
			}
		}
	}
	
	this.parar = function(){
		this.direccion=2;
	}
	
	this.mover=function(d,v,pMin,pMax){
		this.direccion=d;
		this.velocidad=v;
		this.pMin=pMin;
		this.pMax=pMax;
	}
	
	this.desplazar=function(){
		if(this.direccion===6){
			this.x=this.x+this.velocidad;
		}
		else{
			this.x=this.x-this.velocidad;
		}
		
		if((this.x>this.pMax)&&(this.direccion===6)){
			this.direccion=3;
		}
		
		if((this.x<this.pMin)&&(this.direccion===3)){
			this.direccion=6;
		}
	}
	
	this.tocado=function(x,y){
		if((x>=this.x)&&(x<=this.x+32)&&(y>=this.y)&&(y<=this.y+32)){
			return 1;
		}else{
			return 0;
		}
	}
	
	canvas  = document.getElementById('canvas');

	// obtiene el contexto
	ctx   = canvas.getContext('2d');
	
	
	// definimos la dimension del canvas. 
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	this.sprite = new Image();
	this.sprite.onload = onImageLoad;
	this.sprite.src = sr
}

var onImageLoad=function(){
	console.log("Imagen cargada.");
	cargado=1;
}

var imagenes_data = {"frames": {
	"person01.png":
	{
		"frame": {"x":0,"y":0,"w":32,"h":32},
		"rotated": false,
		"trimmed": false,
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	"person02.png":
	{
		"frame": {"x":32,"y":0,"w":32,"h":32},
		"rotated": false,
		"trimmed": false,
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	"person03.png":
	{
		"frame": {"x":64,"y":0,"w":32,"h":32},
		"rotated": false,
		"trimmed": false,
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	"person04.png":
	{
		"frame": {"x":0,"y":32,"w":32,"h":32},
		"rotated": false,
		"trimmed": false,
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	"person05.png":
	{
		"frame": {"x":32,"y":32,"w":32,"h":32},
		"rotated": false,
		"trimmed": false,
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	"person06.png":
	{
		"frame": {"x":64,"y":32,"w":32,"h":32},
		"rotated": false,
		"trimmed": false,
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	"person07.png":
	{
		"frame": {"x":0,"y":64,"w":32,"h":32},
		"rotated": false,
		"trimmed": false,
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	"person08.png":
	{
		"frame": {"x":32,"y":64,"w":32,"h":32},
		"rotated": false,
		"trimmed": false,
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	"person09.png":
	{
		"frame": {"x":64,"y":64,"w":32,"h":32},
		"rotated": false,
		"trimmed": false,
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	"person10.png":
	{
		"frame": {"x":0,"y":96,"w":32,"h":32},
		"rotated": false,
		"trimmed": false,
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	"person11.png":
	{
		"frame": {"x":32,"y":96,"w":32,"h":32},
		"rotated": false,
		"trimmed": false,
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	"person12.png":
	{
		"frame": {"x":64,"y":96,"w":32,"h":32},
		"rotated": false,
		"trimmed": false,
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	}},
	"meta": {
		"image": "person-sprite.png",
		"format": "RGBA8888",
		"size": {"w":96,"h":128},
		"scale": "1"
	}
}

window.onload = main;