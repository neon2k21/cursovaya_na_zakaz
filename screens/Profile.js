import { View,Text, ScrollView, TouchableOpacity,Image, Switch, FlatList } from "react-native";
import {useNavigation} from '@react-navigation/native';
import { useEffect, useLayoutEffect, useState } from "react";
import Auth from "../components/profile/profileScreen/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardTimeTable from "../components/profile/profileScreen/timetable_card";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as SQLite from "expo-sqlite"
import { Platform } from 'react-native';
import { useTheme } from "../Theme/themeProvider";
import Add_timetable from "../components/profile/optionsProfile/screens/AddTimeTable/Screen/add_timetable";




export default function Profile(){
  const {navigate} = useNavigation()
    
  let names = []   

  
   const [data, setData] = useState();

   const getTimes = () =>{ }
  
     useEffect( () => {},[])
      
  
    return(
         <View className="w-full h-full ">
          
              <Image 
         blurRadius={70} 
         source={require('../assets/backgrounds/bg.jpg')} 
         className="absolute w-full h-full" />
             
             <FlatList
                horizontal={true}
                data={data}
                renderItem={({item})=> ( <CardTimeTable  text={item} /> )}/>

             <View style={{borderColor:colors.background}} className=" w-full h-3/6 border-2 rounded-t-2xl justify-center" >
                 
                 <View className="h-full w-full" style={{padding:wp(6)}}>
                 
                 <Text className="font-bold" style={{fontSize:wp(5),justifyContent:'center',padding:wp(2), color: colors.text}}>
                     Дополнительные параметры:
                 </Text>    
                 
                  <View className="flex-row w-full border-2 rounded-3xl justify-center" style={{borderColor:colors.background,marginBottom:wp(2),height:wp(15)}}>
                   <Text className="text-2xl font-bold" style={{justifyContent:'center',textAlignVertical:'center', color: colors.text}}>
                         Темная тема
                     </Text>
                     <Switch
                         trackColor={{false: '#767577', true: '#81b0ff'}}
                         thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                         ios_backgroundColor="#3e3e3e"
                         onValueChange={ToggleTheme}
                         value={isEnabled}
                     />
                 </View>
                 
                 <TouchableOpacity className="flex-row w-full border-2 rounded-3xl justify-center" 
                    style={{borderColor:colors.background,marginBottom:wp(2),height:wp(15)}}
                    
                    onPress={()=>navigate('Добавить расписание', Add_timetable)}>
                   
                      <Text className=" text-2xl font-bold" style={{justifyContent:'center',textAlignVertical:'center',color: colors.text}}>
                       Добавить расписание
                     </Text>
                  
                  </TouchableOpacity>
                 </View>
             </View>
         </View>
     )
}
  