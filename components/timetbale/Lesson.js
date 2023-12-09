import { View, Text, TouchableOpacity, Modal, StyleSheet,Pressable,Image  } from "react-native";
import React, {useState} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useTheme } from "../../Theme/themeProvider";
import {ArrowTopRightOnSquareIcon} from "react-native-heroicons/solid"
import ShowLesson from "./showLesson";
import {useNavigation} from '@react-navigation/native';


export default function Item_of_list(props){
  const {colors} = useTheme()
   const{name, type,place,startTime,endTime,nameOfSubject}  = props;
  const {navigate} = useNavigation()

   return(
 
         <View className = " w-full rounded-2xl my-2 bg-transparent border-2" style={{borderColor:colors.background, height: hp(12)}} >
            
<View className = "flex-row  w-full h-full">
   <View  className = "border-solid h-full w-3/12 rounded-full   justify-center " >
      <Text  style={{fontSize: 17,textAlign: 'center', color:colors.text}} className="font-bold">
           {startTime}
      </Text>
      <Text style={{fontSize: 15,textAlign: 'center', color: colors.text}} className="font-bold">
         |
      </Text>
      <Text style={{fontSize: 15,textAlign: 'center',color: colors.text}}>
        {endTime}
      </Text>
   </View>
   <View className = "flex-1 px-2">
         <Text className="font-bold" style={{fontSize:wp(4),color: colors.text}}>
          {nameOfSubject}
        </Text>
   
         <Text style={{fontSize: wp(4),color: colors.text}} >
           {type}
         </Text>
         <View className="flex-row" style={{gap: wp(25)}}>
         <Text style={{fontSize: wp(4),color: colors.text}}>
            {place}
         </Text>
         <TouchableOpacity className="flex-row">
          <ArrowTopRightOnSquareIcon size={wp(6)} color={colors.background}/>
         <Text style={{fontSize: wp(4),color: colors.text}}>
            {name}
         </Text>
         </TouchableOpacity>
         
            </View>   

   </View>
  
    </View>
    </View>
    

   )
    
}

