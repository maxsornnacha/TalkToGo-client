import axios from "axios"
import { useEffect,useState } from "react"

export default function AddFriends({senderID,getterID}){
    const [requester,setRequester ] = useState(null)
    const [recipient,setRecipient] = useState(null)
    const [status,setStatus] = useState(null)


    const handSendingRequest=()=>{
        axios.post(`${process.env.API_URL}/making-request`,{
            senderID,getterID
        })
        .then((response)=>{
            setRequester(response.data.requester)
            setRecipient(response.data.recipient)
            setStatus(response.data.status)
        })
        .catch((error)=>{
            console.log('error.response.data.error')
        })
    }

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
    <button onClick={handSendingRequest}  className={'py-4 px-2 shadow-md bg-green-600 text-white'}>
                  + เพื่มเพื่อน
    </button>
    }
    {status === 'pending' && requester === senderID && 
    <button  className={'py-4 px-2 shadow-md bg-green-600 text-white'}>
                  กำลังส่งคำขอเป็นเพื่อน
    </button>
    }
     {status === 'pending' && recipient === senderID && 
    <div>
    <button   className={'py-4 px-6 shadow-md bg-green-600 text-white me-2'}>
                  ยอมรับ
    </button>
    <button   className={'py-4 px-6 shadow-md bg-red-600 text-white'}>
                  ปฎิเสธ
    </button>
    </div>
    }
    {status === 'accepted' && 
    <button  className={'py-4 px-2 shadow-md bg-green-600 text-white'}>
                  เป็นเพื่อนกันแล้ว
    </button>
    }
    </>
    )
}