import axios, { all } from "axios"
import { useState,useEffect } from "react"
import { io } from "socket.io-client"
const socket = io(process.env.API_SOCKET_URL)


export default function Messenger({messages,userData,handleChatroomToggle,closeMessanger}){
    const [allMessages,setAllMessages] = useState(messages)
    const [allChatAccounts,setAllChatAccounts] = useState([])
    const [inputValue,setInputValue] = useState('')
    const [dataFiltered,setDataFiltered] = useState(null)


    //เมื่อทำการเปิดแชทจะอัพเดตข้อมูล
    useEffect(()=>{
        if(userData){
        const fetchingAllMessages = ()=>{
            axios.get(`${process.env.API_URL}/all-messages/${userData.accountData._id}`)
        .then((response)=>{
            //สามารถเขียน Logic ตรงนี้เพื่อกรองหาแชทที่ไม่ได้อ่าน
            if(response.data && userData){
                const  filteredIsnotRead = (response.data).filter((chatBox,index)=>{

                    const filter = chatBox.messages.filter((message) => {
                        return message.senderID !== userData.accountData._id && message.isRead === false
                    });

                    return (filter.length > 0)
                })
                setAllMessages(response.data)
                socket.emit('allMessages',{data:response.data, newUnreadMessages:filteredIsnotRead.length, userID:userData.accountData._id})
            }
           
        })
        .catch((error)=>{
            console.log('เกิดข้อผิดพลาดกับ server')
            console.log(error)
        })
        }

        fetchingAllMessages()
    }

    },[userData])


    useEffect(()=>{
        const fetchingAccounts = ()=>{

                axios.post(`${process.env.API_URL}/all-messages-accounts`,{
                    allMessages,userID:userData.accountData._id
                })
                .then((response)=>{
                    //console.log(response.data)
                    setAllChatAccounts(response.data)
                })
                .catch((error)=>{
                        console.log('เกิดข้อผิดพลาดกับ server')
                }) 
    }

    fetchingAccounts()
    },[allMessages])

    useEffect(()=>{

        setDataFiltered(allChatAccounts.filter((account)=>{

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
    
    useEffect(()=>{
        socket.on('allMessages',({data,userID}) =>{
           if(userID === userData.accountData._id){
            setAllMessages(data)
           } 
        })
    },[])

    return (
    <div className="w-full">
        <div className="border-b-2 border-gray-200 w-full text-center pt-1 pb-3 text-[1.2rem] mb-3"> ข้อความ </div>
        

        <div className="w-full flex justify-center">
           <input value={inputValue} onChange={(event)=>setInputValue(event.target.value)} placeholder="ค้นหา Messanger" className="mb-3 py-1 ps-1 rounded-md text-[1.0rem] outline-none border-gray-700 focus:border-yellow-300 focus:border-2 border w-5/6 "/>
        </div>

    {allMessages && !dataFiltered &&
    allMessages.slice().sort((a,b)=>{
         const aTime = new Date(a.updatedAt)
         const bTime = new Date(b.updatedAt)
        return bTime-aTime
    }).map((messenger,index)=>{
       return(
        <div key={index}>
               {messenger.participants.map((user,index)=>{

                return (<div key={index}>

                {allChatAccounts && allChatAccounts.length > 0 && messenger.messages.length > 0 &&  allChatAccounts.map((account,index)=>{
                return(
                account._id === user &&
                <div key={index}>
                <button onClick={()=>{handleChatroomToggle(true,index); closeMessanger(false,account)}} className={`hover:bg-gray-900 hover:text-white w-full py-3 flex gap-2 p-2 ${!(messenger.messages[messenger.messages.length-1].isRead) && !(messenger.messages[messenger.messages.length-1].senderID === userData.accountData._id)?'bg-yellow-200':'bg-white'}`} key={index}>
                <div>
                    <img src={account.accountImage} className="h-12 w-12 rounded-full"/>
                </div>
                <div className="flex flex-col gap-1">
                    <div className={`text-start text-[1rem] ${!(messenger.messages[messenger.messages.length-1].isRead) && !(messenger.messages[messenger.messages.length-1].senderID === userData.accountData._id)?'font-semibold':'font-normal'}`}>{account.firstname} {account.lastname}</div>
                    <div className={`text-start text-[0.9rem] flex gap-2 ${!(messenger.messages[messenger.messages.length-1].isRead) && !(messenger.messages[messenger.messages.length-1].senderID === userData.accountData._id)?'font-semibold':'font-normal'}`}>
                        <div>{messenger.messages[messenger.messages.length-1].senderID === userData.accountData._id?
                        'คุณ :'
                        :
                        account.firstname+' :'
                        }</div>
                        <div>{messenger.messages[messenger.messages.length-1].content.length>10?messenger.messages[messenger.messages.length-1].content.substring(0,10)+'...':messenger.messages[messenger.messages.length-1].content}</div>
                    </div>
                </div>
                </button>
                </div>
                )
                })}
                </div>
                )
            })}
        </div>
       )
    })}


{allMessages && dataFiltered &&
    allMessages.slice().sort((a,b)=>{
         const aTime = new Date(a.updatedAt)
         const bTime = new Date(b.updatedAt)
        return bTime-aTime
    }).map((messenger,index)=>{
       return(
        <div key={index}>
               {messenger.participants.map((user,index)=>{

                return (<div key={index}>

                {allChatAccounts && allChatAccounts.length > 0 && messenger.messages.length > 0 &&  dataFiltered.map((account,index)=>{
                return(
                account._id === user &&
                <div>
                <button onClick={()=>{handleChatroomToggle(true,index); closeMessanger(false,account)}} className={`hover:bg-gray-900 hover:text-white w-full py-3 flex gap-2 p-2 ${!(messenger.messages[messenger.messages.length-1].isRead) && !(messenger.messages[messenger.messages.length-1].senderID === userData.accountData._id)?'bg-yellow-200':'bg-white'}`} key={index}>
                <div>
                    <img src={account.accountImage} className="h-12 w-12 rounded-full"/>
                </div>
                <div className="flex flex-col gap-1">
                    <div className={`text-start text-[1rem] ${!(messenger.messages[messenger.messages.length-1].isRead) && !(messenger.messages[messenger.messages.length-1].senderID === userData.accountData._id)?'font-semibold':'font-normal'}`}>{account.firstname} {account.lastname}</div>
                    <div className={`text-start text-[0.9rem] flex gap-2 ${!(messenger.messages[messenger.messages.length-1].isRead) && !(messenger.messages[messenger.messages.length-1].senderID === userData.accountData._id)?'font-semibold':'font-normal'}`}>
                        <div>{messenger.messages[messenger.messages.length-1].senderID === userData.accountData._id?
                        'คุณ :'
                        :
                        account.firstname+' :'
                        }</div>
                        <div>{messenger.messages[messenger.messages.length-1].content.length>10?messenger.messages[messenger.messages.length-1].content.substring(0,10)+'...':messenger.messages[messenger.messages.length-1].content}</div>
                    </div>
                </div>
                </button>
                </div>
                )
                })}
                </div>
                )
            })}
        </div>
       )
    })}

    {dataFiltered && dataFiltered.length === 0 &&
            <div className="h-40 flex justify-center items-center text-[1rem]"> 
                ไม่พบ Messanger
            </div>
    }

    </div>
    )
}