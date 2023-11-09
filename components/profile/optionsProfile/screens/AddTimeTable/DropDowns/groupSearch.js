import {Text, TextInput, View, ScrollView,TouchableOpacity, Image  } from "react-native";
import React, {useState, useEffect} from 'react';
import {db} from '../../../../../../utlls/firebase/index'
import {ref, onValue} from 'firebase/database'
import {theme} from "../../../../../../Theme/index"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { createTimeTable } from "../createTimeTablebyGroup";



async function getData(){
  let fireData = []
  const startCountRef = ref (db, 'Groups/')
  onValue(startCountRef , (snapshot) => {
       for(let i=0;i<snapshot.val().length;i++) {
        fireData.push( snapshot.val()[i].group)
         
      }
     
  })
  return fireData
}


export default async function groupSearcher(){
        let groupData = await getData
        
    return(
        <View className="w-full h-full">
            <Image 
        blurRadius={70} 
        source={require('../../../../../../assets/backgrounds/bg.jpg')} 
        className="absolute w-full h-full" />
            <TextInput/>
            <ScrollView vertical
                  contentContainerStyle={{paddingVertical: 15}}
                  showsVerticalScrollIndicator={false}>
                    {
                      groupData.map((item, index) => {
                        return(
                        <TouchableOpacity key={index} onPress={()=>createTimeTable(parameterName = item)} className="flex-row w-full border-2 rounded-3xl justify-center " style={{borderColor:'white',marginBottom:wp(2)}}>
                          <Text className="text-white text-2xl font-bold">
                            {item}
                          
                          </Text>
                        </TouchableOpacity>
                        )
                      })
                    }
                
              
          </ScrollView>
        </View>
    )
}