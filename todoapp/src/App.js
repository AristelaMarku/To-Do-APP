import { useEffect, useState } from "react";


function App() {
   const [inpotForm,setInputForm]=useState()
   const [task, settask]=useState([])
   const [show, setShow] = useState({ onetask: false })

   useEffect(()=>{
    fetch ("http://localhost:3000/todo")
    .then(res=>res.json())
    .then(data => settask(data))
   },[])

  //  const addNewTask = (newTask) =>{
  //   settask([...task, newTask])
  //  }

   const handleSubmit = (e) => {
     e.preventDefault() 
    setInputForm(inpotForm)
    fetch ("http://localhost:3000/todo",{
      method:"post",
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        task:inpotForm
      })
    })
    .then(res => res.json())
    .then(data =>settask([...task, data]))
    setInputForm(" ")
   }

   const handleDelete = (taskToDelete) => {
     fetch(`http://localhost:3000/todo/${taskToDelete.id}`,{
      method: "DELETE",
    })
    .then(res => res.json())
    .then(data=>{
      const updateItem= task.filter((item)=> item.id !== taskToDelete.id)
      settask(updateItem)
    })
   }

   const handleUpdate = (taskToUpdate) =>{
     setShow({[taskToUpdate.id]: !show.point})

     fetch(`http://localhost:3000/todo/${taskToUpdate.id}`,{
       method: "PATCH",
       headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        task:taskToUpdate
      })
      .then(res=>res.json())
      .then(data =>console.log(data))
    })
   }

   const taskTorender = task.map((onetask)=>{
    return (
    
    <div id="ul" key={onetask.id}>  
    {!show[onetask.id] ?
    (
    <>
    <p>{onetask.task } 
    <button onClick={()=>handleDelete(onetask)}>❎</button>
    <button onClick={()=>handleUpdate(onetask)}>📝</button>
    </p>
    </>
    )
    : 
    (
    <>
    <form>
        <input/>
        <button>update</button>
    </form>
    </>
    )}
   </div>
   
    )
   })
   
   

  return (
    <div>
      <h2 id="title">To Do App</h2>
      <form id="inputform" onSubmit={handleSubmit}>
        <input name="todo" type="text" value={inpotForm} onChange={(e)=>setInputForm(e.target.value)}/>
        <button>Submit</button>
      </form>
      {taskTorender} 
      </div>
  );
}

export default App;
