function login(){
	let estado;
	let usuario = document.getElementsByName('nomUsuario')[0].value;
	let clave = document.getElementsByName('password')[0].value;
	clave == 'GC130' ? estado = true : estado = false;
	localStorage.setItem('estado', JSON.stringify(estado));
	localStorage.setItem('usuario', JSON.stringify(usuario));
	if (estado) {
		alert('Login exitoso');
		window.location.replace("menu0.html");
	}else{
		alert('Clave incorrecta');
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