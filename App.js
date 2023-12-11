import { ThemeProvider } from './Theme/themeProvider';
import AppNavigation from './navigation/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SQLite from "expo-sqlite"
import { Platform, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import {requestUserPermission,NotificationListener} from "./utlls/firebase/pushnotifications_helper"
import {PermissionsAndroid} from 'react-native';


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
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  useEffect(()=>{
  requestUserPermission();
  NotificationListener();
  },[])

  db1.transaction((tx) => {
    tx.executeSql(
      `create table if not exists sheduleByGroup (subject text, week integer, day integer, starttime text, endtime text, teacher text, contact text, grp text, place text, placeInDay integer, id text);`
      , [], (_, { rows }) =>
    console.log('sheduleByGroup created',JSON.stringify(rows))
      );
    tx.executeSql(
        `create table if not exists sheduleByTeacher (subject text, week integer, day integer, starttime text, endtime text, teacher text, contact text, grp text, place text, placeInDay integer, id text);`
        , [], (_, { rows }) =>
    console.log('sheduleByTeacher created',JSON.stringify(rows))
        );
        tx.executeSql(
          `create table if not exists extraShedule (subject text, week integer, day integer, starttime text, endtime text, teacher text, contact text, grp text, place text, placeInDay integer, id text, datepara text);`
          , [], (_, { rows }) =>
      console.log('sheduleByTeacher created',JSON.stringify(rows))
          );
   });

  

  return  ( 
    <ThemeProvider colorScheme='dark' >
      <SafeAreaView className="w-full h-full">
          <AppNavigation/>
      </SafeAreaView>
    </ThemeProvider>
  )

}

