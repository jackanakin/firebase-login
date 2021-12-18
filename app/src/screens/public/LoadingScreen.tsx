import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { ThemeContext } from 'styled-components';
import { ThemeOptions } from "../../global/theme/_ts/ThemeOptions";

const LoadingScreen: React.FC = () => {
    const theme = useContext(ThemeContext) as ThemeOptions;

    return (
        <View
            style={{
                backgroundColor: theme.defaultPageColor,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <ActivityIndicator size="large" color={theme.buttonPrimaryColor} />
        </View>
    );
}

export default LoadingScreen;