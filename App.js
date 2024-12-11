import AppNavigation from './navigation/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as React from 'react'


export default function App() {


  
  return  ( 
      <SafeAreaView className="w-full h-full">
          <AppNavigation/>
      </SafeAreaView>
  )

}

