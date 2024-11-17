import '../styles/AvatarPageStyles.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link} from 'react-router-dom';
import { UserAvatar } from '../components/UserAvatar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState } from 'react';
import { AvatarContext } from '../context/AvatarContext';
import { avatarList } from '../styles/Avatars';
import { Alert, Modal } from 'react-bootstrap';

function AvatarPage(): JSX.Element {
  let { setAvatar } = useContext(AvatarContext);
  const changeAvatar = (chosenAvatar: number) => {
    setAvatar(avatarList[chosenAvatar].url);
  };
  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const handleShow = (locked: any, avatarNum: number) => {
    if (locked) {
      setShow(true);
    } else {
      changeAvatar(avatarNum)
    }
  };
  const handleClose = () => {
    setShow(false)
  };
  return (
<div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ECE5DB' }}>

  <div style={{ display: "flex", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 450, 
        justifyContent:'center', alignItems: 'center'}}>
    <Link to="/profile" className="text-decoration-none">
      <Button variant="outline-dark" className="d-flex align-items-center gap-2">
        <i className="bi bi-arrow-90deg-left" style={{ fontSize: '1.5rem' }}></i>
        <span style={{ fontSize: '1.5rem' }}>Back</span>
      </Button>
    </Link>
  
  <div className="text-black text-center">
    <span style={{ fontSize: '3.5rem', fontWeight: '600' }}>Avatars</span>
  </div>
  
  <div style={{display: 'flex', borderWidth: '10px', borderColor: 'black',
   padding: '10px', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}} className="text-black text-center">
      <UserAvatar/>
    <div className="d-flex align-items-center gap-1">
      <span style={{ fontSize: '1rem'}}>Currently Selected</span>
    </div>
  </div>
  </div>

<div style={{ display: "flex", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 50,
 justifyContent:'center', alignItems: 'center', padding:'10px'}}>
    <div style={{backgroundColor: '#FDF6EC', borderRadius: '60px',
     width:'200px', height:'500px'}} className="p-3 border">
       <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
        <Button style={{display: "flex", width: '100px', height: '100px', 
        justifyContent: 'center', alignItems: "center", opacity: '0.5'}} 
          variant="outline-dark" className="avatar1_3" disabled={disabled}
           onClick={() => {handleShow(true, 3);}}>
            <div style= {{width: '50px', height: '50px',}}className="lock">
            </div>
        </Button>
      </div>

       <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
        <Button style={{display: "flex", width: '100px', height: '100px', 
        justifyContent: 'center', alignItems: "center", opacity: '0.5'}} 
          variant="outline-dark" className="avatar1_2" disabled={disabled} 
          onClick={() => {handleShow(true, 2);}}>
             <div style= {{width: '50px', height: '50px',}}className="lock"></div>
        </Button>
      </div>

       <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
        <Button style={{display: "flex", width: '100px', height: '100px', 
        justifyContent: 'center', alignItems: "center"}} 
          variant="outline-dark" className="avatar1_1" onClick={() => handleShow(false, 1)}>
        </Button>
      </div>

       <div style={{ textAlign: 'center', fontSize: '1.3rem', fontWeight:'500' }}>
          Avatar 1
      </div>
    </div>

    <div style={{backgroundColor: '#FDF6EC', borderRadius: '60px',
     width:'200px', height:'500px'}} className="p-3 border">

      <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
        <Button style={{display: "flex", width: '100px', height: '100px', 
        justifyContent: 'center', alignItems: "center", opacity: '0.5'}} 
          variant="outline-dark" className="avatar2_3" disabled={disabled}>
             <div style= {{width: '50px', height: '50px',}}className="lock" 
             onClick={() => {handleShow(true, 6);}}></div>
        </Button>
      </div>

      <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
        <Button style={{display: "flex", width: '100px', height: '100px', 
        justifyContent: 'center', alignItems: "center", opacity: '0.5'}} 
          variant="outline-dark" className="avatar2_2" disabled={disabled} 
          onClick={() => {handleShow(true, 6);}}>
             <div style= {{width: '50px', height: '50px',}}className="lock"></div>
        </Button>
      </div>

       <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
        <Button style={{display: "flex", width: '100px', height: '100px', 
        justifyContent: 'center', alignItems: "center"}} 
          variant="outline-dark" className="avatar2_1" onClick={() => handleShow(false, 4)}>
        </Button>
      </div>
         <div style={{ textAlign: 'center', fontSize: '1.3rem', fontWeight:'500' }}>
          Avatar 2
      </div>
    </div>
    
    <div style={{backgroundColor: '#FDF6EC', borderRadius: '60px', 
    width:'200px', height:'500px'}} className="p-3 border">

      <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
        <Button style={{display: "flex", width: '100px', height: '100px', 
        justifyContent: 'center', alignItems: "center", opacity: '0.5'}} 
          variant="outline-dark" className="avatar3_3" disabled={disabled} 
          onClick={() => {handleShow(true, 9);}}>
             <div style= {{width: '50px', height: '50px',}}className="lock"></div>
        </Button>
      </div>

       <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
        <Button style={{display: "flex", width: '100px', height: '100px', 
        justifyContent: 'center', alignItems: "center", opacity: '0.5'}} 
          variant="outline-dark" className="avatar3_2" disabled={disabled} 
          onClick={() => {handleShow(true, 8);}}>
             <div style= {{width: '50px', height: '50px',}}className="lock" ></div>
        </Button>
      </div>

       <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
        <Button style={{display: "flex", width: '100px', height: '100px', 
        justifyContent: 'center', alignItems: "center"}} 
          variant="outline-dark" className="avatar3_1" onClick={() => handleShow(false, 7)}>
        </Button>
      </div>
         <div style={{ textAlign: 'center', fontSize: '1.3rem', fontWeight:'500' }}>
          Avatar 3
      </div>
        </div>
  </div>
  <Modal show = {show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Locked</Modal.Title>
        </Modal.Header>
           <Modal.Body>You need
          </Modal.Body>
      </Modal>

</div>

);
   
}





export default AvatarPage;