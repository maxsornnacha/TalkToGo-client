import Link from "next/link"


export default function MenuBarOn(props){


    return(
    <>
    <div className="flex flex-col items-start my-6  text-gray-300 font-medium bg-gray-800 ">
        
        <div className="flex w-full p-2 hover:bg-gray-700 hover:text-white font-medium hover:text-white font-medium hover:rounded-md">
        <Link href={`/profile/${props.userData.accountData.id}`}  className="py-1 text-[1.0rem] flex items-center gap-1 hover:overflow-auto w-full text-start">
        <img src={props.userData?props.userData.accountData.accountImage:'/defaultProfile.png'} alt="home" className="h-11 w-11  cursor-pointer me-2 rounded-full"/>
         <div>{props.userData.accountData.firstname} {props.userData.accountData.lastname}</div>
        </Link>
        </div>

        <div className="flex w-full p-2 hover:bg-gray-700 hover:text-white font-medium hover:rounded-md">
        <Link href={`/main`}  className="text-[1.0rem] flex items-center gap-1 hover:overflow-auto w-full text-start">
        <img src="/homeMenu.png" alt="home" className="h-full w-9 cursor-pointer pb-3 me-4"/>
        <button  className=" text-[1.0rem] w-full text-start">
            หน้าแรก
        </button>
        </Link>
        </div>

      
        <div className="flex w-full p-2 hover:bg-gray-700 hover:text-white font-medium hover:rounded-md">
        <Link href={`/friends/${props.userData.accountData.id}`}  className="text-[1.0rem] flex items-center gap-1 hover:overflow-auto w-full text-start">
        <img src="/friendMenu.png" alt="home" className="h-full w-10 cursor-pointer pb-3 me-3"/>
        <button  className="w-full text-start text-[1.0rem]">
             เพื่อน
        </button>
        </Link>
        </div>
   
    

        
        <div className="flex w-full p-2 hover:bg-gray-700 hover:text-white font-medium hover:rounded-md">
        <Link href={`/rooms/${props.userData.accountData.id}`}  className="text-[1.0rem] flex items-center gap-1 hover:overflow-auto w-full text-start">
        <img src="/talkroomMenu.png" alt="home" className="h-full w-10 cursor-pointer pb-3 me-3"/>
        <button className="w-full text-start text-[1.0rem]">
            ห้องสำหรับพูดคุย
        </button>
        </Link>
        </div>
 

    </div>
    </>
    )
}