import { View, useWindowDimensions,Text, TouchableOpacity, SafeAreaView,Image, FlatList  } from "react-native";
import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ip_address } from "../config"; 




export  default function TimeTable(){ 
  const navigation = useNavigation()

  const [timetable, setTimeTable] = React.useState([])

  const getTimeTableByDayAndGroup = async ( group_id, day) =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "grp": group_id,
      "day": day
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch(ip_address+'/getTimeTableByDayAndGroup', requestOptions)
      .then(response => response.json())
      .then(async result => { setTimeTable(result)    
    })
      .catch(error => console.log('error', error));
} 

  
}










