import React, { useCallback, useEffect, useState } from 'react'
import { useAppSelector } from '../../redux/hooks';
import moment from 'moment';

interface IProps {
    onTimeout:()=>void
}



export default function RemainingTime(props:IProps) {

    const {timeout} = useAppSelector(state=>state.form);
    const [remainingTime,setRemainingTime] = useState<string>("");


    const getRemainingTime = useCallback(() => {
        let timer = setInterval(()=>{
            if(timeout){
                let remainingSeconds = moment.unix(timeout).diff(moment(),"seconds");
                let h = Math.floor(remainingSeconds / 3600);
                let m = Math.floor(remainingSeconds % 3600 / 60);
                let s = Math.floor(remainingSeconds % 3600 % 60);

                let hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
                let mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
                let sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
                let timeStr = hDisplay + mDisplay + sDisplay;
                if(timeStr.trim() === ""){
                    if(timer){
                        clearInterval(timer);
                    }
                    props.onTimeout()
                }
                setRemainingTime(timeStr);
            }
        },1000)
    },[props, timeout])


    useEffect(()=>{
        if(timeout){
            getRemainingTime();
        }
    },[getRemainingTime, timeout])


    return (
        <p>
            Time Remaining: {remainingTime} 
        </p>
    )
}
