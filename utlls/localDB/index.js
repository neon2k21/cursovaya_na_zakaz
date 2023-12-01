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

  db1.transaction((tx) => {
    tx.executeSql(
      `delete from shedule where grp= (?) or teacher=;`,[groupname]
    );
    
}),error => console.log(`delete error: ${error}`);

}
    



