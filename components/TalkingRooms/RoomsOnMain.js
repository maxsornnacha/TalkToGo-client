import Link from "next/link"
import { useState, useEffect } from "react"
import CreatingRoom from "./CreatingRoom"
import axios from "axios"

export default function RoomsOnMain({userData}){
    const [creatingRoomToggle,setCreatingRoomToggle] = useState(false)
    const [talkingrooms,setTalkingrooms] = useState(null)

    useEffect(()=>{

        const fetchTalkingRooms =()=>{
            axios.post(`${process.env.API_URL}/all-talkingrooms`,{userID:userData.accountData._id})
            .then((response)=>{
                setTalkingrooms(response.data)
            })
            .catch((error)=>{
                console.log(error.response.data)
            })
        }
        
        fetchTalkingRooms()
        
    },[])

    const handleCreatingRoomClose=(status)=>{
        setCreatingRoomToggle(status)
    }

    const handleMouseEnter = (id)=>{
        const roomnameID =  document.getElementById(id)
        
        roomnameID.classList.add('block')
        roomnameID.classList.remove('hidden')
    }

    const handleMouseLeave = (id)=>{
        const roomnameID = document.getElementById(id)
        
        roomnameID.classList.add('hidden')
        roomnameID.classList.remove('block')
    }

    return(
    <div className={`h-screen w-full bg-gray-900 overflow-auto overflow-hidden hover:overflow-scroll  hidden lg:block pb-40 ${creatingRoomToggle?'scrollbar-hide':''}`}>
    <div className="w-full flex flex-col items-center ">
            {/* สร้างห้องสำหรับพูดคุย */}
            <div id={`creating-room`}  className="hidden bg-black flex justify-center w-44 break-words  text-[0.8rem] px-2 py-2 rounded-lg absolute left-24 text-white">
                    สร้างห้องพูดคุย
            </div>
            <button onClick={()=>{setCreatingRoomToggle(creatingRoomToggle?false:true);}} className="flex px-2  items-center gap-2  py-2 rounded-full"
            onMouseEnter={()=>handleMouseEnter(`creating-room`)}
            onMouseLeave={()=>handleMouseLeave(`creating-room`)}
            >
                <img className={`rounded-full p-4 bg-gray-700 hover:rounded-xl h-16 w-16 hover:bg-gray-500 shadow-md ${creatingRoomToggle?'rounded-xl':''}`} src={'/add.png'} alt="Room picture"/>
            </button>

            {creatingRoomToggle &&
            <div className="overlay">
            <CreatingRoom handleCreatingRoomClose={handleCreatingRoomClose} userData={userData}/>
            </div>
             }


            {talkingrooms &&
            talkingrooms.map((room,index)=>{
            return (
            <div key={index}>
                 <div id={`roomname-${index}`}  className="hidden bg-black flex justify-center w-44 break-words text-[0.8rem] px-2 py-2 rounded-lg absolute left-24 text-white">
                    {room.roomName}
                 </div>
                 <Link className="flex px-2 items-center gap-2 py-2 rounded-full" href={`/rooms/talking-room/${room.slug}`}>
                     <img
                    className="room-link rounded-full hover:rounded-xl h-16 w-16 hover:bg-gray-500 shadow-md"
                    src={room.roomIcon ? room.roomIcon :'/black-background.jpg'}
                    alt="Room Image"
                    onMouseEnter={()=>handleMouseEnter(`roomname-${index}`)}
                    onMouseLeave={()=>handleMouseLeave(`roomname-${index}`)}
          
                    />
                 </Link>
            </div>
            )})
            }

    


    </div>
    </div>
    )
}