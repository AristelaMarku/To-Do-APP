function Todo({onetask, handleDelete, handleUpdate}){
    return (
    <div id ="inline">
    <p>{onetask.task }
     <button className="btn1" onClick={()=>handleDelete(onetask)}>❎</button>
    <button className="btn2" onClick={()=>handleUpdate(onetask)}>📝</button>
    </p> 
    
    </div>
    )
}
export default Todo