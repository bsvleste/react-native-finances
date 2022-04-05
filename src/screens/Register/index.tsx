import React,{useState} from "react";
import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { Container,Header,Title,Form,Fields,TransactionTypes } from "./styles";

export function Register(){
    const [isActive,setIsActive] = useState('')
    function handleIsActive(type:'up'| 'down'){
        setIsActive(type)
    }
    return(
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <Input placeholder="Nome"/>
                    <Input placeholder="Valor"/>
                    <TransactionTypes>
                        <TransactionTypeButton onPress={()=>handleIsActive('up')} type="up" title="Income" isActive={isActive === 'up'}/>
                        <TransactionTypeButton onPress={()=>handleIsActive('down')} type="down"  title="Outcome" isActive={isActive === 'down'}/>
                    </TransactionTypes>
                </Fields>
                <Button  title="Enviar"/>
            </Form>
        </Container>
    )
}