/**
 * Porrodoro - Generador de Iconos
 * Crea iconos placeholder para la aplicación
 */

const fs = require('fs');
const path = require('path');

const ICON_DIR = path.join(__dirname, 'src', 'assets', 'images');

// Crear directorio si no existe
if (!fs.existsSync(ICON_DIR)) {
    fs.mkdirSync(ICON_DIR, { recursive: true });
}

// Crear un icono SVG simple
const iconSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <rect width="256" height="256" fill="#137333"/>
  <circle cx="128" cy="128" r="100" fill="#d4af37"/>
  <text x="128" y="145" font-family="Arial, sans-serif" font-size="120" font-weight="bold" fill="#137333" text-anchor="middle">🍅</text>
</svg>`;

const traySVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
  <rect width="16" height="16" fill="#137333"/>
  <text x="8" y="12" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#d4af37" text-anchor="middle">🍅</text>
</svg>`;

// Escribir archivos de iconos
try {
    fs.writeFileSync(path.join(ICON_DIR, 'icon.svg'), iconSVG);
    fs.writeFileSync(path.join(ICON_DIR, 'tray-icon.svg'), traySVG);
    
    console.log('¡Iconos creados correctamente!');
    console.log(`Ubicación: ${ICON_DIR}`);
} catch (error) {
    console.error('Error al crear iconos:', error);
}
