import './App.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Input, Button } from 'antd';
import axios from 'axios';
import { uid } from "uid";

function InputData(props) {
  
  const [todo, setTodo] = useState ([])

  const [formData, setFormData] = useState ({
    task : ""
  })

  useEffect(() => {
    //Fetch Data
    axios.get('http://localhost:3000/Tasks').then((res) => {
      console.log(res.data)
      setTodo(res.data)
    })
  },[])

  const [isUpdate, setIsUpdate] = useState ({id: null, status: false})

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
  
  return (
    <div className="container">
    <h1 align="center"> TodoInput </h1>
    <form onSubmit={handleSubmit} className="TaskForm box">
        <Input
          value={formData.task}
          onChange={ handleChange} 
          name="task"></Input>
        <Button type="primary" htmlType="submit" style={{width: "100%", marginTop: "1rem"}}> submit </Button>
    </form>
    </div>
    )
}

export default InputData
