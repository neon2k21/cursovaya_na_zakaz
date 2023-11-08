import {db} from '../../../../../utlls/firebase/index'
import {ref, onValue} from 'firebase/database'
import { createTable,getAllTablesFromDB,insertDataInTable, getTimeTableFromDB } from '../../../../../utlls/localDB'

export function createTimeTable(props){

    const {parameterName} = props
    
    createTable(parameterName);


    let groupData = []
    let teacherData = []
    let getTimeTable = []
    let subjectsData = []
    const startGroupCountRef = ref (db, 'Groups/')
    onValue(startGroupCountRef , (snapshot) => {
         for(let i=0;i<snapshot.val().length;i++) {
           groupData.push( snapshot.val()[i].group)
           
        }
    })
    const startTeacherCountRef = ref (db, 'Teachers/')
    onValue(startTeacherCountRef , (snapshot) => {
         for(let i=0;i<snapshot.val().length;i++) {
            teacherData.push( snapshot.val()[i].name)
           
        }
       
    })
    const startTimeTableCountRef = ref (db, 'TimeTable/')
    onValue(startTimeTableCountRef , (snapshot) => {
        
         for(let i=0;i<snapshot.val().length;i++) {
            
                if(snapshot.val()[i].group == groupData.indexOf(parameterName) )
                getTimeTable.push(snapshot.val()[i])
            
           
        }
       
    })
    const startubjectCountRef = ref (db, 'Subjects/')
    onValue(startubjectCountRef , (snapshot) => {
         for(let i=0;i<snapshot.val().length;i++) {
            subjectsData.push( snapshot.val()[i].name)
           
        }
       
    })

    let collectedData = []

    for(let i=0;i<getTimeTable.length;i++){
        collectedData.push({
            subject : subjectsData[getTimeTable[i].subject],
            week : getTimeTable[i].week,
            day : getTimeTable[i].day,
            starttime : getTimeTable[i].starttime,
            endtime : getTimeTable[i].endtime,
            teacher : teacherData[getTimeTable[i].teacher],
            group : groupData[getTimeTable[i].group],
            place : getTimeTable[i].place,
            placeInday : getTimeTable[i].placeInday
        })
        /*
        console.log('subject', subjectsData[getTimeTable[i].subject])
        console.log('day', getTimeTable[i].day)
        console.log('starttime', getTimeTable[i].starttime)
        console.log('endtime', getTimeTable[i].endtime)
        console.log('week', getTimeTable[i].week)
        console.log('teacher', teacherData[getTimeTable[i].teacher])
        console.log('group', groupData[getTimeTable[i].group])
        console.log('place', getTimeTable[i].place)
        console.log('placeInday', getTimeTable[i].placeInday)
        */
    }
        getAllTablesFromDB()
        //insertDataInTable(...collectedData, parameterName)
        getTimeTableFromDB(parameterName)

}