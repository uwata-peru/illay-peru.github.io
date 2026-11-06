/* =====================================================================
   ILLAY · DATOS DE LA WEB
   Aquí se editan las comunidades, leyendas, árboles y precios.
   Lo marcado con  ejemplo: true  son datos de ejemplo que el equipo
   debe reemplazar con datos reales.
   ===================================================================== */
window.ILLAY = {

  config: {
    // Número de WhatsApp de Illay, con código de país y sin "+" ni espacios.
    // ⚠️ Número DE EJEMPLO: cámbialo por el real y pon whatsappEsEjemplo: false
    whatsapp: '51999999999',
    whatsappEsEjemplo: true,
    moneda: 'US$',
    // Zona que se ve al abrir el mapa (Loreto). Se puede alejar libremente.
    vistaInicial: [[-6.2, -76.6], [-1.6, -70.2]]
  },

  // Iquitos: punto de partida (coordenadas reales del centro de la ciudad)
  iquitos: { lat: -3.7437, lng: -73.2516 },

  // Especies que se pueden sembrar (cada comunidad elige cuáles ofrece)
  especies: {
    camu: {
      nombre: 'Camu camu',
      desc: { es: 'Arbusto de las orillas que aguanta las inundaciones.', en: 'Riverbank shrub that withstands floods.', fr: 'Arbuste des berges qui résiste aux crues.' }
    },
    aguaje: {
      nombre: 'Aguaje',
      desc: { es: 'La palmera símbolo de Loreto.', en: 'The palm that symbolizes Loreto.', fr: 'Le palmier emblème du Loreto.' }
    },
    shihuahuaco: {
      nombre: 'Shihuahuaco',
      desc: { es: 'Árbol gigante, amenazado por la tala.', en: 'Giant tree threatened by logging.', fr: 'Arbre géant menacé par l’abattage.' }
    }
  },

  // Planes de cuidado del árbol (precios de ejemplo)
  planes: [
    { id: 'mensual', meses: 1, precio: 10 },
    { id: 'semestral', meses: 6, precio: 54 },
    { id: 'anual', meses: 12, precio: 96 }
  ],

  /* -------------------------------------------------------------------
     COMUNIDADES
     lat / lng: coordenadas. En Google Maps, mantén presionado el lugar
     y copia los dos números que aparecen (ej.: -3.47, -72.95).
     Si lat es null, la comunidad no aparece en el mapa todavía.
     Para agregar una comunidad nueva, copia un bloque { ... } y cámbialo.
     ------------------------------------------------------------------- */
  comunidades: [
    {
      id: 'yanashi', nombre: 'Yanashi', real: true,
      lat: null, lng: null, // ⚠️ falta poner sus coordenadas reales
      seed: 4, escena: 'village',
      rio: { es: 'Ribera amazónica', en: 'Amazon riverbank', fr: 'Rive amazonienne' },
      tiempo: null,
      especies: ['camu', 'aguaje', 'shihuahuaco'],
      lema: { es: 'Donde la vida sigue el ritmo del río', en: 'Where life follows the rhythm of the river', fr: 'Là où la vie suit le rythme du fleuve' },
      frase: { es: 'Casas sobre pilotes, chacras y familias que te reciben como a uno más.', en: 'Stilt houses, farm plots and families who welcome you as one of their own.', fr: 'Maisons sur pilotis, cultures et familles qui vous accueillent comme l’un des leurs.' },
      porQue: { es: ['Un día con una familia ribereña', 'Pesca y cocina del río', 'Siembra tu árbol'], en: ['A day with a riverside family', 'River fishing and cooking', 'Plant your tree'], fr: ['Une journée en famille', 'Pêche et cuisine du fleuve', 'Plantez votre arbre'] },
      historia: { es: 'Aquí irá la historia de cómo nació Yanashi, contada por sus abuelos y abuelas.', en: 'The story of how Yanashi began, told by its elders, will go here.', fr: 'Ici figurera l’histoire de la naissance de Yanashi, racontée par ses anciens.' },
      llegar: [
        { es: ['Mototaxi al puerto de Iquitos', ''], en: ['Mototaxi to the Iquitos port', ''], fr: ['Mototaxi jusqu’au port d’Iquitos', ''] },
        { es: ['Bote rápido por el río', 'Tiempo y precio por confirmar.'], en: ['Speedboat along the river', 'Time and fare to be confirmed.'], fr: ['Bateau rapide sur le fleuve', 'Durée et prix à confirmer.'] }
      ],
      experiencias: [
        { n: { es: 'Un día con una familia ribereña', en: 'A day with a riverside family', fr: 'Une journée avec une famille riveraine' }, d: { es: 'Día completo · almuerzo incluido', en: 'Full day · lunch included', fr: 'Journée · déjeuner inclus' }, p: 35 },
        { n: { es: 'Pesca y cocina del río', en: 'River fishing and cooking', fr: 'Pêche et cuisine du fleuve' }, d: { es: 'Medio día', en: 'Half day', fr: 'Demi-journée' }, p: 25 }
      ],
      leyenda: 'chullachaqui'
    },
    {
      id: 'lupuna', nombre: 'Puerto Lupuna', ejemplo: true,
      lat: -3.83, lng: -73.62, seed: 1, escena: 'forest',
      rio: { es: 'Río Nanay', en: 'Nanay River', fr: 'Rivière Nanay' },
      tiempo: { es: '≈ 1 h', en: '≈ 1 h', fr: '≈ 1 h' },
      especies: ['camu', 'shihuahuaco'],
      lema: { es: 'Aguas negras, arena blanca', en: 'Black water, white sand', fr: 'Eaux noires, sable blanc' },
      frase: { es: 'Un río oscuro como el té y playas que aparecen cuando baja el agua.', en: 'A river dark as tea, and beaches that appear when the water drops.', fr: 'Une rivière sombre comme le thé et des plages qui apparaissent à la décrue.' },
      porQue: { es: ['Bañarte en aguas negras', 'Artesanía con semillas', 'La lupuna gigante'], en: ['Swim in black water', 'Seed crafts', 'The giant lupuna'], fr: ['Baignade en eaux noires', 'Artisanat en graines', 'La lupuna géante'] },
      llegar: [
        { es: ['Mototaxi al puerto del Nanay', ''], en: ['Mototaxi to the Nanay port', ''], fr: ['Mototaxi jusqu’au port du Nanay', ''] },
        { es: ['Bote colectivo río arriba', '≈ 1 hora.'], en: ['Shared boat upriver', '≈ 1 hour.'], fr: ['Bateau collectif en amont', '≈ 1 heure.'] }
      ],
      experiencias: [{ n: { es: 'Taller de artesanía con semillas', en: 'Seed craft workshop', fr: 'Atelier d’artisanat en graines' }, d: { es: '3 horas', en: '3 hours', fr: '3 heures' }, p: 18 }],
      leyenda: 'lupuna'
    },
    {
      id: 'aguajal', nombre: 'Caño Aguajal', ejemplo: true,
      lat: -4.43, lng: -73.7, seed: 6, escena: 'village',
      rio: { es: 'Río Marañón', en: 'Marañón River', fr: 'Fleuve Marañón' },
      tiempo: { es: '≈ 3 h', en: '≈ 3 h', fr: '≈ 3 h' },
      especies: ['aguaje', 'camu'],
      lema: { es: 'En canoa por el bosque inundado', en: 'By canoe through the flooded forest', fr: 'En pirogue dans la forêt inondée' },
      frase: { es: 'Cuando crece el río, se navega entre las palmeras de aguaje.', en: 'When the river rises, you paddle among the aguaje palms.', fr: 'Quand le fleuve monte, on navigue entre les palmiers aguaje.' },
      porQue: { es: ['Canoa entre los árboles', 'Cosecha de aguaje', 'Aves al amanecer'], en: ['Canoe among the trees', 'Aguaje harvest', 'Birds at dawn'], fr: ['Pirogue entre les arbres', 'Récolte d’aguaje', 'Oiseaux à l’aube'] },
      llegar: [
        { es: ['Carretera Iquitos – Nauta', '≈ 1 h 30 en bus o colectivo.'], en: ['Iquitos – Nauta road', '≈ 1 h 30 by bus or shared car.'], fr: ['Route Iquitos – Nauta', '≈ 1 h 30 en bus ou taxi collectif.'] },
        { es: ['Bote desde Nauta', '≈ 1 hora.'], en: ['Boat from Nauta', '≈ 1 hour.'], fr: ['Bateau depuis Nauta', '≈ 1 heure.'] }
      ],
      experiencias: [{ n: { es: 'Canoa por el bosque inundado', en: 'Flooded forest canoe trip', fr: 'Pirogue en forêt inondée' }, d: { es: 'Medio día', en: 'Half day', fr: 'Demi-journée' }, p: 30 }],
      leyenda: 'yacumama'
    },
    {
      id: 'bufeo', nombre: 'Bufeo Colorado', ejemplo: true,
      lat: -3.36, lng: -72.1, seed: 2, escena: 'dolphin',
      rio: { es: 'Río Amazonas', en: 'Amazon River', fr: 'Fleuve Amazone' },
      tiempo: { es: '≈ 4 h', en: '≈ 4 h', fr: '≈ 4 h' },
      especies: ['camu', 'aguaje'],
      lema: { es: 'Donde salen los delfines rosados', en: 'Where the pink dolphins surface', fr: 'Là où surgissent les dauphins roses' },
      frase: { es: 'Una laguna tranquila donde el bufeo colorado sale a respirar al atardecer.', en: 'A quiet lake where the pink dolphin comes up to breathe at sunset.', fr: 'Un lac paisible où le dauphin rose remonte respirer au coucher du soleil.' },
      porQue: { es: ['Ver bufeos desde la canoa', 'Leyendas de los abuelos', 'Atardecer en el Amazonas'], en: ['Dolphins from the canoe', 'Elders’ legends', 'Sunset on the Amazon'], fr: ['Dauphins depuis la pirogue', 'Légendes des anciens', 'Coucher de soleil sur l’Amazone'] },
      llegar: [
        { es: ['Mototaxi al puerto de Iquitos', ''], en: ['Mototaxi to the Iquitos port', ''], fr: ['Mototaxi jusqu’au port d’Iquitos', ''] },
        { es: ['Bote rápido río abajo', '≈ 4 horas.'], en: ['Speedboat downriver', '≈ 4 hours.'], fr: ['Bateau rapide en aval', '≈ 4 heures.'] }
      ],
      experiencias: [{ n: { es: 'Avistamiento de bufeos', en: 'Pink dolphin watching', fr: 'Observation des dauphins roses' }, d: { es: 'Medio día', en: 'Half day', fr: 'Demi-journée' }, p: 28 }],
      leyenda: 'bufeo'
    },
    {
      id: 'ojodecocha', nombre: 'Ojo de Cocha', ejemplo: true,
      lat: -4.95, lng: -73.82, seed: 7, escena: 'village',
      rio: { es: 'Río Ucayali', en: 'Ucayali River', fr: 'Fleuve Ucayali' },
      tiempo: { es: '≈ 6 h', en: '≈ 6 h', fr: '≈ 6 h' },
      especies: ['camu', 'shihuahuaco'],
      lema: { es: 'El espejo del Ucayali', en: 'The mirror of the Ucayali', fr: 'Le miroir de l’Ucayali' },
      frase: { es: 'Una cocha tan quieta que el cielo se ve dos veces.', en: 'A lake so still you see the sky twice.', fr: 'Un lac si calme qu’on voit le ciel deux fois.' },
      porQue: { es: ['Pesca de paiche responsable', 'Noche de estrellas', 'Cocina con leña'], en: ['Responsible paiche fishing', 'Starry night', 'Wood-fire cooking'], fr: ['Pêche responsable du paiche', 'Nuit étoilée', 'Cuisine au feu de bois'] },
      llegar: [
        { es: ['Lancha Iquitos – Requena', 'Sale del puerto de Iquitos.'], en: ['Iquitos – Requena boat', 'Leaves from the Iquitos port.'], fr: ['Bateau Iquitos – Requena', 'Part du port d’Iquitos.'] },
        { es: ['Canoa con un guía del pueblo', ''], en: ['Canoe with a local guide', ''], fr: ['Pirogue avec un guide local', ''] }
      ],
      experiencias: [{ n: { es: 'Noche en la cocha', en: 'A night on the lake', fr: 'Une nuit sur le lac' }, d: { es: '2 días · 1 noche', en: '2 days · 1 night', fr: '2 jours · 1 nuit' }, p: 60 }],
      leyenda: null
    },
    {
      id: 'nuevopaiche', nombre: 'Nuevo Paiche', ejemplo: true,
      lat: -2.75, lng: -73.45, seed: 8, escena: 'forest',
      rio: { es: 'Río Napo', en: 'Napo River', fr: 'Rivière Napo' },
      tiempo: { es: '≈ 8 h', en: '≈ 8 h', fr: '≈ 8 h' },
      especies: ['shihuahuaco', 'aguaje'],
      lema: { es: 'Selva profunda en el Napo', en: 'Deep jungle on the Napo', fr: 'Jungle profonde sur le Napo' },
      frase: { es: 'Caminos de monte, árboles gigantes y el sonido de la selva de noche.', en: 'Forest trails, giant trees and the sound of the jungle at night.', fr: 'Sentiers de forêt, arbres géants et le chant de la jungle la nuit.' },
      porQue: { es: ['Caminata nocturna', 'Plantas medicinales', 'Árboles gigantes'], en: ['Night walk', 'Medicinal plants', 'Giant trees'], fr: ['Marche nocturne', 'Plantes médicinales', 'Arbres géants'] },
      llegar: [
        { es: ['Bote Iquitos – Mazán', 'Por el Amazonas.'], en: ['Iquitos – Mazán boat', 'Along the Amazon.'], fr: ['Bateau Iquitos – Mazán', 'Sur l’Amazone.'] },
        { es: ['Lancha río Napo arriba', 'Horarios por confirmar.'], en: ['Boat up the Napo', 'Schedule to be confirmed.'], fr: ['Bateau en remontant le Napo', 'Horaires à confirmer.'] }
      ],
      experiencias: [{ n: { es: 'Caminata nocturna con guía', en: 'Guided night walk', fr: 'Marche nocturne guidée' }, d: { es: '3 horas', en: '3 hours', fr: '3 heures' }, p: 22 }],
      leyenda: 'chullachaqui'
    },
    {
      id: 'islahuito', nombre: 'Isla Huito', ejemplo: true,
      lat: -3.85, lng: -70.85, seed: 5, escena: 'village',
      rio: { es: 'Río Amazonas · Trapecio', en: 'Amazon River · Trapezium', fr: 'Fleuve Amazone · Trapèze' },
      tiempo: { es: '≈ 10 h', en: '≈ 10 h', fr: '≈ 10 h' },
      especies: ['camu', 'aguaje'],
      lema: { es: 'Una isla en medio del gran río', en: 'An island in the middle of the great river', fr: 'Une île au milieu du grand fleuve' },
      frase: { es: 'Frutas de la chacra, música de fiesta y el río por todos lados.', en: 'Farm fruit, festival music and the river all around.', fr: 'Fruits du jardin, musique de fête et le fleuve tout autour.' },
      porQue: { es: ['Frutas amazónicas', 'Fiesta del pueblo', 'Vista del Amazonas'], en: ['Amazonian fruit', 'Village festival', 'Amazon views'], fr: ['Fruits amazoniens', 'Fête du village', 'Vue sur l’Amazone'] },
      llegar: [
        { es: ['Bote rápido Iquitos – Caballococha', 'Viaje largo, sale temprano.'], en: ['Iquitos – Caballococha speedboat', 'Long trip, leaves early.'], fr: ['Bateau rapide Iquitos – Caballococha', 'Long trajet, départ tôt.'] },
        { es: ['Canoa a la isla', ''], en: ['Canoe to the island', ''], fr: ['Pirogue jusqu’à l’île', ''] }
      ],
      experiencias: [{ n: { es: 'Día de frutas y chacra', en: 'Fruit and farm day', fr: 'Journée fruits et jardin' }, d: { es: 'Día completo', en: 'Full day', fr: 'Journée' }, p: 30 }],
      leyenda: 'bufeo'
    },
    {
      id: 'puertoshapaja', nombre: 'Puerto Shapaja', ejemplo: true,
      lat: -5.15, lng: -75.55, seed: 9, escena: 'forest',
      rio: { es: 'Río Huallaga', en: 'Huallaga River', fr: 'Fleuve Huallaga' },
      tiempo: { es: '≈ 1 día', en: '≈ 1 day', fr: '≈ 1 jour' },
      especies: ['aguaje', 'shihuahuaco'],
      lema: { es: 'La puerta a Pacaya Samiria', en: 'The gateway to Pacaya Samiria', fr: 'La porte de Pacaya Samiria' },
      frase: { es: 'Desde aquí se entra a la reserva nacional más grande del Perú.', en: 'From here you enter Peru’s largest national reserve.', fr: 'D’ici, on entre dans la plus grande réserve nationale du Pérou.' },
      porQue: { es: ['Entrada a la reserva', 'Lagunas y aves', 'Campamento en la selva'], en: ['Gateway to the reserve', 'Lakes and birds', 'Jungle camp'], fr: ['Accès à la réserve', 'Lacs et oiseaux', 'Camp dans la jungle'] },
      llegar: [
        { es: ['Lancha Iquitos – Lagunas', 'Viaje de más de un día.'], en: ['Iquitos – Lagunas boat', 'Over a day’s journey.'], fr: ['Bateau Iquitos – Lagunas', 'Plus d’une journée de trajet.'] },
        { es: ['Bote al puerto del pueblo', ''], en: ['Boat to the village port', ''], fr: ['Bateau jusqu’au port du village', ''] }
      ],
      experiencias: [{ n: { es: 'Campamento en la reserva', en: 'Camp in the reserve', fr: 'Camp dans la réserve' }, d: { es: '3 días · 2 noches', en: '3 days · 2 nights', fr: '3 jours · 2 nuits' }, p: 120 }],
      leyenda: 'yacumama'
    }
  ],

  /* -------------------------------------------------------------------
     LEYENDAS: 1 gratis por comunidad (texto + audio).
     Versiones de ejemplo; la final la cuenta un abuelo o abuela.
     ------------------------------------------------------------------- */
  leyendas: {
    chullachaqui: {
      titulo: { es: 'El Chullachaqui', en: 'The Chullachaqui', fr: 'Le Chullachaqui' },
      gancho: { es: 'El espíritu que cuida el monte… y confunde a los que entran.', en: 'The spirit that guards the forest… and leads astray those who enter.', fr: 'L’esprit qui garde la forêt… et égare ceux qui y entrent.' },
      texto: {
        es: 'Dicen los abuelos que en lo profundo del monte vive el Chullachaqui, un espíritu que cuida el bosque. Puede tomar la forma de un amigo o de un familiar para que la gente se pierda entre los árboles. Lo reconoces por sus pies: uno es distinto al otro. Por eso, si alguien conocido te invita a ir más adentro del monte, mírale los pies.',
        en: 'The elders say that deep in the forest lives the Chullachaqui, a spirit that guards the woods. It can take the shape of a friend or relative to lead people astray among the trees. You can tell by its feet: one is different from the other. So if someone you know invites you deeper into the forest, look at their feet.',
        fr: 'Les anciens disent qu’au fond de la forêt vit le Chullachaqui, un esprit qui garde les bois. Il peut prendre l’apparence d’un ami ou d’un parent pour égarer les gens parmi les arbres. On le reconnaît à ses pieds : l’un est différent de l’autre. Alors, si quelqu’un que vous connaissez vous invite à vous enfoncer dans la forêt, regardez ses pieds.'
      }
    },
    lupuna: {
      titulo: { es: 'La madre de la lupuna', en: 'The mother of the lupuna', fr: 'La mère de la lupuna' },
      gancho: { es: 'El árbol gigante al que hay que pedirle permiso.', en: 'The giant tree you must ask for permission.', fr: 'L’arbre géant à qui il faut demander la permission.' },
      texto: {
        es: 'La lupuna es uno de los árboles más grandes del monte. Los mayores dicen que tiene su madre, un espíritu que la protege, y que antes de tocarla o de pasar a su lado hay que pedirle permiso. Quien la trata con respeto, sigue su camino tranquilo.',
        en: 'The lupuna is one of the biggest trees in the forest. The elders say it has its mother, a spirit that protects it, and that you must ask permission before touching it or walking past. Those who treat it with respect go on their way in peace.',
        fr: 'La lupuna est l’un des plus grands arbres de la forêt. Les anciens disent qu’elle a sa mère, un esprit qui la protège, et qu’il faut lui demander la permission avant de la toucher ou de passer à côté. Qui la respecte poursuit son chemin en paix.'
      }
    },
    yacumama: {
      titulo: { es: 'La Yacumama', en: 'The Yacumama', fr: 'La Yacumama' },
      gancho: { es: 'La boa gigante que duerme en el fondo de las cochas.', en: 'The giant boa that sleeps at the bottom of the lakes.', fr: 'Le boa géant qui dort au fond des lacs.' },
      texto: {
        es: 'La Yacumama es la madre de las aguas: una boa gigante que vive en las cochas y en el fondo de los ríos. Los antiguos cuentan que cuando se mueve cambia el curso del agua, y que hay que respetar las cochas, sin ensuciarlas ni hacer bulla, para no despertarla.',
        en: 'The Yacumama is the mother of the waters: a giant boa that lives in the lakes and at the bottom of the rivers. The old ones say that when she moves, the water changes course, and that you must respect the lakes, without dirtying them or making noise, so as not to wake her.',
        fr: 'La Yacumama est la mère des eaux : un boa géant qui vit dans les lacs et au fond des rivières. Les anciens racontent que lorsqu’elle bouge, l’eau change de cours, et qu’il faut respecter les lacs, sans les salir ni faire de bruit, pour ne pas la réveiller.'
      }
    },
    bufeo: {
      titulo: { es: 'El bufeo colorado', en: 'The pink dolphin', fr: 'Le dauphin rose' },
      gancho: { es: 'El delfín que en las fiestas se convierte en hombre.', en: 'The dolphin who turns into a man at parties.', fr: 'Le dauphin qui devient homme les soirs de fête.' },
      texto: {
        es: 'En las noches de fiesta, dicen, el bufeo colorado sale del río convertido en un hombre elegante, con sombrero para esconder el agujero por donde respira. Baila toda la noche y, antes del amanecer, regresa al agua. Por eso, a los bufeos no se les hace daño.',
        en: 'On party nights, they say, the pink dolphin leaves the river as an elegant man, wearing a hat to hide the hole he breathes through. He dances all night and, before dawn, returns to the water. That is why no one harms the dolphins.',
        fr: 'Les soirs de fête, dit-on, le dauphin rose sort du fleuve sous la forme d’un homme élégant, coiffé d’un chapeau pour cacher le trou par lequel il respire. Il danse toute la nuit et, avant l’aube, retourne à l’eau. C’est pourquoi on ne fait jamais de mal aux dauphins.'
      }
    }
  },

  /* -------------------------------------------------------------------
     ÁRBOLES SEMBRADOS (ejemplo). Cada árbol tiene un código que va en su
     plaquita y en la tarjeta del turista, con un código QR.
     diasDesdeSiembra: solo para el ejemplo (calcula la fecha sola).
     ------------------------------------------------------------------- */
  arboles: {
    'ILLAY-0001': {
      ejemplo: true,
      nombre: 'Esperanza',
      especie: 'camu',
      comunidad: 'lupuna',
      padrino: 'Ana (ejemplo)',
      cuidador: 'Don Julio (ejemplo)',
      plan: 'anual',
      diasDesdeSiembra: 130
    }
  }
};
