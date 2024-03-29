import Link from "next/link";
import { useState,useEffect } from "react";
import Messenger from "./Messenger";
import Search from "./Search";
import Profile from "./Profile";
import FriendRequest from "./FriendRequest";
import Chatroom from "../Chats/Chats";
import TalkingRoom from "./TalkingRoom";
import axios from "axios";
import { useToggle } from "../Chats/ToggleChatContext";
import { io } from "socket.io-client"
const socket = io(process.env.API_SOCKET_URL)

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComments,faMagnifyingGlass,faUserPlus,faBars, faBell, faPeopleGroup} from "@fortawesome/free-solid-svg-icons"


export default function Navbar(props){
    const [messengerToggle,setMessengerToggle] = useState(false)
    const [searchToggle,setSearchToggle] = useState(false)
    const [profileToggle,setProfileToggle] = useState(false)
    const [friendRequestToggle,setFriendRequestToggle] = useState(false)
    const [friendRequestAmount,setFriendRequestAmount] = useState(0)
    const [allMessages,setAllMessages] = useState(null)
    const [newMessagesAmount,setNewMessageAmount] = useState(0)
    const [chatroomToggle,setChatroomToggle] = useState(false)
    const [TalkingRoomToggle,setTalkingRoomToggle] = useState(false)
    const [newTalkingRoomAmount,setNewTalkingRoomAmount] = useState(0)
    //const [msgNumber,setMsgNumber] = useState(null)
    const [getterData,setGetterData] = useState(null)
    const {isToggled1, setToggle1} = useToggle()
  

    //ทำงานในกล้อง search account จะปิด search  เมื่อทำการ click ที่รายชื่อ account นั้นๆ
    const handleClick=(status)=>{
        setSearchToggle(status)
    }


    //ดึงข้อมูล friend reuest
    const fetching = ()=>{
        axios.get(`${process.env.API_URL}/all-friendRequest/${props.userData.accountData._id}`)
        .then((response)=>{
            socket.emit('friendRequestList',{data:response.data.data,getterID:response.data.getterID})
            socket.on('friendRequestList',({data,getterID})=>{
                if(getterID === props.userData.accountData._id){
                setFriendRequestAmount(data.length)
                }
            })
        })
        .catch((error)=>{
            console.log('เกิดข้อผิดพลาดกับ server')
        })
    }

    //ดึงข้อมูล friend reuest
    useEffect(()=>{
        if(props.userData){
            fetching()
        } 
        return () => {
            socket.off('friendRequestList');
        };
    },[props,friendRequestToggle])

    //ปิด messenger เมื่อเปิด chat
    const closeMessanger=(closeMessangerStatus,getterData)=>{
        setMessengerToggle(closeMessangerStatus)
        setGetterData(getterData)
    }

    //ปิด Chat เมื่อเปิด messenger
    const handleChatroomToggle=(data,index)=>{
        setChatroomToggle(data)
        //setMsgNumber(index)
        setToggle1()
       }


    //ปิด Chat เมื่อกิดปิด X
     const handleCloseChat=(data)=>{
       setChatroomToggle(data)
     }


     //จัดการเกี่ยวการ Messenger โดยจะดึงข้อมูล messeges ทั้งหมด
     useEffect(()=>{
        const fetchingAllMessages = ()=>{
            axios.get(`${process.env.API_URL}/all-messages/${props.userData.accountData._id}`)
        .then((response)=>{

            //สามารถเขียน Logic ตรงนี้เพื่อกรองหาแชทที่ไม่ได้อ่าน
            if(response.data && props.userData){
                const  filteredIsnotRead = (response.data).filter((chatBox,index)=>{

                    const filter = chatBox.messages.filter((message) => {
                        return message.senderID !== props.userData.accountData._id && message.isRead === false
                    });

                    return (filter.length > 0)
                })

                setAllMessages(response.data)
                setNewMessageAmount(filteredIsnotRead.length)
                socket.emit('allMessages',{data:response.data, newUnreadMessages:filteredIsnotRead.length, userID:props.userData.accountData._id})
                
            }

        })
        .catch((error)=>{
            console.log('เกิดข้อผิดพลาดกับ server')
            console.log(error)
        })
        }

        fetchingAllMessages()
    },[props.userData])


    //จะทำการอัพเดต messages ทั้งหมดเมื่อมีข้อความส่งมา หรือว่าเราเข้าไปที่ chat นั้นๆเพื่ออ่านข้อความ
    //จะไป update ที่ทั้ง messenger และ new Message Amount อีกด้วย
    useEffect(()=>{
        socket.on('allMessages',({data,userID,newUnreadMessages}) =>{
           if(userID === props.userData.accountData._id){
            setAllMessages(data)
            setNewMessageAmount(newUnreadMessages)
           } 
        })
    },[])


    //จัดการเกี่ยวการ TalkingRoom โดยจะดึงข้อมูล room Requests ทั้งหมด
    useEffect(()=>{
        const fetchingRoomRequest=()=>{
            axios.get(`${process.env.API_URL}/all-room-requested/${props.userData.accountData._id}`)
            .then((response)=>{
                setNewTalkingRoomAmount(response.data.length)
            })
            .catch((error)=>{
                setNewTalkingRoomAmount(0)
            })
        }

        fetchingRoomRequest()

    },[props.userData])



     //กรณีมีคนส่งคำขอมาหรือยกเลิกมาแล้ว เราเป็น admin จะอัพเดตคำขอ อัตโนมัติ
     useEffect(()=>{
        const handleUpdateRoomRequest = async ({admins}) =>{
            const isAdmin = await admins.filter((adminID)=>{
                return (adminID === props.userData.accountData._id)
            })

            if(isAdmin.length !== 0){
                const fetchingRoomRequest=()=>{
                    axios.get(`${process.env.API_URL}/all-room-requested/${props.userData.accountData._id}`)
                    .then((response)=>{
                        setNewTalkingRoomAmount(response.data.length)
                    })
                    .catch((error)=>{
                        setNewTalkingRoomAmount(0)
                    })
                }

                fetchingRoomRequest()
            }
            
        }

        socket.on('roomRequest-admin-side',handleUpdateRoomRequest)
        
        return ()=>{
            socket.off('roomRequest-admin-side',handleUpdateRoomRequest)
        }
    },[])

    return(
    <nav className="h-auto py-2 pt-4 px-1 flex bg-gray-900 text-gray-100 ">
        <div className="flex flex-row justify-center ms-2">
        <Link href='/main' className="cursor-pointer flex justify-center">
        <img src="/logo.png" alt="home" className="h-12 w-10 pb-3"/>
        <h1 className="text-4xl  hidden md:block lg:block">&nbsp;TalkToGo</h1>
        </Link>
        </div>
        
        <div className="flex flex-1 ms-2">
            <ul className="flex">
                <li><FontAwesomeIcon icon={faBars} onClick={()=>{props.menuStatus?props.menuToggle(false):props.menuToggle(true); setSearchToggle(false); setMessengerToggle(false); setProfileToggle(false); setFriendRequestToggle(false); setTalkingRoomToggle(false)}} alt="menu" className={props.menuStatus?"cursor-pointer inline p-1 h-8 w-8 p-1 bg-gray-900  me-1 inline col-span-1 md:hidden lg:hidden text-yellow-500":"cursor-pointer inline p-1 h-8 w-8 p-1 bg-gray-900  me-1 inline col-span-1 md:hidden lg:hidden "}/></li>
            </ul>
        </div>

        <div className="flex gap-2  justify-end me-2">

        <div><FontAwesomeIcon icon={faPeopleGroup} onClick={()=>{props.menuToggle(false); setTalkingRoomToggle(TalkingRoomToggle?false:true); setFriendRequestToggle(false); setSearchToggle(false); setMessengerToggle(false); setProfileToggle(false)}}  alt="search" className={TalkingRoomToggle?"inline h-7 w-7 inline col-span-1 cursor-pointer bg-yellow-200 border-2 border-yellow-200 rounded-full text-yellow-600 p-1":"inline h-7 w-7 inline col-span-1 cursor-pointer bg-white border-2  rounded-full text-gray-900 p-1"}/></div>
        {newTalkingRoomAmount > 0 &&
        <div className="bg-red-500 text-center w-6 h-6 rounded-full absolute right-[193px] md:right-[193px] lg:right-[200px] top-[4px] ">{newTalkingRoomAmount}</div>
        }
     
        <div><FontAwesomeIcon icon={faUserPlus} onClick={()=>{props.menuToggle(false); setFriendRequestToggle(friendRequestToggle?false:true); setTalkingRoomToggle(false); setSearchToggle(false); setMessengerToggle(false); setProfileToggle(false)}}  alt="search" className={friendRequestToggle?"inline h-7 w-7 inline col-span-1 cursor-pointer bg-yellow-200 border-2 border-yellow-200 rounded-full text-yellow-600 p-1":"inline h-7 w-7 inline col-span-1 cursor-pointer bg-white border-2  rounded-full text-gray-900 p-1"}/></div>
        {friendRequestAmount > 0 &&
        <div className="bg-red-500 text-center w-6 h-6 rounded-full absolute right-[148px] md:right-[148px] lg:right-[153px] top-[4px] ">{friendRequestAmount}</div>
        }

        <div><FontAwesomeIcon icon={faComments} onClick={()=>{props.menuToggle(false); setMessengerToggle(messengerToggle?false:true); setTalkingRoomToggle(false); setSearchToggle(false); setProfileToggle(false); setFriendRequestToggle(false); setChatroomToggle(false)}}   alt="messenger" className={messengerToggle?"inline h-7 w-7 inline col-span-1 cursor-pointer p-1  border-2 border-yellow-200 rounded-full text-yellow-600 bg-yellow-200":"inline h-7 w-7 inline col-span-1 cursor-pointer p-1  bg-white border-2 rounded-full text-gray-900"} /></div>
        {newMessagesAmount > 0 &&
        <div className="bg-red-500 text-center w-6 h-6 rounded-full absolute right-[100px] md:right-[100px] lg:right-[105px] top-[4px] ">{newMessagesAmount}</div>
        }
        <div><FontAwesomeIcon icon={faMagnifyingGlass} onClick={()=>{props.menuToggle(false); setSearchToggle(searchToggle?false:true); setTalkingRoomToggle(false); setMessengerToggle(false); setProfileToggle(false); setFriendRequestToggle(false)}} alt="search" className={searchToggle?"inline h-7 w-7  inline col-span-1 cursor-pointer bg-yellow-200  border-2 border-yellow-200 rounded-full text-yellow-600 p-1 ":"inline h-7 w-7  inline col-span-1 cursor-pointer bg-white border-2  rounded-full text-gray-900 p-1 "}/></div>
        <div className={props.userData?'':'mt-2'}>
                {props.userData ?
                <img onClick={()=>{props.menuToggle(false); setProfileToggle(profileToggle?false:true); setMessengerToggle(false); setTalkingRoomToggle(false); setSearchToggle(false); setFriendRequestToggle(false)}} className=" inline rounded-full h-5/6 w-10  lg:w-11 inline col-span-1 cursor-pointer" src={props.userData?props.userData.accountData.accountImage:'/defaultProfile.png'} alt="Profile picture"/>
                :
                <Link href={'/'} className="bg-gray-900 text-white p-2 items-end rounded-md">
                    Sign in | Sign up
                </Link>
                }
            </div>
        </div>

        {friendRequestToggle &&
        <div className="navber-card max-h-5/6 overflow-auto ">
            <FriendRequest userData={props.userData}/>
        </div>
        }

        {messengerToggle && 
        <div className="navber-card max-h-5/6 overflow-auto">
            <Messenger messages={allMessages} userData={props.userData} senderData={props.userData} closeMessanger={closeMessanger} handleChatroomToggle={handleChatroomToggle}/>
        </div>
        }

        {searchToggle &&
        <div className="navber-card max-h-5/6 overflow-auto">
            <Search handleClick={handleClick}/>
        </div>
        }

            {chatroomToggle && isToggled1 &&  
                <div>
                     <Chatroom  handleCloseChat={handleCloseChat} senderData={props.userData} getterData={getterData}/>
                 </div>
                 }

        {profileToggle &&
        <div className="navber-card max-h-5/6 overflow-auto">
            <Profile userData={props.userData}/>
        </div>
        }

        {TalkingRoomToggle &&
        <div className="navber-card max-h-5/6 overflow-auto">
            <TalkingRoom userData={props.userData}/>
        </div>
        }
    </nav>
    )
}