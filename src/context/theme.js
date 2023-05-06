import React, {useState } from "react";
import { ThemeProvider } from "styled-components";
import {dark} from "../theme"

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
    dark
}

export const ThemePreferenceContext = React.createContext()

const Theme = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState('dark')

    const theme = { ...base, colors: themesMap[currentTheme] }

    return (
        <ThemePreferenceContext.Provider value={{ currentTheme, setCurrentTheme }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemePreferenceContext.Provider>
    )
};

export default Theme;