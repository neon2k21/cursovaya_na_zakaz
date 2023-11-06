import { SafeAreaView } from 'react-native-safe-area-context';
import {ArrowPathIcon} from 'react-native-heroicons/solid'
import {Bars4Icon} from 'react-native-heroicons/solid'
import {ArrowsRightLeftIcon} from 'react-native-heroicons/solid'
import {  Text, TouchableOpacity, View } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



export default function TopInfoBar(props){
  const {group} = props
    return(
<SafeAreaView className="flex-row" >

        <View className="h-full w-full">
        
        <Text className=" text-2xl " style={{marginHorizontal:wp(3),gap:wp(30)}}>
          {group}
        </Text>
       
        </View>
       <View className="flex flex-row" style={{gap:wp(3)}}>
        <TouchableOpacity>
        <ArrowPathIcon size={wp(7)} color={'black'}/>
        </TouchableOpacity>
        <TouchableOpacity>
        <ArrowsRightLeftIcon size={wp(7)} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity>
        <Bars4Icon size={wp(7)} color={'black'} />
        </TouchableOpacity>
       
       
       </View>
      </SafeAreaView>
    )
}