import { useContext } from 'react';
import '../styles/AvatarPageStyles.css';
import '../styles/Avatars.ts';
import Image from 'react-bootstrap/Image';
import { AvatarContext } from '../context/AvatarContext'
import { avatarList } from '../styles/Avatars';

export function UserAvatar (){
let { avatar } = useContext(AvatarContext);
//avatar = avatarList.avatar1_1.url;
//let { avatar } = props.chosenAvatar;
return (
    <div style= {{ display: 'flex', borderWidth:'10px', borderColor: 'black'}} className='userAvatar'>  
    <Image style={{width:'100px', height: '100px'}}  className="border border-dark border-2"
      src={require(`../styles/AvatarImages/${avatar}`)} roundedCircle />
    </div>
  );
}

//export default UserAvatar;