import "./app.scss"
import Home from "./home";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



// Default route is home
function App(){
  return (  
  <Router>
    <Routes>

        <Route path="/" element={<Home />} />


    </Routes>
  </Router>
  );

  //return <Home />
}

export default App;