# Porrodoro - Guía de Instalación

## Inicio Rápido (5 minutos)

### Opción 1: Usando npm (Recomendado)

1. **Instalar Node.js** (si no está instalado)
   - Descargar desde: https://nodejs.org/
   - Elegir la versión LTS (v16 o superior)

2. **Abrir Terminal/Símbolo del Sistema**
   ```bash
   cd porrodoro
   ```

3. **Instalar Dependencias**
   ```bash
   npm install
   ```

4. **Iniciar la Aplicación**
   ```bash
   npm start
   ```

5. **Construir para Producción** (opcional)
   ```bash
   npm run build:win    # Windows
   npm run build:mac    # macOS
   npm run build:linux  # Linux
   ```

### Opción 2: Usando el Servidor de Desarrollo

1. **Iniciar el servidor de desarrollo:**
   ```bash
   node dev-server.js
   ```

2. **Abrir en el navegador:**
   - Navegar a: http://localhost:3000

## Instalación Detallada

### Verificación de Prerrequisitos

Antes de comenzar, asegúrate de tener:
- ✅ Node.js v16 o superior (`node --version`)
- ✅ npm v8 o superior (`npm --version`)
- ✅ Al menos 500MB de espacio libre en disco
- ✅ Conexión a internet (para la instalación inicial)

### Instalación Paso a Paso

#### Paso 1: Navegar al Directorio del Proyecto
```bash
cd porrodoro
```

#### Paso 2: Instalar Dependencias
```bash
npm install
```

Esto instalará:
- Electron (framework de escritorio)
- Electron-builder (herramienta de empaquetado)
- Dependencias de desarrollo

**Salida esperada:**
```
added 150 packages, and audited 151 packages in 2m

found 0 vulnerabilities
```

#### Paso 3: Verificar Instalación
```bash
npm start
```

Deberías ver:
1. Se abre una nueva ventana con Porrodoro
2. El temporizador comienza en 25:00
3. El tema Ganja Reggae Pixel Weed se carga

#### Paso 4: Configurar Ajustes
1. Haz clic en el botón ⚙️ (Ajustes)
2. Ajusta las duraciones del temporizador
3. Configura los sonidos
4. Activa las notificaciones
5. Guarda tus preferencias

## Solución de Problemas

### Problemas Comunes

#### Problema 1: "npm no encontrado"
**Solución:** Instala Node.js desde https://nodejs.org/

#### Problema 2: Errores de "Módulo no encontrado"
**Solución:** Ejecuta `npm install` nuevamente

#### Problema 3: La aplicación no se abre
**Solución:**
- Verifica si el antivirus está bloqueando Electron
- Intenta ejecutar como administrador
- Revisa la consola en busca de errores (F12 en Electron)

#### Problema 4: La compilación falla
**Solución:**
- Asegúrate de tener las herramientas de compilación instaladas
- Windows: Instala Windows Build Tools
  ```bash
  npm install --global windows-build-tools
  ```
- macOS: Instala Xcode Command Line Tools
  ```bash
  xcode-select --install
  ```

#### Problema 5: Los iconos no se muestran
**Solución:** Ejecuta el generador de iconos
```bash
node create-icons.js
```

## Personalización

### Cambiar el Tema

1. **Editar el archivo del tema:**
   ```
   src/css/themes/ganja-reggae.css
   ```

2. **Modificar variables CSS:**
   ```css
   :root.theme-ganja-reggae {
       --primary-color: #137333;   /* Cambiar esto */
       --secondary-color: #d4af37; /* Y esto */
       /* ... */
   }
   ```

3. **Reiniciar la aplicación**

### Agregar Sonidos Personalizados

1. **Colocar archivos de audio en:**
   ```
   src/assets/sounds/
   ```

2. **Actualizar el menú desplegable en HTML:**
   ```html
   <option value="tu-sonido">Tu Sonido</option>
   ```

## Optimización de Rendimiento

### Para Mejor Rendimiento

1. **Desactivar funciones innecesarias:**
   - Desactivar notificaciones si no son necesarias
   - Desactivar sonidos de enfoque
   - Usar modo ventana pequeña

2. **Limpiar regularmente:**
   - Eliminar registros de sesiones antiguas

## Siguientes Pasos

Después de la instalación:

1. **Personaliza tu temporizador:**
   - Ajusta las duraciones de trabajo/descanso
   - Configura las notificaciones
   - Configura las integraciones

2. **Explora las funciones:**
   - Prueba diferentes temas
   - Configura la sincronización móvil
   - Configura la integración con Todoist

3. **Comienza a usar:**
   - Inicia tu primera sesión Pomodoro
   - Haz seguimiento de tu productividad
   - Personaliza según sea necesario

---

**¡Felices Pomodoros! 🍅**

*Porrodoro - Concéntrate con Vibra Ganja Reggae*
