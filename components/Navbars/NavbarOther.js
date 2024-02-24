import Link from "next/link";
import { useState } from "react";
import Messenger from "./Messenger";
import Search from "./Search";
import Profile from "./Profile";



export default function Navbar(props){
    const [messengerToggle,setMessengerToggle] = useState(false)
    const [searchToggle,setSearchToggle] = useState(false)
    const [profileToggle,setProfileToggle] = useState(false)

    const handleClick=(status)=>{
        setSearchToggle(status)
    }


    return(
    <nav className="h-16 pt-4 px-1 flex bg-white ">
        
        <Link href='/main' className="flex flex-1 cursor-pointer">
        <img src="/logo.png" alt="home" className="h-12 w-10 pb-3"/>
        <h1 className="text-2xl">TalkToGo</h1>
        </Link>
        
        

        <div className="flex-1">
            <ul className="flex gap-10">
            <Link href={`/main`}><img src="/homeNavbar.png" alt="home" className="h-full w-8 cursor-pointer pb-3 hidden lg:block"/></Link>
            <Link href={`/friends/${props.userData && props.userData.accountData.id}`}><img src="/friendNavbar.png" alt="friends" className="h-full w-8 cursor-pointer  pb-3 hidden lg:block"/></Link>
            <Link href={`/rooms/${props.userData && props.userData.accountData.id}`}><img src="/talkroomNavbar.png" alt="talkroom" className="h-full w-8 cursor-pointer pb-3 hidden lg:block"/></Link>
            </ul>
        </div>

        <div className="flex flex-1 justify-end">
            <ul className="flex">
                <li><img onClick={()=>{props.menuStatus?props.menuToggle(false):props.menuToggle(true); setSearchToggle(false); setMessengerToggle(false); setProfileToggle(false)}} src={props.menuStatus?"/close.png":"/menuToggle.png"} alt="menu" className={props.menuStatus?"cursor-pointer inline mt-1 p-1 h-7 w-7 me-2 inline col-span-1 md:hidden lg:hidden":"cursor-pointer inline mt-1  h-7 w-7 me-2 inline col-span-1 md:hidden  lg:hidden"}/></li>
            </ul>
        </div>

        <div className="flex gap-2  justify-end">
        <div><img onClick={()=>{props.menuToggle(false); setMessengerToggle(messengerToggle?false:true); setSearchToggle(false); setProfileToggle(false)}} src="/messengerToggle.png" alt="messenger" className={messengerToggle?"inline h-5/6 w-9  lg:w-11 inline col-span-1 cursor-pointer p-1 bg-yellow-100 border-2 border-yellow-500 rounded-lg ":"inline h-5/6 w-9  lg:w-11 inline col-span-1 cursor-pointer bg-gray-200  rounded-lg p-1 "} /></div>
            <div><img onClick={()=>{props.menuToggle(false); setSearchToggle(searchToggle?false:true); setMessengerToggle(false); setProfileToggle(false)}} src="/searchToggle.png" alt="search" className={searchToggle?"inline h-5/6 w-10  lg:w-11 inline col-span-1 cursor-pointer bg-yellow-100 border-2 border-yellow-500 rounded-lg p-1 ":"inline h-5/6 w-9  lg:w-11 inline col-span-1  cursor-pointer bg-gray-200  rounded-lg "}/></div>
            <div className={props.userData?'':'mt-2'}>
                {props.userData ?
                <img onClick={()=>{props.menuToggle(false); setProfileToggle(profileToggle?false:true); setMessengerToggle(false); setSearchToggle(false)}} className="bg-white inline rounded-full h-5/6 w-10  lg:w-11 inline col-span-1 cursor-pointer" src={props.userData?props.userData.accountData.accountImage:'/defaultProfile.png'} alt="Profile picture"/>
                :
                <Link href={'/'} className="bg-gray-900 text-white p-2 items-end rounded-md">
                    Sign in | Sign up
                </Link>
                }
            </div>
        </div>

        {messengerToggle &&
        <div className="navber-card">
            <Messenger/>
        </div>
        }

        {searchToggle &&
        <div className="navber-card">
            <Search handleClick={handleClick}/>
        </div>
        }

        {profileToggle &&
        <div className="navber-card">
            <Profile/>
        </div>
        }
    </nav>
    )
}