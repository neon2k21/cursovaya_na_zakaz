import messaging from '@react-native-firebase/messaging'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {db} from '../firebase/index'
import {ref, set, onValue} from 'firebase/database'
let kid = 0
onValue(ref (db, 'Tokens/'), (snapshot) => {
  for(let i = 0; i< snapshot.val().length; i++){
   kid = snapshot.val().length
   console.log('naphot',snapshot.val().length )
  }
 
})


export async function requestUserPermission(){
    
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
      GetFCMToken();
    }
  }

  async function GetFCMToken(){
    
    let fcmtoken = await AsyncStorage.getItem("fcmtoken");
    console.log(fcmtoken,'old token')
    if(!fcmtoken){

        try{
            const fcmtoken = await messaging().getToken();
            if(fcmtoken){
             
              console.log(fcmtoken,'new token')
             
                        
            console.log('dfdfdfd',kid)
            set(ref(db,`Tokens/`+(kid)),{userToken: fcmtoken});
              await AsyncStorage.setItem("fcmtoken",fcmtoken)
            }
            
        } catch (error) {
            console.log(error)
        }

    }
    
  }

  export const NotificationListener=()=>{

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log("notification caused app to open", remoteMessage.notification,)

    })

    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
        if (remoteMessage) {
            console.log("notification caused app to open from  quit", 
            remoteMessage.notification,
            )

        }
    })
    
    messaging()
    .onMessage( async remoteMessage =>{
        console.log("notification on foreground", remoteMessage)
    }
    )

  }