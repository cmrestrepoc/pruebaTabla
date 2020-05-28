// Service worker

//Se verifica que el nagegador pueda usar el serviceWorker
if('serviceWorker' in navigator){
	console.log('Puedes usar los serviceWorker en tu navegador');

	navigator.serviceWorker.register('./sw.js')
						.then(res => console.log('serviceWorker cargado correctamente', res))
						.catch(err => console.log('serviceWorker no se ha podido registrar', err));
}else{
	console.log('NO PUEDES usar los serviceWorker en tu navegador');
}

function contarElementosCache(){
	caches.open('v3_cache_visalud_pwa')
		.then(cache => {
			cache.keys()
				.then(keys => document.getElementsByName('versionContent')[0].innerHTML += ' - Caché: ' + keys.length)
				.catch(err => console.log('Problemas abriendo el cache', err));
		})
}

function setConcepto(objeto, destino) {
	var concepto = objeto.value;

	switch(concepto){
		case '1':
			document.getElementsByName(destino)[0].value = 'FAVORABLE';
			break;
		case '2':
			document.getElementsByName(destino)[0].value = 'FAVORABLE CON REQUERIMIENTOS';
			break;
		case '3':
			document.getElementsByName(destino)[0].value = 'DESFAVORABLE';
			break;
		default:
			document.getElementsByName(destino)[0].value = '';
	}
}

function setMotivo(objeto, destino) {
	var motivo = objeto.value;

	switch(motivo){
		case '01':
			document.getElementsByName(destino)[0].value = 'PROGRAMACIÓN';
			break;
		case '02':
			document.getElementsByName(destino)[0].value = 'SOLICITUD DEL INTERESADO';
			break;
		case '03':
			document.getElementsByName(destino)[0].value = 'ASOCIADA A PQRS';
			break;
		case '04':
			document.getElementsByName(destino)[0].value = 'SOLICITUD OFICIAL';
			break;
		case '05':
			if(destino == 'textoMotivo440'){
				document.getElementsByName(destino)[0].value = 'SEGUIMIENTO A VISITA ANTERIOR';
			}else{
				document.getElementsByName(destino)[0].value = 'EVENTO DE INTERÉS EN SALUD PÚBLICA';
			};
			break;
		case '06':
			document.getElementsByName(destino)[0].value = 'SOLICITUD DE PRÁCTICA DE PRUEBAS/PR';
			break;
		case '09':
			document.getElementsByName(destino)[0].value = 'OTRO';
			break;
		default:
			document.getElementsByName(destino)[0].value = '';
	}
}

var puntajeBloques = [];

function evaluarBloque(evaluacion, puntaje, resultado, indice){
	var evaluaciones = document.getElementsByName(evaluacion);
	var puntos = document.getElementsByName(puntaje);	
	var i = 0;
	var suma = 0;
	
	evaluaciones.forEach( eva => {
		//console.log ((evaluaciones[i].value*puntos[i].innerHTML));
		suma = suma + (eva.value*puntos[i].innerHTML);
		i++;
	})
	
	document.getElementsByName(resultado)[0].value = suma;
	puntajeBloques[indice] = suma;
	//console.log(puntajeBloques);
}


function consolidarPuntaje(con, puntaje){
	var puntajeTotal = 0;
	var concepto = 0;

	for (var i = 0; i < puntajeBloques.length; i++) {
		if(puntajeBloques[i] != null){
			puntajeTotal += puntajeBloques[i];
		}else{
			puntajeTotal += 0;
		}
	};

	if (puntajeTotal >= 90) {
		concepto = 1;
	}else if (puntajeTotal < 90 && puntajeTotal >= 60){
		concepto = 2;
	}else {
		concepto = 3;
	}
	
	//console.log(puntajeTotal);
	document.getElementsByName(con)[0].value = concepto;
	document.getElementsByName(puntaje)[0].value = puntajeTotal;
}

function crearInput(name, tipoInput){
	let input = document.createElement('input');
	input.type = tipoInput;
	input.className = 'form-control';
	input.setAttribute('name', name);

	return input; 
}

