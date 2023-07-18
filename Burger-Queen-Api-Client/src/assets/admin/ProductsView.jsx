import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createNewProduct,
  deleteProduct,
  editDataProducts,
  getAllProducts,
  getDataOnlyProduct,
} from "../../services/Products.services";
import "./ProductsView.css";


const ProductsView = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [type, setType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [editProduct, setEditProduct] = useState(null);  
  const [deleteProductId, setDeleteProductId] = useState(null);


  useEffect(() => {
    getAllProducts().then((res) => {
      res.json().then(setProducts);
    });
  }, []);

  useEffect(() => {
    if (editProductId !== null) {
      getDataOnlyProduct(editProductId)
        .then((res) => res.json())
        .then((data) => {
            setEditProduct(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [editProductId]);

  useEffect(() => {
    if (editProduct) {
      setName(editProduct.name);
      setPrice(editProduct.price);
      setUrlImage(editProduct.image);
      setType(editProduct.type);
    }
  }, [editProduct]);


  const handleCreateProduct = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    const newProduct = {
      name: name,
      price: price,
      image: urlImage,
      type: type,
      dateEntry: formattedDate,
    };
    console.log(newProduct.dateEntry);
    createNewProduct(newProduct)
      .then((res) => {
        newProduct.id = res.id;
        setProducts([...products, newProduct]);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
    setIsEditModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setEditProduct(null);
  };

  const handleEditModalOpen = (productId) => {
    setIsModalOpen(true);
    setIsEditModalOpen(true);
    setEditProductId(productId);
  };

  const handleDeleteModalOpen = (productId) => {
    setIsModalOpen(true);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(true);
    setDeleteProductId(productId);
  };


  const handleProdNameChange = (e) => {
    const newProductName = e.target.value;
    setName(newProductName);
  };

  const handleProdPriceChange = (e) => {
    const newProductPrice = e.target.value;
    setPrice(newProductPrice);
  };

  const handleProdImgChange = (e) => {
    const newProductImg = e.target.value;
    setUrlImage(newProductImg);
  };

  const handleProdTypeChange = (e) => {
    const newProductType = e.target.value;
    setType(newProductType);
  };

  const handleEditProduct = (e) => {
    e.preventDefault();
    const editedProduct = {
      id: editProductId,
      name: name,
      price: price,
      image: urlImage,
      type: type,
    };

    editDataProducts(editedProduct)
      .then(() => {
        const updatedProducts = products.map((prod) =>
          prod.id === editProductId ? editedProduct : prod
        );
        setProducts(updatedProducts);
        handleModalClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteProduct = () => {
    deleteProduct(deleteProductId)
      .then(() => {
        const updatedProducts = products.filter((prod) => prod.id !== deleteProductId);
        setProducts(updatedProducts);
        handleModalClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div id="adminProductsContainer">
      <section id="btnAdd">
        <button type="button" className="addButton" onClick={handleModalOpen}>
          Añadir Producto
        </button>
      </section>
      <section className="tableSection">
        <table className="productsTable">
          <thead>
            <tr>
              <th colSpan="7">Lista de productos</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.type}</td>
                  <td className="iconCell">
                    <div className="centeredContent">
                      <i className="bi bi-pencil-fill edit"
                      onClick={() => handleEditModalOpen(product.id)}
                      ></i>
                    </div>
                  </td>
                  <td className="iconCell">
                    <div className="centeredContent">
                      <i className="bi bi-trash3-fill delete"
                      onClick={() => handleDeleteModalOpen(product.id)}
                        ></i>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No hay productos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <i
              className="bi bi-x-square-fill closeButton"
              onClick={handleModalClose}
            ></i>
            {isEditModalOpen ? (
              <form onSubmit={handleEditProduct}>
                <h2>Editar producto</h2>
                <label className="modalLabel">Nombre del producto</label>
                <input
                  type="text"
                  placeholder="Nombre del producto"
                  value={name}
                  onChange={handleProdNameChange}
                />
                <label className="modalLabel">Precio del producto</label>
                <input
                  type="text"
                  placeholder="$00000"
                  value={price}
                  onChange={handleProdPriceChange}
                />
                <label className="modalLabel">urlImage</label>
                <input
                  type="text"
                  placeholder="url"
                  value={urlImage}
                  onChange={handleProdImgChange}
                />
                <label className="modalLabel">Categoría</label>
                <input
                  type="text"
                  placeholder="Desayuno/AlmuerzoCena"
                  value={type}
                  onChange={handleProdTypeChange}
                />
                <button type="submit" className="modalButton">
                  Guardar
                </button>
              </form>
            ) : isDeleteModalOpen ? (
              <div className="deleteModal">
                <p>¿Estás seguro de que deseas eliminar este producto?</p>
                <div className="deleteModalButtons">
                  <button className="confirmDeleteButton" onClick={handleDeleteProduct}>
                    Confirmar
                  </button>
                  <button className="cancelDeleteButton" onClick={handleModalClose}>
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreateProduct}>
                <h2>Añadir producto</h2>
                <label className="modalLabel">Nombre del producto</label>
                <input
                  type="text"
                  placeholder="Nombre del producto"
                  value={name}
                  onChange={handleProdNameChange}
                />
                <label className="modalLabel">Precio del producto</label>
                <input
                  type="text"
                  placeholder="$00000"
                  value={price}
                  onChange={handleProdPriceChange}
                />
                <label className="modalLabel">urlImage</label>
                <input
                  type="text"
                  placeholder="url"
                  value={urlImage}
                  onChange={handleProdImgChange}
                />
                <label className="modalLabel">Categoría</label>
                <input
                  type="text"
                  placeholder="Desayuno/AlmuerzoCena"
                  value={type}
                  onChange={handleProdTypeChange}
                />
                <button type="submit" className="modalButton">
                  Añadir
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsView;
