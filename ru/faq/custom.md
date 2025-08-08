# Создание собственных виджетов

Давайте создадим виджет умной розетки `socket_widget.yaml`. Виджет, который будет управлять состоянием розетки и показывать параметры.

## Структура виджета

Создадим в нашем проекте в папке `widgets` папку `socket`, а в ней файл `socket_widget.yaml`.
В нашем примере виджет будет состоять из 4 основных блоков:

```yaml

substitutions:     # Замены, попросту говоря, статичные переменные, константы
sensor:            # Числовые датчики от Home Assistant
text_sensor:       # Текстовые датчики от Home Assistant
lvgl:              # Визуальный интерфейс
```

## Substitutions - замены/подстановки/константы

**Назначение**: Делают виджет переиспользуемым с разными параметрами.

Так как в коде мы много где указываем одни и теже данные, проще использовать одну константу и указывать её далее везде в коде.

Для начала нам нужно название сущности из Home Assistant. В моем случает это `switch.rozetka_test_socket`, а также 3 сенсора с мощностью, напряжением и силой тока. В моем случае это:
```yaml
sensor.rozetka_test_power   # Мощность
sensor.rozetka_test_voltage # Напряжение
sensor.rozetka_test_current # Сила тока
```
Добавляем переменную `socket_entity` чтобы дальше использовать её вместо `switch.rozetka_test_socket` и три наших сенсора

```yaml
substitutions:

  socket_entity:  "switch.rozetka_test_socket"
  socket_power:   "sensor.rozetka_test_power"   # Мощность
  socket_voltage: "sensor.rozetka_test_voltage" # Напряжение
  socket_current: "sensor.rozetka_test_current" # Сила тока
```
Также нам потребуются 4 иконки из набора MDI и наш блок `substitutions` уже будет выглядеть так:

```yaml
substitutions:

  socket_entity:  "switch.rozetka_test_socket"
  socket_power:   "sensor.rozetka_test_power"   # Мощность
  socket_voltage: "sensor.rozetka_test_voltage" # Напряжение
  socket_current: "sensor.rozetka_test_current" # Сила тока

  socket_icon:          "\U000F1107"
  socket_current_icon:  "\U000F1480"
  socket_voltage_icon:  "\U000F095B"
  socket_power_icon:    "\U000F0241"
```

Чтобы иконки отображались их надо добавить в шрифты `fonts.yaml`

```yaml{6-9,18-24}
- file: "fonts/materialdesignicons-webfont.ttf"
  id: mdi_icons_40
  size: 40
  bpp: 4
  glyphs: [
    "\U000F1107", # socket
    "\U000F1480", # current
    "\U000F095B", # voltage
    "\U000F0241", # power
    "\U000F068A", # shield home
    "\U000F1828", # shield moon
    "\U000F099D", # shield lock
    "\U000F06BB", # shield plane
    "\U000F099E", # shield off
    "\U000F0498", # shield
  ]

- file: "fonts/materialdesignicons-webfont.ttf"
  id: mdi_icons_160
  size: 160
  bpp: 4
  glyphs: [
    "\U000F1107", # socket
  ]
```

## Text Sensors - текстовые датчики

**Назначение**: Получают текстовые данные от Home Assistant.

Для получения информации с `текстовых` датчиков Home Assistant нам потребуется создать текстовые датчики `text_sensor`.
Нам нужно получить:
- состояние объекта
- название объекта
- единицы измерения мощности, напряжения и силы тока

### Состояние объекта
```yaml
text_sensor:

  # Состояние розетки
  - platform: homeassistant        # Указываем платформу Home Assistant
    id: socket_sensor_state        # Придумываем уникальный индификатор для связи в коде
    entity_id: "${socket_entity}"  # Указываем константу нашей сущности из substitutions
```

### Название объекта
```yaml
  # Имя розетки
  - platform: homeassistant
    id: socket_sensor_name
    entity_id: "${socket_entity}"
    attribute: friendly_name      # Указываем атрибут сущности
```

