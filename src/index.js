import { ProjectManager } from './projectManager'

const projects = ProjectManager.load();

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