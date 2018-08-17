import { Project } from './projectFactory'

const projects = populateProjects();

renderProjects(projects);


function renderProjects(projects) {
  const contentContainer = document.getElementById("content");
  
  projects.forEach((project) => {
    const projectContainer = document.createElement("article");
    const projectText = document.createElement("p");

    projectText.innerHTML = `${project.getName()} | ${project.getDescription()}`;

    projectContainer.appendChild(projectText);
    contentContainer.appendChild(projectContainer);
  });
}

function populateProjects() {

  let projects = [];
  const storage = window.localStorage;

  const defaultProject = Project("Create a repo", "Steps to create new git repository");

  defaultProject.addTodo(
    "Create a new folder", 
    "Open your terminal and \
    enter the command 'mkdir new_project'",
    Date().toLocaleString(),
    "normal"
  );

  defaultProject.addTodo(
    "Create a new folder", 
    "Open your terminal and \
    enter the command 'mkdir new_project'",
    Date().toLocaleString(),
    "normal"
  );

  projects.push(defaultProject);
  projects.push(defaultProject);

  console.log(JSON.parse(projects[0].asJSON())["todos"]["todo0"]["description"]);
  
  return projects
}
