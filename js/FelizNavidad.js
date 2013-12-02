var canvas = null;
var ctx = null;
var personaje=null;
var personaje2=null;
var arrayNieve;
var EM;

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


main = function() {

	canvas  = document.getElementById('canvas');

	// obtiene el contexto
	ctx   = canvas.getContext('2d');
	
	
	// definimos la dimension del canvas. 
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	
	personaje=new PNJ(10,canvas.height/2-32,2,5,10,canvas.width/2-32,"imagenes/person-sprite.png");
	personaje2=new PNJ(canvas.width/2-32,canvas.height/2-32,6,2,canvas.width/2-32,canvas.width-32,"imagenes/person-sprite2.png");
	arrayNieve=new Nieve(200);
	
	EM=new EventManager();
	EM.canvas = canvas;
	EM.addEventsListeners();
	setInterval(hilo_juego,100);
}

var hilo_juego=function(){
	render_juego();
	logica_juego();
}

var render_juego=function(){
	ctx.clearRect(0,0,canvas.width, canvas.height);

	ctx.font="3em Arial";
	ctx.strokeStyle="white";
	ctx.textAlign="center";
	ctx.strokeText("¡FELIZ NAVIDAD "+locationVars('nombre')+"!",canvas.width/2,canvas.height/2);
	
	personaje.render();
	personaje2.render();
	
	ctx.fillStyle="brown";
	ctx.fillRect(canvas.width/10,canvas.height/2-10,100,10);
	
	ctx.fillStyle="white";
	ctx.fillRect(0,canvas.height/2,canvas.width,canvas.height/2);
	
	arrayNieve.render();
}

var logica_juego=function(){
	if(EM.isTouchUp()) {
		console.log("personaje X: "+personaje.x+"; X: "+EM.canX);
		console.log("personaje Y: "+personaje.y+"; Y: "+EM.canY);
		if(personaje.tocado(EM.canX,EM.canY)===1){
			personaje.mover(6,6,10,canvas.width/2);
		}
	}	
}

window.onload = main;