import AllFriendList from "@/components/Friends/AllFriendList"
import MenuBarOnLeft from "@/components/Menus/MenuBarOnLeft"
import Navbar from "@/components/Navbars/NavbarOther"
import { useState,useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import UserDataFetching from "@/services/UserDataFetching"
import Notfound from "@/components/404"

export default function Friends(){
    const [userLogin,setUserLogin] = useState(null)
    const [accountData,setAccountData] = useState(null)
    const [menuToggle,setMenuToggle] = useState(false)
    const [allFriendsData,setAllFriendsData] = useState([])
    const [inputValue,setInputValue] = useState('')
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

        const friendDataUpdate=(data)=>{
          setAllFriendsData(data)
        }
      
        //filter for searching
      const handleSearch=async (event)=>{
          event.preventDefault()
          await setDataFiltered((allFriendsData).filter((account)=>{

              return (
              (`${account.firstname} ${account.lastname}`).toLowerCase().includes(inputValue.toLowerCase())
              ||
              account.username.toLowerCase().includes(inputValue.toLowerCase())
              )
          }))
          if(inputValue === ''){
              setDataFiltered(null)
          }
     
  }

        
      const handleMenuToggle=(toggleData)=>{
        setMenuToggle(toggleData)
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
        <div className="md:col-span-9 col-span-12 bg-gray-100">
            <div className="p-5 text-[2.5rem] text-center"> รายชื่อเพื่อนของฉัน</div>
        <div className="flex justify-center text-[1.2rem]">
            <input placeholder="กรุณาใส่รายชื่อหรือใช่ผู้ใช้งาน" value={inputValue} onChange={(event)=>setInputValue(event.target.value)} type="text" className="p-1 rounded-sm w-6/12 outline-none focus:border focus:border-yellow-500"/>
            <button onClick={handleSearch} className="p-1 px-3 bg-gray-900 text-white  hover:bg-gray-700">ค้นหา</button>
        </div>
         <AllFriendList dataFiltered={dataFiltered} friendDataUpdate={friendDataUpdate} handleDataFiltered={dataFiltered}  accountLogin={accountData} accountID={accountData.accountData._id} /> 
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