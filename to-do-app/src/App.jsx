import React from 'react';
import {v4 as uuid} from "uuid"
import './App.css';

function App() {

const [input, setInput] = React.useState("")
const [data, setData] = React.useState([])
const [editId, setEditId] = React.useState(null)
const [editTitle, setEditTitle] = React.useState("")
const [show, setShow] = React.useState(null)



const handleTodo = () => {

  if(editId !== null) {
    const update = data.map((el) => 
    el.id === editId ? {...el, title:input} : el
    )
    setData(update)
    setEditId(null)
    setInput("")
  } else {

  const payload = {
    title:input,
    status:false,
    id:uuid()
  }
  setData([...data, payload])
  setInput("")
}
}
const handleDelete = (id) => {
  const update = data.filter((el) => el.id !== id);
  setData(update)
}


const handleEdit = (id, title) => {
  setEditId(id)
  setEditTitle(title)
  setInput(title)
}


const handleCheck = (id) => {
  const update = data.map((el) =>
    el.id === id ? { ...el, status: !el.status } : el
  );
  setData(update);
}


const handleFilter = (stat) => {
  const update = data.map((el) => 
  el.status === stat )
  setData(update)
}


const handleClear = () => {
  const update = data.filter((el) => el.status !== true)
  setData(update)
}



  return (
    <div className="App">

    <h2>TO-DO APP</h2>

      <div className='input'>
          <input type="text" 
          placeholder="Enter the Todo" 
          onChange={(e) => setInput(e.target.value)}
          value={input}
          />
         
          <button onClick={() => handleTodo()}>{editId === null ?  "Add" : "Update"}</button>
      </div>
      
      <div className='Filters'>
      <div className='filter'>
        <h3>Filter</h3>
        <div className='buttons'>
          <button onClick={() => setShow(null)}>Show All</button>
          <button onClick={() => setShow(true)}>Completed</button>
          <button onClick={() => setShow(false)}>InCompleted</button>
         </div>
     </div>
        
      <button onClick={handleClear}>Clear Complete Task</button>
      </div>

      <div className='tasks'>
        {data
          .filter((todo) => (show === null ? todo : show ? todo.status : !todo.status))
          .map(todo => <div className='todo'
                              key={todo.id}
                              >
         
{/* ////////////////// TODO ///////////////////////////////////////////////////*/}

          <h3>{todo.title}</h3>

{/* ////////////////// CHECKBOX ///////////////////////////////////////////////////*/}

          <input type="checkbox" checked={todo.status} onChange={() => handleCheck(todo.id)}/>

        

{/* ////////////////// EDIT ///////////////////////////////////////////////////*/}

          <button 
          style={{margin:"auto 0"}}
          onClick = {() => handleEdit(todo.id, todo.title)}
          >
          Edit
          </button>

{/* ////////////////// DELETE ///////////////////////////////////////////////////*/}

          <button 
          style={{margin:"auto 0"}}
          onClick = {() => handleDelete(todo.id)}
          >
          Delete
          </button>

          </div>
          )}
      </div>
    </div>
  );
}

export default App;
