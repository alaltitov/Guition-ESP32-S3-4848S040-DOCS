---
prev:
  text: 'Установка'
  link: '/ru/guide/installation'
next:
  text: 'Шрифты'
  link: '/ru/guide/configuration/fonts'
---

# Основная конфигурация

Основной конфигурационный файл `main.yaml` содержит все необходимые настройки для работы устройства. Рассмотрим каждый блок подробно:

## Подключение модулей (Packages)

```yaml
packages:
  home: !include widgets/home/home.yaml
  lights_config: !include widgets/light/lights_config.yaml
  devices: !include widgets/devices.yaml
  settings: !include widgets/settings.yaml
  menu_controls_main: !include widgets/menu_controls_main.yaml
  loading_page: !include widgets/loading_page.yaml
```

**Назначение**: Модульная система организации кода. Каждый файл содержит конфигурацию определенной функциональности.

- `home.yaml` — главный экран с основной информацией
- `lights_config.yaml` — управление освещением
- `devices.yaml` — управление остальными устройствами
- `settings.yaml` — настройки устройства
- `menu_controls_main.yaml` — элементы управления
- `loading_page.yaml` — экран загрузки при старте

## Ресурсы интерфейса

```yaml
image: !include widgets/image.yaml
font: !include widgets/fonts.yaml
color: !include widgets/colors.yaml
```

**Назначение**: Централизованное управление визуальными ресурсами.

- `image.yaml` — определения всех изображений
- `fonts.yaml` — настройки шрифтов
- `colors.yaml` — цветовая палитра интерфейса

## HTTP запросы

```yaml
http_request:
  verify_ssl: false
```

**Назначение**: Настройка HTTP клиента для запросов к внешним API. Нужен для работы `media_player`

## Внешние компоненты

```yaml
external_components:
  - source: github://pr#9972
    components: [mapping]
    refresh: 1h
```

**Назначение**: Подключение экспериментального компонента ESPHome.
- Загружается компонент `mapping` из GitHub PR #9972
- Обновление каждый час для получения последних изменений

::: danger ВНИМАНИЕ
Данный компонент будет удален в релизной версии или раньше, как только будет осуществлено слияние с основной веткой. Данный компонент оптимизирует работу компонента `mapping` с PSRAM
:::

## Основные настройки ESPHome

```yaml
esphome:
  name: display
  friendly_name: display
  includes:
    - <sstream>
    - <algorithm>
  platformio_options:
    board_build.flash_mode: dio
```

**Параметры**:
- `name` — внутреннее имя устройства
- `friendly_name` — отображаемое имя в Home Assistant
- `includes` — подключение C++ библиотек для расширенной функциональности
- `flash_mode: dio` — режим работы с флеш-памятью для стабильности

## Конфигурация ESP32-S3

```yaml
esp32:
  board: esp32-s3-devkitc-1
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    sdkconfig_options:
      CONFIG_ESP32S3_DEFAULT_CPU_FREQ_240: "y"
      CONFIG_SPIRAM_TRY_ALLOCATE_WIFI_LWIP: y
```

**Ключевые настройки**:
- `board` — тип платы ESP32-S3
- `flash_size: 16MB` — размер флеш-памяти
- `framework: esp-idf` — использование ESP-IDF
- `CPU_FREQ_240` — максимальная частота процессора 240 МГц
- `SPIRAM_TRY_ALLOCATE_WIFI_LWIP` — использование PSRAM для Wi-Fi стека

::: warning ВАЖНО
Настройки в `sdkconfig_options` напрямую могут влиять на запуск прошивки.
:::
::: details ОПЦИИ
Это блок-спойлер.
:::

## PSRAM конфигурация

```yaml
psram:
  mode: octal
  speed: 80MHz
```

**Назначение**: Настройка внешней оперативной памяти.
- `octal` — 8-битный режим для максимальной скорости
- `80MHz` — частота работы PSRAM

## Логирование

```yaml
logger:
  level: debug
```