function crearColumna(name, tipoInput){
	let td = document.createElement('td');
	td.appendChild(crearInput(name, tipoInput));
	return td;
}

function crearMuestra(){
	let tbody = document.getElementById('muestras');
	let tr = document.createElement('tr');
	//let listado = document.getElementById('listadoMuestras');
	//let br = document.createElement('br');
	
	tr.appendChild(crearColumna('Orden', 'text'));
	tr.appendChild(crearColumna('Um', 'text'));
	tr.appendChild(crearColumna('Contenido', 'text'));
	tr.appendChild(crearColumna('Producto', 'text'));
	tr.appendChild(crearColumna('Temperatura', 'text'));
	tr.appendChild(crearColumna('TipoEnvase', 'text'));
	tr.appendChild(crearColumna('LoteFechaV', 'text'));
	tr.appendChild(crearColumna('RegSanit', 'text'));

	tbody.appendChild(tr);
	//listado.parentNode.insertBefore(br, listado.nextSibling);
}

function crearMuestraCongelado(){
	let tbody = document.getElementById('muestrasCongelado');
	let tr = document.createElement('tr');
	
	tr.appendChild(crearColumna('producto', 'text'));
	tr.appendChild(crearColumna('lote', 'text'));
	tr.appendChild(crearColumna('presentaci', 'text'));
	tr.appendChild(crearColumna('cantidad', 'text'));
	tr.appendChild(crearColumna('fv', 'date'));
	tr.appendChild(crearColumna('invima', 'text'));

	tbody.appendChild(tr);
	//listado.parentNode.insertBefore(br, listado.nextSibling);
}

function loginServer(){
	let user = JSON.parse(localStorage.getItem('usuario'));
	let clave = document.getElementsByName('password')[0].value;

	let data = 'nombreUsuario='+user+'&clave='+clave;

	let identity = {
		usuario: user,
		token: ''
	};
	//console.log(data);
	fetch('https://sisbenpro.com/public/loginVisalud', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: data
	})
	.then( res => {
		res.json()
		.then( jsonRes => {
			if (jsonRes.err != undefined) {
				var identidad = JSON.parse(localStorage.getItem('identity'));
				if (identidad != undefined) {
					//identidad = JSON.parse(localStorage.getItem('identity'));
					fetch('https://sisbenpro.com/public/cerrarSesion/'+identidad.usuario)
					.then( res => res.json() )
					.then( jsonRes => alert('Sesión cerrada por precaución. ' + jsonRes.res) );
					localStorage.removeItem('identity');				
				} else{
					alert('Error: ' + jsonRes.err);
				}
				location.reload();
			}else if (jsonRes.token == 'Usuario ya está loggeado') {
				alert('Este usuario está bloqueado. Posiblemente por decisión del administrador del sistema o porque otro dispositivo lo está usando');
				history.back();
			}else{
				identity.token = jsonRes.token;
				localStorage.setItem('identity', JSON.stringify(identity));
				console.log('respuesta POST', jsonRes);
				console.log(identity);
				history.back();
			}
		});
	})
	.catch( err => alert('Problemas con la conexión a internet', err.json()) );
}

function estabNumInscripcion(valor, formulario){
	let event = new Event('input');
	let elementoInscripcion = document.getElementsByName('inscripcion' + formulario)[0];
	elementoInscripcion.value += valor;
	elementoInscripcion.dispatchEvent(event);
}

function vehiNumInscripcion(valor){
	let event = new Event('input');
	let elementoInscripcion = document.getElementsByName('inscripcion444')[0];
	elementoInscripcion.value = '76130' + valor;
	elementoInscripcion.dispatchEvent(event);
}

function auxiliarInscVehi(valor){
	if(document.getElementsByName('placaSrmque444')[0].value == '' && document.getElementsByName('placaRemolque444')[0].value == ''){
		let event = new Event('input');
		let elementoInscripcion = document.getElementsByName('inscripcion444')[0];
		elementoInscripcion.value += valor;
		elementoInscripcion.dispatchEvent(event);
	}
}

