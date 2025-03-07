import React from 'react';

function App() {
  const [minutes, setMinutes] = React.useState(25);
  const [seconds, setSeconds] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const [mode, setMode] = React.useState('work'); // 'work', 'smoke', 'munchies'
  const [cycles, setCycles] = React.useState(0);
  const [volume, setVolume] = React.useState(0.5);
  const [showSettings, setShowSettings] = React.useState(false);
  const [lottieLoaded, setLottieLoaded] = React.useState(false);

  // Sound options for alarm
  const [selectedSound, setSelectedSound] = React.useState('cough1');
  const soundOptions = {
    cough1: {
      name: "Tos Fuerte",
      url: "assets/cough1.mp3"
    },
    cough2: {
      name: "Tos Suave",
      url: "assets/cough3.mp3"
    },
    cough3: {
      name: "Tos con Risa",
      url: "assets/cough2.mp3"
    },
    original: {
      name: "Alarma Original",
      url: "https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3"
    }
  };

  const audioRef = React.useRef(null);
  const lottieContainerRef = React.useRef(null);

  // Timer settings
  const [workTime, setWorkTime] = React.useState(25);
  const [smokeTime, setSmokeTime] = React.useState(5);
  const [munchiesTime, setMunchiesTime] = React.useState(15);
  const [cyclesBeforeMunchies, setCyclesBeforeMunchies] = React.useState(4);

  // Custom Lottie animations provided by the user
  const lottieAnimations = {
    work: "https://lottie.host/ac63b09d-caff-4fbb-8f96-0ad1820ac370/n3mYPG3Dow.lottie",
    smoke: "https://lottie.host/52953312-d562-4b31-82a6-eb7558f41e8c/RbrPXqG0D0.lottie",
    munchies: "https://lottie.host/26b32ea3-b141-4fc1-b03b-4124fcb07442/rtN1joojW4.lottie"
  };

  React.useEffect(() => {
    // Load DotLottie script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js';
    script.async = true;
    script.onload = () => setLottieLoaded(true);
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  React.useEffect(() => {
    // Update Lottie animation when mode changes
    if (lottieLoaded && lottieContainerRef.current) {
      // Clear previous content
      lottieContainerRef.current.innerHTML = '';

      // Create new dotlottie-player element
      const lottieElement = document.createElement('dotlottie-player');
      lottieElement.src = lottieAnimations[mode];
      lottieElement.setAttribute('autoplay', '');
      lottieElement.setAttribute('loop', '');
      lottieElement.style.width = '100%';
      lottieElement.style.height = '100%';

      // Append to container
      lottieContainerRef.current.appendChild(lottieElement);
    }
  }, [mode, lottieLoaded]);

  // Update audio source when selected sound changes
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = soundOptions[selectedSound].url;
    }
  }, [selectedSound]);

  React.useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            clearInterval(interval);
            playAlarm();
            handleTimerComplete();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const playAlarm = () => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play();
    }
  };

  // Test play sound function
  const testSound = (soundKey) => {
    setSelectedSound(soundKey);
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleTimerComplete = () => {
    setIsActive(false);

    if (mode === 'work') {
      const newCycles = cycles + 1;
      setCycles(newCycles);

      if (newCycles % cyclesBeforeMunchies === 0) {
        // Time for munchies break
        setMode('munchies');
        setMinutes(munchiesTime);
      } else {
        // Time for smoke break
        setMode('smoke');
        setMinutes(smokeTime);
      }
    } else {
      // Back to work after break
      setMode('work');
      setMinutes(workTime);
    }

    setSeconds(0);
  };

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);

    if (mode === 'work') {
      setMinutes(workTime);
    } else if (mode === 'smoke') {
      setMinutes(smokeTime);
    } else {
      setMinutes(munchiesTime);
    }

    setSeconds(0);
  };

  const skipToNext = () => {
    setIsActive(false);
    handleTimerComplete();
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const applySettings = () => {
    // Apply new settings and reset timer
    if (mode === 'work') {
      setMinutes(workTime);
    } else if (mode === 'smoke') {
      setMinutes(smokeTime);
    } else {
      setMinutes(munchiesTime);
    }
    setSeconds(0);
    setShowSettings(false);
  };

  // Get background color based on current mode
  const getBgColor = () => {
    switch(mode) {
      case 'work': return 'bg-green-400';
      case 'smoke': return 'bg-purple-400';
      case 'munchies': return 'bg-yellow-400';
      default: return 'bg-green-400';
    }
  };

  // Get accent color based on current mode
  const getAccentColor = () => {
    switch(mode) {
      case 'work': return 'bg-red-500';
      case 'smoke': return 'bg-blue-500';
      case 'munchies': return 'bg-orange-500';
      default: return 'bg-red-500';
    }
  };

  // Get icon based on current mode
  const getModeIcon = () => {
    switch(mode) {
      case 'work': return <span role="img" aria-label="work">🌿</span>;
      case 'smoke': return <span role="img" aria-label="smoke">🔥</span>;
      case 'munchies': return <span role="img" aria-label="munchies">🍕</span>;
      default: return <span role="img" aria-label="work">🌿</span>;
    }
  };

  // Format time as MM:SS
  const formatTime = (min, sec) => {
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`min-h-screen ${getBgColor()} text-black font-mono p-4 flex flex-col items-center justify-center`}>
      {/* Audio element for alarm */}
      <audio ref={audioRef} src={soundOptions[selectedSound].url} />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-16 h-16 md:w-24 md:h-24 bg-red-500 rotate-45 transform -translate-x-8 -translate-y-8"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-yellow-500 rotate-45 transform translate-x-8 translate-y-8"></div>

      {/* App title */}
      <div className="neo-brutal-box bg-white mb-4 rotate-1">
        <h1 className="text-4xl md:text-5xl font-black neo-brutal-text">PORRODORO</h1>
      </div>

      {/* Lottie Animation Container - Increased size and removed padding */}
      <div className="neo-brutal-box bg-white w-48 h-48 md:w-64 md:h-64 p-0 mb-4 overflow-hidden flex items-center justify-center">
        <div ref={lottieContainerRef} className="w-full h-full"></div>
      </div>

      {/* Mode indicator - Moved up */}
      <div className={`neo-brutal-box ${getAccentColor()} text-white mb-4 rotate-1`}>
        <div className="text-xl md:text-2xl font-bold">
          <span className="text-3xl md:text-4xl mr-2">{getModeIcon()}</span>
          {mode === 'work' && 'TIEMPO DE CULTIVO'}
          {mode === 'smoke' && 'TIEMPO DE PORRO'}
          {mode === 'munchies' && 'TIEMPO DE MONCHA'}
        </div>
      </div>

      {/* Timer display */}
      <div className="neo-brutal-box bg-white mb-4 -rotate-1">
        <div className="text-5xl md:text-6xl font-black">
          {formatTime(minutes, seconds)}
        </div>
      </div>

      {/* Cycle counter */}
      <div className="neo-brutal-box bg-white mb-4 rotate-1">
        <div className="font-bold">
          CICLO: {cycles % cyclesBeforeMunchies || cyclesBeforeMunchies}/{cyclesBeforeMunchies}
        </div>
      </div>

      {/* Control buttons - mobile optimized */}
      <div className="flex flex-wrap justify-center gap-4 mb-4 w-full max-w-xs md:max-w-md">
        {!isActive ? (
          <button
            onClick={startTimer}
            className="neo-brutal-button bg-green-500 text-white rotate-1"
          >
            INICIAR
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="neo-brutal-button bg-yellow-500 text-black -rotate-1"
          >
            PAUSAR
          </button>
        )}

        <button
          onClick={resetTimer}
          className="neo-brutal-button bg-red-500 text-white rotate-2"
        >
          REINICIAR
        </button>

        <button
          onClick={skipToNext}
          className="neo-brutal-button bg-blue-500 text-white -rotate-1"
        >
          SALTAR
        </button>
      </div>

      {/* Settings button */}
<button
        onClick={toggleSettings}
        className="neo-brutal-button bg-black text-white mb-4 rotate-1"
      >
        <span role="img" aria-label="settings">⚙️</span> CONFIGURACIÓN
      </button>

      {/* Settings panel - mobile optimized */}
      {showSettings && (
        <div className="neo-brutal-box bg-white w-full max-w-xs md:max-w-md mb-4 -rotate-1">
          <h2 className="text-xl mb-4 font-black text-center">CONFIGURACIÓN</h2>

          <div className="mb-4">
            <label className="block mb-2 font-bold">TIEMPO DE CULTIVO (MIN)</label>
            <input
              type="number"
              value={workTime}
              onChange={(e) => setWorkTime(parseInt(e.target.value) || 1)}
              min="1"
              max="60"
              className="neo-brutal-input"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold">TIEMPO DE PORRO (MIN)</label>
            <input
              type="number"
              value={smokeTime}
              onChange={(e) => setSmokeTime(parseInt(e.target.value) || 1)}
              min="1"
              max="30"
              className="neo-brutal-input"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold">TIEMPO DE MONCHA (MIN)</label>
            <input
              type="number"
              value={munchiesTime}
              onChange={(e) => setMunchiesTime(parseInt(e.target.value) || 1)}
              min="1"
              max="60"
              className="neo-brutal-input"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold">CICLOS ANTES DE MONCHA</label>
            <input
              type="number"
              value={cyclesBeforeMunchies}
              onChange={(e) => setCyclesBeforeMunchies(parseInt(e.target.value) || 1)}
              min="1"
              max="10"
              className="neo-brutal-input"
            />
          </div>

          {/* Sound selector */}
          <div className="mb-4">
            <label className="block mb-2 font-bold">SONIDO DE ALARMA</label>
            <div className="flex flex-col space-y-2">
              {Object.keys(soundOptions).map((soundKey) => (
                <div key={soundKey} className="flex items-center">
                  <input
                    type="radio"
                    id={soundKey}
                    name="alarmSound"
                    value={soundKey}
                    checked={selectedSound === soundKey}
                    onChange={() => setSelectedSound(soundKey)}
                    className="mr-2 h-5 w-5"
                  />
                  <label htmlFor={soundKey} className="mr-2">{soundOptions[soundKey].name}</label>
                  <button
                     onClick={() => testSound(soundKey)}
                     className="ml-auto neo-brutal-button-small bg-purple-400 text-white"
                  >
                    🔊
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold">VOLUMEN: {Math.round(volume * 100)}%</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full neo-brutal-range"
            />
          </div>

          <button
            onClick={applySettings}
            className="neo-brutal-button bg-green-500 text-white w-full rotate-1"
          >
            APLICAR
          </button>
        </div>
      )}

      {/* Add neobrutalism style */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@900&display=swap');

          * {
            font-family: 'Rubik', sans-serif;
          }

          .neo-brutal-text {
            -webkit-text-stroke: 2px black;
            letter-spacing: 1px;
          }

          .neo-brutal-box {
            border: 3px solid black;
            box-shadow: 5px 5px 0px 0px rgba(0,0,0,1);
            padding: 0.75rem 1.5rem;
            margin: 0.5rem;
            transform-origin: center;
            transition: transform 0.2s ease;
          }

          .neo-brutal-box:hover {
            transform: translateY(-2px) rotate(0deg) !important;
          }

          .neo-brutal-button {
            border: 3px solid black;
            box-shadow: 5px 5px 0px 0px rgba(0,0,0,1);
            padding: 0.75rem 1.5rem;
            margin: 0.5rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 1px;
            transform-origin: center;
            transition: transform 0.1s ease, box-shadow 0.1s ease;
            min-width: 120px;
            text-align: center;
          }

          .neo-brutal-button-small {
            border: 2px solid black;
            box-shadow: 3px 3px 0px 0px rgba(0,0,0,1);
            padding: 0.25rem 0.5rem;
            font-weight: 900;
            transform-origin: center;
            transition: transform 0.1s ease, box-shadow 0.1s ease;
            min-width: 40px;
            text-align: center;
          }

          .neo-brutal-button:hover, .neo-brutal-button-small:hover {
            transform: translateY(-2px) rotate(0deg) !important;
          }

          .neo-brutal-button:active, .neo-brutal-button-small:active {
            transform: translateY(3px) !important;
            box-shadow: 2px 2px 0px 0px rgba(0,0,0,1);
          }

          .neo-brutal-input {
            width: 100%;
            padding: 0.5rem;
            border: 3px solid black;
            box-shadow: 3px 3px 0px 0px rgba(0,0,0,1);
            font-weight: bold;
            font-family: monospace;
          }

          .neo-brutal-range {
            -webkit-appearance: none;
            height: 15px;
            border: 3px solid black;
            box-shadow: 3px 3px 0px 0px rgba(0,0,0,1);
          }

          .neo-brutal-range::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 25px;
            height: 25px;
            background: black;
            border: 3px solid black;
            cursor: pointer;
          }

          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }

          .float-animation {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}
export default App;
