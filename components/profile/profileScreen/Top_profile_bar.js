import { View,Text, TouchableOpacity } from "react-native";
import {UserCircleIcon} from 'react-native-heroicons/solid'
import {ChevronRightIcon} from 'react-native-heroicons/solid'
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from "../../../Theme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';




export default function Top_profile_bar(props){
    const {login} = props
    return(
        <SafeAreaView style={{borderColor:theme.bgWhite(0.3),backgroundColor:theme.bgWhite(0.3)}} className="border-2 w-full rounded-b-2xl justify-center"  >
            <TouchableOpacity className="flex flex-row" >
            <View className="h-full w-full flex-row " style={{marginHorizontal:wp(4),gap:wp(21)}} >
            <UserCircleIcon size={wp(15)} color={'gray'}/>
                        <Text className="text-white  font-bold align-middle" style={{fontSize:wp(5)}}> 
                        {login}
                        </Text>
                        <ChevronRightIcon size={wp(15)} color={'white'} />
                
               
                </View>
               <View className="flex flex-row justify-center">
               
                    
               
               
               <View>
                    
               </View>
               </View>
            </TouchableOpacity>
        
                
              </SafeAreaView>
            )
}