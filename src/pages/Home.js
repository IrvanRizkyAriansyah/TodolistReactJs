import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Button, Row, Col, Input, Checkbox} from 'antd';
import {DeleteFilled, EditFilled} from '@ant-design/icons';

function Home() {
  const [toDo, setToDo] = useState([]);
  const [task, setTask] = useState([]);
  const [searchTask, setSearchTask] = useState('');

  const navigate = useNavigate();

  function loadTasks() {
    axios.get("http://localhost:3001/tasks").then((res) => {
      setToDo(res.data.reverse());
      setTask(res.data);
    });
  }

  useEffect(() => {
    loadTasks();
  }, []);
  
  function deleteTask(id) {
    axios.delete(`http://localhost:3001/tasks/${id}`)(loadTasks());
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
  
  const completeTask = (id) => {
        setToDo(toDo.map((item) => {
            if(item.id === id){
                return {
                    ...item, complete : !item.complete
                }
            } return item
        }))
    }  
  
  return (
    <>
    <div className="container">
        <h1 align="center">TodoSearch</h1>
        <div className="box">
          <Input placeholder="Search" style={{width: "50%"}} 
          onChange={e => {setSearchTask(e.target.value)}}
          />
        <Row style={{paddingTop: "1rem"}}>
        <Col span={12}>
          <Button type="primary" style={{width: "100%"}}
          >Search</Button>
        </Col>
        <Col span={12} align="end">
          <Button type="primary" style={{width: "80%"}} onClick={()=>navigate('/add-task')} >Add new task</Button> 
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
      
        {toDo.filter((data) => {
              if (searchTask ===''){
                 return data
              } else if (data.task.toLowerCase().includes(searchTask.toLowerCase())){
                 return data
              }
              }).map((data, index) => { return (
          <div className="box">
            <Row>
            <Col span={12}> 
              <h3 className={data.complete?'done':''}> {data.task} </h3> 
            </Col>
            <Col span={12} align="end">
              <Checkbox checked={data.complete? true : false } style={{marginRight:"1rem"}}              
              onClick={() => completeTask(data.id)} />
              <EditFilled style={{color:"yellow", marginRight:"1rem", fontSize: "14pt"}} 
                onClick={()=>navigate(`/edit-task/${data.id}`)}
              /> 
              <DeleteFilled style={{fontSize: "14pt"}} 
                onClick={()=>deleteTask(data.id)}
              />
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
