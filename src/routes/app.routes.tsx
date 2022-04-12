import React from "react";
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {useTheme} from 'styled-components';
import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import{MaterialIcons} from '@expo/vector-icons'
import { Platform } from "react-native";

const {Navigator,Screen} = createBottomTabNavigator()
export function AppRoutes(){
  const theme = useTheme();
  return(
    <Navigator
    screenOptions={{
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor:theme.colors.text,
        headerShown:false,
        tabBarLabelPosition:'beside-icon',
       tabBarStyle:{
         paddingVertical:Platform.OS === 'ios'?20:0,
         height: 50
       }
      }}
      >
      <Screen 
        name="Listagem"
        component={Dashboard}
        options={{          
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
             name="format-list-bulleted" 
             color={color} 
             size={size} />
          ),
        }}
        />
      <Screen 
        name="Cadastrar"
        component={Register}
        options={{          
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
             name="attach-money" 
             color={color} 
             size={size} />
          ),
        }}
        />
      <Screen 
        name="Resumo"
        component={Register}
        options={{          
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
             name="pie-chart" 
             color={color} 
             size={size} />
          ),
        }}
        />
    </Navigator>
  )
}