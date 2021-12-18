import React, { useContext, useEffect } from 'react';
import {
    Text, TouchableOpacity
} from 'react-native';
import { ThemeContext } from 'styled-components';

import DefaultButton from '../../components/Button/DefaultButton';
import { Container } from './_styles/homeScreenStyles';
import { useNavigation } from '@react-navigation/native';
import { useLookupForProviders } from '../../hooks/private/lookupForProviders';
import { verticalScale } from '../../utils/css/sizeProportion';
import { ThemeOptions } from '../../global/theme/_ts/ThemeOptions';
import { HomeRoutesTS } from '../../routes/_ts/HomeRoutesTS';

const LookupForProvidersScreen: React.FC = () => {
    const { goBack, navigate } = useNavigation();
    const theme = useContext(ThemeContext) as ThemeOptions;

    const { data: proviedersData, load: loadProviders,
        loading: loadingProvider, error: providerError } = useLookupForProviders();

    useEffect(() => {
        if (!loadingProvider && proviedersData.length === 0) {
            loadProviders();
        }
    }, []);

    return (
        <Container>
            <Text>Procurar por prestadores</Text>
            {
                loadingProvider ?
                    <Text>Carregando prestadores</Text>
                    : providerError ?
                        <Text>Erro ao carregar perfil</Text>
                        :
                        proviedersData.length === 0 ?
                            <Text>Nenhum prestador encontrado</Text>
                            :
                            <>
                                {
                                    proviedersData.map(obj => (
                                        <TouchableOpacity onPress={() => navigate(HomeRoutesTS.HomeRoutes_ChatScreen, {
                                            relation: obj
                                        })}
                                            style={{ borderWidth: verticalScale(2), borderColor: theme.buttonPrimaryColor }}
                                            key={obj.owner_uid}>
                                            <Text>Nome: {obj?.name}</Text>
                                            <Text>Cidade: {obj?.city}</Text>
                                            <Text>is_nutritionist: {String(obj?.is_nutritionist)}</Text>
                                            <Text>is_trainer: {String(obj?.is_trainer)}</Text>
                                        </TouchableOpacity>
                                    ))
                                }
                            </>
            }


            <DefaultButton onPress={goBack}>
                VOLTAR
            </DefaultButton>
        </Container >
    );
};

export default LookupForProvidersScreen;