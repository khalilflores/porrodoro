/**
 * Porrodoro - Aplicación Principal
 * Maneja las interacciones de la interfaz de usuario e integra todos los módulos
 */

// Elementos del DOM
const elements = {
    startBtn: document.getElementById('start-btn'),
    pauseBtn: document.getElementById('pause-btn'),
    resetBtn: document.getElementById('reset-btn'),
    skipBtn: document.getElementById('skip-btn'),
    settingsBtn: document.getElementById('settings-btn'),
    closeSettingsBtn: document.getElementById('close-settings'),
    saveSettingsBtn: document.getElementById('save-settings'),
    resetDefaultsBtn: document.getElementById('reset-to-defaults'),
    themeBtn: document.getElementById('theme-btn'),
    addDeviceBtn: document.getElementById('add-device-btn'),
    
    // Campos de configuración
    pomodoroTime: document.getElementById('pomodoro-time'),
    shortBreakTime: document.getElementById('short-break-time'),
    longBreakTime: document.getElementById('long-break-time'),
    longBreakInterval: document.getElementById('long-break-interval'),
    autoStartBreaks: document.getElementById('auto-start-breaks'),
    autoStartPomodoros: document.getElementById('auto-start-pomodoros'),
    alarmSound: document.getElementById('alarm-sound'),
    alarmVolume: document.getElementById('alarm-volume'),
    focusSound: document.getElementById('focus-sound'),
    focusVolume: document.getElementById('focus-volume'),
    colorTheme: document.getElementById('color-theme'),
    darkModeRunning: document.getElementById('dark-mode-running'),
    smallWindow: document.getElementById('small-window'),
    enableNotifications: document.getElementById('enable-notifications'),
    notificationReminder: document.getElementById('notification-reminder'),
    todoistToken: document.getElementById('todoist-token'),
    webhookUrl: document.getElementById('webhook-url'),
    autoCheckTasks: document.getElementById('auto-check-tasks'),
    checkToBottom: document.getElementById('check-to-bottom'),
    hourFormat: document.getElementById('hour-format'),
    
    // Modal
    settingsModal: document.getElementById('settings-modal'),
    
    // Barra de título
    minimizeBtn: document.getElementById('minimize-btn'),
    closeBtn: document.getElementById('close-btn'),
    
    // Tareas
    taskInput: document.getElementById('task-input'),
    addTaskBtn: document.getElementById('add-task-btn'),
    tasksList: document.getElementById('tasks-list'),
    tasksCount: document.getElementById('tasks-count')
};

// Definición de la clase Temporizador
class Timer {
    constructor() {
        this.defaultWorkTime = 25 * 60; // 25 minutos en segundos
        this.defaultShortBreak = 3 * 60; // 3 minutos en segundos
        this.defaultLongBreak = 15 * 60; // 15 minutos en segundos
        this.longBreakInterval = 4; // Cada 4 Pomodoros
        
        this.workTime = this.defaultWorkTime;
        this.shortBreakTime = this.defaultShortBreak;
        this.longBreakTime = this.defaultLongBreak;
        
        this.timeRemaining = this.defaultWorkTime;
        this.totalTime = this.defaultWorkTime;
        
        this.mode = 'work'; // 'work', 'shortBreak', 'longBreak'
        this.isRunning = false;
        this.sessionCount = 0; // Número de Pomodoros completados
        this.pomodoroCount = 1; // Número de Pomodoro actual (1-indexado)
        
        this.timerInterval = null;
        this.lastUpdate = 0;
        this.pausedTime = 0;
        
        this.autoStartBreaks = true;
        this.autoStartPomodoros = true;
        
        this.soundEnabled = true;
        this.alarmSound = 'alarm_classic';
        this.alarmVolume = 50;
        this.focusSound = 'none';
        this.focusVolume = 50;
        
        this.notificationEnabled = true;
        this.reminderMinutes = 0;
        
        this.darkModeWhenRunning = true;
        this.smallWindow = true;
        
        this.todoistToken = '';
        this.webhookUrl = '';
        this.autoCheckTasks = true;
        this.checkToBottom = false;
        
        this.hourFormat = '24';
        
        this.loadSettings();
    }
    
    // Iniciar el temporizador
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.lastUpdate = Date.now();
        
        // Reproducir sonido de enfoque si está habilitado
        if (this.focusSound !== 'none') {
            this.playFocusSound();
        }
        
