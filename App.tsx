import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';

import { useFonts,Poppins_400Regular,Poppins_500Medium,Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { AppRoutes } from './src/routes/app.routes';
import { SignIn }from './src/screens/SignIn'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,Poppins_500Medium,Poppins_700Bold
  })
  if(!fontsLoaded){
    return <AppLoading/>
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
         
          <ThemeProvider theme={theme}>
          <NavigationContainer>
          <StatusBar        
            translucent={true}
            backgroundColor="rgba(255,225,255,0.2)"               
          />
            <SignIn />
          </NavigationContainer>
          </ThemeProvider>
    </SafeAreaView>
  );
}

