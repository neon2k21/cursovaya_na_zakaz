import { View,Text, TouchableOpacity,Image, Switch, FlatList, StyleSheet } from "react-native";
import {useNavigation} from '@react-navigation/native';
import { useEffect, useState } from "react";
import CardTimeTable from "../components/profile/profileScreen/timetable_card";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Add_timetable from "../components/profile/optionsProfile/screens/AddTimeTable/Screen/add_timetable";




export default function Profile(){
  const {navigate} = useNavigation()
    
  let names = []   

  
   const [data, setData] = useState();

   const getTimes = () =>{ }
  
     useEffect( () => {},[])
      
  
    return(
         <View className="w-full h-full ">
          
              <Image 
                blurRadius={70} 
                source={require('../assets/backgrounds/bg.jpg')} 
                style = {styles.image} />
             
             <FlatList
                horizontal={true}
                data={data}
                renderItem={({item})=> ( <CardTimeTable  text={item} /> )}/>

             <View style = {styles.boldText} >
                 
                <View style={styles.fullContainer}>
                 
                  <Text style = {styles.text1}> Дополнительные параметры: </Text>   
                 
                  <TouchableOpacity style = {styles.flexRowContainer} onPress={()=>navigate('Добавить расписание', Add_timetable)}>
                   
                    <Text style = {styles.text2}> Добавить расписание </Text>
                  
                  </TouchableOpacity>
                 
                </View>
             </View>
         </View>
     )
}
  
const styles = StyleSheet.create({
 Profile_Container: {
     width: '100%',
     height: '100%',
  },
  image: {
    height: 'full',
    width: 'full',
    position: 'absolute'
  },
  extra_options_container: {
    width: '100%', 
    height: '50%', 
    borderWidth: 2, 
    borderColor: "black", 
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16, 
    justifyContent: 'center',
  },
  boldText: {
    fontWeight: 'bold', // Эквивалент font-bold
    fontSize: wp(5), // Размер текста, адаптированный к ширине экрана
    justifyContent: 'center', // Центрирование по вертикали
    padding: wp(2), // Внутренний отступ
    color: colors.text, // Цвет текста
  },
  flexRowContainer: {
    flexDirection: 'row', // Эквивалент flex-row
    width: '100%', // Эквивалент w-full
    borderWidth: 2, // Граница шириной 2px
    borderRadius: 24, // Эквивалент rounded-3xl
    justifyContent: 'center', // Центрирование содержимого по горизонтали
  },
  text1: {
    fontWeight: 'bold', // Эквивалент font-bold
    fontSize: wp(5), // Размер текста
    justifyContent: 'center', // Центрирование по вертикали
    padding: wp(2), // Внутренний отступ
    color: colors.text, // Цвет текста
  },
  text2: {
    fontSize: 24, // Эквивалент text-2xl
    fontWeight: 'bold', // Эквивалент font-bold
    justifyContent: 'center', // Центрирование по вертикали
    textAlignVertical: 'center', // Вертикальное выравнивание текста
    color: colors.text, // Цвет текста
  },
  fullContainer: {
    height: '100%', // Эквивалент h-full
    width: '100%', // Эквивалент w-full
    padding: wp(6), // Отступы, адаптированные к ширине экрана
  },

});
