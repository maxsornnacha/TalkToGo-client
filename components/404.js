import Link from "next/link";


export default function Notfound(){

    return(
    <div className="bg-gray-900 h-screen">
            <div className="h-full text-white text-[2rem] flex flex-col gap-2 justify-center items-center">
                 <div>404 Not Found</div>
                 <Link href={'/main'}><img src="/logo.png" className="h-32 w-32"/></Link>
            </div>
    </div>
    )
}