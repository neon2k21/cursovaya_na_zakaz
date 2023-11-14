import { ThemeProvider } from './Theme/themeProvider';
import AppNavigation from './navigation/navigation';
import { SafeAreaView,View } from 'react-native-safe-area-context';




export default function App() {
  return  ( 
    <ThemeProvider>
      <SafeAreaView className="w-full h-full flex-1">
          <AppNavigation/>
      </SafeAreaView>
    </ThemeProvider>
  )

}

