import { projectController } from './projectController'
// Handle all the DOM manipulation
const renderController = (() => {
  const contentContainer = document.getElementById("content");
  
  function renderProjects(projects) {
    
    renderNewProjectBtn();

    projects.forEach((project) => {
      const projectContainer = document.createElement("article");
      const projectInfo = document.createElement("p");
      const expandIcon = document.createElement("p");
      const deleteIcon = document.createElement("p");

      projectInfo.classList.add("project-info");
      expandIcon.classList.add("expand-icon");
      deleteIcon.classList.add("delete-icon");

      projectInfo.innerHTML = `${project.getName()} | ${project.getDescription()}`;
      expandIcon.innerHTML = "+";
      deleteIcon.innerHTML = "🗑";
      deleteIcon.title = "Remove project";
   
      expandIcon.addEventListener("click", function(e) {
        // Toggle expand icon symbol
        this.innerHTML == "+" ? this.innerHTML = "-" : this.innerHTML = "+";
        
        // Toggle to-do list only for projects with to-dos
        let todoList = document.querySelector(".to-do-list");
        
        if (todoList) {
          if (e.target.parentNode == todoList.parentNode) { 
            projectContainer.removeChild(todoList);
          }
        } else {
          renderTodo(projectContainer, project);  
        } 

      });

      projectContainer.appendChild(expandIcon);
      projectContainer.appendChild(projectInfo);
      projectContainer.appendChild(deleteIcon);    
      contentContainer.appendChild(projectContainer);
    });
  }

  function renderNewProjectBtn() {
    const newProjectBtn = document.createElement("button");
    newProjectBtn.innerHTML = "New project";
    newProjectBtn.id = "new-project-btn";
  
    newProjectBtn.addEventListener("click", () => {
      const form = document.querySelector(".project-form");
      (form) ? contentContainer.removeChild(form) : renderProjectForm();
    });
  
    contentContainer.appendChild(newProjectBtn);
  }


  function renderTodo(projectContainer, project) {
    const todos = project.getTodo();

    if (todos.length === 0) { return };
    
    const todoList = document.createElement("ol");
    
    todoList.classList.add("to-do-list");
    
    todos.forEach((todo, i) => {
      const todoListItem = document.createElement("li");
      const itemName = document.createElement("p");
      const expandIcon = document.createElement("p");
      const deleteIcon = document.createElement("p");

      itemName.classList.add("to-do-name");
      expandIcon.classList.add("expand-icon");
      deleteIcon.classList.add("delete-icon");

      itemName.innerHTML = todo.getName();
      expandIcon.innerHTML = "+";
      deleteIcon.innerHTML = "🗑";
      deleteIcon.title = "Remove to-do";
 
      expandIcon.addEventListener("click", function() {
        this.innerHTML == "+" ? this.innerHTML = "-" : this.innerHTML = "+";
        const todoDetails = document.getElementById(`.to-do-details-${i}`);

        // Toggle to-do details 
        (todoDetails) ? todoDetails.parentNode.removeChild(todoDetails) :
                        renderTodoDetails(todo, todoListItem, i);
      });

      todoListItem.appendChild(expandIcon);
      todoListItem.appendChild(itemName);
      todoListItem.appendChild(deleteIcon);
      todoList.appendChild(todoListItem);
    });

    projectContainer.appendChild(todoList);
  }

  function renderProjectForm() {
    const projectForm = document.createElement("form");
    const nameInput =  document.createElement("input");
    const descriptionInput = document.createElement("input");
    const submitBtn = document.createElement("button");
    const newProjectBtn = document.getElementById("new-project-btn");

    projectForm.classList.add("project-form");
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.placeholder = "Enter your project's name";
    descriptionInput.type = "text";
    descriptionInput.name = "description";
    descriptionInput.placeholder = "Enter a short description";
    submitBtn.innerHTML = "Create";
    submitBtn.classList.add("submit-form-btn");
    submitBtn.addEventListener("click", () => { 
      const name = nameInput.value;
      const description = descriptionInput.value;
      
      projectController.newProject(name, description);
    });

    projectForm.appendChild(nameInput);
    projectForm.appendChild(descriptionInput);
    projectForm.appendChild(submitBtn);


    contentContainer.insertBefore(projectForm, newProjectBtn.nextSibling);
  }

  function renderTodoDetails(todo, todoListItem, i) {
    const todoDetails = document.createElement("section");
    todoDetails.classList.add("to-do-details");
    todoDetails.id = `.to-do-details-${i}`;
    
    const itemDescription = document.createElement("p");
    const itemInfo = document.createElement("p");
    
    itemDescription.innerHTML = todo.getDescription();
    itemInfo.innerHTML = `Due Time: ${todo.getDueTime()} |
                          Priority: ${todo.getPriority()}`;
    
    todoDetails.appendChild(itemDescription);
    todoDetails.appendChild(itemInfo);
    todoListItem.appendChild(todoDetails);
  }

  return { renderProjects }

})();

export { renderController }