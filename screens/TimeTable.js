import { View, useWindowDimensions,Text, ScrollView, SafeAreaView,Image, FlatList  } from "react-native";
import {useNavigation} from '@react-navigation/native';
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import * as React from 'react';
import { useEffect } from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {tablename} from '../components/profile/profileScreen/timetable_card'
import * as SQLite from "expo-sqlite"
import { Platform } from 'react-native';
import { useTheme } from "../Theme/themeProvider";
import Item_of_list from "../components/timetbale/Lesson";
import { shedules } from "../components/profile/optionsProfile/screens/AddTimeTable/createTimeTable";

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



const TimeTable = () => {
  const navigation = useNavigation()
  const {data1,setData1} = shedules()
  console.log(data1)
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