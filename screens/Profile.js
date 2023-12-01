import { View,Text, ScrollView, TouchableOpacity,Image, Switch, FlatList } from "react-native";
import {useNavigation} from '@react-navigation/native';
import { useEffect, useLayoutEffect, useState } from "react";


import CardTimeTable from "../components/profile/profileScreen/timetable_card";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as SQLite from "expo-sqlite"
import { Platform } from 'react-native';
import { useTheme } from "../Theme/themeProvider";
import Add_timetable from "../components/profile/optionsProfile/screens/AddTimeTable/Screen/add_timetable";

function openDatabase() {
  if (Platform.OS === "web"){
    return {
      transaction: () =>{
        return {
          executeSql: () => {},
        };
      },
    };
  }
  const db1 = SQLite.openDatabase("db1.db")
  return db1
}


const db1 = openDatabase();




export default function Profile(){
  const {navigate} = useNavigation()
  let names = []   
   const {dark, colors, setScheme} = useTheme()
   const [isEnabled, setIsEnabled] = useState(false);
   const [data, setData] = useState();
   const ToggleTheme = ()=>{
    dark ? setScheme('light') : setScheme('dark')
    setIsEnabled(previousState => !previousState)
   }

   const getTimes = () =>{
    let names = []
    db1.transaction((tx) => {
     tx.executeSql(
      `select distinct grp from sheduleByGroup;`,[],(sqlTxn,res)=>{
      let len = res.rows.length
              if (len > 0){
                 
                  for(let i=0;i<len;i++){
                   
                      let item = res.rows.item(i);
                      names.push(item.grp)
                    
  
                  }
                  setData(names)
                  console.log('3', names)
                 
              }
          });      
          tx.executeSql(
            `select distinct teacher from sheduleByTeacher;`,[],(sqlTxn,res)=>{
            let len = res.rows.length
                    if (len > 0){
                       
                        for(let i=0;i<len;i++){
                         
                            let item = res.rows.item(i);
                            names.push(item.teacher)
                          
        
                        }
                        setData(names)
                        console.log('3', names)
                       
                    }
                });
            });
     
      
   }
  
     useEffect( () => {
      getTimes()
    },[])
      

    return(
        <View className="w-full h-full ">
             <Image 
        blurRadius={70} 
        source={require('../assets/backgrounds/bg.jpg')} 
        className="absolute w-full h-full" />
            
           
            <FlatList
      horizontal={true}
      data={data}
      renderItem={({item})=> (
        console.log('item',item),
        <CardTimeTable  text={item} />
      )
      
    }
      />
            <View style={{borderColor:colors.background}} className=" w-full h-3/6 border-2 rounded-t-2xl justify-center" >
                <View className="h-full w-full" style={{padding:wp(6)}}>
                <Text className="font-bold" style={{fontSize:wp(5),justifyContent:'center',padding:wp(2), color: colors.text}}>
                    Дополнительные параметры:
                </Text>
                <TouchableOpacity className="flex-row w-full border-2 rounded-3xl justify-center" style={{borderColor:colors.background,marginBottom:wp(2),height:wp(15)}}
                onPress={()=>navigate('Добавить пару')}>
                  <Text className=" text-2xl font-bold" style={{justifyContent:'center',textAlignVertical:'center',color: colors.text }}>
                      Добавить пару
                    </Text>
                </TouchableOpacity>         
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