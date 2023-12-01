import { registerRootComponent } from 'expo';
import { Navigation } from "react-native-navigation";
import messaging from '@react-native-firebase/messaging'


import App from './App';
//registerRootComponent(App);
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('message handled in the background!', remoteMessage)
})
Navigation.registerComponent('com.company.vuzappcursovaya', () => App);

Navigation.events().registerAppLaunchedListener(() => {
   Navigation.setRoot({
     root: {
       stack: {
         children: [
           {
             component: {
               name: 'com.company.vuzappcursovaya'
             }
           }
         ]
       }
     }
  });
});