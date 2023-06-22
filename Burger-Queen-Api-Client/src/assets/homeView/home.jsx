import { Link } from "react-router-dom"

const Home = () => {
          return (
                    <div>
                               <h1>Burger Queen</h1>
                              <ul>
                                        <li>
                                                  <Link to= "/admin">Admin</Link>
                                        </li>
                                        <li>
                                                  <Link to= "/waiter">Waiter</Link>
                                        </li>
                                        <li>
                                                  <Link to= "/cheff">Cheff</Link>
                                        </li>          
                              </ul>
                                                           
                    </div>  )
}

export default Home