import { useState,useRef } from "react";
import { TextInput, TouchableOpacity,View,Image, Alert,Text } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import { useTheme } from "../../../Theme/themeProvider";


export default function Auth_firstStep(){
  const {colors} = useTheme()
  const {navigate} = useNavigation()

    const [email, setEmail] = useState('');
    const [pass,setPass] = useState('');
  

    const logg = () => {
  auth().signInWithEmailAndPassword(email, pass)
  .then(async data => {
    const jwtToken =  await data.user?.getIdToken();
    await AsyncStorage.setItem("uertoken",jwtToken)
    console.error(jwtToken)
    navigate('ds')
    Alert.alert('Авторизация',
    `Вы успешно вошли!` ,[
    {
      text: 'ОК'
    }
   ])
    
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      Alert.alert('Ошибка',
    `Проверьте учетные данные` ,[
    {
      text: 'ОК'
    }
   ])
    }

    console.error(error);
  });
    }

   

    return(
        <View className="w-full h-full ">
         
             <Image 
        blurRadius={70} 
        source={require('../../../assets/backgrounds/bg.jpg')} 
        className="absolute w-full h-full" />

        <TextInput
        className="w-3/4 border-2 rounded-full"
        placeholder="email"
        placeholderTextColor={colors.text}
        style={{height:wp(15),justifyContent:'center',alignSelf:'center', borderColor:colors.background,paddingHorizontal:wp(10), margin:wp(3)}}
        onChangeText={setEmail}
        />
        <TextInput
        className="w-3/4 border-2 rounded-full"
         placeholderTextColor={colors.text}
         style={{height:wp(15),justifyContent:'center',alignSelf:'center', borderColor:colors.background,paddingHorizontal:wp(10)}}
            placeholder="pass"
            onChangeText={setPass}
           
        />
       <TouchableOpacity className="w-3/4  border-2 rounded-full"
                    style={{height:wp(15),alignSelf:'center',margin:wp(10),justifyContent:'center',borderColor:colors.background}}
                    onPress={logg}>
                        <Text style={{textAlign:'center',textAlignVertical:'center',fontSize:wp(7),color: colors.text}}>
                            ОК
                        </Text>
                    </TouchableOpacity>
        </View>
    )

}