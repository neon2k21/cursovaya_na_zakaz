import { View,Text, TouchableOpacity } from "react-native";
import {UserCircleIcon} from 'react-native-heroicons/solid'
import {XMarkIcon} from 'react-native-heroicons/solid'
import { theme } from "../../../Theme/index";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function AddCardTimeTable(props){
    const {groupid} = props
    
    return(
           <TouchableOpacity className="w-full h-5/6 rounded-2xl justify-center bg-transparent border-dashed" style={{borderColor:theme.bgWhite(0.3), width: wp(45),marginHorizontal:wp(10),marginVertical:wp(5),paddingHorizontal:wp(1),borderWidth:2}} >
            <View className="w-full h-full">
                <Text>
                    123
                </Text>
            </View>
            </TouchableOpacity>        
                    
                
       
    )
}