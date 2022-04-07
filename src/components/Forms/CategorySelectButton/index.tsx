import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container,Title,Icon } from "./styles";

interface CategoriSelectProps extends TouchableOpacityProps{
    title:string
}
export function CategorySelectButton({title,...rest}:CategoriSelectProps):JSX.Element{
    return (
        <Container {...rest}>         
                <Title>{title}</Title>
                <Icon name="chevron-down" />           
        </Container>
    )
}