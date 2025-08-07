export const ruConfig = {

  themeConfig: {
    outline: {
      label: 'Содержание страницы'
    },
    docFooter: {
      prev: 'Предыдущая страница',
      next: 'Следующая страница'
    },
    nav: [
      { text: 'Руководство', link: '/ru/guide/' },
      { text: 'ЧаВо', link: '/ru/faq' },
      { text: 'Ссылки', link: '/ru/links' }
    ],
    sidebar: {
      '/ru/guide/': [
        {
          text: 'С чего начать?',
          items: [
            { text: 'Введение', link: '/ru/guide/' },
            { text: 'Установка', link: '/ru/guide/installation' }
          ]
        },
        {
          text: 'Конфигурация', 
          items: [
            { text: 'Общие', link: '/ru/guide/configuration' },
            { text: 'Шрифты', link: '/ru/guide/configuration/fonts' },
            { text: 'Цвета', link: '/ru/guide/configuration/colors' },
            { text: 'Картинки', link: '/ru/guide/configuration/images' }
          ]
        },
        {
          text: 'Виджеты',
          items: [
            { text: 'Страница загрузки', link: '/ru/guide/widgets/loading' },
            { text: 'Кнопки меню', link: '/ru/guide/widgets/menu' },
            { 
              text: 'Домашняя страница',
              link: '/ru/guide/widgets/home',
              items: [
                { text: 'Главная страница', link: '/ru/guide/widgets/home/main' },
                { text: 'Информация об устройстве', link: '/ru/guide/widgets/home/info' }
              ]
            },
            { text: 'Настройки', link: '/ru/guide/widgets/settings' },
            { text: 'Управление светом',
              link: '/ru/guide/widgets/light',
              items: [
                { text: 'Управление RGB светом', link: '/ru/guide/widgets/light/rgb' },
                { text: 'Управление температурой света', link: '/ru/guide/widgets/light/temperature' },
                { text: 'Управление яркостью света', link: '/ru/guide/widgets/light/brightness' },
                { text: 'Управление светом вкл/выкл', link: '/ru/guide/widgets/light/onoff' }
              ]
            },
            {
              text: 'Устройства',
              link: '/ru/guide/widgets/devices',
              items: [
                { text: 'Панель сигнализации', link: '/ru/guide/widgets/devices/alarm' },
                { text: 'Кондиционер', link: '/ru/guide/widgets/devices/ac' },
                { text: 'Термостат', link: '/ru/guide/widgets/devices/thermostat' },
                { text: 'Робот-пылесос', link: '/ru/guide/widgets/devices/vacuum' },
                { text: 'Музыкальный проигрыватель', link: '/ru/guide/widgets/devices/media' },
                { text: 'Рольставни', link: '/ru/guide/widgets/devices/shutter' }
              ]
            }
          ]
        }
      ],
      '/ru/faq/': [
        { text: 'Добавление языка перевода', link: '/ru/faq/language' },
        { text: 'Добавление своего виджета', link: '/ru/faq/custom' }
      ]
    },
    editLink: {
      pattern: 'https://github.com/alaltitov/Guition-ESP32-S3-4848S040-DOCS/edit/main/:path',
      text: 'Редактировать эту страницу'
    },
  }
}
