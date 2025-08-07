# Color Configuration in ESPHome

Color scheme is the foundation of interface visual design. In ESPHome, colors are defined centrally for consistency and easy theme modification.

This project uses a separate `colors.yaml` file, which is included in `main.yaml`

## Color Configuration Structure

### Basic Format

```yaml
- id: color_sky_blue
  hex: 3FA7F3
```

### Parameters

#### `id`
**Purpose**: Unique color identifier
- Used for referencing in LVGL widgets
- Descriptive naming recommended
- Format: `color_color_name`

#### `hex`
**Purpose**: Hexadecimal color code
- Format: `RRGGBB` (without # symbol)
- Range: `000000` (black) to `FFFFFF` (white)
- Example: `3FA7F3` = RGB(63, 167, 243)

## Practical Usage

### In LVGL Widgets

```yaml
# Button
- button:
    bg_color: color_sky_blue
    border_color: color_blue
    shadow_color: color_black

# Text
- label:
    text_color: color_white

# Arc
- arc:
    arc_color: color_dark_gray
```

### Adaptive Colors

```yaml{7,11}
# Color based on state
switch:
  - platform: template
    turn_on_action:
      - lvgl.label.update:
          id: my_status
          text_color: color_green
    turn_off_action:
      - lvgl.label.update:
          id: my_status
          text_color: color_steel_blue
```

## Display Optimization

### 16-bit Color Depth
With `color_depth: 16`, colors are automatically converted to RGB565:
- Red: 5 bits (32 shades)
- Green: 6 bits (64 shades)  
- Blue: 5 bits (32 shades)

### Recommendations
- Avoid overly subtle gradations
- Test colors on actual display
- Consider LCD panel characteristics

## Conclusion

A well-thought-out color scheme provides:
- **Readability** — sufficient contrast for all elements
- **Intuitiveness** — semantically correct colors
- **Consistency** — centralized palette management
- **Aesthetics** — harmonious color combinations

Use the proposed palette as a foundation and adapt it to your needs while maintaining contrast and semantic correctness principles.