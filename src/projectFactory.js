const Project = (name,description) => {
  const todoList = [];
  const getName = () => name;
  const getDescription  = () => description;
  const getTodo = () => todoList;
  const addTodo = (name, description,dueTime, priority) => {
    const newTodo = Todo(name, description, dueTime, priority);
    todoList.push(newTodo);
  }

  return { getName, 
           getDescription, 
           getTodo, 
           addTodo } 
}

const Todo = (name, description, dueTime, priority) => {
  let isComplete = false;
  const getName = () => name;
  const getDescription  = () => description;
  const getDueTime = () => dueTime;
  const getPriority = () => priority;
  const getCompleted = () => isComplete;
  const setCompleted = () => { 
    isComplete === false ? isComplete = true : isComplete = false;
  }

  return { getName, 
           getDescription, 
           getDueTime, 
           getPriority,
           getCompleted, 
           setCompleted }
} 

export { Project }