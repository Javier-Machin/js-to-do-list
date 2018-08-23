import { projectController } from './projectController'
import { renderController } from './renderController'

projectController.load();

const projects = projectController.getProjects();

renderController.renderProjects(projects);