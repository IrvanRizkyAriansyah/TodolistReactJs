import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from 'antd';

function Add() {
  const [task, setTask] = useState("");

  const navigate = useNavigate();
  const data = {
    task: task,
    complete: false
  };

  function submitForm(e) {
    e.preventDefault();
    axios.post("http://localhost:3001/tasks", data).then(navigate("/"));
  }
  return (
    <div className="container">
      <h2 align="center">Todo Add</h2>
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
          onClick={submitForm}
          style={{width: "100%", marginTop: "1rem"}}
        >
          submit
        </Button>
      </form>
    </div>
  );
}

export default Add;
