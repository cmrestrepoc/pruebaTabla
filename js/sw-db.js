var db493 = new PouchDB('inscritosCargados493');
var dbNuevos493 = new PouchDB('inscritosNuevos493');
var db569 = new PouchDB('inscritosCargados569');
var dbNuevos569 = new PouchDB('inscritosNuevos569');
var db444 = new PouchDB('inscritosCargados444');
var dbNuevos444 = new PouchDB('inscritosNuevos444');
var db682 = new PouchDB('inscritosCargados682');
var dbNuevos682 = new PouchDB('inscritosNuevos682');

var db440 = new PouchDB('evaluaciones440');
var db474 = new PouchDB('evaluaciones474');
var db479 = new PouchDB('evaluaciones479');
var db480 = new PouchDB('evaluaciones480');
var db495 = new PouchDB('evaluaciones495');
var db478 = new PouchDB('evaluaciones478');
var db475 = new PouchDB('evaluaciones475');
var db481 = new PouchDB('evaluaciones481');
var db442 = new PouchDB('evaluaciones442');
var db443 = new PouchDB('evaluaciones443');
var db596 = new PouchDB('evaluaciones596');
var db333 = new PouchDB('evaluaciones333');
var db243 = new PouchDB('evaluaciones243');
var db245 = new PouchDB('evaluaciones245');
var db26 = new PouchDB('evaluaciones26');
var db441 = new PouchDB('evaluaciones441');
var db472 = new PouchDB('evaluaciones472');

dbNuevos493.changes({
	since: 'now',
	live: true
}).on('change', function(changes){
	mostrarInscritos493('493');
});

dbNuevos569.changes({
	since: 'now',
	live: true
}).on('change', function(changes){
	mostrarInscritos569('569');
});

dbNuevos444.changes({
	since: 'now',
	live: true
}).on('change', function(changes){
	mostrarInscritos444('444');
});

dbNuevos682.changes({
	since: 'now',
	live: true
}).on('change', function(changes){
	mostrarInscritos682('682');
});

const BASE_URL = 'https://sisbenpro.com/public/';

function verificarSesionLocal(){
	let estado = localStorage.getItem('estado');
	if (estado == 'false') {
		console.log(estado);
		window.location.replace("index.html");
	}else{
		console.log("Problemas con el if");
	}
}

verificarSesionLocal();

function dbActasForm(formulario){
	let db;
	switch(formulario){
		case '440':
			db = db440;
			break;
		case '474':
			db = db474;
			break;
		case '479':
			db = db479;
			break;
		case '480':
			db = db480;
			break;
		case '495':
			db = db495;
			break;
		case '478':
			db = db478;
			break;
		case '475':
			db = db475;
			break;
		case '481':
			db = db481; 
			break;
		case '442':
			db = db442;
			break;
		case '443':
			db = db443;
			break;
		case '596':
			db = db596;
			break;
		case '333':
			db = db333;
			break;
		case '243':
			db = db243;
			break;
		case '245':
			db = db245;
			break;
		case '26':
			db = db26;
			break
		case '441':
			db = db441;
			break;
		case '472':
			db = db472;
			break;
	}
	return db;
}

function calcularFecha(){
	let fecha = new Date();
	console.log(fecha.getFullYear());
	let mes = fecha.getMonth() + 1;
	let cadenaMes = mes < 10 ? '0' + mes : mes;
	let cadenaDia = fecha.getUTCDate() < 10 ? '0' + fecha.getUTCDate() : fecha.getUTCDate();
	
	return {
		dia: cadenaDia,
		mes: cadenaMes,
		anio: fecha.getFullYear()
	};
}

function cargarInicio(formulario){
	let fecha = calcularFecha();
	let cadenaFecha = fecha.anio + '-' + fecha.mes + '-' + fecha.dia;
	console.log(cadenaFecha);
	document.getElementsByName('fecha' + formulario)[0].value = cadenaFecha;

	let db = dbActasForm(formulario);

	if(localStorage.getItem('evaluado') && (localStorage.getItem('firmaAut1') || localStorage.getItem('firmaAut2') || localStorage.getItem('firmaIns1') || localStorage.getItem('firmaIns2'))){
		let eva = JSON.parse(localStorage.getItem('evaluado'));
		eva.FIRMA_E1 = localStorage.getItem('firmaIns1');
		eva.FIRMA_E2 = formulario != '443' ? localStorage.getItem('firmaIns2'): null;
		eva.FIRMA_F1 = localStorage.getItem('firmaAut1');
		eva.FIRMA_F2 = formulario != '443' ? localStorage.getItem('firmaAut2'): null;
		
		persistirEvaluado(db, eva);
		
		localStorage.removeItem('evaluado');
		localStorage.removeItem('firmaAut1');
		localStorage.removeItem('firmaAut2');
		localStorage.removeItem('firmaIns1');
		localStorage.removeItem('firmaIns2');
	}
}

function calcularActaInscripcion(formulario, db){
	let usuario = JSON.parse(localStorage.getItem('usuario'))
	document.getElementsByName(`recibe${formulario}`)[0].value = usuario.nombre;
	document.getElementsByName(`idRecibe${formulario}`)[0].value = usuario.cedula;
	let codUsuario = JSON.parse(localStorage.getItem('codigoUsuario'));
	console.log('usuario', codUsuario);
	return db.info().then( result => {
		var ultimo = result.doc_count!=0 ? result.doc_count + 1: result.doc_count = 1;
		let indice = calcularIndice(ultimo);
		let fecha = calcularFecha();
		let year = fecha.anio.toString()
		let cadenaFecha = fecha.dia.toString() + fecha.mes.toString() + year.substring(2, 4);
		//console.log(indice);
		let acta = formulario + codUsuario + cadenaFecha + indice;
		console.log(acta);
		return acta;
	});
}

function cargarInicioInscripciones(formulario){
	agregarValidacionTextInputs(formulario);
	let db;
	let dbNuevos;
	switch(formulario){
		case '493':
			db = db493;
			dbNuevos = dbNuevos493;
			break;
		case '569':
			db = db569;
			dbNuevos = dbNuevos569;
			break;
		case '444':
			db = db444;
			dbNuevos = dbNuevos444;
			break;
		case '682':
			db = db682;
			dbNuevos = dbNuevos682;
			break;
	}
	calcularActaInscripcion(formulario, dbNuevos).then( acta => { 
		console.log("Valor de acta recibido ", acta);
		let event = new Event('input');
		let objetoActa = document.getElementsByName('acta' + formulario)[0];
		objetoActa.value = acta;
		objetoActa.dispatchEvent(event);
	});
	if(localStorage.getItem('inscrito') && (localStorage.getItem('firmaAutoridad') || localStorage.getItem('firmaInscribe')) )
	{
		let ins = JSON.parse(localStorage.getItem('inscrito'));
		ins.FIRMA_F1 = localStorage.getItem('firmaAutoridad');
		ins.FIRMA_E1 = localStorage.getItem('firmaInscribe');

		/* calcularActaInscripcion(formulario, dbNuevos).then( acta => {
			ins.ACTA = acta;
		}); */
		persistirInscrito(dbNuevos, ins, 0);
		localStorage.removeItem('inscrito');
		localStorage.removeItem('firmaAutoridad');
		localStorage.removeItem('firmaInscribe');
	}
}

/* Desde aqui arranca funcionalidad relacionada con validaciones */

function ponerLabelError(element, mensaje){
	element.style.borderColor = "red";
	if(!document.getElementById(element.name)){
		let etiqueta = document.createElement('Label');
		let parent = element.parentNode;
		etiqueta.style.color = 'red';
		etiqueta.style.fontSize = '10px';
		etiqueta.setAttribute('id', element.name);
		etiqueta.innerHTML = mensaje;
		console.log(etiqueta);
		parent.insertBefore(etiqueta, element);
	}
}

function ponerLabelOk(element){
	let label = document.getElementById(element.name);
	if(label){
		label.parentNode.removeChild(label);
	}
	//element.style.removeProperty('borderColor');
	element.style.borderColor = "green";
}

function validarHallazgos(element, key){
	/* Se debe hacer parseInt sobre key, ya que no viene como entero... si no se hace, al sumar se concatena 
	como una cadena de caracteres. */
	let cadena = element[key].name.split('_');
	let hallazgo = document.getElementsByName('hallazgos_' + cadena[1] + '_' + (parseInt(key, 10) + 1));
	console.log("Contenido hallazgo: ", hallazgo[0].value);
	if(!hallazgo[0].value && element[key].value != 1){
		ponerLabelError(hallazgo[0], "Si el puntaje es diferente de 1, debe incluir al menos un hallazgo");
	}else{
		ponerLabelOk(hallazgo[0]);
	}
}

function validarLongitudInput(elemento, longitud, mensaje){
	console.log("Valor input: ", elemento.value);
	console.log("Longitud input: ", elemento.value.length);
	if(elemento.value.length > longitud){
		ponerLabelError(elemento, mensaje);
	}else{
		ponerLabelOk(elemento);
	}
}

function agregarValidacionTextInputs(formulario){
	/* El campo noloca tambien es de longitud maxima 50, pero no se incluye porque se escoge de un dropdown list */
	let nombresInput = "input[name='propietario" + formulario + "'], input[name='repLegal" + formulario + "'], "
						+ "input[name='persona" + formulario + "-1'], input[name='persona" + formulario + "-2'], "
						+ "input[name='funcionario" + formulario + "-1'], input[name='funcionario" + formulario + "-2'], "
						+ "input[name='dirNotif" + formulario + "'], input[name='direccion" + formulario + "'], "
						+ "input[name='cual569'] ";
	let nombres = document.querySelectorAll(nombresInput);
	nombres.forEach(element => {
		// El evento input captura los cambios de texto dentro de un elemento input
		element.addEventListener('input', validarLongitudInput.bind(this, element, 50, 
								"No puede escribir más de 50 caracteres en este campo"));
	});

	/* validación de campo inscripción */
	/* Ejemplo de uso de var vs let... en este caso, si se pone let, longitud no es reconocida dentro del forEach*/
	var longitud = formulario != '444' ? 15 : 11; 
	let inputInscripcion = "input[name='inscripcion" + formulario  + "']";
	let objetosInscripcion = document.querySelectorAll(inputInscripcion);
	objetosInscripcion.forEach( elemento => {
		elemento.addEventListener('input', validarLongitudInput.bind(this, elemento, longitud,
			"No puede escribir más de " + longitud + " caracteres en este campo"));
	});

	/* correo, horarios, objeto */
	let medianosInput = "input[name='correoProp" + formulario + "'], input[name='horarios" + formulario + "'], "
						+ "input[name='objeto" + formulario + "']";
	let medianos = document.querySelectorAll(medianosInput);
	medianos.forEach(element => {
		element.addEventListener('input', validarLongitudInput.bind(this, element, 70,
								"No puede escribir más de 70 caracteres en este campo"));
	});

	/* placas */
	let placasInput = "input[name='placa" + formulario + "'], input[name='placaRemolque" + formulario + "'], "
						+ "input[name='placaSrmque" + formulario + "']";
	let placas = document.querySelectorAll(placasInput);
	placas.forEach(element => {
		element.addEventListener('input', validarLongitudInput.bind(this, element, 6,
								"No debe escribir más de 6 caracteres en este campo. Introduzca la placa sin espacio"));
	});

	/* Validación campo Acta */
	longitud = formulario === '26' ? 14 : 15;
	let inputActa = "input[name='acta" + formulario  + "']";
	let objetosActa = document.querySelectorAll(inputActa);
	objetosActa.forEach( elemento => {
		elemento.addEventListener('input', validarLongitudInput.bind(this, elemento, longitud, 
								"No puede escribir más de " + longitud + " caracteres en este campo"));
	});

	/* numeroActa para muestras, cargos, matriculaMercantil, otrasEspecies440, otro472 */
	let cortosInput = "input[name='numeroActa" + formulario + "'], input[name='matriculaMercantil" + formulario + "'], "
						+ "input[name='otrasEspecies" + formulario + "'], input[name='otro" + formulario + "'], "
						+ "input[name='cargoFuncionario" + formulario + "-1'], input[name='cargoFuncionario" + formulario + "-2'], "
						+ "input[name='cargoPersona" + formulario + "-1'], input[name='cargoPersona" + formulario + "-2'] ";
	let cortos = document.querySelectorAll(cortosInput);
	cortos.forEach(element => {
		element.addEventListener('input', validarLongitudInput.bind(this, element, 30, 
								"No puede escribir más de 30 caracteres en este campo"));
	});

	/* validaciones en razón social y nombre comercial */
	let nombresComercialesInput = "input[name='razonSocial" + formulario + "'], input[name='nombreComercial" + formulario + "'] ";
	let nombresComerciales = document.querySelectorAll(nombresComercialesInput);
	nombresComerciales.forEach(element => {
		element.addEventListener('input', validarLongitudInput.bind(this, element, 100, 
								"No puede escribir más de 100 caracteres en este campo"))
	});

	/* validaciones para numeros de identificación (cedulas) */
	let cedulasInput = "input[name='idPropietario" + formulario + "'], input[name='idRepLegal" + formulario + "'], "
						+ "input[name='idFuncionario" + formulario + "-1']," + "input[name='idFuncionario" + formulario + "-2'],"
						+ "input[name='idPersona" + formulario + "-1']," + "input[name='idPersona" + formulario + "-2']";
	let cedulas = document.querySelectorAll(cedulasInput);
	cedulas.forEach(element => {
		element.addEventListener('input', validarLongitudInput.bind(this, element, 12,
								"No puede escribir más de 12 caracteres en este campo"));
	});

	/* validaciones en textAreas */
	let stringHallazgos = '';
	for(let i = 1; i<=6; i++){
		for(let j = 1; j<=6; j++){
			stringHallazgos += "textarea[name='hallazgos_" + i + "_" + j + "'], ";
		}
	}
	let nombresTextAreas = "textarea[name='obAutoridad" + formulario + "'], textarea[name='obPersona" + formulario + "'], "
					 + stringHallazgos + "textarea[name='medida" + formulario + "'] ";
	let textAreas = document.querySelectorAll(nombresTextAreas);
	textAreas.forEach(elemento => {
		elemento.addEventListener('input', validarLongitudInput.bind(this, elemento, 254, 
								"No puede escribir más de 254 caracteres en este campo"));
	});

	/* validaciones en hallazgos cuando hay evaluación negativa */
	let stringEvaluaciones = '';
	let evaluaciones = [];
	for(let i = 1; i<=6; i++){
		stringEvaluaciones = "select[name='evaluacion_" + i + "'] ";
		evaluaciones.push(document.querySelectorAll(stringEvaluaciones));
	}
	evaluaciones.forEach( element => {
		/* Debido a que en la key vienen indices no numericos como length y otros, se verifica con isNaA */ 
		for (let key in element){
			if (!isNaN(key)){
				element[key].addEventListener('change', validarHallazgos.bind(this, element, key));
			}
		}
	});
}

