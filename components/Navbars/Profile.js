import Signout from "../Accounts/Signout"
import Link from "next/link"

export default function Profile(props){

    return (
    <div className="w-full"> 
         <div className="border-b-2 border-gray-200 w-full text-center pt-1 pb-3 text-[1.2rem]"> โปรไฟล์ </div>         

         <div className="flex w-full p-2 hover:bg-gray-700 hover:text-white font-medium hover:text-white font-medium hover:rounded-md">
        <Link href={`/profile/${props.userData.accountData.id}`}  className="py-1 text-[1.0rem] flex items-center gap-1 hover:overflow-auto w-full text-start">
        <img src={props.userData?props.userData.accountData.accountImage:'/defaultProfile.png'} alt="home" className="h-11 w-11  cursor-pointer me-2 rounded-full"/>
         <div>{props.userData.accountData.firstname} {props.userData.accountData.lastname}</div>
        </Link>
        </div>

        <div className="flex w-full p-1 hover:bg-gray-700 hover:text-white  font-medium hover:rounded-md  ">
        <img src="/logoutMenu.png" alt="logout-image" className="h-full w-10 cursor-pointer pb-3 ms-1 me-3"/>
            <Signout/>
        </div>
    </div>
    )
}