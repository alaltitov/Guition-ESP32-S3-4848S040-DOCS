# Страница загрузки

Страница загрузки отображается при запуске дисплея и показывает процесс подключения к Home Assistant и синхронизации данных. Код отвечающий за данную страницу находится в файле `loading_page.yaml`. Сделана она для улучшения пользовательского опыта, чтобы пользователь при подключении и синхронизации с Home Assistant не видел пустых виджетов и заглушек.

## Обзор функциональности

### **Основные задачи:**
- Отображение статуса подключения к Home Assistant API
- Визуализация процесса синхронизации данных
- Плавный переход к основному интерфейсу
- Информирование пользователя о текущем состоянии системы

### **Визуальные элементы:**
- Логотип Home Assistant (верх экрана)
- Индикатор подключения со спиннером
- Прогресс-бар синхронизации
- Логотип ESPHome (низ экрана)

## Структура компонентов

### **Основной контейнер**
```yaml
- button:
    id: loading_page
    bg_color: color_slate_blue_gray
    width: 100%
    height: 100%
```

- **Тип:** Полноэкранная кнопка-контейнер
- **Цвет фона:** `color_slate_blue_gray`
- **Размер:** 100% экрана
- **Назначение:** Основа для всех элементов загрузки

::: info ПРИМЕЧАНИЕ
Будет изменен на `obj`чтобы не моргал цвет при нажатии
:::

### **Логотип Home Assistant**
```yaml
- image:
    y: 30
    align: TOP_MID
    src: ha_img
```

- **Отступ:** `30px` от верха
- **Позиция:** Верх экрана, по центру
- **Источник:** `ha_img` (должен быть определен в разделе `image`)

### **Блок подключения к API**
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

**Компоненты:**
- **Текстовая метка:** Статус подключения
- **Спиннер:** Анимированный индикатор загрузки
- **Размеры:** 300x100 px
- **Позиция:** Центр экрана

### **Блок синхронизации**
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

**Характеристики:**
- **Изначально скрыт:** `hidden: true`
- **Прогресс-бар:** От 0 до 100 %
- **Анимация:** Плавное заполнение
- **Цвета:** `color_steel_blue` / `color_misty_blue`

## Логика работы

### **Глобальные переменные**
```yaml
globals:
  - id: ha_connected
    type: bool
    initial_value: 'false'
```

- **Назначение:** Отслеживание состояния подключения
- **Тип:** Булево значение
- **Начальное значение:** `false`

### **Скрипты управления**

#### 1️⃣ **Проверка статуса загрузки**
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

**Функции:**
- Скрывает блок подключения
- Показывает блок синхронизации
- Запускает анимацию прогресса

#### 2️⃣ **Анимация синхронизации**
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

**Этапы:**
1. Задержка 1 секунда
2. Прогресс 50%
3. Задержка 1 секунда  
4. Прогресс 100%
5. Задержка 500мс
6. Скрытие страницы загрузки

#### 3️⃣ **Обработка подключения**
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

**Действия:**
- Устанавливает флаг подключения
- Меняет текст на "Connected!"
- Скрывает спиннер
- Запускает проверку статуса

## API события

### **Подключение клиента**
```yaml
api:
  on_client_connected:
    - lambda: |-
        if (0 == client_info.find("Home Assistant ")) {
          id(on_ha_connected).execute();
        }
```

- **Триггер:** Подключение API клиента
- **Условие:** Клиент содержит "Home Assistant "
- **Действие:** Выполнение скрипта подключения

### **Отключение клиента**
```yaml
on_client_disconnected:
  - lambda: |-
      if (0 == client_info.find("Home Assistant ")) {
        id(ha_connected) = false;
      }
```

- **Триггер:** Отключение API клиента
- **Действие:** Сброс флага подключения

## Стилизация

### **Цветовая схема**
| Элемент | Цвет | Назначение |
|---------|------|------------|
| Фон | `color_slate_blue_gray` | Основной фон |
| Текст | `color_misty_blue` | Текстовые элементы |
| Прогресс (фон) | `color_steel_blue` | Неактивная часть бара |
| Прогресс (индикатор) | `color_misty_blue` | Активная часть бара |
| Спиннер | `color_steel_blue` / `color_misty_blue` | Анимация загрузки |

### **Размеры и позиционирование**
```yaml
# Основные размеры
loading_page: 100% x 100%          # Полный экран
boot_homeassistant: 300px x 100px  # Блок подключения
boot_synchronization: 300px x 60px # Блок синхронизации
spinner: 50px x 50px               # Размер спиннера

# Позиции
ha_logo: TOP_MID, y: 30           # Логотип HA сверху
connection_block: TOP_MID, y: 180 # Блок подключения
sync_block: TOP_MID, y: 180       # Блок синхронизации
esphome_logo: BOTTOM_MID, y: -30  # Логотип ESPHome снизу
```

## Настройка и кастомизация

### **Изменение времени анимации**
```yaml
# В скрипте start_sync_animation
- delay: 2s  # Увеличить до 2 секунд
- lvgl.bar.update:
    id: boot_synchronization_bar
    value: 30  # Первый этап 30%
- delay: 1s
- lvgl.bar.update:
    id: boot_synchronization_bar
    value: 70  # Второй этап 70%
- delay: 1s
- lvgl.bar.update:
    id: boot_synchronization_bar
    value: 100  # Завершение
```

### **Изменение текстов**
```yaml
# Кастомные сообщения
text: "Подключение к серверу..."     # Русский
text: "Conectando al servidor..."    # Испанский
text: "Connexion au serveur..."      # Французский
```

### **Замена изображений**
```yaml
# Добавление собственных логотипов
image:
  - file: "img/loading/custom_logo.png"
    id: custom_logo
    resize: 100x50

# Использование в загрузке
- image:
    src: custom_logo
    align: TOP_MID
```