        this.timerInterval = setInterval(() => {
            const now = Date.now();
            const elapsed = (now - this.lastUpdate) / 1000;
            this.lastUpdate = now;
            
            this.timeRemaining -= elapsed;
            
            if (this.timeRemaining <= 0) {
                this.timeRemaining = 0;
                this.handleTimerEnd();
            }
            
            this.updateUI();
        }, 1000);
        
        return true;
    }
    
    // Pausar el temporizador
    pause() {
        if (!this.isRunning) return false;
        
        this.isRunning = false;
        clearInterval(this.timerInterval);
        this.pausedTime = this.timeRemaining;
        
        // Detener sonido de enfoque
        this.stopFocusSound();
        
        return true;
    }
    
    // Reiniciar el temporizador
    reset() {
        this.pause();
        this.timeRemaining = this.workTime;
        this.totalTime = this.workTime;
        this.updateUI();
        return true;
    }
    
    // Saltar al siguiente modo
    skip() {
        this.pause();
        
        // Si se salta una sesión de trabajo, se cuenta como completada
        if (this.mode === 'work') {
            this.pomodoroCount++;
            this.sessionCount++;
            // Determinar el siguiente modo según el pomodoroCount actual
            if (this.pomodoroCount % this.longBreakInterval === 0) {
                this.switchMode('longBreak');
            } else {
                this.switchMode('shortBreak');
            }
        } else {
            // Si se salta un descanso, el siguiente siempre es trabajo
            this.switchMode('work');
        }
        
        this.saveSettings();
        return true;
    }
    
    // Cambiar a un modo específico
    switchMode(mode) {
        this.mode = mode;
        
        // Detener sonido de enfoque al cambiar de modo
        this.stopFocusSound();
        
        switch(mode) {
            case 'work':
                this.timeRemaining = this.workTime;
                this.totalTime = this.workTime;
                break;
            case 'shortBreak':
                this.timeRemaining = this.shortBreakTime;
                this.totalTime = this.shortBreakTime;
                break;
            case 'longBreak':
                this.timeRemaining = this.longBreakTime;
                this.totalTime = this.longBreakTime;
                break;
        }
        
        this.updateUI();
        updateControlButtons();
        this.saveSettings();
    }
    
    // Manejar el fin del temporizador
    handleTimerEnd() {
        clearInterval(this.timerInterval);
        this.isRunning = false;
        
        // Reproducir sonido de alarma
        if (this.soundEnabled) {
            this.playAlarmSound();
        }
        
        // Mostrar notificación
        if (this.notificationEnabled) {
            this.showNotification();
        }
        
        // Determinar el siguiente modo según el modo actual (antes de incrementar)
        let nextMode;
        if (this.mode === 'work') {
            // Acabamos de completar un pomodoro - verificar si es hora de descanso largo
            if (this.pomodoroCount % this.longBreakInterval === 0) {
                nextMode = 'longBreak';
            } else {
                nextMode = 'shortBreak';
            }
            // Ahora incrementar contadores
            this.pomodoroCount++;
            this.sessionCount++;
        } else {
            // Completamos un descanso, el siguiente siempre es trabajo
            nextMode = 'work';
        }
        
        // Cambiar al siguiente modo
        this.switchMode(nextMode);
        
        // Inicio automático de la siguiente sesión si está habilitado
        if ((nextMode === 'work' && this.autoStartPomodoros) ||
            ((nextMode === 'shortBreak' || nextMode === 'longBreak') && this.autoStartBreaks)) {
            this.start();
            updateControlButtons();
        }
    }
    
    // Obtener el siguiente modo según el modo actual y el conteo de pomodoros
    getNextMode() {
        if (this.mode === 'work') {
            // Después de completar un Pomodoro, verificar si es hora de descanso largo
            if (this.pomodoroCount % this.longBreakInterval === 0) {
                return 'longBreak';
            }
            return 'shortBreak';
        }
        return 'work';
    }
    
    // Actualizar la interfaz de usuario
    updateUI() {
        const timeString = this.formatTime(this.timeRemaining);
        const totalTimeString = this.formatTime(this.totalTime);
        
        // Actualizar pantalla
        const [hours, minutes, seconds] = timeString.split(':');
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
        
        // Actualizar indicador de modo
        const modeLabel = document.getElementById('mode-indicator');
        const modeSpan = modeLabel.querySelector('.mode-label');
        
        switch(this.mode) {
            case 'work':
                modeSpan.textContent = 'Pomodoro';
                modeLabel.className = 'mode-indicator work-mode';
                break;
            case 'shortBreak':
                modeSpan.textContent = 'Descanso Corto';
                modeLabel.className = 'mode-indicator short-break-mode';
                break;
            case 'longBreak':
                modeSpan.textContent = 'Descanso Largo';
                modeLabel.className = 'mode-indicator long-break-mode';
                break;
        }
        
        // Actualizar barra de progreso
        const progressPercent = ((this.totalTime - this.timeRemaining) / this.totalTime) * 100;
        document.getElementById('progress-fill').style.width = `${progressPercent}%`;
        
        // Actualizar contador de sesiones
        document.getElementById('session-count').textContent = this.sessionCount;
        
        // Actualizar modo oscuro
        if (this.darkModeWhenRunning && this.isRunning) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }
    
    // Formatear tiempo como HH:MM:SS
    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = secs.toString().padStart(2, '0');
        
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
    
    // Reproducir sonido de alarma
    playAlarmSound() {
        const audio = document.getElementById('alarm-sound-asset');
        if (audio) {
            // Establecer la fuente al archivo de sonido seleccionado
            audio.src = `assets/sounds/${this.alarmSound}.mp3`;
            audio.currentTime = 0;
            audio.volume = this.alarmVolume / 100;
            audio.loop = false; // Asegurar que la alarma no se repita para siempre
            audio.play().catch(error => {
                console.log('Error al reproducir audio:', error);
            });
        }
    }
    
    // Reproducir sonido de enfoque (sonido ambiental de fondo)
    playFocusSound() {
        if (this.focusSound === 'none') {
            this.stopFocusSound();
            return;
        }
        
        const audio = document.getElementById('focus-sound-asset');
        if (audio) {
            audio.src = `assets/sounds/${this.focusSound}.mp3`;
            audio.volume = this.focusVolume / 100;
            audio.loop = true;
            audio.play().catch(error => {
                console.log('Error al reproducir sonido de enfoque:', error);
            });
        }
    }
    
    // Reproducir sonido seleccionado para vista previa (puede ser alarma o enfoque)
    playPreview(type) {
        let audioId, soundFile, volume;
        
        if (type === 'alarm') {
            audioId = 'alarm-sound-asset';
            soundFile = elements.alarmSound.value;
            volume = elements.alarmVolume.value / 100;
        } else {
            audioId = 'focus-sound-asset';
            soundFile = elements.focusSound.value;
            volume = elements.focusVolume.value / 100;
        }
        
        if (soundFile === 'none') return;
        
        const audio = document.getElementById(audioId);
        if (audio) {
            audio.src = `assets/sounds/${soundFile}.mp3`;
            audio.volume = volume;
            audio.loop = false;
            audio.currentTime = 0;
            audio.play().catch(error => {
                console.log(`Error al reproducir vista previa de ${type}:`, error);
            });
        }
    }
    
    // Detener sonido de enfoque
    stopFocusSound() {
        const audio = document.getElementById('focus-sound-asset');
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }
    
    // Mostrar notificación de escritorio
    showNotification() {
        if (!('Notification' in window)) {
            console.log('Notificaciones no soportadas');
            return;
        }
        
        if (Notification.permission === 'granted') {
            let title = '';
            let body = '';
            
            switch(this.mode) {
                case 'work':
                    title = '¡Pomodoro Completado!';
                    body = '¡Hora de tomar un descanso!';
                    break;
                case 'shortBreak':
                    title = 'Descanso Corto Terminado';
                    body = '¿Listo para concentrarte de nuevo?';
                    break;
                case 'longBreak':
                    title = 'Descanso Largo Terminado';
                    body = '¡Hora de volver al trabajo!';
                    break;
            }
            
            new Notification(title, {
                body: body,
                icon: 'assets/images/icon.png'
            });
        }
    }
    
    // Guardar configuración en localStorage
    saveSettings() {
        const settings = {
            workTime: this.workTime,
            shortBreakTime: this.shortBreakTime,
            longBreakTime: this.longBreakTime,
            longBreakInterval: this.longBreakInterval,
            autoStartBreaks: this.autoStartBreaks,
            autoStartPomodoros: this.autoStartPomodoros,
            soundEnabled: this.soundEnabled,
            alarmSound: this.alarmSound,
            alarmVolume: this.alarmVolume,
            focusSound: this.focusSound,
            focusVolume: this.focusVolume,
            notificationEnabled: this.notificationEnabled,
            reminderMinutes: this.reminderMinutes,
            darkModeWhenRunning: this.darkModeWhenRunning,
            smallWindow: this.smallWindow,
            todoistToken: this.todoistToken,
            webhookUrl: this.webhookUrl,
            autoCheckTasks: this.autoCheckTasks,
            checkToBottom: this.checkToBottom,
            hourFormat: this.hourFormat
        };
        
        localStorage.setItem('porrodoroSettings', JSON.stringify(settings));
    }
    
    // Cargar configuración desde localStorage
    loadSettings() {
        const savedSettings = localStorage.getItem('porrodoroSettings');
        
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            
            this.workTime = settings.workTime || this.defaultWorkTime;
            this.shortBreakTime = settings.shortBreakTime || this.defaultShortBreak;
            this.longBreakTime = settings.longBreakTime || this.defaultLongBreak;
            this.longBreakInterval = settings.longBreakInterval || 4;
            this.autoStartBreaks = settings.autoStartBreaks !== undefined ? settings.autoStartBreaks : true;
            this.autoStartPomodoros = settings.autoStartPomodoros !== undefined ? settings.autoStartPomodoros : true;
            this.soundEnabled = settings.soundEnabled !== undefined ? settings.soundEnabled : true;
            // Convertir valores antiguos de alarma a los nuevos (compatibilidad hacia atrás)
            let alarmValue = settings.alarmSound || 'alarm_classic';
            if (alarmValue === 'alarm1') alarmValue = 'alarm_classic';
            if (alarmValue === 'alarm2') alarmValue = 'digital_watch';
            if (alarmValue === 'alarm3') alarmValue = 'forest_sounds';
            if (alarmValue === 'alarm4') alarmValue = 'ganjah_bell';
            this.alarmSound = alarmValue;
            this.alarmVolume = settings.alarmVolume || 50;
            this.focusSound = settings.focusSound || 'none';
            this.focusVolume = settings.focusVolume || 50;
            this.notificationEnabled = settings.notificationEnabled !== undefined ? settings.notificationEnabled : true;
            this.reminderMinutes = settings.reminderMinutes || 0;
            this.darkModeWhenRunning = settings.darkModeWhenRunning !== undefined ? settings.darkModeWhenRunning : true;
            this.smallWindow = settings.smallWindow !== undefined ? settings.smallWindow : true;
            this.todoistToken = settings.todoistToken || '';
            this.webhookUrl = settings.webhookUrl || '';
            this.autoCheckTasks = settings.autoCheckTasks !== undefined ? settings.autoCheckTasks : true;
            this.checkToBottom = settings.checkToBottom !== undefined ? settings.checkToBottom : false;
            this.hourFormat = settings.hourFormat || '24';
            
            // Actualizar tiempo actual según la configuración cargada
            if (this.mode === 'work') {
                this.timeRemaining = this.workTime;
                this.totalTime = this.workTime;
            } else if (this.mode === 'shortBreak') {
                this.timeRemaining = this.shortBreakTime;
                this.totalTime = this.shortBreakTime;
            } else if (this.mode === 'longBreak') {
                this.timeRemaining = this.longBreakTime;
                this.totalTime = this.longBreakTime;
            }
        }
    }
    
    // Actualizar configuración
    updateSettings(newSettings) {
        if (newSettings.workTime) this.workTime = newSettings.workTime * 60;
        if (newSettings.shortBreakTime) this.shortBreakTime = newSettings.shortBreakTime * 60;
        if (newSettings.longBreakTime) this.longBreakTime = newSettings.longBreakTime * 60;
        if (newSettings.longBreakInterval) this.longBreakInterval = newSettings.longBreakInterval;
        if (newSettings.autoStartBreaks !== undefined) this.autoStartBreaks = newSettings.autoStartBreaks;
        if (newSettings.autoStartPomodoros !== undefined) this.autoStartPomodoros = newSettings.autoStartPomodoros;
        if (newSettings.soundEnabled !== undefined) this.soundEnabled = newSettings.soundEnabled;
        if (newSettings.alarmSound) this.alarmSound = newSettings.alarmSound;
        if (newSettings.alarmVolume) this.alarmVolume = newSettings.alarmVolume;
        if (newSettings.focusSound) this.focusSound = newSettings.focusSound;
        if (newSettings.focusVolume) this.focusVolume = newSettings.focusVolume;
        if (newSettings.notificationEnabled !== undefined) this.notificationEnabled = newSettings.notificationEnabled;
        if (newSettings.reminderMinutes !== undefined) this.reminderMinutes = newSettings.reminderMinutes;
        if (newSettings.darkModeWhenRunning !== undefined) this.darkModeWhenRunning = newSettings.darkModeWhenRunning;
        if (newSettings.smallWindow !== undefined) this.smallWindow = newSettings.smallWindow;
        if (newSettings.todoistToken) this.todoistToken = newSettings.todoistToken;
        if (newSettings.webhookUrl) this.webhookUrl = newSettings.webhookUrl;
        if (newSettings.autoCheckTasks !== undefined) this.autoCheckTasks = newSettings.autoCheckTasks;
        if (newSettings.checkToBottom !== undefined) this.checkToBottom = newSettings.checkToBottom;
        if (newSettings.hourFormat) this.hourFormat = newSettings.hourFormat;
        
        this.saveSettings();
    }
    
    // Restablecer valores predeterminados
    resetToDefaults() {
        this.workTime = this.defaultWorkTime;
        this.shortBreakTime = this.defaultShortBreak;
        this.longBreakTime = this.defaultLongBreak;
        this.longBreakInterval = 4;
        this.autoStartBreaks = true;
        this.autoStartPomodoros = true;
        this.soundEnabled = true;
        this.alarmSound = 'alarm_classic';
        this.alarmVolume = 50;
        this.focusSound = 'none';
        this.focusVolume = 50;
        this.notificationEnabled = true;
        this.reminderMinutes = 0;
        this.darkModeWhenRunning = true;
        this.smallWindow = true;
        this.todoistToken = '';
        this.webhookUrl = '';
        this.autoCheckTasks = true;
        this.checkToBottom = false;
        this.hourFormat = '24';
        
        this.saveSettings();
    }
}