/* La funcionalidad de validaciones termina con el llamado al metodo desde una funcion de arranque en todas las vistas */
function verificarAccionForm(formulario){
	agregarValidacionTextInputs(formulario);
	localStorage.getItem('Accion') == 'cargarServidor' ? cargarServidor(formulario) : console.log('No hay Acción');
}

function verificarAccion(){
	if (localStorage.getItem('Accion')) {
		switch(localStorage.getItem('Accion')){
			case 'cargarInscritos493':
			cargarInscritos('493');
			break;
			case 'cargarInscritos444':
			cargarInscritos('444');
			break;
			case 'cargarInscritos569':
			cargarInscritos('569');
			break;
			case 'cargarInscritos682':
			cargarInscritos('682');
			break;
			case 'cargarTodosLosInscritos':
			cargarTodosLosInscritos();
			break;
			default:
			break;
		}
	}else{
		console.log("No hay acción");
	}
}

function createColumns(arreglo){
	var td = document.createElement('td');
	td.innerHTML = arreglo;
	return td;
}

function calcularIndice(ultimo){
	let indice;
	if(ultimo < 10){
		indice = '000' + String(ultimo);
	}else if (ultimo >= 10 && ultimo < 100){
		indice = '00' + String(ultimo);
	}else if (ultimo >= 100 && ultimo < 1000){
		indice = '0' + String(ultimo);
	}else{
		indice = String(ultimo);
	}
	return indice;		
}

function calcularNumActa(formulario){
	let db = dbActasForm(formulario);
	let codUsuario = JSON.parse(localStorage.getItem('usuario')).indice;
	// let objetoActa = {}
	return db.info().then( result => {
		var ultimo = result.doc_count!=0 ? result.doc_count + 1: result.doc_count = 1;
		let indice = calcularIndice(ultimo);
		let fecha = calcularFecha();
		let year = fecha.anio.toString()
		let cadenaFecha = fecha.dia.toString() + fecha.mes.toString() + year.substring(2, 4);
		//console.log(indice);
		/* objetoActa = {
			indice,
			fecha,
			year,
			cadenaFecha,
			formulario,
			codUsuario
		} */
		let acta = formulario + codUsuario + cadenaFecha + indice;
		console.log(acta);
		// console.log('objetoActa', objetoActa)
		return acta;
	});
}

function escogerInscrito(registro, formulario){
	document.getElementsByName('inscripcion' + formulario)[0].value = registro.N_INSCRIP;
	document.getElementsByName('direccion' + formulario)[0].value = registro.DIRECC;
	document.getElementsByName('correoProp' + formulario)[0].value = registro.CORREO;
	document.getElementsByName('tel' + formulario)[0].value = registro.TELS;
	document.getElementsByName('cel' + formulario)[0].value = registro.CELULAR;
	document.getElementsByName('propietario' + formulario)[0].value = registro.NOMBRE_P;
	document.getElementsByName('idPropietario' + formulario)[0].value = parseInt(registro.DOC_P);
	document.getElementsByName('tipoIdProp' + formulario)[0].value = registro.TID_P;
	document.getElementsByName('autorizaNoti' + formulario)[0].value = registro.AUTORIZA;

	if(formulario == '333' || formulario == '243'){
		document.getElementsByName('nomTerr' + formulario)[0].value = registro.NOLOCA;
		document.getElementsByName('razonSocial' + formulario)[0].value = registro.RSO;
		document.getElementsByName('nit' + formulario)[0].value = parseInt(registro.NIT);
		calcularNumActa(formulario).then( acta => {
			console.log("Valor de acta recibido ", acta);
			let event = new Event('input');
			let objetoActa = document.getElementsByName('acta' + formulario)[0];
			objetoActa.value = acta;
			objetoActa.dispatchEvent(event);
		});
	}else{
		document.getElementsByName('fax' + formulario)[0].value = registro.FAX;
		document.getElementsByName('deptoNotif' + formulario)[0].value = registro.DPTO_NOTI ? 
			registro.DPTO_NOTI : 
			document.getElementsByName('deptoNotif' + formulario)[0].value;
		document.getElementsByName('mpioNotif' + formulario)[0].value = registro.MPIO_NOTI ? 
			registro.MPIO_NOTI : 
			document.getElementsByName('mpioNotif' + formulario)[0].value;
		
		if(formulario == '444' || formulario == '472' || formulario == '441'){
			console.log('Inscritos 444');
			document.getElementsByName('marca' + formulario)[0].value = registro.MARCAV;
			document.getElementsByName('modelo' + formulario)[0].value = registro.MODELOV;
			document.getElementsByName('placa' + formulario)[0].value = registro.PLACA;
			document.getElementsByName('isotermo' + formulario)[0].value = registro.ISOTERMO;
			document.getElementsByName('ufrio' + formulario)[0].value = registro.U_UFRIO;
			document.getElementsByName('producto' + formulario)[0].value = registro.PRODUCTO;
			if (formulario == '444' || formulario == '441') {
				document.getElementsByName('furgon' + formulario)[0].value = registro.FURGON;
				document.getElementsByName('rmque' + formulario)[0].value = registro.REMOLQUE;
				document.getElementsByName('placaRemolque' + formulario)[0].value = registro.PLACAREM;
				document.getElementsByName('srmque' + formulario)[0].value = registro.SEMIREM;
				document.getElementsByName('placaSrmque' + formulario)[0].value = registro.PLACASEMI;	
			}
		}else{ 
			document.getElementsByName('dirNotif' + formulario)[0].value = registro.DIR_NOT;
			document.getElementsByName('nombreComercial' + formulario)[0].value = registro.NOCO;
			document.getElementsByName('razonSocial' + formulario)[0].value = registro.RSO;
			document.getElementsByName('nit' + formulario)[0].value = parseInt(registro.NIT);
			document.getElementsByName('nomTerr' + formulario)[0].value = registro.NOLOCA;
			document.getElementsByName('matriculaMercantil' + formulario)[0].value = registro.MAMER;
	
			if (registro.TERRITORIO != undefined) {
				console.log('Territorio: ', registro.TERRITORIO);
				switch(registro.TERRITORIO[0]){
					case 'barrio':
						$('#barrio').prop('checked', true);
						break;
					case 'corregimiento':
						$('#corregimiento').prop('checked', true);
						break;
					case 'vereda':
						$('#vereda').prop('checked', true);
						break;
					default:
					break;
				}
			}else{
				console.log('Territorio Null');
				$('input:radio[name=territorio'+formulario+']').prop('checked', false);
			}
	
			if (formulario != '442' && formulario != '596'){
				document.getElementsByName('concepto' + formulario)[0].value = registro.CCUV;
				document.getElementsByName('textoConcepto' + formulario)[0].value = registro.CUV;
				document.getElementsByName('fechaUltVisita' + formulario)[0].value = registro.F_UV;
			}
		}
	
		if(formulario == '493' || formulario == '569' || formulario == '444' || formulario == '682'){
			console.log('Debería estar en ' + formulario);
			document.getElementsByName('acta' + formulario)[0].value = registro.ACTA;
			document.getElementsByName('id' + formulario)[0].value = registro._id;
			document.getElementsByName('fecha' + formulario)[0].value = registro.FECHA;
			document.getElementsByName('obAutoridad' + formulario)[0].value = registro.OBSERVA_AU;
			document.getElementsByName('obPersona' + formulario)[0].value = registro.OBSERVA_F1;
			document.getElementsByName('inscribe' + formulario)[0].value = registro.NOMBRE_E1;
			document.getElementsByName('idInscribe' + formulario)[0].value = registro.ID_E1;
			document.getElementsByName('recibe' + formulario)[0].value = registro.NOMBRE_F1;
			document.getElementsByName('idRecibe' + formulario)[0].value = registro.ID_F1;
			if(formulario != '444'){
				document.getElementsByName('funcUltVisita' + formulario)[0].value = registro.DIR_NOT_E;
				document.getElementsByName('visitado' + formulario)[0].value = registro.VISITADO;
			}else{
				document.getElementsByName('inscripcionRep444')[0].value = registro.N_INSCRIP;
				document.getElementsByName('fecha444_2')[0].value = registro.FECHA;
				document.getElementsByName('funcionario444')[0].value = registro.NOMBRE_F1;
			}
		}else{
			// Aquí se puede introducir un método para calcular automáticamente un número de acta
			calcularNumActa(formulario).then( acta => {
				console.log("Valor de acta recibido ", acta);
				let event = new Event('input');
				let objetoActa = document.getElementsByName('acta' + formulario)[0];
				objetoActa.value = acta;
				objetoActa.dispatchEvent(event);
			});

			let sufixFuncionario = formulario == '443' ? '' : '-1';
			let usuario = JSON.parse(localStorage.getItem('usuario'))
			document.getElementsByName(`funcionario${formulario}${sufixFuncionario}`)[0].value = usuario.nombre;
			document.getElementsByName(`idFuncionario${formulario}${sufixFuncionario}`)[0].value = usuario.cedula;
			
			let alerta = document.getElementsByName('alertaInscrito');
			let arreglo = Array.from(alerta); //en este caso alerta es un iterable pero no un arreglo, hay que convertirlo primero
			for ( const item of arreglo) {
				item.style.display = "none";
			};
			document.getElementsByName('entidad' + formulario).value = registro.ENTIDAD;
		}
	
		if (formulario == '493') {
			console.log('Estamos en ' + formulario);
			console.log("registro.actividad", registro.ACTIVIDAD);
			
			formulario != '569' ? document.getElementsByName('zona' + formulario)[0].value = registro.ZONA : null;
			document.getElementsByName('cargoRecibe' + formulario)[0].value = registro.CARGO_F1;
			document.getElementsByName('cargoInscribe' + formulario)[0].value = registro.CARGO_E1;
	
			if (registro.ACTIVIDAD != null){
				if (registro.ACTIVIDAD.length != 0) {
					var actividad = [];
					for (var i = 0; i < document.getElementsByName('actividad' + formulario).length; i++) {
						actividad.push(document.getElementsByName('actividad' + formulario)[i].value);
					}
	
					var mapActividad = new Map();
					var j = 0;
					// El siguiente for busca si la key está en el array, busca por el key. Con forEach 
					//hay que cambiar el orden
					for (let valor in registro.ACTIVIDAD){
						mapActividad.set(registro.ACTIVIDAD[valor].toUpperCase(),valor);
						j++;
					}
					//var mapActividad = new Map(registro.ACTIVIDAD);
					console.log(mapActividad);
					console.log(JSON.stringify(registro.ACTIVIDAD));
	
					$('input:checkbox[name=actividad'+formulario+']').prop('checked', false);
	
					for (var k = 0; k < actividad.length; k++) {
						//console.log(actividad[i]);
						//console.log(mapActividad.has(actividad[i]));
						mapActividad.has(actividad[k]) ? $('input:checkbox[value='+actividad[k]+']').prop('checked', true) : $('input:checkbox[value='+actividad[k]+']').prop('checked', false);			
					};
				}else{
					$('input:checkbox[name=actividad'+formulario+']').prop('checked', false);
				}	
			}else{
				$('input:checkbox[name=actividad'+formulario+']').prop('checked', false);
			}
		}
	
		if (formulario == '569' || formulario == '440') {
			document.getElementsByName('repLegal' + formulario)[0].value = registro.NOMBRE_RL;
			document.getElementsByName('tipoIdRl' + formulario)[0].value = registro.TID_RL;
			document.getElementsByName('idRepLegal' + formulario)[0].value = parseInt(registro.DOC_RL);
		}
	
		if(formulario == '569'){
			document.getElementsByName('dependencia' + formulario)[0].value = registro.DEPENDEN;
			document.getElementsByName('expendio' + formulario)[0].value = registro.EXPENDIO;
			document.getElementsByName('almacena' + formulario)[0].value = registro.ALMACENA;
			document.getElementsByName('deposito' + formulario)[0].value = registro.DEPOSITO;
			document.getElementsByName('despresa' + formulario)[0].value = registro.DESPRESA;
		}
		if(formulario === '682' || formulario === '245'){
			document.getElementsByName('tipoSujeto' + formulario)[0].value = registro.TIPO_SU;
			document.getElementsByName('sujeto' + formulario)[0].value = registro.SUJETO;
		}
		if(formulario === '682'){
			document.getElementsByName('administrador682')[0].value = registro.NOMBRE_AD;
			document.getElementsByName('tipoIdAdministrador682')[0].value = registro.TID_AD;
			document.getElementsByName('idAdministrador682')[0].value = parseInt(registro.DOC_AD);
			document.getElementsByName('codigoInscripcion682')[0].value = registro.T_INSCRIP;
			document.getElementsByName('tipoInscripcion682')[0].value = registro.TIPO_I;
		}

	}
} 

function createRadio(registro, formulario){
	var radio = document.createElement('input');
	radio.type = 'radio';
	radio.setAttribute('name',"seleInscrito");
	radio.value = registro._id;
	radio.addEventListener('click', escogerInscrito.bind(this, registro, formulario));

	var span = document.createElement('span');
	span.className = 'input-group-addon';
	span.appendChild(radio);

	var td = document.createElement('td');
	td.appendChild(span);

	return td;
}

function crearTabla(doc, idBody, idTabla, formulario, formularioActual){
	var tbody = document.getElementById(idBody);
		tbody.innerHTML = '';
		var contador = 0;
		doc.rows.forEach( registro => {
			//console.log(registro.doc._id);
			var extra;
			switch(formulario){
				case '493':
					extra = registro.doc.NOCO;
					break;
				case '569':
					extra = registro.doc.RSO;
					break;
				case '444':
					extra = registro.doc.PLACA === null ? registro.doc.PLACAREM : registro.doc.PLACA;
					break;
				case '682':
					extra = registro.doc.NOCO;
					break;
				default:
			}
			contador++;
			var tr = document.createElement('tr');
			tr.appendChild(createColumns(contador));
			tr.appendChild(createColumns(registro.doc._id));
			tr.appendChild(createColumns(extra));
			tr.appendChild(createColumns(registro.doc.ACTA));
			tr.appendChild(createColumns(registro.doc.FECHA));
			tr.appendChild(createColumns(registro.doc.NOMBRE_P));
			tr.appendChild(createColumns(registro.doc.DOC_P));
			tr.appendChild(createRadio(registro.doc, formularioActual));
			tbody.appendChild(tr);
		});
		$(idTabla).DataTable();
		return tbody;
}

function mostrarInscritos493(formulario){
	db493.allDocs({include_docs: true, descending: true}).then ( doc => {
		crearTabla(doc, 'inscritos', '#tablaInscritos', '493', formulario);
	});

	dbNuevos493.allDocs({include_docs: true, descending: true}).then ( doc => {
		crearTabla(doc, 'inscritosNuevos', '#tablaInscritosNuevos', '493', formulario);
	});
}

function mostrarInscritos569(formulario){
	db569.allDocs({include_docs: true, descending: true}).then ( doc => {
		crearTabla(doc, 'inscritos569', '#tablaInscritos569', '569', formulario);
	});

	dbNuevos569.allDocs({include_docs: true, descending: true}).then ( doc => {
		crearTabla(doc, 'inscritosNuevos569', '#tablaInscritosNuevos569', '569', formulario);
	});
}

function mostrarInscritos444(formulario){
	db444.allDocs({include_docs: true, descending: true}).then ( doc => {
		crearTabla(doc, 'inscritos444', '#tablaInscritos444', '444', formulario);
	});

	dbNuevos444.allDocs({include_docs: true, descending: true}).then ( doc => {
		crearTabla(doc, 'inscritosNuevos444', '#tablaInscritosNuevos444', '444', formulario);
	});
}

function mostrarInscritos682(formulario){
	db682.allDocs({include_docs: true, descending: true}).then ( doc => {
		crearTabla(doc, 'inscritos682', '#tablaInscritos682', '682', formulario);
	});

	dbNuevos682.allDocs({include_docs: true, descending: true}).then ( doc => {
		crearTabla(doc, 'inscritosNuevos682', '#tablaInscritosNuevos682', '682', formulario);
	});
}

/*function eliminarInscritos(){
	db493.destroy().then(resp => console.log);
}*/

function guardarTraidos(formulario, dbBase, respObj, bandera, banderaAlerta){
	let alerta = document.getElementsByName('mensajesServicios')[banderaAlerta];
	alerta.style.display = 'block';
	dbBase.destroy().then( response => {
		console.log('Base de datos anterior eliminada');
		dbBase = new PouchDB('inscritosCargados' + formulario);
		console.log('Nueva base de datos creada');
		
		let count = 0;
		let long = respObj.length;
		
		if(respObj.length > 0){
			respObj.forEach( registro => {
				//console.log('Registro: ',registro);
				let indice  = calcularIndice(registro.id);
				let id = { _id: indice };
							
				if (registro.ACTIVIDAD) {
					registro.ACTIVIDAD = JSON.parse(registro.ACTIVIDAD);	
				}
				
				// Con la siguiente línea se añade la variable _id al objeto			
				registro = Object.assign(id, registro);   
				//console.log('Registro: ',registro);
				dbBase.put(registro, function callback(err, result){
					if (!err) {
						if (count != long - 1) {
							count++;
							alerta.innerHTML = 'Inscritos guardados en base de datos: ' + count;	
						}else{
							alerta.innerHTML = "Registros de " + bandera + " cargados correctamente";
							localStorage.removeItem('Accion');
						}
					}else {
						alerta.innerHTML = 'Problemas guardando inscrito en base de datos' + err;
					}
				});
			});
		}else{
			alerta.innerHTML = 'No hay inscritos de ' + bandera + ' para cargar'
		}
	})
	.catch( () => alerta.innerHTML = 'Esta acción ya fue ejecutada, por favor continue' );	
}

function cerrarSesionServidor(){
	let identidad = JSON.parse(localStorage.getItem('identity'));
	let alerta = document.getElementsByName('mensajesServicios')[1]
	let final = identidad ? identidad.usuario : JSON.parse(localStorage.getItem('usuario')).usuario
	fetch( BASE_URL + 'cerrarSesion/' + final)
	.then( res => res.json() )
	.then( jsonRes => {
		console.log('respuesta del servicio', jsonRes)
		alerta.style.display = 'block'
		alerta.innerHTML = jsonRes.res 
	})
	.catch( err => {
		alerta.style.display = 'block'
		alerta.innerHTML = "Problemas en la respuesta del servidor " + err 
	});
	localStorage.removeItem('identity');	
}

function verificarSesion(){
	var identidad = localStorage.getItem('identity');
	console.log(identidad);
	return identidad != undefined ? true: false;
}

function fetchInscritos(formulario){
	console.log(verificarSesion());
	if (verificarSesion()) {
		var credenciales = JSON.parse(localStorage.getItem('identity'));
		var data = 'nombreUsuario='+credenciales.usuario+'&'
					+'token='+credenciales.token+'&'
					+'formulario='+formulario;
		console.log('Estamos en el formulario: ', formulario);
		
		return new Promise((resolve, reject) => {
			fetch(BASE_URL + 'inscritosVisual', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					//mode: 'no-cors',
					body: data
				})
				.then( res => resolve(res) )
				.catch( err => reject(err) );
			}).then( resp => resp.json() )
			.catch( error=>console.log('error fetch inscritos', error) );
	} else{
		location.assign("./loginserver.html");
	}
}

function dbInscritosFromForm(formulario){
	let db;
	switch(formulario){
		case '493':
			db = db493;
			break;
		case '569':
			db = db569;
			break;
		case '444':
			db = db444;
			break;
		case '682':
			db = db682;
			break;
	}
	return db;
}

//Aquí se usa la función json(), que funciona similar a JSON.parse()
function cargarInscritos(formulario){
	let db = dbInscritosFromForm(formulario);
	let banderaAlerta;
	if(localStorage.getItem('Accion')){
		localStorage.getItem('Accion') == 'cargarInscritos' + formulario ?
			localStorage.removeItem('Accion') :
			!localStorage.getItem('identity') ? 
				localStorage.setItem('Accion', 'cargarInscritos' + formulario) : null;
		banderaAlerta = 0;
	}else{
		!localStorage.getItem('identity') && localStorage.setItem('Accion', 'cargarInscritos' + formulario);
		banderaAlerta = 1;
	}
	let alerta = document.getElementsByName('mensajesServicios')[banderaAlerta];
	//if(!localStorage.getItem('identity')){
		/* localStorage.getItem('Accion') == 'cargarInscritos' + formulario ? 
			localStorage.removeItem('Accion') :
			localStorage.setItem('Accion', 'cargarInscritos' + formulario); */
	//}
	var promesa = fetchInscritos(formulario);
	promesa.then( respObj => {
		if (respObj && respObj.err) {
			alerta.style.display = 'block';
			respObj.err == "ERROR TOKEN" ? 
			alerta.innerHTML = 'Hubo problemas!! Es necesario cerrar Sesión con el servidor y volver a introducir credenciales' :
			// alert('Hubo problemas!! Es necesario cerrar Sesión con el servidor y volver a introducir credenciales') : 
			alerta.innerHTML = 'Error: ' + respObj.err;
			// alert('Error: ' + respObj.err);
		}else{
			let arregloForms = [
				{form: '493', bandera: 'Establecimientos de alimentos'},
				{form: '569', bandera: 'Establecimientos de prod. cárnicos'},
				{form: '444', bandera: 'Vehículos'},
				{form: '682', bandera: 'Establecimientos comerciales'},
			];
			let filtrado = arregloForms.filter(element => element.form == formulario)[0];
			console.log('filtrado', filtrado);
			guardarTraidos(formulario, db, respObj, filtrado.bandera, banderaAlerta);
				//cerrarSesionServidor();
		}		
	}).catch( err => console.log('Error: ', err) );
}

function cargarTodosLosInscritos(){
	let banderaAlerta;
	let alerta = document.getElementsByName('mensajesServicios')[banderaAlerta];
	if(localStorage.getItem('Accion')){
		localStorage.getItem('Accion') == 'cargarTodosLosInscritos' ?
				localStorage.removeItem('Accion') :
				!localStorage.getItem('identity') ? 
					localStorage.setItem('Accion', 'cargarTodosLosInscritos' + formulario) :
					null;
		banderaAlerta = 0;
	}else{
		!localStorage.getItem('identity') && localStorage.setItem('Accion', 'cargarTodosLosInscritos');
		banderaAlerta = 1;
	}
//	if(!localStorage.getItem('identity')){
		/* localStorage.getItem('Accion') == 'cargarTodosLosInscritos' ?
			localStorage.removeItem('Accion') :
			localStorage.setItem('Accion', 'cargarTodosLosInscritos'); */
//	}	
	let promesa = fetchInscritos('493');
	promesa.then( respObj => {
		if (respObj.err != undefined) {
			alerta.style.display = 'block';
			respObj.err == "ERROR TOKEN" ? 
			alerta.innerHTML = 'Hubo problemas!! Es necesario cerrar Sesión con el servidor y volver a introducir credenciales' :
			// alert('Hubo problemas!! Es necesario cerrar Sesión con el servidor y volver a introducir credenciales') : 
			alerta.innerHTML = 'Error: ' + respObj.err;
			// alert('Error: ' + respObj.err);
			return;
		}	
		guardarTraidos('493', db493, respObj, 'Establecimientos de alimentos', banderaAlerta);
		let promesa1 = fetchInscritos('569');
		promesa1.then( respObj1 => {
			guardarTraidos( '569', db569, respObj1, 'Establecimientos Prod Cárnicos', banderaAlerta );
			let promesa2 = fetchInscritos('444');
			promesa2.then ( respObj2 => {
						guardarTraidos( '444', db444, respObj2, 'Vehículos', banderaAlerta );
						let promesa3 = fetchInscritos('682');
						localStorage.removeItem('Accion');
						promesa3.then ( respObj3 => {
							guardarTraidos( '682', db682, respObj3, 'Establecimientos comerciales', banderaAlerta);
						})
					})
					.catch( err2 => console.log('Error', err2 ) );
		}).catch( err1 => console.log('Error: ', err1) );

	}).catch( err => console.log('Error: ', err) );	
}

function fetchEvaluados(doc, formulario, url){
	var credenciales = JSON.parse(localStorage.getItem('identity'));
	let credentials = {
		nombreUsuario: credenciales.usuario,
		token: credenciales.token,
		formulario: formulario
	};
	let bigDoc = Object.assign(credentials, doc);
	let data = JSON.stringify(bigDoc);
	console.log('Cuerpo request', data);
	let cuerpo = document.getElementById('cuerpoRespuesta');
	cuerpo.innerHTML = ''
	//console.log(data);
	return new Promise((resolve, reject) => {
		fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: data
		}).then( res => {
			if(res.status == 500){
				return fetchEvaluados(doc, formulario, url)
				.then( body => resolve(body) );
				//.then( () => setTimeout( () => alert("Registros cargados en servidor"), 1500) );	
			}else{
				res.json().then( body => resolve(body)	)
				let texto = document.createElement('p');
				texto.innerHTML = "Se envió el acta: " + doc.ACTA;
				cuerpo.appendChild(texto);
			} 
		})
		.catch( err => reject([err, doc.ACTA]) );
	});
}

