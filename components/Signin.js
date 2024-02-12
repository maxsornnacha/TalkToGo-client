import { useState } from "react"
import axios from 'axios'
import Swal from "sweetalert2"
import { useRouter } from "next/router"


export default function Signin(props){
    const [loadingAPI,setLoadingAPI] = useState()
    const router = useRouter();

    const handleToggle=(event)=>{
        event.preventDefault()
        props.toggle(2)
    }
    
    const handleCancel=(event)=>{
        event.preventDefault()
        props.cancel(false)
    }

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
                title: "สำเร็จ",
                text: response.data.status,
                icon: "success"
              }).then(()=>{
                //เมื่อกดตกลง จะเข้าหน้าหลัก
               router.push('/main')
              })
        })
        .catch((error)=>{
            Swal.fire({
                icon: "error",
                title:"ผิดพลาด",
                text:error.response.data.error,
              });
        })
        .finally(()=>setLoadingAPI(false))
    }

    return (
    <div>
        <div>
                   
            <form className="sign-form-in" onSubmit={handleSubmitForm}> 

                 <div className="py-2 px-3  m-2 me-4 self-end cursor-pointer" onClick={handleCancel}>X</div>
                 <div className=" m-2 my-5 bg-gray-200">
                    <button className="p-3 bg-white text-black" onClick={handleToggle}> Sign Up</button>
                    <button className="p-3 bg-black text-white " disabled={true}> Sign In</button>
                 </div>
       

            <div className="bg-gray-200 flex flex-col w-5/6">

                <div className="bg-gray-200 text-black text-[2rem] mb-5 text-center">Sign In</div>
                

                <div className="bg-gray-200 text-black text-[2rem] mb-2 text-center flex flex-col ">
                <label className="bg-gray-200 text-black text-[1rem] self-start ms-1">Email</label>
                <input placeholder="Email" className="border-gray-400 border bg-white text-black text-[1rem] py-2 px-2 outline-none w-full" 
                type="email" value={emailInput} onChange={handleEmailInput} />
                </div>
                

                <div className="bg-gray-200 text-black text-[2rem] mb-2 text-center flex flex-col ">
                <label className="bg-gray-200 text-black text-[1rem] self-start ms-1">Password</label>
                <input placeholder="Password" className="text-[1rem] py-2 border-gray-400 border bg-white text-black px-2 outline-none w-full" 
                type="password" value={passwordInput} onChange={handlePasswordInput}/>
                </div>
           
                    <button type="submit" className="bg-gray-900 text-white mt-3 py-4 rounded">LOGIN</button>
                
                
            </div>             
            </form>
        </div>
    </div>
    )
}