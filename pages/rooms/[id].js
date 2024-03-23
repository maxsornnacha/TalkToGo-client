import MenuBarOnLeft from "@/components/Menus/MenuBarOnLeft"
import Navbar from "@/components/Navbars/NavbarOther"
import { useState,useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import Link from "next/link"
import UserDataFetching from "@/services/UserDataFetching"
import Notfound from "@/components/404"

export default function Rooms(){
    const [userLogin,setUserLogin] = useState(null)
    const [accountData,setAccountData] = useState(null)
    const [menuToggle,setMenuToggle] = useState(false)
    const [talkingrooms,setTalkingrooms] = useState(null)
    const [inputValue,setInputValue] =  useState('')
    const [dataFiltered,setDataFiltered] = useState(null)

    const router = useRouter()
    const {id} = router.query

     //fetching my account Data
     useEffect(() => {
        const fetchData = async () => {
          setUserLogin(await UserDataFetching());   

        if(!(await UserDataFetching())){
            router.push('/')
          }
        };
        fetchData();
      }, [id]);
   
    const fetchData = async () => {
        await axios.get(`${process.env.API_URL}/signle-account-data/${id}`)
        .then( (response)=>{
        setAccountData(()=>{
            return {'accountData':response.data}
        })

      }).catch((error)=>{
      })
    };

    
    useEffect(() => {
        if(userLogin){
            if (id === userLogin.accountData.id) {
            fetchData();
        }
        }
      
        },[userLogin]);

    const handleMenuToggle=(toggleData)=>{
        setMenuToggle(toggleData)
      }
      
      
      useEffect(()=>{

        const fetchTalkingRooms =()=>{
            if(accountData){
            axios.post(`${process.env.API_URL}/all-talkingrooms`,{userID:(accountData.accountData._id)})
            .then((response)=>{
                setTalkingrooms(response.data)
            })
            .catch((error)=>{
                console.log(error.response.data)
            })
            }
         }
    
        fetchTalkingRooms()
        
    },[accountData])


    const handleSearch = async (event)=>{
        event.preventDefault()
        await setDataFiltered((talkingrooms).filter((room)=>{

            return (
            (`${room.roomName}`).toLowerCase().includes(inputValue.toLowerCase())
            )
        }))
        if(inputValue === ''){
            setDataFiltered(null)
        }
    }
    
    if(userLogin && accountData){
        //เช็คว่าล็อคอินรึยัง ล็อคอินตรงกันมั้ย
        if(id === userLogin.accountData.id ){

            return(
                <div>
                <div className="sticky top-0 z-50 shadow-md">
                  <Navbar userData={accountData} menuToggle={handleMenuToggle} menuStatus={menuToggle}/>
                </div>
            
                <div className="grid grid-cols-12">
            
                    {accountData &&
                        <div className='col-span-12 hidden md:block lg:block md:col-span-3 lg:col-span-3 bg-gray-800 sticky top-14 h-screen'>
                            <MenuBarOnLeft  userData={accountData} />
                        </div>
                    }
            
                    {menuToggle &&
                        <div className="md:hidden fixed w-full top-12 col-span-12 lg:col-span-6">
                             <MenuBarOnLeft userData={accountData} />
                         </div>
                    }
            
            {accountData &&
            <div className="md:col-span-9 col-span-12 bg-gray-100 pb-4 min-h-screen h-auto">
            
                <div className="p-5 mb-2 text-[2.5rem] text-center"> ห้องสำหรับพูดคุย</div>
                <div className="flex justify-center text-[1.2rem] mb-10">
                        <input placeholder="ค้นหาชื่อห้องสำหรับพูดคุย" value={inputValue} onChange={(event)=>setInputValue(event.target.value)} type="text" className="p-1 rounded-sm w-6/12 outline-none focus:border focus:border-yellow-500"/>
                        <button onClick={handleSearch} className="p-1 px-3 bg-gray-900 text-white  hover:bg-gray-700">ค้นหา</button>
                </div>
            
                <div className="grid grid-cols-12" >
            
                {/* responsive on Md ++  ยังไม่ได้ค้นหา */}
                {talkingrooms && !dataFiltered &&
                talkingrooms.map((room,index)=>{
                return (
                <div className="hidden md:block col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 m-2 rounded-md border border-gray-200 bg-white" key={index}>
                    <div className="flex justify-center p-2 pt-6">
                    <img src={room.roomIcon?room.roomIcon:'/black-background.jpg'} className="h-32 w-32 rounded-full"/>
                    </div>
                    <div className="flex flex-col gap-2 p-2 rounded-b-md h-62 w-full pb-10">
                        <div className="text-[1.1rem]  break-words h-20 self-center w-52 text-center">
                            {room.roomName}
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className="bg-blue-300 p-2 rounded-md w-full">เชิญเพื่อน</button>
                            <Link  href={`/rooms/talking-room/${room.slug}`} className="text-center bg-yellow-300 p-2 rounded-md w-full">เข้าห้อง</Link>
                        </div>
                    </div>
                </div>
                )
                })
                }
            
                {/* responsive on Md ++  ค้นหาแล้วเจอ */}
                {talkingrooms && dataFiltered &&
                dataFiltered.map((room,index)=>{
                return (
                <div className="hidden md:block col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 m-2 rounded-md border border-gray-200 bg-white" key={index}>
                    <div className="flex justify-center p-2 pt-6">
                    <img src={room.roomIcon?room.roomIcon:'/black-background.jpg'} className="h-32 w-32 rounded-full"/>
                    </div>
                    <div className="flex flex-col gap-2 p-2 rounded-b-md h-62 w-full pb-10">
                        <div className="text-[1.1rem]  break-words h-20 self-center w-52 text-center">
                            {room.roomName}
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className="bg-blue-300 p-2 rounded-md w-full">เชิญเพื่อน</button>
                            <Link  href={`/rooms/talking-room/${room.slug}`} className="text-center bg-yellow-300 p-2 rounded-md w-full">เข้าห้อง</Link>
                        </div>
                    </div>
                </div>
                )
                })
                }
            
             
                {/* responsive on Mobile ยังไม่ได้ค้นหา */}
            
                {talkingrooms && !dataFiltered &&
                talkingrooms.map((room,index)=>{
                return (
                <div className="md:hidden col-span-12 flex justify-evenly items-center gap-2 mb-3 border border-gray-200 bg-white px-2 " key={index}>
                    <img src={room.roomIcon?room.roomIcon:'/black-background.jpg'} className="h-32 w-32 rounded-full"/>
             
                    <div className=" flex flex-col gap-2 p-2 rounded-b-md w-56">
                        <div className="text-[1.1rem] break-words">{room.roomName}</div>
                        <div className="flex flex-col gap-2">
                            <button className="bg-blue-300 p-2 rounded-md w-full">เชิญเพื่อน</button>
                            <Link  href={`/rooms/talking-room/${room.slug}`} className="text-center bg-yellow-300 p-2 rounded-md w-full">เข้าห้อง</Link>
                        </div>
                    </div>
                </div>
                )
                })
                }
            
                {/* responsive on Md ++  ค้นหาแล้วเจอ */}
                {talkingrooms && dataFiltered &&
                dataFiltered.map((room,index)=>{
                return (
                <div className="md:hidden col-span-12 flex justify-evenly items-center gap-2 mb-3 border border-gray-200 bg-white px-2 ms-1" key={index}>
                    <img src={room.roomIcon?room.roomIcon:'/black-background.jpg'} className="h-32 w-32 rounded-full"/>
             
                    <div className="w-96 flex flex-col gap-2 p-2 rounded-b-md w-72">
                        <div className="text-[1.1rem] break-words">{room.roomName}</div>
                        <div className="flex flex-col gap-2">
                            <button className="bg-blue-300 p-2 rounded-md w-full">เชิญเพื่อน</button>
                            <Link  href={`/rooms/talking-room/${room.slug}`} className="text-center bg-yellow-300 p-2 rounded-md w-full">เข้าห้อง</Link>
                        </div>
                    </div>
                </div>
                )
                })
                }
            
                    {/* responsive all  ค้นหาไม่เจอ */}
                {dataFiltered && dataFiltered.length === 0 &&
                    <div className="col-span-12 h-screen">  
                    <div className="flex justify-center pt-56">
                        <div className="text-[1.2rem]">ไม่พบห้องที่กำลังค้นหา</div>
                    </div>
                    </div>
                }
                
            
                {talkingrooms && talkingrooms.length === 0 &&
                         <div className="col-span-12 w-full  py-5 min-h-screen h-auto">
                           <div className='h-screen bg-gray-100  w-full text-gray-500 flex justify-center pt-56'>
                                <div className='text-[1.5rem]'>ยังไม่มีห้องสำหรับพูดคุย</div>
                         </div>
                         </div>
                }
            
                </div>
            </div>
            }
            
            </div>
                </div>
                )

        }else{
            return <Notfound/>
        }

    }
}