function cargarServidor(formulario){
	localStorage.getItem('Accion') == 'cargarServidor' ?
			localStorage.removeItem('Accion') :
			localStorage.setItem('Accion', 'cargarServidor');
			
	let db;
	let urltofetch;
	switch (formulario) {
		case '493':
		db = dbNuevos493;
		urltofetch = BASE_URL + 'inscritosTabla'
		break;
		case '569':
		db = dbNuevos569;
		urltofetch = BASE_URL + 'inscritosTabla'
		break;
		case '444':
		db = dbNuevos444;
		urltofetch = BASE_URL + 'inscritosTabla'
		break;
		case '682':
		db = dbNuevos682;
		urltofetch = BASE_URL + 'inscritosTabla'
		break;
		default:
		db = dbActasForm(formulario);
		urltofetch = BASE_URL + 'evaluacionesTabla';
		break;
	}

	if (verificarSesion()) {
		localStorage.removeItem('Accion');	
		db.allDocs({include_docs: true, descending: true}).then( doc => {
			console.log('Cantidad de registros en indexDB para este formulario: ', doc.rows.length);
			// console.log(JSON.stringify(doc.rows));
			let promesas = doc.rows.map( registro => fetchEvaluados(registro.doc, formulario, urltofetch));
			console.log(promesas);
			Promise
				.all(promesas)
				.then( respuesta => {
					//let mensaje = [];
					let cuerpo = document.getElementById('cuerpoRespuesta');
					respuesta.forEach(element => {
						let texto = document.createElement('p');
						texto.innerHTML = element.res;
						cuerpo.appendChild(texto);
					});
				})
				.catch( (err) => {
					let cuerpo = document.getElementById('cuerpoRespuesta');
					let texto = document.createElement('p');
					texto.innerHTML = "El acta " + err[1] + " no pudo ser almacenada. Inténtelo de nuevo hasta confirmar que todas las actas hayan sido enviadas";
					cuerpo.appendChild(texto);
				}); 
				//.catch( (err) => alert("Problemas con el envío de registros: ", err ) );
		});	
	} else{
		location.assign("./loginserver.html");
	}
}

function persistirInscrito(dbNuevos, inscrito, idExistente){
	//var id = 0;
	if(idExistente == 0){
		dbNuevos.info().then( result => {
			var ultimo = result.doc_count + 1;
			let indice  = calcularIndice(ultimo);
			console.log(indice);
			var insertar = { _id: indice };
			inscrito = Object.assign( insertar, inscrito );
			console.log(inscrito);

			dbNuevos.put(inscrito, function callback(err, result){
				if (!err) {
					alert('inscrito guardado en base de datos');
				}else {
					alert('problemas guardando inscrito en base de datos' + err);
				}
			});					
		});					
	}else{
		//id = idExistente;
		var insertar;
		dbNuevos.get(idExistente).then( docum => {
			insertar = { 
				_id: docum._id,
				_rev: docum._rev,
			};
			console.log("Rev a adicionar al inscrito para la tabla de nuevos", insertar);
			delete inscrito._id;
			delete inscrito._rev;
			inscrito = Object.assign(insertar, inscrito);
			console.log("Inscrito ya existente a guardar en tabla de nuevos: ", inscrito);
			dbNuevos.put(inscrito, function callback(err, result){
				if (!err) {
					alert('inscrito modificado en base de datos');
					localStorage.removeItem('inscrito')
					location.reload();
				}else {
					alert('problemas modificando inscrito en base de datos: ' + err);
					console.log(err);
				}
			});
		})
		.catch( () => {
			console.log("Inscrito que no esta en tabla de nuevos: ", inscrito);
			delete inscrito._rev;
			dbNuevos.info().then( result => {
				var ultimo = result.doc_count + 1;
				let indice  = calcularIndice(ultimo);
				console.log(indice);
				console.log('inscrito', inscrito);
				let insertar = { 
					_id: indice, 
					ACTA: inscrito.ACTA.substr(0, 11) + 'M' +  inscrito.ACTA.substr(12)
				};
				console.log('objeto a insertar con acta modificada', insertar);
				delete inscrito.ACTA;
				inscrito = Object.assign( insertar, inscrito );
				console.log(inscrito);
				
				dbNuevos.put(inscrito, function callback(err, result){
					if (!err) {
						alert('inscrito almacenado en base de datos');
						location.reload();
					}else {
						alert('problemas almacenando inscrito en base de datos: ' + err);
						console.log(err);
					}
				});
			}).catch( error => console.log("Error contando registros", error) );
		});
	}
}

function guardarComunesInscritos(formulario){

	var inscrito = {
		//Campos comunes a todos los formularios en general
		ACTA: document.getElementsByName('acta' + formulario)[0].value,
		FECHA: document.getElementsByName('fecha' + formulario)[0].value,
		N_INSCRIP: document.getElementsByName('inscripcion' + formulario)[0].value,
		NOMBRE_P: document.getElementsByName('propietario' + formulario)[0].value,
		TID_P: document.getElementsByName('tipoIdProp' + formulario)[0].value,
		DOC_P: document.getElementsByName('idPropietario' + formulario)[0].value,
		FAX: document.getElementsByName('fax' + formulario)[0].value,
		TELS: document.getElementsByName('tel' + formulario)[0].value,
		CORREO: document.getElementsByName('correoProp' + formulario)[0].value,
		DIRECC: document.getElementsByName('direccion' + formulario)[0].value,
		DPTO_NOTI: document.getElementsByName('deptoNotif' + formulario)[0].value,
		MPIO_NOTI: document.getElementsByName('mpioNotif' + formulario)[0].value,
		FIRMA_F1: '',
		FIRMA_E1: '',
		AUTORIZA: document.getElementsByName('autorizaNoti' + formulario)[0].value,
		
		//Campos comunes a los formularios de inscripción 493, 444, 569
		CELULAR: document.getElementsByName('cel' + formulario)[0].value,
		OBSERVA_AU: document.getElementsByName('obAutoridad' + formulario)[0].value,
		OBSERVA_F1: document.getElementsByName('obPersona' + formulario)[0].value,
		NOMBRE_E1: document.getElementsByName('inscribe' + formulario)[0].value,
		ID_E1: document.getElementsByName('idInscribe' + formulario)[0].value,
		NOMBRE_F1: document.getElementsByName('recibe' + formulario)[0].value,
		ID_F1: document.getElementsByName('idRecibe' + formulario)[0].value,
	}
	return inscrito;		
}

function guardarComunesEstablecimientos(formulario){
	var territorio = [];
	for (var i = 0; i < document.getElementsByName('territorio' + formulario).length; i++){
		document.getElementsByName('territorio' + formulario)[i].checked ? territorio.push(document.getElementsByName('territorio' + formulario)[i].value) : console.log(i);
	}
	
	var inscrito = {
		//Campos comunes a todos los formularios menos a 444
		NOCO: document.getElementsByName('nombreComercial' + formulario)[0].value,
		RSO: document.getElementsByName('razonSocial' + formulario)[0].value,
		NIT: document.getElementsByName('nit' + formulario)[0].value,
		CCUV: document.getElementsByName('concepto' + formulario)[0].value,
		CUV: document.getElementsByName('textoConcepto' + formulario)[0].value,
		F_UV: document.getElementsByName('fechaUltVisita' + formulario)[0].value,
		DIR_NOT_E: document.getElementsByName('funcUltVisita' + formulario)[0].value,
		MAMER: document.getElementsByName('matriculaMercantil' + formulario)[0].value,
		NOLOCA: document.getElementsByName('nomTerr' + formulario)[0].value,
		VISITADO: document.getElementsByName('visitado' + formulario)[0].value,
		DIR_NOT: document.getElementsByName('dirNotif' + formulario)[0].value,
		
		TERRITORIO: territorio,
	}

	return inscrito;
}

function firmaInscripcion() {
	window.location.assign('firmaInscripcion.html');
}

function firmaEvaluacion(formulario){
	let ruta = formulario == '443' ? 'firmaInscripcion.html' : 'firmaEvaluacion.html';
	window.location.assign(ruta);
}

function validarOjetoActa(formulario){
	let objetoActa = document.getElementsByName('acta' + formulario)[0];
	let objetoNit = document.getElementsByName('nit' + formulario)[0];
	let objetoPlaca = document.getElementsByName('placa' + formulario)[0];
	let cuerpo = document.getElementById('cuerpoRespuesta');
	console.log('objetoActa en plena validación', objetoActa.value);
	if (!objetoActa.value){
		console.log('Entramos al if');
		cuerpo.innerHTML = 'Lo sentimos mucho. Es absolutamente obligatorio diligenciar el número de acta. '
							+ 'Por favor devuélvase y verifique que el número de acta esté incluido ' 
							+ 'antes de guardar el acta.';
		return false;
	}else{
		if(formulario != '444'){
			if (!objetoNit.value){
				cuerpo.innerHTML = 'Lo sentimos mucho. Es absolutamente obligatorio diligenciar el campo nit ' 
								+ '(recuerde que ahí puede diligenciar la cédula del representante legal). '
								+ 'Por favor devuélvase y verifique que el campo nit esté incluido ' 
								+ 'antes de guardar el acta.';
				return false;
			}else{
				cuerpo.innerHTML = 'Guardando... ';
				return true;
			}
		}else{
			if (objetoPlaca.value.length != 6){
				cuerpo.innerHTML = 'Lo sentimos mucho. Es absolutamente obligatorio diligenciar la placa y ésta debe tener '
								+ '6 dígitos. Por favor devuélvase y verifique que la placa esté incluida y que tenga 6 dígitos ' 
								+ 'antes de guardar el acta.';
				return false;
			}else{
				cuerpo.innerHTML = 'Guardando... ';
				return true;
			}
		}
	}
}

function guardarInscrito493(){
	if(validarOjetoActa('493')){
		var idExistente = document.getElementsByName('id493')[0].value;
	
		var inscrito = guardarComunesInscritos('493');
		var inscritoEsta = guardarComunesEstablecimientos('493');
		
		var actividad = [];
		for (var i = 0; i < document.getElementsByName('actividad493').length; i++) {
			document.getElementsByName('actividad493')[i].checked ? actividad.push(document.getElementsByName('actividad493')[i].value) : console.log(i); 
			//console.log(actividad[i].checked ? actividad[i].value : 'No aplica');
		}
	
		console.log(document.getElementsByName('territorio493'));
	
		var adicional = {		
			ZONA: document.getElementsByName('zona493')[0].value,
			ACTIVIDAD: JSON.stringify(actividad),
			CARGO_F1: document.getElementsByName('cargoRecibe493')[0].value,
			CARGO_E1: document.getElementsByName('cargoInscribe493')[0].value,
		};
	
		inscrito = Object.assign( inscrito, inscritoEsta, adicional );
		localStorage.setItem('inscrito', JSON.stringify(inscrito));
		
		idExistente == 0 ? firmaInscripcion() : persistirInscrito(dbNuevos493, inscrito, idExistente);
	}
}

function guardarInscrito444(){
	if(validarOjetoActa('444')){
		var idExistente = document.getElementsByName('id444')[0].value;
		var inscrito = guardarComunesInscritos('444');
	
		var adicional = {
			MARCAV: document.getElementsByName('marca444')[0].value,
			MODELOV: document.getElementsByName('modelo444')[0].value,
			PLACA: document.getElementsByName('placa444')[0].value,
			FURGON: document.getElementsByName('furgon444')[0].value,
			REMOLQUE: document.getElementsByName('rmque444')[0].value,
			PLACAREM: document.getElementsByName('placaRemolque444')[0].value,
			SEMIREM: document.getElementsByName('srmque444')[0].value,
			PLACASEMI: document.getElementsByName('placaSrmque444')[0].value,
			ISOTERMO: document.getElementsByName('isotermo444')[0].value,
			U_UFRIO: document.getElementsByName('ufrio444')[0].value,
			PRODUCTO: document.getElementsByName('producto444')[0].value
		};
		
		inscrito = Object.assign( inscrito, adicional );
		localStorage.setItem('inscrito', JSON.stringify(inscrito));
		
		idExistente == 0 ? firmaInscripcion() : persistirInscrito(dbNuevos444, inscrito, idExistente);
	}
}

function guardarInscrito569(){
	if(validarOjetoActa('569')){
		var idExistente = document.getElementsByName('id569')[0].value;
	
		var inscrito = guardarComunesInscritos('569');
		var inscritoEsta = guardarComunesEstablecimientos('569');
		
		console.log(document.getElementsByName('territorio569'));
	
		var adicional = {
			NOMBRE_RL: document.getElementsByName('repLegal569')[0].value,
			TID_RL: document.getElementsByName('tipoIdRl569')[0].value,
			DOC_RL: document.getElementsByName('idRepLegal569')[0].value,
			DEPENDEN: document.getElementsByName('dependencia569')[0].value,
			EXPENDIO: document.getElementsByName('expendio569')[0].value,
			ALMACENA: document.getElementsByName('almacena569')[0].value,
			DEPOSITO: document.getElementsByName('deposito569')[0].value,
			DESPRESA: document.getElementsByName('despresa569')[0].value,
			OTROTIPO: document.getElementsByName('cual569')[0].value
		};
		
		inscrito = Object.assign( inscrito, inscritoEsta, adicional );
		localStorage.setItem('inscrito', JSON.stringify(inscrito));
		
		idExistente == 0 ? firmaInscripcion() : persistirInscrito(dbNuevos569, inscrito, idExistente);
	}
}

