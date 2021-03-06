import { Project } from './projectFactory'

//Handle project objects
const projectController = (() => {
  const storage = window.localStorage;
  const projects = [];
  const getProjects = () => projects;
  let projectsJSON = {};
  // Populates the projects array with either the stored projects or a default one
  const load = () => {
    
    const localProjectsFound = !!storage.getItem("projects");

    (localProjectsFound) ? deserializer() : newDefaultProject();
    
    // Builds the objects from the serialized data in local storage  
    function deserializer() {
      console.log("Stored projects found!");
        
      projectsJSON = JSON.parse(storage.getItem("projects"));
      
      for (let project in projectsJSON) {
        project = JSON.parse(projectsJSON[project]);

        const newProject = Project(project["name"], project["description"]);

        // Builds the to-do objects nested in each project
        for (let todo in project["todos"]) {
          newProject.addTodo(
            project["todos"][todo]["name"], 
            project["todos"][todo]["description"],  
            project["todos"][todo]["priority"],
            project["todos"][todo]["isCompleted"]
          );
        }

        projects.push(newProject);
      }
    }

    // Creates a new default project
    function newDefaultProject() {
      const defaultProject = Project("Create a repo", "Steps to create new git repository");

      defaultProject.addTodo(
        "Create a new folder", 
        "Open your terminal and \
        enter the command 'mkdir new_project'",
        "Normal",
        "false"

      );

      defaultProject.addTodo(
        "Initialize the repo", 
        "Enter the command 'git init'",
        "Normal",
        "false"
      );

      // Use project's name as key and the formated project as value for serialization
      projectsJSON[defaultProject.getName()] = defaultProject.asJSON();
      
      // Save the default project as JSON in local storage
      save(projectsJSON);
      
      // Add the project to projects array
      projects.push(defaultProject);
    }
  }

  function save(projectsJSON) { 
    storage.setItem("projects", JSON.stringify(projectsJSON));
  }

  function newProject(name, description) {
    const project = Project(name, description);
    projectsJSON[project.getName()] = project.asJSON();
    save(projectsJSON);
    projects.push(project);
  }

  function deleteProject(i) {
    const project = projects[i];
    delete projectsJSON[project.getName()];
    save(projectsJSON);
    projects.splice(i, 1);
  }

  function updateProject(project) {
    projectsJSON[project.getName()] = project.asJSON();
    save(projectsJSON);
    projects.push(project);
  }

  return { load, save, getProjects, newProject, deleteProject, updateProject }

})();

export { projectController }