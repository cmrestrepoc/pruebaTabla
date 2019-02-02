function login(){
	let estado;
	let clave = document.getElementsByName('password')[0].value;
	clave == 'VISALUD|*candelaria2019' ? estado = true : estado = false;
	localStorage.setItem('estado', JSON.stringify(estado));
	if (estado) {
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