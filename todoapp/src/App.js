import { useEffect, useState } from "react";


function App() {
   const [inpotForm,setInputForm]=useState()
   const [task, settask]=useState([])
   const [show, setShow] = useState({ onetask: false })
   const [update, setUpdate]=useState("")
   const [updateForm, setUpdateForm] = useState()
   
   console.log(update.id)
   console.log(updateForm)
   useEffect(()=>{
    fetch ("http://localhost:3000/todo")
    .then(res=>res.json())
    .then(data => settask(data))
   },[])


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
     console.log(taskToUpdate)
     setShow({[taskToUpdate.id]: !show.point})
     setUpdate(taskToUpdate) 
     setUpdateForm(taskToUpdate.task)
   }

  

   const handleUpdateSubmit = (e) =>{
    e.preventDefault() 
    fetch(`http://localhost:3000/todo/${update.id}`,{
      method: "PATCH",
      headers:{
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       task:updateForm
     })
    })
     .then(res=>res.json())
     .then(data => {
       const taskToRenderr= task.map((onetask)=>{
         if(onetask.id === data.id){
            return data
         }else{
           return onetask
         }
       })
       settask(taskToRenderr)
     })
     setShow({[updateForm.id]: !show.point})
     e.target.reset();
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
    <form onSubmit={handleUpdateSubmit}>
        <input type="text" name="todo" value={updateForm} onChange={(e)=>setUpdateForm(e.target.value)}/>
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
