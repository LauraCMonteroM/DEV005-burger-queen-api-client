import { useState } from "react";
import image from "../../imgs/LogoBQ.png";
import EmployeesView from "./EmployeesView";
import ProductsView from "./ProductsView";
import { useNavigate } from "react-router-dom";

const AdminView = () => {
  const logout = useNavigate();
  const [isEmployeesSelected, setIsEmployeesSelected] = useState(true);
  const [isProductsSelected, setIsProductsSelected] = useState(false);
  const [currentView, setCurrentView] = useState("employees");

  function GotoHome() {
    logout("/");
  }  
  
  const handleEmployeesButtonClick = () => {
    setCurrentView("employees");
    setIsEmployeesSelected(true);
    setIsProductsSelected(false);
  };
  
  const handleProductsButtonClick = () => {
    setCurrentView("products");
    setIsEmployeesSelected(false);
    setIsProductsSelected(true);
  };

  return (
    <div>
      <nav>
        <img src={image} className="navLogo" alt="Burger Queen Logo" />
        <i className="bi bi-box-arrow-right" id="logOut" onClick={GotoHome}></i>
      </nav>
      <section className="prodEmplButtons">
        <button
          type="button"
          className={`employeesButton ${
            isEmployeesSelected ? "selectedButton" : "unselectedButton"
          }`}
          onClick={handleEmployeesButtonClick}
        >
          Empleados
        </button>
        <button
          type="button"
          className={`productsButton ${
            isProductsSelected ? "selectedButton" : "unselectedButton"
          }`}
          onClick={handleProductsButtonClick}
        >
          Productos
        </button>
      </section>
      {currentView === "employees" ? <EmployeesView /> : <ProductsView />}
    </div>
  );
};

export default AdminView;
