
var db = new PouchDB('pruebaVisalud');

mostrarInscritos();

db.changes({
	since: 'now',
	live: true
}).on('change', mostrarInscritos);

function guardarInscrito(){
	//var depto = $('input:text[name=depto]').val();
	var depto = document.getElementsByName('depto')[0].value;
	var mpio = $('input:text[name=mpio]').val();
	var fecha = document.getElementsByName('fechaInsc')[0].value;
	var inscripcion = document.getElementsByName('inscripcion')[0].value;
	var razonSocial = $('input:text[name=razonSocial]').val();
	var nitEsta = $('input:text[name=nit]').val();
	var nombreComercial = $('input:text[name=nombreComercial]').val();
	var nombrePropietario = $('input:text[name=propietario]').val();

	var territorio = document.getElementsByName('territorio');
	//console.log(territorio);
	
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
		}  
	}; 

	//console.log(inscripcion,fecha);
	id = new Date().toISOString();

	//console.log(arrTerritorio);
	var inscrito = {
		_id: id,
		dppto: depto,
		codepto: 76,
		ciudad: mpio,
		comun: 130,
		fechaInsc: fecha,
		noInscripcion: inscripcion,
		razonSocial: razonSocial,
		nit: nitEsta,
		noco: nombreComercial,
		nombre_p: nombrePropietario,
		//tipoTerritorio: arrTerritorio
		tipoTerritorio: radioTerritorio
	};
	console.log(inscrito);

	db.put(inscrito, function callback(err, result){
		if (!err) {
			alert('inscrito guardado en base de datos');
		}else {
			alert('problemas guardando inscrito en base de datos');
		}
	});
}


function createColumns(arreglo){
	var td = document.createElement('td');
	td.innerHTML = arreglo;
	return td;
}

function mostrarInscritos(){
	db.allDocs({include_docs: true, descending: true}).then ( doc => {
		var tbody = document.getElementById('inscritos');
		tbody.innerHTML = '';
		doc.rows.forEach(function(registro){
			//console.log(registro.doc);
			var tr = document.createElement('tr');
			tr.appendChild(createColumns(registro.doc.razonSocial));
			tr.appendChild(createColumns(registro.doc.nit));
			tr.appendChild(createColumns(registro.doc.noInscripcion));
			tr.appendChild(createColumns(registro.doc.fechaInsc));
			tr.appendChild(createColumns(registro.doc.nombre_p));
			tbody.appendChild(tr);
		});
	});
}

function archivoInscritos(){
	db.allDocs({include_docs: true, descending: true}).then ( doc => {
		//console.log(doc.rows);
		var infoEnJson = JSON.stringify(doc.rows);
		var infoEnObjeto = JSON.parse(infoEnJson);
		//var boton = document.getElementById('todosInscritos');

		//console.log(infoEnJson);
		//console.log(infoEnObjeto);
		//boton.download = "inscritos.json";
		//boton.href = "data:application/octet-stream," + encodeURIComponent(info);
	
	});	
}

//archivoInscritos();


