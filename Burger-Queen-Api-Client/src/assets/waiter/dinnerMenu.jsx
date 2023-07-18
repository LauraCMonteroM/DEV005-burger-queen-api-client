import "./vistamenu";
import {
    getAllProducts,
    getDataOnlyProduct,
  } from "../../services/Products.services";

const DinnerMenu = ()=>{
 return(
    <div>
        <p>Cena</p>
        <div>
            <div className="containerTarget">
                <div className="containerNameProduct">
                    <div>Nombre</div>
                </div>
                <div className="containerImgProduct">
                    <img className="imgProduct"></img>
                </div>
                <div className="containerPrice">
                    <div className="priceProduct">Precio</div>
                </div>
                <div>
                    <button className="btnAddProducts" >+</button>
                </div>

            </div>
        </div>
    </div>
 )   
}
export default DinnerMenu