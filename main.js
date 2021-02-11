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

var objetoActividadEconomica = [
	{value: "1", text: "Agricultura, ganadería, caza y actividades de servicios conexas"},
	{value: "011", text: "Cultivos agrícolas transitorios"},
	{value: "0111", text: "Cultivo de cereales (excepto arroz), legumbres y semillas oleaginosas"},
	{value: "0112", text: "Cultivo de arroz"},
	{value: "0113", text: "Cultivo de hortalizas, raíces y tubérculos"},
	{value: "0114", text: "Cultivo de tabaco"},
	{value: "0115", text: "Cultivo de plantas textiles"},
	{value: "0119", text: "Otros cultivos transitorios n.c.p."},
	{value: "012", text: "Cultivos agrícolas permanentes"},
	{value: "0121", text: "Cultivo de frutas tropicales y subtropicales"},
	{value: "0122", text: "Cultivo de plátano y banano"},
	{value: "0123", text: "Cultivo de café"},
	{value: "0124", text: "Cultivo de caña de azúcar"},
	{value: "0125", text: "Cultivo de flor de corte"},
	{value: "0126", text: "Cultivo de palma para aceite (palma africana) y otros frutos oleaginosos"},
	{value: "0127", text: "Cultivo de plantas con las que se preparan bebidas"},
	{value: "0128", text: "Cultivo de especias y de plantas aromáticas y medicinales"},
	{value: "0129", text: "Otros cultivos permanentes n.c.p."},
	{value: "0130", text: "Propagación de plantas (actividades de los viveros, excepto viveros forestales)"},
	{value: "014", text: "ganadería"},
	{value: "0141", text: "cría de ganado bovino y bufalino"},
	{value: "0142", text: "cría de caballos y otros equinos"},
	{value: "0143", text: "cría de ovejas y cabras"},
	{value: "0144", text: "cría de ganado porcino"},
	{value: "0145", text: "cría de aves de corral"},
	{value: "0149", text: "cría de otros animales n.c.p."},
	{value: "0150", text: "Explotación mixta (agrícola y pecuaria)"},
	{value: "016", text: "Actividades de apoyo a la agricultura y la ganadería, y actividades posteriores a la cosecha"},
	{value: "0161", text: "Actividades de apoyo a la agricultura"},
	{value: "0162", text: "Actividades de apoyo a la ganadería"},
	{value: "0163", text: "Actividades posteriores a la cosecha"},
	{value: "0164", text: "Tratamiento de semillas para propagación"},
	{value: "0170", text: "Caza ordinaria y mediante trampas y actividades de servicios conexas"},
	{value: "02", text: "Silvicultura y extracción de madera"},
	{value: "0210", text: "Silvicultura y otras actividades forestales"},
	{value: "0220", text: "Extracción de madera"},
	{value: "0230", text: "Recolección de productos forestales diferentes a la madera"},
	{value: "0240", text: "Servicios de apoyo a la silvicultura"},
	{value: "03", text: "Pesca y acuicultura"},
	{value: "031", text: "Pesca"},
	{value: "0311", text: "Pesca marítima"},
	{value: "0312", text: "Pesca de agua dulce"},
	{value: "032", text: "Acuicultura"},
	{value: "0321", text: "Acuicultura marítima"},
	{value: "0322", text: "Acuicultura de agua dulce"},
	{value: "05", text: "Extracción de carbón de piedra y lignito"},
	{value: "0510", text: "Extracción de hulla (carbón de piedra)"},
	{value: "0520", text: "Extracción de carbón lignito"},
	{value: "06", text: "Extracción de petróleo crudo y gas natural"},
	{value: "0610", text: "Extracción de petróleo crudo"},
	{value: "0620", text: "Extracción de gas natural"},
	{value: "07", text: "Extracción de minerales metalíferos"},
	{value: "0710", text: "Extracción de minerales de hierro"},
	{value: "072", text: "Extracción de minerales metalíferos no ferrosos"},
	{value: "0721", text: "Extracción de minerales de uranio y de torio"},
	{value: "0722", text: "Extracción de oro y otros metales preciosos"},
	{value: "0723", text: "Extracción de minerales de níquel"},
	{value: "0729", text: "Extracción de otros minerales metalíferos no ferrosos n.c.p."},
	{value: "08", text: "Extracción de otras minas y canteras"},
	{value: "081", text: "Extracción de piedra, arena, arcillas, cal, yeso, caolín, bentonitas y similares"},
	{value: "0811", text: "Extracción de piedra, arena, arcillas comunes, yeso y anhidrita"},
	{value: "0812", text: "Extracción de arcillas de uso industrial, caliza, caolín y bentonitas"},
	{value: "0820", text: "Extracción de esmeraldas, piedras preciosas y semipreciosas"},
	{value: "089", text: "Extracción de otros minerales no metálicos n.c.p."},
	{value: "0891", text: "Extracción de minerales para la fabricación de abonos y productos químicos"},
	{value: "0892", text: "Extracción de halita (sal)"},
	{value: "0899", text: "Extracción de otros minerales no metálicos n.c.p."},
	{value: "09", text: "Actividades de servicios de apoyo para la explotación de minas"},
	{value: "0910", text: "Actividades de apoyo para la extracción de petróleo y de gas natural"},
	{value: "0990", text: "Actividades de apoyo para otras actividades de explotación de minas y canteras"},
	{value: "10", text: "Elaboración de productos alimenticios"},
	{value: "101", text: "Procesamiento y conservación de carne, pescado, crustáceos y moluscos"},
	{value: "1011", text: "Procesamiento y conservación de carne y productos cárnicos"},
	{value: "1012", text: "Procesamiento y conservación de pescados, crustáceos y moluscos"},
	{value: "1020", text: "Procesamiento y conservación de frutas, legumbres, hortalizas y tubérculos"},
	{value: "1030", text: "Elaboración de aceites y grasas de origen vegetal y animal"},
	{value: "1040", text: "Elaboración de productos lácteos"},
	{value: "105", text: "Elaboración de productos de molinería, almidones y productos derivados del almidón"},
	{value: "1051", text: "Elaboración de productos de molinería"},
	{value: "1052", text: "Elaboración de almidones y productos derivados del almidón"},
	{value: "106", text: "Elaboración de productos de café"},
	{value: "1061", text: "Trilla de café"},
	{value: "1062", text: "Descafeinado, tostión y molienda del café"},
	{value: "1063", text: "Otros derivados del café"},
	{value: "107", text: "Elaboración de azúcar y panela"},
	{value: "1071", text: "Elaboración y refinación de azúcar"},
	{value: "1072", text: "Elaboración de panela"},
	{value: "108", text: "Elaboración de otros productos alimenticios"},
	{value: "1081", text: "Elaboración de productos de panadería"},
	{value: "1082", text: "Elaboración de cacao, chocolate y productos de confitería"},
	{value: "1083", text: "Elaboración de macarrones, fideos, alcuzcuz y productos farináceos similares"},
	{value: "1084", text: "Elaboración de comidas y platos preparados"},
	{value: "1089", text: "Elaboración de otros productos alimenticios n.c.p."},
	{value: "1090", text: "Elaboración de alimentos preparados para animales"},
	{value: "11", text: "Elaboración de bebidas"},
	{value: "110", text: "Elaboración de bebidas"},
	{value: "1101", text: "Destilación, rectificación y mezcla de bebidas alcohólicas"},
	{value: "1102", text: "Elaboración de bebidas fermentadas no destiladas"},
	{value: "1103", text: "Producción de malta, elaboración de cervezas y otras bebidas malteadas"},
	{value: "1104", text: "Elaboración de bebidas no alcohólicas, producción de aguas minerales y de otras aguas embotel"},
	{value: "12", text: "Elaboración de productos de tabaco"},
	{value: "1200", text: "Elaboración de productos de tabaco"},
	{value: "13", text: "Fabricación de productos textiles"},
	{value: "131", text: "Preparación, hilatura, tejeduría y acabado de productos textiles"},
	{value: "1311", text: "Preparación e hilatura de fibras textiles"},
	{value: "1312", text: "Tejeduría de productos textiles"},
	{value: "1313", text: "Acabado de productos textiles"},
	{value: "139", text: "Fabricación de otros productos textiles"},
	{value: "1391", text: "Fabricación de tejidos de punto y ganchillo"},
	{value: "1392", text: "Confección de artículos con materiales textiles, excepto prendas de vestir"},
	{value: "1393", text: "Fabricación de tapetes y alfombras para pisos"},
	{value: "1394", text: "Fabricación de cuerdas, cordeles, cables, bramantes y redes"},
	{value: "1399", text: "Fabricación de otros artículos textiles n.c.p."},
	{value: "14", text: "Confección de prendas de vestir"},
	{value: "1410", text: "Confección de prendas de vestir, excepto prendas de piel"},
	{value: "1420", text: "Fabricación de artículos de piel"},
	{value: "1430", text: "Fabricación de artículos de punto y ganchillo"},
	{value: "15", text: "Curtido y recurtido de cueros; fabricación de calzado; fabricación de artículos de viaje, mal"},
	{value: "151", text: "Curtido y recurtido de cueros; fabricación de artículos de viaje, bolsos de mano y artículos"},
	{value: "1511", text: "Curtido y recurtido de cueros; recurtido y teñido de pieles"},
	{value: "1512", text: "Fabricación de artículos de viaje, bolsos de mano y artículos similares elaborados en cuero,"},
	{value: "1513", text: "Fabricación de artículos de viaje, bolsos de mano y artículos similares; artículos de talabar"},
	{value: "152", text: "Fabricación de calzado"},
	{value: "1521", text: "Fabricación de calzado de cuero y piel, con cualquier tipo de suela"},
	{value: "1522", text: "Fabricación de otros tipos de calzado, excepto calzado de cuero y piel"},
	{value: "1523", text: "Fabricación de partes del calzado"},
	{value: "16", text: "Transformación de la madera y fabricación de productos de madera y de corcho, excepto muebles"},
	{value: "1610", text: "Aserrado, acepillado e impregnación de la madera"},
	{value: "1620", text: "Fabricación de hojas de madera para enchapado; fabricación de tableros contrachapados, tabler"},
	{value: "1630", text: "Fabricación de partes y piezas de madera, de carpintería y ebanistería para la construcción"},
	{value: "1640", text: "Fabricación de recipientes de madera"},
	{value: "1690", text: "Fabricación de otros productos de madera; fabricación de artículos de corcho, cestería y espa"},
	{value: "17", text: "Fabricación de papel, cartón y productos de papel y cartón"},
	{value: "170", text: "Fabricación de papel, cartón y productos de papel y cartón"},
	{value: "1701", text: "Fabricación de pulpas (pastas) celulósicas; papel y cartón"},
	{value: "1702", text: "Fabricación de papel y cartón ondulado (corrugado); fabricación de envases, empaques y de emb"},
	{value: "1709", text: "Fabricación de otros artículos de papel y cartón"},
	{value: "18", text: "Actividades de impresión y de producción de copias a partir de grabaciones originales"},
	{value: "181", text: "Actividades de impresión y actividades de servicios relacionados con la impresión"},
	{value: "1811", text: "Actividades de impresión"},
	{value: "1812", text: "Actividades de servicios relacionados con la impresión"},
	{value: "1820", text: "Producción de copias a partir de grabaciones originales"},
	{value: "19", text: "Coquización, fabricación de productos de la refinación del petróleo y actividad de mezcla de"},
	{value: "1910", text: "Fabricación de productos de hornos de coque"},
	{value: "192", text: "Fabricación de productos de la refinación del petróleo"},
	{value: "1921", text: "Fabricación de productos de la refinación del petróleo"},
	{value: "1922", text: "Actividad de mezcla de combustibles"},
	{value: "20", text: "Fabricación de sustancias y productos químicos"},
	{value: "201", text: "Fabricación de sustancias químicas básicas, abonos y compuestos inorgánicos nitrogenados, plástico"},
	{value: "2011", text: "Fabricación de sustancias y productos químicos básicos"},
	{value: "2012", text: "Fabricación de abonos y compuestos inorgánicos nitrogenados"},
	{value: "2013", text: "Fabricación de plásticos en formas primarias"},
	{value: "2014", text: "Fabricación de caucho sintético en formas primarias"},
	{value: "202", text: "Fabricación de otros productos químicos"},
	{value: "2021", text: "Fabricación de plaguicidas y otros productos químicos de uso agropecuario"},
	{value: "2022", text: "Fabricación de pinturas, barnices y revestimientos similares, tintas para impresión y masilla"},
	{value: "2023", text: "Fabricación de jabones y detergentes, preparados para limpiar y pulir; perfumes y preparados"},
	{value: "2029", text: "Fabricación de otros productos químicos n.c.p."},
	{value: "2030", text: "Fabricación de fibras sintéticas y artificiales"},
	{value: "21", text: "Fabricación de productos farmacéuticos, sustancias químicas medicinales y productos botánicos"},
	{value: "2100", text: "Fabricación de productos farmacéuticos, sustancias químicas medicinales y productos botánicos"},
	{value: "22", text: "Fabricación de productos de caucho y de plástico"},
	{value: "221", text: "Fabricación de productos de caucho"},
	{value: "2211", text: "Fabricación de llantas y neumáticos de caucho"},
	{value: "2212", text: "Reencauche de llantas usadas"},
	{value: "2219", text: "Fabricación de formas básicas de caucho y otros productos de caucho n.c.p."},
	{value: "222", text: "Fabricación de productos de plástico"},
	{value: "2221", text: "Fabricación de formas básicas de plástico"},
	{value: "2229", text: "Fabricación de artículos de plástico n.c.p."},
	{value: "23", text: "Fabricación de otros productos minerales no metálicos"},
	{value: "2310", text: "Fabricación de vidrio y productos de vidrio"},
	{value: "239", text: "Fabricación de productos minerales no metálicos n.c.p."},
	{value: "2391", text: "Fabricación de productos refractarios"},
	{value: "2392", text: "Fabricación de materiales de arcilla para la construcción"},
	{value: "2393", text: "Fabricación de otros productos de cerámica y porcelana"},
	{value: "2394", text: "Fabricación de cemento, cal y yeso"},
	{value: "2395", text: "Fabricación de artículos de hormigón, cemento y yeso"},
	{value: "2396", text: "Corte, tallado y acabado de la piedra"},
	{value: "2399", text: "Fabricación de otros productos minerales no metálicos n.c.p."},
	{value: "24", text: "Fabricación de productos metalúrgicos básicos"},
	{value: "2410", text: "Industrias básicas de hierro y de acero"},
	{value: "242", text: "Industrias básicas de metales preciosos y de metales no ferrosos"},
	{value: "2421", text: "Industrias básicas de metales preciosos"},
	{value: "2429", text: "Industrias básicas de otros metales no ferrosos"},
	{value: "243", text: "Fundición de metales"},
	{value: "2431", text: "Fundición de hierro y de acero"},
	{value: "2432", text: "Fundición de metales no ferrosos"},
	{value: "25", text: "Fabricación de productos elaborados de metal, excepto maquinaria y equipo"},
	{value: "251", text: "Fabricación de productos metálicos para uso estructural, tanques, depósitos y generadores de"},
	{value: "2511", text: "Fabricación de productos metálicos para uso estructural"},
	{value: "2512", text: "Fabricación de tanques, depósitos y recipientes de metal, excepto los utilizados para el enva"},
	{value: "2513", text: "Fabricación de generadores de vapor, excepto calderas de agua caliente para calefacción centr"},
	{value: "2520", text: "Fabricación de armas y municiones"},
	{value: "259", text: "Fabricación de otros productos elaborados de metal y actividades de servicios relacionadas co"},
	{value: "2591", text: "Forja, prensado, estampado y laminado de metal; pulvimetalurgia"},
	{value: "2592", text: "Tratamiento y revestimiento de metales; mecanizado"},
	{value: "2593", text: "Fabricación de artículos de cuchillería, herramientas de mano y artículos de ferretería"},
	{value: "2599", text: "Fabricación de otros productos elaborados de metal n.c.p."},
	{value: "261", text: "Fabricación de productos informáticos, electrónicos y ópticos"},
	{value: "2610", text: "Fabricación de componentes y tableros electrónicos"},
	{value: "2620", text: "Fabricación de computadoras y de equipo periférico"},
	{value: "2630", text: "Fabricación de equipos de comunicación"},
	{value: "2640", text: "Fabricación de aparatos electrónicos de consumo"},
	{value: "265", text: "Fabricación de equipo de medición, prueba, navegación y control; fabricación de relojes"},
	{value: "2651", text: "Fabricación de equipo de medición, prueba, navegación y control"},
	{value: "2652", text: "Fabricación de relojes"},
	{value: "2660", text: "Fabricación de equipo de irradiación y equipo electrónico de uso médico y terapéutico"},
	{value: "2670", text: "Fabricación de instrumentos ópticos y equipo fotográfico"},
	{value: "2680", text: "Fabricación de medios magnéticos y ópticos para almacenamiento de datos"},
	{value: "27", text: "Fabricación de aparatos y equipo eléctrico"},
	{value: "271", text: "Fabricación de motores, generadores y transformadores eléctricos y de aparatos de distribución"},
	{value: "2711", text: "Fabricación de motores, generadores y transformadores eléctricos"},
	{value: "2712", text: "Fabricación de aparatos de distribución y control de la energía eléctrica"},
	{value: "2720", text: "Fabricación de pilas, baterías y acumuladores eléctricos"},
	{value: "273", text: "Fabricación de hilos y cables aislados y sus dispositivos"},
	{value: "2731", text: "Fabricación de hilos y cables eléctricos y de fibra óptica"},
	{value: "2732", text: "Fabricación de dispositivos de cableado"},
	{value: "2740", text: "Fabricación de equipos eléctricos de iluminación"},
	{value: "2750", text: "Fabricación de aparatos de uso doméstico"},
	{value: "2790", text: "Fabricación de otros tipos de equipo eléctrico n.c.p."},
	{value: "28", text: "Fabricación de maquinaria y equipo n.c.p."},
	{value: "281", text: "Fabricación de maquinaria y equipo de uso general"},
	{value: "2811", text: "Fabricación de motores, turbinas, y partes para motores de combustión interna"},
	{value: "2812", text: "Fabricación de equipos de potencia hidráulica y neumática"},
	{value: "2813", text: "Fabricación de otras bombas, compresores, grifos y válvulas"},
	{value: "2814", text: "Fabricación de cojinetes, engranajes, trenes de engranajes y piezas de transmisión"},
	{value: "2815", text: "Fabricación de hornos, hogares y quemadores industriales"},
	{value: "2816", text: "Fabricación de equipo de elevación y manipulación"},
	{value: "2817", text: "Fabricación de maquinaria y equipo de oficina (excepto computadoras y equipo periférico)"},
	{value: "2818", text: "Fabricación de herramientas manuales con motor"},
	{value: "2819", text: "Fabricación de otros tipos de maquinaria y equipo de uso general n.c.p."},
	{value: "282", text: "Fabricación de maquinaria y equipo de uso especial"},
	{value: "2821", text: "Fabricación de maquinaria agropecuaria y forestal"},
	{value: "2822", text: "Fabricación de máquinas formadoras de metal y de máquinas herramienta"},
	{value: "2823", text: "Fabricación de maquinaria para la metalurgia"},
	{value: "2824", text: "Fabricación de maquinaria para explotación de minas y canteras y para obras de construcción"},
	{value: "2825", text: "Fabricación de maquinaria para la elaboración de alimentos, bebidas y tabaco"},
	{value: "2826", text: "Fabricación de maquinaria para la elaboración de productos textiles, prendas de vestir y cuer"},
	{value: "2829", text: "Fabricación de otros tipos de maquinaria y equipo de uso especial n.c.p."},
	{value: "29", text: "Fabricación de vehículos automotores, remolques y semirremolques"},
	{value: "2910", text: "Fabricación de vehículos automotores y sus motores"},
	{value: "2920", text: "Fabricación de carrocerías para vehículos automotores; fabricación de remolques y semirremolq"},
	{value: "2930", text: "Fabricación de partes, piezas (autopartes) y accesorios (lujos) para vehículos automotores"},
	{value: "30", text: "Fabricación de otros tipos de equipo de transporte"},
	{value: "301", text: "Construcción de barcos y otras embarcaciones"},
	{value: "3011", text: "Construcción de barcos y de estructuras flotantes"},
	{value: "3012", text: "Construcción de embarcaciones de recreo y deporte"},
	{value: "3020", text: "Fabricación de locomotoras y de material rodante para ferrocarriles"},
	{value: "3030", text: "Fabricación de aeronaves, naves espaciales y de maquinaria conexa"},
	{value: "3040", text: "Fabricación de vehículos militares de combate"},
	{value: "309", text: "Fabricación de otros tipos de equipo de transporte n.c.p."},
	{value: "3091", text: "Fabricación de motocicletas"},
	{value: "3092", text: "Fabricación de bicicletas y de sillas de ruedas para personas con discapacidad"},
	{value: "3099", text: "Fabricación de otros tipos de equipo de transporte n.c.p."},
	{value: "31", text: "Fabricación de muebles, colchones y somieres"},
	{value: "3110", text: "Fabricación de muebles"},
	{value: "3120", text: "Fabricación de colchones y somieres"},
	{value: "32", text: "Otras industrias manufactureras"},
	{value: "3210", text: "Fabricación de joyas, bisutería y artículos conexos"},
	{value: "3220", text: "Fabricación de instrumentos musicales"},
	{value: "3230", text: "Fabricación de artículos y equipo para la práctica del deporte"},
	{value: "3240", text: "Fabricación de juegos, juguetes y rompecabezas"},
	{value: "3250", text: "Fabricación de instrumentos, aparatos y materiales médicos y odontológicos (incluido mobiliar"},
	{value: "3290", text: "Otras industrias manufactureras n.c.p."},
	{value: "33", text: "Instalación, mantenimiento y reparación especializado de maquinaria y equipo"},
	{value: "331", text: "Mantenimiento y reparación especializado de productos elaborados en metal y de maquinaria y e"},
	{value: "3311", text: "Mantenimiento y reparación especializado de productos elaborados en metal"},
	{value: "3312", text: "Mantenimiento y reparación especializado de maquinaria y equipo"},
	{value: "3313", text: "Mantenimiento y reparación especializado de equipo electrónico y óptico"},
	{value: "3314", text: "Mantenimiento y reparación especializado de equipo eléctrico"},
	{value: "3315", text: "Mantenimiento y reparación especializado de equipo de transporte, excepto los vehículos autom"},
	{value: "3319", text: "Mantenimiento y reparación de otros tipos de equipos y sus componentes n.c.p."},
	{value: "3320", text: "Instalación especializada de maquinaria y equipo industrial"},
	{value: "35", text: "Suministro de electricidad, gas, vapor y aire acondicionado"},
	{value: "351", text: "Generación, transmisión, distribución y comercialización de energía eléctrica"},
	{value: "3511", text: "Generación de energía eléctrica"},
	{value: "3512", text: "Transmisión de energía eléctrica"},
	{value: "3513", text: "Distribución de energía eléctrica"},
	{value: "3514", text: "Comercialización de energía eléctrica"},
	{value: "3520", text: "Producción de gas; distribución de combustibles gaseosos por tuberías"},
	{value: "3530", text: "Suministro de vapor y aire acondicionado"},
	{value: "36", text: "Captación, tratamiento y distribución de agua"},
	{value: "3600", text: "Captación, tratamiento y distribución de agua"},
	{value: "37", text: "Evacuación y tratamiento de aguas residuales"},
	{value: "3700", text: "Evacuación y tratamiento de aguas residuales"},
	{value: "38", text: "Recolección, tratamiento y disposición de desechos, recuperación de materiales"},
	{value: "381", text: "Recolección de desechos"},
	{value: "3811", text: "Recolección de desechos no peligrosos"},
	{value: "3812", text: "Recolección de desechos peligrosos"},
	{value: "382", text: "Tratamiento y disposición de desechos"},
	{value: "3821", text: "Tratamiento y disposición de desechos no peligrosos"},
	{value: "3822", text: "Tratamiento y disposición de desechos peligrosos"},
	{value: "3830", text: "Recuperación de materiales"},
	{value: "39", text: "Actividades de saneamiento ambiental y otros servicios de gestión de desechos"},
	{value: "41", text: "Construcción de edificios"},
	{value: "411", text: "Construcción de edificios"},
	{value: "4111", text: "Construcción de edificios residenciales"},
	{value: "4112", text: "Construcción de edificios no residenciales"},
	{value: "42", text: "Obras de ingeniería civil"},
	{value: "4210", text: "Construcción de carreteras y vías de ferrocarril"},
	{value: "4220", text: "Construcción de proyectos de servicio público"},
	{value: "4290", text: "Construcción de otras obras de ingeniería civil"},
	{value: "43", text: "Actividades especializadas para la construcción de edificios y obras de ingeniería civil"},
	{value: "431", text: "Demolición y preparación del terreno"},
	{value: "4311", text: "Demolición"},
	{value: "4312", text: "Preparación del terreno"},
	{value: "432", text: "Instalaciones eléctricas, de fontanería y otras instalaciones especializadas"},
	{value: "4321", text: "Instalaciones eléctricas"},
	{value: "4322", text: "Instalaciones de fontanería, calefacción y aire acondicionado"},
	{value: "4329", text: "Otras instalaciones especializadas"},
	{value: "4330", text: "Terminación y acabado de edificios y obras de ingeniería civil"},
	{value: "4390", text: "Otras actividades especializadas para la construcción de edificios y obras de ingeniería civi"},
	{value: "45", text: "Comercio, mantenimiento y reparación de vehículos automotores y motocicletas, sus partes, pie"},
	{value: "451", text: "Comercio de vehículos automotores"},
	{value: "4511", text: "Comercio de vehículos automotores nuevos"},
	{value: "4512", text: "Comercio de vehículos automotores usados"},
	{value: "4520", text: "Mantenimiento y reparación de vehículos automotores"},
	{value: "4530", text: "Comercio de partes, piezas (autopartes) y accesorios (lujos) para vehículos automotores"},
	{value: "454", text: "Comercio, mantenimiento y reparación de motocicletas y de sus partes, piezas y accesorios"},
	{value: "4541", text: "Comercio de motocicletas y de sus partes, piezas y accesorios"},
	{value: "4542", text: "Mantenimiento y reparación de motocicletas y de sus partes y piezas"},
	{value: "46", text: "Comercio al por mayor y en comisión o por contrata, excepto el comercio de vehículos automoto"},
	{value: "4610", text: "Comercio al por mayor a cambio de una retribución o por contrata"},
	{value: "4620", text: "Comercio al por mayor de materias primas agropecuarias; animales vivos"},
	{value: "463", text: "Comercio al por mayor de alimentos, bebidas y tabaco"},
	{value: "4631", text: "Comercio al por mayor de productos alimenticios"},
	{value: "4632", text: "Comercio al por mayor de bebidas y tabaco"},
	{value: "464", text: "Comercio al por mayor de artículos y enseres domésticos (incluidas prendas de vestir)"},
	{value: "4641", text: "Comercio al por mayor de productos textiles, productos confeccionados para uso doméstico"},
	{value: "4642", text: "Comercio al por mayor de prendas de vestir"},
	{value: "4643", text: "Comercio al por mayor de calzado"},
	{value: "4644", text: "Comercio al por mayor de aparatos y equipo de uso doméstico"},
	{value: "4645", text: "Comercio al por mayor de productos farmacéuticos, medicinales, cosméticos y de tocador"},
	{value: "4649", text: "Comercio al por mayor de otros utensilios domésticos n.c.p."},
	{value: "465", text: "Comercio al por mayor de maquinaria y equipo"},
	{value: "4651", text: "Comercio al por mayor de computadores, equipo periférico y programas de infromática"},
	{value: "4652", text: "Comercio al por mayor de equipo, partes y piezas electrónicos y de telecomunicaciones"},
	{value: "4653", text: "Comercio al por mayor de maquinaria y equipo agropecuarios"},
	{value: "4659", text: "Comercio al por mayor de otros tipos de maquinaria y equipo n.c.p."},
	{value: "466", text: "Comercio al por mayor especializado de otros productos"},
	{value: "4661", text: "Comercio al por mayor de combustibles sólidos, líquidos, gaseosos y productos conexos"},
	{value: "4662", text: "Comercio al por mayor de metales y productos metalíferos"},
	{value: "4663", text: "Comercio al por mayor de materiales de construcción, artículos de ferretería, pinturas, produ"},
	{value: "4664", text: "Comercio al por mayor de productos químicos básicos, cauchos y plásticos en formas primarias"},
	{value: "4665", text: "Comercio al por mayor de desperdicios, desechos y chatarra"},
	{value: "4669", text: "Comercio al por mayor de otros productos n.c.p."},
	{value: "4690", text: "Comercio al por mayor no especializado"},
	{value: "47", text: "Comercio al por menor (incluso el comercio al por menor de combustibles), excepto el de vehículos"},
	{value: "471", text: "Comercio al por menor en establecimientos no especializados"},
	{value: "4711", text: "Comercio al por menor en establecimientos no especializados con surtido compuesto principalme"},
	{value: "4719", text: "Comercio al por menor en establecimientos no especializados, con surtido compuesto principalm"},
	{value: "472", text: "Comercio al por menor de alimentos (víveres en general), bebidas y tabaco, en establecimiento"},
	{value: "4721", text: "Comercio al por menor de productos agrícolas para el consumo en establecimientos especializad"},
	{value: "4722", text: "Comercio al por menor de leche, productos lácteos y huevos, en establecimientos especializado"},
	{value: "4723", text: "Comercio al por menor de carnes (incluye aves de corral), productos cárnicos, pescados y prod"},
	{value: "4724", text: "Comercio al por menor de bebidas y productos del tabaco, en establecimientos especializados"},
	{value: "4729", text: "Comercio al por menor de otros productos alimenticios n.c.p., en establecimientos especializa"},
	{value: "473", text: "Comercio al por menor de combustible, lubricantes, aditivos y productos de limpieza para auto"},
	{value: "4731", text: "Comercio al por menor de combustible para automotores"},
	{value: "4732", text: "Comercio al por menor de lubricantes (aceites, grasas), aditivos y productos de limpieza para"},
	{value: "474", text: "Comercio al por menor de equipos de infromática y de comunicaciones, en establecimientos espe"},
	{value: "4741", text: "Comercio al por menor de computadores, equipos periféricos, programas de infromática y equipo"},
	{value: "4742", text: "Comercio al por menor de equipos y aparatos de sonido y de video, en establecimientos especia"},
	{value: "475", text: "Comercio al por menor de otros enseres domésticos en establecimientos especializados"},
	{value: "4751", text: "Comercio al por menor de productos textiles en establecimientos especializados"},
	{value: "4752", text: "Comercio al por menor de artículos de ferretería, pinturas y productos de vidrio en estableci"},
	{value: "4753", text: "Comercio al por menor de tapices, alfombras y cubrimientos para paredes y pisos en establecim"},
	{value: "4754", text: "Comercio al por menor de electrodomésticos y gasodomésticos de uso doméstico, muebles y equip"},
	{value: "4755", text: "Comercio al por menor de artículos y utensilios de uso doméstico"},
	{value: "4759", text: "Comercio al por menor de otros artículos domésticos en establecimientos especializados"},
	{value: "476", text: "Comercio al por menor de artículos culturales y de entretenimiento, en establecimientos espec"},
	{value: "4761", text: "Comercio al por menor de libros, periódicos, materiales y artículos de papelería y escritorio"},
	{value: "4762", text: "Comercio al por menor de artículos deportivos, en establecimientos especializados"},
	{value: "4769", text: "Comercio al por menor de otros artículos culturales y de entretenimiento n.c.p. en establecim"},
	{value: "477", text: "Comercio al por menor de otros productos en establecimientos especializados"},
	{value: "4771", text: "Comercio al por menor de prendas de vestir y sus accesorios (incluye artículos de piel) en es"},
	{value: "4772", text: "Comercio al por menor de todo tipo de calzado y artículos de cuero y sucedáneos del cuero en"},
	{value: "4773", text: "Comercio al por menor de productos farmacéuticos y medicinales, cosméticos y artículos de toc"},
	{value: "4774", text: "Comercio al por menor de otros productos nuevos en establecimientos especializados"},
	{value: "4775", text: "Comercio al por menor de artículos de segunda mano"},
	{value: "478", text: "Comercio al por menor en puestos de venta móviles"},
	{value: "4781", text: "Comercio al por menor de alimentos, bebidas y tabaco, en puestos de venta móviles"},
	{value: "4782", text: "Comercio al por menor de productos textiles, prendas de vestir y calzado, en puestos de venta"},
	{value: "4789", text: "Comercio al por menor de otros productos en puestos de venta móviles"},
	{value: "479", text: "Comercio al por menor no realizado en establecimientos, puestos de venta o mercados"},
	{value: "4791", text: "Comercio al por menor realizado a través de Internet"},
	{value: "4792", text: "Comercio al por menor realizado a través de casas de venta o por correo"},
	{value: "4799", text: "Otros tipos de comercio al por menor no realizado en establecimientos, puestos de venta o mer"},
	{value: "49", text: "Transporte terrestre; transporte por tuberías"},
	{value: "491", text: "Transporte férreo"},
	{value: "4911", text: "Transporte férreo de pasajeros"},
	{value: "4912", text: "Transporte férreo de carga"},
	{value: "492", text: "Transporte terrestre público automotor"},
	{value: "4921", text: "Transporte de pasajeros"},
	{value: "4922", text: "Transporte mixto"},
	{value: "4923", text: "Transporte de carga por carretera"},
	{value: "4930", text: "Transporte por tuberías"},
	{value: "50", text: "Transporte acuático"},
	{value: "501", text: "Transporte marítimo y de cabotaje"},
	{value: "5011", text: "Transporte de pasajeros marítimo y de cabotaje"},
	{value: "5012", text: "Transporte de carga marítimo y de cabotaje"},
	{value: "502", text: "Transporte fluvial"},
	{value: "5021", text: "Transporte fluvial de pasajeros"},
	{value: "5022", text: "Transporte fluvial de carga"},
	{value: "51", text: "Transporte aéreo"},
	{value: "511", text: "Transporte aéreo de pasajeros"},
	{value: "5111", text: "Transporte aéreo nacional de pasajeros"},
	{value: "5112", text: "Transporte aéreo internacional de pasajeros"},
	{value: "512", text: "Transporte aéreo de carga"},
	{value: "5121", text: "Transporte aéreo nacional de carga"},
	{value: "5122", text: "Transporte aéreo internacional de carga"},
	{value: "52", text: "Almacenamiento y actividades complementarias al transporte"},
	{value: "5210", text: "Almacenamiento y depósito"},
	{value: "522", text: "Actividades de las estaciones, vías y servicios complementarios para el transporte"},
	{value: "5221", text: "Actividades de estaciones, vías y servicios complementarios para el transporte terrestre"},
	{value: "5222", text: "Actividades de puertos y servicios complementarios para el transporte acuático"},
	{value: "5223", text: "Actividades de aeropuertos, servicios de navegación aérea y demás actividades conexas al tran"},
	{value: "5224", text: "Manipulación de carga"},
	{value: "5229", text: "Otras actividades complementarias al transporte"},
	{value: "53", text: "Correo y servicios de mensajería"},
	{value: "5310", text: "Actividades postales nacionales"},
	{value: "5320", text: "Actividades de mensajería"},
	{value: "55", text: "Alojamiento"},
	{value: "551", text: "Actividades de alojamiento de estancias cortas"},
	{value: "5511", text: "Alojamiento en hoteles"},
	{value: "5512", text: "Alojamiento en apartahoteles"},
	{value: "5513", text: "Alojamiento en centros vacacionales"},
	{value: "5514", text: "Alojamiento rural"},
	{value: "5519", text: "Otros tipos de alojamientos para visitantes"},
	{value: "5520", text: "Actividades de zonas de camping y parques para vehículos recreacionales"},
	{value: "5530", text: "Servicio por horas"},
	{value: "5590", text: "Otros tipos de alojamiento n.c.p."},
	{value: "56", text: "Actividades de servicios de comidas y bebidas"},
	{value: "561", text: "Actividades de restaurantes, cafeterías y servicio móvil de comidas"},
	{value: "5611", text: "Expendio a la mesa de comidas preparadas"},
	{value: "5612", text: "Expendio por autoservicio de comidas preparadas"},
	{value: "5613", text: "Expendio de comidas preparadas en cafeterías"},
	{value: "5619", text: "Otros tipos de expendio de comidas preparadas n.c.p."},
	{value: "562", text: "Actividades de catering para eventos y otros servicios de comidas"},
	{value: "5621", text: "Catering para eventos"},
	{value: "5629", text: "Actividades de otros servicios de comidas"},
	{value: "5630", text: "Expendio de bebidas alcohólicas para el consumo dentro del establecimiento"},
	{value: "58", text: "Actividades de edición"},
	{value: "581", text: "Edición de libros, publicaciones periódicas y otras actividades de edición"},
	{value: "5811", text: "Edición de libros"},
	{value: "5812", text: "Edición de directorios y listas de correo"},
	{value: "5813", text: "Edición de periódicos, revistas y otras publicaciones periódicas"},
	{value: "5819", text: "Otros trabajos de edición"},
	{value: "5820", text: "Edición de programas de infromática (software)"},
	{value: "59", text: "Actividades cinematográficas, de video y producción de programas de televisión, grabación de"},
	{value: "591", text: "Actividades de producción de películas cinematográficas, video y producción de programas, anu"},
	{value: "5911", text: "Actividades de producción de películas cinematográficas, videos, programas, anuncios y comerc"},
	{value: "5912", text: "Actividades de posproducción de películas cinematográficas, videos, programas, anuncios y com"},
	{value: "5913", text: "Actividades de distribución de películas cinematográficas, videos, programas, anuncios y come"},
	{value: "5914", text: "Actividades de exhibición de películas cinematográficas y videos"},
	{value: "5920", text: "Actividades de grabación de sonido y edición de música"},
	{value: "60", text: "Actividades de programación, transmisión y/o difusión"},
	{value: "6010", text: "Actividades de programación y transmisión en el servicio de radiodifusión sonora"},
	{value: "6020", text: "Actividades de programación y transmisión de televisión"},
	{value: "61", text: "Telecomunicaciones"},
	{value: "6110", text: "Actividades de telecomunicaciones alámbricas"},
	{value: "6120", text: "Actividades de telecomunicaciones inalámbricas"},
	{value: "6130", text: "Actividades de telecomunicación satelital"},
	{value: "6190", text: "Otras actividades de telecomunicaciones"},
	{value: "62", text: "Desarrollo de sistemas informáticos (planificación, análisis, diseño, programación, pruebas),"},
	{value: "620", text: "Desarrollo de sistemas informáticos (planificación, análisis, diseño, programación, pruebas),"},
	{value: "6201", text: "Actividades de desarrollo de sistemas informáticos (planificación, análisis, diseño, programa"},
	{value: "6202", text: "Actividades de consultoría infromática y actividades de administración de instalaciones infor"},
	{value: "6209", text: "Otras actividades de tecnologías de información y actividades de servicios informáticos"},
	{value: "63", text: "Actividades de servicios de información"},
	{value: "631", text: "Procesamiento de datos, alojamiento (hosting) y actividades relacionadas; portales web"},
	{value: "6311", text: "Procesamiento de datos, alojamiento (hosting) y actividades relacionadas"},
	{value: "6312", text: "Portales web"},
	{value: "6391", text: "Otras actividades de servicio de información"},
	{value: "6391", text: "Actividades de agencias de noticias"},
	{value: "6399", text: "Otras actividades de servicio de información n.c.p."},
	{value: "64", text: "Actividades de servicios financieros, excepto las de seguros y de pensiones"},
	{value: "641", text: "Intermediación monetaria"},
	{value: "6411", text: "Banco Central"},
	{value: "6412", text: "Bancos comerciales"},
	{value: "642", text: "Otros tipos de intermediación monetaria"},
	{value: "6421", text: "Actividades de las corporaciones financieras"},
	{value: "6422", text: "Actividades de las compañías de financiamiento"},
	{value: "6423", text: "Banca de segundo piso"},
	{value: "6424", text: "Actividades de las cooperativas financieras"},
	{value: "643", text: "Fideicomisos, fondos (incluye fondos de cesantías) y entidades financieras similares"},
	{value: "6431", text: "Fideicomisos, fondos y entidades financieras similares"},
	{value: "6432", text: "Fondos de cesantías"},
	{value: "649", text: "Otras actividades de servicio financiero, excepto las de seguros y pensiones"},
	{value: "6491", text: "Leasing financiero (arrendamiento financiero)"},
	{value: "6492", text: "Actividades financieras de fondos de empleados y otras formas asociativas del sector solidari"},
	{value: "6493", text: "Actividades de compra de cartera o factoring"},
	{value: "6494", text: "Otras actividades de distribución de fondos"},
	{value: "6495", text: "Instituciones especiales oficiales"},
	{value: "6499", text: "Otras actividades de servicio financiero, excepto las de seguros y pensiones n.c.p."},
	{value: "65", text: "Seguros (incluso el reaseguro), seguros sociales y fondos de pensiones, excepto la seguridad"},
	{value: "651", text: "Seguros y capitalización"},
	{value: "6511", text: "Seguros generales"},
	{value: "6512", text: "Seguros de vida"},
	{value: "6513", text: "Reaseguros"},
	{value: "6514", text: "Capitalización"},
	{value: "652", text: "Servicios de seguros sociales de salud y riesgos profesionales"},
	{value: "6521", text: "Servicios de seguros sociales de salud"},
	{value: "6522", text: "Servicios de seguros sociales de riesgos profesionales"},
	{value: "653", text: "Servicios de seguros sociales de pensiones"},
	{value: "6531", text: "Régimen de prima media con prestación definida (RPM)"},
	{value: "6532", text: "Régimen de ahorro individual (RAI)"},
	{value: "66", text: "Actividades auxiliares de las actividades de servicios financieros"},
	{value: "661", text: "Actividades auxiliares de las actividades de servicios financieros, excepto las de seguros y"},
	{value: "6611", text: "Administración de mercados financieros"},
	{value: "6612", text: "Corretaje de valores y de contratos de productos básicos"},
	{value: "6613", text: "Otras actividades relacionadas con el mercado de valores"},
	{value: "6614", text: "Actividades de las casas de cambio"},
	{value: "6615", text: "Actividades de los profesionales de compra y venta de divisas"},
	{value: "6619", text: "Otras actividades auxiliares de las actividades de servicios financieros n.c.p."},
	{value: "662", text: "Actividades de servicios auxiliares de los servicios de seguros y pensiones"},
	{value: "6621", text: "Actividades de agentes y corredores de seguros"},
	{value: "6629", text: "Evaluación de riesgos y daños, y otras actividades de servicios auxiliares"},
	{value: "6630", text: "Actividades de administración de fondos"},
	{value: "68", text: "Actividades inmobiliarias"},
	{value: "6810", text: "Actividades inmobiliarias realizadas con bienes propios o arrendados"},
	{value: "6820", text: "Actividades inmobiliarias realizadas a cambio de una retribución o por contrato"},
	{value: "69", text: "Actividades jurídicas y de contabilidad"},
	{value: "6910", text: "Actividades jurídicas"},
	{value: "6920", text: "Actividades de contabilidad, teneduría de libros, auditoría financiera y asesoría tributaria"},
	{value: "70", text: "Actividades de administración empresarial; actividades de consultoría de gestión"},
	{value: "7010", text: "Actividades de administración empresarial"},
	{value: "7020", text: "Actividades de consultoría de gestión"},
	{value: "71", text: "Actividades de arquitectura e ingeniería; ensayos y análisis técnicos"},
	{value: "7110", text: "Actividades de arquitectura e ingeniería y otras actividades conexas de consultoría técnica"},
	{value: "7120", text: "Ensayos y análisis técnicos"},
	{value: "72", text: "Investigación científica y desarrollo"},
	{value: "7210", text: "Investigaciones y desarrollo experimental en el campo de las ciencias naturales y la ingenier"},
	{value: "7220", text: "Investigaciones y desarrollo experimental en el campo de las ciencias sociales y las humanida"},
	{value: "73", text: "Publicidad y estudios de mercado"},
	{value: "7310", text: "Publicidad"},
	{value: "7320", text: "Estudios de mercado y realización de encuestas de opinión pública"},
	{value: "74", text: "Otras actividades profesionales, científicas y técnicas"},
	{value: "7410", text: "Actividades especializadas de diseño"},
	{value: "7420", text: "Actividades de fotografía"},
	{value: "7490", text: "Otras actividades profesionales, científicas y técnicas n.c.p."},
	{value: "75", text: "Actividades veterinarias"},
	{value: "7500", text: "Actividades veterinarias"},
	{value: "77", text: "Actividades de alquiler y arrendamiento"},
	{value: "7710", text: "Alquiler y arrendamiento de vehículos automotores"},
	{value: "772", text: "Alquiler y arrendamiento de efectos personales y enseres domésticos"},
	{value: "7721", text: "Alquiler y arrendamiento de equipo recreativo y deportivo"},
	{value: "7722", text: "Alquiler de videos y discos"},
	{value: "7729", text: "Alquiler y arrendamiento de otros efectos personales y enseres domésticos n.c.p."},
	{value: "7730", text: "Alquiler y arrendamiento de otros tipos de maquinaria, equipo y bienes tangibles n.c.p."},
	{value: "7740", text: "Arrendamiento de propiedad intelectual y productos similares, excepto obras protegidas por de"},
	{value: "78", text: "Actividades de empleo"},
	{value: "7810", text: "Actividades de agencias de empleo"},
	{value: "7820", text: "Actividades de agencias de empleo temporal"},
	{value: "7830", text: "Otras actividades de suministro de recurso humano"},
	{value: "79", text: "Actividades de las agencias de viajes, operadores turísticos, servicios de reserva y activida"},
	{value: "791", text: "Actividades de las agencias de viajes y operadores turísticos"},
	{value: "7911", text: "Actividades de las agencias de viaje"},
	{value: "7912", text: "Actividades de operadores turísticos"},
	{value: "7990", text: "Otros servicios de reserva y actividades relacionadas"},
	{value: "80", text: "Actividades de seguridad e investigación privada"},
	{value: "8010", text: "Actividades de seguridad privada"},
	{value: "8020", text: "Actividades de servicios de sistemas de seguridad"},
	{value: "8030", text: "Actividades de detectives e investigadores privados"},
	{value: "81", text: "Actividades de servicios a edificios y paisajismo (jardines, zonas verdes)"},
	{value: "8110", text: "Actividades combinadas de apoyo a instalaciones"},
	{value: "812", text: "Actividades de limpieza"},
	{value: "8121", text: "Limpieza general interior de edificios"},
	{value: "8129", text: "Otras actividades de limpieza de edificios e instalaciones industriales"},
	{value: "8130", text: "Actividades de paisajismo y servicios de mantenimiento conexos"},
	{value: "82", text: "Actividades administrativas y de apoyo de oficina y otras actividades de apoyo a las empresas"},
	{value: "821", text: "Actividades administrativas y de apoyo de oficina"},
	{value: "8211", text: "Actividades combinadas de servicios administrativos de oficina"},
	{value: "8219", text: "Fotocopiado, preparación de documentos y otras actividades especializadas de apoyo a oficina"},
	{value: "8220", text: "Actividades de centros de llamadas (Call center)"},
	{value: "8230", text: "Organización de convenciones y eventos comerciales"},
	{value: "829", text: "Actividades de servicios de apoyo a las empresas n.c.p."},
	{value: "8291", text: "Actividades de agencias de cobranza y oficinas de calificación crediticia"},
	{value: "8292", text: "Actividades de envase y empaque"},
	{value: "8299", text: "Otras actividades de servicio de apoyo a las empresas n.c.p."},
	{value: "84", text: "Administración pública y defensa; planes de seguridad social de afiliación obligatoria"},
	{value: "841", text: "Administración del Estado y aplicación de la política económica y social de la comunidad"},
	{value: "8411", text: "Actividades legislativas de la administración pública"},
	{value: "8412", text: "Actividades ejecutivas de la administración pública"},
	{value: "8413", text: "Regulación de las actividades de organismos que prestan servicios de salud, educativos, cultu"},
	{value: "8414", text: "Actividades reguladoras y facilitadoras de la actividad económica"},
	{value: "8415", text: "Actividades de los otros órganos de control"},
	{value: "842", text: "Prestación de servicios a la comunidad en general"},
	{value: "8421", text: "Relaciones exteriores"},
	{value: "8422", text: "Actividades de defensa"},
	{value: "8423", text: "Orden público y actividades de seguridad"},
	{value: "8424", text: "Administración de justicia"},
	{value: "8430", text: "Actividades de planes de seguridad social de afiliación obligatoria"},
	{value: "85", text: "Educación"},
	{value: "851", text: "Educación de la primera infancia, preescolar y básica primaria"},
	{value: "8511", text: "Educación de la primera infancia"},
	{value: "8512", text: "Educación preescolar"},
	{value: "8513", text: "Educación básica primaria"},
	{value: "852", text: "Educación secundaria y de formación laboral"},
	{value: "8521", text: "Educación básica secundaria"},
	{value: "8522", text: "Educación media académica"},
	{value: "8523", text: "Educación media técnica y de formación laboral"},
	{value: "8530", text: "Establecimientos que combinan diferentes niveles de educación"},
	{value: "854", text: "Educación superior"},
	{value: "8541", text: "Educación técnica profesional"},
	{value: "8542", text: "Educación tecnológica"},
	{value: "8543", text: "Educación de instituciones universitarias o de escuelas tecnológicas"},
	{value: "8544", text: "Educación de universidades"},
	{value: "855", text: "Otros tipos de educación"},
	{value: "8551", text: "Formación académica no formal"},
	{value: "8552", text: "Enseñanza deportiva y recreativa"},
	{value: "8553", text: "Enseñanza cultural"},
	{value: "8559", text: "Otros tipos de educación n.c.p."},
	{value: "8560", text: "Actividades de apoyo a la educación"},
	{value: "86", text: "Actividades de atención de la salud humana"},
	{value: "8610", text: "Actividades de hospitales y clínicas, con internación"},
	{value: "862", text: "Actividades de práctica médica y odontológica, sin internación"},
	{value: "8621", text: "Actividades de la práctica médica, sin internación"},
	{value: "8622", text: "Actividades de la práctica odontológica"},
	{value: "869", text: "Otras actividades de atención relacionadas con la salud humana"},
	{value: "8691", text: "Actividades de apoyo diagnóstico"},
	{value: "8692", text: "Actividades de apoyo terapéutico"},
	{value: "8699", text: "Otras actividades de atención de la salud humana"},
	{value: "87", text: "Actividades de atención residencial medicalizada"},
	{value: "8710", text: "Actividades de atención residencial medicalizada de tipo general"},
	{value: "8720", text: "Actividades de atención residencial, para el cuidado de pacientes con retardo mental, enferme"},
	{value: "8730", text: "Actividades de atención en instituciones para el cuidado de personas mayores y/o discapacitad"},
	{value: "8790", text: "Otras actividades de atención en instituciones con alojamiento"},
	{value: "88", text: "Actividades de asistencia social sin alojamiento"},
	{value: "8810", text: "Actividades de asistencia social sin alojamiento para personas mayores y discapacitadas"},
	{value: "8890", text: "Otras actividades de asistencia social sin alojamiento"},
	{value: "90", text: "Actividades creativas, artísticas y de entretenimiento"},
	{value: "900", text: "Actividades creativas, artísticas y de entretenimiento"},
	{value: "9001", text: "Creación literaria"},
	{value: "9002", text: "Creación musical"},
	{value: "9003", text: "Creación teatral"},
	{value: "9004", text: "Creación audiovisual"},
	{value: "9005", text: "Artes plásticas y visuales"},
	{value: "9006", text: "Actividades teatrales"},
	{value: "9007", text: "Actividades de espectáculos musicales en vivo"},
	{value: "9008", text: "Otras actividades de espectáculos en vivo"},
	{value: "91", text: "Actividades de bibliotecas, archivos, museos y otras actividades culturales"},
	{value: "910", text: "Actividades de bibliotecas, archivos, museos y otras actividades culturales"},
	{value: "9101", text: "Actividades de bibliotecas y archivos"},
	{value: "9102", text: "Actividades y funcionamiento de museos, conservación de edificios y sitios históricos"},
	{value: "9103", text: "Actividades de jardines botánicos, zoológicos y reservas naturales"},
	{value: "92", text: "Actividades de juegos de azar y apuestas"},
	{value: "9200", text: "Actividades de juegos de azar y apuestas"},
	{value: "93", text: "Actividades deportivas y actividades recreativas y de esparcimiento"},
	{value: "931", text: "Actividades deportivas"},
	{value: "9311", text: "Gestión de instalaciones deportivas"},
	{value: "9312", text: "Actividades de clubes deportivos"},
	{value: "9319", text: "Otras actividades deportivas"},
	{value: "932", text: "Otras actividades recreativas y de esparcimiento"},
	{value: "9321", text: "Actividades de parques de atracciones y parques temáticos"},
	{value: "9329", text: "Otras actividades recreativas y de esparcimiento n.c.p."},
	{value: "94", text: "Actividades de asociaciones"},
	{value: "941", text: "Actividades de asociaciones empresariales y de empleadores, y asociaciones profesionales"},
	{value: "9411", text: "Actividades de asociaciones empresariales y de empleadores"},
	{value: "9412", text: "Actividades de asociaciones profesionales"},
	{value: "9420", text: "Actividades de sindicatos de empleados"},
	{value: "949", text: "Actividades de otras asociaciones"},
	{value: "9491", text: "Actividades de asociaciones religiosas"},
	{value: "9492", text: "Actividades de asociaciones políticas"},
	{value: "9499", text: "Actividades de otras asociaciones n.c.p."},
	{value: "95", text: "Mantenimiento y reparación de computadores, efectos personales y enseres domésticos"},
	{value: "951", text: "Mantenimiento y reparación de computadores y equipo de comunicaciones"},
	{value: "9511", text: "Mantenimiento y reparación de computadores y de equipo periférico"},
	{value: "9512", text: "Mantenimiento y reparación de equipos de comunicación"},
	{value: "952", text: "Mantenimiento y reparación de efectos personales y enseres domésticos"},
	{value: "9521", text: "Mantenimiento y reparación de aparatos electrónicos de consumo"},
	{value: "9522", text: "Mantenimiento y reparación de aparatos y equipos domésticos y de jardinería"},
	{value: "9523", text: "Reparación de calzado y artículos de cuero"},
	{value: "9524", text: "Reparación de muebles y accesorios para el hogar"},
	{value: "9529", text: "Mantenimiento y reparación de otros efectos personales y enseres domésticos"},
	{value: "96", text: "Otras actividades de servicios personales"},
	{value: "960", text: "Otras actividades de servicios personales"},
	{value: "9601", text: "Lavado y limpieza, incluso la limpieza en seco, de productos textiles y de piel"},
	{value: "9602", text: "Peluquería y otros tratamientos de belleza"},
	{value: "9603", text: "Pompas fúnebres y actividades relacionadas"},
	{value: "9609", text: "Otras actividades de servicios personales n.c.p."},
	{value: "97", text: "Actividades de los hogares individuales como empleadores de personal doméstico"},
	{value: "9700", text: "Actividades de los hogares individuales como empleadores de personal doméstico"},
	{value: "98", text: "Actividades no diferenciadas de los hogares individuales como productores de bienes y servici"},
	{value: "9810", text: "Actividades no diferenciadas de los hogares individuales como productores de bienes para uso"},
	{value: "9820", text: "Actividades no diferenciadas de los hogares individuales como productores de servicios para u"},
	{value: "99", text: "Actividades de organizaciones y entidades extraterritoriales"},
	{value: "9900", text: "Actividades de organizaciones y entidades extraterritoriales"},

];

