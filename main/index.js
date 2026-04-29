/**
 * Porrodoro - Proceso Principal de Electron
 * Maneja el ciclo de vida de la aplicación, la gestión de ventanas y la integración con el sistema
 */

const { app, BrowserWindow, Tray, Menu, Notification, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow = null;
let tray = null;
const isDev = process.env.NODE_ENV === 'development' || process.argv.some(arg => arg.includes('electron-is-dev'));

// Cargar configuración
let settings = {
    workTime: 25,
    shortBreakTime: 3,
    longBreakTime: 15,
    longBreakInterval: 4,
    autoStartBreaks: true,
    autoStartPomodoros: true,
    soundEnabled: true,
    alarmSound: 'alarm1',
    alarmVolume: 50,
    focusSound: 'none',
    focusVolume: 50,
    notificationEnabled: true,
    darkModeWhenRunning: true,
    smallWindow: true,
    todoistToken: '',
    webhookUrl: '',
    autoCheckTasks: true,
    checkToBottom: false,
    hourFormat: '24'
};

// Cargar configuración desde archivo
function loadSettings() {
    const settingsPath = path.join(app.getPath('userData'), 'settings.json');
    
    if (fs.existsSync(settingsPath)) {
        try {
            const data = fs.readFileSync(settingsPath, 'utf8');
            settings = { ...settings, ...JSON.parse(data) };
        } catch (error) {
            console.error('Error al cargar configuración:', error);
        }
    }
}

// Guardar configuración en archivo
function saveSettings() {
    const settingsPath = path.join(app.getPath('userData'), 'settings.json');
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
}

// Crear la ventana principal
function createWindow() {
    const windowOptions = {
        width: 420,
        height: 620,
        resizable: false,
        frame: false,
        backgroundColor: '#f5f5dc',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        autoHideMenuBar: true,
        title: 'Porrodoro',
        icon: path.join(__dirname, '../src/assets/images/icon.png')
    };
    
    if (settings.darkModeWhenRunning) {
        windowOptions.backgroundColor = '#1a1a1a';
    }
    
    mainWindow = new BrowserWindow(windowOptions);
    
    // Cargar la aplicación
    if (isDev) {
        mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, '../src/index.html'));
    }
    
    // Manejar enlaces externos
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });
    
    // Event listeners
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    
    mainWindow.on('show', () => {
        if (settings.darkModeWhenRunning) {
            mainWindow.setBackgroundColor('#1a1a1a');
        } else {
            mainWindow.setBackgroundColor('#f5f5dc');
        }
    });
}

// Crear icono de bandeja
function createTray() {
    const trayIconPath = path.join(__dirname, '../src/assets/images/tray-icon.png');
    
    // Intentar crear bandeja con icono, fallback a texto si el icono no existe
    try {
        tray = new Tray(trayIconPath);
    } catch (error) {
        // Si el icono no existe, crear bandeja sin icono
        tray = new Tray('');
    }
    
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Mostrar Porrodoro',
            click: () => {
                mainWindow.show();
                mainWindow.focus();
            }
        },
        {
            label: 'Iniciar Temporizador',
            click: () => {
                if (mainWindow) {
                    mainWindow.webContents.send('start-timer');
                }
            }
        },
        {
            label: 'Pausar Temporizador',
            click: () => {
                if (mainWindow) {
                    mainWindow.webContents.send('pause-timer');
                }
            }
        },
        {
            label: 'Configuración',
            click: () => {
                if (mainWindow) {
                    mainWindow.show();
                    mainWindow.webContents.send('open-settings');
                }
            }
        },
        {
            type: 'separator'
        },
        {
            label: 'Salir',
            click: () => {
                app.quit();
            }
        }
    ]);
    
    tray.setContextMenu(contextMenu);
    tray.setIgnoreDoubleClickEvents(true);
    
    tray.on('click', () => {
        if (mainWindow) {
            if (mainWindow.isVisible()) {
                mainWindow.hide();
            } else {
                mainWindow.show();
                mainWindow.focus();
            }
        }
    });
}

// Mostrar notificación
function showNotification(title, body) {
    if (!settings.notificationEnabled) return;
    
    if (Notification.isSupported && Notification.isSupported()) {
        const notification = {
            title: title,
            body: body,
            icon: path.join(__dirname, '../src/assets/images/icon.png')
        };
        
        new Notification(notification).show();
    } else if (Notification.isSupported === undefined) {
        // Versiones modernas de Electron no tienen el método isSupported
        const notification = {
            title: title,
            body: body,
            icon: path.join(__dirname, '../src/assets/images/icon.png')
        };
        
        new Notification(notification).show();
    }
}

// Ciclo de vida de la aplicación
app.on('ready', () => {
    loadSettings();
    
    createWindow();
    createTray();
    
    // Solicitar permiso de notificación en el primer inicio
    if (settings.notificationEnabled) {
        showNotification('Porrodoro Listo', '¡Tu temporizador Pomodoro está listo para usar!');
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

// Manejadores IPC
ipcMain.on('save-settings', (event, newSettings) => {
    settings = { ...settings, ...newSettings };
    saveSettings();
    
    // Actualizar ventana si es necesario
    if (mainWindow) {
        if (settings.darkModeWhenRunning) {
            mainWindow.setBackgroundColor('#1a1a1a');
        } else {
            mainWindow.setBackgroundColor('#f5f5dc');
        }
    }
    
    event.reply('settings-saved', settings);
});

ipcMain.on('get-settings', (event) => {
    event.returnValue = settings;
});

ipcMain.on('show-notification', (event, title, body) => {
    showNotification(title, body);
});

// Manejar actualizaciones de configuración desde el renderizador
ipcMain.on('update-settings', (event, updates) => {
    settings = { ...settings, ...updates };
    saveSettings();
    event.returnValue = settings;
});

// Manejar eventos del temporizador
ipcMain.on('timer-started', () => {
    if (tray) {
        tray.setTitle('🍅');
    }
});

ipcMain.on('timer-paused', () => {
    if (tray) {
        tray.setTitle('');
    }
});

// Limpieza
app.on('will-quit', () => {
    if (tray) {
        tray.destroy();
    }
});
