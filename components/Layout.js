import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Layout({children}){

    return(
    <> 
    <div className="sticky top-0 h-full">
        <Navbar/>    
    </div>
                {children}

    </>
    )
}