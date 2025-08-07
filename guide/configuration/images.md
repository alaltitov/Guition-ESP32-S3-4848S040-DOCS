# Image Configuration in ESPHome

The image system in ESPHome allows using graphical elements to create a rich user interface. Let's examine the structure and application of different image types.

This project uses a separate `image.yaml` file, which is included in `main.yaml`

## Image Configuration Structure

### Basic Format

```yaml
- file: 'img/weather/sunny.png'
  id: sunny_img
  type: rgb565
  resize: 100x100
  transparency: alpha_channel
```

### Configuration Parameters

#### `file`
**Purpose**: Path to image file
- Supported formats: `.png`, `.jpg`, `.bmp`
- Path relative to ESPHome project root
- PNG recommended for images with transparency

#### `id`
**Purpose**: Unique image identifier
- Used for referencing in LVGL widgets
- Format: `category_name_img`
- Example: `sunny_img`, `battery_high_img`

#### `type`
**Purpose**: Image storage format in memory
- `rgb565` — 16-bit color (recommended)
- `rgb` — 24-bit color (not supported by device)
- `grayscale` — full grayscale
- `binary` — monochrome images

#### `resize`
**Purpose**: Image resizing
- Format: `width x height`
- Performed at compile time
- Saves memory and processing time

#### `transparency`
**Purpose**: Transparency handling
- `alpha_channel` — use PNG alpha channel
- Omit parameter — no transparency

## Image Categories

### 1. Logos and Branding

```yaml
#############################
########### LOGO ############
#############################

- file: 'img/loading/homeassistant.png'
  id: ha_img
  type: rgb565
  resize: 400x82
  transparency: alpha_channel

- file: 'img/loading/esphome.png'
  id: esphome_img
  type: rgb565
  resize: 320x95
  transparency: alpha_channel
```

**Application**: Loading screens, splash screens, branding
- **Home Assistant**: 400×82 pixels
- **ESPHome**: 320×95 pixels
- Used during system startup

### 2. Lighting

```yaml
#############################
########## LIGHT ############
#############################

- file: 'img/light/lightbulb.png'
  id: lightbulb_image
  type: rgb565
  transparency: alpha_channel

- file: 'img/light/rgb_ring.png'
  id: rgb_img
  type: rgb565
  transparency: alpha_channel
```

**Application**: Lighting control interface
- **Lightbulb**: Main lighting icon
- **RGB ring**: Color selector for RGB lamps
- No resizing (original size)

### 3. Robot Vacuum

```yaml
#############################
########## VACUUM ###########
#############################
```

**Animation frame set**: 17 images for vacuum animation
- Size: 200×200 pixels (standardized)
- Rotation angles: 0°, 5°, 10°, 15°, 20°, 340°, 345°, 350°, 355°
- Additional tilted positions: 0_10, 0_20, 0_30, 20_10, 20_20, 20_30, 340_10, 340_20, 340_30

#### Animation Logic
| Image | Angle | Description |
|-------|-------|-------------|
| `vacuum_img` | Base | Static position |
| `vacuum_0_img` | 0° | Forward movement |
| `vacuum_5_img` | 5° | 5° turn |
| `vacuum_10_img` | 10° | 10° turn |
| `vacuum_15_img` | 15° | 15° turn |
| `vacuum_20_img` | 20° | 20° turn |
| `vacuum_340_img` | 340° | 20° backward turn |
| `vacuum_345_img` | 345° | 15° backward turn |
| `vacuum_350_img` | 350° | 10° backward turn |
| `vacuum_355_img` | 355° | 5° backward turn |

**Application**: Creating smooth vacuum movement animation

### 4. Weather

```yaml
#############################
########## WEATHER ##########
#############################
```

**Complete weather conditions set**: 15 images
- Size: 100×100 pixels (optimal for widgets)
- Covers all major weather conditions

#### Daytime Conditions
| ID | File | Description |
|----|------|-------------|
| `sunny_img` | `sunny.png` | Clear, sunny |
| `partlycloudy_sun_img` | `partlycloudy_sun.png` | Partly cloudy (day) |
| `cloudy_img` | `cloudy.png` | Cloudy |

