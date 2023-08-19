import axios from 'axios'
import React from 'react'
import {FaCheckDouble,FaEdit,FaRegTrashAlt} from 'react-icons/fa'
import { backendURL } from '../Utils/URLS'
import { toast } from 'react-toastify'

const Task = ({number, name, completed, setToComplete, task, getSingleTask, getTasks}) => {
    const deleteTask = async()=>{
      const {data} = await axios.delete(`${backendURL}/api/task/deleteTask/${task._id}`)
      toast.success("Task deleted successfully");
      getTasks();
    }
  return (
    <div className="task">
          <div className="info">
          <div className={completed ? "completed" : "incomplete"}></div>
          <h2>{number}.</h2>
          <p>{name}</p>
        </div>
        <div className="options">
          <FaCheckDouble size={20} color="green" className='cursor' onClick={()=>setToComplete(task)}/>
          <FaEdit size={20} color="#orange" className='cursor' onClick={()=>getSingleTask(task)}/>
          <FaRegTrashAlt size={20} color="red" className='cursor' onClick={deleteTask}/>
        </div>
      </div>
  )
}

export default Task