function guardarInscrito682(){
	if(validarOjetoActa('682')){
		var idExistente = document.getElementsByName('id682')[0].value;
	
		var inscrito = guardarComunesInscritos('682');
		var inscritoEsta = guardarComunesEstablecimientos('682');
		
		console.log(document.getElementsByName('territorio682'));
	
		var adicional = {		
			ZONA: document.getElementsByName('zona682')[0].value,
			CARGO_F1: document.getElementsByName('cargoRecibe682')[0].value,
			CARGO_E1: document.getElementsByName('cargoInscribe682')[0].value,
			TIPO_SU: document.getElementsByName('tipoSujeto682')[0].value,
			SUJETO: document.getElementsByName('sujeto682')[0].value,
			T_INSCRIP: document.getElementsByName('codigoInscripcion682')[0].value, 
			TIPO_I: document.getElementsByName('tipoInscripcion682')[0].value,
			NOMBRE_AD: document.getElementsByName('administrador682')[0].value,
			TID_AD: document.getElementsByName('tipoIdAdministrador682')[0].value,
			DOC_AD: document.getElementsByName('idAdministrador682')[0].value,
		};
		
		inscrito = Object.assign( inscrito, inscritoEsta, adicional );
		localStorage.setItem('inscrito', JSON.stringify(inscrito));
		
		idExistente == 0 ? firmaInscripcion() : persistirInscrito(dbNuevos682, inscrito, idExistente);
	}
}

function guardarComunesEvaluados(formulario){
	let evaluado = {
		//Campos comunes a todos los formularios en general
		FECHA: document.getElementsByName('fecha' + formulario)[0].value,
		ACTA: document.getElementsByName('acta' + formulario)[0].value,
		N_INSCRIP: document.getElementsByName('inscripcion' + formulario)[0].value,
		DIRECC: document.getElementsByName('direccion' + formulario)[0].value,
		FAX: document.getElementsByName('fax' + formulario)[0].value,
		TELS: document.getElementsByName('tel' + formulario)[0].value + ' ' + document.getElementsByName('cel' + formulario)[0].value,
		CORREO: document.getElementsByName('correoProp' + formulario)[0].value,
		NOMBRE_P: document.getElementsByName('propietario' + formulario)[0].value,
		TID_P: document.getElementsByName('tipoIdProp' + formulario)[0].value,
		DOC_P: document.getElementsByName('idPropietario' + formulario)[0].value,
		DIR_NOT: document.getElementsByName('dirNotif' + formulario)[0].value,
		DPTO_NOTI: document.getElementsByName('deptoNotif' + formulario)[0].value,
		MPIO_NOTI: document.getElementsByName('mpioNotif' + formulario)[0].value,
		HORARIOS: document.getElementsByName('horarios' + formulario)[0].value,
		NUTRA: document.getElementsByName('noTrabajadores' + formulario)[0].value,
		F_UV: document.getElementsByName('fechaUltVisita' + formulario)[0].value,
		CCUV: document.getElementsByName('concepto' + formulario)[0].value,
		CUV: document.getElementsByName('textoConcepto' + formulario)[0].value,
		UV_P: document.getElementsByName('porcentaje' + formulario)[0].value,
		NMOTIVO: document.getElementsByName('motivo' + formulario)[0].value,
		MOTIVO: document.getElementsByName('textoMotivo' + formulario)[0].value,
		AUTORIZA: document.getElementsByName('autorizaNoti' + formulario)[0].value,
		CONCEPTO: document.getElementsByName('conceptoEval' + formulario)[0].value,
		P_CUMPL: document.getElementsByName('cumplimiento' + formulario)[0].value,
		N_MUESTRAS: document.getElementsByName('numeroMuestras' + formulario)[0].value,
		N_ACTAS: document.getElementsByName('numeroActa' + formulario)[0].value,
		AMS: document.getElementsByName('medidaSeguridad' + formulario)[0].value,
		DETA_MS: document.getElementsByName('medida' + formulario)[0].value,

		/* ACTA, UV_P, HORARIOS, NUTRA, son los únicos campos que son exclusivos de las evaluaciones, 
		los otros son comunes con los inscritos */
		
		OBS_AS: document.getElementsByName('obAutoridad' + formulario)[0].value,
		OBS_ES: document.getElementsByName('obPersona' + formulario)[0].value,
		NOMBRE_F1: document.getElementsByName('funcionario' + formulario + '-1')[0].value,
		ID_F1: document.getElementsByName('idFuncionario' + formulario + '-1')[0].value,
		CARGO_F1: document.getElementsByName('cargoFuncionario' + formulario + '-1')[0].value,
		NOMBRE_F2: document.getElementsByName('funcionario' + formulario + '-2')[0].value,
		ID_F2: document.getElementsByName('idFuncionario' + formulario + '-2')[0].value,
		CARGO_F2: document.getElementsByName('cargoFuncionario' + formulario + '-2')[0].value,
		NOMBRE_E1: document.getElementsByName('persona' + formulario + '-1')[0].value,
		ID_E1: document.getElementsByName('idPersona' + formulario + '-1')[0].value,
		CARGO_E1: document.getElementsByName('cargoPersona' + formulario + '-1')[0].value,
		NOMBRE_E2: document.getElementsByName('funcionario' + formulario + '-2')[0].value,
		ID_E2: document.getElementsByName('idFuncionario' + formulario + '-2')[0].value,
		CARGO_E2: document.getElementsByName('cargoFuncionario' + formulario + '-2')[0].value,
		FIRMA_F1: '',
		FIRMA_F2: '',
		FIRMA_E1: '',
		FIRMA_E2: '',
		GRABADO: ''
	};
	return evaluado;
}

function comunesEvaluadosEstabPreguntas(formulario){
	let evaluado = {
		E11: document.getElementsByName('evaluacion_1')[0].value,
		H11: document.getElementsByName('hallazgos_1_1')[0].value,
		E12: document.getElementsByName('evaluacion_1')[1].value,
		H12: document.getElementsByName('hallazgos_1_2')[0].value,
		E13: document.getElementsByName('evaluacion_1')[2].value,
		H13: document.getElementsByName('hallazgos_1_3')[0].value,
		EB1: document.getElementsByName('evalBloque1')[0].value,
		E21: document.getElementsByName('evaluacion_2')[0].value,
		H21: document.getElementsByName('hallazgos_2_1')[0].value,
		EB2: document.getElementsByName('evalBloque2')[0].value,
		E31: document.getElementsByName('evaluacion_3')[0].value,
		H31: document.getElementsByName('hallazgos_3_1')[0].value,
		E32: document.getElementsByName('evaluacion_3')[1].value,
		H32: document.getElementsByName('hallazgos_3_2')[0].value,
		EB3: document.getElementsByName('evalBloque3')[0].value,
		E41: document.getElementsByName('evaluacion_4')[0].value,
		H41: document.getElementsByName('hallazgos_4_1')[0].value,
		E42: document.getElementsByName('evaluacion_4')[1].value,
		H42: document.getElementsByName('hallazgos_4_2')[0].value,
		EB4: document.getElementsByName('evalBloque4')[0].value,
		E51: document.getElementsByName('evaluacion_5')[0].value,
		H51: document.getElementsByName('hallazgos_5_1')[0].value,
		E52: document.getElementsByName('evaluacion_5')[1].value,
		H52: document.getElementsByName('hallazgos_5_2')[0].value,
		EB5: document.getElementsByName('evalBloque5')[0].value
	}
	return evaluado;
}

function guardarEvaluadosVehiculos(formulario){
	let evaluado = {
		MARCAV: document.getElementsByName('marca' + formulario)[0].value,
		MODELOV: document.getElementsByName('modelo' + formulario)[0].value,
		PLACA: document.getElementsByName('placa' + formulario)[0].value,
		ISOTERMO: document.getElementsByName('isotermo' + formulario)[0].value,
		U_UFRIO: document.getElementsByName('ufrio' + formulario)[0].value,
		PRODUCTO: document.getElementsByName('producto' + formulario)[0].value,
		E11: document.getElementsByName('evaluacion_1')[0].value,
		H11: document.getElementsByName('hallazgos_1_1')[0].value,
		EB1: document.getElementsByName('evalBloque1')[0].value,
		E21: document.getElementsByName('evaluacion_2')[0].value,
		H21: document.getElementsByName('hallazgos_2_1')[0].value,
		EB2: document.getElementsByName('evalBloque2')[0].value,
		E31: document.getElementsByName('evaluacion_3')[0].value,
		H31: document.getElementsByName('hallazgos_3_1')[0].value,
		E32: document.getElementsByName('evaluacion_3')[1].value,
		H32: document.getElementsByName('hallazgos_3_2')[0].value,
		E33: document.getElementsByName('evaluacion_3')[2].value,
		H33: document.getElementsByName('hallazgos_3_3')[0].value,
		E34: document.getElementsByName('evaluacion_3')[3].value,
		H34: document.getElementsByName('hallazgos_3_4')[0].value,
		EB3: document.getElementsByName('evalBloque3')[0].value,
		E41: document.getElementsByName('evaluacion_4')[0].value,
		H41: document.getElementsByName('hallazgos_4_1')[0].value,
		EB4: document.getElementsByName('evalBloque4')[0].value,
		E51: document.getElementsByName('evaluacion_5')[0].value,
		H51: document.getElementsByName('hallazgos_5_1')[0].value,
		E52: document.getElementsByName('evaluacion_5')[1].value,
		H52: document.getElementsByName('hallazgos_5_2')[0].value,
		EB5: document.getElementsByName('evalBloque5')[0].value
	}
	return evaluado;
}

function guardarEvaluadosEstablecimientos(formulario){
	var territorio = [];
	for (var i = 0; i < document.getElementsByName('territorio' + formulario).length; i++){
		document.getElementsByName('territorio' + formulario)[i].checked ? territorio.push(document.getElementsByName('territorio' + formulario)[i].value) : console.log(i);
	}

	var evaluado = {
		NOMBRE_RL: formulario != "443" ? document.getElementsByName('repLegal' + formulario)[0].value : "",
		TID_RL: formulario != "443" ? document.getElementsByName('tipoIdRl' + formulario)[0].value : "",
		DOC_RL: formulario != "443" ? document.getElementsByName('idRepLegal' + formulario)[0].value : "",
		NOCO: formulario != "333" && formulario != '243' ? 
			document.getElementsByName('nombreComercial' + formulario)[0].value : "",
		RSO: document.getElementsByName('razonSocial' + formulario)[0].value,
		NIT: document.getElementsByName('nit' + formulario)[0].value,
		MAMER: formulario != "26" && formulario != '333' && formulario != '243' ? 
			document.getElementsByName('matriculaMercantil' + formulario)[0].value : "",
		NOLOCA: document.getElementsByName('nomTerr' + formulario)[0].value,
		TERRITORIO: formulario != "333" && formulario != '243' ? territorio : "",
	};
	
	return evaluado;	
}

function guardarEvaluadoReducido(formulario){
	let sufixFuncionario = formulario == '443' ? '' : '-1';
	let evaluado = {
		ACTA: document.getElementsByName('acta' + formulario)[0].value,
		FECHA: document.getElementsByName('fecha' + formulario)[0].value,
		N_INSCRIP: formulario != '26' ? document.getElementsByName('inscripcion' + formulario)[0].value : "",
		DIRECC: document.getElementsByName('direccion' + formulario)[0].value,
		TELS: document.getElementsByName('tel' + formulario)[0].value + ' ' + document.getElementsByName('cel' + formulario)[0].value,
		CORREO: document.getElementsByName('correoProp' + formulario)[0].value,
		NOMBRE_P: formulario != '26' ? document.getElementsByName('propietario' + formulario)[0].value : "",
		TID_P: formulario != '26' ? document.getElementsByName('tipoIdProp' + formulario)[0].value : "",
		DOC_P: formulario != '26' ? document.getElementsByName('idPropietario' + formulario)[0].value : "",
		AUTORIZA: document.getElementsByName('autorizaNoti' + formulario)[0].value,			
		OBS_AS: formulario != '596' && document.getElementsByName('obAutoridad' + formulario)[0].value,
		NOMBRE_F1: document.getElementsByName(`funcionario${formulario}${sufixFuncionario}`)[0].value,
		ID_F1: document.getElementsByName(`idFuncionario${formulario}${sufixFuncionario}`)[0].value,
		CARGO_F1: formulario != '26' ? document.getElementsByName(`cargoFuncionario${formulario}${sufixFuncionario}`)[0].value : "",
		NOMBRE_F2: formulario != '26' && formulario != '443' ? 
			document.getElementsByName('funcionario' + formulario + '-2')[0].value : "",
		ID_F2: formulario != '26' && formulario != '443' ? 
			document.getElementsByName('idFuncionario' + formulario + '-2')[0].value : "",
		CARGO_F2: formulario != '26' && formulario != '443' ? 
			document.getElementsByName('cargoFuncionario' + formulario + '-2')[0].value : "",
		NOMBRE_E1: formulario != '596' && document.getElementsByName(`persona${formulario}${sufixFuncionario}`)[0].value,
		ID_E1: formulario != '596' && document.getElementsByName(`idPersona${formulario}${sufixFuncionario}`)[0].value,
		CARGO_E1: formulario != '596' && formulario != '26' ? document.getElementsByName(`cargoPersona${formulario}${sufixFuncionario}`)[0].value : "",
		NOMBRE_E2: formulario != '596' && formulario != '26' && formulario != '443' ? 
			document.getElementsByName('persona' + formulario + '-2')[0].value : "",
		ID_E2: formulario != '596' && formulario != '26' && formulario != '443' ? 
			document.getElementsByName('idPersona' + formulario + '-2')[0].value : "",
		CARGO_E2: formulario != '596' && formulario != '26' && formulario != '443' ? 
			document.getElementsByName('cargoPersona' + formulario + '-2')[0].value : "",
		FIRMA_F1: '',
		FIRMA_F2: '',
		FIRMA_E1: '',
		FIRMA_E2: '',
		GRABADO: 'S'
	};

	return evaluado;
}

