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
	let estado;
	let usuario = document.getElementsByName('nomUsuario')[0].value;
	let clave = document.getElementsByName('password')[0].value;
	let codigoUsuario = obtenerCodigo(usuario) !== 'error' ? obtenerCodigo(usuario) : null;
	if(codigoUsuario){
		clave == 'GC130' ? estado = true : estado = false;
		if (estado) {
			localStorage.setItem('estado', JSON.stringify(estado));
			localStorage.setItem('usuario', JSON.stringify(usuario));
			localStorage.setItem('codigoUsuario', codigoUsuario);
			window.location.replace("menu0.html");
		}else{
			alert('Clave incorrecta');
		}
	}
}

function logout(){
	let estado = false;
	localStorage.setItem('estado', JSON.stringify(estado));
	localStorage.removeItem('usuario');
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