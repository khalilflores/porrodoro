# Porrodoro - Tarjeta de Referencia Rápida

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar aplicación
npm start

# Construir para producción
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux
```

## 🎯 Funcionalidades Principales

| Función | Descripción |
|---------|-------------|
| 🍅 Temporizador Pomodoro | Sesiones de trabajo de 25 minutos |
| ⏱️ Descanso Corto | Descansos de 3 minutos |
| 🌙 Descanso Largo | Descansos de 15 minutos (cada 4 Pomodoros) |
| 🔁 Auto-inicio | Transiciones automáticas |
| 💾 Persistencia | Configuración guardada automáticamente |
| 🔔 Notificaciones | Notificaciones de escritorio |
| 🎨 Temas | Tema Ganja Reggae Pixel Weed |
| 🌑 Modo Oscuro | Oscuro automático al ejecutar |
| 📱 Sincronización Móvil | Integración con dispositivo móvil |
| 📋 Todoist | Integración con gestión de tareas |
| 🔗 Webhook | Soporte para webhooks personalizados |

## 🎮 Controles

| Botón | Icono | Función |
|-------|-------|---------|
| Iniciar | 🍅 | Iniciar temporizador |
| Pausa | ⏸️ | Pausar temporizador |
| Reiniciar | 🔄 | Reiniciar al tiempo inicial |
| Saltar | ⏭️ | Saltar al siguiente modo |
| Ajustes | ⚙️ | Abrir panel de configuración |
| Tema | 🎨 | Alternar tema |

## 🎨 Colores del Tema

| Color | Hex | Descripción |
|-------|-----|-------------|
| Primario | #137333 | Verde Rastafari |
| Secundario | #d4af37 | Dorado Jamaiquino |
| Acento | #c41e3a | Rojo Ancestral |
| Fondo | #f5f5dc | Beige Pixel |

## 📁 Estructura de Archivos

```
porrodoro/
├── src/              # Frontend (HTML/CSS/JS)
├── main/            # Proceso principal de Electron
├── CONTRIBUTING.md  # Guía para contribuir
├── CODE_OF_CONDUCT.md # Código de conducta
├── LICENSE          # Licencia MIT
└── README.md        # Documentación
```

## 🔧 Configuración

### Ubicación del Archivo de Configuración
- **Windows:** `%APPDATA%\Porrodoro\settings.json`
- **macOS:** `~/Library/Application Support/Porrodoro/settings.json`
- **Linux:** `~/.config/Porrodoro/settings.json`

### Configuración por Defecto
```json
{
  "workTime": 25,
  "shortBreakTime": 3,
  "longBreakTime": 15,
  "longBreakInterval": 4,
  "autoStartBreaks": true,
  "autoStartPomodoros": true,
  "notificationEnabled": true,
  "darkModeWhenRunning": true,
  "smallWindow": true
}
```

## 🛠️ Comandos de Desarrollo

```bash
# Iniciar servidor de desarrollo
npm start

# Construir versiones de producción
npm run build:win
npm run build:mac
npm run build:linux

# Generar iconos
node create-icons.js

# Iniciar servidor web
node dev-server.js
```

## 📊 Flujo del Temporizador

```
Trabajo (25 min) → Descanso Corto (3 min) → Trabajo (25 min) → Descanso Corto (3 min)
    ↓
Trabajo (25 min) → Descanso Corto (3 min) → Trabajo (25 min) → Descanso Largo (15 min)
    ↓
Repetir ciclo...
```

## 📱 Integración Móvil

1. Haz clic en "Agregar dispositivo"
2. Sincroniza con la aplicación móvil Porrodoro
3. Recibe notificaciones móviles
4. Controla el temporizador desde el móvil

## 🔗 Integraciones

### Todoist
1. Obtén el token API de Todoist
2. Ingresa en configuración
3. Auto-verificación de tareas habilitada

### Webhook
1. Ingresa la URL del webhook
2. Configura el formato del payload
3. Prueba la conexión

## 🐛 Solución de Problemas

| Problema | Solución |
|----------|----------|
| La aplicación no inicia | Ejecuta `npm install` |
| La configuración no se guarda | Verifica permisos de archivo |
| Las notificaciones no funcionan | Habilítalas en configuración |
| El tema no carga | Reinicia la aplicación |

## 📚 Documentación

- **IMPLEMENTATION_PLAN.md** - Plan técnico detallado
- **SETUP_GUIDE.md** - Instalación paso a paso
- **IMPLEMENTATION_SUMMARY.md** - Resumen completo
- **README.md** - Resumen del proyecto
- **CONTRIBUTING.md** - Guía para contribuir
- **CODE_OF_CONDUCT.md** - Código de conducta

## 🎓 Técnica Pomodoro

1. Trabaja por 25 minutos (1 Pomodoro)
2. Toma un descanso de 3 minutos
3. Repite 4 veces
4. Toma un descanso largo de 15 minutos
5. Repite el ciclo

## 🌟 Consejos para el Éxito

- ✅ Establece duraciones de trabajo realistas
- ✅ Usa los descansos cortos para estirarte
- ✅ Toma descansos largos para comer
- ✅ Haz seguimiento de tus Pomodoros
- ✅ Ajusta la configuración según tus necesidades

---

**¡Felices Pomodoros! 🍅**

*Porrodoro - Concéntrate con Vibra Ganja Reggae*
