import Link from "next/link"


export default function RoomsOnMain(){
    return(
    <div className="h-screen w-full bg-gray-900 h-screen overflow-auto overflow-hidden hover:overflow-scroll hidden lg:block pb-40">
    <div className="w-full flex flex-col items-center ">
        {/* room1 */}
            <Link className="flex px-2  items-center gap-2  py-2 rounded-full " href='/'>
                <img className="rounded-full hover:rounded-xl h-16 w-16 hover:bg-gray-500 shadow-md" src={'/roomPictureSample.jpg'} alt="Room picture"/>
            </Link>

        {/* room2 */}
        <Link className="flex px-2 items-center gap-2  py-2 rounded-full " href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-full hover:rounded-xl h-16 w-16 hover:bg-gray-700 shadow-md"  alt="Room picture"/>
            </Link>

        {/* room3 */}
            <Link className="flex px-2 items-center gap-2  py-2 rounded-full " href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-full hover:rounded-xl h-16 w-16 hover:bg-gray-700 shadow-md"  alt="Room picture"/>
            </Link>

        {/* room4 */}
            <Link className="flex px-2 items-center gap-2  py-2 rounded-full " href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-full hover:rounded-xl h-16 w-16 hover:bg-gray-700 shadow-md"  alt="Room picture"/>
            </Link>

        {/* room5 */}
            <Link className="flex px-2 items-center gap-2  py-2 rounded-full " href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-full hover:rounded-xl h-16 w-16 hover:bg-gray-700 shadow-md"  alt="Room picture"/>
            </Link>

        {/* room6 */}
            <Link className="flex px-2 items-center gap-2  py-2 rounded-full " href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-full hover:rounded-xl h-16 w-16 hover:bg-gray-700 shadow-md"  alt="Room picture"/>
            </Link>

        {/* room7 */}
            <Link className="flex px-2 items-center gap-2  py-2 rounded-full " href='/'>
                <img src={'/logo.png'}  className="rounded-full hover:rounded-xl h-16 w-16 hover:bg-gray-700 shadow-md"  alt="Room picture"/>
            </Link>

        {/* room8 */}
        <Link className="flex px-2 items-center gap-2  py-2 rounded-full " href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-full hover:rounded-xl h-16 w-16 hover:bg-gray-700 shadow-md"  alt="Room picture"/>
            </Link>

          {/* room9 */}
          <Link className="flex px-2 items-center gap-2  py-2 rounded-full " href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-full hover:rounded-xl h-16 w-16 hover:bg-gray-700 shadow-md"  alt="Room picture"/>
            </Link>

             {/* room10 */}
          <Link className="flex px-2 items-center gap-2  py-2 rounded-full " href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-full hover:rounded-xl h-16 w-16 hover:bg-gray-700 shadow-md"  alt="Room picture"/>
            </Link>

              {/* room11 */}
          <Link className="flex px-2 items-center gap-2  py-2 rounded-full " href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-full hover:rounded-xl h-16 w-16 hover:bg-gray-700 shadow-md"  alt="Room picture"/>
            </Link>

              {/* room12 */}
          <Link className="flex px-2 items-center gap-2  py-2 rounded-full " href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-full hover:rounded-xl h-16 w-16 hover:bg-gray-700 shadow-md"  alt="Room picture"/>
            </Link>

              {/* room13 */}
          <Link className="flex px-2 items-center gap-2  py-2 rounded-full " href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-full hover:rounded-xl h-16 w-16 hover:bg-gray-700 shadow-md"  alt="Room picture"/>
            </Link>

              {/* room14 */}
          <Link className="flex px-2 items-center gap-2  py-2 rounded-full " href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-full hover:rounded-xl h-16 w-16 hover:bg-gray-700 shadow-md"  alt="Room picture"/>
            </Link>

             {/* room15 */}
          <Link className="flex px-2 items-center gap-2  py-2 rounded-full " href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-full hover:rounded-xl h-16 w-16 hover:bg-gray-700 shadow-md"  alt="Room picture"/>
            </Link>

             {/* room16 */}
          <Link className="flex px-2 items-center gap-2  py-2 rounded-full " href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-full hover:rounded-xl h-16 w-16 hover:bg-gray-700 shadow-md"  alt="Room picture"/>
            </Link>

             {/* room17 */}
          <Link className="flex px-2 items-center gap-2  py-2 rounded-full " href='/'>
                <img src={'/roomPictureSample.jpg'}  className="rounded-full hover:rounded-xl h-16 w-16 hover:bg-gray-700 shadow-md"  alt="Room picture"/>
            </Link>

              {/* room18 */}
          <Link className="flex px-2 items-center gap-2  py-2 rounded-full " href='/'>
                <img src={'/like1.png'}  className="rounded-full hover:rounded-xl h-16 w-16 hover:bg-gray-700 shadow-md"  alt="Room picture"/>
            </Link>


    </div>
    </div>
    )
}