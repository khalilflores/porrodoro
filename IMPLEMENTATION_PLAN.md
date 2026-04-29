# Porrodoro - Plan de Implementación

## 1. Resumen del Proyecto

**Porrodoro** es una aplicación de escritorio de temporizador Pomodoro minimalista y optimizada con un tema Ganja Reggae Pixel Weed. Cuenta con temporización persistente en segundo plano, modo oscuro, notificaciones e integraciones.

## 2. Stack Tecnológico

### Decisión del Framework: **Electron** (Recomendado para desarrollo solo con JavaScript)

| Criterio | Tauri | Electron | Notas |
|----------|-------|----------|-------|
| **Tamaño del Bundle** | ~3MB (backend Rust) | ~150-200MB | Tauri es significativamente más ligero |
| **Uso de Memoria** | ~50-100MB | ~200-400MB | Tauri usa menos RAM |
| **Tiempo de Build** | Más lento (compila Rust) | Más rápido | Electron tiene iteración más rápida |
| **Rendimiento** | Backend nativo Rust | Node.js | Tauri ofrece mejor rendimiento |
| **Tecnología Web** | Cualquiera (HTML/CSS/JS) | Cualquiera (HTML/CSS/JS) | Ambos soportan web moderna |
| **Acceso al Sistema** | APIs Rust | APIs Node.js | Ambos tienen buen acceso |
| **Curva de Aprendizaje** | Moderada (conceptos básicos de Rust) | Baja (solo JavaScript) | Electron es más fácil |

**Recomendación: Electron** - Es la opción más accesible si te sientes cómodo con JavaScript/HTML/CSS y quieres evitar aprender Rust.

## 3. Arquitectura

```
porrodoro/
├── src/
│   ├── index.html              # Punto de entrada del frontend
│   ├── css/
│   │   ├── style.css           # Estilos principales
│   │   └── themes/
│   │       └── ganja-reggae.css # Tema Reggae
│   ├── js/
│   │   └── app.js              # Lógica principal de la aplicación
│   └── assets/                 # Imágenes, iconos, sonidos
├── main/
│   └── index.js                # Punto de entrada de Electron
├── package.json
└── README.md
```

## 4. Requisitos Principales

### 4.1 Funcionalidad del Temporizador
- [x] Sesiones Pomodoro de 25 minutos
- [x] Descansos cortos de 3 minutos
- [x] Descansos largos de 15 minutos
- [x] Intervalos de descanso configurables (cada 4 Pomodoros)
- [x] Auto-inicio de descansos y Pomodoros
- [x] Temporización en segundo plano sin retrasos
- [x] Estado persistente al reiniciar la aplicación

### 4.2 Interfaz de Usuario
- [x] Diseño minimalista
- [x] Tema Ganja Reggae Pixel Weed
- [x] Modo oscuro al ejecutar
- [x] Modo ventana pequeña
- [x] Integración de alarma móvil
- [x] Alternar formato de hora (12/24)

### 4.3 Configuración
- [x] Duración del temporizador
- [x] Opciones de auto-inicio
- [x] Configuración de intervalo de descanso largo
- [x] Configuración de sonido (alarma, sonidos de enfoque)
- [x] Selección de tema
- [x] Preferencias de notificación
- [x] Configuración de recordatorios

### 4.4 Persistencia
- [x] Guardar configuración en almacenamiento local
- [x] Reanudar temporizador al reiniciar la aplicación
- [x] Persistencia de seguimiento de tareas
- [x] Historial de sesiones

### 4.5 Notificaciones e Integraciones
- [x] Notificaciones de escritorio
- [x] Integración de alarma móvil
- [x] Integración con Todoist
- [x] Soporte para Webhooks
- [x] Auto-verificación de tareas

## 5. Especificaciones Técnicas

### Motor del Temporizador
- Usar `requestAnimationFrame` para actualizaciones de UI (suave, eficiente)
- Usar `setInterval` para la temporización real (más confiable para largas duraciones)
- Almacenar marcas de tiempo para reanudación precisa después de reiniciar la aplicación

### Persistencia de Datos
- Usar `localStorage` para configuración (datos pequeños)
- Usar `localStorage` para el historial de sesiones

### Sistema de Audio
- Usar Web Audio API para generación de sonido
- Soporte para formatos MP3/WAV
- Control de volumen
- Personalización de sonidos

### Sistema de Notificaciones
- Usar API de Notificaciones de Escritorio
- Solicitar permiso del usuario
- Soporte para sonidos personalizados

## 6. Estrategia de Pruebas

### Pruebas Unitarias
- Lógica del temporizador (iniciar, detener, reiniciar, transiciones)
- Persistencia de configuración
- Generación de sonido

### Pruebas de Integración
- Ciclo Pomodoro completo
- Guardar/cargar configuración
- Entrega de notificaciones

### Pruebas Manuales
- Comportamiento multiplataforma
- Precisión de temporización en segundo plano
- Cambio de temas
- Funcionalidad de alarma móvil

---

**Siguientes Pasos**: Ejecuta `npm install` y `npm start` para comenzar el desarrollo!
