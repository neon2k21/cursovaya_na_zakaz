import { ThemeProvider } from './Theme/themeProvider';
import AppNavigation from './navigation/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
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


export default function App() {
  db1.transaction((tx) => {
    tx.executeSql(
      `create table if not exists favor  (name text unique);`,[], (_, { rows }) => console.log('favor groups',JSON.stringify(rows)));
    tx.executeSql(
      `create table if not exists shedule (subject text, week integer, day integer, starttime text, endtime text, teacher text, contact text, grp text, place text, placeInDay integer);`
      , [], (_, { rows }) =>
    console.log('shedule created',JSON.stringify(rows))
      );

   
   });

  return  ( 
    <ThemeProvider>
      <SafeAreaView className="w-full h-full">
          <AppNavigation/>
      </SafeAreaView>
    </ThemeProvider>
  )

}

