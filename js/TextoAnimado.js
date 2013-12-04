var canvas = null;
var ctx = null;

var TextoAnimado=function(tam,fuente,cadena,pos,velocidad){
	this.tam=tam;
	this.fuente=fuente;
	this.contador;
	this.velocidad=velocidad;
	this.posicion=pos;
	this.cadenaMensaje=cadena;
	
	canvas  = document.getElementById('canvas');

	// obtiene el contexto
	ctx   = canvas.getContext('2d');
	
	
	// definimos la dimension del canvas. 
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	
	this.contador=canvas.width;
	
	this.render=function(){
		ctx.font="bold "+this.tam+"px "+this.fuente;
		ctx.fillStyle="white";
		ctx.textAlign="left";
		ctx.textBaseline="top";
		ctx.fillText(this.cadenaMensaje,this.contador,this.posicion);
		this.contador=this.contador-this.velocidad;
		if(this.contador<=(-(this.tam*this.cadenaMensaje.length)-this.tam)){
			this.contador=canvas.width;
		}
	}
}