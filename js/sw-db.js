
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

function createColumns(arreglo){
	var td = document.createElement('td');
	td.innerHTML = arreglo;
	return td;
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
	//document.getElementsByName('autorizaNoti' + formulario)[0].value = registro.AUTORIZA;

	//registro.TID_P != null ? $('#tipoIdProp' + formulario + ' option[value=' + registro.TID_P + ']').prop('selected', true) : $('#tipoIdProp' + formulario + ' option[value=nulo]').prop('selected', true);

	if(formulario == '444'){
		console.log('Estamos en 444');
		document.getElementsByName('inscripcionRep444')[0].value = registro.N_INSCRIP;
		document.getElementsByName('fecha444_2')[0].value = registro.FECHA;
		document.getElementsByName('funcionario444')[0].value = registro.NOMBRE_F1;
		document.getElementsByName('marca444')[0].value = registro.MARCAV;
		document.getElementsByName('modelo444')[0].value = registro.MODELOV;
		document.getElementsByName('placa444')[0].value = registro.PLACA;
		document.getElementsByName('furgon444')[0].value = registro.FURGON;
		document.getElementsByName('rmque444')[0].value = registro.REMOLQUE;
		document.getElementsByName('placaRemolque444')[0].value = registro.PLACAREM;
		document.getElementsByName('srmque444')[0].value = registro.SEMIREM;
		document.getElementsByName('placaSrmque444')[0].value = registro.PLACASEMI;
		document.getElementsByName('isotermo444')[0].value = registro.ISOTERMO;
		document.getElementsByName('ufrio444')[0].value = registro.U_UFRIO;
		document.getElementsByName('producto444')[0].value = registro.PRODUCTO;
	}else{
		document.getElementsByName('dirNotif' + formulario)[0].value = registro.DIR_NOT;
		document.getElementsByName('nombreComercial' + formulario)[0].value = registro.NOCO;
		document.getElementsByName('razonSocial' + formulario)[0].value = registro.RSO;
		document.getElementsByName('nit' + formulario)[0].value = registro.NIT;
		document.getElementsByName('concepto' + formulario)[0].value = registro.CCUV;
		document.getElementsByName('textoConcepto' + formulario)[0].value = registro.CUV;
		document.getElementsByName('fechaUltVisita' + formulario)[0].value = registro.F_UV;
		document.getElementsByName('nomTerr' + formulario)[0].value = registro.NOLOCA;
		document.getElementsByName('matriculaMercantil' + formulario)[0].value = registro.MAMER;

		if (!(registro.TERRITORIO == undefined)) {
			console.log('Territorio: ', registro.TERRITORIO);
			switch(registro.TERRITORIO){
				case 'comuna':
					$('#comuna').prop('checked', true);
					break;
				case 'barrio':
					$('#barrio').prop('checked', true);
					break;
				case 'localidad':
					$('#localidad').prop('checked', true);
					break;
				case 'sector':
					$('#sector').prop('checked', true);
					break;			
				case 'corregimiento':
					$('#corregimiento').prop('checked', true);
					break;
				case 'upz':
					$('#upz').prop('checked', true);
					break;
				case 'caserio':
					$('#caserio').prop('checked', true);
					break;
				case 'otro':
					$('#otro').prop('checked', true);
					break;
				default:
				break;
			}
		}else{
			console.log('Territorio Null');
			$('input:radio[name=territorio'+formulario+']').prop('checked', false);
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

		if(!(formulario == '444')){
			document.getElementsByName('funcUltVisita' + formulario)[0].value = registro.DIR_NOT_E;
			document.getElementsByName('visitado' + formulario)[0].value = registro.VISITADO;
		}

	}else{
		// Aquí se puede introducir un método para calcular automáticamente un número de acta
		console.log('Debería estar en ' + formulario);
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
				};

				var mapActividad = new Map();
				var j = 0;
				// El siguiente for busca si la key está en el array, busca por el key. Con forEach 
				//hay que cambiar el orden
				for (valor in registro.ACTIVIDAD){
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

	/*if(document.getElementsByName('fecha479')[0] !== undefined){
		//console.log(document.getElementsByName('razonSocial479')[0]);
		console.log('Debería estar en 479');
		document.getElementsByName('razonSocial479')[0].value = registro.RSO;
		document.getElementsByName('nit479')[0].value = registro.NIT;
		document.getElementsByName('nombreComercial479')[0].value = registro.NOCO;
		document.getElementsByName('inscripcion479')[0].value = registro.N_INSCRIP;
		document.getElementsByName('propietario479')[0].value = registro.NOMBRE_P;	
	}else if(document.getElementsByName('fecha495')[0] !== undefined) {
		console.log('Debería estar en 495');
		document.getElementsByName('razonSocial495')[0].value = registro.RSO;
		document.getElementsByName('nit495')[0].value = registro.NIT;
		document.getElementsByName('nombreComercial495')[0].value = registro.NOCO;
		document.getElementsByName('inscripcion495')[0].value = registro.N_INSCRIP;
		document.getElementsByName('propietario495')[0].value = registro.NOMBRE_P;
	}else if(document.getElementsByName('fecha480')[0] !== undefined) {
		console.log('Debería estar en 480');
		//document.getElementsByName('razonSocial480')[0].value = registro.RSO;
		//document.getElementsByName('nit480')[0].value = registro.NIT;
		document.getElementsByName('nombreComercial480')[0].value = registro.NOCO;
		document.getElementsByName('inscripcion480')[0].value = registro.N_INSCRIP;
		document.getElementsByName('propietario480')[0].value = registro.NOMBRE_P;
	}else if(document.getElementsByName('fecha474')[0] !== undefined){
		console.log('Debería estar en 474');
		document.getElementsByName('razonSocial474')[0].value = registro.RSO;
		document.getElementsByName('nit474')[0].value = registro.NIT;
		document.getElementsByName('nombreComercial474')[0].value = registro.NOCO;
		document.getElementsByName('inscripcion474')[0].value = registro.N_INSCRIP;
		document.getElementsByName('propietario474')[0].value = registro.NOMBRE_P;
	}else if(document.getElementsByName('fecha440')[0] !== undefined){
		console.log('Debería estar en 440');
		document.getElementsByName('razonSocial440')[0].value = registro.RSO;
		document.getElementsByName('nit440')[0].value = registro.NIT;
		//document.getElementsByName('nombreComercial440')[0].value = registro.NOCO;
		document.getElementsByName('inscripcion440')[0].value = registro.N_INSCRIP;
		document.getElementsByName('propietario440')[0].value = registro.NOMBRE_P;
	}else if(document.getElementsByName('fecha444')[0] !== undefined){
		console.log('Deberíamos estar en el 444');
		document.getElementsByName('id444')[0].value = registro._id;
		document.getElementsByName('fecha444')[0].value = registro.FECHA;
		document.getElementsByName('producto444')[0].value = registro.PRODUCTO;
		document.getElementsByName('inscripcion444')[0].value = registro.N_INSCRIP;
		document.getElementsByName('propietario444')[0].value = registro.NOMBRE_P;
	}else if(document.getElementsByName('fecha569')[0] !== undefined){
		console.log('Deberíamos estar en el 569');
		document.getElementsByName('id569')[0].value = registro._id;
		document.getElementsByName('fecha569')[0].value = registro.FECHA;
		document.getElementsByName('razonSocial569')[0].value = registro.RSO;
		document.getElementsByName('inscripcion569')[0].value = registro.N_INSCRIP;
		document.getElementsByName('propietario569')[0].value = registro.NOMBRE_P;
	}else{
		console.log('Deberíamos estar en el 493');
		document.getElementsByName('id493')[0].value = registro._id;
		document.getElementsByName('fecha493')[0].value = registro.FECHA;
		document.getElementsByName('razonSocial493')[0].value = registro.RSO;
		document.getElementsByName('nit493')[0].value = registro.NIT;
		document.getElementsByName('nombreComercial493')[0].value = registro.NOCO;
		document.getElementsByName('inscripcion493')[0].value = registro.N_INSCRIP;
		document.getElementsByName('propietario493')[0].value = registro.NOMBRE_P;
	}*/
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
		//return tbody;
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

function guardarTraidos(dbBase, respObj){
	var indice = 0;
	respObj.forEach( registro => {
		if(registro.id < 10){
			indice = '000' + String(registro.id);
		}else if (registro.id >= 10 && registro.id < 100){
			indice = '00' + String(registro.id);
		}else if (registro.id >= 100 && registro.id < 1000){
			indice = '0' + String(registro.id);
		}else{
			indice = String(registro.id);
		}
		
		if (registro.ACTIVIDAD) {
			registro.ACTIVIDAD = JSON.parse(registro.ACTIVIDAD);	
		}
		
		var id = { _id: indice };
		// Con la siguiente línea se añade la variable _id al objeto			
		registro = Object.assign(id,registro);   
		//console.log(registro);
		dbBase.put(registro, function callback(err, result){
			if (!err) {
				console.log('inscrito guardado en base de datos');
			}else {
				console.log('problemas guardando inscrito en base de datos', err);
			}
		});
	});
}

function cerrarSesionServidor(){
	var identidad = JSON.parse(localStorage.getItem('identity'));
	if (identidad != undefined) {
		fetch('https://sisbenpro.com/public/cerrarSesion/'+identidad.usuario)
		.then( res => res.json() )
		.then( jsonRes => alert(jsonRes.res) );
		localStorage.removeItem('identity');
	}else{
		alert('No hay una sesión abierta con el servidor en este momento');
	}
	
}

function verificarSesion(){
	var identidad = localStorage.getItem('identity');
	console.log(identidad);
	return bool = identidad != undefined ? true: false;
}

function fetchInscritos(formulario){
	console.log(verificarSesion());
	if (verificarSesion()) {
		var credenciales = JSON.parse(localStorage.getItem('identity'));
		var data = 'nombreUsuario='+credenciales.usuario+'&&'
					+'token='+credenciales.token+'&&'
					+'formulario='+formulario;
		console.log('Estamos en el formulario: ', formulario);
		return fetch('https://sisbenpro.com/public/inscritosVisual', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					//mode: 'no-cors',
					body: data
				})
				.then( res => res.json() )
				.catch( err => console.log('Hubo problemas con la conexión a la base de datos. Intente una vez más o revise su conexión a internet '+err.json()) );
	} else{
		location.assign("./loginserver.html");
	}
}

//Aquí se usa la función json(), que funciona similar a JSON.parse()
function cargarInscritos493(){
	var promesa = fetchInscritos('493');
	promesa.then( respObj => {
		if (respObj.err != undefined) {
			alert('Error: ' + respObj.err);
		}
		db493.destroy().then( response => {
			console.log('Base de datos anterior eliminada');
			db493 = new PouchDB('inscritosCargados493');
			console.log('Nueva base de datos creada');
			guardarTraidos(db493, respObj);
			mostrarInscritos493();
			//cerrarSesionServidor();
		});		
	}).catch( err => console.log('Error: ', err) );
}

function cargarInscritos444(){
	//fetch('http://localhost/formularioVisaludAPI/public/inscritos')
	var promesa = fetchInscritos('444');
	promesa.then( respObj => {
		if (respObj.err != undefined) {
			alert('Error: ' + respObj.err);
		}
		db444.destroy().then( response => {
			console.log('Base de datos anterior eliminada');
			db444 = new PouchDB('inscritosCargados444');
			console.log('Nueva base de datos creada');
			guardarTraidos(db444, respObj);
			mostrarInscritos444();
			//cerrarSesionServidor();
		});
	}).catch( err => console.log('Error: ', err) );
}

function cargarInscritos569(){
	//fetch('http://localhost/formularioVisaludAPI/public/inscritos')
	var promesa = fetchInscritos('569');
	promesa.then( respObj => {
		if (respObj.err != undefined) {
			alert('Error: ' + respObj.err);
		}
		db569.destroy().then( response => {
			console.log('Base de datos anterior eliminada');
			db569 = new PouchDB('inscritosCargados569');
			console.log('Nueva base de datos creada');
			guardarTraidos(db569, respObj);
			mostrarInscritos569();
			//cerrarSesionServidor();
		});
	}).catch( err => console.log('Error: ', err) );
}

function cargarServidor(){
	db440.allDocs({include_docs: true, descending: true}).then ( doc => {
		var data;
		doc.rows.forEach( registro => {
			data = 'noco='+registro.doc.NOCO+'&&'+
						'acta='+registro.doc.ACTA+'&&'+
						'fecha='+registro.doc.FECHA+'&&'+
						'p_cumpl='+registro.doc.P_CUMPL+'&&'+
						'concepto='+registro.doc.CONCEPTO;
			fetch('https://sisbenpro.com/public/evaluacionesTabla', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				mode: 'no-cors',
				body: data
			})
			.then( res => console.log('respuesta POST', res.body) )
			.catch( err => console.log('error POST', err) );
		});
		alert('Archivos en proceso de envío');	
	});	
}

function persistirInscrito(dbBase, dbNuevos, inscrito, idExistente){
	//var id = 0;
	if(idExistente == 0){
		var indice = '';
		dbBase.info().then( result => {
			var ultimo = result.doc_count + 1;
			if(ultimo < 10){
				indice = '000' + String(ultimo);
			}else if (ultimo >= 10 && ultimo < 100){
				indice = '00' + String(ultimo);
			}else if (ultimo >= 100 && ultimo < 1000){
				indice = '0' + String(ultimo);
			}else{
				indice = String(ultimo);
			}
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
		id = idExistente;
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
		VISITADO: document.getElementsByName('visitado493')[0].value,
		
		TERRITORIO: territorio
	}

	return inscrito;
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
		//SOPROVIS: '',			//campos no funcionales que es mejor remover
		//SO: '',					//campos no funcionales que es mejor remover
		//CC_P: '',					//campos no funcionales que es mejor remover
		//CE_P: '',					//campos no funcionales que es mejor remover
		ZONA: document.getElementsByName('zona493')[0].value,
		//RURAL: '',					//campos no funcionales que es mejor remover
		//URBANO: '',					//campos no funcionales que es mejor remover
		//CBARRIO: '',				//campos no funcionales que es mejor remover
		//BARRIO: nomTerrInscrito,	//Lo que más coincide con el esquema vfp es que en esta variable se guarde el nombre del barrio o corregimiento, lo que va en el campo de testo Cual?
		//CVEREDA: '',				//campos no funcionales que es mejor remover
		//VEREDA: '',					//campos no funcionales que es mejor remover
		AUTORIZA: document.getElementsByName('autorizaProp493')[0].value,
		//DPTO_NOT_E: '',				//Campo sin uso
		//MPIO_NOT_E: '',				//Campo sin uso
		//DIR_NOTI: '',				//Campo sin uso
		//COD_ACTIVI: '',				//Campo sin uso
		ACTIVIDAD: actividad,
		/*A01: '',
		A02: '',
		A03: '',
		A04: '',
		A11: '',
		A12: '',
		A21: '',
		A22: '',
		A31: '',		//campos por llenar
		A41: '',
		A42: '',
		A43: '',
		A51: '',
		A52: '',
		A61: '',
		A62: '',
		A63: '',
		A64: '',
		A71: '',
		A81: '',
		A82: '',*/
		CARGO_F1: document.getElementsByName('cargoRecibe493')[0].value,
		//ENTIDAD_F1: '',				//campos no funcionales que es mejor remover
		//NOMBRE_F2: '',					//campos no funcionales que es mejor remover
		//ID_F2: '',					//campos no funcionales que es mejor remover
		//CARGO_F2: '',					//campos no funcionales que es mejor remover
		//ENTIDAD_F2: '',					//campos no funcionales que es mejor remover
		CARGO_E1: document.getElementsByName('cargoInscribe493')[0].value,
		//NOMBRE_E2: '',					//campos no funcionales que es mejor remover
		//ID_E2: '',					//campos no funcionales que es mejor remover
		//CARGO_E2: '',					//campos no funcionales que es mejor remover
		ACTIVO: '',					//campos no funcionales que es mejor remover
		GRABADO: ''					//campos no funcionales que es mejor remover
	};

	inscrito = Object.assign( inscrito, inscritoEsta, adicional );
	
	/*console.log(inscrito);
	console.log(inscrito.ACTIVIDAD);
	console.log(inscrito.TERRITORIO);*/

	persistirInscrito(db493, dbNuevos493, inscrito, idExistente);
}

function guardarInscrito444(){
	//var depto = $('input:text[name=depto]').val();
	var fecha = document.getElementsByName('fecha444')[0].value;
	var inscripcion = document.getElementsByName('inscripcion444')[0].value;
	var producto = $('input:text[name=producto444]').val();
	var nombrePropietario = $('input:text[name=propietario444]').val();
	var idExistente = document.getElementsByName('id444')[0].value;

	var inscrito = {
			FECHA: fecha,
			N_INSCRIP: inscripcion,
			PRODUCTO: producto,
			NOMBRE_P: nombrePropietario
		};
	
	persistirInscrito(db444, dbNuevos444, inscrito, idExistente);
}

function guardarInscrito569(){
	//var depto = $('input:text[name=depto]').val();
	var fecha = document.getElementsByName('fecha569')[0].value;
	var inscripcion = document.getElementsByName('inscripcion569')[0].value;
	var razonSocial = $('input:text[name=razonSocial569]').val();
	var nombrePropietario = $('input:text[name=propietario569]').val();
	var idExistente = document.getElementsByName('id569')[0].value;

	var inscrito = {
			FECHA: fecha,
			N_INSCRIP: inscripcion,
			RSO: razonSocial,
			NOMBRE_P: nombrePropietario
		};
	
	persistirInscrito(db569, dbNuevos569, inscrito, idExistente);
}

function guardarEvaluacion474(){
	//var depto = $('input:text[name=depto]').val();
	var ciudad = $('input:text[name=ciudad474]').val();
	var fecha = document.getElementsByName('fecha474')[0].value;
	var acta = document.getElementsByName('acta474')[0].value;
	var entidad = document.getElementsByName('entidad474')[0].value;
	var razonSocial = $('input:text[name=razonSocial474]').val();
	var nitEsta = $('input:text[name=nit474]').val();
	var inscripcion = document.getElementsByName('inscripcion474')[0].value;
	var nombreComercial = $('input:text[name=nombreComercial474]').val();
	var direccion = document.getElementsByName('direccion474')[0].value;
	var matriculaMercantil = document.getElementsByName('matriculaMercantil474')[0].value;
	var depto = document.getElementsByName('dpto474')[0].value;
	var mpio = document.getElementsByName('mpio474')[0].value;
	var nomTerr = document.getElementsByName('nomTerr474')[0].value;
	var faxInscrito = document.getElementsByName('fax474')[0].value;
	var telInscrito = document.getElementsByName('tel474')[0].value + ' - ' + document.getElementsByName('cel474')[0].value;
	var correoPropInscrito = document.getElementsByName('correoProp474')[0].value;
	var nombrePropietario = $('input:text[name=propietario474]').val();
	var tipoIdProp = document.getElementsByName('tipoIdProp474')[0].value;
	var documentoProp = document.getElementsByName('idPropietario474')[0].value;
	var nombreRepLegal = $('input:text[name=repLegal474]').val();
	var tipoIdRepLegal = document.getElementsByName('tipoIdRl474')[0].value;
	var documentoRepLegal = document.getElementsByName('idRepLegal474')[0].value;
	var dirNotifInsc = document.getElementsByName('dirNotif474')[0].value;
	var deptoNotifInsc = document.getElementsByName('deptoNotif474')[0].value;
	var mpioNotifInsc = document.getElementsByName('mpioNotif474')[0].value;
	var horarios = document.getElementsByName('horarios474')[0].value;
	//var otrasEspecies = document.getElementsByName('otrasEspecies')[0].value;
	var fechaUltVisita = document.getElementsByName('fechaUltVisita474')[0].value;
	var conceptoUltVisita = document.getElementsByName('concepto474')[0].value;
	var textoConcepto = document.getElementsByName('textoConcepto474')[0].value;
	var porcentaje = document.getElementsByName('porcentaje474')[0].value;
	var motivoUltVisita = document.getElementsByName('motivo474')[0].value;
	var textoMotivo = document.getElementsByName('textoMotivo474')[0].value;
	var cumplimiento = document.getElementsByName('cumplimiento474')[0].value;
	var conceptoEval = document.getElementsByName('conceptoEval474')[0].value;
	var idExistente = document.getElementsByName('id474')[0].value;

	/*
	var zona = document.getElementsByName('zona493')[0].value;
	var autorizaPropInscrito = document.getElementsByName('autorizaProp493')[0].value;
	var visitadoInsc = document.getElementsByName('visitado493')[0].value;
	var funcUltVisita = document.getElementsByName('funcUltVisita493')[0].value;
	var conceptoUltVisita = document.getElementsByName('conceptoUltVisita493')[0].value;
	var obAutoridad493 = document.getElementsByName('obAutoridad493')[0].value;
	var obPersona493 = document.getElementsByName('obPersona493')[0].value;
	var inscribe493 = document.getElementsByName('inscribe493')[0].value;
	var idInscribe493 = document.getElementsByName('idInscribe493')[0].value;
	var cargoInscribe493 = document.getElementsByName('cargoInscribe493')[0].value;
	var recibe493 = document.getElementsByName('recibe493')[0].value;
	var idRecibe493 = document.getElementsByName('idRecibe493')[0].value;
	var cargoRecibe493 = document.getElementsByName('cargoRecibe493')[0].value;
*/
	var comuna = '';
	var barrio = '';
	var vereda = '';
	var localidad = '';
	var sector = '';
	var corregto = '';
	var upz = '';
	var caserio = '';
	var otro = '';

	var territorio = document.getElementsByName('territorio474');	
	
	/*var arrTerritorio = [];
	for (var i = territorio.length - 1; i >= 0; i--) {
		if (territorio[i].checked){
			arrTerritorio.push(territorio[i].value);
		}7
};  //Con esto recogemos valores de checkbox */

	var radioTerritorio = "";
	for (var i = territorio.length - 1; i >= 0; i--) {
		if (territorio[i].checked) {
			radioTerritorio = territorio[i].value;
			switch (radioTerritorio){
				case 'comuna':
				comuna = 'X';
				break;
				case 'barrio':
				barrio = 'X';
				break;
				case 'vereda':
				vereda = 'X';
				break;
				case 'localidad':
				localidad = 'X';
				break;
				case 'sector':
				sector = 'X';
				break;
				case 'corregimiento':
				corregto = 'X';
				break;
				case 'upz':
				upz = 'X';
				break;
				case 'caserio':
				caserio = 'X';
				break;
				default:
				otro = 'X';
			}
		}  
	}; 

	//console.log(arrTerritorio);
	var evaluado = {
		CIUDAD: mpio,
		FECHA: fecha,
		ACTA: acta,
		ENTIDAD: entidad,	 //Debe copiarse en T493
		RSO: razonSocial,
		NIT: nitEsta,
		N_INSCRIPC: inscripcion,
		NOCO: nombreComercial,
		DIRECC: direccion,
		MAMER: matriculaMercantil,	//Debe copiarse en T493
		DPTO: depto,
		MPIO: mpio,
		BARRIO: barrio,
		VEREDA: vereda,
		COMUNA: comuna,
		LOCALIDAD: localidad,
		SECTOR: sector,
		CORREGTO: corregto,
		CASERIO: caserio,
		UPZ: upz,
		OTRO: otro,
		NOLOCA: nomTerr,
		TELS: telInscrito,
		FAX: faxInscrito,
		CORREO: correoPropInscrito,
		APE1_P: '',		//Campos no funcionales, deben retirarse
		APE2_P: '',		//Campos no funcionales, deben retirarse
		NOM1_P: '',		//Campos no funcionales, deben retirarse
		NOM2_P: '',		//Campos no funcionales, deben retirarse
		NOMBRE_P: nombrePropietario,
		TID_P: tipoIdProp,
		DOC_P: documentoProp,
		APE1_RL: '',		//Campos no funcionales, deben retirarse
		APE2_RL: '',		//Campos no funcionales, deben retirarse
		NOM1_RL: '',		//Campos no funcionales, deben retirarse
		NOM2_RL: '',		//Campos no funcionales, deben retirarse
		NOMBRE_RL: nombreRepLegal,
		TID_RL: tipoIdRepLegal,
		DOC_RL: documentoRepLegal,
		DIR_NOTI: dirNotifInsc,
		DPTO_NOTI: deptoNotifInsc,
		MPIO_NOTI: mpioNotifInsc,
		HORARIOS: horarios,
		NUTRA: '',
		C_BOVINA: '',
		C_PORCINA: '',
		AVES: '',
		OTRAS: '',
		CTIPOPRO: '',		//Campos no funcionales, deben retirarse
		NTIPOPRO: '',		//Campos no funcionales, deben retirarse
		//OTIPOPRO: otrasEspecies,
		UV_F: fechaUltVisita,
		UV_C: conceptoUltVisita,
		NOMBRE_C: textoConcepto,
		UV_P: porcentaje,
		MOTIVO: motivoUltVisita,
		NMOTIVO: textoMotivo,
		E11: '',
		H11: '',
		E12: '',
		H12: '',
		E13: '',
		H13: '',
		E14: '',
		H14: '',
		EB1: '',
		E21: '',
		H21: '',
		E22: '',
		H22: '',
		EB2: '',
		E31: '',
		H31: '',
		E32: '',
		H32: '',
		E33: '',
		H33: '',
		E34: '',
		H34: '',
		EB3: '',
		E41: '',
		H41: '',
		E42: '',
		H42: '',
		E43: '',
		H43: '',
		E44: '',
		H44: '',
		EB4: '',
		E51: '',
		H51: '',
		E52: '',
		H52: '',
		E53: '',
		H53: '',
		E54: '',
		H54: '',
		E55: '',
		H55: '',
		E56: '',
		H56: '',
		EB5: '',
		CONCEPTO: conceptoEval,
		P_CUMPL: cumplimiento,
		N_MUESTRAS: '',
		N_ACTA: '',
		RQS: '',
		AMS: '',
		DETA_MS: '',
		OBS_AS: '',
		OBS_ES: '',
		F_NOTI: '',
		APE1_F1: '',
		APE2_F1: '',
		NOM1_F1: '',
		NOM2_F1: '',
		NOMBRE_F1: '',
		ID_F1: '',
		CARGO_F1: '',
		ENTIDAD_F1: '',
		APE1_F2: '',
		APE2_F2: '',
		NOM1_F2: '',
		NOM2_F2: '',
		NOMBRE_F2: '',
		ID_F2: '',
		CARGO_F2: '',
		ENTIDAD_F2: '',
		APE1_E1: '',
		APE2_E1: '',
		NOM1_E1: '',
		NOM2_E1: '',
		NOMBRE_E1: '',
		ID_E1: '',
		CARGO_E1: '',
		APE1_E2: '',
		APE2_E2: '',
		NOM1_E2: '',
		NOM2_E2: '',
		NOMBRE_E2: '',
		ID_E2: '',
		CARGO_E2: '',
		FECHAPV: '',
		GRABADO: '',
		DPV: '',
		FPV: '',
		FEPV: '',
		CODACTA: ''
		};
	
	var id;
	var insertar;
	if(idExistente == 0){
		id = new Date().toISOString();
		insertar = { _id: id };
		evaluado = Object.assign( insertar, evaluado );
		console.log(evaluado);
		return db474.put(evaluado, function callback(err, result){
			if (!err) {
				alert('evaluado guardado en base de datos');
				mostrarEvaluados474();
			}else {
				alert('problemas guardando evaluado en base de datos');
			}
		});			
	}else{
		db474.get(idExistente).then( doc => {
			insertar = { 
				_id: doc._id,
				_rev: doc._rev
			};
			evaluado = Object.assign( insertar, evaluado );
			console.log(evaluado);
			return db474.put(evaluado, function callback(err, result){
				if (!err) {
					alert('evaluado modificado en base de datos');
					mostrarEvaluados474();
				}else {
					alert('problemas modificando evaluado en base de datos');
				}
			});						
		});
	}
}

function guardarEvaluacion440(){
	//var depto = $('input:text[name=depto]').val();
	var fecha = document.getElementsByName('fecha440')[0].value;
	var acta = document.getElementsByName('acta440')[0].value;
	var razonSocial = $('input:text[name=razonSocial440]').val();
	var nitEsta = $('input:text[name=nit440]').val();
	var inscripcion = document.getElementsByName('inscripcion440')[0].value;
	var nombreComercial = $('input:text[name=nombreComercial440]').val();
	var nombrePropietario = $('input:text[name=propietario440]').val();
	var cumplimiento = document.getElementsByName('cumplimiento440')[0].value;
	var conceptoEval = document.getElementsByName('conceptoEval440')[0].value;
	var idExistente = document.getElementsByName('id440')[0].value;
	
	//console.log(arrTerritorio);
	var evaluado = {
		FECHA: fecha,
		ACTA: acta,
		RSO: razonSocial,
		NIT: nitEsta,
		N_INSCRIPC: inscripcion,
		NOCO: nombreComercial,
		NOMBRE_P: nombrePropietario,
		CONCEPTO: conceptoEval,
		P_CUMPL: cumplimiento
		};
	
	var id;
	var insertar;
	if(idExistente == 0){
		id = new Date().toISOString();
		insertar = { _id: id };
		evaluado = Object.assign( insertar, evaluado );
		console.log(evaluado);
		return db440.put(evaluado, function callback(err, result){
			if (!err) {
				alert('evaluado guardado en base de datos');
				mostrarEvaluados440();
			}else {
				alert('problemas guardando evaluado en base de datos');
			}
		});			
	}else{
		db440.get(idExistente).then( doc => {
			insertar = { 
				_id: doc._id,
				_rev: doc._rev
			};
			evaluado = Object.assign( insertar, evaluado );
			console.log(evaluado);
			return db440.put(evaluado, function callback(err, result){
				if (!err) {
					alert('evaluado modificado en base de datos');
					mostrarEvaluados440();
				}else {
					alert('problemas modificando evaluado en base de datos');
				}
			});						
		});
	}
}

function guardarEvaluacion479(){
	//var depto = $('input:text[name=depto]').val();
	var fecha = document.getElementsByName('fecha479')[0].value;
	var acta = document.getElementsByName('acta479')[0].value;
	var razonSocial = $('input:text[name=razonSocial479]').val();
	var nitEsta = $('input:text[name=nit479]').val();
	var inscripcion = document.getElementsByName('inscripcion479')[0].value;
	var nombreComercial = $('input:text[name=nombreComercial479]').val();
	var nombrePropietario = $('input:text[name=propietario479]').val();
	var cumplimiento = document.getElementsByName('cumplimiento479')[0].value;
	var conceptoEval = document.getElementsByName('conceptoEval479')[0].value;
	var idExistente = document.getElementsByName('id479')[0].value;
	
	//console.log(arrTerritorio);
	var evaluado = {
		FECHA: fecha,
		ACTA: acta,
		RSO: razonSocial,
		NIT: nitEsta,
		N_INSCRIPC: inscripcion,
		NOCO: nombreComercial,
		NOMBRE_P: nombrePropietario,
		CONCEPTO: conceptoEval,
		P_CUMPL: cumplimiento
		};
	
	var id;
	var insertar;
	if(idExistente == 0){
		id = new Date().toISOString();
		insertar = { _id: id };
		evaluado = Object.assign( insertar, evaluado );
		console.log(evaluado);
		return db479.put(evaluado, function callback(err, result){
			if (!err) {
				alert('evaluado guardado en base de datos');
				mostrarEvaluados479();
			}else {
				alert('problemas guardando evaluado en base de datos');
			}
		});			
	}else{
		db479.get(idExistente).then( doc => {
			insertar = { 
				_id: doc._id,
				_rev: doc._rev
			};
			evaluado = Object.assign( insertar, evaluado );
			console.log(evaluado);
			return db479.put(evaluado, function callback(err, result){
				if (!err) {
					alert('evaluado modificado en base de datos');
					mostrarEvaluados479();
				}else {
					alert('problemas modificando evaluado en base de datos');
				}
			});						
		});
	}
}

function guardarEvaluacion480(){
	//var depto = $('input:text[name=depto]').val();
	var fecha = document.getElementsByName('fecha480')[0].value;
	var acta = document.getElementsByName('acta480')[0].value;
	var razonSocial = $('input:text[name=razonSocial480]').val();
	var nitEsta = $('input:text[name=nit480]').val();
	var inscripcion = document.getElementsByName('inscripcion480')[0].value;
	var nombreComercial = $('input:text[name=nombreComercial480]').val();
	var nombrePropietario = $('input:text[name=propietario480]').val();
	var cumplimiento = document.getElementsByName('cumplimiento480')[0].value;
	var conceptoEval = document.getElementsByName('conceptoEval480')[0].value;
	var idExistente = document.getElementsByName('id480')[0].value;
	
	//console.log(arrTerritorio);
	var evaluado = {
		FECHA: fecha,
		ACTA: acta,
		RSO: razonSocial,
		NIT: nitEsta,
		N_INSCRIPC: inscripcion,
		NOCO: nombreComercial,
		NOMBRE_P: nombrePropietario,
		CONCEPTO: conceptoEval,
		P_CUMPL: cumplimiento
		};
	
	var id;
	var insertar;
	if(idExistente == 0){
		id = new Date().toISOString();
		insertar = { _id: id };
		evaluado = Object.assign( insertar, evaluado );
		console.log(evaluado);
		return db480.put(evaluado, function callback(err, result){
			if (!err) {
				alert('evaluado guardado en base de datos');
				mostrarEvaluados480();
			}else {
				alert('problemas guardando evaluado en base de datos');
			}
		});			
	}else{
		db480.get(idExistente).then( doc => {
			insertar = { 
				_id: doc._id,
				_rev: doc._rev
			};
			evaluado = Object.assign( insertar, evaluado );
			console.log(evaluado);
			return db480.put(evaluado, function callback(err, result){
				if (!err) {
					alert('evaluado modificado en base de datos');
					mostrarEvaluados480();
				}else {
					alert('problemas modificando evaluado en base de datos');
				}
			});						
		});
	}
}

function guardarEvaluacion495(){
	//var depto = $('input:text[name=depto]').val();
	var fecha = document.getElementsByName('fecha495')[0].value;
	var acta = document.getElementsByName('acta495')[0].value;
	var razonSocial = $('input:text[name=razonSocial495]').val();
	var nitEsta = $('input:text[name=nit495]').val();
	var inscripcion = document.getElementsByName('inscripcion495')[0].value;
	var nombreComercial = $('input:text[name=nombreComercial495]').val();
	var nombrePropietario = $('input:text[name=propietario495]').val();
	var cumplimiento = document.getElementsByName('cumplimiento495')[0].value;
	var conceptoEval = document.getElementsByName('conceptoEval495')[0].value;
	var idExistente = document.getElementsByName('id495')[0].value;
	
	//console.log(arrTerritorio);
	var evaluado = {
		FECHA: fecha,
		ACTA: acta,
		RSO: razonSocial,
		NIT: nitEsta,
		N_INSCRIPC: inscripcion,
		NOCO: nombreComercial,
		NOMBRE_P: nombrePropietario,
		CONCEPTO: conceptoEval,
		P_CUMPL: cumplimiento
		};
	
	var id;
	var insertar;
	if(idExistente == 0){
		id = new Date().toISOString();
		insertar = { _id: id };
		evaluado = Object.assign( insertar, evaluado );
		console.log(evaluado);
		return db495.put(evaluado, function callback(err, result){
			if (!err) {
				alert('evaluado guardado en base de datos');
				mostrarEvaluados495();
			}else {
				alert('problemas guardando evaluado en base de datos');
			}
		});			
	}else{
		db495.get(idExistente).then( doc => {
			insertar = { 
				_id: doc._id,
				_rev: doc._rev
			};
			evaluado = Object.assign( insertar, evaluado );
			console.log(evaluado);
			return db495.put(evaluado, function callback(err, result){
				if (!err) {
					alert('evaluado modificado en base de datos');
					mostrarEvaluados495();
				}else {
					alert('problemas modificando evaluado en base de datos');
				}
			});						
		});
	}
}

function escogerEvaluado(registro, formulario){
	//alert(registro._id);
	//console.log('No debería ejecutarse esto en el F493');
	//console.log(formulario);
	document.getElementsByName('id'+formulario)[0].value = registro._id;
	document.getElementsByName('razonSocial'+formulario)[0].value = registro.RSO;
	document.getElementsByName('nit'+formulario)[0].value = registro.NIT;
	document.getElementsByName('nombreComercial'+formulario)[0].value = registro.NOCO;
	document.getElementsByName('inscripcion'+formulario)[0].value = registro.N_INSCRIP;
	document.getElementsByName('propietario'+formulario)[0].value = registro.NOMBRE_P;
	document.getElementsByName('acta'+formulario)[0].value = registro.ACTA;
	document.getElementsByName('fecha'+formulario)[0].value = registro.FECHA;
	document.getElementsByName('conceptoEval'+formulario)[0].value = registro.CONCEPTO;
	document.getElementsByName('cumplimiento'+formulario)[0].value = registro.P_CUMPL;
} 

function createRadioEvaluados(registro, formulario){
	var radio = document.createElement('input');
	radio.type = 'radio';
	radio.setAttribute('name',"seleEvaluado");
	radio.value = registro._id;
	radio.addEventListener('click', escogerEvaluado.bind(this, registro, formulario));

	var span = document.createElement('span');
	span.className = 'input-group-addon';
	span.appendChild(radio);

	var td = document.createElement('td');
	td.appendChild(span);

	return td;
}

function setColumnas(tr, registro, contador){
	tr.appendChild(createColumns(contador));
	tr.appendChild(createColumns(registro.NOCO));
	tr.appendChild(createColumns(registro.ACTA));
	tr.appendChild(createColumns(registro.FECHA));
	tr.appendChild(createColumns(registro.P_CUMPL));
	tr.appendChild(createColumns(registro.CONCEPTO));
	return tr;		
}

function mostrarEvaluados474(){
	db474.allDocs({include_docs: true, descending: true}).then ( doc => {
		var tbody = document.getElementById('evaluados');
		tbody.innerHTML = '';
		var contador = 0;
		doc.rows.forEach( registro => {
			//console.log(registro.doc._id);
			contador++;
			var tr = document.createElement('tr');
			tr = setColumnas(tr, registro.doc, contador);
			tr.appendChild(createRadioEvaluados(registro.doc, '474'));
			tbody.appendChild(tr);
		});
		$('#tablaEvaluados').DataTable();
	});
}

function mostrarEvaluados440(){
	db440.allDocs({include_docs: true, descending: true}).then ( doc => {
		var tbody = document.getElementById('evaluados');
		tbody.innerHTML = '';
		var contador = 0;
		doc.rows.forEach( registro => {
			//console.log(registro.doc._id);
			contador++;
			var tr = document.createElement('tr');
			tr = setColumnas(tr, registro.doc, contador);
			tr.appendChild(createRadioEvaluados(registro.doc, '440'));
			tbody.appendChild(tr);
		});
		$('#tablaEvaluados').DataTable();
	});
}

function mostrarEvaluados495(){
	db495.allDocs({include_docs: true, descending: true}).then ( doc => {
		var tbody = document.getElementById('evaluados');
		tbody.innerHTML = '';
		var contador = 0;
		doc.rows.forEach( registro => {
			//console.log(registro.doc._id);
			contador++;
			var tr = document.createElement('tr');
			tr = setColumnas(tr, registro.doc, contador);
			tr.appendChild(createRadioEvaluados(registro.doc, '495'));
			tbody.appendChild(tr);
		});
		$('#tablaEvaluados').DataTable();
	});
}

function mostrarEvaluados480(){
	db480.allDocs({include_docs: true, descending: true}).then ( doc => {
		var tbody = document.getElementById('evaluados');
		tbody.innerHTML = '';
		var contador = 0;
		doc.rows.forEach( registro => {
			//console.log(registro.doc._id);
			contador++;
			var tr = document.createElement('tr');
			tr = setColumnas(tr, registro.doc, contador);
			tr.appendChild(createRadioEvaluados(registro.doc, '480'));
			tbody.appendChild(tr);
		});
		$('#tablaEvaluados').DataTable();
	});
}

function mostrarEvaluados479(){
	db479.allDocs({include_docs: true, descending: true}).then ( doc => {
		var tbody = document.getElementById('evaluados');
		tbody.innerHTML = '';
		var contador = 0;
		doc.rows.forEach( registro => {
			//console.log(registro.doc._id);
			contador++;
			var tr = document.createElement('tr');
			tr = setColumnas(tr, registro.doc, contador);
			tr.appendChild(createRadioEvaluados(registro.doc, '479'));
			tbody.appendChild(tr);
		});
		$('#tablaEvaluados').DataTable();
	});
}