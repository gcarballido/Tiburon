function bucle() {
	contexto.clearRect(0, 0, lienzo.width, lienzo.height);				//Limpiamos pantalla
	contexto.drawImage(fondo, 0, 0, lienzo.width, lienzo.height);									//Dibujamos fondo
	
	//Movemos y pintamos peces
	if (peces.length>=1) {
		for (var i=0; i<peces.length; i++) {
			peces[i].cambiarAngulo();
			peces[i].nado();
			peces[i].dibpez(i);
		}
	}
	
	//Mover el tiburon
	tiburon.comportamientoTiburon();
	//Animacion del Tiburon. Lo pintamos y actualizamos sprite
	tiburon.animar(imgTiburon);
	
	clearTimeout(temporizador);
	temporizador = setTimeout("bucle()", frametime);
}