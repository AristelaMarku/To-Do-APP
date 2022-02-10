import { useEffect, useState } from "react";


function App() {
   const [inpotForm,setInputForm]=useState()
   const [task, settask]=useState([])
   console.log(task)

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
   }

   const taskTorender = task.map((onetask)=>{
     console.log(onetask)
    return <p>{onetask.task}</p>
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
