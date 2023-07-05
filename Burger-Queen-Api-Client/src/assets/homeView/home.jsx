import image from '../../imgs/LogoBQ.png'
import { useNavigate } from "react-router-dom";
import './home.css'

function HomeButton() {
    const navigate = useNavigate();

    function GoToLogin() {
        navigate("/Login");
    }

    return (
        <section id='container'>            
            <section id='logo'>
                <img src={image} className='login-logo' alt='Burger Queen Logo'/>
            </section>
            <section id='buttonsContainer'> 
                <button type="button" className='homeButton' onClick={GoToLogin}>
                    Administrador
                </button>
                <button type="button" className='homeButton'  onClick={GoToLogin}>
                    Mesero
                </button>
                <button type="button" className='homeButton'  onClick={GoToLogin}>
                    Cheff
                </button>
            </section>           
        </section>
    );
}
export default HomeButton