import * as SQLite from "expo-sqlite";


function openDatabase() {
    if (Platform.OS === "web") {
      return {
        transaction: () => {
          return {
            executeSql: () => {},
          };
        },
      };
    }
  
    const db = SQLite.openDatabase("TimeTable.db");
    return db;
  }
  
const db = openDatabase();
  


export function createTable(props){

    const tableName = props
    db.transaction(txn => {
        txn.executeSql(
            "CREATE TABLE IF NOT EXISTS "+tableName+" (subject TEXT, week INTEGER, day INTEGER, starttime TEXT, endtime TEXT, teacher TEXT, group TEXT, place INTEGER, placeInDay INTEGER)"
        )
    })

}

export function insertDataInTable(props){

    const { arrayOfTimeTable, tableName } = props
    for(let i = 0; i < arrayOfTimeTable.length; i++ ){
       db.transaction(txn => {
        txn.executeSql(
            "INSERT INTO "+tableName+" values ("+
            arrayOfTimeTable[i].subject+","
            +arrayOfTimeTable[i].week+","
            +arrayOfTimeTable[i].day+","
            +arrayOfTimeTable[i].starttime+","
            +arrayOfTimeTable[i].endtime+","
            +arrayOfTimeTable[i].teacher+","
            +arrayOfTimeTable[i].group+","
            +arrayOfTimeTable[i].place+","
            +arrayOfTimeTable[i].placeInday+");"
        )
    }) 
    }
    

}

export function getAllTablesFromDB(){
    db.transaction(txn => {
        txn.executeSql(
    "SELECT name FROM sqlite_schema WHERE type ='table' AND name NOT LIKE 'sqlite_%'")
        })
}

export function getTimeTableFromDB(props){
    let results = []
    const tableName = props
    db.transaction(txn => {
        txn.executeSql(
            "SELECT * FROM "+tableName,[],(sqlTxn,res)=>{
                let len = res.rows.length
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
            })
    })
    console.log('added data ', results)
}

//npm install --save react-native-sqlite-storage
//