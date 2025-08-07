::: danger ВАЖНО
Как произойдет релиз прошивки, данная документация будет изменена.
:::

# Добавление нового языка в прошивку

Данное руководство покажет, как добавить поддержку нового языка (на примере `словацкого`) в систему переводов прошивки на основе представленного конфигурационного файла.

::: warning ВНИМАНИЕ
К релизу в меню будет всего несколько языков (в целях оптимизации памяти), так как по факту в большинстве случаев нужно будет максимум два (английский и родной). Но останется возможность добавить свой язык. Значки (картинки) большинства языков будут доступны в репозитории.
:::

::: info ПРИМИЧАНИЕ
В настоящий момент поддерживается только кириллица, латиница и вьетнамские символы. Для поддержки мультиязычности, например с китайскими иероглифами, нужен будет дополнительный шрифт с поддержкой этих глифов через новый компонент ESPHome, который пока тестируется. 
:::

## Шаги для добавления нового языка

### Шаг 1: Добавление изображения флага

Сначала необходимо добавить изображение флага для нового языка в файл `image.yaml` в секцию `FLAGS`

```yaml
- file: 'img/flags/sk.png'
  id: flags_sk_img
  type: rgb565
  resize: 60x80
  transparency: alpha_channel
```

### Шаг 2: Обновление mapping секций

Добавьте новый язык во все три mapping секции с новым индексом.

#### 2.1 Обновление flag_icon_mapping_image

```yaml
mapping:
  - id: flag_icon_mapping_image
    from: int
    to: image
    entries:
      # ... существующие записи ...
      18: flags_sk_img  # Новый индекс для словацкого
```

#### 2.2 Обновление flag_icon_mapping_name

```yaml
  - id: flag_icon_mapping_name
    from: int
    to: string
    entries:
      # ... существующие записи ...
      18: sk  # Код языка для словацкого
```

#### 2.3 Обновление flag_icon_mapping_index

```yaml
  - id: flag_icon_mapping_index
    from: string
    to: int
    entries:
      # ... существующие записи ...
      sk: 18  # Обратное сопоставление
```

### Шаг 3: Добавление опции в dropdown

Обновите список опций в language_dropdown, добавив название языка на соответствующем языке.

```yaml
dropdown: 
  id: language_dropdown
  options: 
    - Deutsch          # de
    - Español          # es
    - Français         # fr
    - English (GB)     # en-GB
    - Italiano         # it
    - Português        # pt
    - Русский          # ru
    - English (US)     # en
    - Polski           # pl
    - Türkçe           # tr
    - Svenska          # sv
    - Română           # ro
    - Nederlands       # nl
    - Magyar           # hu
    - Bahasa Indonesia # id
    - Tiếng Việt       # vi
    - Čeština          # cs
    - Suomi            # fi
    - Slovenčina       # sk - НОВЫЙ ЯЗЫК
```

::: danger ВАЖНО
Порядок в dropdown должен соответствовать индексам в mapping! Словацкий язык с индексом 18 должен быть 19-м элементом в списке (индексация начинается с 0).
:::

## Полный пример добавления словацкого языка

### Изменения в конфигурации:

#### 1. В файле image.yaml (добавить):

```yaml
- file: 'img/flags/sk.png'
  id: flags_sk_img
  type: rgb565
  resize: 60x80
  transparency: alpha_channel
```

#### 2. Обновленные mapping секции:

```yaml
mapping:
  - id: flag_icon_mapping_image
    from: int
    to: image
    entries:
      0: flags_de_img
      1: flags_es_img
      2: flags_fr_img
      3: flags_gb_img
      4: flags_it_img
      5: flags_pt_img
      6: flags_ru_img
      7: flags_us_img
      8: flags_pl_img
      9: flags_tr_img
      10: flags_sv_img
      11: flags_ro_img
      12: flags_nl_img
      13: flags_hu_img
      14: flags_id_img
      15: flags_vi_img
      16: flags_cs_img
      17: flags_fi_img
      18: flags_sk_img  # НОВЫЙ

  - id: flag_icon_mapping_name
    from: int
    to: string
    entries:
      0: de
      1: es
      2: fr
      3: en-GB
      4: it
      5: pt
      6: ru
      7: en
      8: pl
      9: tr
      10: sv
      11: ro
      12: nl
      13: hu
      14: id
      15: vi
      16: cs
      17: fi
      18: sk  # НОВЫЙ

  - id: flag_icon_mapping_index
    from: string
    to: int
    entries:
      de: 0
      es: 1
      fr: 2
      en-GB: 3
      it: 4
      pt: 5
      ru: 6
      en: 7
      pl: 8
      tr: 9
      sv: 10
      ro: 11
      nl: 12
      hu: 13
      id: 14
      vi: 15
      cs: 16
      fi: 17
      sk: 18  # НОВЫЙ
```

