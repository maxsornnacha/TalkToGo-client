import WorldChat from "@/components/Chats/Chats"
import WorldPost from "@/components/Posts/WorldPost"
import { useRouter } from "next/router"
import { useEffect,useState } from "react"
import UserDataFetching from '@/services/UserDataFetching'
import MenuBarOn from "@/components/Menus/MenuBarOnLeft"
import Navbar from "@/components/Navbars/NavbarOther"
import MenuBarOnRight from "@/components/Menus/MenuBarOnRight"
import RoomsOnMain from "@/components/TalkingRooms/RoomsOnMain"


export default function main(){
    const redirect = useRouter()
    const [userData,setUserData] = useState(null)
    const [menuToggle,setMenuToggle] = useState(false)
    const [closeChatToggle, setCloseChatToggle] = useState(true)


    useEffect(() => {
      const fetchData = async () => {
        setUserData(await UserDataFetching());   

      if(!(await UserDataFetching())){
          redirect.push('/')
        }
      };

      fetchData();
    }, []);


      const handleMenuToggle=(toggleData)=>{
        setMenuToggle(toggleData)

      }
    
  //เช็คว่าได้ Login เข้ามารึยัง
  if( userData ){
    return (
      <div>
        <div className="sticky top-0 z-50 shadow-md z-10">
          <Navbar userData={userData} menuToggle={handleMenuToggle} menuStatus={menuToggle}/>
        </div>
         
          <div className="grid grid-cols-12 gap-0 bg-gray-800">
    
            <div className="col-span-1 w-full hidden lg:block bg-gray-900 pb-22 z-10">
              <div className="sticky top-20 pt-4 text-gray-100 h-screen ">
                <div className="text-gray-100 text-center  text-[1.1rem] hidden xl:block   font-bold mb-4">ห้องพูดคุย</div>
                <RoomsOnMain userData={userData} />
              </div>
            </div>
            
            <div className="lg:col-span-2 w-full md:col-span-3 hidden md:block lg:block px-2">
              <div className="sticky top-24 w-full text-gray-100 h-screen overflow-auto">
                <div className="text-gray-100 text-start ms-3 text-[1.1rem]  font-bold mb-4">เมนู</div>
                <MenuBarOn userData={userData} />
              </div>
            </div>
    
            {menuToggle &&
              <div className="md:hidden fixed w-full top-12 col-span-12 lg:col-span-6">
                <MenuBarOn userData={userData} />
              </div>
            }
    
            <div className="col-span-12 md:col-span-9 lg:col-span-9 2xl:col-span-7">
              <WorldPost userData={userData}/>
            </div>
    
            <div className="2xl:col-span-2 hidden 2xl:block bg-gray-100">
              <div className="w-auto fixed right-2 top-24 px-3 h-screen overflow-auto overflow-hidden hover:overflow-scroll">
                <MenuBarOnRight userData={userData}/>
              </div>
            </div>
    
          </div> 
     
      </div>
    );

  }else{
    return(
    <div className="h-screen bg-gray-900"></div>
    )


  }

    
    
}