import Button from 'react-bootstrap/Button';
import '../styles/TimerPageStyles.css';
import { useNavigate } from "react-router-dom";

function HomeButton(): JSX.Element {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/home`;
    navigate(path);
  }

return (
    <div>
        <Button className='homeButton' role="button" aria-label="home" onClick={routeChange} variant="primary">
          <i className="bi bi-house"></i>
        </Button>
    </div>
  );
}

export default HomeButton;

 