### Единицы измерения мощности, напряжения и силы тока
```yaml
    # Единицы измерения мощности
  - platform: homeassistant
    id: socket_sensor_power_uom
    entity_id: "${socket_power}"
    attribute: unit_of_measurement

    # Единицы измерения напряжения
  - platform: homeassistant
    id: socket_sensor_voltage_uom
    entity_id: "${socket_voltage}"
    attribute: unit_of_measurement

    # Единицы измерения силы тока
  - platform: homeassistant
    id: socket_sensor_current_uom
    entity_id: "${socket_current}"
    attribute: unit_of_measurement
```

Итак, у нас теперь получается вот такая секция `text_sensor` (но мы к ней ещё вернемся):
```yaml
text_sensor:

  # Состояние розетки
  - platform: homeassistant
    id: socket_sensor_state
    entity_id: "${socket_entity}"

  # Имя розетки
  - platform: homeassistant
    id: socket_sensor_name
    entity_id: "${socket_entity}"
    attribute: friendly_name

  # Единицы измерения мощности
  - platform: homeassistant
    id: socket_sensor_power_uom
    entity_id: "${socket_power}"
    attribute: unit_of_measurement

  # Единицы измерения напряжения
  - platform: homeassistant
    id: socket_sensor_voltage_uom
    entity_id: "${socket_voltage}"
    attribute: unit_of_measurement

  # Единицы измерения силы тока
  - platform: homeassistant
    id: socket_sensor_current_uom
    entity_id: "${socket_current}"
    attribute: unit_of_measurement
```

## Sensors - числовые датчики

**Назначение**: Получают числовые данные от Home Assistant.

Для получения информации с `числовых` датчиков Home Assistant нам потребуется создать числовые датчики `sensor`
Нам нужно получить `значения` с датчиков мощности, напряжения и силы тока:
```yaml
sensor:
    # Значение мощности
  - platform: homeassistant
    id: socket_sensor_power
    entity_id: "${socket_power}"

    # Значение напряжения
  - platform: homeassistant
    id: socket_sensor_voltage
    entity_id: "${socket_voltage}"

    # Значение силы тока
  - platform: homeassistant
    id: socket_sensor_current
    entity_id: "${socket_current}"
```

К ним мы также позже вернемся чтобы определить `действия` при получении значений с датчиков.

## LVGL интерфейс

**Назначение**: Создает визуальный интерфейс виджета.

### Структура страницы:

Чтобы соответствовать дизайну нашей прошивки, мы создадим страницу в которой будет 7 блоков:

```yaml
lvgl:
  pages:
    - id: socket_page                 # Уникальный индификатор страницы
      bg_color: color_slate_blue_gray # Цвет фона
      widgets:                        # Список виджетов

        # Объект с состоянием
        - obj:
            id: socket_state
            x: 20
            y: 20
            width: 440
            height: 60
            align: top_left
            pad_all: 0
            bg_color: color_steel_blue
            bg_opa: 20%
            border_opa: transp
            border_width: 0
            shadow_opa: transp
            radius: 10

        # Объект с кнопкой включения/выключения розетки 
        - obj:
            id: socket_icon_bg
            x: 20
            y: 100
            width: 210
            height: 280
            align: top_left
            pad_all: 0
            bg_color: color_steel_blue
            bg_opa: 20%
            border_opa: transp
            border_width: 0
            shadow_opa: transp
            radius: 10

        # Объект с идикатором мощности
        - obj:
            id: socket_power_bg
            x: 250
            y: 100
            width: 210
            height: 80
            align: top_left
            pad_all: 0
            bg_color: color_steel_blue
            bg_opa: 20%
            border_opa: transp
            border_width: 0
            shadow_opa: transp
            radius: 10

        # Объект с идикатором напряжения
        - obj:
            id: socket_voltage_bg
            x: 250
            y: 200
            width: 210
            height: 80
            align: top_left
            pad_all: 0
            bg_color: color_steel_blue
            bg_opa: 20%
            border_opa: transp
            border_width: 0
            shadow_opa: transp
            radius: 10

        # Объект с идикатором силы тока
        - obj:
            id: socket_current_bg
            x: 250
            y: 300
            width: 210
            height: 80
            align: top_left
            pad_all: 0
            bg_color: color_steel_blue
            bg_opa: 20%
            border_opa: transp
            border_width: 0
            shadow_opa: transp
            radius: 10

        # Кнопка выхода
        - obj:
            id: socket_back_bg
            x: 20
            y: 400
            width: 60
            height: 60
            align: top_left
            pad_all: 0
            bg_color: color_steel_blue
            bg_opa: 20%
            border_opa: transp
            border_width: 0
            shadow_opa: transp
            radius: 10

        # Имя
        - obj:
            id: socket_name_bg
            x: 100
            y: 400
            width: 360
            height: 60
            align: top_left
            pad_all: 0
            bg_color: color_steel_blue
            bg_opa: 20%
            border_opa: transp
            border_width: 0
            shadow_opa: transp
            radius: 10
```

