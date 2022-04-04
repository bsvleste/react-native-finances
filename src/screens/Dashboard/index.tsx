import React from "react";
import { 
    Container, 
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
     Icon,
     HighlightCards,
     Transactions,
     Title,
     TransacionList} from "./styles";
import { HighlightCard } from './../../components/HighlightCard/index';
import { TransactionsCard,TransactionCardProps } from "../../components/TransactionCard";

export interface DataListProps extends TransactionCardProps {
    id: string;
  }

export function Dashboard(){
    const data:DataListProps[]= [
        {
            id:'1',
            type:'positive',
            title:'Desenvolvimento de site',
            amount:"R$ 12.000,00",
            category:{
                name:"Vendas",
                icon:"dollar-sign"
            },
            date:"13/03/2020"
        },
        {
            id:'2',
            type:'negative',
            title:'Aluguel de casa',
            amount:"R$ 1.000,00",
            category:{
                name:"Vendas",
                icon:"shopping-bag"
            },
            date:"13/03/2020"
        },
        {
            id:'3',
            type:'positive',
            title:'Desenvolvimento de site',
            amount:"R$ 12.000,00",
            category:{
                name:"Vendas",
                icon:"crosshair"
            },
            date:"13/03/2020"
        }
    ]
    
    return (
        <Container>
            <Header>
               <UserWrapper>
                    <UserInfo>
                    <Photo source={{uri:"https://source.unsplash.com/user/willianjusten/1042x580"}}/>
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Bruno</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power"/>
               </UserWrapper>
             </Header>

             <HighlightCards>
                <HighlightCard
                type="up"
                title="Entradas"
                amount="R$1700,00"
                lastTransaction="Ultima entrada dia 13 de abril"
                />
                <HighlightCard
                    type="down"
                    title="Saida"
                    amount="R$1259,00"
                    lastTransaction="Ultima saida dia 14 de abril"
                />
                <HighlightCard
                    type="total"
                    title="Total"
                    amount="R$15693,00"
                    lastTransaction="01 a 06 de abril"
                />
             </HighlightCards>
            
            <Transactions>
                <Title>Listagem</Title>
                <TransacionList
                    data={data}
                    keyExtractor={item=>item.id}
                    renderItem={({ item }) => <TransactionsCard data={item} />
                }
            />
            </Transactions>
        </Container>
    )
}
