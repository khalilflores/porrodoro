<div align="center">

# 🍅 Porrodoro

### Temporizador Pomodoro · Tema Ganja Reggae Pixel Weed

[![Licencia](https://img.shields.io/badge/licencia-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16-brightgreen)](https://nodejs.org)
[![PRs Bienvenidas](https://img.shields.io/badge/PRs-bienvenidas-brightgreen)](CONTRIBUTING.md)
[![GitHub stars](https://img.shields.io/github/stars/tu-usuario/porrodoro?style=social)](https://github.com/tu-usuario/porrodoro)
[![GitHub forks](https://img.shields.io/github/forks/tu-usuario/porrodoro?style=social)](https://github.com/tu-usuario/porrodoro)

</div>

# 🍅 Porrodoro - Temporizador Pomodoro Ganja Reggae Pixel Weed


Una aplicación de escritorio de temporizador Pomodoro minimalista y optimizada con temática **Ganja Reggae Pixel Weed**, que cuenta con temporización en segundo plano persistente, modo oscuro, notificaciones e integraciones.

![Captura de Porrodoro](https://via.placeholder.com/600x400/137333/d4af37?text=Porrodoro+Screenshot)
<!-- Reemplazar con captura real -->

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Instalación Rápida](#-instalación-rápida)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Uso](#-uso)
- [Personalización](#-personalización)
- [Desarrollo](#-desarrollo)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## ✨ Características

### ⏱️ Temporizador

- 🍅 **Sesiones Pomodoro de 25 minutos** (configurable)
- ⏱️ **Descansos cortos de 3 minutos** (configurable)
- 🌙 **Descansos largos de 15 minutos** (configurable)
- 🔁 **Auto-inicio de descansos y pomodoros**
- 📊 **Seguimiento de sesiones y progreso**
- 🔄 **Temporización en segundo plano sin retrasos**

### 🎨 Interfaz y Tema

- 🎪 **Tema Ganja Reggae Pixel Weed**
- 🌑 **Modo oscuro al ejecutar**
- 📱 **Modo ventana pequeña**
- 🎭 **Diseño minimalista**
- 🖌️ **Estética pixel art**

### 💾 Persistencia y Configuración

- 💾 **Persistencia en almacenamiento local**
- ⚙️ **Panel de configuración completo**
- 🔄 **Reanudar temporizador al reiniciar**
- 📝 **Seguimiento de tareas**

### 🔔 Notificaciones e Integraciones

- 🔔 **Notificaciones de escritorio**
- 📱 **Integración de alarma móvil**
- 📋 **Integración con Todoist**
- 🔗 **Soporte para Webhooks**
- ✅ **Auto-verificación de tareas**

---

## 🛠️ Tecnologías

| Tecnología | Propósito |
|------------|-----------|
| **[Electron](https://www.electronjs.org)** | Framework de escritorio multiplataforma |
| **HTML5 / CSS3** | Interfaz de usuario |
| **JavaScript (Vanilla)** | Lógica de la aplicación |
| **Node.js** | Entorno de ejecución backend |
| **localStorage** | Persistencia de datos |
| **Notificaciones Web** | Alertas de escritorio |

---

## 🚀 Instalación Rápida

### Prerrequisitos

- [Node.js](https://nodejs.org) v16 o superior
- npm v8 o superior

### Pasos

```bash
# 1. Clonar o navegar al directorio del proyecto
cd porrodoro

# 2. Instalar dependencias
npm install

# 3. Iniciar la aplicación
npm start

# 4. (Opcional) Construir para producción
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux
```

> 💡 **¿Solo quieres probar la interfaz web?** Ejecuta `node dev-server.js` y abre `http://localhost:3000` en tu navegador.

---

## 📁 Estructura del Proyecto

```
porrodoro/
├── src/                          # Frontend (HTML/CSS/JS)
│   ├── index.html               # Archivo HTML principal
│   ├── css/
│   │   ├── style.css            # Estilos principales
│   │   └── themes/
│   │       └── ganja-reggae.css # Estilos del tema Reggae
│   ├── js/
│   │   └── app.js               # Lógica principal de la aplicación
│   └── assets/
│       ├── sounds/              # Archivos de audio
│       └── images/              # Iconos e imágenes
├── main/                         # Proceso principal de Electron
│   └── index.js                 # Punto de entrada de Electron
├── CONTRIBUTING.md               # Guía para contribuir
├── CODE_OF_CONDUCT.md            # Código de conducta
├── LICENSE                       # Licencia MIT
├── package.json                  # Configuración del proyecto
└── README.md                     # Este archivo
```

---

## 🎮 Uso

### Iniciar el Temporizador

1. Abre Porrodoro
2. Haz clic en el botón **Iniciar** (o el ícono 🍅)
3. El temporizador comenzará la cuenta regresiva desde 25 minutos

### Controles

| Botón | Icono | Función |
|-------|-------|---------|
| **Iniciar** | 🍅 | Iniciar el temporizador |
| **Pausa** | ⏸️ | Pausar el temporizador |
| **Reiniciar** | 🔄 | Reiniciar al tiempo inicial |
| **Saltar** | ⏭️ | Saltar al siguiente modo |
| **Ajustes** | ⚙️ | Abrir panel de configuración |

### Modos del Temporizador

1. **Pomodoro** (25 min por defecto) - Sesión de trabajo concentrado
2. **Descanso Corto** (3 min por defecto) - Descanso breve
3. **Descanso Largo** (15 min por defecto) - Descanso extendido (cada 4 Pomodoros)

---

## 🎨 Personalización

### Cambiar el Tema

Usa el botón de alternar tema o modifica el archivo `src/css/themes/ganja-reggae.css` para personalizar colores.

### Agregar Sonidos Personalizados

Coloca archivos de audio en `src/assets/sounds/` y actualiza el menú desplegable de sonidos en la configuración.

### Modificar Colores del Tema

Edita las variables CSS en `src/css/themes/ganja-reggae.css`:

```css
:root.theme-ganja-reggae {
    --primary-color: #137333;   /* Verde Rastafari */
    --secondary-color: #d4af37; /* Dorado */
    --accent-color: #c41e3a;    /* Rojo */
    /* ... más variables */
}
```

---

## 💻 Desarrollo

### Ejecutar en modo desarrollo

```bash
npm start
```

### Construir para producción

```bash
npm run build:win    # Windows (.exe)
npm run build:mac    # macOS (.dmg)
npm run build:linux  # Linux (.AppImage)
```

### Depuración

- Presiona `F12` en la ventana de Electron para abrir DevTools
- Revisa la pestaña Consola para errores

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor lee nuestra [guía de contribución](CONTRIBUTING.md) y nuestro [código de conducta](CODE_OF_CONDUCT.md) antes de empezar.

1. Haz un Fork del proyecto
2. Crea una rama para tu función (`git checkout -b feature/nueva-caracteristica`)
3. Haz commit de tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 🙏 Agradecimientos

- Inspirado en la [Técnica Pomodoro](https://francescocirillo.com/pages/pomodoro-technique) de Francesco Cirillo
- Tema inspirado en los colores Rastafari y la cultura Reggae
- Construido con [Electron](https://www.electronjs.org) para compatibilidad multiplataforma

---

<p align="center">
  <strong>¡Felices Pomodoros! 🍅</strong><br>
  <em>Porrodoro - Concéntrate con Vibra Ganja Reggae</em>
</p>
