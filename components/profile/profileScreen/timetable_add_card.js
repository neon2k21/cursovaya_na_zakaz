import { View,Text, TouchableOpacity } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";
import Add_timetable from "../optionsProfile/screens/AddTimeTable/Screen/add_timetable";
import { useTheme } from "../../../Theme/themeProvider";


export default function AddCardTimeTable(props){
    const {groupid} = props
    const {colors} = useTheme()
    const {navigate} = useNavigation()
    return(
           <TouchableOpacity onPress={()=> navigate('Добавить расписание', Add_timetable)}
           className="w-full h-5/6 rounded-2xl justify-center bg-transparent border-dashed" 
           style={{borderColor:colors.background, width: wp(45),marginHorizontal:wp(10),marginVertical:wp(5),paddingHorizontal:wp(1),borderWidth:2}} >
            <View className="w-full h-full">
                <Text>
                    123
                </Text>
            </View>
            </TouchableOpacity>        
                    
                
       
    )
}