Все объекты имеют одинаковую структуру, но разные размеры и координаты, например:
```yaml
- obj:
    id: socket_state             # Уникальный идентификатор виджета
    x: 20                        # Координата X
    y: 20                        # Координата Y
    width: 440                   # Ширина виджета в пикселях
    height: 60                   # Высота виджета в пикселях
    align: top_left              # Выравнивание (вверху слева)
    pad_all: 0                   # Убираем все отступы
    bg_color: color_steel_blue   # Цвет фона
    bg_opa: 20%                  # Прозрачность фона
    border_opa: transp           # Прозрачность обводки (полная)
    border_width: 0              # Толщина обводки
    shadow_opa: transp           # Прозрачность тени (полная)
    radius: 10                   # Скругляем края
```

Теперь нам надо наполнить наши блоки контентом

### Блок состояния

Добавляем в наш блок текст, который будет отображать состояние розетки (включена или выключена):
```yaml{16-22}
# Объект с состоянием
- obj:
    id: socket_state
    x: 20
    y: 20
    width: 440
    height: 60
    align: top_left
    pad_all: 0
    bg_color: color_steel_blue
    bg_opa: 20%
    border_opa: transp
    border_width: 0
    shadow_opa: transp
    radius: 10
    widgets:
      - label:                           # Виджет текст
          id: socket_state_label         # Уникальный идентификатор
          align: center                  # Выравнивание относительно нашего блока, а не страницы
          text_font: nunito_18           # Шрифт (размер)
          text_color: color_misty_blue   # Цвет шрифта
          text: " "                      # Тест (оставляем пустым, передадим через действие)
```

Теперь возвращаемя к сенсору, который отвечает за состояние. Добавляем ему действие (что надо сделать при получении значения в сенсор):
```yaml{7-10,12-22}
text_sensor:

  # Состояние розетки
  - platform: homeassistant
    id: socket_sensor_state
    entity_id: "${socket_entity}"
    on_value:
      - lvgl.label.update:
          id: socket_state_label
          text: !lambda return x;

      - if:
          condition:
            lambda: 'return x == "on";'
          then:
            - lvgl.label.update:
                id: socket_icon_label
                text_color: color_yellow
          else:
            - lvgl.label.update:
                id: socket_icon_label
                text_color: color_misty_blue
```

Добавляем `on_value` (при получении значения), указываем сделать два действия:
- Обновить виджет с id `socket_state_label`. Передать ему в `text` значение `x` (сырое значение сенсора) вместо пустого, что мы установили
- Обновить виджет с id `socket_icon_label`. Передать ему цвет в зависимости от состояния. Иными словами, тут условие, если сенсор состояния получает значение `on`, то значок становится желтым цветом, в противном случае цвет будет `color_misty_blue`

### Блок-кнопка с индикацией

Добавляем в наш блок текст (значок), c индикацией состояние розетки (включена или выключена):
```yaml{16-22}
# Объект с кнопкой включения/выключения розетки 
- obj:
    id: socket_icon_bg
    x: 20
    y: 100
    width: 210
    height: 280
    align: top_left
    pad_all: 0
    bg_color: color_steel_blue
    bg_opa: 20%
    border_opa: transp
    border_width: 0
    shadow_opa: transp
    radius: 10
    widgets:
      - label:
          id: socket_icon_label 
          align: center
          text_font: mdi_icons_160
          text_color: color_misty_blue
          text: "${socket_icon}"
```
Делаем из блока кнопку, вызывая службу home assistant `switch.toggle`
```yaml{23-28}
# Объект с кнопкой включения/выключения розетки 
- obj:
    id: socket_icon_bg
    x: 20
    y: 100
    width: 210
    height: 280
    align: top_left
    pad_all: 0
    bg_color: color_steel_blue
    bg_opa: 20%
    border_opa: transp
    border_width: 0
    shadow_opa: transp
    radius: 10
    widgets:
      - label:
          id: socket_icon_label
          align: center
          text_font: mdi_icons_160
          text_color: color_misty_blue
          text: "${socket_icon}"
    on_click:                               # Действие по клику
      - homeassistant.action:               # Вызываем службу Home Assistant
          action: switch.toggle             # Название службы (переключение выключателя)
          data:
            entity_id: "${socket_entity}".  # Наша сущность
```
В предыдущем разделе мы уже добавили действие этому виджету со сменой цвета значка.