// ============================================
// Efectos de Sonido para Botones
// ============================================

/**
 * Reproducir un efecto de sonido al hacer clic en un botón
 * @param {string} soundFile - El nombre del archivo de sonido (sin ruta)
 */
function playButtonSound(soundFile) {
    const audio = new Audio(`assets/sounds/${soundFile}.mp3`);
    audio.volume = 0.5;
    audio.currentTime = 0;
    audio.play().catch(error => {
        // Fallar silenciosamente si el audio no se puede reproducir (ej. el usuario aún no ha interactuado)
        console.log('Error al reproducir sonido de botón:', error);
    });
}

// Inicializar Temporizador
const timer = new Timer();

// ============================================
// Precarga de imágenes de botones pixel art
// ============================================

/**
 * Lista de todas las imágenes de botones pixel art que deben precargarse
 * para evitar que los botones desaparezcan al hacer hover o clic por primera vez.
 */
const BUTTON_IMAGES = [
    'btn_play_idle.png',
    'btn_play_hover.png',
    'btn_play_pressed.png',
    'btn_reset_idle.png',
    'btn_reset_hover.png',
    'btn_reset_pressed.png',
    'btn_skip_idle.png',
    'btn_skip_hover.png',
    'btn_skip_pressed.png',
    'btn_settings_idle.png',
    'btn_settings_hover.png',
    'btn_settings_presed.png',
    'btn_theme_idle.png',
    'btn_theme_hover.png',
    'btn_theme_pressed.png'
];

