import { createContext, useContext, useState } from "react";

const ThemeContext = createContext()

export const useTheme = () => {
    return useContext(ThemeContext)
}

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('dark')
    // 
    const toggleTheme = () => {
        // document.body.classList.toggle("bg-dark")
        let newtheme = (theme === 'dark') ? "light" : "dark";
        localStorage.setItem("theme", newtheme)

        // sessionStorage.setItem("theme", newtheme)
        // document.cookie = 'theme='+newtheme;
        // document.cookie = 'dark='+newtheme;

        // console.log(localStorage.getItem("theme"))
        // // 
        // localStorage.removeItem('theme')

        // console.log(document.cookie)
        setTheme(newtheme);
        
    }
    return (
        <ThemeContext.Provider value={{theme: theme, toggleTheme: toggleTheme}} >
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;