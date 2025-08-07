# Navigation Menu Buttons

The navigation button system provides quick access to the main sections of the display interface. The menu is located at the bottom of the screen and contains 4 main buttons.

## Menu System Overview

### **Main Functions:**
- Navigation between interface pages
- Visual indication of active page
- Smooth transition animations

### **Menu Structure:**
| Button | Icon | Page | Purpose |
|--------|------|------|---------|
| Home | `${home_icon}` | `home_page` | Main page |
| Lights | `${ceiling_icon}` | `lights_group_page` | Lighting control |
| Devices | `${devices_icon}` | `devices_page` | Devices |
| Settings | `${settings_icon}` | `settings_page` | Device settings |

## Menu Container Structure

### **Main Container**
```yaml
- obj:
    id: menu_controls_main
    x: 0
    y: -20
    width: 440
    height: 80
    pad_all: 10
    align: BOTTOM_MID
    bg_color: color_steel_blue
    bg_opa: 20%
    radius: 10
    layout:
      type: FLEX
      flex_align_main: SPACE_AROUND
      flex_align_cross: CENTER
```

**Container Characteristics:**
- **Position:** Bottom of screen with 20px offset
- **Size:** 440x80 pixels
- **Background:** Semi-transparent `color_steel_blue` (20% opacity)
- **Layout:** Flex with even button distribution
- **Padding:** 10px on all sides
- **Radius:** 10px for rounded corners

## Button Structure

### **Home Button**
```yaml
- button:
    id: home_page_btn
    clickable: true
    width: 60
    height: 60
    radius: 10
    bg_color: color_slate_blue_gray
    shadow_opa: TRANSP
    widgets:
      - label:
          align: CENTER
          text_color: color_steel_blue
          text_font: icons_36
          text: "${home_icon}"
```

**Features:**
- **Size:** 60x60 pixels (square)
- **Default background:** `color_slate_blue_gray` (active)
- **Icon:** Centered, 36px font size
- **Icon color:** `color_steel_blue`

### **Lights Button**
```yaml
- button:
    id: lights_group_page_btn
    bg_opa: TRANSP  # Initially transparent
    widgets:
      - label:
          text: "${ceiling_icon}"
```

**Differences:**
- **Background:** Initially transparent (`TRANSP`)
- **Icon:** Ceiling lighting symbol
- **Activation:** Gets background when pressed

### **Devices Button**
```yaml
- button:
    id: devices_page_btn
    widgets:
      - label:
          text: "${devices_icon}"
```

### **Settings Button**
```yaml
- button:
    id: settings_page_btn
    widgets:
      - label:
          text: "${settings_icon}"
```

## Navigation Logic

### **Switching Mechanism**

Each button performs the following actions when pressed:

#### 1️⃣ **Page Transition**
```yaml
on_press:
  - lvgl.page.show: 
      id: home_page
      animation: OUT_RIGHT
      time: 300ms
```

- **Animation:** `OUT_RIGHT` (slide from right)
- **Duration:** 300 milliseconds
- **Smoothness:** Built-in LVGL transitions

#### 2️⃣ **Current Button Activation**
```yaml
- lvgl.button.update:
    id: home_page_btn
    bg_color: color_slate_blue_gray
    bg_opa: 100%
```

- **Background:** Set to `color_slate_blue_gray`
- **Opacity:** 100% (fully opaque)
- **Visual effect:** Button becomes highlighted

#### 3️⃣ **Other Buttons Deactivation**
```yaml
- lvgl.button.update:
    id: lights_group_page_btn
    bg_opa: TRANSP
- lvgl.button.update:
    id: devices_page_btn
    bg_opa: TRANSP
- lvgl.button.update:
    id: settings_page_btn
    bg_opa: TRANSP
```

- **Effect:** All inactive buttons become transparent
- **Result:** Clear highlighting of active page

## Styling System

### **Color Scheme**
| Element | Color | State | Description |
|---------|-------|-------|-------------|
| Container | `color_steel_blue` | 20% opacity | Menu panel background |
| Active button | `color_slate_blue_gray` | 100% opacity | Current page highlight |
| Inactive button | - | Transparent | Hidden background |
| Icons | `color_steel_blue` | 100% opacity | All icons same color |

