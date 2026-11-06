/* =====================================================================
   ILLAY · DATOS DE LA WEB
   Aquí se editan las comunidades, leyendas, árboles y precios.
   Todo lo marcado con  ejemplo: true  son datos de ejemplo
   que el equipo debe reemplazar con datos reales.
   ===================================================================== */
window.ILLAY = {

  config: {
    // Número de WhatsApp de Illay, con código de país y sin "+" ni espacios.
    // ⚠️ Este es un número DE EJEMPLO: cámbialo por el real.
    whatsapp: '51999999999',
    whatsappEsEjemplo: true,
    // Moneda de los precios de ejemplo
    moneda: 'US$'
  },

  // Iquitos: punto de partida (coordenadas reales del centro de la ciudad)
  iquitos: { lat: -3.7437, lng: -73.2516 },

  // Especies que se pueden sembrar (cada comunidad elige cuáles ofrece)
  especies: {
    camu: {
      nombre: 'Camu camu',
      desc: {
        es: 'Arbusto de las orillas que aguanta las inundaciones. Su fruto es muy rico en vitamina C.',
        en: 'Riverbank shrub that withstands floods. Its fruit is very rich in vitamin C.',
        fr: 'Arbuste des berges qui résiste aux crues. Son fruit est très riche en vitamine C.'
      }
    },
    aguaje: {
      nombre: 'Aguaje',
      desc: {
        es: 'La palmera símbolo de Loreto. Crece en zonas inundables y su fruto es parte de la vida diaria.',
        en: 'The palm that symbolizes Loreto. It grows in flooded areas and its fruit is part of daily life.',
        fr: 'Le palmier emblème du Loreto. Il pousse dans les zones inondables et son fruit fait partie du quotidien.'
      }
    },
    shihuahuaco: {
      nombre: 'Shihuahuaco',
      desc: {
        es: 'Árbol gigante de madera muy dura, amenazado por la tala. Crece lento: es una apuesta a largo plazo.',
        en: 'Giant hardwood tree threatened by logging. Slow growing: a long-term commitment.',
        fr: 'Arbre géant au bois très dur, menacé par l’abattage. Croissance lente : un engagement à long terme.'
      }
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
     ------------------------------------------------------------------- */
  comunidades: [
    {
      id: 'yanashi',
      nombre: 'Yanashi',
      real: true,
      ubicacionAproximada: true, // ⚠️ poner las coordenadas reales
      lat: -3.47, lng: -72.95,
      seed: 4, escena: 'village',
      rio: { es: 'Ribera amazónica · Maynas', en: 'Amazon riverbank · Maynas', fr: 'Rive amazonienne · Maynas' },
      tiempo: null, // por confirmar
      especies: ['camu', 'aguaje', 'shihuahuaco'],
      lema: { es: 'Pueblo ribereño de Maynas, Loreto', en: 'Riverside village in Maynas, Loreto', fr: 'Village riverain de Maynas, Loreto' },
      como: {
        es: 'Yanashi es un centro poblado ribereño de la provincia de Maynas, en Loreto. Aquí la vida se mueve al ritmo del río: la chacra, la pesca y las casas sobre pilotes que esperan la creciente.',
        en: 'Yanashi is a riverside village in the province of Maynas, Loreto. Life here moves with the river: the farm plots, fishing and stilt houses built for the rising water.',
        fr: 'Yanashi est un village riverain de la province de Maynas, au Loreto. Ici, la vie suit le rythme du fleuve : les cultures, la pêche et les maisons sur pilotis qui attendent la crue.'
      },
      especial: {
        es: 'Es un pueblo de verdad, lejos del circuito turístico de siempre. El visitante no mira desde el bote: entra a la casa, come lo que come la familia y aprende cómo se vive en la ribera.',
        en: 'It is a real village, far from the usual tourist circuit. Visitors do not watch from the boat: they step into the house, eat what the family eats and learn how life works on the riverbank.',
        fr: 'C’est un vrai village, loin du circuit touristique habituel. Le visiteur ne regarde pas depuis le bateau : il entre dans la maison, mange ce que mange la famille et découvre la vie sur la rive.'
      },
      porQue: {
        es: ['Pasar un día con una familia ribereña', 'Pescar y cocinar con técnicas locales', 'Sembrar tu árbol junto a un comunero'],
        en: ['Spend a day with a riverside family', 'Fish and cook with local techniques', 'Plant your tree with a local caretaker'],
        fr: ['Passer une journée avec une famille riveraine', 'Pêcher et cuisiner avec des techniques locales', 'Planter votre arbre avec un habitant']
      },
      historia: {
        es: 'Aquí irá la historia de cómo nació Yanashi, contada por sus abuelos y abuelas. El equipo Illay la recopilará directamente con la comunidad.',
        en: 'This is where the story of how Yanashi began will go, told by its elders. The Illay team will collect it directly with the community.',
        fr: 'Ici figurera l’histoire de la naissance de Yanashi, racontée par ses anciens. L’équipe Illay la recueillera directement auprès de la communauté.'
      },
      llegar: [
        { es: ['Mototaxi al puerto de Iquitos', 'Pide ir al embarcadero de botes rápidos.'], en: ['Mototaxi to the Iquitos port', 'Ask for the speedboat dock.'], fr: ['Mototaxi jusqu’au port d’Iquitos', 'Demandez l’embarcadère des bateaux rapides.'] },
        { es: ['Bote rápido (deslizador) río abajo', 'Tiempo y precio por confirmar.'], en: ['Speedboat downriver', 'Time and fare to be confirmed.'], fr: ['Bateau rapide en aval', 'Durée et prix à confirmer.'] },
        { es: ['Opción económica: lancha de pasajeros', 'Más lenta y más barata. Horarios por confirmar.'], en: ['Budget option: passenger boat', 'Slower and cheaper. Schedule to be confirmed.'], fr: ['Option économique : bateau de passagers', 'Plus lent et moins cher. Horaires à confirmer.'] }
      ],
      experiencias: [
        { n: { es: 'Un día con una familia ribereña', en: 'A day with a riverside family', fr: 'Une journée avec une famille riveraine' }, d: { es: 'Día completo · almuerzo incluido', en: 'Full day · lunch included', fr: 'Journée · déjeuner inclus' }, p: 35 },
        { n: { es: 'Pesca y cocina del río', en: 'River fishing and cooking', fr: 'Pêche et cuisine du fleuve' }, d: { es: 'Medio día', en: 'Half day', fr: 'Demi-journée' }, p: 25 }
      ],
      leyenda: 'chullachaqui'
    },
    {
      id: 'lupuna',
      nombre: 'Puerto Lupuna',
      ejemplo: true,
      lat: -3.83, lng: -73.62,
      seed: 1, escena: 'forest',
      rio: { es: 'Río Nanay', en: 'Nanay River', fr: 'Rivière Nanay' },
      tiempo: { es: '≈ 1 h', en: '≈ 1 h', fr: '≈ 1 h' },
      especies: ['camu', 'shihuahuaco'],
      lema: { es: 'Aguas negras y playas de arena blanca', en: 'Black water and white sand beaches', fr: 'Eaux noires et plages de sable blanc' },
      como: {
        es: 'Comunidad a orillas del Nanay, un río de aguas oscuras como té. En época de vaciante aparecen playas de arena blanca.',
        en: 'A community on the banks of the Nanay, a river with tea-dark water. When the water drops, white sand beaches appear.',
        fr: 'Communauté au bord du Nanay, une rivière aux eaux sombres comme du thé. À la décrue, des plages de sable blanc apparaissent.'
      },
      especial: {
        es: 'Las familias trabajan la artesanía con semillas y fibras del bosque, y conocen las plantas medicinales de la zona.',
        en: 'Families make crafts from forest seeds and fibers, and know the medicinal plants of the area.',
        fr: 'Les familles fabriquent de l’artisanat avec des graines et des fibres de la forêt et connaissent les plantes médicinales.'
      },
      porQue: {
        es: ['Bañarte en un río de aguas negras', 'Taller de artesanía con semillas', 'Ver la lupuna, el árbol gigante de las leyendas'],
        en: ['Swim in a blackwater river', 'Seed craft workshop', 'See the lupuna, the giant tree of the legends'],
        fr: ['Se baigner dans une rivière d’eaux noires', 'Atelier d’artisanat en graines', 'Voir la lupuna, l’arbre géant des légendes']
      },
      historia: {
        es: 'Historia de ejemplo: fundada por familias que llegaron por el río buscando tierras para sembrar.',
        en: 'Sample story: founded by families who came along the river looking for land to farm.',
        fr: 'Histoire d’exemple : fondée par des familles venues par la rivière chercher des terres à cultiver.'
      },
      llegar: [
        { es: ['Mototaxi al puerto del Nanay', 'Salen botes durante el día.'], en: ['Mototaxi to the Nanay port', 'Boats leave during the day.'], fr: ['Mototaxi jusqu’au port du Nanay', 'Des bateaux partent dans la journée.'] },
        { es: ['Bote colectivo río arriba', '≈ 1 hora (ejemplo).'], en: ['Shared boat upriver', '≈ 1 hour (sample).'], fr: ['Bateau collectif en amont', '≈ 1 heure (exemple).'] }
      ],
      experiencias: [
        { n: { es: 'Taller de artesanía con semillas', en: 'Seed craft workshop', fr: 'Atelier d’artisanat en graines' }, d: { es: '3 horas', en: '3 hours', fr: '3 heures' }, p: 18 }
      ],
      leyenda: 'lupuna'
    },
    {
      id: 'aguajal',
      nombre: 'Caño Aguajal',
      ejemplo: true,
      lat: -4.12, lng: -73.27,
      seed: 6, escena: 'village',
      rio: { es: 'Río Amazonas · aguas arriba', en: 'Amazon River · upstream', fr: 'Fleuve Amazone · en amont' },
      tiempo: { es: '≈ 2 h', en: '≈ 2 h', fr: '≈ 2 h' },
      especies: ['aguaje', 'camu'],
      lema: { es: 'Canoa entre el bosque inundado', en: 'Canoeing through the flooded forest', fr: 'En pirogue dans la forêt inondée' },
      como: {
        es: 'Pueblo rodeado de aguajales. En creciente se recorre el bosque inundado en canoa, entre palmeras de aguaje.',
        en: 'A village surrounded by aguaje palm swamps. When the river rises, you paddle through the flooded forest.',
        fr: 'Village entouré de marais de palmiers aguaje. À la crue, on parcourt la forêt inondée en pirogue.'
      },
      especial: {
        es: 'El aguaje es el fruto de Loreto. Aquí ves de dónde sale y cómo se cosecha sin tumbar la palmera.',
        en: 'Aguaje is the fruit of Loreto. Here you see where it comes from and how it is harvested without cutting the palm.',
        fr: 'L’aguaje est le fruit du Loreto. Ici, vous voyez d’où il vient et comment on le récolte sans abattre le palmier.'
      },
      porQue: {
        es: ['Paseo en canoa por el bosque inundado', 'Cosecha responsable de aguaje', 'Observación de aves al amanecer'],
        en: ['Canoe trip through the flooded forest', 'Responsible aguaje harvest', 'Birdwatching at dawn'],
        fr: ['Balade en pirogue dans la forêt inondée', 'Récolte responsable de l’aguaje', 'Observation des oiseaux à l’aube']
      },
      historia: {
        es: 'Historia de ejemplo: el nombre viene del caño (brazo de río) lleno de aguajes que rodea al pueblo.',
        en: 'Sample story: the name comes from the river channel full of aguaje palms around the village.',
        fr: 'Histoire d’exemple : le nom vient du bras de rivière rempli de palmiers aguaje qui entoure le village.'
      },
      llegar: [
        { es: ['Mototaxi al puerto de Iquitos', ''], en: ['Mototaxi to the Iquitos port', ''], fr: ['Mototaxi jusqu’au port d’Iquitos', ''] },
        { es: ['Bote rápido río arriba', '≈ 2 horas (ejemplo).'], en: ['Speedboat upriver', '≈ 2 hours (sample).'], fr: ['Bateau rapide en amont', '≈ 2 heures (exemple).'] },
        { es: ['Canoa con un guía del pueblo', 'Para entrar al aguajal.'], en: ['Canoe with a local guide', 'To enter the palm swamp.'], fr: ['Pirogue avec un guide local', 'Pour entrer dans le marais.'] }
      ],
      experiencias: [
        { n: { es: 'Canoa por el bosque inundado', en: 'Flooded forest canoe trip', fr: 'Pirogue en forêt inondée' }, d: { es: 'Medio día', en: 'Half day', fr: 'Demi-journée' }, p: 30 }
      ],
      leyenda: 'yacumama'
    },
    {
      id: 'bufeo',
      nombre: 'Bufeo Colorado',
      ejemplo: true,
      lat: -3.36, lng: -72.55,
      seed: 2, escena: 'dolphin',
      rio: { es: 'Río Amazonas · aguas abajo', en: 'Amazon River · downstream', fr: 'Fleuve Amazone · en aval' },
      tiempo: { es: '≈ 3 h', en: '≈ 3 h', fr: '≈ 3 h' },
      especies: ['camu', 'aguaje'],
      lema: { es: 'Donde salen los delfines rosados', en: 'Where the pink dolphins surface', fr: 'Là où surgissent les dauphins roses' },
      como: {
        es: 'Comunidad frente a una cocha (laguna) donde se suele ver al bufeo colorado, el delfín rosado del Amazonas.',
        en: 'A community facing an oxbow lake where the pink river dolphin is often seen.',
        fr: 'Communauté face à un lac où l’on voit souvent le dauphin rose de l’Amazone.'
      },
      especial: {
        es: 'Los comuneros cuentan las leyendas del bufeo y cuidan la cocha para que los delfines sigan volviendo.',
        en: 'Locals tell the legends of the dolphin and protect the lake so the dolphins keep coming back.',
        fr: 'Les habitants racontent les légendes du dauphin et protègent le lac pour que les dauphins reviennent.'
      },
      porQue: {
        es: ['Avistamiento de bufeos desde la canoa', 'Leyendas contadas por los abuelos', 'Atardecer sobre el Amazonas'],
        en: ['Dolphin watching from the canoe', 'Legends told by the elders', 'Sunset over the Amazon'],
        fr: ['Observation des dauphins en pirogue', 'Légendes racontées par les anciens', 'Coucher de soleil sur l’Amazone']
      },
      historia: {
        es: 'Historia de ejemplo: el pueblo tomó el nombre del animal que siempre lo acompañó.',
        en: 'Sample story: the village took the name of the animal that always kept it company.',
        fr: 'Histoire d’exemple : le village a pris le nom de l’animal qui l’a toujours accompagné.'
      },
      llegar: [
        { es: ['Mototaxi al puerto de Iquitos', ''], en: ['Mototaxi to the Iquitos port', ''], fr: ['Mototaxi jusqu’au port d’Iquitos', ''] },
        { es: ['Bote rápido río abajo', '≈ 3 horas (ejemplo).'], en: ['Speedboat downriver', '≈ 3 hours (sample).'], fr: ['Bateau rapide en aval', '≈ 3 heures (exemple).'] }
      ],
      experiencias: [
        { n: { es: 'Avistamiento de bufeos', en: 'Pink dolphin watching', fr: 'Observation des dauphins roses' }, d: { es: 'Medio día', en: 'Half day', fr: 'Demi-journée' }, p: 28 }
      ],
      leyenda: 'bufeo'
    }
  ],

  /* -------------------------------------------------------------------
     LEYENDAS: 1 gratis por comunidad (texto + audio).
     Los textos son versiones de ejemplo; la versión final la cuenta
     un abuelo o abuela de la comunidad, con su nombre y su voz.
     ------------------------------------------------------------------- */
  leyendas: {
    chullachaqui: {
      titulo: { es: 'El Chullachaqui', en: 'The Chullachaqui', fr: 'Le Chullachaqui' },
      texto: {
        es: 'Dicen los abuelos que en lo profundo del monte vive el Chullachaqui, un espíritu que cuida el bosque. Puede tomar la forma de un amigo o de un familiar para que la gente se pierda entre los árboles. Lo reconoces por sus pies: uno es distinto al otro. Por eso, si alguien conocido te invita a ir más adentro del monte, mírale los pies.',
        en: 'The elders say that deep in the forest lives the Chullachaqui, a spirit that guards the woods. It can take the shape of a friend or relative to lead people astray among the trees. You can tell by its feet: one is different from the other. So if someone you know invites you deeper into the forest, look at their feet.',
        fr: 'Les anciens disent qu’au fond de la forêt vit le Chullachaqui, un esprit qui garde les bois. Il peut prendre l’apparence d’un ami ou d’un parent pour égarer les gens parmi les arbres. On le reconnaît à ses pieds : l’un est différent de l’autre. Alors, si quelqu’un que vous connaissez vous invite à vous enfoncer dans la forêt, regardez ses pieds.'
      }
    },
    lupuna: {
      titulo: { es: 'La madre de la lupuna', en: 'The mother of the lupuna', fr: 'La mère de la lupuna' },
      texto: {
        es: 'La lupuna es uno de los árboles más grandes del monte. Los mayores dicen que tiene su madre, un espíritu que la protege, y que antes de tocarla o de pasar a su lado hay que pedirle permiso. Quien la trata con respeto, sigue su camino tranquilo.',
        en: 'The lupuna is one of the biggest trees in the forest. The elders say it has its mother, a spirit that protects it, and that you must ask permission before touching it or walking past. Those who treat it with respect go on their way in peace.',
        fr: 'La lupuna est l’un des plus grands arbres de la forêt. Les anciens disent qu’elle a sa mère, un esprit qui la protège, et qu’il faut lui demander la permission avant de la toucher ou de passer à côté. Qui la respecte poursuit son chemin en paix.'
      }
    },
    yacumama: {
      titulo: { es: 'La Yacumama', en: 'The Yacumama', fr: 'La Yacumama' },
      texto: {
        es: 'La Yacumama es la madre de las aguas: una boa gigante que vive en las cochas y en el fondo de los ríos. Los antiguos cuentan que cuando se mueve cambia el curso del agua, y que hay que respetar las cochas, sin ensuciarlas ni hacer bulla, para no despertarla.',
        en: 'The Yacumama is the mother of the waters: a giant boa that lives in the lakes and at the bottom of the rivers. The old ones say that when she moves, the water changes course, and that you must respect the lakes, without dirtying them or making noise, so as not to wake her.',
        fr: 'La Yacumama est la mère des eaux : un boa géant qui vit dans les lacs et au fond des rivières. Les anciens racontent que lorsqu’elle bouge, l’eau change de cours, et qu’il faut respecter les lacs, sans les salir ni faire de bruit, pour ne pas la réveiller.'
      }
    },
    bufeo: {
      titulo: { es: 'El bufeo colorado', en: 'The pink dolphin', fr: 'Le dauphin rose' },
      texto: {
        es: 'En las noches de fiesta, dicen, el bufeo colorado sale del río convertido en un hombre elegante, con sombrero para esconder el agujero por donde respira. Baila toda la noche y, antes del amanecer, regresa al agua. Por eso, a los bufeos no se les hace daño.',
        en: 'On party nights, they say, the pink dolphin leaves the river as an elegant man, wearing a hat to hide the hole he breathes through. He dances all night and, before dawn, returns to the water. That is why no one harms the dolphins.',
        fr: 'Les soirs de fête, dit-on, le dauphin rose sort du fleuve sous la forme d’un homme élégant, coiffé d’un chapeau pour cacher le trou par lequel il respire. Il danse toute la nuit et, avant l’aube, retourne à l’eau. C’est pourquoi on ne fait jamais de mal aux dauphins.'
      }
    }
  },

  /* -------------------------------------------------------------------
     ÁRBOLES SEMBRADOS (ejemplo). Cada árbol tiene un código que va
     en su plaquita y en la tarjeta del turista, con un código QR.
     diasDesdeSiembra: solo para el ejemplo (calcula la fecha sola).
     ------------------------------------------------------------------- */
  arboles: {
    'ILLAY-0001': {
      ejemplo: true,
      nombre: 'Esperanza',
      especie: 'camu',
      comunidad: 'yanashi',
      padrino: 'Ana (ejemplo)',
      cuidador: 'Don Julio (ejemplo)',
      plan: 'anual',
      diasDesdeSiembra: 130
    }
  }
};
