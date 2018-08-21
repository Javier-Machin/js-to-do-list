const Project = (name, description) => {
  const todoList = [];
  const getName = () => name;
  const getDescription  = () => description;
  const getTodo = () => todoList;
  
  // Add a new to-do element to the to-do-list
  const addTodo = (name, description, dueTime, priority) => {
    const newTodo = Todo(name, description, dueTime, priority);
    todoList.push(newTodo);
  }

  // Returns the project and its to-do elements as JSON
  const asJSON = () => {
    const todosObject = {};
    
    todoList.forEach((todo, index) => {
      const object = {
        name: todo.getName(),
        description: todo.getDescription(),
        priority: todo.getPriority(),
        dueTime: todo.getDueTime()
      }

      todosObject[`todo${index}`] = object;
    });

    const projectString = {
      name,
      description,
      todos: todosObject
    }

    return JSON.stringify(projectString);
  }

  return { getName, 
           getDescription, 
           getTodo, 
           addTodo,
           asJSON } 
}

// Project todos factory
const Todo = (name, description, priority) => {
  
  let isCompleted = false;
  const getName = () => name;
  const getDescription  = () => description;
  const getDueTime = () => {
    const today = new Date();
    const dd = today.getDate() + 1;
    const mm = today.getMonth() + 1; 
    const yyyy = today.getFullYear();
    return `${mm}/${dd}/${yyyy}` 
  };
  const getPriority = () => priority;
  const getCompleted = () => isComplete;
  const setCompleted = () => { 
    isCompleted === false ? isCompleted = true : isCompleted = false;
  }

  return { getName, 
           getDescription, 
           getDueTime, 
           getPriority,
           getCompleted, 
           setCompleted }
} 

export { Project }