import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
    
    width: 100%;
    background-color: ${({theme})=>theme.colors.secondary};
    align-items: center;
    border-radius: 5px;
    padding: 16px; 

`

export const Title = styled.Text`
    font-family: ${({theme})=>theme.fonts.medium};
    font-size: ${RFValue(16)}px;
    color: ${({theme})=>theme.colors.shape};

`
