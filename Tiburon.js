function Tiburon() {
	//Propiedades
		this.posX;
		this.posY;
		this.rotZ = 0;
		
		this.velocidad = 3;
		this.velocidadInicial = 3;
		
		this.nadando = true;
		this.cazando = false;
		this.descansando = false;
		
		this.tiempocaza = 0;
		this.tiempodescansando = 0;
		
		this.tiempoanimacion = 500;		//Tiempo que tarda en recorrer el spritesheet en ms
		this.sw = 57;					//Ancho del Sprite
		this.sh = 80;					//Altura del Sprite
		this.spriteC = 6;				//Columnas del spritesheet
		this.spriteF = 1;				//Filas del spritesheet
		this.contador = 0;				//Contador usado para cambiar de sprite segun el tiempo de animacion y el frametime
		
	//Metodos
		this.colisionarBordes = function() {
			if(this.posX>lienzo.width){this.posX=lienzo.width; this.rotZ+=Math.PI;}
			if(this.posX<0){this.posX=0; this.rotZ+=Math.PI;}
			if(this.posY>lienzo.height){this.posY=lienzo.height; this.rotZ+=Math.PI;}
			if(this.posY<0){this.posY=0; this.rotZ+=Math.PI;}
		}
		
		this.cambiarAngulo = function() {
			this.rotZ += (Math.random()-0.5)*0.1;
		}
		
		this.nado = function() {
			this.colisionarBordes();
			this.posX += Math.cos(this.rotZ)*this.velocidad;
			this.posY += Math.sin(this.rotZ)*this.velocidad;
		}
		
		this.buscaPez = function() {
			if (peces.length>=1) {
				for (var i=0; i<peces.length; i++) {
					//Buscamos un pez que este al alcance del tiburon
					this.distanciapresa = hallarDistancia(this.posX, this.posY, peces[i].posX, peces[i].posY);
					//Si encuentra un pez, el tiburon lo persigue durante un tiempo
					if (this.distanciapresa < 80) {
						//Fijamos posicion de la presa
						indicepresa = i;
						this.cazando = true;
						this.nadando = false;
					}
				}
			}
		};
		
		//Cuando encuentra pez, lo persigue durante un tiempo; aumenta la velocidad
		this.cazarPez = function () {
			this.velocidad =  2 * this.velocidadInicial;
			presax = peces[indicepresa].posX;
			presay = peces[indicepresa].posY;
			this.rotZ = hallarAngulo(this.posX, this.posY, presax, presay);
			this.tiempocaza ++;
			this.distanciapresa = hallarDistancia(this.posX, this.posY, presax, presay);
			
			//Cuando termina el tiempo de caza vuelve a la normalidad
			if (this.tiempocaza>80) {
				this.velocidad = this.velocidadInicial;
				this.tiempocaza = 0;
				this.descansando = true;
				this.cazando = false;
			}
			
			//El Tiburon se come al pez
			if (this.distanciapresa < 10) {
				peces.splice(indicepresa, 1);
				this.velocidad = this.velocidadInicial;
				this.tiempocaza = 0;
				this.descansando = true;
				this.cazando = false;
			}
		}
		
		//Al terminar de cazar el tiburon no persigue ni busca ningun pez durante un tiempo
		this.descansar = function () {
			this.tiempodescansando++;
			if (this.tiempodescansando>150) {
				this.tiempodescansando = 0;
				this.nadando = true;
				this.descansando = false;
			}
		}
		
		this.comportamientoTiburon = function() {
			if(this.nadando) {
				this.cambiarAngulo();
				this.nado();
				this.buscaPez();
			}
			if(this.cazando) {
				this.nado();
				this.cazarPez();
			}
			if(this.descansando) {
				this.cambiarAngulo();
				this.nado();
				this.descansar();
			}
		}
		
		//Hacemos que el tiempo de animacion dependa de la velocidad de forma lineal
		this.animacionVelocidad = function() {
			this.tiempoanimacion = -100*this.velocidad + 800;
		}
		//Pintamos la animacion del tiburon con el spritesheet
		this.animar = function(imagen) {
			contexto.save();
			contexto.translate(this.posX, this.posY);
			contexto.rotate(this.rotZ + Math.PI * 0.5);
			contexto.drawImage(imagen, sx*this.sw,sy*this.sh, this.sw,this.sh, -this.sw/4,-this.sh/4, this.sw*0.7,this.sh*0.7);
			contexto.restore();
			
			this.animacionVelocidad();						//Actualizamos el tiempo de animacion segun velocidad
			this.contador++;
			if (this.contador >= Math.floor(this.tiempoanimacion/(this.spriteC*this.spriteF)*(1/frametime))) {
				sx++;
				this.contador = 0;
				if(sx >= this.spriteC-1){
					sx = 0; 								//Se vuelve a empezar por la izquierda
					sy++;                                	//Bajamos de linea
                    if (sy => this.spriteF-1) {sy = 0;}    //Se vuelve a arriba
				}
			}
		}
}