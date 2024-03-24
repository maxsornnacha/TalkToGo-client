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
            <div className="text-[1rem] m-2 mt-4"> ค้นหาบัญชีรายชื่อ</div>
            <div className="w-full flex justify-center">
            <input value={inputValue} onChange={(event)=>setInputValue(event.target.value)} placeholder="ค้นหาบัญชีบน TalkToGo" className="mb-3 py-1 ps-1 rounded-sm text-[1.0rem] outline-none border-gray-700 focus:border-yellow-300 focus:border-2 border w-5/6 "/>
            </div>


            {!dataFiltered &&
            <div className="h-40 text-gray-400 flex justify-center items-center text-[1rem]"> 
                มาเริ่มต้นหาเพื่อนกันเถอะ !
            </div>
            }

            {dataFiltered && dataFiltered.length === 0 &&
            <div className="h-40 flex justify-center items-center text-[1rem]"> 
                ไม่พบรายชื่อเพื่อน
            </div>
            }

            {dataFiltered &&
            <div className="flex flex-col gap-2 m-3">
                {dataFiltered.map((accountFiltered, index)=>{
                    return(
                    <button onClick={()=>props.handleClick(false)} className="text-start" key={index}>
                    <Link href={`/profile/${accountFiltered.id}`}>
                    <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-md py-3 px-2 hover:bg-gray-700 hover:text-white">
                        <div>
                        <img src={accountFiltered.accountImage} className="w-12 h-12 rounded-full"/>
                        </div>
                        <div>
                            <div className="text-[1rem]">{accountFiltered.firstname} {accountFiltered.lastname}</div>
                            <div className="text-[0.8rem]">ชื่อผู้ใช้งาน: {accountFiltered.username}</div>
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