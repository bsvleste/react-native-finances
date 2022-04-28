import React from "react";
import {Container,Title} from './styles';

export type HeaderProps={
  title:string
}
export function Header({title}:HeaderProps){
  return(
      <Container>
        <Title>{title}</Title>
      </Container>
    
  )
}