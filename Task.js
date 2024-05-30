const root = ReactDOM.createRoot(document.getElementById("root"));

const Task = ({ title, del }) => {
  const [isEdit, setIsEdit] = React.useState(false);
  
  const [updatedTask, setUpdatedTask] = React.useState(title);

  const textId = React.useRef();

  const handleClickSave = () => {
    setUpdatedTask(textId.current.value);
    setIsEdit(false);
  };

  if (isEdit) {
    return (
      <>
      <div className='task-container'>
        <textarea ref={textId} defaultValue={updatedTask}></textarea>
        <button className='btn green' onClick={handleClickSave}>Save</button>
      </div>
        
      </>
    );
  } else {
    return (
      <div className='border border-black border-1 w-50' style={{ margin: '0 auto' }}>
        <p className='mt-3'>{updatedTask}</p>
        <div className='d-flex justify-content-between mt-auto mb-3'>
          <button className='btn beige flex-fill mx-1' onClick={() => setIsEdit(true)}>Edit</button>
          <button className='btn red flex-fill mx-1' onClick={del}>Delete</button>
        </div>
      </div>
    );
  }
};

const TaskList = () => {
  const [tasks, setTasks] = React.useState(["Сделать домашку!", "Заварить чай!!", "Купить книги!"]);

  const [newTask, setNewTask] = React.useState("");

  const deleteTask = (i) => {
    const tasksCopy = [...tasks];
    tasksCopy.splice(i, 1);
    setTasks(tasksCopy);
  };

  const addTask = () => {
    if (newTask.trim()) {
      const tasksCopy = [...tasks]; 
      tasksCopy.push(newTask); 
      setTasks(tasksCopy); 
    }
    setNewTask(""); 
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: '50px' }}>Todo List App</h1>
      <div style={{margin: '0 auto'}} className='w-50 d-flex'>
        <input
          className='form-control'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Введите новую задачу..."
        />
        <button style={{ width: '160px' }} className='btn btn-secondary' onClick={addTask}>Add Task</button>
      </div>
      <div className='d-flex flex-column text-center'>
      {tasks.map((task, i) => (
        <Task
          key={Math.random()}
          title={task}
          del={() => deleteTask(i)}
        />
      ))
      }</div>
    </>
  );
};

root.render(<TaskList />);