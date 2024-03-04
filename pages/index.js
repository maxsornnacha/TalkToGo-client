import { useState,useEffect} from "react";
import styles from "@/styles/home.module.css"
import Link from "next/link";
import Signup from "@/components/Accounts/Signup";
import Signin from "@/components/Accounts/Signin";
import { useRouter } from "next/router";
import UserDataFetching from "@/services/UserDataFetching";
import Navbar from "@/components/Navbars/NavbarIndex";

export default function Home() {
  const redirect = useRouter()
  const [toggleSign,setToggleSign] = useState('')
  const [cancelClick,setCancelClick] = useState(false)


  const handleCancel=(cancelResultFromChild)=>{
    setCancelClick(cancelResultFromChild)
  }

  const handleToggle=(toggleResultFromChild)=>{
    setToggleSign(toggleResultFromChild)
  }

  useEffect(()=>{
    const fetching=async ()=>{
      if(await UserDataFetching()){
          redirect.push('/main')
      }
    }

    fetching()
  },[])

  return (
    <main>
      <Navbar/>
    <div className=" h-screen  md:flex md:flex-row bg-gray-900 text-white">
          <div className="md:h-full px-10 flex flex-col flex-wrap pt-20 md:self-center md:w-6/12 bg-gray-900">
          <div className="flex flex-row pb-10">
          <div className={styles.line}></div>
          <h1 className="text-2xl">WELCOME TO TALKTOGO</h1>
          </div>
              <div className="my-10">&nbsp;&nbsp;&nbsp;&nbsp;
                You need to sign in before joining our website. So, if you dont have an account, being a part of us by signing up here. Otherhand, 
                if you have an account already, please joine us by signing in
              </div>
              <Link href='/' className="menu-start" onClick={()=>{setToggleSign(1); setCancelClick(true)}}>SIGN IN</Link>
              <br/>
              <Link href='/' className="menu-start" onClick={()=>{setToggleSign(2); setCancelClick(true)}}>SIGN UP</Link>
          </div>



        <div className=" md:w-6/12 h-96 md:h-4/6 lg:h-full">
        <div className="flex flex-row justify-center items-center h-full bg-gray-900">
        <div className="animate-pulse">
              <div className={styles.world}></div>
        </div>
        </div>
        </div>

        </div>


      {toggleSign === 1 && cancelClick &&
        <div>
        <Signin cancel={handleCancel} toggle={handleToggle}/>
        </div> 
      }

      {toggleSign === 2 && cancelClick &&
        <div>
        <Signup cancel={handleCancel} toggle={handleToggle}/>
        </div> 
      }

    </main>
  )
  
}