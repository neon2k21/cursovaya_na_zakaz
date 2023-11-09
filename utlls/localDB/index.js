import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system"
import { Configuration } from "./configuration";


export const checkExistenceDB = async dbName =>{
    const dbDir = FileSystem.documentDirectory + "SQLite/"
    const dirInfo = await FileSystem.getInfoAsync(dbDir+dbName)
    if(!dirInfo.exists) return false
    else return true

}




export async function createDatabase(dbName,tableName){
    const db = await SQLite.openDatabase(dbName)
   // console.log('db:', db)
    
        db.transaction(txn => {
            txn.executeSql(
                "CREATE TABLE IF NOT EXISTS "+tableName+" (subject TEXT, week INTEGER, day INTEGER, starttime TEXT, endtime TEXT, teacher TEXT, group TEXT, place INTEGER, placeInDay INTEGER)"
            )
    
        }),error => console.log(`create error: ${error}`);
    
    


}

export async function insertDataInTable(dbName, arrayOfTimeTable, tableName){
    const dirInfo = await checkExistenceDB(dbName)
    if(!dirInfo) await createDatabase(dbName)
    
    const db = await SQLite.openDatabase(dbName)

    
     db.transaction((txn) => {
        for(let i = 0; i < arrayOfTimeTable.length; i++ ){
        txn.executeSql(
            "INSERT INTO "+tableName+" (subject, week, day, starttime, endtime, teacher, group, place, placeInDay) values ("+
            arrayOfTimeTable[i].subject,
            arrayOfTimeTable[i].week,
            arrayOfTimeTable[i].day, 
            arrayOfTimeTable[i].starttime,
            arrayOfTimeTable[i].endtime,
            arrayOfTimeTable[i].teacher,
            arrayOfTimeTable[i].group,
            arrayOfTimeTable[i].place,
            arrayOfTimeTable[i].placeInday
            
            
            +");",[arrayOfTimeTable], [], (_, { rows }) =>
            console.log('dada',JSON.stringify(rows))
        );

        txn.executeSql("select * from "+ tableName, [], (_, { rows }) =>
          console.log('dada',JSON.stringify(rows))
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