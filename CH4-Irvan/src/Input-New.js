import './App.css';
import { Input, Button, Row, Col } from 'antd';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate, useLocation} from 'react-router-dom'
import { blue } from '@ant-design/colors';
import List from './List';
import { uid } from "uid";
import AddTaskForm from "./components/AddTaskForm"
import Data from './data.json'

function InputData(props) {

  const toDo, setToDo] = useState([])
  const [newTask, setNewTask] = useState('')
  
  useEffect(() => {
        getAPI(Data)
    }, []);

  const getAPI = (data) => {
        setToDo(data)
    }
  
  const addTask = () => {
    if(newTask) {
      let num = toDo.length + 1 
      
      // let newEntry = { id: num, task: newTask, status: false }
      // setToDo([...toDo, newEntry])

      // refactored
      setToDo([
        ...toDo, 
        { id: num, task: newTask, complete: false }
      ]).then(()=>navigate("/"))

      setNewTask('')
    }
  }
  
  return (
    <div className="container">
    <AddTaskForm 
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
    />
    </div>
    )
}

export default InputData
