import React, {useState, useEffect} from "react";
import { ThemeProvider } from "styled-components";
import {light, dark} from "../theme"

const base = {
  fonts: ["Plus Jakarta Sans"],
  fontSizes: {
    small: "12px",
    medium: "15px",
    large: "18px",
    xl:"24px"
  }
};

const themesMap = {
    light,
    dark
}

export const ThemePreferenceContext = React.createContext()

const Theme = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState('light')

    useEffect(() => {
        // Récupération de la préférence utilisateur
        const themeQuery = window.matchMedia('(prefers-color-scheme: light)')

        setCurrentTheme(themeQuery.matches ? 'light' : 'dark')
        themeQuery.addEventListener('change', ({ matches }) => {
            setCurrentTheme(matches ? 'light' : 'dark')
        })
    }, [])

    const theme = { ...base, colors: themesMap[currentTheme] }

    return (
        <ThemePreferenceContext.Provider value={{ currentTheme, setCurrentTheme }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemePreferenceContext.Provider>
    )
};

export default Theme;