import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css'
import Home from './pages/Home';
import Add from './pages/user/Add';
import Edit from './pages/user/Edit';

function App() {
  return (
      <Routes>
        <Route  path="/" exact element={<Home/>} />
        <Route  path="/home" exact element={<Home/>} />
        <Route  path="/add-task" exact element={<Add/>} />
        <Route  path="/edit-task/:id" exact element={<Edit/>} />
      </Routes>
  );
}

export default App;
