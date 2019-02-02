// Service worker

//Se verifica que el nagegador pueda usar el serviceWorker
if('serviceWorker' in navigator){
	console.log('Puedes usar los serviceWorker en tu navegador');

	navigator.serviceWorker.register('./sw.js')
						.then(res => console.log('serviceWorker cargado correctamente', res))
						.catch(err => console.log('serviceWorker no se ha podido registrar', err));
}else{
	console.log('NO PUEDES usar los serviceWorker en tu navegador');
}

function setConcepto(objeto, destino) {
	var concepto = objeto.value;

	switch(concepto){
		case '1':
			document.getElementsByName(destino)[0].value = 'FAVORABLE';
			break;
		case '2':
			document.getElementsByName(destino)[0].value = 'FAVORABLE CON REQUERIMIENTOS';
			break;
		case '3':
			document.getElementsByName(destino)[0].value = 'DESFAVORABLE';
			break;
		default:
			document.getElementsByName(destino)[0].value = '';
	}
}

function setMotivo(objeto, destino) {
	var motivo = objeto.value;

	switch(motivo){
		case '01':
			document.getElementsByName(destino)[0].value = 'PROGRAMACIÓN';
			break;
		case '02':
			document.getElementsByName(destino)[0].value = 'SOLICITUD DEL INTERESADO';
			break;
		case '03':
			document.getElementsByName(destino)[0].value = 'ASOCIADA A PQRS';
			break;
		case '04':
			document.getElementsByName(destino)[0].value = 'SOLICITUD OFICIAL';
			break;
		case '05':
			if(destino == 'textoMotivo440'){
				document.getElementsByName(destino)[0].value = 'SEGUIMIENTO A VISITA ANTERIOR';
			}else{
				document.getElementsByName(destino)[0].value = 'EVENTO DE INTERÉS EN SALUD PÚBLICA';
			};
			break;
		case '06':
			document.getElementsByName(destino)[0].value = 'SOLICITUD DE PRÁCTICA DE PRUEBAS/PR';
			break;
		case '09':
			document.getElementsByName(destino)[0].value = 'OTRO';
			break;
		default:
			document.getElementsByName(destino)[0].value = '';
	}
}

var puntajeBloques = [];

function evaluarBloque(evaluacion, puntaje, resultado, indice){
	var evaluaciones = document.getElementsByName(evaluacion);
	var puntos = document.getElementsByName(puntaje);	
	var i = 0;
	var suma = 0;
	
	evaluaciones.forEach( eva => {
		//console.log ((evaluaciones[i].value*puntos[i].innerHTML));
		suma = suma + (eva.value*puntos[i].innerHTML);
		i++;
	})
	
	document.getElementsByName(resultado)[0].value = suma;
	puntajeBloques[indice] = suma;
	//console.log(puntajeBloques);
}


function consolidarPuntaje(con, puntaje){
	var puntajeTotal = 0;
	var concepto = 0;

	for (var i = 0; i < puntajeBloques.length; i++) {
		if(puntajeBloques[i] != null){
			puntajeTotal += puntajeBloques[i];
		}else{
			puntajeTotal += 0;
		}
	};

	if (puntajeTotal >= 90) {
		concepto = 1;
	}else if (puntajeTotal < 90 && puntajeTotal >= 70){
		concepto = 2;
	}else {
		concepto = 3;
	}
	
	//console.log(puntajeTotal);
	document.getElementsByName(con)[0].value = concepto;
	document.getElementsByName(puntaje)[0].value = puntajeTotal;
}