function persistirCoordenadas(db, eva, result){
	navigator.geolocation.getCurrentPosition(position => {
		let coordinates = {
			LONGITUD: position.coords.longitude,
			LATITUD: position.coords.latitude
		}
		console.log('evaluado antes de coordenadas', eva)
		return db.put({
			_id: result.id,
			_rev: result.rev,
			...eva,
			LONGITUD: coordinates.LONGITUD,
			LATITUD: coordinates.LATITUD,
		})
		.then(res => console.log('Registro actualizado con coordenadas', res))
		.catch(err => console.log('Problemas actualizando registro', err))
	}, (err) => {
		console.log('Error obteniendo coordenadas', err)
	})
}

function persistirEvaluado(db, evaluado){
	var insertar = { _id: evaluado.ACTA.substring(11, 15) };
	evaluado = Object.assign( insertar, evaluado );
	console.log(evaluado);

	db.put(evaluado, async function callback(err, result){
		if (!err) {
			console.log('resultado', result)
			await persistirCoordenadas(db, evaluado, result)
			alert('evaluado guardado en base de datos');
			location.reload();
		}else {
			alert('problemas guardando evaluado en base de datos: ', err);
		}
	});
	
	
}

function guardarEvaluacion(formulario){
	console.log('Estamos en el formulario', formulario)
	let excluded = [
		'333',
		'442',
		'596',
		'26',
		'243',
		'443'
	]
	let evaluado = !excluded.includes(formulario) ? guardarComunesEvaluados(formulario) : {};
	var coordinates = {}					
	let preguntasComunes;
	let tipoEsta = [];
	let evaluadoEsta;
	let evaluadoVehi;
	let reducido;
	
	let objetoActa = document.getElementsByName('acta' + formulario)[0];
	let objetoNit = document.getElementsByName('nit' + formulario)[0];
	let cuerpo = document.getElementById('cuerpoRespuesta');
	if (!objetoActa.value){
		cuerpo.innerHTML = 'Lo sentimos mucho. Es absolutamente obligatorio diligenciar el número de acta. '
							+ 'Por favor devuélvase y verifique que el número de acta esté incluido antes de guardar el acta.';
	}else if(formulario != '441' && formulario != '472' && !objetoNit.value) {
		cuerpo.innerHTML = 'Lo sentimos mucho. Es absolutamente obligatorio diligenciar el campo nit/cédula. '
							+ 'Por favor devuélvase y verifique que este campo esté diligenciado antes de guardar el acta.';
	}else if (!validarCambioTab(10) && formulario != '26' && formulario != '441' && formulario != '472'){
		cuerpo.innerHTML = 'Lo sentimos mucho. Usted no escogió un inscrito antes de diligenciar la evaluación. '
							+ 'Debe regresar a la pesataña de INSCRITOS y escoger uno o, en caso de que no esté inscrito '
							+ 'el establecimiento o vehículo, debe dirigirse al formulario de inscripción correspondiente. '
							+ 'Sentimos las molestias ocasionadas si ha perdido su trabajo, pero este paso es fundamental '
							+ 'para salvaguardar la integridad de los datos.';
	}else{
		cuerpo.innerHTML = 'Guardando... ';
		switch(formulario){
			case '440':
				var tipocarne = [];
				var adicional;
				preguntasComunes = comunesEvaluadosEstabPreguntas(formulario);
				evaluadoEsta = guardarEvaluadosEstablecimientos(formulario);
		
				for (let i = 0; i < document.getElementsByName('tipoCarneExpende').length; i++){
					document.getElementsByName('tipoCarneExpende')[i].checked ? tipocarne.push(document.getElementsByName('tipoCarneExpende')[i].value) : console.log(i);
				}
				adicional = {
					TIPOCARNE: JSON.stringify(tipocarne),
					OTRAS: document.getElementsByName('otrasEspecies' + formulario)[0].value,
					OTIPOPRO: document.getElementsByName('otrosProductos' + formulario)[0].value,
					E14: document.getElementsByName('evaluacion_1')[3].value,
					H14: document.getElementsByName('hallazgos_1_4')[0].value,
					E22: document.getElementsByName('evaluacion_2')[1].value,
					H22: document.getElementsByName('hallazgos_2_2')[0].value,
					E43: document.getElementsByName('evaluacion_4')[2].value,
					H43: document.getElementsByName('hallazgos_4_3')[0].value,
					E53: document.getElementsByName('evaluacion_5')[2].value,
					H53: document.getElementsByName('hallazgos_5_3')[0].value,
					E54: document.getElementsByName('evaluacion_5')[3].value,
					H54: document.getElementsByName('hallazgos_5_4')[0].value,
					E55: document.getElementsByName('evaluacion_5')[4].value,
					H55: document.getElementsByName('hallazgos_5_5')[0].value
				};
				evaluado = Object.assign( evaluado, evaluadoEsta, preguntasComunes, adicional );
				break;
			case '474':
				preguntasComunes = comunesEvaluadosEstabPreguntas(formulario);
				evaluadoEsta = guardarEvaluadosEstablecimientos(formulario);
				adicional = {
					E14: document.getElementsByName('evaluacion_1')[3].value,
					H14: document.getElementsByName('hallazgos_1_4')[0].value,
					E22: document.getElementsByName('evaluacion_2')[1].value,
					H22: document.getElementsByName('hallazgos_2_2')[0].value,
					E23: document.getElementsByName('evaluacion_2')[2].value,
					H23: document.getElementsByName('hallazgos_2_3')[0].value,
					E33: document.getElementsByName('evaluacion_3')[2].value,
					H33: document.getElementsByName('hallazgos_3_3')[0].value,
					E43: document.getElementsByName('evaluacion_4')[2].value,
					H43: document.getElementsByName('hallazgos_4_3')[0].value,
					E44: document.getElementsByName('evaluacion_4')[3].value,
					H44: document.getElementsByName('hallazgos_4_4')[0].value,
					E45: document.getElementsByName('evaluacion_4')[4].value,
					H45: document.getElementsByName('hallazgos_4_5')[0].value,
					E46: document.getElementsByName('evaluacion_4')[5].value,
					H46: document.getElementsByName('hallazgos_4_6')[0].value
				};
				evaluado = Object.assign( evaluado, evaluadoEsta, preguntasComunes, adicional );
				break;
			case '479':
				preguntasComunes = comunesEvaluadosEstabPreguntas(formulario);
				evaluadoEsta = guardarEvaluadosEstablecimientos(formulario);
				for (let i = 0; i < document.getElementsByName('tipoEstablecimiento').length; i++) {
					document.getElementsByName('tipoEstablecimiento')[i].checked ? tipoEsta.push(document.getElementsByName('tipoEstablecimiento')[i].value) : console.log(i);
				}
				console.log(tipoEsta);
				adicional = {
					ACTIVIDAD: JSON.stringify(tipoEsta),
					CUAL: document.getElementsByName('cualEstab')[0].value,
					E14: document.getElementsByName('evaluacion_1')[3].value,
					H14: document.getElementsByName('hallazgos_1_4')[0].value,
					E22: document.getElementsByName('evaluacion_2')[1].value,
					H22: document.getElementsByName('hallazgos_2_2')[0].value,
					E33: document.getElementsByName('evaluacion_3')[2].value,
					H33: document.getElementsByName('hallazgos_3_3')[0].value,
					E34: document.getElementsByName('evaluacion_3')[3].value,
					H34: document.getElementsByName('hallazgos_3_4')[0].value,
					E43: document.getElementsByName('evaluacion_4')[2].value,
					H43: document.getElementsByName('hallazgos_4_3')[0].value,
					E44: document.getElementsByName('evaluacion_4')[3].value,
					H44: document.getElementsByName('hallazgos_4_4')[0].value,
					E53: document.getElementsByName('evaluacion_5')[2].value,
					H53: document.getElementsByName('hallazgos_5_3')[0].value,
					E54: document.getElementsByName('evaluacion_5')[3].value,
					H54: document.getElementsByName('hallazgos_5_4')[0].value,
					E55: document.getElementsByName('evaluacion_5')[4].value,
					H55: document.getElementsByName('hallazgos_5_5')[0].value,
					E56: document.getElementsByName('evaluacion_5')[5].value,
					H56: document.getElementsByName('hallazgos_5_6')[0].value
				};
				evaluado = Object.assign( evaluado, evaluadoEsta, preguntasComunes, adicional );
				break;
			case '480':
				preguntasComunes = comunesEvaluadosEstabPreguntas(formulario);
				evaluadoEsta = guardarEvaluadosEstablecimientos(formulario);
				for (let i = 0; i < document.getElementsByName('tipoEstablecimiento').length; i++) {
					document.getElementsByName('tipoEstablecimiento')[i].checked ? tipoEsta.push(document.getElementsByName('tipoEstablecimiento')[i].value) : console.log(i);
				}
				console.log(tipoEsta);
				adicional = {
					ACTIVIDAD: JSON.stringify(tipoEsta),
					E22: document.getElementsByName('evaluacion_2')[1].value,
					H22: document.getElementsByName('hallazgos_2_2')[0].value,
					E33: document.getElementsByName('evaluacion_3')[2].value,
					H33: document.getElementsByName('hallazgos_3_3')[0].value,
					E53: document.getElementsByName('evaluacion_5')[2].value,
					H53: document.getElementsByName('hallazgos_5_3')[0].value,
					E54: document.getElementsByName('evaluacion_5')[3].value,
					H54: document.getElementsByName('hallazgos_5_4')[0].value,
					E55: document.getElementsByName('evaluacion_5')[4].value,
					H55: document.getElementsByName('hallazgos_5_5')[0].value				
				};
				evaluado = Object.assign( evaluado, evaluadoEsta, preguntasComunes, adicional );
				break;
			case '495':
				preguntasComunes = comunesEvaluadosEstabPreguntas(formulario);
				evaluadoEsta = guardarEvaluadosEstablecimientos(formulario);
				for (let i = 0; i < document.getElementsByName('tipoEstablecimiento').length; i++) {
					document.getElementsByName('tipoEstablecimiento')[i].checked ? tipoEsta.push(document.getElementsByName('tipoEstablecimiento')[i].value) : console.log(i);
				}
				adicional = {
					ACTIVIDAD: JSON.stringify(tipoEsta),
					E14: document.getElementsByName('evaluacion_1')[3].value,
					H14: document.getElementsByName('hallazgos_1_4')[0].value,
					E15: document.getElementsByName('evaluacion_1')[4].value,
					H15: document.getElementsByName('hallazgos_1_5')[0].value,
					E22: document.getElementsByName('evaluacion_2')[1].value,
					H22: document.getElementsByName('hallazgos_2_2')[0].value,
					E33: document.getElementsByName('evaluacion_3')[2].value,
					H33: document.getElementsByName('hallazgos_3_3')[0].value,
					E34: document.getElementsByName('evaluacion_3')[3].value,
					H34: document.getElementsByName('hallazgos_3_4')[0].value,
					E43: document.getElementsByName('evaluacion_4')[2].value,
					H43: document.getElementsByName('hallazgos_4_3')[0].value,
					E44: document.getElementsByName('evaluacion_4')[3].value,
					H44: document.getElementsByName('hallazgos_4_4')[0].value,
					E45: document.getElementsByName('evaluacion_4')[4].value,
					H45: document.getElementsByName('hallazgos_4_5')[0].value,
					E46: document.getElementsByName('evaluacion_4')[5].value,
					H46: document.getElementsByName('hallazgos_4_6')[0].value,
					E53: document.getElementsByName('evaluacion_5')[2].value,
					H53: document.getElementsByName('hallazgos_5_3')[0].value,
					E61: document.getElementsByName('evaluacion_6')[0].value,
					H61: document.getElementsByName('hallazgos_6_1')[0].value				
				};
				evaluado = Object.assign( evaluado, evaluadoEsta, preguntasComunes, adicional );
				break;
			case '478':
				preguntasComunes = comunesEvaluadosEstabPreguntas(formulario);
				evaluadoEsta = guardarEvaluadosEstablecimientos(formulario);
				for (let i = 0; i < document.getElementsByName('tipoEstablecimiento').length; i++) {
					document.getElementsByName('tipoEstablecimiento')[i].checked ? tipoEsta.push(document.getElementsByName('tipoEstablecimiento')[i].value) : console.log(i);
				}
				adicional = {
					ACTIVIDAD: JSON.stringify(tipoEsta),
					GRS: document.getElementsByName('grs')[0].value,
					GRSCON: document.getElementsByName('grscon')[0].value,
					E14: document.getElementsByName('evaluacion_1')[3].value,
					H14: document.getElementsByName('hallazgos_1_4')[0].value,
					E15: document.getElementsByName('evaluacion_1')[4].value,
					H15: document.getElementsByName('hallazgos_1_5')[0].value,
					E22: document.getElementsByName('evaluacion_2')[1].value,
					H22: document.getElementsByName('hallazgos_2_2')[0].value,
					E23: document.getElementsByName('evaluacion_2')[2].value,
					H23: document.getElementsByName('hallazgos_2_3')[0].value,
					E33: document.getElementsByName('evaluacion_3')[2].value,
					H33: document.getElementsByName('hallazgos_3_3')[0].value,
					E34: document.getElementsByName('evaluacion_3')[3].value,
					H34: document.getElementsByName('hallazgos_3_4')[0].value,
					E43: document.getElementsByName('evaluacion_4')[2].value,
					H43: document.getElementsByName('hallazgos_4_3')[0].value,
					E44: document.getElementsByName('evaluacion_4')[3].value,
					H44: document.getElementsByName('hallazgos_4_4')[0].value,
					E45: document.getElementsByName('evaluacion_4')[4].value,
					H45: document.getElementsByName('hallazgos_4_5')[0].value,
					E53: document.getElementsByName('evaluacion_5')[2].value,
					H53: document.getElementsByName('hallazgos_5_3')[0].value,
					E54: document.getElementsByName('evaluacion_5')[3].value,
					H54: document.getElementsByName('hallazgos_5_4')[0].value,
					E55: document.getElementsByName('evaluacion_5')[4].value,
					H55: document.getElementsByName('hallazgos_5_5')[0].value,
					E56: document.getElementsByName('evaluacion_5')[5].value,
					H56: document.getElementsByName('hallazgos_5_6')[0].value,
					E61: document.getElementsByName('evaluacion_6')[0].value,
					H61: document.getElementsByName('hallazgos_6_1')[0].value,
					E62: document.getElementsByName('evaluacion_6')[1].value,
					H62: document.getElementsByName('hallazgos_6_2')[0].value,
					E63: document.getElementsByName('evaluacion_6')[2].value,
					H63: document.getElementsByName('hallazgos_6_3')[0].value				
				};
				evaluado = Object.assign( evaluado, evaluadoEsta, preguntasComunes, adicional );
				break;
			case '475':
				evaluadoEsta = guardarEvaluadosEstablecimientos(formulario);
				for (let i = 0; i < document.getElementsByName('tipoEstablecimiento').length; i++) {
					document.getElementsByName('tipoEstablecimiento')[i].checked ? tipoEsta.push(document.getElementsByName('tipoEstablecimiento')[i].value) : console.log(i);
				}
				adicional = {
					ACTIVIDAD: JSON.stringify(tipoEsta),
					E11: document.getElementsByName('evaluacion_1')[0].value,
					H11: document.getElementsByName('hallazgos_1_1')[0].value,
					E12: document.getElementsByName('evaluacion_1')[1].value,
					H12: document.getElementsByName('hallazgos_1_2')[0].value,
					EB1: document.getElementsByName('evalBloque1')[0].value,
					E21: document.getElementsByName('evaluacion_2')[0].value,
					H21: document.getElementsByName('hallazgos_2_1')[0].value,
					E22: document.getElementsByName('evaluacion_2')[1].value,
					H22: document.getElementsByName('hallazgos_2_2')[0].value,
					E23: document.getElementsByName('evaluacion_2')[2].value,
					H23: document.getElementsByName('hallazgos_2_3')[0].value,
					E24: document.getElementsByName('evaluacion_2')[3].value,
					H24: document.getElementsByName('hallazgos_2_4')[0].value,
					E25: document.getElementsByName('evaluacion_2')[4].value,
					H25: document.getElementsByName('hallazgos_2_5')[0].value,
					EB2: document.getElementsByName('evalBloque2')[0].value,			
				};
				evaluado = Object.assign( evaluado, evaluadoEsta, adicional );
				break;
			case '481':
				preguntasComunes = comunesEvaluadosEstabPreguntas(formulario);
				evaluadoEsta = guardarEvaluadosEstablecimientos(formulario);
				for (let i = 0; i < document.getElementsByName('tipoEstablecimiento').length; i++) {
					document.getElementsByName('tipoEstablecimiento')[i].checked ? tipoEsta.push(document.getElementsByName('tipoEstablecimiento')[i].value) : console.log(i);
				}
				adicional = {
					ACTIVIDAD: JSON.stringify(tipoEsta),
					E14: document.getElementsByName('evaluacion_1')[3].value,
					H14: document.getElementsByName('hallazgos_1_4')[0].value,
					E33: document.getElementsByName('evaluacion_3')[2].value,
					H33: document.getElementsByName('hallazgos_3_3')[0].value,
					E34: document.getElementsByName('evaluacion_3')[3].value,
					H34: document.getElementsByName('hallazgos_3_4')[0].value,
					E43: document.getElementsByName('evaluacion_4')[2].value,
					H43: document.getElementsByName('hallazgos_4_3')[0].value,
					E53: document.getElementsByName('evaluacion_5')[2].value,
					H53: document.getElementsByName('hallazgos_5_3')[0].value,
					E54: document.getElementsByName('evaluacion_5')[3].value,
					H54: document.getElementsByName('hallazgos_5_4')[0].value,
					E55: document.getElementsByName('evaluacion_5')[4].value,
					H55: document.getElementsByName('hallazgos_5_5')[0].value,
					E56: document.getElementsByName('evaluacion_5')[5].value,
					H56: document.getElementsByName('hallazgos_5_6')[0].value
				};
				evaluado = Object.assign( evaluado, evaluadoEsta, preguntasComunes, adicional );
				break;
			case '442':
				evaluadoEsta = guardarEvaluadosEstablecimientos(formulario);
				reducido = guardarEvaluadoReducido(formulario);
				let iterable = document.getElementsByName('pregunta');
				let arregloPreguntas = [];
				iterable.forEach( item => arregloPreguntas.push(item.value) );
				adicional = {
					FAX: document.getElementsByName('fax' + formulario)[0].value,
					DIR_NOT: document.getElementsByName('dirNotif' + formulario)[0].value,
					DPTO_NOTI: document.getElementsByName('deptoNotif' + formulario)[0].value,
					MPIO_NOTI: document.getElementsByName('mpioNotif' + formulario)[0].value,
					HORARIOS: document.getElementsByName('horarios' + formulario)[0].value,
					NUTRA: document.getElementsByName('noTrabajadores' + formulario)[0].value,
					OBS_ES: document.getElementsByName('obPersona' + formulario)[0].value,
					OTRAS: document.getElementsByName('otrasEspecies' + formulario)[0].value,
					OTIPOPRO: document.getElementsByName('otrosProductos' + formulario)[0].value,
					PREGUNTAS: arregloPreguntas
				};
				evaluado = Object.assign( evaluadoEsta, reducido, adicional );
				break;
			case '245':
				evaluadoEsta = guardarEvaluadosEstablecimientos(formulario);
				let iterableRd = document.getElementsByName('rd');
				let iterableObs = document.getElementsByName('observaciones');
				let arregloRd = [];
				let arregloObs = [];
				iterableRd.forEach( item => arregloRd.push(item.value) );
				iterableObs.forEach( item => arregloObs.push(item.value) );
				adicional = {
					TIPO_SU: document.getElementsByName('tipoSujeto' + formulario)[0].value,
					SUJETO: document.getElementsByName('sujeto' + formulario)[0].value,
					MAIL_RL: document.getElementsByName('correoRepLegal' + formulario)[0].value,
					MAIL_NOTI: document.getElementsByName('correoNotif' + formulario)[0].value,
					CIUU: document.getElementsByName('ciuu' + formulario)[0].value,
					DENUTRA: document.getElementsByName('denutra' + formulario)[0].value,
					NUTRA_ARL: document.getElementsByName('noTrabajadoresArl' + formulario)[0].value,
					NUTRA_EPS: document.getElementsByName('noTrabajadoresEps' + formulario)[0].value,
					AV_ACTA: document.getElementsByName('actaUv' + formulario)[0].value,
					RQS: document.getElementsByName('requerimientos' + formulario)[0].value,
					DIAS_PLAZO: document.getElementsByName('diasHabiles' + formulario)[0].value,
					FI_PLAZO: document.getElementsByName('fechaInicial' + formulario)[0].value,
					FF_PLAZO: document.getElementsByName('fechaFinal' + formulario)[0].value,
					RDS: arregloRd,
					OBSERVACIONES: arregloObs,
					E11: document.getElementsByName('evaluacion_1')[0].value,
					H11: document.getElementsByName('hallazgos_1_1')[0].value,
					E12: document.getElementsByName('evaluacion_1')[1].value,
					H12: document.getElementsByName('hallazgos_1_2')[0].value,
					E13: document.getElementsByName('evaluacion_1')[2].value,
					H13: document.getElementsByName('hallazgos_1_3')[0].value,
					E14: document.getElementsByName('evaluacion_1')[3].value,
					H14: document.getElementsByName('hallazgos_1_4')[0].value,
					E15: document.getElementsByName('evaluacion_1')[4].value,
					H15: document.getElementsByName('hallazgos_1_5')[0].value,
					E16: document.getElementsByName('evaluacion_1')[5].value,
					H16: document.getElementsByName('hallazgos_1_6')[0].value,
					E17: document.getElementsByName('evaluacion_1')[6].value,
					H17: document.getElementsByName('hallazgos_1_7')[0].value,
					E18: document.getElementsByName('evaluacion_1')[7].value,
					H18: document.getElementsByName('hallazgos_1_8')[0].value,
					EB1: document.getElementsByName('evalBloque1')[0].value,
					E21: document.getElementsByName('evaluacion_2')[0].value,
					H21: document.getElementsByName('hallazgos_2_1')[0].value,
					E22: document.getElementsByName('evaluacion_2')[1].value,
					H22: document.getElementsByName('hallazgos_2_2')[0].value,
					E23: document.getElementsByName('evaluacion_2')[2].value,
					H23: document.getElementsByName('hallazgos_2_3')[0].value,
					EB2: document.getElementsByName('evalBloque2')[0].value,	
					E31: document.getElementsByName('evaluacion_3')[0].value,
					H31: document.getElementsByName('hallazgos_3_1')[0].value,
					E32: document.getElementsByName('evaluacion_3')[1].value,
					H32: document.getElementsByName('hallazgos_3_2')[0].value,
					E33: document.getElementsByName('evaluacion_3')[2].value,
					H33: document.getElementsByName('hallazgos_3_4')[0].value,
					E34: document.getElementsByName('evaluacion_3')[3].value,
					H34: document.getElementsByName('hallazgos_3_4')[0].value,
					E35: document.getElementsByName('evaluacion_3')[4].value,
					H35: document.getElementsByName('hallazgos_3_5')[0].value,
					E36: document.getElementsByName('evaluacion_3')[5].value,
					H36: document.getElementsByName('hallazgos_3_6')[0].value,
					E37: document.getElementsByName('evaluacion_3')[6].value,
					H37: document.getElementsByName('hallazgos_3_7')[0].value,
					E38: document.getElementsByName('evaluacion_3')[7].value,
					H38: document.getElementsByName('hallazgos_3_8')[0].value,
					E39: document.getElementsByName('evaluacion_3')[8].value,
					H39: document.getElementsByName('hallazgos_3_9')[0].value,
					E310: document.getElementsByName('evaluacion_3')[9].value,
					H310: document.getElementsByName('hallazgos_3_10')[0].value,
					E311: document.getElementsByName('evaluacion_3')[10].value,
					H311: document.getElementsByName('hallazgos_3_11')[0].value,
					E312: document.getElementsByName('evaluacion_3')[11].value,
					H312: document.getElementsByName('hallazgos_3_12')[0].value,
					EB3: document.getElementsByName('evalBloque3')[0].value,
					E41: document.getElementsByName('evaluacion_4')[0].value,
					H41: document.getElementsByName('hallazgos_4_1')[0].value,
					E42: document.getElementsByName('evaluacion_4')[1].value,
					H42: document.getElementsByName('hallazgos_4_2')[0].value,
					E43: document.getElementsByName('evaluacion_4')[2].value,
					H43: document.getElementsByName('hallazgos_4_3')[0].value,
					E44: document.getElementsByName('evaluacion_4')[3].value,
					H44: document.getElementsByName('hallazgos_4_4')[0].value,
					E45: document.getElementsByName('evaluacion_4')[4].value,
					H45: document.getElementsByName('hallazgos_4_5')[0].value,
					E46: document.getElementsByName('evaluacion_4')[5].value,
					H46: document.getElementsByName('hallazgos_4_6')[0].value,
					EB4: document.getElementsByName('evalBloque4')[0].value,
				};
				evaluado = Object.assign( evaluado, evaluadoEsta, adicional );
				break;
			case '596':
				evaluadoEsta = guardarEvaluadosEstablecimientos(formulario);
				reducido = guardarEvaluadoReducido(formulario);
				let iterableNuevo = document.getElementsByName('pregunta');
				let iterableObservaciones = document.getElementsByName('observaciones');
				let arregloPreguntasNuevo = [];
				let arregloObservaciones = []
				iterableNuevo.forEach( item => arregloPreguntasNuevo.push(item.value) );
				iterableObservaciones.forEach( item => arregloObservaciones.push(item.value) );
				adicional = {
					FAX: document.getElementsByName('fax' + formulario)[0].value,
					DIR_NOT: document.getElementsByName('dirNotif' + formulario)[0].value,
					DPTO_NOTI: document.getElementsByName('deptoNotif' + formulario)[0].value,
					MPIO_NOTI: document.getElementsByName('mpioNotif' + formulario)[0].value,
					PRODUCTO: document.getElementsByName('producto' + formulario)[0].value,
					PREGUNTAS: arregloPreguntasNuevo,
					OBSERVACIONES: arregloObservaciones
				};
				evaluado = Object.assign( evaluadoEsta, reducido, adicional );
				localStorage.setItem('form', '596');
				break;
			case '443':
				reducido = guardarEvaluadoReducido(formulario);
				evaluadoEsta = guardarEvaluadosEstablecimientos(formulario);
				delete reducido.NOMBRE_F2; 
				delete reducido.ID_F2;
				delete reducido.CARGO_F2;
				delete reducido.NOMBRE_E2;
				delete reducido.ID_E2;
				delete reducido.CARGO_E2;
				delete reducido.FIRMA_F2;
				delete reducido.FIRMA_E2;
				tipocarne = [];
				for (let i = 0; i < document.getElementsByName('tipoCarneExpende').length; i++){
					document.getElementsByName('tipoCarneExpende')[i].checked ? tipocarne.push(document.getElementsByName('tipoCarneExpende')[i].value) : console.log(i);
				}
				adicional = {
					TIPOCARNE: JSON.stringify(tipocarne),
					OTRAS: document.getElementsByName('otrasEspecies' + formulario)[0].value,
					OTIPOPRO: document.getElementsByName('otrosProductos' + formulario)[0].value,
					SOPROVIS: document.getElementsByName('provisional' + formulario)[0].value,
					VISITO: document.getElementsByName('funcUltVisita' + formulario)[0].value,
					VISITADO: document.getElementsByName('visitado' + formulario)[0].value,
					HORARIOS: document.getElementsByName('horarios' + formulario)[0].value,
					NUTRA: document.getElementsByName('noTrabajadores' + formulario)[0].value,
					F_UV: document.getElementsByName('fechaUltVisita' + formulario)[0].value,
					CCUV: document.getElementsByName('concepto' + formulario)[0].value,
					CUV: document.getElementsByName('textoConcepto' + formulario)[0].value,
					UV_P: document.getElementsByName('porcentaje' + formulario)[0].value,
					OBS_ES: document.getElementsByName('obPersona' + formulario)[0].value,
				};
				evaluado = Object.assign( reducido, evaluadoEsta, adicional );
				localStorage.setItem('form', '443');
				break;
			case '333':
				reducido = guardarEvaluadoReducido(formulario);
				evaluadoEsta = guardarEvaluadosEstablecimientos(formulario);
				delete evaluadoEsta.MAMER;
				delete evaluadoEsta.NOCO;
				delete evaluadoEsta.TERRITORIO;
				let longitud = document.getElementsByName('Orden');
				let muestras = [];
				console.log("Longitud del arrglo de muestras", longitud.length);
				for(let i=0; i<longitud.length; i++){
					muestras.push(
						{
							acta: document.getElementsByName('acta' + formulario)[0].value,
							Orden: document.getElementsByName('Orden')[i].value,
							Um: document.getElementsByName('Um')[i].value,
							Contenido: document.getElementsByName('Contenido')[i].value,
							Producto: document.getElementsByName('Producto')[i].value,
							Temperatura: document.getElementsByName('Temperatura')[i].value,
							TipoEnvase: document.getElementsByName('TipoEnvase')[i].value,
							LoteFechaV: document.getElementsByName('LoteFechaV')[i].value,
							RegSanit: document.getElementsByName('RegSanit')[i].value
						}
					);
				}
				adicional = {
					FECHA2: document.getElementsByName('fecha' + formulario + '-2')[0].value,
					HORA2: document.getElementsByName('hora' + formulario + '-2')[0].value,
					T2: document.getElementsByName('temperatura' + formulario + '-2')[0].value,
					OBJETO: document.getElementsByName('objeto' + formulario)[0].value,
					MUESTRAS: muestras
				};
				evaluado = Object.assign( reducido, evaluadoEsta, adicional );
				localStorage.setItem('form', '333');
				break;
			case '243':
				reducido = guardarEvaluadoReducido(formulario);
				evaluadoEsta = guardarEvaluadosEstablecimientos(formulario);
				delete evaluadoEsta.MAMER;
				delete evaluadoEsta.NOCO;
				delete evaluadoEsta.TERRITORIO;
				let longitudCong = document.getElementsByName('producto');
				let muestrasCong = [];
				console.log("Longitud del arreglo de muestras", longitudCong.length);
				for(let i=0; i<longitudCong.length; i++){
					muestrasCong.push(
						{
							acta: document.getElementsByName('acta' + formulario)[0].value,
							producto: document.getElementsByName('producto')[i].value,
							lote: document.getElementsByName('lote')[i].value,
							presentaci: document.getElementsByName('presentaci')[i].value,
							cantidad: document.getElementsByName('cantidad')[i].value,
							fv: document.getElementsByName('fv')[i].value,
							invima: document.getElementsByName('invima')[i].value
						}
					);
				}
				adicional = {
					REQUES: document.getElementsByName('requerimientos243')[0].value,
					OBJETO: document.getElementsByName('objeto' + formulario)[0].value,
					MUESTRAS: muestrasCong
				};
				evaluado = Object.assign( reducido, evaluadoEsta, adicional );
				console.log();
				localStorage.setItem('form', '243');
				break;
			case '26':
				reducido = guardarEvaluadoReducido(formulario);
				console.log("Reducido: ", reducido);
				delete reducido.NOMBRE_P; 
				delete reducido.TID_P; 
				delete reducido.DOC_P; 
				delete reducido.N_INSCRIP; 
				delete reducido.CARGO_F1; 
				delete reducido.NOMBRE_F2; 
				delete reducido.ID_F2;
				delete reducido.CARGO_F2;
				delete reducido.CARGO_E1;
				delete reducido.NOMBRE_E2;
				delete reducido.ID_E2;
				delete reducido.CARGO_E2;
				delete reducido.FIRMA_F2;
				delete reducido.FIRMA_E2;
				console.log("Reducido Depurado: ", reducido);			
				evaluadoEsta = guardarEvaluadosEstablecimientos(formulario);
				delete evaluadoEsta.MAMER;
				adicional = {
					HORA: document.getElementsByName('hora26')[0].value,
					ZONA: document.getElementsByName('zona26')[0].value,
					TIPO_SU: document.getElementsByName('tipoSujeto26')[0].value,
					SUJETO: document.getElementsByName('sujeto26')[0].value,
					FAX: document.getElementsByName('fax' + formulario)[0].value,
					TIPOVIS: document.getElementsByName('tipoVisita26')[0].value,
					NTIPOVIS: document.getElementsByName('tipoVisita26')[0].value == '1' ? "IVC" : 
							document.getElementsByName('tipoVisita26')[0].value == '2' ? "QUEJA SANITARIA" : "",
					REQUERI_AU: document.getElementsByName('obPersona' + formulario)[0].value,
					NOMBRE_T1: document.getElementsByName('testigo26')[0].value,
					ID_T1: document.getElementsByName('idTestigo26')[0].value,
					FIRMA_T1: ''
				};
				evaluado = Object.assign( evaluadoEsta, reducido, adicional );
				localStorage.setItem('form', '26');
				break;
			case '441':
				evaluadoVehi = guardarEvaluadosVehiculos(formulario);
				adicional = {
					NOMBRE_CO: document.getElementsByName('conductor441')[0].value,
					TID_CO: document.getElementsByName('tipoIdCond441')[0].value,
					DOC_CO: document.getElementsByName('idConductor441')[0].value,
					REMOLQUE: document.getElementsByName('rmque441')[0].value,
					PLACAREM: document.getElementsByName('placaRemolque441')[0].value,
					SEMIREM: document.getElementsByName('srmque441')[0].value,
					PLACASEMI: document.getElementsByName('placaSrmque441')[0].value,
					TIPOPRO: document.getElementsByName('producto441')[0].value,
					E53: document.getElementsByName('evaluacion_5')[2].value,
					H53: document.getElementsByName('hallazgos_5_3')[0].value
				};
				evaluado = Object.assign( evaluado, evaluadoVehi, adicional );
				break;
			case '472':
				evaluadoVehi = guardarEvaluadosVehiculos(formulario);
				adicional = {
					ESTACAS: document.getElementsByName('camioneta472')[0].value, 
					FURGON: document.getElementsByName('camion472')[0].value,
					MOTOCAR: document.getElementsByName('moto472')[0].value,
					TIPOPRO: document.getElementsByName('producto72')[0].value,
					OTRO: document.getElementsByName('otro472')[0].value
				};
				evaluado = Object.assign( evaluado, evaluadoVehi, adicional);
				break;
		}
	
		//console.log("Estructura de evaluado en formulario " + formulario + " para revisión: " + JSON.stringify(evaluado));
		
		localStorage.setItem('evaluado', JSON.stringify(evaluado));
		firmaEvaluacion(formulario);
		//persistirEvaluado(db, evaluado);
		//location.reload();
	}

}

