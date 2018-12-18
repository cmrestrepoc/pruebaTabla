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
			document.getElementsByName(destino)[0].value = 'Aceptable';
			break;
		case '2':
			document.getElementsByName(destino)[0].value = 'Aceptable con requerimientos';
			break;
		case '3':
			document.getElementsByName(destino)[0].value = 'Desfavorable';
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
		suma = suma + (evaluaciones[i].value*puntos[i].innerHTML);
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