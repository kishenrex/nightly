import React from 'react'
import { createContext, useRef } from 'react'
import { useState, useEffect} from 'react'

interface TimerContextType {
    time: number;
    setTime: React.Dispatch<React.SetStateAction<number>>;
    running: boolean;
    setRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState: TimerContextType = {
    time: 0,
    setTime: () => {},
    running: true,
    setRunning: () => {},
};

export const TimerContext = createContext<TimerContextType>(initialState);

function useLocalStorage(key: string, initialValue: any, parseValue = (v: any) => v) {
  const [item, setValue] = useState(() => {
    const value = parseValue(localStorage.getItem(key)) || initialValue
    localStorage.setItem(key, value)
    return value
  })

  const setItem = (newValue: string) => {
    setValue(newValue)
    window.localStorage.setItem(key, newValue)
  }

  return [item, setItem]
}

export const TimerProvider = (props: any) => {
 const [time, setTime] = useLocalStorage('timer:time', 0, v => Number(v));
  const [running, setRunning] = useLocalStorage(
    'timer:running',
    false,
    string => string === 'true',
  );
  const timerRef = useRef<any>();

    useEffect(() => {
     const startTime = Date.now() - time;
    let timer: string | number | NodeJS.Timeout | undefined;
      timer = setInterval(() => {
      if (running) {
        setTime(Math.round((Date.now() - startTime) / 1000) * 1000);
      }
    }, 1000);
    
    timerRef.current = timer;

    return () => clearInterval(timerRef.current);
  }, [running, time, setTime]);

    return <TimerContext.Provider value={{ time, setTime, running, setRunning}}> 
        {props.children}
       </TimerContext.Provider>

}