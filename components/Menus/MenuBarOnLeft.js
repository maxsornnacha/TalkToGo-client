
import Signout from "../Accounts/Signout"
import Link from "next/link"

export default function MenuBarOn(props){


    return(
    <>
    <div className="flex flex-col items-start my-6  text-black bg-white rounded-md">
        
        <div className="flex w-full p-2 hover:bg-yellow-200 hover:text-black hover:text-black hover:rounded-md">
        <Link href={`/profile/${props.userData.accountData.id}`}  className="py-1 text-[0.9rem] flex items-center gap-1 hover:overflow-auto w-full text-start">
        <img src={props.userData?props.userData.accountData.accountImage:'/defaultProfile.png'} alt="home" className="h-9 w-9 cursor-pointer me-2 rounded-full"/>
         <div>{props.userData.accountData.firstname} {props.userData.accountData.lastname}</div>
        </Link>
        </div>

        <div className="flex w-full p-2 hover:bg-yellow-200 hover:text-black hover:rounded-md">
        <Link href={`/main`}  className="text-[0.9rem] flex items-center gap-1 hover:overflow-auto w-full text-start">
        <img src="/homeMenu.png" alt="home" className="h-full w-8 cursor-pointer pb-3 me-2"/>
        <button  className=" text-[0.9rem] w-full text-start">
            หน้าแรก
        </button>
        </Link>
        </div>

      
        <div className="flex w-full p-2 hover:bg-yellow-200 hover:text-black hover:rounded-md">
        <Link href={`/friends/${props.userData.accountData.id}`}  className="text-[0.9rem] flex items-center gap-1 hover:overflow-auto w-full text-start">
        <img src="/friendMenu.png" alt="home" className="h-full w-9 cursor-pointer pb-3 me-2"/>
        <button  className="w-full text-start text-[0.9rem]">
             เพื่อน
        </button>
        </Link>
        </div>
   
    

        
        <div className="flex w-full p-2 hover:bg-yellow-200 hover:text-black hover:rounded-md">
        <Link href={`/rooms/${props.userData.accountData.id}`}  className="text-[0.9rem] flex items-center gap-1 hover:overflow-auto w-full text-start">
        <img src="/talkroomMenu.png" alt="home" className="h-full w-9 cursor-pointer pb-3 me-2"/>
        <button className="w-full text-start text-[0.9rem]">
            ห้องสำหรับพูดคุย
        </button>
        </Link>
        </div>
 

        <div className="flex w-full p-2 hover:bg-yellow-200 hover:text-black hover:rounded-md  ">
        <img src="/logoutMenu.png" alt="home" className="h-full w-8 cursor-pointer pb-3 ms-1 me-3"/>
            <Signout/>
        </div>


    </div>
    </>
    )
}