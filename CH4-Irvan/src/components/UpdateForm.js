import {Input, Button} from 'antd'

const UpdateForm = ({ updateData, changeHolder, updateTask, cancelUpdate }) => {
  return(
    <>
      <div style={{marginTop: "1rem"}}>
      <h1 align="center"> TodoInput </h1>
      </div>
      <div className="box">
        <div>
          <Input 
            value={ updateData && updateData.task }
            onChange={ (e) => changeHolder(e)}
            className="form-control form-control-lg"
          />
        </div>
        <div className="col-auto">
          <Button
            onClick={updateTask}
            className="btn btn-lg btn-success mr-20"
            style={{width: "100%", marginTop: "1rem"}}
            type="primary"
          >Update</Button>
          <Button
            onClick={cancelUpdate}
            className="btn btn-lg btn-warning"
            style={{width: "100%", marginTop: "1rem"}}
            type="primary"
          >Cancel</Button>
        </div>
      </div>
      <br />  
    </>
  )
}

export default UpdateForm;
