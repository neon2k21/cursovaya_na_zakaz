import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text, Image } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {ChevronDownIcon} from 'react-native-heroicons/solid'
import GroupSearcher from "../DropDowns/groupSearch";
import TeacherSearcher from "../DropDowns/teacherSearch";
import { useTheme } from "../../../../../../Theme/themeProvider";


export default function Add_timetable(){
    const {colors} = useTheme()
    const {navigate} = useNavigation()
    return(
        <View className="w-full h-full">
            <Image 
        blurRadius={70} 
        source={require('../../../../../../assets/backgrounds/bg.jpg')} 
        className="absolute w-full h-full" />
                <View className=" w-full h-2/4" >
                       <TouchableOpacity className="flex-row w-full  rounded-2xl" style={{height:wp(15),borderWidth:2, gap: wp(68),borderColor:colors.background, marginVertical:wp(3)}} 
                       onPress={()=>navigate('Выбор группы', GroupSearcher)}>
                            <Text style={{padding:wp(3), color:colors.text}}>
                                Группа
                            </Text>
                            <ChevronDownIcon size={wp(10)} color={'gray'} marginVertical={wp(2)}/>
                            
                        </TouchableOpacity> 
                        <TouchableOpacity 
                       onPress={()=>navigate('Выбор преподавателя', TeacherSearcher)}
                        className="flex-row w-full rounded-2xl"
                         style={{height:wp(15),borderWidth:2, gap: wp(52), marginVertical:wp(3), borderColor: colors.background}} >
                            <Text style={{padding:wp(3), color:colors.text}}>
                               Преподаватель
                            </Text>
                            <ChevronDownIcon size={wp(10)} color={'gray'} marginVertical={wp(2)}/>
                            
                        </TouchableOpacity> 
                            <Text style={{padding:wp(3), color:'white'}}>
                                Расписание можно нати только по одному из фильтров.{'\n'}
                                
                            </Text>
                </View>
        </View>
    )
}