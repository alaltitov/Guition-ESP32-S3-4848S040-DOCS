---
prev:
  text: 'Installation'
  link: '/guide/installation'
next:
  text: 'Fonts'
  link: '/guide/configuration/fonts'
---

# Main Configuration

The main configuration file `main.yaml` contains all necessary settings for device operation. Let's examine each block in detail:

## Module Connection (Packages)

```yaml
packages:
  home: !include widgets/home/home.yaml
  lights_config: !include widgets/light/lights_config.yaml
  devices: !include widgets/devices.yaml
  settings: !include widgets/settings.yaml
  menu_controls_main: !include widgets/menu_controls_main.yaml
  loading_page: !include widgets/loading_page.yaml
```

**Purpose**: Modular system for code organization. Each file contains configuration for specific functionality.

- `home.yaml` — main screen with primary information
- `lights_config.yaml` — lighting control
- `devices.yaml` — control of other devices
- `settings.yaml` — device settings
- `menu_controls_main.yaml` — control elements
- `loading_page.yaml` — loading screen at startup

## Interface Resources

```yaml
image: !include widgets/image.yaml
font: !include widgets/fonts.yaml
color: !include widgets/colors.yaml
```

**Purpose**: Centralized management of visual resources.

- `image.yaml` — definitions of all images
- `fonts.yaml` — font settings
- `colors.yaml` — interface color palette

## HTTP Requests

```yaml
http_request:
  verify_ssl: false
```

**Purpose**: HTTP client configuration for external API requests. Required for `media_player` functionality

## External Components

```yaml
external_components:
  - source: github://pr#9972
    components: [mapping]
    refresh: 1h
```

**Purpose**: Connection of experimental ESPHome component.
- Loads `mapping` component from GitHub PR #9972
- Updates every hour to get latest changes

::: danger WARNING
This component will be removed in the release version or earlier, as soon as it's merged with the main branch. This component optimizes the `mapping` component's work with PSRAM
:::

## Main ESPHome Settings

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

**Parameters**:
- `name` — internal device name
- `friendly_name` — display name in Home Assistant
- `includes` — connection of C++ libraries for extended functionality
- `flash_mode: dio` — flash memory operation mode for stability

## ESP32-S3 Configuration

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

**Key Settings**:
- `board` — ESP32-S3 board type
- `flash_size: 16MB` — flash memory size
- `framework: esp-idf` — using ESP-IDF
- `CPU_FREQ_240` — maximum processor frequency 240 MHz
- `SPIRAM_TRY_ALLOCATE_WIFI_LWIP` — using PSRAM for Wi-Fi stack

::: warning IMPORTANT
Settings in `sdkconfig_options` can directly affect firmware startup.
:::
::: details OPTIONS
This is a spoiler block.
:::

## PSRAM Configuration

```yaml
psram:
  mode: octal
  speed: 80MHz
```

**Purpose**: External RAM configuration.
- `octal` — 8-bit mode for maximum speed
- `80MHz` — PSRAM operating frequency

## Logging

```yaml
logger:
  level: debug
```

**Purpose**: Log detail level for debugging. [More details](https://esphome.io/components/logger.html)

::: tip TIP
After debugging, try to use `info` or `error` levels, as this directly affects device performance.
:::

## API and OTA

```yaml
api:
  encryption:
    key: !secret display_key

ota:
  - platform: esphome
    password: !secret display_ota
```

**Security**:
- `api.encryption.key` — encryption key for Home Assistant communication
- `ota.password` — password for over-the-air updates

## Wi-Fi Connection

```yaml
wifi:
  networks:
    - ssid: !secret wifi_ssid
      password: !secret wifi_password
```

**Network Setup**: Data is taken from `secrets.yaml` file for security.

## LVGL Interface

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

**Graphics Parameters**:
- `color_depth: 16` — 16-bit color depth (65536 colors)
- `big_endian` — byte order for display compatibility
- `long_press_time` — hold time for long button press
- `page_wrap: false` — disabling cyclic page switching

## Display Backlight

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

**Smart Control**:
- Automatic interface resume when backlight turns on
- LVGL pause when turning off to save resources
- State restoration after reboot

## PWM Output for Backlight

```yaml
output:
  - platform: ledc
    pin: GPIO38
    id: backlight_output
    frequency: 100Hz
```

**Technical Parameters**:
- `GPIO38` — backlight control pin
- `100Hz` — PWM frequency for smooth brightness control

## I2C Bus

```yaml
i2c:
  - id: bus_a
    sda: GPIO19
    scl:
      number: GPIO45
      ignore_strapping_warning: true
    frequency: 100kHz
```

**Purpose**: I2C bus initialization
- `ignore_strapping_warning` — ignoring boot pin warning

## Touch Controller

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

**Functions**:
- GT911 controller
- Automatic wake-up on touch

## SPI Interface

```yaml
spi:
  - id: lcd_spi
    clk_pin: GPIO48
    mosi_pin: GPIO47
```

**Purpose**: SPI bus initialization. High-speed data transmission to display.

## Display Configuration

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

**Main Parameters**:
- `st7701s` — driver for display controller
- `update_interval: never` — updates only on LVGL demand
- `dimensions: 480x480` — display resolution
- `data_rate: 2MHz` — SPI transmission speed

## Display RGB Interface

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

**RGB Interface**:
- Direct connection to ESP32-S3 pins
- `pclk_frequency: 12MHz` — pixel clock frequency
- `init_sequence` — ST7701S controller initialization commands
- Color channel distribution across GPIO pins

::: warning WARNING
There's a possibility that in future versions this component will be replaced with a simplified version.
:::