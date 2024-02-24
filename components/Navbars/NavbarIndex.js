import Link from "next/link"

export default function Navbar(){

    return(
    <nav className="h-10 m-4 flex">
        
       <Link href='/' className="flex flex-1 cursor-pointer">
        <img src="/logo.png" alt="home" className="h-12 w-10 pb-3"/>
        <h1 className="text-2xl">TalkToGo</h1>
        </Link>

    </nav>
    )
}