import '../styles/AvatarPageStyles.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link} from 'react-router-dom';
import { UserAvatar } from '../components/UserAvatar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState } from 'react';
import { AvatarContext } from '../context/AvatarContext';
import { ThemeContext } from '../context/ThemeContext';
import { avatarList } from '../styles/Avatars';
import { Modal } from 'react-bootstrap';
const API_BASE_URL = 'http://localhost:3001';

function AvatarPage(): JSX.Element {
  const [error, setError] = useState<string | null>(null);
  let { setAvatar } = useContext(AvatarContext);
  const {theme} = useContext(ThemeContext);
  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [lockedMessage, setLockedMessage] = useState(0);
  const changeAvatar = async (chosenAvatar: number) => {
    try {
      setError(null);

      const response = await fetch(`${API_BASE_URL}/users/testuser@example.com`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          avatar: avatarList[chosenAvatar].url
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update user avatar');
      }
    setAvatar(avatarList[chosenAvatar].url);
  }catch (err) {
      console.error('Update error:', err);
      setError('Failed to update user avatar. Please try again.');
    }
  };
  const handleShow = (locked: any, avatarNum: number) => {
    if (locked) {
      if (avatarNum === 2 || avatarNum === 5 || avatarNum === 8){
        setLockedMessage(50);
      } else if (avatarNum === 3 || avatarNum === 6 || avatarNum === 9){
        setLockedMessage(100);
      }
      setShow(true);
    } else {
      changeAvatar(avatarNum);
    }
  };
  const handleClose = () => {
    setShow(false)
  };
  return (
<div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', 
backgroundColor: theme.background }}>

  <div style={{ display: "flex", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 450, 
        justifyContent:'center', alignItems: 'center'}}>
    <Link to="/profile" className="text-decoration-none">
      <Button variant="outline-light" className="d-flex align-items-center gap-2">
        <i className="bi bi-arrow-90deg-left" style={{ fontSize: '1.5rem', color: theme.fontColor }}></i>
        <span style={{ fontSize: '1.5rem' , color: theme.fontColor}}>Back</span>
      </Button>
    </Link>
  
  <div className="text-black text-center">
    <span style={{ fontSize: '3.5rem', fontWeight: '600', color: theme.fontColor }}>Avatars</span>
  </div>
  
  <div style={{display: 'flex', borderWidth: '10px', borderColor: 'black',
   padding: '10px', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}} className="text-black text-center">
      <UserAvatar/>
    <div className="d-flex align-items-center gap-1">
      <span style={{ fontSize: '1rem', color: theme.fontColor}}>Currently Selected</span>
    </div>
  </div>
  </div>

