import { View, Text, TouchableOpacity, Modal, StyleSheet,Pressable,Image  } from "react-native";
import React, {useState} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useTheme } from "../../Theme/themeProvider";
import {ArrowTopRightOnSquareIcon} from "react-native-heroicons/solid"

export default function Item_of_list(props){
  const {colors} = useTheme()
   const [modalVisible, setModalVisible] = useState(false);
   const{name, contacts,type,place,startTime,endTime,nameOfSubject}  = props;

   return(
 
         <View className = " w-full rounded-2xl my-2 bg-transparent border-2" style={{borderColor:colors.background, height: hp(12)}} >
             <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        
        > 
        
        <View className="flex-1 justifyContent-center" >
          <View style={{
             margin: 40,
             backgroundColor: colors.background,
             borderRadius: 20,
             alignItems: 'center',
             shadowColor: '#000',
             shadowOffset: {
               width: 0,
               height: 2,
             },
             shadowOpacity: 0.25,
             shadowRadius: 4,
             elevation: 5
          }}>
           
            <Text className="text-2xl font-bold" style={{color: colors.headertextandicons, marginVertical:wp(0)}} >{name}</Text>
            <Text className="text-2xl font-bold" style={{color:colors.headertextandicons, marginVertical:wp(1)}}>Контакты:</Text>
            <Text className="text-2xl" style={{color:colors.headertextandicons}}>{contacts}</Text>
            <Pressable
              style={[
                { borderRadius: 20,
                padding: 10,
                elevation: 2
              },
                 {
                  backgroundColor: 'gray'
                }]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{
                 color: colors.text,
                 fontWeight: 'bold',
                 textAlign: 'center'
              }}>Закрыть</Text>
            </Pressable>
          
            
           
          </View>
        </View>
      </Modal>
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
         <Text onPress={()=> setModalVisible(true)} style={{fontSize: wp(4),color: colors.text}}>
            {name}
         </Text>
         </TouchableOpacity>
         
            </View>   

   </View>
  
    </View>
    </View>
    

   )
    
}