function escogerEvaluado(registro){
	let cuerpo = document.getElementById('cuerpoRespuesta');
	cuerpo.innerHTML = '';
	let arrayKeys = Object.keys(registro);
	let arrayToRemove = ['FIRMA_F1', 'FIRMA_F2', 'FIRMA_E1', 'FIRMA_E2', 'FIRMA_T1', '_id', '_rev'];
	arrayToRemove.forEach(element => {
		let indice = arrayKeys.indexOf(element);
		if (indice !== -1){
			arrayKeys.splice(indice, 1);
		}
	});
	arrayKeys.forEach(element => {
		let texto = document.createElement('p');
		element == 'MUESTRAS' ? 
			texto.innerHTML = element + ': ' + JSON.stringify(registro[element]) : 
			texto.innerHTML = element + ': ' + registro[element];
		cuerpo.appendChild(texto);
	});
}

function createRadioEvaluado(registro){
	var radio = document.createElement('input');
	radio.type = 'radio';
	radio.setAttribute('name',"seleEvaluado");
	radio.value = registro._id;
	radio.setAttribute( 'data-toggle', 'modal');
	radio.setAttribute( 'data-target', '#resp');
	radio.addEventListener('click', escogerEvaluado.bind(this, registro));

	var span = document.createElement('span');
	span.className = 'input-group-addon';
	span.appendChild(radio);

	var td = document.createElement('td');
	td.appendChild(span);

	return td;
}

