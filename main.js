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

var objetoSujetoComercial = [
    {value: '24501', text: 'VIVIENDA PERMANENTE'},
    {value: '2450101', text: 'Conjuntos residenciales'},
    {value: '2450102', text: 'Unidades habitacionales'},
    {value: '2450103', text: 'Hogares geriátricos'},
    {value: '2450104', text: 'Orfanatos'},
    {value: '2450105', text: 'Hogar Gerontológico'},
    {value: '24502', text: 'VIVIENDA TRANSITORIA'},
    {value: '2450201', text: 'Campamentos'},
    {value: '2450202', text: 'Albergues para trabajadores'},
    {value: '2450203', text: 'Albergues a Victimas- refugiados- inmigrantes'},
    {value: '2450204', text: 'Albergues para niños'},
    {value: '2450205', text: 'Albergues'},
    {value: '2450206', text: 'Hogares de paso'},
    {value: '2450207', text: 'Hoteles'},
    {value: '2450208', text: 'Aparta hoteles'},
    {value: '2450209', text: 'Centros vacacionales'},
    {value: '2450210', text: 'Camping'},
    {value: '2450211', text: 'Moteles-Residencias-hostales'},
    {value: '2450212', text: 'Amoblados'},
    {value: '2450213', text: 'Centros Y Casas De Rehabilitación Y Reposo'},
    {value: '2450214', text: 'Casa de huéspedes- Posadas turísticas-Ecohabs entendido como concesiones de parques nacionales para fines turísticos- Fincas turísticas'},
    {value: '2450215', text: 'Hogares infantiles'},
    {value: '2450216', text: 'Hogares de atención a madres solteras'},
    {value: '2450217', text: 'Alojamiento En Casa De Huéspedes O Residencias Y/O Alojamiento En Habitaciones En Apartamentos Y Casas Particulares'},
    {value: '24503', text: 'ESTABLECIMIENTOS EDUCATIVOS'},
    {value: '2450301', text: 'Jardines infantiles'},
    {value: '2450302', text: 'Guarderías'},
    {value: '2450303', text: 'Colegios'},
    {value: '2450304', text: 'Universidades'},
    {value: '2450305', text: 'Institutos de educación no formal'},
    {value: '2450306', text: 'Conventos'},
    {value: '2450307', text: 'Seminarios'},
    {value: '2450308', text: 'Anfiteatro Universidad'},
    {value: '2450309', text: 'Casas Vecinales'},
    {value: '2450310', text: 'Servicio De Educación Laboral Especial (Escuelas Comerciales- Centros De Capacitación)'},
    {value: '2450311', text: 'Establecimientos de educación tecnológica'},
    {value: '2450312', text: 'Establecimientos de educación técnica profesional'},
    {value: '2450313', text: 'Escuelas deportivas'},
    {value: '2450314', text: 'Escuelas Culturales'},
    {value: '2450315', text: 'Establecimientos donde se preste otro tipo de educacion'},
    {value: '24504', text: 'ESTABLECIMIENTOS CUARTELARIOS'},
    {value: '2450401', text: 'Batallones- cuarteles y Afines'},
    {value: '24505', text: 'ESTABLECIMIENTOS CARCELARIOS'},
    {value: '2450501', text: 'Salas De Retenidos'},
    {value: '2450502', text: 'Bases militares con reclusión'},
    {value: '2450503', text: 'Cárcel'},
    {value: '2450504', text: 'Centros De Retención De Menores'},
    {value: '24506', text: 'ESTABLECIMIENTOS DE ESPECTACULOS PÚBLICOS'},
    {value: '2450601', text: 'Estadios'},
    {value: '2450602', text: 'Coliseos'},
    {value: '2450603', text: 'Plazas de toros'},
    {value: '2450604', text: 'Circos'},
    {value: '2450605', text: 'Pistas de patinaje'},
    {value: '2450606', text: 'Salas De Billar'},
    {value: '2450607', text: 'Escuelas De Equitación'},
    {value: '2450608', text: 'Canchas De Tejo'},
    {value: '2450609', text: 'Galleras'},
    {value: '2450610', text: 'Campos De Atletismo'},
    {value: '2450611', text: 'Hipódromos'},
    {value: '2450612', text: 'Parques de atracciones'},
    {value: '2450613', text: 'Parques temáticos'},
    {value: '2450614', text: 'picnic- camping- pistas de baile- juegos operados con monedas'},
    {value: '2450615', text: 'Museos'},
    {value: '24507', text: 'ESTABLECIMIENTOS DE DIVERSION PUBLICA'},
    {value: '2450701', text: 'Centros culturales'},
    {value: '2450702', text: 'Discotecas'},
    {value: '2450703', text: 'Parques públicos'},
    {value: '2450704', text: 'Parques naturales (Las edificaciones)'},
    {value: '2450705', text: 'Conchas acústicas'},
    {value: '2450706', text: 'Bibliotecas'},
    {value: '2450707', text: 'Teatros'},
    {value: '2450708', text: 'Salas de cine'},
    {value: '2450709', text: 'Zoológicos (Las edificaciones)'},
    {value: '2450710', text: 'Jardines botánicos (Las edificaciones)'},
    {value: '2450711', text: 'Juegos de azar y apuestas'},
    {value: '2450712', text: 'Clubes deportivos (Las edificaciones)'},
    {value: '2450713', text: 'Centro de culto religioso'},
    {value: '2450714', text: 'Club social (Las edificaciones)'},
    {value: '2450715', text: 'Club privado'},
    {value: '2450716', text: 'Parques de atracciones dentro de los centros Comerciales'},
    {value: '2450717', text: 'Boleras'},
    {value: '2450718', text: 'Bingos y salones de juego'},
    {value: '24508', text: 'ESTABLECIMIENTOS INDUSTRIALES'},
    {value: '2450801', text: 'Establecimientos que realicen transformación de madera y fabricación de productos de madera y de corcho- excepto muebles; fabricación de artículos de cestería y espartería'},
    {value: '2450802', text: 'Coquización- fabricación de productos de la refinación del petróleo y actividad de mezcla de combustibles'},
    {value: '2450803', text: 'Establecimientos donde se realiza la fabricación de sustancias y productos químicos'},
    {value: '2450804', text: 'Establecimientos donde se realiza la fabricación de productos de caucho y de plástico'},
    {value: '2450805', text: 'Establecimientos donde se realiza la fabricación de otros minerales no metálicos'},
    {value: '2450806', text: 'Establecimientos donde se realiza la fabricación de productos metalúrgicos básicos'},
    {value: '2450807', text: 'Establecimientos donde se realiza la fabricación de productos de metal- excepto maquinaria y equipo'},
    {value: '2450808', text: 'Establecimientos donde se realiza la fabricación de productos informáticos- electrónicos y ópticos'},
    {value: '2450809', text: 'Establecimientos donde se realiza la fabricación de aparatos y equipos eléctrico'},
    {value: '2450810', text: 'Establecimientos donde se realiza la fabricación de vehículos automotores remolques y semirremolques'},
    {value: '2450811', text: 'Establecimientos donde se realiza la fabricación de muebles- colchones y somieres'},
    {value: '2450812', text: 'Otras industrias manufactureras'},
    {value: '2450813', text: 'Establecimientos donde se realizan actividades de distribución de agua; evacuación y tratamiento de aguas residuales- gestión de desechos y actividades de saneamiento ambiental'},
    {value: '2450814', text: 'Establecimientos Que Utilicen Como Materia Prima El Cuero-  Fábricas De Calzado Y Marroquinería- No Incluye Remontadoras'},
    {value: '2450815', text: 'Establecimientos Que Utilicen Como Materia Prima El Cuero-  Fábricas De Calzado Y Marroquinería- No Incluye Remontadoras'},
    {value: '2450816', text: 'Establecimientos Que Utilicen Como Materia Prima El Metal- Incluye Recubrimientos Galvánicos- Fundición- Tratamiento Térmico'},
    {value: '2450817', text: 'Fabricación de papel- cartón y productos de papel y cartón'},
    {value: '2450818', text: 'Establecimientos donde se realice la instalación- mantenimiento y reparación especializado de maquinaria y equipo'},
    {value: '2450819', text: 'Establecimientos donde se realicen actividades relacionadas con la impresión'},
    {value: '2450820', text: 'Establecimientos donde se realicen actividades de edición'},
    {value: '2450821', text: 'Establecimientos Que Almacenen- Expendan Y Apliquen Plaguicidas'},
    {value: '2450822', text: 'lavanderías de ropa y ropa hospitalaria'},
    {value: '2450823', text: 'Estaciones de servicio'},
    {value: '24509', text: 'ESTABLECIMIENTOS COMERCIALES'},
    {value: '2450901', text: 'Agencias De Medicamentos- Tiendas Naturistas- productos farmacéuticos veterinarios'},
    {value: '2450902', text: 'Depósitos De Medicamentos'},
    {value: '2450903', text: 'Comercio de productos tales como: comercio al por menor de equipo fotográfico- óptico y de precisión- Comercio al por menor de toda clase de relojes- joyas y artículos de plata en general- artículos de esotéricos- tiendas de artículos sexuales (sex-shop)- floristerías- ópticas y galerías'},
    {value: '2450904', text: 'Almacenes (comercio al mayor y al por menor)- Bancos- Oficinas- Salones De Juego- Apuestas Y Maquinitas-'},
    {value: '2450905', text: 'Actividades de envase y empaque'},
    {value: '2450906', text: 'Establecimientos veterinarios'},
    {value: '2450907', text: 'Depósitos- Depósitos  de materiales de construcción- ferreterías- Chatarrería'},
    {value: '2450908', text: 'Bodegas De Reciclaje'},
    {value: '2450909', text: 'Cementerios (con o sin morgue)'},
    {value: '2450910', text: 'Funerarias (con o sin laboratorio de tanatopraxia)'},
    {value: '2450911', text: 'Morgues'},
    {value: '2450912', text: 'Osarios  - cenízaros - colombiarios'},
    {value: '2450913', text: 'Establecimientos de entretención para adultos y sitios de encuentro sexual: casas de lenocinio- Bares Swinger- Salas De Masaje Erótico - Saunas Y Turcos para población LGBTI Establecimientos Afines'},
    {value: '2450914', text: 'Saunas- Turcos- Jacuzzi- Spa'},
    {value: '2450915', text: 'Gimnasio'},
    {value: '2450916', text: 'Misceláneas -cacharrerías'},
    {value: '2450917', text: 'Peluquerías'},
    {value: '2450918', text: 'Piscinas'},
    {value: '2450919', text: 'Clínicas y Hospitales con internación (con o sin morgue)'},
    {value: '2450920', text: 'Prestadores independientes- IPS sin  internación'},
    {value: '24510', text: 'ESTABLECIMIENTOS HOSPITALARIOS Y SIMILARES'},
    {value: '2451001', text: 'Consultorios Odontólogos'},
    {value: '2451002', text: 'Laboratorios Clínicos  y de Sangre'},
    {value: '2451003', text: 'Servicios de radiología  e imágenes diagnosticas'},
    {value: '2451004', text: 'laboratorios de medicina forense   (con o sin morgue)'},
    {value: '2451005', text: 'otras actividades de atención a la salud'},
    {value: '2451006', text: 'otras actividades de atención a la salud'},
    {value: '24511', text: 'PUNTOS DE ENTRADA- TERMINALES PORTUARIOS Y ACTIVIDADES CONEXAS'},
    {value: '241101', text: 'Establecimientos donde se realicen actividades de transporte Terrestre'},
    {value: '241102', text: 'Transporte acuático'},
    {value: '241103', text: 'Transporte aéreo'},
    {value: '241104', text: 'Almacenamiento y actividades complementarias al transporte'}
]

