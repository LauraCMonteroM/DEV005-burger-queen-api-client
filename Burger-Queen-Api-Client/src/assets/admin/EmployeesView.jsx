import { useNavigate } from "react-router-dom";
import { /*createUser*/ getData } from "../../services/Users.services";
import { useState, useEffect } from "react"
import './EmployeesView.css'
import image from '../../imgs/LogoBQ.png'

const EmployeesView = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {    
    getData(users)
      .then(res => {
        res.json()
          .then(setUsers);
      })
  },[]
  )

  const closed = useNavigate()
  function GotoHome() {
    closed("/")
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
        <button type="button" className="addButton">Añadir Empleado</button>
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
    </div>
  )
}
export default EmployeesView