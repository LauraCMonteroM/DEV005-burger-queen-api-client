import { ModalAddUsers } from "./modalAddUsser"
import  {UseModal}  from "./useModal"

 function Modals() {
   const [isOpen1, openModal1, closeModal] = UseModal(false)

   return (
      <div>
          <article className="modal isOpen">
        <div className="modalContainer">
            <button className="modal-close">X</button>
          
        </div>

       </article>

            <button type="submit" onClick={openModal1}>Añadir</button>
            <ModalAddUsers isOpen1={isOpen1} closeModal={closeModal}>
               <form>

            <label>Correo</label>
            <input type="text"></input>

            <label>contraseña</label>
            <input type="text"></input>

            <label>Rol</label>
            <input type="text"></input>


         </form>
            </ModalAddUsers>
         

      </div>
   )
}
 export default Modals