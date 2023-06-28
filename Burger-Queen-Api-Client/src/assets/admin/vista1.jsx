import { useNavigate } from "react-router-dom";

const Vista1Admin = () => {
          const closed = useNavigate()
      
          function GotoHome(){
              closed("/")
          }
          return (
      
              <div>
                  <h1>Página en construcción</h1>
                  <i className="bi bi-box-arrow-right" onClick={GotoHome}></i>
              </div>
      
      
          )
      
      }

export default Vista1Admin