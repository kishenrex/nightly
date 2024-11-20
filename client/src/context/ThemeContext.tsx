import React, { SetStateAction, useState } from 'react';

export const themes = {
 light: {
  boolean: true,
   foreground: '#FDF6EC',
   background: '#ECE5DB',
   calendarBackground: '#cBDB7AF',
   nightRoutineBackground: '#97928C',
   fontColor: '#3F3A3A',
   fontColor_sub: '#999999',
   landingPageBackgroundImage: 'LightThemeLandingPage.jpg',
   borderColor: '#000000',
   timerColor: '#3F3A3A',
 },
 dark: {
  boolean: false,
   foreground: '#2d1b69',
   background: '#1a103f',
   calendarBackground: '#1a103f',
   nightRoutineBackground: '#351c75',
   fontColor: '#f3f6f4',
   fontColor_sub: '#f3f6f4',
   landingPageBackgroundImage: 'DarkThemeLandingPage.jpg',
   borderColor: '#f3f6f4',
   timerColor: '#FFEDED',
 },
};

interface ThemeContextType {
    theme: any;
    setTheme: React.Dispatch<SetStateAction<{ 
        boolean: boolean;
        foreground: string; 
        background: string;
        calendarBackground: string;
        nightRoutineBackground: string;
        fontColor: string;
        landingPageBackgroundImage: string;
        borderColor: string;
        fontColor_sub: string;
     }>>,

};

const initialState: ThemeContextType = {
    theme: themes.light,
    setTheme: () => {},
};

export const ThemeContext = React.createContext<ThemeContextType>(
    initialState);


export const ThemeProvider = (props: any) => {
    const [theme, setTheme] = useState(initialState.theme);
  return (
    <ThemeContext.Provider 
    value={{ 
        theme: theme, 
        setTheme: setTheme, 
        }}>
      {props.children}
    </ThemeContext.Provider>
  );
};