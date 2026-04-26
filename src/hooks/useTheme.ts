import {useEffect, useState} from "react";


type ThemeMode = 'light' | 'dark';

export const useTheme = () => {

    const [themeMode, setThemeMode] = useState<ThemeMode>(()=>{

        let saved = localStorage.getItem("themeMode")

        if (!saved) {
            saved = 'light';
            localStorage.setItem("themeMode", saved);
        }
        return (saved === 'light' || saved === 'dark') ? saved as ThemeMode : 'light'
    })

    useEffect(() => {
        const root = document.documentElement;
        if (themeMode === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('themeMode', themeMode);
    }, [themeMode]);

    const toggleTheme = () => {
        setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
    };

    return { themeMode, toggleTheme };
}