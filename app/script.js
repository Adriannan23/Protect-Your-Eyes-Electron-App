import React, { useState, useMemo, useEffect } from 'react';
import { render } from 'react-dom';

const App = () => {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(null);
  const [timer, setTimer] = useState(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = (minutes < 10 ? '0' : '') + minutes;
    const formattedSeconds = (seconds < 10 ? '0' : '') + seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const formattedTime = useMemo(() => {
    return formatTime(time);
  }, [time]);

  const startTimer = () => {
    setTime(1200);
    setStatus('work');
    setTimer(
      setInterval(() => {
        setTime(time => time - 1);
      }, 1000)
    );
  };

  const stopTimer = () => {
    setTimer(null);
    setTime(null);
    setStatus('off');
    clearInterval(timer);
  };

  const closeApp = () => {
    window.close();
  }

  useEffect(() => {
    if (time === 0) {
      playBell();
      if (status === 'work') {
        setStatus('rest');
        setTime(20);
      } else {
        setStatus('work');
        setTime(1200);
      }
    }
  }, [time]);

  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === 'off' && (
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      )}
      {status === 'work' && (
        <img src="./images/Work.png" alt="Work" />
      )}
      {status === 'rest' && (
        <img src="./images/Rest.png" alt="Rest" />
      )}
      {status !== 'off' && (
        <div className="timer">
          {formattedTime}
        </div>
      )}
      {status === 'off' && (
        <button className="btn" onClick={startTimer}>Start</button>
      )}
      {status !== 'off' && (
        <button className="btn" onClick={stopTimer}>Stop</button>
      )}

      <button className="btn btn-close" onClick={closeApp}>X</button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));