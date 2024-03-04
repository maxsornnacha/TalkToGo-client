import axios from "axios"
import { useEffect,useState } from "react"
import Swal from "sweetalert2"
import { io } from "socket.io-client"
const socket = io(process.env.API_SOCKET_URL)

export default function AddFriends({senderID,getterID,handleChatroomToggle,index}){
    const [requester,setRequester ] = useState(null)
    const [recipient,setRecipient] = useState(null)
    const [status,setStatus] = useState(null)
    

    //ส่งตำขอเป็นเพื่อน
    const handleSendingRequest= async (event)=>{
        event.preventDefault()

       await axios.post(`${process.env.API_URL}/making-request`,{
            senderID,getterID
        })
        .then((response)=>{
             socket.emit('requestFriendship',{requestData:response.data})

             socket.on('requestFriendship',(data)=>{
                setRequester(data.requestData.requester)
                setRecipient(data.requestData.recipient)
                setStatus(data.requestData.status)
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
            socket.emit('requestFriendship',{requestData:response.data})

            socket.on('requestFriendship',(data)=>{
               setRequester(data.requestData.requester)
               setRecipient(data.requestData.recipient)
               setStatus(data.requestData.status)
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
            socket.emit('requestFriendship',{requestData:response.data})

            socket.on('requestFriendship',(data)=>{
               setRequester(data.requestData.requester)
               setRecipient(data.requestData.recipient)
               setStatus(data.requestData.status)
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
            title:`คุณต้องการที่จะลบเพื่อนหรือไม่`,
            icon:'warning',
            showCancelButton:true
        }).then(async (status)=>{
            if(status.isConfirmed){
                await axios.delete(`${process.env.API_URL}/remove-request`,{
                    data:{senderID,getterID}
                })
                .then((response)=>{
                    alert(JSON.stringify(response.data))
                    socket.emit('requestFriendship',{requestData:response.data})
        
                    socket.on('requestFriendship',({requestData})=>{
                       
                       setRequester(requestData.requester)
                       setRecipient(requestData.recipient)
                       setStatus(requestData.status)
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
    <>
    {!status && 
    <button onClick={handleSendingRequest}  className={'py-4 px-2 shadow-md bg-green-600 text-white'}>
                  + เพื่มเพื่อน
    </button>
    }
 {status === 'pending' && requester === senderID && recipient === getterID &&
    <button onClick={handleRemoveRequest}  className={'py-4 px-2 shadow-md bg-green-600 text-white'}>
                  กำลังส่งคำขอเป็นเพื่อน
    </button>
    }
          {status === 'pending' && recipient === senderID &&  requester === getterID &&
    <div className="flex gap-2 flex-wrap justify-center p-2 w-full">
    <button onClick={handleAcceptRequest} className={'py-4 w-full shadow-md bg-green-600 text-white'}>
                  ยอมรับ
    </button>
    <button onClick={handleRemoveRequest}   className={'py-4 w-full  shadow-md bg-red-600 text-white'}>
                  ปฎิเสธ
    </button>
    </div>
    }
     {status === 'accepted' && (recipient === senderID || recipient === getterID) && (requester === getterID || requester === senderID)?
    <div className="flex gap-2 flex-wrap justify-center p-2 w-full">
    <button onClick={handleRemoveFriendship}   className={'py-4 w-full shadow-md bg-green-600 text-white'}>
                  เป็นเพื่อนกันแล้ว
    </button>
    
    <button onClick={()=>handleChatroomToggle(true,index>=0?index:null)} className={'py-4 w-full  shadow-md bg-blue-500 text-white'}>
                  ส่งข้อความ
    </button>
    </div>
    :
    <div>
    </div>
    }

 
    </>
    )
}