function loginServer(){
	let user = document.getElementsByName('nomUsuario')[0].value;
	let clave = document.getElementsByName('password')[0].value;

	let data = 'nombreUsuario='+user+'&&clave='+clave;

	let identity = {
		usuario: user,
		token: ''
	};
	//console.log(data);
	fetch('https://sisbenpro.com/public/loginVisalud', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: data
	})
	.then( res => {
		res.json()
		.then( jsonRes => {
			if (jsonRes.err != undefined) {
				var identidad = JSON.parse(localStorage.getItem('identity'));
				if (identidad != undefined) {
					var identidad = JSON.parse(localStorage.getItem('identity'));
					fetch('https://sisbenpro.com/public/cerrarSesion/'+identidad.usuario)
					.then( res => res.json() )
					.then( jsonRes => alert('Sesión cerrada por precaución. ' + jsonRes.res) );
					localStorage.removeItem('identity');				
				} else{
					alert('Error: ' + jsonRes.err);
				}
				location.reload();
			}else if (jsonRes.token == 'Usuario ya está loggeado') {
				alert('Este usuario ya está loggeado');
				history.back();
			}else{
				identity.token = jsonRes.token;
				localStorage.setItem('identity', JSON.stringify(identity));
				console.log('respuesta POST', jsonRes);
				console.log(identity);
				history.back();
			}
		});
	})
	.catch( err => alert('Problemas con la conexión a internet', err.json()) );
}

// referencia al canvas y al contexto 2dcanvas
var canvas,ctx;
// variables para seeguir la posición del mouse
// y el status del clic izquierdo
var mouseX, mouseY, mouseDown=0;
// variales para seguir la posicion del dedo o 
// lapicero electrónico sobre la tabla
var touchX, touchY;

//funcion para dibujar un punto en una posicion especifica
function dibujarPunto(ctx,x,y,size){
	// color negro completamente opaco
	//r=0; g=0; b=0; a=255;

	// Estilo de llenado
	ctx.fillStyle = "rgba(0,0,0,1)";

	// Dibujar un circulo lleno
	ctx.beginPath();
	ctx.arc(x, y, size, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
}

// Limpia el contexto del canvas usando las dimensiones del canvas
function limpiarCanvas(canvas,ctx){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function firma_mouseDown(){
	mouseDown = 1;
	dibujarPunto(ctx, mouseX, mouseY, 6); // Hacer pruebas cambiando el 12
}

function firma_mouseUp(){
	mouseDown = 0;
}

function firma_mouseMove(e){
	// Actualización de las coordenadas del mouse cuando se mueve
	getMousePos(e);

	// Dibujar un punto si el botón del mouse está siendo presionado
	if (mouseDown == 1) {
		dibujarPunto(ctx, mouseX, mouseY, 6); // este tamnbien
	}
}

function getMousePos(e){
	if (!e) 
		var e = event;

	if (e.offsetX) {
		mouseX = e.offsetX;
		mouseY = e.offsetY;
	}else if (e.layerX) {
		mouseX = e.layerX;
		mouseY = e.layerY;
	}
}

// Dibujar algo cuando un touch sea detectado
function firma_touchStart(){
	// Actualizar coordenadas
	getTouchPos();

	dibujarPunto(ctx, touchX, touchY, 6);

	// Prevenir un evento mousedown adicional
	event.preventDefault();
}

// Dibujar algo cuando un movimiento de dedo sobre la pantalla sea detectado
function firma_touchMove(e){
	// Actualiza las coordenadas del punto donde se hace contacto touch
	getTouchPos(e);

	// Durante un evento de arrastre sobre el touch, diferente de un movimiento de ratón
	//no see requiere checkear si el touch permanece, ya que siempre habrá contacto con 
	//la pantalla por definición
	dibujarPunto(ctx, touchX, touchY, 6);

	event.preventDefault();
}

function getTouchPos(e){
	if(!e)
		var e = event;

	if (e.touches) {
		if (e.touches.length == 1) {
			var touch = e.touches[0];
			touchX = touch.pageX - touch.target.offsetLeft;
			touchY = touch.pageY - touch.target.offsetTop;
		}
	}
}

function inicio_firma(){
	canvas = document.getElementById('firma');

	if (canvas.getContext) 
		ctx = canvas.getContext('2d');

	if (ctx) {
		canvas.addEventListener('mousedown', firma_mouseDown, false);
		canvas.addEventListener('mousemove', firma_mouseMove, false);
		window.addEventListener('mouseup', firma_mouseUp, false);

		canvas.addEventListener('touchstart', firma_touchStart, false);
		canvas.addEventListener('touchmove', firma_touchMove, false);
	}
}