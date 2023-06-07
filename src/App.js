
import './App.css';
import Home from './Components/Home'; 
import Login from './Components/Login';
//react  routing 
import { BrowserRouter,Router,Routes,Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>      
      </Routes>
     </Router>
    </div>
  );
}

export default App;
