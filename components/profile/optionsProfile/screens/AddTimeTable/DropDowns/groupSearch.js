import { FlatList, Text, TextInput, View } from "react-native";
import React, {useState, useEffect} from 'react';
import {db} from '../../../../../../utlls/firebase/index'
import {ref, onValue} from 'firebase/database'

export default function groupSearcher(){
    var count = 0;
    
        let groupData = []
        let list =[]
        const startCountRef = ref (db, 'Groups/')
        onValue(startCountRef , (snapshot) => {
             for(let i=0;i<snapshot.val().length;i++) {
               groupData.push( snapshot.val()[i].group)
               
            }
           
        })

        
        console.log('ds', groupData)
    return(
        <View className="w-full h-full">
            <TextInput/>
            <FlatList data={groupData} renderItem={(item )=><View>
                <Text style={{fontSize:10, color: 'black'}}>
                    {groupData[index]}
                </Text>
            </View>}/>
        </View>
    )
}