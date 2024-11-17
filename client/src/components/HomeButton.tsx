import Button from 'react-bootstrap/Button';
import '../styles/TimerPageStyles.css';
import { useNavigate } from "react-router-dom";

function HomeButton(): JSX.Element {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/calendar`;
    navigate(path);
  }

return (
    <div>
        <Button style={{
        color: 'white',
        backgroundColor: '#282c34',
        fontSize: '30px',
        borderWidth: '3px',
        borderRadius: '10px',
        borderColor: 'white',
        width: '60px',
        height: '60px',
        cursor: 'pointer',
        }}className='homeButton' role="button" aria-label="home" onClick={routeChange} variant="primary">
          <i className="bi bi-house"></i>
        </Button>
    </div>
  );
}

export default HomeButton;

 