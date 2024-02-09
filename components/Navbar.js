import Link from "next/link"

export default function Navbar(){
    return(
    <nav className="py-3 bg-gray-900 text-white flex justify-between">
        <div className="ms-5">
            <Link className="text-[1.8rem]" href='/'>TalkToGo</Link>
        </div>
        <ul className="mt-3">
            <Link className="me-3" href='/'>Creating Room</Link>
            <Link className="me-3" href='/'>Sign in | Sign up</Link>
        </ul>
    </nav>
    )
}