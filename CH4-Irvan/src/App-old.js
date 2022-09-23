import './App.css';
import { Input, Button, Row, Col } from 'antd';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom'
import { blue } from '@ant-design/colors';
import List from './List';
import { uid } from "uid";

function App() {
  const navigate = useNavigate()
  const [todo, setTodo] = useState ([])
  const [formData, setFormData] = useState ({
    task : ""
  })

  useEffect(() => {
    //Fetch Data
    axios.get('http://localhost:3000/tasks').then((res) => {
      setTodo(res.data)
    })
  },[])
  
  const [isUpdate, setIsUpdate] = useState ({id: uid(), status: false})

  function handleChange(e){
    let data = {...formData}
    data[e.target.name] = e.target.value
    setFormData(data)
  }

  function handleSubmit(e){
    e.preventDefault()
    // alert("Done")
    let data = [...todo]

    if(formData.task === ""){
      return false
    }

    if (isUpdate.status) {
      data.forEach((todo) => {
        if (todo.id === isUpdate.id) {
          todo.task = formData.task
        }
      })

      axios.put(`http://localhost:3000/Tasks/${isUpdate.id}`, {
        task: formData.task
      }).then (res => {
        alert('Berhasil Update Task')
      })

    } else {
      let newData ={id: uid(), task: formData.task}
    data.push(newData)

    axios.post('http://localhost:3000/Tasks', newData).then (res => {
      alert('Berhasil Submit Task Baru')
      navigate("/")
    })
    }

    
    setTodo(data)
    setFormData({task: ""})
    setIsUpdate({id: null, status: false})
  }
  
  function handleEdit(id){
    let data = [...todo]
    let foundData = data.find((todo) => todo.id === id)
    setFormData({ task: foundData.task})
    setIsUpdate({id : id, status: true})
  }

  function handleDelete(id){
    let data = [...todo]
    let filteredData = data.filter((todo) => todo.id !== id)

    axios.delete(`http://localhost:3000/Tasks/${id}`).then(res =>{
      alert('Berhasil Hapus Task')
    })

    setTodo(filteredData)
  }
  
  function handleDeleteAll(id){
    let data = [...todo]
    let filterData = data.filter((todo) => todo.id === id)
    
    axios.delete(`http://localhost:3000/Tasks/${id}`).then(res =>{
      alert('Berhasil Hapus Task')
    })
    
    setTodo(filterData)
  }
  
  const Data = console.log(Data)

  return (
    <div className="container">
      <h1 align="center">TodoSearch</h1>
      
      <Input placeholder="Search" style={{width: "50%"}}/>
      <Row style={{paddingTop: "1rem", marginBottom:"1rem"}}>
      <Col span={12}>
        <Button type="primary" style={{width: "100%"}}>Search</Button>
      </Col>
      <Col span={12} align="end">
        <Button type="primary" style={{width: "80%"}} onClick={() => navigate("/Input")}>Add new task</Button>
      </Col>
      </Row>
      
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
      
      <List handleDelete={handleDelete} handleEdit={handleEdit} data={todo} />
        <Row style={{paddingTop: "2rem", marginBottom:"1rem"}}>
      <Col span={12}>
        <Button type="primary" style={{width: "95%", backgroundColor: "red", border:"none"}}>Delete complete task</Button>
      </Col>
      <Col span={12} align="end">
        <Button type="primary" style={{width: "95%", backgroundColor: "red", border:"none"}} onClick={() => handleDeleteAll()}>Delete all task</Button>
      </Col>
      </Row>
    </div>
    );
  }
  
  export default App;
    // <div><h1>TodoSearch</h1>
    // <div className="container-search">
    //   <Input placeholder="Search" />
    //   <div style={{display: 'flex'}}>
    //   <Button title="Search" />
    //   <Button title="Add new Task" />
    //   </div>
    // </div>

    // <h1>TodoList</h1>
    // <div style={{display: 'flex'}}>
    //   <Button title="All" />
    //   <Button title="Done" />
    //   <Button title="Todo" />
    // </div>

    // <List
    //       handleEdit={handleEdit}
    //       handleDelete={handleDelete}
    //       data={data}
    //     />

    // <div style={{display: 'flex'}}>
    // <Button title="Deletedone tasks" />
    // </div>
    // </div>
