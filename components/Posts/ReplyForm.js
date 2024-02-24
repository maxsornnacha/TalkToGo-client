import { useEffect, useState } from "react"
import Link from "next/link"
import FileResizer from "react-image-file-resizer"
import Swal from "sweetalert2"
import axios from "axios"
import { io } from "socket.io-client"
const socket = io(process.env.API_SOCKET_URL)
 
export default function Reply(props){
    const [replyInput,setReplyInput] = useState('')
    const [replyImage,setReplyImage] = useState(null)



     //Base64 convert Image and store in the var
     const handleFileUploadForReplyImage=(event)=>{
        const file = event.target.files[0]
        FileResizer.imageFileResizer(
            file, // Is the file of the image which will resized.
            720, // Is the maxWidth of the resized new image.
            720, // Is the maxHeight of the resized new image.
            "JPEG", // Is the compressFormat of the resized new image.
            100, // Is the quality of the resized new image.
            0, // Is the degree of clockwise rotation to apply to uploaded image.
            (url)=>{
                setReplyImage(url)
            }, // Is the callBack function of the resized new image URI.
            "base64", // Is the output type of the resized new image.
          );
     }  


     const handleSubmit= async (event)=>{
        event.preventDefault()

        const accountImage = props.accountData.accountImage
        const firstname = props.accountData.firstname
        const lastname = props.accountData.lastname
        const accountID = props.accountData.id
        const postID = props.postID
        const commentID = props.commentItem.commentID

        const dateNow = new Date()
        const currentDate = dateNow.toLocaleDateString()
        let hours = dateNow.getHours()
        const minutes = dateNow.getMinutes()
        const AMPM = hours>= 12 ? 'PM':'AM'

        //converts 24 Hours to 12 hour time
        hours = await hours % 12
        hours = await hours?hours:12; //in case that its midnight time like 00:00
        const currentTime = `${hours}:${minutes<10?`0${minutes}`:minutes} ${AMPM}`

     

        Swal.fire({
            title:`คุณต้องการที่จะตอบกลับหรือไม่`,
            icon:'warning',
            showCancelButton:true
        }).then((status)=>{
            if(status.isConfirmed){
                
                axios.post(`${process.env.API_URL}/create-reply`,{
                    currentDate,currentTime,accountImage,firstname,lastname,accountID,postID,commentID,replyInput,
                    replyImage:replyImage
                
                })
                    .then(async ()=>{
                        Swal.fire({
                                icon: "success",
                             title: "อัพโหลดสำเร็จ"
                      }).then((status)=>{
                        if(status.isConfirmed){
                            setReplyInput('')
                            setReplyImage(null)

                            props.handleRealtime(props.index,currentDate,currentTime,accountImage,firstname,lastname,accountID,postID,commentID,replyInput,replyImage)

                        }
                      })
                     })
                     .catch((error)=>{
                        console.log(error)
                        Swal.fire({
                            icon: "error",
                            title: "เกิดข้อผิดพลาด",
                            text: 'ไม่สามารถอัพโหลดได้ เนื่องจากเซิร์ฟเวอร์ทำงานล้มเหลว'
                     });
                     })
            }

        })


     }


    return(
    <div className="w-full">
        

        <div className="py-2 w-full border-t mt-2 flex flex-col">
                <div className={replyInput && replyInput.length>170?"px-5 py-2 flex gap-2":"px-5 py-2 flex gap-2 h-full"}>
                <Link href={`/profile/${props.accountData.id}`} >
                <img src={props.accountData.accountImage} className="w-7 h-7 rounded-full"/>
                </Link>
                <div className="w-full bg-gray-100 rounded-md">
                <textarea placeholder='เขียนความคิดเห็น...' onChange={(event)=>setReplyInput(event.target.value)} rows={replyInput && replyInput.length>170?7:1} value={replyInput} className="w-full p-3 bg-gray-100 w-full outline-none text-[0.75rem] rounded-md"/>
                <div className="flex justify-between px-2 ">
                    <div className="flex gap-3">
                    <label htmlFor="image" className="cursor-pointer px-2 mt-1 pb-1">
                        <img src="/imageInput1.png" className="h-6 w-6"/>
                    </label>
                    <input onChange={handleFileUploadForReplyImage} className="hidden" id="image" type="file"/>
                    </div>
                    
                    <button onClick={handleSubmit} className="text-[0.9rem] p-1">
                        <img src="/submit.png" className={replyInput || replyImage?"h-8 w-8":"h-8 w-8 hidden"}/>
                    </button>
                </div>
                {replyImage &&
                    <div className="p-2 border-gray-400 border-dashed border bg-white flex justify-between">
                        <img src={replyImage} className="h-auto w-28"/>
                        <img onClick={()=>{setReplyImage(null)}} src="/close.png" className="h-3 w-3 cursor-pointer"/>
                    </div>
                }
                </div>

                </div>
        
            </div>
    </div>
    )
}