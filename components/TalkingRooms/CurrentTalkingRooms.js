import Link from "next/link"
import { useState, useEffect } from "react"
import axios from "axios"


export default function Rooms({userData}){
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
        
    },[userData])

    return (
    <div className="h-96 w-full bg-gray-100 text-gray-700">
    {talkingrooms &&
    talkingrooms.map((room,index)=>{
    return (
            <div className="w-full flex flex-col items-star" key={index}>
                    <Link className="flex px-2  items-center gap-2  w-full py-2  hover:bg-gray-700 rounded-md hover:text-white" href={`/rooms/talking-room/${room.slug}`}>
                        <img className="rounded-md h-11 w-11 bg-white shadow-md" src={room.roomIcon?room.roomIcon:'/black-background.jpg'} alt="Room picture"/>
                        <div>
                        <p className="text-[1.0rem]">{room.roomName}</p>
                        <p className="text-[0.75rem]">รายละเอียด: {room.roomDescription!==''?(room.roomDescription.length >20?room.roomDescription.slice(0,20)+'...':room.roomDescription):'ไม่มีรายละเอียด'}</p>
                        </div>
                    </Link>
        
            </div>
    )
    })
    }
    </div>
    )


}