### Блоки с индикацией мощности, напряжения и силы тока

Добавляем в наш блок мощности 3 текста:
- значок 
- значение
- единицы измерения
```yaml{16-37}
# Объект с идикатором мощности
- obj:
    id: socket_power_bg
    x: 250
    y: 100
    width: 210
    height: 80
    align: top_left
    pad_all: 0
    bg_color: color_steel_blue
    bg_opa: 20%
    border_opa: transp
    border_width: 0
    shadow_opa: transp
    radius: 10
    widgets:
      - label:
          id: socket_power_icon_label
          x: 10                             # Делаем небольшой отступ слева
          align: left_mid
          text_font: mdi_icons_40           # Иконочный шрифт
          text_color: color_misty_blue
          text: "${socket_power_icon}"      # Иконка из substitutions
      - label:
          id: socket_power_state_label
          x: 70                             # Делаем отступ от значка
          align: left_mid
          text_font: nunito_18
          text_color: color_misty_blue
          text: " "                         # Пустое поле, передадим действием
      - label:
          id: socket_power_state_uom_label
          x: 140                            # Делаем отступ от значка
          align: left_mid
          text_font: nunito_18
          text_color: color_misty_blue
          text: " "                         # Пустое поле, передадим действием
```
Возвращаемся к нашим сенсорам мощности и добавляем им действия:
```yaml{7-10,16-23}
text_sensor:
  # Единицы измерения мощности
  - platform: homeassistant
    id: socket_sensor_power_uom
    entity_id: "${socket_power}"
    attribute: unit_of_measurement
    on_value:
      - lvgl.label.update:
          id: socket_power_state_uom_label
          text: !lambda return x;
sensor:
    # Значение мощности
  - platform: homeassistant
    id: socket_sensor_power
    entity_id: "${socket_power}"
    on_value:
      - lvgl.label.update:
          id: socket_power_state_label
          text: !lambda |-
            if (isnan(x)) return "N/A";
            char buf[16];
            snprintf(buf, sizeof(buf), "%.1f", x);
            return buf;
```
И если с первым сенсором все понятно, то со вторым могут возникнуть вопросы, поясню что здесь происходит:

```cpp
if (isnan(x)) return "N/A";
char buf[16];
snprintf(buf, sizeof(buf), "%.1f", x);
return buf;
```

1. **Проверка на нечисловое значение**:
   ```cpp
   if (isnan(x)) return "N/A";
   ```
   - `isnan(x)` - Проверяет, является ли значение `x` нечисловым (NaN)
   - `return "N/A"` - Возвращает "N/A" если значение невалидное

2. **Создание буфера**:
   ```cpp
   char buf[16];
   ```
   - Создаёт символьный буфер на 16 байт
   - Достаточно для хранения чисел формата `-123456.789`

3. **Форматированный вывод**:
   ```cpp
   snprintf(buf, sizeof(buf), "%.1f", x);
   ```
   | Параметр        | Описание                                                                 |
   |-----------------|--------------------------------------------------------------------------|
   | `buf`           | Буфер для записи результата                                              |
   | `sizeof(buf)`   | Максимальный размер данных (16 байт)                                     |
   | `"%.1f"`        | Шаблон форматирования (1 знак после точки)                               |
   | `x`             | Входное значение сенсора                                                 |

4. **Возврат результата**:
   ```cpp
   // Возвращает отформатированную строку
   return buf;
   ```

Для разных сенсоров используйте:

