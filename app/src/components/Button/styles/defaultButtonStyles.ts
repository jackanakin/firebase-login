import styled from "styled-components/native";
import { ThemeProps } from "../../../global/theme/_ts/ThemeProps";
import { verticalScale } from "../../../utils/css/sizeProportion";

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  width: 80%;
  height: ${verticalScale(60)}px;
  background: ${(props: ThemeProps) => props.theme.defaultPageColor};
  border-radius: ${verticalScale(10)}px;
  margin-top: ${verticalScale(11)}px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: ${verticalScale(20)}px;
  color:  ${(props: ThemeProps) => props.theme.textPrimaryColor};
  text-align: center;
`;