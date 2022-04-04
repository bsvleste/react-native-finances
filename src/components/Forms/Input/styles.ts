import styled from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TextInput`
    width: 100%;
    padding: 18px;

    font-size: ${RFValue(16)}px;
    background-color: ${({theme})=>theme.colors.shape};
    color: ${({theme})=>theme.colors.title};
    font-family: ${({theme})=>theme.fonts.regular};

    border-radius: 5px;

    margin-bottom: 8px;
    padding:24px 16px;
`