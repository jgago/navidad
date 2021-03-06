var canvas = null;
var ctx = null;

var matriz;

var inicializar_copo=function(i){
	matriz[i][0]=Math.random()*canvas.width;
	matriz[i][1]=Math.random()*canvas.height/10;
	matriz[i][2]=canvas.height/100+Math.random()*4;
}
	

var Nieve=function(tam){
	canvas  = document.getElementById('canvas');

	// obtiene el contexto
	ctx   = canvas.getContext('2d');
	
	
	// definimos la dimension del canvas. 
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	
	matriz=new Array(tam);
	for(var i=0;i<matriz.length;i++){
		matriz[i]=new Array(3);
		inicializar_copo(i);
	}
	

	this.render=function(){
		for(var i=0;i<matriz.length;i++){
			matriz[i][1]=matriz[i][1]+matriz[i][2];
			ctx.fillRect(matriz[i][0]+Math.random()*canvas.width/100,matriz[i][1],1,2);
			if(matriz[i][1]>=canvas.height/2){
				inicializar_copo(i);
			}
		}
	}
}