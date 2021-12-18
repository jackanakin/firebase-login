import i18next from 'i18next';
import React from 'react';
import {
    Button,
    Text,
    TouchableOpacity,
} from 'react-native';
import { useGlobal } from '../../hooks/public/global';
import TextPick from '../../i18n/_ts/TextPick';
import { Container } from './_styles/welcomeScreenStyles';

const WelcomeScreen: React.FC = () => {
    const { disableLandingScreen } = useGlobal();

    return (
        <Container>
            <Text>WelcomeScreen2</Text>
            <Text>{i18next.t(TextPick.Screens.WelcomeText.welcomeMessage)}</Text>
            <TouchableOpacity onPress={disableLandingScreen}>
                <Text>DISABLE WELCOME</Text>
            </TouchableOpacity>
        </Container >
    );
};

export default WelcomeScreen;