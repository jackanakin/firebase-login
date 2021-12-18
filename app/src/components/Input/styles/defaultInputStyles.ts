import styled from "styled-components/native";
import { ThemeProps } from "../../../global/theme/_ts/ThemeProps";
import { scale, verticalScale } from "../../../utils/css/sizeProportion";

export const Input = styled.TextInput`
  flex: 1;
  color: ${(props: ThemeProps) => props.theme.textPrimaryColor};
  font-size: ${verticalScale(16)}px;
`;

export const Container = styled.View`
  width: 100%;
  height: ${verticalScale(60)}px;
  padding: 0 ${verticalScale(16)}px;
  background: ${(props: ThemeProps) => props.theme.defaultPageColor};
  border: ${verticalScale(1)}px;
  border-color: ${(props: ThemeProps) => props.theme.darkText};
  border-radius: ${verticalScale(10)}px;
  margin-bottom: ${verticalScale(11)}px;
  flex-direction: row;
  align-items: center;
`;