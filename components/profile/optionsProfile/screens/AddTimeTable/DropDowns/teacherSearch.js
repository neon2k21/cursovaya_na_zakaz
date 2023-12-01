import {Text, TextInput, View, ScrollView,TouchableOpacity, Image, ActivityIndicator, FlatList  } from "react-native";
import React, {useState, useEffect} from 'react';
import {db} from '../../../../../../utlls/firebase/index'
import {ref, onValue} from 'firebase/database'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { createTimeTable } from "../createTimeTable";
import { useNavigation } from "@react-navigation/native";
import Profile from "../../../../../../screens/Profile";
import TimeTable from "../../../../../../screens/TimeTable";
import filter from "lodash/filter"
import { useTheme } from "../../../../../../Theme/themeProvider";
import { createTimeTableByTeacher } from "../createTimeTableByTeacher";



export default function TeacherSearcher({ navigation }){
  const {colors} = useTheme()
  const {navigate} = useNavigation()
  const [isLoading, setIsLoading] = useState(false);
  const [data,setData] = useState([]);
  const [fullData,setFullData] = useState([]);
  const [error,setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  let teacherData = []
  useEffect(()=>{
    setIsLoading(true);
    fetchTeachers();
  },[])
  
  
  async function fetchTeachers(){
    try{
         await onValue(ref (db, 'Teachers/') , (snapshot) => {
         for(let i=0;i<snapshot.val().length;i++) {
            teacherData.push( snapshot.val()[i].name)
           
        }
      
    }
    )
    setData(teacherData)
    setFullData(teacherData)
    setIsLoading(false);
    console.log(teacherData)
    } catch(error){
      setError(error)
      setIsLoading(false);
    }
   
  }
  
  const handleSearch = (query) =>{
    setSearchQuery(query)
    const formattedQuary = query.toUpperCase();
    const filteredData = filter(fullData, (name) => {
      return contains(name.toUpperCase(), formattedQuary)
    })
    setData(filteredData)
  }

  const contains = (name, query) =>{
    console.log('name', name)
    console.log('query', query)
      if (name.includes(query)){
         return true;
      }
     
    else{
      return false;
    } 
  }

if(isLoading){
  return(
    <View className="flex-1" style={{justifyContent: 'center'}}>
      <Image 
        blurRadius={70} 
        source={require('../../../../../../assets/backgrounds/bg.jpg')} 
        className="absolute w-full h-full" />
      <ActivityIndicator size={wp(30)}/>
    </View>
    
  )
}

if(error){
  return(
    <View className="flex-1" style={{justifyContent: 'center'}}>
      <Image 
        blurRadius={70} 
        source={require('../../../../../../assets/backgrounds/bg.jpg')} 
        className="absolute w-full h-full" />
     <Text className="text-2xl" style={{color: 'white'}}>
      Проблема в прогрузке данных.. проверьте Интернет подключение
     </Text>
    </View>
    
  )
}

return(
  <View className="w-full h-full">
      <Image 
  blurRadius={70} 
  source={require('../../../../../../assets/backgrounds/bg.jpg')} 
   className="absolute w-full h-full" />
      <TextInput
        placeholder="Поиск"
        placeholderTextColor={'white'}
        selectionColor={'white'}
        clearButtonMode="always"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(query) => handleSearch(query)}
        value= {searchQuery}
        className= "w-full text-2xl border-solid rounded-b-2xl "
        style={{borderColor: colors.background, borderWidth: wp(1), padding: wp(2),marginBottom:wp(2)}}
      />

      <FlatList
      
      data={data}
      // keyExtractor={(item) =>item.id}
      renderItem={({item})=> (
        <TouchableOpacity onPress={()=>{createTimeTableByTeacher(item);navigation.push('ds', TimeTable);}}
                  className="flex-row w-full border-2 rounded-3xl justify-center " 
                  style={{borderColor:colors.background,marginBottom:wp(2)}}>
                    <Text style={{color:colors.text}}  className=" text-2xl font-bold">
                      {item}
                    
                    </Text>
      </TouchableOpacity>
      )}
      />

     
  </View>
)
}