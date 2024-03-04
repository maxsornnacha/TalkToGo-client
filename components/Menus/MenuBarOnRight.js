import { useState } from "react"
import CurrentTalkingRooms from "../Chats/CurrentContactWith"
import CurrentContactWith from "../TalkingRooms/CurrentTalkingRooms"

export default function MenuBarOnRight(props){
 

    return(
    <>
    <div className="h-auto w-full flex flex-col items-start ps-2 text-gray-500 rounded-sm pb-20">
    
   
    <div className="flex w-full p-2">
        <div  className="w-full text-start text-[1.1rem]">
        <strong>ผู้ติดต่อล่าสุด</strong>  
        </div>
    </div>
    <div className=" flex flex-col items-start my-4 w-full">
        <CurrentTalkingRooms/>
    </div>



 
        <div className="flex w-full p-2">
        <div  className="w-full text-start text-[1.1rem]">
            <strong>ห้องสำหรับพูดคุยล่าสุด</strong>
        </div>
        </div>
        <div className=" pb-6  flex flex-col items-start my-4 w-full">
        <CurrentContactWith/>
        </div>


    </div>
    </>
    )
}