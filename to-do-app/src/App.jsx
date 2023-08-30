import React from 'react';
import {v4 as uuid} from "uuid"
import './App.css';

import { FcTodoList } from 'react-icons/fc';
import { FaRegUserCircle, FaTooth } from 'react-icons/fa';




function App() {

const [input, setInput] = React.useState("")
const [data, setData] = React.useState([])
const [editId, setEditId] = React.useState(null)
const [editTitle, setEditTitle] = React.useState("")
const [show, setShow] = React.useState(null)



const handleTodo = () => {

  if(input.trim() === "") {
      alert("please Add Todo !")
   } else {

  const payload = {
    title:input,
    status:false,
    id:uuid()
  }
  const newData=([...data, payload])
  setData(newData)

  localStorage.setItem("todoData", JSON.stringify(newData))
  
  setInput("")
}
 }
const handleDelete = (id) => {
  const update = data.filter((el) => el.id !== id);
  setData(update)
  localStorage.setItem("todoData", JSON.stringify(update))
}


const handleEdit = (id, val) => {
if(editId === id) {
  const update = data.map((el) => 
  el.id === id ? {...el, title:editTitle} : el
  ) 
  setData(update)
  console.log(update)
  localStorage.setItem("todoData", JSON.stringify(update))
  setEditId(null)
 
} else{
  setEditId(id)
  setEditTitle(val)
}
}


const handleCheck = (id) => {
  const update = data.map((el) =>
    el.id === id ? { ...el, status: !el.status } : el
  );
  setData(update);
  localStorage.setItem("todoData", JSON.stringify(update))
}


const handleFilter = (stat) => {
  const update = data.map((el) => 
  el.status === stat )
  setData(update)
  localStorage.setItem("todoData", JSON.stringify(update))
}


const handleClear = () => {
  const update = data.filter((el) => el.status !== true)
  setData(update)
  localStorage.setItem("todoData", JSON.stringify(update))
}


React.useEffect(() => {
  const storedData = JSON.parse(localStorage.getItem('todoData')) || [];
  setData(storedData);
}, []);


  return (
    <div className="App">
      <div className='h2'>
        <FcTodoList className='icon'/>
        <h2>TO-DO APP</h2>
        <FaRegUserCircle className='icon'/>
      </div>
    

      <div className='input'>
          <input type="text" 
          placeholder="Enter the Todo" 
          onChange={(e) => setInput(e.target.value)}
          value={input}
          />
         
          <button onClick={() => handleTodo()}>Add</button>
      </div>
      
      <div className='Filters'>
      <div className='filter'>
        <div className='h3'><h3>Filter</h3><h3>⌵</h3></div>
        <div className='buttons'>
          <button onClick={() => setShow(null)}>Show All</button>
          <button onClick={() => setShow(true)}>Completed</button>
          <button onClick={() => setShow(false)}>InCompleted</button>
         </div>
     </div>
        
      <button onClick={handleClear}>Clear Completed</button>
      </div>

      <div className='tasks'>



        {
          data
          .filter((todo) => (show === null ? todo : show ? todo.status : !todo.status))
          .map((todo) => (

            <div className='todo'

          style={
            todo.status ? 
            {backgroundColor:"#deebdd",
            backgroundImage: "linear-gradient(315deg, #deebdd 0%, #bbdbbe 74%)"
          } :
            {backgroundColor: "#f6ecc4",
              backgroundImage: "linear-gradient(315deg, #f6ecc4 0%, #f7d4d4 74%)"
            }
          } 
            key={todo.id}
            >
      
{/* ////////////////// TODO ///////////////////////////////////////////////////*/}

          { editId === todo.id ? 

            <input 
            id='updateinput'
                value={editTitle}
                type="text"
                onChange={(e) => setEditTitle(e.target.value)}
                /> 
            :
            <p>{todo.title}</p> }

{/* ////////////////// CHECKBOX ///////////////////////////////////////////////////*/}

          <input type="checkbox" checked={todo.status} onChange={() => handleCheck(todo.id)}/>

{/* ////////////////// EDIT ///////////////////////////////////////////////////*/}

          <button 
          className='edit'
          onClick = {() => handleEdit(todo.id, todo.title)}
          >
          {editId === todo.id ?  "Update" : "Edit"}
          </button>

{/* ////////////////// DELETE ///////////////////////////////////////////////////*/}

          <button 
       
          onClick = {() => handleDelete(todo.id)}
          >
          Delete
          </button>
 
          </div>
  ))}

         
      </div>
      <div className='footer'>footer</div>
    </div>
  );
}

export default App;
