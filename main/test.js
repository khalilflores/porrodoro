/**
 * Porrodoro - Prueba de Electron
 * Archivo de prueba para verificar la configuración básica de Electron
 */

const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow = null;

app.whenReady().then(() => {
    console.log('¡La aplicación está lista!');
    
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    
    mainWindow.loadFile(path.join(__dirname, 'src/index.html'));
    
    mainWindow.webContents.on('did-finish-load', () => {
        console.log('¡Página cargada correctamente!');
    });
    
    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
        console.error('Error al cargar la página:', errorCode, errorDescription);
    });
    
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
