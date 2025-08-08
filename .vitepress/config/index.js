import { defineConfig } from "vitepress";
import { enConfig } from './en.js'
import { ruConfig } from './ru.js'

export default defineConfig({
  title: 'Display ESP32-S3 Firmware',
  description: 'Documentation for Guition ESP32-S3-4848S040 ESPHome firmware',
  base: '/Guition-ESP32-S3-4848S040-DOCS/',
  ignoreDeadLinks: [
    '/ru/guide/configuration',
    '/ru/guide/widgets', 
    '/guide/configuration',
    '/guide/widgets',
    './LICENSE'
  ],

  lastUpdated: true,
  cleanUrls: true,

  // Добавляем Яндекс.Метрику
  head: [
    [
      'script',
      { type: 'text/javascript' },
      `
      (function(m,e,t,r,i,k,a){
          m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
      })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=103640859', 'ym');

      ym(103640859, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
      `
    ],
    [
      'noscript',
      {},
      '<div><img src="https://mc.yandex.ru/watch/103640859" style="position:absolute; left:-9999px;" alt="" /></div>'
    ]
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      ...enConfig
    },
    ru: {
      label: 'Русский',
      lang: 'ru',
      link: '/ru/',
      ...ruConfig
    }
  },

  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search'
              },
              modal: {
                displayDetails: 'Display detailed list',
                resetButtonTitle: 'Reset search',
                backButtonTitle: 'Close search',
                noResultsText: 'No results for',
                footer: {
                  selectText: 'to select',
                  selectKeyAriaLabel: 'enter',
                  navigateText: 'to navigate',
                  navigateUpKeyAriaLabel: 'up arrow',
                  navigateDownKeyAriaLabel: 'down arrow',
                  closeText: 'to close',
                  closeKeyAriaLabel: 'escape'
                }
              }
            }
          },
          // Russian
          ru: {
            translations: {
              button: {
                buttonText: 'Поиск',
                buttonAriaLabel: 'Поиск'
              },
              modal: {
                displayDetails: 'Показать подробный список',
                resetButtonTitle: 'Сбросить поиск',
                backButtonTitle: 'Закрыть поиск',
                noResultsText: 'Нет результатов для',
                footer: {
                  selectText: 'выбрать',
                  selectKeyAriaLabel: 'enter',
                  navigateText: 'навигация',
                  navigateUpKeyAriaLabel: 'стрелка вверх',
                  navigateDownKeyAriaLabel: 'стрелка вниз',
                  closeText: 'закрыть',
                  closeKeyAriaLabel: 'escape'
                }
              }
            }
          }
        }
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/alaltitov/Guition-ESP32-S3-4848S040' },
      { icon: 'youtube', link: 'https://youtube.com/@alaltitov' },
      { icon: 'discord', link: 'https://discord.com/channels/429907082951524364/1270223320989831178' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="80 80 240 240"><path d="M309.39 186.153L210.61 87.3725C204.78 81.5425 195.23 81.5425 189.4 87.3725L90.61 186.153C84.78 191.983 80 203.512 80 211.762V301.762C80 310.012 86.75 316.762 95 316.762H187.27L146.64 276.132C144.55 276.852 142.32 277.262 140 277.262C128.7 277.262 119.5 268.062 119.5 256.762C119.5 245.462 128.7 236.262 140 236.262C151.3 236.262 160.5 245.462 160.5 256.762C160.5 259.092 160.09 261.322 159.37 263.412L191 295.042V179.162C184.2 175.822 179.5 168.842 179.5 160.772C179.5 149.472 188.7 140.272 200 140.272C211.3 140.272 220.5 149.472 220.5 160.772C220.5 168.842 215.8 175.822 209 179.162V260.432L240.46 228.972C239.84 227.012 239.5 224.932 239.5 222.772C239.5 211.472 248.7 202.272 260 202.272C271.3 202.272 280.5 211.472 280.5 222.772C280.5 234.072 271.3 243.272 260 243.272C257.5 243.272 255.12 242.802 252.91 241.982L209 285.892V316.772H305C313.25 316.772 320 310.022 320 301.772V211.772C320 203.522 315.23 192.002 309.39 186.162V186.153Z" fill="currentColor"/></svg>'
        },
        link: 'https://community.home-assistant.io/t/guition-4-480x480-esp32-s3-4848s040-smart-display-with-lvgl/729271/',
        ariaLabel: 'Home Assistant Community'
      }
    ],
  }
})
