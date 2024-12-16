import { SafeAreaView } from 'react-native-safe-area-context';
import AppNavigation from './navigation/navigation';


export default function App() {
  
  return  ( 
      <SafeAreaView style={{ flex: 1 }}>
        <AppNavigation/>
      </SafeAreaView>
  )

}

