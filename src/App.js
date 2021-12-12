import "./App.css";
// importing components from react-router-dom package
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
  
// import Home component
import Home from "./components/Home";
// import Login component
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Assign from "./components/Assign";
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/createaccount" element={<CreateAccount/>} />
          <Route path="/assign" element={<Assign/>} />
        </Routes>
      </BrowserRouter>
    
    );
}
  
export default App;