import { useNavigate } from "react-router-dom";
import {editDataUser,
  createUser,
  getData,
} from "../../services/Users.services";
import { useState, useEffect } from "react";
import "./EmployeesView.css";
import image from "../../imgs/LogoBQ.png";

const EmployeesView = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura y cierre del modal

  useEffect(() => {
    getData().then((res) => {
      res.json().then(setUsers);
    });
  }, []);

  function GotoHome() {
    logOut("/");
  }

  function handleModalOpen(userId) {
    setIsModalOpen(true);
    setIsEditModalOpen(false)
    setEditUserId(userId);
  }

  const handleEditModalOpen = () => {
    setIsModalOpen(true)
    setIsEditModalOpen(true);
  };

  function handleModalClose() {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  }

  function handleCreateUser() {
    createUser();
  }

  return (
    <div id="adminEmployeesContainer">
      <nav>
        <img src={image} className="navLogo" alt="Burger Queen Logo" />
        <i className="bi bi-box-arrow-right" id="logOut" onClick={GotoHome}></i>
      </nav>
      <section className="prodEmplButtons">
        <button type="button" className="employeesButton">
          Empleados
        </button>
        <button type="button" className="productsButton">
          Productos
        </button>
      </section>
      <section id="btnAdd">
        <button type="button" className="addButton" onClick={() => handleModalOpen()}>
          Añadir Empleado
        </button>
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
                  <td>
                    <i className="bi bi-pencil-fill" onClick={() => handleEditModalOpen(user.id)}></i>
                  </td>
                  <td>
                    <i className="bi bi-trash3-fill"></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      {isModalOpen && (
        <form onSubmit={handledSubmit}>
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            {/* Aquí puedes agregar los inputs y botones necesarios */}
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Contraseña" />
            <input type="text" placeholder="Rol" />
            <button type="button" onClick={handleModalClose}>Cerrar</button>
            <button type="submit"onClick={handleCreateUser}>Guardar cambios</button>
          </div>
        </div>
        </form>
      )}
    </div>
  );
};

export default EmployeesView;
