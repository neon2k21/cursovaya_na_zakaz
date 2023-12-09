import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, SafeAreaView, Modal } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  
export default function ShowLesson(props){
    const{name,startTime,endTime,nameOfSubject}  = props;


    return (
        <SafeAreaView className="w-full h-full">
             <Image 
                blurRadius={70} 
                source={require('../../assets/backgrounds/bg.jpg')} 
                className="absolute w-full h-full" />
                <View className="h-2/4 w-full">
                    <Text>
                        Дисциплина:
                    </Text>
                    <View className="w-3/4  border-2 rounded-full"
                    style={{height:wp(15),alignSelf:'center',margin:wp(10),justifyContent:'center',borderColor:'white'}}>
                        <Text style={{textAlign:'center',textAlignVertical:'center',fontSize:wp(7),color:'white'}}>
                           {nameOfSubject}
                        </Text>
                    </View>
                    <Text>
                        Время:
                    </Text>
                    <View className="w-3/4  border-2 rounded-full"
                    style={{height:wp(15),alignSelf:'center',margin:wp(10),justifyContent:'center',borderColor:'white'}}>
                        <Text style={{textAlign:'center',textAlignVertical:'center',fontSize:wp(7),color:'white'}}>
                           {startTime}-{endTime}
                        </Text>
                    </View>
                    <Text>
                        Преподаватель:
                    </Text>
                    <View className="w-3/4  border-2 rounded-full"
                    style={{height:wp(15),alignSelf:'center',margin:wp(10),justifyContent:'center',borderColor:'white'}}>
                        <Text style={{textAlign:'center',textAlignVertical:'center',fontSize:wp(7),color:'white'}}>
                           {name}
                        </Text>
                    </View>
                    <TouchableOpacity className="w-3/4  border-2 rounded-full"
                    style={{height:wp(15),alignSelf:'center',margin:wp(10),justifyContent:'center',borderColor:'white'}}
                    onPress={()=>click(selected_lesson)}>
                        <Text style={{textAlign:'center',textAlignVertical:'center',fontSize:wp(7),color:'white'}}>
                            Изменить
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-3/4  border-2 rounded-full"
                    style={{height:wp(15),alignSelf:'center',margin:wp(10),justifyContent:'center',borderColor:'white'}}
                    onPress={()=>{}}>
                        <Text style={{textAlign:'center',textAlignVertical:'center',fontSize:wp(7),color:'white'}}>
                            Удалить
                        </Text>
                    </TouchableOpacity>
                </View>
            

        </SafeAreaView>
    )

}


 

  const styles = StyleSheet.create({
    
    dropdown: {
      margin: 8,
      height: 50,
      borderRadius: 12,
      borderColor:'white',
      borderWidth:2,
      padding: 12,      
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

    },
    icon: {
    color:'white',
    marginRight: 5,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 16,
    },
    placeholderStyle: {
        color:'white',
      fontSize: 16,
    },
    selectedTextStyle: {
        color:'white',
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });