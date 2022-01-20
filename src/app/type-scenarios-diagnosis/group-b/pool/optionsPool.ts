const huecos = {
  label: "Huecos",
  formName: "huecos",
};
const asentamientos = {
  label: "Asentamientos",
  formName: "asentamientos",
};
const desgaste_superficie = {
  label: "Desgaste  de la superficie",
  formName: "desgaste_superficie",
};
const desprendimiento_material = {
  label: "Desprendimiento de material",
  formName: "desprendimiento_material",
};
const rotura_material = {
  label: "Rotura del material",
  formName: "rotura_material",
};
const fisuras = {
  label: "Fisuras",
  formName: "fisuras",
};
const grietas = {
  label: "Grietas",
  formName: "grietas",
};
// ARRAYS DE OPCIONES Y SELECCIONABLES DIANOSTICOS
// OBS = OBSERVACIONES
export const piscina = {
  // PISCINA -> RIESGO ESTRUCTURAL
  //OBS
  riesgo_estructural_obs: [
    {
      label: "Asentamientos",
      formName: "asentamientos",
    },
    {
      label: "Desplazamiento de talud",
      formName: "desplazamiento_de_talud",
    },
    {
      label: "Muros volcados",
      formName: "muros_volcados",
    },
    {
      label: "Separaciones estructurales en juntas de placas",
      formName: "separacion_estructurales_juntas_placas",
    },
    {
      label: "Grietas pronunciadas en muros de contención",
      formName: "grietas_pronunciadas_muros_contencion",
    },
    {
      label: "Grietas pronunciadas en Areas complementarias",
      formName: "grietas_pronunciadas_areas_complementarias",
    },
    {
      label: "Falla estructural en superficie de juego",
      formName: "falla_estructura_superficie_juego",
    },
    {
      label: "Socavaciones",
      formName: "socavaciones",
    },
  ],
  // PISCINA -> Área de juego
  area_juego: {
    vaso: {
      observaciones: [
        {
          label: "Asentamientos",
          formName: "asentamientos",
        },
        {
          label: "Desgaste de la superficie",
          formName: "desgaste_superficie",
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
          label: "Huecos",
          formName: "huecos",
        },
        {
          label: "Nombre en sintético despegado",
          formName: "nombre_sintetico_despegado",
        },
        {
          label: "Filtraciones",
          formName: "filtraciones",
        },
      ],
    },
    playa: {
      // AUTOCOMPLETE N° 1 -> Pool Service
      observaciones: [
        "Concreto", // Pool Service -> autoComplete1() -> index 0
        "Baldosa",
        "Sintético aspero",
        "Sintético liso",
        "Arenón chino",
        "Caucho",
        "Cerámica",
        "Combinado",
      ],
      observaciones2: [
        [
          {
            label: grietas.label,
            formName: grietas.formName,
          },
          // {
          //   label: desgaste_superficie.label,
          //   formName: desgaste_superficie.formName,
          // },
          // {
          //   label: asentamientos.label,
          //   formName: asentamientos.formName,
          // },
          // {
          //   label: huecos.label,
          //   formName: huecos.formName,
          // },
          // {
          //   label: "Escalas entre juntas",
          //   formName: "escalas_entre_juntas",
          // },
          // {
          //   label: "Separación en las juntas",
          //   formName: "separacion_juntas",
          // },
          // {
          //   label: fisuras.label,
          //   formName: fisuras.formName,
          // },
        ],
        [
          {
            label: grietas.label,
            formName: grietas.formName,
          },
          {
            label: desgaste_superficie.label,
            formName: desgaste_superficie.formName,
          },
          {
            label: asentamientos.label,
            formName: asentamientos.formName,
          },
          {
            label: huecos.label,
            formName: huecos.formName,
          },
          {
            label: "Escalas entre juntas",
            formName: "escalas_entre_juntas",
          },
          {
            label: "Separación en las juntas",
            formName: "separacion_juntas",
          },
          {
            label: fisuras.label,
            formName: fisuras.formName,
          },
        ],
        [
          {
            label: desprendimiento_material.label,
            formName: desprendimiento_material.formName,
          },
          {
            label: asentamientos.label,
            formName: asentamientos.formName,
          },
          {
            label: huecos.label,
            formName: huecos.formName,
          },
          {
            label: desgaste_superficie.label,
            formName: desgaste_superficie.formName,
          },
          {
            label: grietas.label,
            formName: grietas.formName,
          },
          {
            label: "Desprendido",
            formName: "desprendido",
          },
        ],
        [
          {
            label: asentamientos.label,
            formName: asentamientos.formName,
          },
          {
            label: huecos.label,
            formName: huecos.formName,
          },
          {
            label: desprendimiento_material.label,
            formName: desprendimiento_material.formName,
          },
          {
            label: rotura_material.label,
            formName: rotura_material.formName,
          },
          {
            label: desgaste_superficie.label,
            formName: desgaste_superficie.formName,
          },
          {
            label: fisuras.label,
            formName: fisuras.formName,
          },
        ],
        [
          {
            label: "Empozamiento / Charcos",
            formName: "empozamiento_charcos",
          },
          {
            label: asentamientos.label,
            formName: asentamientos.formName,
          },
          {
            label: "Faltan tramos o áreas",
            formName: "faltan_tramos_areas",
          },
          {
            label: huecos.label,
            formName: huecos.formName,
          },
          {
            label: desgaste_superficie.label,
            formName: desgaste_superficie.formName,
          },
          {
            label: grietas.label,
            formName: grietas.formName,
          },
        ],
        [
          {
            label: asentamientos.label,
            formName: asentamientos.formName,
          },
          {
            label: huecos.label,
            formName: huecos.formName,
          },
          {
            label: desgaste_superficie.label,
            formName: desgaste_superficie.formName,
          },
          {
            label: "Faltan tramos o áreas",
            formName: "faltan_tramos_areas",
          },
          {
            label: grietas.label,
            formName: grietas.formName,
          },
        ],
        [
          {
            label: asentamientos.label,
            formName: asentamientos.formName,
          },
          {
            label: huecos.label,
            formName: huecos.formName,
          },
          {
            label: desgaste_superficie.label,
            formName: desgaste_superficie.formName,
          },
          {
            label: desprendimiento_material.label,
            formName: desprendimiento_material.formName,
          },
          {
            label: rotura_material.label,
            formName: rotura_material.formName,
          },
        ],
        [
            {
              label: huecos.label,
              formName: huecos.formName,
            },
          {
            label: asentamientos.label,
            formName: asentamientos.formName,
          },
          {
            label: 'Quebarada',
            formName: 'quebrada',
          },
          {
            label: 'Faltan piezas',
            formName: 'faltan_piezas',
          },
          {
            label: desgaste_superficie.label,
            formName: desgaste_superficie.formName,
          },
        ],
        [
            {
              label: 'Roturas',
              formName: 'roturas',
            },
          {
            label: desprendimiento_material.label,
            formName: desprendimiento_material.formName,
          },
          {
            label: huecos.label,
            formName: huecos.formName,
          },
          {
            label: 'Separacion entre las piezas',
            formName: 'deparacion_piezas',
          },
          {
            label: 'Escalas entre juntas o piezas',
            formName: 'escalas_juntas_piezas',
          },
        ],
      ],
    },
  },
};
