import { useEffect, useState} from "react"
import Link from "next/link"
import FileResizer from "react-image-file-resizer"
import axios from "axios"
import Swal from "sweetalert2"
import { io } from "socket.io-client"
import ReplyForm from "./ReplyForm"
import { useRouter } from "next/router"
const socket = io(process.env.API_SOCKET_URL)


export default function CommentForm(props){
    const router = useRouter()
    const [replyToggleForDisplay,setReplyToggleForDisplay] = useState(false)
    const [replyToggle,setReplyToggle] = useState(false)
    const [commentInput,setCommentInput] = useState('')
    const [commentImage,setCommentImage] = useState(null)
    const [commentData, setCommentData] = useState(props.postComments)
    


    useEffect(() => {
        setCommentData(props.postComments);
       
    }, [props.postComments]);



    const handleToggleForCancel=(event)=>{
        event.preventDefault()
        props.handleUpdateComment(props.postID,commentData)
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
                setCommentImage(url)
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
            title:`คุณต้องการที่จะอัพโหลดความคิดเห็นหรือไม่`,
            icon:'warning',
            showCancelButton:true
        }).then((status)=>{
            if(status.isConfirmed){
                
                axios.post(`${process.env.API_URL}/create-comment`,{
                    currentDate,currentTime,accountImage,firstname,lastname,accountID,postID,commentInput,commentImage
                })
                    .then(async ()=>{
                        Swal.fire({
                                icon: "success",
                             title: "อัพโหลดสำเร็จ"
                      }).then((status)=>{
                        if(status.isConfirmed){
                            setCommentInput('')
                            setCommentImage(null)

                        
                        //make it in real-time from client side    
                        socket.emit('commentData',
                        {currentDate,currentTime,accountImage,firstname,lastname,accountID,postID,commentInput,commentImage,likes:[],replies:[]}
                       ) 
                        socket.on('commentData',(commentData)=>{
                            setCommentData((prev)=>[...prev,commentData ])
                        
                         })
                        

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
     
     //แก้ถึงตรงนี้
     const handleRealtime=(index,currentDate,currentTime,accountImage,firstname,lastname,accountID,postID,commentID,replyInput,replyImage)=>{
              //make it in real-time from client side    
            socket.emit('replyData',
            {index,currentDate,currentTime,accountImage,firstname,lastname,accountID,postID,commentID,replyInput,replyImage}
            ) 

        setReplyToggleForDisplay(index)
                  
     }

     // Remember to clean up the event listener when the component unmounts
    useEffect(() => {

        const handdleOn = (replyData) => {
            setCommentData((comment) =>{
                const result =  comment.map((item)=>{
                    if(item.commentID === replyData.commentID){
                        return {...item, replies:[...item.replies,replyData]}
                    }else{
                        return item
                    }
                })

                return result  
           })
          }
          
          socket.on('replyData', handdleOn);

        // Clean up the event listener when the component unmounts
        return () => {
             socket.off('replyData', handdleOn);
        };

    
    }, [commentData]);





    return(
    <div>  
        <div>
        <form className="comment-form z-50">
            
            <div className=" w-full  flex border-b ">

            <div className="text-2xl text-end w-3/5">
                โพสต์ของ {props.post.firstname}
            </div>
            <div className="py-2 px-3  flex justify-end w-2/5">
            <div onClick={handleToggleForCancel} className="cursor-pointer">
                <img src="/cancel.png" className="w-8 h-8"/>
            </div>
            </div>
            </div>

            <div className="h-screen w-full overflow-auto">
                <div className="px-5 py-2 flex items-center gap-2">
                <Link href={`/profile/${props.post.accountID}`} >
                <img src={props.post.accountImage} className="w-10 h-10 rounded-full"/>
                </Link>
                <Link href={`/profile/${props.post.accountID}`} >
                <div className="flex flex-col justify-center items-center">
                <p className="text-[1.0rem]">{props.post.firstname} {props.post.lastname}</p>
                 <p className="inline-block  text-[1.0rem] px-1"><span className="text-[0.7rem] ">{props.post.currentTime} &nbsp;{props.post.currentDate}</span></p>
                 </div>
                 </Link>
                </div>
                
                <div className="px-5 py-2 text-[1.0rem]">
                    {props.post.content}
                </div>

                <div className="py-2">
                <img src={props.post.image} className="w-full h-70 "/>
                </div>

                <div className="pt-3 bg-white text-black col-span-12 flex flex-row justify-between items-center mx-5 border-b border-gray-300 pb-5">
                 <div className="flex flex-row w-52 items-center bg-white text-black">
                 <img className="bg-white inline-block me-2 h-6 w-6 lg:h-6 lg:w-6 ms-2  p-1 " src={'/like.png'}  alt="Profile picture"/>
                 <p className="bg-white text-black font-seimibold  text-[1.0rem] ">{props.like} Likes</p>
                 </div>
                 <span className="bg-white text-black text-[1.0rem]">
                     {commentData?commentData.length:0} <span className="bg-white text-black text-[1.0rem] cursor-pointer" onClick={()=>{}}>ความคิดเห็น</span>
                 </span>            
                 </div>
                
                {/* แสดงผล Comments */}
                {commentData && Array.isArray(commentData) &&
                <div className="mt-5 mb-10 px-5">
                { commentData.map((commentItem,index)=>{
                    return(
                    <div className="flex flex-row gap-2 mt-5 text-[1.0rem] flex-wrap" key={index}>
                        <div>
                             <img src={commentItem.accountImage} className="h-10 w-10 rounded-full"/>
                        </div>

                        <div className="w-80 flex flex-col gap-1">
                            <div className=" bg-gray-100 text-black p-2 rounded-md w-96 break-words">
                            <div>{commentItem.firstname} {commentItem.lastname}</div>
                            <div className=""> {commentItem.commentInput}</div>
                            </div>
                            
                            {commentItem.commentImage &&
                            <div>
                                <img src={commentItem.commentImage} className="rounded-md w-6/12" />
                            </div>
                            }

                            <div className="text-[0.8rem] flex gap-3">
                                <div>{commentItem.currentTime} - {commentItem.currentDate}</div>
                                <div><div className="cursor-pointer" onClick={()=>setReplyToggle(replyToggle===index?false:index)}>ตอบกลับ</div> </div>
                            </div>
                        
                            <div className="text-[0.8rem] flex flex-col">
                            {commentItem && commentItem.replies?.length > 0 && 
                            <div ><div className="cursor-pointer" onClick={()=>setReplyToggleForDisplay(replyToggleForDisplay===index?false:index)}>{replyToggleForDisplay===index?'ซ่อนการตอบกลับทั้งหมด':'ดูการตอบกลับทั้งหมด'}</div></div>
                            }
                            {/* แสดงรายการตอบกลับทั้งหมด */}
                            {replyToggleForDisplay === index && commentItem.replies &&
                            commentItem.replies.map((item,index)=>{
                                return(
                                <div className="flex gap-2 mb-2" key={index}>
                                    <div className={item.replyImage?'w-20':''}>
                                        <img src={item.accountImage} className="w-7 h-7 rounded-full"/>
                                    </div>

                                    <div>
                                    <div className="flex flex-col gap-1">
                                    <div className="bg-gray-100 text-black rounded-md p-2 flex flex-col gap-1 w-56 break-words">
                                        <div>{item.firstname} {item.lastname}</div>
                                        <div className="">{item.replyInput}</div>
                                    </div>
                                    {item.replyImage &&
                                    <div className="w-full bg-white">
                                        <img src={item.replyImage} className="rounded-md w-6/12" />
                                    </div>
                                    }
                                    </div>

                    

                                    <div className="flex flex-col gap-3">
                                        <div>{item.currentTime} - {item.currentDate}</div>
                                     </div>
                                     </div>
                                </div>
                                )
                            })
                            }
                            </div>

                        </div>
                        
                
                        {replyToggle === index &&
                        <div className="w-full" >
                                <ReplyForm index={index} accountData={props.accountData} commentItem={commentItem} postID={props.postID} handleRealtime={handleRealtime}/>
                        </div>
                         }
                    </div>
                    )
                })}
                </div>
                }

            </div>


            <div className="py-2 w-full border-t mt-2 flex flex-col">
                <div className={commentInput && commentInput.length>170?"px-5 py-2 flex gap-2":"px-5 py-2 flex gap-2 h-full"}>
                <Link href={`/profile/${props.accountData.id}`} >
                <img src={props.accountData.accountImage} className="w-10 h-10 rounded-full"/>
                </Link>
                <div className="w-full bg-gray-100 rounded-md">
                <textarea placeholder='เขียนความคิดเห็น...' onChange={(event)=>setCommentInput(event.target.value)} rows={commentInput && commentInput.length>170?7:2} value={commentInput} className="p-3 bg-gray-100 w-full outline-none text-[1.0rem] rounded-md"/>
                <div className="flex justify-between px-2 ">
                    <div className="flex gap-3">
                    <label htmlFor="image" className="cursor-pointer px-2 mt-1 pb-1">
                        <img src="/imageInput1.png" className="h-6 w-6"/>
                    </label>
                    <input onChange={handleFileUpload} className="hidden" id="image" type="file"/>
                    </div>
                    
                    <button onClick={handleSubmit} className="text-[1.0rem] p-1">
                        <img src="/submit.png" className={commentInput || commentImage?"h-8 w-8":"h-8 w-8 hidden"}/>
                    </button>
                </div>
                {commentImage &&
                    <div className="p-2 border-gray-400 border-dashed border bg-white flex justify-between">
                        <img src={commentImage} className="h-auto w-28"/>
                        <img onClick={()=>{setCommentImage(null)}} src="/close.png" className="h-3 w-3 cursor-pointer"/>
                    </div>
                }
                </div>

                </div>
        
            </div>

            </form>
        </div>
    </div>
    )
}