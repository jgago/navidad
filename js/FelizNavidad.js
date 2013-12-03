var canvas = null;
var ctx = null;
var personaje=null;
var personaje2=null;
var arrayNieve;
var EM;
var cadenaMensaje;

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

function setFullScreen(){
	var w=window.innerWidth/canvas.width;
	var h=window.innerHeight/canvas.height;
	var scale=Math.min(h,w);

	canvas.style.width=(canvas.width*scale)+'px';
	canvas.style.height=(canvas.height*scale)+'px';
	canvas.style.position='fixed';
	canvas.style.left='50%';
	canvas.style.top='50%';
	canvas.style.marginLeft=-(canvas.width*scale)/2+'px';
	canvas.style.marginTop=-(canvas.height*scale)/2+'px';
}

main = function() {

	canvas  = document.getElementById('canvas');

	// obtiene el contexto
	ctx   = canvas.getContext('2d');
	
	
	// definimos la dimension del canvas. 
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	setFullScreen();
	
	personaje=new PNJ(10,canvas.height/2-32,2,5,10,canvas.width/2-32,"imagenes/person-sprite.png");
	personaje2=new PNJ(canvas.width/2-32,canvas.height/2-32,6,2,canvas.width/2-32,canvas.width-32,"imagenes/person-sprite2.png");
	arrayNieve=new Nieve(200);
	
	EM=new EventManager();
	EM.canvas = canvas;
	EM.addEventsListeners();
	cadenaMensaje="¡FELIZ NAVIDAD "+locationVars('nombre')+"!";
	setInterval(hilo_juego,100);
}

var hilo_juego=function(){
	render_juego();
	logica_juego();
}

var render_juego=function(){
	ctx.clearRect(0,0,canvas.width, canvas.height);
	
	ctx.font="bold 1.5em Calibri";
	ctx.fillStyle="white";
	ctx.textAlign="center";
	ctx.textBaseline="top";
	ctx.fillText(cadenaMensaje,canvas.width/2,0,canvas.width);

	personaje.render();
	personaje2.render();
	
	ctx.fillStyle="white";
	ctx.fillRect(0,canvas.height/2,canvas.width,canvas.height/2);
	
	ctx.font="italic 1em Calibri";
	ctx.fillStyle="green";
	ctx.textAlign="center";
	ctx.textBaseline="bottom";
	ctx.fillText("By J.GAGO",canvas.width/2,canvas.height,canvas.width);
	
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