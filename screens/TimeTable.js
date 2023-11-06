import { View, useWindowDimensions,Text, ScrollView, SafeAreaView,Image, useState  } from "react-native";
import {useNavigation} from '@react-navigation/native';
import TopInfoBar from "../components/timetbale/top_bar";
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import * as React from 'react';
import { useLayoutEffect } from "react";
import Item_of_list from "../components/timetbale/Lesson";
import { theme } from "../Theme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



function refresh(){}

function changeweek(){}

function openfilter(){}

const Monday = () => (
    <SafeAreaView className="h-fit w-full items-center relative">
        <Image 
        blurRadius={70} 
        source={require('../assets/backgrounds/bg.jpg')} 
        className="absolute w-full h-full" />
        <ScrollView vertical
                  contentContainerStyle={{paddingVertical: 15, alignItems: "center"}}
                  showsVerticalScrollIndicator={false}
                  className="h-full w-full">
                    <Item_of_list name = "igor" contacts="value" type="Теория для дИмы" place="212" startTime="18:30" endTime="20:00" nameOfSubject ="Орг.расчет с бюдж.в  бюд. сист."/>
                    <Item_of_list name = "Олег" contacts="value" type="нет" place="212" startTime="18:30" endTime="20:00" nameOfSubject ="Плавание"/>
                    <Item_of_list name = "Олег" contacts="value" type="Практическая" place="212" startTime="18:30" endTime="20:00" nameOfSubject ="Плавание"/>
                    <Item_of_list name = "Олег" contacts="value" type="Практическая" place="212" startTime="18:30" endTime="20:00" nameOfSubject ="Плавание"/>
                    <Item_of_list name = "Олег" contacts="value" type="Практическая" place="212" startTime="18:30" endTime="20:00" nameOfSubject ="Плавание"/>
                    <Item_of_list name = "Олег" contacts="value" type="Практическая" place="212" startTime="18:30" endTime="20:00" nameOfSubject ="Плавание"/>
                    <Item_of_list name = "Олег" contacts="value" type="Практическая" place="212" startTime="18:30" endTime="20:00" nameOfSubject ="Плавание"/>

        </ScrollView>    
    </SafeAreaView>
  );
  
  const Tuesday = () => (
    <View className="h-full w-full" style={{ flex: 1, backgroundColor: '#673ab7' }} />
  );
  const Wednsday = () => (
    <View className="h-full w-full" style={{ flex: 1, backgroundColor: '#673ab7' }} />
  );
  const Thursday = () => (
    <View className="h-full w-full" style={{ flex: 1, backgroundColor: '#673ab7' }} />
  );
  const Friday = () => (
    <View className="h-full w-full" style={{ flex: 1, backgroundColor: '#673ab7' }} />
  );
  const Saturday = () => (
    <View className="h-full w-full" style={{ flex: 1, backgroundColor: '#673ab7' }} />
  );
  const Sunday = () => (
    <View className="h-full w-full" style={{ flex: 1, backgroundColor: '#673ab7' }} />
  );
  
  const renderScene = SceneMap({
    mon: Monday,
    tue: Tuesday,
    wed: Wednsday,
    thu: Thursday,
    fri: Friday,
    sat: Saturday,
    sun: Sunday
   
  });



  
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: theme.bgGreen(0.6)}}
         style={{ backgroundColor: 'white',shadowColor:theme.bgWhite(0.8) }}
         
         
         renderLabel={({ route}) => (
          <Text style={{ fontSize:wp(3.2), color: 'black', margin: 8, fontWeight: "bold" }}>
            {route.title}
          </Text>
        )}
    />
  );

export default function TimeTable(){
    const navigation = useNavigation()
    useLayoutEffect(() =>{
        navigation.setOptions({
            headerLeft: () => (<TopInfoBar group="huhdh"/>),
        });
    }, []);

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


    return(
        
      <TabView
      renderTabBar={renderTabBar}
      style={{backgroundColor:'white'}}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />    
    
    )
}
