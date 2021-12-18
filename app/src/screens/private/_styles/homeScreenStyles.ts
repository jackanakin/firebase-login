import styled from 'styled-components/native';
import { ThemeProps } from '../../../global/theme/_ts/ThemeProps';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props: ThemeProps) => props.theme.textInfoColor};
`;
