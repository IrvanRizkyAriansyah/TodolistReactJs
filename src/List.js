import React from 'react'
import {Button, Row, Col} from 'antd'
import './App.css'

function List({data, handleEdit, handleDelete}) {
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
              <Button  onClick={() => handleEdit(todo.id)}>Edit</Button>
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
