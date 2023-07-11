import { useNavigate } from "react-router-dom";
import {
  editDataUser,
  createUser,
  getData,
} from "../../services/Users.services";
import { useState, useEffect } from "react";
import "./EmployeesView.css";
import image from "../../imgs/LogoBQ.png";

const EmployeesView = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const logOut = useNavigate();
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    getData().then((res) => {
      res.json().then(setUsers);
    });
  }, []);

  useEffect(() => {
    if(editUserId !== null){
     getData().then((res) => {
      res.json().then(setUsers);
    }); 
    }    
  }, [editUserId]);

  function GotoHome() {
    logOut("/");
  }

  function handleModalOpen() {
    setIsModalOpen(true);
    setIsEditModalOpen(false)
    
  }

  const handleEditModalOpen = (userId) => {
    setIsModalOpen(true)
    setIsEditModalOpen(true);
    setEditUserId(userId);
  };

  function handleModalClose() {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  }

  const handleCreateUser = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
      role: role,
    
    };
    createUser(newUser)
      .then((res) => {
        // console.log(res);
        newUser.id = res.id;
        setUsers([...users, newUser]);
        handleModalClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    const editedUser = {
      id: editUserId,
      email: email,
      password: password,
      role: role,
    };
    
    editDataUser(editedUser)
      .then((res) => {
        console.log(res);
        const updatedUsers = users.map((user) => {
          if (user.id === editUserId) {
            console.log(editUserId);
            return editedUser;
          } else {
            return user;
          }
        });
        setUsers(updatedUsers);
        handleModalClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setRole(newRole);
  };


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
        <button type="button" className="addButton" onChange={() => handleModalOpen()}>
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
        <div className="modal">
          <div className="modal-content">
            <i
              className="bi bi-x-square-fill closeButton"
              onClick={handleModalClose}
            ></i>
            {isEditModalOpen ? (
              <form onSubmit={handleEditUser}>
                <h2>Editar usuario</h2>
                <label className="modalLabel">Correo Electrónico</label>
                <input
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                />
                <label className="modalLabel">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <label className="modalLabel">Rol</label>
                <input
                  type="text"
                  value={role}
                  name="role"
                  onChange={handleRoleChange}
                />
                <button type="submit" className="modalButton">
                  Guardar
                </button>
              </form>
            ) : (
              <form onSubmit={handleCreateUser}>
                <h2>Añadir usuario</h2>
                <label className="modalLabel">Correo Electrónico</label>
                <input
                  type="text"
                  placeholder="ejemplo@ejemplo.com"
                  value={email}
                  onChange={handleEmailChange}
                />
                <label className="modalLabel">Contraseña</label>
                <input
                  type="password"
                  placeholder="****************"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <label className="modalLabel">Rol</label>
                <input
                  type="text"
                  placeholder="Waiter/Chef/Admin"
                  value={role}
                  onChange={handleRoleChange}
                />
                <button type="submit" className="modalButton">
                  Añadir
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeesView;