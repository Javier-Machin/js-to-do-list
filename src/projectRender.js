// Handle all the DOM manipulation
const Render = (projects) => {
  const contentContainer = document.getElementById("content");
  
  projects.forEach((project) => {
    const projectContainer = document.createElement("article");
    const projectInfo = document.createElement("p");
    const expandIcon = document.createElement("p");

    projectInfo.classList.add("project-info");
    expandIcon.classList.add("expand-icon");

    projectInfo.innerHTML = `${project.getName()} | ${project.getDescription()}`;
    expandIcon.innerHTML = "+";
 
    expandIcon.addEventListener("click", () => {
      let todoList = document.querySelector(".to-do-list");

      // Toggle to-do list
      (todoList) ? projectContainer.removeChild(todoList) : 
                   RenderTodo(projectContainer, project);
    });

    projectContainer.appendChild(expandIcon);
    projectContainer.appendChild(projectInfo);    
    contentContainer.appendChild(projectContainer);
  });

  function RenderTodo(projectContainer, project) {
    const todos = project.getTodo();
    const todoList = document.createElement("ol");
    
    todoList.classList.add("to-do-list");
    
    todos.forEach((todo, i) => {
      const todoListItem = document.createElement("li");
      const itemName = document.createElement("p");
      const expandIcon = document.createElement("p");

      itemName.classList.add("to-do-name");
      expandIcon.classList.add("expand-icon");

      itemName.innerHTML = todo.getName();
      expandIcon.innerHTML = "+";
 
      expandIcon.addEventListener("click", () => {
        const todoDetails = document.getElementById(`.to-do-details-${i}`);

        // Toggle to-do details 
        (todoDetails) ? todoDetails.parentNode.removeChild(todoDetails) :
                        RenderTodoDetails(todo, todoListItem, i);
      });

      todoListItem.appendChild(expandIcon);
      todoListItem.appendChild(itemName);
      todoList.appendChild(todoListItem);
    });

    projectContainer.appendChild(todoList);
  }

  function RenderTodoDetails(todo, todoListItem, i) {
    const todoDetails = document.createElement("section");
    todoDetails.classList.add("to-do-details");
    todoDetails.id = `.to-do-details-${i}`;
    
    const itemDescription = document.createElement("p");
    const itemInfo = document.createElement("p");
    
    itemDescription.innerHTML = todo.getDescription();
    itemInfo.innerHTML = `DueTime: ${todo.getDueTime()} |
                          Priority: ${todo.getPriority()}`;
    
    todoDetails.appendChild(itemDescription);
    todoDetails.appendChild(itemInfo);
    todoListItem.appendChild(todoDetails);
  }
}

export { Render }