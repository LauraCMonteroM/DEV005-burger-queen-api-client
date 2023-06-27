import image from '../../imgs/LogoBQ.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Auth() {
        const [errorMessage, setErrorMessage] = useState('');
          const { register, handleSubmit, formState: { errors }, reset } = useForm();
          // Navegar en la interfaz
          const navigateTo = useNavigate();
          // Información almacenada en la API
          const token = localStorage.getItem('accessToken');
          const userEmail = localStorage.getItem('userEmail');
          const userRole = localStorage.getItem('userRole');
          // Función que interactúa con la API
          const onSubmit = (data) => {
          console.log(data);
          console.log(data.email);
          console.log(data.password);
        
            fetch('http://localhost:8080/login', {
        
              method: 'POST',
              body: JSON.stringify({ email: data.email, password: data.password }),  // data can be `string` or {object}!
              headers: {
                'Content-Type': 'application/json'
              }
            }
            )           
            .then(async (response) => {
              if(response.ok){
                return response.json();
              }
              throw new Error(await response.json());
            })
            .then((data) => {
              if(data.user.role === 'admin'){
                navigateTo('/admin');
                console.log('EL TOKEN', token);
                console.log('EL MAIL', userEmail);
                console.log('EL ROL', userRole);
              }
            })
            .catch((error) => {
              if(error.message === 'Cannot find user'){
                error.message = 'Usuario no existe';
              } else if (error.message === 'Incorrect password'){
                error.message = 'Contraseña incorrecta';
              } else {
                error.message = 'Credenciales incorrectas, ponte en contacto con el administrador'
              }
              setErrorMessage(error.message);
              reset();
              })
              console.log(data.password) ;
          }
          return (
            <section id='loginContainer'>
                <section id='logoLogin'>
                <img src={image} className='login-logo' alt='Burger Queen Logo'/>
                </section>
                <section id='loginForm'>
                    <form onSubmit = { handleSubmit(onSubmit) }>
                        <div>
                            <label>Email</label>
                            <input type="text" {...register('email', {
                                required: true,
                                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            })}/>
                        </div>
                        <div>
                            <label>Contraseña</label>
                            <input type="password" {...register('password')} />
                        </div>
                        <div>
                            <span>
                                {errors.email?.type === 'required' && <p>El correo es requerido</p>}
                                {errors.email?.type === 'pattern' && <p>El formato del email es incorrecto, se espera: ejemplo@ejemplo.ejemplo</p>}
                                {errors.password?.type === 'required' && <p>La contraseña es requerida</p>}
                                {errorMessage ? (<div className='error-message'>{errorMessage}</div>):''}
                            </span>
                        </div>
                        <button type='submit'>INICIAR SESION</button>
                    </form>
                </section>
            </section>
             )
    }
        
export default Auth