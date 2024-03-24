import { useState,useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import { io } from "socket.io-client"
const socket = io(process.env.API_SOCKET_URL)

export default function TalkingRoom({userData}){

    const [notifiedData,setNotifiedData] = useState(null)


    const fetchingRoomRequest=()=>{
        axios.get(`${process.env.API_URL}/all-room-requested/${userData.accountData._id}`)
        .then((response)=>{
            setNotifiedData((response.data).reverse())
        })
        .catch((error)=>{
            setNotifiedData(null)
        })

    }

    useEffect(()=>{
      
        fetchingRoomRequest()

    },[userData])


    //กรณีมีคนส่งคำขอมาหรือยกเลิกมาแล้ว เราเป็น admin จะอัพเดตคำขอ อัตโนมัติ
    useEffect(()=>{
        const handleUpdateRoomRequest = async ({admins}) =>{
            const isAdmin = await admins.filter((adminID)=>{
                return (adminID === userData.accountData._id)
            })

            if(isAdmin.length !== 0){
                fetchingRoomRequest()
            }
            
        }

        socket.on('roomRequest-admin-side',handleUpdateRoomRequest)
        
        return ()=>{
            socket.off('roomRequest-admin-side',handleUpdateRoomRequest)
        }
    },[])


    const handleAccept = (roomRequestedID,requesterID) =>{
        axios.put(`${process.env.API_URL}/accept-room-requested`,{
            roomRequestedID,requesterID
        })
        .then((response)=>{
            //จะได้ขอมูลห้องแบบเดี่ยวที่อัพเดตแล้ว

            //เมื่อปฎิเสธแล้ว จะทำการอัพเดตไปให้ requester side อัตโนมัติ
            socket.emit('roomRequest-from-admin-requester-side',{
                id:requesterID,
                requestStatus:true
            })

             //ทำการอัดเดตข้อมูลอีกรอบไปที่ Navbar และ componentนี้ให้แก่ Admin ทุกคน เมื่อ ยอมรับคำขอ แล้ว
             //จะจัดการ real-time handle สำหรับการ ตอบรับคำขอทางด้าน admin side
             socket.emit('roomRequest-admin-side',{
                admins:response.data.admins
            })

            //เมื่อ Admins กดยอมรับ จะทำการอัพเดตห้องแชทที่ได้ระบุไว้ ให้อัพเดตข้อมูล
            socket.emit('room-update-after-accepted',{
                roomID:roomRequestedID,
                roomData:response.data
            })

        })
        .catch((error)=>{
            alert(error.response.data.error)
        })
    }

    const handleReject = (roomRequestedID,requesterID) =>{
        axios.delete(`${process.env.API_URL}/reject-room-requested`,{
            data:{roomRequestedID,requesterID}
        })
        .then((response)=>{
            //จะได้ขอมูลห้องแบบเดี่ยวที่อัพเดตแล้ว
            
            
             //เมื่อปฎิเสธแล้ว จะทำการอัพเดตไปให้ requester side อัตโนมัติ
             socket.emit('roomRequest-from-admin-requester-side',{
                id:requesterID,
                requestStatus:false
            })

             //ทำการอัดเดตข้อมูลอีกรอบไปที่ Navbar และ componentนี้ให้แก่ Admin ทุกคน เมื่อ ยอมรับคำขอ แล้ว
             //จะจัดการ real-time handle สำหรับการ ตอบรับคำขอทางด้าน admin side
             socket.emit('roomRequest-admin-side',{
                admins:response.data.admins
            })
        })
        .catch((error)=>{
            alert(error.response.data.error)
        })
    }

    return(
    <div className="w-full">
           <div className="border-b-2 border-gray-200 w-full text-center pt-1 pb-3 text-[1.2rem]"> คำขอเข้าร่วมห้องพูดคุย </div>
            {notifiedData &&
            notifiedData.map((data,index)=> { 
            return (
            <div key={index} className="py-2 px-2 bg-gray-100 my-2 mx-2"> 
                <div className="flex gap-2">
                <Link href={`/rooms/talking-room/${data.roomRequested.slug}`}>  
                <img src={data.roomRequested.roomIcon} className="w-12 h-12 rounded-full"/>
                </Link>

                <div>  
                    <Link href={`/rooms/talking-room/${data.roomRequested.slug}`} className="text-[1rem] font-semibold">ห้อง '{data.roomRequested.roomName}'</Link> 
                    <div className="text-[0.9rem] flex gap-2 items-center">คำขอจาก: <Link href={`/profile/${data.requesterInfo.id}`} className="font-semibold flex items-center gap-1">
                        <img src={data.requesterInfo.accountImage} className="w-8 h-8 rounded-full"/>
                        {data.requesterInfo.firstname} {data.requesterInfo.lastname}
                    </Link></div> 
                </div>
                </div>

                <div className="flex gap-2 justify-end">
                    <button onClick={()=>handleAccept(data.roomRequested._id,data.requesterInfo._id)} className="text-[0.9rem] py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white shadow-md">ยอมรับ</button>
                    <button onClick={()=>handleReject(data.roomRequested._id,data.requesterInfo._id)} className="text-[0.9rem] py-2 px-3 bg-red-600 hover:bg-red-700 text-white shadow-md">ปฎิเสธ</button>
                </div>
            </div>
            )})
            }
            
            {!notifiedData &&
            <div className="h-56 flex justify-center items-center">
                    <div>ไม่พบคำขอเช้าร่วม</div>
            </div>
            }
    </div>
    )
}