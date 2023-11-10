import { View,Text, ScrollView, TouchableOpacity,Image } from "react-native";
import {useNavigation} from '@react-navigation/native';
import { useLayoutEffect, useState } from "react";
import Top_profile_bar from "../components/profile/profileScreen/Top_profile_bar";
import {ClockIcon} from 'react-native-heroicons/solid'
import {Cog6ToothIcon} from 'react-native-heroicons/solid'
import CardTimeTable from "../components/profile/profileScreen/timetable_card";
import { theme } from "../Theme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AddCardTimeTable from "../components/profile/profileScreen/timetable_add_card";
import * as SQLite from "expo-sqlite"
import { Platform } from 'react-native';


export default function Profile(){
   
    
    return(
        <View className="w-full h-full ">
             <Image 
        blurRadius={70} 
        source={require('../assets/backgrounds/bg.jpg')} 
        className="absolute w-full h-full" />
            <Top_profile_bar login = "wertysdsdui" />

            <ScrollView horizontal
                 
                  showsHorizontalScrollIndicator={false}
                  className="h-3/6 w-full"
                  >
                   
                    <AddCardTimeTable groupid="jkt"/>
                    
                           
                  
            </ScrollView>
            <View style={{backgroundColor:theme.bgWhite(0.3)}} className=" w-full h-3/6 border-2 rounded-t-2xl justify-center" >
                <View className="h-full w-full" style={{padding:wp(6)}}>
                <Text className="text-white text-2xl font-bold">
                    Дополнительные параметры:
                </Text>
                <TouchableOpacity className="flex-row w-full border-2 rounded-3xl justify-center h-1/4" style={{borderColor:theme.bgWhite(0.5),marginBottom:wp(2)}}>
                  <ClockIcon size={(wp(8))} color={'gray'}/>
                    <Text className="text-white text-2xl font-bold">
                        Расписание звонков
                    </Text>
                </TouchableOpacity>
                
                
                <TouchableOpacity className="flex-row w-full border-2  rounded-2xl justify-center h-1/4" style={{borderColor:theme.bgWhite(0.5),marginBottom:wp(2)}}>
                <Cog6ToothIcon size={(wp(8))} color={'gray'}/>
                    <Text className="text-white text-2xl font-bold">
                        Настроки
                    </Text>
                    </TouchableOpacity>
                    <Text>
                        Создано тем-то тем-то
                    </Text>
                </View>
               
            </View>
        </View>
    )
}