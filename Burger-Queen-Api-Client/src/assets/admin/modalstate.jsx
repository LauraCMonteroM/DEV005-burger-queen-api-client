import { ModalAddUsers } from "./modalAddUsser"
import { useState } from "react"
function StatesModal (){
   const [isModalOpen, setIsModalOpen] = useState(false)

   return(
    <div>
   <button onClick={() => isModalOpen(true)}>abrir</button>
    <ModalAddUsers isOpen = {isModalOpen} closeModal = {() => setIsModalOpen(false)}/>
 </div>
   )
   

}
export default StatesModal