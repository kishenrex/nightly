import React, { useEffect, useState } from 'react';
import '../styles/AvatarPageStyles.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '../components/UserAvatar';
import { Row, Col, Container, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function AvatarPage(): JSX.Element {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/profile`;
    navigate(path);
  }
   const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <div>
        <div style={{ display: 'inline-block', justifyContent: 'left', alignItems: 'left', padding: '20px' }}>
            <Button className='backButton' role="button" aria-label="back" onClick={routeChange} variant="primary">
                <i className="bi bi-arrow-90deg-left"></i> Back
            </Button>
        </div>

        <div style={{ display: 'inline-block', justifyContent: 'center', alignItems: 'center' , paddingLeft: '430px'}}>
             <h1 className='title' >Avatars</h1>
        </div>

        <div style={{ display: 'inline-block', float: "right", justifyContent: 'center', alignItems: 'center', paddingRight: '45px'  }}>
            <UserAvatar></UserAvatar>
        </div>

        <div style={{paddingLeft: '1060px'}}>
                Currently Selected
        </div>

        <Container className='container' >
            <Row>
                <Col className='col_1'>
                    Avatar 1
                </Col>
                <Col  className='col_2'>
                   Avatar 2
                </Col>
                <Col className='col_3'>
                   Avatar 3
                </Col>
            </Row>
    </Container>

<Button variant="primary" onClick={handleShow}>
        Launch Modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

</div>

);
   
}





export default AvatarPage;