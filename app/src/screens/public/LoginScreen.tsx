import React, { useState } from 'react';
import {
    Text, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

import { Container } from './_styles/loginScreenStyles';
import { SignInRoutesTS } from '../../routes/_ts/SignInRoutesTS';
import { useSignIn } from '../../hooks/public/signin';
import DefaultInput from '../../components/Input/DefaultInput';
import DefaultButton from '../../components/Button/DefaultButton';

const LoginScreen: React.FC = () => {
    const navigation = useNavigation();
    const { signInWithFirebase, signInWithGoogle,
        loading: signInLoading } = useSignIn();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function onLogin() {
        await signInWithFirebase({ email, password });
    }

    return (
        <Container>
            <Text>LoginScreen</Text>

            <DefaultInput
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false} />

            <DefaultInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false} />

            <DefaultButton onPress={onLogin}>
                {signInLoading ? "loading" : "LOGIN"}
            </DefaultButton>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signInWithGoogle}
            />

            <TouchableOpacity onPress={() => navigation.navigate(SignInRoutesTS.SignInRoutes_RegisterScreen)}>
                <Text>Go TO RegisterScreen</Text>
            </TouchableOpacity>
        </Container >
    );
};

export default LoginScreen;