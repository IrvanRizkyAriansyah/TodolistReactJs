// import './App.css';
import { Input, Button, Row, Col } from 'antd';
import { useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import ToDo from './components/ToDo.js'
import Data from './data.json'
import AddTaskForm from './components/AddTaskForm.js'
import UpdateForm from './components/UpdateForm.js'

function App(props) {

  const navigate = useNavigate()
    // Tasks (ToDo List) State
  //////////////////////////
  const [toDo, setToDo] = useState([])
  
  // loadData
  
  useEffect(() => {
        getAPI(Data)
    }, []);

    const getAPI = (data) => {
        setToDo(data)
    }
    
  // Temp State
  /////////////
  const [newTask, setNewTask] = useState('')
  const [updateData, setUpdateData] = useState('')

  // Add task 
  ///////////
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

  // Delete task 
  //////////////
  const deleteTask = (id) => {
    
    // let newTasks = toDo.filter( task => task.id !== id)
    // setToDo(newTasks)

    // refactored
    setToDo(toDo.filter(task => task.id !== id))

  }
  
  // Delete All task 
  //////////////
  const deleteAllTask = () => {
    setToDo('')
  }
  
  // Delete complete task 
  //////////////
  const deleteCompleteTask = (complete) => {
    
    // let newTasks = toDo.filter( task => task.id !== id)
    // setToDo(newTasks)

    // refactored
    setToDo(toDo.filter(task => task.complete !== true))
  }
  
  // Mark task as done or completed
  /////////////////////////////////
  const markDone = (id) => {
    
    // let newTask = toDo.map( task => {
    //   if( task.id === id ) {
    //     return ({ ...task, status: !task.status })
    //   } 
    //   return task
    // })
    // setToDo(newTask)

    // refactored
    setToDo(toDo.map(
      task => task.id === id 
      ? ({ ...task, complete: !task.complete }) 
      : (task) 
    ))

  }

  // Cancel update
  ////////////////
  const cancelUpdate = () => {
    setUpdateData('')
  }

  // Change task for update
  /////////////////////////
  const changeHolder = (e) => {

    // let newEntry = {
    //   id: updateData.id,
    //   title: e.target.value,
    //   status: updateData.status ? true : false
    // }
    // setUpdateData(newEntry)

    // refactored
    setUpdateData({...updateData, task: e.target.value})
  }

  // Update task
  //////////////
  const updateTask = () => {
    
    // let filterRecords = [...toDo].filter( task => task.id !== updateData.id )
    // let updatedObject = [...filterRecords, updateData]
    // setToDo(updatedObject)

    // refactored
    let removeOldRecord = [...toDo].filter(task => task.id !== updateData.id)
    setToDo([
      ...removeOldRecord, 
      updateData
    ])
    
    setUpdateData('')

  }
  
  return (
    <div className="container">
      <h1 align="center">TodoSearch</h1>
      
      <div className="box">
      <Input placeholder="Search" style={{width: "50%"}}/>
      
      <Row style={{paddingTop: "1rem"}}>
      <Col span={12}>
        <Button type="primary" style={{width: "100%"}}>Search</Button>
      </Col>
      <Col span={12} align="end">
        <Button type="primary" style={{width: "80%"}} onClick={() => navigate("\Input")}>Add new task</Button>
      </Col>
      </Row>
      </div>
      
      <br></br>
      <h1 align="center">TodoList</h1>
      <Row justify="space-between">
      <Col span={7}>
        <Button type="primary" style={{width: "100%"}}>All</Button>
      </Col>
      <Col span={7}>
        <Button type="primary" style={{width: "100%"}}>Done</Button>
      </Col>
      <Col span={7}>
        <Button type="primary" style={{width: "100%"}}>Todo</Button>
      </Col>
      </Row>
      
      <div style={{textAlign: 'center', paddingTop: "1rem"}}>
      {toDo && toDo.length ? '' : 'No Tasks...'}
      </div>
      <ToDo
        toDo={toDo}
        markDone={markDone}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />
      
        <Row style={{paddingTop: "2rem", marginBottom:"1rem"}}>
      <Col span={12}>
        <Button type="primary" style={{width: "95%", backgroundColor: "red", border:"none"}}
        onClick = {deleteCompleteTask}
        >Delete complete task</Button>
      </Col>
      <Col span={12} align="end">
        <Button type="primary" style={{width: "95%", backgroundColor: "red", border:"none"}} 
        onClick={deleteAllTask}>Delete all task</Button>
      </Col>
      </Row>
      
      {updateData && updateData ? (
      <UpdateForm 
        updateData={updateData}
        changeHolder={changeHolder}
        updateTask={updateTask}
        cancelUpdate={cancelUpdate}
      />
    ) : (
      <AddTaskForm 
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
      />
    )}
    </div>
    );
  }
  
  export default App;
