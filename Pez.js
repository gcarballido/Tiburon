Pez.prototype = new Tiburon();

function Pez() {
	//Propiedades
		
	//Metodos
		//Dibujar Pez
		this.dibpez = function(indice) {
			contexto.fillRect(this.posX, this.posY, 5, 5);
			//contexto.fillText(indice, this.posX, this.posY);
		}
}