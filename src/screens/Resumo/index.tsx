import React, { useEffect,useCallback,useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Header } from "../../components/Header";
import { addMonths,subMonths,format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { HistoryCard } from "../../components/HistoryCard";
import { Container,
         Content,
         ChartContainer,
         MonthSelect,
         MonthSelectButton,
         SelectIcon,
         Month,
         Loading
         } from './styles';
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { TransactionCardProps } from "../../components/TransactionCard"; 
import { categories } from "../../utils/categories";
import {VictoryPie}from 'victory-native'
import { RFValue } from "react-native-responsive-fontsize";
import {useBottomTabBarHeight }from '@react-navigation/bottom-tabs'
import { ActivityIndicator } from "react-native";
import {useTheme }from 'styled-components'
interface CategoryDataProps{
  key:string,
  name:string,
  total:number,
  totalFormatted:string,
  color:string,
  percent:string
}
export function Resumo (){
  const [isLoading,setIsLoading] = useState(false);
  const [selectedDate,setSelectedDate]=useState(new Date)
  const [totalByCategories,setTotalByCategories]= useState<CategoryDataProps[]>([])
  const dataKey = '@bsvfinaces:transactions';
  const theme = useTheme();

  function handleChangeDate(action:"next"| 'prev'){
    
    if(action ==="next"){
        setSelectedDate(addMonths(selectedDate,1))
      } else{        
         setSelectedDate(subMonths(selectedDate,1))
      }
  }
  async function loadData(){
    setIsLoading(true)
    const res = await AsyncStorageLib.getItem(dataKey);
    const dataFormatted = res ? JSON.parse(res) : [];
    
    const expensives = dataFormatted.filter((
      expensive:TransactionCardProps)=>
      expensive.type === 'negative' &&
      new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
      new Date(expensive.date).getFullYear() === selectedDate.getFullYear() 
      )
      
      const expensivesTotal = expensives.reduce((accumulator:number,expensive:TransactionCardProps)=>{
        return accumulator + Number(expensive.amount)
      },0);
      
      const totalByCategory:CategoryDataProps[] = []
      categories.forEach(category =>{
        let categoriSum = 0;
        expensives.forEach((e:TransactionCardProps)=>{
          if(e.category === category.key){
            categoriSum += Number(e.amount);
          }
        })
        if(categoriSum >0){
          const totalFormatted = categoriSum.toLocaleString('pt-BR',{
            style:"currency",
            currency:'BRL'
          });
          
          const percent = `${(categoriSum/ expensivesTotal * 100).toFixed(0)}%`;
          totalByCategory.push({
            key:category.key,
            name:category.name, 
            total:categoriSum, 
            color:category.color,
            percent,
            totalFormatted
          })
        }
      })
      setTotalByCategories(totalByCategory) 
      setIsLoading(false);
    }
 
  useFocusEffect(useCallback(()=>{
    loadData();    
},[selectedDate]))
 
  return (
    <Container>
      <Header title='Resumo'/>
        {
          isLoading ? 
          <Loading>
            <ActivityIndicator color={theme.colors.primary} size='large'/>
            </Loading>:              
                <Content
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ 
                    paddingHorizontal: 24,
                    paddingBottom:useBottomTabBarHeight(),
                  }}
              >
              <MonthSelect>
                <MonthSelectButton onPress={()=>handleChangeDate('prev')}> 
                  <SelectIcon name="chevron-left"/> 
                </MonthSelectButton>
                <Month>{format(selectedDate,"MMMM,yyyy",{locale:ptBR })}</Month>
                <MonthSelectButton onPress={()=>handleChangeDate('next')}> 
                  <SelectIcon name="chevron-right"/> 
                </MonthSelectButton>
              </MonthSelect>
              <ChartContainer>
                <VictoryPie
                  style={{ 
                    labels:{
                      fontsize:`${RFValue(18)}`,
                      fontWeight:'bold',
                      fill:"#fff"
                    }
                  }}
                  labelRadius={50}
                  colorScale={totalByCategories.map(category=>category.color) }
                  data={totalByCategories}
                  x='percent'
                  y='total'
                  />
              </ChartContainer>
              {totalByCategories.map(expensive=>(         
                <HistoryCard key={expensive.key} color={expensive.color} title={expensive.name} amount={expensive.totalFormatted} />
                ))}
          </Content>         
          }
        </Container>
        );
}
