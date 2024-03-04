import axios from "axios"
import { useState,useEffect } from "react"
import AddFriends from "./AddFriends"
import Link from "next/link"
import { useRouter } from "next/router"
import Chatroom from "../Chats/Chats"



export default function AllFriendList({accountID,friendDataUpdate,accountLogin,dataFiltered}){
    const [friendData,setFriendData] = useState([])
    const [chatroomToggle,setChatroomToggle] = useState(false)
    const [msgNumber,setMsgNumber] = useState(null)


    const router = useRouter()
    const fetching= ()=>{
        axios.get(`${process.env.API_URL}/all-friends-get/${accountID}`)
        .then((response)=>{
            setFriendData(response.data)
            friendDataUpdate(response.data)
        })
        .catch((error)=>{
            //ดึงข้อมูลไม่สำเร็จ
        })
    }

    useEffect(()=>{
            fetching()
    },[])


      const handleChatroomToggle=(data,index)=>{
         setChatroomToggle(data)
         setMsgNumber(index)
        }

      const handleCloseChat=(data)=>{
        setChatroomToggle(data)
      }


    return (
    <div>
    <div className="md:grid md:grid-cols-12 gap-5 mt-5 lg:p-2 md:p-2 w-full flex flex-col p-3">
    
        {friendData && friendData.length > 0 && !dataFiltered &&
        friendData.map((friendAccountData,index)=>{
        return(
        
        <div key={index} className="border border-gray-200 xl:col-span-4 2xl:col-span-3  md:col-span-6  bg-white rounded-md ">
             <Link href={`/profile/${friendAccountData.id}`}>
            <div className="flex justify-center"><img src={friendAccountData.accountImage} className="md:h-40 md:w-40 md:rounded-full m-2  rounded-t-md hidden md:block" /></div>
            <div className="flex  flex-col justify-center items-center md:h-24 2xl:h-16">
            <div className="text-[1.2rem] p-2 w-full break-words  hidden md:block text-center">{friendAccountData.firstname} {friendAccountData.lastname}</div>
            <div className="text-[1.0rem] p-2 h-12 hidden md:block 2xl:hidden">Username : {friendAccountData.username}</div>
            </div>
            </Link>
            {!(accountLogin.accountData._id === friendAccountData._id) &&
            <div className="flex justify-center p-5 hidden md:block"><AddFriends index={index} handleChatroomToggle={handleChatroomToggle} senderID={accountLogin.accountData._id} getterID={friendAccountData._id}/></div>
            }

            <div className="flex justify-between md:hidden h-auto">
            <Link href={`/profile/${friendAccountData.id}`} className="flex items-center w-68 py-1 ">
                <img src={friendAccountData.accountImage} className="w-20 h-20 rounded-full ms-5" />
                <div>
                <div className="text-[1.2rem] p-2 w-full break-words ">{friendAccountData.firstname} {friendAccountData.lastname}</div>
                <div className="text-[0.9rem] p-2 h-12 ">Username : {friendAccountData.username}</div>
                </div>
            </Link>
            {!(accountLogin.accountData._id === friendAccountData._id) &&
            <div className="flex justify-center w-36 "><AddFriends index={index} handleChatroomToggle={handleChatroomToggle} senderID={accountLogin.accountData._id} getterID={friendAccountData._id}/></div>
            }
            </div>
           
        {chatroomToggle && index === msgNumber &&
            <div>
                <Chatroom  handleCloseChat={handleCloseChat} senderData={accountLogin} getterData={friendAccountData}/>
            </div>
         }
        </div>
        )
        })
        }

        {friendData && friendData.length === 0 &&
             <div className="col-span-12 w-full  py-5 min-h-screen h-auto">
               <div className='h-screen bg-gray-100  w-full text-gray-500 flex justify-center pt-56'>
                    <div className='text-[1.5rem]'>ยังไม่มีเพื่อน</div>
             </div>
             </div>
        }


        {/* handle Search from Friend webpage */}
        {dataFiltered &&
         dataFiltered.map((friendAccountData,index)=>{
            return(
            
            <div key={index} className="border border-gray-200 xl:col-span-4 2xl:col-span-3  md:col-span-6  bg-white rounded-md ">
                 <Link href={`/profile/${friendAccountData.id}`}>
                <div className="flex justify-center"><img src={friendAccountData.accountImage} className="md:h-40 md:w-40 md:rounded-full m-2  rounded-t-md hidden md:block" /></div>
                <div className="flex  flex-col justify-center items-center md:h-24 2xl:h-16">
                <div className="text-[1.2rem] p-2 w-full break-words  hidden md:block text-center">{friendAccountData.firstname} {friendAccountData.lastname}</div>
                <div className="text-[1.0rem] p-2 h-12 hidden md:block 2xl:hidden">Username : {friendAccountData.username}</div>
                </div>
                </Link>
                {!(accountLogin.accountData._id === friendAccountData._id) &&
                <div className="flex justify-center p-5 hidden md:block"><AddFriends index={index} handleChatroomToggle={handleChatroomToggle} senderID={accountLogin.accountData._id} getterID={friendAccountData._id}/></div>
                }
    
                <div className="flex justify-between md:hidden h-auto">
                <Link href={`/profile/${friendAccountData.id}`} className="flex items-center w-68 py-1 ">
                    <img src={friendAccountData.accountImage} className="w-20 h-20 rounded-full ms-5" />
                    <div>
                    <div className="text-[1.2rem] p-2 w-full break-words ">{friendAccountData.firstname} {friendAccountData.lastname}</div>
                    <div className="text-[0.9rem] p-2 h-12 ">Username : {friendAccountData.username}</div>
                    </div>
                </Link>
                {!(accountLogin.accountData._id === friendAccountData._id) &&
                <div className="flex justify-center w-36 "><AddFriends index={index} handleChatroomToggle={handleChatroomToggle} senderID={accountLogin.accountData._id} getterID={friendAccountData._id}/></div>
                }
                </div>
               
            {chatroomToggle && index === msgNumber &&
                <div>
                    <Chatroom  handleCloseChat={handleCloseChat} senderData={accountLogin} getterData={friendAccountData}/>
                </div>
             }
            </div>
            )
            })
        }

        {dataFiltered && dataFiltered.length === 0 &&
        <div className="col-span-12 h-screen">  
        <div className="flex justify-center pt-56">
            <div className="text-[1.2rem]">ไม่พบรายชื่อเพื่อนที่ค้นหา</div>
        </div>
        </div>
        }
    </div>
    </div>
    )
}