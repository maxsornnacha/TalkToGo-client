
export default function Signin(props){

    const handleToggle=(event)=>{
        event.preventDefault()
        props.toggle(2)
    }
    
    const handleCancel=(event)=>{
        event.preventDefault()
        props.cancel(false)
    }

    return (
    <div>
        <div  style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                   
            <form className="sign-form" > 

                 <div className="py-2 px-3  m-2 me-4 self-end cursor-pointer" onClick={handleCancel}>X</div>
                 <div className=" m-2 my-5 bg-gray-200">
                    <button className="p-3 bg-white text-black" onClick={handleToggle}> Sign Up</button>
                    <button className="p-3 bg-black text-white " disabled={true}> Sign In</button>
                 </div>
       

            <div className="bg-gray-200 flex flex-col w-5/6">

                <div className="bg-gray-200 text-black text-[2rem] mb-5 text-center">Sign In</div>
                

                <div className="bg-gray-200 text-black text-[2rem] mb-2 text-center flex flex-col ">
                <label className="bg-gray-200 text-black text-[1rem] self-start ms-1">Email</label>
                <input placeholder="Email" className="border-gray-400 border bg-white text-black text-[1rem] py-2 px-2 outline-none w-full" type="text"/>
                </div>
                

                <div className="bg-gray-200 text-black text-[2rem] mb-2 text-center flex flex-col ">
                <label className="bg-gray-200 text-black text-[1rem] self-start ms-1">Password</label>
                <input placeholder="Password" className="text-[1rem] py-2 border-gray-400 border bg-white text-black px-2 outline-none w-full" type="text"/>
                </div>
           
                    <button className="bg-gray-900 text-white mt-3 py-4 rounded">LOGIN</button>
                
                
            </div>             
            </form>
        </div>
    </div>
    )
}