**Назначение**: Уровень детализации логов для отладки. [Подробнее](https://esphome.io/components/logger.html)

::: tip СОВЕТ
После отладки cтарайтесь использовать уровни `info` или `error`, так как это напрямую влияет на скорость работы устройства.
:::

## API и OTA

```yaml
api:
  encryption:
    key: !secret display_key

ota:
  - platform: esphome
    password: !secret display_ota
```

**Безопасность**:
- `api.encryption.key` — ключ шифрования для связи с Home Assistant
- `ota.password` — пароль для обновлений по воздуху

## Wi-Fi подключение

```yaml
wifi:
  networks:
    - ssid: !secret wifi_ssid
      password: !secret wifi_password
```

**Настройка сети**: Данные берутся из файла `secrets.yaml` для безопасности.

## LVGL интерфейс

```yaml
lvgl:
  color_depth: 16
  byte_order: big_endian
  displays: my_display
  touchscreens:
    - touchscreen_id: my_touchscreen
      long_press_time: 5000ms
      long_press_repeat_time: 400ms
  page_wrap: false
```

**Параметры графики**:
- `color_depth: 16` — 16-битная глубина цвета (65536 цветов)
- `big_endian` — порядок байтов для совместимости с дисплеем
- `long_press_time` — время удержания для долгого нажатия на кнопку
- `page_wrap: false` — отключение циклического переключения страниц

## Подсветка дисплея

```yaml
light:
  - platform: monochromatic
    output: backlight_output
    name: Backlight
    id: display_backlight
    restore_mode: ALWAYS_ON
    on_turn_on:
      - if:
          condition: lvgl.is_paused
          then:
            - logger.log: "LVGL resuming by backlight on"
            - lvgl.resume:
            - lvgl.widget.redraw:
    on_turn_off:
      - if:
          condition:
            lambda: 'return id(display_timeout_number).state >= 0;'
          then:
            - logger.log: "Backlight off, pausing LVGL"
            - lvgl.pause:
```

**Умное управление**:
- Автоматическое возобновление интерфейса при включении подсветки
- Пауза LVGL при выключении для экономии ресурсов
- Восстановление состояния после перезагрузки

## PWM выход для подсветки

```yaml
output:
  - platform: ledc
    pin: GPIO38
    id: backlight_output
    frequency: 100Hz
```

**Технические параметры**:
- `GPIO38` — пин управления подсветкой
- `100Hz` — частота ШИМ для плавного управления яркостью

## I2C шина

```yaml
i2c:
  - id: bus_a
    sda: GPIO19
    scl:
      number: GPIO45
      ignore_strapping_warning: true
    frequency: 100kHz
```

**Назначение**: Инициализация шины I2C
- `ignore_strapping_warning` — игнорирование предупреждения о загрузочном пине

## Сенсорный контроллер

```yaml
touchscreen:
  platform: gt911
  id: my_touchscreen
  transform:
    mirror_x: false
    mirror_y: false
  display: my_display
  on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - logger.log: "LVGL resuming"
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight
```

**Функции**:
- Контроллер GT911
- Автоматическое пробуждение при касании

## SPI интерфейс

```yaml
spi:
  - id: lcd_spi
    clk_pin: GPIO48
    mosi_pin: GPIO47
```

**Назначение**: Инициализация шины SPI. Высокоскоростная передача данных на дисплей.

## Конфигурация дисплея

```yaml
display:
  - platform: st7701s
    id: my_display
    update_interval: never
    auto_clear_enabled: false
    data_rate: 2MHz
    spi_mode: MODE3
    color_order: RGB
    invert_colors: false
    dimensions:
      width: 480
      height: 480
```

**Основные параметры**:
- `st7701s` — драйвер для контроллера дисплея
- `update_interval: never` — обновление только по требованию LVGL
- `dimensions: 480x480` — разрешение дисплея
- `data_rate: 2MHz` — скорость передачи по SPI

## RGB интерфейс дисплея

```yaml
    transform:
      mirror_x: false
      mirror_y: false
    cs_pin: 39
    de_pin: 18
    hsync_pin: 16
    vsync_pin: 17
    pclk_pin: 21
    init_sequence: 
      - 1
      - [0xFF, 0x77, 0x01, 0x00, 0x00, 0x10]
      - [0xCD, 0x00]
    pclk_frequency: 12MHz
    pclk_inverted: false
    data_pins:
      red:
        - 11, 12, 13, 14, 0    # R1-R5
      green:
        - 8, 20, 3, 46, 9, 10  # G0-G5
      blue:
        - 4, 5, 6, 7, 15       # B1-B5
```

**RGB интерфейс**:
- Прямое подключение к пинам ESP32-S3
- `pclk_frequency: 12MHz` — тактовая частота пикселей
- `init_sequence` — команды инициализации контроллера ST7701S
- Распределение цветовых каналов по GPIO пинам

::: warning ВНИМАНИЕ
Есть вероятность, что в будущих версиях этот компонент будет заменен на упрощенную версию.
:::
