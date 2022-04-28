import { Container,Title,Amount } from './styles';

export type HistoryCardProps={
  color: string;
  title:string;
  amount:string
}
export function HistoryCard({color,title,amount}:HistoryCardProps){
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
}