<div style={{ display: "flex", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 50,
 justifyContent:'center', alignItems: 'center', padding:'10px'}}>
    <div style={{backgroundColor: theme.foreground, borderRadius: '60px',
     width:'200px', height:'500px', }} className="p-3 border">
       <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center',padding: '20px'}}>
        <Button style={{ backgroundImage: `url("${require(`../styles/AvatarImages/Avatar1/raichu.png`)}")`,
        display: "flex", width: '100px', height: '100px', 
        justifyContent: 'center', alignItems: "center", opacity: '0.5'}} 
          variant="outline-dark" className="avatar1_3" aria-label= 'avatar1_3' disabled={disabled}
           onClick={() => {handleShow(true, 3);}}>
            <div style= {{width: '50px', height: '50px',}}className="lock">
            </div>
        </Button>
      </div>

       <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center',padding: '20px'}}>
        <Button style={{backgroundImage: `url("${require(`../styles/AvatarImages/Avatar1/pikachu.png`)}")`,
        display: "flex", width: '100px', height: '100px', 
        justifyContent: 'center', alignItems: "center", opacity: '0.5'}} 
          variant="outline-dark" className="avatar1_2" aria-label= 'avatar1_2' disabled={disabled} 
          onClick={() => {handleShow(true, 2);}}>
             <div style= {{width: '50px', height: '50px',}}className="lock"></div>
        </Button>
      </div>

       <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center',padding: '20px'}}>
        <Button style={{backgroundImage: `url("${require(`../styles/AvatarImages/Avatar1/pichu.png`)}")`,
        display: "flex", width: '100px', height: '100px', 
        justifyContent: 'center', alignItems: "center"}} 
          variant="outline-dark" className="avatar1_1" aria-label= 'avatar1_1' onClick={() => handleShow(false, 1)}>
        </Button>
      </div>

       <div style={{ textAlign: 'center', fontSize: '1.3rem', fontWeight:'500' , color: theme.fontColor}}>
          Avatar 1
      </div>
    </div>

    <div style={{backgroundColor: theme.foreground, borderRadius: '60px',
     width:'200px', height:'500px'}} className="p-3 border">

      <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center',padding: '20px'}}>
        <Button style={{backgroundImage: `url("${require(`../styles/AvatarImages/Avatar2/blastoise.png`)}")`,
        display: "flex", width: '100px', height: '100px', 
        justifyContent: 'center', alignItems: "center", opacity: '0.5'}} 
          variant="outline-dark" className="avatar2_3" aria-label= 'avatar2_3' disabled={disabled}>
             <div style= {{width: '50px', height: '50px',}}className="lock" 
             onClick={() => {handleShow(true, 6);}}></div>
        </Button>
      </div>

      <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center',padding: '20px'}}>
        <Button style={{backgroundImage: `url("${require(`../styles/AvatarImages/Avatar2/wartortle.png`)}")`,
        display: "flex", width: '100px', height: '100px', 
        justifyContent: 'center', alignItems: "center", opacity: '0.5'}} 
          variant="outline-dark" className="avatar2_2" aria-label= 'avatar2_2' disabled={disabled} 
          onClick={() => {handleShow(true, 5);}}>
             <div style= {{width: '50px', height: '50px',}}className="lock"></div>
        </Button>
      </div>

       <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center',padding: '20px'}}>
        <Button style={{backgroundImage: `url("${require(`../styles/AvatarImages/Avatar2/squirtle.png`)}")`,
        display: "flex", width: '100px', height: '100px', 
        justifyContent: 'center', alignItems: "center"}} 
          variant="outline-dark" className="avatar2_1" aria-label= 'avatar2_1' onClick={() => handleShow(false, 4)}>
        </Button>
      </div>
         <div style={{ textAlign: 'center', fontSize: '1.3rem', fontWeight:'500', color: theme.fontColor }}>
          Avatar 2
      </div>
    </div>
    
    <div style={{backgroundColor: theme.foreground, borderRadius: '60px', 
    width:'200px', height:'500px'}} className="p-3 border">

      <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center',padding: '20px'}}>
        <Button style={{backgroundImage: `url("${require(`../styles/AvatarImages/Avatar3/charizard.png`)}")`,
        display: "flex", width: '100px', height: '100px', 
        justifyContent: 'center', alignItems: "center", opacity: '0.5'}} 
          variant="outline-dark" className="avatar3_3" aria-label= 'avatar3_3' disabled={disabled} 
          onClick={() => {handleShow(true, 9);}}>
             <div style= {{width: '50px', height: '50px',}}className="lock"></div>
        </Button>
      </div>

       <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center',padding: '20px'}}>
        <Button style={{backgroundImage: `url("${require(`../styles/AvatarImages/Avatar3/charmeleon.png`)}")`,
        display: "flex", width: '100px', height: '100px', 
        justifyContent: 'center', alignItems: "center", opacity: '0.5'}} 
          variant="outline-dark" className="avatar3_2" aria-label= 'avatar3_2' disabled={disabled} 
          onClick={() => {handleShow(true, 8);}}>
             <div style= {{width: '50px', height: '50px',}}className="lock" ></div>
        </Button>
      </div>

       <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center',padding: '20px'}}>
        <Button style={{backgroundImage: `url("${require(`../styles/AvatarImages/Avatar3/charmander.png`)}")`,
        display: "flex", width: '100px', height: '100px', 
        justifyContent: 'center', alignItems: "center"}} 
          variant="outline-dark" className="avatar3_1" aria-label= 'avatar3_1' onClick={() => handleShow(false, 7)}>
        </Button>
      </div>
         <div style={{ textAlign: 'center', fontSize: '1.3rem', fontWeight:'500', color: theme.fontColor }}>
          Avatar 3
      </div>
        </div>
  </div>
  <Modal show = {show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Locked</Modal.Title>
        </Modal.Header>
           <Modal.Body>You need a streak of {lockedMessage} to unlock this avatar
          </Modal.Body>
      </Modal>

</div>

);
   
}





export default AvatarPage;