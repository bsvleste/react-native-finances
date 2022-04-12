import React, { useEffect, useState } from "react";
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
import AsyncStorageLib from "@react-native-async-storage/async-storage";

export interface DataListProps extends TransactionCardProps {
    id: string;
  }

export function Dashboard(){
    const dataKey = '@bsvfinaces:transactions';
    const [data,setData] = useState<DataListProps[]>([])
    useEffect(()=>{
        async function clearData(){
            await AsyncStorageLib.removeItem(dataKey)
        }
        async function loadData(){
          const res = await AsyncStorageLib.getItem(dataKey)
            const transactions =res?JSON.parse(res):[]
            const transactionsFormatted:DataListProps[] = transactions
            .map((item:DataListProps)=>{
                const amount = Number(item.amount)
                .toLocaleString('pt-BR',{
                    style:'currency',
                    currency:'BRL'
                })            
                const date = Intl.DateTimeFormat('pt-Br',{
                    day:'2-digit',
                    month:'2-digit',
                    year:'2-digit'
                    }).format(new Date(item.date))
                    return{
                        id:item.id,
                        name:item.name,
                        amount,
                        type:item.type,
                        category:item.category,
                        date
                    }
                }) 
                setData(transactionsFormatted)  
                console.log(transactionsFormatted)          
        }
        loadData();
    },[])
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
