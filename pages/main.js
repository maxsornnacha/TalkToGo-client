import WorldChat from "@/components/FriendChat"
import Image from "next/image"
import Rooms from "@/components/Rooms"
import FriendList from "@/components/FriendList"
import WorldPost from "@/components/WorldPost"


export default function main(){
    return(
    <main className="bg-gray-900 text-white">
          <div className="grid grid-cols-12 gap-0 ">
                {/* section 1 */}
                <div className="col-span-1 h-screen sticky top-20">
                <div className="h-16 py-2 text-center text-[1.7rem]">Rooms</div>
                            <Rooms/>
                </div>

                {/* section 2 */}
                <div className="col-span-12 sm:col-span-12 md:col-span-2 bg-gray-900 h-screen sticky top-20">
                <div className="h-16 py-2 text-center text-[1.7rem]">Menu</div>
                    <ul className="flex flex-col mb-3">
                        <button className="main-center">เพื่อนของฉัน</button>
                        <button className="main-center">เพื่อนที่ออนไลน์อยู่</button>
                    </ul>
                    <FriendList/>
                </div>

                {/* section 3 */}
                <div className="col-span-12 sm:col-span-12 md:col-span-7">
                <div className="h-16 py-2 ps-10 text-[1.7rem]">
                <Image className=" inline pr-2" src={'/worldChat.png'} height={40} width={40} alt="worldIcon"/>
                WorldPost
                </div>
                    <WorldPost/>
    
                </div>


                {/* section 4 */}
                <div className="col-span-2 ps-2 pe-2  h-screen sticky top-20">
                <div>
                <div className="h-16 py-2 ps-3 text-[1.7rem]">
                    ดำเนินการอยู่
                </div>
                <div className="text-center mt-20">
                <div className="text-[1.2rem]">
                    ช่วงนี้เงียบๆนะ
                </div>
                <div className="h-16 py-2 ps-3 text-[1rem]">
                    เมื่อมีเพื่อนเริ่มต้นทำกิจกรรมอย่างเช่น เล่นเกมหรือเปิดไมค์คุยเล่นกัน
                    เราจะแสดงไว้ที่นี่
                </div>
                </div>
                </div>
                </div>
        </div>  
    </main>
    )
}