#### Nighttime Conditions
| ID | File | Description |
|----|------|-------------|
| `clear_night_img` | `clear_night.png` | Clear night |
| `partlycloudy_moon_img` | `partlycloudy_moon.png` | Partly cloudy (night) |

#### Precipitation
| ID | File | Description |
|----|------|-------------|
| `rainy_img` | `rainy.png` | Rain |
| `pouring_img` | `pouring.png` | Heavy rain |
| `snowy_img` | `snowy.png` | Snow |
| `snowy_rainy_img` | `snowy_rainy.png` | Rain with snow |
| `hail_img` | `hail.png` | Hail |

#### Special Conditions
| ID | File | Description |
|----|------|-------------|
| `fog_img` | `fog.png` | Fog |
| `lightning_img` | `lightning.png` | Thunderstorm |
| `lightning_rainy_img` | `lightning_rainy.png` | Thunderstorm with rain |
| `windy_img` | `windy.png` | Windy |
| `windy_variant_img` | `windy_variant.png` | Strong wind |

### 5. Country Flags

```yaml
#############################
########## FLAGS ############
#############################
```

**Interface localization**: 18 country flags
- Size: 60×80 pixels (3:4 ratio)
- Standardized size for language selector

#### Supported Countries
| Code | Country | ID |
|------|---------|----| 
| `de` | Germany | `flags_de_img` |
| `es` | Spain | `flags_es_img` |
| `fr` | France | `flags_fr_img` |
| `gb` | United Kingdom | `flags_gb_img` |
| `it` | Italy | `flags_it_img` |
| `kr` | South Korea | `flags_kr_img` |
| `pt` | Portugal | `flags_pt_img` |
| `ru` | Russia | `flags_ru_img` |
| `us` | United States | `flags_us_img` |
| `pl` | Poland | `flags_pl_img` |
| `tr` | Turkey | `flags_tr_img` |
| `sv` | Sweden | `flags_sv_img` |
| `id` | Indonesia | `flags_id_img` |
| `vi` | Vietnam | `flags_vi_img` |
| `ro` | Romania | `flags_ro_img` |
| `nl` | Netherlands | `flags_nl_img` |
| `hu` | Hungary | `flags_hu_img` |
| `cs` | Czech Republic | `flags_cs_img` |
| `fi` | Finland | `flags_fi_img` |

### 6. Battery Indicators

```yaml
#############################
########## BATTERY ##########
#############################
```

**Two indicator sets**:

#### For Battery Charge Status
| ID | Level | Description |
|----|-------|-------------|
| `battery_very_high_img` | 90-100% | Very high |
| `battery_high_img` | 70-89% | High |
| `battery_middle_img` | 40-69% | Medium |
| `battery_low_img` | 20-39% | Low |
| `battery_very_low_img` | 5-19% | Very low |
| `battery_empty_img` | 0-4% | Empty |

#### For Battery Charging Animation
| ID | Level | Application |
|----|-------|-------------|
| `battery_80_img` | 80% | Almost full |
| `battery_60_img` | 60% | More than half |
| `battery_40_img` | 40% | Less than half |
| `battery_20_img` | 20% | Needs charging |
| `battery_0_img` | 0% | Empty |

## Memory Optimization

### Image Sizes

| Category | Size | Memory (approx.) | Application |
|----------|------|------------------|-------------|
| Flags | 60×80 | 9.6 KB | Language selector |
| Weather | 100×100 | 20 KB | Weather widgets |
| Vacuum | 200×200 | 80 KB | Animation |
| Logos | 400×82 | 65.6 KB | Splash screens |

## Practical Usage

### In LVGL Widgets

```yaml
# Static image
- img:
    src: sunny_img
    align: center

# Animation
- animimg:
    src: [ 
      battery_0_img,
      battery_20_img,
      battery_40_img,
      battery_60_img,
      battery_80_img,
      battery_very_high_img,
    ]
```

## Conclusion

A properly organized image system provides:
- **Visual appeal** — beautiful and modern interface
- **Intuitiveness** — user-friendly visual elements
- **Performance** — optimized memory usage
- **Scalability** — easy addition of new elements

Use the proposed structure as a foundation and adapt it to your needs while maintaining organization and optimization principles.