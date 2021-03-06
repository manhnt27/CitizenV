import "./App.css";
// importing components from react-router-dom package
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
  
// import Home component
import Home from "./pages/Home";
// import Login component
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Assign from "./pages/Assign";
import ViewCitizen from "./pages/ViewCitizen";
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/createaccount" element={<CreateAccount/>} />
          <Route path="/assign" element={<Assign/>} />
          <Route path="/viewcitizen" element={<ViewCitizen/>} />
        </Routes>
      </BrowserRouter>
    
    );
}
  
export default App;