var objetoOtrosSujetos = [
	{ value: '479-1', text: "RESTAURANTES - PANADERIAS - Y/O PASTELERIAS - CAFETERIAS - FRUTERIAS - COMIDAS RAPIDAS - SERVICIO DE BANQUETES - OFERTA DE ALIMENTACION POR REDES S." },
	{ value: '479-2', text: "COMEDORES ESCOLARES (INCLUYE PAE Y PRIVADOS) INFANTILES (ICBF - INPEC) - COLEGIOS Y UNIVERSIDADES" },
	{ value: '479-3', text: "COMEDORES CARCELARIOS (USPEC) - FUERZAS MILITARES Y POLICIVAS" },
	{ value: '479-4', text: "COMEDORES HOGARES GERIATRICOS - ASILOS - HOSPITALES - CASINOS DE EMPRESAS O FABRICAS - CLUBES SOCIALES" },
	{ value: '479-5', text: "HOTELES - MOTELES - HOSTALES - RESIDENCIAS Y CASAS DE LENOCINIO CON PREPARACION DE ALIMENTOS" },
	{ value: '479-6', text: "ESTABLECIMIENTOS DE PREPARACION DE ALIMENTOS AL INTERIOR DE PLAZAS DE MERCADO - CENTRALES DE ABASTO - PLAZOLETAS DE COMIDA - ZONAS FRANCAS" },
	{ value: '481-1', text: "BODEGAS PARA ALMACENAMIENTO DE ALIMENTOS Y/O BEBIDAS INCLUIDAS ZONAS FRANCAS" },
	{ value: '481-2', text: "ALMACENAN Y DISTRIBUYEN" },
	{ value: '481-3', text: "DADORES DE FRIO" },
	{ value: '495-1', text: "TIENDAS DE BARRIO I CIGARRERIAS INCLUIDAS ZONAS FRANCAS" },
	{ value: '495-2', text: "MINI MERCADO" },
	{ value: '495-3', text: "EXPENDIO CON OPERACIONES DE PORCIONADO - TROCEADO O ACONDICIONAMIENTO" },
	{ value: '495-4', text: "EXPENDIO DE PRODUCTOS DE LA PESCA" },
	{ value: '495-5', text: "CHARCUTERIAS Y SALSAMENTARIAS" },
	{ value: '495-6', text: "VENTA DE LECHE CRUDA" },
	{ value: '440-1', text: "CARNICERIAS Y FAMAS" },
	{ value: '440-2', text: "CARNICERIA DE GRANDES SUPERFICIES - DE PLAZAS DE MERCADO" },
	{ value: '474-1', text: "BARES" },
	{ value: '474-2', text: "DISCOTECAS" },
	{ value: '474-3', text: "CANTINAS" },
	{ value: '474-4', text: "TABERNAS" },
	{ value: '474-5', text: "CIGARRERIAS" },
	{ value: '474-6', text: "LICORERAS" },
	{ value: '474-7', text: "WHISKERIAS" },
	{ value: '474-8', text: "PROSTIBULOS" },
	{ value: '474-9', text: "CLUBES SOCIALES" },
	{ value: '478-1', text: "GRAN SUPERFICIE" },
	{ value: '478-2', text: "HIPERMERCADO" },
	{ value: '478-3', text: "SUPERMERCADO" },
	{ value: '478-4', text: "FRUVER" },
	{ value: '475-1', text: "CENTRO DE ABASTO" },
	{ value: '475-2', text: "PLAZA DE MERCADO" },
	{ value: '472-1', text: "VEHICULO" },
	{ value: '480-1', text: "PUESTO FIJO ESTACIONARIO" },
	{ value: '480-2', text: "PUESTO MOVIL" },
	{ value: '480-3', text: "PLAZA DE MERCADO MOVIL" },
	{ value: '480-4', text: "MERCADO CAMPESINO" },
	{ value: '480-5', text: "FOOD TRUCK" },
	{ value: '480-6', text: "COMERCIALIZACION AMBULANTE DE LECHE CRUDA PARA CONSUMO HUMANO DIRECTO" } 
]

