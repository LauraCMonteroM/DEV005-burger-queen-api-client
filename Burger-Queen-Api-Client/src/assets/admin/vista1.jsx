import { useNavigate } from "react-router-dom";
import { /*createUser*/ getData } from "../../services/Users.services";
import { useState, useEffect } from "react"

const Vista1Admin = () => {
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

  /*function handleCreate() {
      createUser('marianamg@gmail.com', '6543210', 'waiter', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY4Nzk3NzAyNywiZXhwIjoxNjg3OTgwNjI3LCJzdWIiOiIyIn0.HqRc4o_I82Z3xRpqi7JMzVRh3FIfKp805JFsTiHxL3I')
  }*/
  function GotoHome() {
    closed("/")
  }
  return (
    <div>
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

    </div>
  )
}
export default Vista1Admin