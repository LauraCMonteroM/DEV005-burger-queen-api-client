import { useState } from "react";
import image from "../../imgs/LogoBQ.png";
import { useNavigate } from "react-router-dom";
import BreakfastMenu from "./breakfastMenu";
import DinnerMenu from "./dinnerMenu";



function VistaMenu() {
  const logOut = useNavigate()
  function goToHome() {
    logOut('/')
  }
  const [isBreakfast, setIsBreakfast] = useState(true)
  const [isDinner, setIsDinner] = useState(false)
  const [currentView, setCurrentView] = useState("breakfast");
  function handleBreakfastButtonClick() {
    setCurrentView("breakfast")
    setIsBreakfast(true)
    setIsDinner(false)
  }
  function handleDinnerButtonClick() {
    setCurrentView("dinner")
    setIsDinner(true)
    setIsBreakfast(false)
  }


  return (
    <div className="containerMenu">
      <nav>
        <img src={image} className="navLogo" alt="Burger Queen Logo" />
        <button>Pedidos listos</button>
        <i className="bi bi-box-arrow-right" id="logOut" onClick={goToHome}></i>
      </nav>
      <section>
        <button type="button" className={`bnBreakfast ${isBreakfast ? "selecBtn" : "unSelectBtn"}`} onClick={handleBreakfastButtonClick}>Desayunos</button>
        <button type="button" className={`btnDinner ${isDinner ? "selecBtn" : "unSelectBtn"}`} onClick={handleDinnerButtonClick}>Almuerzo/Cena</button>
      </section>
      {currentView === "breakfast" ? <BreakfastMenu></BreakfastMenu> : <DinnerMenu></DinnerMenu>}
    </div>
  );
}
export default VistaMenu