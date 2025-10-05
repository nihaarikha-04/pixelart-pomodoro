import { useState } from 'react';
import './Timer.css';
import WindowButtons from './WindowButtons';

function Timer({ onBack, onBegin, onMinimize, onClose }) {
    const [workMinutes, setWorkMinutes] = useState(25);
    const breakMinutes = Math.round(workMinutes*0.2);

    const handleBegin = () => {
        onBegin(workMinutes, breakMinutes);
    };
    return (
        <div className='timer-page'>
            <WindowButtons onMinimize={onMinimize} onClose={onClose} />
            <h1 className='timer-title'>Pomodoro Timer</h1>
            <div className="bg-image"/>
            <h2 className='setTime-title'>Set Your Time</h2>
            <div className='time-input'>
                <label className='work-label'> Work Time (mins): </label>
                <input className="work-input" type="number"
                value={workMinutes}
                onChange={(e) => setWorkMinutes(e.target.value)}
                min="1"
                max="60"
                />
            </div>
            <div className='time-input'>
                <label className='break-label'> Break Time (mins): </label>
                <input className="break-input" type="number"
                value={breakMinutes}
                onChange={(e) => setBreakMinutes(e.target.value)}
                min="1"
                max="20"
                disabled
                readOnly
                style={{ cursor: 'not allowed' }}
                />
            </div>
            <button className='begin-button' onClick={handleBegin}> Begin </button>
            <button className='back-button' onClick={onBack}> Back </button>
        </div>
    );
}

export default Timer;