/**
 * Precarga todas las imágenes de botones para que estén en caché
 * antes de que el usuario interactúe con ellos.
 */
function preloadButtonImages() {
    BUTTON_IMAGES.forEach(filename => {
        const img = new Image();
        img.src = `assets/images/${filename}`;
    });
}

// Inicializar Aplicación
function init() {
    // Precargar imágenes de botones pixel art para evitar parpadeos
    preloadButtonImages();
    
    // Detectar si se ejecuta en navegador web (no Electron) y agregar clase de plataforma
    if (!window.require || !window.require('electron')) {
        document.body.classList.add('platform-web');
    } else {
        try {
            const { remote } = window.require('electron');
            // Es Electron, no se necesita clase
        } catch (e) {
            // Error al requerir Electron, tratar como web
            document.body.classList.add('platform-web');
        }
    }
    
    // Configurar event listeners
    setupEventListeners();
    
    // Inicializar UI
    updateUIFromSettings();
    
    // Inicializar estados de botones
    updateControlButtons();
    
    // Solicitar permiso de notificación si está habilitado
    if (timer.notificationEnabled) {
        requestNotificationPermission();
    }
    
    console.log('¡Porrodoro inicializado correctamente! 🍅');
}

// Configurar Event Listeners
function setupEventListeners() {
    // Controles del temporizador
    elements.startBtn.addEventListener('click', handleStart);
    elements.pauseBtn.addEventListener('click', handlePause);
    elements.resetBtn.addEventListener('click', handleReset);
    elements.skipBtn.addEventListener('click', handleSkip);
    
    // Modal de configuración
    elements.settingsBtn.addEventListener('click', openSettings);
    elements.closeSettingsBtn.addEventListener('click', closeSettings);
    elements.saveSettingsBtn.addEventListener('click', saveSettings);
    elements.resetDefaultsBtn.addEventListener('click', resetToDefaults);
    
    // Botones de vista previa de audio
    document.getElementById('play-alarm-sound').addEventListener('click', playAlarmPreview);
    document.getElementById('play-focus-sound').addEventListener('click', playFocusPreview);
    
    // Alternar tema
    elements.themeBtn.addEventListener('click', toggleTheme);
    
    // Dispositivo móvil
    elements.addDeviceBtn.addEventListener('click', addMobileDevice);
    
    // Listeners de campos de configuración
    setupSettingsInputs();
}

// Manejadores de Control del Temporizador
function handleStart() {
    // Alternar: si está en ejecución, pausar; si no, iniciar
    if (timer.isRunning) {
        timer.pause();
    } else {
        timer.start();
    }
    playButtonSound('sound_click_splat');
    updateControlButtons();
}

function handlePause() {
    if (timer.pause()) {
        playButtonSound('sound_click_splat');
        updateControlButtons();
    }
}

function handleReset() {
    timer.reset();
    playButtonSound('sound_click_splat');
    updateControlButtons();
}

function handleSkip() {
    timer.skip();
    playButtonSound('btn_click');
    updateControlButtons();
}

// Manejadores de Vista Previa de Audio
function playAlarmPreview() {
    playButtonSound('btn_click');
    timer.playPreview('alarm');
}

function playFocusPreview() {
    playButtonSound('btn_click');
    timer.playPreview('focus');
}

// Manejadores del Modal de Configuración
function openSettings() {
    playButtonSound('btn_click');
    timer.pause();
    updateControlButtons();
    updateUIFromSettings();
    elements.settingsModal.classList.add('active');
}

function closeSettings() {
    playButtonSound('btn_click');
    elements.settingsModal.classList.remove('active');
    
    // Detener cualquier vista previa
    const alarmAudio = document.getElementById('alarm-sound-asset');
    const focusAudio = document.getElementById('focus-sound-asset');
    
    if (alarmAudio) {
        alarmAudio.pause();
        alarmAudio.currentTime = 0;
    }
    
    // Solo detener sonido de enfoque si el temporizador NO está en ejecución
    // Si el temporizador ESTÁ en ejecución, queremos que el sonido de enfoque siga reproduciéndose
    if (focusAudio && !timer.isRunning) {
        focusAudio.pause();
        focusAudio.currentTime = 0;
    }
}

