export const enConfig = {
  themeConfig: {
    outline: {
      label: 'On this page'
    },
    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    },
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'FAQ', link: '/faq' },
      { text: 'Links', link: '/links' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Installation', link: '/guide/installation' }
          ]
        },
        {
          text: 'Configuration', 
          items: [
            { text: 'General', link: '/guide/configuration' },
            { text: 'Fonts', link: '/guide/configuration/fonts' },
            { text: 'Colors', link: '/guide/configuration/colors' },
            { text: 'Images', link: '/guide/configuration/images' }
          ]
        },
        {
          text: 'Widgets',
          items: [
            { text: 'Loading Page', link: '/guide/widgets/loading' },
            { text: 'Menu Buttons', link: '/guide/widgets/menu' },
            { 
              text: 'Home Page',
              link: '/guide/widgets/home',
              items: [
                { text: 'Main Page', link: '/guide/widgets/home/main' },
                { text: 'Device Information', link: '/guide/widgets/home/info' }
              ]
            },
            { text: 'Settings', link: '/guide/widgets/settings' },
            { text: 'Light Control',
              link: '/guide/widgets/light',
              items: [
                { text: 'RGB Light Control', link: '/guide/widgets/light/rgb' },
                { text: 'Light Temperature Control', link: '/guide/widgets/light/temperature' },
                { text: 'Light Brightness Control', link: '/guide/widgets/light/brightness' },
                { text: 'Light On/Off Control', link: '/guide/widgets/light/onoff' }
              ]
            },
            {
              text: 'Devices',
              link: '/guide/widgets/devices',
              items: [
                { text: 'Alarm Panel', link: '/guide/widgets/devices/alarm' },
                { text: 'Air Conditioner', link: '/guide/widgets/devices/ac' },
                { text: 'Thermostat', link: '/guide/widgets/devices/thermostat' },
                { text: 'Robot Vacuum', link: '/guide/widgets/devices/vacuum' },
                { text: 'Media Player', link: '/guide/widgets/devices/media' },
                { text: 'Shutters', link: '/guide/widgets/devices/shutter' }
              ]
            }
          ]
        }
      ],
      '/faq/': [
        { text: 'Adding Language Translation', link: '/faq/language' },
        { text: 'Adding Custom Widget', link: '/faq/custom' }
      ]
    },
    editLink: {
      pattern: 'https://github.com/alaltitov/Guition-ESP32-S3-4848S040-DOCS/edit/main/:path',
      text: 'Edit this page'
    },
  }
}