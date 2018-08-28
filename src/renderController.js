import { projectController } from './projectController'

// Handle all the DOM manipulation
const renderController = (() => {
  const contentContainer = document.getElementById("content");
  
  function renderProjects(projects) {
    renderNewProjectBtn();

    projects.forEach((project, i) => {
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
   
      expandIcon.addEventListener("click", function() {

        // Toggle to-do list 
        const todoList = document.getElementById(`to-do-list-${i}`);
        const todoForm = document.getElementById(`to-do-form-${i}`);

        if (todoList) { 
          projectContainer.removeChild(todoList);
          if (todoForm) { projectContainer.removeChild(todoForm) };
        } else {
          renderTodo(projectContainer, project, i);
        }

        // Toggle new to-do button
        if (this.innerHTML == "+") {
          renderNewTodoBtn(projectContainer, project, i);
        } else {
          const newTodoBtn = document.getElementById(`new-todo-btn-${i}`); 
          projectContainer.removeChild(newTodoBtn);
        }

        // Toggle expand icon symbol
        this.innerHTML == "+" ? this.innerHTML = "-" : this.innerHTML = "+";
        
      });

      deleteIcon.addEventListener("click", function() {
        const check = confirm("Are you sure you want to delete this project?");
        if (check) {
          projectController.deleteProject(i);
          projectContainer.parentNode.removeChild(projectContainer);
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

  function renderNewTodoBtn(projectContainer, project, i) {
    const newTodoBtn = document.createElement("button");
    newTodoBtn.innerHTML = "New to-do";
    newTodoBtn.id = `new-todo-btn-${i}`;
    newTodoBtn.classList.add("new-todo-btn");
  
    newTodoBtn.addEventListener("click", () => {
      const form = document.getElementById(`to-do-form-${i}`);
      (form) ? projectContainer.removeChild(form) : renderTodoForm(projectContainer, project, i);
    });
  
    projectContainer.appendChild(newTodoBtn);
  }

  function renderTodo(projectContainer, project, i) {
    const todos = project.getTodo();
    const todoList = document.createElement("ol");
    todoList.classList.add("to-do-list");
    todoList.id = `to-do-list-${i}`;

    if (todos.length === 0) { return };
    
    // Display each to-do
    todos.forEach((todo, i) => {
      const todoListItem = document.createElement("li");
      const itemName = document.createElement("p");
      const status = document.createElement("p");
      const expandIcon = document.createElement("p");
      const deleteIcon = document.createElement("p");

      const checkStatus = () => {
        if (todo.getCompleted() === "true") {
          status.innerHTML = "Done";
          status.classList.remove("red");
          status.classList.add("green");
        } else {
          status.innerHTML = "Pending";
          status.classList.remove("green");
          status.classList.add("red");
        }
      }

      itemName.classList.add("to-do-name");
      status.classList.add("to-do-status");
      expandIcon.classList.add("expand-icon");
      deleteIcon.classList.add("delete-icon");

      itemName.innerHTML = todo.getName();
      checkStatus();

      status.addEventListener("click", () => { 
        todo.setCompleted();
        project.setTodo(i, todo);
        projectController.updateProject(project);
        checkStatus();
      });

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

      deleteIcon.addEventListener("click", function() {
        const check = confirm("Are you sure you want to delete this to-do?");
        if (check) {
          project.deleteTodo(i);
          projectController.updateProject(project);
          todoListItem.parentNode.removeChild(todoListItem);
        }
      });

      todoListItem.appendChild(expandIcon);
      todoListItem.appendChild(itemName);
      todoListItem.appendChild(status);
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

      if (inputValidation("project", name, description)) {
        projectController.newProject(name, description);
      }
      
    });

    projectForm.appendChild(nameInput);
    projectForm.appendChild(descriptionInput);
    projectForm.appendChild(submitBtn);

    contentContainer.insertBefore(projectForm, newProjectBtn.nextSibling);
  }

  function renderTodoForm(projectContainer, project, i) {
    const todoForm = document.createElement("form");
    const nameInput =  document.createElement("input");
    const descriptionInput = document.createElement("input");
    const priorityInput = document.createElement("input");
    const submitBtn = document.createElement("button");

    todoForm.classList.add("to-do-form");
    todoForm.id = `to-do-form-${i}`;

    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.placeholder = "Enter to-do name";
    descriptionInput.type = "text";
    descriptionInput.name = "description";
    descriptionInput.placeholder = "Enter a short description";
    priorityInput.type = "text";
    priorityInput.name = "priority";
    priorityInput.placeholder = "Enter priority"
    submitBtn.innerHTML = "Create";
    submitBtn.classList.add("submit-form-btn");
    submitBtn.addEventListener("click", () => { 
      const name = nameInput.value;
      const description = descriptionInput.value;
      const priority = priorityInput.value;
      
      if (inputValidation("todo", name, description, priority)) {
        project.addTodo(name, description, priority);
        projectController.updateProject(project);
      }
    });

    todoForm.appendChild(nameInput);
    todoForm.appendChild(descriptionInput);
    todoForm.appendChild(priorityInput);
    todoForm.appendChild(submitBtn);

    projectContainer.appendChild(todoForm);
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

  function inputValidation(
    type = "null",
    name = "null", 
    description = "null", 
    priority = "null"
  ) {

    if (name.length > 15) {
      alert("Name too long, max 15 characters");
      return false
    }

    if (type == "project" && description.length > 20) {
      alert("Description too long, max 20 characters");
      return false
    } else if (type == "to-do" && description.length > 30) {
      alert("Description too long, max 30 characters");
      return false
    }

    if (priority !== "null" && priority !== "Low" && 
        priority !== "Normal" && priority !== "High") {
      alert("Priority only can be 'Low', 'Normal' or 'High'");
      return false
    }

    if (name.length < 4) {
      alert("Name too short, min 4 characters");
      return false
    }

    if (description.length < 4) {
      alert("Description too short, min 4 characters");
      return false
    }

    return true
  }

  return { renderProjects }

})();

export { renderController }