
export const ModalAddUsers = ({children}) => {
    return (
       <article className="modal isOpen">
        <div className="modalContainer">
            <button className="modal-close">X</button>
            {children}
        </div>

       </article>

    )

}