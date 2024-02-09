import Link from "next/link"
import Image from "next/image"

export default function Rooms(){
    return(
    <div className="h-screen overflow-auto scrollbar-hide">
    <div className="flex flex-col items-center gap-3">
            <Link href='/'>
                <Image className="rounded-full h-20 w-20" src={'/earth-74015.jpg'} height={50} width={50}/>
            </Link>

            <Link href='/'>
                <Image src={'/room1.jpg'}  className="rounded-full h-20 w-20 bg-white" width={50} height={50} alt="Room picture"/>
            </Link>

            <Link href='/'>
                <Image src={'/worldchat.png'}  className="rounded-full h-20 w-20 bg-white" width={50} height={50} alt="Room picture"/>
            </Link>

            <Link href='/'>
                <Image src={'/account.png'}  className="rounded-full h-20 w-20 bg-white" width={50} height={50} alt="Room picture"/>
            </Link>

            <Link href='/'>
                <Image src={'/favicon.ico'}  className="rounded-full h-20 w-20 bg-white" width={50} height={50} alt="Room picture"/>
            </Link>

            <Link href='/'>
                <Image src={'/next.svg'}  className="rounded-full h-20 w-20 bg-white" width={50} height={50} alt="Room picture"/>
            </Link>

            <Link href='/'>
                <Image src={'/vercel.svg'}  className="rounded-full h-20 w-20 bg-white" width={50} height={50} alt="Room picture"/>
            </Link>

            <Link href='/'>
                <Image src={'/worldchat.png'}  className="rounded-full h-20 w-20 bg-white" width={50} height={50} alt="Room picture"/>
            </Link>

            <Link href='/'>
                <Image src={'/room1.jpg'}  className="rounded-full h-20 w-20 bg-white" width={50} height={50} alt="Room picture"/>
            </Link>

            <Link href='/'>
                <Image src={'/room1.jpg'}  className="rounded-full h-20 w-20 bg-white" width={50} height={50} alt="Room picture"/>
            </Link>

            <Link href='/'>
                <Image src={'/room1.jpg'}  className="rounded-full h-20 w-20 bg-white" width={50} height={50} alt="Room picture"/>
            </Link>

            <Link href='/'>
                <Image src={'/room1.jpg'}  className="rounded-full h-20 w-20 bg-white" width={50} height={50} alt="Room picture"/>
            </Link>

            <Link href='/'>
                <Image src={'/room1.jpg'}  className="rounded-full h-20 w-20 bg-white" width={50} height={50} alt="Room picture"/>
            </Link>

            <Link href='/'>
                <Image src={'/room1.jpg'}  className="rounded-full h-20 w-20 bg-white" width={50} height={50} alt="Room picture"/>
            </Link>

            <Link href='/'>
                <Image src={'/worldchat.png'}  className="rounded-full h-20 w-20 bg-white" width={50} height={50} alt="Room picture"/>
            </Link>

    </div>
    </div>
    )
}