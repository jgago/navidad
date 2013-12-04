'use strict';

var TextoAnimado=function(tam,fuente,cadena,pos,velocidad,color){
	var contador=canvas.width;
	this.tam=tam;
	this.fuente=fuente;
	this.velocidad=velocidad;
	this.posicion=pos;
	this.cadenaMensaje=cadena;
	this.color=color;
	
	this.render=function(){
		ctx.font="bold "+this.tam+"px "+this.fuente;
		ctx.fillStyle=this.color;
		ctx.textAlign="left";
		ctx.textBaseline="top";
		ctx.fillText(this.cadenaMensaje,contador,this.posicion);
		contador=contador-this.velocidad;
		if(contador<=(-(this.tam*this.cadenaMensaje.length)-this.tam)){
			contador=canvas.width;
		}
	}
}