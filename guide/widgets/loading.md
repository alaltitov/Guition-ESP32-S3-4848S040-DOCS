# Loading Page

The loading page is displayed when the display starts up and shows the process of connecting to Home Assistant and synchronizing data. The code responsible for this page is located in the `loading_page.yaml` file. It's designed to improve user experience so users don't see empty widgets and placeholders during connection and synchronization with Home Assistant.

## Functionality Overview

### **Main Tasks:**
- Display Home Assistant API connection status
- Visualize data synchronization process
- Smooth transition to main interface
- Inform user about current system state

### **Visual Elements:**
- Home Assistant logo (top of screen)
- Connection indicator with spinner
- Synchronization progress bar
- ESPHome logo (bottom of screen)

## Component Structure

### **Main Container**
```yaml
- button:
    id: loading_page
    bg_color: color_slate_blue_gray
    width: 100%
    height: 100%
```

- **Type:** Full-screen button container
- **Background color:** `color_slate_blue_gray`
- **Size:** 100% of screen
- **Purpose:** Foundation for all loading elements

::: info NOTE
Will be changed to `obj` to prevent color flashing when pressed
:::

### **Home Assistant Logo**
```yaml
- image:
    y: 30
    align: TOP_MID
    src: ha_img
```

- **Offset:** `30px` from top
- **Position:** Top of screen, centered
- **Source:** `ha_img` (must be defined in `image` section)

### **API Connection Block**
```yaml
- obj:
    id: boot_homeassistant
    y: 180
    width: 300
    height: 100
    widgets:
      - label:
          id: boot_homeassistant_label
          text: "Connecting to API..."
      - spinner:
          id: boot_homeassistant_spiner
          spin_time: 2s
          arc_length: 60deg
```

**Components:**
- **Text label:** Connection status
- **Spinner:** Animated loading indicator
- **Dimensions:** 300x100 px
- **Position:** Center of screen

### **Synchronization Block**
```yaml
- obj:
    id: boot_synchronization
    hidden: true
    widgets:
      - label:
          id: boot_synchronization_label
          text: "Synchronization..."
      - bar:
          id: boot_synchronization_bar
          min_value: 0
          max_value: 100
          animated: true
```

**Characteristics:**
- **Initially hidden:** `hidden: true`
- **Progress bar:** From 0 to 100%
- **Animation:** Smooth filling
- **Colors:** `color_steel_blue` / `color_misty_blue`

## Working Logic

### **Global Variables**
```yaml
globals:
  - id: ha_connected
    type: bool
    initial_value: 'false'
```

- **Purpose:** Track connection state
- **Type:** Boolean value
- **Initial value:** `false`

### **Control Scripts**

#### 1️⃣ **Boot Status Check**
```yaml
- id: check_boot_status
  then:
    - lambda: |-
        if (id(ha_connected)) {
          lv_obj_add_flag(id(boot_homeassistant), LV_OBJ_FLAG_HIDDEN);
          lv_obj_clear_flag(id(boot_synchronization), LV_OBJ_FLAG_HIDDEN);
          id(start_sync_animation).execute();
        }
```

**Functions:**
- Hides connection block
- Shows synchronization block
- Starts progress animation

#### 2️⃣ **Synchronization Animation**
```yaml
- id: start_sync_animation
  then:
    - delay: 1s
    - lvgl.bar.update:
        id: boot_synchronization_bar
        value: 50
    - delay: 1s
    - lvgl.bar.update:
        id: boot_synchronization_bar
        value: 100
    - delay: 500ms
    - lvgl.widget.hide: loading_page
```

**Stages:**
1. 1 second delay
2. 50% progress
3. 1 second delay
4. 100% progress
5. 500ms delay
6. Hide loading page

#### 3️⃣ **Connection Handler**
```yaml
- id: on_ha_connected
  then:
    - lambda: |-
        if (!id(ha_connected)) {
          id(ha_connected) = true;
          lv_label_set_text(id(boot_homeassistant_label), "Home Assistant Connected!");
          lv_obj_add_flag(id(boot_homeassistant_spiner), LV_OBJ_FLAG_HIDDEN);
          id(check_boot_status).execute();
        }
```

**Actions:**
- Sets connection flag
- Changes text to "Connected!"
- Hides spinner
- Triggers status check

## API Events

### **Client Connected**
```yaml
api:
  on_client_connected:
    - lambda: |-
        if (0 == client_info.find("Home Assistant ")) {
          id(on_ha_connected).execute();
        }
```

- **Trigger:** API client connection
- **Condition:** Client contains "Home Assistant "
- **Action:** Execute connection script

### **Client Disconnected**
```yaml
on_client_disconnected:
  - lambda: |-
      if (0 == client_info.find("Home Assistant ")) {
        id(ha_connected) = false;
      }
```

- **Trigger:** API client disconnection
- **Action:** Reset connection flag

## Styling

### **Color Scheme**
| Element | Color | Purpose |
|---------|-------|---------|
| Background | `color_slate_blue_gray` | Main background |
| Text | `color_misty_blue` | Text elements |
| Progress (background) | `color_steel_blue` | Inactive bar part |
| Progress (indicator) | `color_misty_blue` | Active bar part |
| Spinner | `color_steel_blue` / `color_misty_blue` | Loading animation |

### **Sizes and Positioning**
```yaml
# Main sizes
loading_page: 100% x 100%          # Full screen
boot_homeassistant: 300px x 100px  # Connection block
boot_synchronization: 300px x 60px # Synchronization block
spinner: 50px x 50px               # Spinner size

# Positions
ha_logo: TOP_MID, y: 30           # HA logo at top
connection_block: TOP_MID, y: 180 # Connection block
sync_block: TOP_MID, y: 180       # Synchronization block
esphome_logo: BOTTOM_MID, y: -30  # ESPHome logo at bottom
```

## Configuration and Customization

### **Changing Animation Timing**
```yaml
# In start_sync_animation script
- delay: 2s  # Increase to 2 seconds
- lvgl.bar.update:
    id: boot_synchronization_bar
    value: 30  # First stage 30%
- delay: 1s
- lvgl.bar.update:
    id: boot_synchronization_bar
    value: 70  # Second stage 70%
- delay: 1s
- lvgl.bar.update:
    id: boot_synchronization_bar
    value: 100  # Completion
```

### **Changing Text Messages**
```yaml
# Custom messages
text: "Подключение к серверу..."     # Russian
text: "Conectando al servidor..."    # Spanish
text: "Connexion au serveur..."      # French
```

### **Replacing Images**
```yaml
# Adding custom logos
image:
  - file: "img/loading/custom_logo.png"
    id: custom_logo
    resize: 100x50

# Using in loading page
- image:
    src: custom_logo
    align: TOP_MID
```

## Implementation Tips

### **Performance Optimization**
- Use optimized image sizes
- Minimize animation complexity
- Cache frequently used elements

### **User Experience**
- Keep loading times reasonable (2-4 seconds)
- Provide clear status messages
- Use smooth transitions between states

### **Error Handling**
```yaml
# Add timeout handling
- delay: 10s
- if:
    condition:
      lambda: 'return !id(ha_connected);'
    then:
      - lvgl.label.update:
          id: boot_homeassistant_label
          text: "Connection timeout. Retrying..."
```

## Conclusion

The loading page provides:
- **Professional appearance** — polished startup experience
- **User feedback** — clear status communication
- **Smooth transitions** — seamless interface flow
- **Error resilience** — graceful handling of connection issues

Use this structure as a foundation and adapt it to your specific needs while maintaining good user experience principles.