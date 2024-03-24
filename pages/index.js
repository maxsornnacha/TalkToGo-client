import { useEffect} from "react";
import Link from "next/link";
import Signin from "@/components/Accounts/Signin";
import { useRouter } from "next/router";
import UserDataFetching from "@/services/UserDataFetching";

export default function Home() {
  const redirect = useRouter()

  useEffect(()=>{
    const fetching=async ()=>{
      if(await UserDataFetching()){
          redirect.push('/main')
      }
    }

    fetching()
  },[])

  return (
    <div>
    <div className="lg:hidden bg-gray-900 text-gray-100 min-h-screen w-screen p-5 h-auto flex flex-col items-center ">

        <Link href='/' className="cursor-pointer my-10">
          <img src="/logo.png" alt="home" className="h-26 w-24 pb-3"/>
        </Link>

        <div className="flex flex-row justify-center w-full">
          <h1 className="text-[1.8rem] mb-10">WELCOME TO 
          <span className="ps-2 text-[2.4rem] text-yellow-100">
           TALKTOGO
          </span>
          </h1>
        </div>

          <div>
            <Signin/>
          </div>
    </div>


    <div className="hidden lg:grid bg-gray-900 text-gray-100 min-h-screen w-screen p-5 h-auto grid-cols-12">
    <div className="col-span-6 flex flex-col p-20 items-end ">
    <Link href='/' className="cursor-pointer my-10 flex items-center gap-3">
    <img src="/logo.png" alt="home" className="h-26 w-24 pb-3"/>
    <div className="text-[2.5rem] text-yellow-100">
       TALKTOGO
      </div>
    </Link>

    <div>
      <img src="/cat.png" className="w-96 h-96"/>
    </div>
    </div>

    <div className="col-span-6 flex py-56">
     <Signin/>
    </div>
    </div>

    </div>
  )
  
}