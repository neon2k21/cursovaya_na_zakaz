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
    var chopseteacher = parameterName
    var editedString = parameterName.replaceAll(' ','')
    .replaceAll('.','')
    .replaceAll('-','')
    .replaceAll('/','')
    console.log(editedString) 
  
    let groupData = []
    let teacherData = []
    let teacherNames = []
    let getTimeTable = []
    let subjectsData = []
    let extraTimeTable = []
    const startGroupCountRef = ref (db, 'Groups/')
     onValue(startGroupCountRef , (snapshot) => {
         for(let i=0;i<snapshot.val().length;i++) {
            groupData.push(snapshot.val()[i].group)
        }
       
    })
      
    const startTeacherCountRef = ref (db, 'Teachers/')
     onValue(startTeacherCountRef , (snapshot) => {
         for(let i=0;i<snapshot.val().length;i++) {
            teacherData.push(snapshot.val()[i])
            teacherNames.push(snapshot.val()[i].name)
        }
       
    })
    const startTimeTableCountRef = ref (db, 'TimeTable/')
     onValue(startTimeTableCountRef , (snapshot) => {
        
         for(let i=0;i<snapshot.val().length;i++) {
                if(snapshot.val()[i].group == groupData.indexOf(parameterName) || (snapshot.val()[i].teacher) == teacherNames.indexOf(chopseteacher) )
                getTimeTable.push(snapshot.val()[i])
            
           
        }
       
    })
    console.log("agada",groupData[0])
    console.log('time',getTimeTable.length)
    console.log(`index of ${chopseteacher}: `, teacherNames.indexOf(chopseteacher))
    const startubjectCountRef = ref (db, 'Subjects/')
     onValue(startubjectCountRef , (snapshot) => {
         for(let i=0;i<snapshot.val().length;i++) {
            subjectsData.push( snapshot.val()[i].name)
           
        }
       
    })

    const startExtraTimeTableRef = ref (db, 'extraTimeTable/')
    onValue(startExtraTimeTableRef , (snapshot) => {
        for(let i=0;i<snapshot.val().length;i++) {
          extraTimeTable.push(snapshot.val()[i])
       }
      
   })

   console.log("grp ",extraTimeTable[0])
    console.log(extraTimeTable.length)
    db1.transaction((tx) => {
     for(let i = 0;i< getTimeTable.length;i++){
      tx.executeSql(
          `insert into sheduleByGroup (subject, week, day, starttime, endtime, teacher, contact, grp, place, placeInDay,id) values (?,?,?,?,?,?,?,?,?,?,?)`,[
              subjectsData[getTimeTable[i].subject],
              Number(getTimeTable[i].day),
              Number(getTimeTable[i].week),
              getTimeTable[i].starttime,
              getTimeTable[i].endtime,
              teacherData[getTimeTable[i].teacher].name,
              teacherData[getTimeTable[i].teacher].contact,
              groupData[getTimeTable[i].group],
              getTimeTable[i].place,
              Number(getTimeTable[i].placeInday),
              getTimeTable[i].id
          ]);
    }
    for(let i = 0;i< extraTimeTable.length;i++){
      tx.executeSql(
          `insert into extraShedule (subject, week, day, starttime, endtime, teacher, contact, grp, place, placeInDay,id, datepara) values (?,?,?,?,?,?,?,?,?,?,?,?)`,[
             ( "ДОП/ПЕРЕНОС: "+subjectsData[extraTimeTable[i].subject]),
              Number(extraTimeTable[i].day),
              Number(extraTimeTable[i].week),
              extraTimeTable[i].starttime,
              extraTimeTable[i].endtime,
              teacherData[extraTimeTable[i].teacher].name,
              teacherData[extraTimeTable[i].teacher].contact,
              groupData[extraTimeTable[i].group],
              extraTimeTable[i].place,
              Number(extraTimeTable[i].placeinday),
              extraTimeTable[i].id,
              extraTimeTable[i].date
          ]);
    }
   
    tx.executeSql(`select * from extraShedule;`, [], (_, { rows }) =>
    console.log('inserted extraShedule',JSON.stringify(rows))
  );
  
       
      
}),error => console.log(`create error: ${error}`);    

    
}

