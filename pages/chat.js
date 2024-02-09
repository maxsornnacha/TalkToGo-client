import  {io}  from 'socket.io-client'
import { useState,useEffect } from 'react'


export default function main(){
    const [userID,setUserID] = useState('')
    const [message,setMessage] = useState('')
    const [socket,setSocket] = useState(null)
    const [chatMessage,setChatMessage] = useState([])
    useEffect(()=>{
        const newSocket = io('http://localhost:8080/')
        newSocket.on('connect',()=>{
            console.log('connected to the socket server')
            setSocket(newSocket)
        })
        newSocket.on('disconnect',()=>{
            console.log('Disconnected from the server')
        })
        newSocket.on('connect_error',(error)=>{
            console.log('Connection error:',error)
        })

        //รับ

        //รับข้อความมาจาก server 
        newSocket.on('chat message from server',(messageGet)=>{
            setChatMessage((prev)=>[...prev,messageGet])
        })

        return () => {
            newSocket.disconnect(); // Disconnect when the component unmounts
          };
    },[])
    

    const handleSubmit=(event)=>{
        event.preventDefault()
        if(socket){
            socket.emit('chat message',message)
            setMessage('')
        }
    }
   

    return(
    <main>
            <h1>Main page</h1>

            <h3 className='text-center'>Chatbox</h3>
            <div className='bg-white h-52 w-full text-black'>
                  {chatMessage.map((line,index)=>{
                    return (
                    <div className='text-black bg-white' key={index}>
                        {line}
                    </div>
                    )
                  })}
            </div>
            <form className='text-center'>
                <input type='text' className='input' value={message} onChange={(event)=>setMessage(event.target.value)}/>
                <button onClick={handleSubmit} className='btn'>Submit</button>
            </form>
    </main>
    )
}