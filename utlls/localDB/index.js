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
  const db = SQLite.openDatabase("db.db")
  return db
}

const db = openDatabase();







export function createTable(tableName){
   
   // console.log('db:', db)
    
        db.transaction((tx) => {
            tx.executeSql(
               ` create table if not exists ${tableName} (subject TEXT, week INTEGER, day INTEGER, starttime TEXT, endtime TEXT, teacher TEXT, group TEXT, place INTEGER, placeInDay INTEGER);`
            );
        }),error => console.log(`create error: ${error}`);
    
    


}

export function insertDataInTable(arrayOfTimeTable, tableName){
    
     db.transaction((txn) => {
        for(let i = 0; i < arrayOfTimeTable.length; i++ ){
        txn.executeSql(
            `insert into ${tableName} (subject, week, day, starttime, endtime, teacher, group, place, placeInDay) values (
            ${arrayOfTimeTable[i].subject},
            ${arrayOfTimeTable[i].week},
            ${arrayOfTimeTable[i].day}, 
            ${arrayOfTimeTable[i].starttime},
            ${arrayOfTimeTable[i].endtime},
            ${arrayOfTimeTable[i].teacher},
            ${arrayOfTimeTable[i].group},
            ${arrayOfTimeTable[i].place},
            ${arrayOfTimeTable[i].placeInday});`
        );
        txn.executeSql(`select * from ${tableName}`, [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      }
    }
),error => console.log(`insert error: ${error}`);
}
    



export async function getAllTablesFromDB(dbName){
    const db = await SQLite.openDatabase(dbName)
    let results = []
    db.transaction(txn => {
        txn.executeSql(
    "SELECT name FROM sqlite_schema WHERE type ='table' AND name NOT LIKE 'sqlite_%'",[],(sqlTxn,res)=>{
        let len = res.rows.length
                if (len > 0){
                   
                    for(let i=0;i<len;i++){
                        let item = res.rows.item(i);
                        results.push({ name: item.name})}}

    })

        }),error => console.log(`get Tables error: ${error}`);
        console.log('re', results)
}

export async function getTimeTableFromDB(dbName, tableName){
    const db = await SQLite.openDatabase(dbName)

    let results = []
   // console.log('name', tableName)
    db.transaction(tx => {
        tx.executeSql(
            "SELECT * FROM "+ tableName,[],(_,{res})=>{
                console.log('gg',JSON.stringify(res))
                /*let len = res.rows.length
                console.log('length', len)
                if (len > 0){
                   
                    for(let i=0;i<len;i++){
                        let item = res.rows.item(i);
                        results.push({
                            subject : item.subject,
                            week : item.week,
                            day : item.day,
                            starttime : item.starttime,
                            endtime : item.endtime,
                            teacher : item.teacher,
                            group : item.group,
                            place : item.place,
                            placeInday : item.placeInday
                        })
                    }
                }
                */
            })
    }),error => console.log(`timetable error: ${error}`);
    console.log('added data ', results)
}

//npm install --save react-native-sqlite-storage
//