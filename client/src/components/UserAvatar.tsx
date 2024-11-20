import { useContext } from 'react';
import '../styles/AvatarPageStyles.css';
import '../styles/Avatars.ts';
import Image from 'react-bootstrap/Image';
import { AvatarContext } from '../context/AvatarContext'

export function UserAvatar (){
let { avatar } = useContext(AvatarContext);
return (
    <div style= {{ display: 'flex', borderWidth:'10px', borderColor: 'black'}} className='userAvatar'>  
    <Image style={{width:'100px', height: '100px'}}  className="border border-dark border-2"
      src={require(`../styles/AvatarImages/${avatar}`)} role= 'img' aria-label= 'userAvatar' roundedCircle />
    </div>
  );
}

//export default UserAvatar;