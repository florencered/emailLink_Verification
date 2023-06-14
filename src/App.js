
import './App.css';
import Home from './Components/Home'; 
import Login from './Components/Login';
//react  routing 
import { BrowserRouter,Router,Routes,Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route  path="/login" element={<Login/>}/>      
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
