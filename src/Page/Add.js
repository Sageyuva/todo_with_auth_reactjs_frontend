import React, { useState } from 'react'
import "../styles/login.scss"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Add = () => {


  const navi = useNavigate()
const id = localStorage.getItem('user') 

  const HandleAdd = async() => {
try {
  const response = await axios.post('https://todo-with-auth-backend-1.onrender.com/api/todos/addtodo' , {todo , id})
  console.log(response.data)
  alert('item added')
  navi("/home")
} catch (error) {
  alert("failed to add item")
  window.location.reload()
}
  }


  const [todo, settodo] = useState("")

  return (
    <div className='addmain'>
   <div className="add">
   <input value={todo} onChange={(e)=> settodo(e.target.value)} type="text" placeholder='Add Todo'/>
      <button onClick={HandleAdd}>Add</button>
   </div>
    </div>
  )
}

export default Add