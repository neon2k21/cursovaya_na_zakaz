import {db} from '../../../../../utlls/firebase/index'
import {ref, onValue} from 'firebase/database'
import { createTable,getAllTablesFromDB,insertDataInTable, getTimeTableFromDB } from '../../../../../utlls/localDB'
import * as SQLite from "expo-sqlite"
import { Platform } from 'react-native';
import customUseState from '../../../profileScreen/timetable_customhook';

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





export async function createTimeTable(parameterName){
 
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
    await onValue(startGroupCountRef , (snapshot) => {
         for(let i=0;i<snapshot.val().length;i++) {
           groupData.push( snapshot.val()[i].group)
           
        }
    })
    const startTeacherCountRef = ref (db, 'Teachers/')
    await onValue(startTeacherCountRef , (snapshot) => {
         for(let i=0;i<snapshot.val().length;i++) {
            teacherData.push(snapshot.val()[i])
           
        }
       
    })
    const startTimeTableCountRef = ref (db, 'TimeTable/')
    await onValue(startTimeTableCountRef , (snapshot) => {
        
         for(let i=0;i<snapshot.val().length;i++) {
            
                if(snapshot.val()[i].group == groupData.indexOf(parameterName) || snapshot.val()[i].teacher == teacherData.indexOf(parameterName) )
                getTimeTable.push(snapshot.val()[i])
            
           
        }
       
    })
    const startubjectCountRef = ref (db, 'Subjects/')
    await onValue(startubjectCountRef , (snapshot) => {
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
    let names =[]
    db1.transaction((tx) => {
     
      tx.executeSql(
        `create table if not exists ${editedString} (subject text, week integer, day integer, starttime text, endtime text, teacher text, teachercontact text, grp text, place text, placeInDay integer);`
        );
        tx.executeSql(
          `drop table timetables;`
       );
      tx.executeSql(
        `drop table ${editedString};`
     );
      tx.executeSql(
        `create table if not exists ${editedString} (subject text, week integer, day integer, starttime text, endtime text, teacher text, teachercontact text, grp text, place text, placeInDay integer);`
        );
      tx.executeSql(`select * from ${editedString};`, [], (_, { rows }) =>
      console.log('created',JSON.stringify(rows))
  );

      tx.executeSql(
        `create table if not exists timetables (name text);`
     );
    
     tx.executeSql(`select * from timetables;`, [], (_, { rows }) =>
        console.log('timetables: ',JSON.stringify(rows))
    );
    

      tx.executeSql(`select * from ${editedString};`, [], (_, { rows }) =>
        console.log('select from edit',JSON.stringify(rows))
    );
    
        
    
     
    for(let i = 0;i< getTimeTable.length;i++){
       
      tx.executeSql(
          `insert into ${editedString} (subject, week, day, starttime, endtime, teacher, teachercontact, grp, place, placeInDay) values (?,?,?,?,?,?,?,?,?,?)`,[
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
   
    tx.executeSql(`select * from ${editedString};`, [], (_, { rows }) =>
    console.log('insert',JSON.stringify(rows))
  );

   tx.executeSql(
     `insert into timetables (name) values (?);`,[parameterName]);
    tx.executeSql(`select * from timetables;`, [], (_, { rows }) =>
      console.log('inserted timetable',JSON.stringify(rows))
  );

  
 
  
    }
       
      
  ),error => console.log(`create error: ${error}`);    
    
 
    
}