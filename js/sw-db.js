var db493 = new PouchDB('inscritosCargados493');
var dbNuevos493 = new PouchDB('inscritosNuevos493');
var db569 = new PouchDB('inscritosCargados569');
var dbNuevos569 = new PouchDB('inscritosNuevos569');
var db444 = new PouchDB('inscritosCargados444');
var dbNuevos444 = new PouchDB('inscritosNuevos444');

var db440 = new PouchDB('evaluaciones440');
var db474 = new PouchDB('evaluaciones474');
var db479 = new PouchDB('evaluaciones479');
var db480 = new PouchDB('evaluaciones480');
var db495 = new PouchDB('evaluaciones495');
var db478 = new PouchDB('evaluaciones478');
var db475 = new PouchDB('evaluaciones475');
var db481 = new PouchDB('evaluaciones481');
var db442 = new PouchDB('evaluaciones442');
var db333 = new PouchDB('evaluaciones333');

var db441 = new PouchDB('evaluaciones441');
var db472 = new PouchDB('evaluaciones472');


db493.changes({
	since: 'now',
	live: true
}).on('change', function(changes){
	mostrarInscritos493('493');
});

db569.changes({
	since: 'now',
	live: true
}).on('change', function(changes){
	mostrarInscritos569('569');
});

db444.changes({
	since: 'now',
	live: true
}).on('change', function(changes){
	mostrarInscritos444('444');
});

/*dbNuevos493.changes({
	since: 'now',
	live: true
}).on('change', mostrarInscritos493);

dbNuevos569.changes({
	since: 'now',
	live: true
}).on('change', mostrarInscritos569);

dbNuevos444.changes({
	since: 'now',
	live: true
}).on('change', mostrarInscritos444);*/


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
		case '333':
			db = db333;
			break;
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
		eva.FIRMA_E2 = localStorage.getItem('firmaIns2');
		eva.FIRMA_F1 = localStorage.getItem('firmaAut1');
		eva.FIRMA_F2 = localStorage.getItem('firmaAut2');
		
		persistirEvaluado(db, eva, formulario);
		
		localStorage.removeItem('evaluado');
		localStorage.removeItem('firmaAut1');
		localStorage.removeItem('firmaAut2');
		localStorage.removeItem('firmaIns1');
		localStorage.removeItem('firmaIns2');
	}
}

function verificarAccionForm(formulario){
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
	let codUsuario = localStorage.getItem('codigoUsuario');
	return db.info().then( result => {
		var ultimo = result.doc_count!=0 ? result.doc_count + 1: result.doc_count = 1;
		let indice = calcularIndice(ultimo);
		let fecha = calcularFecha();
		let year = fecha.anio.toString()
		let cadenaFecha = fecha.dia + fecha.mes + year.substring(2, 4);
		//console.log(indice);
		let acta = formulario + codUsuario + cadenaFecha + indice;
		console.log(acta);
		return acta;
	});
}

