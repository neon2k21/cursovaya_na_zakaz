import { View,Text, TouchableOpacity } from "react-native";
import {UserCircleIcon} from 'react-native-heroicons/solid'
import {XMarkIcon} from 'react-native-heroicons/solid'
import { theme } from "../../../Theme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function CardTimeTable(props){
    const {groupid} = props
    
    return(
        <View className = " h-5/6 rounded-2xl justify-center bg-transparent border-2" style={{borderColor:theme.bgWhite(0.3), width: wp(45),marginHorizontal:wp(10),marginVertical:wp(5),paddingHorizontal:wp(1)}} >
                <View className="flex-row " style={{gap:wp(19),paddingHorizontal:wp(1)}}>
                   <UserCircleIcon size={wp(12)} color={'gray'}/>
                   <TouchableOpacity>
                    <XMarkIcon size={wp(12)} color={'gray'}/>
                   </TouchableOpacity>
                   
                    </View>
                    <View style={{marginVertical:wp(10)}} className="">
                    <Text className="text-white text-2xl flex-row">
                   Расписание {"\n"}
                   {groupid}
                    </Text>
                    
                    </View>
                    
                
        </View>
    )
}