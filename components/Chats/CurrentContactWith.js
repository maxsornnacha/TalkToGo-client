import axios from "axios"
import { useState,useEffect } from "react"
import Chatroom from "./Chats"
import { useToggle } from "./ToggleChatContext"

export default function FriendList({userData}){
    const [allMessages,setAllMessages] = useState([])
    const [allChatAccounts,setAllChatAccounts] = useState([])
    const [chatroomToggle,setChatroomToggle] = useState(false)
    const [msgNumber,setMsgNumber] = useState(null)
    const {isToggled2, setToggle2} = useToggle()

    useEffect(()=>{
        const fetchingAllMessages = ()=>{
            axios.get(`${process.env.API_URL}/all-messages/${userData.accountData._id}`)
        .then((response)=>{
            setAllMessages(response.data)
        })
        .catch((error)=>{
            console.log('เกิดข้อผิดพลาดกับ server')
        })
        }

        fetchingAllMessages()
    },[])

    useEffect(()=>{
        const fetchingAccounts = ()=>{

                axios.post(`${process.env.API_URL}/all-messages-accounts`,{
                    allMessages,userID:userData.accountData._id
                })
                .then((response)=>{
                    //console.log(response.data)
                    setAllChatAccounts(response.data)
                })
                .catch((error)=>{
                        console.log('เกิดข้อผิดพลาดกับ server')
                }) 
    }

    fetchingAccounts()
    },[allMessages])

        const handleChatroomToggle=(data,index)=>{
            setChatroomToggle(data)
            //setMsgNumber(index)
           }
    
         const handleCloseChat=(data)=>{
           setChatroomToggle(data)
         }


    const sortedCombinedData = allMessages.sort((a, b) => {
            const aTime = new Date(a.updatedAt);
            const bTime = new Date(b.updatedAt);
            return bTime - aTime;
         });
  

    return(
    <div className="h-full w-full bg-gray-100 text-gray-700">   

        {/* รายชื่อเพื่อน */}
        {sortedCombinedData.slice(0,8).map((messenger,index)=>{

        return(
        <div className="flex flex-col gap-1" key={index}>

       

        {allChatAccounts[index] && allChatAccounts.length > 0 &&  

        <div onClick={()=>{handleChatroomToggle(true,index); setMsgNumber(index); setToggle2();}} className=" px-2 py-2 rounded-md hover:bg-gray-700 hover:text-white hover:cursor-pointer flex items-center w-full">
            <img className="inline h-11 w-11 rounded-full" src={allChatAccounts[index].accountImage}  alt="Friendlist"/>
        <div>
        <div className="ms-2 text-[0.9rem]"><strong>{allChatAccounts[index].firstname} {allChatAccounts[index].lastname}</strong></div>
        <div className="ms-2 text-[0.75rem]">ชื่อผู้ใช้งาน: {allChatAccounts[index].username}</div>
        </div>
        </div>
        }  
        {chatroomToggle && index === msgNumber && isToggled2 &&
                <div>
                     <Chatroom  handleCloseChat={handleCloseChat} senderData={userData} getterData={allChatAccounts[index]}/>
                 </div>
         } 
        </div>
        
        )

        })}
    </div>
    )
}