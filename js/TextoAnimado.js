var canvas = null;
var ctx = null;

function locationVars (vr){		
	try{
        var src = String( window.location.href ).split('?')[1];
        var vrs = src.split('&');
 
        for (var x = 0, c = vrs.length; x < c; x++) {
        	if (vrs[x].indexOf(vr) != -1){
        		return decodeURI( vrs[x].split('=')[1] ).toUpperCase();
        		break;
        	}
        }
	}
	catch(err){
		return "A TODOS";
	}
}

var TextoAnimado=function(tam){
	this.tam=tam;
	this.contador;
	this.cadenaMensaje;
	
	canvas  = document.getElementById('canvas');

	// obtiene el contexto
	ctx   = canvas.getContext('2d');
	
	
	// definimos la dimension del canvas. 
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	
	this.cadenaMensaje="¡FELIZ NAVIDAD "+locationVars('nombre')+"!";
	this.contador=canvas.width;
	
	this.render=function(){
		ctx.font="bold "+this.tam+"px Calibri";
		ctx.fillStyle="white";
		ctx.textAlign="left";
		ctx.textBaseline="top";
		ctx.fillText(this.cadenaMensaje,this.contador,0);
		this.contador--;
		if(this.contador===(-(this.tam*this.cadenaMensaje.length)-this.tam)){
			this.contador=canvas.width;
		}
	}
}