const Project = (name, description) => {
  const todoList = [];
  const getName = () => name;
  const getDescription  = () => description;
  const getTodo = () => todoList;
  const setTodo = (i, todo) => { todoList[i] = todo };
  
  // Add a new to-do element to the to-do-list
  const addTodo = (name, description, priority, isCompleted = "false") => {
    const newTodo = Todo(name, description, priority, isCompleted);
    todoList.push(newTodo);
  }
  
  // Remove to-do element from the to-do-list
  const deleteTodo = (i) => { todoList.splice(i, 1) };

  // Returns the project and its to-do elements as JSON
  const asJSON = () => {
    const todosObject = {};
    
    todoList.forEach((todo, index) => {
      const object = {
        name: todo.getName(),
        description: todo.getDescription(),
        priority: todo.getPriority(),
        dueTime: todo.getDueTime(),
        isCompleted: todo.getCompleted()
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
           setTodo, 
           addTodo,
           deleteTodo,
           asJSON } 
}

// Project todos factory
const Todo = (name, description, priority, isCompleted) => {
  
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
  const getCompleted = () => isCompleted;
  const setCompleted = () => { 
    isCompleted === "false" ? isCompleted = "true" : isCompleted = "false";
  }

  return { getName, 
           getDescription, 
           getDueTime, 
           getPriority,
           getCompleted, 
           setCompleted }
} 

export { Project }