import { View, useWindowDimensions,Text, TouchableOpacity, SafeAreaView,Image, FlatList  } from "react-native";
import {useNavigation} from '@react-navigation/native';
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import * as React from 'react';
import { useEffect } from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import { tablename } from "../components/profile/profileScreen/timetable_card";
import * as SQLite from "expo-sqlite"
import { Platform } from 'react-native';
import { useTheme } from "../Theme/themeProvider";
import Item_of_list from "../components/timetbale/Lesson";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ref, onValue} from 'firebase/database'
import {db} from '../utlls/firebase/index'
import {ArrowsRightLeftIcon} from 'react-native-heroicons/solid'
import { username } from "./Profile";

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

let groupData = []
let teacherData = []
const startGroupCountRef = ref (db, 'Groups/')
     onValue(startGroupCountRef , (snapshot) => {
         for(let i=0;i<snapshot.val().length;i++) {
           groupData.push( snapshot.val()[i].group)
           
        }
    })
    const startTeacherCountRef = ref (db, 'Teachers/')
    onValue(startTeacherCountRef , (snapshot) => {
        for(let i=0;i<snapshot.val().length;i++) {
          
          teacherData.push(snapshot.val()[i].name)
       }
      
   })

const db1 = openDatabase();
var tablename =''


async function getGro(){
 await AsyncStorage.getItem("groupname").then(time =>{
  if(tablename===null) console.log('nullll')
  else tablename = time.replaceAll(/[grp{}":\\]/g,"")
  })

}











export  default function TimeTable(){ 
  const {colors} = useTheme()
  const navigation = useNavigation()
  React.useLayoutEffect(() =>{
    navigation.setOptions({
        headerTitle: tablename,
        backgroundColor: colors.background,
        headerRight: () => (
          <View className="flex-row" style={{gap:wp(5),paddingHorizontal:wp(5)}}>
            
          <TouchableOpacity onPress={()=>{chaha()}}>
              <ArrowsRightLeftIcon size={wp(7)} color={colors.headertextandicons} />
          </TouchableOpacity>
          
          </View>
          
),
      });
}, []);
  const [weeks, setWeekeke] = React.useState(0)
  React.useEffect(()=>{
    getGro()
   
  },[])

 
  
  const chaha =()=>{
   
      setWeekeke((prevState)=> {
        if(prevState == 0) return 1
        else return 0
      })
      getGro()
      console.log( weeks)
      
   }
  
  
console.log("tablename",tablename)

  
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'mon', title: 'Пн' },
    { key: 'tue', title: 'Вт' },
    { key: 'wed', title: 'Ср' },
    { key: 'thu', title: 'Чт' },
    { key: 'fri', title: 'Пт' },
    { key: 'sat', title: 'Сб' },
    { key: 'sun', title: 'Вс' }
    
  ]);

  
  const  Monday =  () => {
    var dayofweek = 0
  
     const [data, setData] = React.useState([])
     
     const fetchdata = ()=>{
      
      
      if(teacherData.indexOf(tablename)==-1){
        if(setData.length!=0){
          let names =[]
          db1.transaction((tx) => {
           tx.executeSql(
            `select * from sheduleByGroup ;`,[],(sqlTxn,res)=>{
            let len = res.rows.length
            
           
                    if (len > 0){
                       
                        for(let i=0;i<len;i++){
  
                            let item = res.rows.item(i);
                          
                            if(item.grp===tablename  && item.week == weeks && item.day == dayofweek ){
                             names.push({
                               subject: item.subject,
                               week: item.week,
                               day: item.day,
                               starttime: item.starttime,
                               endtime: item.endtime,
                               teacher: item.teacher,
                               teachercontact: item.contact,
                               grp: item.grp,
                               place: item.place,
                               placeInDay: item.placeInDay,
                               id: item.id,
                               date: "null"
                             })
                        }
                        }
                      }
                       
                       
         
                    })
                    tx.executeSql(
                      `select * from extraShedule GROUP BY id;`,[],(sqlTxn,res)=>{
                      let len = res.rows.length
                       
                     
                              if (len > 0){
                                 
                                  for(let i=0;i<len;i++){
            
                                      let item = res.rows.item(i);
                                          var parts =item.datepara.split('/');
                                          var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
                                        if((typeof item.datepara === 'string') && item.datepara.includes('/') && (item.grp === tablename && item.week == weeks && item.day == dayofweek)&& new Date()<mydate){
                                          
                                         
                                          names.push({
                                            subject: item.subject,
                                            week: item.week,
                                            day: item.day,
                                            starttime: item.starttime,
                                            endtime: item.endtime,
                                            teacher: item.teacher,
                                            teachercontact: item.contact,
                                            grp: item.grp,
                                            place: item.place,
                                            placeInDay: item.placeInDay,
                                            id: item.id,
                                            date: item.datepara
                                          })
                                        }
                                  }
                                }
                              })
                    setData(names)
                });
        }
      }
      else{
        if(setData.length!=0){
          let names =[]
          db1.transaction((tx) => {
           tx.executeSql(
            `select * from sheduleByTeacher;`,[],(sqlTxn,res)=>{
            let len = res.rows.length
           
           
                    if (len > 0){
                       
                        for(let i=0;i<len;i++){
      
                            let item = res.rows.item(i);
                            if(item.teacher === tablename && item.week == weeks && item.day == dayofweek ){
                             names.push({
                               subject: item.subject,
                               week: item.week,
                               day: item.day,
                               starttime: item.starttime,
                               endtime: item.endtime,
                               teacher: item.teacher,
                               teachercontact: item.contact,
                               grp: item.grp,
                               place: item.place,
                               placeInDay: item.placeInDay,
                               id: item.id,
                               date: "null"
                             })
                        }
                        }
                      }
                       
                       
         
                    })
                    tx.executeSql(
                      `select * from extraShedule GROUP BY id;`,[],(sqlTxn,res)=>{
                      let len = res.rows.length
                       
                     
                              if (len > 0){
                                 
                                  for(let i=0;i<len;i++){
            
                                      let item = res.rows.item(i);
                                          var parts =item.datepara.split('/');
                                          var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
                                        if((typeof item.datepara === 'string') && item.datepara.includes('/') && (item.teacher === tablename && item.week == weeks&& item.day == dayofweek)&& new Date()<mydate){
                                          
                                            names.push({
                                            subject: item.subject,
                                            week: item.week,
                                            day: item.day,
                                            starttime: item.starttime,
                                            endtime: item.endtime,
                                            teacher: item.teacher,
                                            teachercontact: item.contact,
                                            grp: item.grp,
                                            place: item.place,
                                            placeInDay: item.placeInDay,
                                            id: item.id,
                                             date: item.datepara
                                          })
                                        }
                                  }
                                }
                              })
                    setData(names)
                });
        }
      }
      
      
    }
    
  
      useEffect(()=>{
        fetchdata()
      },[])
  if(username!=null){
    return(
  
      <SafeAreaView className="h-fit w-full items-center relative">
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
      //console.log('item',item),
      <TouchableOpacity onPress={()=>{navigation.navigate('Изменить',{
      name: item.teacher,
      subject: item.subject,
      para: item.placeInDay,
      id: item.id,
      place: item.place,
      })}}>
      <Item_of_list 
      name = {item.teacher}
      contacts={item.teachercontact}
      place={item.place} 
      startTime={item.starttime} 
      endTime={item.endtime} 
      nameOfSubject ={item.subject}/>
      </TouchableOpacity>

    )
    
  }
    /> 
    </SafeAreaView>
        
    
    )
  }
  else {
    return(
  
      <SafeAreaView className="h-fit w-full items-center relative">
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
      //console.log('item',item),
     
      <Item_of_list 
      name = {item.teacher}
      contacts={item.teachercontact}
      place={item.place} 
      startTime={item.starttime} 
      endTime={item.endtime} 
      nameOfSubject ={item.subject}/>
 
    )
    
  }
    /> 
    </SafeAreaView>
        
    
    )
  }
      
  };
  
  const  Tuesday =  () => {
    var dayofweek = 1
  
     const [data, setData] = React.useState([])
     
     const fetchdata = ()=>{
      
      
      if(teacherData.indexOf(tablename)==-1){
        if(setData.length!=0){
          let names =[]
          db1.transaction((tx) => {
           tx.executeSql(
            `select * from sheduleByGroup ;`,[],(sqlTxn,res)=>{
            let len = res.rows.length
            
           
                    if (len > 0){
                       
                        for(let i=0;i<len;i++){
  
                            let item = res.rows.item(i);
                          
                            if(item.grp===tablename  && item.week == weeks && item.day == dayofweek ){
                             names.push({
                               subject: item.subject,
                               week: item.week,
                               day: item.day,
                               starttime: item.starttime,
                               endtime: item.endtime,
                               teacher: item.teacher,
                               teachercontact: item.contact,
                               grp: item.grp,
                               place: item.place,
                               placeInDay: item.placeInDay,
                               id: item.id,
                               date: "null"
                             })
                        }
                        }
                      }
                       
                       
         
                    })
                    tx.executeSql(
                      `select * from extraShedule GROUP BY id;`,[],(sqlTxn,res)=>{
                      let len = res.rows.length
                       
                     
                              if (len > 0){
                                 
                                  for(let i=0;i<len;i++){
            
                                      let item = res.rows.item(i);
                                          var parts =item.datepara.split('/');
                                          var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
                                        if((typeof item.datepara === 'string') && item.datepara.includes('/') && (item.grp === tablename && item.week == weeks && item.day == dayofweek)&& new Date()<mydate){
                                          
                                         
                                          names.push({
                                            subject: item.subject,
                                            week: item.week,
                                            day: item.day,
                                            starttime: item.starttime,
                                            endtime: item.endtime,
                                            teacher: item.teacher,
                                            teachercontact: item.contact,
                                            grp: item.grp,
                                            place: item.place,
                                            placeInDay: item.placeInDay,
                                            id: item.id,
                                            date: item.datepara
                                          })
                                        }
                                  }
                                }
                              })
                    setData(names)
                });
        }
      }
      else{
        if(setData.length!=0){
          let names =[]
          db1.transaction((tx) => {
           tx.executeSql(
            `select * from sheduleByTeacher;`,[],(sqlTxn,res)=>{
            let len = res.rows.length
           
           
                    if (len > 0){
                       
                        for(let i=0;i<len;i++){
      
                            let item = res.rows.item(i);
                            if(item.teacher === tablename && item.week == weeks && item.day == dayofweek ){
                             names.push({
                               subject: item.subject,
                               week: item.week,
                               day: item.day,
                               starttime: item.starttime,
                               endtime: item.endtime,
                               teacher: item.teacher,
                               teachercontact: item.contact,
                               grp: item.grp,
                               place: item.place,
                               placeInDay: item.placeInDay,
                               id: item.id,
                               date: "null"
                             })
                        }
                        }
                      }
                       
                       
         
                    })
                    tx.executeSql(
                      `select * from extraShedule GROUP BY id;`,[],(sqlTxn,res)=>{
                      let len = res.rows.length
                       
                     
                              if (len > 0){
                                 
                                  for(let i=0;i<len;i++){
            
                                      let item = res.rows.item(i);
                                          var parts =item.datepara.split('/');
                                          var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
                                        if((typeof item.datepara === 'string') && item.datepara.includes('/') && (item.teacher === tablename && item.week == weeks&& item.day == dayofweek)&& new Date()<mydate){
                                          
                                            names.push({
                                            subject: item.subject,
                                            week: item.week,
                                            day: item.day,
                                            starttime: item.starttime,
                                            endtime: item.endtime,
                                            teacher: item.teacher,
                                            teachercontact: item.contact,
                                            grp: item.grp,
                                            place: item.place,
                                            placeInDay: item.placeInDay,
                                            id: item.id,
                                             date: item.datepara
                                          })
                                        }
                                  }
                                }
                              })
                    setData(names)
                });
        }
      }
      
      
    }
    
  
      useEffect(()=>{
        fetchdata()
      },[])
  if(username!=null){
    return(
  
      <SafeAreaView className="h-fit w-full items-center relative">
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
      //console.log('item',item),
      <TouchableOpacity onPress={()=>{navigation.navigate('Изменить',{
      name: item.teacher,
      subject: item.subject,
      para: item.placeInDay,
      id: item.id,
      place: item.place,
      })}}>
      <Item_of_list 
      name = {item.teacher}
      contacts={item.teachercontact}
      place={item.place} 
      startTime={item.starttime} 
      endTime={item.endtime} 
      nameOfSubject ={item.subject}/>
      </TouchableOpacity>

    )
    
  }
    /> 
    </SafeAreaView>
        
    
    )
  }
  else {
    return(
  
      <SafeAreaView className="h-fit w-full items-center relative">
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
      //console.log('item',item),
     
      <Item_of_list 
      name = {item.teacher}
      contacts={item.teachercontact}
      place={item.place} 
      startTime={item.starttime} 
      endTime={item.endtime} 
      nameOfSubject ={item.subject}/>
 
    )
    
  }
    /> 
    </SafeAreaView>
        
    
    )
  }
      
  };
  const  Wednsday =  () => {
    var dayofweek = 2
  
     const [data, setData] = React.useState([])
     
     const fetchdata = ()=>{
      
      
      if(teacherData.indexOf(tablename)==-1){
        if(setData.length!=0){
          let names =[]
          db1.transaction((tx) => {
           tx.executeSql(
            `select * from sheduleByGroup ;`,[],(sqlTxn,res)=>{
            let len = res.rows.length
            
           
                    if (len > 0){
                       
                        for(let i=0;i<len;i++){
  
                            let item = res.rows.item(i);
                          
                            if(item.grp===tablename  && item.week == weeks && item.day == dayofweek ){
                             names.push({
                               subject: item.subject,
                               week: item.week,
                               day: item.day,
                               starttime: item.starttime,
                               endtime: item.endtime,
                               teacher: item.teacher,
                               teachercontact: item.contact,
                               grp: item.grp,
                               place: item.place,
                               placeInDay: item.placeInDay,
                               id: item.id,
                               date: "null"
                             })
                        }
                        }
                      }
                       
                       
         
                    })
                    tx.executeSql(
                      `select * from extraShedule GROUP BY id;`,[],(sqlTxn,res)=>{
                      let len = res.rows.length
                       
                     
                              if (len > 0){
                                 
                                  for(let i=0;i<len;i++){
            
                                      let item = res.rows.item(i);
                                          var parts =item.datepara.split('/');
                                          var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
                                        if((typeof item.datepara === 'string') && item.datepara.includes('/') && (item.grp === tablename && item.week == weeks && item.day == dayofweek)&& new Date()<mydate){
                                          
                                         
                                          names.push({
                                            subject: item.subject,
                                            week: item.week,
                                            day: item.day,
                                            starttime: item.starttime,
                                            endtime: item.endtime,
                                            teacher: item.teacher,
                                            teachercontact: item.contact,
                                            grp: item.grp,
                                            place: item.place,
                                            placeInDay: item.placeInDay,
                                            id: item.id,
                                            date: item.datepara
                                          })
                                        }
                                  }
                                }
                              })
                    setData(names)
                });
        }
      }
      else{
        if(setData.length!=0){
          let names =[]
          db1.transaction((tx) => {
           tx.executeSql(
            `select * from sheduleByTeacher;`,[],(sqlTxn,res)=>{
            let len = res.rows.length
           
           
                    if (len > 0){
                       
                        for(let i=0;i<len;i++){
      
                            let item = res.rows.item(i);
                            if(item.teacher === tablename && item.week == weeks && item.day == dayofweek ){
                             names.push({
                               subject: item.subject,
                               week: item.week,
                               day: item.day,
                               starttime: item.starttime,
                               endtime: item.endtime,
                               teacher: item.teacher,
                               teachercontact: item.contact,
                               grp: item.grp,
                               place: item.place,
                               placeInDay: item.placeInDay,
                               id: item.id,
                               date: "null"
                             })
                        }
                        }
                      }
                       
                       
         
                    })
                    tx.executeSql(
                      `select * from extraShedule GROUP BY id;`,[],(sqlTxn,res)=>{
                      let len = res.rows.length
                       
                     
                              if (len > 0){
                                 
                                  for(let i=0;i<len;i++){
            
                                      let item = res.rows.item(i);
                                          var parts =item.datepara.split('/');
                                          var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
                                        if((typeof item.datepara === 'string') && item.datepara.includes('/') && (item.teacher === tablename && item.week == weeks&& item.day == dayofweek)&& new Date()<mydate){
                                          
                                            names.push({
                                            subject: item.subject,
                                            week: item.week,
                                            day: item.day,
                                            starttime: item.starttime,
                                            endtime: item.endtime,
                                            teacher: item.teacher,
                                            teachercontact: item.contact,
                                            grp: item.grp,
                                            place: item.place,
                                            placeInDay: item.placeInDay,
                                            id: item.id,
                                             date: item.datepara
                                          })
                                        }
                                  }
                                }
                              })
                    setData(names)
                });
        }
      }
      
      
    }
    
  
      useEffect(()=>{
        fetchdata()
      },[])
  if(username!=null){
    return(
  
      <SafeAreaView className="h-fit w-full items-center relative">
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
      //console.log('item',item),
      <TouchableOpacity onPress={()=>{navigation.navigate('Изменить',{
      name: item.teacher,
      subject: item.subject,
      para: item.placeInDay,
      id: item.id,
      place: item.place,
      })}}>
      <Item_of_list 
      name = {item.teacher}
      contacts={item.teachercontact}
      place={item.place} 
      startTime={item.starttime} 
      endTime={item.endtime} 
      nameOfSubject ={item.subject}/>
      </TouchableOpacity>

    )
    
  }
    /> 
    </SafeAreaView>
        
    
    )
  }
  else {
    return(
  
      <SafeAreaView className="h-fit w-full items-center relative">
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
      //console.log('item',item),
     
      <Item_of_list 
      name = {item.teacher}
      contacts={item.teachercontact}
      place={item.place} 
      startTime={item.starttime} 
      endTime={item.endtime} 
      nameOfSubject ={item.subject}/>
 
    )
    
  }
    /> 
    </SafeAreaView>
        
    
    )
  }
      
  };
  
  const  Thursday =  () => {
    var dayofweek = 3
  
     const [data, setData] = React.useState([])
     
     const fetchdata = ()=>{
      
      
      if(teacherData.indexOf(tablename)==-1){
        if(setData.length!=0){
          let names =[]
          db1.transaction((tx) => {
           tx.executeSql(
            `select * from sheduleByGroup ;`,[],(sqlTxn,res)=>{
            let len = res.rows.length
            
           
                    if (len > 0){
                       
                        for(let i=0;i<len;i++){
  
                            let item = res.rows.item(i);
                          
                            if(item.grp===tablename  && item.week == weeks && item.day == dayofweek ){
                             names.push({
                               subject: item.subject,
                               week: item.week,
                               day: item.day,
                               starttime: item.starttime,
                               endtime: item.endtime,
                               teacher: item.teacher,
                               teachercontact: item.contact,
                               grp: item.grp,
                               place: item.place,
                               placeInDay: item.placeInDay,
                               id: item.id,
                               date: "null"
                             })
                        }
                        }
                      }
                       
                       
         
                    })
                    tx.executeSql(
                      `select * from extraShedule GROUP BY id;`,[],(sqlTxn,res)=>{
                      let len = res.rows.length
                       
                     
                              if (len > 0){
                                 
                                  for(let i=0;i<len;i++){
            
                                      let item = res.rows.item(i);
                                          var parts =item.datepara.split('/');
                                          var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
                                        if((typeof item.datepara === 'string') && item.datepara.includes('/') && (item.grp === tablename && item.week == weeks && item.day == dayofweek)&& new Date()<mydate){
                                          
                                         
                                          names.push({
                                            subject: item.subject,
                                            week: item.week,
                                            day: item.day,
                                            starttime: item.starttime,
                                            endtime: item.endtime,
                                            teacher: item.teacher,
                                            teachercontact: item.contact,
                                            grp: item.grp,
                                            place: item.place,
                                            placeInDay: item.placeInDay,
                                            id: item.id,
                                            date: item.datepara
                                          })
                                        }
                                  }
                                }
                              })
                    setData(names)
                });
        }
      }
      else{
        if(setData.length!=0){
          let names =[]
          db1.transaction((tx) => {
           tx.executeSql(
            `select * from sheduleByTeacher;`,[],(sqlTxn,res)=>{
            let len = res.rows.length
           
           
                    if (len > 0){
                       
                        for(let i=0;i<len;i++){
      
                            let item = res.rows.item(i);
                            if(item.teacher === tablename && item.week == weeks && item.day == dayofweek ){
                             names.push({
                               subject: item.subject,
                               week: item.week,
                               day: item.day,
                               starttime: item.starttime,
                               endtime: item.endtime,
                               teacher: item.teacher,
                               teachercontact: item.contact,
                               grp: item.grp,
                               place: item.place,
                               placeInDay: item.placeInDay,
                               id: item.id,
                               date: "null"
                             })
                        }
                        }
                      }
                       
                       
         
                    })
                    tx.executeSql(
                      `select * from extraShedule GROUP BY id;`,[],(sqlTxn,res)=>{
                      let len = res.rows.length
                       
                     
                              if (len > 0){
                                 
                                  for(let i=0;i<len;i++){
            
                                      let item = res.rows.item(i);
                                          var parts =item.datepara.split('/');
                                          var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
                                        if((typeof item.datepara === 'string') && item.datepara.includes('/') && (item.teacher === tablename && item.week == weeks&& item.day == dayofweek)&& new Date()<mydate){
                                          
                                            names.push({
                                            subject: item.subject,
                                            week: item.week,
                                            day: item.day,
                                            starttime: item.starttime,
                                            endtime: item.endtime,
                                            teacher: item.teacher,
                                            teachercontact: item.contact,
                                            grp: item.grp,
                                            place: item.place,
                                            placeInDay: item.placeInDay,
                                            id: item.id,
                                             date: item.datepara
                                          })
                                        }
                                  }
                                }
                              })
                    setData(names)
                });
        }
      }
      
      
    }
    
  
      useEffect(()=>{
        fetchdata()
      },[])
  if(username!=null){
    return(
  
      <SafeAreaView className="h-fit w-full items-center relative">
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
      //console.log('item',item),
      <TouchableOpacity onPress={()=>{navigation.navigate('Изменить',{
      name: item.teacher,
      subject: item.subject,
      para: item.placeInDay,
      id: item.id,
      place: item.place,
      })}}>
      <Item_of_list 
      name = {item.teacher}
      contacts={item.teachercontact}
      place={item.place} 
      startTime={item.starttime} 
      endTime={item.endtime} 
      nameOfSubject ={item.subject}/>
      </TouchableOpacity>

    )
    
  }
    /> 
    </SafeAreaView>
        
    
    )
  }
  else {
    return(
  
      <SafeAreaView className="h-fit w-full items-center relative">
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
      //console.log('item',item),
     
      <Item_of_list 
      name = {item.teacher}
      contacts={item.teachercontact}
      place={item.place} 
      startTime={item.starttime} 
      endTime={item.endtime} 
      nameOfSubject ={item.subject}/>
 
    )
    
  }
    /> 
    </SafeAreaView>
        
    
    )
  }
      
  };
  
  const  Friday =  () => {
    var dayofweek = 4
  
     const [data, setData] = React.useState([])
     
     const fetchdata = ()=>{
      
      
      if(teacherData.indexOf(tablename)==-1){
        if(setData.length!=0){
          let names =[]
          db1.transaction((tx) => {
           tx.executeSql(
            `select * from sheduleByGroup ;`,[],(sqlTxn,res)=>{
            let len = res.rows.length
            
           
                    if (len > 0){
                       
                        for(let i=0;i<len;i++){
  
                            let item = res.rows.item(i);
                          
                            if(item.grp===tablename  && item.week == weeks && item.day == dayofweek ){
                             names.push({
                               subject: item.subject,
                               week: item.week,
                               day: item.day,
                               starttime: item.starttime,
                               endtime: item.endtime,
                               teacher: item.teacher,
                               teachercontact: item.contact,
                               grp: item.grp,
                               place: item.place,
                               placeInDay: item.placeInDay,
                               id: item.id,
                               date: "null"
                             })
                        }
                        }
                      }
                       
                       
         
                    })
                    tx.executeSql(
                      `select * from extraShedule GROUP BY id;`,[],(sqlTxn,res)=>{
                      let len = res.rows.length
                       
                     
                              if (len > 0){
                                 
                                  for(let i=0;i<len;i++){
            
                                      let item = res.rows.item(i);
                                          var parts =item.datepara.split('/');
                                          var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
                                        if((typeof item.datepara === 'string') && item.datepara.includes('/') && (item.grp === tablename && item.week == weeks && item.day == dayofweek)&& new Date()<mydate){
                                          
                                         
                                          names.push({
                                            subject: item.subject,
                                            week: item.week,
                                            day: item.day,
                                            starttime: item.starttime,
                                            endtime: item.endtime,
                                            teacher: item.teacher,
                                            teachercontact: item.contact,
                                            grp: item.grp,
                                            place: item.place,
                                            placeInDay: item.placeInDay,
                                            id: item.id,
                                            date: item.datepara
                                          })
                                        }
                                  }
                                }
                              })
                    setData(names)
                });
        }
      }
      else{
        if(setData.length!=0){
          let names =[]
          db1.transaction((tx) => {
           tx.executeSql(
            `select * from sheduleByTeacher;`,[],(sqlTxn,res)=>{
            let len = res.rows.length
           
           
                    if (len > 0){
                       
                        for(let i=0;i<len;i++){
      
                            let item = res.rows.item(i);
                            if(item.teacher === tablename && item.week == weeks && item.day == dayofweek ){
                             names.push({
                               subject: item.subject,
                               week: item.week,
                               day: item.day,
                               starttime: item.starttime,
                               endtime: item.endtime,
                               teacher: item.teacher,
                               teachercontact: item.contact,
                               grp: item.grp,
                               place: item.place,
                               placeInDay: item.placeInDay,
                               id: item.id,
                               date: "null"
                             })
                        }
                        }
                      }
                       
                       
         
                    })
                    tx.executeSql(
                      `select * from extraShedule GROUP BY id;`,[],(sqlTxn,res)=>{
                      let len = res.rows.length
                       
                     
                              if (len > 0){
                                 
                                  for(let i=0;i<len;i++){
            
                                      let item = res.rows.item(i);
                                          var parts =item.datepara.split('/');
                                          var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
                                        if((typeof item.datepara === 'string') && item.datepara.includes('/') && (item.teacher === tablename && item.week == weeks&& item.day == dayofweek)&& new Date()<mydate){
                                          
                                            names.push({
                                            subject: item.subject,
                                            week: item.week,
                                            day: item.day,
                                            starttime: item.starttime,
                                            endtime: item.endtime,
                                            teacher: item.teacher,
                                            teachercontact: item.contact,
                                            grp: item.grp,
                                            place: item.place,
                                            placeInDay: item.placeInDay,
                                            id: item.id,
                                             date: item.datepara
                                          })
                                        }
                                  }
                                }
                              })
                    setData(names)
                });
        }
      }
      
      
    }
    
  
      useEffect(()=>{
        fetchdata()
      },[])
  if(username!=null){
    return(
  
      <SafeAreaView className="h-fit w-full items-center relative">
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
      //console.log('item',item),
      <TouchableOpacity onPress={()=>{navigation.navigate('Изменить',{
      name: item.teacher,
      subject: item.subject,
      para: item.placeInDay,
      id: item.id,
      place: item.place,
      })}}>
      <Item_of_list 
      name = {item.teacher}
      contacts={item.teachercontact}
      place={item.place} 
      startTime={item.starttime} 
      endTime={item.endtime} 
      nameOfSubject ={item.subject}/>
      </TouchableOpacity>

    )
    
  }
    /> 
    </SafeAreaView>
        
    
    )
  }
  else {
    return(
  
      <SafeAreaView className="h-fit w-full items-center relative">
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
      //console.log('item',item),
     
      <Item_of_list 
      name = {item.teacher}
      contacts={item.teachercontact}
      place={item.place} 
      startTime={item.starttime} 
      endTime={item.endtime} 
      nameOfSubject ={item.subject}/>
 
    )
    
  }
    /> 
    </SafeAreaView>
        
    
    )
  }
      
  };
  
  const  Saturday =  () => {
    var dayofweek = 5
  
     const [data, setData] = React.useState([])
     
     const fetchdata = ()=>{
      
      
      if(teacherData.indexOf(tablename)==-1){
        if(setData.length!=0){
          let names =[]
          db1.transaction((tx) => {
           tx.executeSql(
            `select * from sheduleByGroup ;`,[],(sqlTxn,res)=>{
            let len = res.rows.length
            
           
                    if (len > 0){
                       
                        for(let i=0;i<len;i++){
  
                            let item = res.rows.item(i);
                          
                            if(item.grp===tablename  && item.week == weeks && item.day == dayofweek ){
                             names.push({
                               subject: item.subject,
                               week: item.week,
                               day: item.day,
                               starttime: item.starttime,
                               endtime: item.endtime,
                               teacher: item.teacher,
                               teachercontact: item.contact,
                               grp: item.grp,
                               place: item.place,
                               placeInDay: item.placeInDay,
                               id: item.id,
                               date: "null"
                             })
                        }
                        }
                      }
                       
                       
         
                    })
                    tx.executeSql(
                      `select * from extraShedule GROUP BY id;`,[],(sqlTxn,res)=>{
                      let len = res.rows.length
                       
                     
                              if (len > 0){
                                 
                                  for(let i=0;i<len;i++){
            
                                      let item = res.rows.item(i);
                                          var parts =item.datepara.split('/');
                                          var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
                                        if((typeof item.datepara === 'string') && item.datepara.includes('/') && (item.grp === tablename && item.week == weeks && item.day == dayofweek)&& new Date()<mydate){
                                          
                                         
                                          names.push({
                                            subject: item.subject,
                                            week: item.week,
                                            day: item.day,
                                            starttime: item.starttime,
                                            endtime: item.endtime,
                                            teacher: item.teacher,
                                            teachercontact: item.contact,
                                            grp: item.grp,
                                            place: item.place,
                                            placeInDay: item.placeInDay,
                                            id: item.id,
                                            date: item.datepara
                                          })
                                        }
                                  }
                                }
                              })
                    setData(names)
                });
        }
      }
      else{
        if(setData.length!=0){
          let names =[]
          db1.transaction((tx) => {
           tx.executeSql(
            `select * from sheduleByTeacher;`,[],(sqlTxn,res)=>{
            let len = res.rows.length
           
           
                    if (len > 0){
                       
                        for(let i=0;i<len;i++){
      
                            let item = res.rows.item(i);
                            if(item.teacher === tablename && item.week == weeks && item.day == dayofweek ){
                             names.push({
                               subject: item.subject,
                               week: item.week,
                               day: item.day,
                               starttime: item.starttime,
                               endtime: item.endtime,
                               teacher: item.teacher,
                               teachercontact: item.contact,
                               grp: item.grp,
                               place: item.place,
                               placeInDay: item.placeInDay,
                               id: item.id,
                               date: "null"
                             })
                        }
                        }
                      }
                       
                       
         
                    })
                    tx.executeSql(
                      `select * from extraShedule GROUP BY id;`,[],(sqlTxn,res)=>{
                      let len = res.rows.length
                       
                     
                              if (len > 0){
                                 
                                  for(let i=0;i<len;i++){
            
                                      let item = res.rows.item(i);
                                          var parts =item.datepara.split('/');
                                          var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
                                        if((typeof item.datepara === 'string') && item.datepara.includes('/') && (item.teacher === tablename && item.week == weeks&& item.day == dayofweek)&& new Date()<mydate){
                                          
                                            names.push({
                                            subject: item.subject,
                                            week: item.week,
                                            day: item.day,
                                            starttime: item.starttime,
                                            endtime: item.endtime,
                                            teacher: item.teacher,
                                            teachercontact: item.contact,
                                            grp: item.grp,
                                            place: item.place,
                                            placeInDay: item.placeInDay,
                                            id: item.id,
                                             date: item.datepara
                                          })
                                        }
                                  }
                                }
                              })
                    setData(names)
                });
        }
      }
      
      
    }
    
  
      useEffect(()=>{
        fetchdata()
      },[])
  if(username!=null){
    return(
  
      <SafeAreaView className="h-fit w-full items-center relative">
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
      //console.log('item',item),
      <TouchableOpacity onPress={()=>{navigation.navigate('Изменить',{
      name: item.teacher,
      subject: item.subject,
      para: item.placeInDay,
      id: item.id,
      place: item.place,
      })}}>
      <Item_of_list 
      name = {item.teacher}
      contacts={item.teachercontact}
      place={item.place} 
      startTime={item.starttime} 
      endTime={item.endtime} 
      nameOfSubject ={item.subject}/>
      </TouchableOpacity>

    )
    
  }
    /> 
    </SafeAreaView>
        
    
    )
  }
  else {
    return(
  
      <SafeAreaView className="h-fit w-full items-center relative">
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
      //console.log('item',item),
     
      <Item_of_list 
      name = {item.teacher}
      contacts={item.teachercontact}
      place={item.place} 
      startTime={item.starttime} 
      endTime={item.endtime} 
      nameOfSubject ={item.subject}/>
 
    )
    
  }
    /> 
    </SafeAreaView>
        
    
    )
  }
      
  };
  
  const  Sunday =  () => {
    var dayofweek = 6
  
     const [data, setData] = React.useState([])
     
     const fetchdata = ()=>{
      
      
      if(teacherData.indexOf(tablename)==-1){
        if(setData.length!=0){
          let names =[]
          db1.transaction((tx) => {
           tx.executeSql(
            `select * from sheduleByGroup ;`,[],(sqlTxn,res)=>{
            let len = res.rows.length
            
           
                    if (len > 0){
                       
                        for(let i=0;i<len;i++){
  
                            let item = res.rows.item(i);
                          
                            if(item.grp===tablename  && item.week == weeks && item.day == dayofweek ){
                             names.push({
                               subject: item.subject,
                               week: item.week,
                               day: item.day,
                               starttime: item.starttime,
                               endtime: item.endtime,
                               teacher: item.teacher,
                               teachercontact: item.contact,
                               grp: item.grp,
                               place: item.place,
                               placeInDay: item.placeInDay,
                               id: item.id,
                               date: "null"
                             })
                        }
                        }
                      }
                       
                       
         
                    })
                    tx.executeSql(
                      `select * from extraShedule GROUP BY id;`,[],(sqlTxn,res)=>{
                      let len = res.rows.length
                       
                     
                              if (len > 0){
                                 
                                  for(let i=0;i<len;i++){
            
                                      let item = res.rows.item(i);
                                          var parts =item.datepara.split('/');
                                          var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
                                        if((typeof item.datepara === 'string') && item.datepara.includes('/') && (item.grp === tablename && item.week == weeks && item.day == dayofweek)&& new Date()<mydate){
                                          
                                         
                                          names.push({
                                            subject: item.subject,
                                            week: item.week,
                                            day: item.day,
                                            starttime: item.starttime,
                                            endtime: item.endtime,
                                            teacher: item.teacher,
                                            teachercontact: item.contact,
                                            grp: item.grp,
                                            place: item.place,
                                            placeInDay: item.placeInDay,
                                            id: item.id,
                                            date: item.datepara
                                          })
                                        }
                                  }
                                }
                              })
                    setData(names)
                });
        }
      }
      else{
        if(setData.length!=0){
          let names =[]
          db1.transaction((tx) => {
           tx.executeSql(
            `select * from sheduleByTeacher;`,[],(sqlTxn,res)=>{
            let len = res.rows.length
           
           
                    if (len > 0){
                       
                        for(let i=0;i<len;i++){
      
                            let item = res.rows.item(i);
                            if(item.teacher === tablename && item.week == weeks && item.day == dayofweek ){
                             names.push({
                               subject: item.subject,
                               week: item.week,
                               day: item.day,
                               starttime: item.starttime,
                               endtime: item.endtime,
                               teacher: item.teacher,
                               teachercontact: item.contact,
                               grp: item.grp,
                               place: item.place,
                               placeInDay: item.placeInDay,
                               id: item.id,
                               date: "null"
                             })
                        }
                        }
                      }
                       
                       
         
                    })
                    tx.executeSql(
                      `select * from extraShedule GROUP BY id;`,[],(sqlTxn,res)=>{
                      let len = res.rows.length
                       
                     
                              if (len > 0){
                                 
                                  for(let i=0;i<len;i++){
            
                                      let item = res.rows.item(i);
                                          var parts =item.datepara.split('/');
                                          var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
                                        if((typeof item.datepara === 'string') && item.datepara.includes('/') && (item.teacher === tablename && item.week == weeks&& item.day == dayofweek)&& new Date()<mydate){
                                          
                                            names.push({
                                            subject: item.subject,
                                            week: item.week,
                                            day: item.day,
                                            starttime: item.starttime,
                                            endtime: item.endtime,
                                            teacher: item.teacher,
                                            teachercontact: item.contact,
                                            grp: item.grp,
                                            place: item.place,
                                            placeInDay: item.placeInDay,
                                            id: item.id,
                                             date: item.datepara
                                          })
                                        }
                                  }
                                }
                              })
                    setData(names)
                });
        }
      }
      
      
    }
    
  
      useEffect(()=>{
        fetchdata()
      },[])
  if(username!=null){
    return(
  
      <SafeAreaView className="h-fit w-full items-center relative">
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
      //console.log('item',item),
      <TouchableOpacity onPress={()=>{navigation.navigate('Изменить',{
      name: item.teacher,
      subject: item.subject,
      para: item.placeInDay,
      id: item.id,
      place: item.place,
      })}}>
      <Item_of_list 
      name = {item.teacher}
      contacts={item.teachercontact}
      place={item.place} 
      startTime={item.starttime} 
      endTime={item.endtime} 
      nameOfSubject ={item.subject}/>
      </TouchableOpacity>

    )
    
  }
    /> 
    </SafeAreaView>
        
    
    )
  }
  else {
    return(
  
      <SafeAreaView className="h-fit w-full items-center relative">
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
      //console.log('item',item),
     
      <Item_of_list 
      name = {item.teacher}
      contacts={item.teachercontact}
      place={item.place} 
      startTime={item.starttime} 
      endTime={item.endtime} 
      nameOfSubject ={item.subject}/>
 
    )
    
  }
    /> 
    </SafeAreaView>
        
    
    )
  }
      
  };
  
  
  const renderScene = SceneMap({
    mon: Monday,
    tue: Tuesday,
    wed: Wednsday,
    thu: Thursday,
    fri: Friday,
    sat: Saturday,
    sun: Sunday
   
  });

  const renderTabBar = props => (
  
    <TabBar
    
      {...props}
      indicatorStyle={{ backgroundColor: 'green'}}
         style={{ backgroundColor: colors.background }}
         
         
         renderLabel={({ route}) => (
          <Text style={{ fontSize:wp(3.2), color: colors.headertextandicons, margin: 8, fontWeight: "bold" }}>
            {route.title}
          </Text>
        )}
    />
  );
  return(
      
    <TabView
    renderTabBar={renderTabBar}
    style={{backgroundColor:'white'}}
    navigationState={{ index, routes }}
    renderScene={renderScene}
    onIndexChange={setIndex}
    initialLayout={{ width: layout.width }}
  />    
  
  )
}










