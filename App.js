import { View } from 'react-native';
import AppNavigation from './navigation/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
  return  ( 
  <SafeAreaView className="w-full h-full">
            <AppNavigation/>
    </SafeAreaView>)

}

