import { useState } from "react";

export const ModalAddUsers = (isOpen, closeModal) => {
    const [data, saveData] = useState()
    if (!isOpen) return null;

    return (
        <div>
            <button onClick={() => closeModal(false)}>cerrar</button>
            <div>
                <h1>Registrar personal</h1>
                <form>
                    <div>
                        <label>Correo</label>
                        <input type="text" value={data} onChange={e => saveData(e.target.value)}></input> 
                    </div>
                    <div>
                        <label>contraseña</label>
                        <input type="text"></input>
                    </div>
                    <div>
                        <label>Rol</label>
                        <input type="text"></input>
                    </div>
                    <div>
                        <button>Añadir</button>
                    </div>
                    
                </form>


            </div>
        </div>

    )

}