import Image from "next/image"
import { useState,useEffect, useRef } from "react"
import axios from "axios"
import { io } from 'socket.io-client'
import Link from "next/link"
import { isURL } from "@/modules/modules"
const socket = io(process.env.API_SOCKET_URL)
import Swal from "sweetalert2"

export default function ChatroomProfile({senderData,getterData,handleCloseChat}){
    const [sender,setSender] = useState(null)
    const [getter,setGetter] = useState(null)
    const [inputMsg,setInputMsg] = useState('')
    const [msgData,setMsgData] = useState([])
    const [roomID,setRoomID] = useState(null)

     //จัดการ real-time handling
    //เริ่มทำการสร้างห้องโดยใช้ id ของทั้ง 2 accounts เป็นอ้างอิงเลขห้องแชท
    useEffect(()=>{
        socket.emit('joinRoom',{  
            senderID:senderData.accountData._id,
            getterID:getterData._id,
        })
        socket.on('joinRoom',({roomID})=>{
            setRoomID(roomID)
        })
    },[sender,getter])

      //ดึงข้อมูล ข้อความทั้งหมด  + เปลี่ยนข้อความเป็น อ่านแล้ว เมื่อ message getter เข้าร่วมห้องแชท
      useEffect(()=>{
        fetching()
        setGetter(getterData)
        setSender(senderData)
    },[])
    //update chat to current scrolling part
    const chatboxRef = useRef(null);

     // useEffect to scroll down when the component mounts or when new messages are added
     useEffect(() => {
    // Function to scroll to the bottom
    const scrollToBottom = () => {
      if (chatboxRef.current) {
        chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
      }
    };  
    // Scroll to the bottom when the component mounts
    scrollToBottom();
    // Scroll to the bottom whenever msgData changes (new messages are added)
    scrollToBottom();
    }, [msgData]);

    //Module for convert timestamp 
    //Today's date
    const todayDate=()=>{
        const todayDate = new Date();
        // Extract date s
        const datePart = todayDate.toISOString().split("T")[0];
        return datePart
    }

    //date Part
    const convertDate=(time)=>{
        const dateObject = new Date(time);
        // Extract date s
        const datePart = dateObject.toISOString().split("T")[0];

        return datePart
    }
    //time Part
    const convertTime=(time)=>{
        const dateObject = new Date(time);
        // Extract time 
        const timePart = dateObject.toLocaleTimeString([], { hour12: true, hour: '2-digit', minute: '2-digit'});

        return timePart
    }


    const fetching=()=>{
        axios.post(`${process.env.API_URL}/get-message`,{
            senderID:senderData.accountData._id,
            getterID:getterData._id,
        })
        .then((response)=>{
            setMsgData(response.data.messages)
        })
        .catch(()=>{
            //เกิดข้อผิดพลาดกับ server ดึงข้อมูลไม่สำเร็จ
        })
    }

    
    
     //ต้องแยกเพราะ userData ที่ emit ไปจะเป็น คนละ getter Data
    //จัดการการ อ่านข้อความ เมื่อส่งข้อความ แล้วอีกฝ่ายอยู่ในอยู่ในแชท
    const handleReadMessageWhenSendingMsg= async (data)=>{
   
        axios.post(`${process.env.API_URL}/read-message`,{
            senderID:senderData.accountData._id,
            getterID:getterData._id,
        })
        .then((response)=>{
            setMsgData(response.data.messages);
             //ทำการส่ง message realtime ผ่าน socket โดยใช้ roomIDเป็นตัวแบ่งห้อง
             if(roomID || data){
             socket.emit('updateMsg',{roomIDGet:roomID?roomID:data,messagesAll:response.data.messages})          
             }

            //เรียกใช้งาน อัพเดตแชท ใน meesenger
            //อัพเดตไปที่ messenger
            axios.get(`${process.env.API_URL}/all-messages/${getterData._id}`)
            .then((response)=>{
                //สามารถเขียน Logic ตรงนี้เพื่อกรองหาแชทที่ไม่ได้อ่าน
                if(response.data && getterData){
                    const  filteredIsnotRead = (response.data).filter((chatBox,index)=>{
    
                        const filter = chatBox.messages.filter((message) => {
                            return message.senderID !== getterData._id && message.isRead === false
                        });
    
                        return (filter.length > 0)
                    })
                    socket.emit('allMessages',{data:response.data, newUnreadMessages:filteredIsnotRead.length, userID:getterData._id})
                }
            })
            .catch((error)=>{
                console.log('เกิดข้อผิดพลาดกับ server')
                console.log(error)
            })
        })
        .catch(()=>{
            //เกิดข้อผิดพลาดกับ server ดึงข้อมูลไม่สำเร็จ
        })
       
   
    }

    //ต้องแยกเพราะ userData ที่ emit ไปจะเป็น คนละ sender Data
    const handleReadMessageWhenJoining = ()=>{
        axios.post(`${process.env.API_URL}/read-message`,{
            senderID:senderData.accountData._id,
            getterID:getterData._id,
        })
        .then((response)=>{
            setMsgData(response.data.messages);
             //ทำการส่ง message realtime ผ่าน socket โดยใช้ roomIDเป็นตัวแบ่งห้อง
             if(roomID || data){
             socket.emit('updateMsg',{roomIDGet:roomID?roomID:data,messagesAll:response.data.messages})          
             }

        //เรียกใช้งาน อัพเดตแชท ใน meesenger

        //อัพเดตไปที่ messenger เมื่อข้อความถูกส่งเฉยๆ
        axios.get(`${process.env.API_URL}/all-messages/${senderData.accountData._id}`)
        .then((response)=>{
            //สามารถเขียน Logic ตรงนี้เพื่อกรองหาแชทที่ไม่ได้อ่าน
            if(response.data && getterData){
                console.log(response.data)
                const  filteredIsnotRead = (response.data).filter((chatBox,index)=>{

                    const filter = chatBox.messages.filter((message) => {
                        return message.senderID !== senderData.accountData._id && message.isRead === false
                    });
                  

                    return (filter.length > 0)
                })
                socket.emit('allMessages',{data:response.data, newUnreadMessages:filteredIsnotRead.length, userID:senderData.accountData._id})
            }
        })
        .catch((error)=>{
            console.log('เกิดข้อผิดพลาดกับ server')
            console.log(error)
        })
           
        })
        .catch(()=>{
            //เกิดข้อผิดพลาดกับ server ดึงข้อมูลไม่สำเร็จ
        })
    }

    //อ่านเมื่อมีการส่งข้อความ แล้วฝั่ง message getter ได้อยู่ในห้องแชทอยู่
   
    //จะทำงาน เมื่ออีกฝ่ายเข้าห้อง
    useEffect(()=>{
        if(roomID){
            handleReadMessageWhenJoining()

           const handleUpdate = ({messagesAll})=>{
            setMsgData(messagesAll);
           }

            //จะทำงาน เมื่อส่งข้อความแล้ว อีกฝ่ายได้อยู่ใน chatRoom
             socket.on('updateMsg', handleUpdate)

             return ()=>{
                socket.off('updateMsg', handleUpdate)
             }
        }
    },[roomID])

    //จัดการการส่งข้อความลงใน DB
    const handleSendMsg=(event)=>{
        event.preventDefault()

        axios.put(`${process.env.API_URL}/send-message`,{
            senderID:senderData.accountData._id,
            getterID:getterData._id,
            message:inputMsg
        })
        .then((response)=>{
            setInputMsg('')
    
            //ทำการส่ง message realtime ผ่าน socket โดยใช้ roomIDเป็นตัวแบ่งห้อง
            socket.emit('sendMsg',{roomIDGet:roomID,message:response.data[response.data.length-1]})
        })
        .catch(()=>{
            alert('เกิดข้อผิดพลาด ส่งข้อความไม่สำเร็จ')
        })
    }

    useEffect(()=>{
    const handleMessage = async ({roomIDGet, message }) => {
   
            await setMsgData((prev) => {

              return [...prev, message];
            });
            //ทำการใช้งาน อ่านข้อความ เพื่อเช็คว่าอีกฝั่งอยู่ในแชทรึป่าว
            await handleReadMessageWhenSendingMsg(roomIDGet) 
          };  

        socket.on('message', handleMessage);
        
         // Cleanup function to remove the event listener when the component unmounts
        return () => {
         socket.off('message', handleMessage);    
    };
    },[])


    //แก้อยู่ตรงนี้นะ 
    useEffect(() => {
        const handleUpdateMsg = ({ messagesAll }) => {
            setMsgData(messagesAll);
        };
      
        socket.on('updateMsg', handleUpdateMsg);
      
        return () => {
          socket.off('updateMsg', handleUpdateMsg);
        };
      }, []);

    const handleCloseChatToggle=()=>{
        setSender(null)
        setGetter(null)
        setInputMsg('')
        setMsgData([])
        setRoomID(null); 
        handleCloseChat(false); 
    }

    const handleDoubleClickCopy=(message)=>{
        navigator.clipboard.writeText(message)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    text:"คัดลอกลิงค์สำเร็จ", 
                    showConfirmButton: false,
                    timer: 1500
                  })
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    text:"คัดลอกลิงค์ไม่สำเร็จ",
                    showConfirmButton: false,
                    timer: 1500
                  })
            });
    }
    
    
    return(
  
    <div className="w-full m-0 p-0 chat-card-profile">
        <div className="bg-white pt-2 w-full">
    {getter && sender &&
            <div className="flex justify-between items-center">
            <div className="pb-3 flex  p-1 ps-3 gap-2 items-center">
                <Link href={`/profile/${getter.id}`}>
                 <img src={getter.accountImage} className="w-10 h-10 rounded-full"/>  
                </Link>
                <div>
                <Link href={`/profile/${getter.id}`}>
                    <div>{getter.firstname} {getter.lastname}</div>
                </Link>
                </div>
            </div>
            <button className="pe-2" onClick={handleCloseChatToggle} ><img src={'/close.png'} className='w-7 h-7 bg-red-400 p-1 rounded-full'/></button>
            </div>  
    }

            {msgData && getter && sender &&
            <div ref={chatboxRef} className="chat-box-profile bg-gray-200 overflow-y-auto scrollbar-hide w-full">
            <div className="flex flex-col pb-5 px-1 w-full">
            {msgData.map((data)=>{
                return (
                data.senderID !== senderData.accountData._id ?
                // the other person
                <div className="flex gap-2 mt-2" key={data._id}>
                <div className =' bg-gray-200 text-black mt-4 pt-4 bg  flex items-end'>
                    <Link href={`/profile/${getter.id}`}>
                    <img src={getter.accountImage} className="rounded-full inline w-11 h-11 " height={30} width={30} alt="pofile's picture"/>
                    </Link>
                </div>
                <div onDoubleClick={()=>handleDoubleClickCopy(data.content)} className="w-64 px-5 bg-white  text-black text-[1rem] pt-4 break-words  rounded-tl-3xl rounded-br-3xl">
                    {isURL(data.content)?<a className="text-green-700" target="_blank"  href={data.content}>{data.content}</a>:data.content}
                <div className="bg-white text-black text-end pt-3">{todayDate === convertDate?`${convertDate(data.timestamp)} -`:''} {convertTime(data.timestamp)}</div>
                </div>
                </div>
                : //Me
                <div className="flex justify-end col-span-10 bg-gray-200 mt-2" key={data._id}>
                <div onDoubleClick={()=>handleDoubleClickCopy(data.content)} className="w-64 px-5 bg-blue-200 text-black text-[1rem] pt-4 break-words rounded-tr-3xl rounded-bl-3xl">
                    {isURL(data.content)?<a className="text-green-700" target="_blank"  href={data.content}>{data.content}</a>:data.content}
                <div className="bg-blue-200 text-black text-end pt-3">{data.isRead?'อ่านแล้ว':'ยังไม่อ่าน'} {todayDate === convertDate?`${convertDate(data.timestamp)} -`:''} {convertTime(data.timestamp)}</div>
                </div>
                <div className =' bg-gray-200 text-black ms-2 mt-4 pt-4 bg col-span-2 flex items-end'>
                    <Link href={`/profile/${sender.accountData.id}`}>
                    <Image src={sender.accountData.accountImage} className="rounded-full inline w-11 h-11" height={30} width={30} alt="pofile's picture"/>
                    </Link>
                </div>
                </div>
                )
            })}
            </div>
            </div>
            }
        
            <div className=" flex justify-start pt-3 pe-2">
            <input value={inputMsg} onChange={(event)=>setInputMsg(event.target.value)} type="text" className=" m-2 w-5/6 py-2 ps-2 text-[1.2rem] outline-none border border-2 rounded" placeholder="message"/> 
            <span>
            <label htmlFor="photoChat" >
                <img className="mt-4 w-8 h-8 rounded-md" src={'/imageInput.png'} height={50} width={50} alt="Image Input"/>
            </label>
            <input type="file" name="photoChat" id='photoChat' hidden={true}/>
            </span>
            <button onClick={handleSendMsg} className={`bg-gray-200 px-5 my-2 ms-2 text-black rounded-md ${inputMsg===''?'hidden':''}`}>ส่ง</button>
            </div>
    </div>
    </div>
    )
}