#### 3. Обновленный dropdown:

```yaml
dropdown: 
  id: language_dropdown
  options: 
    - Deutsch          # de - индекс 0
    - Español          # es - индекс 1
    - Français         # fr - индекс 2
    - English (GB)     # en-GB - индекс 3
    - Italiano         # it - индекс 4
    - Português        # pt - индекс 5
    - Русский          # ru - индекс 6
    - English (US)     # en - индекс 7
    - Polski           # pl - индекс 8
    - Türkçe           # tr - индекс 9
    - Svenska          # sv - индекс 10
    - Română           # ro - индекс 11
    - Nederlands       # nl - индекс 12
    - Magyar           # hu - индекс 13
    - Bahasa Indonesia # id - индекс 14
    - Tiếng Việt       # vi - индекс 15
    - Čeština          # cs - индекс 16
    - Suomi            # fi - индекс 17
    - Slovenčina       # sk - индекс 18
```

## Дополнительные настройки

### Изменение языка по умолчанию

Если вы хотите установить новый язык как язык по умолчанию, измените значение в глобальной переменной:

```yaml
globals:
  - id: current_language
    type: int
    restore_value: yes
    initial_value: '18'  # Для словацкого языка
```

### Коды языков

::: warning ВАЖНО
Используйте стандартные ISO 639-1 коды языков:
 
- `sk` - словацкий
- `ja` - японский
- `ko` - корейский
- `zh` - китайский
- `ar` - арабский
- `hi` - хинди
- И другие...
:::

## Проверка работы

1. Загрузите обновленную конфигурацию в ESPHome
2. Перейдите на страницу настроек дисплея
3. Откройте dropdown с языками
4. Выберите новый язык
5. Убедитесь, что флаг отображается корректно
6. Проверьте, что переводы загружаются для нового языка

::: info ПРИМЕЧАНИЕ
Для корректной работы переводов убедитесь, что в Home Assistant настроен компонент `display_tools` и он поддерживает добавляемый язык.
:::

## Устранение неполадок

| Проблема | Решение |
|----------|---------|
| Флаг не отображается | Проверьте путь к файлу изображения и его формат |
| Язык не переключается | Убедитесь, что индексы в mapping совпадают с порядком в dropdown |
| Переводы не загружаются | Проверьте код языка и поддержку в display_tools |
| Ошибка компиляции | Проверьте синтаксис YAML и отступы |

::: warning ВАЖНО
Индексы ВСЕГДА должны идти подряд начиная с `0`.
:::

## Дополнительные возможности

### Добавление переводов для специфических компонентов

Если вам нужно добавить переводы для дополнительных компонентов, обновите список ключей в вызове `display_tools.get_translations_esphome`:

