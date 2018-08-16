import { Project } from './projectFactory'

const defaultProject = Project("Create a repo", "Steps to create new git repository");

defaultProject.addTodo(
  "Create a new folder", 
  "Open your terminal and \
  enter the command 'mkdir new_project'",
  Date().toLocaleString(),
  "normal"
);

defaultProject.getTodo()[0].setCompleted();

drawApp();

function drawApp() {
  const contentContainer = document.getElementById("content");
  const node = document.createElement("p");
  node.innerHTML = defaultProject.getTodo()[0].getDueTime();
  contentContainer.appendChild(node);
}