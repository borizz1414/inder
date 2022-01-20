export const DynamicHeaderMenuConfig = {
  items: [
    {
      title: 'Inicio',
      root: true,
      alignment: 'left',
      page: '/inicio',
    },
    {
      title: 'Escenarios',
      root: true,
      alignment: 'left',
      page: '/escenarios',
    },
    {
      title: 'Diagnostico',
      root: true,
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      page: '/escenarios-planeacion/diagnostico',
      bullet: 'dot',
    },
    /*{
      title: 'Custom',
      root: true,
      alignment: 'left',
      toggle: 'click',
      page: '',
      submenu: [
        {
          title: 'eCommerce',
          bullet: 'dot',
          icon: 'flaticon-business',
          permission: 'accessToECommerceModule',
          page: '/ecommerce',
          submenu: [
            {
              title: 'Customers',
              page: '/ecommerce/customers'
            },
            {
              title: 'Products',
              page: '/ecommerce/products'
            },
          ]
        },
        {
          title: 'Error Pages',
          bullet: 'dot',
          icon: 'flaticon2-list-2',
          page: '/error',
          submenu: [
            {
              title: 'Error 1',
              page: '/error/error-1'
            },
          ]
        },
        {
          title: 'Wizards',
          bullet: 'dot',
          icon: 'flaticon2-mail-1',
          page: '/wizards',
          submenu: [
            {
              title: 'Wizard 1',
              page: '/wizards/wizard-1'
            },
            {
              title: 'Wizard 2',
              page: '/wizards/wizard-2'
            },
            {
              title: 'Wizard 3',
              page: '/wizards/wizard-3'
            },
            {
              title: 'Wizard 4',
              page: '/wizards/wizard-4'
            },
          ]
        }
      ]
    }*/
  ]
};
