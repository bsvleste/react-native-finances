import React from 'react'
import { Container,Title,Amount,Footer,Category,Icon,CategoryName,Date } from './styles';
import { categories } from "../../utils/categories";
interface CategoryProps{
    name:string,
    icon:string
}

export interface TransactionCardProps{
    name:string,
    amount:string,
    category:string,
    date:string,
    type:'positive'| 'negative'
}
interface Props {
    data:TransactionCardProps
}
export function TransactionsCard({data}:Props):JSX.Element{
    const [category] = categories.filter(
        (item) => item.key === data.category);
    return (
        <Container>
            <Title>{data.name}</Title>
            <Amount type={data.type}> 
                {data.type === "negative" && "- "}
                {data.amount}
            </Amount>
            <Footer>
                <Category>
                    <Icon name={category.icon}/>
                    <CategoryName>{category.name}</CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Footer>
        </Container>
    )
}