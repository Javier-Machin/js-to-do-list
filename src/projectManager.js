import { Project } from './projectFactory'

const ProjectManager = (() => {

  const storage = window.localStorage;

  // Populates the projects array with either the stored projects or a default one
  const load = () => {
    
    const projects = [];
    const localProjectsFound = !!storage.getItem("projects");

    (localProjectsFound) ? deserializer() : newDefaultProject();

    return projects
    
    // Builds the objects from the serialized data in local storage  
    function deserializer() {
      console.log("Stored projects found!");
        
      const projectsJSON = storage.getItem("projects");
      const projectsObjects = JSON.parse(projectsJSON);
      
      for (let project in projectsObjects) {
        project = JSON.parse(projectsObjects[project]);

        const newProject = Project(project["name"], project["description"]);

        // Builds the to-do objects nested in each project
        for (let todo in project["todos"]) {
          newProject.addTodo(
            project["todos"][todo]["name"], 
            project["todos"][todo]["description"], 
            Date().toLocaleString(), 
            project["todos"][todo]["priority"]
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
        Date().toLocaleString(),
        "normal"
      );

      defaultProject.addTodo(
        "Initialize the repo", 
        "Enter the command 'git init'",
        Date().toLocaleString(),
        "normal"
      );

      const projectsJSON = {};
      
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

  return { load, save } 
})();

export { ProjectManager }