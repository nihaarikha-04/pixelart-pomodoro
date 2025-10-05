import React from "react";
import './CompletionPage.css';
import WindowButtons from "./WindowButtons";
import bgImage from './bg-image.png';
import tableImage from './table-image.png';
import finalCandleImage from './candleFinalPhase.png';

function CompletionPage({ type, breakMinutes, onContinue, onExit, onMinimize, onClose }) {
    const isWorkComplete = type === 'work';
    const hasBreak = breakMinutes >= 1;

    return ( 
        <div className="app-box">
            <WindowButtons onMinimize={onMinimize} onClose={onClose} />
            <h1 className="title">Pomodoro Timer</h1>
            <img src={bgImage} className="candle-image"/>
            <h2 className="completion-title">
                {isWorkComplete ? 'Yay! Great Work.' : 'Break Over :('}
            </h2>
            <p className="completion-text">
                {isWorkComplete
                ? (hasBreak
                    ? 'Good Job on completing the session. Take a break.' 
                    : 'God Job. Time to sit for another session and get things done.')
                : 'Time to sit for another session and get things done.'}
            </p>
            <img src={tableImage} className="table-image"/>
            <img src={finalCandleImage} className="candleFinal-image"/>
            <button className="continue-button" onClick={onContinue}>
            {isWorkComplete
                ? (hasBreak
                    ? 'Start Break' 
                    : 'Start Work')
                : 'Start Work'}
            </button>
            <button className="exitLast-button" onClick={onExit}>
                Exit
            </button>
        </div>
    );
}

export default CompletionPage;