import React from "react";
import { TouchableOpacityProps } from "react-native";
import { ButtonText, Container } from "./styles/defaultButtonStyles";

interface ButtonProps extends TouchableOpacityProps {
    children: any;
    disabled?: boolean;
    icon?: string;
}

const DefaultButton: React.FC = ({ children, icon, ...rest }: ButtonProps) => (
    <Container {...rest}>
        <ButtonText>{children}</ButtonText>
    </Container>
);

export default DefaultButton;