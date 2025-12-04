import { useParams, useNavigate } from 'react-router-dom'
import Navbar1 from '../components/Navbar1'
import IssueList from '../components/IssueList.jsx'
import { data } from '../components/data.js';
import './OrganizationPage.css'
import { GoIssueOpened, GoIssueClosed } from "react-icons/go"
import Chatbot from '../components/Chatbot.jsx'

function OrganizationPage(){

    const { orgId } = useParams();
    const navigate = useNavigate();

    const org = data.find(o => o.id === orgId );

    return (
        <div className='bg-[#000] w-full min-h-screen'>
            <Navbar1 />

            <div className='details'>
                <div className='container'>
                    <div className="back-class">
                        <button className="back"  onClick={() => navigate("/dashboard")} >← Back to Organizations</button>
                    </div>
                    <div className="org-per-detials">
                        <h1 className="org-name">{org.organizationName}</h1>
                        <p className="org-info">{org.description}</p>
                        <div className="org-issue-info">
                            <span className='open-issue'><GoIssueOpened color="#56d364"/>{ org.openIssues } Open</span>
                            <span className='close-issue'><GoIssueClosed color="#8250df"/>{ org.closedIssues } Closed</span>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <IssueList issues={org.issues}/>
            </div>
            <Chatbot />
        </div>

    )
}

export default OrganizationPage