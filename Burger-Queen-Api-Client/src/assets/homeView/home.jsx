import { useNavigate } from "react-router-dom";

function HomeButton() {
    const navigate = useNavigate();

    function GoToLogin() {
        navigate("/Login");
    }


    return (
        <div>
            <h1>Burger Queen</h1>
            <button type="button" onClick={GoToLogin}>
                Administrador
            </button>
            <button type="button" onClick={GoToLogin}>
                Mesero
            </button>
            <button type="button" onClick={GoToLogin}>
                Cheff
            </button>
        </div>

    );
}
export default HomeButton