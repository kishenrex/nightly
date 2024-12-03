import { useContext, useEffect } from 'react';
import '../styles/AvatarPageStyles.css';
import '../styles/Avatars.ts';
import Image from 'react-bootstrap/Image';
import { AvatarContext } from '../context/AvatarContext'
import { ThemeContext } from '../context/ThemeContext';
const API_BASE_URL = 'http://localhost:3001';
export function UserAvatar (){
let { avatar, setAvatar} = useContext(AvatarContext);
useEffect(() => {
      const fetchAvatar = async () => {
          try {
              // Using the getUser endpoint instead
              const response = await fetch(`${API_BASE_URL}/users/testuser@example.com`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                  },
              });
  
              if (!response.ok) {
                  throw new Error('Failed to fetch avatar');
              }
              const {data} = await response.json();
              setAvatar(data.avatar);
          } catch (error) {
              console.error('Error fetching avatar:', error);
          }
      };
      fetchAvatar();
    }, []);
const { theme } = useContext(ThemeContext);
return (
    <div style= {{ display: 'flex', borderWidth:'10px', }} className='userAvatar'>  
    <Image style={{width:'100px', height: '100px',borderColor: theme.borderColor}}  className="border border-dark border-2"
      src={require(`../styles/AvatarImages/${avatar}`)} role= 'img' aria-label= 'userAvatar' roundedCircle />
    </div>
  );
}

//export default UserAvatar;