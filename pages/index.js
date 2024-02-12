import { useState,useEffect} from "react";
import styles from "@/styles/home.module.css"
import Link from "next/link";
import Signup from "@/components/Signup";
import Signin from "@/components/Signin";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter()
  const [toggleSign,setToggleSign] = useState('')
  const [cancelClick,setCancelClick] = useState(false)


  const handleCancel=(cancelResultFromChild)=>{
    setCancelClick(cancelResultFromChild)
  }

  const handleToggle=(toggleResultFromChild)=>{
    setToggleSign(toggleResultFromChild)
  }



  return (
    <main className="index-container h-screen md:grid md:grid-cols-2 bg-gray-900 text-white">
          <div className="px-10 flex flex-col flex-wrap py-20 bg-gray-900 md:col-span-1">
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

        <div className="flex flex-row justify-center items-center bg-gray-900 pb-4 md:col-span-1">
        <div className="animate-pulse pt-20">
              <div className={styles.world}></div>
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