import { useNavigate } from "react-router-dom";
import {
  editDataUser,
  createUser,
  getData,
  getDataOnlyUser,
  deleteUser,
} from "../../services/Users.services";
import { useState, useEffect } from "react";
import "./EmployeesView.css";
import image from "../../imgs/LogoBQ.png";

const EmployeesView = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const logOut = useNavigate();

  useEffect(() => {
    getData().then((res) => {
      res.json().then(setUsers);
    });
  }, []);

  useEffect(() => {
    if (editUserId !== null) {
      getDataOnlyUser(editUserId)
        .then((res) => res.json())
        .then((data) => {
          setEditUser(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [editUserId]);

  function handleModalOpen() {
    setIsModalOpen(true);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  }

  const handleEditModalOpen = (userId) => {
    setIsModalOpen(true);
    setIsEditModalOpen(true);
    setIsDeleteModalOpen(false);
    setEditUserId(userId);
  };

  const handleDeleteModalOpen = (userId) => {
    setIsModalOpen(true);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(true);
    setDeleteUserId(userId);
  };

  function handleModalClose() {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setEditUser(null);
    setDeleteUserId(null);
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
      .then(() => {
        const updatedUsers = users.map((user) =>
          user.id === editUserId ? editedUser : user
        );
        setUsers(updatedUsers);
        handleModalClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteUser = () => {
    deleteUser(deleteUserId)
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== deleteUserId);
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

  useEffect(() => {
    if (editUser) {
      setEmail(editUser.email);
      setPassword(editUser.password);
      setRole(editUser.role);
    }
  }, [editUser]);

  return (
    <div id="adminEmployeesContainer">
      <section id="btnAdd">
        <button
          type="button"
          className="addButton"
          onClick={() => handleModalOpen()}
        >
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
                    <i
                      className="bi bi-pencil-fill"
                      onClick={() => handleEditModalOpen(user.id)}
                    ></i>
                  </td>
                  <td>
                    <i
                      className="bi bi-trash3-fill"
                      onClick={() => handleDeleteModalOpen(user.id)}
                    ></i>
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
                <input type="text" value={role} onChange={handleRoleChange} />
                <button type="submit" className="modalButton">
                  Guardar
                </button>
              </form>
            ) : isDeleteModalOpen ? (
              <div className="deleteModal">
                <p>¿Estás seguro de que deseas eliminar este usuario?</p>
                <div className="deleteModalButtons">
                  <button className="confirmDeleteButton" onClick={handleDeleteUser}>
                    Confirmar
                  </button>
                  <button className="cancelDeleteButton" onClick={handleModalClose}>
                    Cancelar
                  </button>
                </div>
              </div>
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
