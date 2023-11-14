import { View,Text, TouchableOpacity } from "react-native";
import {UserCircleIcon} from 'react-native-heroicons/solid'
import {XMarkIcon} from 'react-native-heroicons/solid'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {deleteTimeTable,getTimeTableFromLocal } from "../../../utlls/localDB";
import { useNavigation } from "@react-navigation/native";
import TimeTable from "../../../screens/TimeTable";
import { useTheme } from "../../../Theme/themeProvider";

export var tablename =''
const CardTimeTable = (props, ) => {
    const navigation = useNavigation()
    const {colors} = useTheme()
    
    return(
        <View className = " h-5/6 rounded-2xl justify-center bg-transparent border-2" style={{borderColor: colors.background, width: wp(45),marginHorizontal:wp(10),marginVertical:wp(5),paddingHorizontal:wp(1)}} >
                <View className="flex-row " style={{gap:wp(19),paddingHorizontal:wp(1)}}>
                   <UserCircleIcon size={wp(12)} color={'gray'}/>
                   <TouchableOpacity onPress={()=>deleteTimeTable(props.text)}>
                    <XMarkIcon size={wp(12)} color={'gray'} />
                   </TouchableOpacity>
                   
                    </View>
                    <View style={{marginVertical:wp(10)}} >
                        <TouchableOpacity onPress={()=>{tablename=props.text;getTimeTableFromLocal(props.text),navigation.navigate('Расписание',{ name: "props.text" })}} >
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