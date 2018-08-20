// Handle all the DOM manipulation
const Render = (projects) => {
  const contentContainer = document.getElementById("content");
  
  projects.forEach((project) => {
    const projectContainer = document.createElement("article");
    const projectText = document.createElement("p");

    projectText.innerHTML = `${project.getName()} | ${project.getDescription()}`;
 
    projectText.addEventListener("click", () => {
      let todoList = document.querySelector(".to-do-list");

      // Toggle to-do list
      (todoList) ? projectContainer.removeChild(todoList) : 
                   RenderTodo(projectContainer, project);
    });

    projectContainer.appendChild(projectText);
      
    contentContainer.appendChild(projectContainer);
  });

  function RenderTodo(projectContainer, project) {
    const todos = project.getTodo();
    const todoList = document.createElement("ol");
    todoList.classList.add("to-do-list");
    
    todos.forEach((todo, i) => {
      const todoListItem = document.createElement("li");
      const itemName = document.createElement("p");
      
      itemName.innerHTML = todo.getName();
      itemName
        
      itemName.addEventListener("click", () => {
        let todoDetails = document.getElementById(`.to-do-details-${i}`);

        if (todoDetails) {
          todoDetails.parentNode.removeChild(todoDetails);
        } else {
          todoDetails = document.createElement("section");
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
      });

      todoListItem.appendChild(itemName);
      todoList.appendChild(todoListItem);
    });

    projectContainer.appendChild(todoList);
  }
}

export { Render }