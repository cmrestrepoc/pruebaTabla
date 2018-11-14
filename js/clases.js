
function crearFunciones(){

	var arr = [];
	var numero = 1;

	for( var numero = 1; numero <= 5; numero++ ){
		arr.push(
			function(){
				console.log(numero);
			}
		);
	}

	return arr;
}

//Imprime en la consola 5 veces el numero 6
var funciones = crearFunciones();
funciones[0]();
funciones[1]();
funciones[2]();
funciones[3]();
funciones[4]();


function crearFuncionesConContexto(){
	var arr = [];
	var numero = 1;

	for( var numero = 1; numero <= 5; numero++ ){
		arr.push( 
			(function (numero){
				return function(){
					console.log(numero);
				}	
			}) (numero)
		);
	}

	return arr;
}

//Imprime en la consola los números del 1 al 5
funciones = crearFuncionesConContexto();
funciones[0]();
funciones[1]();
funciones[2]();
funciones[3]();
funciones[4]();
