import { useNavigation } from "@react-navigation/native";
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
  const db1 = SQLite.openDatabase("db1.db")
  return db1
}

const db1 = openDatabase();



export function deleteTimeTable(groupname) {
  console.log('clicked',groupname.replaceAll(/[-, ./]/g,''))
  db1.transaction((tx) => {
    tx.executeSql(
      `delete from timetables where name=(?);`,[groupname]);
    tx.executeSql(`select * from timetables`, [], (_, { rows }) =>
    console.log(JSON.stringify(rows))
);
    // tx.executeSql(
    //   `drop table if exists ${groupname.replaceAll(/[-, ./]/g,'')};`
    // );
   
}),error => console.log(`create error: ${error}`);
  
}
    
export function getTimeTableFromLocal(groupname){

  let timetable = []
    db1.transaction(txn => {
        txn.executeSql(
        `select * from ${groupname.replaceAll(/[-,./]/g,'')};`,[],(sqlTxn,res)=>{
        let len = res.rows.length
                if (len > 0){
                   
                    for(let i=0;i<len;i++){
                        
                        let item = res.rows.item(i);
                        timetable.push({
                          subject: item.subject,
                          week: item.week,
                          day: item.day,
                          starttime: item.starttime,
                          endtime: item.endtime,
                          teacher: item.teacher,
                          contact: item.contact,
                          grp: item.grp,
                          place: item.place,
                          placeInDay: item.placeInDay,
                        })

                    }
                }
            }
        );
        txn.executeSql(`select * from ${groupname.replaceAll(/[-,./]/g,'')}`, [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
        }),error => console.log(`get Tables error: ${error}`);
        return timetable
}



