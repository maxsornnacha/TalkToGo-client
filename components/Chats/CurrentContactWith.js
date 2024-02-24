import Image from "next/image"

export default function FriendList(){

    return(
    <div className="h-full w-full bg-gray-900 text-white">   

        {/* รายชื่อเพื่อน */}
        <div className="flex flex-col gap-2">

        <div className="  py-2 hover:bg-yellow-200 hover:text-black flex items-center w-full">
             <img className="inline h-11 w-11 rounded-full" src={'/defaultProfile.png'}  alt="Friendlist"/>
            <div>
            <div className="ms-2 text-[0.8rem]"><strong>Akaki Reiko</strong></div>
            <div className="ms-2 text-[0.7rem]">ชื่อผู้ใช้งาน: Akakiza007</div>
            </div>
        </div>


         <div className="  py-2 hover:bg-yellow-200 hover:text-black flex items-center w-full">
             <img className="inline h-11 w-11 rounded-full" src={'/defaultProfile.png'}  alt="Friendlist"/>
            <div>
            <div className="ms-2 text-[0.8rem]"><strong>Sornnacha Buranapongwattana</strong></div>
            <div className="ms-2 text-[0.7rem]">ชื่อผู้ใช้งาน: maxza007</div>
            </div>
        </div>


         <div className="  py-2 hover:bg-yellow-200 hover:text-black flex items-center w-full">
             <img className="inline h-11 w-11 rounded-full" src={'/defaultProfile.png'}  alt="Friendlist"/>
            <div>
            <div className="ms-2 text-[0.8rem]"><strong>Eskimos De Dales</strong></div>
            <div className="ms-2 text-[0.7rem]">ชื่อผู้ใช้งาน: EskimosDeDelost</div>
            </div>
        </div>


        <div className="  py-2 hover:bg-yellow-200 hover:text-black flex items-center w-full">
             <img className="inline h-11 w-11 rounded-full" src={'/defaultProfile.png'}  alt="Friendlist"/>
            <div>
            <div className="ms-2 text-[0.8rem]"><strong>Sukrit Jungjung</strong></div>
            <div className="ms-2 text-[0.7rem]">ชื่อผู้ใช้งาน: sukrit1112</div>
            </div>
        </div>


         <div className="  py-2 hover:bg-yellow-200 hover:text-black flex items-center w-full">
             <img className="inline h-11 w-11 rounded-full" src={'/defaultProfile.png'}  alt="Friendlist"/>
            <div>
            <div className="ms-2 text-[0.8rem]"><strong>Maha Rati</strong></div>
            <div className="ms-2 text-[0.7rem]">ชื่อผู้ใช้งาน: ooliver000</div>
            </div>
        </div>


         <div className="  py-2 hover:bg-yellow-200 hover:text-black flex items-center w-full">
             <img className="inline h-11 w-11 rounded-full" src={'/defaultProfile.png'}  alt="Friendlist"/>
            <div>
            <div className="ms-2 text-[0.8rem]"><strong>Jameball Manhathan</strong></div>
            <div className="ms-2 text-[0.7rem]">ชื่อผู้ใช้งาน: JameInwZa1150</div>
            </div>
        </div>
   

         <div className="  py-2 hover:bg-yellow-200 hover:text-black flex items-center w-full">
             <img className="inline h-11 w-11 rounded-full" src={'/defaultProfile.png'}  alt="Friendlist"/>
            <div>
            <div className="ms-2 text-[0.8rem]"><strong>Deliver Golave</strong></div>
            <div className="ms-2 text-[0.7rem]">ชื่อผู้ใช้งาน: showmeyourname0</div>
            </div>
        </div>

        </div>
    </div>
    )
}