import Link from "next/link"


export default function Rooms(){
    return(
    <div className="h-96 w-full bg-gray-100 text-gray-700">
    <div className="w-full flex flex-col items-star">
        {/* room1 */}
            <Link className="flex px-2  items-center gap-2  w-full py-2  hover:bg-gray-700 rounded-md hover:text-white" href='/'>
                <img className="rounded-md h-11 w-11 bg-white shadow-md" src={'/roomPictureSample.jpg'} alt="Room picture"/>
                <p className="text-[1.0rem]">แก๊งก๊วนกวนซ่า</p>
            </Link>

        {/* room2 */}
        <Link className="flex px-2 items-center gap-2  w-full py-2  hover:bg-gray-700 rounded-md hover:text-white rounded-md" href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-md h-11 w-11 bg-white shadow-md"  alt="Room picture"/>
                <p className="text-[1.0rem]">ราชาเด็กเกรียน</p>
            </Link>

        {/* room3 */}
            <Link className="flex px-2 items-center gap-2  w-full py-2  hover:bg-gray-700 rounded-md hover:text-white" href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-md h-11 w-11 bg-white shadow-md"  alt="Room picture"/>
                <p className="text-[1.0rem]">อนุบาลเด็กเปรต</p>
            </Link>

        {/* room4 */}
            <Link className="flex px-2 items-center gap-2  w-full py-2  hover:bg-gray-700 rounded-md hover:text-white" href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-md h-11 w-11 bg-white shadow-md"  alt="Room picture"/>
                <p className="text-[1.0rem]">นักบู๋ตัวจริง</p>
            </Link>

        {/* room5 */}
            <Link className="flex px-2 items-center gap-2  w-full py-2  hover:bg-gray-700 rounded-md hover:text-white" href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-md h-11 w-11 bg-white shadow-md"  alt="Room picture"/>
                <p className="text-[1.0rem]">God of Wars</p>
            </Link>

        {/* room6 */}
            <Link className="flex px-2 items-center gap-2  w-full py-2  hover:bg-gray-700 rounded-md hover:text-white" href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-md h-11 w-11 bg-white shadow-md"  alt="Room picture"/>
                <p className="text-[1.0rem]">มามะ</p>
            </Link>

        {/* room7 */}
            <Link className="flex px-2 items-center gap-2  w-full py-2  hover:bg-gray-700 rounded-md hover:text-white" href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-md h-11 w-11 bg-white shadow-md"  alt="Room picture"/>
                <p className="text-[1.0rem]">เริ่มคุยกันเถอะ</p>
            </Link>


    </div>
    </div>
    )
}