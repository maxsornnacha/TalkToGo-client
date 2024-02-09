import { useState} from "react";
import styles from "@/styles/home.module.css"
import Link from "next/link";
import Signup from "@/components/Signup";
import Signin from "@/components/Signin";

export default function Home() {
  const [toggleSign,setToggleSign] = useState('')
  const [cancelClick,setCancelClick] = useState(false)



  const handleCancel=(cancelResultFromChild)=>{
    setCancelClick(cancelResultFromChild)
  }

  const handleToggle=(toggleResultFromChild)=>{
    setToggleSign(toggleResultFromChild)
  }

  return (
    <main className="h-screen xl:grid lg:grid-cols-2 bg-gray-900 text-white">
          <div className="mx-10 flex flex-col flex-wrap my-20">
          <div className="flex flex-row mb-10">
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

        <div className="flex flex-row justify-center">
        <div className="animate-pulse mt-20">
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
  );

  }