import Image from "next/image"

export default function FriendList(){

    return(
    <div className="h-full w-full bg-gray-100 text-gray-700">   

        {/* รายชื่อเพื่อน */}
        <div className="flex flex-col gap-1">

        <div className=" px-2 py-2 rounded-md hover:bg-gray-700 hover:text-white hover:cursor-pointer flex items-center w-full">
             <img className="inline h-11 w-11 rounded-full" src={'/defaultProfile.png'}  alt="Friendlist"/>
            <div>
            <div className="ms-2 text-[0.9rem]"><strong>Akaki Reiko</strong></div>
            <div className="ms-2 text-[0.75rem]">ชื่อผู้ใช้งาน: Akakiza007</div>
            </div>
        </div>


         <div className="  px-2 py-2 rounded-md hover:bg-gray-700 hover:text-white hover:cursor-pointer flex items-center w-full">
             <img className="inline h-11 w-11 rounded-full" src={'/defaultProfile.png'}  alt="Friendlist"/>
            <div>
            <div className="ms-2 text-[0.9rem]"><strong>Sornnacha Buranapongwattana</strong></div>
            <div className="ms-2 text-[0.75rem]">ชื่อผู้ใช้งาน: maxza007</div>
            </div>
        </div>


         <div className="  px-2 py-2 rounded-md hover:bg-gray-700 hover:text-white hover:cursor-pointer flex items-center w-full">
             <img className="inline h-11 w-11 rounded-full" src={'/defaultProfile.png'}  alt="Friendlist"/>
            <div>
            <div className="ms-2 text-[0.9rem]"><strong>Eskimos De Dales</strong></div>
            <div className="ms-2 text-[0.75rem]">ชื่อผู้ใช้งาน: EskimosDeDelost</div>
            </div>
        </div>


        <div className="  px-2 py-2 rounded-md hover:bg-gray-700 hover:text-white hover:cursor-pointer flex items-center w-full">
             <img className="inline h-11 w-11 rounded-full" src={'/defaultProfile.png'}  alt="Friendlist"/>
            <div>
            <div className="ms-2 text-[0.9rem]"><strong>Sukrit Jungjung</strong></div>
            <div className="ms-2 text-[0.75rem]">ชื่อผู้ใช้งาน: sukrit1112</div>
            </div>
        </div>


         <div className="  px-2 py-2 rounded-md hover:bg-gray-700 hover:text-white hover:cursor-pointer flex items-center w-full">
             <img className="inline h-11 w-11 rounded-full" src={'/defaultProfile.png'}  alt="Friendlist"/>
            <div>
            <div className="ms-2 text-[0.9rem]"><strong>Maha Rati</strong></div>
            <div className="ms-2 text-[0.75rem]">ชื่อผู้ใช้งาน: ooliver000</div>
            </div>
        </div>


         <div className="  px-2 py-2 rounded-md hover:bg-gray-700 hover:text-white hover:cursor-pointer flex items-center w-full">
             <img className="inline h-11 w-11 rounded-full" src={'/defaultProfile.png'}  alt="Friendlist"/>
            <div>
            <div className="ms-2 text-[0.9rem]"><strong>Jameball Manhathan</strong></div>
            <div className="ms-2 text-[0.75rem]">ชื่อผู้ใช้งาน: JameInwZa1150</div>
            </div>
        </div>
   

         <div className="  px-2 py-2 rounded-md hover:bg-gray-700 hover:text-white hover:cursor-pointer flex items-center w-full">
             <img className="inline h-11 w-11 rounded-full" src={'/defaultProfile.png'}  alt="Friendlist"/>
            <div>
            <div className="ms-2 text-[0.9rem]"><strong>Deliver Golave</strong></div>
            <div className="ms-2 text-[0.75rem]">ชื่อผู้ใช้งาน: showmeyourname0</div>
            </div>
        </div>

        </div>
    </div>
    )
}