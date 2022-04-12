import React, { useCallback, useEffect, useState } from "react";
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
     TransacionList,
     Loading} from "./styles";
import { HighlightCard } from './../../components/HighlightCard/index';
import { TransactionsCard,TransactionCardProps } from "../../components/TransactionCard";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import {useTheme }from 'styled-components'
export interface DataListProps extends TransactionCardProps {
    id: string;
  }
interface HighlightProps{
    amount:string,
    lastTransaction:string,

}
  interface HighlightData{
    entries:HighlightProps,
    expensive:HighlightProps,
    total:HighlightProps

  }
  function getLastTransactionDate(collection:DataListProps[],type:"positive"|'negative'){
    const lastTransaction =new Date( Math.max.apply(Math ,collection.filter(transactions=>transactions.type === type)
        .map(transactions=> new Date(transactions.date).getTime())))
        
        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
            "pt-BR",
            {
              month: "long",
            }
          )}`;
    
  }
export function Dashboard(){
   
    const dataKey = '@bsvfinaces:transactions';
    const theme = useTheme();
    const [isLoading,setIsLoading] = useState(true)
    const [data,setData] = useState<DataListProps[]>([]);
    const [highlightCardsData,setHighlightCardsData] = useState<HighlightData>({} as HighlightData)
    
    async function loadTransaction(){
        const res = await AsyncStorageLib.getItem(dataKey)
        const transactions =res?JSON.parse(res):[]
        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted:DataListProps[] = transactions
            .map((item:DataListProps)=>{
                if(item.type === "positive"){
                    entriesTotal += Number(item.amount);
                }else{
                    expensiveTotal += Number(item.amount)
                }

                
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
              setData(transactionsFormatted); 
              const lastTransactionEntires = getLastTransactionDate(transactions,'positive')
              const lastTransactionExpensives = getLastTransactionDate(transactions,'negative')
              const totalInterval = `01 a ${ lastTransactionExpensives}`

              const total = entriesTotal - expensiveTotal;
              setHighlightCardsData({
                    entries:{       
                        lastTransaction:`Ultima entrada dia ${lastTransactionEntires}`,                
                        amount:entriesTotal.toLocaleString('pt-BR',{
                            style:'currency',
                            currency:'brl'
                        })                        
                    },
                    expensive:{
                        lastTransaction:`$Ultima saida dia ${lastTransactionExpensives}`,
                        amount:expensiveTotal.toLocaleString('pt-BR',{
                            style:'currency',
                            currency:'brl'
                        })                     
                    },
                    total:{
                        lastTransaction:totalInterval,
                        amount:total.toLocaleString('pt-BR',{
                            style:'currency',
                            currency:'brl'
                        })                            
                    }
              })
              /* console.log(lastTransactionEntries) */
              setIsLoading(false);
      }
    useEffect(()=>{
        async function clearData(){
            await AsyncStorageLib.removeItem(dataKey)
        }        
        loadTransaction();
    },[])

    useFocusEffect(useCallback(()=>{
        loadTransaction()
    },[]))
    return (
        <Container>
            
            {
                isLoading ? <Loading><ActivityIndicator color={theme.colors.primary} size='large'/></Loading>:
            <>
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
                amount={highlightCardsData.entries.amount}
                lastTransaction={highlightCardsData.entries.lastTransaction}
                />
                <HighlightCard
                    type="down"
                    title="Saida"
                    amount={highlightCardsData.expensive.amount}
                    lastTransaction={highlightCardsData.expensive.lastTransaction}
                />
                <HighlightCard
                    type="total"
                    title="Total"
                    amount={highlightCardsData.total.amount}
                    lastTransaction={highlightCardsData.total.lastTransaction}
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
            </>
            }
        </Container>
    )
}
