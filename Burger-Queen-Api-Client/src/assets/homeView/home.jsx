import { useNavigate } from "react-router-dom";

function HomeButton() {
    const navigate = useNavigate();

    function GoToLogin() {
        navigate("/Login");
    }


    return (
        <div>
            <h1>Burger Quuueen</h1>
            <button type="button" onClick={GoToLogin}>
                Administradorito
            </button>
            <button type="button" onClick={GoToLogin}>
                Meserito
            </button>
            <button type="button" onClick={GoToLogin}>
                Cheffcito
            </button>
        </div>

    );
}
export default HomeButton