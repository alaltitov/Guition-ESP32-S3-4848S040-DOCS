# Кнопки меню навигации

Система навигационных кнопок обеспечивает быстрый доступ к основным разделам интерфейса дисплея. Меню располагается в нижней части экрана и содержит 4 основные кнопки.

## Обзор системы меню

### **Основные функции:**
- Навигация между страницами интерфейса
- Визуальная индикация активной страницы
- Плавные анимации переходов

### **Структура меню:**
| Кнопка | Иконка | Страница | Назначение |
|--------|--------|----------|------------|
| Home | `${home_icon}` | `home_page` | Главная страница |
| Lights | `${ceiling_icon}` | `lights_group_page` | Управление освещением |
| Devices | `${devices_icon}` | `devices_page` | Устройства |
| Settings | `${settings_icon}` | `settings_page` | Настройки устройства |

## Структура контейнера меню

### **Основной контейнер**
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

**Характеристики контейнера:**
- **Позиция:** Внизу экрана с отступом 20px
- **Размер:** 440x80 пикселей
- **Фон:** Полупрозрачный `color_steel_blue` (20% прозрачности)
- **Макет:** Flex с равномерным распределением кнопок
- **Отступы:** 10px со всех сторон
- **Радиус:** 10px для скругленных углов

## Структура кнопок

### **Кнопка "Главная" (Home)**
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

**Особенности:**
- **Размер:** 60x60 пикселей (квадратная)
- **Фон по умолчанию:** `color_slate_blue_gray` (активная)
- **Иконка:** Центрированная, размер шрифта 36px
- **Цвет иконки:** `color_steel_blue`

### **Кнопка "Освещение" (Lights)**
```yaml
- button:
    id: lights_group_page_btn
    bg_opa: TRANSP  # Изначально прозрачная
    widgets:
      - label:
          text: "${ceiling_icon}"
```

**Отличия:**
- **Фон:** Изначально прозрачный (`TRANSP`)
- **Иконка:** Символ потолочного освещения
- **Активация:** При нажатии получает фон

### **Кнопка "Устройства" (Devices)**
```yaml
- button:
    id: devices_page_btn
    widgets:
      - label:
          text: "${devices_icon}"
```

### **Кнопка "Настройки" (Settings)**
```yaml
- button:
    id: settings_page_btn
    widgets:
      - label:
          text: "${settings_icon}"
```

## Логика навигации

### **Механизм переключения**

Каждая кнопка выполняет следующие действия при нажатии:

#### 1️⃣ **Переход на страницу**
```yaml
on_press:
  - lvgl.page.show: 
      id: home_page
      animation: OUT_RIGHT
      time: 300ms
```

- **Анимация:** `OUT_RIGHT` (выезд справа)
- **Время:** 300 миллисекунд
- **Плавность:** Встроенные LVGL переходы

#### 2️⃣ **Активация текущей кнопки**
```yaml
- lvgl.button.update:
    id: home_page_btn
    bg_color: color_slate_blue_gray
    bg_opa: 100%
```

- **Фон:** Устанавливается `color_slate_blue_gray`
- **Прозрачность:** 100% (полностью непрозрачный)
- **Визуальный эффект:** Кнопка становится выделенной

#### 3️⃣ **Деактивация остальных кнопок**
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

- **Эффект:** Все неактивные кнопки становятся прозрачными
- **Результат:** Четкое выделение активной страницы

## Система стилизации

### **Цветовая схема**
| Элемент | Цвет | Состояние | Описание |
|---------|------|-----------|----------|
| Контейнер | `color_steel_blue` | 20% прозрачность | Фон панели меню |
| Активная кнопка | `color_slate_blue_gray` | 100% непрозрачность | Выделение текущей страницы |
| Неактивная кнопка | - | Прозрачный | Скрытый фон |
| Иконки | `color_steel_blue` | 100% непрозрачность | Все иконки одинакового цвета |