function saveSettings() {
    playButtonSound('btn_click');
    const newSettings = {
        workTime: parseInt(elements.pomodoroTime.value),
        shortBreakTime: parseInt(elements.shortBreakTime.value),
        longBreakTime: parseInt(elements.longBreakTime.value),
        longBreakInterval: parseInt(elements.longBreakInterval.value),
        autoStartBreaks: elements.autoStartBreaks.checked,
        autoStartPomodoros: elements.autoStartPomodoros.checked,
        soundEnabled: true, // Siempre habilitado por ahora
        alarmSound: elements.alarmSound.value,
        alarmVolume: parseInt(elements.alarmVolume.value),
        focusSound: elements.focusSound.value,
        focusVolume: parseInt(elements.focusVolume.value),
        notificationEnabled: elements.enableNotifications.checked,
        reminderMinutes: parseInt(elements.notificationReminder.value),
        darkModeWhenRunning: elements.darkModeRunning.checked,
        smallWindow: elements.smallWindow.checked,
        todoistToken: elements.todoistToken.value,
        webhookUrl: elements.webhookUrl.value,
        autoCheckTasks: elements.autoCheckTasks.checked,
        checkToBottom: elements.checkToBottom.checked,
        hourFormat: elements.hourFormat.value
    };
    
    timer.updateSettings(newSettings);
    closeSettings();
    updateUIFromSettings();
    timer.updateUI();
}

