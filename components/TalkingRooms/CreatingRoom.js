import { useState } from "react";
import FileResizer from 'react-image-file-resizer'
import axios from "axios";
import Swal from "sweetalert2";

export default function CreatingRoom({handleCreatingRoomClose,userData}){
    const [roomData,setRoomData] = useState({
        roomName : '',
        roomDescription : ''
    })

    const [roomIcon,setRoomIcon] = useState(null)

    const {roomName,roomDescription} = roomData

    const handleRoomName = (event)=>{

        if(roomName.length <= 30 || event.nativeEvent.inputType === "deleteContentBackward"){
    
        setRoomData((prev)=>{
            return ({
                roomName:event.target.value,
                roomDescription:prev.roomDescription,
            })
        })
         }else{
                event.preventDefault(); 
         }
    }

    
    const handleRoomDescription = (event)=>{
        if(roomDescription.length <= 65 || event.nativeEvent.inputType === "deleteContentBackward"){
        setRoomData((prev)=>{
            return ({
                roomName:prev.roomName,
                roomDescription:event.target.value,
            })
        })
         }else{
            event.preventDefault(); 
         }
    }

     //Base64 convert Image and store in the var
     const handleFileUpload=(event)=>{
        const file = event.target.files[0]
        FileResizer.imageFileResizer(
            file, // Is the file of the image which will resized.
            720, // Is the maxWidth of the resized new image.
            720, // Is the maxHeight of the resized new image.
            "JPEG", // Is the compressFormat of the resized new image.
            100, // Is the quality of the resized new image.
            0, // Is the degree of clockwise rotation to apply to uploaded image.
            (url)=>{
                setRoomIcon(url)
            }, // Is the callBack function of the resized new image URI.
            "base64", // Is the output type of the resized new image.
          );
     }

    const handleSubmit=(event)=>{
        event.preventDefault()

        console.table({roomName,roomDescription,roomIcon,userID:userData.accountData._id})

        Swal.fire({
            icon:'question',
            text:`คุณต้องการสร้างห้องพูดคุยหรือไม่`,
            showCancelButton:true
        }).then((status)=>{
            if(status.isConfirmed){
                if(roomName === ''){
                    Swal.fire({
                        icon: "error",
                        title: "เกิดข้อผิดพลาด",
                       text: 'กรุณาใส่ชื่อห้อง'
                 });
                }
                else{
                    axios.post(`${process.env.API_URL}/create-talkingroom`,{roomName,roomDescription,roomIcon,userID:userData.accountData._id})
                    .then(async ()=>{

                        Swal.fire({
                            icon: "success",
                             title: "สำเร็จ",
                             text: "สร้างห้องสำเร็จ",
                             showConfirmButton: false,
                             timer: 1500
                      }).then(()=>{ 
                            location.reload(true)           
                      })
                     })
                     .catch((error)=>{
                        console.log(error)
                        Swal.fire({
                            icon: "error",
                            title: "เกิดข้อผิดพลาด",
                            text:error.response.data.error
                     });
                     })
                }
            }
        })

    }

    


    return(
    <div className="creating-chatroom px-4 z-50">
        <div className="w-full flex justify-end pe-2 border-b ">
        <div className="py-4 text-center  w-full text-[1.6rem]">สร้างห้องพูดคุย</div>
        </div>

        <div className="text-center mt-4 text-[0.9rem]">
            สร้างตัวตนให้ห้องพูดคุยใหม่ของคุณด้วยชื่อ รายละเอียดและไอคอน สามารถเปลี่ยนได้ในภายหลัง
        </div>
        
        <div className="flex flex-col items-center w-full">
            {roomIcon ?
            <label htmlFor="room-icon" className="cursor-pointer flex flex-col items-center ">
                <img src={roomIcon} className="h-28 w-28 m-4 rounded-full"/>
            </label>
            :
            <label htmlFor="room-icon" className="cursor-pointer flex flex-col items-center border-4 border-gray-900 border-dashed m-4 p-5 rounded-full">
                    <img src="/camera.png" className="w-8 h-8 "/>
                    <div className="font-semibold">UPLOAD</div> 
            </label>
            }
            <input onChange={handleFileUpload}  id="room-icon" className="hidden" type="file"/>
        </div>

        <div className="flex flex-col gap-1 w-full">
            <label className="text-[0.8rem]">ชื่อห้อง <span className="text-gray-500">จำเป็น</span></label>
            <input onChange={handleRoomName} value={roomName} type="text" className={`${roomName === ''?'border-red-500':''} focus:border-yellow-300 focus:border-2 outline-none border border-gray-400 p-1 rounded-sm`}/>
        </div>

        <div className="flex flex-col gap-1 w-full">
            <label className="text-[0.8rem]">รายละเอียด</label>
            <textarea onChange={handleRoomDescription} value={roomDescription} type="text" rows={3} className="focus:border-yellow-300 focus:border-2 outline-none border border-gray-400 p-1 rounded-sm"/>
        </div>

        <div className="mt-10 flex justify-between w-full border-t pt-3">
            <button className="hover:text-gray-600" onClick={()=>{handleCreatingRoomClose(false);}} >ยกเลิก</button>
            <button onClick={handleSubmit} className="bg-gray-900 text-white hover:bg-black px-8 py-2 rounded-sm">สร้างห้อง</button>
        </div>
    </div>
    )
}