```cpp
// Для мощности и напряжения (1 знак)
snprintf(buf, sizeof(buf), "%.1f", x);

// Для силы тока (3 знака)
snprintf(buf, sizeof(buf), "%.3f", x);
```

#### Примеры преобразования

Входное значение | Формат | Результат
----------------|--------|----------
`23.456789`     | `%.1f` | `23.5`
`0.123456`      | `%.3f` | `0.123`
`NaN`           | -      | `N/A`

С напряжением и силой тока все аналогично

### Блок с кнопкой возвращения в меню

Добавляем текст с иконкой и действие при нажатии:
```yaml{16-25}
# Кнопка выхода
- obj:
    id: socket_back_bg
    x: 20
    y: 400
    width: 60
    height: 60
    align: top_left
    pad_all: 0
    bg_color: color_steel_blue
    bg_opa: 20%
    border_opa: transp
    border_width: 0
    shadow_opa: transp
    radius: 10
    widgets:
      - label:
          id: socket_back_label
          align: center
          text_font: icons_28
          text_color: color_misty_blue
          text: "${exit_icon}"
    on_press:
      - lvgl.page.show: devices_page           # Показываем страницу Devices вместо текущей
      - lvgl.widget.show: menu_controls_main   # Показываем кнопки меню
```

### Блок с названием сущности

Добавляем текст:
```yaml{16-22}
# Имя
- obj:
    id: socket_name_bg
    x: 100
    y: 400
    width: 360
    height: 60
    align: top_left
    pad_all: 0
    bg_color: color_steel_blue
    bg_opa: 20%
    border_opa: transp
    border_width: 0
    shadow_opa: transp
    radius: 10
    widgets:
      - label:
          id: socket_name_label
          align: center
          text_font: nunito_18
          text_color: color_misty_blue
          text: "friendly name"
```
Возвращаемся к сенсору имени и добавляем действие:
```yaml{6-9}
  # Имя розетки
  - platform: homeassistant
    id: socket_sensor_name
    entity_id: "${socket_entity}"
    attribute: friendly_name
    on_value:
      - lvgl.label.update:
          id: socket_name_label
          text: !lambda return x;
```

