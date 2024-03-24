import { useState } from "react"
import axios from 'axios'
import Swal from "sweetalert2"
import { useRouter } from "next/router"
import Signup from "@/components/Accounts/Signup";


export default function Signin(props){
    const [loadingAPI,setLoadingAPI] = useState()
    const router = useRouter();


    const [signInInput,setSignInInput] = useState({
        emailInput:'',
        passwordInput:''
    })

    const {emailInput,passwordInput} = signInInput

    const handleEmailInput=(event)=>{
        setSignInInput((prev)=>{
           return({
            emailInput:event.target.value,
            passwordInput:prev.passwordInput
           }) 
        })
    }

    const handlePasswordInput=(event)=>{
        setSignInInput((prev)=>{
            return({
             emailInput:prev.emailInput,
             passwordInput:event.target.value
            }) 
         })
    }

    const handleSubmitForm=(event)=>{
        event.preventDefault()
        axios.post(`${process.env.API_URL}/login-account`,{emailInput,passwordInput},{
            withCredentials: true,
        })
        .then(async (response)=>{
             
             //หน้าต่าง login สำเร็จ
             Swal.fire({
                icon: "success",
                title: "สำเร็จ",
                text: response.data.status,
                showConfirmButton: false,
                timer: 1500
              }).then(()=>{
                //เมื่อกดตกลง จะเข้าหน้าหลัก
               router.push('/main')
              })
        })
        .catch((error)=>{
            try {
                Swal.fire({
                    icon: "error",
                    title:"เกิดข้อผิดพลาด",
                    text:error.response.data.error?error.response.data.error:'เกิดข้อผิดพลาดกับ เซิร์ฟเวอร์',  
                  });
            } catch (error) {
                console.log('เข้าสู่ระบบผิดพลาดเนื่องจาก :',error)
                Swal.fire({
                    icon: "error",
                    title:"เกิดข้อผิดพลาด",
                    text:'เกิดข้อผิดพลาดกับ เซิร์ฟเวอร์',  
                  });
            }
        })
        .finally(()=>setLoadingAPI(false))
    }



    //handle Signup 

    const [toggleSignUp,setToggleSign] = useState(false)
    const [cancelClick,setCancelClick] = useState(false)
  
  
    const handleCancel=(cancelResultFromChild)=>{
      setCancelClick(cancelResultFromChild)
    }
  
    const handleToggle=(toggleResultFromChild)=>{
      setToggleSign(toggleResultFromChild)
    }

    return (
    <div>
        <div>
                   
            <div className="bg-white w-[90vw] sm:w-[400px] mb-10 rounded-md"> 
       

            <div className=" flex flex-col items-center p-5 w-full">

                <div className=" text-black text-[2rem] mb-5 text-center">เข้าสู่ระบบ</div>
                

                <div className=" text-black text-[2rem] mb-2 text-center flex flex-col w-full">
                <label className=" text-black text-[1rem] self-start ms-1">อีเมล</label>
                <input placeholder="อีเมล" className=" focus:border-yellow-300 focus:border-2 border-gray-400 border bg-white text-black text-[1rem] py-2 px-2 outline-none w-full" 
                type="email" value={emailInput} onChange={handleEmailInput} />
                </div>
                

                <div className=" text-black text-[2rem] mb-2 text-center flex flex-col w-full">
                <label className=" text-black text-[1rem] self-start ms-1">รหัสผ่าน</label>
                <input placeholder="รหัสผ่าน" className="focus:border-yellow-300 focus:border-2 text-[1rem] py-2 border-gray-400 border bg-white text-black px-2 outline-none w-full" 
                type="password" value={passwordInput} onChange={handlePasswordInput}/>
                </div>
           
                    <button onClick={handleSubmitForm} className="bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-600 text-white mt-3 py-2 rounded w-full font-bold text-[1.4rem]">เข้าสู่ระบบ</button>

                <div className="py-3 mt-4  border-t border-gray-200 w-full flex justify-center"> 
                <button className="bg-gray-800 hover:bg-gray-900 text-white py-3 w-56 rounded-sm font-semibold text-[1.1rem]"  onClick={()=>{setToggleSign(true); setCancelClick(true)}}>สร้างบัญชีใหม่</button>
                </div>  
                
                {toggleSignUp && cancelClick &&
                <div>
                <Signup cancel={handleCancel} toggle={handleToggle}/>
                </div> 
                 }

            </div>             
            </div>
        </div>
    </div>
    )
}