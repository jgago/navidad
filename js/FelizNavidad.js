var canvas = null;
var ctx = null;
var personaje=null;
var personaje2=null;
var arbol=null;
var arrayNieve;
var EM;
var mensaje;


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
	
	personaje=new PNJ(0,canvas.height/2-32,2,2,0,canvas.width,"imagenes/person-sprite.png");
	personaje2=new PNJ(canvas.width-32,canvas.height/2-32,2,2,0,canvas.width,"imagenes/person-sprite2.png");
	arrayNieve=new Nieve(200);
	arbol=new Image();
	arbol.src="imagenes/christmas-tree.png";
	
	EM=new EventManager();
	EM.canvas = canvas;
	EM.addEventsListeners();
	mensaje=new TextoAnimado(40);
	setInterval(hilo_juego,100);
}

var hilo_juego=function(){
	render_juego();
	logica_juego();
}

var render_juego=function(){
	ctx.clearRect(0,0,canvas.width, canvas.height);
	
	mensaje.render();
	
	ctx.fillStyle="white";
	ctx.fillRect(0,canvas.height/2,canvas.width,canvas.height/2);
	
	personaje.render();
	personaje2.render();
	
	ctx.drawImage(arbol,canvas.width/2-64,canvas.height/2-118);
			
	ctx.font="italic 1em Calibri";
	ctx.fillStyle="green";
	ctx.textAlign="center";
	ctx.textBaseline="bottom";
	ctx.fillText("By J.GAGO",canvas.width/2,canvas.height,canvas.width);
	
	arrayNieve.render();
}

var logica_juego=function(){
	if(EM.isTouchUp()) {
		if(personaje.tocado(EM.canX,EM.canY)===1){
			if(personaje.direccion===2){
				personaje.mover(6,2,0,canvas.width);
			}else{
				personaje.parar();
			}
		}
		
		if(personaje2.tocado(EM.canX,EM.canY)===1){
			if(personaje2.direccion===2){
				personaje2.mover(3,2,0,canvas.width);
			}else{
				personaje2.parar();
			}
		}
	}	
}

window.onload = main;