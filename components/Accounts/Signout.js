import axios from "axios"
import { useRouter } from "next/router"
import Swal from "sweetalert2"

export default function Signout(){
    const redirect = useRouter()


    const handleSignOut=(event)=>{
        event.preventDefault()
        Swal.fire({
            text:`คุณต้องการออกจากระบบหรือไม่`,
            icon:'question',
            showCancelButton:true
        })
        .then((status)=>{
            if(status.isConfirmed){
    
                axios.post(`${process.env.API_URL}/logout-account`,null,{
                    withCredentials: true,
                })
                .then((response)=>{
                    Swal.fire({
                        icon: "success",
                        title:"สำเร็จ",
                        text:response.data,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    .then(()=>{
                            redirect.push('/')
                    })
                })
                .catch((error)=>{
                    Swal.fire({
                        icon: "error",
                        title: "เกิดข้อผิดพลาด",
                        text:error.response.data.error
                 });
                    
                })   
            }
        })

    }

    return (
    <>
            <button className="py-2 text-start w-full" onClick={handleSignOut}>ออกจากระบบ</button>
    </>
    )
}