var objetoSujetoComercialExtendido = [
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

var objetoSujetoComercial = [
    {value: '24501', text: 'VIVIENDA PERMANENTE'},
    {value: '24502', text: 'VIVIENDA TRANSITORIA'},
    {value: '24503', text: 'ESTABLECIMIENTOS EDUCATIVOS'},
    {value: '24504', text: 'ESTABLECIMIENTOS CUARTELARIOS'},
    {value: '24505', text: 'ESTABLECIMIENTOS CARCELARIOS'},
    {value: '24506', text: 'ESTABLECIMIENTOS DE ESPECTACULOS PÚBLICOS'},
    {value: '24507', text: 'ESTABLECIMIENTOS DE DIVERSION PUBLICA'},
    {value: '24508', text: 'ESTABLECIMIENTOS INDUSTRIALES'},
    {value: '24509', text: 'ESTABLECIMIENTOS COMERCIALES'},
    {value: '24510', text: 'ESTABLECIMIENTOS HOSPITALARIOS Y SIMILARES'},
    {value: '24511', text: 'PUNTOS DE ENTRADA- TERMINALES PORTUARIOS Y ACTIVIDADES CONEXAS'},
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

var tiposInscripcion = [
	{value: '01', text: 'INSCRIPCION POR PRIMERA VEZ'},
	{value: '02', text: 'ACTUALIZACION DE DATOS'},
	{value: '03', text: 'CIERRE DEL ESTABLECIMIENTO'},
]

var motivos = [
	{objeto: objetoSujetoComercial, nombre: 'sujetoComercial'},
	{objeto: objetoOtrosSujetos, nombre: 'otrosSujetos'},
	{objeto: objetoMedidasSanitarias, nombre: 'medidasSanitarias'},
	{objeto: tiposInscripcion, nombre: 'tiposInscripcion'},
]

const BASE_URL_SERVICIOS = 'https://simarpro.com/visaludservercandelaria/api';

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

function setObjeto(valor, destino, motivo){
	const { objeto } = motivos.filter( element => element.nombre === motivo)[0];
	console.log('objeto destructurado', objeto)
	const filtrado = objeto.filter(elemento => elemento.value === valor);
	document.getElementsByName(destino)[0].value = filtrado[0].text;
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


function consolidarPuntaje(con, puntaje, formulario=''){
	var puntajeTotal = 0;
	var concepto = 0;

	for (var i = 0; i < puntajeBloques.length; i++) {
		if(puntajeBloques[i] != null){
			puntajeTotal += puntajeBloques[i];
		}else{
			puntajeTotal += 0;
		}
	};

	if(formulario == '245'){
		concepto = puntajeTotal >= 95 ? 1 : puntajeTotal < 95 && puntajeTotal >= 50 ? 2 : 3;
	}else{
		concepto = puntajeTotal >= 90 ? 1 : puntajeTotal < 90 && puntajeTotal >= 60 ? 2 : 3;
	}

	console.log('puntaje computado', concepto, formulario)
	
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

	let data = 'nombreUsuario='+user.usuario+'&clave='+clave;

	let identity = {
		usuario: user.usuario,
		token: ''
	};
	//console.log(data);
	fetch(BASE_URL_SERVICIOS + 'loginVisalud', {
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
					fetch(BASE_URL_SERVICIOS + 'cerrarSesion/'+identidad.usuario)
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
	elementoInscripcion.value = '76130' + valor;
	elementoInscripcion.dispatchEvent(event);
}

function vehiNumInscripcion(valor){
	let event = new Event('input');
	let eventRep = new Event('input');
	let elementoInscripcion = document.getElementsByName('inscripcion444')[0];
	let elementoInscripcionRep = document.getElementsByName('inscripcionRep444')[0];
	elementoInscripcion.value = '76130' + valor;
	elementoInscripcionRep.value = '76130' + valor;
	let isValidEvent = elementoInscripcion.dispatchEvent(event);
	let isValidEventRep = elementoInscripcionRep.dispatchEvent(eventRep);
	console.log('dispatch de eventos', isValidEvent, isValidEventRep)
}

function auxiliarInscVehi(valor){
	if(document.getElementsByName('placaSrmque444')[0].value == '' && document.getElementsByName('placaRemolque444')[0].value == ''){
		let event = new Event('input');
		let elementoInscripcion = document.getElementsByName('inscripcion444')[0];
		elementoInscripcion.value = '76130' + valor;
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