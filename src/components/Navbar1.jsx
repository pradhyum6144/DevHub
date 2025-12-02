import './Navbar1.css'
import { Code2 } from 'lucide-react'
import ProfileMenu from './ProfileMenu'

function Navbar1(){
    
    return(
        <>
        <div className={`navbar`}>
            <div className="logo-text">
                <button className="button"><Code2 className="w-8 h-8 text-white bg-[#0d1117] rounded-full" /></button>
                <h1 className="company-name">DevHub</h1>
            </div>

            <ProfileMenu />
        </div>
        </>
    )
}

export default Navbar1