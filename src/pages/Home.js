import React, { useEffect, useState } from 'react'
import './Home.css'
import {BiTask} from 'react-icons/bi';
import Task from '../components/Task';
import Summary from '../components/Summary';
import {useNavigate} from 'react-router-dom';
import {AiOutlinePoweroff} from 'react-icons/ai'
import axios from 'axios'
import { backendURL } from "../Utils/URLS";
import {toast} from 'react-toastify'
const initialState = {
  name: "hello",
  completed: false
}
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState();
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  const getTasks = async ()=>{
    setIsLoading(true);
    try {
      const {data} = await axios.get(`${backendURL}/api/task/getTasks/${userId}`);
      setTasks(data);
      // console.log(tasks);
      setIsLoading(false)
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
    
  }

  const addTask = async(e)=>{
    e.preventDefault();
    if (!isEditing) {
      const {data} = await axios.post(`${backendURL}/api/task/createTask`, {name: formData.name, userId});
      setFormData({name:"",completed:false});
      toast.success("Task added successfully.");
      await getTasks();
    }else{
      const {data} = await axios.put(`${backendURL}/api/task/updateTask/${taskId}`, formData);
      setFormData({name:"",completed:false});
      toast.success("Task updated successfully.");
      await getTasks();
    }
    
  }


  useEffect(()=>{
    getTasks();
  },[])

  useEffect(()=>{
    setCompletedTasks(()=>{
      let array = tasks.filter((item)=>{
        return item.completed
      })
      return array.length
    })
  
  },[tasks])


  const logout = ()=>{
    localStorage.removeItem('email');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/')
  }

  const setToComplete = async (task) => {
    const newFormData = {
      name: task.name,
      completed: true
    }
    try {
      await axios.put(`${backendURL}/api/task/completeTask/${task._id}`,newFormData);
      getTasks()
    } catch (error) {
      toast.error(error.message)
    }
  }
  
  const getSingleTask = (task) => {
    setFormData({ name: task.name, completed: false })
    setIsEditing(true)
    setTaskId(task._id)
  }

  const handleInputChange = (e)=>{
    const {name, value} = e.target;
    setFormData({...formData, [name] : value});
  }

  return (
    <>
    <nav>
        <AiOutlinePoweroff size={40} color='red' onClick={logout} className='logout'/>
    </nav>
    <div className='container'>
      <div className="icon-container"><BiTask size={48} color="#007bff"/></div>
      <form className='form' onSubmit={addTask}>
        <input className='input' type="text" placeholder='Enter Task' name='name' value={formData.name} onChange={handleInputChange} />
        <button className='button'>Add</button>
      </form>
      <Summary isLoading = {isLoading} tasks={tasks} completedTasks={completedTasks}/>
      <div className="tasks">
        {
          isLoading ? <p>Tasks not available yet.</p> : 
          tasks.map((item, index)=>{
            return(
              <Task key={index} number={index+1} name={item.name} getTasks={getTasks} getSingleTask={getSingleTask} completed={item.completed} task={item} setToComplete={setToComplete}/>
            )
          })
        }
      </div>
    </div>
    </>
  )
}

export default Home