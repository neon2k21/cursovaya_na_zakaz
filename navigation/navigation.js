import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {ClockIcon} from 'react-native-heroicons/solid'
import {UserIcon} from 'react-native-heroicons/solid'
import {ChevronRightIcon} from 'react-native-heroicons/solid'
import TimeTable from '../screens/TimeTable';
import { changeweek } from '../screens/TimeTable';
import Profile from '../screens/Profile';
import {ArrowPathIcon} from 'react-native-heroicons/solid'
import {Bars4Icon} from 'react-native-heroicons/solid'
import {ArrowsRightLeftIcon} from 'react-native-heroicons/solid'
import { TouchableOpacity,View } from 'react-native';
import Add_timetable from '../components/profile/optionsProfile/screens/AddTimeTable/Screen/add_timetable';
import GroupSearcher from '../components/profile/optionsProfile/screens/AddTimeTable/DropDowns/groupSearch';
import TeacherSearcher from '../components/profile/optionsProfile/screens/AddTimeTable/DropDowns/teacherSearch';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useTheme } from '../Theme/themeProvider';
import AddLeon from '../components/profile/profileScreen/add';
import Auth from '../components/profile/profileScreen/auth';
import Auth_firstStep from '../components/profile/authScreen/auth_firstStep';
import ShowLesson from '../components/timetbale/showLesson';

const Bottom_Tab = createBottomTabNavigator()
const Profile_Stack = createNativeStackNavigator()
const Lesson_Stack = createNativeStackNavigator()
const Dropdowns_Stack = createNativeStackNavigator()


function LessonNavigator(){
  <Lesson_Stack.Navigator>
    <Lesson_Stack.Screen name="Расписание" component={TimeTable}/>
    <Lesson_Stack.Screen name="Подробнее" component={ShowLesson}/>
  </Lesson_Stack.Navigator>
}

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
      <Profile_Stack.Screen name = "Добавить расписание"  options={{headerShown: false}} component={DropDownsNavigator}/>
      <Profile_Stack.Screen name = "Добавить пару"  component={AddLeon}/>
      <Profile_Stack.Screen name="Авторизация" component={Auth_firstStep}/>

    </Profile_Stack.Navigator>
  )


}
function BottomTabNavigator (){
  const {colors} = useTheme()
    return(
        <Bottom_Tab.Navigator
        screenOptions={({route}) => ({   
                 tabBarStyle:{
                  backgroundColor: colors.background
                 },
           
            tabBarIcon: ({focused, color, size}) => {
                  if ( route.name === 'Расписание'){
                    return <ClockIcon size ={size} color ={focused? 'green' : 'gray'}/>
                  }
                  if ( route.name === 'Профиль'){
                    return <UserIcon size ={size} color ={focused? 'green' : 'gray'}/>
                  }
                  
            },
          })}>
            
            <Bottom_Tab.Screen name='LessonNavigator' options={({ route })=>({
                  
                    headerStyle:{
                      backgroundColor: colors.background,
                    },
                    unmountOnBlur: true,
                    headerTitleAlign: 'left',
                    headerTitleStyle: {
                      textAlign:"center",
                      color: colors.headertextandicons,
                     
                  },
                    
      
        })} component={LessonNavigator}   />
            <Bottom_Tab.Screen name='Профиль'  options={({ route })=>({
                    title: "Войти",
                    headerStyle:{
                      backgroundColor: colors.background,
                    },
                    unmountOnBlur: true,
                    headerShown: false,
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