import { useState, useEffect, createContext, useContext } from "react"

const themeKey = "settings_theme";

type ThemeType = "dark" | "light" | "system";
interface SettingsContextType {
    getTheme: () => ThemeType;
    setTheme: (theme: ThemeType) => void;
}

const SettingsContext = createContext<SettingsContextType>(null!);

export function SettingsProvider({ children }: React.PropsWithChildren<any>) {
    const [initialized, setInitialized] = useState<boolean>(false);
    const [themeState, setThemeState] = useState<ThemeType>("system");

    useEffect(() => {
        switch (localStorage.getItem(themeKey)) {
            case "light":
                setThemeState("light");
                break;
            case "dark":
                setThemeState("dark");
                break;
            default:
                setThemeState("system");
                break;
        }

        if (!initialized) {
            setInitialized(true);
        }
    }, []);

    function getTheme(): "dark" | "light" | "system" {
        return themeState;
    }

    function setTheme(theme: "dark" | "light" | "system") {
        localStorage.setItem(themeKey, theme);
        setThemeState(theme);
    }

    const value: SettingsContextType = { getTheme, setTheme };

    if (!initialized)
        return <h1>Initializing...</h1>;
    else
        return <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>;
}

export function useSettings() {
    return useContext(SettingsContext);
}