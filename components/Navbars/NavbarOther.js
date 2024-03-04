import Link from "next/link";
import { useState,useEffect } from "react";
import Messenger from "./Messenger";
import Search from "./Search";
import Profile from "./Profile";
import FriendRequest from "./FriendRequest";
import axios from "axios";
import { io } from "socket.io-client"
const socket = io(process.env.API_SOCKET_URL)



export default function Navbar(props){
    const [messengerToggle,setMessengerToggle] = useState(false)
    const [searchToggle,setSearchToggle] = useState(false)
    const [profileToggle,setProfileToggle] = useState(false)
    const [friendRequestToggle,setFriendRequestToggle] = useState(false)
    const [friendRequestAmount,setFriendRequestAmount] = useState(0)


    const handleClick=(status)=>{
        setSearchToggle(status)
    }

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

    useEffect(()=>{
        if(props.userData){
            fetching()
        } 
        return () => {
            socket.off('friendRequestList');
        };
    },[props,friendRequestToggle])


    return(
    <nav className="h-auto py-2 pt-4 px-1 flex bg-gray-900 text-gray-100 ">
        <div className="flex flex-row justify-center ms-2">
        <Link href='/main' className="cursor-pointer flex justify-center">
        <img src="/logo.png" alt="home" className="h-12 w-10 pb-3"/>
        <h1 className="text-4xl  hidden md:block lg:block">&nbsp;TalkToGo</h1>
        </Link>
        </div>
        
        <div className="flex flex-1 justify-end">
            <ul className="flex">
                <li><img onClick={()=>{props.menuStatus?props.menuToggle(false):props.menuToggle(true); setSearchToggle(false); setMessengerToggle(false); setProfileToggle(false); setFriendRequestToggle(false)}} src={props.menuStatus?"/close.png":"/menuToggle.png"} alt="menu" className={props.menuStatus?"cursor-pointer inline p-1 h-10 w-9 p-2 rounded-md me-2 inline col-span-1 md:hidden lg:hidden bg-white":"cursor-pointer inline p-1 h-10 w-9 p-2 rounded-md bg-white me-2 inline col-span-1 md:hidden lg:hidden "}/></li>
            </ul>
        </div>

        <div className="flex gap-2  justify-end">
     
        <div><img onClick={()=>{props.menuToggle(false); setFriendRequestToggle(friendRequestToggle?false:true); setSearchToggle(false); setMessengerToggle(false); setProfileToggle(false)}} src="/friendRequest.png" alt="search" className={friendRequestToggle?"inline h-5/6 w-10  lg:w-11 inline col-span-1 cursor-pointer bg-gray-200   rounded-lg p-1 ":"inline h-5/6 w-10  lg:w-11 inline col-span-1 cursor-pointer bg-white border-2  rounded-lg p-1  "}/></div>
        {friendRequestAmount > 0 &&
        <div className="bg-red-500 text-center w-6 h-6 rounded-full absolute right-[135px] lg:right-[150px] top-[4px] ">{friendRequestAmount}</div>
        }

        <div><img onClick={()=>{props.menuToggle(false); setMessengerToggle(messengerToggle?false:true); setSearchToggle(false); setProfileToggle(false); setFriendRequestToggle(false)}}  src="/messengerToggle.png" alt="messenger" className={messengerToggle?"inline h-5/6 w-9  lg:w-11 inline col-span-1 cursor-pointer p-1 bg-gray-200  rounded-lg ":"inline h-5/6 w-9  lg:w-11 inline col-span-1 cursor-pointer p-1  bg-white border-2 rounded-lg "} /></div>
        <div><img onClick={()=>{props.menuToggle(false); setSearchToggle(searchToggle?false:true); setMessengerToggle(false); setProfileToggle(false); setFriendRequestToggle(false)}} src="/searchToggle.png" alt="search" className={searchToggle?"inline h-5/6 w-10  lg:w-11 inline col-span-1 cursor-pointer bg-gray-200   rounded-lg p-1 ":"inline h-5/6 w-10  lg:w-11 inline col-span-1 cursor-pointer bg-white border-2  rounded-lg p-1  "}/></div>
        <div className={props.userData?'':'mt-2'}>
                {props.userData ?
                <img onClick={()=>{props.menuToggle(false); setProfileToggle(profileToggle?false:true); setMessengerToggle(false); setSearchToggle(false); setFriendRequestToggle(false)}} className=" inline rounded-full h-5/6 w-10  lg:w-11 inline col-span-1 cursor-pointer" src={props.userData?props.userData.accountData.accountImage:'/defaultProfile.png'} alt="Profile picture"/>
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
            <Messenger/>
        </div>
        }

        {searchToggle &&
        <div className="navber-card max-h-5/6 overflow-auto">
            <Search handleClick={handleClick}/>
        </div>
        }

        {profileToggle &&
        <div className="navber-card max-h-5/6 overflow-auto">
            <Profile userData={props.userData}/>
        </div>
        }
    </nav>
    )
}