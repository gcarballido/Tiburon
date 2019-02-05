var lienzo = document.getElementById("lienzo");
var contexto = lienzo.getContext("2d");


//Declaramos unas funciones de utilidad
//Ecuacion para hallar el angulo entre dos puntos
function hallarAngulo(xOrigen, yOrigen, xObjetivo, yObjetivo) {
    return Math.atan2(yObjetivo - yOrigen, xObjetivo - xOrigen);
}

//Calcular la distancia
function hallarDistancia(xOrigen, yOrigen, xObjetivo, yObjetivo) {
	return Math.sqrt(Math.pow(xOrigen-xObjetivo, 2) + Math.pow(yOrigen-yObjetivo, 2))
}


//Cargar Fondo Pantalla
var fondo = new Image();
fondo.src = "img/fondo.jpg";


//TIBURON
//Cargar Sprite del tiburon
var imgTiburon = new Image();
imgTiburon.src = "img/SStiburon.png";

//Declaramos un tiburon
var tiburon = new Tiburon();

//Iniciamos Conteo del SpriteSheet del Tiburon
var sx = 0;
var sy = 0;

//var numpeces = 2;
var frametime = 33;

//Declaramos Peces
var peces = [];
var indicepresa;
var clickX;
var clickY;

var temporizador;

inicio();