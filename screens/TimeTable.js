import { View, useWindowDimensions,Text, TouchableOpacity, SafeAreaView,Image, FlatList, StyleSheet  } from "react-native";
import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ip_address } from "../config"; 
import { TabView } from "react-native-tab-view";
import Item_of_list from "../components/Lesson";




export  default function TimeTable(){ 

  global.group_id = 0
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


const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'mon', title: 'Пн' },
    { key: 'tue', title: 'Вт' },
    { key: 'wed', title: 'Ср' },
    { key: 'thu', title: 'Чт' },
    { key: 'fri', title: 'Пт' },
    { key: 'sat', title: 'Сб' },
    { key: 'sun', title: 'Вс' }
    
  ]);

  
  const  day =  ( group_id, day) => {
   
  
   
  
      useEffect(()=>{
        getTimeTableByDayAndGroup( group_id, day)
      },[])
 
      
      return(
  
      <SafeAreaView style={styles.SafeAreaViewFlatlistContainer}>
        <Image 
        blurRadius={70} 
        source={require('../assets/backgrounds/bg.jpg')} 
       style = {styles.image} />
        <FlatList
            data={timetable}
            extraData={timetable}
            style = {styles.Flatlist}
            contentContainerStyle={{alignContent:'center'}}
            renderItem={({item})=> (
    
               <Item_of_list 
              subject = {item.subject}
              place = {item.place}
              teacher = {item.teacher}
              start_time = {item.start_time}
              end_time = {item.end_time}
              />
               )}/> 
    </SafeAreaView>
    )
  } 
  
const renderScene = SceneMap({
  mon: day(global.group_id, 0),
  tue: day(global.group_id, 1),
  wed: day(global.group_id, 2),
  thu: day(global.group_id, 3),
  fri: day(global.group_id, 4),
  sat: day(global.group_id, 5),
  sun: day(global.group_id, 6),
});

const renderTabBar = props => (

  <TabBar
  
    {...props}
    indicatorStyle={styles.Tabbar_indicatorStyle}
       style={styles.Tabbar_Style}
       renderLabel={({ route}) => (
        <Text style={styles.Tabbar_text}>
          {route.title}
        </Text>
      )}
  />
);
return(
    
  <TabView
  renderTabBar={renderTabBar}
  style={styles.Tabview}
  navigationState={{ index, routes }}
  renderScene={renderScene}
  onIndexChange={setIndex}
  initialLayout={{ width: layout.width }}
/>    

)
}

const styles = StyleSheet.create({
  image: {
    height: 'full',
    width: 'full',
    position: 'absolute'
  },
  SafeAreaViewFlatlistContainer: {
    height: 'fit',
    width: 'full',
    alignItems: 'center',
    position: 'relative'
  },
  Flatlist: {
    height: 'full',
    width: 'full'
  },
  Tabview: {
   backgroundColor:'white'
  },
  Tabbar: {
    color: '#000',
    fontSize: 14,
  },
  Tabbar_indicatorStyle: {
    backgroundColor: 'green',
  },
  Tabbar_Style: {
    backgroundColor: 'black',
  },
  Tabbar_text: {
    fontSize: wp(3.2),
    color: "white",
    margin: 8,
    fontWeight: "bold"
  }
});









