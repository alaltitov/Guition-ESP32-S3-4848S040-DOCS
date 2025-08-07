# Installation and Setup

In this section, we'll thoroughly examine two main methods for installing the **Guition ESP32-S3-4848S040** firmware: through **VSCode with ESPHome** for developers and through **ESPHome Builder** in Home Assistant for regular users.

## Choosing Installation Method

### ESPHome Builder in Home Assistant (for users)
**Recommended if:**
- You need to quickly get a working device
- You don't plan serious code modifications
- You prefer web interface

### VSCode (for developers)
**Recommended if:**
- You plan to modify the code
- You need full interface customization
- You want to understand how the firmware works
- You have IDE experience

---

## Before Installation

### Home Assistant Settings:

To control devices, you need to enable the "Allow device to perform Home Assistant actions" option in the ESPHome integration with Home Assistant.

Also install the custom [component](https://github.com/alaltitov/homeassistant-display-tools) for translation and covers for the media player.

## Method 1: Installation via ESPHome Builder:

::: note NOTE
While this method may seem simpler for users, it's not entirely so, since ESPHome Builder only sees files in the root of the esphome folder, meaning you can only edit the main.yaml file through it. To change demo entities to your own, you'll need to use another editor, such as File Editor
:::

1. Download the ZIP file from the [repository](https://github.com/alaltitov/Guition-ESP32-S3-4848S040)
2. Transfer (copy) all files from the `src` folder of the repository as-is to the root of the `esphome` folder in Home Assistant (homeassistant/esphome)
3. Open the `secrets.yaml` file (through ESPHome Builder, top right). Enter the data:

```yaml
wifi_ssid: "Your Wi-Fi network"
wifi_password: "Your Wi-Fi network password"

display_key: "Your generated token for API access to home assistant"
display_ota: "Your generated token for OTA firmware"

```
4. In all files in the `widgets` folder in `substitutions`, all variables ending with `entity` must be replaced with your own, for example:

```yaml
substitutions:

  weather_entity: "weather.home_assistant"
  temperature_entity: "sensor.outside_temperature"
  humidity_entity: "sensor.outside_humidity"
  co2_entity: "sensor.carbon_dioxide"
```
::: warning WARNING!
It's very important to replace all demo entities with your own, otherwise the firmware won't work! More details can be found in the Widgets section.
:::

5. Through ESPHome Builder, find `main.yaml` (Display) and click `install`

## Method 2: Installation via VSCode:

### Step 1: Development Environment Setup

#### Installing VSCode
1. Download and install [Visual Studio Code](https://code.visualstudio.com/)
2. Launch VSCode

#### Installing ESPHome Extension
1. Open the extensions panel (`Ctrl+Shift+X`)
2. Find and install **"ESPHome"** by ESPHome
3. Restart VSCode

#### Installing Python and ESPHome CLI
```bash
# Install Python (if not installed)
# Windows: download from python.org
# macOS: brew install python3
# Ubuntu/Debian: sudo apt install python3 python3-pip

# Install ESPHome
pip3 install esphome

# Check installation
esphome version
```

### Step 2: Repository Cloning
```bash
# Clone the repository
git clone https://github.com/alaltitov/Guition-ESP32-S3-4848S040.git

# Navigate to project folder
cd Guition-ESP32-S3-4848S040

# Open project in VSCode
code .
```

### Step 3: Configuration Setup
Create a `secrets.yaml` file in the project root:

```yaml
wifi_ssid: "Your Wi-Fi network"
wifi_password: "Your Wi-Fi network password"

display_key: "Your generated token for API access to home assistant"
display_ota: "Your generated token for OTA firmware"

```

In all files in the `widgets` folder in `substitutions`, all variables ending with `entity` must be replaced with your own, for example:

```yaml
substitutions:

  weather_entity: "weather.home_assistant"
  temperature_entity: "sensor.outside_temperature"
  humidity_entity: "sensor.outside_humidity"
  co2_entity: "sensor.carbon_dioxide"
```
::: warning WARNING!
It's very important to replace all demo entities with your own, otherwise the firmware won't work! More details can be found in the Widgets section.
:::

### Step 4: Flashing via OTA or UART

#### OTA
Go to the tab with the `main.yaml` file. Click the `🚀OTA` button

#### UART
In the VSCode menu, select `Terminal` then `New Terminal`. In the terminal, enter the command
```bash
# where /dev/cu.wchusbserial140 - device port (replace with your own)
esphome run main.yaml --device /dev/cu.wchusbserial140
```
