function login(){
	let estado;
	let consecutivo = 0;
	localStorage.setItem('consecutivo', JSON.stringify(consecutivo));
	let clave = document.getElementsByName('password')[0].value;
	clave == 'GC130' ? estado = true : estado = false;
	localStorage.setItem('estado', JSON.stringify(estado));
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
	window.location.replace("index.html");
}

function verificarSesionLocal(){
	let estado = localStorage.getItem('estado');
	if (estado == 'false') {
		console.log(estado);
		window.location.replace("index.html");
	}else{
		console.log("Problemas con el if");
	}
}