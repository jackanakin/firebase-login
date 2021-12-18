import React, {
    createContext,
    useState,
    useContext,
    useEffect,
} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AsyncStorageAlias } from "../../global/async-storage/AsyncStorageAlias";
import DefaultProviderProps from "../../types/hooks/DefaultProviderProps";

interface GlobalContextData {
    loading: boolean;
    showLandingScreen: boolean;
    disableLandingScreen(): Promise<void>;
}

const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData);

const GlobalProvider: React.FC = ({ children }: DefaultProviderProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [showLandingScreen, setShowLandingScreen] = useState<boolean>(true);

    const disableLandingScreen = async () => {
        await AsyncStorage.setItem(`${AsyncStorageAlias.showLandingScreen}`, "false");
        setShowLandingScreen(false);
    };

    async function loadAsyncStorageGlobal(): Promise<void> {
        //load showLandingScreen from async storage
        const showLandingScreen = await AsyncStorage.getItem(`${AsyncStorageAlias.showLandingScreen}`);
        if (showLandingScreen === "false") {
            setShowLandingScreen(false);
        }

        setLoading(false);
    }

    useEffect(() => {
        loadAsyncStorageGlobal();
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                showLandingScreen,
                loading,
                disableLandingScreen,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

function useGlobal(): GlobalContextData {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error("useGlobal must be used within an GlobalContext");
    }

    return context;
}

export { GlobalProvider, useGlobal };