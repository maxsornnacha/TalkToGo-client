import Image from "next/image"
import { useState,useEffect,useRef } from "react"
import axios from "axios"
import { io } from 'socket.io-client'
const socket = io(process.env.API_SOCKET_URL)

export default function Chatroom({senderData,getterData,handleCloseChat}){
    const [sender,setSender] = useState(senderData)
    const [getter,setGetter] = useState(getterData)
    const [isDragging,setIsDragging] = useState(false)
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    
      //handle Dragging
      useEffect(() => {
        const handleMouseMove = (e) => {
          if (isDragging) {
            const x = e.clientX - offset.x;
            const y = e.clientY - offset.y;
            setPosition({ x, y });
          }
        };
    
        const handleMouseUp = () => {
          setIsDragging(false);
        };
    
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
      }, [isDragging, offset]);

      const handleMouseDown = (e) => {
        setIsDragging(true);
        setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
      };


      //hadle message fetching and real-time sending
      const [inputMsg,setInputMsg] = useState('')
      const [msgData,setMsgData] = useState([])
      const [roomID,setRoomID] = useState(null)

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

    useEffect(()=>{
        fetching()
    },[])

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
        const handleMessage = ({ message }) => {
            setMsgData((prev) => {
              return [...prev, message];
            });
          };

        // Listen for 'message' event only once
        socket.on('message', handleMessage);

         // Cleanup function to remove the event listener when the component unmounts
        return () => {
         socket.off('message', handleMessage);
  };
    },[])
    
    return(
    <>
          
        <div 
        id="movableCard"
        className={`chat-card p-0 m-0 ${isDragging?'dragging':''}`}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        onMouseDown={handleMouseDown}
        >

            <div className="w-full flex justify-end pe-3 pt-2 mb-2 bg-yellow-200 border-yellow-300 border">
                <button className=" pb-3" onClick={()=>handleCloseChat(false)} ><img src={'/close.png'} className='w-6 h-6 bg-red-400 p-1 rounded-full'/></button>
            </div>

            <div className="pb-3 flex w-full gap-2 items-center ps-3">
                 <img src={getter.accountImage} className="w-10 h-10 rounded-full"/>
                <div>
                    <div>{getter.firstname} {getter.lastname}</div>
                </div>
            </div>
           

            <div className="h-5/6 bg-gray-200  w-full overflow-y-auto scrollbar-hide">
            <div className="flex flex-col pb-5 px-1">
            
            {msgData &&
            <div ref={chatboxRef} className="chat-box-profile bg-gray-200 overflow-y-auto scrollbar-hide w-full">
            <div className="flex flex-col pb-5 px-1 w-full">
            {msgData.map((data)=>{
                return (
                data.senderID !== senderData.accountData._id ?
                // the other person
                <div className="flex gap-2 mt-2" key={data._id}>
                <div className =' bg-gray-200 text-black mt-4 pt-4 bg  flex items-end'>
                    <img src={getter.accountImage} className="rounded-full inline w-11 h-11 " height={30} width={30} alt="pofile's picture"/>
                </div>
                <div className="w-64 px-5 bg-white  text-black text-[1rem] pt-4 break-words  rounded-tl-3xl rounded-br-3xl">
                    {data.content}
                <div className="bg-white text-black text-end">{todayDate === convertDate?`${convertDate(data.timestamp)} -`:''} {convertTime(data.timestamp)}</div>
                </div>
                </div>
                : //Me
                <div className="flex justify-end col-span-10 bg-gray-200 mt-2" key={data._id}>
                <div className="w-64 px-5 bg-blue-200 text-black text-[1rem] pt-4 break-words rounded-tr-3xl rounded-bl-3xl">
                    {data.content}
                <div className="bg-blue-200 text-black text-end">{todayDate === convertDate?`${convertDate(data.timestamp)} -`:''} {convertTime(data.timestamp)}</div>
                </div>
                <div className =' bg-gray-200 text-black ms-2 mt-4 pt-4 bg col-span-2 flex items-end'>
                    <Image src={sender.accountData.accountImage} className="rounded-full inline w-11 h-11" height={30} width={30} alt="pofile's picture"/>
                </div>
                </div>
                )
            })}
            </div>
            </div>
            }
       


                {/* me */}
              
                <div className="flex justify-end col-span-10 bg-gray-200 mt-2">
                <div className="w-64 px-5 bg-blue-200 text-black text-[1rem] pt-4 break-words rounded-tr-3xl rounded-bl-3xl">
                    hfjsdkfshdkjfshdfjsdkhfsdjhfsdkjfhsdkjfhsdkjfhsdkjfhsdkjfhsfsdsdfsdfsdffsdfsdfsdfsddfsdfsdsdfsdfsddfsdfsdfsdsdfsdfsdsdfsdfsdffsdfsdfsddhgdfhfghgfhfsdfsdfsdfdsfsdf
                <div className="bg-blue-200 text-black text-end">11.50 PM</div>
                </div>
                <div className =' bg-gray-200 text-black ms-2 mt-4 pt-4 bg col-span-2 flex items-end'>
                    <Image src={sender.accountData.accountImage} className="rounded-full inline w-11 h-11" height={30} width={30} alt="pofile's picture"/>
                </div>
                </div>

                <div className="flex justify-end col-span-10 bg-gray-200 mt-2">
                <div className="w-64 px-5 bg-blue-200 text-black text-[1rem] pt-4 break-words rounded-tr-3xl rounded-bl-3xl">
                    hfjsdkfshdkjfshdfjsdkhfsdjhfsdkjfhsdkjfhsdkjfhsdkjfhsdkjfhsfsdsdfsdfsdffsdfsdfsdfsddfsdfsdsdfsdfsddfsdfsdfsdsdfsdfsdsdfsdfsdffsdfsdfsddhgdfhfghgfhfsdfsdfsdfdsfsdf
                <div className="bg-blue-200 text-black text-end">11.50 PM</div>
                </div>
                <div className =' bg-gray-200 text-black ms-2 mt-4 pt-4 bg col-span-2 flex items-end'>
                    <Image src={sender.accountData.accountImage} className="rounded-full inline w-11 h-11" height={30} width={30} alt="pofile's picture"/>
                </div>
                </div>
                
            </div>
            </div>
               

            <div className=" flex justify-start pt-3 w-full px-1">
            <input value={inputMsg} onChange={(event)=>setInputMsg(event.target.value)} type="text" className="w-5/6 mx-2 py-2 ps-2 text-[1.2rem] outline-none border border-2 rounded" placeholder="message"/> 
            <span>
            <label htmlFor="photoChat" >
                <img className="mt-2 w-11 h-10 rounded-full" src={'/imageInput.png'}  alt="Image Input"/>
            </label>
            <input type="file" name="photoChat" id='photoChat' hidden={true}/>
            </span>
            <button onClick={handleSendMsg} className="bg-gray-200 px-5 my-2 ms-2 text-black rounded-md">ส่ง</button>
            </div>
  
        </div>
        
    </>
    )
}