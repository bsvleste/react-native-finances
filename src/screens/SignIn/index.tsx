import React from "react";
import {
    Container,
    Header,
    TitleWrapper,
    FootWrapper,
    SignInTitle,
    Title,
    Footer
} from './styles'
import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google-icon.svg';
import LogoSvg from '../../assets/LogoSvg.svg'
import { RFValue } from 'react-native-responsive-fontsize';
import { Button } from "../../components/Forms/Button";
import { SignInButton } from "../../components/SignInButton";
 
export function SignIn(){
    return(
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg 
                        width={RFValue(150)}
                        height={RFValue(68)}
                    />
                    <Title>
                        Controle suas {'\n'}
                        finanças  de forma{'\n'} 
                        muito simples
                    </Title>
                </TitleWrapper>
                <SignInTitle>
                    Faça seu login com {'\n'} uma das contas abaixo
                </SignInTitle>
            </Header>
            <Footer>
                <FootWrapper>
                    <SignInButton title="Login com google" svg={GoogleSvg}/>
                    <SignInButton title="Login com Apple" svg={AppleSvg}/>
                </FootWrapper>
            </Footer>
        </Container>
    )
}