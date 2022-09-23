import React from 'react'
import {Button, Row, Col} from 'antd'
import './App.css'
import { useNavigate} from 'react-router-dom'
import DeleteFilled from '@ant-design/icons'

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
              <DeleteFilled onClick={() => navigate(`/${todo.id}` && handleEdit(todo.id))}/>
              <Button>Edit</Button>
              <Button onClick={() => handleDelete(todo.id)} className="btn btn-sm btn-link">Del</Button>
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
