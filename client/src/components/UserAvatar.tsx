import { useContext } from 'react';
import '../styles/AvatarPageStyles.css';
import '../styles/Avatars.ts';
import Image from 'react-bootstrap/Image';
import { AvatarContext } from '../context/AvatarContext'
import { ThemeContext } from '../context/ThemeContext';

export function UserAvatar (){
let { avatar } = useContext(AvatarContext);
const { theme } = useContext(ThemeContext);
return (
    <div style= {{ display: 'flex', borderWidth:'10px', }} className='userAvatar'>  
    <Image style={{width:'100px', height: '100px',borderColor: theme.borderColor}}  className="border border-dark border-2"
      src={require(`../styles/AvatarImages/${avatar}`)} role= 'img' aria-label= 'userAvatar' roundedCircle />
    </div>
  );
}

//export default UserAvatar;