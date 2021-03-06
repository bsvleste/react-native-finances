import styled from "styled-components/native";
import {Feather} from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
export const Container = styled.View`
  flex:1;
  background-color: ${({theme})=>theme.colors.background};
 `
 export const Content = styled.ScrollView`  
 `
 export const ChartContainer= styled.View`
  width: 100%;
 align-items: center;
 `
 export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
  margin-top:24px;
 `
 export const MonthSelectButton = styled.TouchableOpacity`
 `
 export const SelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  `
 export const Month = styled.Text`
  font-family: ${({theme})=>theme.fonts.regular};
  font-size: ${RFValue(24)}px;
 
 `
 export const Loading = styled.View`
 flex:1;
 justify-content: center;
 align-items: center;
 
`