function resetToDefaults() {
    playButtonSound('btn_click');
    timer.resetToDefaults();
    updateUIFromSettings();
}

// Manejadores de Tema
function toggleTheme() {
    playButtonSound('btn_click');
    const body = document.body;
    
    // Preservar la clase de plataforma al cambiar de tema
    const isWeb = body.classList.contains('platform-web');
    
    if (body.classList.contains('theme-ganja-reggae')) {
        body.className = 'theme-dark';
    } else if (body.classList.contains('theme-dark')) {
        body.className = 'theme-light';
    } else if (body.classList.contains('theme-light')) {
        body.className = 'theme-minimal';
    } else {
        body.className = 'theme-ganja-reggae';
    }
    
    // Re-agregar clase platform-web si estaba establecida
    if (isWeb) {
        body.classList.add('platform-web');
    }
}

// Manejador de Dispositivo Móvil
function addMobileDevice() {
    playButtonSound('btn_click');
    // Esto se integraría con una aplicación o servicio móvil
    alert('¡Dispositivo móvil agregado! Sincronizando con la aplicación Porrodoro móvil...');
    
    // En una implementación real, esto:
    // 1. Generaría un token de dispositivo
    // 2. Lo enviaría a un servidor
    // 3. Lo almacenaría para sincronización
}

// Listeners de Campos de Configuración
function setupSettingsInputs() {
    // Actualizaciones en tiempo real para algunas configuraciones
    elements.alarmVolume.addEventListener('input', (e) => {
        const volume = parseInt(e.target.value);
        timer.alarmVolume = volume;
        
        // Actualizar volumen en tiempo real para vista previa
        const audio = document.getElementById('alarm-sound-asset');
        if (audio) {
            audio.volume = volume / 100;
        }
    });
    
    elements.focusVolume.addEventListener('input', (e) => {
        const volume = parseInt(e.target.value);
        timer.focusVolume = volume;
        
        // Actualizar volumen en tiempo real para sonido de enfoque
        const audio = document.getElementById('focus-sound-asset');
        if (audio) {
            audio.volume = volume / 100;
        }
    });
    
    // Manejar cambios en la selección de sonido en tiempo real
    elements.alarmSound.addEventListener('change', (e) => {
        timer.alarmSound = e.target.value;
    });
    
    elements.focusSound.addEventListener('change', (e) => {
        timer.focusSound = e.target.value;
        // Si el temporizador está en ejecución y el sonido de enfoque cambió, actualizarlo inmediatamente
        if (timer.isRunning) {
            timer.playFocusSound();
        }
    });
    
    elements.hourFormat.addEventListener('change', (e) => {
        timer.hourFormat = e.target.value;
    });
}

// Actualizar UI desde la Configuración del Temporizador
function updateUIFromSettings() {
    elements.pomodoroTime.value = Math.round(timer.workTime / 60);
    elements.shortBreakTime.value = Math.round(timer.shortBreakTime / 60);
    elements.longBreakTime.value = Math.round(timer.longBreakTime / 60);
    elements.longBreakInterval.value = timer.longBreakInterval;
    elements.autoStartBreaks.checked = timer.autoStartBreaks;
    elements.autoStartPomodoros.checked = timer.autoStartPomodoros;
    elements.alarmSound.value = timer.alarmSound;
    elements.alarmVolume.value = timer.alarmVolume;
    elements.focusSound.value = timer.focusSound;
    elements.focusVolume.value = timer.focusVolume;
    elements.enableNotifications.checked = timer.notificationEnabled;
    elements.notificationReminder.value = timer.reminderMinutes;
    elements.darkModeRunning.checked = timer.darkModeWhenRunning;
    elements.smallWindow.checked = timer.smallWindow;
    elements.todoistToken.value = timer.todoistToken;
    elements.webhookUrl.value = timer.webhookUrl;
    elements.autoCheckTasks.checked = timer.autoCheckTasks;
    elements.checkToBottom.checked = timer.checkToBottom;
    elements.hourFormat.value = timer.hourFormat;
    
    // Actualizar tema según la configuración
    if (timer.darkModeWhenRunning && timer.isRunning) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
}

