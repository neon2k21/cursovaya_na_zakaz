import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/Auth"
import TimeTable from "../screens/TimeTable"



const Main_Stack = createNativeStackNavigator()



function Main_StackNavigator(){

  return(
    <Main_Stack.Navigator>
    <Main_Stack.Screen name="Вход" options={{headerShown: false}} component={LoginScreen}/>
    <Main_Stack.Screen name="Расписание" options={{headerShown: false}} component={TimeTable}/>
  </Main_Stack.Navigator>
  )

}



export default function AppNavigation(){
    return(
       
        <NavigationContainer>
           <Main_StackNavigator/>
        </NavigationContainer>
       
    )
}