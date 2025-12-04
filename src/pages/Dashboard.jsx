
import Chatbot from '../components/Chatbot';
import Navbar1 from '../components/Navbar1'
import Profile from '../components/Profile'
import Search from '../components/Search'




export default function Dashboard() {
    return (

        <div className='bg-[#000]'>
            <Navbar1 />

            <Profile />

            <Search />

            <Chatbot />
        </div>
    );
}
