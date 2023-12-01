import { View,Text, TouchableOpacity } from "react-native";
import {UserCircleIcon} from 'react-native-heroicons/solid'
import {XMarkIcon} from 'react-native-heroicons/solid'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {deleteTimeTable } from "../../../utlls/localDB";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../Theme/themeProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';


const CardTimeTable = (props, ) => {
    const navigation = useNavigation()
    const {colors} = useTheme()
    console.log(typeof(props.text))
    const name = { grp: props.text,}
    console.log(JSON.stringify(name.grp))
    
    return(
        <View className = " h-5/6 rounded-2xl justify-center bg-transparent border-2" style={{borderColor: colors.background, width: wp(45),marginHorizontal:wp(10),marginVertical:wp(5),paddingHorizontal:wp(1)}} >
                <View className="flex-row " style={{gap:wp(19),paddingHorizontal:wp(1)}}>
                   <UserCircleIcon size={wp(12)} color={'gray'}/>
                   <TouchableOpacity onPress={()=>{deleteTimeTable(props.text);navigation.navigate('Расписание')}}>
                    <XMarkIcon size={wp(12)} color={'gray'} />
                   </TouchableOpacity>
                   
                    </View>
                    <View style={{marginVertical:wp(10)}} >
                        <TouchableOpacity onPress={async ()=>{await AsyncStorage.mergeItem("groupname",JSON.stringify(name));navigation.navigate('Расписание')}} >
                            <Text style={{color: colors.text}} className=" text-2xl flex-row" >
                                Расписание {"\n"}
                                    {props.text}
                            </Text>
                        </TouchableOpacity>
            
                    </View>
                    
                
        </View>
    )
}

export default CardTimeTable;