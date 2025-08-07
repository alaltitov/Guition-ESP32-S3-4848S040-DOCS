# Font Configuration in ESPHome

The font system in ESPHome allows creating beautiful interfaces with support for different languages and icons. Let's examine each configuration parameter in detail.

This project uses a separate `fonts.yaml` file, which is included in `main.yaml`

## Font Configuration Structure

### Basic Structure

```yaml
- file: "fonts/Nunito-SemiBold.ttf"
  id: nunito_16
  size: 16
  bpp: 4
  glyphsets:
    - GF_Latin_Core
    - GF_Cyrillic_Core
    - GF_Latin_Vietnamese
  glyphs: "²"
  extras:
    - file: "fonts/Jua-Regular.ttf"
      glyphs: [
        "\U0000C774",
        "\U0000B8E8",
        "\U0000B9C8",        
      ]
```

### Parameter Breakdown

#### `file`
**Purpose**: Path to font file
- Path relative to ESPHome project root
- Example: `"fonts/Nunito-SemiBold.ttf"`

#### `id`
**Purpose**: Unique font identifier for use in LVGL
- Must be unique within the project
- Used to reference font in widgets
- Example: `nunito_16`, `icons_24`

#### `size`
**Purpose**: Font size in pixels
- Affects memory usage and display quality
- Larger size means more memory consumption
- Example: `16`, `24`, `48`

#### `bpp` (Bits Per Pixel)
**Purpose**: Color depth for font smoothing
- `1` — monochrome (black and white)
- `2` — 4 shades of gray
- `4` — 16 shades of gray (recommended)
- `8` — 256 shades (maximum quality, more memory)

#### `glyphsets`
**Purpose**: Predefined Google Fonts character sets
- `GF_Latin_Core` — basic Latin
- `GF_Cyrillic_Core` — Cyrillic
- `GF_Latin_Vietnamese` — Vietnamese characters
- Saves memory compared to manual character specification

#### `glyphs`
**Purpose**: Additional characters not included in glyphsets
- String with characters: `"²³°"`
- Unicode array: `["\U0000C774", "\U0000B8E8"]`
- Used for special characters

#### `extras`
**Purpose**: Additional fonts for specific characters
- Allows combining different fonts
- Useful for Asian languages or special characters
- Each extra has its own `file` and `glyphs`

::: info NOTE
There's a possibility that future versions will add the ability to specify glyph ranges. This feature is currently being tested and is planned for merging with the main ESPHome branch.
:::

## Font Types in the Project

### 1. Text Fonts (Nunito)

```yaml
- file: "fonts/Nunito-SemiBold.ttf"
  id: nunito_16
  size: 16
  bpp: 4
  glyphsets:
    - GF_Latin_Core
    - GF_Cyrillic_Core
    - GF_Latin_Vietnamese
```

**Usage**: Main interface text
- Support for Latin, Cyrillic, and Vietnamese characters
- Sizes: 16, 18, 20, 30, 32, 36, 48, 64, 72, 84 pixels
- Semi-bold style for better readability

### 2. Icon Fonts (icons_v2.ttf)

```yaml
- file: "fonts/icons_v2.ttf"
  id: icons_24
  size: 24
  bpp: 4
  glyphs: [
    "\U0000e900", # brightness
    "\U0000e901", # saturation
    "\U0000e925", # thermostat
  ]
```

**Usage**: Custom smart home icons
- Specially created icons for the project
- Sizes: 24, 28, 32, 36, 38, 48, 72, 90, 300 pixels
- Unicode codes from `\U0000e900` to `\U0000e944`

**Icon Categories**:
- **Control**: brightness, saturation, thermostat
- **Climate**: air conditioning, heating, fan
- **Security**: lock, Wi-Fi signal
- **Media**: play, pause, volume
- **Lighting**: different types of bulbs
- **Blinds**: 11 positions from closed to open

### 3. Material Design Icons (MDI)

```yaml
- file: "fonts/materialdesignicons-webfont.ttf"
  id: mdi_icons_24
  size: 24
  bpp: 4
  glyphs: [
    "\U000F068A", # shield home
    "\U000F1828", # shield moon
    "\U000F099D", # shield lock
  ]
```

**Usage**: Standard Material Design icons
- Sizes: 24, 28, 40, 52, 68, 72 pixels
- Unicode codes from `\U000F0000`
- Used for system functions

## Practical Usage Examples

### In LVGL Widgets

```yaml
# Header
- label:
    text: "Temperature"
    text_font: nunito_32
    
# Value
- label:
    text: "23.5°C"
    text_font: nunito_64
    
# Icon
- label:
    text: "\U0000e939"  # temperature icon
    text_font: icons_48
```

## Conclusion

Proper font configuration is critically important for:
- **Performance** — memory optimization
- **Quality** — smoothing and readability  
- **Localization** — support for different languages
- **Design** — interface consistency

Use `glyphsets` for standard characters, add `extras` for special cases, and carefully plan font sizes for optimal balance between quality and performance.