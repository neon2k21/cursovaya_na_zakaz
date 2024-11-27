import { registerRootComponent } from 'expo';
import { Navigation } from "react-native-navigation";


import App from './App';
registerRootComponent(App);
// Navigation.registerComponent('com.company.timetableapp', () => App);

// Navigation.events().registerAppLaunchedListener(() => {
//    Navigation.setRoot({
//      root: {
//        stack: {
//          children: [
//            {
//              component: {
//                name: 'com.company.timetableapp'
//              }
//            }
//          ]
//        }
//      }
//   });
// });