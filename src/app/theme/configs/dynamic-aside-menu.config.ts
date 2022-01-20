export const DynamicAsideMenuConfig = {
  items: [
    {
      title: 'Inicio',
      root: true,
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      page: '/inicio',
      bullet: 'dot',
    },
    //{ section: 'Applications' },
    {
      title: 'Escenarios',
      bullet: 'dot',
      icon: 'flaticon2-list-2',
      svg: './assets/media/svg/icons/Shopping/Cart3.svg',
      root: true,
      permission: 'accessToECommerceModule',
      page: '/escenarios',
      submenu: [
        {
          title: 'Listado de Escenarios',
          page: '/escenarios/listado-escenarios'
        },
        {
          title: 'Bienes Inmuebles',
          page: '/escenarios/bienes-inmuebles'
        },
      ]
    },
    {
      title: 'Diagnostico',
      root: true,
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      page: '/escenarios-planeacion/diagnostico',
      bullet: 'dot',
    },
  ]
};
