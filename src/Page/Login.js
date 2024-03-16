import React, { useEffect, useState } from 'react'
import "../styles/login.scss"
import {Link, useNavigate} from "react-router-dom"
import {Backdrop , CircularProgress} from '@mui/material'
import axios from 'axios'
import {motion} from "framer-motion"
const Login = () => {

const navi = useNavigate()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [loading, setloading] = useState(false)
  

  const HandleLogin = async(e) => {
    e.preventDefault()
    setloading(true)
    try {
      const response = await axios.post('https://todo-with-auth-backend-1.onrender.com/api/users/login' , {email,password})
      if(response.status === 200){
        const userdata = response.data.id
     
        localStorage.setItem('user', JSON.stringify(userdata));
          setloading(false)
          alert("login complete")
          navi('/home')
      }else{
        setloading(false)
        alert("internal server error try again")
        window.location.reload()
      }
    } catch (error) {
      if(error.response.status === 404){
        setloading(false)
        alert("user doesnt exist")
        window.location.reload()
      }
      if(error.response.status  === 400){
        setloading(false)
        alert("Wrong password")
        window.location.reload()
      }
    }

  }


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
            transition={{ duration: 0.7 }}
     className='main'>
    <form onSubmit={HandleLogin}>
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
       type='submit'
      >Submit</motion.button>
      <motion.p
       initial={{ opacity: 0  , y:30}} 
            animate={{ opacity: 1 , y:0 }}
            transition={{ duration: 0.5 }}
      >Don't have a account ? <Link to = "/reg" className='links'>Register</Link></motion.p>
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

export default Login