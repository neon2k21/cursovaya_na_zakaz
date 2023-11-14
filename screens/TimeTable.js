import { View, useWindowDimensions,Text, ScrollView, SafeAreaView,Image,FlatList  } from "react-native";
import {useNavigation} from '@react-navigation/native';
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import * as React from 'react';
import {useEffect,useState } from "react";
import Item_of_list from "../components/timetbale/Lesson";

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import * as SQLite from "expo-sqlite"
import { Platform } from 'react-native';
import { tablename } from "../components/profile/profileScreen/timetable_card";
import customUseState from "../components/profile/profileScreen/timetable_customhook";

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



export function weeeek(){
  state = {
    textValue: '0'
  }
  onPress = () => {
    this.setState({
      textValue: '0' ? '1' : '0'
    })
  }
}

const TimeTable = () => {
  const navigation = useNavigation()
  
  var editedString = tablename.replaceAll(/[ -./]/g,'')
  
  
  
  const {data,setData} = customUseState();



 const fetchData=()=>{
 
  let names =[]
   db1.transaction((tx) => {
    tx.executeSql(
     `select * from ${editedString};`,[],(sqlTxn,res)=>{
     let len = res.rows.length
    
             if (len > 0){
                
                 for(let i=0;i<len;i++){
                  
                     let item = res.rows.item(i);
                     
                      names.push({
                        subject: item.subject,
                        week: item.week,
                        day: item.day,
                        starttime: item.starttime,
                        endtime: item.endtime,
                        teacher: item.teacher,
                        teachercontact: item.teachercontact,
                        grp: item.grp,
                        place: item.place,
                        placeInDay: item.placeInDay
                      })
                     
                 }
                
                
  
             }
         });
         console.log('timeMon',names)
    setData(names)
     });
 }
  //console.log(editedString)
 

  https://stackoverflow.com/questions/63217964/how-to-access-state-in-function-which-is-in-another-file
  useEffect( () => {
  console.log('eblan')
  fetchData()
    if(tablename.length == 0){
      navigation.setOptions({
        headerTitle: 'Выберите расписание'
      });
    } 
    else {
      navigation.setOptions({
        headerTitle: tablename
      });
    }
    
  },[])

//console.log('mon', editedString)

  
   return(

  
  <SafeAreaView className="h-fit w-full" style={{justifyContent:'center'}}>
      <Image 
      blurRadius={70} 
      source={require('../assets/backgrounds/bg.jpg')} 
      className="absolute w-full h-full" />
      
                    
                   
    <FlatList
    data={data}
    extraData={data}
    className="w-full h-full"
    contentContainerStyle={{alignContent:'center'}}
    renderItem={({item})=> (
      console.log('item',item),
      <Item_of_list name = {item.teacher} contacts="value" type="Теория" place={item.place} startTime={item.starttime} endTime={item.endtime} nameOfSubject ={item.subject}/>

    )
    
  }
    /> 
  </SafeAreaView>
)
}
export default TimeTable