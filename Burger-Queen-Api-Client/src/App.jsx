import './App.css';
import { Routes, Route } from 'react-router-dom';
import  Home  from './assets/homeView/home';
import Login from './assets/Login/login';
import Vista1Cheff from './assets/chef/vista1chef';
import VistaMenu from './assets/waiter/vistamenu';
import AdminView from './assets/admin/AdminView';

function App() {

  return (
       <div>
        <Routes>
          <Route path= '/' element={<Home />}></Route>
          <Route path= '/login' element={<Login />}></Route>
          <Route path= '/cheff' element={<Vista1Cheff />}></Route>
          <Route path= '/menu' element={<VistaMenu />}></Route>
          <Route path= '/admin' element={<AdminView />}></Route>
        </Routes>
      </div>
  )
}

export default App
