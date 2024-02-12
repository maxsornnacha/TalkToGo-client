import Link from "next/link"
import UserDataFetching from '@/services/UserDataFetching'
import { useState,useEffect } from "react"

export default function Navbar(){
    const [userData,setUserData] = useState(null)


    useEffect(() => {
        const fetchData = async () => {
            if(UserDataFetching()){
          setUserData(await UserDataFetching());
        }
        };
    
        fetchData();
      }, []);

    return(
    <nav className="py-3 bg-gray-900 text-white flex justify-between">
        <div className="ms-5">
            <Link className="text-[1.8rem]" href='/'>
                TalkToGo
            </Link>
        </div>
        <ul className="mt-3 flex">
            <Link className="me-2" href='/'>Creating Room</Link>
            {userData && 
            <>
            <li className="me-2">{userData.accountData.username}</li>
            <li>ออกจากระบบ</li>
            </>
            }
        </ul>
    </nav>
    )
}