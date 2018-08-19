// Handle all the DOM manipulation
const Render = (projects) => {
  const contentContainer = document.getElementById("content");
  
  projects.forEach((project) => {
    const projectContainer = document.createElement("article");
    const projectText = document.createElement("p");

    projectText.innerHTML = `${project.getName()} | ${project.getDescription()}`;

    projectContainer.appendChild(projectText);
    
    projectContainer.addEventListener("click", () => {
      let todoList = document.querySelector(".to-do-list");

      // Toggle to-do list
      (todoList) ? projectContainer.removeChild(todoList) : 
                   RenderTodo(projectContainer, project);
    });
      
    contentContainer.appendChild(projectContainer);
  });

  function RenderTodo(projectContainer, project) {
    const todos = project.getTodo();
    const todoList = document.createElement("ol");
    todoList.classList.add("to-do-list");
    
    todos.forEach((todo) => {
      const todoListItem = document.createElement("li");
      const itemName = document.createElement("p");
      const itemDescription = document.createElement("p");
      const itemInfo = document.createElement("p");

      itemName.innerHTML = todo.getName();
      itemDescription.innerHTML = todo.getDescription();
      itemInfo.innerHTML = `DueTime: ${todo.getDueTime()} |
                            Priority: ${todo.getPriority()}`;
      
      todoListItem.appendChild(itemName);
      todoListItem.appendChild(itemDescription);
      todoListItem.appendChild(itemInfo);

      todoList.appendChild(todoListItem);
    });

    projectContainer.appendChild(todoList);
  }
}

export { Render }