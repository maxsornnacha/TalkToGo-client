import Link from "next/link"
import axios from "axios"
import { useState,useEffect } from "react"

export default function Search(props){
    const [inputValue,setInputValue] = useState('')
    const [accounts,setAccounts] = useState([])
    const [dataFiltered,setDataFiltered] = useState(null)

    const fetch = async () =>{
        axios.get(`${process.env.API_URL}/get-all-accounts`)
            .then((response)=>{
                setAccounts(response.data)
            })
            .catch((error)=>{
                console.log(error.response.data.error)
            })
    }

    useEffect(()=>{
        fetch()
    },[])

   useEffect(()=>{

            setDataFiltered(accounts.filter((account)=>{

                return (
                (`${account.firstname} ${account.lastname}`).toLowerCase().includes(inputValue.toLowerCase())
                ||
                account.username.toLowerCase().includes(inputValue.toLowerCase())
                )
            }))

            if(inputValue === ''){
                setDataFiltered(null)
            }
   
    },[inputValue])


    return (
    <div className="w-full">
            <div className="border-b-2 border-gray-200 w-full text-center pt-1 pb-3 text-[1.2rem]"> ค้นหาเพื่อน </div>
            <div className="text-[1rem] m-2"> ค้นหาบัญชีรายชื่อ</div>
            <div className="w-full flex justify-center">
            <input value={inputValue} onChange={(event)=>setInputValue(event.target.value)} placeholder="ค้นหาบัญชีบน TalkToGo" className="py-1 ps-1 rounded-sm text-[1.0rem] outline-none border-gray-700 focus:border-yellow-600 border w-5/6 "/>
            </div>


            {!dataFiltered &&
            <div className="h-40 flex justify-center items-center"> 
                ไม่พบบัญชีที่ค้นหา
            </div>
            }

            {dataFiltered &&
            <div className="flex flex-col gap-2 m-3">
                {dataFiltered.map((accountFiltered)=>{
                    return(
                    <button onClick={()=>props.handleClick(false)} className="text-start">
                    <Link href={`/profile/${accountFiltered.id}`}>
                    <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-md py-2 px-2 hover:bg-gray-700 hover:text-white">
                        <div>
                        <img src={accountFiltered.accountImage} className="w-11 h-11 rounded-full"/>
                        </div>
                        <div>
                            <div className="text-[0.9rem]">{accountFiltered.firstname} {accountFiltered.lastname}</div>
                            <div className="text-[0.75rem]">ชื่อผู้ใช้งาน: {accountFiltered.username}</div>
                        </div>
                    </div>
                    </Link>
                    </button>
                    )
                })}
            </div>
            }
    </div>
    )
}