function inicio() {
	//Damos valores iniciales al tiburon
	tiburon.posX = 256;
	tiburon.posY = 256;
	tiburon.rotZ = Math.random()*2*Math.PI;
	
	/*
	//Creamos peces
	for (var i=0; i<numpeces; i++) {
		peces[i] = new Pez();
		peces[i].posX = Math.random()*lienzo.width;
		peces[i].posY = Math.random()*lienzo.height;
		peces[i].velocidad = 10;
		peces[i].rotZ = 0;
	}
	*/
	
	//Donde Clicko aparece un pez
	$("canvas").click(function(event) {
		// Se corrige la posicion del canvas lienzo
		var rect = lienzo.getBoundingClientRect();
		clickX = event.pageX - rect.left;
		clickY = event.pageY - rect.top;
		//Creamos pez
		peces[peces.length] = new Pez();
		peces[peces.length-1].posX = clickX;
		peces[peces.length-1].posY = clickY;
		peces[peces.length-1].velocidad = 5;
		peces[peces.length-1].rotZ = 0;
	});
	
	
	temporizador = setTimeout("bucle()", 1000)
}