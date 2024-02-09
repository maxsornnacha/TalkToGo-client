import Image from "next/image"

export default function FriendList(){

    return(
    <div className="bg-gray-900 px-2">   
        <h1 className="bg-gray-900">ข้อความส่วนตัว</h1>
        <input className="bg-gray-950 outline-none mx-1 my-2 py-1 px-1" placeholder="Search Contact"/>
        
        {/* รายชื่อเพื่อน */}
        <div className="flex flex-col gap-4 mt-2">

        <div className="flex items-center p-2">
            <Image className="inline w-auto h-auto" src={'/camera.png'} width={40} height={50} alt="Friendlist"/>
            <div className="flex flex-col"> 
            <div className="ms-2">John Pools</div>
            <div className="ms-2 text-[0.7rem]">Can we take a call, need to discuss reaction...</div>
            </div>
        </div>

        <div className="flex items-center p-2">
            <Image className="inline w-auto h-auto" src={'/like.png'} width={40} height={50} alt="Friendlist"/>
            <div className="flex flex-col"> 
            <div className="ms-2">John Pools</div>
            <div className="ms-2 text-[0.7rem]">Can we take a call, need to discuss reaction...</div>
            </div>
        </div>

        <div className="flex items-center p-2">
            <Image className="inline w-auto h-auto" src={'/room1.jpg'} width={40} height={50} alt="Friendlist"/>
            <div className="flex flex-col"> 
            <div className="ms-2">John Pools</div>
            <div className="ms-2 text-[0.7rem]">Can we take a call, need to discuss reaction...</div>
            </div>
        </div>

        <div className="flex items-center p-2">
            <Image className="inline w-auto h-auto" src={'/worldchat.png'} width={40} height={50} alt="Friendlist"/>
            <div className="flex flex-col"> 
            <div className="ms-2">John Pools</div>
            <div className="ms-2 text-[0.7rem]">Can we take a call, need to discuss reaction...</div>
            </div>
        </div>


        </div>
    </div>
    )
}