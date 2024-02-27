import Link from "next/link"


export default function RoomsOnMain(){
    return(
    <div className="h-96 w-full bg-gray-100 h-screen overflow-auto overflow-hidden hover:overflow-scroll hidden lg:block">
    <div className="w-full flex flex-col items-start">
        {/* room1 */}
            <Link className="flex px-2  items-center gap-2  w-full py-2  hover:bg-yellow-200 rounded-full hover:text-gray-700" href='/'>
                <img className="rounded-full h-16 w-16 bg-white shadow-md" src={'/roomPictureSample.jpg'} alt="Room picture"/>
            </Link>

        {/* room2 */}
        <Link className="flex px-2 items-center gap-2  w-full py-2  hover:bg-yellow-200 rounded-full hover:text-gray-700 rounded-full" href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-full h-16 w-16 bg-white shadow-md"  alt="Room picture"/>
            </Link>

        {/* room3 */}
            <Link className="flex px-2 items-center gap-2  w-full py-2  hover:bg-yellow-200 rounded-full hover:text-gray-700" href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-full h-16 w-16 bg-white shadow-md"  alt="Room picture"/>
            </Link>

        {/* room4 */}
            <Link className="flex px-2 items-center gap-2  w-full py-2  hover:bg-yellow-200 rounded-full hover:text-gray-700" href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-full h-16 w-16 bg-white shadow-md"  alt="Room picture"/>
            </Link>

        {/* room5 */}
            <Link className="flex px-2 items-center gap-2  w-full py-2  hover:bg-yellow-200 rounded-full hover:text-gray-700" href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-full h-16 w-16 bg-white shadow-md"  alt="Room picture"/>
            </Link>

        {/* room6 */}
            <Link className="flex px-2 items-center gap-2  w-full py-2  hover:bg-yellow-200 rounded-full hover:text-gray-700" href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-full h-16 w-16 bg-white shadow-md"  alt="Room picture"/>
            </Link>

        {/* room7 */}
            <Link className="flex px-2 items-center gap-2  w-full py-2  hover:bg-yellow-200 rounded-full hover:text-gray-700" href='/'>
                <img src={'/logo.png'}  className="rounded-full h-16 w-16 bg-white shadow-md"  alt="Room picture"/>
            </Link>

        {/* room8 */}
        <Link className="flex px-2 items-center gap-2  w-full py-2  hover:bg-yellow-200 rounded-full hover:text-gray-700" href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-full h-16 w-16 bg-white shadow-md"  alt="Room picture"/>
            </Link>

          {/* room9 */}
          <Link className="flex px-2 items-center gap-2  w-full py-2  hover:bg-yellow-200 rounded-full hover:text-gray-700" href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-full h-16 w-16 bg-white shadow-md"  alt="Room picture"/>
            </Link>

             {/* room10 */}
          <Link className="flex px-2 items-center gap-2  w-full py-2  hover:bg-yellow-200 rounded-full hover:text-gray-700" href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-full h-16 w-16 bg-white shadow-md"  alt="Room picture"/>
            </Link>


    </div>
    </div>
    )
}