var canvas = null;
var ctx = null;
var personaje=null;
var personaje2=null;
var papaNoel=null;
var reno=null;
var arbol=null;
var regalos=null;
var regalosAbiertos=null;
var arrayNieve;
var EM;
var mensaje;
var estado;
var parpadeo;
var recargado=false;

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
	setFullScreen();
	
	estado=0;
	parpadeo=0;
	
	personaje=new PNJ(0,canvas.height/2-20,32,32,2,2,0,canvas.width,"imagenes/person-sprite.png");
	personaje2=new PNJ(canvas.width-32,canvas.height/2-20,32,32,2,2,0,canvas.width,"imagenes/person-sprite2.png");
	papaNoel=new PNJ(-64,canvas.height/2-10,32,32,2,5,-128,canvas.width+128,"imagenes/noel-sprite.png");
	reno=new PNJ(-128,canvas.height/2-10,32,32,2,5,-128,canvas.width+128,"imagenes/reno-sprite.png");
	
	arrayNieve=new Nieve(200);
	
	arbol=new ElementoEscenario(canvas.width/2-64,canvas.height/2-118,128,128,"imagenes/christmas-tree.png");
	
	regalos=new ElementoEscenario(canvas.width/2-41,canvas.height/2+5,82,30,"imagenes/regalos.png");
	regalosAbiertos=new ElementoEscenario(canvas.width/2-41,canvas.height/2+5,82,30,"imagenes/regalos-abiertos.png");
	
	EM=new EventManager();
	EM.canvas = canvas;
	EM.addEventsListeners();
	mensaje=new TextoAnimado(40,"Arial","¡FELIZ NAVIDAD "+locationVars('nombre')+"!",0,3,"white");
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
		
	arbol.render();

	personaje.render();
	personaje2.render();
	papaNoel.render();
	reno.render();
	
	if(estado===2)
	{
		regalos.render();
	}else if(estado>=3){
		regalosAbiertos.render();
		ctx.font="bold 10px Arial";
		if(parpadeo>=5){
			ctx.fillStyle="magenta";
		}else{
			ctx.fillStyle="red";
		}
		ctx.textAlign="center";
		ctx.textBaseline="bottom";
		ctx.fillText("¡FELICIDADES "+locationVars('nombre')+"!",canvas.width/2,3*canvas.height/4,canvas.width);
	}
	
	ctx.font="italic 20px Arial";
	ctx.fillStyle="green";
	ctx.textAlign="center";
	ctx.textBaseline="bottom";
	ctx.fillText("By J.GAGO",canvas.width/2,canvas.height,canvas.width);
	
	arrayNieve.render();
}

var logica_juego=function(){
	if(EM.isTouchUp()) {
		if((personaje.tocado(EM.canX,EM.canY)) && (personaje.estaParado())){
			personaje.mover(6,2,0,canvas.width);
		}
		
		if((personaje2.tocado(EM.canX,EM.canY))&&(personaje2.estaParado())){
			personaje2.mover(3,2,0,canvas.width);
		}
		
		if((estado===1)&&(arbol.tocado(EM.canX,EM.canY))){
			estado=2;
		}else{	
			if((estado===2)&&(regalos.tocado(EM.canX,EM.canY))){
				estado=3;
				papaNoel.mover(6,5,-128,canvas.width+128);
				reno.mover(6,5,-128,canvas.width+128);
			}
		}
	}
	
	if((estado===0)&&(!personaje.estaParado())&&(!personaje2.estaParado())){
		estado=1;
	}
	
	if(estado>=3){
		parpadeo++;
		parpadeo=parpadeo%10;
	}
	
	if(((canvas.width!=window.innerWidth)||(canvas.height!=window.innerHeight))&&(!recargado)){
		recargado=true;
		location.reload(true);
	}
}

window.onload = main;