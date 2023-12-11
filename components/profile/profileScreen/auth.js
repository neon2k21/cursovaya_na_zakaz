import { View,Text, TouchableOpacity } from "react-native";
import {UserCircleIcon} from 'react-native-heroicons/solid'
import {ChevronRightIcon} from 'react-native-heroicons/solid'
import { SafeAreaView } from 'react-native-safe-area-context';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import { useTheme } from "../../../Theme/themeProvider";





export default function Auth(props){
  const {colors} = useTheme()
  const {user} = props
  const {navigate} = useNavigation()
    return(
        <View style={{borderColor:colors.background}} className="border-2 w-full rounded-b-3xl justify-center"  >
           <TouchableOpacity className="w-3/4" onPress={()=>{navigate('Авторизация')}}
                    style={{height:wp(10),alignSelf:'center',margin:wp(3),justifyContent:'center',borderColor:'white'}}>
                      <Text style={{textAlign:'center',textAlignVertical:'center',fontSize:wp(7),color:'white'}}>
                       {user}
                      </Text>
                    </TouchableOpacity>
        
                
              </View>
            )
}