```yaml
- homeassistant.action:
    action: display_tools.get_translations_esphome
    data:
      language: !lambda return id(flag_icon_mapping_name).get(x).c_str();
      category: entity_component
      keys: '[
        "component.vacuum.entity_component._.state.cleaning",
        "component.vacuum.entity_component._.state.docked",
        # ... существующие ключи ...
        "component.light.entity_component._.state.on",
        "component.light.entity_component._.state.off"
      ]'
```
::: details Список всех ключей
```yaml
component.input_button.entity_component._.name
component.input_button.entity_component._.state_attributes.editable.name
component.input_button.entity_component._.state_attributes.editable.state.false
component.input_button.entity_component._.state_attributes.editable.state.true
component.notify.entity_component._.name
component.todo.entity_component._.name
component.input_text.entity_component._.name
component.input_text.entity_component._.state_attributes.editable.name
component.input_text.entity_component._.state_attributes.editable.state.false
component.input_text.entity_component._.state_attributes.editable.state.true
component.input_text.entity_component._.state_attributes.max.name
component.input_text.entity_component._.state_attributes.min.name
component.input_text.entity_component._.state_attributes.mode.name
component.input_text.entity_component._.state_attributes.mode.state.password
component.input_text.entity_component._.state_attributes.mode.state.text
component.input_text.entity_component._.state_attributes.pattern.name
component.script.entity_component._.name
component.script.entity_component._.state.off
component.script.entity_component._.state.on
component.script.entity_component._.state_attributes.current.name
component.script.entity_component._.state_attributes.last_action.name
component.script.entity_component._.state_attributes.last_triggered.name
component.script.entity_component._.state_attributes.max.name
component.script.entity_component._.state_attributes.mode.name
component.script.entity_component._.state_attributes.mode.state.parallel
component.script.entity_component._.state_attributes.mode.state.queued
component.script.entity_component._.state_attributes.mode.state.restart
component.script.entity_component._.state_attributes.mode.state.single
component.select.entity_component._.name
component.select.entity_component._.state_attributes.options.name
component.weather.entity_component._.name
component.weather.entity_component._.state.clear-night
component.weather.entity_component._.state.cloudy
component.weather.entity_component._.state.exceptional
component.weather.entity_component._.state.fog
component.weather.entity_component._.state.hail
component.weather.entity_component._.state.lightning
component.weather.entity_component._.state.lightning-rainy
component.weather.entity_component._.state.partlycloudy
component.weather.entity_component._.state.pouring
component.weather.entity_component._.state.rainy
component.weather.entity_component._.state.snowy
component.weather.entity_component._.state.snowy-rainy
component.weather.entity_component._.state.sunny
component.weather.entity_component._.state.windy
component.weather.entity_component._.state.windy-variant
component.weather.entity_component._.state_attributes.apparent_temperature.name
component.weather.entity_component._.state_attributes.cloud_coverage.name
component.weather.entity_component._.state_attributes.dew_point.name
component.weather.entity_component._.state_attributes.forecast.name
component.weather.entity_component._.state_attributes.humidity.name
component.weather.entity_component._.state_attributes.ozone.name
component.weather.entity_component._.state_attributes.precipitation_unit.name
component.weather.entity_component._.state_attributes.pressure.name
component.weather.entity_component._.state_attributes.pressure_unit.name
component.weather.entity_component._.state_attributes.temperature.name
component.weather.entity_component._.state_attributes.temperature_unit.name
component.weather.entity_component._.state_attributes.uv_index.name
component.weather.entity_component._.state_attributes.visibility.name
component.weather.entity_component._.state_attributes.visibility_unit.name
component.weather.entity_component._.state_attributes.wind_bearing.name
component.weather.entity_component._.state_attributes.wind_gust_speed.name
component.weather.entity_component._.state_attributes.wind_speed.name
component.weather.entity_component._.state_attributes.wind_speed_unit.name
component.automation.entity_component._.name
component.automation.entity_component._.state.off
component.automation.entity_component._.state.on
component.automation.entity_component._.state_attributes.current.name
component.automation.entity_component._.state_attributes.id.name
component.automation.entity_component._.state_attributes.last_triggered.name
component.automation.entity_component._.state_attributes.max.name
component.automation.entity_component._.state_attributes.mode.name
component.automation.entity_component._.state_attributes.mode.state.parallel
component.automation.entity_component._.state_attributes.mode.state.queued
component.automation.entity_component._.state_attributes.mode.state.restart
component.automation.entity_component._.state_attributes.mode.state.single
component.media_player.entity_component._.name
component.media_player.entity_component._.state.buffering
component.media_player.entity_component._.state.idle
component.media_player.entity_component._.state.off
component.media_player.entity_component._.state.on
component.media_player.entity_component._.state.paused
component.media_player.entity_component._.state.playing
component.media_player.entity_component._.state.standby
component.media_player.entity_component._.state_attributes.app_id.name
component.media_player.entity_component._.state_attributes.app_name.name
component.media_player.entity_component._.state_attributes.entity_picture_local.name
component.media_player.entity_component._.state_attributes.groups_members.name
component.media_player.entity_component._.state_attributes.is_volume_muted.name
component.media_player.entity_component._.state_attributes.is_volume_muted.state.false
component.media_player.entity_component._.state_attributes.is_volume_muted.state.true
component.media_player.entity_component._.state_attributes.media_album_artist.name
component.media_player.entity_component._.state_attributes.media_album_name.name
component.media_player.entity_component._.state_attributes.media_artist.name
component.media_player.entity_component._.state_attributes.media_channel.name
component.media_player.entity_component._.state_attributes.media_content_id.name
component.media_player.entity_component._.state_attributes.media_content_type.name
component.media_player.entity_component._.state_attributes.media_content_type.state.album
component.media_player.entity_component._.state_attributes.media_content_type.state.app
component.media_player.entity_component._.state_attributes.media_content_type.state.artist
component.media_player.entity_component._.state_attributes.media_content_type.state.channel
component.media_player.entity_component._.state_attributes.media_content_type.state.channels
component.media_player.entity_component._.state_attributes.media_content_type.state.composer
component.media_player.entity_component._.state_attributes.media_content_type.state.contributing_artist
component.media_player.entity_component._.state_attributes.media_content_type.state.episode
component.media_player.entity_component._.state_attributes.media_content_type.state.game
component.media_player.entity_component._.state_attributes.media_content_type.state.genre
component.media_player.entity_component._.state_attributes.media_content_type.state.image
component.media_player.entity_component._.state_attributes.media_content_type.state.movie
component.media_player.entity_component._.state_attributes.media_content_type.state.music
component.media_player.entity_component._.state_attributes.media_content_type.state.playlist
component.media_player.entity_component._.state_attributes.media_content_type.state.podcast
component.media_player.entity_component._.state_attributes.media_content_type.state.season
component.media_player.entity_component._.state_attributes.media_content_type.state.track
component.media_player.entity_component._.state_attributes.media_content_type.state.tvshow
component.media_player.entity_component._.state_attributes.media_content_type.state.url
component.media_player.entity_component._.state_attributes.media_content_type.state.video
component.media_player.entity_component._.state_attributes.media_duration.name
component.media_player.entity_component._.state_attributes.media_episode.name
component.media_player.entity_component._.state_attributes.media_playlist.name
component.media_player.entity_component._.state_attributes.media_position.name
component.media_player.entity_component._.state_attributes.media_position_updated_at.name
component.media_player.entity_component._.state_attributes.media_season.name
component.media_player.entity_component._.state_attributes.media_series_title.name
component.media_player.entity_component._.state_attributes.media_title.name
component.media_player.entity_component._.state_attributes.media_track.name
component.media_player.entity_component._.state_attributes.repeat.name
component.media_player.entity_component._.state_attributes.repeat.state.all
component.media_player.entity_component._.state_attributes.repeat.state.off
component.media_player.entity_component._.state_attributes.repeat.state.one
component.media_player.entity_component._.state_attributes.shuffle.name
component.media_player.entity_component._.state_attributes.shuffle.state.false
component.media_player.entity_component._.state_attributes.shuffle.state.true
component.media_player.entity_component._.state_attributes.sound_mode.name
component.media_player.entity_component._.state_attributes.sound_mode_list.name
component.media_player.entity_component._.state_attributes.source.name
component.media_player.entity_component._.state_attributes.source_list.name
component.media_player.entity_component._.state_attributes.volume_level.name
component.media_player.entity_component.receiver.name
component.media_player.entity_component.speaker.name
component.media_player.entity_component.tv.name
component.date.entity_component._.name
component.lock.entity_component._.name
component.lock.entity_component._.state.jammed
component.lock.entity_component._.state.locked
component.lock.entity_component._.state.locking
component.lock.entity_component._.state.open
component.lock.entity_component._.state.opening
component.lock.entity_component._.state.unlocked
component.lock.entity_component._.state.unlocking
component.lock.entity_component._.state_attributes.changed_by.name
component.lock.entity_component._.state_attributes.code_format.name
component.water_heater.entity_component._.name
component.water_heater.entity_component._.state.eco
component.water_heater.entity_component._.state.electric
component.water_heater.entity_component._.state.gas
component.water_heater.entity_component._.state.heat_pump
component.water_heater.entity_component._.state.high_demand
component.water_heater.entity_component._.state.off
component.water_heater.entity_component._.state.performance
component.water_heater.entity_component._.state_attributes.away_mode.name
component.water_heater.entity_component._.state_attributes.away_mode.state.off
component.water_heater.entity_component._.state_attributes.away_mode.state.on
component.water_heater.entity_component._.state_attributes.current_operation.name
component.water_heater.entity_component._.state_attributes.current_temperature.name
component.water_heater.entity_component._.state_attributes.max_temp.name
component.water_heater.entity_component._.state_attributes.min_temp.name
component.water_heater.entity_component._.state_attributes.target_temp_high.name
component.water_heater.entity_component._.state_attributes.target_temp_low.name
component.schedule.entity_component._.name
component.schedule.entity_component._.state.off
component.schedule.entity_component._.state.on
component.schedule.entity_component._.state_attributes.editable.name
component.schedule.entity_component._.state_attributes.editable.state.false
component.schedule.entity_component._.state_attributes.editable.state.true
component.schedule.entity_component._.state_attributes.next_event.name
component.time.entity_component._.name
component.cover.entity_component._.name
component.cover.entity_component._.state.closed
component.cover.entity_component._.state.closing
component.cover.entity_component._.state.open
component.cover.entity_component._.state.opening
component.cover.entity_component._.state.stopped
component.cover.entity_component._.state_attributes.current_position.name
component.cover.entity_component._.state_attributes.current_tilt_position.name
component.cover.entity_component.awning.name
component.cover.entity_component.blind.name
component.cover.entity_component.curtain.name
component.cover.entity_component.damper.name
component.cover.entity_component.door.name
component.cover.entity_component.garage.name
component.cover.entity_component.gate.name
component.cover.entity_component.shade.name
component.cover.entity_component.shutter.name
component.cover.entity_component.window.name
component.group.entity_component._.name
component.group.entity_component._.state.closed
component.group.entity_component._.state.home
component.group.entity_component._.state.locked
component.group.entity_component._.state.not_home
component.group.entity_component._.state.off
component.group.entity_component._.state.ok
component.group.entity_component._.state.on
component.group.entity_component._.state.open
component.group.entity_component._.state.problem
component.group.entity_component._.state.unlocked
component.group.entity_component._.state_attributes.entity_id.name
component.alarm_control_panel.entity_component._.name
component.alarm_control_panel.entity_component._.state.armed
component.alarm_control_panel.entity_component._.state.armed_away
component.alarm_control_panel.entity_component._.state.armed_custom_bypass
component.alarm_control_panel.entity_component._.state.armed_home
component.alarm_control_panel.entity_component._.state.armed_night
component.alarm_control_panel.entity_component._.state.armed_vacation
component.alarm_control_panel.entity_component._.state.arming
component.alarm_control_panel.entity_component._.state.disarmed
component.alarm_control_panel.entity_component._.state.disarming
component.alarm_control_panel.entity_component._.state.pending
component.alarm_control_panel.entity_component._.state.triggered
component.alarm_control_panel.entity_component._.state_attributes.changed_by.name
component.alarm_control_panel.entity_component._.state_attributes.code_arm_required.name
component.alarm_control_panel.entity_component._.state_attributes.code_arm_required.state.false
component.alarm_control_panel.entity_component._.state_attributes.code_arm_required.state.true
component.alarm_control_panel.entity_component._.state_attributes.code_format.name
component.alarm_control_panel.entity_component._.state_attributes.code_format.state.number
component.alarm_control_panel.entity_component._.state_attributes.code_format.state.text
component.camera.entity_component._.name
component.camera.entity_component._.state.idle
component.camera.entity_component._.state.recording
component.camera.entity_component._.state.streaming
component.camera.entity_component._.state_attributes.access_token.name
component.camera.entity_component._.state_attributes.brand.name
component.camera.entity_component._.state_attributes.frontend_stream_type.name
component.camera.entity_component._.state_attributes.frontend_stream_type.state.hls
component.camera.entity_component._.state_attributes.frontend_stream_type.state.webrtc
component.camera.entity_component._.state_attributes.model_name.name
component.camera.entity_component._.state_attributes.motion_detection.name
component.camera.entity_component._.state_attributes.motion_detection.state.false
component.camera.entity_component._.state_attributes.motion_detection.state.true
component.person.entity_component._.name
component.person.entity_component._.state.home
component.person.entity_component._.state.not_home
component.person.entity_component._.state_attributes.device_trackers.name
component.person.entity_component._.state_attributes.gps_accuracy.name
component.person.entity_component._.state_attributes.latitude.name
component.person.entity_component._.state_attributes.longitude.name
component.person.entity_component._.state_attributes.source.name
component.light.entity_component._.name
component.light.entity_component._.state.off
component.light.entity_component._.state.on
component.light.entity_component._.state_attributes.brightness.name
component.light.entity_component._.state_attributes.color_mode.name
component.light.entity_component._.state_attributes.color_mode.state.brightness
component.light.entity_component._.state_attributes.color_mode.state.color_temp
component.light.entity_component._.state_attributes.color_mode.state.hs
component.light.entity_component._.state_attributes.color_mode.state.onoff
component.light.entity_component._.state_attributes.color_mode.state.rgb
component.light.entity_component._.state_attributes.color_mode.state.rgbw
component.light.entity_component._.state_attributes.color_mode.state.rgbww
component.light.entity_component._.state_attributes.color_mode.state.unknown
component.light.entity_component._.state_attributes.color_mode.state.white
component.light.entity_component._.state_attributes.color_mode.state.xy
component.light.entity_component._.state_attributes.color_temp.name
component.light.entity_component._.state_attributes.color_temp_kelvin.name
component.light.entity_component._.state_attributes.effect.name
component.light.entity_component._.state_attributes.effect.state.off
component.light.entity_component._.state_attributes.effect_list.name
component.light.entity_component._.state_attributes.max_color_temp_kelvin.name
component.light.entity_component._.state_attributes.max_mireds.name
component.light.entity_component._.state_attributes.min_color_temp_kelvin.name
component.light.entity_component._.state_attributes.min_mireds.name
component.light.entity_component._.state_attributes.supported_color_modes.name
component.light.entity_component._.state_attributes.supported_color_modes.state.brightness
component.light.entity_component._.state_attributes.supported_color_modes.state.color_temp
component.light.entity_component._.state_attributes.supported_color_modes.state.hs
component.light.entity_component._.state_attributes.supported_color_modes.state.onoff
component.light.entity_component._.state_attributes.supported_color_modes.state.rgb
component.light.entity_component._.state_attributes.supported_color_modes.state.rgbw
component.light.entity_component._.state_attributes.supported_color_modes.state.rgbww
component.light.entity_component._.state_attributes.supported_color_modes.state.unknown
component.light.entity_component._.state_attributes.supported_color_modes.state.white
component.light.entity_component._.state_attributes.supported_color_modes.state.xy
component.assist_satellite.entity_component._.name
component.assist_satellite.entity_component._.state.idle
component.assist_satellite.entity_component._.state.listening
component.assist_satellite.entity_component._.state.processing
component.assist_satellite.entity_component._.state.responding
component.binary_sensor.entity_component._.name
component.binary_sensor.entity_component._.state.off
component.binary_sensor.entity_component._.state.on
component.binary_sensor.entity_component.battery.name
component.binary_sensor.entity_component.battery.state.off
component.binary_sensor.entity_component.battery.state.on
component.binary_sensor.entity_component.battery_charging.name
component.binary_sensor.entity_component.battery_charging.state.off
component.binary_sensor.entity_component.battery_charging.state.on
component.binary_sensor.entity_component.carbon_monoxide.name
component.binary_sensor.entity_component.carbon_monoxide.state.off
component.binary_sensor.entity_component.carbon_monoxide.state.on
component.binary_sensor.entity_component.cold.name
component.binary_sensor.entity_component.cold.state.off
component.binary_sensor.entity_component.cold.state.on
component.binary_sensor.entity_component.connectivity.name
component.binary_sensor.entity_component.connectivity.state.off
component.binary_sensor.entity_component.connectivity.state.on
component.binary_sensor.entity_component.door.name
component.binary_sensor.entity_component.door.state.off
component.binary_sensor.entity_component.door.state.on
component.binary_sensor.entity_component.garage_door.name
component.binary_sensor.entity_component.garage_door.state.off
component.binary_sensor.entity_component.garage_door.state.on
component.binary_sensor.entity_component.gas.name
component.binary_sensor.entity_component.gas.state.off
component.binary_sensor.entity_component.gas.state.on
component.binary_sensor.entity_component.heat.name
component.binary_sensor.entity_component.heat.state.off
component.binary_sensor.entity_component.heat.state.on
component.binary_sensor.entity_component.light.name
component.binary_sensor.entity_component.light.state.off
component.binary_sensor.entity_component.light.state.on
component.binary_sensor.entity_component.lock.name
component.binary_sensor.entity_component.lock.state.off
component.binary_sensor.entity_component.lock.state.on
component.binary_sensor.entity_component.moisture.name
component.binary_sensor.entity_component.moisture.state.off
component.binary_sensor.entity_component.moisture.state.on
component.binary_sensor.entity_component.motion.name
component.binary_sensor.entity_component.motion.state.off
component.binary_sensor.entity_component.motion.state.on
component.binary_sensor.entity_component.moving.name
component.binary_sensor.entity_component.moving.state.off
component.binary_sensor.entity_component.moving.state.on
component.binary_sensor.entity_component.occupancy.name
component.binary_sensor.entity_component.occupancy.state.off
component.binary_sensor.entity_component.occupancy.state.on
component.binary_sensor.entity_component.opening.name
component.binary_sensor.entity_component.opening.state.off
component.binary_sensor.entity_component.opening.state.on
component.binary_sensor.entity_component.plug.name
component.binary_sensor.entity_component.plug.state.off
component.binary_sensor.entity_component.plug.state.on
component.binary_sensor.entity_component.power.name
component.binary_sensor.entity_component.power.state.off
component.binary_sensor.entity_component.power.state.on
component.binary_sensor.entity_component.presence.name
component.binary_sensor.entity_component.presence.state.off
component.binary_sensor.entity_component.presence.state.on
component.binary_sensor.entity_component.problem.name
component.binary_sensor.entity_component.problem.state.off
component.binary_sensor.entity_component.problem.state.on
component.binary_sensor.entity_component.running.name
component.binary_sensor.entity_component.running.state.off
component.binary_sensor.entity_component.running.state.on
component.binary_sensor.entity_component.safety.name
component.binary_sensor.entity_component.safety.state.off
component.binary_sensor.entity_component.safety.state.on
component.binary_sensor.entity_component.smoke.name
component.binary_sensor.entity_component.smoke.state.off
component.binary_sensor.entity_component.smoke.state.on
component.binary_sensor.entity_component.sound.name
component.binary_sensor.entity_component.sound.state.off
component.binary_sensor.entity_component.sound.state.on
component.binary_sensor.entity_component.tamper.name
component.binary_sensor.entity_component.tamper.state.off
component.binary_sensor.entity_component.tamper.state.on
component.binary_sensor.entity_component.update.name
component.binary_sensor.entity_component.update.state.off
component.binary_sensor.entity_component.update.state.on
component.binary_sensor.entity_component.vibration.name
component.binary_sensor.entity_component.vibration.state.off
component.binary_sensor.entity_component.vibration.state.on
component.binary_sensor.entity_component.window.name
component.binary_sensor.entity_component.window.state.off
component.binary_sensor.entity_component.window.state.on
component.input_number.entity_component._.name
component.input_number.entity_component._.state_attributes.editable.name
component.input_number.entity_component._.state_attributes.editable.state.false
component.input_number.entity_component._.state_attributes.editable.state.true
component.input_number.entity_component._.state_attributes.initial.name
component.input_number.entity_component._.state_attributes.max.name
component.input_number.entity_component._.state_attributes.min.name
component.input_number.entity_component._.state_attributes.mode.name
component.input_number.entity_component._.state_attributes.mode.state.auto
component.input_number.entity_component._.state_attributes.mode.state.box
component.input_number.entity_component._.state_attributes.mode.state.slider
component.input_number.entity_component._.state_attributes.step.name
component.button.entity_component._.name
component.button.entity_component.identify.name
component.button.entity_component.restart.name
component.button.entity_component.update.name
component.valve.entity_component._.name
component.valve.entity_component._.state.closed
component.valve.entity_component._.state.closing
component.valve.entity_component._.state.open
component.valve.entity_component._.state.opening
component.valve.entity_component._.state.stopped
component.valve.entity_component._.state_attributes.current_position.name
component.valve.entity_component.gas.name
component.valve.entity_component.water.name
component.number.entity_component._.name
component.number.entity_component._.state_attributes.max.name
component.number.entity_component._.state_attributes.min.name
component.number.entity_component._.state_attributes.mode.name
component.number.entity_component._.state_attributes.mode.state.auto
component.number.entity_component._.state_attributes.mode.state.box
component.number.entity_component._.state_attributes.mode.state.slider
component.number.entity_component._.state_attributes.step.name
component.number.entity_component.apparent_power.name
component.number.entity_component.aqi.name
component.number.entity_component.area.name
component.number.entity_component.atmospheric_pressure.name
component.number.entity_component.battery.name
component.number.entity_component.blood_glucose_concentration.name
component.number.entity_component.carbon_dioxide.name
component.number.entity_component.carbon_monoxide.name
component.number.entity_component.conductivity.name
component.number.entity_component.current.name
component.number.entity_component.data_rate.name
component.number.entity_component.distance.name
component.number.entity_component.energy.name
component.number.entity_component.energy_storage.name
component.number.entity_component.frequency.name
component.number.entity_component.gas.name
component.number.entity_component.humidity.name
component.number.entity_component.illuminance.name
component.number.entity_component.irradiance.name
component.number.entity_component.moisture.name
component.number.entity_component.nitrogen_dioxide.name
component.number.entity_component.nitrogen_monoxide.name
component.number.entity_component.nitrous_oxide.name
component.number.entity_component.ozone.name
component.number.entity_component.ph.name
component.number.entity_component.pm1.name
component.number.entity_component.pm10.name
component.number.entity_component.pm25.name
component.number.entity_component.power.name
component.number.entity_component.power_factor.name
component.number.entity_component.precipitation.name
component.number.entity_component.precipitation_intensity.name
component.number.entity_component.pressure.name
component.number.entity_component.reactive_energy.name
component.number.entity_component.reactive_power.name
component.number.entity_component.signal_strength.name
component.number.entity_component.sound_pressure.name
component.number.entity_component.speed.name
component.number.entity_component.sulphur_dioxide.name
component.number.entity_component.temperature.name
component.number.entity_component.volatile_organic_compounds.name
component.number.entity_component.voltage.name
component.number.entity_component.volume.name
component.number.entity_component.volume_flow_rate.name
component.number.entity_component.volume_storage.name
component.number.entity_component.water.name
component.number.entity_component.weight.name
component.number.entity_component.wind_direction.name
component.number.entity_component.wind_speed.name
component.sensor.entity_component._.name
component.sensor.entity_component._.state.off
component.sensor.entity_component._.state.on
component.sensor.entity_component._.state_attributes.last_reset.name
component.sensor.entity_component._.state_attributes.options.name
component.sensor.entity_component._.state_attributes.state_class.name
component.sensor.entity_component._.state_attributes.state_class.state.measurement
component.sensor.entity_component._.state_attributes.state_class.state.measurement_angle
component.sensor.entity_component._.state_attributes.state_class.state.total
component.sensor.entity
```
:::

::: danger ВАЖНО
Используйте только те ключи, которые ДЕЙСТВИТЕЛЬНО нужны. Так как большое количество ключей может привести с переполнению памяти и, как следствие, к постоянной перегрузке устройства.
:::