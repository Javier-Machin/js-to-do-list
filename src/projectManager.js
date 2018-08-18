import { Project } from './projectFactory'

const ProjectManager = () => {

  const load = () => {
    const storage = window.localStorage;
    const projects = [];
    const localProjectsFound = !!storage.getItem("projects");


    (localProjectsFound) ? deserializer() : newDefaultProject();

    return projects
      
    function deserializer() {
      console.log("Stored projects found!");
        
      const projectsJSON = storage.getItem("projects");
      const projectsObjects = JSON.parse(projectsJSON);
      
      for (let project in projectsObjects) {
        project = JSON.parse(projectsObjects[project]);

        const newProject = Project(project["name"], project["description"]);

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
        "enter the command 'git init'",
        Date().toLocaleString(),
        "normal"
      );

      let projectsJSON = {};

      projectsJSON[String(defaultProject.getName())] = defaultProject.asJSON();
      projectsJSON[String(defaultProject.getName()+ "2")] = defaultProject.asJSON();
      
      storage.setItem("projects", JSON.stringify(projectsJSON));

      projects.push(defaultProject);
      projects.push(defaultProject);
    }
  }
  return { load } 
}

export { ProjectManager }