var objetoMedidasSanitarias = [
	{value: '00', text: 'Ninguna'},
	{value: '01', text: 'Clausura temporal total'},
	{value: '02', text: 'Clausura temporal parcial'},
	{value: '03', text: 'Suspensión parcial de trabajos o servicios'},
	{value: '04', text: 'Suspensión total de traajos o servicios'},
	{value: '05', text: 'Aislamiento o internación de personas para evitar la transmisión de enfermedades'},
	{value: '06', text: 'Decomiso'},
	{value: '07', text: 'Destrucción o desnaturalización'},
	{value: '08', text: 'Congelación'},
	{value: '09', text: 'Captura y obsereviación de animales sospechosos de enfermedades transmisibles'},
	{value: '10', text: 'Vacunación a personas o animales'},
	{value: '11', text: 'Control de insectos u otra fauna nociva o transmisora de enfermedades'},
	{value: '12', text: 'Desocupación o desalojo de establecimientos o viviendas'},
	{value: '13', text: 'Otra'},
]

function createOption({value, text}){
	let option = document.createElement('option');
	option.value = value;
	option.innerHTML = `${value}: ${text}`;
	return option;
}

function renderSelectCombo(objeto, elementoSelect){
	let selectPadre = document.getElementsByName(elementoSelect)[0];
	objeto.forEach(element => {
		selectPadre.appendChild(createOption(element));
	})
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

function setMedidaSanitaria(valor, destino) {
	let filtrado = objetoMedidasSanitarias.filter(elemento => elemento.value === valor);
	console.log('filtrado', filtrado);
	document.getElementsByName(destino)[0].value = filtrado[0].text;
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
		objeto = objetoOtrosSujetos
	} else if (destino.indexOf('245') !== -1) {
		objeto = objetoSujetoComercial
	}
	let filtrado = objeto.filter(elemento => elemento.value === value);
	console.log('filtrado', filtrado);
	document.getElementsByName(destino)[0].value = filtrado[0].text;
}