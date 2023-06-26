import image from '../../imgs/LogoBQ.png'
import './login.css';

const Login = () => {
    return (
        <div>
            
            <section className='imgLogoLogin'>
                <img src={image} />

            </section>
            <section className='datos'>
                <form>
                    <label> Correo Electronico
                        <input type="text" />
                    </label>
                    <label> boton contraseña
                        <input type="text" />
                    </label>
                    <button type='submit'>Iniciar Sesión</button>
                </form>


            </section>
        </div>
    )
}

export default Login