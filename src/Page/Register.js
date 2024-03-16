import React, { useEffect, useState } from 'react'
import "../styles/login.scss"
import {Link, useNavigate} from "react-router-dom"
import {Backdrop , CircularProgress} from '@mui/material'
import axios from 'axios'
import {motion} from "framer-motion"
const Register = () => {

  const navi = useNavigate()

   const HandleRegister = async(e) => {
e.preventDefault()
setloading(true)
        try {
          
const response = await axios.post('https://todo-with-auth-backend-1.onrender.com/api/users/reguser' , {name , email , password})

if(response.status === 201){
setloading(false)
alert("register complete")
localStorage.setItem('user' , response.data._id)
navi("/home")
}else{
  setloading(false)
  alert("internal server error")
}
          
        } catch (error) {
          console.log(error.response)
          if(error.response.status === 400){
            alert("user already exist")
            window.location.reload()
          }
          if(error.response.status === 500){
            alert("Failed to register try again")
            window.location.reload()
          }
          
        }
   }

   const [name, setname] = useState("")
   const [email, setemail] = useState("")
   const [password, setpassword] = useState("")
   const [loading, setloading] = useState(false)
 

   useEffect(()=>{
    const existuser = localStorage.getItem('user')
    if(existuser){
      navi("/home")
    } 
   })



  return (
    <motion.div
    initial={{ opacity: 0  , x:-100}} 
          animate={{ opacity: 1 , x:0 }}
          transition={{ duration: 0.7 }} className='main'>
    <form onSubmit={HandleRegister}>
    <input type="text"
     value={name} onChange={(e) => setname(e.target.value)} placeholder='Enter Name' />
      <input type="text"
      value={email} onChange={(e) => setemail(e.target.value)}
       placeholder='Enter E-mail' />
      <input type="password"
      value={password} onChange={(e) => setpassword(e.target.value)}
       placeholder='Enter Password' />
      <motion.button
      
 initial={{ opacity: 0  , y:30}} 
            animate={{ opacity: 1 , y:0 }}
            transition={{ duration: 0.3 }}
       type='submit'>Submit</motion.button>
      <motion.p
       initial={{ opacity: 0  , y:30}} 
            animate={{ opacity: 1 , y:0 }}
            transition={{ duration: 0.5 }}
      >Already have a account ? <Link to = "/" className='links'>Login</Link></motion.p>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
    </form>
    </motion.div>
  )
}

export default Register