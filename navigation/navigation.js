import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {ClockIcon} from 'react-native-heroicons/solid'
import {UserIcon} from 'react-native-heroicons/solid'
import {ChevronRightIcon} from 'react-native-heroicons/solid'
import TimeTable from '../screens/TimeTable';
import Profile from '../screens/Profile';
import {ArrowsRightLeftIcon} from 'react-native-heroicons/solid'
import { TouchableOpacity,View } from 'react-native';
import Auth from '../components/profile/optionsProfile/screens/Auth';
import Add_timetable from '../components/profile/optionsProfile/screens/AddTimeTable/Screen/add_timetable';
import GroupSearcher from '../components/profile/optionsProfile/screens/AddTimeTable/DropDowns/groupSearch';
import TeacherSearcher from '../components/profile/optionsProfile/screens/AddTimeTable/DropDowns/teacherSearch';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useTheme } from '../Theme/themeProvider';
// import Monday from '../components/timetbale/screens/Monday'
// import Tuesday from '../components/timetbale/screens/Tuesday'
// import Wednesday from '../components/timetbale/screens/Wednesday'
// import Thursday from '../components/timetbale/screens/Thursday'
// import Friday from '../components/timetbale/screens/Friday'
// import Saturday from '../components/timetbale/screens/Saturday'
// import Sunday from '../components/timetbale/screens/Sunday'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Bottom_Tab = createBottomTabNavigator()
const Profile_Stack = createNativeStackNavigator()
const Dropdowns_Stack = createNativeStackNavigator()
const Top_Tab = createMaterialTopTabNavigator()

function DropDownsNavigator(){
  const {colors} = useTheme()
  return(
    <Dropdowns_Stack.Navigator
    screenOptions={{
      headerStyle:{
        backgroundColor: colors.background,
      },
      headerTitleStyle: {
        textAlign:"center",
        color: colors.headertextandicons,
       
    },
    headerBackTitleStyle:{
    color:colors.headertextandicons
   },
  
    }
    }>
      <Dropdowns_Stack.Screen name = "Добавить расписание" component={Add_timetable}/>
      <Dropdowns_Stack.Screen name = "Выбор группы" component={GroupSearcher}/>
      <Dropdowns_Stack.Screen name ="Выбор преподавателя" component={TeacherSearcher}/>
    </Dropdowns_Stack.Navigator>
  )
}


function ProfileStackNavigator (){
  const {colors} = useTheme()
  return(
    <Profile_Stack.Navigator
    screenOptions={{
      headerStyle:{
        backgroundColor: colors.background,
      },
    }
    }
    >
      <Profile_Stack.Screen name = "ds"  options={{headerShown: false}} component={Profile}/>
      <Profile_Stack.Screen name = "Авторизация"  component={Auth}/>
      
      <Profile_Stack.Screen name = "Добавить расписание"  options={{headerShown: false}} component={DropDownsNavigator}/>
    </Profile_Stack.Navigator>
  )


}

// function TopTabNavigator(){
//   const insets = useSafeAreaInsets();
//     <Top_Tab.Navigator
//     screenOptions={{
//       tabBarLabelStyle: { fontSize: 12 },
//       tabBarItemStyle: { width: 100 },
//       tabBarStyle: { backgroundColor: 'powderblue', marginTop: insets  },
//     }}>
//       <Top_Tab.Screen name="Понедельник" component={Monday}/>
//       <Top_Tab.Screen name="Вторник" component={Tuesday}/>
//       <Top_Tab.Screen name="Среда" component={Wednesday}/>
//       <Top_Tab.Screen name="Четверг" component={Thursday}/>
//       <Top_Tab.Screen name="Пятница" component={Friday}/>
//       <Top_Tab.Screen name="Суббота" component={Saturday}/>
//       <Top_Tab.Screen name="Воскресенье" component={Sunday}/>
//     </Top_Tab.Navigator>
// }

function BottomTabNavigator (){
  const {colors} = useTheme()
    return(
        <Bottom_Tab.Navigator
        screenOptions={({route}) => ({   
                 tabBarStyle:{
                  backgroundColor: colors.background
                 },
            tabBarShowLabel: false,
            tabBarIcon: ({focused, color, size}) => {
                  if ( route.name === 'Расписание'){
                    return <ClockIcon size ={size} color ={focused? 'green' : 'gray'}/>
                  }
                  if ( route.name === 'Профиль'){
                    return <UserIcon size ={size} color ={focused? 'green' : 'gray'}/>
                  }
                  
            },
          })}>
            
            <Bottom_Tab.Screen name='Расписание' options={({ route })=>({
                    
                    title: "l",
                    headerStyle:{
                      backgroundColor: colors.background,
                    },
                    
                    headerTitleAlign: 'left',
                    headerTitleStyle: {
                      textAlign:"center",
                      color: colors.headertextandicons,
                     
                  },
                    headerRight: () => (
                      <View className="flex-row" style={{gap:wp(5),paddingHorizontal:wp(5)}}>
                        
                      <TouchableOpacity>
                          <ArrowsRightLeftIcon size={wp(7)} color={colors.headertextandicons} />
                      </TouchableOpacity>
                      
                      </View>
                      
          ),
      
        })} component={TimeTable}   />
            <Bottom_Tab.Screen name='Профиль'  options={({ route })=>({
                    title: "Войти",
                    
                    headerStyle:{
                      backgroundColor: colors.background,
                    },
                    //route.params.name.length === 0 ? 'Вберите расписание' : route.params.name,
                    headerTitleAlign: 'left',
                    headerTitleStyle: {
                      textAlign:"center",
                      color: colors.headertextandicons
                     
                  },
                    headerRight: () => (
                      <View className="flex-row" style={{gap:wp(5),paddingHorizontal:wp(5)}}>
                        
                      <TouchableOpacity>
                          <ChevronRightIcon size={wp(7)} color={ colors.headertextandicons} />
                      </TouchableOpacity>
                      </View>
                      
          ),
      
        })} component={ProfileStackNavigator}  />
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