// Actualizar Botones de Control
function updateControlButtons() {
    const playPauseLabel = document.getElementById('play-pause-label');
    
    // Siempre mostrar el botón de reproducción (sin botón de pausa visible)
    elements.startBtn.style.display = 'block';
    elements.pauseBtn.style.display = 'none';
    
    // Actualizar etiqueta según el estado del temporizador
    if (playPauseLabel) {
        playPauseLabel.textContent = timer.isRunning ? 'Pausa' : 'Iniciar';
    }
}

// Solicitar Permiso de Notificación
function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Permiso de notificación concedido');
            } else {
                console.log('Permiso de notificación denegado');
            }
        });
    }
}

// ============================================
// Controles de la Barra de Título (ventana sin marco)
// ============================================

// Minimizar ventana
elements.minimizeBtn.addEventListener('click', () => {
    playButtonSound('btn_click');
    if (window.require) {
        try {
            const { remote } = window.require('electron');
            const win = remote.getCurrentWindow();
            win.minimize();
        } catch (e) {
            console.log('Electron no disponible');
        }
    }
});

// Cerrar ventana
elements.closeBtn.addEventListener('click', () => {
    playButtonSound('btn_click');
    if (window.require) {
        try {
            const { remote } = window.require('electron');
            const win = remote.getCurrentWindow();
            win.close();
        } catch (e) {
            console.log('Electron no disponible, cerrando pestaña');
            window.close();
        }
    } else {
        // Alternativa para navegador: cerrar la ventana/pestaña
        window.close();
    }
});

// ============================================
// Sistema de Tareas
// ============================================

let tasks = [];

// Cargar tareas desde localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('porrodoroTasks');
    if (savedTasks) {
        try {
            tasks = JSON.parse(savedTasks);
        } catch (e) {
            tasks = [];
        }
    }
    renderTasks();
}

// Guardar tareas en localStorage
function saveTasks() {
    localStorage.setItem('porrodoroTasks', JSON.stringify(tasks));
    updateTasksCount();
}

// Actualizar contador de tareas
function updateTasksCount() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    elements.tasksCount.textContent = total > 0 ? `${completed}/${total}` : '0';
}

// Renderizar todas las tareas
function renderTasks() {
    elements.tasksList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = `task-item${task.completed ? ' completed' : ''}`;
        taskItem.dataset.index = index;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(index));
        
        const text = document.createElement('span');
        text.className = 'task-text';
        text.textContent = task.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'task-delete-btn';
        deleteBtn.textContent = '✕';
        deleteBtn.title = 'Eliminar tarea';
        deleteBtn.addEventListener('click', () => deleteTask(index));
        
        taskItem.appendChild(checkbox);
        taskItem.appendChild(text);
        taskItem.appendChild(deleteBtn);
        
        elements.tasksList.appendChild(taskItem);
    });
    
    updateTasksCount();
}

// Agregar una nueva tarea
function addTask() {
    playButtonSound('btn_click');
    const text = elements.taskInput.value.trim();
    if (!text) return;
    
    tasks.unshift({
        text: text,
        completed: false,
        createdAt: Date.now()
    });
    
    elements.taskInput.value = '';
    saveTasks();
    renderTasks();
    elements.taskInput.focus();
}

// Alternar estado de completado de una tarea
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Eliminar una tarea
function deleteTask(index) {
    playButtonSound('btn_click');
    const taskItem = elements.tasksList.querySelector(`[data-index="${index}"]`);
    if (taskItem) {
        taskItem.classList.add('removing');
        setTimeout(() => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }, 200);
    } else {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

// Configurar event listeners de tareas
function setupTasksListeners() {
    elements.addTaskBtn.addEventListener('click', addTask);
    
    elements.taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTask();
        }
    });
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        init();
        loadTasks();
        setupTasksListeners();
    });
} else {
    init();
    loadTasks();
    setupTasksListeners();
}

// Registrar Service Worker para PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Usar ruta relativa para que funcione tanto en desarrollo como en GitHub Pages
        navigator.serviceWorker.register('sw.js')
            .then((registration) => {
                console.log('[PWA] Service Worker registrado con éxito:', registration.scope);
            })
            .catch((error) => {
                console.log('[PWA] Service Worker no disponible en este entorno:', error);
            });
    });
}

// Exportar para pruebas
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { init, timer };
}