### **Typography**
```yaml
# Icon font configuration
text_font: icons_36    # 36px icon font
text_color: color_steel_blue
align: CENTER
```

- **Font size:** 36 pixels for optimal visibility
- **Alignment:** Centered in button
- **Color consistency:** All icons use same color

## Animation System

### **Page Transitions**
| Animation Type | Direction | Use Case |
|----------------|-----------|----------|
| `OUT_RIGHT` | Slide from right | Forward navigation |
| `OUT_LEFT` | Slide from left | Backward navigation |
| `FADE_IN` | Fade effect | Settings/overlay pages |

### **Button State Changes**
```yaml
# Smooth opacity transitions
bg_opa: TRANSP → 100%  # Activation
bg_opa: 100% → TRANSP  # Deactivation
```

## Customization Options

### **Adding New Buttons**
```yaml
# New button template
- button:
    id: new_page_btn
    width: 60
    height: 60
    radius: 10
    bg_opa: TRANSP
    widgets:
      - label:
          align: CENTER
          text_color: color_steel_blue
          text_font: icons_36
          text: "${new_icon}"
    on_press:
      - lvgl.page.show:
          id: new_page
          animation: OUT_RIGHT
          time: 300ms
      # Activate current button
      - lvgl.button.update:
          id: new_page_btn
          bg_color: color_slate_blue_gray
          bg_opa: 100%
      # Deactivate other buttons
      - lvgl.button.update:
          id: home_page_btn
          bg_opa: TRANSP
      # ... repeat for all other buttons
```

### **Changing Menu Position**
```yaml
# Top menu
align: TOP_MID
y: 20

# Side menu
align: LEFT_MID
x: 20
width: 80
height: 300
layout:
  type: FLEX
  flex_flow: COLUMN
```

### **Custom Animations**
```yaml
# Slide up animation
animation: OUT_TOP
time: 500ms

# Bounce effect
animation: OVER_LEFT
time: 400ms
```

## Best Practices

### **Icon Selection**
- Use consistent icon style across all buttons
- Ensure icons are recognizable at 36px size
- Maintain visual hierarchy with icon weights

### **Performance Optimization**
- Minimize animation complexity for smooth transitions
- Use appropriate opacity values to reduce rendering load
- Cache button states to avoid unnecessary updates

### **Accessibility**
- Ensure sufficient button size (minimum 44px touch target)
- Maintain adequate contrast ratios
- Provide clear visual feedback for interactions

## Implementation Example

### **Complete Button Implementation**
```yaml
- button:
    id: example_page_btn
    clickable: true
    width: 60
    height: 60
    radius: 10
    bg_opa: TRANSP
    shadow_opa: TRANSP
    widgets:
      - label:
          align: CENTER
          text_color: color_steel_blue
          text_font: icons_36
          text: "${example_icon}"
    on_press:
      # Page transition
      - lvgl.page.show:
          id: example_page
          animation: OUT_RIGHT
          time: 300ms
      
      # Update button states
      - script.execute: update_menu_buttons
      - lvgl.button.update:
          id: example_page_btn
          bg_color: color_slate_blue_gray
          bg_opa: 100%
```

### **Menu State Management Script**
```yaml
script:
  - id: update_menu_buttons
    then:
      - lvgl.button.update:
          id: home_page_btn
          bg_opa: TRANSP
      - lvgl.button.update:
          id: lights_group_page_btn
          bg_opa: TRANSP
      - lvgl.button.update:
          id: devices_page_btn
          bg_opa: TRANSP
      - lvgl.button.update:
          id: settings_page_btn
          bg_opa: TRANSP
```

## Conclusion

The navigation menu system provides:
- **Intuitive navigation** — familiar bottom tab bar pattern
- **Clear visual feedback** — obvious active state indication
- **Smooth interactions** — fluid animations and transitions
- **Extensible design** — easy to add new pages and buttons

This implementation follows modern UI/UX patterns while being optimized for embedded display performance.
