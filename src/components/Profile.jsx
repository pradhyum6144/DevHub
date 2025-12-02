import './Profile.css'
import { useAuth } from '../context/AuthContext';

function Profile(){

  const {user} = useAuth();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const profileImage = user?.avatar_url 
        ? `${API_URL}${user.avatar_url}` 
        : "https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg="; 

    return(
        <div className="profile">
          <div className="profile-section">
            <div className="profile-pic">
               <img className="picture" src={profileImage} alt={`${user?.username || 'User'} profile`} />
            </div>
            <div className="details">
              <div className="user-name">{user?.username || 'User'}</div>
              <div className="user-email">{user?.email || 'user@gmail.com'}</div>
            </div>
          </div>
        </div>
    )
}

export default Profile