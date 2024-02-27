import Link from "next/link"


export default function Rooms(){
    return(
    <div className="h-96 w-full bg-gray-100 text-gray-700 ">
    <div className="w-full flex flex-col items-star">
        {/* room1 */}
            <Link className="flex px-2  items-center gap-2  w-full py-2  hover:bg-yellow-200 rounded-md hover:text-gray-700" href='/'>
                <img className="rounded-md h-11 w-11 bg-white shadow-md" src={'/roomPictureSample.jpg'} alt="Room picture"/>
                <p className="text-[0.9rem]">แก๊งก๊วนกวนซ่า</p>
            </Link>

        {/* room2 */}
        <Link className="flex px-2 items-center gap-2  w-full py-2  hover:bg-yellow-200 rounded-md hover:text-gray-700 rounded-md" href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-md h-11 w-11 bg-white shadow-md"  alt="Room picture"/>
                <p className="text-[0.9rem]">ราชาเด็กเกรียน</p>
            </Link>

        {/* room3 */}
            <Link className="flex px-2 items-center gap-2  w-full py-2  hover:bg-yellow-200 rounded-md hover:text-gray-700" href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-md h-11 w-11 bg-white shadow-md"  alt="Room picture"/>
                <p className="text-[0.9rem]">อนุบาลเด็กเปรต</p>
            </Link>

        {/* room4 */}
            <Link className="flex px-2 items-center gap-2  w-full py-2  hover:bg-yellow-200 rounded-md hover:text-gray-700" href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-md h-11 w-11 bg-white shadow-md"  alt="Room picture"/>
                <p className="text-[0.9rem]">นักบู๋ตัวจริง</p>
            </Link>

        {/* room5 */}
            <Link className="flex px-2 items-center gap-2  w-full py-2  hover:bg-yellow-200 rounded-md hover:text-gray-700" href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-md h-11 w-11 bg-white shadow-md"  alt="Room picture"/>
                <p className="text-[0.9rem]">God of Wars</p>
            </Link>

        {/* room6 */}
            <Link className="flex px-2 items-center gap-2  w-full py-2  hover:bg-yellow-200 rounded-md hover:text-gray-700" href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-md h-11 w-11 bg-white shadow-md"  alt="Room picture"/>
                <p className="text-[0.9rem]">มามะ</p>
            </Link>

        {/* room7 */}
            <Link className="flex px-2 items-center gap-2  w-full py-2  hover:bg-yellow-200 rounded-md hover:text-gray-700" href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-md h-11 w-11 bg-white shadow-md"  alt="Room picture"/>
                <p className="text-[0.9rem]">เริ่มคุยกันเถอะ</p>
            </Link>


    </div>
    </div>
    )
}