function setSujeto(value, destino) {
	let objeto = {}
	if (destino.indexOf('26') !== -1){
		objeto = [
			{ tipoSujeto: '479-1', sujeto: "RESTAURANTES - PANADERIAS - Y/O PASTELERIAS - CAFETERIAS - FRUTERIAS - COMIDAS RAPIDAS - SERVICIO DE BANQUETES - OFERTA DE ALIMENTACION POR REDES S." },
			{ tipoSujeto: '479-2', sujeto: "COMEDORES ESCOLARES (INCLUYE PAE Y PRIVADOS) INFANTILES (ICBF - INPEC) - COLEGIOS Y UNIVERSIDADES" },
			{ tipoSujeto: '479-3', sujeto: "COMEDORES CARCELARIOS (USPEC) - FUERZAS MILITARES Y POLICIVAS" },
			{ tipoSujeto: '479-4', sujeto: "COMEDORES HOGARES GERIATRICOS - ASILOS - HOSPITALES - CASINOS DE EMPRESAS O FABRICAS - CLUBES SOCIALES" },
			{ tipoSujeto: '479-5', sujeto: "HOTELES - MOTELES - HOSTALES - RESIDENCIAS Y CASAS DE LENOCINIO CON PREPARACION DE ALIMENTOS" },
			{ tipoSujeto: '479-6', sujeto: "ESTABLECIMIENTOS DE PREPARACION DE ALIMENTOS AL INTERIOR DE PLAZAS DE MERCADO - CENTRALES DE ABASTO - PLAZOLETAS DE COMIDA - ZONAS FRANCAS" },
			{ tipoSujeto: '481-1', sujeto: "BODEGAS PARA ALMACENAMIENTO DE ALIMENTOS Y/O BEBIDAS INCLUIDAS ZONAS FRANCAS" },
			{ tipoSujeto: '481-2', sujeto: "ALMACENAN Y DISTRIBUYEN" },
			{ tipoSujeto: '481-3', sujeto: "DADORES DE FRIO" },
			{ tipoSujeto: '495-1', sujeto: "TIENDAS DE BARRIO I CIGARRERIAS INCLUIDAS ZONAS FRANCAS" },
			{ tipoSujeto: '495-2', sujeto: "MINI MERCADO" },
			{ tipoSujeto: '495-3', sujeto: "EXPENDIO CON OPERACIONES DE PORCIONADO - TROCEADO O ACONDICIONAMIENTO" },
			{ tipoSujeto: '495-4', sujeto: "EXPENDIO DE PRODUCTOS DE LA PESCA" },
			{ tipoSujeto: '495-5', sujeto: "CHARCUTERIAS Y SALSAMENTARIAS" },
			{ tipoSujeto: '495-6', sujeto: "VENTA DE LECHE CRUDA" },
			{ tipoSujeto: '440-1', sujeto: "CARNICERIAS Y FAMAS" },
			{ tipoSujeto: '440-2', sujeto: "CARNICERIA DE GRANDES SUPERFICIES - DE PLAZAS DE MERCADO" },
			{ tipoSujeto: '474-1', sujeto: "BARES" },
			{ tipoSujeto: '474-2', sujeto: "DISCOTECAS" },
			{ tipoSujeto: '474-3', sujeto: "CANTINAS" },
			{ tipoSujeto: '474-4', sujeto: "TABERNAS" },
			{ tipoSujeto: '474-5', sujeto: "CIGARRERIAS" },
			{ tipoSujeto: '474-6', sujeto: "LICORERAS" },
			{ tipoSujeto: '474-7', sujeto: "WHISKERIAS" },
			{ tipoSujeto: '474-8', sujeto: "PROSTIBULOS" },
			{ tipoSujeto: '474-9', sujeto: "CLUBES SOCIALES" },
			{ tipoSujeto: '478-1', sujeto: "GRAN SUPERFICIE" },
			{ tipoSujeto: '478-2', sujeto: "HIPERMERCADO" },
			{ tipoSujeto: '478-3', sujeto: "SUPERMERCADO" },
			{ tipoSujeto: '478-4', sujeto: "FRUVER" },
			{ tipoSujeto: '475-1', sujeto: "CENTRO DE ABASTO" },
			{ tipoSujeto: '475-2', sujeto: "PLAZA DE MERCADO" },
			{ tipoSujeto: '472-1', sujeto: "VEHICULO" },
			{ tipoSujeto: '480-1', sujeto: "PUESTO FIJO ESTACIONARIO" },
			{ tipoSujeto: '480-2', sujeto: "PUESTO MOVIL" },
			{ tipoSujeto: '480-3', sujeto: "PLAZA DE MERCADO MOVIL" },
			{ tipoSujeto: '480-4', sujeto: "MERCADO CAMPESINO" },
			{ tipoSujeto: '480-5', sujeto: "FOOD TRUCK" },
			{ tipoSujeto: '480-6', sujeto: "COMERCIALIZACION AMBULANTE DE LECHE CRUDA PARA CONSUMO HUMANO DIRECTO" } 
		]
	} else if (destino.indexOf('245') !== -1) {
		objeto = [
			{tipoSujeto: '24501', sujeto: 'VIVIENDA PERMANENTE'},
			{tipoSujeto: '2450101', sujeto: 'Conjuntos residenciales'},
			{tipoSujeto: '2450102', sujeto: 'Unidades habitacionales'},
			{tipoSujeto: '2450103', sujeto: 'Hogares geriátricos'},
			{tipoSujeto: '2450104', sujeto: 'Orfanatos'},
			{tipoSujeto: '2450105', sujeto: 'Hogar Gerontológico'},
			{tipoSujeto: '24502', sujeto: 'VIVIENDA TRANSITORIA'},
			{tipoSujeto: '2450201', sujeto: 'Campamentos'},
			{tipoSujeto: '2450202', sujeto: 'Albergues para trabajadores'},
			{tipoSujeto: '2450203', sujeto: 'Albergues a Victimas- refugiados- inmigrantes'},
			{tipoSujeto: '2450204', sujeto: 'Albergues para niños'},
			{tipoSujeto: '2450205', sujeto: 'Albergues'},
			{tipoSujeto: '2450206', sujeto: 'Hogares de paso'},
			{tipoSujeto: '2450207', sujeto: 'Hoteles'},
			{tipoSujeto: '2450208', sujeto: 'Aparta hoteles'},
			{tipoSujeto: '2450209', sujeto: 'Centros vacacionales'},
			{tipoSujeto: '2450210', sujeto: 'Camping'},
			{tipoSujeto: '2450211', sujeto: 'Moteles-Residencias-hostales'},
			{tipoSujeto: '2450212', sujeto: 'Amoblados'},
			{tipoSujeto: '2450213', sujeto: 'Centros Y Casas De Rehabilitación Y Reposo'},
			{tipoSujeto: '2450214', sujeto: 'Casa de huéspedes- Posadas turísticas-Ecohabs entendido como concesiones de parques nacionales para fines turísticos- Fincas turísticas'},
			{tipoSujeto: '2450215', sujeto: 'Hogares infantiles'},
			{tipoSujeto: '2450216', sujeto: 'Hogares de atención a madres solteras'},
			{tipoSujeto: '2450217', sujeto: 'Alojamiento En Casa De Huéspedes O Residencias Y/O Alojamiento En Habitaciones En Apartamentos Y Casas Particulares'},
			{tipoSujeto: '24503', sujeto: 'ESTABLECIMIENTOS EDUCATIVOS'},
			{tipoSujeto: '2450301', sujeto: 'Jardines infantiles'},
			{tipoSujeto: '2450302', sujeto: 'Guarderías'},
			{tipoSujeto: '2450303', sujeto: 'Colegios'},
			{tipoSujeto: '2450304', sujeto: 'Universidades'},
			{tipoSujeto: '2450305', sujeto: 'Institutos de educación no formal'},
			{tipoSujeto: '2450306', sujeto: 'Conventos'},
			{tipoSujeto: '2450307', sujeto: 'Seminarios'},
			{tipoSujeto: '2450308', sujeto: 'Anfiteatro Universidad'},
			{tipoSujeto: '2450309', sujeto: 'Casas Vecinales'},
			{tipoSujeto: '2450310', sujeto: 'Servicio De Educación Laboral Especial (Escuelas Comerciales- Centros De Capacitación)'},
			{tipoSujeto: '2450311', sujeto: 'Establecimientos de educación tecnológica'},
			{tipoSujeto: '2450312', sujeto: 'Establecimientos de educación técnica profesional'},
			{tipoSujeto: '2450313', sujeto: 'Escuelas deportivas'},
			{tipoSujeto: '2450314', sujeto: 'Escuelas Culturales'},
			{tipoSujeto: '2450315', sujeto: 'Establecimientos donde se preste otro tipo de educacion'},
			{tipoSujeto: '24504', sujeto: 'ESTABLECIMIENTOS CUARTELARIOS'},
			{tipoSujeto: '2450401', sujeto: 'Batallones- cuarteles y Afines'},
			{tipoSujeto: '24505', sujeto: 'ESTABLECIMIENTOS CARCELARIOS'},
			{tipoSujeto: '2450501', sujeto: 'Salas De Retenidos'},
			{tipoSujeto: '2450502', sujeto: 'Bases militares con reclusión'},
			{tipoSujeto: '2450503', sujeto: 'Cárcel'},
			{tipoSujeto: '2450504', sujeto: 'Centros De Retención De Menores'},
			{tipoSujeto: '24506', sujeto: 'ESTABLECIMIENTOS DE ESPECTACULOS PÚBLICOS'},
			{tipoSujeto: '2450601', sujeto: 'Estadios'},
			{tipoSujeto: '2450602', sujeto: 'Coliseos'},
			{tipoSujeto: '2450603', sujeto: 'Plazas de toros'},
			{tipoSujeto: '2450604', sujeto: 'Circos'},
			{tipoSujeto: '2450605', sujeto: 'Pistas de patinaje'},
			{tipoSujeto: '2450606', sujeto: 'Salas De Billar'},
			{tipoSujeto: '2450607', sujeto: 'Escuelas De Equitación'},
			{tipoSujeto: '2450608', sujeto: 'Canchas De Tejo'},
			{tipoSujeto: '2450609', sujeto: 'Galleras'},
			{tipoSujeto: '2450610', sujeto: 'Campos De Atletismo'},
			{tipoSujeto: '2450611', sujeto: 'Hipódromos'},
			{tipoSujeto: '2450612', sujeto: 'Parques de atracciones'},
			{tipoSujeto: '2450613', sujeto: 'Parques temáticos'},
			{tipoSujeto: '2450614', sujeto: 'picnic- camping- pistas de baile- juegos operados con monedas'},
			{tipoSujeto: '2450615', sujeto: 'Museos'},
			{tipoSujeto: '24507', sujeto: 'ESTABLECIMIENTOS DE DIVERSION PUBLICA'},
			{tipoSujeto: '2450701', sujeto: 'Centros culturales'},
			{tipoSujeto: '2450702', sujeto: 'Discotecas'},
			{tipoSujeto: '2450703', sujeto: 'Parques públicos'},
			{tipoSujeto: '2450704', sujeto: 'Parques naturales (Las edificaciones)'},
			{tipoSujeto: '2450705', sujeto: 'Conchas acústicas'},
			{tipoSujeto: '2450706', sujeto: 'Bibliotecas'},
			{tipoSujeto: '2450707', sujeto: 'Teatros'},
			{tipoSujeto: '2450708', sujeto: 'Salas de cine'},
			{tipoSujeto: '2450709', sujeto: 'Zoológicos (Las edificaciones)'},
			{tipoSujeto: '2450710', sujeto: 'Jardines botánicos (Las edificaciones)'},
			{tipoSujeto: '2450711', sujeto: 'Juegos de azar y apuestas'},
			{tipoSujeto: '2450712', sujeto: 'Clubes deportivos (Las edificaciones)'},
			{tipoSujeto: '2450713', sujeto: 'Centro de culto religioso'},
			{tipoSujeto: '2450714', sujeto: 'Club social (Las edificaciones)'},
			{tipoSujeto: '2450715', sujeto: 'Club privado'},
			{tipoSujeto: '2450716', sujeto: 'Parques de atracciones dentro de los centros Comerciales'},
			{tipoSujeto: '2450717', sujeto: 'Boleras'},
			{tipoSujeto: '2450718', sujeto: 'Bingos y salones de juego'},
			{tipoSujeto: '24508', sujeto: 'ESTABLECIMIENTOS INDUSTRIALES'},
			{tipoSujeto: '2450801', sujeto: 'Establecimientos que realicen transformación de madera y fabricación de productos de madera y de corcho- excepto muebles; fabricación de artículos de cestería y espartería'},
			{tipoSujeto: '2450802', sujeto: 'Coquización- fabricación de productos de la refinación del petróleo y actividad de mezcla de combustibles'},
			{tipoSujeto: '2450803', sujeto: 'Establecimientos donde se realiza la fabricación de sustancias y productos químicos'},
			{tipoSujeto: '2450804', sujeto: 'Establecimientos donde se realiza la fabricación de productos de caucho y de plástico'},
			{tipoSujeto: '2450805', sujeto: 'Establecimientos donde se realiza la fabricación de otros minerales no metálicos'},
			{tipoSujeto: '2450806', sujeto: 'Establecimientos donde se realiza la fabricación de productos metalúrgicos básicos'},
			{tipoSujeto: '2450807', sujeto: 'Establecimientos donde se realiza la fabricación de productos de metal- excepto maquinaria y equipo'},
			{tipoSujeto: '2450808', sujeto: 'Establecimientos donde se realiza la fabricación de productos informáticos- electrónicos y ópticos'},
			{tipoSujeto: '2450809', sujeto: 'Establecimientos donde se realiza la fabricación de aparatos y equipos eléctrico'},
			{tipoSujeto: '2450810', sujeto: 'Establecimientos donde se realiza la fabricación de vehículos automotores remolques y semirremolques'},
			{tipoSujeto: '2450811', sujeto: 'Establecimientos donde se realiza la fabricación de muebles- colchones y somieres'},
			{tipoSujeto: '2450812', sujeto: 'Otras industrias manufactureras'},
			{tipoSujeto: '2450813', sujeto: 'Establecimientos donde se realizan actividades de distribución de agua; evacuación y tratamiento de aguas residuales- gestión de desechos y actividades de saneamiento ambiental'},
			{tipoSujeto: '2450814', sujeto: 'Establecimientos Que Utilicen Como Materia Prima El Cuero-  Fábricas De Calzado Y Marroquinería- No Incluye Remontadoras'},
			{tipoSujeto: '2450815', sujeto: 'Establecimientos Que Utilicen Como Materia Prima El Cuero-  Fábricas De Calzado Y Marroquinería- No Incluye Remontadoras'},
			{tipoSujeto: '2450816', sujeto: 'Establecimientos Que Utilicen Como Materia Prima El Metal- Incluye Recubrimientos Galvánicos- Fundición- Tratamiento Térmico'},
			{tipoSujeto: '2450817', sujeto: 'Fabricación de papel- cartón y productos de papel y cartón'},
			{tipoSujeto: '2450818', sujeto: 'Establecimientos donde se realice la instalación- mantenimiento y reparación especializado de maquinaria y equipo'},
			{tipoSujeto: '2450819', sujeto: 'Establecimientos donde se realicen actividades relacionadas con la impresión'},
			{tipoSujeto: '2450820', sujeto: 'Establecimientos donde se realicen actividades de edición'},
			{tipoSujeto: '2450821', sujeto: 'Establecimientos Que Almacenen- Expendan Y Apliquen Plaguicidas'},
			{tipoSujeto: '2450822', sujeto: 'lavanderías de ropa y ropa hospitalaria'},
			{tipoSujeto: '2450823', sujeto: 'Estaciones de servicio'},
			{tipoSujeto: '24509', sujeto: 'ESTABLECIMIENTOS COMERCIALES'},
			{tipoSujeto: '2450901', sujeto: 'Agencias De Medicamentos- Tiendas Naturistas- productos farmacéuticos veterinarios'},
			{tipoSujeto: '2450902', sujeto: 'Depósitos De Medicamentos'},
			{tipoSujeto: '2450903', sujeto: 'Comercio de productos tales como: comercio al por menor de equipo fotográfico- óptico y de precisión- Comercio al por menor de toda clase de relojes- joyas y artículos de plata en general- artículos de esotéricos- tiendas de artículos sexuales (sex-shop)- floristerías- ópticas y galerías'},
			{tipoSujeto: '2450904', sujeto: 'Almacenes (comercio al mayor y al por menor)- Bancos- Oficinas- Salones De Juego- Apuestas Y Maquinitas-'},
			{tipoSujeto: '2450905', sujeto: 'Actividades de envase y empaque'},
			{tipoSujeto: '2450906', sujeto: 'Establecimientos veterinarios'},
			{tipoSujeto: '2450907', sujeto: 'Depósitos- Depósitos  de materiales de construcción- ferreterías- Chatarrería'},
			{tipoSujeto: '2450908', sujeto: 'Bodegas De Reciclaje'},
			{tipoSujeto: '2450909', sujeto: 'Cementerios (con o sin morgue)'},
			{tipoSujeto: '2450910', sujeto: 'Funerarias (con o sin laboratorio de tanatopraxia)'},
			{tipoSujeto: '2450911', sujeto: 'Morgues'},
			{tipoSujeto: '2450912', sujeto: 'Osarios  - cenízaros - colombiarios'},
			{tipoSujeto: '2450913', sujeto: 'Establecimientos de entretención para adultos y sitios de encuentro sexual: casas de lenocinio- Bares Swinger- Salas De Masaje Erótico - Saunas Y Turcos para población LGBTI Establecimientos Afines'},
			{tipoSujeto: '2450914', sujeto: 'Saunas- Turcos- Jacuzzi- Spa'},
			{tipoSujeto: '2450915', sujeto: 'Gimnasio'},
			{tipoSujeto: '2450916', sujeto: 'Misceláneas -cacharrerías'},
			{tipoSujeto: '2450917', sujeto: 'Peluquerías'},
			{tipoSujeto: '2450918', sujeto: 'Piscinas'},
			{tipoSujeto: '2450919', sujeto: 'Clínicas y Hospitales con internación (con o sin morgue)'},
			{tipoSujeto: '2450920', sujeto: 'Prestadores independientes- IPS sin  internación'},
			{tipoSujeto: '24510', sujeto: 'ESTABLECIMIENTOS HOSPITALARIOS Y SIMILARES'},
			{tipoSujeto: '2451001', sujeto: 'Consultorios Odontólogos'},
			{tipoSujeto: '2451002', sujeto: 'Laboratorios Clínicos  y de Sangre'},
			{tipoSujeto: '2451003', sujeto: 'Servicios de radiología  e imágenes diagnosticas'},
			{tipoSujeto: '2451004', sujeto: 'laboratorios de medicina forense   (con o sin morgue)'},
			{tipoSujeto: '2451005', sujeto: 'otras actividades de atención a la salud'},
			{tipoSujeto: '2451006', sujeto: 'otras actividades de atención a la salud'},
			{tipoSujeto: '24511', sujeto: 'PUNTOS DE ENTRADA- TERMINALES PORTUARIOS Y ACTIVIDADES CONEXAS'},
			{tipoSujeto: '241101', sujeto: 'Establecimientos donde se realicen actividades de transporte Terrestre'},
			{tipoSujeto: '241102', sujeto: 'Transporte acuático'},
			{tipoSujeto: '241103', sujeto: 'Transporte aéreo'},
			{tipoSujeto: '241104', sujeto: 'Almacenamiento y actividades complementarias al transporte'}
		]
	}
	let filtrado = objeto.filter(elemento => elemento.tipoSujeto === value);
	console.log('filtrado', filtrado);
	document.getElementsByName(destino)[0].value = filtrado[0].sujeto;
}