## Итоговый код нашего виджета
```yaml
substitutions:

  socket_entity:  "switch.rozetka_test_socket"
  socket_power:   "sensor.rozetka_test_power"   # Мощность
  socket_voltage: "sensor.rozetka_test_voltage" # Напряжение
  socket_current: "sensor.rozetka_test_current" # Сила тока

  socket_icon:          "\U000F1107"
  socket_current_icon:  "\U000F1480"
  socket_voltage_icon:  "\U000F095B"
  socket_power_icon:    "\U000F0241"

text_sensor:

  # Состояние розетки
  - platform: homeassistant
    id: socket_sensor_state
    entity_id: "${socket_entity}"
    on_value:
      - lvgl.label.update:
          id: socket_state_label
          text: !lambda return x;

      - if:
          condition:
            lambda: 'return x == "on";'
          then:
            - lvgl.label.update:
                id: socket_icon_label
                text_color: color_yellow
          else:
            - lvgl.label.update:
                id: socket_icon_label
                text_color: color_misty_blue

  # Имя розетки
  - platform: homeassistant
    id: socket_sensor_name
    entity_id: "${socket_entity}"
    attribute: friendly_name
    on_value:
      - lvgl.label.update:
          id: socket_name_label
          text: !lambda return x;

  # Единицы измерения мощности
  - platform: homeassistant
    id: socket_sensor_power_uom
    entity_id: "${socket_power}"
    attribute: unit_of_measurement
    on_value:
      - lvgl.label.update:
          id: socket_power_state_uom_label
          text: !lambda return x;

  # Единицы измерения напряжения
  - platform: homeassistant
    id: socket_sensor_voltage_uom
    entity_id: "${socket_voltage}"
    attribute: unit_of_measurement
    on_value:
      - lvgl.label.update:
          id: socket_voltage_state_uom_label
          text: !lambda return x;

  # Единицы измерения силы тока
  - platform: homeassistant
    id: socket_sensor_current_uom
    entity_id: "${socket_current}"
    attribute: unit_of_measurement
    on_value:
      - lvgl.label.update:
          id: socket_current_state_uom_label
          text: !lambda return x;

sensor:
  # Значение мощности
  - platform: homeassistant
    id: socket_sensor_power
    entity_id: "${socket_power}"
    on_value:
      - lvgl.label.update:
          id: socket_power_state_label
          text: !lambda |-
            if (isnan(x)) return "N/A";
            char buf[16];
            snprintf(buf, sizeof(buf), "%.1f", x);
            return buf;

  # Значение напряжения
  - platform: homeassistant
    id: socket_sensor_voltage
    entity_id: "${socket_voltage}"
    on_value:
      - lvgl.label.update:
          id: socket_voltage_state_label
          text: !lambda |-
            if (isnan(x)) return "N/A";
            char buf[16];
            snprintf(buf, sizeof(buf), "%.1f", x);
            return buf;

  # Значение силы тока
  - platform: homeassistant
    id: socket_sensor_current
    entity_id: "${socket_current}"
    on_value:
      - lvgl.label.update:
          id: socket_current_state_label
          text: !lambda |-
            if (isnan(x)) return "N/A";
            char buf[16];
            snprintf(buf, sizeof(buf), "%.3f", x);
            return buf;


lvgl:
  pages:
    - id: socket_page
      bg_color: color_slate_blue_gray
      widgets:

        # Объект с состоянием
        - obj:
            id: socket_state
            x: 20
            y: 20
            width: 440
            height: 60
            align: top_left
            pad_all: 0
            bg_color: color_steel_blue
            bg_opa: 20%
            border_opa: transp
            border_width: 0
            shadow_opa: transp
            radius: 10
            widgets:
              - label:
                  id: socket_state_label
                  align: center
                  text_font: nunito_18
                  text_color: color_misty_blue
                  text: " "

        # Объект с кнопкой включения/выключения розетки 
        - obj:
            id: socket_icon_bg
            x: 20
            y: 100
            width: 210
            height: 280
            align: top_left
            pad_all: 0
            bg_color: color_steel_blue
            bg_opa: 20%
            border_opa: transp
            border_width: 0
            shadow_opa: transp
            radius: 10
            widgets:
              - label:
                  id: socket_icon_label
                  align: center
                  text_font: mdi_icons_160
                  text_color: color_misty_blue
                  text: "${socket_icon}"
            on_click:
              - homeassistant.action:
                  action: switch.toggle
                  data:
                    entity_id: "${socket_entity}"

        # Объект с идикатором мощности
        - obj:
            id: socket_power_bg
            x: 250
            y: 100
            width: 210
            height: 80
            align: top_left
            pad_all: 0
            bg_color: color_steel_blue
            bg_opa: 20%
            border_opa: transp
            border_width: 0
            shadow_opa: transp
            radius: 10
            widgets:
              - label:
                  id: socket_power_icon_label
                  x: 10
                  align: left_mid
                  text_font: mdi_icons_40
                  text_color: color_misty_blue
                  text: "${socket_power_icon}"
              - label:
                  id: socket_power_state_label
                  x: 70
                  align: left_mid
                  text_font: nunito_18
                  text_color: color_misty_blue
                  text: " "
              - label:
                  id: socket_power_state_uom_label
                  x: 140
                  align: left_mid
                  text_font: nunito_18
                  text_color: color_misty_blue
                  text: " "

        # Объект с идикатором напряжения
        - obj:
            id: socket_voltage_bg
            x: 250
            y: 200
            width: 210
            height: 80
            align: top_left
            pad_all: 0
            bg_color: color_steel_blue
            bg_opa: 20%
            border_opa: transp
            border_width: 0
            shadow_opa: transp
            radius: 10
            widgets:
              - label:
                  id: socket_voltage_icon_label
                  x: 10
                  align: left_mid
                  text_font: mdi_icons_40
                  text_color: color_misty_blue
                  text: "${socket_voltage_icon}"
              - label:
                  id: socket_voltage_state_label
                  x: 70
                  align: left_mid
                  text_font: nunito_18
                  text_color: color_misty_blue
                  text: " "
              - label:
                  id: socket_voltage_state_uom_label
                  x: 140
                  align: left_mid
                  text_font: nunito_18
                  text_color: color_misty_blue
                  text: " "

        # Объект с идикатором силы тока
        - obj:
            id: socket_current_bg
            x: 250
            y: 300
            width: 210
            height: 80
            align: top_left
            pad_all: 0
            bg_color: color_steel_blue
            bg_opa: 20%
            border_opa: transp
            border_width: 0
            shadow_opa: transp
            radius: 10
            widgets:
              - label:
                  id: socket_current_icon_label
                  x: 10
                  align: left_mid
                  text_font: mdi_icons_40
                  text_color: color_misty_blue
                  text: "${socket_current_icon}"
              - label:
                  id: socket_current_state_label
                  x: 70
                  align: left_mid
                  text_font: nunito_18
                  text_color: color_misty_blue
                  text: " "
              - label:
                  id: socket_current_state_uom_label
                  x: 140
                  align: left_mid
                  text_font: nunito_18
                  text_color: color_misty_blue
                  text: " "

        # Кнопка выхода
        - obj:
            id: socket_back_bg
            x: 20
            y: 400
            width: 60
            height: 60
            align: top_left
            pad_all: 0
            bg_color: color_steel_blue
            bg_opa: 20%
            border_opa: transp
            border_width: 0
            shadow_opa: transp
            radius: 10
            widgets:
              - label:
                  id: socket_back_label
                  align: center
                  text_font: icons_28
                  text_color: color_misty_blue
                  text: "${exit_icon}"
            on_press:
              - lvgl.page.show: devices_page
              - lvgl.widget.show: menu_controls_main

        # Имя
        - obj:
            id: socket_name_bg
            x: 100
            y: 400
            width: 360
            height: 60
            align: top_left
            pad_all: 0
            bg_color: color_steel_blue
            bg_opa: 20%
            border_opa: transp
            border_width: 0
            shadow_opa: transp
            radius: 10
            widgets:
              - label:
                  id: socket_name_label
                  align: center
                  text_font: nunito_18
                  text_color: color_misty_blue
                  text: "friendly name"
```
## Кнопка для отображения виджета

