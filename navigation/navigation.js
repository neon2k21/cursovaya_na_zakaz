import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ClockIcon} from 'react-native-heroicons/solid'
import {UserIcon} from 'react-native-heroicons/solid'
import TimeTable from '../screens/TimeTable';
import Profile from '../screens/Profile';

const Bottom_Tab = createBottomTabNavigator()



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
            
            <Bottom_Tab.Screen name='Расписание'component={TimeTable}   />
            <Bottom_Tab.Screen name='Профиль' options={{headerShown: false}} component={Profile}  />
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