function escogerInscrito(registro, formulario){

	document.getElementsByName('fax' + formulario)[0].value = registro.FAX;
	document.getElementsByName('tel' + formulario)[0].value = registro.TELS;
	document.getElementsByName('cel' + formulario)[0].value = registro.CELULAR;
	document.getElementsByName('correoProp' + formulario)[0].value = registro.CORREO;
	document.getElementsByName('direccion' + formulario)[0].value = registro.DIRECC;
	document.getElementsByName('inscripcion' + formulario)[0].value = registro.N_INSCRIP;
	document.getElementsByName('propietario' + formulario)[0].value = registro.NOMBRE_P;
	document.getElementsByName('idPropietario' + formulario)[0].value = registro.DOC_P;
	document.getElementsByName('deptoNotif' + formulario)[0].value = registro.DPTO_NOT;
	document.getElementsByName('mpioNotif' + formulario)[0].value = registro.MPIO_NOT;
	document.getElementsByName('tipoIdProp' + formulario)[0].value = registro.TID_P;
	
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
		document.getElementsByName('nit' + formulario)[0].value = registro.NIT;
		document.getElementsByName('nomTerr' + formulario)[0].value = registro.NOLOCA;
		document.getElementsByName('matriculaMercantil' + formulario)[0].value = registro.MAMER;

		if (registro.TERRITORIO != undefined) {
			console.log('Territorio: ', registro.TERRITORIO);
			switch(registro.TERRITORIO){
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

		if (formulario != '442'){
			document.getElementsByName('concepto' + formulario)[0].value = registro.CCUV;
			document.getElementsByName('textoConcepto' + formulario)[0].value = registro.CUV;
			document.getElementsByName('fechaUltVisita' + formulario)[0].value = registro.F_UV;
		}	
	}

	if(formulario == '493' || formulario == '569'|| formulario == '444'){
		console.log('Debería estar en ' + formulario);
		document.getElementsByName('id' + formulario)[0].value = registro._id;
		document.getElementsByName('fecha' + formulario)[0].value = registro.FECHA;
		document.getElementsByName('obAutoridad' + formulario)[0].value = registro.OBSERVA_AU;
		document.getElementsByName('obPersona' + formulario)[0].value = registro.OBSERVA_F1;
		document.getElementsByName('inscribe' + formulario)[0].value = registro.NOMBRE_E1;
		document.getElementsByName('idInscribe' + formulario)[0].value = registro.ID_E1;
		document.getElementsByName('recibe' + formulario)[0].value = registro.NOMBRE_F1;
		document.getElementsByName('idRecibe' + formulario)[0].value = registro.ID_F1;

		if(!formulario == '444'){
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
			document.getElementsByName('acta' + formulario)[0].value = acta;
		});
		
		let alerta = document.getElementsByName('alertaInscrito');
		let arreglo = Array.from(alerta); //en este caso alerta es un iterable pero no un arreglo, hay que convertirlo primero
		let arr = arreglo.map( item => {
			item.style.display = "none";
			return item;
		});
		document.getElementsByName('entidad' + formulario).value = registro.ENTIDAD;
	}

	if (formulario == '493') {
		console.log('Estamos en ' + formulario);
		console.log("registro.actividad", registro.ACTIVIDAD);
		
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
					mapActividad.set(registro.ACTIVIDAD[valor],valor);
					j++;
				}
				//var mapActividad = new Map(registro.ACTIVIDAD);
				console.log(mapActividad);
				console.log(JSON.stringify(registro.ACTIVIDAD));

				$('input:checkbox[name=actividad'+formulario+']').prop('checked', false);

				for (var i = 0; i < actividad.length; i++) {
					//console.log(actividad[i]);
					//console.log(mapActividad.has(actividad[i]));
					mapActividad.has(actividad[i]) ? $('input:checkbox[value='+actividad[i]+']').prop('checked', true) : $('input:checkbox[value='+actividad[i]+']').prop('checked', false);			
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
		document.getElementsByName('idRepLegal' + formulario)[0].value = registro.DOC_RL;
	}

	if(formulario == '569'){
		document.getElementsByName('dependencia' + formulario)[0].value = registro.DEPENDEN;
		document.getElementsByName('expendio' + formulario)[0].value = registro.EXPENDIO;
		document.getElementsByName('almacena' + formulario)[0].value = registro.ALMACENA;
		document.getElementsByName('deposito' + formulario)[0].value = registro.DEPOSITO;
		document.getElementsByName('despresa' + formulario)[0].value = registro.DESPRESA;
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
		var filas = doc.rows.map( registro => {
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
				default:
			}
			contador++;
			var tr = document.createElement('tr');
			tr.appendChild(createColumns(contador));
			tr.appendChild(createColumns(registro.doc._id));
			tr.appendChild(createColumns(extra));
			tr.appendChild(createColumns(registro.doc.N_INSCRIP));
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

	/*dbNuevos493.allDocs({include_docs: true, descending: true}).then ( doc => {
		crearTabla(doc, 'inscritosNuevos', '#tablaInscritosNuevos', '493');
	});*/
}

function mostrarInscritos569(formulario){
	db569.allDocs({include_docs: true, descending: true}).then ( doc => {
		crearTabla(doc, 'inscritos569', '#tablaInscritos569', '569', formulario);
	});
}

function mostrarInscritos444(formulario){
	db444.allDocs({include_docs: true, descending: true}).then ( doc => {
		crearTabla(doc, 'inscritos444', '#tablaInscritos444', '444', formulario);
	});
}

/*function eliminarInscritos(){
	db493.destroy().then(resp => console.log);
}*/

function guardarTraidos(formulario, dbBase, respObj){
	dbBase.destroy().then( response => {
		console.log('Base de datos anterior eliminada');
		dbBase = new PouchDB('inscritosCargados' + formulario);
		console.log('Nueva base de datos creada');
		
		let count = 0;
		let long = respObj.length;
		respObj.forEach( registro => {
			//console.log('Registro: ',registro);
			let indice  = calcularIndice(registro.id);
					
			if (registro.ACTIVIDAD) {
				registro.ACTIVIDAD = JSON.parse(registro.ACTIVIDAD);	
			}
			
			var id = { _id: indice };
			// Con la siguiente línea se añade la variable _id al objeto			
			registro = Object.assign(id,registro);   
			//console.log('Registro: ',registro);
			dbBase.put(registro, function callback(err, result){
				if (!err) {
					if (count != long - 1) {
						count++;
						console.log('inscrito guardado en base de datos: ', count);	
					}else{
						alert("Inscritos formulario " + formulario + " cargados correctamente");
						localStorage.removeItem('Accion');
					}
				}else {
					console.log('problemas guardando inscrito en base de datos', err);
				}
			});
		});
	});	
}

function cerrarSesionServidor(){
	var identidad = JSON.parse(localStorage.getItem('identity'));
	if (identidad != undefined) {
		fetch('https://sisbenpro.com/public/cerrarSesion/' + identidad.usuario)
		.then( res => res.json() )
		.then( jsonRes => alert(jsonRes.res) )
		.catch( err => alert("Problemas en la respuesta del servidor " + err) );
		localStorage.removeItem('identity');
	}else{
		alert('No hay una sesión abierta con el servidor en este momento');
	}
	
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
			fetch('https://sisbenpro.com/public/inscritosVisual', {
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
			.catch( error=>error.json() );
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
	}
	return db;
}

//Aquí se usa la función json(), que funciona similar a JSON.parse()
function cargarInscritos(formulario){
	let db = dbInscritosFromForm(formulario);
	//if(!localStorage.getItem('identity')){
		localStorage.getItem('Accion') == 'cargarInscritos' + formulario ? 
			localStorage.removeItem('Accion') :
			localStorage.setItem('Accion', 'cargarInscritos' + formulario);
	//}
	var promesa = fetchInscritos(formulario);
	promesa.then( respObj => {
		if (respObj.err != undefined) {
			respObj.err == "ERROR TOKEN" ? 
			alert('Hubo problemas con el servidor. Es necesario cerrar Sesión con el servidor y volver a introducir credenciales') : 
			alert('Error: ' + respObj.err);
		}else{
			guardarTraidos(formulario, db, respObj);
				//cerrarSesionServidor();
		}		
	}).catch( err => console.log('Error: ', err) );
}

function cargarTodosLosInscritos(){
//	if(!localStorage.getItem('identity')){
		localStorage.getItem('Accion') == 'cargarTodosLosInscritos' ?
			localStorage.removeItem('Accion') :
			localStorage.setItem('Accion', 'cargarTodosLosInscritos');
//	}	
	let promesa = fetchInscritos('493');
	promesa.then( respObj => {
		if (respObj.err != undefined) {
			respObj.err == "ERROR TOKEN" ? 
			alert('Hubo problemas con el servidor. Es necesario cerrar Sesión con el servidor y volver a introducir credenciales') : 
			alert('Error: ' + respObj.err);
			return;
		}	
		guardarTraidos('493', db493, respObj);
		let promesa1 = fetchInscritos('569');
		promesa1.then( respObj1 => {
			guardarTraidos( '569', db569, respObj1 );
			let promesa2 = fetchInscritos('444');
			localStorage.removeItem('Accion');
			promesa2.then ( respObj2 => guardarTraidos( '444', db444, respObj2 ) )
					.catch( err2 => console.log('Error', err2 ) );
		}).catch( err1 => console.log('Error: ', err1) );

	}).catch( err => console.log('Error: ', err) );	
}

function fetchEvaluados(doc, formulario){
	var credenciales = JSON.parse(localStorage.getItem('identity'));
	let credentials = {
		nombreUsuario: credenciales.usuario,
		token: credenciales.token,
		formulario: formulario
	};
	let bigDoc = Object.assign(credentials, doc);
	let data = JSON.stringify(bigDoc);
	//console.log(data);
	return new Promise((resolve, reject) => {
		fetch('https://sisbenpro.com/public/evaluacionesTabla', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: data
		}).then( res => {
			if(res.status == 500){
				return fetchEvaluados(doc, formulario)
				.then( () => setTimeout( () => alert("Registros cargados en servidor"), 1500) );	
			}else{
				resolve([res.status, doc._id]);
			} 
		})
		.catch( err => reject(err) );
	});
}

function cargarServidor(formulario){
	localStorage.getItem('Accion') == 'cargarServidor' ?
			localStorage.removeItem('Accion') :
			localStorage.setItem('Accion', 'cargarServidor');

	if (verificarSesion()) {
		let db = dbActasForm(formulario);
		localStorage.removeItem('Accion');	
		db.allDocs({include_docs: true, descending: true}).then( doc => {
			console.log('Cantidad de registros en indexDB para este formulario: ', doc.rows.length);
			let promesas = doc.rows.map( registro => fetchEvaluados(registro.doc, formulario));
			console.log(promesas);
			Promise
				.all(promesas)
				.then( () => alert("Registros cargados en servidor") )
				.catch( (err) => alert("Problemas con el envío de registros: ", err ) );
		})	
	} else{
		location.assign("./loginserver.html");
	}
}

function persistirInscrito(dbBase, dbNuevos, inscrito, idExistente){
	//var id = 0;
	if(idExistente == 0){
		dbBase.info().then( result => {
			var ultimo = result.doc_count + 1;
			let indice  = calcularIndice(ultimo);
			//console.log(indice);
			var insertar = { _id: indice };
			inscrito = Object.assign( insertar, inscrito );
			//console.log(inscrito);

			dbBase.put(inscrito, function callback(err, result){
				if (!err) {
					alert('inscrito guardado en base de datos');
				}else {
					alert('problemas guardando inscrito en base de datos',err);
				}
			});
			dbNuevos.put(inscrito, function callback(err, result){
				if (!err) {
					console.log('inscrito guardado en base de datos');
				}else {
					console.log('problemas guardando inscrito en base de datos');
				}
			});					
		});					
	}else{
		//id = idExistente;
		var insertar;
		dbBase.get(idExistente).then( doc => {
			insertar = { 
				_id: doc._id,
				_rev: doc._rev
			};
			inscrito = Object.assign(insertar, inscrito);
			dbBase.put(inscrito, function callback(err, result){
				if (!err) {
					alert('inscrito modificado en base de datos');
				}else {
					alert('problemas modificando inscrito en base de datos: '+err);
					console.log(err);
				}
			});
			/*delete inscrito._rev;
			delete inscrito._id;
			id = new Date().toISOString();
			insertar = { _id: id };
			inscrito = Object.assign( insertar, inscrito );
			console.log(inscrito);
			dbNuevos.put(inscrito, function callback(err, result){
				if (!err) {
					console.log('inscrito modificado en base de datos');
				}else {
					console.log('problemas modificando inscrito en base de datos: ',err);
				}
			});  Dejar esto comentado por si las...*/
		});
	}
}

function guardarComunesInscritos(formulario){

	var inscrito = {
		//Campos comunes a todos los formularios en general
		
		/*DPPTO: document.getElementsByName('depto' + formulario)[0].value,
		CODEPTO: 76,
		CIUDAD: document.getElementsByName('mpio' + formulario)[0].value,
		COMUN: 130,*/
		FECHA: document.getElementsByName('fecha' + formulario)[0].value,
		N_INSCRIP: document.getElementsByName('inscripcion' + formulario)[0].value,
		//ENTIDAD: 'SECRETARÍA DE SALUD MUNICIPAL',
		NOMBRE_P: document.getElementsByName('propietario' + formulario)[0].value,
		TID_P: document.getElementsByName('tipoIdProp' + formulario)[0].value,
		DOC_P: document.getElementsByName('idPropietario' + formulario)[0].value,
		FAX: document.getElementsByName('fax' + formulario)[0].value,
		TELS: document.getElementsByName('tel' + formulario)[0].value,
		CORREO: document.getElementsByName('correoProp' + formulario)[0].value,
		DIRECC: document.getElementsByName('direccion' + formulario)[0].value,
		DIR_NOT: document.getElementsByName('dirNotif' + formulario)[0].value,
		DPTO_NOTI: document.getElementsByName('deptoNotif' + formulario)[0].value,
		MPIO_NOTI: document.getElementsByName('mpioNotif' + formulario)[0].value,
		FIRMA_F1: localStorage.getItem('firmaAutoridad'),
		FIRMA_E1: localStorage.getItem('firmaInscribe'),
		AUTORIZA: document.getElementsByName('autorizaNoti' + formulario)[0].value,
		
		//Campos comunes a los formularios de inscripción 493, 444, 569
		CELULAR: document.getElementsByName('cel' + formulario)[0].value,
		OBSERVA_AU: document.getElementsByName('obAutoridad' + formulario)[0].value,
		OBSERVA_F1: document.getElementsByName('obPersona' + formulario)[0].value,
		NOMBRE_F1: document.getElementsByName('inscribe' + formulario)[0].value,
		ID_F1: document.getElementsByName('idInscribe' + formulario)[0].value,
		NOMBRE_E1: document.getElementsByName('recibe' + formulario)[0].value,
		ID_E1: document.getElementsByName('idRecibe' + formulario)[0].value,
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
		CUV: document.getElementsByName('textoConcepto' + formulario)[0].value,
		F_UV: document.getElementsByName('fechaUltVisita' + formulario)[0].value,
		DIR_NOT_E: document.getElementsByName('funcUltVisita' + formulario)[0].value,
		MAMER: document.getElementsByName('matriculaMercantil' + formulario)[0].value,
		NOLOCA: document.getElementsByName('nomTerr' + formulario)[0].value,
		VISITADO: document.getElementsByName('visitado' + formulario)[0].value,
		
		TERRITORIO: territorio
	}

	return inscrito;
}

function firmaInscripcion() {
	window.location.assign('firmaInscripcion.html');
}

function firmaEvaluacion(){
	window.location.assign('firmaEvaluacion.html');
}

function guardarInscrito493(){
	var idExistente = document.getElementsByName('id493')[0].value;

	var inscrito = guardarComunesInscritos('493');
	var inscritoEsta = guardarComunesEstablecimientos('493');
	
	var actividad = [];
	for (var i = 0; i < document.getElementsByName('actividad493').length; i++) {
		document.getElementsByName('actividad493')[i].checked ? actividad.push(document.getElementsByName('actividad493')[i].value) : console.log(i); 
		//console.log(actividad[i].checked ? actividad[i].value : 'No aplica');
	};

	console.log(document.getElementsByName('territorio493'));

	var adicional = {		
		ZONA: document.getElementsByName('zona493')[0].value,
		ACTIVIDAD: actividad,
		CARGO_F1: document.getElementsByName('cargoRecibe493')[0].value,
		CARGO_E1: document.getElementsByName('cargoInscribe493')[0].value,
		ACTIVO: '',					//campos no funcionales que es mejor remover
		GRABADO: ''					//campos no funcionales que es mejor remover
	};

	inscrito = Object.assign( inscrito, inscritoEsta, adicional );
	
	persistirInscrito(db493, dbNuevos493, inscrito, idExistente);
}

function guardarInscrito444(){
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
	
	persistirInscrito(db444, dbNuevos444, inscrito, idExistente);
}

function guardarInscrito569(){
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
	};
	
	inscrito = Object.assign( inscrito, inscritoEsta, adicional );
	
	persistirInscrito(db569, dbNuevos569, inscrito, idExistente);
}

function guardarComunesEvaluados(formulario){
	var fecha = document.getElementsByName('fecha' + formulario)[0].value;

	var evaluado = {
		//Campos comunes a todos los formularios en general
		FECHA: fecha,
		//ACTA: document.getElementsByName('acta' + formulario)[0].value,
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
		/* NMOTIVO: document.getElementsByName('motivo' + formulario)[0].value,
		MOTIVO: document.getElementsByName('textoMotivo' + formulario)[0].value, */
		AUTORIZA: document.getElementsByName('autorizaNoti' + formulario)[0].value,
		CONCEPTO: document.getElementsByName('conceptoEval' + formulario)[0].value,
		P_CUMPL: document.getElementsByName('cumplimiento' + formulario)[0].value,
		N_MUESTRAS: document.getElementsByName('numeroMuestras' + formulario)[0].value,
		N_ACTAS: document.getElementsByName('numeroActa' + formulario)[0].value,
		AMS: document.getElementsByName('medidaSeguridad' + formulario)[0].value,
		DETA_MS: document.getElementsByName('medida' + formulario)[0].value,

		//ACTA, UV_P, HORARIOS, NUTRA, son los únicos campos que son exclusivos de las evaluaciones, los otros son comunes con los inscritos
		
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
		GRABADO: 'S'
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
		NOMBRE_RL: document.getElementsByName('repLegal' + formulario)[0].value,
		TID_RL: document.getElementsByName('tipoIdRl' + formulario)[0].value,
		DOC_RL: document.getElementsByName('idRepLegal' + formulario)[0].value,
		NOCO: document.getElementsByName('nombreComercial' + formulario)[0].value,
		RSO: document.getElementsByName('razonSocial' + formulario)[0].value,
		NIT: document.getElementsByName('nit' + formulario)[0].value,
		MAMER: document.getElementsByName('matriculaMercantil' + formulario)[0].value,
		NOLOCA: document.getElementsByName('nomTerr' + formulario)[0].value,
		TERRITORIO: territorio
	};
	
	return evaluado;	
}

/*function validarEvaluado(evaluado){
	
}*/

function persistirEvaluado(db, evaluado, formulario){
	calcularNumActa(formulario).then( acta => {
		var insertar = { _id: acta.substring(11, 15), ACTA: acta };
		evaluado = Object.assign( insertar, evaluado );
		console.log(evaluado);

		db.put(evaluado, function callback(err, result){
			if (!err) {
				alert('evaluado guardado en base de datos');
				location.reload();
			}else {
				alert('problemas guardando evaluado en base de datos: ', err);
			}
		});
	});
	
}

function guardarEvaluacion(formulario){
	let evaluado;
	formulario != '333' ? evaluado = guardarComunesEvaluados(formulario) : null;
	let preguntasComunes;
	let evaluadoEsta;
	let evaluadoVehi;
	
	switch(formulario){
		case '440':
			var tipocarne;
			var adicional;
			var tipoEsta = [];
			preguntasComunes = comunesEvaluadosEstabPreguntas(formulario);
			evaluadoEsta = guardarEvaluadosEstablecimientos(formulario);
	
			for (let i = 0; i < document.getElementsByName('tipoCarneExpende').length; i++){
				tipocarne = document.getElementsByName('tipoCarneExpende')[i].checked ? document.getElementsByName('tipoCarneExpende')[i].value : console.log(i);
			}
			adicional = {
				TIPOCARNE: tipocarne,
				OTRAS: document.getElementsByName('otrasEspecies')[0].value,
				OTIPOPRO: document.getElementsByName('otrosProductos')[0].value,
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
			tipoEsta = [];
			for (let i = 0; i < document.getElementsByName('tipoEstablecimiento').length; i++) {
				document.getElementsByName('tipoEstablecimiento')[i].checked ? tipoEsta.push(document.getElementsByName('tipoEstablecimiento')[i].value) : console.log(i);
			}
			console.log(tipoEsta);
			adicional = {
				ACTIVIDAD: tipoEsta,
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
			tipoEsta = [];
			for (let i = 0; i < document.getElementsByName('tipoEstablecimiento').length; i++) {
				document.getElementsByName('tipoEstablecimiento')[i].checked ? tipoEsta.push(document.getElementsByName('tipoEstablecimiento')[i].value) : console.log(i);
			}
			console.log(tipoEsta);
			adicional = {
				ACTIVIDAD: tipoEsta,
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
			tipoEsta = [];
			for (let i = 0; i < document.getElementsByName('tipoEstablecimiento').length; i++) {
				document.getElementsByName('tipoEstablecimiento')[i].checked ? tipoEsta.push(document.getElementsByName('tipoEstablecimiento')[i].value) : console.log(i);
			}
			adicional = {
				ACTIVIDAD: tipoEsta,
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
			tipoEsta = [];
			for (let i = 0; i < document.getElementsByName('tipoEstablecimiento').length; i++) {
				document.getElementsByName('tipoEstablecimiento')[i].checked ? tipoEsta.push(document.getElementsByName('tipoEstablecimiento')[i].value) : console.log(i);
			}
			console.log(tipoEsta);
			adicional = {
				ACTIVIDAD: tipoEsta,
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
			tipoEsta = [];
			for (let i = 0; i < document.getElementsByName('tipoEstablecimiento').length; i++) {
				document.getElementsByName('tipoEstablecimiento')[i].checked ? tipoEsta.push(document.getElementsByName('tipoEstablecimiento')[i].value) : console.log(i);
			}
			console.log(tipoEsta);
			adicional = {
				ACTIVIDAD: tipoEsta,
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
			let ata = document.getElementsByName('tipoEstablecimiento')[0].checked ? '' : 'X';
			adicional = {
				ATA: ata,
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
			adicional = {
				PREGUNTAS: Array.from(document.getElementsByName('pregunta'))
			};
			evaluado = Object.assign( evaluado, evaluadoEsta, adicional );
			break;
		case '333':
			let longitud = document.getElementsByName('orden');
			let muestras = [];
			for(let i=0; i<longitud; i++){
				muestras[i] = {
					acta: document.getElementsByName('acta' + formulario)[0].value,
					Orden: document.getElementsByName('Orden')[i].value,
					Um: document.getElementsByName('Um')[i].value,
					Contenido: document.getElementsByName('Contenido')[i].value,
					Temperatura: document.getElementsByName('Temperatura')[i].value,
					TipoEnvase: document.getElementsByName('TipoEnvase')[i].value,
					LoteFechaV: document.getElementsByName('LoteFechaV')[i].value,
					RegSanit: document.getElementsByName('RegSanit')[i].value
				};
			}
			evaluado = {
				MUESTRAS: muestras,
				FECHA: document.getElementsByName('fecha' + formulario)[0].value,
				N_INSCRIP: document.getElementsByName('inscripcion' + formulario)[0].value,
				DIRECC: document.getElementsByName('direccion' + formulario)[0].value,
				TELS: document.getElementsByName('tel' + formulario)[0].value + ' ' + document.getElementsByName('cel' + formulario)[0].value,
				CORREO: document.getElementsByName('correoProp' + formulario)[0].value,
				NOMBRE_P: document.getElementsByName('propietario' + formulario)[0].value,
				TID_P: document.getElementsByName('tipoIdProp' + formulario)[0].value,
				DOC_P: document.getElementsByName('idPropietario' + formulario)[0].value,
				AUTORIZA: document.getElementsByName('autorizaNoti' + formulario)[0].value,			
				OBS_AS: document.getElementsByName('obAutoridad' + formulario)[0].value,
				NOMBRE_F1: document.getElementsByName('funcionario' + formulario + '-1')[0].value,
				ID_F1: document.getElementsByName('idFuncionario' + formulario + '-1')[0].value,
				CARGO_F1: document.getElementsByName('cargoFuncionario' + formulario + '-1')[0].value,
				NOMBRE_F2: document.getElementsByName('funcionario' + formulario + '-2')[0].value,
				ID_F2: document.getElementsByName('idFuncionario' + formulario + '-2')[0].value,
				CARGO_F2: document.getElementsByName('cargoFuncionario' + formulario + '-2')[0].value,
				NOMBRE_E1: document.getElementsByName('persona' + formulario + '-1')[0].value,
				ID_E1: document.getElementsByName('idPersona' + formulario + '-1')[0].value,
				CARGO_E1: document.getElementsByName('cargoPersona' + formulario + '-1')[0].value,
				NOMBRE_E2: document.getElementsByName('persona' + formulario + '-2')[0].value,
				ID_E2: document.getElementsByName('idPersona' + formulario + '-2')[0].value,
				CARGO_E2: document.getElementsByName('cargoPersona' + formulario + '-2')[0].value,
				FIRMA_F1: localStorage.getItem('firmaAut1'),
				FIRMA_F2: localStorage.getItem('firmaAut2'),
				FIRMA_E1: localStorage.getItem('firmaIns1'),
				FIRMA_E2: localStorage.getItem('firmaIns2'),
				GRABADO: 'S'
			};
			localStorage.setItem('form', '333');
			break;
		case '441':
			evaluadoVehi = guardarEvaluadosVehiculos(formulario);
			adicional = {
				NOMBRE_CO: document.getElementsByName('conductor441')[0].value,
				TID_CO: document.getElementsByName('tipoIdCond441')[0].value,
				DOC_CO: document.getElementsByName('idConductor441')[0].value,
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
				OTRO: document.getElementsByName('otro472')[0].value
			};
			evaluado = Object.assign( evaluado, evaluadoVehi, adicional);
			break;
	}
	
	localStorage.setItem('evaluado', JSON.stringify(evaluado));
	firmaEvaluacion();	
	
	//persistirEvaluado(db, evaluado, formulario);
	//location.reload();
}

function setColumnas(tr, registro, contador, evaluado){
	tr.appendChild(createColumns(contador));
	evaluado == 'E' ? tr.appendChild(createColumns(registro.NOCO)) : (registro.doc.PLACA === null ? registro.doc.PLACAREM : registro.doc.PLACA);
	tr.appendChild(createColumns(registro.ACTA));
	tr.appendChild(createColumns(registro.FECHA));
	evaluado != 'D' ? tr.appendChild(createColumns(registro.P_CUMPL)) : tr.appendChild(createColumns(registro.OBS_AS));
	evaluado != 'D' ? tr.appendChild(createColumns(registro.CONCEPTO)) : console.log('');
	return tr;		
}

function traerEvaluados(db, evaluado){
	db.allDocs({include_docs: true, descending: true}).then ( doc => {
		var tbody = document.getElementById('evaluados');
		tbody.innerHTML = '';
		var contador = 0;
		doc.rows.forEach( registro => {
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
		case '442':
			traerEvaluados(db442, 'D');
			validarCambioTab(3);
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
		document.getElementsByName('alertaInscrito')[i].style.display = "block";
	}
}