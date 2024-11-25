import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator } from '@react-navigation/native-stack';

import TimeTable from '../screens/TimeTable';
import Profile from '../screens/Profile';
import { TouchableOpacity,View } from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


import Ionicons from 'react-native-vector-icons/Ionicons';



const Bottom_Tab = createBottomTabNavigator()
const Profile_Stack = createNativeStackNavigator()
const Lesson_Stack = createNativeStackNavigator()




function ProfileStackNavigator (){
  
}


function BottomTabNavigator (){
  return(
    <Bottom_Tab.Navigator
    
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Расписание') {
            iconName = focused ? 'book' : 'book-outline'; // Иконка для списка задач
          } else if (route.name === 'Профиль') {
            iconName = focused ? 'person' : 'person-outline'; // Иконка для диаграмм
          }

          // Возвращаем компонент Ionicons с указанной иконкой
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >

      <Bottom_Tab.Screen name="Расписание" options={{headerShown: false}} component={TimeTable} />
      <Bottom_Tab.Screen name="Профиль" options={{headerShown: false}} component={Profile}/>
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