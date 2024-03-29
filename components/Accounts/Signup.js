import { useEffect, useState } from "react"
import Image from "next/image"
import FileResizer from "react-image-file-resizer"
import Swal from "sweetalert2"
import axios from "axios"

export default function Signup(props){

    //Uppercase Module
    function capitalizeFirstChar(inputString) {
        // Check if the inputString is not empty
        if (inputString && inputString.length > 0) {
          // Capitalize the first character and concatenate the rest of the string
          return inputString.charAt(0).toUpperCase() + inputString.slice(1);
        } else {
          // Return an empty string if the input is empty
          return inputString;
        }
    }


      //จัดการ toggle sign in | sign up
      const handleToggle=(event)=>{
        event.preventDefault()
        props.toggle(1)
    }

    //จัดการปุ่มกดปิด
    const handleCancel=(event)=>{
        event.preventDefault()
        props.cancel(false)
    }


    //Input form data
    const [formData,setFormData] = useState({
        firstname:'',
        lastname:'',
        username:'',
        email:'',
        password:'',
        passwordConfirm:''
    })
     //destucturing data form ทั้งหมด
     const {firstname,lastname,username,email,password,passwordConfirm} = formData

    //Input Profile's Image
    const [accountImage,setAccountImage] = useState(null)
    //Loading
    const [loading,setLoading] = useState(false)

    // Password Validation
    const [validation,setValidation] = useState({
        moreThan8:false,
        includingChar:false,
        inCludingInt:false
    })
    const {moreThan8,includingChar,inCludingInt} = validation


    const validatingPassword=()=>{
        if(password.length >= 8){
            setValidation((prev)=>{
              return({
                  moreThan8:true,
                  includingChar:prev.includingChar,
                  inCludingInt:prev.inCludingInt
              })
          })
      }else{
        setValidation((prev)=>{
            return({
                moreThan8:false,
                includingChar:prev.includingChar,
                inCludingInt:prev.inCludingInt
            })
        })
      }
      if(containsCharacters(password)){
           setValidation((prev)=>{
              return({
                  moreThan8:prev.moreThan8,
                  includingChar:true,
                  inCludingInt:prev.inCludingInt
              })
          })
      }else{
        setValidation((prev)=>{
            return({
                moreThan8:prev.moreThan8,
                includingChar:false,
                inCludingInt:prev.inCludingInt
            })
        })
      }

      if(containsNumber(password)){
           setValidation((prev)=>{
              return({
                  moreThan8:prev.moreThan8,
                  includingChar:prev.includingChar,
                  inCludingInt:true
              })
          })
      }else{
        setValidation((prev)=>{
            return({
                moreThan8:prev.moreThan8,
                includingChar:prev.includingChar,
                inCludingInt:false
            })
        })
      }
    }

    useEffect(()=>{
        validatingPassword()
    },[password])

    //module validating for including char
    const containsCharacters = (input) => {
        // Regular expression to check if the input contains at least one alphabetical character
        const regex = /[a-zA-Z]/;
        return regex.test(input);
    };

    //module validating for including num
    const containsNumber = (input) => {
        // Regular expression to check if the input contains at least one digit (0-9)
        const regex = /\d/;
        return regex.test(input);
    };


    //Base64 convert Image and store in the var
    const handleFileUpload=(event)=>{
        try{
        const file = event.target.files[0]
        FileResizer.imageFileResizer(
            file, // Is the file of the image which will resized.
            720, // Is the maxWidth of the resized new image.
            720, // Is the maxHeight of the resized new image.
            "JPEG", // Is the compressFormat of the resized new image.
            100, // Is the quality of the resized new image.
            0, // Is the degree of clockwise rotation to apply to uploaded image.
            (url)=>{
                setAccountImage(url)
            }, // Is the callBack function of the resized new image URI.
            "base64", // Is the output type of the resized new image.
          );
        }catch(error){
            console.log('ไม่พบ file')
            console.log(error)
        }
     }

     const handleChangeForFirstname=(event)=>{

            setFormData((prev)=>{
                return({
                    firstname:capitalizeFirstChar(event.target.value),
                    lastname:prev.lastname,
                    username:prev.username,
                    email:prev.email,
                    password:prev.password,
                    passwordConfirm:prev.passwordConfirm
                })
            })
     }

     const handleChangeForLastname=(event)=>{
        setFormData((prev)=>{
            return({
                firstname:prev.firstname,
                lastname:capitalizeFirstChar(event.target.value),
                username:prev.username,
                email:prev.email,
                password:prev.password,
                passwordConfirm:prev.passwordConfirm
            })
        })
    }

    const handleChangeForUsername= async (event)=>{
        setFormData((prev)=>{
            return({
                firstname:prev.firstname,
                lastname:prev.lastname,
                username:event.target.value,
                email:prev.email,
                password:prev.password,
                passwordConfirm:prev.passwordConfirm
            })
        })
    }

    const handleChangeForEmail=(event)=>{
        setFormData((prev)=>{
            return({
                firstname:prev.firstname,
                lastname:prev.lastname,
                username:prev.username,
                email:event.target.value,
                password:prev.password,
                passwordConfirm:prev.passwordConfirm
            })
        })
    }

    const handleChangeForPassword=(event)=>{
        setFormData((prev)=>{
            return({
                firstname:prev.firstname,
                lastname:prev.lastname,
                username:prev.username,
                email:prev.email,
                password:event.target.value,
                passwordConfirm:prev.passwordConfirm
            })
        })
    }

    const handleChangeForPasswordConfirm=(event)=>{
        setFormData((prev)=>{
            return({
                firstname:prev.firstname,
                lastname:prev.lastname,
                username:prev.username,
                email:prev.email,
                password:prev.password,
                passwordConfirm:event.target.value
            })
        })
    }


    const handleCreatingAccount=(event)=>{
        event.preventDefault()

        Swal.fire({
            icon:'question',
            text:`คุณต้องการสมัครสมาชิคหรือไม่`,
            showCancelButton:true
        }).then((result)=>{
            setLoading(true)
        if(result.isConfirmed){
            if(firstname.length === 0){
                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    text: "กรุณาใส่ 'ชื่อจรืง'",
            })
            }else if(lastname.length === 0){
                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    text: "กรุณาใส่ 'นามสกุล'",
            })
            }else if(username.length === 0){
                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    text: "กรุณาใส่ 'ชื่อผู้ใช้'",
            })
            }else if(email.length === 0){
                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    text: "กรุณาใส่ 'อีเมล'",
            })
            }else if(password.length === 0){
                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    text: "กรุณาใส่ 'รหัสผ่าน'",
            })
            }else if(passwordConfirm.length === 0){
                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    text: "กรุณาใส่ 'ยืนยันรหัสผ่าน'",
            })
            }else if(password !== passwordConfirm){
                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    text: "การรหัสผ่านยืนยันไม่ถูกต้อง",
            })
            }else if(!moreThan8){
                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    text: 'รหัสผ่านต้องมี 8 ตัวขึ้นไป',
            })
            }else if(!includingChar){
                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    text: 'รหัสผ่านต้องประกอบด้วยตัวอักษร',
            })
            }else if(!inCludingInt){
                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    text: 'รหัสผ่านต้องประกอบด้วยตัวเลข',
            })
            }
            else{
            axios.post(`${process.env.API_URL}/create-account`,{firstname,lastname,username,password,email,accountImage})
            .then((result)=>{
                Swal.fire({
                        icon: "success",
                        title: "สมัครสมาชิคสำเร็จ",
                        showConfirmButton: false,
                        timer: 1500
              });
              props.toggle(false)
             })
             .catch((error)=>{

                try{
                    Swal.fire({
                        icon: "error",
                        title: "เกิดข้อผิดพลาด",
                       text: error.response.data.error.username?`มีชื่อผู้ใช้งาน '${error.response.data.error.username}' อยู่ในระบบแล้ว`
                       :`มีอีเมล '${error.response.data.error.email}' อยู่ในระบบแล้ว`
                 });
                }catch(error){
                    console.log('การสร้างบัญชีผิดพลาดเนื่องจาก :',error)
                    Swal.fire({
                        icon: "error",
                        title: "เกิดข้อผิดพลาด",
                       text:`เกิดข้อผิดพลาดกับ เซิร์ฟเวอร์`
                 });
                }
                 
             }) 
            .finally(()=>setLoading(false))
            }
         }else{
        setLoading(false)
        } 
    }
    )
    }


    return (
    <div>
        <div className="overlay z-[100]">
                   
            <form className="sign-form-up z-50" onSubmit={handleCreatingAccount} > 
            <div className="sign-form-up-inner">

                 <div className="pt-2 px-3 flex justify-end w-full" onClick={handleCancel}>
                    <button>
                    <img src="/close.png" className="w-4 h-4"/>
                    </button>
                 </div> 
        


            <div className=" flex flex-col w-full p-2">

                <div className="text-[2rem]  mb-2 pb-2  border-b text-center">สร้างบัญชีใหม่</div>


                <div className=" text-black w-full flex flex-col pb-2">
                <label htmlFor="account-picture" className="cursor-pointer text-black flex items-center gap-2  py-2 px-2" >
                    <img src={accountImage?accountImage:'/defaultProfile.png'} htmlFor="account-picture" className="rounded-full h-20 w-20"  alt="profile's Image"/>
                    <span className="hover:text-gray-600">คลิ๊กเพื่อเลือกรูปโปรไฟล์ที่นี่</span>
                </label>
                    <input type="file" id="account-picture" hidden={true} onChange={handleFileUpload}/>
                </div>

                <div className="w-full flex gap-2">
                <div className="  mb-2 text-center flex flex-col w-6/12">
                <input placeholder="ชื่อจริง" className={`border-gray-400 border bg-white text-black text-[1rem] py-2 px-2 outline-none w-full rounded capitalize 
                ${firstname !== ''?'':'border-red-500'}`}
                type="text" value={firstname} onChange={handleChangeForFirstname}/>
                </div>
                
                <div className="  mb-2 text-center flex flex-col w-6/12">
                <input placeholder="นามสกุล" className={`border-gray-400 border bg-white text-black text-[1rem] py-2 px-2 outline-none w-full rounded capitalize
                 ${lastname !== ''?'':'border-red-500'}`}
                type="text" value={lastname} onChange={handleChangeForLastname}/>
                </div>
                </div>
                
                
                <div className="  mb-2 text-center flex flex-col ">
                <input placeholder="ชื่อผู้ใช้" className={`border-gray-400 border bg-white text-black text-[1rem] py-2 px-2 outline-none w-full rounded
                 ${username !== ''?'':'border-red-500'}`}
                type="text" value={username} onChange={handleChangeForUsername}/>
                </div>
                

                <div className="  mb-2 text-center flex flex-col ">
                <input placeholder="อีเมล" className={`border-gray-400 border bg-white text-black text-[1rem] py-2 px-2 outline-none w-full rounded
                ${email !== ''?'':'border-red-500'}`}
                type="email" value={email} onChange={handleChangeForEmail}/>
                </div>
                

                <div className="  mb-2 text-center flex flex-col ">
                <input placeholder="รหัสผ่าน" className={`border-gray-400 border bg-white text-black text-[1rem] py-2 px-2 outline-none w-full rounded
                ${moreThan8 && includingChar && inCludingInt?'':'border-red-500'}`}
                 type="password" value={password} onChange={handleChangeForPassword}/>
                <div className="flex  flex-wrap">
                <p className={moreThan8?"text-[0.8rem]  text-green-500":"text-[0.8rem]  text-red-500"}>รหัสผ่านต้องมีจำนวน 8 ตัวขึ้นไป &nbsp;</p>
                <p className={includingChar?"text-[0.8rem]  text-green-500":"text-[0.8rem]  text-red-500"}> ประกอบด้วยตัวอักษร &nbsp;</p>
                <p className={inCludingInt?"text-[0.8rem]  text-green-500":"text-[0.8rem]  text-red-500"}>ประกอบด้วยตัวเลข</p>
                </div>
                </div>

                <div className="  mb-2 text-center flex flex-col ">
                <input placeholder="ยืนยันรหัสผ่าน" className={`border-gray-400 border bg-white text-black text-[1rem] py-2 px-2 outline-none w-full rounded
                ${passwordConfirm !== ''?'':'border-red-500'}`}
                type="password" value={passwordConfirm} onChange={handleChangeForPasswordConfirm}/>
                </div>

           
                    <button type="submit" className="bg-gray-800 hover:bg-gray-900 text-white mt-3 py-4 rounded font-bold text-[1.2rem]">สร้างบัญชี</button>
                
                
            </div>    
            </div>         
            </form>
        </div>
    </div>
    )
}