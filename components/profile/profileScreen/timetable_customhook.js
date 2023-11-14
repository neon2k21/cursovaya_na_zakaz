import { useState } from "react";


export const customUseState=()=> {
    const [data, setData] = useState([])
    return {data,setData}
}