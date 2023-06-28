import { useNavigate } from "react-router-dom";
const Vista1Admin = () => {
    const cloused = useNavigate()

    function GotoHome(){
        cloused("/")
    }
    return (

        <div>
            <h1>Página en contrucción</h1>
            <button id="signOff" type="button" onClick={GotoHome}>Cerrar sesión</button>
        </div>


    )

}

export default Vista1Admin