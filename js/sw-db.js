
var db493 = new PouchDB('inscritosCargados493');
var dbNuevos493 = new PouchDB('inscritosNuevos493');
var db440 = new PouchDB('evaluaciones440');
var db474 = new PouchDB('evaluaciones474');
var db479 = new PouchDB('evaluaciones479');
var db480 = new PouchDB('evaluaciones480');
var db495 = new PouchDB('evaluaciones495');

mostrarInscritos493();

db493.changes({
	since: 'now',
	live: true
}).on('change', mostrarInscritos493);

dbNuevos493.changes({
	since: 'now',
	live: true
}).on('change', mostrarInscritos493);

function createColumns(arreglo){
	var td = document.createElement('td');
	td.innerHTML = arreglo;
	return td;
}

function escogerInscrito(registro){
	if(document.getElementsByName('razonSocial479')[0] !== undefined){
		//console.log(document.getElementsByName('razonSocial479')[0]);
		console.log('Debería estar en 479');
		document.getElementsByName('razonSocial479')[0].value = registro.RSO;
		document.getElementsByName('nit479')[0].value = registro.NIT;
		document.getElementsByName('nombreComercial479')[0].value = registro.NOCO;
		document.getElementsByName('inscripcion479')[0].value = registro.N_INSCRIP;
		document.getElementsByName('propietario479')[0].value = registro.NOMBRE_P;	
	}else if(document.getElementsByName('razonSocial495')[0] !== undefined) {
		console.log('Debería estar en 495');
		document.getElementsByName('razonSocial495')[0].value = registro.RSO;
		document.getElementsByName('nit495')[0].value = registro.NIT;
		document.getElementsByName('nombreComercial495')[0].value = registro.NOCO;
		document.getElementsByName('inscripcion495')[0].value = registro.N_INSCRIP;
		document.getElementsByName('propietario495')[0].value = registro.NOMBRE_P;
	}else if(document.getElementsByName('razonSocial480')[0] !== undefined) {
		console.log('Debería estar en 480');
		document.getElementsByName('razonSocial480')[0].value = registro.RSO;
		document.getElementsByName('nit480')[0].value = registro.NIT;
		document.getElementsByName('nombreComercial480')[0].value = registro.NOCO;
		document.getElementsByName('inscripcion480')[0].value = registro.N_INSCRIP;
		document.getElementsByName('propietario480')[0].value = registro.NOMBRE_P;
	}else if(document.getElementsByName('razonSocial474')[0] !== undefined){
		console.log('Debería estar en 474');
		document.getElementsByName('razonSocial474')[0].value = registro.RSO;
		document.getElementsByName('nit474')[0].value = registro.NIT;
		document.getElementsByName('nombreComercial474')[0].value = registro.NOCO;
		document.getElementsByName('inscripcion474')[0].value = registro.N_INSCRIP;
		document.getElementsByName('propietario474')[0].value = registro.NOMBRE_P;
	}else if(document.getElementsByName('razonSocial440')[0] !== undefined){
		console.log('Debería estar en 440');
		document.getElementsByName('razonSocial440')[0].value = registro.RSO;
		document.getElementsByName('nit440')[0].value = registro.NIT;
		document.getElementsByName('nombreComercial440')[0].value = registro.NOCO;
		document.getElementsByName('inscripcion440')[0].value = registro.N_INSCRIP;
		document.getElementsByName('propietario440')[0].value = registro.NOMBRE_P;
	}else{
		console.log('Deberíamos estar en el 493');
		//console.log(document.getElementsByName('razonSocial479')[0]);
		document.getElementsByName('id493')[0].value = registro._id;
		document.getElementsByName('fecha493')[0].value = registro.FECHA;
		document.getElementsByName('razonSocial493')[0].value = registro.RSO;
		document.getElementsByName('nit493')[0].value = registro.NIT;
		document.getElementsByName('nombreComercial493')[0].value = registro.NOCO;
		document.getElementsByName('inscripcion493')[0].value = registro.N_INSCRIP;
		document.getElementsByName('propietario493')[0].value = registro.NOMBRE_P;
	}
} 

function createRadio(registro){
	var radio = document.createElement('input');
	radio.type = 'radio';
	radio.setAttribute('name',"seleInscrito");
	radio.value = registro._id;
	radio.addEventListener('click', escogerInscrito.bind(this, registro));

	var span = document.createElement('span');
	span.className = 'input-group-addon';
	span.appendChild(radio);

	var td = document.createElement('td');
	td.appendChild(span);

	return td;
}

