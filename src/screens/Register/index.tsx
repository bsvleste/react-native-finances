import React,{useState} from "react";
import { Modal }from 'react-native';
import { useForm }from 'react-hook-form'
import { Button } from "../../components/Forms/Button";
import { InputForm } from "../../components/Forms/InputForm";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { Container,Header,Title,Form,Fields,TransactionTypes } from "./styles";
import { CategorySelect} from "../CategorySelect";
import { CategorySelectButton} from "../../components/Forms/CategorySelectButton";


interface FormData{
    name:string;
    amount:string
}
export function Register(){
    const{control,handleSubmit}= useForm()
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
      })
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
    const [transactionType, setTransactionType] = useState('')
   
    function handleSelectTransactionType(type: 'up' | 'down') {
        setTransactionType(type)
      }
    function handleOpenSelectCategoryModal() {
        setIsCategoryModalOpen(true)
      }
    
      function handleCloseSelectCategoryModal() {
        setIsCategoryModalOpen(false)
      }
      function handleRegister(form:FormData){
          const data ={
            name:form.name,
            amount:form.amount,
            transactionType,
            category:category.key
          }
          console.log(data)
      }
    
    return(
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <InputForm 
                        control={control}
                        name="name"
                    placeholder="Nome" />
                    <InputForm 
                        name="amount"
                        control={control}
                        placeholder="Valor" />
                    <TransactionTypes>
                        <TransactionTypeButton onPress={()=>handleSelectTransactionType('up')} type="up" title="Income" isActive={transactionType  === 'up'}/>
                        <TransactionTypeButton onPress={()=>handleSelectTransactionType('down')} type="down"  title="Outcome" isActive={transactionType  === 'down'}/>
                    </TransactionTypes>
                    <CategorySelectButton title={'categorias'}  onPress={handleOpenSelectCategoryModal}/>
                </Fields>
                <Button  title="Enviar" onPress={handleSubmit(handleRegister)} />
            </Form>
           <Modal visible={isCategoryModalOpen}>
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
           </Modal >    
          
        </Container>
    )
}