import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Button } from 'antd';

function Add() {
  const [task, setTask] = useState("");

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/tasks/${id}`).then((res) => {
      setTask(res.data.task);
    });
  }, []);

  const navigate = useNavigate();

  const data = {
    task: task,
  };

  function Update(e) {
    e.preventDefault();
    axios.put(`http://localhost:3001/tasks/${id}`, data).then(navigate("/"));
  }
  return (
    <div className="container">
      <h2 align="center">Edit Task</h2>
      <form className="box">
        <Input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          type="text"
          placeholder="Type here"
        />
        
        <Button
          type = "primary"
          htmlType="submit"
          style={{width: "100%", marginTop: "1rem"}}
          onClick={Update}
        >
          update task
        </Button>
      </form>
    </div>
  );
}

export default Add;