Итак, мы создали виджет, но как же его интегрировать в существующую прошивку?
Для этого нам надо подключить наш виджет в `devices.yaml` и добавить кнопку перехода.

**Подключаем виджет**
```yaml{8}
packages:
  media_player: !include media_player/media_player.yaml
  vacuum: !include vacuum/vacuum_widget.yaml
  shutter: !include shutter/shutter_config.yaml
  thermostat: !include thermostat/thermostat_widget.yaml
  air_conditioner: !include air_conditioner/air_conditioner_widget.yaml
  alarm_panel: !include alarm_panel/alarm_panel.yaml
  socket: !include socket/socket_widget.yaml
```
**Подключаем кнопку**
```yaml
              - obj:
                  y: 260
                  width: 440
                  height: 60
                  pad_all: 0
                  align: TOP_MID
                  bg_opa: TRANSP
                  shadow_opa: TRANSP
                  border_opa: TRANSP
                  border_width: 0
                  radius: 10
                  widgets:
                    - button:
                        id: socket_page_btn
                        x: 35
                        align: LEFT_MID
                        width: 370
                        height: 60
                        radius: 10
                        bg_color: color_slate_blue_gray
                        shadow_opa: TRANSP
                        widgets:
                          - label:
                              align: CENTER
                              text_color: color_steel_blue
                              text_font: mdi_icons_40
                              text: "${socket_icon}"
                        on_press:
                          - lvgl.widget.hide: menu_controls_main
                          - lvgl.page.show: 
                              id: socket_page
                              animation: OUT_RIGHT
                              time: 300ms
```
::: warning ВАЖНО
Обратите внимание на количество отступов
:::

## Заключение

Вот результат который у нас получился:
<div style="display: flex; gap: 20px; align-items: flex-start;">
  <img src="/images/custom_widget_1.png" alt="Скриншот 1" style="width: 48%;">
  <img src="/images/custom_widget_2.png" alt="Скриншот 2" style="width: 48%;">
</div>

Данный пример демонстрирует лишь малую часть возможностей LVGL в ESPHome и может служить основой для создания более сложных и функциональных пользовательских интерфейсов.