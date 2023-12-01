import { View, useWindowDimensions,Text, ScrollView, SafeAreaView,Image, FlatList  } from "react-native";
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
  tablename = time.replaceAll(/[grp{}":\\]/g,"")
    console.log(tablename)
  })

}

const  Monday =  () => {
   const [data, setData] = React.useState([])
  const fetchdata = ()=>{

    if(teacherData.indexOf(tablename)==-1){
      if(setData.length!=0){
        let names =[]
        db1.transaction((tx) => {
         tx.executeSql(
          `select * from sheduleByGroup;`,[],(sqlTxn,res)=>{
          let len = res.rows.length
      
         
                  if (len > 0){
                     
                      for(let i=0;i<len;i++){
    
                          let item = res.rows.item(i);
                          if(item.grp == tablename && item.week == "0" ){
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
                          if(item.teacher == tablename && item.week == "0" ){
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
      
      <Item_of_list name = {item.teacher} contacts="value" type="Теория" place={item.place} startTime={item.starttime} endTime={item.endtime} nameOfSubject ={item.subject}/>

    )
    
  }
    /> 
    </SafeAreaView>
        
    
    )
};

const  Tuesday =  () => {
  const [data, setData] = React.useState([])
 const fetchdata = ()=>{
   
   if(teacherData.indexOf(tablename)==-1){
     if(setData.length!=0){
       let names =[]
       db1.transaction((tx) => {
        tx.executeSql(
         `select * from sheduleByGroup;`,[],(sqlTxn,res)=>{
         let len = res.rows.length
        
        
                 if (len > 0){
                    
                     for(let i=0;i<len;i++){
   
                         let item = res.rows.item(i);
                         if(item.grp == tablename && item.week == "1" ){
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
                         if(item.teacher == tablename && item.week == "1" ){
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
     
     <Item_of_list name = {item.teacher} contacts="value" type="Теория" place={item.place} startTime={item.starttime} endTime={item.endtime} nameOfSubject ={item.subject}/>

   )
   
 }
   /> 
   </SafeAreaView>
       
   
   )
};
const  Wednsday =  () => {
  const [data, setData] = React.useState([])
 const fetchdata = ()=>{
  
   if(teacherData.indexOf(tablename)==-1){
     if(setData.length!=0){
       let names =[]
       db1.transaction((tx) => {
        tx.executeSql(
         `select * from sheduleByGroup;`,[],(sqlTxn,res)=>{
         let len = res.rows.length
         
        
                 if (len > 0){
                    
                     for(let i=0;i<len;i++){
   
                         let item = res.rows.item(i);
                         if(item.grp == tablename && item.week == "2" ){
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
                         if(item.teacher == tablename && item.week == "2" ){
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
     
     <Item_of_list name = {item.teacher} contacts="value" type="Теория" place={item.place} startTime={item.starttime} endTime={item.endtime} nameOfSubject ={item.subject}/>

   )
   
 }
   /> 
   </SafeAreaView>
       
   
   )
};
const  Thursday =  () => {
  const [data, setData] = React.useState([])
 const fetchdata = ()=>{

   if(teacherData.indexOf(tablename)==-1){
     if(setData.length!=0){
       let names =[]
       db1.transaction((tx) => {
        tx.executeSql(
         `select * from sheduleByGroup;`,[],(sqlTxn,res)=>{
         let len = res.rows.length
          
        
                 if (len > 0){
                    
                     for(let i=0;i<len;i++){
   
                         let item = res.rows.item(i);
                         if(item.grp == tablename && item.week == "3" ){
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
                         if(item.teacher == tablename && item.week == "3" ){
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
     
     <Item_of_list name = {item.teacher} contacts="value" type="Теория" place={item.place} startTime={item.starttime} endTime={item.endtime} nameOfSubject ={item.subject}/>

   )
   
 }
   /> 
   </SafeAreaView>
       
   
   )
};
const  Friday =  () => {
  const [data, setData] = React.useState([])
 const fetchdata = ()=>{
   
   if(teacherData.indexOf(tablename)==-1){
     if(setData.length!=0){
       let names =[]
       db1.transaction((tx) => {
        tx.executeSql(
         `select * from sheduleByGroup;`,[],(sqlTxn,res)=>{
         let len = res.rows.length
          
        
                 if (len > 0){
                    
                     for(let i=0;i<len;i++){
   
                         let item = res.rows.item(i);
                         if(item.grp == tablename && item.week == "4" ){
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
                         if(item.teacher == tablename && item.week == "4" ){
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
     
     <Item_of_list name = {item.teacher} contacts="value" type="Теория" place={item.place} startTime={item.starttime} endTime={item.endtime} nameOfSubject ={item.subject}/>

   )
   
 }
   /> 
   </SafeAreaView>
       
   
   )
};
const  Saturday =  () => {
  const [data, setData] = React.useState([])
 const fetchdata = ()=>{
   
   if(teacherData.indexOf(tablename)==-1){
     if(setData.length!=0){
       let names =[]
       db1.transaction((tx) => {
        tx.executeSql(
         `select * from sheduleByGroup;`,[],(sqlTxn,res)=>{
         let len = res.rows.length
          
        
                 if (len > 0){
                    
                     for(let i=0;i<len;i++){
   
                         let item = res.rows.item(i);
                         if(item.grp == tablename && item.week == "5" ){
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
                         if(item.teacher == tablename && item.week == "5" ){
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
     
     <Item_of_list name = {item.teacher} contacts="value" type="Теория" place={item.place} startTime={item.starttime} endTime={item.endtime} nameOfSubject ={item.subject}/>

   )
   
 }
   /> 
   </SafeAreaView>
       
   
   )
};
const  Sunday =  () => {
  const [data, setData] = React.useState([])
 const fetchdata = ()=>{
   
   if(teacherData.indexOf(tablename)==-1){
     if(setData.length!=0){
       let names =[]
       db1.transaction((tx) => {
        tx.executeSql(
         `select * from sheduleByGroup;`,[],(sqlTxn,res)=>{
         let len = res.rows.length
          
        
                 if (len > 0){
                    
                     for(let i=0;i<len;i++){
   
                         let item = res.rows.item(i);
                         if(item.grp == tablename && item.week == "6" ){
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
                         if(item.teacher == tablename && item.week == "6" ){
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
     
     <Item_of_list name = {item.teacher} contacts="value" type="Теория" place={item.place} startTime={item.starttime} endTime={item.endtime} nameOfSubject ={item.subject}/>

   )
   
 }
   /> 
   </SafeAreaView>
       
   
   )
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
       style={{ backgroundColor: 'white' }}
       
       
       renderLabel={({ route}) => (
        <Text style={{ fontSize:wp(3.2), color: 'black', margin: 8, fontWeight: "bold" }}>
          {route.title}
        </Text>
      )}
  />
);




export  default function TimeTable(){
  React.useEffect(()=>{getGro()},[])
  const navigation = useNavigation()
  React.useLayoutEffect(() =>{
    navigation.setOptions({
        headerTitle: tablename,
    });
}, []);
console.log("tablename",tablename)

  const {colors} = useTheme()
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










/*
const TimeTable = () => {
  const navigation = useNavigation()
  React.useLayoutEffect(() =>{
    navigation.setOptions({
        headerTitle: tablename,
    });
}, []);

  console.log('tableds',tablename)
  const {colors} = useTheme()
  const [data, setData] = React.useState([])
  const fetchdata = ()=>{
    if(setData.length!=0){
      let names =[]
      db1.transaction((tx) => {
       tx.executeSql(
        `select * from shedule;`,[],(sqlTxn,res)=>{
        let len = res.rows.length
       
                if (len > 0){
                   
                    for(let i=0;i<len;i++){
  
                        let item = res.rows.item(i);
                        if(item.grp == tablename){}
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
                   
                   
     
                })
                console.log('timeMon',names)
                setData(names)
            });
    }
    
  }
  

    useEffect(()=>{
      fetchdata()
    },[])

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
      
      <Item_of_list name = {item.teacher} contacts="value" type="Теория" place={item.place} startTime={item.starttime} endTime={item.endtime} nameOfSubject ={item.subject}/>

    )
    
  }
    /> 
    </SafeAreaView>
        
    
    )
}
export default TimeTable
*/
