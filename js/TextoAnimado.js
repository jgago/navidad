var TextoAnimado=function(tam,fuente,cadena,pos,velocidad,color){
	this.tam=tam;
	this.fuente=fuente;
	this.contador;
	this.velocidad=velocidad;
	this.posicion=pos;
	this.cadenaMensaje=cadena;
	this.color=color;
		
	this.contador=canvas.width;
	
	this.render=function(){
		ctx.font="bold "+this.tam+"px "+this.fuente;
		ctx.fillStyle=this.color;
		ctx.textAlign="left";
		ctx.textBaseline="top";
		ctx.fillText(this.cadenaMensaje,this.contador,this.posicion);
		this.contador=this.contador-this.velocidad;
		if(this.contador<=(-(this.tam*this.cadenaMensaje.length)-this.tam)){
			this.contador=canvas.width;
		}
	}
}