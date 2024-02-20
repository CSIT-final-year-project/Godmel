import { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({children})=>{
    const [theme, setTheme] = useState(localStorage.getItem("theme"));

    const toggleTheme = ()=>{
        let newTheme = (theme === 'dark')?"light":"dark";
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    }

    return (
        <ThemeContext.Provider value={{theme: theme, toggleTheme: toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider