import {Input, Button} from 'antd'

const UpdateForm = ({ updateData, changeHolder, updateTask, cancelUpdate }) => {
  return(
    <>
      <div style={{marginTop: "1rem"}}>
      <h1 align="center"> TodoUpdate </h1>
      </div>
      <div className="box">
        <div>
          <Input 
            value={ updateData && updateData.task }
            onChange={ (e) => changeHolder(e)}
            placeholder="Update"
          />
        </div>
        <div className="col-auto">
          <Button
            onClick={updateTask}
            style={{width: "100%", marginTop: "1rem"}}
            type="primary"
          >Update</Button>
          <Button
            onClick={cancelUpdate}
            style={{width: "100%", marginTop: "1rem", backgroundColor: "red", border: "none"}}
            type="primary"
          >Cancel</Button>
        </div>
      </div>
      <br />  
    </>
  )
}

export default UpdateForm;
