function obtenerCodigo(usuario){
	let indice;
	switch(usuario){
		case 'CLMARTINEZ':
			indice = '01';
			break;
		case 'BBEDOYA':
			indice = '02';
			break;
		case 'JREYES':
			indice = '03';
			break;
		case 'EPEREA':
			indice = '04';
			break;
		case 'EPALMA':
			indice = '05';
			break;
		case 'DLLANOS':
			indice = '06';
			break;
		case 'OBETANCOUR':
			indice = '07';
			break;
		case 'JCARDENAS':
			indice = '08';
			break;
		case 'JCRESTREPO':
			indice = '09'
			break;
		case 'MARIOR':
			indice = '10';
			break;
		case 'CRESTREPO':
			indice = '11';
			break;
		case 'GCAICEDO':
			indice = '13';
			break;
		case 'GCARVAJAL':
			indice = '14';
			break;
		case 'MRAMOS':
			indice = '15';
			break;
		case 'JOPANCE':
			indice = '16';
			break;
		case 'VCORTES':
			indice = '17';
			break;
		case 'AYDAVILA':
			indice = '18';
			break;
		case 'MGARCES':
			indice = '19';
			break;
		case 'ADAVILA':
			indice = '20';
			break;
		default:
			indice = 'error';
			alert('El usuario no está registrado para obtener código');
			break;
	}
	return indice;
}

function login(){
	let funcionarios = [
		{
			nombre: 'JEFFREY REYES BOLAÑOS',
			usuario: 'JREYES',
			indice: '03',
			cedula: '1113520846'
		},
		{
			nombre: 'EDISON PALMA',
			usuario: 'EPALMA',
			indice: '05',
			cedula: '94041224'
		},
		{
			nombre: 'DIEGO FERNANDO LLANOS',
			usuario: 'DLLANOS',
			indice: '06',
			cedula: '14702330'
		},
		{
			nombre: 'OLVER ANDRES BETANCOUR',
			usuario: 'OBETANCOUR',
			indice: '07',
			cedula: '1113534977'
		},
		{
			nombre: 'MARIO RESTREPO',
			usuario: 'MARIOR',
			indice: '10',
			cedula: '6332086'
		},
		{
			nombre: 'CARLOS MARIO RESTREPO',
			usuario: 'CRESTREPO',
			indice: '11',
			cedula: '16845913'
		},
		{
			nombre: 'GABRIEL CAICEDO SANCHEZ',
			usuario: 'GCAICEDO',
			indice: '13',
			cedula: '14888544'
		},
		{
			nombre: 'GISELL CARVAJAL SARRIA',
			usuario: 'GCARVAJAL',
			indice: '14',
			cedula: '66969137'
		},
		{
			nombre: 'CLAUDIA MERCEDES RAMOS QUINTERO',
			usuario: 'CMRAMOS',
			indice: '15',
			cedula: '66975312'
		},
		{
			nombre: 'JORGE ARMANDO OPANCE VACA',
			usuario: 'JOPANCE',
			indice: '16',
			cedula: '1113643925'
		},
		{
			nombre: 'ANA YULIETH DAVILA PAS',
			usuario: 'AYDAVILA',
			indice: '17',
			cedula: '1113539368'
		},
		{
			nombre: 'VIVIANA CORTES',
			usuario: 'VCORTES',
			indice: '18',
			cedula: '1113515576'
		},
		{
			nombre: 'MAURICIO GARCES',
			usuario: 'MGARCES',
			indice: '19',
			cedula: '1113518928'
		},
	];
	let estado;
	let usuario = document.getElementsByName('nomUsuario')[0].value;
	let indice = funcionarios.findIndex(element => element.usuario == usuario);
	console.log('indice usuario', usuario, indice);
	let clave = document.getElementsByName('password')[0].value;
	// let codigoUsuario = obtenerCodigo(usuario) !== 'error' ? obtenerCodigo(usuario) : null;
	if(indice > 0){
		clave == 'GC130' ? estado = true : estado = false;
		if (estado) {
			localStorage.setItem('estado', JSON.stringify(estado));
			localStorage.setItem('usuario', JSON.stringify(funcionarios[indice]));	
			localStorage.setItem('codigoUsuario', JSON.stringify(funcionarios[indice].indice))		
			window.location.replace("menu0.html");
		}else{
			alert('Clave incorrecta');
		}
	}else{
		alert('El usuario no está registrado para obtener código');
	}
}

function logout(){
	let estado = false;
	localStorage.setItem('estado', JSON.stringify(estado));
	localStorage.removeItem('usuario');
	localStorage.removeItem('codigoUsuario');
	window.location.replace("index.html");
}

function verificarSesionLocal(){
	let estado = localStorage.getItem('estado');
	let usuario = localStorage.getItem('usuario');
	if (estado == 'false') {
		console.log(estado);
		window.location.replace("index.html");
	}else{
		console.log("Usuario loggeado: ", usuario);
	}
}