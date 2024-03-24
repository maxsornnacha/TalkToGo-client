import { useState,useEffect } from "react"
import { useRouter } from "next/router"
import UserDataFetching from '@/services/UserDataFetching'
import Navbar from "@/components/Navbars/NavbarOther"
import MenuBarOnLeft from "@/components/Menus/MenuBarOnLeft"
import RoomsOnMain from "@/components/TalkingRooms/RoomsOnMain"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faVolumeLow , faVolumeXmark, faMicrophone, faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import Requests from "@/components/TalkingRooms/Requests"
import Notfound from "@/components/404"
import Swal from "sweetalert2"
import { io } from "socket.io-client"
const socket = io(process.env.API_SOCKET_URL)


export default function talkingroom(){
    const [userData,setUserData] = useState(null)
    const [menuToggle,setMenuToggle] = useState(false)
    const [room,setRoom] = useState(null)
    const [admins,setAdmins] = useState(null)
    const [participants,setParticipants] = useState(null)
    const [roomPermission,setRoomPermission] = useState(false)
    const [micOnOff,setMicOnOff] = useState(true)
    const [speakerOnOff, setSpeakerOnOff] = useState(true)
    const [invite,setInvite] = useState(false)
   
    const router = useRouter()
    const {slug} = router.query

    //fetching my account Data
    useEffect(() => {
        const fetchData = async () => {
          setUserData(await UserDataFetching());   

        if(!(await UserDataFetching())){
            router.push('/')
          }
        };
        fetchData();
      }, []);

    //fetching signle Talkingroom
    useEffect(()=>{
      if(slug && userData){
        const fetchData = ()=>{
          axios.post(`${process.env.API_URL}/get-single-talkingroom`,{slug})
          .then((response)=>{
             setRoom(response.data)
             setRoomPermission(response.data.admins.includes(userData.accountData._id) || response.data.participants.includes(userData.accountData._id))
          })
          .catch((error)=>{
            setRoom('notfound')
          })
          }
      
        fetchData()
      }
       

    },[slug,userData])

    //fetching admins and participant
    useEffect(()=>{
      if(room){
        const fetchData = ()=>{
          axios.post(`${process.env.API_URL}/get-all-members`,{members:room.admins})
          .then((response)=>{
             setAdmins(response.data)
          })
          .catch((error)=>{
              console.log(error.response.data)
          })

          axios.post(`${process.env.API_URL}/get-all-members`,{members:room.participants})
          .then((response)=>{
             setParticipants(response.data)
          })
          .catch((error)=>{
              console.log(error.response.data)
          })

          }
      
        fetchData()
      }
       
    },[room])


    // handle toggle for navbar less than md
    const handleMenuToggle=(toggleData)=>{
        setMenuToggle(toggleData)
      }

    //handleCopyLink
    const handleCopyLink=(link)=>{
      navigator.clipboard.writeText(link)
      .then(()=>{
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


    //อัพเดต สมาชิคห้อง หลังจากรับ สมาชิคเข้าห้อง แบบ Real-time
    useEffect(()=>{
        const handleUpdateRoomAfterNewMemberJoining = ({roomID,roomData}) =>{

           if(roomID === room._id){
              setRoom(roomData)
           }
           
        }

        socket.on('room-update-after-accepted',handleUpdateRoomAfterNewMemberJoining)

        return ()=>{
          socket.off('room-update-after-accepted',handleUpdateRoomAfterNewMemberJoining)
        }

    },[room])
    
    if(typeof room === 'object' && userData){
    return (
    <div>
    <div className="sticky top-0 z-50 shadow-md">
      <Navbar userData={userData} menuToggle={handleMenuToggle} menuStatus={menuToggle}/>
    </div>

    {menuToggle &&
            <div className="md:hidden fixed w-full top-12 col-span-12 lg:col-span-6">
                 <MenuBarOnLeft userData={userData} />
             </div>
    }

    {roomPermission && room ?
    //เป็นสมาชิคแล้ว
    <div className="grid grid-cols-12">

    {/* ห้องทั้งหมดที่เป็นสมาชิค section 1 */}
    <div className="col-span-1 w-full hidden lg:block bg-gray-900 z-20 h-screen">
            <RoomsOnMain userData={userData} />
    </div>


    {/* ห้องทั้งหมดที่เป็นสมาชิค section 2 */}
    <div className="col-span-2 w-full hidden lg:block bg-gray-800 z-10">
    <div className="pt-4 text-gray-100 h-screen w-full flex flex-col justify-between">
 
        <div>
        <div className="shadow-gray-900 shadow-md ps-4 pb-4 font-bold break-words pe-2">{room.roomName.length>15?room.roomName.slice(0,20)+'...':room.roomName}</div>
  
        <div className="my-4 px-2 text-gray-400">
        <div className="flex justify-between items-center">
          <div className="font-bold text-[0.8rem]">
            ช่องข้อความ
          </div>
          <button className="text-[1.5rem] font-bold">
            +
          </button>
        </div>
        {room.chatrooms.map((chatroom,index)=>{
          return (
          <button key={index}>
              {chatroom.roomName}
          </button>
          )
        })}
        </div>

        <div className="my-4 px-2 text-gray-400">
        <div className="text-[0.8rem] flex justify-between items-center">
          <div>
            ช่องสำหรับพูดคุย
          </div>
          <button className="text-[1.5rem]">
            +
          </button>
        </div>
        {room.talkingrooms.map((talkingroom,index)=>{
          return (
          <button key={index}>
              {talkingroom.roomName}
          </button>
          )
        })}
        </div>
        </div>

        <div className="py-2 px-2 text-black border-l-2 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <Link href={`/profile/${userData.accountData.id}`}>
            <img src={userData.accountData.accountImage} className="w-9 h-9 rounded-full"/>
            </Link>
            <Link href={`/profile/${userData.accountData.id}`}>
            <div className="text-[0.8rem] font-bold">{userData.accountData.firstname} {userData.accountData.lastname}</div>
            </Link>
          </div>

          <div className="flex gap-4 items-center">
          { micOnOff?
          <FontAwesomeIcon className="cursor-pointer" icon={faMicrophone} onClick={()=>setMicOnOff(false)}/>
          :
          <FontAwesomeIcon className="cursor-pointer" icon={faMicrophoneSlash} onClick={()=>setMicOnOff(true)} />
          }
          {speakerOnOff?
          <FontAwesomeIcon className="cursor-pointer" icon={faVolumeLow} onClick={()=>setSpeakerOnOff(false)}/>
          :
          <FontAwesomeIcon className="cursor-pointer" icon={faVolumeXmark} onClick={()=>setSpeakerOnOff(true)} />
          }
          </div>
        </div>

    </div>
    </div>

        {/* แชท Messages display section 3 */}
        <div className="col-span-7 h-screen bg-gray-700">
        </div>

         {/* แสดงสมาชิค section 4 */}
         <div className="hidden lg:block col-span-2 h-screen bg-gray-800">

         <div className="flex justify-between items-center p-1 shadow-gray-900 shadow-md pt-4 ps-4 pb-4 font-bold break-words pe-2 text-white">
            <div> สมาชิค</div>
            <button onClick={()=>setInvite(invite?false:true)} className="text-[1.5rem]"> + </button>
        </div>

        <div>
           <div className="my-4 px-2 text-gray-400 flex flex-col gap-8">

          <div>
          <div className="font-bold text-[0.8rem] mb-3">
                  ADMIN - {room.admins.length}
          </div>
          {admins &&
          admins.map((admin,index)=>{
          return (
          <div key={index} className="flex gap-2 items-center mb-2">
              <Link href={`/profile/${admin.id}`}>
              <div><img src={admin.accountImage} className="w-9 h-9 rounded-full"/></div>
              </Link>
              <Link href={`/profile/${admin.id}`}>
              <div>{admin.firstname} {admin.lastname}</div>
              </Link>
          </div>
          )
          })}
          </div>

          <div>
          <div className="font-bold text-[0.8rem] mb-3">
                  MEMBER - {room.participants.length}
          </div>
          {participants &&
          participants.map((participant,index)=>{
          return (
          <div key={index} className="flex gap-2 items-center mb-2">
              <Link href={`/profile/${participant.id}`}>
              <div><img src={participant.accountImage} className="w-9 h-9 rounded-full"/></div>
              </Link>
              <Link href={`/profile/${participant.id}`}>
              <div>{participant.firstname} {participant.lastname}</div>
              </Link>
          </div>
          )
          })}
          </div>


            </div>  
        </div>
    </div>

    {/* เชิญเพื่อน */}
    {invite &&
    <div className="invite-card ">
    <div className="flex flex-col justify-between h-full w-full">
      <div >
          <div className="border-b w-full pb-3 text-[1.5rem] text-center">
             เชิญเพื่อนเข้าร่วม
          </div>

          <div className="w-full h-full flex flex-col justify-center items-center ">
             <input className="w-5/6 bg-gray-100 border mb-1 py-1 rounded-md" 
            // ต้องแก้เมื่ออัพ ลงเว็บไซด์}
             value={`http://localhost:3000/rooms/talking-room/${slug}`}/>
          </div>
      </div>

      <div className="flex justify-between items-center w-full px-4">
             <button onClick={()=>setInvite(false)} className="hover:bg-gray-100 px-3 py-1 rounded-md">ย้อนกลับ</button>
             {/* ต้องแก้เมื่ออัพ ลงเว็บไซด์ */}
              <button onClick={()=>handleCopyLink(`http://localhost:3000/rooms/talking-room/${slug}`)} className="px-2 py-1 bg-gray-700  hover:bg-gray-800 text-white rounded-md">คัดลอกลิงค์</button>
      </div>
    </div>
    </div>
    }
    </div>
    :
    //ยังไม่ได้เป็นสมาชิคในกลุ่ม
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-56 gap-8">
        {room && 
        <img src={room.roomIcon} className="w-56 h-56 rounded-full"/>
        }
        <div className="text-[1.2rem] md:text-[2rem] text-center p-3">คุณ {userData?`'${userData.accountData.firstname} ${userData.accountData.lastname}'`:'Unknown'} ยังไม่ได้เป็นสมาชิคในกลุ่มของห้อง {room?`'${room.roomName}'`:'Unknown'}</div>
        {room && userData && 
        <Requests accountID={userData.accountData._id} roomID={room._id}/>
        }       
      
    
    </div>
    }   
    </div>
    )

  }else if(room === 'notfound'){
    return <Notfound/>
  }
}