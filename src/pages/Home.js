import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Button, Row, Col, Input} from 'antd';
import {DeleteFilled, EditFilled} from '@ant-design/icons';

function Home() {
  const [toDo, setToDo] = useState([]);
  const [task, setTask] = useState([]);

  function loadTasks() {
    axios.get("http://localhost:3001/tasks").then((res) => {
      setToDo(res.data.reverse());
      setTask(res.data.reverse());
    });
  }

  useEffect(() => {
    loadTasks();
  }, []);

  function deleteTask(id) {
    axios.delete(`http://localhost:3001/tasks/${id}`).then(loadTasks());
  }
  
  function filterTodoTask() {
    setToDo(task.filter(task => task.complete !== true))
  }
  
  function filterDoneTask() {
    setToDo(task.filter(task => task.complete === true))
  }
  
  function filterAllTask() {
    setToDo(task)
  }

  return (
    <>
    <div className="container">
        <h1 align="center">TodoSearch</h1>
        <div className="box">
          <Input placeholder="Search" style={{width: "50%"}}/>
        <Row style={{paddingTop: "1rem"}}>
        <Col span={12}>
          <Button type="primary" style={{width: "100%"}}>Search</Button>
        </Col>
        <Col span={12} align="end">
          <Link to={"/add-task"}> <Button type="primary" style={{width: "80%"}} >Add new task</Button> </Link>
        </Col>
        </Row>
        </div>
        
    <br></br>
      <h1 align="center">TodoList</h1>
      <Row justify="space-between">
      <Col span={7}>
        <Button type="primary" style={{width: "100%"}}
        onClick={()=>filterAllTask()}>All</Button>
      </Col>
      <Col span={7}>
        <Button type="primary" style={{width: "100%"}}
        onClick={()=>filterDoneTask()}>Done</Button>
      </Col>
      <Col span={7}>
        <Button type="primary" style={{width: "100%"}} 
          onClick={()=>filterTodoTask()}>Todo</Button>
      </Col>
      </Row>
      
        {toDo.map((data, index) => { return (
          <div className="box">
            <Row>
            <Col span={12}> 
              <h3 className={data.complete?'done':''}> {data.task} </h3> 
            </Col>
            <Col span={12} align="end">
              <Link to={`/edit-task/${data.id}`}> <EditFilled style={{color:"yellow", marginRight:"1rem", fontSize: "16pt"}} /> </Link>
              <Link onClick={()=>deleteTask(data.id)} to={"#"}> <DeleteFilled style={{fontSize: "18pt"}} /> </Link>
            </Col>
            </Row>
         </div>
         )})}
         
       <Row style={{paddingTop: "2rem", marginBottom:"1rem"}}>
      <Col span={12}>
        <Button type="primary" style={{width: "95%", backgroundColor: "red", border:"none"}}
        >Delete complete task</Button>
      </Col>
      <Col span={12} align="end">
        <Button type="primary" style={{width: "95%", backgroundColor: "red", border:"none"}} 
        >Delete all task</Button>
      </Col>
      </Row>
    </div>
    </>
  );
}

export default Home;