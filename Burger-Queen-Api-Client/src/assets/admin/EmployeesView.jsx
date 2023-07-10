import { useNavigate } from "react-router-dom";
import { createUser, getData } from "../../services/Users.services";
import { useState, useEffect } from "react";
import './EmployeesView.css';
import image from '../../imgs/LogoBQ.png';

const EmployeesView = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura y cierre del modal
  const [getEmail, setEmail] = useState();
  const  [getPassword, setPassword] = useState();
  const  [getRol, setRol] = useState();
  useEffect(() => {
    getData(users)
      .then(res => {
        res.json()
          .then(setUsers);
      })
  }, []);

  const closed = useNavigate();

  function GotoHome() {
    closed("/");
  }

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleCreateUser() {
    createUser();
  }
  const handleImputChangeEmail = ({target}) =>{
    setEmail(target.value)
  }
  const handleImputChangePassword = ({target}) =>{
    setPassword(target.value)
  }
  const handleImputChangeRol = ({target}) =>{
    setRol(target.value)
  }
  const handledSubmit = (e) => {
    e.preventDefault()
    console.log(Object)
  }


  return (
    <div id='adminEmployeesContainer'>
      <nav>
        <img src={image} className='navLogo' alt='Burger Queen Logo'/>
        <i className="bi bi-box-arrow-right" id='logOut' onClick={GotoHome}></i>
      </nav>
      <section className="prodEmplButtons">
        <button type="button" className="employeesButton">Empleados</button>
        <button type="button" className="productsButton">Productos</button>
      </section>
      <section id="btnAdd">
        <button type="button" className="addButton" onClick={handleModalOpen}>Añadir Empleado</button>
      </section>
      <section className="tableSection">
        <table className="employeesTable">
          <thead>
            <tr>
              <th colSpan="4">Lista de empleados</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td><i className="bi bi-pencil-fill"></i></td>
                    <td><i className="bi bi-trash3-fill"></i></td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>
      {isModalOpen && (
        <form onSubmit={handledSubmit}>
        <div className="modal">
          {/* Contenido del modal */}
          <div className="modal-content">
           <button type="button" className="btnClose" onClick={handleModalClose}>X</button>
            {/* Aquí puedes agregar los inputs y botones necesarios */}
            <label value={getEmail} onChange={handleImputChangeEmail}>Correo</label>
            <input type="text" placeholder="Email" />
            <label>Contraseña</label>
            <input type="password" placeholder="Contraseña" value={getPassword} onChange={handleImputChangePassword} />
            <label>Rol</label>
            <input type="text" placeholder="Rol" value={getRol} onChange={handleImputChangeRol}/>
            <button type="submit"onClick={handleCreateUser}>Guardar cambios</button>
          </div>
        </div>
        </form>
      )}
    </div>
  );
};

export default EmployeesView;