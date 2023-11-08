import { View, Text, TouchableOpacity, Modal, StyleSheet,Pressable,Image  } from "react-native";
import {theme} from "../../Theme/index"
import React, {useState} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Item_of_list(props){
   const [modalVisible, setModalVisible] = useState(false);
   const{name, contacts,type,place,startTime,endTime,nameOfSubject}  = props;

   return(
 
         <View className = " w-11/12 rounded-2xl my-2 bg-transparent border-2" style={{borderColor:theme.bgWhite(0.5), height: hp(12)}} >
             <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        
        > 
        
        <View className="flex-1 justifyContent-center" >
          <View style={styles.modalView}>
           
            <Text className="text-2xl font-bold" style={{color:'black', marginVertical:wp(0)}} >{name}</Text>
            <Text className="text-2xl font-bold" style={{color:'black', marginVertical:wp(1)}}>Контакты:</Text>
            <Text className="text-2xl" style={{color:'black'}}>{contacts}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Закрыть</Text>
            </Pressable>
          
            
           
          </View>
        </View>
      </Modal>
            <View className = "flex-row  w-full h-full">
   <View  className = "border-solid h-full w-3/12 rounded-full   justify-center " >
      <Text  style={{fontSize: 17,textAlign: 'center', color:theme.bgWhite(0.8)}} className="font-bold">
           {startTime}
      </Text>
      <Text style={{fontSize: 15,textAlign: 'center', color: theme.bgWhite(0.8)}} className="font-bold">
         |
      </Text>
      <Text style={{fontSize: 15,textAlign: 'center',color: theme.bgWhite(0.3)}}>
        {endTime}
      </Text>
   </View>
   <View className = "flex-1 px-2">
         <Text className="text-white font-bold" style={{fontSize:wp(4)}}>
          {nameOfSubject}
        </Text>
   
         <Text style={{fontSize: wp(4),color: theme.bgWhite(0.8)}} >
           {type}
         </Text>
         <View className="flex-row" style={{gap: wp(45)}}>
         <Text style={{fontSize: wp(4),color: theme.bgWhite(0.8)}}>
            {place}
         </Text>
         <TouchableOpacity>
         <Text onPress={()=> setModalVisible(true)} style={{fontSize: wp(4),color: theme.bgWhite(0.8)}}>
            {name}
         </Text>
         </TouchableOpacity>
         
            </View>   

   </View>
  
 
   
       

     
      
    </View>
    </View>
    

   )
    
}

const styles = StyleSheet.create({
   
   modalView: {
     margin: 40,
     backgroundColor: theme.bgWhite(0.9),
     borderRadius: 20,
     alignItems: 'center',
     shadowColor: '#000',
     shadowOffset: {
       width: 0,
       height: 2,
     },
     shadowOpacity: 0.25,
     shadowRadius: 4,
     elevation: 5,
   },
   button: {
     borderRadius: 20,
     padding: 10,
     elevation: 2,
   },
   buttonClose: {
     backgroundColor: 'gray',
   },
   textStyle: {
     color: 'white',
     fontWeight: 'bold',
     textAlign: 'center',
   },
   modalText: {
     marginBottom:10,
     textAlign: 'center',
   },
 });