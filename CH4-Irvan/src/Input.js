import './App.css';
import { Input, Button, Row, Col } from 'antd';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate, useLocation} from 'react-router-dom'
import { blue } from '@ant-design/colors';
import List from './List';
import { uid } from "uid";
import AddTaskForm from "./components/AddTaskForm"

function InputData(props) {
  const [toDo, setToDo] = useState([])
  const [newTask, setNewTask] = useState('')
  
  const addTask = () => {
    if(newTask) {
      let num = toDo.length + 1 
      
      // let newEntry = { id: num, task: newTask, status: false }
      // setToDo([...toDo, newEntry])

      // refactored
      setToDo([
        ...toDo, 
        { id: num, task: newTask, complete: false }
      ])

      setNewTask('')
    }
  }
  const navigate = useNavigate()
  return (
    <div className="container">
    <h1 align="center"> TodoInput </h1>
    <form className="TaskForm box">
        <Input
          value={newTask}
          onChange={ (e) => setNewTask(e.target.value)} 
          name="task"></Input>
        <Button type="primary" htmlType="submit" style={{width: "100%", marginTop: "1rem"}} onClick={()=>navigate("/")}> submit </Button>
    </form>
    </div>
    )
}

export default InputData
