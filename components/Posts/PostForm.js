import { useState } from "react"
import axios from 'axios'
import Swal from "sweetalert2"
import Image from "next/image"
import FileResizer from "react-image-file-resizer"
import { useRouter } from "next/router"
import Link from "next/link"



export default function Postform(props){
    const redirect =useRouter()
    const [imageToggle,setImageToggle] = useState(false)
    const [content,setContent] = useState('')
    const [image,setImage] = useState(null)

    const handleToggleForCancel=(event)=>{
        event.preventDefault()
        props.toggleCancel(false)
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
                    setImage(url)
                }, // Is the callBack function of the resized new image URI.
                "base64", // Is the output type of the resized new image.
              );
         }
    

    const handleSubmitForm=async (event)=>{
        event.preventDefault()
        const id = props.accountData.id
        const firstname = props.accountData.firstname
        const lastname = props.accountData.lastname
        const accountImage = props.accountData.accountImage
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
            text:`คุณต้องการอัพโหลดโพสต์หรือไม่`,
            icon:'question',
            showCancelButton:true
        }).then((status)=>{
            if(status.isConfirmed){
                if(content.length !== 0){
                    axios.post(`${process.env.API_URL}/create-post`,{content,firstname,lastname,accountImage,currentDate,currentTime,image,id})
                    .then(async ()=>{

                        Swal.fire({
                            icon: "success",
                            title:"สำเร็จ",
                            text: "อัพโหลดโพสต์สำเร็จ",
                            showConfirmButton: false,
                            timer: 1500
                      }).then(()=>{
                            location.reload(true)
     
                      })
                     })
                     .catch((error)=>{
                        Swal.fire({
                            icon: "error",
                            title: "เกิดข้อผิดพลาด",
                            text:error.response.data.error
                     });
                     })
           
                }else{
                    Swal.fire({
                        icon: "error",
                        title: "เกิดข้อผิดพลาด",
                        text: 'กรุณาใส่เนื้อหาก่อนโพสต์'
                 });
                }
            }
        })
    }

    return (
    <div>
        <div> 
            <form className="post-form z-50 p-2" onSubmit={handleSubmitForm}>
            
            <div className=" w-full flex border-b">

            <div className="text-2xl text-end w-3/5">
                สร้างโพสต์
            </div>
            <div className="py-2 px-3  flex justify-end w-2/5">
            <div onClick={handleToggleForCancel} className="cursor-pointer">
                <img src="/cancel.png" className="w-8 h-8"/>
            </div>
            </div>
            </div>

        
            <div className="mt-2 flex items-center gap-2  w-full ms-10">
                <Link href={`/profile/${props.accountData.id}`}>
                <img src={props.accountData.accountImage} className="w-11 h-11 rounded-full"/>
                </Link>
                <div>
                    {props.accountData.firstname} {props.accountData.lastname}
                </div>
            </div>


            <div className="w-full flex flex-col items-center h-screen md:h-60 lg:h-96  overflow-auto"> 
            <div className="w-full mt-5 px-5 ">
                <textarea value={content} onChange={(event)=>setContent(event.target.value)}  className={content && content.length>150?"w-full outline-none text-[0.9rem] lg:h-80 ":"w-full outline-none text-[1.2rem] lg:h-80"} rows={7} placeholder={`คุณคิดอะไรอยู่ ${props.accountData.firstname}`}/>
            </div>

            {imageToggle &&
            <div className="w-full flex flex-col items-center my-2">
            <div className="w-5/6">
            <div className="w-full py-2 flex justify-end border-t border-gray-300">
                <button onClick={()=>{setImageToggle(false); setImage(null)}}>
                    <img src="/cancel.png" className="h-6 w-6 "/>
                </button>
            </div>
                <label htmlFor='image'>
                {!image?
                <div  className="cursor-pointer py-24 border border-gray-400 w-full text-center">
                    เพิ่มรูปภาพ
                    <div className="text-[0.8rem]">คลิ๊กเพื่อเพิ่มรูปภาพ</div>
                </div>
                :
                <div  className="cursor-pointer p-2 border border-gray-400 w-full flex justify-center">
                    <Image src={image} height={300} width={400} alt="uploaded image"/>
                </div>
                }
                </label>
                <input className="hidden" id="image" type="file" onChange={handleFileUpload}/>
            </div>
            </div>
            }
            </div>   

            <div className="w-full flex justify-center my-2">
                <div className="w-full m-2">
                <div onClick={()=>setImageToggle(imageToggle?false:true)} htmlFor="images" className={imageToggle?"cursor-pointer rounded-sm py-2 px-2 w-full  border border-gray-400 flex items-center justify-between bg-black text-white":"cursor-pointer rounded-sm py-2 px-2 w-full border border-gray-400 flex items-center justify-between"}>
                    <div>{imageToggle?'กรุณาใส่รูปภาพด่านล่างเนื้อหาของคุณ':'เพิ่มรูปภาพลงไปในโพสของคุณ'}</div>
                    <img src="/imageInput.png" className={imageToggle?"h-10 w-10 rounded-md":"h-10 w-10 bg-white rounded-md"}/>
                </div>
                </div>
            </div>

            <div className="w-full flex justify-center">
                <div className="w-full m-2">
                <button className="w-full py-3 bg-yellow-500 text-white ">
                    โพสต์
                </button>
                </div>
            </div>
         


           
            </form>
        </div>
    </div>
    )
}