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
	
	personaje=new PNJ(0,canvas.height/2-20,2,2,0,canvas.width,"imagenes/person-sprite.png");
	personaje2=new PNJ(canvas.width-32,canvas.height/2-20,2,2,0,canvas.width,"imagenes/person-sprite2.png");
	papaNoel=new PNJ(-64,canvas.height/2-10,2,5,-128,canvas.width+128,"imagenes/noel-sprite.png");
	reno=new PNJ(-128,canvas.height/2-10,2,5,-128,canvas.width+128,"imagenes/reno-sprite.png");
	
	arrayNieve=new Nieve(200);
	
	arbol=new Image();
	arbol.src="imagenes/christmas-tree.png";
	
	regalos=new Image();
	regalos.src="imagenes/regalos.png";
	
	regalosAbiertos=new Image();
	regalosAbiertos.src="imagenes/regalos-abiertos.png";
	
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
		
	ctx.drawImage(arbol,canvas.width/2-64,canvas.height/2-118);

	personaje.render();
	personaje2.render();
	papaNoel.render();
	reno.render();
	
	if(estado===2)
	{
		ctx.drawImage(regalos,canvas.width/2-41,canvas.height/2+5);
	}else if(estado>=3){
		ctx.drawImage(regalosAbiertos,canvas.width/2-41,canvas.height/2+5);
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
		if((personaje.tocado(EM.canX,EM.canY)===1) && (personaje.direccion===2)){
			personaje.mover(6,2,0,canvas.width);
		}
		
		if((personaje2.tocado(EM.canX,EM.canY)===1)&&(personaje2.direccion===2)){
			personaje2.mover(3,2,0,canvas.width);
		}
		
		if((estado===1)&&(EM.canX>=canvas.width/2-64)&&(EM.canX<=canvas.width/2+64)&&(EM.canY>=canvas.height/2-118)&&(EM.canY<=canvas.height/2-2)){
			estado=2;
		}
		
		if((estado===2)&&(EM.canX>=canvas.width/2-41)&&(EM.canX<=canvas.width/2+41)&&(EM.canY>=canvas.height/2+5)&&(EM.canY<=canvas.height/2+35)){
			estado=3;
			papaNoel.mover(6,5,-128,canvas.width+128);
			reno.mover(6,5,-128,canvas.width+128);
		}
	}
	
	if((estado===0)&&(personaje.direccion!=2)&&(personaje2.direccion!=2)){
		estado=1;
	}
	
	if(estado>=3){
		parpadeo++;
		parpadeo=parpadeo%10;
	}
}

window.onload = main;