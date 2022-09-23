import React from 'react'
import {Button, Row, Col} from 'antd'
import './App.css'
import { useNavigate} from 'react-router-dom'
import {DeleteFilled, EditFilled} from '@ant-design/icons'

function List({data, handleEdit, handleDelete}) {
  const navigate = useNavigate()
  return (
    <div>
      {
        data.map((todo) => {
          return (
          <div className="box">
            <Row>
            <Col span={12}>
              <h3>{todo.task}</h3>
            </Col>
            <Col span={12} align="end">
              <EditFilled style={{color:"yellow", marginRight:"1rem", fontSize: "16pt"}} onClick={() => handleEdit(todo.id)}/>
              
              <DeleteFilled style={{fontSize: "18pt"}} onClick={() => handleDelete(todo.id)} />
            </Col>
            </Row>
          </div>
          )
        })
      }
    </div>
  )
}

export default List

