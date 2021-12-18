import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

import { Container } from './_styles/loginScreenStyles';
import { SignInRoutesTS } from '../../routes/_ts/SignInRoutesTS';
import DefaultInput from '../../components/Input/DefaultInput';
import DefaultButton from '../../components/Button/DefaultButton';
import { useSignIn } from '../../hooks/public/signin';

const RegisterScreen: React.FC = () => {
    const navigation = useNavigation();
    const { signUpWithFirebase, signInWithGoogle } = useSignIn();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");

    return (
        <Container>
            <Text>RegisterScreen</Text>
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

            <DefaultInput
                placeholder="Password Confirm"
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                autoCapitalize="none"
                autoCorrect={false} />

            <DefaultButton onPress={() => signUpWithFirebase(password, passwordConfirm, email)}>
                REGISTRAR
            </DefaultButton>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signInWithGoogle}
            />

            <TouchableOpacity onPress={() => navigation.navigate(SignInRoutesTS.SignInRoutes_LoginScreen)}>
                <Text>Go TO LoginScreen</Text>
            </TouchableOpacity>
        </Container >
    );
};

export default RegisterScreen;