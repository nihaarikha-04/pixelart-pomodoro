import { useState, useEffect, useRef } from "react";
import './RunningTimer.css';
import WindowButtons  from "./WindowButtons";
import bgImage from './bg-image.png';
import candleFirstImage from './candleFirstPhase-1.png';
import candleSecondImage from './candleFirstPhase-2.png';
import halfCandleFirstImage from './candleSecondPhase-1.png';
import halfCandleSecondImage from './candleSecondPhase-2.png';
import threeFourthCandleFirstImage from './candleThirdPhase-1.png';
import threeFourthCandleSecondImage from './candleThirdPhase-2.png';
import finalCandleImage from './candleFinalPhase.png';
import tableImage from './table-image.png';

function RunningTimer({ workMinutes, breakMinutes, startWithBreak, onExit, onSessionComplete, onMinimize, onClose }) {
    const [timeLeft, setTimeLeft] = useState(workMinutes*60);
    const [isWorkSession, setIsWorkSession] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const [flameToggle, setFlameToggle] = useState(false);
    const intervalRef = useRef(null);
    const candleIntervalRef = useRef(null);

    useEffect(() => {
        setIsWorkSession(!startWithBreak);
        setTimeLeft(startWithBreak ? breakMinutes*60 : workMinutes*60);
        setIsPaused(false);
    }, [startWithBreak, workMinutes, breakMinutes]);

    const getCandlePhase = () => {
        if(!isWorkSession) {
            return { image1: candleFirstImage, image2: candleSecondImage, hasFlame: true };
        }
        const totalWorkTime = workMinutes*60;
        const timeElapsed = totalWorkTime - timeLeft;
        const percentElapsed = (timeElapsed/totalWorkTime)*100;
        if(percentElapsed<33) {
            return { image1: candleFirstImage, image2: candleSecondImage, hasFlame: true };
        }
        else if(percentElapsed<66) {
            return { image1: halfCandleFirstImage, image2: halfCandleSecondImage, hasFlame: true };
        }
        else if(percentElapsed<100) {
            return { image1: threeFourthCandleFirstImage, image2: threeFourthCandleSecondImage, hasFlame: true };
        }
        else {
            return { image1: finalCandleImage, image2: finalCandleImage, hasFlame: false };
        }
    };

    const getCurrentCandleImage = () => {
        const phase = getCandlePhase();
        if(!phase.hasFlame) {
            return phase.image1;
        }
        if(isPaused) {
            return phase.image1;
        }
        return flameToggle ? phase.image1 : phase.image2;
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds/60);
        const secs = seconds%60;
        const minStr = mins.toString().padStart(2, '0');
        const secStr = secs.toString().padStart(2, '0');
        return {
            min1: minStr[0],
            min2: minStr[1],
            sec1: secStr[0],
            sec2: secStr[1]
        }
    };

    useEffect(() => {
        if(!isPaused) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if(prev <= 1) {
                        clearInterval(intervalRef.current);
                        handleSessionComplete();
                        return 0;
                    }
                    return prev-1;
                });
            }, 1000);
        } else {
            if(intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
        return () => {
            if(intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPaused, isWorkSession]);

    useEffect(() => {
        if(!isPaused) {
            candleIntervalRef.current = setInterval(() => {
                setFlameToggle((prev) => !prev);
            }, 1000);
        } else {
            if(candleIntervalRef.current) {
                clearInterval(candleIntervalRef.current);
            }
        }
        return () => {
            if(candleIntervalRef.current) {
                clearInterval(candleIntervalRef.current);
            }
        };
    }, [isPaused]);

    const handleSessionComplete = () => {
        const sessionType = isWorkSession ? 'work' : 'break';
        onSessionComplete(sessionType);
    };

    const handlePause = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setTimeLeft(isWorkSession ? workMinutes*60 : breakMinutes*60);
        setIsPaused(false);
    }

    return (
        <div className="timer-page">
            <WindowButtons onMinimize={onMinimize} onClose={onClose} />
            <h1 className="title">Pomodoro Timer</h1>
            <img src={bgImage} className="candle-image"/>
            <div className="timer-display">
                <h2 className="session-type">
                    {isWorkSession ? 'Work Time:' : 'Break Time:'}
                </h2>
                <div className="timer-clock">
                    <div className="digit-box">
                        <span className="digit">{formatTime(timeLeft).min1}</span>
                    </div>
                    <div className="digit-box">
                        <span className="digit">{formatTime(timeLeft).min2}</span>
                    </div>
                    <div className="digit-box">
                        <span className="digit">:</span>
                    </div>
                    <div className="digit-box">
                        <span className="digit">{formatTime(timeLeft).sec1}</span>
                    </div>
                    <div className="digit-box">
                        <span className="digit">{formatTime(timeLeft).sec2}</span>
                    </div>
                </div>
            </div>
            <img src={tableImage} className="table-image"/>
            <img src={getCurrentCandleImage()} className="candleFirst-image"/>
            <button className="pause-button" onClick={handlePause}> {isPaused ? 'Resume' : 'Pause'} </button>
            <button className="reset-button" onClick={handleReset}> Reset </button>
            <button className="exit-button" onClick={onExit}> Exit </button>
        </div>
    );
}

export default RunningTimer;