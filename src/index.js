import { projectController } from './projectController'
import { renderController } from './renderController'

const projects = projectController.load();

renderController.renderProjects(projects);