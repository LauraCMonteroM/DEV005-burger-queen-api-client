import { useNavigate } from "react-router-dom";
import { /*createUser,*/  getData } from "../../services/Users.services";
import { useState, useEffect } from "react"
import StatesModal from "./modalstate";

const Vista1Admin = () => {
  console.log(StatesModal);
  const closed = useNavigate()
  const [users, setUsers] = useState([]);

  useEffect(() => {    
    getData(users)
      .then(res => {
        res.json()
          .then(setUsers);
      })
  },[]
  )

  // function handleCreate() {
  //     // createUser()
  // }
  function GotoHome() {
    closed("/")
  }

   
    
  return (
    <div>
      <div>
        <StatesModal></StatesModal>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>List de empleados</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              );
            })}
        </tbody>

      </table>
      <h1>Página en construcción</h1>
      <i className="bi bi-box-arrow-right" onClick={GotoHome}></i>
