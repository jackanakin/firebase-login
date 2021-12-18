import React, { useContext } from "react";
import { TextInputProps } from "react-native";
import { ThemeContext } from "styled-components";
import { ThemeOptions } from "../../global/theme/_ts/ThemeOptions";
import { Container, Input } from "./styles/defaultInputStyles";

interface InputProps extends TextInputProps {
    icon?: string;
    onChangeText: (text: any) => void;
    value: string | undefined;
}

const DefaultInput: React.FC = ({ icon, value, ...rest }: InputProps) => {
    const theme = useContext(ThemeContext) as ThemeOptions;

    return (
        <Container>
            <Input
                value={value}
                keyboardAppearance="dark"
                placeholderTextColor={theme.textPrimaryColor}
                {...rest}
            />
        </Container>
    );
};
export default DefaultInput;