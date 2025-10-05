import { useState } from 'react';
import './App.css';
import bgImage from './bg-image.png';
import candleImage from './candleFirst-image.png';
import tableImage from './table-image.png';
import WindowButtons from './WindowButtons';
import Timer from './Timer';
import RunningTimer from './RunningTimer';
import CompletionPage from './CompletionPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [timerSettings, setTimerSettings] = useState({
    workMinutes: 25,
    breakMinutes: 5
  });

  const [completionType, setCompletionType] = useState('work');
  const [nextSession, setNextSession] = useState('work');

  const handleMinimize = () => {
    if(window?.electronAPI?.minimize) {
      window.electronAPI.minimize();
    }
  };
  const handleClose = () => {
    if(window?.electronAPI?.close) {
      window.electronAPI.close();
    }
  };
  const handleStart = () => {
    setCurrentPage('timer');
  };
  const handleBack = () => {
    setCurrentPage('home');
  };
  const handleBegin = (workMins, breakMins) => {
    setTimerSettings({ workMinutes: workMins, breakMinutes: breakMins });
    setNextSession('work');
    setCurrentPage('running');
  }
  const handleExit = () => {
    setCurrentPage('home');
  }
  const handleSessionComplete = (type) => {
    setCompletionType(type);
    if(type === 'work') {
      if(timerSettings.breakMinutes < 1) {
        setNextSession('work');
      }
      else {
        setNextSession('break');
      }
    } else {
      setNextSession('work');
    }
    setCurrentPage('completion');
  }
  const handleContinue = () => {
    setCurrentPage('running');
  }
  if(currentPage === 'home') {
    return (
      <div className="app-box">
        <WindowButtons onMinimize={handleMinimize} onClose={handleClose} />
        <h1 className="title">Pomodoro Timer</h1>
        <img src={bgImage} className="candle-image"/>
        <img src={tableImage} className="table-image"/>
        <img src={candleImage} className="candleFirst-image"/>
        <button className="start-button" onClick={handleStart}>Start</button>
      </div>
    );
  }
  if(currentPage === 'timer') {
    return (
      <Timer onBack={handleBack} onBegin={handleBegin} onMinimize={handleMinimize} onClose={handleClose} />
    );
  }
  if(currentPage === 'running') {
    return (
      <RunningTimer
        workMinutes={timerSettings.workMinutes}
        breakMinutes={timerSettings.breakMinutes}
        startWithBreak={nextSession === 'break'}
        onExit={handleExit}
        onSessionComplete={handleSessionComplete}
        onMinimize={handleMinimize}
        onClose={handleClose}
      />
    );
  }
  if(currentPage === 'completion') {
    return (
      <CompletionPage
        type={completionType}
        breakMinutes={timerSettings.breakMinutes}
        onContinue={handleContinue}
        onExit={handleExit}
        onMinimize={handleMinimize}
        onClose={handleClose}
      />
    );
  }
}
export default App;