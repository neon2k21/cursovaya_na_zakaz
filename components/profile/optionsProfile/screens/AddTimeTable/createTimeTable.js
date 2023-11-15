import {db} from '../../../../../utlls/firebase/index'
import {ref, onValue} from 'firebase/database'
import { createTable,getAllTablesFromDB,insertDataInTable, getTimeTableFromDB } from '../../../../../utlls/localDB'
import * as SQLite from "expo-sqlite"
import { Platform } from 'react-native';
import { useState } from 'react';



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





export  function createTimeTable(parameterName){
 
    var editedString = parameterName.replaceAll(' ','')
    .replaceAll('.','')
    .replaceAll('-','')
    .replaceAll('/','')
    console.log(editedString) 
  
    let groupData = []
    let teacherData = []
    let getTimeTable = []
    let subjectsData = []
    const startGroupCountRef = ref (db, 'Groups/')
     onValue(startGroupCountRef , (snapshot) => {
         for(let i=0;i<snapshot.val().length;i++) {
           groupData.push( snapshot.val()[i].group)
           
        }
    })
    const startTeacherCountRef = ref (db, 'Teachers/')
     onValue(startTeacherCountRef , (snapshot) => {
         for(let i=0;i<snapshot.val().length;i++) {
            teacherData.push(snapshot.val()[i])
           
        }
       
    })
    const startTimeTableCountRef = ref (db, 'TimeTable/')
     onValue(startTimeTableCountRef , (snapshot) => {
        
         for(let i=0;i<snapshot.val().length;i++) {
            
                if(snapshot.val()[i].group == groupData.indexOf(parameterName) || snapshot.val()[i].teacher == teacherData.indexOf(parameterName) )
                getTimeTable.push(snapshot.val()[i])
            
           
        }
       
    })
    const startubjectCountRef = ref (db, 'Subjects/')
     onValue(startubjectCountRef , (snapshot) => {
         for(let i=0;i<snapshot.val().length;i++) {
            subjectsData.push( snapshot.val()[i].name)
           
        }
       
    })
    
    

    let collectedData = []
    console.log('timetable',getTimeTable.length)
    for(let i=0;i<getTimeTable.length;i++){
        collectedData.push({
            subject : subjectsData[getTimeTable[i].subject],
            week : getTimeTable[i].week,
            day : getTimeTable[i].day,
            starttime : getTimeTable[i].starttime,
            endtime : getTimeTable[i].endtime,
            teacher : teacherData[getTimeTable[i].teacher].name,
            teachercontact : teacherData[getTimeTable[i].teacher].contact, 
            group : groupData[getTimeTable[i].group],
            place : getTimeTable[i].place,
            placeInday : getTimeTable[i].placeInday
        })
        
    }
    //storage.set(parameterName,collectedData)
    //console.log(storage.getAllKeys())

    let names =[]
    db1.transaction((tx) => {
     for(let i = 0;i< getTimeTable.length;i++){
       
      tx.executeSql(
          `insert into shedule (subject, week, day, starttime, endtime, teacher, contact, grp, place, placeInDay) values (?,?,?,?,?,?,?,?,?,?)`,[
              subjectsData[getTimeTable[i].subject],
              Number(getTimeTable[i].week),
              Number(getTimeTable[i].day),
              getTimeTable[i].starttime,
              getTimeTable[i].endtime,
              teacherData[getTimeTable[i].teacher].name,
              teacherData[getTimeTable[i].teacher].contact,
              groupData[getTimeTable[i].group],
              getTimeTable[i].place,
              Number(getTimeTable[i].placeInday)
          ]);
    }
   
    tx.executeSql(`select * from shedule;`, [], (_, { rows }) =>
    console.log('inserted shedule',JSON.stringify(rows))
  );
  
       
      
}),error => console.log(`create error: ${error}`);    

    
}

export const shedules =() =>{
  const [data1,setData1] = useState([])
  let names = []
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
                  setData1(names)
                  }
                 
                 
   
              })
});
 
      return {data1,setData1}
}