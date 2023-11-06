import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {ClockIcon} from 'react-native-heroicons/solid'
import {UserIcon} from 'react-native-heroicons/solid'
import TimeTable from '../screens/TimeTable';
import Profile from '../screens/Profile';
import SettingsScreen from '../components/profile/optionsProfile/screens/Settings';
import RingTImeTable from '../components/profile/optionsProfile/screens/RingTImeTable';

import Auth from '../components/profile/optionsProfile/screens/Auth';
import Add_timetable from '../components/profile/optionsProfile/screens/AddTimeTable/Screen/add_timetable';

const Bottom_Tab = createBottomTabNavigator()
const Profile_Stack = createNativeStackNavigator()


function ProfileStackNavigator (){

  return(
    <Profile_Stack.Navigator>
      <Profile_Stack.Screen name = "Профиль" options={{headerShown: false}} component={Profile}/>
      <Profile_Stack.Screen name = "Авторизация" component={Auth}/>
      <Profile_Stack.Screen name = "Настройки" component={SettingsScreen}/>
      <Profile_Stack.Screen name = "Расписание звонков" component={RingTImeTable}/>
      <Profile_Stack.Screen name = "Добавить расписание" component={Add_timetable}/>
    </Profile_Stack.Navigator>
  )


}

function BottomTabNavigator (){
    return(
        <Bottom_Tab.Navigator
        screenOptions={({route}) => ({        
            tabBarShowLabel: true,
            tabBarIcon: ({focused, color, size}) => {
                  if ( route.name === 'Расписание'){
                    return <ClockIcon size ={size} color ={focused? 'green' : 'gray'}/>
                  }
                  if ( route.name === 'Профиль'){
                    return <UserIcon size ={size} color ={focused? 'green' : 'gray'}/>
                  }
                  
            },
          })}>
            
            <Bottom_Tab.Screen name='Расписание'  component={TimeTable}   />
            <Bottom_Tab.Screen name='Профиль'  component={ProfileStackNavigator}  />
        </Bottom_Tab.Navigator>
    )
}





export default function AppNavigation(){
    return(
       
        <NavigationContainer>
           <BottomTabNavigator/>
            
        </NavigationContainer>
       
    )
}