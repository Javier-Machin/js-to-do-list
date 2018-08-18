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
        priority: todo.getPriority()
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
// Project to-do factory
const Todo = (name, description, dueTime, priority) => {
  let isCompleted = false;
  const getName = () => name;
  const getDescription  = () => description;
  const getDueTime = () => dueTime;
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