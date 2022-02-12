function Todo({onetask, handleDelete, handleUpdate}){
    return (
    <div className="todo-row">
    <p>{onetask.task } </p> 
    <div className='icons'>
     <button className="btn1" onClick={()=>handleDelete(onetask)}>❎</button>
    <button className="btn2" onClick={()=>handleUpdate(onetask)}>📝</button>
    </div>
   
    
    </div>
    )
}
export default Todo