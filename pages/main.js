import WorldChat from "@/components/Chats/Chats"
import WorldPost from "@/components/Posts/WorldPost"
import { useRouter } from "next/router"
import { useEffect,useState } from "react"
import UserDataFetching from '@/services/UserDataFetching'
import MenuBarOn from "@/components/Menus/MenuBarOnLeft"
import Navbar from "@/components/Navbars/NavbarOther"
import MenuBarOnRight from "@/components/Menus/MenuBarOnRight"


export default function main(){
    const redirect = useRouter()
    const [userData,setUserData] = useState(null)
    const [menuToggle,setMenuToggle] = useState(false)


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


    return(
    <div>
      <div className="sticky w-full top-0 z-50">
        <Navbar userData={userData} menuToggle={handleMenuToggle} menuStatus={menuToggle}/>
      </div>
     
      
    {userData?
    <div className="grid grid-cols-12 gap-0 bg-gray-900">
        
                <div className="col-span-3 w-full h-screen hidden md:block lg:block">
                    <div className="fixed  top-18 w-3/12 bg-white h-screen">
                    <MenuBarOn  userData={userData} />
                    </div>
                </div>

                {menuToggle &&
                <div className="lg:hidden fixed w-full top-9 col-span-12 lg:col-span-6">
                <MenuBarOn  userData={userData} />
                 </div>
                }
                <div className="col-span-12 md:col-span-9 lg:col-span-6">
                    <WorldPost userData={userData}/>
                </div>

                <div className="w-3/12 fixed right-2 top-20 px-3 col-span-3 h-screen overflow-auto overflow-hidden hover:overflow-scroll hidden lg:block">
                    <MenuBarOnRight userData={userData}/>
                </div>

    </div> 
    :
    <div className="h-screen flex flex-col justify-center items-center">
         <div>You have not signed in, please sign in ......</div>
         <div>We are redirecting you to the login page</div>
    </div>
    }
    </div>
    )
    
}