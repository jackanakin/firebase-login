import React from 'react';
import { useEffect } from 'react';
import {
    Text,
} from 'react-native';

import DefaultButton from '../../components/Button/DefaultButton';
import { useSignIn } from '../../hooks/public/signin';
import { Container } from './_styles/homeScreenStyles';
import { useProfile } from '../../hooks/private/profile';
import { useNavigation } from '@react-navigation/native';
import { HomeRoutesTS } from '../../routes/_ts/HomeRoutesTS';

const HomeScreen: React.FC = () => {
    const { navigate } = useNavigation();
    const { signOut, user } = useSignIn();
    const { data: profileData,
        load: loadProfile, loading: loadingProfile, error: profileError } = useProfile();

    useEffect(() => {
        if (!profileData && !loadingProfile) {
            loadProfile();
        }
    }, [profileData?.owner_uid, loadingProfile]);

    return (
        <Container>
            <Text>Meu Perfil</Text>

            {
                loadingProfile ?
                    <Text>Carregando perfil</Text>
                    : profileError ?
                        <Text>Erro ao carregar perfil</Text>
                        :
                        <>
                            <Text>Nome: {profileData?.name}</Text>
                            <Text>cpf: {profileData?.document}</Text>
                            <Text>Cidade: {profileData?._city?.name}</Text>

                        </>
            }
            <DefaultButton onPress={() => navigate(HomeRoutesTS.HomeRoutes_LookupForProvidersScreen)}>
                PROCURAR PRESTADORES
            </DefaultButton>

            <DefaultButton onPress={signOut}>
                LOGOUT
            </DefaultButton>
        </Container >
    );
};

export default HomeScreen;