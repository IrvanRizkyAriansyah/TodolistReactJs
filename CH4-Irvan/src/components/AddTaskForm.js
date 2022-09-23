import {Input, Button} from 'antd'

const AddTaskForm = ({ newTask, setNewTask, addTask }) => {
  return(
    <>
      {/* Add Task */}
      <div style={{marginTop: "1rem"}}>
      <h1 align="center"> TodoInput </h1>
      </div>
      <div className="box">
        <div>
          <Input 
            value={newTask}
            onChange={ (e) => setNewTask(e.target.value)}
            className="form-control form-control-lg"
            placeholder="Type Here"
          />
        </div>
        <div className="col-auto">
          <Button
            onClick={addTask}
            className="btn btn-lg btn-success"
            style={{width: "100%", marginTop: "1rem"}}
            type="primary"
          >Add Task</Button>
        </div>
      </div>
      <br />
    </>
  )
}

export default AddTaskForm;
