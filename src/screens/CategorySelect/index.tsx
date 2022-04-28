import React from 'react';
import { Container,Title,Category,Icon,Name, Separator,Footer} from './styles';
import {categories} from '../../utils/categories';
import { FlatList } from 'react-native';
import { Button } from '../../components/Forms/Button';
import { Header } from '../../components/Header';

interface ICategory{
    key:string,
    name:string
}

interface CategorySelectProps{
    category:ICategory,
    setCategory:(category:ICategory)=>void,
    closeSelectCategory:() =>void
}
export function CategorySelect({category,setCategory,closeSelectCategory}:CategorySelectProps){
    function handleCategorySelect(category: ICategory) {
        setCategory(category)
      }
    
    return (
        <Container>
            <Header title="Categorias" />
            <FlatList
                data={categories}
                style={{flex:1,width:'100%'}}
                keyExtractor={(item)=>item.key}
                renderItem={({item})=>(
                    <Category  
                    onPress={() => handleCategorySelect(item)}
                    isActive={category.key === item.key}>
                        <Icon name={item.icon} />
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={()=><Separator/>}
            />

            <Footer>
                <Button title="Selecionar" onPress={closeSelectCategory} />
            </Footer>
        </Container>
    )
}