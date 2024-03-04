import Link from "next/link"
import { useState,useEffect } from "react"
import AddFriendsList from "../Friends/AddFriendsForFriendRequestMenu"
import { io } from "socket.io-client"
const socket = io(process.env.API_SOCKET_URL)

export default function FriendRequest(props){
    const [friendRequestData,setFriendRequestData] = useState([])
    

    useEffect(()=>{
        console.log('Is socket connected?', socket.connected);
        socket.on(`friendRequestList`,({data,getterID})=>{
        if(getterID === props.userData.accountData._id){
            setFriendRequestData(data)
        }
        })

        return () => {
            socket.off('friendRequestList');
        };
    },[props])

    return (
    <div className="w-full">
            <div className="border-b-2 border-gray-200 w-full text-center pt-1 pb-3 text-[1.2rem]"> คำขอเป็นเพื่อน </div>
    
    {friendRequestData &&
    friendRequestData.map((accountRequester,index)=>{
    return(
    <div key={index}>
     <div className="bg-gray-100 border border-gray-200 m-2 p-2">
    <Link href={`/profile/${accountRequester.id}`}>
    <div className="flex gap-1 items-center">
        <div><img src={accountRequester.accountImage} className="w-11 h-11 rounded-full"/></div>
        <div className="text-[0.9rem]">{accountRequester.firstname} {accountRequester.lastname}</div>
    </div>
    </Link>
    <div className="text-end">
        <AddFriendsList senderID={props.userData.accountData._id} getterID={accountRequester._id}/>
    </div>
    </div>
    </div>
    )})
    }

    {friendRequestData.length === 0 &&
    <div className="h-56 flex justify-center items-center">
        <div>ไม่พบคำขอเป็นเพื่อน</div>
    </div>
    }


    </div>
    )
}