function mostrarInscritos493(){
	db493.allDocs({include_docs: true, descending: true}).then ( doc => {
		var tbody = document.getElementById('inscritos');
		tbody.innerHTML = '';
		var contador = 0;
		doc.rows.forEach( registro => {
			//console.log(registro.doc._id);
			contador++;
			var tr = document.createElement('tr');
			tr.appendChild(createColumns(contador));
			tr.appendChild(createColumns(registro.doc.NOCO));
			tr.appendChild(createColumns(registro.doc.N_INSCRIP));
			tr.appendChild(createColumns(registro.doc.FECHA));
			tr.appendChild(createColumns(registro.doc.NOMBRE_P));
			tr.appendChild(createRadio(registro.doc));
			tbody.appendChild(tr);
		});
		$('#tablaInscritos').DataTable();
	});
}

/*function eliminarInscritos(){
	db493.destroy().then(resp => console.log);
}*/

//Aquí se usa la función json(), que funciona similar a JSON.parse()
function cargarInscritos493(){
	//fetch('http://localhost/formularioVisaludAPI/public/inscritos')
	fetch('https://sisbenpro.com/public/inscritosVisual')
		.then( resp => resp.json() )
		.then( respObj => {
			db493.destroy().then( response => {
				console.log('Base de datos anterior eliminada');
				db493 = new PouchDB('inscritosCargados493');
				console.log('Nueva base de datos creada');
				respObj.forEach(function(registro){
					var id = { _id: registro.id.toString() };
					// Con la siguiente línea se añade la variable _id al objeto			
					registro = Object.assign(id,registro);   
					//console.log(registro);
					db493.put(registro, function callback(err, result){
						if (!err) {
							console.log('inscrito guardado en base de datos');
						}else {
							console.log('problemas guardando inscrito en base de datos', err);
						}
					});
				});
				mostrarInscritos493();
			});
		})
		.catch( err => alert('Hubo problemas con la conexión a la base de datos. Intente una vez más o revise su conexión a internet') );
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

function guardarInscrito493(){
	//var depto = $('input:text[name=depto]').val();
	var depto = document.getElementsByName('depto493')[0].value;
	var mpio = $('input:text[name=mpio493]').val();
	var fecha = document.getElementsByName('fecha493')[0].value;
	var inscripcion = document.getElementsByName('inscripcion493')[0].value;
	var razonSocial = $('input:text[name=razonSocial493]').val();
	var nombreComercial = $('input:text[name=nombreComercial493]').val();
	var nitEsta = $('input:text[name=nit493]').val();
	var nombrePropietario = $('input:text[name=propietario493]').val();
	var tipoId = document.getElementsByName('tipoId493')[0].value;
	var documento = document.getElementsByName('identificacion493')[0].value;
	var direccion = document.getElementsByName('direccion493')[0].value;
	var zona = document.getElementsByName('zona493')[0].value;
	var nomTerrInscrito = document.getElementsByName('nomTerr493')[0].value;
	var celInscrito = document.getElementsByName('cel493')[0].value;
	var faxInscrito = document.getElementsByName('fax493')[0].value;
	var telInscrito = document.getElementsByName('tel493')[0].value;
	var correoPropInscrito = document.getElementsByName('correoProp493')[0].value;
	var autorizaPropInscrito = document.getElementsByName('autorizaProp493')[0].value;
	var dirNotifInsc = document.getElementsByName('dirNotif493')[0].value;
	var visitadoInsc = document.getElementsByName('visitado493')[0].value;
	var deptoNotifInsc = document.getElementsByName('deptoNotif493')[0].value;
	var mpioNotifInsc = document.getElementsByName('mpioNotif493')[0].value;
	var fechaUltVisita = document.getElementsByName('fechaUltVisita493')[0].value;
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
	var idExistente = document.getElementsByName('id493')[0].value;

	var comuna = '';
	//var barrio = '';
	var localidad = '';
	var sector = '';
	var corregto = '';
	var upz = '';
	var caserio = '';
	var otro = '';

	var territorio = document.getElementsByName('territorio493');	
	var actividad = document.getElementsByName('actividad493');	
	console.log(actividad);
	
	/*var arrTerritorio = [];
	for (var i = territorio.length - 1; i >= 0; i--) {
		if (territorio[i].checked){
			arrTerritorio.push(territorio[i].value);
		}
	};  //Con esto recogemos valores de checkbox */

	var radioTerritorio = "";
	for (var i = territorio.length - 1; i >= 0; i--) {
		if (territorio[i].checked) {
			radioTerritorio = territorio[i].value;
			switch (radioTerritorio){
				case 'comuna':
				comuna = 'X';
				break;
				/*case 'barrio':
				barrio = 'X';
				break;*/
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
	var inscrito = {
			DPPTO: depto,
			CODEPTO: 76,
			CIUDAD: mpio,
			COMUN: 130,
			FECHA: fecha,
			N_INSCRIP: inscripcion,
			ENTIDAD: '',	 //Debe traerse de f440
			SOPROVIS: '',			//campos no funcionales que es mejor remover
			SO: '',					//campos no funcionales que es mejor remover
			RSO: razonSocial,
			NIT: nitEsta,
			NOCO: nombreComercial,
			NOMBRE_P: nombrePropietario,
			CC_P: '',					//campos no funcionales que es mejor remover
			CE_P: '',					//campos no funcionales que es mejor remover
			TID_P: tipoId,
			DOC_P: documento,
			DIRECC: direccion,
			ZONA: zona,
			RURAL: '',					//campos no funcionales que es mejor remover
			URBANO: '',					//campos no funcionales que es mejor remover
			COMUNA: comuna,
			CBARRIO: '',				//campos no funcionales que es mejor remover
			BARRIO: nomTerrInscrito,	//Lo que más coincide con el esquema vfp es que en esta variable se guarde el nombre del barrio o corregimiento, lo que va en el campo de testo Cual?
			CVEREDA: '',				//campos no funcionales que es mejor remover
			VEREDA: '',					//campos no funcionales que es mejor remover
			LOCALIDAD: localidad,
			SECTOR: sector,
			CORREGTO: corregto,
			CASERIO: caserio,
			UPZ: upz,
			OTRO: otro,
			NOLOCA: nomTerrInscrito,
			TELS: telInscrito,
			FAX: faxInscrito,
			CELULAR: celInscrito,
			CORREO: correoPropInscrito,
			DIR_NOT: dirNotifInsc,
			VISITO: funcUltVisita, //Campo en vfp se llama dir_not_e... se requiere cambiar ese nombre de campo
			AUTORIZA: autorizaPropInscrito,
			DPTO_NOT_E: '',				//Campo sin uso
			MPIO_NOT_E: '',				//Campo sin uso
			MAMER: '',			//Debe traerse de f440
			DIR_NOTI: '',				//Campo sin uso
			DPTO_NOTI: deptoNotifInsc,
			MPIO_NOTI: mpioNotifInsc,
			COD_ACTIVI: '',				//Campo sin uso
			ACTIVIDAD: '',				//Campo sin uso
			A01: '',
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
			A82: '',
			VISITADO: visitadoInsc,
			F_UV: fechaUltVisita,
			CUV: conceptoUltVisita,
			NOMBRE_F1: recibe493,
			ID_F1: idRecibe493,
			CARGO_F1: cargoRecibe493,
			ENTIDAD_F1: '',				//campos no funcionales que es mejor remover
			NOMBRE_F2: '',					//campos no funcionales que es mejor remover
			ID_F2: '',					//campos no funcionales que es mejor remover
			CARGO_F2: '',					//campos no funcionales que es mejor remover
			ENTIDAD_F2: '',					//campos no funcionales que es mejor remover
			NOMBRE_E1: inscribe493,
			ID_E1: idInscribe493,
			CARGO_E1: cargoInscribe493,
			NOMBRE_E2: '',					//campos no funcionales que es mejor remover
			ID_E2: '',					//campos no funcionales que es mejor remover
			CARGO_E2: '',					//campos no funcionales que es mejor remover
			OBSERVA_AU: obAutoridad493,
			OBSERVA_E1: obPersona493,	//Aunque en vfp aparece f1, en verdad es la observacion de e1, modificación que se debe hacer en visual
			ACTIVO: '',					//campos no funcionales que es mejor remover
			GRABADO: ''					//campos no funcionales que es mejor remover
		};
	
	var id;
	if(idExistente == 0){
		id = new Date().toISOString();
		var insertar = { _id: id };
		inscrito = Object.assign( insertar, inscrito );
		console.log(inscrito);
		dbNuevos493.put(inscrito, function callback(err, result){
			if (!err) {
				alert('inscrito guardado en base de datos');
			}else {
				alert('problemas guardando inscrito en base de datos');
			}
		});
		db493.put(inscrito, function callback(err, result){
			if (!err) {
				alert('inscrito guardado en base de datos');
			}else {
				alert('problemas guardando inscrito en base de datos');
			}
		});				
	}else{
		id = idExistente;
		var insertar;
		db493.get(idExistente).then( doc => {
			insertar = { 
				_id: doc._id,
				_rev: doc._rev
			};
			inscrito = Object.assign(insertar, inscrito);
			db493.put(inscrito, function callback(err, result){
				if (!err) {
					alert('inscrito guardado en base de datos');
				}else {
					alert('problemas guardando inscrito en base de datos: '+err);
					console.log(err);
				}
			});
			delete inscrito._rev;
			delete inscrito._id;
			id = new Date().toISOString();
			insertar = { _id: id };
			inscrito = Object.assign( insertar, inscrito );
			console.log(inscrito);
			dbNuevos493.put(inscrito, function callback(err, result){
				if (!err) {
					alert('inscrito guardado en base de datos');
				}else {
					alert('problemas guardando inscrito en base de datos: '+err);
					console.log(err);
				}
			});
		});
	}
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
	var correoPropInscrito = document.getElementsByName('correo474')[0].value;
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
	var nitEsta = $('input:text[name=nit474]').val();
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
