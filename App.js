import { ThemeProvider } from './Theme/themeProvider';
import AppNavigation from './navigation/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';




export default function App() {
  return  ( 
    <ThemeProvider>
      <SafeAreaView className="w-full h-full">
          <AppNavigation/>
      </SafeAreaView>
    </ThemeProvider>
  )

}

