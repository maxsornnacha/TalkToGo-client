import axios from "axios"
import { useEffect,useState } from "react"
import Swal from "sweetalert2"
import { io } from "socket.io-client"
const socket = io(process.env.API_SOCKET_URL)
import { createRoomID } from "@/modules/modules"

export default function AddFriends({accountData,senderID,getterID,handleChatroomToggle,index}){
    const [requester,setRequester ] = useState(null)
    const [recipient,setRecipient] = useState(null)
    const [status,setStatus] = useState(null)
     // สร่าง roomID
     const roomID = createRoomID(senderID, getterID);

    useEffect(()=>{
        socket.on('requestFriendship', ({roomIDGet,requester,recipient,status}) => {
            if(roomID === roomIDGet){
            setRequester(requester);
            setRecipient(recipient);
            setStatus(status);
            }
         })
    },[])
  
    //ส่งตำขอเป็นเพื่อน
    const handleSendingRequest= async (event)=>{
        event.preventDefault()

       await axios.post(`${process.env.API_URL}/making-request`,{
            senderID,getterID
        })
        .then((response)=>{
            socket.emit('requestFriendship',{
                requester:senderID,
                recipient:getterID,
                status:response.data.status,
                roomIDGet:roomID
            })
      
            //ทำการอัพเดตไปที่ จำนวนการส่งคำขอ ณ Navbar Other
             axios.get(`${process.env.API_URL}/all-friendRequest/${accountData._id}`)
             .then((response)=>{
                  socket.emit('friendRequestList',{data:response.data.data,getterID:response.data.getterID})
             })
             .catch((error)=>{
                 console.log('เกิดข้อผิดพลาดกับ server')
             })


        })
        .catch((error)=>{
            console.log('เกิดข้อผิดพลาดทาง Sever')
        })
    }

    //ลบคำขอเป็นเพื่อน
    const handleRemoveRequest = async (event)=>{
        event.preventDefault()
        await axios.delete(`${process.env.API_URL}/remove-request`,{
            data:{senderID,getterID}
        })
        .then((response)=>{
            
            socket.emit('requestFriendship',{
                requester:senderID,
                recipient:getterID,
                status:null,
                roomIDGet:roomID
            })
  
            //ทำการอัพเดตไปที่ จำนวนการส่งคำขอ ณ Navbar Other
            axios.get(`${process.env.API_URL}/all-friendRequest/${accountData._id}`)
                .then((response)=>{
                      socket.emit('friendRequestList',{data:response.data.data,getterID:response.data.getterID})
                 })
                 .catch((error)=>{
                     console.log('เกิดข้อผิดพลาดกับ server')
                 })
       

        })
        .catch((error)=>{
            console.log('เกิดข้อผิดพลาดทาง Sever')
        })

    }

    //ยอมรับเป็นเพื่อน
    const handleAcceptRequest= async (event)=>{
        event.preventDefault()
         //เปลี่ยนสถานะเป็นเพื่อนใน DฺB
        await axios.put(`${process.env.API_URL}/accept-request`,{
            senderID,getterID
        })
        .then((response)=>{
            socket.emit('requestFriendship',{
                requester:senderID,
                recipient:getterID,
                status:response.data.status,
                roomIDGet:roomID
            })

            //ทำการอัพเดตไปที่ จำนวนการส่งคำขอ ณ Navbar Other
             axios.get(`${process.env.API_URL}/all-friendRequest/${accountData._id}`)
             .then((response)=>{
                  socket.emit('friendRequestList',{data:response.data.data,getterID:response.data.getterID})
             })
             .catch((error)=>{
                 console.log('เกิดข้อผิดพลาดกับ server')
             })



        })
        .catch((error)=>{
            console.log('เกิดข้อผิดพลาดทาง Sever')
        })

         //สร้างห้องสนทนาระหว่างเพื่อน กับเรา หลังจากเป็นเพื่อนแล้ว
         axios.post(`${process.env.API_URL}/create-chatmessege-room`,{
            senderID,getterID
        })
        .then((data)=>{
            //ห้องแชทหลังจากเป็นเพื่อนกัน ถูกสร้างแล้ว
        })
        .catch((error)=>{
            //สร้างไม่สำเร็จเนื่องจากเกิดความผิดพลาดกับ s
        })
    }

    //ลบสถานะการเป็นเพื่อนออก
    const handleRemoveFriendship= (event)=>{
        event.preventDefault()
        Swal.fire({
            icon:'warning',
            text:`คุณต้องการลบเพื่อนหรือไม่`,
            showCancelButton:true
        }).then(async (status)=>{
            if(status.isConfirmed){
                await axios.delete(`${process.env.API_URL}/remove-request`,{
                    data:{senderID,getterID}
                })
                .then((response)=>{

                    
                    socket.emit('requestFriendship',{
    
                        requester:senderID,
                        recipient:getterID,
                        status:null,
                        roomIDGet:roomID
                    })

                    //ทำการอัพเดตไปที่ จำนวนการส่งคำขอ ณ Navbar Other
                     axios.get(`${process.env.API_URL}/all-friendRequest/${accountData._id}`)
                    .then((response)=>{
                        socket.emit('friendRequestList',{data:response.data.data,getterID:response.data.getterID})
                     })
                    .catch((error)=>{
                        console.log('เกิดข้อผิดพลาดกับ server')
                     })

                      
                })
                .catch((error)=>{
                    console.log('เกิดข้อผิดพลาดทาง Sever')
                })
        
            }
        })
    }

    //เรียกดูสถานะความเป็นเพื่อน
    useEffect(()=>{
        axios.post(`${process.env.API_URL}/checking-request`,{
            senderID,getterID
        })
        .then((response)=>{
                setRequester(response.data.requester)
                setRecipient(response.data.recipient)
                setStatus(response.data.status)
        })
        .catch((error)=>{
            //เกิดข่อผิดพลาด
        })
    },[getterID])

  
    return(
    <div>
    {!status &&  
    <button onClick={handleSendingRequest}  className={'py-4 px-2 shadow-md bg-green-600 text-white w-full hover:bg-green-700'}>
                  + เพื่มเพื่อน
    </button>
    }
 {status === 'pending' && requester === senderID && recipient === getterID && 
    <button onClick={handleRemoveRequest}  className={'py-4 px-2 shadow-md bg-yellow-500 text-white w-full hover:bg-yellow-600'}>
                  กำลังส่งคำขอเป็นเพื่อน
    </button>
    }
          {status === 'pending' && recipient === senderID &&  requester === getterID && 
    <div className="flex gap-2 flex-wrap justify-center p-2 w-full">
    <button onClick={handleAcceptRequest} className={'py-4 w-full shadow-md bg-green-600 text-white hover:bg-green-700'}>
                  ยอมรับ
    </button>
    <button onClick={handleRemoveRequest}   className={'py-4 w-full  shadow-md bg-red-600 text-white hover:bg-red-700'}>
                  ปฎิเสธ
    </button>
    </div>
    }
     { status === 'accepted' && (recipient === senderID || recipient === getterID) && (requester === getterID || requester === senderID)?
    <div className="flex gap-2 flex-wrap justify-center p-2 w-full">
    <button onClick={handleRemoveFriendship}   className={'py-4 w-full shadow-md bg-green-600 text-white hover:bg-green-700'}>
                  เป็นเพื่อนกันแล้ว
    </button>
    
    <button onClick={()=>handleChatroomToggle(true,index>=0?index:null)} className={'py-4 w-full  shadow-md bg-blue-500 text-white hover:bg-blue-600'}>
                  ส่งข้อความ
    </button>
    </div>
    :
    <div>
    </div>
    }

    </div>

    )

}