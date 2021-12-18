import React, { useEffect } from 'react';
import {
    Text,
} from 'react-native';
import DefaultButton from '../../../components/Button/DefaultButton';
import { useSignIn } from '../../../hooks/public/signin';
import { Container } from './_styles/emailNotVerifiedScreenStyles';

const EmailNotVerifiedScreen: React.FC = () => {
    const { reloadFirebaseUser, user } = useSignIn();

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                reloadFirebaseUser();
            } catch (error) {
            }
        }, 2000);
        return () => clearInterval(interval);
    });

    return (
        <Container>
            <Text>EmailNotVerifiedScreen</Text>
            <Text>Please verify your e-mail</Text>

            <Text>{user?.email}</Text>

            <DefaultButton onPress={() => user?.sendEmailVerification()}>
                MANDAR LINK DE CONFIRMAÇÃO
            </DefaultButton>
        </Container >
    );
};

export default EmailNotVerifiedScreen;