import { View, Text, StyleSheet } from "react-native";
import * as React from 'react';

export default function Item_of_list(props){
   
   const{ subject, place, teacher,  start_time, end_time }  = props;

   return(
 
         <View style = {styles.Lesson_Container} >
             
            <View  style = {styles.Time_main_Container}>
              
               <View  style = {styles.Time_text_Container} >
                 
                 <Text  style = {styles.Time_text}> {start_time} </Text>
                 
                 <Text style = {styles.Time_text}> | </Text>
                 
                 <Text style = {styles.Time_text}> {end_time} </Text>
              
               </View>
            
               <View className = "flex-1 px-2">
         
                  <Text style={styles.Other_text}> {subject} </Text>

                  <Text style={styles.Other_text}> {teacher} </Text>             

                  <Text style={styles.Other_text}> {place} </Text>

               </View>
  
            </View>
    
         </View>
    
   )
    
}


const styles = StyleSheet.create({
   Lesson_Container: {
      width: '100%',
      borderRadius: 16, 
      marginVertical: 8, 
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: colors.background,
      height: hp(12),
   },
   Time_text_Container: {
      flexDirection: 'row',
      width: '100%', 
      height: '100%', 
   }, 
   
   Time_main_Container: {
      borderStyle: 'solid',
      height: '100%',
      width: '25%',
      borderRadius: 50,
      justifyContent: 'center',
    },
    Time_text: {
      fontSize: 17,
      textAlign: 'center',
      color: "white",
      fontWeight: 'bold', // Эквивалент font-bold
    },
   Other_text_container: {
      flex: 1,
      paddingHorizontal: 8,
   },
   Other_text: {
      fontSize:   wp(4),
      color:  'white'
   }
 });