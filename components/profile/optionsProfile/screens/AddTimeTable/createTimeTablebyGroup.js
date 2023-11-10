import {db} from '../../../../../utlls/firebase/index'
import {ref, onValue} from 'firebase/database'
import { createTable,getAllTablesFromDB,insertDataInTable, getTimeTableFromDB } from '../../../../../utlls/localDB'
import * as SQLite from "expo-sqlite"
import { Platform } from 'react-native';

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
  const db1 = SQLite.openDatabase("db.db")
  return db1
}


const db1 = openDatabase();


export  function createTimeTable(parameterName){
    var editedString = parameterName.replaceAll('-','').replaceAll('/','')
    console.log(editedString)
   
    //console.log(openDatabase())
    


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
            teacherData.push( snapshot.val()[i].name)
           
        }
       
    })
    const startTimeTableCountRef = ref (db, 'TimeTable/')
    onValue(startTimeTableCountRef , (snapshot) => {
        
         for(let i=0;i<snapshot.val().length;i++) {
            
                if(snapshot.val()[i].group == groupData.indexOf(parameterName) )
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
            teacher : teacherData[getTimeTable[i].teacher],
            group : groupData[getTimeTable[i].group],
            place : getTimeTable[i].place,
            placeInday : getTimeTable[i].placeInday
        })
        /*
        console.log('subject', subjectsData[getTimeTable[i].subject])
        console.log('day', getTimeTable[i].day)
        console.log('starttime', getTimeTable[i].starttime)
        console.log('endtime', getTimeTable[i].endtime)
        console.log('week', getTimeTable[i].week)
        console.log('teacher', teacherData[getTimeTable[i].teacher])
        console.log('group', groupData[getTimeTable[i].group])
        console.log('place', getTimeTable[i].place)
        console.log('placeInday', getTimeTable[i].placeInday)
        */
    }

   //console.log(typeof(parameterName))
   //console.log(typeof(collectedData[0].week))

   db1.transaction((tx) => {
        tx.executeSql(
           `create table if not exists ${parameterName.replaceAll('-','_').replaceAll('/','_')} (subject text, week integer, day integer, starttime text, endtime text, teacher text, grp text, place text, placeInDay integer);`
        );
        tx.executeSql(`select * from ${parameterName.replaceAll('-','_').replaceAll('/','_')}`, [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
      for(let i = 0;i< getTimeTable.length;i++){
       
        tx.executeSql(
            `insert into ${parameterName.replaceAll('-','_').replaceAll('/','_')} (subject, week, day, starttime, endtime, teacher, grp, place, placeInDay) values (?,?,?,?,?,?,?,?,?)`,[
                subjectsData[getTimeTable[i].subject],
                Number(getTimeTable[i].week),
                Number(getTimeTable[i].day),
                getTimeTable[i].starttime,
                getTimeTable[i].endtime,
                teacherData[getTimeTable[i].teacher],
                groupData[getTimeTable[i].group],
                getTimeTable[i].place,
                Number(getTimeTable[i].placeInday)
            ]);
            
       
      }
      tx.executeSql(`select * from ${parameterName.replaceAll('-','_').replaceAll('/','_')}`, [], (_, { rows }) =>
      console.log(JSON.stringify(rows))
    );
      }
         
        
    ),error => console.log(`create error: ${error}`);    
    
   
    

    //getAllTablesFromDB(Configuration.dbName)
        ///console.log(Configuration.dbName)
        //insertDataInTable(collectedData, parameterName)
        //getTimeTableFromDB(Configuration.dbName,parameterName)

}