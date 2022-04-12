import React,{useEffect, useState} from "react";
import { Alert, Keyboard, Modal,TouchableWithoutFeedback }from 'react-native';
import { useForm }from 'react-hook-form'
import { Button } from "../../components/Forms/Button";
import { InputForm } from "../../components/Forms/InputForm";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { Container,Header,Title,Form,Fields,TransactionTypes } from "./styles";
import { CategorySelect} from "../CategorySelect";
import { CategorySelectButton} from "../../components/Forms/CategorySelectButton";
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import  uuid from 'react-native-uuid'
import { useNavigation } from "@react-navigation/native";
interface FormData{
    name:string;
    amount:string
}
const schema= Yup.object().shape({
    name:Yup.string().required("Nome é obrigatório"),
    amount:Yup.number().typeError("Informe um valor numerico")
    .positive("Infome um valor positivo")
    .required("O valor é obrigatório")
})
export function Register(){
  
    const dataKey = '@bsvfinaces:transactions';

    const{control,handleSubmit ,reset, formState:{errors}}= useForm({
        resolver:yupResolver(schema)
    })
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
      })
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
    const [transactionType, setTransactionType] = useState('')
   const navigation = useNavigation()
    function handleSelectTransactionType(type: 'positive' | 'negative') {
        setTransactionType(type)       
      }
    function handleOpenSelectCategoryModal() {
        setIsCategoryModalOpen(true)
      }
    
      function handleCloseSelectCategoryModal() {
        setIsCategoryModalOpen(false)
      }
      async function handleRegister(form:FormData){
        if(!transactionType)
            return  Alert.alert("Selecione um tipo de operção")
            
            if(category.key === 'category')
                return  Alert.alert("Selecione uma categoria")
            
            const newTransaction ={
                id:String(uuid.v4()),
                name:form.name,
                amount:form.amount,
                type: transactionType,
                category:category.key,
                date:new Date()
          }
          console.log(newTransaction)
          try {
              const data = await AsyncStorageLib.getItem(dataKey);
              const currentData = data ? JSON.parse(data) : [];
              const dataformatted = [
                  ...currentData,
                  newTransaction
              ]
              await AsyncStorageLib.setItem(dataKey,JSON.stringify(dataformatted))
              setTransactionType('')
              setCategory({
                  key:'category',
                  name:'Categoria'
              })
              reset();

              navigation.navigate('Listagem')
              
            } catch (error) {
              console.log(`Erro ${error}`)
              Alert.alert("Não foi possivel cadastrar tente novamente")
          }
      }
    
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss }>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>
                <Form>
                    <Fields>
                        <InputForm 
                            error={errors.name && errors.name.message}
                            control={control}
                            name="name"
                            placeholder="Nome"
                            autoCapitalize="words"
                            autoCorrect={false}
                            />
                        <InputForm 
                            error={errors.amount && errors.amount.message}
                            name="amount"
                            control={control}
                            placeholder="Valor"
                            keyboardType="numeric"
                            />
                        <TransactionTypes>
                            <TransactionTypeButton 
                            onPress={()=>handleSelectTransactionType('positive')} 
                            type="up" 
                            title="Income" 
                            isActive={transactionType  === 'positive'
                            }/>
                            <TransactionTypeButton 
                            onPress={()=>handleSelectTransactionType('negative')}
                            type="down"  
                            title="Outcome" 
                            isActive={transactionType  === 'negative'}/>
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
        </TouchableWithoutFeedback>
    )
}