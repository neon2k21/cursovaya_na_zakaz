import { SafeAreaView } from 'react-native-safe-area-context';
import {ArrowPathIcon} from 'react-native-heroicons/solid'
import {Bars4Icon} from 'react-native-heroicons/solid'
import {ArrowsRightLeftIcon} from 'react-native-heroicons/solid'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../Theme';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



export default function TopInfoBar(props){
  const {group} = props
    return(
<SafeAreaView className="flex flex-row " >

        <View className="h-full w-4/6"  >
        
        <Text className=" text-2xl " style={{marginHorizontal:wp(3)}}>
          {group}
        </Text>
       
        </View>
       <View className="flex flex-row" style={{gap:wp(3)}}>
        <TouchableOpacity>
        <ArrowPathIcon size={30} color={'black'}/>
        </TouchableOpacity>
        <TouchableOpacity>
        <ArrowsRightLeftIcon size={30} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity>
        <Bars4Icon size={30} color={'black'} />
        </TouchableOpacity>
       
       
       </View>
      </SafeAreaView>
    )
}