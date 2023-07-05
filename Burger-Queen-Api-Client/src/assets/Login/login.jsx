import image from '../../imgs/LogoBQ.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './login.css'
import { loginAdmin } from '../../services/Login.services';

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
    loginAdmin(data)    
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(await response.json());
      })
      .then((data) => {
        if (data.user.role === 'admin') {
          navigateTo('/admin');
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('userEmail', data.user.email);
          localStorage.setItem('userRole', data.user.role);
          localStorage.setItem('userId', data.user.id);          
        } else if (data.user.role === 'waiter') {
          navigateTo('/menu')
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('userEmail', data.user.email);
          localStorage.setItem('userRole', data.user.role);
          localStorage.setItem('userId', data.user.id);
        } else if (data.user.role === 'cheff') {
          navigateTo('/cheff')
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('userEmail', data.user.email);
          localStorage.setItem('userRole', data.user.role);
          localStorage.setItem('userId', data.user.id);
        }
      })
      .catch((error) => {
        if (error.message === 'Cannot find user') {
          error.message = 'Usuario no existe';
        } else if (error.message === 'Incorrect password') {
          error.message = 'Contraseña incorrecta';
        } else {
          error.message = 'Datos incorrectos'
        }
        setErrorMessage(error.message);
        reset();
      })
  }
  return (
    <section id='loginContainer'>
      <section id='logoLogin'>
        <img src={image} className='login-logo' alt='Burger Queen Logo' />
      </section>
      <section id='loginForm'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='label-input'>
            <label>Email</label>
            <input type="text" {...register('email', {
              required: true,
              pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            })} />
          </div>
          <div className='label-input'>
            <label>Contraseña</label>
            <input type="password" {...register('password')} />
          </div>
          <div className='spanError'>
            <span className='errorMessage'>
              {errors.email?.type === 'required' && <p>El correo es requerido</p>}
              {errors.email?.type === 'pattern' && <p>El formato del email es incorrecto</p>}
              {errors.password?.type === 'required' && <p>La contraseña es requerida</p>}
              {errorMessage ? (<div className='error-message'>{errorMessage}</div>) : ''}
            </span>
          </div>
          <button type='submit' className='btnLogin'>INICIAR SESION</button>
        </form>
      </section>
    </section>
  )
}

export default Auth