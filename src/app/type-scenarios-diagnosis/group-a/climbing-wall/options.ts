export const muro_escalar = {
  area_juego: {
    superficie_deportiva: {
      obs1: [
        "Concreto",
        "Asfalto",
        "Sintética",
        "Pintura plástica",
        "Madera",
        "Adoquines",
      ],
      obsCheck1: [
        [
          {
            label: "Grietas",
            formName: "grietas",
          },
          {
            label: "Desgaste de la superficie",
            formName: "desgaste_superficie",
          },
          {
            label: "Asentamientos",
            formName: "asentamientos",
          },
          {
            label: "Huecos",
            formName: "huecos",
          },
          {
            label: "Escalas entre juntas",
            formName: "escalas_entre_juntas",
          },
          {
            label: "Separación en las juntas",
            formName: "separacion_en_juntas",
          },
          {
            label: "Fisuras",
            formName: "Fisuras",
          },
          {
            label: "Desprendimiento reboque",
            formName: "desprendimiento_reboque",
          },
          {
            label: "Desborde",
            formName: "desborde",
          },
          {
            label: "Presencia de vegetación",
            formName: "presencia_vegetacion",
          },
          {
            label: "Perfiles desprendidos",
            formName: "perfiles_desprendidos",
          },
        ],
        [
          {
            label: "Grietas",
            formName: "grietas",
          },
          {
            label: "Asentamientos",
            formName: "asentamientos",
          },
          {
            label: "Huecos",
            formName: "huecos",
          },
          {
            label: "Piel de cocodrilo",
            formName: "piel_cocodrilo",
          },
          {
            label: "Desgaste, se observa material granular",
            formName: "desgaste_material_granular",
          },
          {
            label: "Fisuras",
            formName: "fisuras",
          },
          {
            label: "Presencia de vegetación",
            formName: "presencia_vegetacion",
          },
        ],
        [
          {
            label: "Asentamientos",
            formName: "asentamientos",
          },
          {
            label: "Huecos",
            formName: "huecos",
          },
          {
            label: "Desprendimiento de material",
            formName: "desprendimiento_material",
          },
          {
            label: "Rotura del material",
            formName: "rotura_material",
          },
          {
            label: "Desgaste",
            formName: "desgaste",
          },
          {
            label: "Fisuras",
            formName: "fisuras",
          },
          {
            label: "Presencia de vegetación",
            formName: "presencia_vegetacion",
          },
        ],

        [
          {
            label: "Asentamientos",
            formName: "asentamientos",
          },
          {
            label: "Huecos",
            formName: "huecos",
          },
          {
            label: "Desprendimiento de material",
            formName: "desprendimiento_material",
          },
          {
            label: "Empozamiento",
            formName: "empozamiento",
          },
          {
            label: "Desgaste",
            formName: "desgaste",
          },
          {
            label: "Fisuras",
            formName: "fisuras",
          },
        ],
        [
          {
            label: "Roturas",
            formName: "roturas",
          },
          {
            label: "Huecos",
            formName: "huecos",
          },
          {
            label: "Desprendimiento de material",
            formName: "desprendimiento_material",
          },
          {
            label: "Escalas entre piezas",
            formName: "escalas_entre_piezas",
          },
          {
            label: "Separacion entre las piezas",
            formName: "separacion_entre_piezas",
          },
        ],
        [
          {
            label: "Roturas",
            formName: "roturas",
          },
          {
            label: "Invasión de maleza",
            formName: "invasion_maleza",
          },
          {
            label: "Faltan piezas",
            formName: "faltan_piezas",
          },
          {
            label: "Escalas entre piezas",
            formName: "escalas_entre_piezas",
          },
          {
            label: "Separacion entre las piezas",
            formName: "separacion_entre_piezas",
          },
          {
            label: "Desplazamiento",
            formName: "desplazamiento",
          },
          {
            label: "Depresiones",
            formName: "depresiones",
          },
        ],
      ],
    },
  },
  areas_complementarias: {
    otros: {
      obs1: [
        "Cubierta",
        "Pared",
        "Piso",
        "Puerta",
        "Ventana",
        "Cerradura",
        "Reja",
        "Instalaciones Electricas",
        "Instalaciones Hidrosanitarias",
      ],
      mat1: [
        ["Concreto", "Madera y teja", "Estructura metálica y tejas"],
        [],
        ["Baldosa", "Concreto", "Cerámica"],
        ["Madera", "Aluminio", "Lámina de acero"],
        [
          "Malla y tubería",
          "Aluminio y vidrio",
          "Madera y vidrio",
          "Lámina de acero y vidrio",
        ],
        [],
        ["Hierro", "Aluminio", "Tubería"],
        [
          "Toma corriente",
          "Toma comunicación",
          "Switche",
          "Breakers",
          "Lámpara/Luminaria",
          "Plafón/Base",
        ],
        [
          "Batería Sanitaria",
          "Lavamanos sencillo",
          "Ducha",
          "Orinal",
          "Lavaescobas",
          "Lavaplatos",
        ],
      ],
      mat2: [
        "Pozuelo en cerámica",
        "Pozuelo en acero inoxidable",
        "Pozuelo en arenón",
      ],
      checks: {
        cubierta: {
          concreto: [
            {
              label: "Grietas",
              formName: "grietas",
            },
            {
              label: "Humedad",
              formName: "humedad",
            },
            {
              label: "Falta mantenimiento",
              formName: "",
            },
          ],
          madera_teja: [
            {
              label: "Humedad",
              formName: "grietas",
            },
            {
              label: "Tejas quebradas",
              formName: "humedad",
            },
            {
              label: "Faltan tejas",
              formName: "",
            },
            {
              label: "Tablillas quebrada /Deteriorada",
              formName: "",
            },
            {
              label: "Falta mantenimiento",
              formName: "",
            },
          ],
          estructura_metalica_teja: [
            {
              label: "Oxidación",
              formName: "grietas",
            },
            {
              label: "Humedad",
              formName: "humedad",
            },
            {
              label: "Grietas",
              formName: "",
            },
            {
              label: "Reboque/ estuco  desprendido ",
              formName: "",
            },
            {
              label: "Falta mantenimiento",
              formName: "",
            },
            {
              label: "Falta mantenimiento / pintura",
              formName: "",
            },
          ],
        },
        pared: [
          {
            label: "Grietas",
            formName: "grietas",
          },
          {
            label: "Reboque/ estuco  desprendido ",
            formName: "grietas",
          },
          {
            label: "Humedad",
            formName: "grietas",
          },
          {
            label: "Falta mantenimiento/ Pintura",
            formName: "grietas",
          },
        ],
        piso: {
          baldosa: [
            {
              label: "Fisuras",
              formName: "fisuras",
            },
          ],
          concreto: [
            {
              label: "humedad",
              formName: "humedad",
            },
          ],
          ceramica: [
            {
              label: "Superficie deteriorada",
              formName: "humedad",
            },
            {
              label: "Huecos",
              formName: "humedad",
            },
            {
              label: "Faltan piezas",
              formName: "humedad",
            },
          ],
        },
        puerta: {
          madera: [
            {
              label: "Desprendida",
              formName: "humedad",
            },
          ],
          aluminio: [
            {
              label: "Con huecos",
              formName: "humedad",
            },
          ],
          lamina_acero: [
            {
              label: "Oxidada / Corroída",
              formName: "humedad",
            },
            {
              label: "Deteriorada",
              formName: "humedad",
            },
            {
              label: "Colgada",
              formName: "humedad",
            },
            {
              label: "Golpeada",
              formName: "humedad",
            },
          ],
        },
        ventana: {
          malla_tuberia: [
            {
              label: "Desprendida",
              formName: "grietas",
            },
          ],
          aluminio_vidrio: [
            {
              label: "Vidrio quebrado",
              formName: "grietas",
            },
          ],
          madera_vidrio: [
            {
              label: "Oxidada / Corroída",
              formName: "grietas",
            },
          ],
          lamina_acero_vidrio: [
            {
              label: "Deteriorada",
              formName: "grietas",
            },
            {
              label: "Falta vidrio",
              formName: "grietas",
            },
          ],
        },
        cerradura: [
          {
            label: "Oxidada / Corroída",
            formName: "grietas",
          },
          {
            label: "Suelta",
            formName: "grietas",
          },
          {
            label: "Mala",
            formName: "grietas",
          },
          {
            label: "Falta",
            formName: "grietas",
          },
        ],
        reja: {
          hierro: [
            {
              label: "Reventada",
              formName: "grietas",
            },
          ],
          aluminio: [
            {
              label: "Oxidada / Corroída",
              formName: "grietas",
            },
          ],
          tuberia: [
            {
              label: "Desprendida",
              formName: "grietas",
            },
            {
              label: "Doblada",
              formName: "grietas",
            },
          ],
        },
        instalaciones_electricas: {
          toma_corriente: [
            {
              label: "Quemada",
              formName: "grietas",
            },
          ],
          toma_comunicacion: [
            {
              label: "Tapa quebrada",
              formName: "grietas",
            },
          ],
          switche: [
            {
              label: "Falta tapa",
              formName: "grietas",
            },
          ],
          breakers: [
            {
              label: "Falta luminaria",
              formName: "grietas",
            },
          ],
          lampara_luminaria: [
            {
              label: "Desprendida",
              formName: "grietas",
            },
          ],
          plafon_base: [],
        },
        instalaciones_hidrosanitarias: {
          bateria_sanitaria: [
            {
              label: "Tanque sin tapa",
              formName: "grietas",
            },
          ],
          lavamanos_sencillo: [
            {
              label: "Quebrado",
              formName: "grietas",
            },
          ],
          ducha: [
            {
              label: "Con fuga",
              formName: "grietas",
            },
          ],
          orinal: [
            {
              label: "Falta abasto",
              formName: "grietas",
            },
          ],
          lavaescobas: [
            {
              label: "No funciona",
              formName: "grietas",
            },
          ],
          lavaplatos: {
            pozuelo_ceramica: [
              {
                label: "Porcelana  sanitaria deteriorada",
                formName: "grietas",
              },
            ],
            pozuelo_acero_inoxidable: [
              {
                label: "Abasto malo",
                formName: "grietas",
              },
            ],
            pozuelo_arenon: [
              {
                label: "Falta sanitario",
                formName: "grietas",
              },
              {
                label: "Falta lavamanos",
                formName: "grietas",
              },
              {
                label: "Agrietado",
                formName: "grietas",
              },
              {
                label: "Enchape deteriorado",
                formName: "grietas",
              },
              {
                label: "Oxidación",
                formName: "grietas",
              },
              {
                label: "Desbordado",
                formName: "grietas",
              },
            ],
          },
        },
      },
    },
  },
  sistemas_electricos: [
    {
      label: "Quemada",
      formName: "quemada",
    },
    {
      label: "Poste volcado",
      formName: "poste_volcado",
    },
    {
      label: "Quebrada",
      formName: "quebrada",
    },
    {
      label: "Falta",
      formName: "falta",
    },
    {
      label: "Desprendida",
      formName: "desprendida",
    },
    {
      label: "Tapada por vegetación",
      formName: "tapada_vegetacion",
    },
    {
      label: "Cables desprendidos",
      formName: "cables_desprendidos",
    },
  ],
  cerramientos: {
    muros_contencion: {
      material: ["Concreto", "Gaviones", "Combinado"],
      checks: [
        [
          {
            label: "Grietas",
            formName: "grietas",
          },
        ],
        [
          {
            label: "Volcado",
            formName: "volcado",
          },
        ],
        [
          {
            label: "Huecos",
            formName: "huecos",
          },
          {
            label: "Reventado",
            formName: "reventado",
          },
          {
            label: "Invadido de maleza",
            formName: "invadido_maleza",
          },
          {
            label: "Despintado / Sucio",
            formName: "despintado_sucio",
          },
          {
            label: "Malla corroída",
            formName: "malla_corroida",
          },
        ],
      ],
    },
    malla_eslabonada: {
      material: [
        "Malla eslabonada",
        "Malla de nylon",
        "Lámina metálica",
        "Madera",
        "Malla y nylon",
      ],
      checks: [
        [
          {
            label: "Oxidada",
            formName: "oxidada",
          },
        ],
        [
          {
            label: "Corroída",
            formName: "corroida",
          },
        ],
        [
          {
            label: "Huecos",
            formName: "huecos",
          },
        ],
        [
          {
            label: "Desprendida",
            formName: "desprendida",
          },
        ],
        [
          {
            label: "Volcada",
            formName: "volcada",
          },
          {
            label: "Despintado / Sucio",
            formName: "despintado_sucio",
          },
          {
            label: "Pisa malla derruído",
            formName: "pisa_malla_derruido",
          },
          {
            label: "Destemplada",
            formName: "destemplada",
          },
          {
            label: "Quebrado",
            formName: "quebrado",
          },
          {
            label: "Faltan piezas (travesaños , postes)",
            formName: "faltan_piezas",
          },
          {
            label: "Reventada",
            formName: "reventada",
          },
        ],
      ],
    },
    estructura_tuberia_pesada: {
      checks: [
        {
          label: "Oxidada",
          formName: "oxidada",
        },
        {
          label: "Corroída",
          formName: "corroida",
        },
        {
          label: "Despintada",
          formName: "despintada",
        },
        {
          label: "Reventado",
          formName: "reventado",
        },
        {
          label: "Volcada",
          formName: "volcada",
        },
        {
          label: "Faltan piezas",
          formName: "faltan_piezas",
        },
      ],
    },
  },
  elementos_drenaje: {
    cuneta_checks: [
      {
        label: "Superficie desgastada",
        formName: "superficie_desgastada",
      },
      {
        label: "Faltan tramos",
        formName: "faltan_tramos",
      },
      {
        label: "Quebrada",
        formName: "quebrada",
      },
      {
        label: "Escala entre juntas",
        formName: "escala_entre_juntas",
      },
      {
        label: "Obstruída",
        formName: "obstruida",
      },
      {
        label: "Separada de la superficie",
        formName: "separada_superficie",
      },
      {
        label: "Por encima del nivel de la superficie",
        formName: "por_encima_superficie",
      },
      {
        label: "Espacio entre tramos",
        formName: "espacio_entre_tramos",
      },
    ],
    sumidero_checks: [
      {
        label: "Falta reja",
        formName: "falta_reja",
      },
      {
        label: "Reja reventada",
        formName: "reja_reventada",
      },
      {
        label: "Oxidación / corrosión",
        formName: "oxidacion_corrosion",
      },
      {
        label: "Reja desprendida",
        formName: "reja_desprendida",
      },
      {
        label: "Obstruída",
        formName: "obstruida",
      },
      {
        label: "Caja quebrada",
        formName: "caja_quebrada",
      },
    ],
    inspeccion_hidraulica: [
      {
        label: "Falta tapa",
        formName: "falta_tapa",
      },
      {
        label: "Tapa quebrada",
        formName: "tapa_quebrada",
      },
      {
        label: "No se aprecia",
        formName: "no_se_aprecia",
      },
      {
        label: "Tapa desencajada",
        formName: "tapa_desencajada",
      },
      {
        label: "Obstruída",
        formName: "obstruida",
      },
      {
        label: "Caja quebrada",
        formName: "caja_quebrada",
      },
    ],
    carcamo_checks: [
      {
        label: "Piezas desencajadas",
        formName: "piezas_desencajadas",
      },
      {
        label: "Faltan piezas",
        formName: "faltan_piezas",
      },
      {
        label: "Piezas desencajadas",
        formName: "piezas_desencajadas",
      },
      {
        label: "Piezas quebradas",
        formName: "piezas_quebradas",
      },
      {
        label: "Muy separadas las piezas",
        formName: "separas_piezas",
      },
      {
        label: "Obstruída",
        formName: "obstruida",
      },
      {
        label: "Separada de la superficie",
        formName: "separada_superficie",
      },
      {
        label: "Por encima del nivel de la superficie",
        formName: "por_encima_superficie",
      },
      {
        label: "Escala entre juntas",
        formName: "escala_entre_juntas",
      },
    ],
  },
  mobiliario_deportivo: {
    muro: {
      material: ["Madera", "Concreto"],
      checks: [
        [
          {
            label: "Volcado",
            formName: "volcado",
          },
        ],
        [
          {
            label: "Huecos",
            formName: "huecos",
          },
          {
            label: "Fisuras",
            formName: "fisuras",
          },
          {
            label: "Grietas",
            formName: "grietas",
          },
          {
            label: "Superficie deteriorada",
            formName: "superficie_deteriorada",
          },
        ],
      ],
    },
    agarres: {
      checks: [
        {
          label: "Agarres reventados",
          formName: "cables_desprendidos",
        },
        {
          label: "Faltan agarres",
          formName: "faltan_agarres",
        },
        {
          label: "Agarres desprendidos",
          formName: "agarres_desprendidos",
        },
      ],
    },
    anclajes_seguridad: {
      checks: [
        {
          label: "Anclajes reventados",
          formName: "cables_desprendidos",
        },
        {
          label: "Faltan anclajes",
          formName: "faltan_anclajes",
        },
        {
          label: "Anclajes desprendidos",
          formName: "anclajes_desprendidos",
        },
      ],
    },
    colchoneta:{
      checks:[
{
  label: "Rota",
  formName: "rota",
},
{
  label: "Deteriorada",
  formName: "deteriorada",
},
{
  label: "No hay colchoneta",
  formName: "no_hay_colchoneta",
},
      ]
    }
  },
  cerrajeria:{
    pasamanos:{
      material:['Tubería de acero',
        'Aluminio',
        'Madera',
        'Acero inoxidable',
        'Lámina de acero',
        'Tubería y malla'],
        checks:[
          [
          {
            label: "Desprendido en algunos puntos de la superficie",
            formName: "desprendido_puntos_superficie",
          },
        ],
          [
          {
            label: "Reventado en algunos puntos",
            formName: "Reventado_puntos_algunos",
          },
        ],
          [
          {
            label: "Oxidada / Corroída",
            formName: "oxidada_corroida",
          },
        ],
          [
          {
            label: "Quebrado",
            formName: "quebrado",
          },
        ],
          [
          {
            label: "Faltan partes (travesaños o postes)",
            formName: "faltan_partes",
          },
        ],
          [
          {
            label: "Doblado en algunos puntos",
            formName: "doblado_algunos_puntos",
          },
          {
            label: "Faltan tramos",
            formName: "faltan_tramos",
          },
          {
            label: "Falta mantenimiento  / Pintura",
            formName: "falta_mantenimiento",
          },
       
        ],
        ]
    }
  },
  manual_mantenimiento:{
    checks:[
      {
        label: "No está disponible",
        formName: "no_disponible",
      },
      {
        
        label: "Incompleto",
        formName: "incompleto",
      },
  ]
  }
};
