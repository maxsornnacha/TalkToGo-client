import axios from "axios"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { io } from "socket.io-client"
const socket = io(process.env.API_SOCKET_URL)

export default function Requests({accountID,roomID}){
    const [requestStatus,setRequestStatus] = useState(false)

    //เช็คว่า User นี้ได้ส่งคำขอไปแล้วรึยีง
    useEffect(()=>{
        axios.get(`${process.env.API_URL}/get-room-request/${accountID}`)
        .then((response)=>{
            setRequestStatus(response.data)
        })
        .catch((error)=>{
            setRequestStatus(false)
        })
    },[])
    
    //จัดการ ขอเข้าร่วมกลุ่ม
    const handleRequestToTheRoom=(event)=>{
        axios.put(`${process.env.API_URL}/room-request`,{
            accountID,roomID
        })
        .then((response)=>{
            //console.log('ส่งคำขอสำเร็จ')
            //จัดการ real-time handle สำหรับการ ส่งคำขอ requester side
            socket.emit('roomRequest-requester-side',{
                id:accountID,
                requestStatus:true
            })

            socket.on('roomRequest-requester-side',({id,requestStatus})=>{
                if(id === accountID){
                    setRequestStatus(requestStatus)
                }
            })

            //จัดการ real-time handle สำหรับการ ส่งคำขอ admin side
            socket.emit('roomRequest-admin-side',{
                admins:response.data.admins
            })
        })
        .catch((error)=>{
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
               text: error.response.data.error
         });
        })
    }


    const handleCancelTheRequest=()=>{
        axios.delete(`${process.env.API_URL}/delete-room-request`,{
            data:{accountID,roomID}
        })
        .then((response)=>{
            //console.log('ยกเลิกคำขอสำเร็จ')
            //จัดการ real-time handle สำหรับการ ยกเลิกคำขอ requester side
            socket.emit('roomRequest-requester-side',{
                id:accountID,
                requestStatus:false
            })

            socket.on('roomRequest-requester-side',({id,requestStatus})=>{
                if(id === accountID){
                    setRequestStatus(requestStatus)
                }
            })

             //จัดการ real-time handle สำหรับการ ส่งคำขอ admin side
             socket.emit('roomRequest-admin-side',{
                admins:response.data.admins
            })
        })
        .catch((error)=>{
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
               text: error.response.data.error
         });
        })
    }


    //เมื่อ admin รับหรือปฎิเสธเข้าร่วมกลุ่ม จะอัพเดตไปที่หน้านี้ 
    useEffect(()=>{
        const handleAcceptOrRejectFromAdmin = ({id,requestStatus}) =>{
            if(id === accountID){
                if(requestStatus){
                    setRequestStatus(requestStatus)
                    Swal.fire({
                        icon: "success",
                        text: "คุณได้ถูกยอมรับให้เข้าร่วมห้องแล้ว",
                        showConfirmButton: false,
                        timer: 1500
                      }).then(()=>{
                        //จะ refresh อีกรอบ
                        location.reload(true)
                      })
                }else{
                    setRequestStatus(requestStatus)
                    Swal.fire({
                        icon: "error",
                        text: "คุณได้ถูกปฎิเสธการเข้าร่วมห้อง",
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            }
        }

        socket.on('roomRequest-from-admin-requester-side',handleAcceptOrRejectFromAdmin)

        return ()=>{
            socket.off('roomRequest-from-admin-requester-side',handleAcceptOrRejectFromAdmin)
        }
    },[])
 

    return (
        <div>
        { (!requestStatus) &&
        <button onClick={handleRequestToTheRoom} className="rounded-md  hover:bg-blue-700 text-[1.2rem] md:text-[1.8rem] bg-blue-600 py-2 px-5">
            ขอเข้าร่วม
        </button>
        }
         { requestStatus &&
        <button onClick={handleCancelTheRequest} className="rounded-md  hover:bg-blue-700 text-[1.2rem] md:text-[1.8rem] bg-blue-600 py-2 px-5">
            รอดำเนินการ
        </button>
        }
        </div>
    )
}