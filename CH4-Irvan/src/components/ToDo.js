import React from 'react';
import '../App.css'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {Row, Col, Checkbox} from 'antd'
import { useState } from "react";

const ToDo = ({ toDo, markDone, setUpdateData, deleteTask }) => {
  
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return(
    <>
      {toDo && toDo
      .sort((a, b) => a.id > b.id ? 1 : -1)
      .map( (task, index) => {
        return(
          <React.Fragment key={task.id}>
          <Row className="box">
            <Col span={20}>
              <div className={ task.complete ? 'done' : '' }>
                <h3 className="taskText">{task.task}</h3>
              </div>
            </Col>
            <Col span={4} align="right">
                <Checkbox onChange={onChange, (e) => markDone(task.id)} style={{marginRight: "1rem"}}/> 

                {task.complete ? null : (
                  <EditFilled onClick={() => setUpdateData(task)} style={{fontSize: "16pt", color: "yellow", marginRight: "1rem"}} 
                  />
                )}

                <DeleteFilled onClick={() => deleteTask(task.id)} style={{fontSize: "16pt"}}/>
            </Col>
            </Row>
          </React.Fragment>
        )
      })
      }  
    </>
  )
}

export default ToDo;
