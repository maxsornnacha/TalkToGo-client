import axios from "axios"
import { useRouter } from "next/router"
import Swal from "sweetalert2"

export default function Signout(){
    const redirect = useRouter()


    const handleSignOut=(event)=>{
        event.preventDefault()
        Swal.fire({
            title:`คุณต้องการที่จะออกจากระบบหรือไม่`,
            icon:'warning',
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
                        title:response.data
                    })
                    .then((status)=>{
                        if(status.isConfirmed){
                            redirect.push('/')
                        }
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