import { View,Text, TouchableOpacity } from "react-native";
import {UserCircleIcon} from 'react-native-heroicons/solid'
import {XMarkIcon} from 'react-native-heroicons/solid'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {deleteTimeTable,getTimeTableFromLocal } from "../../../utlls/localDB";
import { useNavigation } from "@react-navigation/native";
import TimeTable from "../../../screens/TimeTable";
import { useTheme } from "../../../Theme/themeProvider";
import Profile from "../../../screens/Profile";
import customUseState from "./timetable_customhook";

export var tablename = ''
function openDatabase() {
    if (Platform.OS === "web"){
      return {
        transaction: () =>{
          return {
            executeSql: () => {},
          };
        },
      };
    }
    const db1 = SQLite.openDatabase("db1.db")
    return db1
  }
  
  const db1 = openDatabase();




const CardTimeTable = (props ) => {
    const navigation = useNavigation()
    const {colors} = useTheme()
    const {setData} = customUseState()
    function krek(name){
        var editedString = name.
        let names =[]
    db1.transaction((tx) => {
        tx.executeSql(
        `select * from ${editedString};`,[],(sqlTxn,res)=>{
        let len = res.rows.length
        
                if (len > 0){
                    
                    for(let i=0;i<len;i++){
                    
                        let item = res.rows.item(i);
                        
                        names.push({
                            subject: item.subject,
                            week: item.week,
                            day: item.day,
                            starttime: item.starttime,
                            endtime: item.endtime,
                            teacher: item.teacher,
                            teachercontact: item.teachercontact,
                            grp: item.grp,
                            place: item.place,
                            placeInDay: item.placeInDay
                        })
                        
                    }
                    
                    
    
                }
            });
         console.log('timeMon',names)
    setData(names)
        });

    }
    
    return(
        <View className = " h-5/6 rounded-2xl justify-center bg-transparent border-2" style={{borderColor: colors.background, width: wp(45),marginHorizontal:wp(10),marginVertical:wp(5),paddingHorizontal:wp(1)}} >
                <View className="flex-row " style={{gap:wp(19),paddingHorizontal:wp(1)}}>
                   <UserCircleIcon size={wp(12)} color={'gray'}/>
                   <TouchableOpacity onPress={()=>{deleteTimeTable(props.text)}}>
                    <XMarkIcon size={wp(12)} color={'gray'} />
                   </TouchableOpacity>
                   
                    </View>
                    <View style={{marginVertical:wp(10)}} >
                        <TouchableOpacity onPress={()=>{tablename=props.text,navigation.navigate('Расписание')}} >
                            <Text style={{color: colors.text}} className=" text-2xl flex-row" >
                                Расписание {"\n"}
                                    {props.text}
                            </Text>
                        </TouchableOpacity>
            
                    </View>
                    
                
        </View>
    )
}

export default CardTimeTable;