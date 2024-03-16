import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/login.scss";
import { motion } from "framer-motion";
import { Trash2, Pencil } from 'lucide-react';
import axios from 'axios';

const Home = () => {
  const id = localStorage.getItem('user');
  const [todo, setTodo] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out");
    localStorage.clear();
    window.location.reload();
  };

  const fetchTodo = async (id) => {
    try {
      const response = await axios.get('https://todo-with-auth-backend-1.onrender.com/api/todos/gettodo', { params: { id } });
      setTodo(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://todo-with-auth-backend-1.onrender.com/api/todos/deletetodo/${id}`);
      alert("Item deleted");
      window.location.reload();
    } catch (error) {
      alert("Failed to delete item");
      window.location.reload();
    }
  };

  useEffect(() => {
    const existUser = localStorage.getItem('user');
    if (!existUser) {
      navigate("/");
    } else {
      fetchTodo(id);
    }
  }, [id, navigate]);

  return (
    <div className='Home-Main'>
      <div className="Nav">
        <Link to="/add">
          <motion.button
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='addbtn'>Add Todo
          </motion.button>
        </Link>
        <motion.button
          onClick={handleLogout}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='log-btn'>Logout
        </motion.button>
      </div>
      <div className="Todos">
        {Array.isArray(todo) && todo.length > 0 ? (
          todo.map((t) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 300 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="todoitem">
              <p>{t.todo}</p>
              <div className='butt'>
                <button className='edit'><Pencil /></button>
                <button onClick={() => handleDelete(t._id)} className='delete'><Trash2 /></button>
              </div>
            </motion.div>
          ))
        ) : (
          <p>No todos found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