function setColumnas(tr, registro, contador, evaluado){
	tr.appendChild(createColumns(contador));
	evaluado == 'V' ? 
		(registro.PLACA === null ? 
			tr.appendChild(createColumns(registro.PLACAREM)) : 
			tr.appendChild(createColumns(registro.PLACA))) : 
		evaluado == 'E' ? tr.appendChild(createColumns(registro.NOCO)) : tr.appendChild(createColumns(registro.RSO));
	tr.appendChild(createColumns(registro.ACTA));
	tr.appendChild(createColumns(registro.FECHA));
	evaluado == 'D' ? tr.appendChild(createColumns(registro.OBS_AS)) : 
		evaluado == 'C' ? 
			tr.appendChild(createColumns(registro.SUJETO)) : 
			evaluado == 'B' ?
				tr.appendChild(createColumns(registro.PRODUCTO)) :
				tr.appendChild(createColumns(registro.P_CUMPL));
	evaluado == 'D' || evaluado == 'C' || evaluado == 'B' ? null : tr.appendChild(createColumns(registro.CONCEPTO));
	tr.appendChild(createRadioEvaluado(registro));
	return tr;		
}

function traerEvaluados(db, evaluado){
	db.allDocs({include_docs: true, descending: true}).then ( doc => {
		var tbody = document.getElementById('evaluados');
		tbody.innerHTML = '';
		var contador = 0;
		doc.rows.forEach( registro => {
			//console.log("Evaluado: ", registro);
			contador++;
			var tr = document.createElement('tr');
			tr = setColumnas(tr, registro.doc, contador, evaluado);
			tbody.appendChild(tr);
		});
		$('#tablaEvaluados').DataTable();
	});
}

function mostrarEvaluados(formulario){
	switch(formulario){
		case '440':
			traerEvaluados(db440, 'E');
			validarCambioTab(2);
			break;
		case '443':
			traerEvaluados(db443, 'D');
			validarCambioTab(0);
			break;
		case '474':
			traerEvaluados(db474, 'E');
			validarCambioTab(2);
			break;
		case '479':
			traerEvaluados(db479, 'E');
			validarCambioTab(2);
			break;
		case '480':
			traerEvaluados(db480, 'E');
			validarCambioTab(2);
			break;
		case '495':
			traerEvaluados(db495, 'E');
			validarCambioTab(2);
			break;
		case '478':
			traerEvaluados(db478, 'E');
			validarCambioTab(2);
			break;
		case '475':
			traerEvaluados(db475, 'E');
			validarCambioTab(2);
			break;
		case '481':
			traerEvaluados(db481, 'E');
			validarCambioTab(2);
			break;
		case '333':
			traerEvaluados(db333, 'D');
			validarCambioTab(0);
			break;
		case '243':
			traerEvaluados(db243, 'D');
			validarCambioTab(0);
			break;
		case '442':
			traerEvaluados(db442, 'D');
			validarCambioTab(3);
			break;
		case '596':
			traerEvaluados(db596, 'B');
			validarCambioTab(1);
			break;
		case '245':
			traerEvaluados(db245, 'E');
			validarCambioTab(2);
			break
		case '26':
			traerEvaluados(db26, 'C');
			break;
		case '441':
			traerEvaluados(db441, 'V');
			validarCambioTab(2);
			break;
		case '472':
			traerEvaluados(db472, 'V');
			validarCambioTab(2);
			break;
	}
}

function validarCambioTab(i){
	let listCheckboxes = document.getElementsByName('seleInscrito');
	let arreglo = Array.from(listCheckboxes);
	let check = arreglo.map( elemento => {
		return elemento.checked; 
	});	
	let verificador = check.indexOf(true);
	if (verificador == -1) {
		if(i == 10){
			console.log("Se retorna false");
			return false;
		}else{
			document.getElementsByName('alertaInscrito')[i].style.display = "block";
		}
	}else{
		console.log("Se retorna true");
		return true;
	}
}