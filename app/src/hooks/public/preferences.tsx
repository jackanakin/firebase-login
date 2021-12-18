import React, {
    createContext,
    useState,
    useContext,
    useEffect,
} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as i18n from "../../i18n/i18n";
import { AsyncStorageAlias } from "../../global/async-storage/AsyncStorageAlias";
import { LanguagesInterface } from "../../global/languages/LanguagesInterface";
import { LIGHT_THEME } from "../../global/theme/lightTheme";
import { DARK_THEME } from "../../global/theme/darkTheme";
import { ThemesInterface } from "../../global/theme/_ts/ThemesInterface";
import DefaultProviderProps from "../../types/hooks/DefaultProviderProps";

interface PreferencesContextData {
    theme: ThemesInterface;
    language: string;
    loading: boolean;
    setNewTheme(newTheme: ThemesInterface): Promise<void>;
    setNewLanguage(newLanguage: LanguagesInterface): Promise<void>;
}

const PreferencesContext = createContext<PreferencesContextData>({} as PreferencesContextData);

const PreferencesProvider: React.FC = ({ children }: DefaultProviderProps) => {
    const [theme, setTheme] = useState<any>(LIGHT_THEME);
    const [language, setLanguage] = useState<LanguagesInterface>(LanguagesInterface.pt_br);
    const [loading, setLoading] = useState(true);

    async function loadAsyncStoragePreferences(): Promise<void> {
        //load local preferences from async storage (language, theme)
        const preferences = await AsyncStorage.multiGet(
            [`${AsyncStorageAlias.theme}`,
            `${AsyncStorageAlias.language}`]
        );

        const localTheme = preferences[0][1] as ThemesInterface;
        const localLanguage = preferences[1][1] as LanguagesInterface;

        if (localTheme) {
            loadThemeConfig(localTheme);
        }

        if (localLanguage) {
            setLanguage(localLanguage);
            i18n.init(localLanguage);
        } else {
            i18n.init(language);
        }
        setLoading(false);
    }

    useEffect(() => {
        loadAsyncStoragePreferences();
    }, []);

    const setNewTheme = async (newTheme: ThemesInterface) => {
        await AsyncStorage.setItem(`${AsyncStorageAlias.theme}`, newTheme);

        loadThemeConfig(newTheme);
    };

    const setNewLanguage = async (newLanguage: LanguagesInterface) => {
        await AsyncStorage.setItem(`${AsyncStorageAlias.language}`, newLanguage);
        i18n.init(newLanguage);
        setLanguage(newLanguage);
    };

    function loadThemeConfig(theme: ThemesInterface | null) {
        if (theme === ThemesInterface.DARK_THEME) {
            setTheme(DARK_THEME);
        }
    }

    return (
        <PreferencesContext.Provider
            value={{
                theme,
                language,
                loading,
                setNewTheme,
                setNewLanguage
            }}
        >
            {children}
        </PreferencesContext.Provider>
    );
};

function usePreferences(): PreferencesContextData {
    const context = useContext(PreferencesContext);

    if (!context) {
        throw new Error("usePreferences must be used within an PreferencesContext");
    }

    return context;
}

export { PreferencesProvider, usePreferences };