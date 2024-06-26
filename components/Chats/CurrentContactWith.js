import axios from "axios"
import { useState,useEffect } from "react"
import { useToggle } from "./ToggleChatContext"
import Chatroom from "./Chats"
import Link from "next/link"

export default function FriendList({userData}){
    const [allMessages,setAllMessages] = useState([])
    const [allChatAccounts,setAllChatAccounts] = useState([])
    const [chatroomToggle,setChatroomToggle] = useState(false)
    const [msgNumber,setMsgNumber] = useState(null)
    const {isToggled2, setToggle2} = useToggle()

    const [allMessagesLoading , setAllMessagesLoading] = useState(true);
    const [allMessageAccountLoading , setAllMessageAccountLoading] = useState(true);

    useEffect(()=>{
        const fetchingAllMessages = ()=>{
            axios.get(`${process.env.API_URL}/all-messages/${userData.accountData._id}`,{
                headers:{
                    Authorization: `Bearer ${userData.token_key}`
                }
            })
        .then((response)=>{
            setAllMessages(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
        .finally(()=>{
            setAllMessagesLoading(false);
        })
        }

        fetchingAllMessages()
    },[])

    useEffect(()=>{
        const fetchingAccounts = ()=>{

                axios.post(`${process.env.API_URL}/all-messages-accounts`,{
                    allMessages,userID:userData.accountData._id
                },{
                    headers:{
                        Authorization: `Bearer ${userData.token_key}`
                    }
                })
                .then((response)=>{
                    setAllChatAccounts(response.data)
                })
                .catch((error)=>{
                    console.log(error)
                }) 
                .finally(()=>{
                    setAllMessageAccountLoading(false);
                })
    }

    fetchingAccounts()
    },[allMessages])

        const handleChatroomToggle=(data)=>{
            setChatroomToggle(data)
           }
    
         const handleCloseChat=(data)=>{
           setChatroomToggle(data)
         }


    const sortedCombinedData = allMessages.sort((a, b) => {
            const aTime = new Date(a.updatedAt);
            const bTime = new Date(b.updatedAt);
            return bTime - aTime;
         });
  

    if(allMessagesLoading || allMessageAccountLoading){
    return(
        <div className="h-20 w-full flex justify-start ps-10 items-center">
            <div className="loader-event-dot"></div>
        </div>
    )
    }   
    else{
    return(
    <div className="h-full w-full relative">   

        {/* รายชื่อเพื่อน */}
        {sortedCombinedData.slice(0,10).map((messenger,index)=>{

        return(
        <div className="flex flex-col gap-1" key={index}>
        {allChatAccounts[index] && allChatAccounts.length > 0 &&  
        <>
        <div onClick={()=>{handleChatroomToggle(true); setMsgNumber(index+1); setToggle2();}} className="hidden  gap-2 px-2 py-1 rounded-md hover:bg-gray-700 hover:text-white hover:cursor-pointer md:flex items-center w-full">
            <img className="inline h-8 w-8 rounded-full" src={allChatAccounts[index].accountImage.secure_url}  alt="Friendlist"/>
        <div className="flex-1 break-all">
        <div className="text-[0.75rem] font-normal flex gap-1">
            {allChatAccounts[index].firstname} {allChatAccounts[index].lastname}
        </div>
        <div className="text-[0.6rem] font-normal">Username: {allChatAccounts[index].username}</div>
        </div>
        </div>

        <Link href={`/profile/${allChatAccounts[index].id}`} className="md:hidden gap-2 px-2 py-1 rounded-md hover:bg-gray-700 hover:text-white hover:cursor-pointer flex items-center w-full">
            <img className="inline h-8 w-8 rounded-full" src={allChatAccounts[index].accountImage.secure_url}  alt="Friendlist"/>
        <div className="flex-1 break-all">
        <div className="text-[0.75rem] font-normal flex gap-1">
            {allChatAccounts[index].firstname} {allChatAccounts[index].lastname}
        </div>
        <div className="text-[0.6rem] font-normal">Username: {allChatAccounts[index].username}</div>
        </div>
        </Link>

        </>
        }    

         {chatroomToggle && index+1 === msgNumber && isToggled2 &&
        <div className="hidden md:block">
                <Chatroom userData={userData}  handleCloseChat={handleCloseChat} senderData={userData} getterData={allChatAccounts[index]}/>
        </div> 
         } 
        </div>
        )
        })}

    {sortedCombinedData && sortedCombinedData.length === 0 &&
    <div className="text-[0.8rem] px-2">
        <div className="text-gray-400">No current contact yet</div>
    </div>
    }
    </div>
    )
    }
}