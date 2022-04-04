import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';

import { Dashboard } from './src/screens/Dashboard';
import { Register } from './src/screens/Register';
import { useFonts,Poppins_400Regular,Poppins_500Medium,Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,Poppins_500Medium,Poppins_700Bold
  })
  if(!fontsLoaded){
    return <AppLoading/>
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar        
       translucent={true}
       backgroundColor="rgba(255,225,255,0.2)"               
         />
      <ThemeProvider theme={theme}>
        <Register/>
      </ThemeProvider>
    </SafeAreaView>
  );
}

