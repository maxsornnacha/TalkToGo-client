import axios from "axios"
import { useEffect, useState } from "react"



export default function LikeSystem(props){
    const [like,setLike] = useState(0)
    const [check,setCheck] = useState(false)
    
    useEffect(()=>{
        axios.get(`${process.env.API_URL}/single-post/${props.postID}`)
        .then((response)=>{
            const likeGet = response.data.likes
            for(let i =0;i<likeGet.length;i++){
                if(likeGet[i].accountID === props.accountID){
                    setCheck(true)
                    setLike(1)
                }
            }
        })
        .catch(()=>console.log('การดึงข้อมูลล้มเหลว'))
    },[])

    const handleLike=(event)=>{
        event.preventDefault()


        if(like === 0){
    
            setLike(1)
            props.handleLike(1,props.postID,check)
            axios.put(`${process.env.API_URL}/like-increasing`,{like:1,accountID:props.accountID,postID:props.postID})
            .then(()=>console.log('like เพิ่ม 1 สำเร็จ '))
            .catch(()=>console.log('Like เพิ่ม 1 ล้มเหลว'))

        }else{
          
            setLike(0)
            props.handleLike(0,props.postID,check)
            axios.delete(`${process.env.API_URL}/like-decreasing`,
                {data:{like:1,accountID:props.accountID,postID:props.postID}}
            )
            .then(()=>console.log('like ลบ 1 สำเร็จ '))
            .catch(()=>console.log('Like ลบ 1 ล้มเหลว'))
        }

    }

    return(
    <>
    <button value={like} onClick={handleLike} className={like===1?"  flex-1 text-[1.0rem]  text-yellow-400 h-full py-3 hover:text-yellow-300":" flex-1 text-[1.0rem] py-3 hover:text-gray-600"}>ถูกใจ</button>
    </>
    )
}