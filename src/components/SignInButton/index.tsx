import React from "react";
import { TouchableOpacityProps } from "react-native";
import { SvgProps } from "react-native-svg";
import { Button, ImageContainer,Title}from './styles'
interface SignInButtonProps extends TouchableOpacityProps{
    title:string
    svg:React.FC<SvgProps>
}

export function SignInButton({svg:Svg, title,...rest}:SignInButtonProps){
    return (
        <Button {...rest}>
            <ImageContainer>
                <Svg/>
            </ImageContainer>
            <Title>{title}</Title>
        </Button>
    )   
}