import { ProjectManager } from './projectManager'
import { Render } from './projectRender'

const projects = ProjectManager.load();

Render(projects);