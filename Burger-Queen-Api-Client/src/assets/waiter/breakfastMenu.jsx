
//cuando haga click en un producto su precio se modifique de acuerdo a la cantidad del producto
//que se haga la suma total del precio de todos los productos seleccionados 
// renderizado de acuredo a la propiedad description the each product (ya sea breacksfast or dinner)
// agregar un boton de delete en caso de que se quiera borrar un producto del pedido
// enviar el pedido a la vista mesero
//NO PRIORIZABLE  que comience un time al momento de enviar el formulario para que el chef vea renderizado el tiempo que lleva la orden enviada
import "./vistamenu";
import PropTypes from 'prop-types';
import { getAllProducts, getDataOnlyProduct } from "../../services/Products.services";
import { useEffect, useState } from "react";





const BreakfastMenu = ({ product, countProduct }) => {

  const [getProducts, setGetProducts] = useState([]); // Estado para obtener productos
  const [counter, setCounter] = useState({}); // Estado para realizar el seguimiento de la cantidad de cada producto seleccionado
  const [displayTable, setDisplayTable] = useState(false) // estado para el renderizado condicional de la tabla
const [clientName, setClientName] = useState('');

  useEffect(() => {
    getAllProducts().then((res) => {
      res.json().then(setGetProducts);
    });
  }, []);

  // condicionar el renderizado de acuerdo al click de en cada producto
  // al hacer click debe aparecer el thead y el producto
  function handleCounter(productId) {
    setDisplayTable(true);
    setCounter((prevCounter) => ({
      ...prevCounter,
      [productId]: (prevCounter[productId] || 0) + 1,
    }));
  }

  // Función para obtener el total de precio por producto tomando en cuenta la cantidad seleccionada
  function getTotalPrice(productId) {
    const quantity = counter[productId] || 0;
    const product = getProducts.find((p) => p.id === productId);
    return quantity * product.price;
  }

  // Filtrar los productos seleccionados para mostrarlos en la tabla
  const selectedProducts = getProducts.filter((element) => counter[element.id]);

  // Calcular el precio total tomando en cuenta la cantidad seleccionada de cada producto
  const totalPrice = selectedProducts.reduce((total, product) => {
    return total + getTotalPrice(product.id);
  }, 0);









  return (
    <div>
      <p>Desayunos</p>

      {displayTable && (
        <section className="tableSection">
          <form>
            <table className="tableContainer">
              <thead>
                <tr>
                  <th>Nombre del cliente</th>
                  <th>Cantidad</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      className="addNameClient"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Nombre del cliente"
                    />
                  </td>
                  <td>
                    <button className="btnEnviarOrden">
                      Enviar Orden
                    </button>
                  </td>
                </tr>
                {selectedProducts.map((element) => (
                  <tr key={element.id}>
                    <td>{counter[element.id]}</td>
                    <td>{element.name}</td>
                    <td>{element.description}</td>
                    <td>{getTotalPrice(element.id)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3">Total</td>
                  <td>{totalPrice}</td>
                </tr>
              </tbody>
            </table>
          </form>
        </section>
      )}

      {getProducts.map((product) => (
        <div key={product.id} className="containerTarget">
          <div className="containerNameProduct">
            <div>{product.name}</div>
          </div>
          <div className="containerImgProduct">
            <img className="imgProduct" src={product.image} />
          </div>
          <div className="containerPrice">
            <div className="priceProduct">{product.price}</div>
          </div>
          <div>
            <button className="btnAddProducts" onClick={() => handleCounter(product.id)}>
              Agregar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

BreakfastMenu.propTypes = {
  countProduct: PropTypes.func,
  product: PropTypes.object,
};

export default BreakfastMenu;
