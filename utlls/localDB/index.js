import * as SQLite from "expo-sqlite"
import { Platform } from 'react-native';
import {ref, onValue} from 'firebase/database'
import {db} from '../firebase/index'

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
let teacherData = []
const startTeacherCountRef = ref (db, 'Teachers/')
    onValue(startTeacherCountRef , (snapshot) => {
        for(let i=0;i<snapshot.val().length;i++) {
          
          teacherData.push(snapshot.val()[i].name)
       }
      
   })


export function deleteTimeTable(groupname) {
  console.error('del',groupname)
  if(teacherData.indexOf(groupname)==-1){
  
      db1.transaction((tx) => {
       tx.executeSql(
        `delete from sheduleByGroup where grp= (?);`,[groupname]);
          
    }
  )}
  else{
    db1.transaction((tx) => {
      tx.executeSql(
       `delete from sheduleByTeacher where teacher= (?);`,[groupname]);
   }
 )}
}
    



